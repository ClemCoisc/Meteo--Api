const map = L.map("map").setView([47.0, 2.0], 6);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const token = "020b007b7e09eb8ed5caf5b917f8f457654754ee";

const cityName = [
  "paris",
  "marseille",
  "lyon",
  "toulouse",
  "nice",
  "nantes",
  "montpellier",
  "strasbourg",
  "bordeaux",
  "lille",
];

for (let city of cityName) {
  let url = `https://api.waqi.info/feed/${city}/?token=${token}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => AfficheAir(json));
}

function AfficheAir(json) {
  let circle = L.circle(json.data.city.geo, {
    color: airPollution(json.data.iaqi.pm25.v),
    fillColor: airPollution(json.data.iaqi.pm25.v),
    fillOpacity: 1,
    radius: 6500,
  }).addTo(map);
  circle.bindPopup(`Ville de ${json.data.city.name}.<br>
    PM2.5 (particules fines à 2,5 micro-mètres) = ${
      json.data.iaqi.pm25 ? json.data.iaqi.pm25.v : "pas de données disponibles"
    }<br>
    PM10 (particules fines à 10 micro-mètres) = ${
      json.data.iaqi.pm10 ? json.data.iaqi.pm10.v : "pas de données disponibles"
    }<br>
    O3 (ozone) = ${
      json.data.iaqi.o3 ? json.data.iaqi.o3.v : "pas de données disponibles"
    }<br>
    NO2 (dioxyde d'azote) = ${
      json.data.iaqi.no2 ? json.data.iaqi.no2.v : "pas de données disponibles"
    }<br>
    SO2: ${
      json.data.iaqi.so2 ? json.data.iaqi.so2.v : "pas de données disponibles"
    }<br>
    CO: ${
      json.data.iaqi.co ? json.data.iaqi.co.v : "pas de données disponibles"
    }<br>
    `);
}

function airPollution(airValue) {
  if (airValue < 51) {
    return "green";
  }
  if (airValue < 101) {
    return "yellow";
  }
  if (airValue < 151) {
    return "orange";
  }
  if (airValue < 201) {
    return "red";
  }
  if (airValue < 301) {
    return "purple";
  }
  if (airValue < 501) {
    return "brown";
  }
  if (airValue === null) {
    return "white";
  }
}
