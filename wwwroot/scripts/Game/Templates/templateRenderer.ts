import {RenderedTemplate} from "./renderedTemplate.js";

export class TemplateRenderer {
    private readonly name: string;
    private readonly root: HTMLElement;
    private readonly templateElement: HTMLTemplateElement;
    private readonly renderElement: HTMLElement;
    private nextId: number = 1;

    constructor(name: string, root: HTMLElement) {
        console.warn("Rendering " + name);
        this.name = name;
        this.root = root;
        this.templateElement = this.getTemplateElement();
        this.renderElement = this.getRenderElement();
    }

    public render(): RenderedTemplate {
        const templateInstance = this.renderTemplateToRenderElement();
        return new RenderedTemplate(templateInstance);
    }

    private getTemplateElement(): HTMLTemplateElement {
        return document.querySelector(`template#template-${this.name}`);
    }

    private getRenderElement(): HTMLElement {
        return this.root.querySelector(`.render-${this.name}`);
    }

    private renderTemplateToRenderElement(): HTMLElement {
        const templateRoot = this.templateElement.content.querySelector(".template-root");
        const templateInstance = templateRoot.cloneNode(true) as HTMLElement;
        this.setTemplateInstanceId(templateInstance);
        this.renderElement.appendChild(templateInstance);
        return templateInstance;
    }

    private setTemplateInstanceId(templateInstance: HTMLElement): void {
        templateInstance.id = `rendered-template-instance-${this.nextId}`;
        this.nextId++;
    }
}