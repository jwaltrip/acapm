const fs = require('fs');
const readline = require('readline');

// create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// store first process argument (to check if = 'init')
const firstParam = process.argv[2];


// if first arg passed == 'init', continue the app
if (firstParam === 'init') {
  // check if package.json already exists, if so, exit
  if (fs.existsSync('./package.json')) {
    console.log('package.json file already exists. Exiting program');
    process.exit();
  } else {
    // get readline from user
    rl.question('What is your package name?: ', (pkgName) => {
      rl.question('Description of your package: ', (desc) => {
        rl.question('Author: ', (author) => {
          rl.question('Keywords: ', (keywords) => {
            rl.question('Version: ', (version) => {

              // construct the package.josn object
              const packageJSON = {
                package: pkgName,
                description: desc,
                author: author,
                keywords: keywords,
                version: version
              };

              // write the file to disk
              fs.writeFile('package.json', JSON.stringify(packageJSON, null, 4), (err) => {
                // if error writing file to disk
                console.log('Error writing package.json to disk');
              });

              // close the readline interface
              rl.close();
            });
          });
        });
      });
    });
  }
// else, if first arg was not 'init', exit process
} else {
  console.log("Error: first argument was not 'init'");
  process.exit();
}