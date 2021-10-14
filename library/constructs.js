class StateCycler {
    constructor(id, contents, className, states, state) {
        this.id = id;
        contents = pu(contents); this.contents = contents;

        this.className = "state-cycler";
        if (pu(className) !== "") this.className = this.className + " " + className;

        this.states = ["disabled", "enabled"]; this.state = 0;
        if (pu(states) !== "") this.states = states;
        if (pu(state) !== "") this.state = state;
    }

    create() {
        return Div(this.load(), "", this.id + "_container");
    }

    load() {
        return Button(
            this.contents, "NO_DIV",
            this.className + " " + this.states[this.state],
            this.id, onClick(this.id + "." + "handleClick")
        );
    }

    cycle() {
        this.state++;
        this.state %= this.states.length;
        document.getElementById(this.id + "_container").innerHTML = this.load();
    }

    handleClick() {
        this.cycle(); this.action();
    }

    action() { }
}