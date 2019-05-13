import {ModalTriggerView} from "../../../Views/modalTriggerView.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";

export class NicknameTriggerView extends ModalTriggerView {
    public constructor(templateFactory: ITemplateFactory) {
        super("nickname-trigger", "nickname-modal", templateFactory);
    }

    protected getData(): IDictionary<string> {
        return {};
    }
}