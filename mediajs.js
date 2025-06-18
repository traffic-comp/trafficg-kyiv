const URI = {
  dev: "http://localhost:8080",
  prod: "https://us-central1-test2-411610.cloudfunctions.net/trackform",
};

const mode = URI["prod"];

const hendlebutton = document.querySelectorAll(".hendlebutton");
const fomr = document.querySelector("#form");
const links = {
  // whatsapp: "https://wa.me/420722242996",
};

const getIp = async () => {
  const res = await fetch("https://api64.ipify.org");
  const data = await res.text();
  return data;
};

function stringToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
async function geoIpLookup() {
  const res = await fetch("https://get.geojs.io/v1/ip/country.json");

  const { country, ip } = await res.json();
  console.log(country, ip);

  return { country, ip };
}

const handleClick = async function (e) {
  e.preventDefault();
  const leadIp = await geoIpLookup();

  switch (this.dataset.platform) {
    case "telegram":
      window.location.href = `tg://resolve?domain=test_tech_test_bot&start=${
        getUtmParams().ad
      }-${leadIp.country}`;
      break;
    default:
      return;
  }
  fbq("track", "Lead");
};

hendlebutton.forEach((item) => {
  item.addEventListener("click", handleClick);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const leadIp = await geoIpLookup();
  const email = form.querySelector(".email-input");
  const emailValue = email.value.trim();
  const errorMessage = form.querySelector(".error-message");
  const thxMessage = document.querySelector(".thx-message");

  if (!emailValue.trim()) {
    errorMessage.innerHTML = "Це поле не може бути порожнім";
    return false;
  }

  thxMessage.innerHTML = "Дякуємо!";
  email.value = "";
  errorMessage.innerHTML = "";

  fbq("track", "Lead");
  // username, fullname, userId, payload, sheet

  await fetch(
    `https://leads-network.onrender.com/record?username=Номер&fullname=${emailValue}&userId=${getSesionId(
      6
    )}&payload=${getUtmParams().ad}-${leadIp.country}&sheet=buy&tableId=11d5Iojvl_5NeFdrdmsQkC0N33_6CmiAI8xWJ7hGAUOI&bot=test_tech_test_bot`,{
      mode:'no-cors'
    }
  );
});

function getUtmParams() {
  var params = new URLSearchParams(window.location.search);

  // Составляем объект с UTM параметрами
  var utmParams = {
    ad: params.get("ad"),
    pixel: params.get("pixel"),
  };

  // Убираем параметры с пустыми значениями
  Object.keys(utmParams).forEach((key) => {
    if (!utmParams[key]) {
      delete utmParams[key];
    }
  });

  return utmParams;
}
