# electron-file-io
A little module for electron projects that enables saving and opening files. It rememebrs the last known file that was opened.
Tested and working with electron 7.1.2.

## Useage

Copy the fileio.js file somewhere in your project and require it and use as follows.

``` Javascript
const FileIO = require("./fileio")

// Open the last known file we had open
FileIO.openLast(content => {
    // content is the contents of the file
})

// Show a prompt for the user to open a file
FileIO.open( (content) => {
    // Content is the content of the filr that was read
})


// Save the currently open file, no fille is open or the file no longer exista then
// a save as dialog is opened.
FileIO.save(content) // content is the content to put in the file

// Open a save as dialog
FileIO.saveAs(content) // content is the content to put in the file 

```
