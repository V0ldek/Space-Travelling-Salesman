import {ModalView} from "../../../Views/modalView.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {NicknameManager} from "../../Nickname/nicknameManager.js";

export class NicknameModalView extends ModalView {
    public constructor(templateFactory: ITemplateFactory) {
        super("nickname-modal", "nickname-modal", templateFactory);
        this.setInputValueToCurrentNickname();
        this.setSubmitBehaviour();
    }

    protected getData(): IDictionary<string> {
        return {};
    }

    private setInputValueToCurrentNickname() {
        const inputElement = this.getInputElement();
        if (NicknameManager.getCurrentNickname()) {
            inputElement.value = NicknameManager.getCurrentNickname();
        }
    }

    private setSubmitBehaviour() {
        const inputElement = this.getInputElement();
        const formElement = this.getFormElement();
        formElement.addEventListener("submit", e => {
            if (!inputElement.value) {
                return;
            }
            NicknameManager.setCurrentNickname(inputElement.value);
            window.location.href = "./game.html";
            e.preventDefault();
        });
    }

    private getInputElement(): HTMLInputElement {
        return this.renderedTemplate.getElement().querySelector("input.nickname-input");
    }

    private getFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.nickname-form");
    }
}