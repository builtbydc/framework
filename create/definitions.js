const pageTitle = "Testing Area";
const allCards = [];

function initCards() {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 20; j++) {
            allCards[20*i + j] = new Card("card" + (20*i + j), "black", "white", "gray", "Click.", "black", "0");
        }
    }
}

function loadCardPlacement() {
    let placement = "";
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 20; j++) {
            allCards[20*i + j] = new Card("card" + (20*i + j), "black", "white", "gray", "Click.", "black", "0");
            placement += ("#card" + (20*i + j) + " {\n" +
                "   top: " + (i*5) + "vw;\n" +
                "   left: " + (j*5) + "vw;\n" +
                "}\n");
        }
    }

    document.getElementById("cardPlacement").innerHTML = placement;
}