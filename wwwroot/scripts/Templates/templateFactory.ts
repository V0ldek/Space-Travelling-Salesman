import {RenderedTemplate} from "./renderedTemplate.js";
import {TemplateRenderer} from "./templateRenderer.js";

export interface ITemplateFactory {
    createTemplate(name: string): RenderedTemplate;
}

export class TemplateFactory implements ITemplateFactory {
    public createTemplate(name: string): RenderedTemplate {
        const templateRenderer = new TemplateRenderer(name);
        return templateRenderer.render();
    }
}