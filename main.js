// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let win
function create_screen2 () {
  
  let displays = screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      show:false,
      autoHideMenuBar :true,
      fullscreen:true
    })
    win.loadURL('http://localhost/antrian/loket')
  }

}
function destroy_screen2(){

}
function create_screen1(){
    mainWindow = new BrowserWindow({
    fullscreen:true,
    closable :false,
    // alwaysOnTop:true,
    autoHideMenuBar :true,
    
    // webPreferences: {
    //   nodeIntegration: true
    // }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost/tiket');
}
function check_screen2(){
  let displays = screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if(externalDisplay){
    
    try{
      win.showInactive();
    }catch(e){
      create_screen2();
    }

    
  }else{
    try{win.hide();win.close();}catch(e){console.log(e)}
    
    // win = null
  }
}


function main(){
  create_screen1();
  create_screen2();

  const intervalObj = setInterval(() => {
    check_screen2();
  }, 5000);
}

// win.on('close', (e) => {
//   if (process.platform == 'darwin') {
//     e.preventDefault()
//     win.hide()
//   }
// })

// win.on('closed', () => {
//   win = null
// })
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', main)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
