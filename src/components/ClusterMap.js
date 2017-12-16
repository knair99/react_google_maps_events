import React from 'react';

const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    OverlayView
} = require("react-google-maps");

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const ClusterMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfthVBIFQYNgV2FT8qdgF-bKnftLT7cB0&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `80vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
}),
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => (idx, fn) => {
            fn(idx);
            return {isOpen: !isOpen};
        }
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            //const clickedMarkers = markerClusterer.getMarkers()
            markerClusterer.getMarkers()
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={props.def_zoom}
        defaultCenter={{lat: props.def_location.lat, lng: props.def_location.lon}}
        center = {{lat:props.def_location.lat, lng: props.def_location.lon}}
        zoom = {props.def_zoom}>
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}>
            {props.markers.map( (meetup, idx) => (
                <Marker
                    key={idx}
                    position={{ lat: meetup.venue_lat, lng: meetup.venue_lon }}
                    onClick={() => props.onToggleOpen(idx, props.map_click)}
                    style={{'padding': '0', 'margin':'0', 'border':'0'}}>
                    {props.isOpen &&
                    <OverlayView onCloseClick={props.onToggleOpen}
                                 position={{ lat: meetup.venue_lat, lng: meetup.venue_lon }}
                                 mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div style={{ background: `limegreen`, opacity: 1, padding: '5px', 'margin':'5px', 'border':'5px', 'borderColor':'blue'}}>
                            <div style={{ fontSize: `16px`}}>
                                <a href={meetup.event_link} target={'_blank'} style={{'color': 'yellow'}}>{meetup.event_name.slice(0,20)}</a>
                            </div>
                        </div>
                    </OverlayView>}
                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

export default ClusterMap;