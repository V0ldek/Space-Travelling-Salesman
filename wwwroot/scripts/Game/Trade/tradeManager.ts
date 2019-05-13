import {ISpacedock} from "../Planets/spacedock.js";
import {PlayerState} from "../Player/playerState.js";
import {ITradeItemInfo} from "./tradeItemInfo.js";
import {TradeItem} from "./tradeItem.js";
import {IDictionary, Dictionary} from "../../dictionary.js";
import {CargoHold} from "../Starships/cargoHold.js";
import {IUpdateable} from "../GameSystem/updateable.js";

export class TradeManager {
    private readonly spacedock: ISpacedock;
    private readonly starshipCargo: CargoHold;
    private readonly playerState: PlayerState;
    private readonly tradeItems: IDictionary<TradeItem> = {};
    private readonly updateables: IUpdateable[] = [];
    private tradeValue: number = 0;
    private deltaStarshipCargoSize: number = 0;

    public constructor(spacedock: ISpacedock, starshipCargo: CargoHold, playerState: PlayerState) {
        this.spacedock = spacedock;
        this.starshipCargo = starshipCargo;
        this.playerState = playerState;
        this.createTradeItems();
        this.subscribeToChanges(this.playerState);
    }

    public getPossibleItemNames(): string[] {
        const result: string[] = [];
        Dictionary.forEach(this.tradeItems, k => result.push(k));
        return result;
    }

    public getCreditsAfterTransaction(): number {
        return this.playerState.getCredits() + this.tradeValue;
    }

    public getTransactionValue():  number {
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
        const capFromSpacedockSupply = tradeItem.getSpacedockAmount();

        return tradeItem.getStarshipAmount() + Math.min(capFromCargoSize, capFromPrice, capFromSpacedockSupply);
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
        this.spacedock.setAmountOfItem(item.getName(), item.getSpacedockAmount());
        this.playerState.changeCredits(item.getTradeValue());
        this.resetTradeItem(item);
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

    public subscribeToChanges(updateable: IUpdateable) {
        this.updateables.push(updateable);
    }

    private createTradeItems() {
        this.spacedock.getItemStores().forEach(i => this.createTradeItem(i.getName()));
    }

    private createTradeItem(name: string) {
        const spacedockItem = this.spacedock.getItemStores().filter(i => i.getName() == name)[0];
        const starshipItems = Dictionary.fromArray(this.starshipCargo.getCargoItems(), i => i.getName());

        const starshipAmount = starshipItems.hasOwnProperty(name) && starshipItems[name]
            ? starshipItems[name].getAmount()
            : 0;
        this.tradeItems[name] = new TradeItem(
            name,
            starshipAmount,
            spacedockItem.getAmount(),
            spacedockItem.getBuyPrice(),
            spacedockItem.getSellPrice());
    }

    private updateSubscribers(): void {
        this.updateables.forEach(u => u.update());
    }
}