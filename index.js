const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // ~~~~ we will make the path file dynamic ~~~~  build file path
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
//   console.log(filePath);
//   res.end();

  //we get the extension of file
  let extname = path.extname(filePath);

  //initial content type
  let contentType = 'text/html';

  // check extension and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'text/json';
      break;
    case '.png':
      contentType = 'text/png';
      break;
    case '.jpg':
      contentType = 'text/jpg';
      break;
  }

  // Read File
  // ENOENT = page is not found = EnumNET
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // page not found
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
          })
      } else {
        // some server error 500
        res.writeHead(500);
        res.end(`Midget - Server crashed error : ${err.code}`);
      }
    } else {
      // sucess
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Midget-server running on port ${PORT}`));
