"use strict";
class SelectionCardSelector extends CardSelector {
    constructor(container, card) {
        super(container, card);
        this.state = CardState.IN_DECK;
        this.mask = HtmlHelper.makeElement("div", "", ["card-selector-mask"]);
        this.htmlElement.appendChild(this.mask);
    }
    onClick() {
        super.onClick();
        if (this.state == CardState.IN_DECK) {
            this.state = CardState.IN_DISCARD_PILE;
        }
        else if (this.state == CardState.IN_DISCARD_PILE) {
            this.state = CardState.UNSELECTED;
        }
        else {
            this.state = CardState.IN_DECK;
        }
        this.render();
    }
    getState() {
        return this.state;
    }
    render() {
        super.render();
        this.htmlElement.classList.remove("in-deck");
        this.htmlElement.classList.remove("in-discard-pile");
        this.htmlElement.classList.remove("unselected");
        this.htmlElement.classList.add((this.state == CardState.IN_DECK) ? "in-deck" : (this.state == CardState.IN_DISCARD_PILE) ? "in-discard-pile" : "unselected");
    }
}
var CardState;
(function (CardState) {
    CardState[CardState["IN_DECK"] = 0] = "IN_DECK";
    CardState[CardState["IN_DISCARD_PILE"] = 1] = "IN_DISCARD_PILE";
    CardState[CardState["UNSELECTED"] = 2] = "UNSELECTED";
    CardState[CardState["IN_GAME"] = 3] = "IN_GAME";
})(CardState || (CardState = {}));
