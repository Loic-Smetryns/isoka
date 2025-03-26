"use strict";
class SelectionPage extends PageComponent {
    constructor(container, pageManager, cardManager) {
        super("selection-page", container, pageManager, cardManager);
        this.htmlElement.appendChild(HtmlHelper.makeElement("span", "Selectionnez les cartes que vous souhaitez retirer", ["main-order"]));
        const buttonContainer = HtmlHelper.makeElement("div", "", ["button-container"]);
        this.htmlElement.appendChild(buttonContainer);
        const validateButton = HtmlHelper.makeElement("button", "J'ai terminé");
        validateButton.addEventListener('click', () => { this.onValidate(); });
        buttonContainer.appendChild(validateButton);
        const loadButton = HtmlHelper.makeElement("button", "Charger");
        loadButton.addEventListener('click', () => { this.onLoading(); });
        buttonContainer.appendChild(loadButton);
        const selectorContainer = HtmlHelper.makeElement("div", "", ["selector-container"]);
        this.htmlElement.appendChild(selectorContainer);
        this.selectors = [];
        for (const color of Object.values(CardColor)) {
            if (color == CardColor.JOKER)
                continue;
            for (const value of Object.values(CardValue)) {
                if (value == CardValue.JOKER)
                    continue;
                this.appendSelector(new SelectionCardSelector(selectorContainer, new Card(color, value)));
            }
        }
        this.appendSelector(new SelectionCardSelector(selectorContainer, new Card(CardColor.JOKER, CardValue.JOKER)));
        this.appendSelector(new SelectionCardSelector(selectorContainer, new Card(CardColor.JOKER, CardValue.JOKER)));
    }
    appendSelector(selector) {
        this.selectors.push(selector);
        this.appendChild(selector, false);
    }
    onValidate() {
        const selectedCards = this.selectors.map((selector) => [selector.getState(), selector.getCard()]);
        this.cardManager.init(selectedCards);
        this.pageManager.initPlayground(selectedCards);
        this.pageManager.changePage(Page.PLAYGROUND);
    }
    onLoading() {
        HtmlHelper.loadJsonFile((json) => {
            let selectedCards = [];
            for (let i = 0; i < json.cards.length; i++) {
                const field = json.cards[i];
                if (field != null) {
                    selectedCards.push([CardState.IN_GAME, new Card(field.color, field.value), field.x, field.y]);
                }
            }
            for (let i = 0; i < json.deck.length; i++) {
                const field = json.cards[i];
                if (field != null) {
                    selectedCards.push([CardState.IN_DECK, new Card(json.deck[i].color, json.deck[i].value), field.x, field.y]);
                }
            }
            for (let i = 0; i < json.discard.length; i++) {
                const field = json.cards[i];
                if (field != null) {
                    selectedCards.push([CardState.IN_DISCARD_PILE, new Card(json.discard[i].color, json.discard[i].value), field.x, field.y]);
                }
            }
            const sCards = selectedCards.map(([state, card, x, y]) => [state, card]);
            this.cardManager.init(sCards);
            this.pageManager.initPlaygroundWithPositions(selectedCards);
            this.pageManager.changePage(Page.PLAYGROUND);
        });
    }
}
