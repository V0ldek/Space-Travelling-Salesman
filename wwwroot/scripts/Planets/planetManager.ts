import {Dictionary, IDictionary} from "../dictionary.js";
import {IPlanet} from "../GameData/gameDataParser.js";
import {ISpacedock, Planet} from "./planet.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";

export interface ISpacedockRepository {
    getAllSpacedockNames(): string[];
    getSpacedockByName(name: string): ISpacedock;
}

export class PlanetManager implements IUpdateable, ISpacedockRepository {
    private readonly planets: IDictionary<Planet> = {};
    private readonly templateFactory: ITemplateFactory;
    private nextId: number = 1;

    public constructor(planets: IDictionary<IPlanet>, templateFactory: ITemplateFactory) {
        this.templateFactory = templateFactory;
        this.createPlanetsFromData(planets);
    }

    public update(): void {
        Dictionary.forEach(this.planets, (_, p) => p.update());
    }

    public getAllSpacedockNames(): string[] {
        const result: string[] = [];
        Dictionary.forEach(this.planets,  (k, _) => result.push(k));
        return result;
    }

    public getSpacedockByName(name: string): Planet {
        return this.planets[name];
    }

    private createPlanetsFromData(planetData: IDictionary<IPlanet>) {
        Dictionary.forEach(planetData, (k, p) => this.createPlanetFromData(k, p));
    }

    private createPlanetFromData(key: string, planetData: IPlanet) {
        this.planets[key] = new Planet(this.nextId, key, planetData, this.templateFactory);
        ++this.nextId;
    }
}