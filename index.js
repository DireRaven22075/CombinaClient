const { app, BrowserWindow } = require('electron');

function createWindow() {
  // 브라우저 창을 생성합니다.
  let mainWindow = new BrowserWindow({
    width: 2560,
    height: 1440,
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
  // 애플리케이션의 index.html을 로드합니다.
  mainWindow.loadURL('http://127.0.0.1:8000');
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

// 이 메서드는 Electron이 초기화를 마치고
// 브라우저 창을 생성할 준비가 되었을 때 호출됩니다.
app.on('ready', createWindow);

// 모든 창이 닫혔을 때 애플리케이션을 종료합니다.
app.on('window-all-closed', function() {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지
  // 애플리케이션과 메뉴 바가 활성화된 상태로 머무르는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // macOS에서는 독 아이콘이 클릭되고 다른 창이 열려 있지 않으면
  // 새로운 창을 다시 만드는 것이 일반적입니다.
  if (mainWindow === null) {
    createWindow();
  }
});