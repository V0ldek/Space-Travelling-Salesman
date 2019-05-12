import {IDictionary} from "../dictionary.js";
import {IPlanet} from "./planet.js";
import {IStarship} from "./starship.js";

export interface IGameData {
    game_duration: number;
    initial_credits: number;
    items: string[];
    planets: IDictionary<IPlanet>;
    starships: IDictionary<IStarship>;
}