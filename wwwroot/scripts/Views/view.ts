import {ITemplateFactory} from "../Templates/templateFactory.js";
import {RenderedTemplate} from "../Templates/renderedTemplate.js";
import {IUpdateable} from "../GameSystem/updateable.js";

export abstract class View implements IUpdateable {
    protected readonly name;
    protected readonly renderedTemplate: RenderedTemplate;
    private readonly templateFactory: ITemplateFactory;

    protected constructor(name: string, templateFactory: ITemplateFactory) {
        this.name = name;
        this.templateFactory = templateFactory;
        this.renderedTemplate = this.renderView();
    }

    public abstract update(): void;

    protected renderView(): RenderedTemplate {
        return this.templateFactory.createTemplate(this.name);
    }
}