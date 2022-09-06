function displayInfos(response) {
  let cityNow = document.querySelector("h1 .city");
  let icon = document.querySelector("#icon-now");
  let tempNow = document.querySelector("#temp-number");
  let weatherDescription = document.querySelector("#weather-info");
  let feeling = document.querySelector("#feeling");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let cityInput = document.querySelector("#choose-city");

  celsiusTemperature = response.data.main.temp;

  cityNow.innerHTML = response.data.name;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  tempNow.innerHTML = `${Math.round(response.data.main.temp)}`;
  weatherDescription.innerHTML = `${response.data.weather[0].main}`;
  feeling.innerHTML = ` ${Math.round(response.data.main.feels_like)}`;
  humidity.innerHTML = ` ${response.data.main.humidity}`;
  wind.innerHTML = ` ${Math.round(response.data.wind.speed)}`;
  cityInput.value = ``;

  getForecast(response.data.coord);
  changeBackgroundImage(response.data.weather[0].icon);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInfos);
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

function setTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-number");

  if (event.target.id == "scale-celsius") {
    tempElement.innerHTML = Math.round(`${celsiusTemperature}`);
  } else {
    tempElement.innerHTML = Math.round((`${celsiusTemperature}` * 9) / 5 + 32);
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

  return `<small>Last updated:</small> ${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3 icon">
      <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt="Clear"
      id="icon-prev"
      class="float-left"
      />
      </div>
        <div class="col-2 day" id="weekday">${formatDay(forecastDay.dt)}</div>
        <div class="col-4 sky" id="sky">${forecastDay.weather[0].description}</div>
        <div class="col-3 tempMaxMin">
        <span class="tempMax">${Math.round(forecastDay.temp.max)}º</span> /
        <span class="tempMin">${Math.round(forecastDay.temp.min)}º</span>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function changeBackgroundImage(weatherType) {
  let containerApp = document.querySelector("#container-app");

  containerApp.setAttribute("class", "container-app");

  if (weatherType === "01d" || weatherType === "02d") {
    containerApp.classList.add("day-clear");
  } else if (weatherType === "03d" || weatherType === "04d") {
    containerApp.classList.add("day-clouds");
  } else if (weatherType === "09d" || weatherType === "10d") {
    containerApp.classList.add("day-rain");
  } else if (weatherType === "11d" || weatherType === "11n") {
    containerApp.classList.add("storm");
  } else if (weatherType === "13d" || weatherType === "13n") {
    containerApp.classList.add("snow");
  } else if (weatherType === "50d" || weatherType === "50n") {
    containerApp.classList.add("mist");
  } else if (weatherType === "01n" || weatherType === "02n") {
    containerApp.classList.add("night-clear");
  } else if (weatherType === "03n" || weatherType === "04n") {
    containerApp.classList.add("night-clouds");
  } else if (weatherType === "09n" || weatherType === "10n") {
    containerApp.classList.add("night-rain");
  }
}

let celsiusTemperature = null;

let date = new Date();

let h6 = document.querySelector("h6");
h6.innerHTML = formDate(date);

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", cityShow);

let buttonCurrentLoc = document.querySelector("#current-loc");
buttonCurrentLoc.addEventListener("click", getCurrentPosition);

let celsius = document.querySelector("#scale-celsius");
celsius.addEventListener("click", setTemp);

let farenheit = document.querySelector("#scale-farenheit");
farenheit.addEventListener("click", setTemp);

search("Coimbra");
