/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("const startBtn = document.getElementById(\"startBtn\");\nconst video = document.getElementById(\"preview\");\n\n// 녹화중지\nconst handleStop = () => {\n  startBtn.innerText = \"Start Recording\";\n  startBtn.removeEventListener(\"click\", handleStop);\n  startBtn.addEventListener(\"click\", handleStart);\n};\n// 녹화시작\nconst handleStart = () => {\n  startBtn.innerText = \"Stop Recording\";\n  startBtn.removeEventListener(\"click\", handleStart);\n  startBtn.addEventListener(\"click\", handleStop);\n  const recorder = new MediaRecorder(stream);\n};\nconst init = async () => {\n  const stream = await navigator.mediaDevices.getUserMedia({\n    audio: true,\n    video: true\n  });\n  video.srcObject = stream;\n  video.play();\n};\ninit();\nstartBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://node-project01/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;