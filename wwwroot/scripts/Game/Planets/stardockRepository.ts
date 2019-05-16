import {IStardock} from "./stardock.js";
import {Starship} from "../Starships/starship.js";

export interface IStardockRepository {
    getAllStardockNames(): string[];

    getStardockByName(name: string): IStardock;

    createTradeManagerBetweenStardockAndStarship(stardockName: string, spaceship: Starship);
}