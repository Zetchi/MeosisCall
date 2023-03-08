// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const contextBridge = require('electron').contextBridge;
const ipcRenderer = require('electron').ipcRenderer;

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const milliseconds = date.getMilliseconds();

console.log(`preoload.js | ${hours}:${minutes}:${seconds}:${milliseconds}`);

contextBridge.exposeInMainWorld(
    // Allowed 'ipcRenderer' methods
    'bridge', {
        // From main to render
        sendReallyNum: (datas) => {
            ipcRenderer.on('sendReallyNum', datas);
        }
    }
);