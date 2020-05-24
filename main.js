const { app, BrowserWindow, Tray, Menu, globalShortcut} = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 900,
    height: 800,
    minHeight:650,
    minWidth:600,
    frame:false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('codeeditor.html')
  win.webContents.openDevTools()
}
const template = [
  {
    label: 'File',
    submenu: [
      {
         label: 'New File',
         click () { win.webContents.send("newfile"); }
      },
      {
         label: 'New Folder',
         click () { win.webContents.send("newfolder"); }          
      },
      { type: 'separator' },
      {
        label: 'Save',
        click () { win.webContents.send("save"); }
     },
     
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
template[1].submenu.push(
  { type: 'separator' },
  {
    label: 'Speech',
    submenu: [
      { role: 'startspeaking' },
      { role: 'stopspeaking' }
    ]
  }
)

// Window menu
template[3].submenu = [
  { role: 'close' },
  { role: 'minimize' },
  { role: 'zoom' },
  { type: 'separator' },
  { role: 'front' }
]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);
app.on('window-all-closed', () => {


  if (process.platform !== 'darwin') {
    app.quit()

  }
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
