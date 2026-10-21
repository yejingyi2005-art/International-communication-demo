import { getScholar, knowledge, type KnowledgeClaim } from '@/data/scholar-knowledge';
import { PortraitCredit } from './ScholarPortrait';
const labels=knowledge.provenanceLabels;
function KnowledgeText({item}:{item:KnowledgeClaim}){
 return <div className="knowledge-text"><p>{item.text}</p><small className="knowledge-kind">{labels[item.provenance]}</small><details className="knowledge-citations"><summary>对应来源</summary>{item.citations.map(c=><p key={c.sourceId}><a href={c.url} target="_blank" rel="noopener noreferrer">{knowledge.sources.find(s=>s.id===c.sourceId)?.title} ↗</a><small>{c.locator} · {c.supports}</small></p>)}</details></div>;
}
export function ScholarWorks({id}:{id:string}) {
 const s=getScholar(id);if(!s)return null;
 return <div className="scholar-works">{s.works.map(w=><p key={w.sourceId}><a href={w.url} target="_blank" rel="noopener noreferrer">《{w.titleZh}》 / <i>{w.titleEn}</i>（{w.year}）↗</a></p>)}</div>;
}
function ScholarConnections({id}:{id:string}) {
 const s=getScholar(id);if(!s)return null;
 return <details className="knowledge-expansion"><summary>与其他学者的关系</summary>{s.relations.map(id=>{const r=knowledge.relations.find(r=>r.id===id)!;return <section key={id}><h4>{r.fromIds.map(id=>getScholar(id)!.nameZh).join('、')} {r.type==='critique'?'↔':'→'} {getScholar(r.toId)!.nameZh}</h4><p className="field-label">{r.label}</p><KnowledgeText item={r.explanation as KnowledgeClaim}/></section>;})}</details>;
}
export default function ScholarKnowledgeCard({id}:{id:string}) {
 const s=getScholar(id);if(!s)return null;
 return <div className="knowledge-card"><p className="field-label">{s.role}</p><KnowledgeText item={s.eraBackground}/><div className="knowledge-keywords">{s.keywords.map(k=><span key={k}>{k}</span>)}</div><p className="field-label">生活中的解释</p><p>{s.plainExplanation}</p><small className="knowledge-kind">当代教学类比</small><p className="field-label">假如他参与讨论</p><div className="simulated-line"><strong>教学模拟 · 非真实引语</strong><p>{s.simulatedLine.text}</p></div><p className="field-label">继续追问</p><p>{s.question.text}</p><p className="field-label">对应卷宗</p><p>{s.dossierIds.map(id=>({stone:'卷宗一·留石国',river:'卷宗二·世界之河',mirror:'卷宗三·万知镜'})[id]).join(' / ')}</p><details className="knowledge-expansion"><summary>展开学术解释、具体案例与局限</summary>{s.concepts.map(c=><section key={c.id}><h4>{c.name}</h4><KnowledgeText item={c.academicExplanation}/><KnowledgeText item={c.plainExplanation}/><KnowledgeText item={c.internationalApplication}/></section>)}<section><h4>{s.case.title}</h4><small>虚构教学案例</small><KnowledgeText item={s.case.situation}/><KnowledgeText item={s.case.analysis}/><p>{s.case.prompt}</p></section><section><h4>解释边界</h4>{s.limitations.map((l,i)=><KnowledgeText key={i} item={l}/>)}</section></details><p className="field-label">代表作 · 点击查看书目</p><ScholarWorks id={id}/><details className="knowledge-citations"><summary>资料来源与核查范围</summary>{s.sourceIds.map(id=>{const r=knowledge.sources.find(s=>s.id===id)!;return <p key={id}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.author} · {r.title} ↗</a><small>{r.verification}</small></p>;})}</details><ScholarConnections id={id}/><PortraitCredit id={id}/></div>;
}
