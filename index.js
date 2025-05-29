// import "./autoSize";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createSector(fromangle, angle) {
  const rad = (angle * Math.PI) / 180;
  const fromrad = (fromangle * Math.PI) / 180;
  const x = WheelCentreX + WheelCentreX * Math.sin(rad);
  const y = WheelCentreY - WheelCentreY * Math.cos(rad);
  const fx = WheelCentreX + WheelCentreX * Math.sin(fromrad);
  const fy = WheelCentreY - WheelCentreY * Math.cos(fromrad);
  return `M${WheelCentreX},${WheelCentreY} L${fx},${fy} A${WheelCentreX},${WheelCentreY} 0 ${angle - fromangle > 180 ? 1 : 0
    },1 ${x},${y} Z`;
}
Rarcs = [5, 11, 17, 25, 5, 8, 3, 4, 5, 3, 7, 3, 4]
Rtexts = [
  "1.5元",
  "1元",
  "0.5元",
  "谢谢惠顾",
  "再来一次",
  "鲁班锁试三次",
  "五个自选mc方块",
  "五个随机mc方块",
  "九折消费卡",
  "自选mc挂件",
  "七折消费卡",
  "终极大奖",
  "抽星星6次"
];
Rcolours = new Array(3).fill([
  "rgba(226, 42, 0, 0.7)",
  "rgba(215, 195, 16, 0.7)",
  "rgba(22, 95, 168, 0.7)",
  "rgba(64, 11, 125, 0.7)",
  "rgba(238, 158, 11, 0.7)",
  "rgba(54, 168, 22, 0.7)",
  "rgba(90, 70, 140, 0.7)",
  "rgba(38, 139, 24, 0.51)",
  "rgba(6, 139, 106, 0.7)"
]).flat();

// console.log(Rarcs)
let w_ = [], w=[];
for (let i = 0; i < Rtexts.length; i++) {
  if (Rarcs[i] > 10) {
    let ww = Math.random() * 0.5 + 1.75;
    w_.push([Rarcs[i] / ww, Rtexts[i], Rcolours[i]]);
    w_.push([Rarcs[i] - Rarcs[i] / ww, Rtexts[i], Rcolours[i]]);
  } else {
    w_.push([Rarcs[i], Rtexts[i], Rcolours[i]]);
  }
}
// w = w_;
for (let i = 0; i < w_.length; i++) {
  if (w_[i][0] > 10) {
    let ww = Math.random() * 0.5 + 1.75;
    w.push([w_[i][0] / ww, w_[i][1], w_[i][2]]);
    w.push([w_[i][0] - w_[i][0] / ww, w_[i][1], w_[i][2]]);
    // w.splice(i);
  } else {
    w.push([w_[i][0], w_[i][1], w_[i][2]]);
  }
}

function safeShuffle(arr) {
  shuffled = [...arr]
  // 修复相邻重复
  for (let i = 0; i < shuffled.length; i++) {
    if (shuffled[i][2] === shuffled[(i === 0) ? shuffled.length - 1 : i - 1][2]) {
      // 向后查找可交换元素
      let swapIndex = i + 1;
      while (swapIndex < shuffled.length && shuffled[swapIndex][2] === shuffled[i][2]) {
        swapIndex++;
      }
      
      if (swapIndex < shuffled.length) {
        [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
      } else {
        // 若后面无合适元素,则向前查找
        swapIndex = (i === 0) ? shuffled.length - 2 : i - 2;
        while (swapIndex >= 0 && 
              (shuffled[swapIndex][2] === shuffled[i][2] || 
               shuffled[(swapIndex + 1) % shuffled.length][2] === shuffled[i][2])) {
          swapIndex--;
        }
        
        if (swapIndex >= 0) {
          [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
        } else {
          throw new Error("无法生成无相邻重复的排列");
        }
      }
    }
  }
  
  return shuffled;
}
w.sort(() => Math.random() - 0.5);
w = safeShuffle(w);
// w = shuffleArrayWithConstraints(w);
let n = 0,
t = [];
for (let i = 0; i < w.length; i++) {
  if (w[i][1] == "谢谢惠顾") {
    t.push(n);
  }
  n += w[i][0] * 3.6;
}
let tttt = [1, 1];
for (let i = 0; i < w.length; i++) {
  if (w[i][1] == "终极大奖") {
    tttt = [n, w[i][0] * 3.6];

  }
  n += w[i][0] * 3.6;
}
// console.log(w, Rtexts);
let noww = "";
const music = new Audio('666.wav');
// music.loop = true;
// music.onanimationcancel
function updatetable() {
  st = "";
  for(let i in Rtexts){
    if(Rtexts[i] == "谢谢惠顾") continue;
    if(Rtexts[i] != "九折消费卡")
      st += "<tr><td>" + Rtexts[i] + "</td><td>" + (localStorage.getItem(Rtexts[i])??"0") + "个人抽中！</td></tr>";
    else{
      st += "<tr><td><p onclick = 'setOmg()'/>" + Rtexts[i] + "</td><td>" + (localStorage.getItem(Rtexts[i])??"0") + "个人抽中！</td></tr>";
    }
  }
  document.querySelector("body > table:nth-child(3)").innerHTML = st;
}

function show(offset) {
  now = offset;
  document.getElementById("1").outerHTML = `<svg id="1" width="${WheelCentreX * 2}" height="100%"></svg>`;
  document.getElementById("1").innerHTML = "";
  for (let i = 1; i <= w.length; i++) {
    document.getElementById("1").innerHTML += `
            <path d="${createSector(now, now + w[i - 1][0] * 3.6)}" fill="${w[i - 1][2]
      }"/>
            `;
    textx = WheelCentreX + (WheelCentreX - 20) * Math.sin(((now + w[i - 1][0] * 1.8) / 180) * Math.PI);
    texty = WheelCentreY - (WheelCentreY - 20) * Math.cos(((now + w[i - 1][0] * 1.8) / 180) * Math.PI);

    document.getElementById("1").innerHTML += `
            <text x=${textx} transform="
            rotate(${now - 90 + w[i-1][0] * 1.4} ${textx}, ${texty})"
            y=${texty} text-anchor="end" style="font-family:arial">
            <tspan style="font-weight:bold; font-size:${WheelCentreY / 10 / 1.75}px">
            ${w[i - 1][1]}</tspan></text>
            `;
    now += w[i - 1][0] * 3.6;
    if (now >= 450 && now - w[i - 1][0] * 3.6 <= 450) {
      noww = i - 1;
    }
    if (now >= 90 && now - w[i - 1][0] * 3.6 <= 90) {
      noww = i - 1;
    }
  }
}
let o = 0;
let kkk = 0;
let omgwow = 0;
function setOmg(){
  omgwow += 1;
  // console.log(666)
}
music.playbackRate = 12;
music.volume = 1;
async function rotate() {
  setButtonState("disabled")


  let i = Math.random();
  let tar = 0;
  if(omgwow + "" == localStorage.getItem("0.5元")){
    tar =
    90 - tttt[0] +
    kkk - 
    Math.random() * tttt[1] * 0.3 +
    360 * Math.floor(Math.random() * 7 + 5);
  }
  else if (i <= 0.6 / (1+0.0225)) {
    let k = Math.floor(Math.random() * t.length);
    // alert(6)
    tar =
    85 - t[k] + 
    kkk - 
    Math.random() * 10 +
    360 * Math.floor(Math.random() * 7 + 5);
  } else {
    tar = Math.random() * 7 * 360 + 5 * 360;
    if(tar % 360 > tttt[0] && tar % 360 < tttt[0] + tttt[1]){
      tar += tttt[1];
    }
  }
  spd = 0;
  let tt = tar - o;
  let old_o = o;
  let func = (i) => (i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2);
  let pre_n = noww;
  for (let i = 0; i <= 1; i += 1 / 800) {
    o = old_o + tt * func(i);
    await sleep(5);
    show(o % 360);
    document.querySelector(
      "body > table > tbody > tr:nth-child(2) > td > p"
    ).innerText = w[noww][1];
    if(noww != pre_n){
      music.play();
      
      pre_n = noww;
    }
  }
  document.querySelector(
    "body > table > tbody > tr:nth-child(2) > td > p"
  ).innerText =
    w[noww][1] + (w[noww][1] != "谢谢惠顾" ? "\n好样的！" : "\n糟糕！");
  o %= 360;
  setButtonState("")
  // tables[]++;
  localStorage.setItem(w[noww][1], ""+((parseInt(localStorage.getItem(w[noww][1]) ?? "0") + 1)));
  updatetable();
  omgwow=0;
}

show(o);
updatetable()