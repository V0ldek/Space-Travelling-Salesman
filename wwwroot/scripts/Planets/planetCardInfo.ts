import {Point} from "../GameSystem/point.js";

export interface IPlanetCardInfo {
    getId(): number,

    getName(): string;

    getPosition(): Point;
}