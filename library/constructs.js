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