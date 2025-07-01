const parseDate = (value) => {
  console.log("parseDate input:", value);

  try {
    if (!value) return new Date();

    if (typeof value === 'object' && value._) {
      const d = new Date(value._);
      console.log("Parsed from _.", value._, '→', d);
      return isNaN(d.getTime()) ? new Date() : d;
    }

    if (typeof value === 'string') {
      const d = new Date(value);
      console.log("Parsed from string:", value, '→', d);
      return isNaN(d.getTime()) ? new Date() : d;
    }

    return new Date();
  } catch (err) {
    console.error("parseDate failed:", err.message);
    return new Date();
  }
};

module.exports = parseDate;
