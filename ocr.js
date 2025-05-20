
const cache = [];

function wrapOCRResult(result) {
    return {
        label: result.label,
        bounds: result.bounds,
        clickCenter: function () {
            if (this.bounds) {
                var x = this.bounds.centerX();
                var y = this.bounds.centerY();
                click(x, y);
            }
        },
        click: function (x, y) {
            click(x, y)
        }
    };
}

function detect() {
    var img = images.captureScreen();
    var results = ocr.detect(img);
    return {
        results: results,
        findText: function (text) {
            var result = results.find(o => o.label === text);
            // log(text, result)
            return result ? wrapOCRResult(result) : null;
        },
        findPartialText: function (text) {
            var result = results.find(o => o.label.includes(text))
            // log(text, result)
            log(result)
            return result ? wrapOCRResult(result) : null;
        },
        findPartialTextLastOne: function (text) {
            var result = results.filter(o => o.label.includes(text))
            log(result)
            return result ? wrapOCRResult(result.at(-1)) : null;
        },
        findTextCache: function (text) {
            var result = null;
            result = cache.find(o => o.label === text);
            if  (!result) {
                result = results.find(o => o.label === text);
                if (result) {
                    cache.push(result);
                }
            }
            return result ? wrapOCRResult(result) : null;
        }
    };
}

module.exports = {
    detect: detect
};