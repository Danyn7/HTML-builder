const fs = require('fs');
const path = require('path');

const wayTrue = path.join(__dirname, 'secret-folder');

fs.readdir(wayTrue, 
  { withFileTypes: true },
  (errs, files) => {
    console.log('\n');
    if (errs)
      console.log(errs);
    else {
      files.forEach(file => {
        if(file.isFile() == true) {

          fs.stat(path.join(__dirname, 'secret-folder', file.name), (errs, stats) => {
            if (errs) {
              console.error(errs);
              return;
            }
                
            console.log(`${file.name.split('.').slice(0, 1)} - ${path.extname(file.name).slice(1)} - ${stats.size} Байт`);
          });
            
        } 
        
      });
    
    }
  });