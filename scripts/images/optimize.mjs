import {mkdir,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const root=process.cwd();
const inputArg=process.argv[2];
const outputArg=process.argv[3];
if(!inputArg){console.error('Usage: npm run images:optimize -- <input-folder> [output-folder]');process.exit(1);}
const input=path.resolve(root,inputArg);
const output=path.resolve(root,outputArg||'public/images/optimized');
if(input===output||output.startsWith(input+path.sep)){console.error('Output folder must not be the input folder or inside it.');process.exit(1);}
const supported=new Set(['.jpg','.jpeg','.png','.webp','.avif']);
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else if(supported.has(path.extname(e.name).toLowerCase()))out.push(f);}return out;}
const files=await walk(input);
if(!files.length){console.log('No supported images found.');process.exit(0);}
let ok=0,failed=0,before=0,after=0;
for(const source of files){
 const rel=path.relative(input,source),p=path.parse(rel),target=path.join(output,p.dir,p.name+'.webp');
 try{
  await mkdir(path.dirname(target),{recursive:true});
  const meta=await sharp(source).metadata();
  const pipeline=sharp(source,{failOn:'warning'}).rotate();
  if(meta.width&&meta.width>1920)pipeline.resize({width:1920,withoutEnlargement:true});
  const info=await pipeline.webp({quality:82,effort:5,smartSubsample:true}).toFile(target);
  before+=(await stat(source)).size;after+=info.size;ok++;
  console.log(`OK ${rel} -> ${path.relative(root,target)}`);
 }catch(e){failed++;console.error(`FAILED ${rel}: ${e?.message||e}`);}
}
const saved=before?Math.round((1-after/before)*100):0;
console.log(`Done: ${ok} optimized, ${failed} failed, approx. ${saved}% smaller.`);
if(failed)process.exitCode=1;
