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

function cssSelect(selector, contents) {
    return(
        selector + "{\n" +
        contents +
        "}\n"
    );
}

function cssAttr(attribute, value) {
    return "\t" + attribute + ":" + value + ";\n";
}

function toPercent(decimal) {
    return (decimal * 100) + "%";
}

function toVW(decimal) {
    return (decimal * 100) + "vw";
}

function ms(t) {
    return t + "ms ";
}

function cosQS(step) { //quarter scaled
    return Math.cos(step * Math.PI / 200);
}
function sinQS(step) {
    return Math.sin(step * Math.PI / 200);
}

function idHasClass(id, className) {
    return document.getElementById(id).classList.contains(className);
}
function addClassToId(id, className) {
    document.getElementById(id).classList.add(className);
}
function removeClassFromId(id, className) {
    document.getElementById(id).classList.remove(className);
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

const card_n = 20; //card fragment density
const card_q = 10; //must be a factor of 100, card animation step
const card_d = 5; //visual distance
const card_h = (card_d - 0.5) / card_d; //card standard height
const card_t = 400; //card animation duration

function card_fac_all(id, className) { //fragment add class
    for (let i = 0; i < card_n; i++) addClassToId(id + "-card-fragment-" + i, className);
}
function card_frc_all(id, className) { //fragment remove class
    for (let i = 0; i < card_n; i++) removeClassFromId(id + "-card-fragment-" + i, className);
}

function card_enter(id) {
    if(idHasClass(id + "-card-fragment-0", "deanimate")) return;

    card_fac_all(id, "animate");

    setTimeout(function () {
        card_frc_all(id, "animate");
        card_fac_all(id, "shown");
        addClassToId(id, "pointer");
        addClassToId(id + "-card-text", "visible");
        if(!document.getElementById(id).classList.contains("mouseover")) card_exit(id);
    }, 2 * card_t);
}

function card_exit(id) {
    if(idHasClass(id + "-card-fragment-0", "animate")) return;
    if(!idHasClass(id + "-card-fragment-0", "shown")) return;

    removeClassFromId(id + "-card-text", "visible");

    setTimeout(function() {
        card_fac_all(id, "deanimate");
    }, 15);
    

    setTimeout(function () {
        card_frc_all(id, "deanimate");
        card_frc_all(id, "shown");
        removeClassFromId(id, "pointer");
    }, 2 * card_t);
}

function card_animate() {
    let cardWidthAnimate = "";
    let initialFragmentWidth = card_h / card_n;
    for (let i = 0; i <= 100; i += card_q) {
        if (i != 100) 
            cardWidthAnimate += "\t" + i + "% { width: " +
                toPercent( initialFragmentWidth * cosQS(i) ) + ";}\n";
                
        else cardWidthAnimate += "\t100% { width: 0%;}\n";
    }

    let cardFragmentAnimate = "";
    for (let i = 0; i < card_n; i++) {
        let cardHeightAnimate = "";
        for (let j = 0; j <= 100; j += card_q)
            cardHeightAnimate += "\t" + j + "% { height: " +
                toPercent( (card_d-0.5) / (card_d + ((i/card_n) - 0.5) * sinQS(j)) ) + ";}\n";

        cardFragmentAnimate += build([
            cssSelect(".card-fragment-" + i + ".animate",
                cssAttr("animation", build([
                    "card_h" + i + " " + card_t + "ms linear 0s 1, ",
                    "card_h" + (card_n-1-i) + " " + card_t + "ms linear " + card_t + "ms 1 reverse, ",
                    "card-width-animate " + card_t + "ms linear 0s 2 alternate"
                ]))
            ), 

            cssSelect(".card-fragment-" + i + ".deanimate",
                cssAttr("animation", build([
                    "card_h" + i + " " + card_t + "ms linear 0s 1, ",
                    "card_h" + (card_n-1-i) + " " + card_t + "ms linear " + card_t + "ms 1 reverse, ",
                    "card-width-animate " + card_t + "ms linear 0s 2 alternate"
                ]))
            ),

            cssSelect("@keyframes card_h" + i,
                cardHeightAnimate
            )
        ]);
    }

    document.getElementById("cardStyle").innerHTML = build([
        cssSelect(".card-fragment", build([
            cssAttr("width", toPercent(card_h / card_n)),
            cssAttr("height", toPercent(card_h)),
        ])),

        cssSelect(".card-fragment.animate", build([
            cssAttr("transition", "background-color 0ms linear " + card_t + "ms"),
        ])),

        cssSelect(".card-fragment.deanimate", build([
            cssAttr("transition", "background-color 0ms linear " + card_t + "ms"),
        ])),

        cssSelect("@keyframes card-width-animate",
            cardWidthAnimate
        ),

        cardFragmentAnimate,

        cssSelect(".card-text.visible", build([
            cssAttr("transition", "color 100ms linear")
        ])),

        cssSelect("card-text", build([
            cssAttr("color", "transparent"),
            cssAttr("transition", "color 100ms linear")
        ]))
    ]);
}

class Card {

    constructor(id, text) {
        this.id = id;
        this.text = text;

        this.contents = [];
        for (let i = 0; i < card_n; i++)
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
            card_enter(cardDriveId);
            document.getElementById(cardDriveId).classList.add("mouseover");
        });
        document.getElementById(cardDriveId).addEventListener("touchstart", function (event) {
            card_enter(cardDriveId);
            document.getElementById(cardDriveId).classList.add("mouseover");
        });
        document.getElementById(cardDriveId).addEventListener("mouseleave", function (event) {
            card_exit(cardDriveId);
            document.getElementById(cardDriveId).classList.remove("mouseover");
        });
        document.getElementById(cardDriveId).addEventListener("touchend", function (event) {
            card_exit(cardDriveId);
            document.getElementById(cardDriveId).classList.remove("mouseover");
        });
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
    card_animate();
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

