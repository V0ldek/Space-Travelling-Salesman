import {ITemplateFactory} from "../Templates/templateFactory.js";
import {RenderedTemplate} from "../Templates/renderedTemplate.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {IDictionary} from "../dictionary.js";

export abstract class View implements IUpdateable {
    protected readonly name;
    protected readonly renderedTemplate: RenderedTemplate;
    private readonly templateFactory: ITemplateFactory;

    protected constructor(name: string, templateFactory: ITemplateFactory) {
        this.name = name;
        this.templateFactory = templateFactory;
        this.renderedTemplate = this.renderView();
    }

    public update(): void {
        this.renderedTemplate.renderData(this.getData())
    };

    protected abstract getData(): IDictionary<string>;

    protected renderView(): RenderedTemplate {
        return this.templateFactory.createTemplate(this.name);
    }
}