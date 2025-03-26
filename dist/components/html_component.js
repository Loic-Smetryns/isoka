"use strict";
class HTMLComponent {
    constructor(container, htmlElement) {
        this.htmlElement = htmlElement;
        this.children = [];
        this.htmlListeners = [];
        this.visible = true;
        container.appendChild(this.htmlElement);
    }
    getElement() {
        return this.htmlElement;
    }
    appendChild(child, appendToHTML = true) {
        this.children.push(child);
        if (appendToHTML) {
            this.htmlElement.appendChild(child.getElement());
        }
    }
    removeChild(child, removeFromHTML = true) {
        const index = this.children.indexOf(child);
        if (index != -1) {
            this.children.splice(index, 1);
            if (removeFromHTML) {
                child.clear();
            }
        }
    }
    createListenerHTML(observable, event, listener) {
        this.htmlListeners.push([observable, event, listener]);
        observable.addEventListener(event, listener);
    }
    clear() {
        for (let child of this.children) {
            child.clear();
        }
        for (let [observable, event, listener] of this.htmlListeners) {
            observable.removeEventListener(event, listener);
        }
        this.htmlElement.remove();
    }
    setVisible(visible) {
        this.visible = visible;
    }
    render(updateChildren = true) {
        if (updateChildren) {
            for (let child of this.children) {
                child.render();
            }
        }
        this.htmlElement.hidden = !this.visible;
    }
    isHover(x, y) {
        const rect = this.htmlElement.getBoundingClientRect();
        return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
    }
}
