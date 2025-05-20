let popmart = require('./popmart.js')
var timer = require('./timer.js')

log("开始执行")
// popmart.start()
var time = "17:56:20"
images.requestScreenCapture();
timer.scheduleTaskAt(time, () => {
    log("执行任务: ", time);
    popmart.start()
});