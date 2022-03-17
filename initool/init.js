var fs = require('fs');
var path=require('path');
 
function readDirRecur(fileList,n,folder, callback) {
  fs.readdir(folder, function(err, files) {
    var count = 0
    var checkEnd = function() {
      ++count == files.length && callback()
    }
 
    files.forEach(function(file) {
      var fullPath =  path.join(folder,'/',file);
      var relapath=path.join(path.relative('../', fullPath));
      fs.stat(fullPath, function(err, stats) {
        if (stats.isDirectory()) {

            fileList[file.toString()]={}
            // console.log(fileList);
            // console.log(file);
            return readDirRecur(fileList[file.toString()],n+1,fullPath, checkEnd);
        } else {
          /*not use ignore files*/
          var l=fileList
          if(file[0] == '.') {
 
          } else if(path.extname(file)=='.md'){
            l.route=relapath
            l.birtht=stats.birthtime
            l.mtime=stats.mtime     
          }else if(file.slice(0,file.indexOf('.'))=='cover'){
            l.cover=file
          }
          checkEnd()
        }
      })
    })
 
    //为空时直接回调
    files.length === 0 && callback()
  })
}


var fileList  = {}
var filePath = path.resolve('../article')
readDirRecur(fileList,0,filePath, function(filePath) {
  console.log(fileList); //打印出目录下的所有文件
    fs.writeFile('../index.json', JSON.stringify(fileList), err => {
    if (err) {
        console.error(err)
        return
    }else{
        console.log("目录文件更新成功！")
    }
    //文件写入成功。
    })
})