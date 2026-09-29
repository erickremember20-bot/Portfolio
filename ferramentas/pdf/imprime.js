/* Gera o PDF do portfólio a partir do site construído.
   Os links internos viram absolutos com UTM, para o que chegar pelo PDF
   aparecer no GA como origem própria. */
const { chromium } = require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','..','docs');
const SAIDA=path.join(__dirname,'paginas');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2','.png':'image/png','.svg':'image/svg+xml'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p); if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});

const SITE='https://erickteixeira.art/';
const UTM='utm_source=pdf&utm_medium=portfolio&utm_campaign=erick_teixeira';
const PAGS=[
  ['index.html','01-home'],
  ['nega-nago.html','02-nega-nago'],
  ['thumbdrop.html','03-thumbdrop'],
  ['ct-em-campo.html','04-ct-em-campo'],
  ['canaltech-hub.html','05-canaltech-hub'],
];
(async()=>{
 fs.mkdirSync(SAIDA,{recursive:true});
 await new Promise(r=>srv.listen(8191,r));
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const c=await b.newContext({viewport:{width:1400,height:1000}});
 await c.route('**googletagmanager.com**',r=>r.abort());
 const p=await c.newPage();
 await p.addInitScript(()=>{try{localStorage.setItem('erick.idioma','pt');localStorage.setItem('et_consentimento','recusado')}catch(e){}});
 for(const [arq,nome] of PAGS){
  await p.goto('http://localhost:8191/'+arq,{waitUntil:'networkidle'});
  /* tudo carregado antes de imprimir: lazy fora, rolagem completa */
  await p.evaluate(()=>{document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager')});
  for(let i=0;i<=20;i++){ await p.evaluate(k=>window.scrollTo(0,document.body.scrollHeight*k/20),i); await p.waitForTimeout(150); }
  await p.evaluate(()=>window.scrollTo(0,0));
  await p.waitForTimeout(2500);
  await p.evaluate(({SITE,UTM})=>{
    document.querySelectorAll('a[href]').forEach(a=>{
      const h=a.getAttribute('href');
      if(!h||/^(mailto:|tel:|#)/.test(h)) return;
      if(/^https?:/.test(h)) return;                    // Figma, Drive, LinkedIn ficam
      const [arq,frag]=h.split('#');
      a.setAttribute('href', SITE + arq + '?' + UTM + (frag?'#'+frag:''));
    });
    /* o botão de copiar e-mail não faz nada no papel: vira link mailto */
    document.querySelectorAll('button[data-email]').forEach(btn=>{
      const a=document.createElement('a');
      a.href='mailto:'+btn.getAttribute('data-email');
      a.className=btn.className; a.innerHTML=btn.innerHTML;
      btn.parentNode.replaceChild(a,btn);
    });
  },{SITE,UTM});
  /* A4 paisagem impressa a 0.8 dá ~1403×992 px de caixa de página. Uma imagem
     mais alta que isso não cabe, o break-inside:avoid a empurra inteira e
     sobra uma página em branco atrás. Aqui ela é limitada e passa a caber. */
  const encolhidas = await p.evaluate(()=>{
    const LIM = 880;          // deixa respiro para legenda e margem óptica
    let n = 0;
    document.querySelectorAll('.shot,.fig,figure,.capturas,.boards,.mockups').forEach(el=>{
      const h = el.getBoundingClientRect().height;
      if (h <= LIM) return;
      el.style.aspectRatio = 'auto';
      el.style.height = LIM + 'px';
      el.style.maxHeight = LIM + 'px';
      el.querySelectorAll('img,video').forEach(i=>{ i.style.objectFit = 'contain'; });
      n++;
    });
    return n;
  });
  await p.emulateMedia({media:'print'});
  await p.pdf({ path: SAIDA+'/'+nome+'.pdf', format:'A4', landscape:true,
                printBackground:true, scale:0.8,
                margin:{top:'0',right:'0',bottom:'0',left:'0'} });
  const kb=Math.round(fs.statSync(SAIDA+'/'+nome+'.pdf').size/1024);
  console.log(nome.padEnd(18)+String(kb).padStart(6)+' KB   '+encolhidas+' figuras limitadas');
  await p.emulateMedia({media:'screen'});
 }
 await b.close(); srv.close();
})();
