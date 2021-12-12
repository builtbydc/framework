const card_n = 16; //card fragment density
const card_q = 10; //must be a factor of 100, card animation step
const card_d = 8; //visual distance
const card_h = (card_d - 0.5) / card_d; //card standard height
const card_t = 375; //card animation duration

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
                    "fp" + i + "ha " + card_t + "ms linear 0s 1, ",
                    "fp" + (card_n-1-i) + "ha " + card_t + "ms linear " + card_t + "ms 1 reverse, ",
                    "card-width-animate " + card_t + "ms linear 0s 2 alternate"
                ]))
            ), 

            cssSelect(".card-fragment-" + i + ".deanimate",
                cssAttr("animation", build([
                    "fp" + i + "ha " + card_t + "ms linear 0s 1, ",
                    "fp" + (card_n-1-i) + "ha " + card_t + "ms linear " + card_t + "ms 1 reverse, ",
                    "card-width-animate " + card_t + "ms linear 0s 2 alternate"
                ]))
            ),

            cssSelect("@keyframes fp" + i + "ha",
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