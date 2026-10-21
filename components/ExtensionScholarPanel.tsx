'use client';
import { useEffect, useRef, useState } from 'react';
import { extensionScholars } from '@/data/scholar-knowledge';
import ScholarPortrait from './ScholarPortrait';
import ScholarKnowledgeCard from './ScholarKnowledgeCard';

const discussion=[
 {id:'postman',text:'先问视频为什么要变得这么短、这么吸引人。注意力规则可能改变我们讨论文化的方式。'},
 {id:'castells',text:'也要看到，普通创作者因此可以跨越国界发声；但网络的关键节点仍会影响可见度。'},
 {id:'schiller',text:'更要追问：平台属于谁、传播收益流向哪里、不同国家拥有的资源是否平等？'}
];
export default function ExtensionScholarPanel({target,onClose}:{target:string|null;onClose:()=>void}) {
 const dialog=useRef<HTMLDialogElement>(null);
 const [discussionOpen,setDiscussionOpen]=useState(false);
 const [visibleLines,setVisibleLines]=useState(1);
 useEffect(()=>{
  const el=dialog.current;
  if(!el||!target)return;
  const opener=document.activeElement as HTMLElement|null;
  setDiscussionOpen(false);setVisibleLines(1);
  if(!el.open)el.showModal();
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return ()=>{document.body.style.overflow=previousOverflow;if(el.open)el.close();opener?.focus();};
 },[target]);
 return <dialog ref={dialog} className="extension-drawer" aria-labelledby="extension-title" onCancel={onClose} onClose={onClose}>
  <div className="extension-drawer-heading"><div><p className="eyebrow">OPTIONAL PERSPECTIVES</p><h2 id="extension-title">旁听席 · 三位拓展学者</h2></div><button className="secondary-button" onClick={onClose} aria-label="关闭旁听席">关闭 ×</button></div>
  <p className="extension-optional">可选探索，不新增课堂时段；现场最多展开一张，其余可课后阅读。</p>
  {extensionScholars.map(s=><details className="extension-scholar" key={`${target}-${s.id}`} open={target===s.id}>
   <summary><ScholarPortrait id={s.id}/><span><strong>{s.nameZh}</strong><small>{s.nameEn}</small><span>{s.question.text}</span></span><span className="extension-expand" aria-hidden="true">＋</span></summary>
   <ScholarKnowledgeCard id={s.id}/>
  </details>)}
  <button className="primary-button extension-discussion-button" aria-expanded={discussionOpen} onClick={()=>{setDiscussionOpen(!discussionOpen);setVisibleLines(1);}}>三位旁听者如何争论？</button>
  {discussionOpen&&<section className="extension-discussion" aria-label="三位旁听者的简短讨论"><p className="simulation-notice">以下全部为当代教学模拟，非真实引语，亦非对短视频的真实评论。</p><p><strong>学习引导员（模拟）</strong>：世界之河把中国女孩的春节视频送到远方。这意味着文化交流更平等了吗？</p><div aria-live="polite">{discussion.slice(0,visibleLines).map(line=>{const s=extensionScholars.find(s=>s.id===line.id)!;return <article key={line.id}><strong>{s.nameZh}（模拟）</strong><p>{line.text}</p></article>;})}</div>{visibleLines<3?<button className="secondary-button" onClick={()=>setVisibleLines(n=>n+1)}>下一位旁听者 →</button>:<p><strong>学习引导员收束（模拟）</strong>：一起考察媒介环境如何塑造表达、网络如何分配可见度、传播资源由谁控制。</p>}<button className="text-button" onClick={()=>setDiscussionOpen(false)}>收起简短讨论</button></section>}
 </dialog>;
}
