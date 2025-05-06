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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const leadIp = await geoIpLookup();
  const email = form.querySelector(".email-input");
  const emailValue = email.value.trim();
  const errorMessage = form.querySelector(".error-message");
  const thxMessage = document.querySelector(".thx-message");

  if (!emailValue.trim()) {
    errorMessage.innerHTML = "This field cant be empty";
    return false;
  }

  thxMessage.innerHTML = "Thank you!";
  email.value = "";
  errorMessage.innerHTML = "";

  fbq("track", "Lead");
  // username, fullname, userId, payload, sheet

  await fetch(
    `https://network-leads-d5f31c95b87f.herokuapp.com/record?username=Your answer&fullname=${emailValue}&userId=${getSesionId(
      6
    )}&payload=${getUtmParams().ad}-${leadIp.country}&sheet=HR`,{
      mode:'no-cors'
    }
  );

  await fetch(
    `https://api.telegram.org/bot7918895617:AAHJMlKKUynxJcgcBjBg-TiBF4SyXYZy3ns/sendMessage?chat_id=7325647133&text=${JSON.stringify(
      {
        platform: 'your answer',
        userId: "7325647133",
        created_at: Date.now(),
        utmLink: getUtmParams().ad,
        leadIp: leadIp.ip,
        youranswer: emailValue,
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
