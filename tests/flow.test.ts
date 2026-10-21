import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialState,reducer} from '../data/flow';
import {scholars} from '../data/scholars';
import {relations} from '../data/relations';
import {evidenceCards,quiz} from '../data/study';
test('投票只在最后一轮开放，单次选择，重置恢复全部状态',()=>{
 let s={...initialState};
 assert.equal(reducer(s,{type:'vote',value:'together'}).vote,null);
 for(let i=0;i<3;i++)s=reducer(s,{type:'round',direction:1});
 s=reducer(s,{type:'vote',value:'technology'});
 assert.equal(reducer(s,{type:'vote',value:'together'}).vote,'technology');
 s=reducer(s,{type:'evidence',id:'context'});
 s=reducer(s,{type:'answer',id:'C'});s=reducer(s,{type:'submit'});s=reducer(s,{type:'summary'});
 assert.equal(s.summary,true);
 assert.deepEqual(reducer(s,{type:'reset'}),initialState);
});
test('答题前不展示解释或总结；修改选择后重新提交',()=>{
 let s=reducer(initialState,{type:'submit'});assert.equal(s.submitted,false);
 assert.equal(reducer(s,{type:'summary'}).summary,false);
 s=reducer(s,{type:'answer',id:'A'});s=reducer(s,{type:'submit'});assert.equal(s.submitted,true);
 s=reducer(s,{type:'answer',id:quiz.correct});assert.equal(s.submitted,false);
});
test('学术数据有出处、状态与类别，教学对照不冒充直接师承',()=>{
 for(const s of scholars){for(const c of [s,s.explanation,s.question,s.oneLine,s.example]){assert.ok(c.source);assert.ok(c.kind);assert.ok(['verified','pending'].includes(c.sourceStatus));}}
 assert.equal(scholars.length,6);assert.equal(evidenceCards.length,3);
 for(const r of relations){assert.ok(scholars.some(s=>s.id===r.from));assert.ok(scholars.some(s=>s.id===r.to));if(r.type==='comparison')assert.match(r.source,/师承/);}
 for(const c of evidenceCards){assert.ok(c.finding.source);assert.ok(c.boundary.source);}
});

test('三卷宗选择返回后保留，重置清空；固定课堂顺序不增加旁听节点',async()=>{
 const {classroomOrder,adjacentStage,stages}=await import('../data/flow');
 assert.deepEqual(classroomOrder.map(i=>stages[i].id),['opening','roundtable','evidence','map','quiz']);
 assert.equal(adjacentStage(3,1),1);assert.equal(adjacentStage(1,-1),3);
 let s=reducer(initialState,{type:'stone',value:'scroll'});
 s=reducer(s,{type:'prediction',value:'different'});
 s=reducer(s,{type:'goto',stage:1});s=reducer(s,{type:'goto',stage:0});
 assert.equal(s.stoneChoice,'scroll');assert.equal(s.mirrorPrediction,'different');
 assert.deepEqual(reducer(s,{type:'reset'}),initialState);
});
