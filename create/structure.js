function Structure() {
    return build([
        P("hello world", backgroundColorCycler.state()),
        backgroundColorCycler.create()
    ]);
}