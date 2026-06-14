const http = require("http");
const fs = require("fs");
const path = require("path");
const base = "C:\\Users\\33732\\Documents\\研究沫沫2\\toolbox";
const mime = {"html":"text/html","css":"text/css","js":"application/javascript"};
http.createServer((q,r)=>{
  let url = q.url === "/" ? "/index.html" : q.url;
  let file = base + url;
  console.log("Request:", q.url, "->", file);
  fs.readFile(file, (e,d)=>{
    if (e) { r.writeHead(404); r.end("404: "+file); return; }
    let ext = path.extname(file).slice(1);
    r.writeHead(200, {"Content-Type": mime[ext]||"text/plain"});
    r.end(d);
  });
}).listen(8080, ()=>console.log("Server on 8080"));
