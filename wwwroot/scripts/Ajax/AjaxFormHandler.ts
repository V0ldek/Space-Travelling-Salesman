export class AjaxFormHandler {
    public static postAsJson(form: HTMLFormElement, url: string): Promise<boolean> {
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
        }).then(response => {
                if((response.status >= 200 && response.status < 300)) {
                    this.resetValidation(form);
                    return true;
                }
                else {
                    response.text()
                        .then(message => this.fillValidation(form, message));
                    return false;
                }
            })
            .catch(error => {
                this.fillValidation(form, error);
                return false;
            });
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