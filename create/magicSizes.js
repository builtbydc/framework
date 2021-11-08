
function loadMagicSizes() {
    document.getElementById("magic-sizes").innerHTML = build([
        magicSize("font-size", "text", "", 10, 13),
        magicSize("width", "", "yellow", 50, 30),
        magicSize("height", "", "yellow", 80, 10)

    ])
}