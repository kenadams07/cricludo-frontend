(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/Lenis.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "destroyLenis",
    ()=>destroyLenis,
    "getLenis",
    ()=>getLenis,
    "startLenis",
    ()=>startLenis,
    "stopLenis",
    ()=>stopLenis
]);
// lib/lenis.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
;
let lenis = null;
const getLenis = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!lenis) {
        lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: false
        });
    }
    return lenis;
};
const startLenis = ()=>{
    getLenis()?.start();
};
const stopLenis = ()=>{
    getLenis()?.stop();
};
const destroyLenis = ()=>{
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/shared/Lenis.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LenisProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Lenis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/Lenis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LenisProvider() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LenisProvider.useEffect": ()=>{
            const lenis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Lenis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLenis"])();
            if (!lenis) return;
            // Sync Lenis scroll with ScrollTrigger
            lenis.on('scroll', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
            // Add Lenis's requestAnimationFrame to GSAP's ticker
            // This ensures that animations and scrolling are in sync
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.add({
                "LenisProvider.useEffect": (time)=>{
                    lenis.raf(time * 1000);
                }
            }["LenisProvider.useEffect"]);
            // Disable GSAP's internal lag smoothing for better performance with Lenis
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.lagSmoothing(0);
            return ({
                "LenisProvider.useEffect": ()=>{
                    // Cleanup
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.remove({
                        "LenisProvider.useEffect": (time)=>{
                            lenis.raf(time * 1000);
                        }
                    }["LenisProvider.useEffect"]);
                    lenis.off('scroll', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Lenis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["destroyLenis"])();
                }
            })["LenisProvider.useEffect"];
        }
    }["LenisProvider.useEffect"], []);
    return null;
}
_s(LenisProvider, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = LenisProvider;
var _c;
__turbopack_context__.k.register(_c, "LenisProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/FooterBg.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/FooterBg.bb3dd27f.png");}),
"[project]/app/assets/images/FooterBg.png.mjs { IMAGE => \"[project]/app/assets/images/FooterBg.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$FooterBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/FooterBg.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$FooterBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1920,
    height: 480,
    blurWidth: 8,
    blurHeight: 2,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR42gFCAL3/AOqurgaug6hTBjOl+gM/s/8DP7P/BjOl+q6DqFTZpKQGAJV4eAbRmKwvHUGp4wJSwf8CUsH/HUGp48+YrC9+Z2cFKKEfwygTLqAAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/GooglePlay.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/GooglePlay.6c1f4c16.png");}),
"[project]/app/assets/images/GooglePlay.png.mjs { IMAGE => \"[project]/app/assets/images/GooglePlay.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$GooglePlay$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/GooglePlay.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$GooglePlay$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 165,
    height: 47,
    blurWidth: 8,
    blurHeight: 2,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR42gFCAL3/AAZQSv4eOR3/Hh4d/yMjI/8jIyP/EhIS/xISEv8HBwf8AB83P/ouJxf7HR0b+ykpKfsyMjL7JSUl+yoqKvsaGhr4x/EWKyUnO74AAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/AppStore.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/AppStore.13d9ba14.png");}),
"[project]/app/assets/images/AppStore.png.mjs { IMAGE => \"[project]/app/assets/images/AppStore.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$AppStore$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/AppStore.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$AppStore$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 165,
    height: 47,
    blurWidth: 8,
    blurHeight: 2,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAAR0lEQVR42g3IMQ7AIAgFUEdHb+CiUQMkzJyKlZM3zU9DXV9Za33unr33ZOYkotx75xgja60oF9+IwJwTZoZzDlQVIoLW2vMDLlsYtvXRJlwAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/ludoLogo.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/ludoLogo.d1cac890.svg");}),
"[project]/app/assets/images/ludoLogo.svg.mjs { IMAGE => \"[project]/app/assets/images/ludoLogo.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$ludoLogo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/ludoLogo.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$ludoLogo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 276,
    height: 276,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/Blue.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Blue.62099971.png");}),
"[project]/app/assets/images/Blue.png.mjs { IMAGE => \"[project]/app/assets/images/Blue.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$Blue$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/Blue.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$Blue$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 2113,
    height: 2554,
    blurWidth: 7,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAA80lEQVR42gHoABf/AD1SWvUlOkLtExwgaQAAAAABAgMMBAUGJQgKDCsASWB3/TlRaP8fLDiYBQcIKxUfI3smPETfOE5Y4gBPY4f9Rlh4/0NSafUhLTboL0FR8UlifP9MZYD9AF5llP5cYpn/Tk5t/0IxRP9FPVX/YWaZ/19pk/0AXFuS/lhTmf9LWGv/YGJV/0xWV/9vbJz/aGuW/gBhS5j2XECe+VBQeP1VXFz/Sk5a/1NNmP9XVJP+ABkTJUkcEyxRPzVawFcvZv9aNmHyVDeH2VE9gNQAAAAAAAICAgM/M1eeXDGO/TkfXa4IBg0hBgUKG3XAWROZithhAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/RulePlayerOne.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/RulePlayerOne.99d9408a.png");}),
"[project]/app/assets/images/RulePlayerOne.png.mjs { IMAGE => \"[project]/app/assets/images/RulePlayerOne.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerOne$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/RulePlayerOne.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerOne$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 364,
    height: 335,
    blurWidth: 8,
    blurHeight: 7,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAA8klEQVR42gHnABj/AAAAAAACAgIACgcFCBoNBScQCgcQBwcHAAICAgAAAAAAAA0NDQBUVFQBkn9yP4hMKtiPZk6PoZ+eCVNTUwENDQ0AAGRkZAHo6OgN9ObeUMeMbOzPmoPN+/f2OOjo6A1jY2MBAMLCwgf+/v4y2dDXn6hwUPmWeIv15+Xsnf///jHDw8MHAN/f3w318vFjp6Gy7aeVav9gd7P/wLzJ6vj29l7e3t4NANvb2wz49PNSoZCZ3ZRxS/+Gd4/80by8yPn4+U7Z2dkMALa2tgX//v4noZOUrz8wMvtbTlry6OLigP///ye1tbUF0791I4LnKEkAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/RulePlayerTwo.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/RulePlayerTwo.37499ad9.png");}),
"[project]/app/assets/images/RulePlayerTwo.png.mjs { IMAGE => \"[project]/app/assets/images/RulePlayerTwo.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerTwo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/RulePlayerTwo.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerTwo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 375,
    height: 371,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AAcHBwBHR0cBtLS0Bdzc3A3f398OwsLCB19fXwEODg4AADk5OQHV1dUJ+PTyMPHn4Vz+/fxU////Munp6Q5eXl4BAIiIiAP7+vkmxpSKpbJmSOrp1MPH//7+h////zK/v78HAJmTkCPCsJuUkVtB7KdpPP/hwZX3//7+wP///1Pa2toOAKCenBDl2tFatJF11bOEQf/BoWj8697Nzv77+FbZ2dkNAH9/fwP39fInuqCFtq19QP23iUv/3LF69PbZvXK0tLMGAC8vLwC9uLMgm4FsuKV1Ov3br2j/4Lx//dzGkbFRT0cXAAQEBABfTD1mlWAu98SaR/zisFj81Z9L+r2cV74iHhQaVOCVA0PcBycAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/RulePlayerThree.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/RulePlayerThree.3d56c1ab.png");}),
"[project]/app/assets/images/RulePlayerThree.png.mjs { IMAGE => \"[project]/app/assets/images/RulePlayerThree.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerThree$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/RulePlayerThree.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerThree$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 299,
    height: 298,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABC0lEQVR42l2Nv0sCUQDH33v3vDu7u1536eEVCXIScSQlUlRIIUkFdmQWNVhD9mN4YeQUFDgVtOQWNNYf0BA0NQX+EbqJm4KTm4f4xMNFP+vny/cDwBAO8wFNnS6qk+TFg/EMGMcra7mNyELnIL7s+IhyMyIRQmBKVmKla7v2/3blJOYNigDArtSIKBzbm9n9rdhuPrHyVX487RYNXzWIPXF3YAZI+LVwUXmimb98Ot0q0RxLWVbPnJ37gBDyQMCclF21vk8iVuP59o59np+xjG6wcMis87ywNDiBqqjQbeJvvt8/9H5TNitMyCwaDLVFUdpzMxAiSfcSupM8cg7Xk+wyuthd0/w/HIf1PmwMPA0qIxQIAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/ball.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/ball.5f9e285d.png");}),
"[project]/app/assets/images/ball.png.mjs { IMAGE => \"[project]/app/assets/images/ball.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$ball$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/ball.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$ball$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 203,
    height: 197,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA6klEQVR42jXOMWvCQBQH8LsINmk7tnQrLZRCoYV+gihR1EUcBFcHF9csDg5ZTKaMoriaIYQgZDOfQ1xUcArZjDipSC7xf0EPfhzv3Z97j6Rp+gdlaEAV/uGNMfZgmiYlKIoJY+3LLuqz06l7C3/Ck+u6Ag/UDqv1YNnuBNvRZJYkSR29b3j2PC8LFKLVujdvtjaL4XiKQOn+g23bWeAHIwrHaN+Kz+cK6l94jeM4r2latsMLvMMXfPBHkIIgyMmyTAi2zaPxyGfym9dhGOZUVaWiKBKi6zq1LIv6vi84jiMYhkEVRSGSJBF+rk2UqI+cFMFqAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/inside frame-4 1.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/inside frame-4 1.757a070b.png");}),
"[project]/app/assets/images/inside frame-4 1.png.mjs { IMAGE => \"[project]/app/assets/images/inside frame-4 1.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$inside__frame$2d$4__1$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/inside frame-4 1.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$inside__frame$2d$4__1$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1468,
    height: 663,
    blurWidth: 8,
    blurHeight: 4,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAj0lEQVR42gGEAHv/AA0KY/8OIHT/EDeF/xFHkf8QSZn/C02s/w0pgv8NCmP+AA4QaP4PKHr/EUOO/xJaoP8RW6f/DFCz/w0ylf8QFW7+ADdYqPA2YbH2LmSz/ilos/8oZ7T/LWK2/zppvf9LfdH+ABotQkEjPFhYQW+kpVaT2t5fo/P3ZKr8/mSp+vpfoe7tUPVBP4ZHfvsAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/manwithbats.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/manwithbats.272aa10e.png");}),
"[project]/app/assets/images/manwithbats.png.mjs { IMAGE => \"[project]/app/assets/images/manwithbats.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manwithbats$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/manwithbats.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manwithbats$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 522,
    height: 723,
    blurWidth: 6,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAx0lEQVR42j2LvQsBYQDG39P56A0vjnyUQmEgznWpo+SSgZJkk8WA1KE4t9xksLnUDQYmrgxitxj5O+xmNuVcuV/P8vR7HoABoOYHhuFm5MJNVptWa7lgi0kHGMLti9GscKFK4s5oQW5ARwlWGuY3c66iLEX+LQx6DzvyJLQXgkaiX68e1qvtZzHjrhBCO/hDxlMNZX96TcYj2aCii3AkTnf587PZkY44bjLrwukJZzOF6Z0qyzcb8gV1oa4gcnhjSbLYdrj8oS9MLibA29QeuwAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/mancatchingball.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/mancatchingball.b62a5e5a.png");}),
"[project]/app/assets/images/mancatchingball.png.mjs { IMAGE => \"[project]/app/assets/images/mancatchingball.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$mancatchingball$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/mancatchingball.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$mancatchingball$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 613,
    height: 824,
    blurWidth: 6,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAvUlEQVR42n3OTwvBYADH8efZbPZfC6U17JmLcaCWIpeRbDXFyYEbpe3iwJ2luMhVypyceCvegZMX4OANKHly9j3+PpcfAP+SqIjM0YLKiukcQTIMHlmWFSfNVji2nYs3WjxU3ZkCACGgKIrp9wbHfbB+HpbB26raKwzf6Ggsq+idbaaye6FacCVpQcRARBheK/uhhPxbyT3dNaPRxQAhQZr14QYZ7ZlesD3LnZ9/vyCMJ1NIlGSF46VEvmg6HwkAIEb21+EJAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/yellowNike.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/yellowNike.a88094a7.png");}),
"[project]/app/assets/images/yellowNike.png.mjs { IMAGE => \"[project]/app/assets/images/yellowNike.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$yellowNike$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/yellowNike.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$yellowNike$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1467,
    height: 199,
    blurWidth: 8,
    blurHeight: 1,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAALElEQVR42gEhAN7/AIJlGIFqUxRpXUkRXFRBD1JGNw1FMCYJLxkTBRgJBwIIjLIGhLWpXkAAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/Black-Titanium.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Black-Titanium.87df7af0.png");}),
"[project]/app/assets/images/Black-Titanium.png.mjs { IMAGE => \"[project]/app/assets/images/Black-Titanium.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$Black$2d$Titanium$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/Black-Titanium.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$Black$2d$Titanium$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 977,
    height: 1396,
    blurWidth: 6,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAA00lEQVR42gHIADf/AC1GTOosRE76LDxDvwMDAw0AAAAAAAAAAAA3Um3/OlBp/y8+T8sRFhdJDRQWUA4VF0QAQ1mD/0ZYd/86SWXWJysz0CUuOvoqMj30AFdclf9cYZr/TFBy2CYeL9hTPE7/RDE8/gBVUJP/V1KZ/05NddgsQy7Ya3Fg/0ZfPf4AWz2d9F1BoflRQHzQOD9H1lhYYv9XU0b+AB0TLEQhFjNPHxgpSDwpVMtXLWj/YzpV/gAAAAAAAAAAAAYGBg1LL2m/YjSU+VgxjejU5EaRMdB6VAAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/family.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/family.e0175622.png");}),
"[project]/app/assets/images/family.png.mjs { IMAGE => \"[project]/app/assets/images/family.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$family$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/family.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$family$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 526,
    height: 696,
    blurWidth: 6,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAA00lEQVR42gHIADf/AF0pGIikTh/FUCsQWQoHBAoAAAAAAAAAAABNJhpwwX5P+Z5pQcNXOSJgEg8PMAgHBxUAgFEzhsB2V+itZzf0jlQq035XQehOOzC1AGNBLGrOeV31v31T/7R5TO67dkbvl184xwAcFBQvjl4857l/SfyqgkDwrYgp7rJ0LMIAFxAKIGFjP9ScnH7+mJVS+IFsL/FHLhZiAAIBAQQtHx5oiEA+9VlDQadKTVemNzpEYQAAAAAAIic1T0RIaLouM0NhDw8QEQ0NDg8yM0TZxdbj7wAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/1.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/1.33163f2b.png");}),
"[project]/app/assets/images/1.png.mjs { IMAGE => \"[project]/app/assets/images/1.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/1.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 293,
    height: 778,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAc0lEQVR42gFoAJf/AD1UYPIaMz/vHjM70ABNZnj8LVBq/zNPXv4ASVx2/TRNbv8uRWP+AE9egf0+UH//M0Rt/gBUXIL+P0qG/zdAc/4AWl2K/kRHj/88P3r+AF5dkP5JRJj/QTyB/QBMR3vzQjiL/TgwdvQ9YS9HLrKU2AAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/2.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/2.39b7a15b.png");}),
"[project]/app/assets/images/2.png.mjs { IMAGE => \"[project]/app/assets/images/2.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/2.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 276,
    height: 758,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAc0lEQVR42gFoAJf/AEpVXvQ/Pkv0NERK2wCUeoj+soaH/5+Agv0AWkVv/m9HYf9eOmH9AGNjXv5/bUf/bW1E/gBbSmX+XTda/1k3Vv4AWUdn/lg0Xv9UM1r+AF1Ia/9cM2H/VzJd/gBVQmP1VDBf/E0sV/AaxTDZOc8HgAAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/3.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/3.f9e78aa1.png");}),
"[project]/app/assets/images/3.png.mjs { IMAGE => \"[project]/app/assets/images/3.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$3$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/3.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$3$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 295,
    height: 746,
    blurWidth: 3,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAc0lEQVR42gFoAJf/ACg2U9gnMUvyQVJy8QBGVG7/TVNh/05jevsARl9Y/1hrX/9IXWD8ADdCZP83R2n/TVht/AA6PmT/OUVt/0xWcPwAPD1p/j1Ec/9NVHP9AD48bf5AQ3n/VFd6/QAzNmX1OT5y/kdJaPVDji6A8lxZBgAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/cricludo.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/cricludo.ded8090f.png");}),
"[project]/app/assets/images/cricludo.png.mjs { IMAGE => \"[project]/app/assets/images/cricludo.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$cricludo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/cricludo.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$cricludo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 445,
    height: 447,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AAAAAAAAAAAAJB0JLVtNGWUPDgcPEwcFFxUGBBcAAAAAAAAAAAAIBwUJdF4wnMSiUe+0k1++kV5Kw4BFNqgeFA4eAAEBAQE6Oz1Up6qi8ce+i//cqXz/vYJg/819WO8/Kh1AABMVGSVDW4PLb462/4ehpP+2r3f/rrtl/62vZuInIxopAEY7QJtZZIX6f4uf/6rCmP+ktXL/gotM/4SUStIWFQwZAFRDKGmEclKrR0RBgX50Va15f0fQgodG6ZtxP+VHIxpTABUQCBmJcEGSGBQMGAQCAQYOCgYVHhcMLi4WD10iDgo5AAEBAAEcFAsiCAYECgAAAAAAAAAAAAAAAAAAAAAAAAAA3sNQ3IGVqiUAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/dice.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/dice.a62297d3.png");}),
"[project]/app/assets/images/dice.png.mjs { IMAGE => \"[project]/app/assets/images/dice.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$dice$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/dice.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$dice$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 84,
    height: 71,
    blurWidth: 8,
    blurHeight: 7,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAfUlEQVR42lWOOwrFIBREs//FpE4ae8HCThC0FRHRTvE3DwXDs7i3GIYz5xpjYF8pBa01/GfXfL13hBAghID3Himls5BzBiEEz/NAKQVjzEdahVorOOeglOJ9XzDGPsq1Uc65RbjvG1LKk7AFrbXQWq/J6XVIzjDGuGQnfhd+JGbUy8jxgSwAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/cCrush.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/cCrush.d90ab034.png");}),
"[project]/app/assets/images/cCrush.png.mjs { IMAGE => \"[project]/app/assets/images/cCrush.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$cCrush$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/cCrush.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$cCrush$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 2934,
    height: 730,
    blurWidth: 8,
    blurHeight: 2,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR42gFCAL3/APKK1P70lNf/9aDV//Og2P/yndv/7KDc/+KR4P/jh+L/APZ91f77k9r/+6Le//ys4v/7pOX/9Zfq/+aK7//XffH/9Sk2N0FVUuUAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/helmetandbat.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/helmetandbat.40b779b6.png");}),
"[project]/app/assets/images/helmetandbat.png.mjs { IMAGE => \"[project]/app/assets/images/helmetandbat.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$helmetandbat$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/helmetandbat.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$helmetandbat$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 569,
    height: 565,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA80lEQVR42l2NzU7CQBSF70Cdmc6IZsq02CZa6k+NRkVD1JbEsNOwNQZX3VQl0Y1hxQLCM7BkzYo3gAfhQWADCQmEKWEDJ7mbe74vB2CTlIqwLh7labmiYZ6B3eRk1g9e66NybTg58iu/W6XIkOx/9anT/PqYteJoeXX50EUIpdcl5xyOndx+s3rX7bffF404npeC8IcQAgoC8DwvJYRgZ6b8rL2F43oUTYPnMHYcZ880TQSu66YppUb+JP9duLntlYrFwbV//scYO0zkBEBSSp3pukswLmBMX9Tdq+mDNYAxBgUg27Y1y7KoYRg8EZSoqR9aAe8AJnG6CWxdAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/manwithdice.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/manwithdice.8164a62d.png");}),
"[project]/app/assets/images/manwithdice.png.mjs { IMAGE => \"[project]/app/assets/images/manwithdice.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manwithdice$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/manwithdice.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manwithdice$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 706,
    height: 627,
    blurWidth: 8,
    blurHeight: 7,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAA2klEQVR42lWMva4BQRzF/2Nn7Jr9cNcdd/fa2c4tbiKiECIIolsahUQjNAoKT6BRK0i8gUSl0nkFjcpDSJQaHwXjo+CXnNOckx/ACwTgK9u0Poxbk5CMGbxzHyMBOTqqJTarXuno2Vrr4/CnaelFIbXetivnZde75N2vJkLoOWKMIflr1+aF9GGW+b8OctFTkv+0TdMkIggcx/F9G4ZTZOa4YQX3nVh4l7X1qeL3RzjnGO5FCOEKlryQgvuMko6lyVVKadh1XelhYIxRXdeFyGBBgVAHRCRVVeEGiCAiRSYP9fMAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/manTargeting.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/manTargeting.f7b30d5e.png");}),
"[project]/app/assets/images/manTargeting.png.mjs { IMAGE => \"[project]/app/assets/images/manTargeting.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manTargeting$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/manTargeting.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manTargeting$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 324,
    height: 445,
    blurWidth: 6,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAA00lEQVR42gHIADf/AEBAQEDRx8LlvqGQ37mtpsapqampiYmJiABXV1dYtJOE+Lh9Uv/Wuqn//v39/+rq6eoAdnZ2dufFuv3Xh2f/8Mi0//rdyv/QycPRAJeWlZjqq5r/20Mw/+22rf/77+j/tLKytAC4uLi44c3J/6NNUv/n0tb//v7+/5SUlJMA1NXV1a670f9ddaP/09vo//z8/P1ycnJyAOfn6O2jrcL/kp21/9TZ4v/39/f3VVVVVQCCgoOFlJSXpK6tscLR0NHc4eHh4T09PTxxzoot913B+QAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/slider_img.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/slider_img.d49285c8.png");}),
"[project]/app/assets/images/slider_img.png.mjs { IMAGE => \"[project]/app/assets/images/slider_img.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$slider_img$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/slider_img.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$slider_img$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 510,
    height: 305,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsElEQVR42gGlAFr/AJ+Dbv+wnJH/voBw/8+NZf+RdWn/g3Bb/6eHQv+KaTr/AIRVQf+qeVX/qoFp/6uCYf+XemP/eHI//5t8Q/+TcDr/AIlbPf+bYDT/l4BA/6OWSf+RfUr/jIlG/6iGSf+bey7/AJt1H/95Sx3/f3s2/5atW//Bpk3/pZ5s/4GEZf9sajf/AIdpGf+wgTX/sYY0/2yAIf/cjUT/y5pT/418Qf9WPxP/8sNehEVPygYAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/LudoLowBg.af53ae75.png");}),
"[project]/app/assets/images/LudoLowBg.png.mjs { IMAGE => \"[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 963,
    height: 916,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABAUlEQVR42k2PvUrDYBhGvy+0IW3zvGJBBJ28ga5uBcVBcBGkIO3gJAoOguAgToKLoulfEqS1Tdqk+WtjSGOtwUJvTXBQz3qWcxj7hyBwtrm1Ltzen+SOq/si5/xPrhYL/KC6I756d7I700jpNORyuZRhBVni27ulTNO4LphTDZOoR37wLDuLNvXHHbCrp/O8/6FjHKrkRl1Y8SPipUG2o2MUtsBOzyrSyNcxSRS4XxpZkUWx9wB7oZE3N4ghL/HaRUUKZwb5bhPD9zqmyz4NHRVB3MVP4MZaUTg63BN7SR12NEDgKXhLVZhpm34vsmKW3VzWckmqw543EH+aK63Bi/wNbC9WeUN00TMAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/BrownArrow.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/BrownArrow.45e20e6e.png");}),
"[project]/app/assets/images/BrownArrow.png.mjs { IMAGE => \"[project]/app/assets/images/BrownArrow.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$BrownArrow$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/assets/images/BrownArrow.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$BrownArrow$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1467,
    height: 241,
    blurWidth: 8,
    blurHeight: 1,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAALElEQVR42gEhAN7/AMKYZ/C0jWHerItmz6iPc8armonEt66kycvGwtbj4N3qV4EWJRGLRXkAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/common/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// //mantis Home Gallery Images
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$FooterBg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$FooterBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/FooterBg.png.mjs { IMAGE => "[project]/app/assets/images/FooterBg.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$GooglePlay$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$GooglePlay$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/GooglePlay.png.mjs { IMAGE => "[project]/app/assets/images/GooglePlay.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$AppStore$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$AppStore$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/AppStore.png.mjs { IMAGE => "[project]/app/assets/images/AppStore.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$ludoLogo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$ludoLogo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/ludoLogo.svg.mjs { IMAGE => "[project]/app/assets/images/ludoLogo.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$Blue$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$Blue$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/Blue.png.mjs { IMAGE => "[project]/app/assets/images/Blue.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerOne$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerOne$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/RulePlayerOne.png.mjs { IMAGE => "[project]/app/assets/images/RulePlayerOne.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerTwo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerTwo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/RulePlayerTwo.png.mjs { IMAGE => "[project]/app/assets/images/RulePlayerTwo.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerThree$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$RulePlayerThree$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/RulePlayerThree.png.mjs { IMAGE => "[project]/app/assets/images/RulePlayerThree.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$ball$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$ball$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/ball.png.mjs { IMAGE => "[project]/app/assets/images/ball.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$inside__frame$2d$4__1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$inside__frame$2d$4__1$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/inside frame-4 1.png.mjs { IMAGE => "[project]/app/assets/images/inside frame-4 1.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manwithbats$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$manwithbats$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/manwithbats.png.mjs { IMAGE => "[project]/app/assets/images/manwithbats.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$mancatchingball$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$mancatchingball$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/mancatchingball.png.mjs { IMAGE => "[project]/app/assets/images/mancatchingball.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$yellowNike$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$yellowNike$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/yellowNike.png.mjs { IMAGE => "[project]/app/assets/images/yellowNike.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$Black$2d$Titanium$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$Black$2d$Titanium$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/Black-Titanium.png.mjs { IMAGE => "[project]/app/assets/images/Black-Titanium.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$family$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$family$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/family.png.mjs { IMAGE => "[project]/app/assets/images/family.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/1.png.mjs { IMAGE => "[project]/app/assets/images/1.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/2.png.mjs { IMAGE => "[project]/app/assets/images/2.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$3$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$3$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/3.png.mjs { IMAGE => "[project]/app/assets/images/3.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$cricludo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$cricludo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/cricludo.png.mjs { IMAGE => "[project]/app/assets/images/cricludo.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$dice$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$dice$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/dice.png.mjs { IMAGE => "[project]/app/assets/images/dice.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$cCrush$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$cCrush$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/cCrush.png.mjs { IMAGE => "[project]/app/assets/images/cCrush.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$helmetandbat$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$helmetandbat$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/helmetandbat.png.mjs { IMAGE => "[project]/app/assets/images/helmetandbat.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manwithdice$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$manwithdice$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/manwithdice.png.mjs { IMAGE => "[project]/app/assets/images/manwithdice.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$manTargeting$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$manTargeting$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/manTargeting.png.mjs { IMAGE => "[project]/app/assets/images/manTargeting.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$slider_img$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$slider_img$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/slider_img.png.mjs { IMAGE => "[project]/app/assets/images/slider_img.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/LudoLowBg.png.mjs { IMAGE => "[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$BrownArrow$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$BrownArrow$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/BrownArrow.png.mjs { IMAGE => "[project]/app/assets/images/BrownArrow.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/assets/images/LudoLowBg.png.mjs { IMAGE => \"[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript) <export default as LudoLowBg>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LudoLowBg",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/assets/images/LudoLowBg.png.mjs { IMAGE => "[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
}),
"[project]/app/components/Header.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$common$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/common/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__$3c$export__default__as__LudoLowBg$3e$__ = __turbopack_context__.i('[project]/app/assets/images/LudoLowBg.png.mjs { IMAGE => "[project]/app/assets/images/LudoLowBg.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript) <export default as LudoLowBg>');
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Header() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const linksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const tl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            // Initialize GSAP timeline (paused)
            tl.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                paused: true
            });
            tl.current.to(menuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.inOut"
            }).fromTo(linksRef.current, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.2");
            return ({
                "Header.useEffect": ()=>{
                    if (tl.current) tl.current.kill();
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if (isOpen) {
                tl.current.play();
                document.body.style.overflow = 'hidden'; // Disable scroll
            } else {
                tl.current.reverse();
                document.body.style.overflow = ''; // Enable scroll
            }
        }
    }["Header.useEffect"], [
        isOpen
    ]);
    const toggleMenu = ()=>setIsOpen(!isOpen);
    const menuItems = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
        {
            label: "Contact",
            href: "/contact"
        },
        {
            label: "Terms & Condition",
            href: "/terms-and-condition"
        },
        {
            label: "Privacy Policy",
            href: "/privacy-policy"
        },
        {
            label: "Blogs",
            href: "/blogs"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-6 right-6 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: toggleMenu,
                    className: "bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer",
                    "aria-label": isOpen ? "Close menu" : "Open menu",
                    children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-8 h-8 text-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Header.jsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                        className: "w-8 h-8 text-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Header.jsx",
                        lineNumber: 72,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/Header.jsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/Header.jsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: menuRef,
                className: "fixed inset-0 z-40 flex flex-col items-center justify-center translate-x-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-white"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Header.jsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$assets$2f$images$2f$LudoLowBg$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__$3c$export__default__as__LudoLowBg$3e$__["LudoLowBg"],
                                alt: "Background",
                                fill: true,
                                className: "object-cover",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/Header.jsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Header.jsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "relative z-10 flex flex-col gap-6 text-center",
                        children: menuItems.map((item, index)=>{
                            const isActive = pathname === item.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: (el)=>linksRef.current[index] = el,
                                className: "overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: ()=>setIsOpen(false),
                                    className: `text-3xl md:text-5xl font-black tracking-tight font_header transition-colors
                        ${isActive ? "text-transparent bg-clip-text" : "text-gray-800 hover:text-blue-600"}
                    `,
                                    style: isActive ? {
                                        backgroundImage: "linear-gradient(to right, #0B015D, #0647C2, #1161A5)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    } : {},
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Header.jsx",
                                    lineNumber: 105,
                                    columnNumber: 17
                                }, this)
                            }, item.label, false, {
                                fileName: "[project]/app/components/Header.jsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/components/Header.jsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Header.jsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Header, "6aNsCtC/FG+pIFPWFcKh3oKz6n0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/shared/ScrollTriggerRefresh.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollTriggerRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ScrollTriggerRefresh() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollTriggerRefresh.useEffect": ()=>{
            // Small delay to ensure DOM is ready
            const timeout = setTimeout({
                "ScrollTriggerRefresh.useEffect.timeout": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh();
                }
            }["ScrollTriggerRefresh.useEffect.timeout"], 100);
            return ({
                "ScrollTriggerRefresh.useEffect": ()=>clearTimeout(timeout)
            })["ScrollTriggerRefresh.useEffect"];
        }
    }["ScrollTriggerRefresh.useEffect"], [
        pathname
    ]);
    return null;
}
_s(ScrollTriggerRefresh, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ScrollTriggerRefresh;
var _c;
__turbopack_context__.k.register(_c, "ScrollTriggerRefresh");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_3063dfcf._.js.map