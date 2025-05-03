import leaflet, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from './assets/map-const.ts';
import {useEffect, useRef} from 'react';
import {useMap} from '../utils/hooks/use-map.ts';
import {CardProps} from '../offer-card/offer-card-data.ts';

type MapProps = {
  className?: string;
  selectedCity: CardProps;
  cardsData: CardProps[];
  activeOfferId?: string | null;
}

const defaultMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map ({selectedCity, cardsData, activeOfferId, className} : MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({ location: selectedCity.city.location, containerRef: mapContainerRef });
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([selectedCity.city.location.latitude, selectedCity.city.location.longitude]);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [selectedCity, map]);

  useEffect(() => {
    if (map) {
      cardsData.forEach((card) => {
        leaflet.marker({
          lat: card.location.latitude,
          lng: card.location.longitude,
        }, {
          icon: card.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
        }).addTo(markerLayer.current);
      });
    }
  }, [activeOfferId, map, cardsData]);

  return <section className={`${className} map`} ref={mapContainerRef}/>;
}

export { Map };
