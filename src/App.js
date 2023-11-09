import React from 'react';

class App extends React.Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state = {location: 'lisbon'};
    // Class Component 一定要記得method bind to this，不然會沒有辦法動作
    this.fetchWeather = this.fetchWeather.bind(this)
  }

  fetchWeather() {
    console.log('Loading data...')
    console.log(this.state.location)
  }

  render() {

    return(<div className='App'>
      <h1>Classy Weather</h1>
      <div>
        <input type='text' placeholder='Search from location...' value={this.state.location} onChange={(e)=>{this.setState({ location: e.target.value })}}></input>
      </div>
      <button onClick={this.fetchWeather}>Get Weather</button>
    </div>)
  }
}

export default App;