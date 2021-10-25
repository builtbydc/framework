const backgroundColorCycler =
    new StateCycler("backgroundColorCycler", "Press Me", "padded white-text", ["white", "yellow", "blue"]);

backgroundColorCycler.action = function () {
    loadPage();
}