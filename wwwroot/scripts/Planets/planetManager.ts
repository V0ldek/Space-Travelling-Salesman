import {IDictionary} from "../dictionary.js";
import {IPlanet} from "../GameData/gameDataParser.js";
import {Planet} from "./planet.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";

export class PlanetManager implements IUpdateable {
    private readonly planets: IDictionary<Planet> = {};
    private readonly templateFactory: ITemplateFactory;

    public constructor(planets: IDictionary<IPlanet>, templateFactory: ITemplateFactory) {
        this.templateFactory = templateFactory;
        this.createPlanetsFromData(planets);
    }

    public update(): void {
        for(const key in this.planets) {
            if(this.planets.hasOwnProperty(key)) {
                this.planets[key].update();
            }
        }
    }

    private createPlanetsFromData(planetData: IDictionary<IPlanet>) {
        for(const key in planetData) {
            if(planetData.hasOwnProperty(key)) {
                this.createPlanetFromData(key, planetData[key]);
            }
        }
    }

    private createPlanetFromData(key: string, planetData: IPlanet) {
        this.planets[key] = new Planet(key, planetData, this.templateFactory);
    }
}