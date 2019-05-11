import {ITemplateFactory, RenderedTemplate} from "../template.js";
import {IUpdateable} from "../GameSystem/gameClock.js";

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