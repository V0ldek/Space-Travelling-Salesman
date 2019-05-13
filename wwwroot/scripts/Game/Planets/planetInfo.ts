import {IPlanetCardInfo} from "./planetCardInfo.js";
import {IItemStoreInfo} from "./ItemStore/itemStoreInfo.js";

export interface IPlanetInfo extends IPlanetCardInfo {
    getItemStores(): IItemStoreInfo[]
}