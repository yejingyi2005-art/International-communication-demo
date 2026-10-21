import { claim, type Claim, type Provenance } from './types';
export const paperTitle = '“生成式把关”视野下的大模型信息回避行为——基于全球主流大模型的跨国比较分析';
export const paperCitation = `张伦、何水林、郭思宇、许小可（2026）。${paperTitle}。2026年第8期，19—38。DOI: 10.16057/j.cnki.31-1171/g2.2026.08.009。期刊名与规范格式待复核。`;
export type EvidenceCard = Provenance & { id: string; number: string; title: string; subtitle: string; headline: string; finding: Claim; boundary: Claim; prompt: string };
export const evidenceCards: EvidenceCard[] = [
 {id:'model',number:'01',title:'模型',subtitle:'技术能力与开放属性',headline:'参数更多 ≠ 回答必然更开放',source:paperTitle+'，印刷页31，表5',sourceStatus:'verified',kind:'evidence',finding:claim('在该研究的相应多项 Logistic 回归中，参数规模与开源性对强硬回避、软性回避未显示显著作用。上线时间对强硬回避存在显著关联，因此模型因素并非全部无显著关系。',paperTitle+'，印刷页31，表5','evidence','verified'),boundary:claim('“未显示显著作用”不等于“技术没有影响”，也不表示参数规模等同于模型的全部技术能力。','课堂方法提醒；依照需求 v2 的解释边界','application','verified'),prompt:'还可以用哪些指标测量模型的技术能力？'},
 {id:'information',number:'02',title:'信息',subtitle:'议题、提问方式与语言',headline:'同一个模型，也可能有不同回应',source:paperTitle+'，印刷页27—28、31—32',sourceStatus:'verified',kind:'evidence',finding:claim('议题、提问方式、语言与信息回避有关。不同因素对强硬回避和软性回避的关联并不完全一致；回避也包括部分作答、模糊表达等形式。',paperTitle+'，印刷页27—28、31—32','evidence','verified'),boundary:claim('不能只数“拒绝回答”的次数；还要明确回答分类、比较基准及具体议题，避免把不同回应都当作同一种回避。','基于论文变量操作化的课堂方法提醒','application','verified'),prompt:'“回答了一部分”和“完整回答”，在编码时怎样区分？'},
 {id:'context',number:'03',title:'情境',subtitle:'地区背后的制度文化条件',headline:'地区有关联，机制仍需验证',source:paperTitle+'，印刷页24、32',sourceStatus:'verified',kind:'evidence',finding:claim('研究以模型所属地区作为情境因素的代理变量。部分地区与特定回避行为显著关联，但强硬回避与软性回避的地域差异表现不同。',paperTitle+'，印刷页24、32','evidence','verified'),boundary:claim('地区同时包含多种差异，不能把“地区关联”直接归因于某一法规。验证具体机制，还需要更细的变量与研究设计。','课堂方法提醒；依照需求 v2 的因果解释边界','application','verified'),prompt:'怎样把“地区”进一步拆成可检验的制度与文化变量？'}
];
export const method: Claim = claim('该研究比较了26个主流模型，以中国议题为主，并补充美国同类议题比较，使用多项 Logistic 回归分析模型、信息、情境因素。结论限于其样本、版本、题项与分析范围。',paperTitle+'，印刷页26—30、33','evidence','verified');
export const synthesis = claim('模型技术能力 × 问题内容 × 制度文化情境，共同参与塑造生成式把关。','依据论文三维框架的教学概括；× 表示综合分析，不是拟合公式','application','verified');
export const limitation = claim('这是比较关联研究。关联不等于已证实的制度因果机制；研究结果也不是所有模型、所有议题和所有时期的普遍规律。','课堂方法说明，依据需求 v2 设定解释边界','application','verified');
export const quiz = {
 question:'能力相近的模型对相同国际议题回答不同，最合理的研究判断是？',
 options:[{id:'A',text:'技术完全无影响'},{id:'B',text:'技术升级决定所有结果'},{id:'C',text:'同时分析技术、问题内容、语言与制度文化情境'},{id:'D',text:'不同模型必然相同'}],
 correct:'C',
 explanation:claim('相近能力并不代表技术属性完全一致，也不排除技术作用。更合理的做法是同时分析模型特征、问题内容与制度文化情境，再用合适的研究设计检验解释。','课堂单题检验，基于三维分析框架','application','verified')
};
export const furtherReading = [
 {title:'高慧敏：人机共生、算法博弈与价值重塑',text:'《人机共生、算法博弈与价值重塑：2026年国际传播理论与实践议题前瞻》。用于讨论传播主体、算法权力与知识生产；属于议题前瞻，不替代张伦等的实证证据。',source:'已提供的高慧敏 PDF；题名与首页内容已读取，规范书目待核查',sourceStatus:'pending',kind:'application'},
 {title:'全球 AI 治理：一个延伸追问',text:'当生成式媒介影响跨国知识流动，谁参与制定规则？如何兼顾多元表达、公共利益与责任？具体治理文件尚待补充核查。',source:'课堂延伸问题，无具体法规因果断言',sourceStatus:'pending',kind:'application'}
] satisfies (Provenance & {title:string;text:string})[];
