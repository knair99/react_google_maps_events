import React, {Component} from 'react';
import ClusterMap from './ClusterMap';

class GoogleMapsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state ={
          isMarkerShown: false
        };
    }
    handleMarkerClick = () =>{

    };
    render() {
        return (
            <div style={{'height': '100%'}}>
                <ClusterMap isMarkerShown
                onMarkerClick={this.handleMarkerClick}
                markers = {this.props.meetup_data}
                def_location={this.props.def_location}
                def_zoom={this.props.def_zoom}
                map_click = {this.props.map_click}/>
            </div>
        );
    }
}

export default GoogleMapsWrapper;
