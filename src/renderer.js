/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const milliseconds = date.getMilliseconds();

console.log(`renderer.js | ${hours}:${minutes}:${seconds}:${milliseconds}`);

window.bridge.sendReallyNum((event, settings) => {
    const element = document.querySelector('#text-num')
    const parentElement = document.querySelector('.content-center')
    if (settings == null) {
        parentElement.style.display = 'none'
    } else {
        parentElement.style.display = 'flex'
        element.innerText = String(settings).match(/\d+/)
    }
    console.log(String(settings).match(/\d+/))
});