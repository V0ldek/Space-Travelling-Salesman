export interface ITradeItemInfo {
    getName(): string;

    getStarshipAmount(): number;

    getStardockAmount(): number;

    getBuyPrice(): number;

    getSellPrice(): number;
}