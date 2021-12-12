//parse undefined
function pu(text) {
    if (text === undefined) text = "";
    return text;
}
//concatenate array of strings
function build(arr) {
    let out = "";
    for (var i = 0; i < arr.length; i++)
        out += arr[i];
    return out;
}
//space, open tag, close tag
function sp() {
    return " ";
}
function op(tag, attributes) {
    return "<" + tag + sp() + attributes + ">";
}
function opNA(tag) {
    return "<" + tag + ">";
}
function cl(tag) {
    return "</" + tag + ">";
}
//text transfer
function ttL(text) {
    return '"' + text + '"';
}
function ttE(ttE_a, ttE_b, text) {
    if (ttE_a === ttE_b) return text;
    else return "";
}
function ttNE(ttNE_a, ttNE_b, text) {
    if (ttNE_a !== ttNE_b) return text;
    else return "";
}
function ttF(functionName, functionParameters) {
    let out = functionName + "(";
    if (pu(functionParameters) !== "") {
        for (let i = 0; i < functionParameters.length; i++) {
            if (i !== 0) out += ", ";
            out += functionParameters[i];
        }
    }
    out += ");";
    return ttL(out);
}
function onClick(functionName, functionParameters) {
    return "onclick=" + ttF(functionName, functionParameters);
}
//write attribute
function wa(attr, text) {
    return attr + "=" + ttL(text) + sp();
}
function waE(waE_a, waE_b, attr, text) {
    if (waE_a === waE_b) return wa(attr, text);
    else return "";
}
function waNE(waNE_a, waNE_b, attr, text) {
    if (waNE_a !== waNE_b) return wa(attr, text);
    else return "";
}

function Div(contents, className, id, other) {
    className = pu(className); id = pu(id);
    return (
        op("div",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            pu(other)

        ) + pu(contents) + cl("div")
    );
}
function Header(contents, className, id, other) {
    className = pu(className); id = pu(id);
    return (
        op("header",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            pu(other)

        ) + pu(contents) + cl("header")
    );
}
function Section(contents, className, id, other) {
    className = pu(className); id = pu(id);
    return (
        op("section",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            pu(other)

        ) + pu(contents) + cl("section")
    );
}
function A(href, target, contents, className, id, divClassName, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("a",
                wa("href", href) +
                waNE(target, "download", "target", target) +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other +
                ttE(target, "download", "download")

            ) + contents + cl("a")
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            A(href, target, contents, className, id, "NO_DIV", other),
            divClassName)
        );

    }
}
function H(size, text, className, id, divClassName, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("h" + size,
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            ) + text + cl("h" + size)
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            H(size, text, className, id, "NO_DIV", other),
            divClassName)
        );

    }
}
function Img(src, alt, width, height, className, id, divClassName, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("img",
                wa("src", src) +
                wa("alt", alt) +
                wa("width", width) +
                wa("height", height) +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            )
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            Img(src, alt, width, height, className, id, "NO_DIV", other),
            divClassName)
        );

    }
}
function P(text, className, id, divClassName, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("p",
                //attributes
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            ) + text + cl("p")
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            P(text, className, id, "NO_DIV", other),
            divClassName)
        );

    }
}
function Button(contents, className, id, divClassName, other) {
    id = pu(id); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("button",
                wa("type", "button") +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                other

            ) + contents + cl("button")
        );

    } else {
        divClassName = pu(divClassName);

        return (Div(
            Button(contents, className, id, "NO_DIV", other),
            divClassName)
        );

    }
}
function B(contents) {
    return opNA("b") + contents + cl("b");
}
function Span(contents, className, id, other) {
    className = pu(className); id = pu(id);
    return op("span",
        waNE(id, "", "id", id) +
        waNE(className, "", "class", className) +
        pu(other)

    ) + contents + cl("span");
}
function Iframe(src, srcdoc, title, width, height, className, id, divClassName, name, allow, sandbox, referrerpolicy, other) {
    id = pu(id); name = pu(name); allow = pu(allow); sandbox = pu(sandbox); referrerpolicy = pu(referrerpolicy); other = pu(other);

    if (divClassName === "NO_DIV") {
        className = pu(className);

        return (
            op("iframe",
                wa("src", src) +
                waNE(srcdoc, "", "srcdoc", srcdoc) +
                wa("title", title) +
                wa("width", width) +
                wa("height", height) +
                waNE(id, "", "id", id) +
                waNE(className, "", "class", className) +
                waNE(name, "", "name", name) +
                waNE(allow, "", "allow", allow) +
                waNE(sandbox, "", "sandbox", sandbox) +
                waNE(referrerpolicy, "", "referrerpolicy", referrerpolicy) +
                pu(other)

            ) + cl("iframe")
        );
    } else {
        divClassName = pu(divClassName);

        return (Div(
            Iframe(src, srcdoc, title, width, height, className, id, "NO_DIV", name, allow, sandbox, referrerpolicy, other),
            divClassName)
        );
    }
}

const cardFragmentDensity = 20;
const cardAnimationStep = 5; //must be a factor of 100
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
        addClassToId(id, "pointer");
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
        removeClassFromId(id, "pointer");
    }, 2 * cardAnimationDuration);
}

function loadCardStyle() {
    let count = allCards.length;
    for (let i = 0; i < count; i++)
        allCards[i].getSize();

    document.getElementById("cardStyle").innerHTML = allCards[0].animate();

    /*
    for (let i = 1; i < count; i++) {
        document.getElementById("cardStyle").innerHTML += allCards[i].animate();
    }
    */
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
            this.contents[i] = Div("", "card-fragment card-fragment-" + i, this.id + "-card-fragment-" + i);
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
                ".card-fragment-" + i + ".animate {\n",
                "\tanimation: fp" + i + "ha " + cardAnimationDuration + "ms linear 0s 1, " +

                "fp" + (cardFragmentDensity - 1 - i) + "ha " + cardAnimationDuration + "ms linear " +
                cardAnimationDuration + "ms 1 reverse, " +

                "card-width-animate " + cardAnimationDuration + "ms linear 0s 2 alternate;\n",
                "}\n\n",

                ".card-fragment-" + i + ".deanimate {\n",
                "\tanimation: fp" + i + "ha " + cardAnimationDuration + "ms linear 0s 1, " +

                "fp" + (cardFragmentDensity - 1 - i) + "ha " + cardAnimationDuration + "ms linear " +
                cardAnimationDuration + "ms 1 reverse, " +

                "card-width-animate " + cardAnimationDuration + "ms linear 0s 2 alternate;\n",
                "}\n\n",

                "@keyframes fp" + i + "ha {\n",
                cardHeightAnimate,
                "}\n\n"
            ]);
        }

        return build([
            ".card-fragment-container {\n",
            "    border-radius: " + this.borderRadius + ";\n",
            "    background-color: " + this.backgroundColor + ";\n",
            "}\n\n",

            ".card-fragment {\n",
            "    width: " + (this.initialWidth * 100 / cardFragmentDensity) + "%;\n",
            "    height: " + (cardStandardHeight * 100) + "%;\n",
            "    background-color: " + this.color1 + ";\n",
            "}\n\n",

            ".card-fragment.shown {\n",
            "    background-color: " + this.color2 + ";\n",
            "}\n\n",

            ".card-fragment.animate {\n",
            "    transition: background-color 0ms linear " + cardAnimationDuration + "ms;\n",
            "    background-color: " + this.color2 + ";\n",
            "}\n\n",

            ".card-fragment.deanimate {\n",
            "    transition: background-color 0ms linear " + cardAnimationDuration + "ms;\n",
            "    background-color: " + this.color1 + ";\n",
            "}\n\n",

            "@keyframes card-width-animate {\n",
            cardWidthAnimate,
            "}\n\n",

            cardFragmentAnimate,

            ".card-text.visible {\n",
            "    color: " + this.textColor + ";\n",
            "    transition: color 100ms linear;\n",
            "}\n",
            ".card-text {\n",
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

function loadPage() {

    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    }

    loadMagicSizes();
    loadCardPlacement();
    loadCardStyle();
    for(let i = 0; i < allCards.length; i++) allCards[i].drive();
}

const backgroundColorCycler =
    new StateCycler("backgroundColorCycler", "Press Me", "padded white-text", ["white", "yellow", "blue"]);

backgroundColorCycler.action = function () {
    loadPage();
}


function loadMagicSizes() {
    document.getElementById("magic-sizes").innerHTML = build([
        magicSize("font-size", "text", "", 10, 13),
        magicSize("width", "", "yellow", 50, 30),
        magicSize("height", "", "yellow", 80, 10)

    ])
}

function createCards() {
    let out = "";
    for(let i = 0; i < allCards.length; i++) {
        out += allCards[i].create();
    }
    return out;
}

function Structure() {
    initCards();
    return build([
        createCards()
    ]);
}

