import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  DistanceMatrixService,
} from '@react-google-maps/api';
import PopUp from './popup';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const MapContainer: React.FC = () => {
  const [currentStop, setCurrentStop] = useState<number>(0);
  const [time, setTime] = useState<String>();
  const [distance, setDistance] = useState<String>();
  const [stopName, setStopName] = useState<String>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -1.939826787816454, lng: 30.0445426438232 }),
    [],
  );
  useEffect(() => {
    if (localStorage) {
      const currentStop = localStorage.getItem('currentStop');
      if (currentStop) {
        const currentStopCopy = JSON.parse(currentStop);
        setCurrentStop(currentStopCopy);
      }
    }
  });
  useEffect(() => {
    localStorage &&
      localStorage.setItem('currentStop', JSON.stringify(currentStop));
  }, [currentStop]);

  const origin = {
    lat: -1.939826787816454,
    lng: 30.0445426438232,
  };
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    [],
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  if (isLoaded) {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        waypoints: [
          {
            location: new google.maps.LatLng(
              -1.9355377074007851,
              30.060163829002217,
            ),
          },
          {
            location: new google.maps.LatLng(
              -1.9358808342336546,
              30.08024820994666,
            ),
          },
          {
            location: new google.maps.LatLng(
              -1.9489196023037583,
              30.092607828989397,
            ),
          },
          {
            location: new google.maps.LatLng(
              -1.9592132952818164,
              30.106684061788073,
            ),
          },
          {
            location: new google.maps.LatLng(
              -1.9487480402200394,
              30.126596781356923,
            ),
          },
        ],

        destination: {
          lat: -1.9365670876910166,
          lng: 30.13020167024439,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (result) {
          setDirections(result);
        }
      },
    );

    return (
      <>
        <PopUp time={time} distance={distance} stopName={stopName} />
        <GoogleMap
          zoom={8}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#1976D2',
                  strokeWeight: 5,
                },
              }}
            />
          )}
          <DistanceMatrixService
            options={{
              destinations: [
                {
                  location: new google.maps.LatLng(
                    -1.9355377074007851,
                    30.060163829002217,
                  ),
                },
                {
                  location: new google.maps.LatLng(
                    -1.9358808342336546,
                    30.08024820994666,
                  ),
                },
                {
                  location: new google.maps.LatLng(
                    -1.9489196023037583,
                    30.092607828989397,
                  ),
                },
                {
                  location: new google.maps.LatLng(
                    -1.9592132952818164,
                    30.106684061788073,
                  ),
                },
                {
                  location: new google.maps.LatLng(
                    -1.9487480402200394,
                    30.126596781356923,
                  ),
                },
                {
                  lat: -1.9365670876910166,
                  lng: 30.13020167024439,
                },
              ],
              origins: [origin],
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={(response) => {
              var elements = response?.rows[0].elements;
              // finding next stop logic
              if (elements) {
                let currentElement = elements[currentStop];
                let currentTime = currentElement.duration.text;
                let currentDistance = currentElement.distance.text;
                setTime(currentTime);
                setDistance(currentDistance);
                for (let i = currentStop; i < elements?.length; i++) {
              setStopName(response?.destinationAddresses[currentStop]);
                  let nextElement = elements[currentStop + 1];
                  if (
                    currentElement.distance.value <
                      nextElement.distance.value &&
                    currentTime === '1 min' &&
                    currentDistance === '1 m'
                  ) {
                    setCurrentStop(currentStop + 1);
                  } else {
                    break;
                  }
                }
              }
              console.log(currentStop, time, distance, stopName);
            }}
          />
        </GoogleMap>
      </>
    );
  }
};

export default MapContainer;
