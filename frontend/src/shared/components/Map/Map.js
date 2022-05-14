import React, { useRef } from 'react';

const Map = () => {
  const mapRef = useRef();

  const map = new window.google.maps.Map(mapRef.current, {
    center: {
      lat: 30.0444,
      lng: 31.2357,
    },
    zoom: 13,
  });

  new window.google.maps.Marker({
    position: {
      lat: 30.0444,
      lng: 31.2357,
    },
    map,
  });

  return (
    <div ref={mapRef} className="map">
      Map
    </div>
  );
};

export default Map;
