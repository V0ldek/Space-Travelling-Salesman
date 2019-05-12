import {IPlanetCardInfo} from "./planetCardInfo.js";
import {IStarshipCardInfo} from "../Starships/starshipCardInfo.js";

export interface ISpacedock extends IPlanetCardInfo {
    dockArrivingStarship(starshipCardInfo: IStarshipCardInfo): void;

    checkOutDepartingStarship(starshipCardInfo: IStarshipCardInfo): void;
}