"use strict";
window.addEventListener("load", (event) => {
    main();
});
function main() {
    let cardManager;
    let pageManager;
    cardManager = new CardManager();
    pageManager = new PageManager(cardManager);
}
