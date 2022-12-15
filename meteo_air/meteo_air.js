const map3 = L.map("map3").setView([47.0, 2.0], 6);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map3);

const token =
  "9f2b08bc2bd0d42ea411f79dea572dd358a6dedbf277edbd8d00f34c2e621176";

const token2 = "020b007b7e09eb8ed5caf5b917f8f457654754ee";

let cityName = document.getElementById("cityName");
let cityBtn = document.getElementById("cityBtn");

cityBtn.addEventListener("click", handleClick, false);

function handleClick(e) {
  e.preventDefault();
  let city = cityName.value;
  let url = `https://api.meteo-concept.com/api/location/cities?token=${token}&search=${city}`;
  let req = fetch(url);
  req
    .then((response) => response.json())
    .then((json) => convertInsee(json.cities[0].insee));
}

function convertInsee(insee) {
  let url = `https://api.meteo-concept.com/api/forecast/daily/0?token=${token}&insee=${insee}`;
  let req = fetch(url);
  req.then((response) => response.json()).then((json) => afficheMeteo(json));
}

function afficheMeteo(json) {
  let marker = L.marker([json.city.latitude, json.city.longitude]).addTo(map3);
  marker.bindPopup(`Ville de ${json.city.name}.<br>
        ${afficheIcone(json.forecast.weather)}
        Le temps prévu ajourd'hui est : ${
          WeatherTab[json.forecast.weather]
        }<br>`);
}

function AfficheAir(json) {
  let url = `https://api.meteo-concept.com/api/forecast/daily/0?token=${token}&insee=${insee}`;
  let req = fetch(url);
  req
    .then((response) => response.json())
    .then((json) => {
      let marker = L.marker(json.data.city.geo).addTo(map3);
      marker.bindPopup(`Ville de ${json.data.city.name}.<br>
    PM2.5 (particules fines à 2,5 micro-mètres) = ${json.data.iaqi.pm25.v}<br>
    PM10 (particules fines à 10 micro-mètres) = ${json.data.iaqi.pm10.v}<br>
    O3 (ozone) = ${json.data.iaqi.o3.v}<br>
    NO2 (dioxyde d'azote) = ${json.data.iaqi.no2.v}<br>
    `);
    });
}

function afficheIcone(n) {
  if (n === 0) {
    return `<i class="wi wi-day-sunny"></i><br>`;
  }
  if (n < 8) {
    return `<i class="wi wi-day-cloudy"></i><br>`;
  }
  if (n < 17) {
    return `<i class="wi wi-rain"></i><br>`;
  }
  if (n < 23) {
    return `<i class="wi wi-snowflake-cold"></i><br>`;
  }
  if (n < 79) {
    return `<i class="wi wi-rain"></i><br>`;
  }
  if (n < 142) {
    return `<i class="wi wi-lightning"></i><br>`;
  }
  if (n < 236) {
    return `<i class="wi wi-snowflake-cold"></i><br>`;
  }
}

const WeatherTab = [];

WeatherTab[0] = "Soleil";
WeatherTab[1] = "Peu nuageux";
WeatherTab[2] = "Ciel voilé";
WeatherTab[3] = "Nuageux";
WeatherTab[4] = "Très nuageux";
WeatherTab[5] = "Couvert";
WeatherTab[6] = "Brouillard";
WeatherTab[7] = "Brouillard givrant";
WeatherTab[10] = "Pluie faible";
WeatherTab[11] = "Pluie modérée";
WeatherTab[12] = "Pluie forte";
WeatherTab[14] = "Pluie modérée verglaçante";
WeatherTab[13] = "Pluie faible verglaçante";
WeatherTab[15] = "Pluie forte verglaçante";
WeatherTab[16] = "Bruine";
WeatherTab[20] = "Neige faible";
WeatherTab[21] = "Neige modérée";
WeatherTab[22] = "Neige forte";
WeatherTab[30] = "Pluie et neige mêlées faibles";
WeatherTab[31] = "Pluie et neige mêlées modérées";
WeatherTab[32] = "Pluie et neige mêlées fortes";
WeatherTab[40] = "Averses de pluie locales et faibles";
WeatherTab[41] = "Averses de pluie locales";
WeatherTab[42] = "Averses locales et fortes";
WeatherTab[43] = "Averses de pluie faibles";
WeatherTab[44] = "Averses de pluie";
WeatherTab[45] = "Averses de pluie fortes";
WeatherTab[46] = "Averses de pluie faibles et fréquentes";
WeatherTab[47] = "Averses de pluie fréquentes";
WeatherTab[48] = "Averses de pluie fortes et fréquentes";
WeatherTab[60] = "Averses de neige localisées et faibles";
WeatherTab[61] = "Averses de neige localisées";
WeatherTab[62] = "Averses de neige localisées et fortes";
WeatherTab[63] = "Averses de neige faibles";
WeatherTab[64] = "Averses de neige";
WeatherTab[65] = "Averses de neige fortes";
WeatherTab[66] = "Averses de neige faibles et fréquentes";
WeatherTab[67] = "Averses de neige fréquentes";
WeatherTab[68] = "Averses de neige fortes et fréquentes";
WeatherTab[70] = "Averses de pluie et neige mêlées localisées et faibles";
WeatherTab[71] = "Averses de pluie et neige mêlées localisées";
WeatherTab[72] = "Averses de pluie et neige mêlées localisées et fortes";
WeatherTab[73] = "Averses de pluie et neige mêlées faibles";
WeatherTab[74] = "Averses de pluie et neige mêlées";
WeatherTab[75] = "Averses de pluie et neige mêlées fortes";
WeatherTab[76] = "Averses de pluie et neige mêlées faibles et nombreuses";
WeatherTab[77] = "Averses de pluie et neige mêlées fréquentes";
WeatherTab[78] = "Averses de pluie et neige mêlées fortes et fréquentes";
WeatherTab[100] = "Orages faibles et locaux";
WeatherTab[101] = "Orages locaux";
WeatherTab[102] = "Orages fort et locaux";
WeatherTab[103] = "Orages faibles";
WeatherTab[104] = "Orages";
WeatherTab[105] = "Orages forts";
WeatherTab[106] = "Orages faibles et fréquents";
WeatherTab[107] = "Orages fréquents";
WeatherTab[108] = "Orages forts et fréquents";
WeatherTab[120] = "Orages faibles et locaux de neige ou grésil";
WeatherTab[121] = "Orages locaux de neige ou grésil";
WeatherTab[122] = "Orages locaux de neige ou grésil";
WeatherTab[123] = "Orages faibles de neige ou grésil";
WeatherTab[124] = "Orages de neige ou grésil";
WeatherTab[125] = "Orages de neige ou grésil";
WeatherTab[126] = "Orages faibles et fréquents de neige ou grésil";
WeatherTab[127] = "Orages fréquents de neige ou grésil";
WeatherTab[128] = "Orages fréquents de neige ou grésil";
WeatherTab[130] = "Orages faibles et locaux de pluie et neige mêlées ou grésil";
WeatherTab[131] = "Orages locaux de pluie et neige mêlées ou grésil";
WeatherTab[132] = "Orages fort et locaux de pluie et neige mêlées ou grésil";
WeatherTab[133] = "Orages faibles de pluie et neige mêlées ou grésil";
WeatherTab[134] = "Orages de pluie et neige mêlées ou grésil";
WeatherTab[135] = "Orages forts de pluie et neige mêlées ou grésil";
WeatherTab[136] =
  "Orages faibles et fréquents de pluie et neige mêlées ou grésil";
WeatherTab[137] = "Orages fréquents de pluie et neige mêlées ou grésil";
WeatherTab[138] =
  "Orages forts et fréquents de pluie et neige mêlées ou grésil";
WeatherTab[140] = "Pluies orageuses";
WeatherTab[141] = "Pluie et neige mêlées à caractère orageux";
WeatherTab[142] = "Neige à caractère orageux";
WeatherTab[210] = "Pluie faible intermittente";
WeatherTab[211] = "Pluie modérée intermittente";
WeatherTab[212] = "Pluie forte intermittente";
WeatherTab[220] = "Neige faible intermittente";
WeatherTab[221] = "Neige modérée intermittente";
WeatherTab[222] = "Neige forte intermittente";
WeatherTab[230] = "Pluie et neige mêlées";
WeatherTab[231] = "Pluie et neige mêlées";
WeatherTab[232] = "Pluie et neige mêlées";
WeatherTab[235] = "Averses de grêle";
