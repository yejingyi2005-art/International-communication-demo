import { claim } from './types';
const source = '《Codex_国际传播思想实验室_8分钟Demo_整合说明》与《【文字稿1.0】国际与跨文化传播期中pre》；经典原著及页码待核查';
export const definition = claim('传播技术决定论强调：媒介的物质属性、技术结构与形式，会深刻塑造信息交流、社会组织和人的感知。分析传播时，除了看内容，也要看媒介本身。', source);
export const versions = [
 {title:'较强的技术决定论', content:claim('把技术视为相对独立、具有自身发展逻辑的社会变迁驱动力，倾向于从技术变化推导社会变化。', source)},
 {title:'把技术放回社会条件', content:claim('承认媒介的作用，同时考察谁开发、选择和使用技术，以及制度、资本、文化与人的实践怎样参与塑造结果。', source,'application')}
];
export const theoryBoundary = claim('这六位学者并不都认为“技术决定一切”。伊尼斯与麦克卢汉提供媒介分析视角，威廉斯提出批判；波兹曼、卡斯特尔斯和席勒在课堂中用于延伸与对照。', source,'application');
export const openingChoices = [
 {id:'yes', label:'会，能力越强回答越开放',feedback:claim('这是一个可以检验的直觉。先保留判断：如果技术能力相近，模型为什么还可能给出不同回答？','整合说明中的开场直觉选择；本地预设反馈','simulation')},
 {id:'depends',label:'不一定，还要看其他条件',feedback:claim('先把“其他条件”留作问题。接下来用三位学者的视角，具体说出这些条件是什么。','整合说明中的开场直觉选择；本地预设反馈','simulation')}
] as const;
export const history = [
 {id:'writing',time:'文字媒介与帝国组织',label:'保存知识 / 跨越空间',content:claim('从伊尼斯出发，比较耐久媒介与轻便媒介如何为知识保存、远距离行政提供不同条件。媒介偏向是一个分析角度，不能把帝国兴衰归为某一种材料的单独作用。',source,'application'),reference:'Innis (1950), Empire and Communications；Innis (1951), The Bias of Communication。具体历史案例与页码待复核。'},
 {id:'electronic',time:'电报、广播电视与跨国信息流动',label:'传播速度 / 发展传播',content:claim('电报、广播电视为跨国信息的速度、覆盖与接触方式提供了新的条件。课堂可进一步比较：相同传播技术在不同地区怎样被组织和使用？勒纳等发展传播研究仅作对照，不把它们全部归入技术决定论。',source,'application'),reference:'通信史与发展传播的具体案例待同伴补充；勒纳相关研究的版本、结论与局限待核查。'},
 {id:'power',time:'文化帝国主义批判',label:'所有权 / 商业与权力',content:claim('转向席勒的政治经济视角，追问跨国文化产品与传播资源由谁拥有、商业关系如何影响文化流动。连接更多，并不自动回答资源分配是否更平等。',source,'application'),reference:'Schiller (1976), Communication and Cultural Domination。版本、译名与具体论述待核查。'}
];
export const applications = [
 {id:'platform',title:'短视频的跨国流动',content:claim('以 TikTok 等短视频平台作课堂分析：推荐机制可能改变内容可见性，但还要追问平台目标、商业激励和用户的策略性创作。这里展示的是分析问题，不是已核查的实证研究结论。',source,'application')},
 {id:'ai',title:'从检索信息到生成答案',content:claim('大模型参与组织和生成回答，使把关进入内容生成环节。技术形式发生变化之后，仍要分析哪些问题被回答、使用什么语言，以及平台如何界定回答边界。',source,'application')}
];
export const limitations = [
 {title:'人的能动性',content:claim('用户会选择、解释、改造和抵抗技术的使用方式，不能只把人当作被动接受者。',source,'theory')},
 {title:'政治经济关系',content:claim('所有权、商业模式、平台目标与制度安排会影响技术怎样进入传播过程。',source,'theory')},
 {title:'文化与情境差异',content:claim('相似媒介在不同语言、社会与文化环境中，未必形成相同的传播结果。',source,'theory')}
];
export const learningCard = [
 {title:'一个核心概念',content:claim('媒介即讯息：媒介形式会改变交往尺度、速度与感知，不能只分析它传递的内容。',source)},
 {title:'三位学者的分歧',content:claim('伊尼斯追问知识保存与控制；麦克卢汉关注媒介形式与经验；威廉斯追问技术的社会形成与使用条件。',source,'application')},
 {title:'一个国际传播案例',content:claim('生成式把关：能力相近的模型仍可能对同一国际议题给出不同回答，应同时分析模型、内容、语言与情境。','依据张伦等论文三维框架的课堂应用；不等同于论文检验了所有能力相近的模型','application')},
 {title:'一项理论局限',content:claim('单向技术解释容易低估制度、资本、文化差异与人的能动性；比较研究中的关联也不能直接当作因果。',source,'application')}
];
