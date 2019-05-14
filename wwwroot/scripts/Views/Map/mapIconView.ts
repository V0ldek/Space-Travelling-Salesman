import {Point} from "../../Game/GameSystem/point.js";
import {ITemplateFactory} from '../../Game/Templates/templateFactory.js';
import {ModalTriggerView} from "../modalTriggerView.js";

export abstract class MapIconView extends ModalTriggerView {
    protected constructor(name: string,
                          modalName: string,
                          templateFactory: ITemplateFactory,
                          root: HTMLElement = null) {
        super(name, modalName, templateFactory, root);
    }

    public abstract getRepresentedObjectPosition(): Point;

    public setRelativePosition(position: Point): void {
        const element = this.renderedTemplate.getElement();
        element.style.top = `${position.getY()}px`;
        element.style.left = `${position.getX()}px`;
    }
}