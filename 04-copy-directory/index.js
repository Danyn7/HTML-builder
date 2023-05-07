const fs = require('fs');
const path = require('path');

const wayDirectoryFiles = path.join(__dirname, 'files');

function again () {
  fs.mkdir(path.join(__dirname, 'files-copy'),
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  
  fs.readdir(wayDirectoryFiles, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
  
    files.forEach(file => {
      fs.stat(wayDirectoryFiles, (errs) => {
        if (errs) {
          console.error(errs);
          return;
        }
                  
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    });
  });
}


fs.stat(path.join(__dirname, 'files-copy'), function(error){
  if (!error) {
    fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => { 
      if (err) { 
        console.error(err); 
      } 
      again();
    }); 
       
        
  } else if (error.code === 'ENOENT') {
    fs.mkdir(path.join(__dirname, 'files-copy'),
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
  }});
    
fs.readdir(wayDirectoryFiles, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
      
  files.forEach(file => {
    fs.stat(wayDirectoryFiles, (errs) => {
      if (errs) {
        console.error(errs);
        return;
      }
                      
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      
    });
              
  });
});  
    
