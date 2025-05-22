var popmart = require('./popmart.js')

popmart.createUI()


// threads.start(function () {
//     while (true) {
//         sleep(1000);
//         var allowBtn = text('允许').findOne();
//         if (allowBtn) {
//             allowBtn.click()
//             break;
//         }
//     }
// });

// auto();
// requestScreenCapture();
// var template = images.read("./img/confirm-addr.jpg");
// log(template)
// var result = images.matchTemplate(captureScreen(), template, {
//     threshold: 0.7,
//     max: 1
// });
// result.matches.forEach(match => {
//     log("point = " + match.point + ", similarity = " + match.similarity);
// });
// log(result.first().point)
// click(result.first().point.x, result.first().point.y)

