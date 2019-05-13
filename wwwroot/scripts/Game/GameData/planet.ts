import {IDictionary} from "../../dictionary.js";
import {IItemStore} from "./itemStore.js";

export interface IPlanet {
    available_items: IDictionary<IItemStore>;
    x: number;
    y: number;
}