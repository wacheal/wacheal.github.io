/* ===== EDIT ME ===== */
const NAME = "Wachael";
const PHOTO_COUNT = 16;                        // photos in /images named photo-01.jpg ...
const UNLOCK_AT = new Date("2026-11-07T00:00:00"); // midnight (viewer's local time). Add ?open to the URL to preview.
/* ==================== */
const PHOTOS = Array.from({length:PHOTO_COUNT},(_,i)=>`images/photo-${String(i+1).padStart(2,"0")}.jpg`);
const $=(s)=>document.querySelector(s), $$=(s)=>[...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
$("#heroImg").src=PHOTOS[1];

/* ---- confetti / fireworks ---- */
const cv=$("#fx"),cx=cv.getContext("2d");let P=[],run=false;
const COL=["#c8a15a","#e9b8a6","#f7f0e4","#14503c","#ff9aa8","#ffd36b"];
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener("resize",fit);
function burst(x,y,n=60,o={}){for(let i=0;i<n;i++){const a=Math.random()*6.283,s=(o.s||9)*Math.random()+2;
 P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(o.up||0),g:o.g??.18,l:o.l||90,m:o.l||90,c:COL[Math.random()*COL.length|0],z:o.z||(4+Math.random()*5),r:o.r??1})}
 if(!run){run=true;requestAnimationFrame(tick)}}
function tick(){cx.clearRect(0,0,cv.width,cv.height);
 P=P.filter(p=>p.l>0);for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.985;p.l--;cx.globalAlpha=Math.min(1,p.l/(p.m*.5));cx.fillStyle=p.c;
 p.r?cx.fillRect(p.x,p.y,p.z,p.z*.55):(cx.beginPath(),cx.arc(p.x,p.y,p.z/2.6,0,6.283),cx.fill())}
 P.length?requestAnimationFrame(tick):(run=false,cx.clearRect(0,0,cv.width,cv.height))}
const confetti=()=>{burst(innerWidth*.2,innerHeight*.6,70,{up:9});burst(innerWidth*.8,innerHeight*.6,70,{up:9})};
function fireworks(n=8){for(let k=0;k<n;k++)setTimeout(()=>burst(innerWidth*(.15+Math.random()*.7),innerHeight*(.15+Math.random()*.4),70,{s:7,g:.06,l:80,r:0,z:7}),k*350)}
if(!reduce){setTimeout(confetti,900);
 if(matchMedia("(pointer:fine)").matches){let t=0;addEventListener("pointermove",e=>{if(Date.now()-t>60){t=Date.now();burst(e.clientX,e.clientY,1,{s:1.5,g:.03,l:30,r:0,z:7})}})}}
addEventListener("click",e=>{if(!reduce&&!e.target.closest("button"))burst(e.clientX,e.clientY,18,{s:5})});

/* ---- scroll reveal ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.3});
$$(".rv").forEach((el,i)=>{el.style.setProperty("--d",(i*.12)+"s");io.observe(el)});

/* ---- lightbox ---- */
let li=0;const lb=$("#lb");
function show(i){li=(i+PHOTO_COUNT)%PHOTO_COUNT;$("#lbImg").src=PHOTOS[li];$("#lbImg").alt=`${NAME}, photo ${li+1}`}
function openLb(i){show(i);lb.hidden=false;$("#lx").focus()}
const closeLb=()=>lb.hidden=true;
$("#lx").onclick=closeLb;$("#lp").onclick=()=>show(li-1);$("#ln").onclick=()=>show(li+1);
lb.onclick=e=>{if(e.target===lb)closeLb()};
addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")closeLb();if(e.key==="ArrowLeft")show(li-1);if(e.key==="ArrowRight")show(li+1)});
let lx0;lb.addEventListener("pointerdown",e=>lx0=e.clientX);lb.addEventListener("pointerup",e=>{const d=e.clientX-lx0;if(Math.abs(d)>50)show(li+(d<0?1:-1))});

/* ---- gallery ---- */
$("#grid").innerHTML=PHOTOS.map((p,i)=>`<button class="pol" style="--t:${((i*37)%9-4)}deg" aria-label="Open photo ${i+1}"><img src="${p}" alt="${NAME}, photo ${i+1}" loading="lazy" width="1067" height="1600"></button>`).join("");
$$(".pol").forEach((b,i)=>b.onclick=()=>openLb(i));

/* ---- reasons (only words from the letter) ---- */
$("#reasons").innerHTML=[["Kind",7],["Smart",5],["Beautiful",8],["Considerate",12],["Wonderful Soul",14]].map(([w,i])=>`<li class="rv"><img src="${PHOTOS[i]}" alt="" loading="lazy">${w}</li>`).join("");
$$("#reasons .rv").forEach(el=>io.observe(el));

/* ---- 3D carousel ---- */
const stage=$("#stage");let order=shuffle([...PHOTOS.keys()]),cur=0,timer,hold=false;
function build(){stage.innerHTML=order.map((p,i)=>`<figure class="slide"><img src="${PHOTOS[p]}" alt="${NAME}, photo ${p+1}" draggable="false" ${i>2?'loading="lazy"':""}></figure>`).join("");
 $$(".slide").forEach((s,i)=>s.onclick=()=>cur===i?openLb(order[i]):go(i));place()}
function place(){const n=order.length;$$(".slide").forEach((s,i)=>{let d=i-cur;if(d>n/2)d-=n;if(d<-n/2)d+=n;const a=Math.abs(d);
 s.style.transform=`translateX(${d*58}%) translateZ(${-a*180}px) rotateY(${-d*38}deg) scale(${a?1-a*.05:1.08})`;
 s.style.opacity=a>2?0:1;s.style.zIndex=10-a;s.style.pointerEvents=a>2?"none":"auto";s.style.filter=a?`brightness(${1-a*.22})`:"none";s.classList.toggle("c",!a)});
 $("#count").textContent=`${cur+1} / ${n}`;$("#bar").style.width=((cur+1)/n*100)+"%";$("#carBg").src=PHOTOS[order[cur]]}
const go=i=>{cur=(i+order.length)%order.length;place()};
$("#next").onclick=()=>go(cur+1);$("#prev").onclick=()=>go(cur-1);
$("#shuf").onclick=()=>{order=shuffle(order);cur=0;build();if(!reduce)burst(innerWidth/2,innerHeight/2,40,{s:6})};
stage.addEventListener("keydown",e=>{if(e.key==="ArrowRight")go(cur+1);if(e.key==="ArrowLeft")go(cur-1)});
let x0=null;stage.addEventListener("pointerdown",e=>{x0=e.clientX;hold=true});
addEventListener("pointerup",e=>{if(x0!==null){const d=e.clientX-x0;if(Math.abs(d)>40)go(cur+(d<0?1:-1));x0=null}setTimeout(()=>hold=false,3500)});
stage.addEventListener("pointerenter",()=>hold=true);stage.addEventListener("pointerleave",()=>hold=false);
if(!reduce)timer=setInterval(()=>{if(!hold&&!document.hidden)go(cur+1)},3200);
build();

/* ---- midnight surprise ---- */
const unlocked=()=>{$("#lock").hidden=true;$("#open").hidden=false};
function tickCd(){const ms=UNLOCK_AT-Date.now();if(ms<=0||location.search.includes("open")){clearInterval(cdT);unlocked();if(ms<=0&&!reduce)fireworks(5);return}
 const s=ms/1e3|0,f=(v,l)=>`<span>${String(v).padStart(2,"0")}<small>${l}</small></span>`;
 $("#cd").innerHTML=f(s/86400|0,"days")+f(s%86400/3600|0,"hrs")+f(s%3600/60|0,"min")+f(s%60,"sec")}
const cdT=setInterval(tickCd,1000);tickCd();
$("#wish").onclick=()=>{$("#cake").classList.add("out");$("#wishMsg").hidden=false;fireworks(10);confetti()};

/* ---- birthday book ---- */
$$(".ln").forEach((p,i)=>p.style.setProperty("--d",(i*.55)+"s"));
$("#cover").onclick=()=>{$("#book").classList.add("open");$("#cover").setAttribute("aria-expanded","true");$("#cover").tabIndex=-1;if(!reduce)setTimeout(confetti,900)};
