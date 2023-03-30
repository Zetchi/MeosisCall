const { app, Tray, Menu, BrowserWindow, ipcMain } = require("electron");
const log = require('electron-log');
const { execFile } = require("child_process");
const path = require("path");

require('update-electron-app')()

// run this as early in the main process as possible
if(require('electron-squirrel-startup')) return;

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const milliseconds = date.getMilliseconds();
console.log(`index.js | ${hours}:${minutes}:${seconds}:${milliseconds}`);

let mainWindow;
app.setAsDefaultProtocolClient("meosis-call-x");

// Vérifie si une instance de l'application est déjà en cours d'exécution
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    backgroundColor: 'grey',
    icon: path.join(__dirname, './img/m-Vert.ico'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html")).then(() => {
    mainWindow.webContents.send("sendReallyNum", getReallyNum());
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("close", (event) => {
    if (process.platform !== "darwin") {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Créer l'icône de la zone de notification
  tray = new Tray(path.join(__dirname, "img/m-Vert.png"));
  tray.setToolTip("MeosisCall");

  // Créer le menu contextuel de l'icône de la zone de notification
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Ouvrir",
      click: () => {
        mainWindow.show();
        mainWindow.reload();
      },
    },
    {
      label: "Quitter",
      click: () => {
        mainWindow.destroy();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    mainWindow.show();
    mainWindow.reload();
  });

  createWindow();

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  runProgram("dialer.exe");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//Récupére le numéro de téléphone passé au lancement de l'application depuis un navigateur exemple "meosiscall://num=145"
function getReallyNum() {
  const num = process.argv.slice(1);
  const indexNum = num[0].indexOf("num=");
  // const num = "meosiscall://num=145/"

  var result = null;

  if (indexNum > 0) {
    const startIndex = indexNum + "num=".length;
    result = num[0].substring(startIndex);
  }

  return result;
}

//Lance un programme avec comme parametre le folder qui est existant dans le dossier User du PC et avec le nom du programme
function runProgram( name = null) {
  {
    if (name !== null) {
      // const desktopPath = path.join(process.env.USERPROFILE, folder, name);
      const desktopPath = path.join(__dirname, name);
      const reallyNum = getReallyNum();
      const num = String(reallyNum).match(/\d+/);
      console.log(num)
      // if (match) {
      //   num = parseInt(match[0].substring(0, 2), 10);
      //   console.log(num)
      // } else {
      //   num = null;
      // }
      if (num) {
        execFile(desktopPath, [num], (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    } else {
      console.error(err);
      return;
    }
  }
}
