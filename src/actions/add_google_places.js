
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=AIzaSyC7v0ZZwyiFLq-pm4kgXALCqJmaVbq069I
import axios from 'axios';
import Client from 'predicthq';

export const addGooglePlacesSuccess = (data) => {
    return {
        type: 'add',
        data
    }
};

export const addGooglePlaces = (lat_and_lon) => {
    return (dispatch) => {
        let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat_and_lon  +
            '&radius=500&types=night_club&key=YOUR_KEY_HERE';
        let axinst = axios.create({
            baseURL:url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'Content-Type': 'application/json',
            }
        });
        let proxy_url = 'https://cors-anywhere.herokuapp.com/';

        return axinst.get(proxy_url+url).then((response) => {
            let data_array = [];
            for (let each =0; each < response.data.results.length; each = each + 1){
                let meetup_name = response.data.results[each]['types'][0];
                let event_name = response.data.results[each]['name'];
                let event_link = response.data.results[each]['icon'];
                let type_event = 'Google Places';
                let venue_lat = parseFloat(response.data.results[each]['geometry']['location']['lat']);
                let venue_lon = parseFloat(response.data.results[each]['geometry']['location']['lng']);
                data_array.push({meetup_name, event_name, event_link, type_event, venue_lat, venue_lon});
            }
            dispatch(addGooglePlacesSuccess(data_array));

        });


    }
};


export const addPredictEvents = (locationString) => {
    return (dispatch) => {
        let phq = new Client({access_token :"YOUR_KEY_HERE"});

        let query_param = '100mi@-' + locationString;

        return new Promise ((resolve, reject) => {
            let data_array = [];
            phq.events.search({'within': query_param})
                .then((results)=>{
                    for (let event of results) {
                        let event_name = event.title;
                        let venue_lat = event.location[0];
                        let venue_lon = event.location[1];
                        let meetup_name = event['category'];
                        let event_link = '';
                        let type_event = 'Predict';
                        data_array.push({meetup_name, event_name, event_link, type_event, venue_lat, venue_lon});
                    }
                    dispatch(addGooglePlacesSuccess(data_array));
                    resolve('Success');
                });
        });

    }
};


export const addEventBrites = (locationString) => {
    return (dispatch) => {
        let url = "https://www.eventbriteapi.com/v3/events/search/?location.address=95112&location.within=1mi&start_date.keyword=today";
        let axinst = axios.create({
            baseURL:url,
            headers: {
                'Authorization': 'Bearer YOUR_KEY_HERE',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
            }
        });
        return axinst.get(url).then((response) => {
            let data_array = [];
            for (let each =0; each < response.data.events.length; each = each + 1){
                let meetup_name = response.data.events[each].description.text.slice(0,100);
                let event_name = response.data.events[each].name.text;
                let event_link = response.data.events[each].url;
                let type_event = 'Eventbrite';
                let venue_lat = parseFloat(response.data.location.latitude);
                let venue_lon = parseFloat(response.data.location.longtiude);
                data_array.push({meetup_name, event_name, event_link, type_event, venue_lat, venue_lon});
            }
            dispatch(addGooglePlacesSuccess(data_array));

        });

    }
};




