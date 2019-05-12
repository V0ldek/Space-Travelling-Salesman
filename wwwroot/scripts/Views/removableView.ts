import {View} from "./view.js";

export abstract class RemovableView extends View {
    public remove(): void {
        this.renderedTemplate.remove();
    }
}