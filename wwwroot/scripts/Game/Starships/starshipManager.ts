import {IUpdateable} from "../GameSystem/updateable.js";
import {Dictionary, IDictionary} from "../../dictionary.js";
import {Starship} from "./starship.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IStarship} from "../GameData/starship.js";
import {IStardockRepository} from "../Planets/stardockRepository.js";
import {IStarshipCardInfo} from "./starshipCardInfo";

export class StarshipManager implements IUpdateable {
    private readonly starships: IDictionary<Starship> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly planetRepository: IStardockRepository;
    private nextId: number = 1;

    public constructor(starships: IDictionary<IStarship>,
                       planetRepository: IStardockRepository,
                       templateFactory: ITemplateFactory) {
        this.planetRepository = planetRepository;
        this.templateFactory = templateFactory;
        this.createStarshipsFromData(starships);
    }

    public update(): void {
        Dictionary.forEach(this.starships, (_, s) => s.update());
    }

    public getAllStarships(): IStarshipCardInfo[] {
        const result: IStarshipCardInfo[] = [];
        Dictionary.forEach(this.starships, (_, s) => result.push(s));
        return result;
    }

    private createStarshipsFromData(starshipData: IDictionary<IStarship>): void {
        Dictionary.forEach(starshipData, (k, s) => this.createStarshipFromData(k, s));
    }

    private createStarshipFromData(key: string, starshipData: IStarship): void {
        this.starships[key] = new Starship(this.nextId, key, starshipData, this.planetRepository, this.templateFactory);
        ++this.nextId;
    }
}