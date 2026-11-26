const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
$("#nm").innerHTML=P.name.split(" ").map(w=>`<span>${esc(w)}</span>`).join("");
$("#yr").textContent=new Date().getFullYear();$("#ft").textContent=P.name;
$("#bio").textContent=P.bio;
$("#lang").textContent="Languages: "+P.languages.join(" · ");
$("#stats").innerHTML=P.stats.map(s=>`<div><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("");
const ab={LinkedIn:"In",GitHub:"Gh",Email:"Em"};
$("#soc").innerHTML=P.socials.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener" title="${s[0]}">${ab[s[0]]||s[0].slice(0,2)}</a>`).join("");
// skills: radar chart + numbered glowing lines
function radar(){const n=P.skills.length,R=140,pt=(i,r)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[Math.cos(a)*r,Math.sin(a)*r]};
let s='<svg id="radar" viewBox="-250 -185 500 370">';
[.25,.5,.75,1].forEach(k=>s+=`<polygon points="${P.skills.map((_,i)=>pt(i,R*k).join(",")).join(" ")}" fill="none" stroke="rgba(130,140,210,.22)"/>`);
P.skills.forEach((sk,i)=>{const[x,y]=pt(i,R),[lx,ly]=pt(i,R+16);s+=`<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="rgba(130,140,210,.18)"/><text x="${lx}" y="${ly}" fill="#aab0d0" font-size="9" letter-spacing="1.5" text-anchor="${Math.abs(lx)<8?"middle":lx>0?"start":"end"}" dominant-baseline="middle">${esc(sk[0].split(" (")[0].toUpperCase())}</text>`});
s+=`<polygon points="${P.skills.map((sk,i)=>pt(i,R*sk[1]/100).join(",")).join(" ")}" fill="rgba(91,116,255,.22)" stroke="#5b74ff" stroke-width="1.5"/>`;
P.skills.forEach((sk,i)=>{const[x,y]=pt(i,R*sk[1]/100);s+=`<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" stroke="#5b74ff"/>`});
return s+"</svg>"}
$("#sk").innerHTML=`<div>${radar()}</div><div>${P.skills.map((s,i)=>`<div class="srow"><span class="n">${String(i+1).padStart(2,"0")}</span><span class="nm">${esc(s[0])}</span><span class="v">${s[1]}</span><div class="ln"><i style="--w:${s[1]}%"></i></div></div>`).join("")}</div>`;
$("#tools").innerHTML=P.tools.map(t=>`<span>${esc(t)}</span>`).join("");
const tl=a=>a.map(e=>`<div class="item"><small>${esc(e[0])}</small><h4>${esc(e[1])}</h4><b>${esc(e[2])}</b><p>${esc(e[3])}</p></div>`).join("");
$("#ex").innerHTML=tl(P.experience);$("#ed").innerHTML=tl(P.education);
$("#ac").innerHTML=P.achievements.map((a,i)=>`<div class="card${a[3]?" clickable":""}" ${a[3]?`data-i="${i}" role="button" tabindex="0"`:""}><div style="font-size:26px">${a[0]}</div><h3>${esc(a[1])}</h3><p>${esc(a[2])}</p>${a[3]?"<em>View certificate →</em>":""}</div>`).join("");
$("#ci").innerHTML=`<span>📞 ${esc(P.phone)}</span><span>✉️ ${esc(P.email)}</span><span>📍 ${esc(P.location)}</span>`;
// certificate viewer
function openCert(i){const a=P.achievements[i],f=a[3];$("#mt").textContent=a[1];const mb=$("#mb");mb.innerHTML="";
if(/\.pdf$/i.test(f)){const fr=document.createElement("iframe");fr.src=f;mb.appendChild(fr)}
else{const im=document.createElement("img");im.alt=a[1];im.onerror=()=>{mb.innerHTML=`<p style="color:var(--muted)">Certificate file not found. Add your certificate image as <b>${esc(f)}</b> inside the portfolio folder, then refresh.</p>`};im.src=f;mb.appendChild(im)}
$("#modal").classList.add("open")}
const closeM=()=>$("#modal").classList.remove("open");
$("#ac").onclick=e=>{const c=e.target.closest("[data-i]");if(c)openCert(+c.dataset.i)};
$("#ac").onkeydown=e=>{if(e.key=="Enter"){const c=e.target.closest("[data-i]");if(c)openCert(+c.dataset.i)}};
$("#mx").onclick=closeM;$("#modal").onclick=e=>{if(e.target.id=="modal")closeM()};document.addEventListener("keydown",e=>{if(e.key=="Escape")closeM()});
// connect tab: LinkedIn + GitHub cards
const ICO={LinkedIn:'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',GitHub:'<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'};
$("#lk").innerHTML=P.socials.filter(x=>ICO[x[0]]).map(x=>`<a class="card link clickable" href="${x[1]}" target="_blank" rel="noopener">${ICO[x[0]]}<h3>${x[0]}</h3><p>${esc(x[1].replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,""))}</p><em>Open profile →</em></a>`).join("");
// CV download
$("#cv").onclick=()=>{if(P.cvUrl){const a=document.createElement("a");a.href=P.cvUrl;a.download="Khadija_Bibi_CV.pdf";document.body.appendChild(a);a.click();a.remove()}else window.print()};
// contact form (opens the visitor's email app)
$("#cf").onsubmit=e=>{e.preventDefault();location.href=`mailto:${P.email}?subject=${encodeURIComponent("Portfolio message from "+$("#cn").value)}&body=${encodeURIComponent($("#cm").value+"\n\n"+$("#ce").value)}`};
// reveal + side dots + active nav
const secs=["hero","about","skills","experience","achievements","links","contact"];
$("#dots").innerHTML=secs.map(i=>`<a href="#${i}" aria-label="${i}"></a>`).join("");
const revObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revObs.observe(el));
const dotObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=secs.indexOf(e.target.id);document.querySelectorAll("#dots a").forEach((a,k)=>a.classList.toggle("on",k==i));document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+e.target.id))}}),{threshold:.45});
secs.forEach(i=>dotObs.observe($("#"+i)));
// hero: rotating AI network sphere
(function(){const c=$("#bg"),g=c.getContext("2d"),N=150,S=[];let W,H,mx=0,my=0,t=0;
for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*2.399963;S.push([Math.cos(a)*r,y,Math.sin(a)*r])}
const rs=()=>{W=c.width=c.offsetWidth;H=c.height=c.offsetHeight};rs();addEventListener("resize",rs);
addEventListener("mousemove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
(function draw(){t+=.004;g.clearRect(0,0,W,H);const wide=W>820,cx=wide?W*.72:W*.5,cy=wide?H*.5:H*.74,R=Math.min(W,H)*(wide?.34:.26),ay=t+mx*.8,ax=.35+my*.5;
const gr=g.createRadialGradient(cx,cy,0,cx,cy,R*1.4);gr.addColorStop(0,"rgba(29,27,232,.28)");gr.addColorStop(1,"rgba(29,27,232,0)");g.fillStyle=gr;g.fillRect(0,0,W,H);
const pr=S.map(([x,y,z])=>{const X=x*Math.cos(ay)+z*Math.sin(ay);let Z=-x*Math.sin(ay)+z*Math.cos(ay);const Y=y*Math.cos(ax)-Z*Math.sin(ax);Z=y*Math.sin(ax)+Z*Math.cos(ax);return[cx+X*R,cy+Y*R,Z]});
const th=R*.42;g.lineWidth=.8;
for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const a=pr[i],b=pr[j],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d<th){g.strokeStyle=`rgba(91,116,255,${(1-d/th)*.4*(a[2]+b[2]+2)/4+.03})`;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}}
pr.forEach(p=>{g.fillStyle=`rgba(190,205,255,${.25+.6*(p[2]+1)/2})`;g.beginPath();g.arc(p[0],p[1],1+1.4*(p[2]+1)/2,0,6.283);g.fill()});
requestAnimationFrame(draw)})()})();
// assistant (answers from the profile data in data.js)
const links=()=>P.socials.filter(x=>x[0]!="Email").map(x=>x[0]+": "+x[1]).join(" · ");
const KB=[
[/linkedin|github|social|profile|instagram|twitter|facebook|links?\b/,()=>"Find me here – "+links()+" · Email: "+P.email],
[/phone|number|call|whatsapp|mobile/,()=>"You can call or message Khadija on "+P.phone+"."],
[/e-?mail/,()=>"Email: "+P.email],
[/address|location|where|live|city|based|country|bahawalpur|pakistan/,()=>"Khadija is based in "+P.location+"."],
[/language|speak|urdu|english/,()=>"Languages: "+P.languages.join(", ")+"."],
[/certif|blizon|soft ?tech|course|training/,()=>"Certificates: "+P.achievements.filter(a=>a[3]).map(a=>a[1]+" ("+a[2]+")").join(" · ")+". Open the “Achievements & certificates” section and click a certificate to view it."],
[/achiev|award|honou?r/,()=>P.achievements.map(a=>a[1]+" – "+a[2]).join(" · ")],
[/volunteer|vlg|governance|community/,()=>P.experience.map(e=>e[0]+": "+e[1]+" at "+e[2]+" – "+e[3]).join(" · ")],
[/experience|job|intern|work|career/,()=>P.experience.map(e=>e[0]+": "+e[1]+" at "+e[2]).join(" · ")],
[/educat|study|degree|universit|college|school|intermediate|graduat|qualif/,()=>P.education.map(e=>e[0]+": "+e[1]+", "+e[2]).join(" · ")],
[/canva|design|tool|software|office|excel|powerpoint|git|jupyter/,()=>"Tools: "+P.tools.join(", ")+"."],
[/skill|tech|stack|know|python|machine|deep|nlp|vision|data|\bai\b|web|expert|good at|strength/,()=>"Top skills: "+P.skills.map(s=>s[0]).join(", ")+"."],
[/\bcv\b|resume|résumé|download/,()=>"Use the “Download CV” button at the top of the page."],
[/contact|hire|reach|connect|touch|message/,()=>"Email: "+P.email+" · Phone: "+P.phone+" · Location: "+P.location+". You can also use the contact form on this page."],
[/thank|shukri|bye/,()=>"You’re welcome! Feel free to ask anything else about Khadija."],
[/name|who|about|yourself|intro|bio|hello|\bhi\b|hey|salam/,()=>"I’m the assistant for "+P.name+". "+P.bio]];
function say(t,c){const d=document.createElement("div");d.className="m "+c;d.textContent=t;$("#msgs").appendChild(d);$("#msgs").scrollTop=1e9}
function ask(q){say(q,"u");const k=KB.find(k=>k[0].test(q.toLowerCase()));setTimeout(()=>say(k?k[1]():"I can tell you about Khadija’s skills, certificates, education, experience, LinkedIn/GitHub links, phone, email, or location. Try one of those!","b"),400)}
say("Hi! I’m Khadija’s portfolio assistant. Ask me anything about their background.","b");
$("#chips").innerHTML=["Skills","Certificates","LinkedIn","Contact"].map(c=>`<button>${c}</button>`).join("");
$("#chips").onclick=e=>{if(e.target.tagName=="BUTTON")ask(e.target.textContent)};
$("#chf").onsubmit=e=>{e.preventDefault();const v=$("#chi").value.trim();if(v){ask(v);$("#chi").value=""}};
$("#chatBtn").onclick=()=>$("#chat").classList.toggle("open");
