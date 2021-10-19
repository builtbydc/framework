const backgroundColorCycler = new StateCycler("backgroundColorCycler", "change", "padded darker white-text", ["black", "yellow", "blue"]);
backgroundColorCycler.action = function () {
    loadPage();
}