const apiKey = "1c80d76c828277e5331386d6f63d0aee"; // Replace with your actual API key

// Show Weather Screen
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("weather-screen").classList.remove("hidden");
});

// Return to Home Screen
document.getElementById("return-btn").addEventListener("click", () => {
    // Show home screen, hide weather screen
    document.getElementById("home-screen").classList.remove("hidden");
    document.getElementById("weather-screen").classList.add("hidden");

    // Reset the search input field
    document.getElementById("city-input").value = "";

    // Show the search box again and hide weather details
    document.querySelector(".search-box").classList.remove("hidden");
    document.querySelector(".weather-card").classList.add("hidden");
    
    // Hide error message (if previously displayed)
    document.getElementById("error-message").classList.add("hidden");
});


// Fetch Weather Data
document.getElementById("search-btn").addEventListener("click", async () => {
    const city = document.getElementById("city-input").value.trim();
    const errorMessage = document.getElementById("error-message");
    const weatherCard = document.querySelector(".weather-card");

    if (!city) {
        errorMessage.classList.remove("hidden");
        return;
    }

    errorMessage.classList.add("hidden");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        errorMessage.classList.remove("hidden");
        weatherCard.classList.add("hidden");
    }
});

// Update Weather UI
function updateUI(data) {
    document.getElementById("city-name").innerText = data.name;
    document.getElementById("date-time").innerText = new Date().toLocaleString();
    document.getElementById("temperature").innerText = `${data.main.temp}°C`;
    document.getElementById("weather-condition").innerText = data.weather[0].description;
    document.getElementById("feels-like").innerText = `Feels like: ${data.main.feels_like}°C`;
    document.getElementById("wind-speed").innerText = `Wind: ${data.wind.speed} m/s`;
    document.getElementById("sunrise-sunset").innerText = `Sunrise: ${convertTime(data.sys.sunrise)} | Sunset: ${convertTime(data.sys.sunset)}`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`; // Add Humidity

    // Hide search bar and button
    document.querySelector(".search-box").classList.add("hidden");

    // Show weather details
    document.querySelector(".weather-card").classList.remove("hidden");

    // Show weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = iconUrl;
    weatherIcon.classList.remove("hidden");
}


// Convert UNIX Timestamp to Readable Time
function convertTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
