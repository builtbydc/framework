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

const flipResolution = 64;
const visualDistance = 5.0;
class Flip {

    constructor(id) {
        this.id = id;

        this.contents = [];
        for (let i = 0; i < flipResolution; i++)
            this.contents[i] = Div("", "flip-particle", "flip-particle-" + i);
    }

    create() {
        return Div(
            build(this.contents),
            "flip-container", this.id + "-container"
        );
    }

    animate() {

        let flipWidthAnimate = "";
        for (let i = 0; i <= 100; i += 5) {
            if (i != 100)
                flipWidthAnimate += i + "% { width: " + (((visualDistance - 0.5) / visualDistance) * 100 / flipResolution) * Math.cos(i * (Math.PI / 200)) + "%;}\n";
            else
                flipWidthAnimate += "100% { width: 0%;}\n"
        }

        let flipParticleAnimate = "";
        for (let i = 0; i < flipResolution; i++) {
            let flipHeightAnimate = "";
            for (let j = 0; j <= 100; j += 5)
                flipHeightAnimate += j + "% { height: " +
                    (((visualDistance - 0.5) / visualDistance) * 100 * visualDistance) / (visualDistance + ((i / flipResolution) - 0.5) * Math.sin(j * Math.PI / 200)) +
                    "%;}\n";

            flipParticleAnimate += build([
                "#flip-particle-" + i + ".animate {",
                "   animation: fp" + i + "ha 375ms linear 0s 1, fp" + (flipResolution - 1 - i) + "ha 375ms linear 375ms 1 reverse, flip-width-animate 375ms linear 0s 2 alternate;",
                "}",

                "#flip-particle-" + i + ".deanimate {",
                "   animation: fp" + i + "ha 375ms linear 0s 1, fp" + (flipResolution - 1 - i) + "ha 375ms linear 375ms 1 reverse, flip-width-animate 375ms linear 0s 2 alternate;",
                "}",

                "@keyframes fp" + i + "ha {",
                flipHeightAnimate,
                "}"
            ]);
        }

        return build([
            ".flip-particle {\n",
            "   width: " + (((visualDistance - 0.5) / visualDistance) * 100 / flipResolution) + "%;\n",
            "   height: " + ((visualDistance - 0.5) / visualDistance) * 100 + "%;\n",
            "   background-color: gray;\n",
            "}\n\n",

            ".flip-particle.shown {",
            "   background-color: white;",
            "}",

            ".flip-particle.animate {",
            "   transition: background-color 0ms linear 375ms;",
            "   background-color: white;",
            "}",
            ".flip-particle.deanimate {",
            "   transition: background-color 0ms linear 375ms;",
            "   background-color: gray;",
            "}",

            "@keyframes flip-width-animate {",
            flipWidthAnimate,
            "}",

            flipParticleAnimate
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
const newFlip = new Flip("newFlip");

function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
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

    document.getElementById("newFlip-container").addEventListener("mouseenter", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("deanimate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("animate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("animate");
            }
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("shown");
            }
        }, 750);
    });
    document.getElementById("newFlip-container").addEventListener("mouseleave", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("animate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("deanimate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("shown");
                document.getElementById("flip-particle-" + i).classList.remove("deanimate");
            }
        }, 750);
    });

    document.getElementById("newFlip-container").addEventListener("touchstart", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("deanimate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("animate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("animate");
            }
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("shown");
            }
        }, 750);
    });
    document.getElementById("newFlip-container").addEventListener("touchend", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("animate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("deanimate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("shown");
                document.getElementById("flip-particle-" + i).classList.remove("deanimate");
            }
        }, 750);
    });

    document.getElementById("flipStyle").innerHTML = newFlip.animate();


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

function Structure() {
    return build([
        newFlip.create()
    ]);
}

