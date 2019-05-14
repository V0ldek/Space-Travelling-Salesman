import {IPlanetCardInfo} from "./planetCardInfo.js";
import {IStarshipCardInfo} from "../Starships/starshipCardInfo.js";
import {IItemStoreInfo} from "./ItemStore/itemStoreInfo.js";

export interface ISpacedock extends IPlanetCardInfo {
    dockArrivingStarship(starship: IStarshipCardInfo): void;

    checkOutDepartingStarship(starshipName: string): void;

    forEachDockingShip(action: (s: IStarshipCardInfo) => void);

    getItemStores(): IItemStoreInfo[];

    setAmountOfItem(item: string, amount: number): void;
}