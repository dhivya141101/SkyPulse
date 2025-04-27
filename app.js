const appKey = "5f76612d67604e5d27941f05b4e6191e";

// Get references to DOM elements
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityCountry = document.getElementById("city-country");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let feelsLike = document.getElementById("feels-like");
let humidity = document.getElementById("humidity-div");
let pressure = document.getElementById("pressure");
let windSpeed = document.getElementById("wind-speed");
let condition = document.getElementById("condition");

// Add event listeners to the search button and input field
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

// Function to handle Enter key press in the input field
function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

// Function to find weather details by city
function findWeatherDetails() {
  // Check if the input field is empty
  if (searchInput.value === "") {
    return;
  } else {
    // Construct the API URL with the input value (city name)
    let searchLink =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      encodeURIComponent(searchInput.value) + // Encoding input value to avoid issues with special characters
      "&appid=" + appKey; // API key for OpenWeatherMap

    // Call the API with the fetch method
    httpRequestAsync(searchLink);
  }
}

// Function to return a simplified weather condition based on description
function getShortCondition(desc) {
  desc = desc.toLowerCase();
  if (desc.includes("cloud")) return "Cloudy";
  if (desc.includes("rain") || desc.includes("drizzle")) return "Rainy";
  if (desc.includes("sun") || desc.includes("clear")) return "Sunny";
  if (desc.includes("snow")) return "Snowy";
  if (desc.includes("thunder")) return "Stormy";
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) return "Foggy";
  return "Unknown"; // Default return if no condition matches
}

// Function to handle the API response and update the UI
function theResponse(jsonObject) {
  // Parse JSON object and display weather details
  cityCountry.innerHTML = `${jsonObject.name}, ${jsonObject.sys.country}`;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = `${parseInt(jsonObject.main.temp - 273)}°C`; // Convert from Kelvin to Celsius
  feelsLike.innerHTML = `Feels Like: ${parseInt(jsonObject.main.feels_like - 273)}°C`; // Convert from Kelvin to Celsius
  condition.innerHTML = `Condition: ${getShortCondition(jsonObject.weather[0].description)}`;
  humidity.innerHTML = `Humidity: ${jsonObject.main.humidity}%`;
  pressure.innerHTML = `Pressure: ${jsonObject.main.pressure} hPa`;
  windSpeed.innerHTML = `Wind Speed: ${jsonObject.wind.speed} m/s`;
}

// Function to reset the weather information when there is an error
function clearWeatherInfo() {
  cityCountry.innerHTML = "Location: --";
  icon.src = "";
  temperature.innerHTML = "Temperature: --";
  feelsLike.innerHTML = "Feels Like: --";
  condition.innerHTML = "Condition: --";
  humidity.innerHTML = "Humidity: --";
  pressure.innerHTML = "Pressure: --";
  windSpeed.innerHTML = "Wind Speed: --";
}

// Function to make an API request using the fetch method (asynchronous)
function httpRequestAsync(url) {
  // Use fetch API to make the request
  fetch(url)
    .then(response => {
      // Check if the response is successful
      if (response.ok) {
        return response.json(); // Parse the response as JSON
      } else {
        // If the response is not successful, throw an error
        throw new Error("City not found");
      }
    })
    .then(data => {
      // If successful, pass the data to the response handler
      theResponse(data);
    })
    .catch(error => {
      // Handle any errors (e.g., city not found or network issues)
      swal("City Not Found!", "Please enter a valid city name.", "error");
      clearWeatherInfo(); // Reset the weather information display
    });
}
