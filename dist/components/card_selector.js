"use strict";
class CardSelector extends HTMLComponent {
    constructor(container, card) {
        super(container, HtmlHelper.makeElement("div", "", ["card-selector"]));
        this.card = card;
        this.htmlElement.style.backgroundImage = ResourceHelper.getUrl(card);
        this.htmlElement.addEventListener("click", () => { this.onClick(); });
    }
    onClick() { }
    getCard() {
        return this.card;
    }
}
