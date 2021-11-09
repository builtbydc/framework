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

const flipParticleDensity = 64;
const flipAnimationStep = 5; //must be a factor of 100
const flipVisualDistance = 5.0;
const flipStandardDimension = (flipVisualDistance - 0.5) / flipVisualDistance;
const flipAnimationDuration = 375;
var flipEntryTimeout;

function hasFlipParticleClass(id, className) {
    return document.getElementById(id + "-flip-particle-0").classList.contains(className);
}
function addFlipParticleClass(id, index, className) {
    document.getElementById(id + "-flip-particle-" + index).classList.add(className);
}
function addFlipParticleClassAll(id, className) {
    for (let i = 0; i < flipParticleDensity; i++)
        addFlipParticleClass(id, i, className);
}
function removeFlipParticleClass(id, index, className) {
    document.getElementById(id + "-flip-particle-" + index).classList.remove(className);
}
function removeFlipParticleClassAll(id, className) {
    for (let i = 0; i < flipParticleDensity; i++)
        removeFlipParticleClass(id, i, className);
}

function onFlipEntry(id) {
    removeFlipParticleClassAll(id, "deanimate");
    removeFlipParticleClassAll(id, "shown");

    setTimeout(function () {
        addFlipParticleClassAll(id, "animate");
    }, 1); //1ms delay

    flipEntryTimeout = setTimeout(function () {
        if (hasFlipParticleClass(id, "animate")) {

            removeFlipParticleClassAll(id, "animate");
            addFlipParticleClassAll(id, "shown");

        }
    }, 2 * flipAnimationDuration);
}

function onFlipExit(id) {
    if (hasFlipParticleClass(id, "animate")) {

        removeFlipParticleClassAll(id, "animate");
        clearTimeout(flipEntryTimeout);

    } else {
        setTimeout(function () {
            addFlipParticleClassAll(id, "deanimate");
        }, 1); //1ms delay

        setTimeout(function () {
            removeFlipParticleClassAll(id, "shown");
            removeFlipParticleClassAll(id, "deanimate");
        }, 2 * flipAnimationDuration);
    }
}

class Flip {

    constructor(id, backgroundColor1, backgroundColor2) {
        this.id = id;

        this.backgroundColor1 = backgroundColor1;
        this.backgroundColor2 = backgroundColor2;

        this.contents = [];
        for (let i = 0; i < flipParticleDensity; i++)
            this.contents[i] = Div("", "flip-particle", this.id + "-flip-particle-" + i);
    }

    create() {
        return Div(
            build(this.contents),
            "flip-container", this.id + "-container"
        );
    }

    animate() {

        let flipWidthAnimate = "";
        for (let i = 0; i <= 100; i += flipAnimationStep) {
            if (i != 100)
                flipWidthAnimate += "\t" + i + "% { width: " +
                    (flipStandardDimension * 100 / flipParticleDensity) * Math.cos(i * (Math.PI / 200)) +
                    "%;}\n";
            else
                flipWidthAnimate += "\t100% { width: 0%;}\n"
        }

        let flipParticleAnimate = "";
        for (let i = 0; i < flipParticleDensity; i++) {
            let flipHeightAnimate = "";
            for (let j = 0; j <= 100; j += flipAnimationStep)
                flipHeightAnimate += "\t" + j + "% { height: " +
                    (flipStandardDimension * 100 * flipVisualDistance) / (flipVisualDistance + ((i / flipParticleDensity) - 0.5) *
                        Math.sin(j * Math.PI / 200)) + "%;}\n";

            flipParticleAnimate += build([
                "#" + this.id + "-flip-particle-" + i + ".animate {\n",
                "\tanimation: " + this.id + "-fp" + i + "ha " + flipAnimationDuration + "ms linear 0s 1, " +

                this.id + "-fp" + (flipParticleDensity - 1 - i) + "ha " + flipAnimationDuration + "ms linear " +
                flipAnimationDuration + "ms 1 reverse, " +

                "flip-width-animate " + flipAnimationDuration + "ms linear 0s 2 alternate;\n",
                "}\n\n",

                "#" + this.id + "-flip-particle-" + i + ".deanimate {\n",
                "\tanimation: " + this.id + "-fp" + i + "ha " + flipAnimationDuration + "ms linear 0s 1, " +

                this.id + "-fp" + (flipParticleDensity - 1 - i) + "ha " + flipAnimationDuration + "ms linear " +
                flipAnimationDuration + "ms 1 reverse, " +

                "flip-width-animate " + flipAnimationDuration + "ms linear 0s 2 alternate;\n",
                "}\n\n",

                "@keyframes " + this.id + "-fp" + i + "ha {\n",
                flipHeightAnimate,
                "}\n\n"
            ]);
        }

        return build([
            ".flip-particle {\n",
            "    width: " + (flipStandardDimension * 100 / flipParticleDensity) + "%;\n",
            "    height: " + (flipStandardDimension * 100) + "%;\n",
            "    background-color: " + this.backgroundColor1 + ";\n",
            "}\n\n",

            ".flip-particle.shown {\n",
            "    background-color: " + this.backgroundColor2 + ";\n",
            "}\n\n",

            ".flip-particle.animate {\n",
            "    transition: background-color 0ms linear " + flipAnimationDuration + "ms;\n",
            "    background-color: " + this.backgroundColor2 + ";\n",
            "}\n\n",

            ".flip-particle.deanimate {\n",
            "    transition: background-color 0ms linear " + flipAnimationDuration + "ms;\n",
            "    background-color: " + this.backgroundColor1 + ";\n",
            "}\n\n",

            "@keyframes flip-width-animate {\n",
            flipWidthAnimate,
            "}\n\n",

            flipParticleAnimate
        ]);
    }

    drive() {
        let flipDriveId = this.id;
        document.getElementById("newFlip-container").addEventListener("mouseenter", function (event) {
            onFlipEntry(flipDriveId);
        });
        document.getElementById("newFlip-container").addEventListener("touchstart", function (event) {
            onFlipEntry(flipDriveId);
        });
        document.getElementById("newFlip-container").addEventListener("mouseleave", function (event) {
            onFlipExit(flipDriveId);
        });
        document.getElementById("newFlip-container").addEventListener("touchend", function (event) {
            onFlipExit(flipDriveId);
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
const newFlip = new Flip("newFlip", "#ffbe0b", "#ff006e");

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

    newFlip.drive();
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

