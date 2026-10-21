import type { Provenance } from '@/data/types';
export default function SourceNote({item,compact=false}:{item:Provenance;compact?:boolean}){
 return <details className={`source-note ${compact?'compact':''}`}><summary><span className={`source-dot ${item.sourceStatus}`} />{item.sourceStatus==='verified'?'查看依据':'资料核查中'}</summary><p>{item.source}</p>{item.citations?.map((c,i)=><p key={c.url+i}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.sourceId || '原始资料'} ↗</a>{c.locator&&<small> · {c.locator}</small>}</p>)}<p className="source-kind">{({theory:'理论概括',evidence:'研究证据',application:'课堂应用',simulation:'教学模拟'})[item.kind]} · {item.sourceStatus==='verified'?(item.citations?.length?'已据链接资料整理；非逐字引语':'已据现有资料核对'):'待同伴复核原始出处'}</p></details>
}
