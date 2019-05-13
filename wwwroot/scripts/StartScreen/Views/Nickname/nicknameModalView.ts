import {ModalView} from "../../../Views/modalView.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {NicknameManager} from "../../Nickname/nicknameManager.js";

export class NicknameModalView extends ModalView {
    public constructor(templateFactory: ITemplateFactory) {
        super("nickname-modal", "nickname-modal", templateFactory);
        this.setInputValueToCurrentNickname();
        this.setButtonBehaviour();
    }

    protected getData(): IDictionary<string> {
        return {};
    }

    private setInputValueToCurrentNickname() {
        const inputElement = this.getInputElement();
        if(NicknameManager.getCurrentNickname()) {
            inputElement.value = NicknameManager.getCurrentNickname();
        }
    }

    private setButtonBehaviour() {
        const inputElement = this.getInputElement();
        const buttonElement = this.getButtonElement();
        buttonElement.addEventListener("click", () => {
           NicknameManager.setCurrentNickname(inputElement.value);
           window.location.href = "./game.html";
        });
    }

    private getInputElement(): HTMLInputElement {
        return this.renderedTemplate.getElement().querySelector("input.nickname-input");
    }

    private getButtonElement(): HTMLButtonElement {
        return this.renderedTemplate.getElement().querySelector("button.submit-nickname-button");
    }
}