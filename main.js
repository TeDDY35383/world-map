// import './style.css';
// // import { Map, View } from 'ol';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
// import { Style, Stroke, Fill } from 'ol/style';
// import Overlay from 'ol/Overlay';

// let countryData = [];
// let hihlightCodes = new Set();
// let countriesLayer;

// // Для режима разработки и production
// const isDev = import.meta.env.MODE === 'development'
// const dataUrl = isDev ? '/data.json' : './data.json'
// const geojsonUrl = isDev ? '/countries.geojson' : './countries.geojson'

// fetch(dataUrl)
//   .then(response => {
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//     return response.json()
//   })
//   .then(data => {
//     countryData = data
//     hihlightCodes = new Set(countryData.map(c => c.code))
//     loadCountries()
//   })
//   .catch(error => {
//     console.error('Ошибка при загрузке data.json:', error)
//   })

// // fetch('./data.json')
// //   .then(response => response.json())
// //   .then(data => {
// //     countryData = data;
// //     hihlightCodes = new Set(countryData.map(c => c.code));
// //     loadCountries(); 
// //     console.log(countryData);
// //   })
// //   .catch(error => {
// //     console.error('Ошибка при загрузке data.json:', error);
// //   });

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });

// const tooltip = document.createElement('div');
// tooltip.className = 'tooltip';
// document.body.appendChild(tooltip);

// const overlay = new Overlay({
//   element: tooltip,
//   positioning: 'bottom-center',
//   stopEvent: false,
//   offset: [0, -15]
// });
// map.addOverlay(overlay);

// tooltip.addEventListener('click', function(e) {
//   if (e.target.tagName === 'A') {
//     e.stopPropagation(); // Останавливаем всплытие события
//     // Дополнительно предотвращаем закрытие тултипа
//     e.preventDefault();
//     window.open(e.target.href, '_blank'); // Открываем ссылку в новой вкладке
//   }
// });

// function loadCountries() {
//   const countriesSource = new VectorSource({
//     url: geojsonUrl,
//     format: new GeoJSON({
//       dataProjection: 'EPSG:4326',
//       featureProjection: 'EPSG:3857'
//     })
//   });

//   countriesLayer = new VectorLayer({
//     source: countriesSource,
//     style: function (feature) {
//       const code = feature.get('ISO3166-1-Alpha-3') || feature.get('ISO_A3'); 
//       const isHighlighted = hihlightCodes.has(code);
//       console.log('isHighlighted', isHighlighted);

//       return new Style({
//         stroke: new Stroke({
//           color: 'black',
//           width: 1
//         }),
//         fill: new Fill({
//           color: isHighlighted ? 'rgba(60, 255, 0, 0.71)' : 'rgba(0, 0, 255, 0.1)'
//         })
//       });
//     }
//   });

//   map.addLayer(countriesLayer);

//   setupClickHandler(); 
// }

// // function setupClickHandler() {
// //   map.on('click', function (evt) {
// //     let found = false;
// //     map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
// //       if (layer !== countriesLayer) {
// //         return;
// //       }

// //       const code = feature.get('ISO3166-1-Alpha-3'); 
// //       if (!code) {
// //         console.warn('Нет кода ISO_A3 у объекта', feature);
// //         return;
// //       }

// //       const country = countryData.find(c => c.code === code);

// //       if (country) {
// //         tooltip.innerHTML = `
// //           <div>
// //             <strong>${country.name}</strong><br/>
// //             <a href="${country.lawLink}" target="_blank">Ссылка на закон</a>
// //           </div>
// //         `;
// //         overlay.setPosition(evt.coordinate);
// //         found = true;
// //       }
// //     });

// //     if (!found) {
// //       overlay.setPosition(undefined);
// //     }
// //   });
  

// //   map.on('pointermove', function (evt) {
// //     const hit = map.hasFeatureAtPixel(evt.pixel);
// //     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
// //   });
// // }

// function setupClickHandler() {
//   map.on('click', function (evt) {
//     let found = false;
//     map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
//       if (layer !== countriesLayer) {
//         return;
//       }

//       const code = feature.get('ISO3166-1-Alpha-3'); 
//       if (!code) {
//         console.warn('Нет кода ISO_A3 у объекта', feature);
//         return;
//       }

//       const country = countryData.find(c => c.code === code);

//       if (country) {
//         tooltip.innerHTML = `
//           <div class="tooltip-content">
//             <strong>${country.name}</strong><br/>
//             <a href="${country.lawLink}" target="_blank">Ссылка на закон</a>
//           </div>
//         `;
//         overlay.setPosition(evt.coordinate);
//         found = true;
//       }
//     });

//     if (!found) {
//       overlay.setPosition(undefined);
//     }
//   });

//   map.on('pointermove', function (evt) {
//     const hit = map.hasFeatureAtPixel(evt.pixel);
//     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
//   });
// }
// import './style.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
// import { Style, Stroke, Fill } from 'ol/style';
// import Overlay from 'ol/Overlay';

// let countryData = [];
// let hihlightCodes = new Set();
// let countriesLayer;
// let currentTooltipCountry = null;

// const isDev = import.meta.env.MODE === 'development';
// const dataUrl = isDev ? '/data.json' : './data.json';
// const geojsonUrl = isDev ? '/countries.geojson' : './countries.geojson';

// fetch(dataUrl)
//   .then(response => {
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return response.json();
//   })
//   .then(data => {
//     countryData = data;
//     hihlightCodes = new Set(countryData.map(c => c.code));
//     loadCountries();
//   })
//   .catch(error => {
//     console.error('Ошибка при загрузке data.json:', error);
//   });

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });

// const tooltipContainer = document.createElement('div');
// tooltipContainer.className = 'tooltip-container';
// document.body.appendChild(tooltipContainer);

// const tooltipContent = document.createElement('div');
// tooltipContent.className = 'tooltip-content';
// tooltipContainer.appendChild(tooltipContent);

// const overlay = new Overlay({
//   element: tooltipContainer,
//   positioning: 'bottom-center',
//   stopEvent: true,
//   offset: [0, -15]
// });
// map.addOverlay(overlay);

// tooltipContent.addEventListener('click', function(e) {
//   if (e.target.tagName === 'A' && currentTooltipCountry && currentTooltipCountry.code !== 'HUN') {
//     window.open(currentTooltipCountry.lawLink, '_blank');
//   }
// });
// function loadCountries() {
//   const countriesSource = new VectorSource({
//     url: geojsonUrl,
//     format: new GeoJSON({
//       dataProjection: 'EPSG:4326',
//       featureProjection: 'EPSG:3857'
//     })
//   });

//   countriesLayer = new VectorLayer({
//     source: countriesSource,
//     style: function (feature) {
//       const code = feature.get('ISO3166-1-Alpha-3') || feature.get('ISO_A3'); 
//       const isHighlighted = hihlightCodes.has(code);

//       if (code === 'HUN') {
//         return new Style({
//           stroke: new Stroke({
//             color: '#7a0000',
//             width: 1.5
//           }),
//           fill: new Fill({
//             color: 'rgba(255, 100, 100, 0.6)'
//           })
//         });
//       }
      
//       // Стандартный стиль для выделенных стран
//       if (isHighlighted) {
//         return new Style({
//           stroke: new Stroke({
//             color: '#2e7d32',
//             width: 1
//           }),
//           fill: new Fill({
//             color: 'rgba(100, 221, 123, 0.5)' // Мягкий зеленый
//           })
//         });
//       }
      
//       // Стиль для невыделенных стран
//       return new Style({
//         stroke: new Stroke({
//           color: '#666',
//           width: 0.7
//         }),
//         fill: new Fill({
//           color: 'rgba(200, 200, 200, 0.2)'
//         })
//       });
//     }
//   });

//   map.addLayer(countriesLayer);
//   setupClickHandler(); 
// }

// function setupClickHandler() {
//   let clickTimeout;
  
//   map.on('click', function (evt) {
//     if (clickTimeout) {
//       clearTimeout(clickTimeout);
//     }
    
//     clickTimeout = setTimeout(() => {
//       let found = false;
//       map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
//         if (layer !== countriesLayer) return;

//         const code = feature.get('ISO3166-1-Alpha-3'); 
//         if (!code) return;

//         const country = countryData.find(c => c.code === code);
//         if (country) {
//           currentTooltipCountry = country;
          
//           const lawInfo = code === 'HUN'
//             ? '<span class="law-canceled">Закон был отменен</span>'
//             : `<a href="${country.lawLink}" target="_blank">Ссылка на закон</a>`;
          
//           tooltipContent.innerHTML = `
//             <div>
//               <strong>${country.name}</strong><br/>
//               ${lawInfo}
//             </div>
//           `;
//           overlay.setPosition(evt.coordinate);
//           found = true;
//         }
//       });

//       if (!found) {
//         overlay.setPosition(undefined);
//         currentTooltipCountry = null;
//       }
//     }, 50);
//   });

//   map.on('pointermove', function (evt) {
//     const hit = map.hasFeatureAtPixel(evt.pixel);
//     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
//   });
// }
// import './style.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
// import { Style, Stroke, Fill } from 'ol/style';
// import Overlay from 'ol/Overlay';

// let countryData = [];
// let hihlightCodes = new Set();
// let countriesLayer;
// let currentTooltipCountry = null;

// // Для режима разработки и production
// const isDev = import.meta.env.MODE === 'development';
// const dataUrl = isDev ? '/data.json' : './data.json';
// const geojsonUrl = isDev ? '/countries.geojson' : './countries.geojson';

// fetch(dataUrl)
//   .then(response => {
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return response.json();
//   })
//   .then(data => {
//     countryData = data;
//     hihlightCodes = new Set(countryData.map(c => c.code));
//     loadCountries();
//   })
//   .catch(error => {
//     console.error('Ошибка при загрузке data.json:', error);
//   });

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });

// // Создаем тултип
// const tooltipContainer = document.createElement('div');
// tooltipContainer.className = 'tooltip-container';
// document.body.appendChild(tooltipContainer);

// const tooltipContent = document.createElement('div');
// tooltipContent.className = 'tooltip-content';
// tooltipContainer.appendChild(tooltipContent);

// const overlay = new Overlay({
//   element: tooltipContainer,
//   positioning: 'bottom-center',
//   stopEvent: true,
//   offset: [0, -15]
// });
// map.addOverlay(overlay);

// // Обработчик кликов по тултипу
// tooltipContent.addEventListener('click', function(e) {
//   if (e.target.tagName === 'A' && currentTooltipCountry && 
//       currentTooltipCountry.code !== 'HUN' && currentTooltipCountry.code !== 'CZE') {
//     window.open(currentTooltipCountry.lawLink, '_blank');
//   }
// });

// function loadCountries() {
//   const countriesSource = new VectorSource({
//     url: geojsonUrl,
//     format: new GeoJSON({
//       dataProjection: 'EPSG:4326',
//       featureProjection: 'EPSG:3857'
//     })
//   });

//   countriesLayer = new VectorLayer({
//     source: countriesSource,
//     style: function(feature) {
//       const code = feature.get('ISO3166-1-Alpha-3') || feature.get('ISO_A3');
//       const isHighlighted = hihlightCodes.has(code);
      
//       // Специальные стили для отдельных стран
//       if (code === 'HUN') { // Венгрия - красный
//         return new Style({
//           stroke: new Stroke({
//             color: '#7a0000',
//             width: 1.5
//           }),
//           fill: new Fill({
//             color: 'rgba(255, 100, 100, 0.6)'
//           })
//         });
//       }
      
//       if (code === 'CZE') { // Чехия - желтый
//         return new Style({
//           stroke: new Stroke({
//             color: '#8d6e00',
//             width: 1.5
//           }),
//           fill: new Fill({
//             color: 'rgba(255, 213, 79, 0.7)' // Яркий желтый
//           })
//         });
//       }
      
//       // Стандартный стиль для выделенных стран
//       if (isHighlighted) {
//         return new Style({
//           stroke: new Stroke({
//             color: '#2e7d32',
//             width: 1
//           }),
//           fill: new Fill({
//             color: 'rgba(100, 221, 123, 0.5)' // Мягкий зеленый
//           })
//         });
//       }
      
//       // Стиль для невыделенных стран
//       return new Style({
//         stroke: new Stroke({
//           color: '#666',
//           width: 0.7
//         }),
//         fill: new Fill({
//           color: 'rgba(200, 200, 200, 0.2)'
//         })
//       });
//     }
//   });

//   map.addLayer(countriesLayer);
//   setupClickHandler();
// }

// function setupClickHandler() {
//   let clickTimeout;
  
//   map.on('click', function(evt) {
//     if (clickTimeout) clearTimeout(clickTimeout);
    
//     clickTimeout = setTimeout(() => {
//       let found = false;
//       map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
//         if (layer !== countriesLayer) return;

//         const code = feature.get('ISO3166-1-Alpha-3');
//         if (!code) return;

//         const country = countryData.find(c => c.code === code);
//         if (country) {
//           currentTooltipCountry = country;
          
//           // Генерация текста в зависимости от страны
//           let lawInfo;
//           let lawInfoSecond;
//           if (code === 'HUN') {
//             lawInfo = '<span class="law-canceled">Закон был отменен</span>';
//           } else if (code === 'CZE') {
//             lawInfo = '<span class="law-changed">Закон ещё не вступил в&nbsp;силу</span>';
//           } else {
//             lawInfo = `<a href="${country.lawLink}" target="_blank">Ссылка на закон</a>`;
//             lawInfoSecond = `<a href="${country.lawLinkSecond}" target="_blank">Ссылка на закон</a>`;
//           }
          
//           tooltipContent.innerHTML = `
//             <div>
//               <strong>${country.name}</strong><br/>
//               ${lawInfo}
//               ${lawInfo}Second}
//             </div>
//           `;
//           overlay.setPosition(evt.coordinate);
//           found = true;
//         }
//       });

//       if (!found) {
//         overlay.setPosition(undefined);
//         currentTooltipCountry = null;
//       }
//     }, 50);
//   });

//   map.on('pointermove', function(evt) {
//     const hit = map.hasFeatureAtPixel(evt.pixel);
//     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
//   });
// }
import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
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
let currentTooltipCountry = null;

// Для режима разработки и production
const isDev = import.meta.env.MODE === 'development';
const dataUrl = isDev ? '/data.json' : './data.json';
const geojsonUrl = isDev ? '/countries.geojson' : './countries.geojson';

fetch(dataUrl)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    countryData = data;
    hihlightCodes = new Set(countryData.map(c => c.code));
    loadCountries();
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

// Создаем тултип
const tooltipContainer = document.createElement('div');
tooltipContainer.className = 'tooltip-container';
document.body.appendChild(tooltipContainer);

const tooltipContent = document.createElement('div');
tooltipContent.className = 'tooltip-content';
tooltipContainer.appendChild(tooltipContent);

const overlay = new Overlay({
  element: tooltipContainer,
  positioning: 'bottom-center',
  stopEvent: true,
  offset: [0, -15]
});
map.addOverlay(overlay);

// Обработчик кликов по тултипу
tooltipContent.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && currentTooltipCountry) {
    e.preventDefault();
    window.open(e.target.href, '_blank');
  }
});

function loadCountries() {
  const countriesSource = new VectorSource({
    url: geojsonUrl,
    format: new GeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  });

  countriesLayer = new VectorLayer({
    source: countriesSource,
    style: function(feature) {
      const code = feature.get('ISO3166-1-Alpha-3') || feature.get('ISO_A3');
      const isHighlighted = hihlightCodes.has(code);
      
      // Специальные стили для отдельных стран
      if (code === 'HUN') { // Венгрия - красный
        return new Style({
          stroke: new Stroke({
            color: '#7a0000',
            width: 1.5
          }),
          fill: new Fill({
            color: 'rgba(255, 100, 100, 0.6)'
          })
        });
      }
      
      if (code === 'CZE') { // Чехия - желтый
        return new Style({
          stroke: new Stroke({
            color: '#8d6e00',
            width: 1.5
          }),
          fill: new Fill({
            color: 'rgba(255, 213, 79, 0.7)'
          })
        });
      }
      
      // Стандартный стиль для выделенных стран
      if (isHighlighted) {
        return new Style({
          stroke: new Stroke({
            color: '#2e7d32',
            width: 1
          }),
          fill: new Fill({
            color: 'rgba(100, 221, 123, 0.5)'
          })
        });
      }
      
      // Стиль для невыделенных стран
      return new Style({
        stroke: new Stroke({
          color: '#666',
          width: 0.7
        }),
        fill: new Fill({
          color: 'rgba(200, 200, 200, 0.2)'
        })
      });
    }
  });

  map.addLayer(countriesLayer);
  setupClickHandler();
}

function setupClickHandler() {
  let clickTimeout;
  
  map.on('click', function(evt) {
    if (clickTimeout) clearTimeout(clickTimeout);
    
    clickTimeout = setTimeout(() => {
      let found = false;
      map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        if (layer !== countriesLayer) return;

        const code = feature.get('ISO3166-1-Alpha-3');
        if (!code) return;

        const country = countryData.find(c => c.code === code);
        if (country) {
          currentTooltipCountry = country;
          
          // Генерация текста в зависимости от страны
          let lawInfo;
          if (code === 'HUN') {
            lawInfo = '<span class="law-canceled">Закон был отменен</span>';
          } else if (code === 'CZE') {
            lawInfo = '<span class="law-changed">Закон ещё не вступил в силу</span>';
          } else {
            // Основная ссылка
            lawInfo = `<a href="${country.lawLink}" target="_blank">Ссылка на закон</a>`;
            
            // Если есть вторая ссылка
            if (country.lawLink2) {
              lawInfo += `<br/><a href="${country.lawLink2}" target="_blank" class="second-link">Доп. ссылка</a>`;
            }
          }
          
          tooltipContent.innerHTML = `
            <div>
              <strong>${country.name}</strong><br/>
              ${lawInfo}
            </div>
          `;
          overlay.setPosition(evt.coordinate);
          found = true;
        }
      });

      if (!found) {
        overlay.setPosition(undefined);
        currentTooltipCountry = null;
      }
    }, 50);
  });

  map.on('pointermove', function(evt) {
    const hit = map.hasFeatureAtPixel(evt.pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  });
}