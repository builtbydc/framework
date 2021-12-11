const cardFragmentDensity = 10;
const cardAnimationStep = 10; //must be a factor of 100
const vd = 8; //visual distance
const cardStandardHeight = (vd - 0.5) / vd;
const cardAnimationDuration = 375;

function cardFragmentHasClass(id, className) {
    return document.getElementById(id + "-card-fragment-0").classList.contains(className);
}
function cardFragmentAddClass(id, index, className) {
    document.getElementById(id + "-card-fragment-" + index).classList.add(className);
}
function cardFragmentAddClassAll(id, className) {
    for (let i = 0; i < cardFragmentDensity; i++)
        cardFragmentAddClass(id, i, className);
}
function cardFragmentRemoveClass(id, index, className) {
    document.getElementById(id + "-card-fragment-" + index).classList.remove(className);
}
function cardFragmentRemoveClassAll(id, className) {
    for (let i = 0; i < cardFragmentDensity; i++)
        cardFragmentRemoveClass(id, i, className);
}

function addClassToId(id, className) {
    document.getElementById(id).classList.add(className);
}

function removeClassFromId(id, className) {
    document.getElementById(id).classList.remove(className);
}

function onCardEntry(id) {

    if(cardFragmentHasClass(id, "deanimate")) return;

    cardFragmentAddClassAll(id, "animate");

    setTimeout(function () {
        cardFragmentRemoveClassAll(id, "animate");
        cardFragmentAddClassAll(id, "shown");
        addClassToId(id + "-card-text", "visible");
        if(!document.getElementById(id).classList.contains("mouseover")) onCardExit(id);
    }, 2 * cardAnimationDuration);
}

function onCardExit(id) {

    if(cardFragmentHasClass(id, "animate")) return;
    if(!cardFragmentHasClass(id, "shown")) return;

    removeClassFromId(id + "-card-text", "visible");

    setTimeout(function() {
        cardFragmentAddClassAll(id, "deanimate");
    }, 15);
    

    setTimeout(function () {
        cardFragmentRemoveClassAll(id, "deanimate");
        cardFragmentRemoveClassAll(id, "shown");
    }, 2 * cardAnimationDuration);
}

function loadCardStyle() {
    let count = allCards.length;
    for (let i = 0; i < count; i++)
        allCards[i].getSize();

    document.getElementById("cardStyle").innerHTML = allCards[0].animate();

    for (let i = 1; i < count; i++) {
        document.getElementById("cardStyle").innerHTML += allCards[i].animate();
    }
}

class Card {

    constructor(id, color1, color2, backgroundColor, text, textColor, borderRadius) {
        this.id = id;

        this.color1 = color1;
        this.color2 = color2;
        this.backgroundColor = backgroundColor;

        this.text = text;
        this.textColor = textColor;

        this.borderRadius = borderRadius;

        this.heightWidthRatio;
        this.initialWidth;

        this.contents = [];
        for (let i = 0; i < cardFragmentDensity; i++)
            this.contents[i] = Div("", "card-fragment", this.id + "-card-fragment-" + i);
    }

    create() {
        return Div(
            Div(
                build(this.contents),
                "card-fragment-container", this.id + "-fragment-container"
            ) +
            P(this.text, "card-text", this.id + "-card-text", "card-text-container"),
            "card", this.id
        );
    }

    drive() {
        let cardDriveId = this.id;
        document.getElementById(cardDriveId).addEventListener("mouseenter", function (event) {
            onCardEntry(cardDriveId);
            document.getElementById(cardDriveId).classList.add("mouseover");
        });
        document.getElementById(cardDriveId).addEventListener("touchstart", function (event) {
            onCardEntry(cardDriveId);
            document.getElementById(cardDriveId).classList.add("mouseover");
        });
        document.getElementById(cardDriveId).addEventListener("mouseleave", function (event) {
            onCardExit(cardDriveId);
            document.getElementById(cardDriveId).classList.remove("mouseover");
        });
        document.getElementById(cardDriveId).addEventListener("touchend", function (event) {
            onCardExit(cardDriveId);
            document.getElementById(cardDriveId).classList.remove("mouseover");
        });

        this.getSize();
    }

    getSize() {
        this.heightWidthRatio = document.getElementById(this.id + "-fragment-container").clientHeight /
            document.getElementById(this.id + "-fragment-container").clientWidth;

        this.initialWidth = 1 - this.heightWidthRatio + (this.heightWidthRatio * cardStandardHeight);
    }

    animate() {
        let cardWidthAnimate = "";
        for (let i = 0; i <= 100; i += cardAnimationStep) {
            if (i != 100)
                cardWidthAnimate += "\t" + i + "% { width: " +
                    (this.initialWidth * 100 / cardFragmentDensity) * Math.cos(i * (Math.PI / 200)) +
                    "%;}\n";
            else
                cardWidthAnimate += "\t100% { width: 0%;}\n"
        }

        let cardFragmentAnimate = "";
        for (let i = 0; i < cardFragmentDensity; i++) {
            let cardHeightAnimate = "";
            for (let j = 0; j <= 100; j += cardAnimationStep)
                cardHeightAnimate += "\t" + j + "% { height: " +
                    (cardStandardHeight * 100 * vd) / (vd + ((i / cardFragmentDensity) - 0.5) *
                        Math.sin(j * Math.PI / 200)) + "%;}\n";

            cardFragmentAnimate += build([
                "#" + this.id + "-card-fragment-" + i + ".animate {\n",
                "\tanimation: " + this.id + "-fp" + i + "ha " + cardAnimationDuration + "ms linear 0s 1, " +

                this.id + "-fp" + (cardFragmentDensity - 1 - i) + "ha " + cardAnimationDuration + "ms linear " +
                cardAnimationDuration + "ms 1 reverse, " +

                "card-width-animate " + cardAnimationDuration + "ms linear 0s 2 alternate;\n",
                "}\n\n",

                "#" + this.id + "-card-fragment-" + i + ".deanimate {\n",
                "\tanimation: " + this.id + "-fp" + i + "ha " + cardAnimationDuration + "ms linear 0s 1, " +

                this.id + "-fp" + (cardFragmentDensity - 1 - i) + "ha " + cardAnimationDuration + "ms linear " +
                cardAnimationDuration + "ms 1 reverse, " +

                "card-width-animate " + cardAnimationDuration + "ms linear 0s 2 alternate;\n",
                "}\n\n",

                "@keyframes " + this.id + "-fp" + i + "ha {\n",
                cardHeightAnimate,
                "}\n\n"
            ]);
        }

        return build([
            "#" + this.id + "-fragment-container {\n",
            "    border-radius: " + this.borderRadius + ";\n",
            "    background-color: " + this.backgroundColor + ";\n",
            "}\n\n",

            "[id^=" + this.id + "-card-fragment] {\n",
            "    width: " + (this.initialWidth * 100 / cardFragmentDensity) + "%;\n",
            "    height: " + (cardStandardHeight * 100) + "%;\n",
            "    background-color: " + this.color1 + ";\n",
            "}\n\n",

            "[id^=" + this.id + "-card-fragment].shown {\n",
            "    background-color: " + this.color2 + ";\n",
            "}\n\n",

            "[id^=" + this.id + "-card-fragment].animate {\n",
            "    transition: background-color 0ms linear " + cardAnimationDuration + "ms;\n",
            "    background-color: " + this.color2 + ";\n",
            "}\n\n",

            "[id^=" + this.id + "-card-fragment].deanimate {\n",
            "    transition: background-color 0ms linear " + cardAnimationDuration + "ms;\n",
            "    background-color: " + this.color1 + ";\n",
            "}\n\n",

            "@keyframes card-width-animate {\n",
            cardWidthAnimate,
            "}\n\n",

            cardFragmentAnimate,

            "#" + this.id + "-card-text.visible {\n",
            "    color: " + this.textColor + ";\n",
            "    transition: color 100ms linear;\n",
            "}\n",
            "#" + this.id + "-card-text {\n",
            "    color: transparent;\n",
            "    transition: color 100ms linear;\n",
            "}\n"
        ]);
    }
}

class StateCycler {
    constructor(id, contents, className, states, index) {
        this.id = id;
        this.contents = pu(contents);

        this.className = "state-cycler";
        if (pu(className) !== "") this.className += " " + className;

        this.states = ["disabled", "enabled"]; this.index = 0;
        if (pu(states) !== "") this.states = states;
        if (pu(index) !== "") this.index = index;
    }

    create() {
        return Div(this.load(), "", this.id + "_container");
    }

    load() {
        return Button(
            this.contents, "NO_DIV",
            this.className + " state-" + this.states[this.index],
            this.id, onClick(this.id + "." + "handleClick")
        );
    }

    state() {
        return this.states[this.index];
    }

    cycle() {
        this.index++;
        this.index %= this.states.length;
        document.getElementById(this.id + "_container").innerHTML = this.load();
    }

    handleClick() {
        this.cycle(); this.action();
    }

    action() { }
}
function magicSize(type, id, className, m_vw, d_vh) {
    let m = m_vw / 100.0;
    let d = d_vh / 100.0;

    let k = m * window.innerWidth - d * window.innerHeight;
    let correction = k * (100 - (window.innerWidth - 768)) / 100;

    if (correction * k < 0) correction = 0;
    console.log("       " + type + ": calc(" + d_vh + "vh + " + correction + "px);\n");

    return build([
        className === "" ? "#" + id + " {" : "." + className + " {\n",
        "   " + type + ": " + m_vw + "vw;\n",
        "}\n",
        "@media only screen and (min-width: 768px) {\n",
        "   " + (className === "" ? "#" + id + " {\n" : "." + className + " {\n"),
        "       " + type + ": calc(" + d_vh + "vh + " + correction + "px);\n",
        "   }\n",
        "}\n",
    ]);
} window.onresize = loadMagicSizes;