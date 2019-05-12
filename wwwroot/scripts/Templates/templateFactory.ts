import {RenderedTemplate} from "./renderedTemplate.js";
import {TemplateRenderer} from "./templateRenderer.js";

export interface ITemplateFactory {
    createTemplate(name: string): RenderedTemplate;
    createTemplate(name: string, root: HTMLElement): RenderedTemplate;
}

export class TemplateFactory implements ITemplateFactory {
    public createTemplate(name: string, root: HTMLElement = document.querySelector("body")): RenderedTemplate {
        const templateRenderer = new TemplateRenderer(name, root);
        return templateRenderer.render();
    }
}