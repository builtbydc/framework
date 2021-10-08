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