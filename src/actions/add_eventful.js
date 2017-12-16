import jsonp from 'jsonp';

export const addeventfulsSuccess = (data) => {
    return {
        type: 'add',
        data
    }
};

export const addeventfuls = (zipcode) => {
    return (dispatch) => {
        let context = {
            headers : {
                'Authorization': process.env.REACT_APP_TOKEN,
            },
            verify: "True"
        };
        let url = 'https://api.eventful.com/json/events/search?app_key=YOUR_KEY_HERE&location=' + zipcode  +
            '&date=Future';
        return new Promise ((resolve, reject) => {
            jsonp(url, context, (err, response) => {
                if (err) {
                    console.error(err.message);
                    reject('No data');
                } else {
                    let data_array = [];
                    for (let each =0; each < response.events.event.length; each = each + 1){
                            let meetup_name = response.events.event[each]['venue_name'];
                            let event_name = response.events.event[each]['title'];
                            let event_link = response.events.event[each]['url'];
                            let type_event = 'Eventful';
                            let venue_lat = parseFloat(response.events.event[each]['latitude']);
                            let venue_lon = parseFloat(response.events.event[each]['longitude']);
                            data_array.push({meetup_name, event_name, event_link, type_event, venue_lat, venue_lon});
                    }
                    dispatch(addeventfulsSuccess(data_array));
                    resolve('Success');
                }
            });
        });
    }
};


