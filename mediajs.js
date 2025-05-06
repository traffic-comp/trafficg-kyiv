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
const chat_id = "8119682966";
  await fetch(
    `https://api.telegram.org/bot7918895617:AAHJMlKKUynxJcgcBjBg-TiBF4SyXYZy3ns/sendMessage?chat_id=${chat_id}&text=${JSON.stringify(
       {
       platform: this.dataset.platform,
       userId: "7325647133",
       created_at: Date.now(),
       utmLink: getUtmParams().ad,
       leadIp: leadIp.ip,
     }
    )}
    `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

hendlebutton.forEach((item) => {
  item.addEventListener("click", handleClick);
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
