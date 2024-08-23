let id = '6a219e29a3fc68123aede5a7927ee875'; // Replace with your actual OpenWeatherMap API key
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');
let useLocationBtn = document.getElementById('useLocation');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (valueSearch.value) { // Check if value exists
    searchWeather();
  }
});

const searchWeather = () => {
  fetch(url+'&q='+ valueSearch.value)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.cod == 200){
        city.querySelector('figcaption').innerHTML = data.name;
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector('span').innerText = data.main.temp;
        description.innerText = data.weather[0].description;

        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
      } else {
        main.classList.add('error');
        setTimeout(() => {
          main.classList.remove('error');
        }, 1000);
      }
      valueSearch.value = '';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
};

// Default search
const initApp = () => {
  valueSearch.value = 'MALANG';
  searchWeather();
}

initApp();

// Event handler for "Gunakan Lokasi Saya" button
useLocationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(`${url}&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            if(data.cod == 200){
              // Update UI elements with weather data (same logic as searchWeather)
              city.querySelector('figcaption').innerHTML = data.name;
              // ... (rest of the UI updates based on data)
            } else {
              // Handle error
              console.error('Error:', data.message);
            }
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      },
      (error) => {
        console.error('Error accessing geolocation:', error);
        alert('Browser Anda tidak mendukung geolocation.');
      }
    );
  } else {
    alert('Browser Anda tidak mendukung geolocation.');
  }
});