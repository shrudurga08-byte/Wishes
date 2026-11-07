const cardsData=[
{icon:'🪔',title:'Light',
 en:'May the glow of every diya chase away the dark corners of your life and fill your home with warmth.',
 ta:'ஒவ்வொரு தீபமும் உங்கள் வாழ்வின் இருளை விரட்டி, வீடு முழுவதும் ஒளி நிரப்பட்டும்.'},
{icon:'🍬',title:'Sweetness',
 en:'May your days taste as sweet as fresh mithai, and may every moment bring a smile.',
 ta:'இனிப்பு போல உங்கள் ஒவ்வொரு நாளும் இனிமையாக அமையட்டும்.'},
{icon:'👨‍👩‍👧‍👦',title:'Family',
 en:'May you be surrounded by the people you love, laughing together and making memories.',
 ta:'அன்பானவர்களுடன் சிரித்து மகிழ்ந்து, அழகான நினைவுகளை உருவாக்குங்கள்.'},
{icon:'🌟',title:'Success',
 en:'May your dreams shine as bright as stars and every goal you chase come true.',
 ta:'உங்கள் கனவுகள் நட்சத்திரம் போல ஒளிர்ந்து, இலக்குகள் அனைத்தும் நிறைவேறட்டும்.'},
{icon:'🙏',title:'Peace & Health',
 en:'May you be blessed with good health, a peaceful mind and a heart full of gratitude.',
 ta:'நல்ல ஆரோக்கியம், மன அமைதி, நன்றியுள்ள இதயம் உங்களுக்கு கிடைக்கட்டும்.'}
];
const finalText={
en:'Happy Diwali! 🪔 This festival of lights, may all your worries burn away like old shadows and a new light fill your life. May you be blessed with love, laughter, sweet moments, good health and success in everything you do. Keep smiling, keep shining, and spread this light to everyone around you. Wishing you and your family a bright and beautiful Diwali! ✨💛',
ta:'இனிய தீபாவளி நல்வாழ்த்துகள்! 🪔 இந்த ஒளித் திருநாளில் உங்கள் கவலைகள் அனைத்தும் இருள் போல மறைந்து, புதிய ஒளி உங்கள் வாழ்வில் நிறையட்டும். அன்பு, சிரிப்பு, இனிமை, ஆரோக்கியம், வெற்றி அனைத்தும் உங்களுக்கு கிடைக்கட்டும். எப்போதும் புன்னகையுடன் ஒளிருங்கள், அந்த ஒளியை எல்லோருக்கும் பகிருங்கள். உங்களுக்கும் உங்கள் குடும்பத்தினருக்கும் இனிய தீபாவளி வாழ்த்துகள்! ✨💛'};

const $=id=>document.getElementById(id);
let i=0;

// background stars
for(let k=0;k<70;k++){const s=document.createElement('i');
 s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';
 s.style.animationDelay=Math.random()*2.5+'s';$('stars').appendChild(s)}

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active')}

// ---- Sky shot fireworks ----
const cv=$('sky'),ctx=cv.getContext('2d');let rockets=[],parts=[];
function resize(){cv.width=innerWidth;cv.height=innerHeight}resize();addEventListener('resize',resize);
function skyShot(x,targetY,hue){
 rockets.push({x:x||Math.random()*cv.width,y:cv.height,ty:targetY??cv.height*(.15+Math.random()*.25),vy:-9-Math.random()*3,hue:hue??Math.random()*360});
}
function burst(x,y,hue){
 const n=90;
 for(let k=0;k<n;k++){const a=Math.PI*2*k/n,sp=2+Math.random()*4;
  parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,hue:hue+Math.random()*40})}
}
function loop(){
 ctx.globalCompositeOperation='destination-out';ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(0,0,cv.width,cv.height);
 ctx.globalCompositeOperation='lighter';
 rockets=rockets.filter(r=>{r.y+=r.vy;r.vy*=.985;
  ctx.fillStyle=`hsl(${r.hue},100%,70%)`;ctx.beginPath();ctx.arc(r.x,r.y,2.5,0,7);ctx.fill();
  if(r.y<=r.ty||r.vy>-2){burst(r.x,r.y,r.hue);return false}return true});
 parts=parts.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.vx*=.98;p.life-=.012;
  ctx.fillStyle=`hsla(${p.hue},100%,60%,${p.life})`;ctx.beginPath();ctx.arc(p.x,p.y,2,0,7);ctx.fill();return p.life>0});
 requestAnimationFrame(loop)}
loop();
function salvo(n){for(let k=0;k<n;k++)setTimeout(()=>skyShot(),k*350)}

// ---- Cards ----
function renderCard(){
 const d=cardsData[i];
 $('card').classList.remove('flip');
 $('icon').textContent=d.icon;$('title').textContent=d.title;
 $('wish').innerHTML=d.en+'<br><br><small style="opacity:.9">'+d.ta+'</small>';
 $('dots').innerHTML=cardsData.map((_,k)=>`<b class="${k==i?'on':''}"></b>`).join('');
 $('next').textContent=i==cardsData.length-1?'Last Wish 💛':'Next ▶';
 const c=$('card');c.style.animation='none';c.offsetHeight;c.style.animation='';
 skyShot(cv.width/2,cv.height*.18);   // sky shot for every card
 setTimeout(()=>skyShot(cv.width*.25,cv.height*.3),250);
 setTimeout(()=>skyShot(cv.width*.75,cv.height*.3),450);
}
$('start').onclick=()=>{show('cards');i=0;renderCard();salvo(3)};
$('card').onclick=()=>$('card').classList.toggle('flip');
$('next').onclick=()=>{if(i<cardsData.length-1){i++;renderCard()}else{show('finale');$('ask').classList.remove('hidden');$('final').classList.add('hidden');salvo(4)}};
$('prev').onclick=()=>{if(i>0){i--;renderCard()}};
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{
 $('para').textContent=finalText[b.dataset.lang];
 $('ask').classList.add('hidden');$('final').classList.remove('hidden');salvo(8)});
$('again').onclick=()=>{show('welcome')};