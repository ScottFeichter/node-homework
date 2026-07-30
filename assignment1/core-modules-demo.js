const os = require('os');
const path = require('path');
const fs = require('fs');


const sampleFilesDir = path.join(__dirname, 'sample-files');
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true });
}

// OS module
console.log("Platform:", os.platform());
console.log("CPU:", os.cpus()[0].model);
console.log("Total Memory:", os.totalmem());


// Path module
console.log("Joined path:", path.join(__dirname, "sample-files", "folder", "file.txt"));

// fs.promises API
(async () => {
  await fs.promises.writeFile(path.join(__dirname, "sample-files", "demo.txt"), "Hello from promise API!");
  const content = await fs.promises.readFile(
    path.join(__dirname, "sample-files", "demo.txt"), "utf-8");

  console.log("fs.promises read:", content);
})();


// Streams for large files- log first 40 chars of each chunk
