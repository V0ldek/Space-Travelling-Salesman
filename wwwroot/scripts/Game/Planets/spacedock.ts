import {IPlanetCardInfo} from "./planetCardInfo.js";
import {IStarshipCardInfo} from "../Starships/starshipCardInfo.js";
import {IItemStoreInfo} from "./ItemStore/itemStoreInfo.js";

export interface ISpacedock extends IPlanetCardInfo {
    dockArrivingStarship(starshipCardInfo: IStarshipCardInfo): void;

    checkOutDepartingStarship(starshipCardInfo: IStarshipCardInfo): void;

    getItemStores(): IItemStoreInfo[];

    setAmountOfItem(item: string, amount: number): void;
}