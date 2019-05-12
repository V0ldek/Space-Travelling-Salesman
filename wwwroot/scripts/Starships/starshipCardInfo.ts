import {Point} from "../GameSystem/point.js";

export interface IStarshipCardInfo {
    getId(): number;

    getName(): string;

    getDestinationName(): string;

    getEta(): string;

    getPosition(): Point;
}