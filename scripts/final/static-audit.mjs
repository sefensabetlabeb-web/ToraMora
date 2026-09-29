import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fail = [];
const pass = [];
const ok = (name, condition, detail='') => (condition ? pass : fail).push({name, detail});

function walk(dir, exts) {
  const out=[];
  if(!fs.existsSync(dir)) return out;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory()) out.push(...walk(p,exts));
    else if(exts.some(ext=>entry.name.endsWith(ext))) out.push(p);
  }
  return out;
}

// 1) Translation parity.
const messageDir=path.join(root,'messages');
const messageFiles=fs.readdirSync(messageDir).filter(x=>x.endsWith('.json')).sort();
const flatten=(obj,prefix='',out={})=>{for(const [k,v] of Object.entries(obj)){const key=prefix?`${prefix}.${k}`:k;if(v&&typeof v==='object'&&!Array.isArray(v))flatten(v,key,out);else out[key]=v;}return out;};
const en=flatten(JSON.parse(fs.readFileSync(path.join(messageDir,'en.json'),'utf8')));
const enKeys=Object.keys(en).sort();
let translationParity=true;
for(const file of messageFiles){
  const data=flatten(JSON.parse(fs.readFileSync(path.join(messageDir,file),'utf8')));
  const keys=Object.keys(data).sort();
  if(keys.length!==enKeys.length || enKeys.some((k,i)=>k!==keys[i])) translationParity=false;
}
ok('39 locale message files', messageFiles.length===39, `found ${messageFiles.length}`);
ok('Translation key parity', translationParity, `${enKeys.length} English keys`);

// 2) Local import resolution.
const sourceFiles=[...walk(path.join(root,'src'),['.ts','.tsx']),...walk(path.join(root,'tests'),['.ts','.tsx'])];
const missingImports=[];
for(const file of sourceFiles){
  const text=fs.readFileSync(file,'utf8');
  const re=/from\s+['"](@\/[^'"]+|\.\.?\/[^'"]+)['"]/g;
  for(const m of text.matchAll(re)){
    const spec=m[1];
    let base=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):path.resolve(path.dirname(file),spec);
    const choices=[base,`${base}.ts`,`${base}.tsx`,`${base}.js`,`${base}.jsx`,path.join(base,'index.ts'),path.join(base,'index.tsx')];
    if(!choices.some(fs.existsSync) && !base.includes(`${path.sep}generated${path.sep}prisma`)) missingImports.push(`${path.relative(root,file)} -> ${spec}`);
  }
}
ok('Local imports resolve', missingImports.length===0, missingImports.slice(0,8).join('; '));

// 3) Prisma migration model coverage.
const schema=fs.readFileSync(path.join(root,'prisma','schema.prisma'),'utf8');
const models=[...schema.matchAll(/^model\s+(\w+)\s*\{/gm)].map(m=>m[1]);
const migrationFiles=walk(path.join(root,'prisma','migrations'),['.sql']);
const migrationText=migrationFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
const missingTables=models.filter(model=>!migrationText.includes(`CREATE TABLE "${model}"`));
ok('Prisma models have migration tables', missingTables.length===0, missingTables.join(', '));

// 4) Critical public assets.
const criticalAssets=['/brand/logo-mark.svg'];
const missingAssets=criticalAssets.filter(ref=>!fs.existsSync(path.join(root,'public',ref.slice(1))));
ok('Critical brand assets exist', missingAssets.length===0, missingAssets.join(', '));
const allSourceText=sourceFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
ok('No stale /brand/logo.svg references', !allSourceText.includes('/brand/logo.svg'));

// 5) Known final-audit regressions.
const localeLayout=fs.readFileSync(path.join(root,'src','app','[locale]','layout.tsx'),'utf8');
ok('Locale layout has no nested outer main', !localeLayout.includes('<main>{children}</main>'));
const teaser=fs.readFileSync(path.join(root,'src','components','contact','ContactTeaser.tsx'),'utf8');
ok('Contact teaser WhatsApp CTA is actionable', teaser.includes('<WhatsAppLink'));
const contactRoute=fs.readFileSync(path.join(root,'src','app','api','contact','route.ts'),'utf8');
ok('Contact trip slug is validated', contactRoute.includes("status: 'published'"));
const packageJson=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
ok('Production build includes Prisma generate', String(packageJson.scripts?.build||'').includes('prisma generate'));
ok('Security audit script exists', fs.existsSync(path.join(root,'scripts','security-audit.mjs')));

for(const item of pass) console.log(`PASS  ${item.name}${item.detail?` — ${item.detail}`:''}`);
for(const item of fail) console.error(`FAIL  ${item.name}${item.detail?` — ${item.detail}`:''}`);
console.log(`\nStatic final audit: ${pass.length}/${pass.length+fail.length} passed.`);
if(fail.length) process.exit(1);
