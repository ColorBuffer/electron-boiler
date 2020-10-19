
const path = require('path')
const url = require('url')
const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow () {
    console.log('process.env.ELECTRON_START_URL', process.env.ELECTRON_START_URL)
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
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
    win.webContents.openDevTools()

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