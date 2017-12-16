import './bootstrap/css/bootstrap.min.css';
import React, { Component } from 'react';
import Filter from './components/Filter';
import SearchForm from './components/SearchForm';
import GoogleMapsWrapper from './components/GoogleMapsWrapper';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as meetupActions from './actions/add_meetups';
import * as eventfulActions from './actions/add_eventful';
import * as googlePlacesActions from './actions/add_google_places';
import Results from "./components/Results";
import JumboComponent from './components/JumboComponent';
import axios from 'axios';

const initialState = {
    meetup_data: [],
    def_location: {lat: 30.4190616, lon: -97.8395151},
    def_zoom: 4,
    highlight_card: -1
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    reset = () => {
      this.setState(initialState);
    };

    getLatAndLonFromZipcode = (zipcode) => {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&key=YOUR_KEY_HERE';
        axios.get(url).then( (response) => {
                let lat = parseFloat(response.data.results[0].geometry.location.lat);
                let latString = response.data.results[0].geometry.location.lat;
                let lon = parseFloat(response.data.results[0].geometry.location.lng);
                let lonString = response.data.results[0].geometry.location.lng;
                this.setState( {
                    def_location : Object.assign({}, this.state.def_location, {lat, lon})
                });
                let locationString = latString + ',' + lonString;
                this.getPredictEvents(locationString);
                this.getGooglePlaces(locationString);
            }).catch( (error) => {
                console.error(error );
        });

    };

    getMeetups = (zipcode) => {
         this.props.meetup_action.addMeetups(zipcode).then( () => {
            this.setState({
                meetup_data: this.state.meetup_data.concat(this.props.meetup_data_update)
            });
        });
    };

    geteventfuls = (zipcode) => {
         this.props.eventful_action.addeventfuls(zipcode).then( () => {
            this.setState({
                meetup_data: this.state.meetup_data.concat(this.props.eventful_data_update)
            });
        });
    };

    getGooglePlaces = (lat_and_lon) => {
         this.props.google_places_action.addGooglePlaces(lat_and_lon).then(() => {
            this.setState({
                meetup_data: this.state.meetup_data.concat(this.props.google_places_data_update)
            });
        });
    };



    getPredictEvents = (lat,lon) => {
         this.props.google_places_action.addPredictEvents(lat, lon).then(() => {
            this.setState({
                meetup_data: this.state.meetup_data.concat(this.props.google_places_data_update)
            });
        });
    };

    getEventBrites = (zipcode) => {
        this.props.google_places_action.addEventBrites(zipcode).then(() => {
            this.setState({
                meetup_data: this.state.meetup_data.concat(this.props.google_places_data_update)
            });
        });
    };

    getEvents = (zipcode) => {
        this.reset();
        this.getLatAndLonFromZipcode(zipcode);
        this.getMeetups(zipcode);
        this.geteventfuls(zipcode);
        //Google places and predicts in places with latandlon
        this.getEventBrites(zipcode);

    };

    handleMapClick = (index) => {
        this.setState({
           highlight_card: index
        });
    };

    render() {
    return (
      <div className='App'>
          <JumboComponent/>
          <div className={'container'} style={{'marginLeft': '0px', 'maxWidth' : '100%'}}>
              <div className="row">
                  <div className="col-md-7">
                      <div className="row">
                          <SearchForm handle_search={this.getEvents}/>
                      </div>
                      <div className='row'>
                          <div className='col-md-12'>
                              <GoogleMapsWrapper meetup_data={this.state.meetup_data}
                                                 def_location={this.state.def_location}
                                                 def_zoom={this.state.def_zoom}
                                                 map_click = {this.handleMapClick}/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-5">
                      <div className='row' >
                          <Filter/>
                      </div>
                      <div className='row' style={{'overflowY': 'auto'}}>
                          <Results meetup_data={this.state.meetup_data} highlight={this.state.highlight_card}/>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    );
  }

}

function mapStateToProps(state){
    return{
        meetup_data_update: state.meetupReducer,
        eventful_data_update: state.eventfulReducer,
        google_places_data_update: state.googlePlacesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        meetup_action: bindActionCreators(meetupActions, dispatch),
        eventful_action: bindActionCreators(eventfulActions, dispatch),
        google_places_action:bindActionCreators(googlePlacesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);