export interface ITradeItemInfo {
    getName(): string;

    getStarshipAmount(): number;

    getSpacedockAmount(): number;

    getBuyPrice(): number;

    getSellPrice(): number;
}