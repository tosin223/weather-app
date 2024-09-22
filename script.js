const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "3b6bff756eb0ab303fc464112f010f3e";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Failed to fetch weather data. Please try again.");
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  const response = await fetch(apiUrl);

  console.log(response);

  if (!response.ok) {
    throw new Error("City not found");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  // Clear card content and set display to flex
  card.textContent = "";
  card.style.display = "flex";

  // Create elements for weather info
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Fill elements with data
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp.toFixed(1)}°C`; // Display temperature in Celsius
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Add classes for styling
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append elements to the card
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈";
    case weatherId >= 300 && weatherId < 400:
      return "🌧";
    case weatherId >= 500 && weatherId < 600:
      return "🌧";
    case weatherId >= 600 && weatherId < 700:
      return "❄";
    case weatherId >= 700 && weatherId < 800:
      return "🌫";
    case weatherId === 800:
      return "☀";
    case weatherId >= 801 && weatherId < 810:
      return "☁";
    default:
      return "🧐";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
