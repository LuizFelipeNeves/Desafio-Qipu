const porExtenso = require("./lib");
const n = process.argv.slice(2).join("");
const ext = porExtenso(n);
console.log(ext);
