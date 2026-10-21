import type { Provenance } from './types';
import { knowledge } from './scholar-knowledge';
export type Relation = Provenance & { from:string;to:string;label:string;type:'influence'|'critique'|'comparison' };
export const relations:Relation[]=knowledge.relations.map(r=>({
 from:r.fromIds[0],to:r.toId,label:r.label,type:r.type as Relation['type'],source:r.type==='comparison'?`${r.explanation.text} 教学对照，不表示直接师承。`:r.explanation.text,
 sourceStatus:'verified',kind:r.type==='comparison'?'application':'theory',citations:r.explanation.citations
}));
