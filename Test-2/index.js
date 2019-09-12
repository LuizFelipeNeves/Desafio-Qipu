const getData = require("./lib");

(async () => {
  const sigla = process.argv.slice(2).join("") || "SBMT";
  const json = await getData(sigla);
  console.dir(json, { depth: null });
})();
