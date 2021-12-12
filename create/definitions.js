const pageTitle = "Testing Area";
const allCards = [];

const cardsPerRow = 50;

function initCards() {
    for(let i = 0; i < 25; i++) {
        for(let j = 0; j < cardsPerRow; j++) {
            allCards[cardsPerRow*i + j] = new Card("card" + (cardsPerRow*i + j), "");
        }
    }
}

function loadCardPlacement() {
    let placement = "";
    for(let i = 0; i < 25; i++) {
        for(let j = 0; j < cardsPerRow; j++) {
            placement += ("#card" + (cardsPerRow*i + j) + " {\n" +
                "   top: " + (i*(100/cardsPerRow)) + "vw;\n" +
                "   left: " + (j*(100/cardsPerRow)) + "vw;\n" +
                "}\n");
        }
    }

    document.getElementById("cardPlacement").innerHTML = placement;
}