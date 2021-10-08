function loadPage() {
    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();
}

var firstParagraph = B("Turtles are an order of reptiles known as Testudines;") + " characterized by a shell developed from their skeleton. Turtles were historically considered part of a group of reptiles known as Anapsida but more recent studies place them with other modern reptiles and birds in Diapsida, usually closer to Archosauria (crocodilians and birds) than Lepidosauria (tuataras, lizards and snakes). Modern turtles are divided into two major groups, the Pleurodira (side necked turtles) and Cryptodira (hidden neck turtles) which differ in the way the head is retracted. There are 360 recent (after 1500 AD) species of turtles and include tortoises and terrapins; which are widely distributed across the world's continents and oceans."

function Structure() {
    return (
        ExampleHeader() +
        ExamplePage()
    );
}

const pageTitle = "Example Page";

function ExampleHeader() {
    return (
        Div(
            H(1, "LearnAboutTurtles.com", "NO_DIV", "header-text"),
            "header")
    );
}

function ExamplePage() {
    return (
        Div(
            P(firstParagraph, "paragraph-holder", "text"),
            "center", "content-below-header")
    );
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
