"use strict";
exports.__esModule = true;
exports.useConfetti = exports.Confetti = exports.ConfettiProvider = void 0;
var react_1 = require("react");
var canvas_confetti_1 = require("canvas-confetti");
var ConfettiContext = react_1["default"].createContext(null);
exports.ConfettiProvider = function (_a) {
    var _b = _a.children, children = _b === void 0 ? null : _b;
    var canvasRef = react_1.useRef();
    var confettiRef = react_1.useRef();
    var dropConfetti = react_1.useMemo(function () { return function () {
        var _a;
        if (confettiRef.current && canvasRef.current) {
            canvasRef.current.style.visibility = "visible";
            (_a = confettiRef
                .current({
                particleCount: 800,
                spread: 200,
                origin: { x: 0.5, y: 0.4 }
            })) === null || _a === void 0 ? void 0 : _a["finally"](function () {
                if (canvasRef.current) {
                    canvasRef.current.style.visibility = "hidden";
                }
            });
        }
    }; }, []);
    react_1.useEffect(function () {
        if (canvasRef.current && !confettiRef.current) {
            canvasRef.current.style.visibility = "hidden";
            confettiRef.current = canvas_confetti_1["default"].create(canvasRef.current, {
                resize: true,
                useWorker: true
            });
        }
    }, []);
    var canvasStyle = {
        // width: '100%',
        // height: '100vh',
        // position: 'absolute',
        // zIndex: 1,
        // top: 500,
        // left: 0,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "transparent",
        zIndex: 1
    };
    return (react_1["default"].createElement(ConfettiContext.Provider, { value: { dropConfetti: dropConfetti } },
        react_1["default"].createElement("canvas", { ref: canvasRef, style: canvasStyle }),
        children));
};
exports.Confetti = function () {
    var dropConfetti = exports.useConfetti().dropConfetti;
    react_1.useEffect(function () {
        dropConfetti();
    }, [dropConfetti]);
    return react_1["default"].createElement(react_1["default"].Fragment, null);
};
exports.useConfetti = function () {
    var context = react_1.useContext(ConfettiContext);
    return context;
};
