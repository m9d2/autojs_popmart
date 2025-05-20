var ocr = require("./ocr.js");
var color="#009688";
function createUI() {
    ui.layout(
        <drawer id="drawer">
            <vertical>
                <appbar>
                    <toolbar id="toolbar" title="" h="60" />
                    <tabs id="tabs" />
                </appbar>
                <viewpager id="viewpager">
                    <frame>
                        <text text="第一页内容" textColor="black" textSize="16sp" />
                    </frame>
                    <frame>
                        <text text="第二页内容" textColor="red" textSize="16sp" />
                    </frame>
                    <frame>
                        <text text="第三页内容" textColor="green" textSize="16sp" />
                    </frame>
                </viewpager>
            </vertical>
            <vertical layout_gravity="left" bg="#ffffff" w="280">
                <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg" />
                <list id="menu">
                    <horizontal bg="?selectableItemBackground" w="*">
                        <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                        <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                    </horizontal>
                </list>
            </vertical>
        </drawer>

    );

    //创建选项菜单(右上角)
    ui.emitter.on("create_options_menu", menu => {
        menu.add("设置");
        menu.add("关于");
    });
    //监听选项菜单点击
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case "设置":
                toast("还没有设置");
                break;
            case "关于":
                alert("关于", "Auto.js界面模板 v1.0.0");
                break;
        }
        e.consumed = true;
    });
    activity.setSupportActionBar(ui.toolbar);
    //设置滑动页面的标题
    ui.viewpager.setTitles(["标签一", "标签二", "标签三"]);
    //让滑动页面和标签栏联动
    ui.tabs.setupWithViewPager(ui.viewpager);
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
    ui.menu.setDataSource([{
        title: "选项一",
        icon: "@drawable/ic_android_black_48dp"
    }, {
        title: "选项二",
        icon: "@drawable/ic_settings_black_48dp"
    }, {
        title: "选项三",
        icon: "@drawable/ic_favorite_black_48dp"
    }, {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
    ]);
    ui.menu.on("item_click", item => {
        switch (item.title) {
            case "退出":
                ui.finish();
                toast("退出")
                break;
            case "选项一":
                //ui.finish();
                toast("选项一")
                break;
            case "选项二":
                //ui.finish();
                toast("选项二")
                break;
            case "选项三":
                //ui.finish();
                toast("选项三")
                break;
        }
    })

    // ui.execute.click(function () {
    //     threads.start(function () {
    //         doJob();
    //     });
    // });

    // ui.timing.click(function () {
    //     threads.start(function () {
    //         while (true) {
    //             sleep(1000);
    //             var allowBtn = text('允许').findOne();
    //             if (allowBtn) {
    //                 allowBtn.click()
    //                 break;
    //             }
    //         }
    //     });
    //     threads.start(function () {
    //         launch("com.tencent.mm");
    //         ocr.detect().findPartialTextLastOne('泡泡')?.clickCenter();
    //         sleep(1000);
    //         doJob();
    //     });
    // });

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