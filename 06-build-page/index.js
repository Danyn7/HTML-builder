const fs = require('fs');
const path = require('path');

const wayAssets = path.join(__dirname, 'assets');

fs.mkdir(path.join(__dirname, 'project-dist'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
      
      //создание папки project dist
    }
});   

let objtest = {};
let arrKeys;

fs.readdir(path.join(__dirname, 'components'), (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
      
  files.forEach(file => {
    fs.readFile(path.join(__dirname, 'components', file), (err, data) => {
      objtest[file] = Buffer.from(data).toString().trim();  //получается правильный обьект с файлами папки компонент
      arrKeys = Object.keys(objtest);
      
        
      let arr = [];
      let arr2 = [];
      let arr3 = [];   //массив со всеми штуками которые надо менять

      fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        let temp = Buffer.from(data).toString().trim();
        let targ = '{{';
        let targ2 = '}}';
        let post = 0;
        while (true) {
          let fPos = temp.indexOf(targ, post);
          if (fPos == -1) break;
          arr.push(fPos);
          post = fPos + 1; 
        }
        let post2 = 0;
        while (true) {
          let fPos2 = temp.indexOf(targ2, post2);
          if (fPos2 == -1) break;
          arr2.push(fPos2 + 2);
          post2 = fPos2 + 1; 
        }
        for(i = 0; i < arr.length; i++){
          arr3.push(temp.slice(arr[i], arr2[i]));
        }
        
        let newt = temp.replace(arr3[0], objtest['header.html']);
        let newt2 = newt.replace(arr3[1], objtest['articles.html']);
        let newt3 = newt2.replace(arr3[2], objtest['footer.html']);
        let newt4 = newt3.replace(/{{about}}/, objtest['about.html']);
    
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), newt4, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });  
        
        
            
    });
            
  }); 
        

});

const wayStyles = path.join(__dirname, 'styles');
let arrFromCss = [];

fs.readdir(wayStyles, (err, files) => {
  if (err) {
    console.error(err);
  }
    
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'styles', file), (errs, stats) => {
      if (stats.isFile()) {
        if (errs) {
          console.error(errs);
          return;
        } else if (path.extname(file) === '.css') {
          fs.readFile(path.join(__dirname, 'styles', file), (err, file) => {
            if (err) {
              console.error(err);
            }
            arrFromCss.push(Buffer.from(file).toString().trim()); 
            
            fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), arrFromCss.join('\n'), (err) => {
              if (err) {
                console.error(err);
                return;
              }
                
            });
          });
        
        }
    
      }});});});


const wayDirectoryFiles = path.join(__dirname, 'assets');

function again () {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'),
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'),
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'),
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  
    fs.readdir(path.join(__dirname, 'assets', 'fonts'), (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', 'fonts', file), path.join(__dirname, 'project-dist', 'assets', 'fonts', file), (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });});});
    
        
    fs.readdir(path.join(__dirname, 'assets', 'img'), (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', 'img', file), path.join(__dirname, 'project-dist', 'assets', 'img', file), (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });});});
    
    fs.readdir(path.join(__dirname, 'assets', 'svg'), (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', 'svg', file), path.join(__dirname, 'project-dist', 'assets', 'svg', file), (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });});});
}


fs.stat(path.join(__dirname, 'project-dist', 'assets'), function(error){
  if (!error) {
    fs.rm(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => { 
      if (err) { 
        console.error(err); 
      } 
      again();
    }); 
       
        
  } else if (error.code === 'ENOENT') {    //если папки assets нет в папке project-dist
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'),
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'),
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'),
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    
      fs.readdir(path.join(__dirname, 'assets', 'fonts'), (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'assets', 'fonts', file), path.join(__dirname, 'project-dist', 'assets', 'fonts', file), (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });});});
      
          
      fs.readdir(path.join(__dirname, 'assets', 'img'), (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'assets', 'img', file), path.join(__dirname, 'project-dist', 'assets', 'img', file), (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });});});
      
      fs.readdir(path.join(__dirname, 'assets', 'svg'), (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'assets', 'svg', file), path.join(__dirname, 'project-dist', 'assets', 'svg', file), (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });});});

  }});

  



