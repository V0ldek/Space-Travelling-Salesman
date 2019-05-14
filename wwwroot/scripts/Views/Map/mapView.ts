import {View} from "../view.js";
import {PlanetManager} from "../../Game/Planets/planetManager.js";
import {StarshipManager} from "../../Game/Starships/starshipManager.js";
import {ITemplateFactory} from "../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {IPlanetCardInfo} from "../../Game/Planets/planetCardInfo.js";
import {IStarshipCardInfo} from "../../Game/Starships/starshipCardInfo.js";
import {MapIconView} from "./mapIconView.js";
import {PlanetMapIconView} from "./planetMapIconView.js";
import {StarshipMapIconView} from "./starshipMapIconView.js";
import {Point} from "../../Game/GameSystem/point.js";

export class MapView extends View {
    private readonly planetManager: PlanetManager;
    private readonly starshipManager: StarshipManager;
    private readonly planetIcons: PlanetMapIconView[] = [];
    private readonly starshipIcons: StarshipMapIconView[] = [];

    private static readonly MinOffset = -60.0;
    private static readonly MaxOffset = 10.0;
    private static readonly DragSpeed = 0.1;
    private leftOffset = 0.0;
    private topOffset = 0.0;
    private dragging = false;

    private static readonly MinScale = 5.5;
    private static readonly MaxScale = 15.0;
    private static readonly ScaleSpeed = 0.3;
    private scale: number = 10.0;

    public constructor(planetManager: PlanetManager,
                       starshipManager: StarshipManager,
                       templateFactory: ITemplateFactory) {
        super("game-map", templateFactory);
        this.planetManager = planetManager;
        this.starshipManager = starshipManager;
        this.generatePlanetIcons();
        this.generateStarshipIcons();
        this.setBehaviour();
        this.update();
    }

    public update(): void {
        super.update();
        this.positionAllIcons();
        this.updateAllIcons();
    }

    protected getData(): IDictionary<string> {
        return {};
    }

    private generatePlanetIcons() {
        this.planetManager.getAllPlanets().forEach(p => this.createPlanetIcon(p));
    }

    private createPlanetIcon(planetCardInfo: IPlanetCardInfo) {
        this.planetIcons.push(new PlanetMapIconView(
            planetCardInfo,
            this.renderedTemplate.getElement(),
            this.templateFactory));
    }

    private generateStarshipIcons() {
        this.starshipManager.getAllStarships().forEach(p => this.createStarshipIcon(p));
    }

    private createStarshipIcon(starshipCardInfo: IStarshipCardInfo) {
        this.starshipIcons.push(new StarshipMapIconView(
            starshipCardInfo,
            this.renderedTemplate.getElement(),
            this.templateFactory));
    }

    private positionAllIcons() {
        this.planetIcons.forEach(p => this.positionIcon(p));
        this.starshipIcons.forEach(s => this.positionIcon(s));
    }

    private positionIcon(icon: MapIconView) {
        const position = icon.getRepresentedObjectPosition()
            .add(new Point(this.leftOffset, this.topOffset));
        icon.setRelativePosition(position.scale(this.scale));
    }

    private updateAllIcons() {
        this.planetIcons.forEach(p => p.update());
        this.starshipIcons.forEach(s => s.update());
    }

    private setBehaviour(): void {
        this.setScrollBehaviour();
        this.setDragBehaviour();
    }

    private setScrollBehaviour(): void {
        this.renderedTemplate.getElement().addEventListener("wheel", e => {
            const oldScale = this.scale;
            this.increaseScale(-e.deltaY * MapView.ScaleSpeed);
            const relativePosition = this.globalToRelativeMousePosition(new Point(e.x, e.y));
            const relativePositionDifference =
                relativePosition.scale(this.scale / oldScale).subtract(relativePosition).scale(1 / this.scale);
            console.log(relativePosition);
            console.log(relativePositionDifference);
            this.increaseTopOffset(-relativePositionDifference.getY());
            this.increaseLeftOffset(-relativePositionDifference.getX());
            this.update();
            console.log(e);
        });
    }

    private setDragBehaviour(): void {
        const element = this.renderedTemplate.getElement();
        element.addEventListener("mousedown", () => {
            this.dragging = true;
        });

        element.addEventListener("mousemove", e => {
            if (!this.dragging) {
                return;
            }
            this.increaseTopOffset(e.movementY * MapView.DragSpeed);
            this.increaseLeftOffset(e.movementX * MapView.DragSpeed);
            this.update();
        });

        window.addEventListener("mouseup", () => {
            this.dragging = false;
        })
    }

    private increaseScale(number: number) {
        this.scale += number;
        this.scale = MapView.clamp(this.scale, MapView.MinScale, MapView.MaxScale);
    }

    private increaseTopOffset(number: number) {
        this.topOffset += number;
        this.topOffset = MapView.clamp(this.topOffset, MapView.MinOffset, MapView.MaxOffset);
    }

    private increaseLeftOffset(number: number) {
        this.leftOffset += number;
        this.leftOffset = MapView.clamp(this.leftOffset, MapView.MinOffset, MapView.MaxOffset);
    }

    private static clamp(number: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, number));
    }

    private globalToRelativeMousePosition(globalPosition: Point) {
        const element = this.renderedTemplate.getElement();
        const thisLeft = element.offsetLeft;
        const thisTop = element.offsetTop;

        return new Point(
            globalPosition.getX() - thisLeft - this.leftOffset,
            globalPosition.getY() - thisTop - this.topOffset
        );
    }
}