import {IStarship} from "../GameData/gameDataParser.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {Point} from "../GameSystem/point.js";
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
    getPosition(): Point;
}

export class Starship implements IStarshipCardInfo, IUpdateable {
    private static readonly distancePerTick: number = 1.0;

    private readonly name: string;
    private readonly destinationPlanet: IPlanetCardInfo;
    private readonly cargoHold: CargoHold;
    private readonly planetRepository: IPlanetRepository;
    private readonly cardView: StarshipCardView;
    private position: Point;

    public constructor(
        name: string,
        data: IStarship,
        planetRepository: IPlanetRepository,
        templateFactory: ITemplateFactory) {
        this.name = name;
        this.cargoHold = new CargoHold(data.cargo_hold_size);
        this.planetRepository = planetRepository;
        this.destinationPlanet = planetRepository.getPlanetByName(data.position);
        this.position = new Point(
            this.destinationPlanet.getPosition().getX(),
            this.destinationPlanet.getPosition().getY());
        this.cardView = new StarshipCardView(this, templateFactory);

        if(name == "Millenium Falcon") {
            this.destinationPlanet = planetRepository.getPlanetByName("Alderaan");
        }
    }

    public getDestinationPlanetName(): string {
        return this.destinationPlanet.getName();
    }

    public getEta(): string {
        const euclideanDistance = this.getDistanceToDestination();
        const ticks = Math.ceil(euclideanDistance / Starship.distancePerTick);
        return ticks > 0 ? ` in ${GameClock.ticksToTimeString(ticks)}` : "";
    }

    public getName(): string {
        return this.name;
    }

    public getPosition(): Point {
        return this.position;
    }

    public update(): void {
        this.moveTowardsDestination();
        this.cardView.update();
    }

    private moveTowardsDestination(): void {
        const euclideanDistance = this.getDistanceToDestination();
        if(euclideanDistance == 0) {
            return;
        }
        if(euclideanDistance < Starship.distancePerTick) {
            this.position = this.destinationPlanet.getPosition();
            return;
        }
        const pointDifference = this.position.subtract(this.destinationPlanet.getPosition());
        const deltaX = -pointDifference.getX() * Starship.distancePerTick / euclideanDistance;
        const deltaY = -pointDifference.getY() * Starship.distancePerTick / euclideanDistance;

        this.position = this.position.add(new Point(deltaX, deltaY));
    }

    private getDistanceToDestination(): number {
        return this.position.euclideanDistanceTo(this.destinationPlanet.getPosition());
    }
}