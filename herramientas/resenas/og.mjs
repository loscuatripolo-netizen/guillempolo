// Uso: NODE_PATH=/opt/node-tools/node_modules node og.mjs salida/slug.html
import { chromium } from 'playwright';
import fs from 'fs'; import path from 'path';
const f = path.resolve(process.argv[2]);
const AXE = fs.readFileSync('/opt/node-tools/node_modules/axe-core/axe.min.js','utf8');
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage({viewport:{width:1200,height:630}});
await p.goto('file://'+f); await p.addStyleTag({content:'.aviso{display:none}.hero{padding-top:0}'}); await p.waitForTimeout(5500);
await p.screenshot({path:f.replace(/\.html$/,'-og.png')});
const m = await b.newPage({viewport:{width:390,height:844},isMobile:true});
await m.goto('file://'+f); await m.waitForTimeout(800);
const w = await m.evaluate(()=>[document.documentElement.scrollWidth, innerWidth, document.querySelectorAll('.resena').length]);
await m.addScriptTag({content:AXE});
const ax = await m.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa']}});return r.violations.map(v=>v.id+'×'+v.nodes.length)});
console.log('movil scrollW/innerW/resenas:', w, 'axe:', ax);
await b.close();
