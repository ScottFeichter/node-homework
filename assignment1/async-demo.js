const fs = require('fs');
const path = require('path');
// const fsPromises = require('fs').promises;

// Write a sample file for demonstration

fs.writeFileSync(path.join(__dirname, "sample-files", "sample.txt"), "Hello, async world!");


// 1. Callback style
fs.readFile(path.join(__dirname, "sample-files", "sample.txt"), "utf-8", (error, content) => {
  if(error) {
    console.error("Callback style error reading file:", error);
    return;
  }

  console.log("Callback read:", content);
})

  // Callback hell example (test and leave it in comments):

// fs.readFile(path.join(__dirname, "sample-files", "sample.txt"), "utf-8", (err, content1) => {
//   fs.readFile(path.join(__dirname, "sample-files", "simple.txt"), "utf-8", (err, content2) => {
//     fs.readFile(path.join(__dirname, "sample-files", "smple.txt"), "utf-8", (err, content3) => {
//       fs.readFile(path.join(__dirname, "sample-files", "ample.txt"), "utf-8", (err, content4) => {
//         if(err) {
//             console.log(`Nesting in this way is very confusing although it is all confusing really.
//                          The other things is it is more difficult to handle errors properly as they need to be checked at every level.
//                          If not they will silently fail as these did.`);
//         }
//       });
//     });
//   });
// });





  // 2. Promise style

new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, "sample-files", "sample.txt"), "utf-8", (error, content) => {
    if (error) reject(error);
    else resolve(content);
  });
})
  .then(content => {
    console.log("Promise read:", content);
  })
  .catch(error => {
    console.error("Promise style error reading file:", error);
  });



//  OR
// fsPromises.readFile(path.join(__dirname, "sample-files", "sample.txt"), "utf-8")
//   .then(content => {
//     console.log("Promise read:", content);
//   })
//   .catch(error => {
//     console.error("Promise style error reading file:", error);
//   });



  // 3. Async/Await style
try {

    (async () => {
      const content = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "sample-files", "sample.txt"), "utf-8", (error, data) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      console.log("Async/Await read:", content);
    })();

} catch (error) {
  console.error("Async/Await style error reading file:", error.message);
};
