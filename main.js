import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke, Fill } from 'ol/style';
import Overlay from 'ol/Overlay';

let countryData = [];
let hihlightCodes = new Set();
let countriesLayer;

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    countryData = data;
    hihlightCodes = new Set(countryData.map(c => c.code));
    loadCountries(); 
    console.log(countryData);
  })
  .catch(error => {
    console.error('Ошибка при загрузке data.json:', error);
  });

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

const overlay = new Overlay({
  element: tooltip,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -15]
});
map.addOverlay(overlay);

function loadCountries() {
  const countriesSource = new VectorSource({
    url: 'countries.geojson',
    format: new GeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  });

  countriesLayer = new VectorLayer({
    source: countriesSource,
    style: function (feature) {
      const code = feature.get('ISO3166-1-Alpha-3') || feature.get('ISO_A3'); 
      const isHighlighted = hihlightCodes.has(code);
      console.log('isHighlighted', isHighlighted);

      return new Style({
        stroke: new Stroke({
          color: 'black',
          width: 1
        }),
        fill: new Fill({
          color: isHighlighted ? 'rgba(60, 255, 0, 0.71)' : 'rgba(0, 0, 255, 0.1)'
        })
      });
    }
  });

  map.addLayer(countriesLayer);

  setupClickHandler(); 
}

function setupClickHandler() {
  map.on('click', function (evt) {
    let found = false;
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      if (layer !== countriesLayer) {
        return;
      }

      const code = feature.get('ISO3166-1-Alpha-3'); 
      if (!code) {
        console.warn('Нет кода ISO_A3 у объекта', feature);
        return;
      }

      const country = countryData.find(c => c.code === code);

      if (country) {
        tooltip.innerHTML = `
          <div>
            <strong>${country.name}</strong><br/>
            <a href="${country.lawLink}" target="_blank">Ссылка на закон</a>
          </div>
        `;
        overlay.setPosition(evt.coordinate);
        found = true;
      }
    });

    if (!found) {
      overlay.setPosition(undefined);
    }
  });

  map.on('pointermove', function (evt) {
    const hit = map.hasFeatureAtPixel(evt.pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  });
}
