const xml2js = require('xml2js');

const parseXML = async (xmlData) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xmlData);
  return result;
};

module.exports = parseXML;
