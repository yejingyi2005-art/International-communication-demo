import raw from './scholar-knowledge.json';
export type ScholarId = 'innis' | 'mcluhan' | 'williams' | 'postman' | 'castells' | 'schiller';
export type DossierId = 'stone' | 'river' | 'mirror';
export type KnowledgeClaim = { text: string; provenance: 'original_paraphrase' | 'later_interpretation' | 'editorial_interpretation' | 'teaching_simulation'; isQuotation: false; citations: {sourceId:string;url:string;locator:string;supports:string}[] };
export type KnowledgeScholar = {
 id:ScholarId; nameZh:string;nameEn:string;years:string;primary:boolean;role:string;eraBackground:KnowledgeClaim;
 keywords:string[];plainExplanation:string;dossierIds:DossierId[];simulatedLine:KnowledgeClaim;question:KnowledgeClaim;
 concepts:{id:string;name:string;academicExplanation:KnowledgeClaim;plainExplanation:KnowledgeClaim;internationalApplication:KnowledgeClaim}[];
 case:{title:string;kind:'fictional_teaching_case';situation:KnowledgeClaim;analysis:KnowledgeClaim;prompt:string};
 limitations:KnowledgeClaim[];works:{titleZh:string;titleEn:string;year:number;sourceId:string;url:string;note:string}[];sourceIds:string[];sources:{id:string;title:string;url:string;kind:string;verification:string;crossCheckUrl?:string}[];relations:string[];
};
export type Knowledge = Omit<typeof raw,'scholars'> & {scholars:KnowledgeScholar[]};
export const knowledge = raw as Knowledge;
export const extensionScholars=knowledge.scholars.filter(s=>!s.primary);
export const getScholar=(id:string)=>knowledge.scholars.find(s=>s.id===id);
