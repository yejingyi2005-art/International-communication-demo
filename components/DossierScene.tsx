'use client';
import type { State, Action } from '@/data/flow';
import { dossierChoices } from '@/data/dossiers';
export default function DossierScene({kind,state,dispatch}:{kind:'stone'|'river'|'mirror';state:State;dispatch:React.Dispatch<Action>}) {
 const choice=state.stoneChoice;
 const prediction=state.mirrorPrediction;
 return <section className="dossier-scene" aria-label={({stone:'卷宗一·留石国的信使',river:'卷宗二·世界之河',mirror:'卷宗三·万知镜'})[kind]}><p className="eyebrow">信使之国 · 寓言卷宗 · 非历史事实</p>
  {kind==='stone'?<><h2>留石国的信使</h2><p>祖训要留给百年后的孩子，洪水预警却要赶紧送到远方。信使只能先带上一件东西：你会选择什么？</p><div className="dossier-options">{Object.entries(dossierChoices).map(([id,c])=><button className="secondary-button" key={id} aria-pressed={choice===id} onClick={()=>dispatch({type:'stone',value:id as keyof typeof dossierChoices})}>{c.label}</button>)}</div>{choice&&<div className="dossier-feedback" role="status"><p>{dossierChoices[choice].feedback}</p><strong>伊尼斯的时间／空间偏向</strong><p>媒介提供不同便利；还要检查道路、抄写能力与制度。这里的“偏向”是相对倾向，不是材料决定一切。</p><a href="https://www.gutenberg.ca/ebooks/innis-empire/innis-empire-00-h.html" target="_blank" rel="noopener noreferrer">理论依据：Empire and Communications (1950), Introduction ↗</a></div>}</>:kind==='river'?<><h2>万声国与世界之河</h2><p>中国女孩拍下家人包饺子的春节视频，放入世界之河。远方的人看见了画面，也可能产生误解：传得远，就等于理解得深吗？</p><p className="dossier-question">接着听三位主讲学者，比较媒介条件、媒介形式与社会安排。</p></>:<><h2>万知镜</h2><p>信使向不同的“万知镜”询问同一国际问题。能力相近的镜子，会不会给出一样完整的回答？</p><div className="dossier-options"><button className="secondary-button" aria-pressed={prediction==='same'} onClick={()=>dispatch({type:'prediction',value:'same'})}>预测：能力相近，回答也相同</button><button className="secondary-button" aria-pressed={prediction==='different'} onClick={()=>dispatch({type:'prediction',value:'different'})}>预测：仍可能不同</button></div>{prediction&&<p className="dossier-feedback" role="status">已记录预测。请用下方“模型—信息—情境”三张原有研究卡检查理由；寓言本身不是研究证据。</p>}</>}
 </section>;
}
