import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(fileURLToPath(new URL('../out/',import.meta.url)));
const port=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1');
  const path=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end('Forbidden');return;}
  let file=path;
  try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');}catch{if(!extname(file))file+='.html';}
  const body=await readFile(file);
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
  res.end(body);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('页面未找到。请先运行 npm run build。');}
});
server.on('error',err=>{console.error(err.code==='EADDRINUSE'?`端口 ${port} 已被占用。可用 PORT=3001 npm run preview。`:err.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`课堂预览：http://127.0.0.1:${port}\n使用本地预设内容，无需联网。按 Ctrl+C 停止。`));
