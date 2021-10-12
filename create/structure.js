const pageTitle = "Example Page";

function Structure() {
    return build([
        PageHeader(),

    ]);
}

function PageHeader() {
    return build([
        Header(
            build([
                LeftHeader(),
                CenterHeader(),
                RightHeader()
            ])
        )
    ]);
}

function LeftHeader() {
    return build([
        Toolbox()
    ]);
}
function Toolbox() {
    return build([
        StateCycler(sc_1)
    ]);
}

const DEFAULT_STATES = ["red", "blue"];

const sc_1 = {
    id: "sc_1",
    states: DEFAULT_STATES, state: 0,
    contents: "switch 1"
};

function StateCycler(sc) {
    sc.className = pu(sc.className)
    return (
        Div(
            Button(sc.contents, "NO_DIV",
                sc.className === "" ? sc.states[sc.state] : sc.className + " " + sc.states[sc.state],
                sc.name,
                "onclick=" + ttF("cycleState", sc.id)
            ),

            "", sc.id + "_holder")
    );
}

function cycleState(sc) {
    sc.state++;
    sc.state %= sc.states.length;
    counter++;

    document.getElementById(sc_1.id + "_holder").innerHTML = StateCycler(sc);
}

function CenterHeader() {
    return build([
        Title()
    ]);
}
var counter = 0;
function Title() {
    return build([
        P(B("Website" + counter), "", "title", "", "onclick=" + ttF("loadPage"))
    ]);
}

function RightHeader() {
    return build([
        Menu()
    ]);
}
function Menu() {
    return build([

    ]);
}

