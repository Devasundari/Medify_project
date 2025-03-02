const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const backgroundDiv = document.querySelector(".background");  // Correctly select background div

async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error("Failed to fetch quote");

        const data = await response.json();
        quoteText.innerText = `"${data.content}"`;
        authorText.innerText = `— ${data.author}`;

        // Fetch a relevant image from Unsplash
        fetchAuthorImage(data.author);
    } catch (error) {
        quoteText.innerText = "Failed to load quote.";
        authorText.innerText = "";
        console.error("Error fetching quote:", error);
    }
}

async function fetchAuthorImage(author) {
    try {
        const unsplashApiKey = "xD3gzJJqhhGRcMD-3D0fLMtTfZy5oMK2-gK0TS_Y-F8";  // Replace with your Unsplash API key
        const url = `https://api.unsplash.com/search/photos?query=${author}&client_id=${unsplashApiKey}&per_page=1`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch image");

        const imageData = await response.json();
        
        // Check if we have at least one result, otherwise set a default image
        if (imageData.results.length > 0) {
            const authorImage = imageData.results[0].urls.small;
            backgroundDiv.style.background = `url(${authorImage}) no-repeat center center/cover`;
        } else {
            console.warn("No image found for this author, setting a default image.");
            backgroundDiv.style.background = `url('default.jpg') no-repeat center center/cover`;  // Set a fallback image
        }
    } catch (error) {
        console.error("Error fetching author image:", error);
        backgroundDiv.style.background = `url('default.jpg') no-repeat center center/cover`; // Fallback image in case of error
    }
}

document.getElementById("quote-btn").addEventListener("click", fetchQuote);
