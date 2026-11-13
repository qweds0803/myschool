const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("페이지를 찾을 수 없습니다.");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // 페이지 라우팅: 홈(/), 학교생활(/life), 자유의 맛 상세(/freedom)
  if (pathname === "/" || pathname === "/index.html") {
    sendFile(res, path.join(PUBLIC_DIR, "index.html"));
    return;
  }

  if (pathname === "/life" || pathname === "/life.html") {
    sendFile(res, path.join(PUBLIC_DIR, "life.html"));
    return;
  }

  if (pathname === "/freedom" || pathname === "/freedom.html") {
    sendFile(res, path.join(PUBLIC_DIR, "freedom.html"));
    return;
  }

  if (pathname === "/love" || pathname === "/love.html") {
    sendFile(res, path.join(PUBLIC_DIR, "love.html"));
    return;
  }

  if (pathname === "/alternative" || pathname === "/alternative.html") {
    sendFile(res, path.join(PUBLIC_DIR, "alternative.html"));
    return;
  }

  if (pathname === "/semester1" || pathname === "/semester1.html") {
    sendFile(res, path.join(PUBLIC_DIR, "semester1.html"));
    return;
  }

  // 정적 파일 제공 (public/logo.jpg, public/hero.jpg, public/style.css 등)
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (filePath.startsWith(PUBLIC_DIR)) {
    sendFile(res, filePath);
  } else {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("접근할 수 없습니다.");
  }
});

server.listen(PORT, () => {
  console.log(`샬롬자유학교 소개 웹사이트가 실행되었습니다: http://localhost:${PORT}`);
});
