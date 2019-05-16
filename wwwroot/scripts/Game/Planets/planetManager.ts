import {Dictionary, IDictionary} from "../../dictionary.js";
import {IPlanet} from "../GameData/planet.js";
import {Planet} from "./planet.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {IStardockRepository} from "./stardockRepository.js";
import {Starship} from "../Starships/starship.js";
import {TradeManager} from "../Trade/tradeManager.js";
import {PlayerState} from "../Player/playerState.js";
import {IPlanetCardInfo} from "./planetCardInfo";

export class PlanetManager implements IUpdateable, IStardockRepository {
    private readonly playerState: PlayerState;
    private readonly planets: IDictionary<Planet> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly activeTradeManagersByPlanet: IDictionary<IDictionary<TradeManager>> = {};
    private nextPlanetId: number = 1;

    public constructor(planets: IDictionary<IPlanet>, playerState: PlayerState, templateFactory: ITemplateFactory) {
        this.playerState = playerState;
        this.templateFactory = templateFactory;
        this.createPlanetsFromData(planets);
    }

    public update(): void {
        Dictionary.forEach(this.planets, (_, p) => p.update());
    }

    public getAllPlanets(): IPlanetCardInfo[] {
        const result: IPlanetCardInfo[] = [];
        Dictionary.forEach(this.planets, (_, p) => result.push(p));
        return result;
    }

    public getAllStardockNames(): string[] {
        const result: string[] = [];
        Dictionary.forEach(this.planets, k => result.push(k));
        return result;
    }

    public getStardockByName(name: string): Planet {
        return this.planets[name];
    }

    public createTradeManagerBetweenStardockAndStarship(stardockName: string, starship: Starship) {
        const planet = this.getStardockByName(stardockName);
        const tradeManager = new TradeManager(
            planet,
            starship.getCargoHold(),
            this.playerState);
        this.activeTradeManagersByPlanet[planet.getName()][starship.getName()] = tradeManager;
        tradeManager.subscribeToCommits(
            () => this.resetAllActiveTradeManagersForPlanetExceptFor(planet.getName(), starship.getName()));
        return tradeManager;
    }

    private createPlanetsFromData(planetData: IDictionary<IPlanet>) {
        Dictionary.forEach(planetData, (k, p) => this.createPlanetFromData(k, p));
    }

    private createPlanetFromData(key: string, planetData: IPlanet) {
        this.planets[key] = new Planet(this.nextPlanetId, key, planetData, this.templateFactory);
        this.activeTradeManagersByPlanet[key] = {};
        ++this.nextPlanetId;
    }

    private resetAllActiveTradeManagersForPlanetExceptFor(planetName: string, starshipName: string): void {
        Dictionary.forEach(this.activeTradeManagersByPlanet[planetName], (k, t) => {
            if (k != starshipName) {
                t.reset();
            }
        });
    }
}