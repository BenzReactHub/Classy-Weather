import React from 'react';

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}


class App extends React.Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state = {location: 'lisbon', isLoading: false, displayLocation: "", weather: {}};
    // Class Component 一定要記得method bind to this，不然會沒有辦法動作
    this.fetchWeather = this.fetchWeather.bind(this)
  }

  async fetchWeather() {
    try {
      this.setState({isLoading: true})
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);
  
      if (!geoData.results) throw new Error("Location not found");
  
      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({displayLocation: `${name} ${convertToFlag(country_code)}`});
  
      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({isLoading: false})
    }
  }

  render() {

    return(<div className='App'>
      <h1>Classy Weather</h1>
      <div>
        <input type='text' placeholder='Search from location...' value={this.state.location} onChange={(e)=>{this.setState({ location: e.target.value })}}></input>
      </div>
      <button onClick={this.fetchWeather}>Get Weather</button>

      {this.state.isLoading && <p className='loader'>Loading...</p>}
    </div>)
  }
}

export default App;