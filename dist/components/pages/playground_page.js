"use strict";
class PlaygroundPage extends PageComponent {
    constructor(container, pageManager, cardManager) {
        super("playground-page", container, pageManager, cardManager);
        const saveButton = HtmlHelper.makeElement("button", "Sauvegarder", ["save-button"]);
        saveButton.addEventListener("click", () => { this.save(); });
        this.htmlElement.appendChild(saveButton);
        this.cards = [];
        this.deck = new DeckComponent(this.htmlElement, this, cardManager);
        this.discard_pile = new DiscardPileComponent(this.htmlElement, this, cardManager);
        this.appendChild(this.deck);
        this.appendChild(this.discard_pile);
        this.selectedCard = null;
        this.cardOffSet = [0, 0];
        this.createListenerHTML(window, "mousemove", (event) => { this.onMouseMove(event); });
        this.createListenerHTML(window, "mouseup", (event) => { this.onMouseUp(event); });
    }
    save() {
        const json = {};
        json.deck = [];
        json.discard = [];
        json.cards = [];
        for (let card of this.cardManager.getInGame()) {
            json.cards.push(this.cards[card.getId()].getSave());
        }
        for (let card of this.cardManager.getDeck()) {
            json.deck.push(this.cards[card.getId()].getSave());
        }
        for (let card of this.cardManager.getDiscardPile()) {
            json.discard.push(this.cards[card.getId()].getSave());
        }
        console.log(json);
        HtmlHelper.saveJsonFile(json, "isoka-save.json");
    }
    init(selectedCards) {
        for (let card of Object.values(this.cards)) {
            card.clear();
        }
        this.cards = [];
        for (let [state, card] of selectedCards) {
            const cardComponent = new CardComponent(this.htmlElement, this, card);
            this.cards[card.getId()] = cardComponent;
            this.appendChild(cardComponent, false);
            if (state == CardState.IN_GAME) {
                cardComponent.setVisible(true);
                cardComponent.render();
            }
        }
    }
    initWithPositions(selectedCards) {
        for (let card of Object.values(this.cards)) {
            card.clear();
        }
        this.cards = [];
        for (let [state, card, x, y] of selectedCards) {
            const cardComponent = new CardComponent(this.htmlElement, this, card);
            this.cards[card.getId()] = cardComponent;
            this.appendChild(cardComponent, false);
            if (state == CardState.IN_GAME) {
                cardComponent.setVisible(true);
                cardComponent.render();
            }
            cardComponent.move(x, y);
        }
    }
    onMouseMove(event) {
        if (this.selectedCard === null)
            return;
        const x = event.x;
        const y = event.y;
        this.selectedCard.move(x - this.cardOffSet[0], y - this.cardOffSet[1]);
        this.deck.updateFlownHover(x, y);
        this.discard_pile.updateFlownHover(x, y);
    }
    onMouseUp(event) {
        if (this.selectedCard === null)
            return;
        const x = event.x;
        const y = event.y;
        if (this.deck.isOpen() && this.deck.isHover(x, y)) {
            this.selectedCard.stack();
            this.cardManager.stackDeck(this.selectedCard.getCard());
            this.deck.render();
        }
        else if (this.discard_pile.isOpen() && this.discard_pile.isHover(x, y)) {
            this.selectedCard.stack();
            this.cardManager.stackDiscardPile(this.selectedCard.getCard());
            this.discard_pile.render();
        }
        this.selectedCard.drop();
        this.selectedCard = null;
        this.deck.setOpen(true);
        this.deck.updateFlownHover(x, y);
        this.discard_pile.setOpen(true);
        this.discard_pile.updateFlownHover(x, y);
    }
    select(cardComponent, x, y) {
        this.selectedCard = cardComponent;
        this.cardOffSet = [x, y];
        this.selectedCard.take();
    }
    getSelected() {
        return this.selectedCard;
    }
    toDraw(x, y) {
        if (this.cardManager.deckEmpty())
            return;
        this.deck.setOpen(false);
        const card = this.cardManager.toDraw();
        const cardComponent = this.cards[card.getId()];
        cardComponent.unstack(x, y);
        this.cardManager.unstackDeck(card);
        this.select(cardComponent, CardComponent.WIDTH / 2, CardComponent.HEIGHT / 2);
        this.deck.render();
    }
    toDrawFromDiscardPile(cards) {
        for (let c of Object.values(cards)) {
            const card = this.cards[c.getId()];
            card.setVisible(true);
            card.move(window.innerWidth - CardComponent.WIDTH - 50 + Math.floor(Math.random() * 50) - 25, CardComponent.HEIGHT + 50 + Math.floor(Math.random() * 50) - 25);
            card.render();
        }
    }
    displayDiscard() {
        this.pageManager.initDiscardPile();
        this.pageManager.changePage(Page.DISCARD_PILE);
    }
}
