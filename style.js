const countyName = document.querySelector("#country");
const cityName = document.querySelector("#city");
const time = document.querySelector(".time");
const days = document.querySelector(".days");

const url = "http://46.101.247.236:8080";

(async () => {
  const row = document.querySelector("#row");
  const response = await fetch(`${url}/viloyat`);
  const data = await response.json();

  data.data.forEach((el) => {
    const options = document.createElement("option");
    options.textContent = el.cityName;
    options.setAttribute("value", el.cityHref);
    countyName.appendChild(options);
  });
})();

countyName.addEventListener("change", (item) => {
  const viloyat = item.target.value;
  (async () => {
    const row = document.querySelector("#row");
    const response = await fetch(`${url}/viloyat/${viloyat}`);
    const data = await response.json();

    data.data.forEach((el) => {
      const options = document.createElement("option");
      options.textContent = el.cityName;
      options.setAttribute("value", el.cityHref);
      cityName.appendChild(options);
    });
  })();
});

cityName.addEventListener("change", (item1) => {
  (async () => {
    const row = document.querySelector("#row");
    const response = await fetch(`${url}/shahar/${item1.target.value}`);
    const data = await response.json();
    row.innerHTML = "";

    data.forEach((el) => {
      const options = document.createElement("option");
      options.textContent = el.cityName;
      options.setAttribute("value", el.cityHref);
      cityName.appendChild(options);
      const box = document.createElement("div");
      box.setAttribute("id", "boxes");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      p1.textContent = el.prayTime;
      p2.textContent = el.prayName;
      box.appendChild(p2);
      box.appendChild(p1);
      row.appendChild(box);
    });
  })();
});

function hozirgiVaqtniOlish() {
  var hozirgiVaqtniOlish = new Date();
  var soat = hozirgiVaqtniOlish.getHours();
  var daqiqa = hozirgiVaqtniOlish.getMinutes();
  var saniya = hozirgiVaqtniOlish.getSeconds();
  var oshibBorayotganSaniyalar = soat * 3600 + daqiqa * 60 + saniya;

  time.innerHTML =
    "Hozirgi vaqt: " +
    (soat < 10 ? "0" + soat : soat) +
    ":" +
    (daqiqa < 10 ? "0" + daqiqa : daqiqa) +
    ":" +
    (saniya < 10 ? "0" + saniya : saniya);
}
hozirgiVaqtniOlish();
setInterval(function () {
  hozirgiVaqtniOlish();
}, 1000);

function hozirgiKun() {
  var date = new Date();
  var yil = date.getFullYear();
  var oy = date.getMonth() + 1;
  var kun = date.getDate();

  days.innerHTML =
    "Bugungi kun: " +
    (kun < 10 ? "0" + kun : kun) +
    ":" +
    (oy < 10 ? "0" + oy : oy) +
    ":" +
    (yil < 10 ? "0" + yil : yil) +
    "y";
}
hozirgiKun();

const result = document.querySelector(".result");
const startBtn = document.querySelector(".startBtn");
const resetBtn = document.querySelector(".resetBtn");

var count = 0;

function startNumber() {
  count++;
  result.innerHTML = count;
}

startBtn.addEventListener("click", () => {
  startNumber();
});

startBtn.addEventListener("index", function (event) {
  startNumber().value - 1;
});

function resetBumber() {
  count = 0;
  result.innerHTML = count;
}

resetBtn.addEventListener("click", () => {
  resetBumber();
});
