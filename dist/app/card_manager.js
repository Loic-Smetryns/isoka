"use strict";
class CardManager {
    constructor() {
        this.cards = [];
        this.inGame = [];
        this.deck = [];
        this.discardPile = [];
    }
    init(cards) {
        this.cards = [];
        this.inGame = [];
        this.deck = [];
        this.discardPile = [];
        for (const [state, card] of cards) {
            if (state == CardState.UNSELECTED)
                continue;
            this.cards.push(card);
            (state == CardState.IN_DECK) ? this.deck.push(card) : (state == CardState.IN_DISCARD_PILE) ? this.discardPile.push(card) : this.inGame.push(card);
        }
    }
    getDeck() {
        return this.deck;
    }
    getInGame() {
        return this.inGame;
    }
    getDiscardPile() {
        return this.discardPile;
    }
    stackDeck(card) {
        this.deck.push(card);
        this.inGame.splice(this.inGame.indexOf(card), 1);
        this.discardPile.splice(this.discardPile.indexOf(card), 1);
    }
    stackDiscardPile(card) {
        this.discardPile.push(card);
        this.inGame.splice(this.inGame.indexOf(card), 1);
        this.deck.splice(this.deck.indexOf(card), 1);
    }
    unstackDiscardPile(card) {
        this.inGame.push(card);
        this.discardPile.splice(this.discardPile.indexOf(card), 1);
    }
    toDraw() {
        const card = this.deck.splice(Math.random() * this.deck.length, 1)[0];
        this.inGame.push(card);
        return card;
    }
    deckEmpty() {
        return (this.deck.length == 0);
    }
    discardEmpty() {
        return (this.discardPile.length == 0);
    }
    getDiscardPileTopCard() {
        return this.discardPile[this.discardPile.length - 1];
    }
}
CardManager.TAG_INIT_EVENT = "init";
CardManager.TAG_STACK_DECK_EVENT = "stack-deck";
