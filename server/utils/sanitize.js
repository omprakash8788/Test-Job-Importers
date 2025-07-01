// Recursively removes dangerous keys that start with $
const sanitizeObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  } else if (typeof obj === 'object' && obj !== null) {
    const clean = {};
    for (let key in obj) {
      if (!key.startsWith('$') && !key.includes('.')) {
        clean[key] = sanitizeObject(obj[key]);
      }
    }
    return clean;
  } else {
    return obj;
  }
};

module.exports = sanitizeObject;
