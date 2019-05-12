export interface IItemStoreInfo {
    getName(): string;
    getBuyPrice(): number;
    getSellPrice(): number;
    getAmount(): number;
}

export class ItemStore implements IItemStoreInfo {
    private readonly name: string;
    private readonly buyPrice: number;
    private readonly sellPrice: number;
    private amount: number;

    public constructor(name: string, amount: number, buyPrice: number, sellPrice: number) {
        this.name = name;
        this.amount = amount;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
    }

    public getName(): string {
        return this.name;
    }

    public getBuyPrice(): number {
        return this.buyPrice;
    }

    public getSellPrice(): number {
        return this.sellPrice;
    }

    public getAmount(): number {
        return this.amount;
    }
}