function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}
function loadPage() {
    document.getElementById("page-title").innerHTML = pageTitle;
    document.getElementById("contents").innerHTML = Structure();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    }

    loadMagicSizes();

    document.getElementById("newFlip-container").addEventListener("mouseenter", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("deanimate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("animate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("animate");
            }
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("shown");
            }
        }, 750);
    });
    document.getElementById("newFlip-container").addEventListener("mouseleave", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("animate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("deanimate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("shown");
                document.getElementById("flip-particle-" + i).classList.remove("deanimate");
            }
        }, 750);
    });

    document.getElementById("newFlip-container").addEventListener("touchstart", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("deanimate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("animate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("animate");
            }
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("shown");
            }
        }, 750);
    });
    document.getElementById("newFlip-container").addEventListener("touchend", function (event) {
        for (let i = 0; i < flipResolution; i++) {
            document.getElementById("flip-particle-" + i).classList.remove("animate");
        }
        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.add("deanimate");
            }
        }, 1);

        setTimeout(function () {
            for (let i = 0; i < flipResolution; i++) {
                document.getElementById("flip-particle-" + i).classList.remove("shown");
                document.getElementById("flip-particle-" + i).classList.remove("deanimate");
            }
        }, 750);
    });

    document.getElementById("flipStyle").innerHTML = newFlip.animate();


}