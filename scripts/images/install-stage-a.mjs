import {mkdir, readFile, writeFile, rename, rm, stat} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const packagePath = path.join(projectRoot, 'package.json');
try { await stat(packagePath); } catch {
  console.error('Run this script from the Hurghada Journeys project root.');
  process.exit(1);
}

const outDir = path.join(projectRoot, 'public', 'images', 'trips', 'real');
const tmpDir = path.join(outDir, '.stage-a-tmp');
await mkdir(tmpDir, {recursive:true});

const assets = [
  {
    key:'cairo', file:'cairo.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Giza-pyramids.JPG?width=1600',
    credit:'Giza-pyramids.JPG — Robster1983 — CC0 — Wikimedia Commons'
  },
  {
    key:'luxor', file:'luxor.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Karnak_Hypostyle_Hall_R05.jpg?width=1600',
    credit:'Karnak Hypostyle Hall R05.jpg — Marc Ryckaert — CC BY-SA 4.0 — Wikimedia Commons'
  },
  {
    key:'island', file:'red-sea-beach.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_beach_of_a_touristic_village_-_Hurghada_-_Red_Sea.jpg?width=1600',
    credit:'The beach of a touristic village - Hurghada - Red Sea.jpg — Hipatius — Wikimedia Commons'
  },
  {
    key:'diving', file:'red-sea-diving.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Coralline_algae,_sponge,_and_soft_coral_at_Paradise_Reef,_Red_Sea,_Egypt_-SCUBA_(6377736777).jpg?width=1600',
    credit:'Paradise Reef, Red Sea underwater photograph — Wikimedia Commons'
  },
  {
    key:'dolphin', file:'red-sea-dolphins.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Red_Sea_Dolphins.JPG?width=1600',
    credit:'Red Sea Dolphins.JPG — Ad Meskens — CC BY-SA 3.0 — Wikimedia Commons'
  },
  {
    key:'safari', file:'desert-safari.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dessert_Safari.jpg?width=1600',
    credit:'Dessert Safari.jpg — Norhan Elmaghrabi — Wikimedia Commons'
  },
  {
    key:'hurghada', file:'hurghada.jpg',
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hurghada_Hotels_R03.jpg?width=1600',
    credit:'Hurghada Hotels R03.jpg — Marc Ryckaert — CC BY 3.0 — Wikimedia Commons'
  }
];

async function download(asset) {
  const target = path.join(tmpDir, asset.file);
  console.log(`Downloading ${asset.file}...`);
  const res = await fetch(asset.url, {redirect:'follow', headers:{'User-Agent':'HurghadaJourneys/1.0'}});
  if (!res.ok) throw new Error(`${asset.file}: HTTP ${res.status}`);
  const type = res.headers.get('content-type') || '';
  if (!type.includes('image/')) throw new Error(`${asset.file}: unexpected content type ${type}`);
  const data = Buffer.from(await res.arrayBuffer());
  if (data.length < 20_000) throw new Error(`${asset.file}: downloaded file is unexpectedly small`);
  await writeFile(target, data);
  return target;
}

try {
  const downloaded = [];
  for (const asset of assets) downloaded.push([asset, await download(asset)]);
  await mkdir(outDir, {recursive:true});
  for (const [asset,tmp] of downloaded) await rename(tmp, path.join(outDir, asset.file));

  const tripsPath = path.join(projectRoot, 'src', 'data', 'trips.ts');
  let text = await readFile(tripsPath, 'utf8');

  const map = new Map([
    ['cairo','cairo.jpg'], ['private-cairo','cairo.jpg'],
    ['luxor','luxor.jpg'], ['private-luxor','luxor.jpg'],
    ['orange-bay','red-sea-beach.jpg'], ['hula-hula','red-sea-beach.jpg'], ['paradise-island','red-sea-beach.jpg'], ['mahmya','red-sea-beach.jpg'], ['magawish-three-islands','red-sea-beach.jpg'], ['utopia-island','red-sea-beach.jpg'], ['private-boat','red-sea-beach.jpg'], ['snorkeling-boat','red-sea-beach.jpg'],
    ['intro-diving','red-sea-diving.jpg'], ['certified-diving','red-sea-diving.jpg'], ['semi-submarine','red-sea-diving.jpg'], ['grand-aquarium','red-sea-diving.jpg'],
    ['dolphin-house','red-sea-dolphins.jpg'],
    ['quad-safari','desert-safari.jpg'], ['super-safari','desert-safari.jpg'], ['stargazing','desert-safari.jpg'],
    ['hurghada-city-tour','hurghada.jpg'], ['el-gouna-tour','hurghada.jpg']
  ]);

  for (const [slug,file] of map) {
    const blockRe = new RegExp(`(slug: '${slug}',[\\s\\S]*?)(?=\\n  \\{|\\n\\];)`, 'm');
    const m = text.match(blockRe);
    if (!m) { console.warn(`Trip block not found: ${slug}`); continue; }
    const src = `/images/trips/real/${file}`;
    let block = m[1];
    block = block.replace(/image: '[^']+',/, `image: '${src}',`);
    block = block.replace(/heroImage: \{src: '[^']+', alt: '([^']*)'\},/, `heroImage: {src: '${src}', alt: '$1'},`);
    block = block.replace(/gallery: \[[^\n]*\],/, `gallery: [{src: '${src}', alt: '${slug.replaceAll('-', ' ')} travel photo'}],`);
    text = text.replace(m[1], block);
  }
  await writeFile(tripsPath, text, 'utf8');

  const credits = ['# Image Credits — Stage A','',...assets.map(a=>`- ${a.credit}`),'','Images are stored locally in `public/images/trips/real/`. Keep this file with the project when deploying.',''];
  await writeFile(path.join(projectRoot,'docs','IMAGE_CREDITS_STAGE_A.md'), credits.join('\n'), 'utf8');
  console.log('Updated trip hero images and galleries for Stage A.');
  console.log('Run: npm run build');
} catch (err) {
  console.error(err?.stack || err);
  process.exitCode = 1;
} finally {
  await rm(tmpDir,{recursive:true,force:true});
}
