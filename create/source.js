function switchState(state) {
    var result = "";
    if (state === "disabled") result = "enabled";
    else result = "disabled";
    loadPage();
    return result;
}