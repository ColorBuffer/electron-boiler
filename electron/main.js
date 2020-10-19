
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron')

const edi = require('electron-devtools-installer')

let mainWindow

function createWindow () {

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    })

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.maximize()

    win.loadURL(startUrl)

    if (isDev) {
        win.webContents.openDevTools({
            // mode: "detach",
        })

        // edi.default(edi.REACT_DEVELOPER_TOOLS)
        //     .then((name) => console.log(`Added Extension:  ${name}`))
        //     .catch((err) => console.log('An error occurred: ', err));
    }

    mainWindow = win
    mainWindow.on('closed', () => mainWindow = null)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})