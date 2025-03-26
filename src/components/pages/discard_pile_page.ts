class DiscardPilePage extends PageComponent{
    private selectors : Array<CardSelector>;
    private selectorContainer : HTMLElement;
    private cards_drawn : Array<Card>;

    constructor(container: HTMLElement, pageManager : PageManager, cardManager : CardManager){
        super("discard-page", container, pageManager, cardManager);

        this.htmlElement.appendChild(HtmlHelper.makeElement("span", "Selectionnez les cartes que vous souhaitez récupérer", ["main-order"]));

        const buttonContainer = HtmlHelper.makeElement("div", "", ["button-container"]);
        this.htmlElement.appendChild(buttonContainer);

        const validateButton: HTMLElement = HtmlHelper.makeElement("button", "J'ai terminé");
        validateButton.addEventListener('click', () => { this.onValidate(); })
        buttonContainer.appendChild(validateButton);

        this.selectorContainer = document.createElement("div");
        this.selectorContainer.classList.add("selector-container");
        this.htmlElement.appendChild(this.selectorContainer);

        this.selectors = [];
        this.cards_drawn = [];
    }

    private onValidate() : void {
        this.pageManager.updatePlaygroundDiscardPile(this.cards_drawn);
        this.pageManager.changePage(Page.PLAYGROUND);

        this.cards_drawn = [];
    }

    public init() : void{
        this.selectors.forEach((s) => { 
            this.removeChild(s, true);
        });

        this.cardManager.getDiscardPile().forEach((c) => {
            const selector = new DiscardPileCardSelector(this.selectorContainer, c, this, this.cardManager);
            this.appendChild(selector, false);
            this.selectors.push(selector);
        });
    }

    public toDraw(selector: DiscardPileCardSelector) : void{
        this.cards_drawn.push(selector.getCard());
        this.selectors.splice(this.selectors.indexOf(selector), 1);
        this.removeChild(selector, true);
    }
}