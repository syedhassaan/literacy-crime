//Color Legend code

var promises = [];
promises.push(d3.csv("merged_dataset.csv"));

var crime_data = [];
var edu_data = [];

Promise.all(promises).then(function (values) {
  var data = values[0];
  data = d3.filter(data, d=> {
    return d.Series_x == "Intentional homicide rates per 100,000" & d.Series_y == 'Gross enrollment ratio - Tertiary (male)' & (d.Year == '2010' || d.Year == '2017');
  } )
  data = d3.map(data, d => {
    return {'region':d.Region, 'year':+d.Year, 'crime':d.Series_x, 'crime_value':+d.Value_x, 'edu':d.Series_y, 'edu_value':+d.Value_y}
  })
  crime_data = d3.map(data, d=> {
    return {'region':d.region, 'crime_value':+d.crime_value};
  } )
  edu_data = d3.map(data, d=> {
    return {'region':d.region, 'edu_value':+d.edu_value};
  } )
})

function legend({
  color,
  title,
  tickSize = 6,
  width = 320,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) { 

  const svg = d3.create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .style("overflow", "visible")
  .style("display", "block");

  let x;

    // Continuous
    if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        { range() { return [marginLeft, width - marginRight]; } });

      svg.append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

        //scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
          if (tickValues === undefined) {
            const n = Math.round(ticks + 1);
            tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
          }
          if (typeof tickFormat !== "function") {
            tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
          }
        }
      }

    //discrete
    else if (color.invertExtent) {
      const thresholds
            = color.thresholds ? color.thresholds() // scaleQuantize
                : color.quantiles ? color.quantiles() // scaleQuantile
                    : color.domain(); // scaleThreshold

                    const thresholdFormat
                    = tickFormat === undefined ? d => d
                    : typeof tickFormat === "string" ? d3.format(tickFormat)
                    : tickFormat;

                    x = d3.scaleLinear()
                    .domain([-1, color.range().length - 1])
                    .rangeRound([marginLeft, width - marginRight]);

                    svg.append("g")
                    .selectAll("rect")
                    .data(color.range())
                    .join("rect")
                    .attr("x", (d, i) => x(i - 1))
                    .attr("y", marginTop)
                    .attr("width", (d, i) => x(i) - x(i - 1))
                    .attr("height", height - marginTop - marginBottom)
                    .attr("fill", d => d);

                    tickValues = d3.range(thresholds.length);
                    tickFormat = i => thresholdFormat(thresholds[i], i);
                  }

                  svg.append("g")
                  .attr("transform", `translate(0, ${height - marginBottom})`)
                  .call(d3.axisBottom(x)
                    .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                    .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
                    .tickSize(tickSize)
                    .tickValues(tickValues))
                  .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
                  .call(g => g.select(".domain").remove())
                  .call(g => g.append("text")
                    .attr("y", marginTop + marginBottom - height - 6)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .text(title));

                  return svg.node();
                }

                function ramp(color, n = 256) {
                  const canvas = DOM.canvas(n, 1);
                  const context = canvas.getContext("2d");
                  for (let i = 0; i < n; ++i) {
                    context.fillStyle = color(i / (n - 1));
                    context.fillRect(i, 0, 1, 1);
                  }
                  return canvas;
                }

// data_range = d3.extent(year_data, (d) => +d.val)
// f = d3.format(".0f");
// color = d3.scaleQuantize([f(data_range[0]), f(data_range[1])], d3.schemeSpectral[10])
var color = d3.scaleLinear()
.domain([10, 100])
.range(["brown", "steelblue"]);



var country1 = '';
var country2 = '';
mapboxgl.accessToken = 'pk.eyJ1Ijoidmlja3l5dTEiLCJhIjoiY2t2NmQwNmc4N3k2bzJwdDkzZWwzbHc3eCJ9.KxcdAHpuTCIzOSIKyR7dDQ';

var map = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [5, 46],
  zoom: 1
});

map.on('load', function() {
  map.addLayer(
  {
    id: 'country-boundaries',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.country-boundaries-v1',
    },
    'source-layer': 'country_boundaries',
    type: 'fill',
    paint: {
      'fill-color': '#d2361e',
      'fill-opacity': 0.4,
    },
  },
  'country-label'
  );

  // map.setFilter('country-boundaries', [
  //   "in",
  //   "name_en",
  //   // 'USA',
  //   // 'ITA'
  //   country1,
  //   country2
  // ]);
  // map.setFilter('country-boundaries', ['==', ['get', 'name'], 'United States']);
  // map.setFilter('country-boundaries', ['==', ['get', 'name'], ['United States', 'Australia']]);
  // var filters = ["all",
  // ['==', ['get', 'name'], 'United States'],
  // ['==', ['get', 'name'], 'Australia'],
  // ];
  resetFilter();
});

var map2 = new mapboxgl.Map({
  container: 'map3',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [5, 46],
  zoom: 1
});

map2.on('load', function() {
  map2.addLayer(
  {
    id: 'country-boundaries-2',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.country-boundaries-v1',
    },
    'source-layer': 'country_boundaries',
    type: 'fill',
    paint: {
      'fill-color': '#d2361e',
      'fill-opacity': 0.4,
    },
  },
  'country-label'
  );
  resetFilter();
});

const setCountry1 = (country) => {
  country1 = country;
  console.log(country1);
  resetFilter();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML =
      // this.responseText;
      const data = JSON.parse(this.responseText);
      const bbox = data.features[0].bbox;
      map.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]]
        ]);
      // map2.fitBounds([
      //   [bbox[0], bbox[1]],
      //   [bbox[2], bbox[3]]
      //   ]);

      console.log(edu_data)
      let obj_edu = edu_data.find(o => o.region === country);
      let obj_crime = crime_data.find(o => o.region === country);
      // console.log(obj)
      map.addSource('places-' + country, {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
          {
            'type': 'Feature',
            'properties': {
              'description':
              'Crime rate in ' + country + ": " + '<strong>' + (obj_crime ? obj_crime.crime_value : "No data available") + '</strong>' 
            },
            'geometry': {
              'type': 'Point',
              'coordinates': data.features[0].center
            }
          }]
        }
      });
      map.addLayer({
        'id': 'places-' + country,
        'type': 'circle',
        'source': 'places-' + country,
        'paint': {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });
      // map2.addSource('places-' + country, {
      //   'type': 'geojson',
      //   'data': {
      //     'type': 'FeatureCollection',
      //     'features': [
      //     {
      //       'type': 'Feature',
      //       'properties': {
      //         'description':
      //         'Education rate in ' + country + ": " + '<strong>' + (obj_edu ? obj_edu.edu_value : "No data available") + '</strong>' 
      //       },
      //       'geometry': {
      //         'type': 'Point',
      //         'coordinates': data.features[0].center
      //       }
      //     }]
      //   }
      // });
      // map2.addLayer({
      //   'id': 'places-' + country,
      //   'type': 'circle',
      //   'source': 'places-' + country,
      //   'paint': {
      //     'circle-color': '#4264fb',
      //     'circle-radius': 6,
      //     'circle-stroke-width': 2,
      //     'circle-stroke-color': '#ffffff'
      //   }
      // });




      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mouseenter', 'places-' + country, (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });

      map.on('mouseleave', 'places-' + country, () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      // map2.on('mouseenter', 'places-' + country, (e) => {
      //   // Change the cursor style as a UI indicator.
      //   map2.getCanvas().style.cursor = 'pointer';
      //   // Copy coordinates array.
      //   const coordinates = e.features[0].geometry.coordinates.slice();
      //   const description = e.features[0].properties.description;

      //   // Ensure that if the map is zoomed out such that multiple
      //   // copies of the feature are visible, the popup appears
      //   // over the copy being pointed to.
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //   }

      //   // Populate the popup and set its coordinates
      //   // based on the feature found.
      //   popup.setLngLat(coordinates).setHTML(description).addTo(map2);
      // });

      // map2.on('mouseleave', 'places-' + country, () => {
      //   map2.getCanvas().style.cursor = '';
      //   popup.remove();
      // });
    }
  };
  xhttp.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/"+country1+".json?access_token="+mapboxgl.accessToken, true);
  xhttp.send();
}


const setCountry2 = (country) => {
  country2 = country;
  console.log(country1);
  resetFilter();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML =
      // this.responseText;
      const data = JSON.parse(this.responseText);
      const bbox = data.features[0].bbox;
      // map.fitBounds([
      //   [bbox[0], bbox[1]],
      //   [bbox[2], bbox[3]]
      //   ]);
      map2.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]]
        ]);

      console.log(edu_data)
      let obj_edu = edu_data.find(o => o.region === country);
      let obj_crime = crime_data.find(o => o.region === country);
      // console.log(obj)
      // map.addSource('places-' + country, {
      //   'type': 'geojson',
      //   'data': {
      //     'type': 'FeatureCollection',
      //     'features': [
      //     {
      //       'type': 'Feature',
      //       'properties': {
      //         'description':
      //         'Crime rate in ' + country + ": " + '<strong>' + (obj_crime ? obj_crime.crime_value : "No data available") + '</strong>' 
      //       },
      //       'geometry': {
      //         'type': 'Point',
      //         'coordinates': data.features[0].center
      //       }
      //     }]
      //   }
      // });
      // map.addLayer({
      //   'id': 'places-' + country,
      //   'type': 'circle',
      //   'source': 'places-' + country,
      //   'paint': {
      //     'circle-color': '#4264fb',
      //     'circle-radius': 6,
      //     'circle-stroke-width': 2,
      //     'circle-stroke-color': '#ffffff'
      //   }
      // });
      map2.addSource('places-' + country, {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
          {
            'type': 'Feature',
            'properties': {
              'description':
              'Education rate in ' + country + ": " + '<strong>' + (obj_edu ? obj_edu.edu_value : "No data available") + '</strong>' 
            },
            'geometry': {
              'type': 'Point',
              'coordinates': data.features[0].center
            }
          }]
        }
      });
      map2.addLayer({
        'id': 'places-' + country,
        'type': 'circle',
        'source': 'places-' + country,
        'paint': {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });




      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      // map.on('mouseenter', 'places-' + country, (e) => {
      //   // Change the cursor style as a UI indicator.
      //   map.getCanvas().style.cursor = 'pointer';
      //   // Copy coordinates array.
      //   const coordinates = e.features[0].geometry.coordinates.slice();
      //   const description = e.features[0].properties.description;

      //   // Ensure that if the map is zoomed out such that multiple
      //   // copies of the feature are visible, the popup appears
      //   // over the copy being pointed to.
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //   }

      //   // Populate the popup and set its coordinates
      //   // based on the feature found.
      //   popup.setLngLat(coordinates).setHTML(description).addTo(map);
      // });

      // map.on('mouseleave', 'places-' + country, () => {
      //   map.getCanvas().style.cursor = '';
      //   popup.remove();
      // });

      map2.on('mouseenter', 'places-' + country, (e) => {
        // Change the cursor style as a UI indicator.
        map2.getCanvas().style.cursor = 'pointer';
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map2);
      });

      map2.on('mouseleave', 'places-' + country, () => {
        map2.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
  };
  xhttp.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/"+country2+".json?access_token="+mapboxgl.accessToken, true);
  xhttp.send();
}

// const setCountry2 = (country) => {
//   country2 = country;
//   console.log(country2);
//   resetFilter();
// }

const resetFilter = () => {
  // var filters = ["all",
  // ['in','name', country1, country2]
  // ];
  map.setFilter('country-boundaries', ['in','name_en', country1]);
  map2.setFilter('country-boundaries-2', ['in','name_en', country2]);
}


