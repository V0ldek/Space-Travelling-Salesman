import {IStarship} from "../GameData/gameDataParser.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IPositionInfo, Position} from "../GameSystem/position.js";
import {IPlanetCardInfo} from "../Planets/planet.js";
import {CargoHold} from "./cargoHold.js";
import {StarshipCardView} from "../Views/starshipCardView.js";
import {IPlanetRepository} from "../Planets/planetManager.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {GameClock} from "../GameSystem/gameClock.js";

export interface IStarshipCardInfo {
    getName(): string;
    getDestinationPlanetName(): string;
    getEta(): string;
    getPosition(): IPositionInfo;
}

export class Starship implements IStarshipCardInfo, IUpdateable {
    private static readonly distancePerTick: number = 1.0;

    private readonly name: string;
    private readonly destinationPlanet: IPlanetCardInfo;
    private readonly position: Position;
    private readonly cargoHold: CargoHold;
    private readonly planetRepository: IPlanetRepository;
    private readonly cardView: StarshipCardView;

    public constructor(
        name: string,
        data: IStarship,
        planetRepository: IPlanetRepository,
        templateFactory: ITemplateFactory) {
        this.name = name;
        this.cargoHold = new CargoHold(data.cargo_hold_size);
        this.planetRepository = planetRepository;
        this.destinationPlanet = planetRepository.getPlanetByName(data.position);
        this.position = new Position(
            this.destinationPlanet.getPosition().getX(),
            this.destinationPlanet.getPosition().getY());
        this.cardView = new StarshipCardView(this, templateFactory);
    }

    public getDestinationPlanetName(): string {
        return this.destinationPlanet.getName();
    }

    public getEta(): string {
        const euclideanDifference = this.position.euclideanDistanceTo(this.destinationPlanet.getPosition());
        const ticks = Math.ceil(euclideanDifference / Starship.distancePerTick);
        return ticks > 0 ? ` in ${GameClock.ticksToTimeString(ticks)}` : "";
    }

    public getName(): string {
        return this.name;
    }

    public getPosition(): IPositionInfo {
        return this.position;
    }

    public update(): void {
        this.cardView.update();
    }
}