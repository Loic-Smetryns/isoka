window.addEventListener("load", (event) => {
    main();
});

function main(){
    let cardManager : CardManager;
    let pageManager : PageManager;
    
    cardManager = new CardManager();
    pageManager = new PageManager(cardManager);
}