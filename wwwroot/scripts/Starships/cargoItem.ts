import {ICargoItemInfo} from "./cargoItemInfo.js";

export class CargoItem implements ICargoItemInfo {
    private readonly name: string;
    private amount: number;

    public constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    public getName(): string {
        return this.name;
    }

    public getAmount(): number {
        return this.amount;
    }
}