class DiscardPileComponent extends StackComponent {
    private topCard : HTMLElement;

    public constructor(container: HTMLElement, playgroundPage: PlaygroundPage, cardManager: CardManager){
        super(container, HtmlHelper.makeElement("div", "", ["discard"]), playgroundPage, cardManager);

        this.topCard = HtmlHelper.makeElement("div", "", ["discard-top"]);
        this.htmlElement.appendChild(this.topCard);

        this.createListenerHTML(this.htmlElement, "click", (event: Event) => { this.onClick(event as MouseEvent); });
        this.render();
    }

    private onClick(event: MouseEvent) : void{
        this.playgroundPage.displayDiscard();
    }

    public render() : void{
        super.render();
    
        this.htmlElement.classList.remove("empty");
        this.htmlElement.classList.remove("not-empty");

        if(this.cardManager.discardEmpty()){
            this.htmlElement.classList.add("empty");
            this.topCard.style.backgroundImage = "";
        }
        else{
            this.htmlElement.classList.add("not-empty");
            this.topCard.style.backgroundImage = ResourceHelper.getUrl(this.cardManager.getDiscardPileTopCard());
        }
    }
}