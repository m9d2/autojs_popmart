let utils = require("./utils.js");

module.exports.start = function () {
    images.requestScreenCapture();
    setInterval(() => {
        utils.clickButton('到店取');
        sleep(1000)
        utils.clickButton('送到家');
    }, 1000)
}