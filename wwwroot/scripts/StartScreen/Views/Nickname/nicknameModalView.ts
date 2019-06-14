import {ModalView} from "../../../Views/modalView.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {NicknameManager} from "../../Nickname/nicknameManager.js";
import {AjaxFormHandler} from "../../../Ajax/ajaxFormHandler.js";

export class NicknameModalView extends ModalView {
    public constructor(templateFactory: ITemplateFactory) {
        super("nickname-modal", "nickname-modal", templateFactory);
        if (!NicknameManager.isGuest()) {
            this.toggleLoggedInMode();
        }
        this.setSubmitBehaviour();
        this.populateMapSelect();
        this.update();
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
        this.setUploadMapSubmitBehaviour();
    }

    private setStartSubmitBehaviour() {
        const formElement = this.getStartFormElement();
        formElement.addEventListener("submit", e => {
            this.redirectToGame();
            e.preventDefault();
        });
    }

    private setLoginSubmitBehaviour() {
        const formElement = this.getLoginFormElement();
        formElement.addEventListener("submit", e => {
            AjaxFormHandler.postAsJson(formElement)
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
            AjaxFormHandler.postAsJson(formElement)
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
            AjaxFormHandler.postAsJson(formElement)
                .then(success => {
                    if (success) {
                        formElement.reset();
                        alert("Account created!");
                    }
                });
            e.preventDefault();
        });
    }

    private setUploadMapSubmitBehaviour() {
        const formElement = this.getUploadMapFormElement();
        formElement.addEventListener("submit", e => {
            console.error(formElement);
            AjaxFormHandler.postMultipart(formElement)
                .then(success => {
                    if (success) {
                        formElement.reset();
                        this.populateMapSelect();
                        alert("Map uploaded!");
                    }
                });
            e.preventDefault();
        });
    }

    private toggleLoggedInMode() {
        const loginForm = this.getLoginFormElement();
        const logoutForm = this.getLogoutFormElement();
        const uploadForm = this.getUploadMapFormElement();
        const startButton = this.getStartButtonElement();
        loginForm.toggleAttribute("hidden");
        logoutForm.toggleAttribute("hidden");
        uploadForm.toggleAttribute("hidden");
        startButton.innerText = `Play as ${NicknameManager.getCurrentNickname()}`;
    }

    private populateMapSelect() {
        const selectElement = this.getSelectMapElement();
        fetch("/maps",
            {
                method: "get"
            })
            .then(response => {
                if ((response.status < 200 || response.status >= 300)) {
                    throw new Error("Fetching map names failed.");
                }
                return response.json();
            })
            .then(json => {
                for (let i = selectElement.length - 1; i >= 0; --i) {
                    selectElement.options.remove(i);
                }
                for (let map of json) {
                    const option = document.createElement("option");
                    option.text = map.name;
                    option.value = map.id;
                    selectElement.options.add(option);
                }
            })
            .catch(error => {
                throw new Error(error);
            });
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

    private getSelectMapFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.select-map-form");
    }

    private getUploadMapFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.upload-map-form");
    }

    private getSelectMapElement(): HTMLSelectElement {
        return this.getSelectMapFormElement().querySelector("select[name=mapName]") as HTMLSelectElement;
    }

    private redirectToGame() {
        const selectedMapId = this.getSelectMapElement().value;
        window.location.href = `./game.html?${selectedMapId}`;
    }
}