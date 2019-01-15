var config = require('../../config.js');

api_key = config.api_key;
api_secret = config.api_secret;
var _scannerIsRunning = false;

// -- node_modules
// -- websites
// ---- common
// ------- config.js
// ---- testing
// ------- test.js


// function to have only unique values in array to avoid duplicates
// =============================================================================
var onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}
const resultArray = [];

var uniqueArray = [];

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
            "upc_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            console.log(err);
            return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    });


    Quagga.onDetected(function (result) {
        console.log("RIGHT HERE "+ result.codeResult.code);
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        var resultCode = result.codeResult.code
        resultArray.push(resultCode);
        return uniqueArray = resultArray.filter( onlyUnique );
    });
}






const startStop = () => {
    if (_scannerIsRunning) {
        console.log("scanner off");
        console.log(resultArray);
        console.log("=========================================");
        console.log(uniqueArray);
        Quagga.stop();
        _scannerIsRunning = false;
    } else if(!_scannerIsRunning) {
        console.log("scanner on");
        startScanner();
    }

}


// Axios post to get data of the resultArray to the form page
// =============================================================================
// const loadBarCodes = () => {
//     console.log('loadBarCodes');
//     const barCodeArray = resultArray;
//     axios.post('/bar-codes', (req, res) => {
//         barCodeArray:barCodeArray
//     }).then(() => {
//         //maybe sort or thing... working on route
//     }).catch((err) => {
//         console.log(err);
//     });
// }
//
// const getBarCodes = () => {
//     console.log("getBarCodes");
//     const barCodeArray = resultArray;
//     axios.get('/bar-codes', (req, res) => {
//         barCodeArray:barCodeArray
//     }).then((barCodeArray) => {
//         document.getElementById('bar-codes').innerHTML = barCodeArray
//     }).catch((err) => {
//         console.log(err);
//     });
// }
