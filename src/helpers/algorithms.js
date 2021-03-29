const getValuesFromObj = obj =>
  new Promise((resolve, reject) => {
    if (obj) {
      let data = [];
      const level = Object.keys(obj);
      loopOverData(data, level, obj);
      resolve(data);
    } else {
      reject(new Error('Sin datos'));
    }
  });

const loopOverData = (data, level, obj, title) => {
  const string = ''.constructor;
  for (let i = 0; i < level.length; i++) {
    const key = level[i];
    const value = obj[key];
    if (value) {
      if (value.constructor === string) {
        if (!value.includes('.svg')) {
          const image = {
            name: title ? `${title}|${key}` : key,
            url: value,
          };
          value.includes('.gif') ? data.unshift(image) : data.push(image);
        }
      } else {
        loopOverData(data, Object.keys(value), value, key);
      }
    }
  }
};

const showAlert = message => {
  alert(message);
};

export {getValuesFromObj, showAlert};
