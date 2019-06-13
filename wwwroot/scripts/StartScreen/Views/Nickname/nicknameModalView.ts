import {ModalView} from "../../../Views/modalView.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {NicknameManager} from "../../Nickname/nicknameManager.js";
import {AjaxFormHandler} from "../../../Ajax/AjaxFormHandler.js";

export class NicknameModalView extends ModalView {
    public constructor(templateFactory: ITemplateFactory) {
        super("nickname-modal", "nickname-modal", templateFactory);
        if (!NicknameManager.isGuest()) {
            this.toggleLoggedInMode();
        }
        this.setSubmitBehaviour();
    }

    protected getData(): IDictionary<string> {
        return {
            username: NicknameManager.getCurrentNickname()
        };
    }

    private setSubmitBehaviour() {
        this.setLoginSubmitBehaviour();
        this.setLogoutSubmitBehaviour();
        this.setRegisterSubmitBehaviour();
        this.setStartSubmitBehaviour();
    }

    private setStartSubmitBehaviour() {
        const formElement = this.getStartFormElement();
        formElement.addEventListener("submit", e => {
            NicknameModalView.redirectToGame();
            e.preventDefault();
        });
    }

    private setLoginSubmitBehaviour() {
        const formElement = this.getLoginFormElement();
        formElement.addEventListener("submit", e => {
            AjaxFormHandler.postAsJson(formElement, "/users/login")
                .then(success => {
                    if (success) {
                        formElement.reset();
                        this.update();
                        this.toggleLoggedInMode();
                    }
                });
            e.preventDefault();
        });
    }

    private setLogoutSubmitBehaviour() {
        const formElement = this.getLogoutFormElement();
        formElement.addEventListener("submit", e => {
            AjaxFormHandler.postAsJson(formElement, "/users/logout")
                .then(success => {
                    if (success) {
                        formElement.reset();
                        this.update();
                        this.toggleLoggedInMode();
                    }
                });
            e.preventDefault();
        });
    }

    private setRegisterSubmitBehaviour() {
        const formElement = this.getRegisterFormElement();
        formElement.addEventListener("submit", e => {
            AjaxFormHandler.postAsJson(formElement, "/users/register")
                .then(success => {
                    if (success) {
                        formElement.reset();
                        alert("Account created!");
                    }
                });
            e.preventDefault();
        });
    }

    private toggleLoggedInMode() {
        const loginForm = this.getLoginFormElement();
        const logoutForm = this.getLogoutFormElement();
        const startButton = this.getStartButtonElement();
        loginForm.toggleAttribute("hidden");
        logoutForm.toggleAttribute("hidden");
        startButton.innerText = `Play as ${NicknameManager.getCurrentNickname()}`;
    }

    private getStartFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.start-game-form");
    }

    private getStartButtonElement(): HTMLButtonElement {
        return this.getStartFormElement().querySelector("button.start-game-button");
    }

    private getLoginFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.login-form");
    }

    private getLogoutFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.logout-form");
    }

    private getRegisterFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.register-form");
    }

    private static redirectToGame() {
        window.location.href = "./game.html";
    }
}