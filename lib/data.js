const fs = require("fs");
const path = require("path");
const util = require("util");

const lib = {};

const constructFilePath = (dir, file) => path.join(__dirname, "/../.data/", dir, file) + ".json";
const writeFile = util.promisify(fs.writeFile);
const truncate = util.promisify(fs.truncate);

lib.create = (dir, file, data) => writeFile(constructFilePath(dir, file), JSON.stringify(data), { flag: "wx" });

lib.update = async (dir, file, data) => {
  const filePath = constructFilePath(dir, file);
  await truncate(filePath);
  await writeFile(filePath, JSON.stringify(data));
};

lib.read = (dir, file) =>
  new Promise((resolve, reject) => {
    fs.readFile(constructFilePath(dir, file), "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

lib.delete = (dir, file) =>
  new Promise((resolve, reject) => {
    fs.unlink(constructFilePath(dir, file), err => {
      if (err) reject(err);
      else resolve();
    });
  });

module.exports = lib;
