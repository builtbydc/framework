const pageTitle = "Testing Area";
const allCards = [];

const cardsPerRow = 20;
const rows = cardsPerRow / 2;

function initCards() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cardsPerRow; j++) {
            allCards[cardsPerRow*i + j] = new Card("card" + (cardsPerRow*i + j), "");
        }
    }
}

function loadCardPlacement() {
    let placement = "";
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cardsPerRow; j++) {
            placement += cssSelect("#card" + (cardsPerRow * i + j), build([
                cssAttr("top", toVW(i / cardsPerRow)),
                cssAttr("left", toVW(j / cardsPerRow))
            ]));
        }
    }
    placement += cssSelect(".card", build([
        cssAttr("width", toVW(1.0 / cardsPerRow)),
        cssAttr("height", toVW(1.0 / cardsPerRow))
    ]))
    document.getElementById("cardPlacement").innerHTML = placement;
}