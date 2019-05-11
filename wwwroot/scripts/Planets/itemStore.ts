export class ItemStore {
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

}