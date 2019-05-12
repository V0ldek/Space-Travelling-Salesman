import {IStarshipCardInfo} from "./starshipCardInfo.js";
import {ICargoHoldInfo} from "./cargoHoldInfo.js";

export interface IStarshipInfo extends IStarshipCardInfo {
    getCargoHold(): ICargoHoldInfo;

    getPossibleDestinations(): string[];
}