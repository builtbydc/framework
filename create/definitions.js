const pageTitle = "Testing Area";
const allCards = [];

const cardsPerRow = 10;

function initCards() {
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < cardsPerRow; j++) {
            allCards[cardsPerRow*i + j] = new Card("card" + (cardsPerRow*i + j), "#f79d65", "#f7b267", "#f4845f", "", "black", "0px");
        }
    }
}

function loadCardPlacement() {
    let placement = "";
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < cardsPerRow; j++) {
            placement += ("#card" + (cardsPerRow*i + j) + " {\n" +
                "   top: " + (i*(100/cardsPerRow)) + "vw;\n" +
                "   left: " + (j*(100/cardsPerRow)) + "vw;\n" +
                "}\n");
        }
    }

    document.getElementById("cardPlacement").innerHTML = placement;
}