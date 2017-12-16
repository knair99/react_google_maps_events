import keys from '../constants/keys';
import jsonp from 'jsonp';

const npages = '10'

export const addMeetupsSuccess = (data) => {
    return {
        type: 'add',
        data
    }
}
export const addMeetups = (zipcode) => {
    return (dispatch) => {
        let url = 'https://api.meetup.com/2/open_events?zip=' + zipcode + '&page=' + npages
            + '&key=' + keys.meetup_key;
        return new Promise ((resolve, reject) => {
            jsonp(url,  (err, response) => {
                if (err) {
                    console.error(err.message);
                    reject('No data');
                } else {

                    let data_array = [];
                    for (var each in response.results){
                            let meetup_name = response.results[each].group.name;
                            let event_name = response.results[each].name;
                            let event_link = response.results[each].event_url;
                            let venue_lat = '';
                            let venue_lon = '';
                            if(typeof response.results[each].venue === "undefined"){
                                venue_lat = response.results[each].group.lat;
                                venue_lon = response.results[each].group.lon;
                            } else {
                                venue_lat = response.results[each].venue.lat;
                                venue_lon = response.results[each].venue.lon;
                            }
                            venue_lat = parseFloat(venue_lat);
                            venue_lon = parseFloat(venue_lon);
                            let type_event = 'Meetup';
                            data_array.push({meetup_name, event_name, event_link, type_event, venue_lat, venue_lon});
                    }
                    dispatch(addMeetupsSuccess(data_array));
                    resolve('Success');
                }
            });
        });
    }
}


