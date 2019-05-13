import {View} from "./view.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";

export abstract class ModalTriggerView extends View {
    protected constructor(name: string, targetId: string, templateFactory: ITemplateFactory, root: HTMLElement = null) {
        super(name, templateFactory, root);
        this.setModalData(targetId);
    }

    private setModalData(targetId: string) {
        this.renderedTemplate.getElement().addEventListener("click", () => {
            const target = document.querySelector(`#${targetId}`);
            target.removeAttribute("hidden");
        });
    }
}