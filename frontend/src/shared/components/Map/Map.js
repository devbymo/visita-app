import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: 50vw;
  }
`;

const Map = () => {
  const mapRef = useRef();
  const { center, zoom } = { center: { lat: 59.95, lng: 30.33 }, zoom: 11 };

  useEffect(() => {
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
  }, [center, zoom]);

  return <StyledMap ref={mapRef}>Map</StyledMap>;
};

export default Map;
