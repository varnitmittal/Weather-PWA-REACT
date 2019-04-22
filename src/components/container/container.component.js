import React from 'react';
import NavBar from '../navbar/navbar.component';
import Search from '../search/search.component';
import config from '../../config/config';
import axios from 'axios';
import Display from '../display/display.component';

class Container extends React.Component {
  constructor(props){
    super(props);
     this.state={
      gotCompleteData: false
    }
     this.imageQuery = this.imageQuery.bind(this);
    this.weatherQuery = this.weatherQuery.bind(this);
    this.newState =this.newState.bind(this);
    this.queryOptimizer = this.queryOptimizer.bind(this);
  }

  queryOptimizer(queryToken){
    if(queryToken === 'haze' || queryToken === 'Haze')
      return 'haze landscape';
    else if(queryToken === 'clouds' || queryToken === 'Clouds')
      return 'cloudy';
    else if(queryToken === 'mist' || queryToken === 'Mist')
      return 'mist weather';
    else if(queryToken === 'rain' || queryToken === 'Rain')
      return 'rain nature';
    else if(queryToken === 'clear' || queryToken ==='Clear')
      return 'blue sky';
    else
      return queryToken;
  }

  imageQuery(queryToken, apiDataW){
    //fetching photos data from API
    let apiKey = config.apiKeyImage;
    let query = this.queryOptimizer(queryToken);
    let apiFetchURL = `https://api.pexels.com/v1/search?query=${query}`;
    
    axios.get(apiFetchURL, { 'headers' : { 'Authorization': apiKey } })
    .then(res => {
        let apiData = res.data;
        let numberOfPics = apiData.per_page;
        if(apiData.total_results<15){
          numberOfPics = apiData.total_results;
        }
        let photos =[];
        for(var i=0; i<numberOfPics; i++){
          photos.push({
              index: i,
              largePicUrl: apiData.photos[i].src.large2x,
              photographer: apiData.photos[i].photographer
          })
        }
        let apiDataP = ({
          hasPhotosData: true,
          photosData: {
            photos: photos,
            numberOfPics: numberOfPics
          }
        });
        this.newState(apiDataP.photosData, apiDataW);        
    })
    .catch(err => {
        console.log(err);
    })
  }

  weatherQuery({ searchText }){
    let apiKey = config.apiKeyWeather;
    let query = searchText;
    let apiFetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}&units=metric`;
    
    //fetching weather from API
    axios.get(apiFetchURL)
    .then(res => {
      let apiDataW = res.data;

      this.imageQuery(apiDataW.weather[0].main, apiDataW)
    })
    .catch(err => {
          window.alert('Input not valid. Try again')
          console.log(err);
    })
  }

  newState(apiDataP, apiDataW){
    this.setState({
      gotCompleteData: true,
      photosData: apiDataP,
      weatherData: {          
        humidity: apiDataW.main.humidity,
        temp: apiDataW.main.temp,
        tempMax: apiDataW.main.temp_max,
        tempMin: apiDataW.main.temp_min,
        weatherMain: apiDataW.weather[0].main,
        weatherDesc: apiDataW.weather[0].description,
        windSpeed: apiDataW.wind.speed,
        name: apiDataW.name
      }
    })
  }

  render() {
    if(this.state.gotCompleteData){
      let index = Math.floor((Math.random() * 8));
      let bgImageUrl = this.state.photosData.photos[index].largePicUrl;
      return (
        <div className="view " style = {{ 
           background: `url(${bgImageUrl}) no-repeat center center fixed`,
           backgroundSize: 'cover'
           }}
        >
           <div >
            <NavBar />
            <div className="container" style={{ opacity: 1 }}>
                <div className="col-xl-4 col-lg-6 col-md-7 col-sm-8 col-sx-12">
                  <Search func = {this.weatherQuery} />
                </div>
                <div style={{ paddingTop: '5vh'}}>

                {this.state.gotCompleteData ? <Display data={this.state.weatherData} /> : null}

                </div>
            </div>
          </div>
        </div>
      )
    }

    else
    return (
      <div className="view" style = {{ background: '#000000', height: '110vh' }}>
            <NavBar />
            <div className="container" style = {{  }}>
                
                <div className="col-xl-4 col-lg-6 col-md-7 col-sm-8 col-sx-12">
                    <Search func = {this.weatherQuery} />
                </div>
                <div style={{ paddingTop: '5vh'}}>

                {this.state.gotCompleteData ? <Display data={this.state.weatherData} /> : null}

                </div>
            </div>
      </div>
    ) 
  }
}

export default Container;
