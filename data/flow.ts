export const stages = [
 {id:'opening',number:'01',title:'卷宗一·留石国',time:'0:00–2:35',short:'石碑还是卷轴'},
 {id:'map',number:'04',title:'理论揭晓',time:'7:40–9:15',short:'理论地图与单人问学者'},
 {id:'roundtable',number:'02',title:'卷宗二·世界之河',time:'2:35–4:45',short:'学术圆桌与春节视频'},
 {id:'evidence',number:'03',title:'卷宗三·万知镜',time:'4:45–7:40',short:'AI 研究互动'},
 {id:'quiz',number:'05',title:'检验与结语',time:'9:15–9:40',short:'9:40–10:00 缓冲'}
] as const;
export const classroomOrder=[0,2,3,1,4];
export const adjacentStage=(stage:number,direction:1|-1)=>classroomOrder[Math.max(0,Math.min(classroomOrder.length-1,classroomOrder.indexOf(stage)+direction))];
export type State = { stoneChoice:'stone'|'scroll'|null; mirrorPrediction:'same'|'different'|null; stage:number; openingChoice:'yes'|'depends'|null; scholar:string; answerMode:'oneLine'|'example'|null; round:number; vote:'technology'|'together'|null; evidence:string; seen:string[]; answer:string|null; submitted:boolean; summary:boolean };
export const initialState: State = {stoneChoice:null,mirrorPrediction:null,stage:0,openingChoice:null,scholar:'innis',answerMode:null,round:0,vote:null,evidence:'model',seen:[],answer:null,submitted:false,summary:false};
export type Action = {type:'stone';value:State['stoneChoice']}|{type:'prediction';value:State['mirrorPrediction']}|{type:'opening';value:State['openingChoice']}|{type:'goto';stage:number}|{type:'scholar';id:string}|{type:'ask';mode:State['answerMode']}|{type:'round';direction:number}|{type:'vote';value:State['vote']}|{type:'evidence';id:string}|{type:'answer';id:string}|{type:'submit'}|{type:'summary'}|{type:'reset'};
export function reducer(state:State, action:Action):State {
 switch(action.type){
 case 'stone':return {...state,stoneChoice:action.value};
 case 'prediction':return {...state,mirrorPrediction:action.value};
 case 'opening':return {...state,openingChoice:action.value};
 case 'goto':return {...state,stage:Math.min(4,Math.max(0,action.stage))};
 case 'scholar':return {...state,scholar:action.id,answerMode:null};
 case 'ask':return {...state,answerMode:action.mode};
 case 'round':return {...state,round:Math.min(3,Math.max(0,state.round+action.direction))};
 case 'vote':return state.round===3 && !state.vote ? {...state,vote:action.value}:state;
 case 'evidence':return {...state,evidence:action.id,seen:[...new Set([...state.seen,action.id])]};
 case 'answer':return {...state,answer:action.id,submitted:false,summary:false};
 case 'submit':return state.answer?{...state,submitted:true}:state;
 case 'summary':return state.submitted?{...state,summary:true}:state;
 case 'reset':return {...initialState,seen:[]};
 }
}
