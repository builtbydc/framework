function loadPage() {
    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();
}

function switchState(state) {
    var result = "";
    if (state === "disabled") result = "enabled";
    else result = "disabled";
    loadPage();
    return result;
}

const pageTitle = "Example Page";

function Structure() {
    return build([
        PageHeader(),

    ]);
}

function PageHeader() {
    return build([
        Header(
            build([
                LeftHeader(),
                CenterHeader(),
                RightHeader()
            ])
        )
    ]);
}

function LeftHeader() {
    return build([
        Toolbox()
    ]);
}
function Toolbox() {
    return build([
        StateCycler(sc_1)
    ]);
}

const DEFAULT_STATES = ["red", "blue"];

const sc_1 = {
    id: "sc_1",
    states: DEFAULT_STATES, state: 0,
    contents: "switch 1"
};

function StateCycler(sc) {
    sc.className = pu(sc.className)
    return (
        Div(
            Button(sc.contents, "NO_DIV",
                sc.className === "" ? sc.states[sc.state] : sc.className + " " + sc.states[sc.state],
                sc.name,
                "onclick=" + ttF("cycleState", sc.id)
            ),

            "", sc.id + "_holder")
    );
}

function cycleState(sc) {
    sc.state++;
    sc.state %= sc.states.length;
    counter++;

    document.getElementById(sc_1.id + "_holder").innerHTML = StateCycler(sc);
}

function CenterHeader() {
    return build([
        Title()
    ]);
}
var counter = 0;
function Title() {
    return build([
        P(B("Website" + counter), "", "title", "", "onclick=" + ttF("loadPage"))
    ]);
}

function RightHeader() {
    return build([
        Menu()
    ]);
}
function Menu() {
    return build([

    ]);
}


/*

function Tag(attributes, contents, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("tag",
                //attributes
                waNE(id, "", "id", id) +   
                wa("class", ("tag++" + className)) +
                other

            ) + contents + cl("tag")
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            Tag(attributes, contents, "NO_DIV", className, id, other),
            "Tag"+ divClassName)
        );

    }
}

*/

//space, open tag, close tag
function sp() {
    return ' ';
}
function op(tag, attributes) {
    return '<' + tag + sp() + attributes + '>';
}
function cl(tag) {
    return '</' + tag + '>';
}
//text transfer
function ttL(text) {
    return "'" + text + "'";
}
function ttE(ttE_a, ttE_b, text) {
    if (ttE_a === ttE_b) return text;
    else return '';
}
function ttNE(ttNE_a, ttNE_b, text) {
    if (ttNE_a !== ttNE_b) return text;
    else return '';
}
//up to 16 parameters!
function ttF(functionName, ttF_a, ttF_b, ttF_c, ttF_d, ttF_e, ttF_f, ttF_g, ttF_h, ttF_i, ttF_j, ttF_k, ttF_l, ttF_m, ttF_n, ttF_o, ttF_p) {
    return ttL(functionName + '(' + ttNE(ttF_a, undefined, ttF_a) +
        ttNE(ttF_b, undefined, ', ' + ttF_b) + ttNE(ttF_c, undefined, ', ' + ttF_c) +
        ttNE(ttF_d, undefined, ', ' + ttF_d) + ttNE(ttF_e, undefined, ', ' + ttF_e) +
        ttNE(ttF_f, undefined, ', ' + ttF_f) + ttNE(ttF_g, undefined, ', ' + ttF_g) +
        ttNE(ttF_h, undefined, ', ' + ttF_h) + ttNE(ttF_i, undefined, ', ' + ttF_i) +
        ttNE(ttF_j, undefined, ', ' + ttF_j) + ttNE(ttF_k, undefined, ', ' + ttF_k) +
        ttNE(ttF_l, undefined, ', ' + ttF_l) + ttNE(ttF_m, undefined, ', ' + ttF_m) +
        ttNE(ttF_n, undefined, ', ' + ttF_n) + ttNE(ttF_o, undefined, ', ' + ttF_o) +
        ttNE(ttF_p, undefined, ', ' + ttF_p) + ');');
}
//write attribute
function wa(attr, text) {
    return attr + '=' + ttL(text) + sp();
}
function waE(waE_a, waE_b, attr, text) {
    if (waE_a === waE_b) return wa(attr, text);
    else return '';
}
function waNE(waNE_a, waNE_b, attr, text) {
    if (waNE_a !== waNE_b) return wa(attr, text);
    else return '';
}
//parse undefined
function pu(attr) {
    if (attr === undefined) attr = '';
    return attr;
}

function build(arr) {
    var out = "";
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
        op("b") +
        contents +
        cl("b")
    )
}
