const TWIDTH = 400;
var h = 135;
var w = 400;
var shiftH = 0;
var shiftW = 0;
var c = document.getElementById("divergence_meter_cv");
var cxt = c.getContext("2d");
var img = new Image();
jQuery(img).attr("src", "/wp-content/plugins/wp-divergence-meter/assets/img/numbers.png");
var arr = new Array();
arr = createArr();

function drawBase() {//orphaned
    var baseC = document.createElement("canvas");
    baseC.width = TWIDTH;
    baseC.heigh = 70;
    baseCxt = baseC.getContext("2d");
    baseCxt.fillStyle = "#585858";
    baseCxt.fillRect(0, 0, TWIDTH, 70);
    cxt.drawImage(baseC, 0, 135);
}

//drawBase();

function drawTubes(arr, isHighlighted) {
    var nCanvas = document.createElement("canvas");
    nCanvas.width = TWIDTH;
    nCanvas.heigh = 135;
    nCxt = nCanvas.getContext("2d");
    var line;
    if (isHighlighted == true) {
        line = 1
    } else {
        line = 0
    };
    for (var i = 0; i < arr.length; i++) {
        nCxt.drawImage(img, 45 * arr[i], 135 * line, 45, 135, TWIDTH / 8 * i, 0, 45, 135);
    };
    return nCanvas;
}

function createArr() {
    var numList = [];
    for ( i = 0; i < 8; i++) {
        m = Math.floor(Math.random() * 10);
        //t = setTimeout(loop, 100);
        numList.push(m);

    }
    numList[1] = 10;
    return numList;
}

function blink(greyCVS, shinyCVS) {
    var gc = greyCVS;
    var sc = shinyCVS;
    var scxt = sc.getContext("2d");
    var factor = 0;
    const TIME = 0.02;

    function createImage() {
        var sc2 = document.createElement("canvas");
        sc2.width = TWIDTH;
        sc2.height = 135;
        scxt2 = sc2.getContext("2d");
        factor += TIME;
        cxt.clearRect(0, 0, sc2.width, sc2.height);
        cxt.drawImage(gc, shiftW, shiftH);
        scxt2.globalAlpha = factor;
        scxt2.drawImage(sc, 0, 0);
        cxt.drawImage(sc2, shiftW, shiftH);
        if (factor >= 2) {
            clearInterval(intUp);
            intDown = setInterval(createImage2, TIME);
        }
    }

    function createImage2() {
        var sc2 = document.createElement("canvas");
        sc2.width = TWIDTH;
        sc2.height = 135;
        scxt2 = sc2.getContext("2d");
        factor -= TIME;
        cxt.clearRect(0, 0, sc2.width, sc2.height);
        cxt.drawImage(gc, shiftW, shiftH);
        scxt2.globalAlpha = factor;
        scxt2.drawImage(sc, 0, 0);
        cxt.drawImage(sc2, shiftW, shiftH);
        if (factor <= 0) {
            clearInterval(intDown);
            cxt.clearRect(0, 0, sc2.width, sc2.height);
            cxt.drawImage(gc, shiftW, shiftH);
        }
    }

    intUp = setInterval(createImage, TIME);
}

function loop() {
    arr = createArr();
    cxt.drawImage(drawTubes(arr, false), shiftW, shiftH);
}

function stopLoop() {
    clearInterval(loop0);
    blink(drawTubes(arr, false), drawTubes(arr, true));
}

function changeWorldLine() {
    try {
        clearInterval(loop0);
        clearTimeout(blink0);
    } catch(err) {
    }
    loop0 = setInterval(loop, 50);
    blink0 = setTimeout(stopLoop, 3000);
}


jQuery(img).load(function() {
    changeWorldLine();
});
jQuery("#cwl").click(function() {
    changeWorldLine();
});