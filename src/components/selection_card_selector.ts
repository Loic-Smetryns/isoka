class SelectionCardSelector extends CardSelector{
    private state: CardState;
    private mask: HTMLElement;

    public constructor(container : HTMLElement, card : Card){
        super(container, card);

        this.state = CardState.IN_DECK;
        
        this.mask = HtmlHelper.makeElement("div", "", ["card-selector-mask"]);
        this.htmlElement.appendChild(this.mask);
    }

    protected onClick() : void{
        super.onClick();

        if(this.state == CardState.IN_DECK){
            this.state = CardState.IN_DISCARD_PILE;
        }
        else if(this.state == CardState.IN_DISCARD_PILE){
            this.state = CardState.UNSELECTED;
        }
        else{
            this.state = CardState.IN_DECK;
        }

        this.render();
    }

    public getState() : CardState { 
        return this.state; 
    }

    public render(): void{
        super.render();

        this.htmlElement.classList.remove("in-deck");
        this.htmlElement.classList.remove("in-discard-pile");
        this.htmlElement.classList.remove("unselected");

        this.htmlElement.classList.add(
            (this.state == CardState.IN_DECK) ? "in-deck" : (this.state == CardState.IN_DISCARD_PILE) ? "in-discard-pile" : "unselected"
        );
    }
}

enum CardState{
    IN_DECK, IN_DISCARD_PILE, UNSELECTED, IN_GAME
}