const parse = (data) => JSON.parse(data);

function requestData(method, url, cb) {
  const xml = new XMLHttpRequest();
  xml.open(method, url);
  xml.send();

  xml.addEventListener('readystatechange', () => {
    if (xml.readyState === 4 && xml.status < 400) {
      const response = parse(xml.response);
      cb(response);
    }
  });
}

function concatArrays(response1, response2) {
  const concatArray = response1.children.concat(response2.children);
  console.log(concatArray);
}

requestData('GET', 'request/data.json', (response1) => {
  requestData('GET', 'request/data2.json', (response2) => {
    concatArrays(response1, response2);
  });
});