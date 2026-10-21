import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {JSDOM} from 'jsdom';
const url=process.env.QA_URL||'http://127.0.0.1:3001';
const htmlResponse=await fetch(url);assert.equal(htmlResponse.status,200);const html=await htmlResponse.text();
assert.match(html,/信使之国/);assert.match(html,/10:00/);assert.match(html,/留石国的信使/);
const doc=new JSDOM(html).window.document;
const assets=new Set([...doc.querySelectorAll('script[src],link[rel="stylesheet"]')].map(el=>el.getAttribute('src')||el.getAttribute('href')));
for(const path of assets){assert.ok(path.startsWith('/'));const r=await fetch(new URL(path,url));assert.equal(r.status,200,path);assert.match(r.headers.get('content-type'),path.endsWith('.css')?/text\/css/:/javascript/);}
const manifest=JSON.parse(await readFile('data/avatar-manifest.json','utf8'));
for(const a of [...manifest.assets,...(manifest.displayFallbacks||[])]){const r=await fetch(url+a.src);assert.equal(r.status,200,a.src);assert.match(r.headers.get('content-type'),a.src.endsWith('.jpg')?/image\/jpeg/:/image\/svg/);assert.equal(createHash('sha256').update(Buffer.from(await r.arrayBuffer())).digest('hex'),a.sha256);}
const result={status:'passed',url,htmlStatus:200,title:doc.title,staticAssetsChecked:assets.size,portraitFilesChecked:manifest.assets.length+(manifest.displayFallbacks?.length||0),externalRuntimeAssets:[...assets].filter(a=>!a.startsWith('/')),note:'静态服务与资源可用性检查；不替代真实浏览器布局或原生dialog键盘验证。'};
await writeFile('qa/static-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
