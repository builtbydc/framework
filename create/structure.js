const pageTitle = "Example Page";

function loadPage() {
    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();
}

function Structure() {
    return build([
        backgroundColorCycler.create(),
        Div("", backgroundColorCycler.state(), "background")
    ]);
}