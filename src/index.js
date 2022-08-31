function displayInfos(response) {


  let cityNow = document.querySelector("h1 .city");

  let icon = document.querySelector("#icon-now");

  let tempNow = document.querySelector("#temp-number");

  let weatherDescription = document.querySelector("#weather-info");

  let feeling = document.querySelector("#feeling");

  let humidity = document.querySelector("#humidity");

  let wind = document.querySelector("#wind");

  let cityInput = document.querySelector("#choose-city");

  cityNow.innerHTML = response.data.name;

icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description); 
 
  tempNow.innerHTML = `${Math.round(response.data.main.temp)}`;

  weatherDescription.innerHTML = `${response.data.weather[0].main}`;

  feeling.innerHTML = ` ${Math.round(response.data.main.feels_like)}`;

  humidity.innerHTML = ` ${response.data.main.humidity}`;

  wind.innerHTML = ` ${Math.round(response.data.wind.speed)}`;

  cityInput.value = ``;
}

function cityShow(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#choose-city");

  if (cityInput.value != null && cityInput.value != "") {
    let apiKey = "dd3307b558f459294b4bafe6a4fddf7f";
    let cityName = cityInput.value;
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

    axios.get(url).then(displayInfos);
  } else {
    alert(`You need to choose a city`);
  }
}

function formDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

/* function setTemp(event) {
  event.preventDefault();
  let tempSpan = document.querySelector("#temp-number");

  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

  if (event.target.id == "scale-celsius") {
    tempSpan.innerHTML = "28";
  } else {
    tempSpan.innerHTML = "66";
  }
  } */

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "dd3307b558f459294b4bafe6a4fddf7f";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displayInfos);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let date = new Date();

let h6 = document.querySelector("h6");
h6.innerHTML = formDate(date);

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", cityShow);

/* let celsius = document.querySelector("#scale-celsius");
celsius.addEventListener("click", setTemp);

let farenheit = document.querySelector("#scale-farenheit");
farenheit.addEventListener("click", setTemp); */

let buttonCurrentLoc = document.querySelector("#current-loc");
buttonCurrentLoc.addEventListener("click", getCurrentPosition);
