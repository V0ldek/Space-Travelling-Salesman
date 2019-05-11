import {IDictionary} from "../dictionary.js";
import {IPlanet} from "../GameData/gameDataParser.js";
import {Planet} from "./planet.js";

export class PlanetManager {
    private readonly planets: IDictionary<Planet> = {};

    public constructor(planets: IDictionary<IPlanet>) {
        this.createPlanetsFromData(planets);
    }

    private createPlanetsFromData(planetData: IDictionary<IPlanet>) {
        for(const key in planetData) {
            if(planetData.hasOwnProperty(key)) {
                this.createPlanetFromData(key, planetData[key]);
            }
        }
    }

    private createPlanetFromData(key: string, planetData: IPlanet) {
        this.planets[key] = new Planet(key, planetData);
    }
}