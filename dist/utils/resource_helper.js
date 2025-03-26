"use strict";
class ResourceHelper {
    static getUrl(card) {
        return `url("./assets/cards/${card.getValue()}${card.getColor()}.png")`;
    }
}
