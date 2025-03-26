class CardManager{
    public static readonly TAG_INIT_EVENT : string = "init";
    public static readonly TAG_STACK_DECK_EVENT : string = "stack-deck";

    private cards : Array<Card>;

    private inGame : Array<Card>;
    private deck : Array<Card>;
    private discardPile : Array<Card>;

    public constructor() {
        this.cards = [];
        this.inGame = [];
        this.deck = [];
        this.discardPile = [];
    }

    public init(cards: Array<[CardState, Card]>): void{
        this.cards = [];
        this.inGame = [];
        this.deck = [];
        this.discardPile = [];

        for (const [state, card] of cards){
            if(state == CardState.UNSELECTED)
                continue;

            this.cards.push(card);
            (state == CardState.IN_DECK) ? this.deck.push(card) : (state == CardState.IN_DISCARD_PILE) ? this.discardPile.push(card) : this.inGame.push(card);
        }
    }

    public getDeck() : Array<Card>{
        return this.deck;
    }

    public getInGame() : Array<Card>{
        return this.inGame;
    }

    public getDiscardPile() : Array<Card>{
        return this.discardPile;
    }

    public stackDeck(card: Card) : void{
        this.deck.push(card);

        this.inGame.splice(this.inGame.indexOf(card), 1);
        this.discardPile.splice(this.discardPile.indexOf(card), 1);
    }

    public stackDiscardPile(card: Card) : void{
        this.discardPile.push(card);

        this.inGame.splice(this.inGame.indexOf(card), 1);
        this.deck.splice(this.deck.indexOf(card), 1);
    }

    public unstackDeck(card: Card) : void{
        this.inGame.push(card);
        this.deck.splice(this.deck.indexOf(card), 1);
    }

    public unstackDiscardPile(card: Card) : void{
        this.inGame.push(card);
        this.discardPile.splice(this.discardPile.indexOf(card), 1);
    }

    public toDraw(): Card{
        return this.deck.splice(Math.random() * this.deck.length, 1)[0];
    }

    public deckEmpty(): boolean{
        return (this.deck.length == 0);
    }

    public discardEmpty(): boolean{
        return (this.discardPile.length == 0);
    }

    public getDiscardPileTopCard(): Card{
        return this.discardPile[this.discardPile.length - 1];
    }
}