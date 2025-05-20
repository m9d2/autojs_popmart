var ocr = require("./ocr.js");

function createUI() {
    ui.layout(
        <vertical margin="30">
            {/* <button id="execute" text="立即执行" bg="#44b549" textColor="#ffffff" /> */}
            <button id="timing" text="立即执行" bg="#44b549" textColor="#ffffff" />
        </vertical>
    );

    // ui.execute.click(function () {
    //     threads.start(function () {
    //         doJob();
    //     });
    // });

    ui.timing.click(function () {
        threads.start(function () {
            while (true) {
                sleep(1000);
                var allowBtn = text('允许').findOne();
                if (allowBtn) {
                    allowBtn.click()
                    break;
                }
            }
        });
        threads.start(function () {
            launch("com.tencent.mm");
            ocr.detect().findPartialTextLastOne('泡泡')?.clickCenter();
            sleep(1000);
            doJob();
        });
    });

    // var w = floaty.rawWindow(
    //     <frame gravity="center" bg="#44ffcc00" padding="10">
    //         <text id="text">悬浮文字</text>
    //     </frame>
    // );

    // w.setPosition(-1, 200);
}


function doJob() {
    threads.start(function () {
        while (true) {
            sleep(1000);
            var allowBtn = text('允许').findOne();
            if (allowBtn) {
                allowBtn.click()
                break;
            }
        }
    });
    images.requestScreenCapture();
    while (true) {
        ocr.detect().findPartialText('立即购买')?.clickCenter();
        sleepRandom()
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

module.exports = {
    createUI
}