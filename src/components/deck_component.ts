class DeckComponent extends StackComponent{
    public constructor(container: HTMLElement, playgroundPage: PlaygroundPage, cardManager: CardManager){
        super(container, HtmlHelper.makeElement("div", "", ["deck"]), playgroundPage, cardManager);

        this.htmlElement.appendChild(HtmlHelper.makeElement("div", "", ["deck-cover"]));

        this.createListenerHTML(this.htmlElement, "mousedown", (event: Event) => { this.onPressed(event as MouseEvent); });
        this.render();
    }

    private onPressed(event: MouseEvent) : void{
        this.playgroundPage.toDraw(event.x, event.y);
    }

    public render() : void{
        super.render();
    
        this.htmlElement.classList.remove("empty");
        this.htmlElement.classList.remove("not-empty");

        this.htmlElement.classList.add(
            this.cardManager.deckEmpty() ? "empty" : "not-empty"
        );
    }
}