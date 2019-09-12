const rp = require("request-promise");
const cheerio = require("cheerio");

const getPage = async codigo => {
  return await rp(
    "https://www.aisweb.aer.mil.br/?i=aerodromos&codigo=" + codigo
  );
};

const getSOL = $ => ({
  NASCER: $("sunrise").text(),
  POR: $("sunset").text()
});

const getMETAR = $ =>
  $(".order-sm-12 > p:nth-child(12)")
    .text()
    .replace("\n", "");

const getTAF = $ =>
  $(".order-sm-12 > p:nth-child(14)")
    .text()
    .replace("\n", "");

const getCARTAS = $ => {
  const info = $(".order-sm-12 > ul > li > a");
  const DATA = [];
  info.each((i, element) =>
    DATA.push({ nome: $(element).text(), link: $(element).attr("href") })
  );
  return { QTD: info.length, DATA };
};

const getData = async codigo => {
  const html = await getPage(codigo);
  const $ = cheerio.load(html);
  const data = {
    SOL: getSOL($),
    METAR: getMETAR($),
    TAF: getTAF($),
    CARTAS: getCARTAS($)
  };
  return data;
};

module.exports = getData;
