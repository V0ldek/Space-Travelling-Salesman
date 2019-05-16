import {Dictionary, IDictionary} from "../../dictionary.js";
import {CargoItem} from "./cargoItem.js";
import {ICargoHoldInfo} from "./cargoHoldInfo.js";
import {ICargoItemInfo} from "./cargoItemInfo";

export class CargoHold implements ICargoHoldInfo {
    private readonly capacity: number;
    private readonly cargoItems: IDictionary<CargoItem> = {};
    private cargoSize: number = 0;

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

    public setAmountOfItem(item: string, amount: number) {
        if (!this.cargoItems.hasOwnProperty(item) || !this.cargoItems[item]) {
            this.cargoItems[item] = new CargoItem(item, 0);
        }
        const delta = amount - this.cargoItems[item].getAmount();
        if (amount === 0) {
            this.cargoItems[item] = null;
        } else {
            this.cargoItems[item].setAmount(amount);
        }
        this.cargoSize += delta;
    }
}