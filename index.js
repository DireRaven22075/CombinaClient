const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { shell } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.svg')
  });
  mainWindow.setAspectRatio(16 / 9);
  mainWindow.loadURL('http://localhost:8000');
  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
ipcMain.on('open-external', (event, url) => {
  shell.openExternal(url);
});
ipcMain.on('minimize', () => {
  BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on('close', () => {
  BrowserWindow.getFocusedWindow().close();
});
ipcMain.on('maximize', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
});