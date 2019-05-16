import {IStardock} from "../Planets/stardock.js";
import {PlayerState} from "../Player/playerState.js";
import {ITradeItemInfo} from "./tradeItemInfo.js";
import {TradeItem} from "./tradeItem.js";
import {Dictionary, IDictionary} from "../../dictionary.js";
import {CargoHold} from "../Starships/cargoHold.js";

export class TradeManager {
    private readonly stardock: IStardock;
    private readonly starshipCargo: CargoHold;
    private readonly playerState: PlayerState;
    private readonly tradeItems: IDictionary<TradeItem> = {};
    private readonly changeListeners: (() => void)[] = [];
    private readonly commitListeners: (() => void)[] = [];
    private tradeValue: number = 0;
    private deltaStarshipCargoSize: number = 0;

    public constructor(stardock: IStardock, starshipCargo: CargoHold, playerState: PlayerState) {
        this.stardock = stardock;
        this.starshipCargo = starshipCargo;
        this.playerState = playerState;
        this.createTradeItems();
        this.subscribeToChanges(() => this.playerState.update());
    }

    public getPossibleItemNames(): string[] {
        const result: string[] = [];
        Dictionary.forEach(this.tradeItems, k => result.push(k));
        return result;
    }

    public getCreditsAfterTransaction(): number {
        return this.playerState.getCredits() + this.tradeValue;
    }

    public getTransactionValue(): number {
        return this.tradeValue;
    }

    public getStarshipCargoSizeAfterTransaction(): number {
        return this.starshipCargo.getCargoSize() + this.deltaStarshipCargoSize;
    }

    public getStarshipCapacity(): number {
        return this.starshipCargo.getCapacity();
    }

    public getTradeItemInfoByName(itemName: string): ITradeItemInfo {
        return this.tradeItems[itemName];
    }

    public getMaximalPossibleStarshipAmountOfItem(itemName: string): number {
        const tradeItem = this.tradeItems[itemName];
        const capFromCargoSize = this.getStarshipCapacity() - this.getStarshipCargoSizeAfterTransaction();
        const capFromPrice = Math.floor(this.getCreditsAfterTransaction() / tradeItem.getBuyPrice());
        const capFromStardockSupply = tradeItem.getStardockAmount();

        return tradeItem.getStarshipAmount() + Math.min(capFromCargoSize, capFromPrice, capFromStardockSupply);
    }

    public setStarshipAmountForItem(itemName: string, amount: number): void {
        const tradeItem = this.tradeItems[itemName];
        const delta = amount - tradeItem.getStarshipAmount();
        this.deltaStarshipCargoSize += delta;
        this.tradeValue -= tradeItem.getTradeValue();
        tradeItem.changeStarshipAmountBy(delta);
        this.tradeValue += tradeItem.getTradeValue();
        this.updateSubscribers();
    }

    public setStarshipAmountForAllToZero(): void {
        Dictionary.forEach(this.tradeItems, k => this.setStarshipAmountForItem(k, 0));
    }

    public commitTransaction(): void {
        Dictionary.forEach(this.tradeItems, k => this.commitTransactionForItem(k));
    }

    public commitTransactionForItem(itemName: string) {
        const item = this.tradeItems[itemName];
        this.starshipCargo.setAmountOfItem(item.getName(), item.getStarshipAmount());
        this.stardock.setAmountOfItem(item.getName(), item.getStardockAmount());
        this.playerState.changeCredits(item.getTradeValue());
        this.resetTradeItem(item);
        this.updateCommitSubscribers();
    }

    public reset() {
        Dictionary.forEach(this.tradeItems, (_, i) => this.resetTradeItem(i));
    }

    public resetTradeItem(item: TradeItem) {
        this.tradeValue -= item.getTradeValue();
        this.deltaStarshipCargoSize -= item.getDeltaStarshipAmount();
        this.createTradeItem(item.getName());
        this.updateSubscribers();
    }

    public subscribeToChanges(action: () => void) {
        this.changeListeners.push(action);
    }

    public subscribeToCommits(action: () => void) {
        this.commitListeners.push(action);
    }

    private createTradeItems() {
        this.stardock.getItemStores().forEach(i => this.createTradeItem(i.getName()));
    }

    private createTradeItem(name: string) {
        const stardockItem = this.stardock.getItemStores().filter(i => i.getName() == name)[0];
        const starshipItems = Dictionary.fromArray(this.starshipCargo.getCargoItems(), i => i.getName());

        const starshipAmount = starshipItems.hasOwnProperty(name) && starshipItems[name]
            ? starshipItems[name].getAmount()
            : 0;
        this.tradeItems[name] = new TradeItem(
            name,
            starshipAmount,
            stardockItem.getAmount(),
            stardockItem.getBuyPrice(),
            stardockItem.getSellPrice());
    }

    private updateSubscribers(): void {
        this.changeListeners.forEach(l => l());
    }

    private updateCommitSubscribers(): void {
        this.commitListeners.forEach(l => l());
    }
}