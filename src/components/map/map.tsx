import leaflet, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from './assets/map-const.ts';
import {useEffect, useRef, useMemo, memo} from 'react';
import {useMap} from '../utils/hooks/use-map.ts';
import {CardProps} from '../offer-card/offer-card-data.ts';

type MapProps = {
  className?: string;
  selectedCity: CardProps;
  cardsData: CardProps[];
  activeOfferId?: string | null;
};

const Map = memo(({selectedCity, cardsData, activeOfferId, className}: MapProps): JSX.Element => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({location: selectedCity.city.location, containerRef: mapContainerRef});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  const icons = useMemo(() => ({
    default: leaflet.icon({
      iconUrl: URL_MARKER_DEFAULT,
      iconSize: [27, 39],
      iconAnchor: [14, 39],
    }),
    active: leaflet.icon({
      iconUrl: URL_MARKER_ACTIVE,
      iconSize: [27, 39],
      iconAnchor: [14, 39],
    })
  }), []);

  useEffect(() => {
    if (map) {
      map.setView([selectedCity.city.location.latitude, selectedCity.city.location.longitude]);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [selectedCity, map]);

  useEffect(() => {
    if (map && cardsData.length > 0) {
      const newMarkers = cardsData.map((card) =>
        leaflet.marker([card.location.latitude, card.location.longitude], {
          icon: card.id === activeOfferId ? icons.active : icons.default
        })
      );

      markerLayer.current.clearLayers();
      newMarkers.forEach((marker) => marker.addTo(markerLayer.current));
    }
  }, [activeOfferId, map, cardsData, icons]);

  return <section className={`${className} map`} ref={mapContainerRef}/>;
});

Map.displayName = 'Map';

export {Map};
