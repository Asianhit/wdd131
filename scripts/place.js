const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;
document.getElementById('lastModified').textContent = document.lastModified;

const temperature = 10;
const windSpeed = 5;

// Formula for wind chill in Celsius
const calculateWindChill = (t, v) => (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16));

function displayWindChill() {
    const chillElement = document.getElementById('chill');
    
    // Conditions check: temp <= 10°C and wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        chillElement.textContent = `${windChill.toFixed(1)} °C`;
    } else {
        chillElement.textContent = "N/A";
    }
}

displayWindChill();