let fav = JSON.parse(localStorage.getItem("fav")) || [];

/* ================= NAV SMART HOME ================= */
function goHome(){
  if(location.pathname.endsWith("index.html") || location.pathname==="/"){
    location.reload(); // refresh آمن
  } else {
    location.href="index.html";
  }
}

/* ================= NAME GENERATOR ================= */
/*
❌ بدون أرقام نهائيًا
✔ Prefix + Core + Suffix فقط
*/

const prefix=["Shadow","Dark","Ghost","Night","Fire","Storm","Cyber","Neo","Alpha"];
const core=["Hunter","King","Blade","Wolf","Viper","Knight","Dragon","Rider","Slayer"];
const suffix=["","X","Pro","YT","OP","Zone","HQ"];

function generateNames(){
  let set=new Set();

  while(set.size<80){
    let name =
      prefix[Math.floor(Math.random()*prefix.length)] +
      core[Math.floor(Math.random()*core.length)] +
      suffix[Math.floor(Math.random()*suffix.length)];

    set.add(name);
  }

  document.getElementById("names").innerHTML =
  [...set].map(n=>`
    <div class="card">
      <span onclick="copyText('${n}')">${n}</span>
      <button onclick="copyText('${n}')">📋 نسخ</button>
      <button onclick="addFav('${n}')">❤️</button>
      <button onclick="sendToDecor('${n}')">زخرفة</button>
    </div>
  `).join("");
}

/* ================= COPY ================= */
function copyText(t){
  navigator.clipboard.writeText(t);
}

/* ================= 20+ DECOR STYLES ================= */
function decorate(name){
  const styles=[
    `★ ${name} ★`,
    `『 ${name} 』`,
    `꧁ ${name} ꧂`,
    `♛ ${name} ♛`,
    `⚡ ${name} ⚡`,
    `☠ ${name} ☠`,
    `彡 ${name} 彡`,
    `✧ ${name} ✧`,
    `⫷ ${name} ⫸`,
    `☬ ${name} ☬`,
    `✿ ${name} ✿`,
    `❖ ${name} ❖`,
    `【 ${name} 】`,
    `◥ ${name} ◤`,
    `۝ ${name} ۝`,
    `⋆ ${name} ⋆`,
    `✦ ${name} ✦`,
    `⚔ ${name} ⚔`,
    `⛧ ${name} ⛧`,
    `⟬ ${name} ⟭`,
    `༒ ${name} ༒`
  ];

  return styles.map(s=>`
    <div class="card">
      <span>${s}</span>
      <button onclick="copyText('${s}')">📋 نسخ</button>
    </div>
  `).join("");
}

/* ================= DECOR FROM INPUT ================= */
function manualDecor(){
  let val=document.getElementById("inputName").value;
  document.getElementById("decorResult").innerHTML = decorate(val);
}

function sendToDecor(name){
  document.getElementById("decorResult").innerHTML = decorate(name);
}

/* ================= FAVORITES ================= */
function addFav(name){
  if(!fav.includes(name)){
    fav.push(name);
    localStorage.setItem("fav",JSON.stringify(fav));
  }
}

function showFav(){
  document.getElementById("names").innerHTML =
  fav.map(n=>`
    <div class="card">
      ${n}
      <button onclick="removeFav('${n}')">🗑 حذف</button>
    </div>
  `).join("");
}

function removeFav(n){
  fav=fav.filter(x=>x!==n);
  localStorage.setItem("fav",JSON.stringify(fav));
  showFav();
}

/* ================= THEME ================= */
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light")?"light":"dark"
  );
}

window.onload=()=>{
  if(localStorage.getItem("theme")==="light"){
    document.body.classList.add("light");
  }
};