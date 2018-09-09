const fs = require('fs');
let path = String.raw`\\IP\glacier\backup\folder`;
path +="\\";

fs.readdirSync(path).forEach(file => {
    var fileParts = file.split(".");
    var ext = fileParts[fileParts.length-1];

    if ((fileParts.length - 1) >=3 && ext.toLowerCase()=="mp4") {
        var lastDotPos = file.lastIndexOf(".", file.length-ext.length-2);
        var newName = file.substring(0,lastDotPos);
        rename(path, file, newName, ext);
    }
})

function rename(path, oldFilenameAndExt, newName, ext){
    var tries = 1;
    var newFilenameAndExt = newName + "." + ext;
    while (fs.existsSync(path + newFilenameAndExt)) 
    {
        tries++;
        var triesStr = tries.toString();
        newFilenameAndExt = newName + "_" + triesStr.padStart(2,"0") + "." + ext;
    }
    fs.renameSync(path + oldFilenameAndExt, path + newFilenameAndExt);
}