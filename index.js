const WheelCentreX = 500;
const WheelCentreY = 500;
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
Rarcs = [3, 6, 21, 4, 8, 13, 20, 15, 10];
Rtexts = [
  "a个xxx",
  "b个xxx",
  "谢谢惠顾",
  "a元",
  "b元",
  "c元",
  "x毛",
  "c个yyy",
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
let w = [];
for (let i = 0; i <= 8; i++) {
  if (Rarcs[i] > 10) {
    let ww = Math.random() * 0.5 + 1.75;
    w.push([Rarcs[i] / ww, Rtexts[i], Rcolours[i]]);
    w.push([Rarcs[i] - Rarcs[i] / ww, Rtexts[i], Rcolours[i]]);
  } else {
    w.push([Rarcs[i], Rtexts[i], Rcolours[i]]);
  }
}
w.sort(() => Math.random() - 0.5);

function shuffleArrayWithConstraints(arr) {
  if (arr.length <= 2) return arr;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][2] === arr[i - 1][2]) {
      for (let j = i + 1; j < arr.length; j++) {
        if (
          arr[j][2] !== arr[i - 1][2] &&
          (j + 1 >= arr.length || arr[j][2] !== arr[i + 1][2])
        ) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          break;
        }
      }
    }
  }
  if (arr[0][2] === arr[arr.length - 1][2]) {
    for (let i = arr.length - 2; i > 0; i--) {
      if (arr[i][2] !== arr[0][2] && arr[i][2] !== arr[arr.length - 2][2]) {
        [arr[arr.length - 1], arr[i]] = [arr[i], arr[arr.length - 1]];
        break;
      }
    }
  }

  return arr;
}
w = shuffleArrayWithConstraints(w);

let n = 0,
  t = [];
for (let i = 0; i < w.length; i++) {
  if (w[i][1] == "谢谢惠顾") {
    t.push(n);
  }
  n += w[i][0] * 3.6;
}
const kk = -90;
let noww = "";
function show(offset) {
  now = offset;
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
            <tspan style="font-weight:bold; font-size:45px">
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
updatetable()
function updatetable() {
  st = "";
  for(let i in Rtexts){
    if(Rtexts[i] == "谢谢惠顾") continue;
    st += "<tr><td>" + Rtexts[i] + "</td><td>" + (localStorage.getItem(Rtexts[i])??"0") + "个人抽中！</td></tr>";

  }
  document.querySelector("body > table:nth-child(3)").innerHTML = st;
}
async function rotate() {
  document.querySelector(
    "body > table > tbody > tr:nth-child(1) > td > button"
  ).outerHTML = '<button onclick="rotate()" disabled style="font-weight:bold; font-size:55px">旋转</button>';

  let i = Math.random();
  let tar = 0;
  if (i <= 0.4) {
    let k = Math.floor(Math.random() * 2);
    // alert(6)
    tar =
      85 -
      t[k] +
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
  for (let i = 0; i <= 1; i += 1 / 800) {
    o = old_o + tt * func(i);
    await sleep(5);
    show(o % 360);
    document.querySelector(
      "body > table > tbody > tr:nth-child(2) > td > p"
    ).innerText = w[noww][1];
  }
  document.querySelector(
    "body > table > tbody > tr:nth-child(2) > td > p"
  ).innerText =
    w[noww][1] + (w[noww][1] != "谢谢惠顾" ? "\n好样的！" : "\n糟糕！");
  o %= 360;
  document.querySelector(
    "body > table > tbody > tr:nth-child(1) > td > button"
  ).outerHTML = '<button onclick="rotate()" style="font-weight:bold; font-size:55px">旋转</button>';
  // tables[]++;
  localStorage.setItem(w[noww][1], ""+((parseInt(localStorage.getItem(w[noww][1]) ?? "0") + 1)));
  updatetable();
}

show(o);
