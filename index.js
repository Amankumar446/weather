const limit = 40;

function createTableRow(rowNumber) {
  const row_html = `<tr>
<td id="day${rowNumber}">Loading...</td>
<td>
    <img src="" id="day${rowNumber}icon">
    <span>Loading...</span>
</td>
<td id="day${rowNumber}feels_like">Loading...</td>
<td id="day${rowNumber}temp">Loading...</td>
<td id="day${rowNumber}Min">Loading...</td>
<td id="day${rowNumber}Max">Loading...</td>
<td id="day${rowNumber}humidity">Loading...</td>
<td id="day${rowNumber}pressure">Loading...</td>
<td id="day${rowNumber}wind_speed">Loading...</td>
<td id="day${rowNumber}weather_description">Loading...</td>
<td id="day${rowNumber}sea_level">Loading...</td>
</tr> `;
  document.getElementById("weather_table_body").innerHTML += row_html;
}

for (let i = 1; i <= limit; i++) {
  createTableRow(i);
}

function GetInfo() {
  const newName = document.getElementById("cityInput");
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = "--" + newName.value + "--";
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    newName.value +
    "&appid=fe7baef8dcd28e3dd516811461fdf32a&units=metric";
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1)).innerHTML =
          data.list[i].dt_txt;
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML =
          Number(data.list[i].main.temp_min).toFixed(2) + "&nbsp °C";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML =
          Number(data.list[i].main.temp_max).toFixed(2) + "&nbsp °C";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "temp").innerHTML =
          Number(data.list[i].main.temp).toFixed(2) + "&nbsp °C";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "feels_like").innerHTML =
          Number(data.list[i].main.feels_like).toFixed(2) + "&nbsp °C";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "humidity").innerHTML =
          Number(data.list[i].main.humidity).toFixed(2) + "&nbsp %";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "pressure").innerHTML =
          Number(data.list[i].main.pressure).toFixed(2) + "&nbsp hpa";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "wind_speed").innerHTML =
          Number(data.list[i].wind.speed).toFixed(2) + "&nbsp m/s";
      }

      for (i = 0; i < limit; i++) {
        document.getElementById(
          "day" + (i + 1) + "weather_description"
        ).innerHTML = data.list[i].weather[0].description;
      }

      for (i = 0; i < limit; i++) {
        document.getElementById("day" + (i + 1) + "sea_level").innerHTML =
          Number(data.list[i].main.sea_level).toFixed(2) + "&nbsp feet";
      }

      for (i = 0; i < limit; i++) {
        const weatherIconImage = document.querySelector(`#day${i + 1}icon`);
        weatherIconImage.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
        weatherIconImage.parentNode.querySelector("span").remove();
      }
      // end
    })
    .catch((err) => console.error(err));
}
