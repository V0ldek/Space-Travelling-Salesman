import {IUpdateable} from "../GameSystem/updateable.js";
import {IDictionary} from "../dictionary.js";
import {Starship} from "../Starships/starship.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IStarship} from "../GameData/gameDataParser.js";
import {IPlanetRepository} from "../Planets/planetManager.js";

export class StarshipManager implements IUpdateable{
    private readonly starships: IDictionary<Starship> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly planetRepository: IPlanetRepository;

    public constructor(
        starships: IDictionary<IStarship>,
        planetRepository: IPlanetRepository,
        templateFactory: ITemplateFactory) {
        this.planetRepository = planetRepository;
        this.templateFactory = templateFactory;
        this.createPlanetsFromData(starships);
    }

    public update(): void {
        for(const key in this.starships) {
            if(this.starships.hasOwnProperty(key)) {
                this.starships[key].update();
            }
        }
    }

    private createPlanetsFromData(planetData: IDictionary<IStarship>) {
        for(const key in planetData) {
            if(planetData.hasOwnProperty(key)) {
                this.createPlanetFromData(key, planetData[key]);
            }
        }
    }

    private createPlanetFromData(key: string, starshipData: IStarship) {
        this.starships[key] = new Starship(key, starshipData, this.planetRepository, this.templateFactory);
    }
}