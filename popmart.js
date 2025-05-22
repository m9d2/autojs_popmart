var ocr = require("./ocr.js");
var img = require("./image.js")
function createUI() {
    if (!auto.service) {
        toast("请先启用无障碍服务");
        auto.waitFor();
    }
    initAccurateTime()
    doJob();
}

var w;
var shopImg = "shop.jpg";
var shopSelectImg = "shop-select.jpg";
var homeImg = "home.jpg";
var okImg = "ok.jpg";
var confirmImg = "confirm.jpg";
var confirmAddrImg = "confirm-addr.jpg";
var baseTimestamp = null;   // 网络返回的北京时间戳
var localTimestamp = null;  // 获取网络时间时的本地时间戳

function doJob() {
    w = floaty.window(
        <frame gravity="center" bg="#000000" w="60" h="auto" radius="20" alpha="0.5" >
            <vertical margin="4">
                <text textColor="#ffffff" textSize="8">北京时间：</text>
                <text id="time" textColor="#ffffff" textSize="8"></text>
            </vertical>
        </frame>
    );

    w.setPosition(10, 400);

    threads.start(function () {
        while (true) {
            sleep(100);
            var time = getAccurateTime();
            w.time.setText(time);
        }
    });

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
        var shop = img.match(shopImg)
        if (shop) {
            img.clickOnce(shop)
            var shopSelect = img.match(shopSelectImg)
            if (shopSelect) {
                var ok = img.match(okImg)
                if (ok) {
                    img.clickOnce(ok)
                }
            }
        }

        for (var i = 0; i < 3; i++) {
            var confirmInfoAndPay = img.match(confirmImg)
            if (confirmInfoAndPay) {
                img.clickOnce(confirmInfoAndPay)
                var confirmAddr = img.match(confirmAddrImg)
                if (confirmAddr) {
                    for (var j = 0; j < 3; j++) {
                        img.clickOnce(confirmAddr)
                    }
                    toast("抢到了")
                    exit()
                }
            }
        }

        var home = img.match(homeImg)
        if (home) {
            img.clickOnce(home)
        }
    }
}

function getCurrentTimeHHMMSSMS() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function initAccurateTime() {
    var response = http.get('http://bjtime.qianwanku.com/sj.asp');
    const text = response.body.string();
    const networkTime = parseInt(text.trim());

    if (isNaN(networkTime)) throw new Error('无效时间戳');

    baseTimestamp = networkTime;
    localTimestamp = Date.now();
}

/**
 * 获取当前“准确时间”，格式 HH:mm:ss.SSS
 */
function getAccurateTime() {
    if (baseTimestamp === null || localTimestamp === null) {
        throw new Error('请先调用 initAccurateTime() 初始化');
    }
    const now = Date.now();
    const adjusted = baseTimestamp + (now - localTimestamp); // 加上偏差
    const date = new Date(adjusted);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    const ms = date.getMilliseconds().toString().padStart(3, '0');
    return `${h}:${m}:${s}.${ms}`;
}

module.exports = {
    createUI
}