let store = []
function getButton(text) {
    let storeObj = store.find(o => o.label === text)
    if (storeObj) {
        return storeObj;
    }
    let img = images.captureScreen();
    let result = ocr.detect(img);
    let button = result.find(o => o.label === text);
    if (button) {
        store.push(button);
    }
    return button;
}

module.exports.clickButton = function (text) {
    let button = getButton(text);
    if (button) {
        click(button.bounds);
    }
}