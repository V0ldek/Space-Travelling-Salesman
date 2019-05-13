import {View} from "./view.js";
import {ITemplateFactory} from "../Game/Templates/templateFactory.js";

export abstract class ModalView extends View {
    protected constructor(name: string, modalId: string, templateFactory: ITemplateFactory, root: HTMLElement = null) {
        super(name, templateFactory, root);
        this.setModalId(modalId);
    }

    private setModalId(modalId: string) {
        this.renderedTemplate.getElement().id = modalId;
    }
}