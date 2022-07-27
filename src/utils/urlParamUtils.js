// Param like: page=1?limit=2

// ví dụ page=1?limit=2 => { page: "1", limit: "2" }
export const getParamValue = (paramFromUrl) => {
  console.log(paramFromUrl);
  const paramObj = {};
  if (paramFromUrl) {
    const params = paramFromUrl.split("&");
    params.map((item) => {
      const keyValueArray = item.split("=");
      if (keyValueArray.length > 1) {
        const [key, value] = keyValueArray;
        paramObj[key] = value;
      }
      return item;
    });
  }
  console.log("paramObj", paramObj);
  return paramObj;
};

// ví dụ { page: "1", limit: "2" } => page=1?limit=2
export const paramValueToUrlParam = (paramValue = {}) => {
  let paramArr = [];
  for (const [key, value] of Object.entries(paramValue)) {
    if (key && key !== "") paramArr.push(`${key}=${value}`);
  }
  console.log('paramArr.join("&") :>> ', paramArr.join("&"));
  return paramArr.join("&");
};
