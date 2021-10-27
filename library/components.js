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
