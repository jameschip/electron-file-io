
var FileIO = function () {

    const currentFile = "etude_file"

    var fs = require('fs')
    const { dialog } = require('electron').remote

    var openLast = function(callback) {
        let fileName = localStorage.getItem(currentFile);
        var content = readFile(fileName)
        callback(content)
    }

    var readFile = function(fileName) {
        if (!fs.existsSync(fileName)) {
            localStorage.setItem(currentFile, "");
            return "";
        }
        let text;
        try {
            text = fs.readFileSync(fileName)
            localStorage.setItem(currentFile, fileName);
            return text;
        } catch (err) {
            console.warn(`Could not load world file`)
            return ";"
        }
    }

    var openFile = function (callback) {
        dialog.showOpenDialog({
            title: "Open File",
            filters: [
                { name: 'All Files', extensions: ['*'] },
                { name: 'Lisp', extensions: ['lisp', 'lisp'] }]
        }).then(result => {
            if (result.canceled) return
            console.log("Opening file -> " + result.filePaths[0])
            let content = readFile(result.filePaths[0]);
            callback(content)
        }).catch(err => {
            console.log(err)
        })
    }

    var save = function(content) {
        let fileName = localStorage.getItem(currentFile);
        if (fileName === undefined || fileName === "") {    // No file set
            saveAs();
            return;
        } else if (!fs.existsSync(fileName)) {   // File we are editing doth not exist
            saveAs();
        } else {
            saveFile(fileName, content);
        }
    }
    
    var saveFile = function(f_name, content) {
        try {
            console.log("Trying to save tile -> " + f_name)
            fs.writeFileSync(f_name, content);
            localStorage.setItem(currentFile, f_name);
        } catch (err) {
            console.log('could not write to file');
        }
    }

    var saveAs = function(content) {
        dialog.showSaveDialog({
            title: "Save File"
        }).then(result => {
            if (result.canceled) return
            saveFile(result.filePath, content);
        }).catch(err => {
            console.log(err)
        })
    }

    return {
        openLast: openLast,
        open: openFile,
        save: save,
        saveAs: saveAs 
    }
}()

module.exports = FileIO