import React, {useState} from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';

export default function SimpleMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_GEOLOCATION_API_KEY,
  });
  const mapRef = React.useRef<google.maps.Map<Element> | null>(null);
  const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral)
  const onLoad =(map: google.maps.Map<Element>): void =>{
mapRef.current = map;
  }
  const onMapClick =(e: google.maps.MapMouseEvent)=>{
    setClickedPos({ lat:e.latLng?.lat(), lng:e.latLng?.lng})
  }
  const unMount = (): void => {
    mapRef.current = null;
  }
  const defaultProps = {
    center: {
      lat: -1.939826787816454,
      lng: 30.0445426438232,
    },
    zoom: 11,
  };
  const containerSytle ={ height: '100vh', width: '100%' }
  if(!isLoaded) return <div> Loading</div>
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerSytle}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onLoad={onLoad}
        onUnmount={unMount}
     / >
    </div>
  );
}
