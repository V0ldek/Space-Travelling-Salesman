import {ICargoItemInfo} from "./cargoItemInfo.js";

export interface ICargoHoldInfo {
    getCargoSize(): number;

    getCapacity(): number;

    getCargoItems(): ICargoItemInfo[];
}