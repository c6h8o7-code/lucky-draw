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
Rarcs = [2, 4, 8, 15, 4, 9, 28, 25, 5];
Rtexts = [
  "S级乌龟",
  "A级乌龟",
  "B级乌龟",
  "C级乌龟",
  "1.5元",
  "1元",
  "5毛",
  "谢谢惠顾",
  "再抽一次",
];
Rcolours = [
  "rgba(226, 42, 0, 0.7)",
  "rgba(215, 195, 16, 0.7)",
  "rgba(22, 95, 168, 0.7)",
  "rgba(64, 11, 125, 0.7)",
  "rgba(238, 158, 11, 0.7)",
  "rgba(54, 168, 22, 0.7)",
  "rgba(90, 70, 140, 0.7)",
  "rgba(38, 139, 24, 0.51)",
  "rgba(6, 139, 106, 0.7)"
];
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
w.sort(() => Math.random() - 0.5);

function safeShuffle(arr) {
  shuffled = [...arr]
  // 修复相邻重复
  for (let i = 0; i < shuffled.length; i++) {
    if (shuffled[i][1] === shuffled[(i === 0) ? shuffled.length - 1 : i - 1][1]) {
      // 向后查找可交换元素
      let swapIndex = i + 1;
      while (swapIndex < shuffled.length && shuffled[swapIndex][1] === shuffled[i][1]) {
        swapIndex++;
      }
      
      if (swapIndex < shuffled.length) {
        [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
      } else {
        // 若后面无合适元素，则向前查找
        swapIndex = (i === 0) ? shuffled.length - 2 : i - 2;
        while (swapIndex >= 0 && 
              (shuffled[swapIndex][1] === shuffled[i][1] || 
               shuffled[(swapIndex + 1) % shuffled.length][1] === shuffled[i][1])) {
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
let noww = "";
const music = new Audio('666.wav');
// music.loop = true;
// music.onanimationcancel
function updatetable() {
  st = "";
  for(let i in Rtexts){
    if(Rtexts[i] == "谢谢惠顾") continue;
    st += "<tr><td>" + Rtexts[i] + "</td><td>" + (localStorage.getItem(Rtexts[i])??"0") + "个人抽中！</td></tr>";
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
            rotate(${now - w[i - 1][0] * 0.6 - 90} ${textx}, ${texty})"
            y=${texty} text-anchor="end" style="font-family:arial">
            <tspan style="font-weight:bold; font-size:${WheelCentreY / 10 / 1.5}px">
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
o = 0;
kkk = 0;
music.playbackRate = 12;
music.volume = 1;
async function rotate() {
  setButtonState("disable")


  let i = Math.random();
  let tar = 0;
  if (i <= 0.5) {
    let k = Math.floor(Math.random() * t.length);
    // alert(6)
    tar =
    85 - t[k] +
    kkk - 
    Math.random() * 10 +
    360 * Math.floor(Math.random() * 5 + 3);
  } else {
    tar = Math.random() * 6 * 360 + 1 * 360;
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
}

show(o);
updatetable()