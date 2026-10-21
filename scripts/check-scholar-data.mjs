import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const data=JSON.parse(await readFile(new URL('../data/scholar-knowledge.json',import.meta.url)));
const manifest=JSON.parse(await readFile(new URL('../data/avatar-manifest.json',import.meta.url)));
const sources=new Map(data.sources.map(s=>[s.id,s]));
const ids=new Set(data.scholars.map(s=>s.id));
assert.equal(ids.size,6);assert.equal(data.scholars.filter(s=>s.primary).length,3);
function walk(value){if(!value||typeof value!=='object')return;if(value.provenance){assert.equal(value.isQuotation,false);assert.ok(value.citations.length);for(const c of value.citations){assert.ok(sources.has(c.sourceId));assert.equal(c.url,sources.get(c.sourceId).url);assert.ok(c.locator);}}for(const child of Object.values(value))if(typeof child==='object')walk(child);}
walk(data);
for(const s of data.scholars){assert.equal(s.works.length,2);assert.ok(s.concepts.length>=2);assert.ok(s.limitations.length);if(!s.primary){assert.ok([...s.plainExplanation].length<=65);assert.ok([...s.simulatedLine.text].length<=70);assert.ok(s.dossierIds.includes('river'));}for(const r of s.relations)assert.ok(data.relations.some(x=>x.id===r));for(const w of s.works){assert.ok(sources.has(w.sourceId));assert.match(w.url,/^https:\/\//);}}
for(const r of data.relations){assert.ok(ids.has(r.toId));assert.ok(r.fromIds.every(id=>ids.has(id)));}
const images=[];
for(const a of manifest.assets){const b=await readFile(new URL('../'+a.localPath,import.meta.url));assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);const m=await sharp(b).metadata();assert.equal(m.width,a.width);assert.equal(m.height,a.height);assert.ok(ids.has(a.scholarId));if(a.status==='user_supplied'){assert.equal(a.rightsStatus,'user_supplied_rights_not_independently_verified');assert.equal(a.downloadUrl,null);assert.equal(a.displayIsPlaceholder,false);const evidence=JSON.parse(await readFile(new URL('../'+a.evidence,import.meta.url)));assert.equal(evidence.sha256,a.sha256);assert.equal(evidence.rightsVerified,false);}else if(a.isPlaceholder){assert.equal(a.downloadUrl,null);assert.ok(a.placeholderLicense);}else{assert.ok(a.author);assert.ok(a.sourcePage);assert.ok(a.license);await readFile(new URL('../'+a.evidence,import.meta.url));}images.push({id:a.scholarId,format:m.format,width:m.width,height:m.height,isPlaceholder:a.isPlaceholder,sha256Verified:true});}
for(const a of manifest.displayFallbacks||[]){const b=await readFile(new URL('../'+a.localPath,import.meta.url));assert.equal(createHash('sha256').update(b).digest('hex'),a.sha256);const m=await sharp(b).metadata();assert.equal(m.width,a.width);assert.equal(m.height,a.height);}
const result={displayFallbacksChecked:manifest.displayFallbacks?.length||0,status:'passed',scholars:ids.size,concepts:data.scholars.reduce((n,s)=>n+s.concepts.length,0),sources:sources.size,relations:data.relations.length,images,checks:['JSON parses','unique scholar ids','primary/extension split','per-claim citations and locators','no false quotations','two clickable works per scholar','card copy length','relation references','local images decode','dimensions and SHA-256','license evidence paths']};
await mkdir('qa',{recursive:true});await writeFile('qa/scholar-data-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
