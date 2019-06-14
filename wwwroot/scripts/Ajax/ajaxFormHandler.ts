export class AjaxFormHandler {
    public static postAsJson(form: HTMLFormElement, url: string = null): Promise<boolean> {
        if (!url) {
            url = form.action;
        }
        const payload = {};
        form.querySelectorAll("input, select").forEach(
            (input: HTMLInputElement | HTMLSelectElement) => {
                payload[input.name] = input.value;
            });

        return fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(payload)
        }).then(response => this.handleFulfilled(form, response)
        ).catch(error => this.handleError(form, error));
    }

    public static postMultipart(form: HTMLFormElement, url: string = null): Promise<boolean> {
        if (!url) {
            url = form.action;
        }
        const payload = new FormData();
        form.querySelectorAll("input:not([type=file]), select").forEach(
            (input: HTMLInputElement | HTMLSelectElement) => {
                payload.append(input.name, input.value);
            });
        form.querySelectorAll("input[type=file]").forEach(
            (input: HTMLInputElement) => {
                for (let i = 0; i < input.files.length; ++i) {
                    payload.append(input.name, input.files[i]);
                }
            }
        );
        return fetch(url, {
            method: "post",
            body: payload
        }).then(response => this.handleFulfilled(form, response)
        ).catch(error => this.handleError(form, error));
    }

    private static handleFulfilled(form: HTMLFormElement, response): boolean {
        if ((response.status >= 200 && response.status < 300)) {
            this.resetValidation(form);
            return true;
        } else {
            response.text()
                .then(message => this.fillValidation(form, message));
            return false;
        }
    }

    private static handleError(form: HTMLFormElement, error): boolean {
        this.fillValidation(form, error);
        return false;
    }

    private static resetValidation(form: HTMLFormElement) {
        this.fillValidation(form, "");
    }

    private static fillValidation(form: HTMLFormElement, error: string) {
        const validation = form.querySelector("p.validation") as HTMLParagraphElement;
        if (validation) {
            validation.innerText = error;
        }
    }
}