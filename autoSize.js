

const WheelCentreX = document.querySelector("body > div > svg:nth-child(1)").clientHeight / 2;
const WheelCentreY = document.querySelector("body > div > svg:nth-child(1)").clientHeight / 2;
document.querySelector(
    "body > table > tbody > tr:nth-child(2) > td > p"
  ).outerHTML = `<p style="font-weight:bold; font-size:${WheelCentreY / 10 / 1.5}px"/>点击旋转！`;
  document.querySelector(
    "body > table > tbody > tr:nth-child(1) > td > button"
  ).outerHTML = `<button onclick="rotate()" style="font-weight:bold; font-size:${WheelCentreY / 10 / 1.5}px">旋转</button>`;

document.querySelector(
    "body > table"
  ).outerHTML =  `
  <table style="position:absolute; left:${WheelCentreX * 2 + 50}px; top: ${WheelCentreX};">
        ${document.querySelector(
          "body > table > tbody"
        ).outerHTML}
    </table>`
let setButtonState = (state)=>{
    document.querySelector(
        "body > table > tbody > tr:nth-child(1) > td > button"
      ).outerHTML = `<button onclick="rotate()" style="font-weight:bold; font-size:${WheelCentreY / 10 / 1.5}px" ${state}>旋转</button>`
}
setButtonState("")
document.querySelector("body > table:nth-child(3)").outerHTML = `<table style="position: absolute;left:${WheelCentreX*2+80};top:0;font-size:${WheelCentreY / 10 / 1.5}px">
        <tbody>
            
        </tbody>
    </table>`
    document.getElementById("2").innerHTML = `
    <path d="M0,${WheelCentreY} L20,${WheelCentreY+60} L20, ${WheelCentreY-60   }" fill="black"/>
    `;
