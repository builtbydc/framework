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