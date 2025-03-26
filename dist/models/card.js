"use strict";
class Card {
    constructor(color, value) {
        this.color = color;
        this.value = value;
        this.id = Card.currentId++;
    }
    getColor() {
        return this.color;
    }
    getValue() {
        return this.value;
    }
    getId() {
        return this.id;
    }
}
Card.currentId = Math.floor((Math.random() * 1000000000));
