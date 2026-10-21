import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';
const url=process.env.QA_URL||'http://127.0.0.1:3000';
const executablePath=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
await mkdir('qa',{recursive:true});
let browser;const issues=[],calls=[],checks=[];
try{
 browser=await chromium.launch({executablePath,headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',e=>issues.push(e.message));page.on('request',r=>calls.push(r.url()));
 page.on('response',r=>{if(r.status()>=400)issues.push(`HTTP ${r.status()}: ${r.url()}`);});
 assert.equal((await page.goto(url)).status(),200);
 const nav=page.getByRole('navigation',{name:'课堂演示导航'});
 async function noOverflow(label){const w=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));assert.ok(w.scroll<=w.client+1,`${label}: ${JSON.stringify(w)}`);checks.push(label);}
 async function closeDrawer(){await page.getByRole('button',{name:'关闭旁听席'}).click();assert.equal(await page.getByRole('dialog').count(),0);}
 await page.getByRole('button',{name:/石碑：/}).click();assert.match(await page.getByRole('status').textContent(),/跨代延续/);
 await page.getByRole('button',{name:/卷轴：/}).click();assert.match(await page.getByRole('status').textContent(),/远距离/);
 await page.screenshot({path:'qa/10-dossier-stone.png',fullPage:true});await noOverflow('1440 卷宗一');
 await page.getByRole('button',{name:'进入世界之河'}).click();
 assert.equal(await page.getByRole('dialog').count(),0);
 const entry=page.getByRole('button',{name:'旁听席（3）'});await entry.click();
 const drawer=page.getByRole('dialog',{name:'旁听席 · 三位拓展学者'});
 for(const name of ['尼尔·波兹曼','曼纽尔·卡斯特尔斯','赫伯特·席勒']){
  const summary=drawer.locator('details.extension-scholar > summary').filter({hasText:name});await summary.click();
  const card=drawer.locator('details.extension-scholar[open]');assert.equal(await card.getByText('教学模拟 · 非真实引语',{exact:true}).isVisible(),true);
  assert.equal(await card.locator('.scholar-works a').count(),2);
  for(const a of await card.locator('.scholar-works a').all())assert.match(await a.getAttribute('href'),/^https:\/\//);
  await summary.click();
 }
 await drawer.getByRole('button',{name:'三位旁听者如何争论？'}).click();
 await drawer.getByRole('button',{name:'下一位旁听者 →'}).click();await drawer.getByRole('button',{name:'下一位旁听者 →'}).click();
 assert.equal(await drawer.getByText('赫伯特·席勒（模拟）',{exact:true}).isVisible(),true);
 await page.screenshot({path:'qa/11-extension-discussion.png',fullPage:true});
 // Verify native modal keeps keyboard focus inside, Escape closes, and focus returns.
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('dialog')),true);}
 await page.keyboard.press('Escape');assert.equal(await drawer.count(),0);assert.equal(await entry.evaluate(el=>el===document.activeElement),true);
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'下一轮',exact:true}).first().click();
 await page.getByRole('button',{name:'技术与社会共同解释'}).click();assert.match(await page.getByRole('status').textContent(),/保留了技术的作用/);
 await page.getByText('原有圆桌发言：生成式媒介的追问',{exact:true}).click();assert.equal(await page.getByText('技术的可能性，怎样成为特定的社会结果？',{exact:true}).isVisible(),true);
 await page.getByRole('button',{name:'进入 AI 研究'}).click();
 for(const term of ['01 模型','02 信息','03 情境'])await page.getByRole('button',{name:new RegExp(term.replace(' ','.*'))}).click();
 assert.equal(await page.getByText('已探索',{exact:true}).count(),3);
 await page.screenshot({path:'qa/12-dossier-mirror.png',fullPage:true});
 await page.getByRole('button',{name:'进入理论揭晓'}).click();
 for(const name of ['1950s / 主讲 哈罗德','1960s / 主讲 马歇尔','1970s / 主讲 雷蒙']){
  await page.getByRole('button',{name:new RegExp(name)}).click();
  await page.getByRole('button',{name:'用一句话解释'}).click();await page.getByRole('status').waitFor();
  await page.getByRole('button',{name:'给出国际传播例子'}).click();assert.match(await page.getByRole('status').textContent(),/教学例子/);
 }
 for(const name of ['波兹曼','卡斯特尔斯','席勒']){
  await page.locator('.extension-nodes').getByRole('button',{name:new RegExp(name)}).click();
  await page.getByRole('button',{name:'用一句话解释'}).click();await page.getByRole('status').waitFor();
  await page.getByRole('button',{name:'给出国际传播例子'}).click();assert.match(await page.getByRole('status').textContent(),/教学例子/);
  await page.getByLabel('拓展关系入口').getByRole('button',{name:new RegExp(name)}).click();
  assert.equal(await page.locator('dialog details.extension-scholar[open]').count(),1);await closeDrawer();
 }
 assert.equal(await page.getByLabel('拓展关系入口').getByRole('button').count(),3);
 await page.screenshot({path:'qa/13-theory-reveal.png',fullPage:true});
 for(const img of await page.locator('img.scholar-photo').all())await img.scrollIntoViewIfNeeded();
 assert.equal(await page.locator('img.scholar-photo').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)),true);
 await page.getByRole('button',{name:'进入单题检验'}).click();
 await page.getByRole('radio',{name:/A\s*技术完全/}).check();await page.getByRole('button',{name:'提交判断'}).click();assert.match(await page.getByRole('status').textContent(),/最合理的判断是 C/);
 await page.getByRole('radio',{name:/C\s*同时分析/}).check();await page.getByRole('button',{name:'提交判断'}).click();assert.match(await page.getByRole('status').textContent(),/判断正确/);
 await page.getByRole('button',{name:'查看学习总结卡'}).click();await page.screenshot({path:'qa/14-summary.png',fullPage:true});
 checks.push('完整十分钟主路线、六学者原有问答、旁听席三卡及逐条讨论、图谱三入口、原研究三卡、错题修改、总结');
 await context.setOffline(true);await nav.getByRole('button',{name:/卷宗二/}).click();await entry.click();await closeDrawer();
 await nav.getByRole('button',{name:/卷宗三/}).click();await page.getByRole('button',{name:/03.*情境/}).click();assert.match(await page.getByRole('status').textContent(),/地区有关联/);
 checks.push('断网后本地预设内容、旁听席与研究卡可操作');await context.setOffline(false);
 for(const width of [375,768,1280]){
  await page.setViewportSize({width,height:900});
  for(const name of ['卷宗一','卷宗二','卷宗三','理论揭晓','检验与结语']){await nav.getByRole('button',{name:new RegExp(name)}).click();await noOverflow(`${width} ${name}`);}
  await nav.getByRole('button',{name:/卷宗二/}).click();await entry.click();await noOverflow(`${width} 抽屉`);
  assert.ok(await drawer.evaluate(el=>el.getBoundingClientRect().width)<=width+1);await closeDrawer();
 }
 checks.push('原生对话框Tab焦点、Escape关闭与返回入口');
 assert.deepEqual(issues,[]);const external=calls.filter(x=>!x.startsWith(url)&&!x.startsWith('data:'));assert.deepEqual(external,[]);
 await writeFile('qa/results.json',JSON.stringify({status:'passed',checks,issues,external,requests:calls.length},null,2));console.log(checks.join('\n'));
}catch(error){await writeFile('qa/results.json',JSON.stringify({status:browser?'failed':'blocked_browser_launch',checks,issues,error:String(error)},null,2));throw error;}
finally{await browser?.close();}
