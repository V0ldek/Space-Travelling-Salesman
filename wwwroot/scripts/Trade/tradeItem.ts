import {ITradeItemInfo} from "./tradeItemInfo.js";

export class TradeItem implements ITradeItemInfo {
    private readonly name: string;
    private readonly buyPrice: number;
    private readonly sellPrice: number;
    private readonly originalStarshipAmount: number;
    private starshipAmount: number;
    private spacedockAmount: number;

    public constructor(name: string,
                       starshipAmount: number,
                       spacedockAmount: number,
                       buyPrice: number,
                       sellPrice: number) {
        this.name = name;
        this.originalStarshipAmount = starshipAmount;
        this.starshipAmount = starshipAmount;
        this.spacedockAmount = spacedockAmount;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
    }

    public getName(): string {
        return this.name;
    }

    public getStarshipAmount(): number {
        return this.starshipAmount;
    }

    public getSpacedockAmount(): number {
        return this.spacedockAmount;
    }

    public changeStarshipAmountBy(delta: number) {
        if (delta > this.spacedockAmount) {
            throw new Error(
                `Attempt to change starship amount of ${this.name} 
                from ${this.starshipAmount} by ${delta} 
                would cause the spacedock supply at ${this.spacedockAmount} to go negative.`);
        }
        const newStarshipAmount = this.starshipAmount + delta;
        if (newStarshipAmount < 0) {
            throw new Error(
                `Attempt to set starship amount of ${this.name} 
                to a negative value of ${newStarshipAmount}.`);
        }
        this.starshipAmount = newStarshipAmount;
        this.spacedockAmount -= delta;
    }

    public getBuyPrice(): number {
        return this.buyPrice;
    }

    public getSellPrice(): number {
        return this.sellPrice;
    }

    public getTradeValue(): number {
        const delta = this.starshipAmount - this.originalStarshipAmount;
        if(delta < 0) {
            return -(delta * this.sellPrice);
        }
        else {
            return -(delta * this.buyPrice);
        }
    }
}