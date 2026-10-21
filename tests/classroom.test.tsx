import { JSDOM } from 'jsdom';
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'http://localhost:3000',pretendToBeVisual:true});
Object.defineProperties(globalThis,{window:{value:dom.window,configurable:true},document:{value:dom.window.document,configurable:true},navigator:{value:dom.window.navigator,configurable:true},HTMLElement:{value:dom.window.HTMLElement,configurable:true},Node:{value:dom.window.Node,configurable:true},getComputedStyle:{value:dom.window.getComputedStyle,configurable:true}});
dom.window.scrollTo=()=>{};
// JSDOM has no native dialog top layer. This shim tests React open/close state only;
// browser checks separately verify native Escape, focus trapping and restoration.
Object.assign(dom.window.HTMLDialogElement.prototype,{
 showModal(this:HTMLDialogElement){this.setAttribute('open','');},
 close(this:HTMLDialogElement){this.removeAttribute('open');}
});
const React=await import('react');
const {render,screen,cleanup,within}=await import('@testing-library/react');
const {default:userEvent}=await import('@testing-library/user-event');
const {default:Classroom}=await import('../components/Classroom');
afterEach(()=>cleanup());
function nav(){return within(screen.getByRole('navigation',{name:'课堂演示导航'}));}
function active(){return screen.getByRole('navigation').querySelector('[aria-current="step"]')!.textContent!;}
test('十分钟主路线：三卷宗、四轮与投票、原研究三卡、理论揭晓、测验、总结及重置',async()=>{
 const user=userEvent.setup({document:dom.window.document});render(<Classroom/>);
 assert.match(active(),/卷宗一/);assert.equal(screen.queryByRole('button',{name:'旁听席（3）'}),null);
 await user.click(screen.getByRole('button',{name:/石碑：/}));assert.match(screen.getByRole('status').textContent!,/跨代延续/);
 await user.click(screen.getByRole('button',{name:/卷轴：/}));assert.match(screen.getByRole('status').textContent!,/远距离/);
 await user.click(screen.getByRole('button',{name:'进入世界之河'}));assert.match(active(),/卷宗二/);
 assert.equal(screen.queryByRole('dialog'),null);
 for(let i=0;i<3;i++)await user.click(screen.getAllByRole('button',{name:'下一轮'}).find(b=>!b.hasAttribute('disabled'))!);
 await user.click(screen.getByRole('button',{name:'技术与社会共同解释'}));assert.match(screen.getByRole('status').textContent!,/保留了技术的作用/);
 await user.click(screen.getByRole('button',{name:'进入 AI 研究'}));assert.match(active(),/卷宗三/);
 for(const name of ['02 信息','03 情境','01 模型'])await user.click(screen.getByRole('button',{name:new RegExp(name.replace(' ','.*'))}));
 assert.equal(screen.getAllByText('已探索').length,3);
 await user.click(screen.getByRole('button',{name:'进入理论揭晓'}));assert.match(active(),/理论揭晓/);
 const extensions=within(document.querySelector('.extension-nodes') as HTMLElement);
 for(const name of ['波兹曼','卡斯特','席勒']){await user.click(extensions.getByRole('button',{name:new RegExp(name)}));assert.match(document.querySelector('.detail-top h3')!.textContent!,new RegExp(name));}
 await user.click(screen.getByRole('button',{name:/1950s.*哈罗德/}));
 await user.click(screen.getByRole('button',{name:'用一句话解释'}));assert.match(screen.getByRole('status').textContent!,/物质条件/);
 await user.click(screen.getByRole('button',{name:'给出国际传播例子'}));assert.match(screen.getByRole('status').textContent!,/石碑/);
 await user.click(screen.getByRole('button',{name:'进入单题检验'}));assert.match(active(),/检验与结语/);
 assert.ok(screen.getByRole('button',{name:'提交判断'}).hasAttribute('disabled'));
 await user.click(screen.getByRole('radio',{name:/C\s*同时分析/}));await user.click(screen.getByRole('button',{name:'提交判断'}));assert.match(screen.getByRole('status').textContent!,/判断正确/);
 await user.click(screen.getByRole('button',{name:'查看学习总结卡'}));assert.ok(screen.getByText('技术很重要，'));
 await user.click(screen.getByRole('button',{name:'重置演示'}));assert.match(active(),/卷宗一/);assert.equal(screen.getByRole('button',{name:/石碑：/}).getAttribute('aria-pressed'),'false');
});
test('另一投票反馈、错误答案修改、返回保留圆桌状态',async()=>{
 const user=userEvent.setup({document:dom.window.document});render(<Classroom/>);
 await user.click(nav().getByRole('button',{name:/卷宗二/}));
 for(let i=0;i<3;i++)await user.click(screen.getAllByRole('button',{name:'下一轮'}).find(b=>!b.hasAttribute('disabled'))!);
 await user.click(screen.getByRole('button',{name:'技术解释为主'}));assert.match(screen.getByRole('status').textContent!,/抓住了技术/);
 assert.ok(screen.getByRole('button',{name:'技术与社会共同解释'}).hasAttribute('disabled'));
 await user.click(nav().getByRole('button',{name:/检验与结语/}));
 await user.click(screen.getByRole('radio',{name:/A\s*技术完全/}));await user.click(screen.getByRole('button',{name:'提交判断'}));assert.match(screen.getByRole('status').textContent!,/最合理的判断是 C/);
 await user.click(screen.getByRole('radio',{name:/C\s*同时分析/}));assert.equal(screen.queryByRole('status'),null);
 await user.click(screen.getByRole('button',{name:'提交判断'}));assert.match(screen.getByRole('status').textContent!,/判断正确/);
 await user.click(nav().getByRole('button',{name:/卷宗二/}));assert.equal(screen.getByRole('button',{name:'技术解释为主'}).getAttribute('aria-pressed'),'true');
});
test('原有开场预测、理论定义、历史脉络和单人问学者保留',async()=>{
 const user=userEvent.setup({document:dom.window.document});render(<Classroom/>);
 await user.click(screen.getByText('原版开场预测与问题导入'));
 await user.click(screen.getByRole('button',{name:'不一定，还要看其他条件'}));assert.match(screen.getByRole('status').textContent!,/三位学者/);
 await user.click(nav().getByRole('button',{name:/理论揭晓/}));assert.ok(screen.getByRole('heading',{name:'传播技术决定论'}));
 await user.click(screen.getByText('“技术很重要”与“技术决定一切”，差别在哪里？'));assert.ok(screen.getByText('较强的技术决定论'));
 await user.click(screen.getByText('展开核心概念与解释'));assert.ok(screen.getByText(/时间偏向与空间偏向：/));
 await user.click(screen.getByText('从媒介技术，走向国际传播研究'));assert.ok(screen.getByRole('heading',{name:'电报、广播电视与跨国信息流动'}));
 await user.click(screen.getByRole('button',{name:'重置演示'}));assert.equal(screen.getByRole('button',{name:'不一定，还要看其他条件',hidden:true}).getAttribute('aria-pressed'),'false');
});
test('旁听席三张卡与三人讨论可选推进、关闭后主流程不变，图谱三条关系定向打开',async()=>{
 const user=userEvent.setup({document:dom.window.document});render(<Classroom/>);
 await user.click(screen.getByRole('button',{name:'进入世界之河'}));
 const stageBefore=active();
 await user.click(screen.getByRole('button',{name:'旁听席（3）'}));
 let dialog=within(screen.getByRole('dialog',{name:'旁听席 · 三位拓展学者'}));
 for(const name of ['尼尔·波兹曼','曼纽尔·卡斯特尔斯','赫伯特·席勒']){
  const summary=dialog.getByText(name,{exact:true});await user.click(summary);
  const card=within(summary.closest('details') as HTMLElement);
  assert.ok(card.getByText('教学模拟 · 非真实引语'));assert.equal(card.getAllByRole('link').filter(a=>/《/.test(a.textContent!)).length,2);
  await user.click(summary);
 }
 await user.click(dialog.getByRole('button',{name:'三位旁听者如何争论？'}));
 assert.ok(dialog.getByText('尼尔·波兹曼（模拟）'));
 await user.click(dialog.getByRole('button',{name:'下一位旁听者 →'}));assert.ok(dialog.getByText('曼纽尔·卡斯特尔斯（模拟）'));
 await user.click(dialog.getByRole('button',{name:'下一位旁听者 →'}));assert.ok(dialog.getByText('赫伯特·席勒（模拟）'));
 await user.click(dialog.getByRole('button',{name:'关闭旁听席'}));assert.equal(screen.queryByRole('dialog'),null);assert.equal(active(),stageBefore);
 await user.click(nav().getByRole('button',{name:/理论揭晓/}));
 const relations=within(screen.getByLabelText('拓展关系入口'));
 assert.equal(relations.getAllByRole('button').length,3);
 for(const name of ['波兹曼','卡斯特尔斯','席勒']){
  await user.click(relations.getByRole('button',{name:new RegExp(name)}));
  const d=screen.getByRole('dialog');const selected=d.querySelector('details[open]');assert.match(selected!.textContent!,new RegExp(name));
  await user.click(within(d).getByRole('button',{name:'关闭旁听席'}));
 }
});
