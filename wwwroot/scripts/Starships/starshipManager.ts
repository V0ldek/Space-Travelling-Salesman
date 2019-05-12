import {IUpdateable} from "../GameSystem/updateable.js";
import {Dictionary, IDictionary} from "../dictionary.js";
import {Starship} from "../Starships/starship.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IStarship} from "../GameData/gameDataParser.js";
import {ISpacedockRepository} from "../Planets/planetManager.js";

export class StarshipManager implements IUpdateable {
    private readonly starships: IDictionary<Starship> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly planetRepository: ISpacedockRepository;
    private nextId: number = 1;

    public constructor(
        starships: IDictionary<IStarship>,
        planetRepository: ISpacedockRepository,
        templateFactory: ITemplateFactory) {
        this.planetRepository = planetRepository;
        this.templateFactory = templateFactory;
        this.createStarshipsFromData(starships);
    }

    public update(): void {
        Dictionary.forEach(this.starships, (_, s) => s.update());
    }

    private createStarshipsFromData(starshipData: IDictionary<IStarship>) {
        Dictionary.forEach(starshipData, (k, s) => this.createStarshipFromData(k, s));
    }

    private createStarshipFromData(key: string, starshipData: IStarship) {
        this.starships[key] = new Starship(this.nextId, key, starshipData, this.planetRepository, this.templateFactory);
        ++this.nextId;
    }
}