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
    return '<'+tag+sp()+ attributes+'>';
}
function cl(tag) {
    return '</'+tag+'>';
}
//write attribute
function wa(attr, text) {
    return attr+'="'+text +'"'+ sp();
}
function waE(a, b, attr, text) {
    if(a===b) return wa(attr, text);
    else return '';
}
function waNE(a, b, attr, text) {
    if(a!==b) return wa(attr, text);
    else return '';
}
//text transfer
function tt(text) {
    return text + sp();
}
function ttE(a, b, text) {
    if(a===b) return tt(text);
    else return '';
}
function ttNE(a, b, text) {
    if(a!==b) return tt(text);
    else return '';
}
function ttF(functionName, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    return '"'+ functionName + "(" + ttNE(a, undefined, a) + 
            ttNE(b, undefined, ", " + b) + ttNE(c, undefined, ", " + c) + 
            ttNE(d, undefined, ", " + d) + ttNE(e, undefined, ", " + e) + 
            ttNE(f, undefined, ", " + f) + ttNE(g, undefined, ", " + g) + 
            ttNE(h, undefined, ", " + h) + ttNE(i, undefined, ", " + i) + 
            ttNE(j, undefined, ", " + j) + ttNE(k, undefined, ", " + k) + 
            ttNE(l, undefined, ", " + l) + ttNE(m, undefined, ", " + m) + 
            ttNE(n, undefined, ", " + n) + ttNE(o, undefined, ", " + o) + 
            ttNE(p, undefined, ", " + p) + ");" +'"';
}
//parse undefined
function pu(attr) {
    if(attr===undefined) attr = '';
    return attr;
}
//parse className
function pcn(className) {
    if(className===undefined||className==='') className = '';
    else className = ' ' + className;
    return className;
}

function Div(contents, className, id, other) {
    id = pu(id); other = pu(other);

    className = pcn(className);
    return(
        op("div",
            waNE(id, "", "id", id) +
            wa("class", ("Div" + className)) +
            other

        ) + contents + cl("div")
    );
}

function A(href, target, contents, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("a",
                wa("href", href) + 
                waNE(target, "download", "target", target) +
                waNE(id, "", "id", id) +   
                wa("class", ("anchor" + className)) +
                other +
                ttE(target, "download", "download")

            ) + contents + cl("a")
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            A(href, target, contents, "NO_DIV", className, id, other),
            "A"+ divClassName)
        );

    }
}
function H(size, text, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("h"+size,
                waNE(id, "", "id", id) +   
                wa("class", ("header-"+size + className)) +
                other

            ) + text + cl("h"+size)
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            H(size, text, "NO_DIV", className, id, other),
            "H"+ divClassName)
        );

    }
}
function Img(src, alt, width, height, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("img",
                wa("src", src) +
                wa("alt", alt) +
                wa("width", width) +
                wa("height", height) +
                waNE(id, "", "id", id) +   
                wa("class", ("image" + className)) +
                other

            )
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            Img(src, alt, width, height, "NO_DIV", className, id, other),
            "Img"+ divClassName)
        );

    }
}
function P(text, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("p",
                //attributes
                waNE(id, "", "id", id) +   
                wa("class", ("paragraph" + className)) +
                other

            ) + text + cl("p")
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            P(text, "NO_DIV", className, id, other),
            "P"+ divClassName)
        );

    }
}
function Button(contents, divClassName, className, id, other) {
    id = pu(id); other = pu(other);

    if(divClassName === "NO_DIV") {
        className = pcn(className);

        return(
            op("button",
                wa("type", "button") +
                waNE(id, "", "id", id) +   
                wa("class", ("button" + className)) +
                other

            ) + contents + cl("button")
        );

    } else {
        divClassName = pcn(divClassName);

        return( Div(
            Button(contents, "NO_DIV", className, id, other),
            "Button"+ divClassName)
        );

    }
}