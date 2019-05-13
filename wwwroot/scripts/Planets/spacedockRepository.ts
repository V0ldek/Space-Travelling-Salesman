import {ISpacedock} from "./spacedock.js";
import {Starship} from "../Starships/starship.js";

export interface ISpacedockRepository {
    getAllSpacedockNames(): string[];

    getSpacedockByName(name: string): ISpacedock;

    createTradeManagerBetweenSpacedockAndStarship(spaceDockName: string, spaceship: Starship);
}