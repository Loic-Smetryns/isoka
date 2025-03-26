class PlaygroundPage extends PageComponent{
    private cards: {[keyId: number] : CardComponent};

    private deck: DeckComponent;
    private discard_pile: DiscardPileComponent;

    private selectedCard: CardComponent | null;
    private cardOffSet: [number, number];

    constructor(container: HTMLElement, pageManager : PageManager, cardManager : CardManager){
        super("playground-page", container, pageManager, cardManager);

        const saveButton : HTMLElement = HtmlHelper.makeElement("button", "Sauvegarder", ["save-button"]);
        saveButton.addEventListener("click", () => { this.save(); });
        this.htmlElement.appendChild(saveButton);

        this.cards = [];
        this.deck = new DeckComponent(this.htmlElement, this, cardManager);
        this.discard_pile = new DiscardPileComponent(this.htmlElement, this, cardManager);

        this.appendChild(this.deck);
        this.appendChild(this.discard_pile);

        this.selectedCard = null;
        this.cardOffSet = [0, 0];

        this.createListenerHTML(window, "mousemove", (event: Event) => { this.onMouseMove(event as MouseEvent); });
        this.createListenerHTML(window, "mouseup", (event: Event) => { this.onMouseUp(event as MouseEvent); });
    }

    private save() : void{
        const json : any = {};

        json.deck = [];
        json.discard = [];
        json.cards = [];

        for(let card of this.cardManager.getInGame()){
            json.cards.push(this.cards[card.getId()].getSave());
        }

        for(let card of this.cardManager.getDeck()){
            json.deck.push(this.cards[card.getId()].getSave());
        }

        for(let card of this.cardManager.getDiscardPile()){
            json.discard.push(this.cards[card.getId()].getSave());
        }

        console.log(json);
        HtmlHelper.saveJsonFile(json, "isoka-save.json");
    }

    public init(selectedCards : Array<[CardState, Card]>) : void{
        for(let card of Object.values(this.cards)){
            card.clear();
        }
        this.cards = [];

        for(let [state, card] of selectedCards){
            const cardComponent : CardComponent = new CardComponent(this.htmlElement, this, card);
            this.cards[card.getId()] = cardComponent;
            this.appendChild(cardComponent, false);

            if(state == CardState.IN_GAME){
                cardComponent.setVisible(true);
                cardComponent.render();
            }
        }
    }

    public initWithPositions(selectedCards : Array<[CardState, Card, number, number]>): void {
        for(let card of Object.values(this.cards)){
            card.clear();
        }
        this.cards = [];

        for(let [state, card, x, y] of selectedCards){
            const cardComponent : CardComponent = new CardComponent(this.htmlElement, this, card);
            this.cards[card.getId()] = cardComponent;
            this.appendChild(cardComponent, false);

            if(state == CardState.IN_GAME){
                cardComponent.setVisible(true);
                cardComponent.render();
            }
            cardComponent.move(x, y);
        }
    }

    private onMouseMove(event: MouseEvent) : void{
        if(this.selectedCard === null)
            return;
        
        const x: number = event.x;
        const y: number = event.y;

        this.selectedCard.move(x-this.cardOffSet[0], y-this.cardOffSet[1]);

        this.deck.updateFlownHover(x, y);
        this.discard_pile.updateFlownHover(x, y);
    }

    private onMouseUp(event: MouseEvent) : void{
        if(this.selectedCard === null)
            return;

        const x : number = event.x;
        const y: number = event.y;

        if(this.deck.isOpen() && this.deck.isHover(x, y)){
            this.selectedCard.stack();
            this.cardManager.stackDeck(this.selectedCard.getCard());
            this.deck.render();
        }
        else if(this.discard_pile.isOpen() && this.discard_pile.isHover(x, y)){
            this.selectedCard.stack();
            this.cardManager.stackDiscardPile(this.selectedCard.getCard());
            this.discard_pile.render();
        }

        this.selectedCard.drop();

        this.selectedCard=null;

        this.deck.setOpen(true);
        this.deck.updateFlownHover(x,y);

        this.discard_pile.setOpen(true);
        this.discard_pile.updateFlownHover(x,y);
    }

    public select(cardComponent : CardComponent, x : number, y : number) : void{
        this.selectedCard = cardComponent;
        this.cardOffSet = [x, y];

        this.selectedCard.take();
    }

    public getSelected() : CardComponent|null {
        return this.selectedCard;
    }

    public toDraw(x: number, y: number) : void{
        if(this.cardManager.deckEmpty())
            return;

        this.deck.setOpen(false);

        const card : Card = this.cardManager.toDraw();
        const cardComponent : CardComponent = this.cards[card.getId()];
        cardComponent.unstack(x, y);

        this.select(cardComponent, CardComponent.WIDTH / 2, CardComponent.HEIGHT / 2);
        this.deck.render();
    }

    public toDrawFromDiscardPile(cards : Array<Card>) : void{
        for(let c of Object.values(cards)){
            const card : CardComponent = this.cards[c.getId()];
            
            card.setVisible(true);
            card.move(
                window.innerWidth - CardComponent.WIDTH - 50 + Math.floor(Math.random()*50)-25, 
                CardComponent.HEIGHT + 50 + Math.floor(Math.random()*50)-25
            );
            card.render();
        }
    }

    public displayDiscard(){
        this.pageManager.initDiscardPile();
        this.pageManager.changePage(Page.DISCARD_PILE);
    }
}