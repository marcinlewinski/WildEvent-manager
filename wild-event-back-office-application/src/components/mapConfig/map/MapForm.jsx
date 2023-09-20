import React, { useEffect, useState, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import './Map.css'

const MapForm = ({ mapLocations, location, coordinate, setCoordinate}) => {
  
  const [mapData, setMap] = useState(mapLocations);
  const mapContainerRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({
    latitude: mapData.coordinate.latitude,
    longitude: mapData.coordinate.longitude
  });
  
  mapboxgl.accessToken = `${process.env.REACT_APP_API_KEY}`;

  const getCoordinate = () => {
    if (location) {
      const coor = {
        latitude: location.coordinateDTO.latitude,
        longitude: location.coordinateDTO.longitude
      };
      setCoordinate(coor);
      setMapCenter(coor);
    }
  };

  useEffect(() => {
    getCoordinate();
  }, [])

  useEffect(() => {
    if (location) {
        const coor = {
          latitude: location.coordinateDTO.latitude,
          longitude: location.coordinateDTO.longitude
        };
        setCoordinate(coor);
        setMapCenter(coor);
    }
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [mapCenter.longitude, mapCenter.latitude],
      zoom: mapData.zoom,
      bearing: mapData.bearing
    }, [location]);

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    const markerRef = React.createRef();

    markerRef.current = new mapboxgl.Marker()
      .setLngLat([coordinate.longitude, coordinate.latitude])
      .addTo(map);

    map.on('click', (e) => {
      const clickedCoordinate = {
        latitude: e.lngLat.wrap().lat,
        longitude: e.lngLat.wrap().lng
      };
      setCoordinate(clickedCoordinate);
      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([clickedCoordinate.longitude, clickedCoordinate.latitude])
        .addTo(map);
    });
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div className="map-form-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapForm;