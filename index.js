function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createSector(fromangle, angle) {
  const rad = (angle * Math.PI) / 180;
  const fromrad = (fromangle * Math.PI) / 180;
  const x = 250 + 250 * Math.sin(rad);
  const y = 250 - 250 * Math.cos(rad);
  const fx = 250 + 250 * Math.sin(fromrad);
  const fy = 250 - 250 * Math.cos(fromrad);
  return `M250,250 L${fx},${fy} A250,250 0 ${
    angle - fromangle > 180 ? 1 : 0
  },1 ${x},${y} Z`;
}
Rarcs = [5, 8, 23, 6, 10, 13, 20, 15];
Rtexts = [
  "x个xxx", // 5
  "x个xxx", //      3
  "谢谢惠顾",
  "x元", //        3
  "x元", //          2
  "x元", //          1
  "x毛", // 5
  "x个xxx", //      1
];
Rcolours = ["pink", "red", "blue", "gray", "orange", "purple", "green", "cyan"];
let w = [];
for (let i = 0; i < 8; i++) {
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

  // 检查是否所有元素相同
  const allSame = arr.every((val) => val === arr[0][2]);
  if (allSame) throw new Error("无法满足约束条件");

  // Fisher-Yates洗牌基础算法
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // 处理相邻相同的情况
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

  // 确保首尾不同
  if (arr[0][2] === arr[arr.length - 1][2]) {
    // 从后往前找到第一个可交换的元素
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
console.log(w);

let n = 0,
  t = [];
for (let i = 0; i < w.length; i++) {
  if (w[i][1] == "谢谢惠顾") {
    t.push(n);
    console.log(n);
  }
  n += w[i][0] * 3.6;
}
const kk = -80;
let noww = "";
function show(offset) {
  now = offset;
  document.getElementById("1").innerHTML = "";
  for (let i = 1; i <= w.length; i++) {
    document.getElementById("1").innerHTML += `
            <path d="${createSector(now, now + w[i - 1][0] * 3.6)}" fill="${
      w[i - 1][2]
    }"/>
            `;
    document.getElementById("1").innerHTML += `
            <text x=${
              250 + 1.414 * 150 * Math.sin(((now + 15) / 180) * Math.PI)
            } transform="
            rotate(${now + kk} ${
      250 + 1.414 * 150 * Math.sin(((now + 15) / 180) * Math.PI)
    }, ${250 - 1.414 * 150 * Math.cos(((now + 15) / 180) * Math.PI)})"
            y=${
              250 - 1.414 * 150 * Math.cos(((now + 15) / 180) * Math.PI)
            } text-anchor="middle">
            ${w[i - 1][1]}</text>
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
async function rotate() {
  document.querySelector(
    "body > table > tbody > tr:nth-child(1) > td > button"
  ).outerHTML = '<button onclick="rotate()" disabled>旋转</button>';

  let i = Math.random();
  let tar = 0;
  if (i <= 0.5) {
    //
    let k = Math.floor(Math.random() * 2);
    tar =
      85 -
      t[k] +
      kkk -
      Math.random() * 5 +
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
  ).outerHTML = '<button onclick="rotate()">旋转</button>';
}
show(o);
