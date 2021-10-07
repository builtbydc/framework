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
            H(1, "Example Page", "NO_DIV", "header-text"), "header")
    );
}

function ExamplePage() {
    return (
        P(firstParagraph, "paragraph-holder", "text")
    );
}