import {Dictionary, IDictionary} from "../dictionary.js";
import {CargoItem} from "./cargoItem.js";
import {ICargoHoldInfo} from "./cargoHoldInfo.js";
import {ICargoItemInfo} from "./cargoItemInfo";

export class CargoHold implements ICargoHoldInfo {
    private readonly capacity: number;
    private readonly cargoSize: number = 0;
    private readonly cargoItems: IDictionary<CargoItem> = {};

    public constructor(capacity: number) {
        this.capacity = capacity;
    }

    public getCargoSize(): number {
        return this.cargoSize;
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public getCargoItems(): ICargoItemInfo[] {
        const result: ICargoItemInfo[] = [];
        Dictionary.forEach(this.cargoItems, (_, i) => result.push(i));
        return result;
    }
}