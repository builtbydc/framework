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
    return "onclick=" + ttF(functionName, pu(functionParameters));
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
//parse undefined
function pu(text) {
    if (text === undefined) text = "";
    return text;
}

function build(arr) {
    let out = "";
    for (var i = 0; i < arr.length; i++)
        out = out + arr[i];
    return out;
}

function Div(contents, className, id, other) {
    className = pu(className); id = pu(id); other = pu(other);
    return (
        op("div",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            other

        ) + contents + cl("div")
    );
}

function Header(contents, className, id, other) {
    className = pu(className); id = pu(id); other = pu(other);
    return (
        op("header",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            other

        ) + contents + cl("header")
    );
}

function Section(contents, className, id, other) {
    className = pu(className); id = pu(id); other = pu(other);
    return (
        op("section",
            waNE(id, "", "id", id) +
            waNE(className, "", "class", className) +
            other

        ) + contents + cl("section")
    );
}

function A(href, target, contents, divClassName, className, id, other) {
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
            A(href, target, contents, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function H(size, text, divClassName, className, id, other) {
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
            H(size, text, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function Img(src, alt, width, height, divClassName, className, id, other) {
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
            Img(src, alt, width, height, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function P(text, divClassName, className, id, other) {
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
            P(text, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function Button(contents, divClassName, className, id, other) {
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
            Button(contents, "NO_DIV", className, id, other),
            divClassName)
        );

    }
}
function B(contents) {
    return (
        opNA("b") +
        contents +
        cl("b")
    )
}

class StateCycler {
    constructor(id, contents, className, states, state) {
        this.id = id;
        this.contents = pu(contents);

        this.className = "state-cycler";
        if (pu(className) !== "") this.className += " " + className;

        this.states = ["disabled", "enabled"]; this.state = 0;
        if (pu(states) !== "") this.states = states;
        if (pu(state) !== "") this.state = state;
    }

    create() {
        return Div(this.load(), "", this.id + "_container");
    }

    load() {
        return Button(
            this.contents, "NO_DIV",
            this.className + " " + this.states[this.state],
            this.id, onClick(this.id + "." + "handleClick")
        );
    }

    cycle() {
        this.state++;
        this.state %= this.states.length;
        document.getElementById(this.id + "_container").innerHTML = this.load();
    }

    handleClick() {
        this.cycle(); this.action();
    }

    action() { }
}

const sc_1 = new StateCycler("sc_1", "hello", "padded white-text");
sc_1.action = function () {

}

const pageTitle = "Example Page";

function loadPage() {
    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();
}

function Structure() {
    return build([
        sc_1.create(),
    ]);
}

