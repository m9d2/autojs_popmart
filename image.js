function match(path) {
    var template = images.read("./img/" + path);
    var start  = Date.now();
    var result = images.matchTemplate(captureScreen(), template, {
        threshold: 0.8,
        max: 10
    });
    log("match time = " + (Date.now() - start) + "ms", path, result.first());
    template.recycle();
    return result.first() || null;
}

function clickOnce(image) {
    var x = image.point?.x;
    var y = image.point?.y;
    if (!x || !y) {
        return;
    }
    click(x, y)
    sleepRandom();
}

function sleepRandom() {
    sleep(400)
    // sleep(Math.random() * (100 - 300) + 100)
}

module.exports = {
    match: match,
    clickOnce: clickOnce
}