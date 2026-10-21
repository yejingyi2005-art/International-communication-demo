import { claim, type Claim } from './types';
export type Round = { id: string; speaker: string; role: string; initials: string; title: string; content: Claim; takeaway: string };
const source = '依据学者思想的教学模拟，非历史原话；理论出处待同伴审核';
export const rounds: Round[] = [
 {id:'host',speaker:'学习引导员',role:'提出问题',initials:'引',title:'更强的技术，会带来更开放的回答吗？',content:claim('传播技术让信息跨越国界更快、更广。现在，大模型还会直接生成答案。但技术能力越来越强，是否就意味着我们能听见更多不同的声音？请三位学者分别给出一个观察角度。',source,'simulation'),takeaway:'把“传播能力”与“传播结果”分开思考。'},
 {id:'innis',speaker:'哈罗德·伊尼斯',role:'媒介偏向',initials:'HI',title:'先看知识通过什么网络流动。',content:claim('从我的媒介偏向视角出发，跨国信息不只是移动得更快。媒介的物质条件、知识的保存方式与传播网络，会影响谁能掌握知识。当知识入口集中到少数平台时，我们应追问新的控制关系。',source,'simulation'),takeaway:'分析角度：媒介条件、知识分布与控制。'},
 {id:'mcluhan',speaker:'马歇尔·麦克卢汉',role:'媒介形式',initials:'MM',title:'从“找信息”到“生成答案”，形式已经改变。',content:claim('用我的媒介视角作教学推演：过去你在网页间选择，现在你与一个会组织答案的界面交谈。生成式媒介改变的不只是内容数量，也改变了信息接触的速度、尺度与参与方式。这本身就值得研究。',source,'simulation'),takeaway:'分析角度：生成式媒介如何重新组织信息经验。'},
 {id:'williams',speaker:'雷蒙德·威廉斯',role:'社会条件',initials:'RW',title:'技术的可能性，怎样成为特定的社会结果？',content:claim('用我的批判视角追问：谁开发技术？谁为它设定目标？哪些商业、组织与制度条件塑造了它的使用？相似技术可能走向不同结果，因此不能从技术能力直接推导开放程度。',source,'simulation'),takeaway:'分歧焦点：媒介形式的力量，是否足以解释传播结果？'}
];
export const voteFeedback: Record<string, Claim> = {
 technology:claim('你抓住了技术对传播条件的改变。再向前一步：相近能力的模型为什么仍可能回答不同？需要把问题内容、平台目标与制度文化情境纳入解释。','课堂反馈预设','simulation','verified'),
 together:claim('这个判断保留了技术的作用，也给社会条件留下解释空间。接下来用研究证据检验：技术、信息与情境分别怎样参与生成式把关？','课堂反馈预设','simulation','verified')
};

export const roundtablePrompt = claim('对于同一个国际问题，两个模型的回答不一样，你认为单靠技术参数能解释吗？','整合说明中的主持人课堂提问','simulation');
