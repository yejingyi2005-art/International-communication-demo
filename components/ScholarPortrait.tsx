import manifest from '@/data/avatar-manifest.json';
import { getScholar } from '@/data/scholar-knowledge';
export default function ScholarPortrait({id,large=false}:{id:string;large?:boolean}) {
 const a=manifest.assets.find(a=>a.scholarId===id);
 if(!a)return null;
 return <img className={`scholar-photo ${large?'large':''}`} src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${a.displaySrc}`} alt={a.displayIsPlaceholder?'姓名字母占位，真实肖像来源或授权待确认':`${getScholar(id)?.nameZh || id}真实历史照片`} width={large?88:48} height={large?110:60} loading="lazy"/>;
}
export function PortraitCredit({id}:{id:string}) {
 const a=manifest.assets.find(a=>a.scholarId===id);
 if(!a)return null;
 return <details className="portrait-credit"><summary>肖像来源与授权{a.displayIsPlaceholder?' · 待确认照片':''}</summary><p>{a.attribution}</p><p>{a.commercialUse}</p><p>{a.displayNote}</p>{a.sourcePage&&<a href={a.sourcePage} target="_blank" rel="noopener noreferrer">图片原始说明页 ↗</a>}{a.licenseUrl&&<a href={a.licenseUrl} target="_blank" rel="noopener noreferrer">许可／权利说明 ↗</a>}{a.isPlaceholder&&<p>{a.reason}</p>}</details>;
}
