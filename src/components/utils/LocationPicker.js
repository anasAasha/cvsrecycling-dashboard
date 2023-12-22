import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
      showingInfoWindow: false,
      activeMarker: {},
    };
  }

  handleMapClick = (mapProps, map, event) => {
    this.setState({
      selectedLocation: event.latLng,
      showingInfoWindow: true,
    });
  };

  handleMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  handleMapClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { google } = this.props;
    const { selectedLocation, showingInfoWindow, activeMarker } = this.state;

    return (
      <div>
        <Map
          google={google}
          onClick={this.handleMapClick}
          initialCenter={{
            lat: 0, // Initial latitude
            lng: 0, // Initial longitude
          }}
          zoom={10} // Initial zoom level
        >
          {selectedLocation && (
            <Marker
              onClick={this.handleMarkerClick}
              position={selectedLocation}
              name="Selected Location"
            />
          )}
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={this.handleMapClose}
          >
            <div>
              <h2>Selected Location</h2>
              {selectedLocation && (
                <p>
                  Latitude: {selectedLocation.lat()} <br />
                  Longitude: {selectedLocation.lng()}
                </p>
              )}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY', // Replace with your actual Google Maps API key
})(LocationPicker);
