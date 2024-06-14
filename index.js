const { app, BrowserWindow } = require('electron');

function createWindow() {
  // 브라우저 창을 생성합니다.
  let mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1920,
    minHeight: 1080,
    maxWidth: 3840,
    maxHeight: 2160,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // 창의 비율을 고정합니다 (예: 16:9 비율)
  mainWindow.setAspectRatio(16 / 9);
  //로컬 서버 주소로 연결
  mainWindow.loadURL('http://127.0.0.1:8000');
  mainWindow.on('resize', () => {
    // 창의 크기가 변경될 때 발생하는 이벤트
    // 창의 크기가 변경될 때마다 비율을 고정합니다
    mainWindow.setAspectRatio(16 / 9);
  });
  // 개발자 도구를 열지 않도록 단축키 비활성화
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault();
    }
  });

  // 창이 닫힐 때 발생하는 이벤트
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}
app.on('ready', createWindow);

// 모든 창이 닫혔을 때 애플리케이션을 종료합니다.
app.on('window-all-closed', function() {
  app.quit();
});