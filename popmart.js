var ocr = require("./ocr.js");

module.exports.start = function () {
    while (true) {
        ocr.detect().findPartialText('到家')?.clickCenter()
        sleepRandom()
        var shop = ocr.detect().findText('到店取');
        if (shop) {
            shop.clickCenter()
            sleepRandom()
            var okResult = ocr.detect().findPartialText('确定');
            if (okResult) {
                okResult.clickCenter()
                while (true) {
                    var payResult = ocr.detect().findPartialText('确认信息井支付')
                    if (payResult) {
                        payResult.clickCenter()
                    }
                    var confirmResult = ocr.detect().findPartialText('就是这家')
                    if (confirmResult) {
                        notice('抢到了！！！');
                        log('抢到了！！！')
                        confirmResult.clickCenter()
                        return
                    }
                }
            }
        }
    }
}


function sleepRandom() {
    // sleep(1000)
    sleep(Math.random() * (100 - 300) + 100)
}

