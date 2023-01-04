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
} = {}) {  //🎒 explain:

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

var key = ["60-90", "91-120", "121-150", "151-180"]
var colors = d3.scaleOrdinal()
.domain(key)
.range(["#F0FFFF", "#89CFF0", "#0096FF", "#0047AB"]);

var svg = d3.select('#legend');

svg.selectAll('keys')
    .data(key)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return i * 70;
    })
    .attr('y', 10)
    .attr('width', 70)
    .attr('height', 20)
    .attr('fill', d => colors(d));

svg.selectAll('keys')
    .data(key)
    .enter()
    .append('text')
    .attr('x', (d, i) => {
        return i * 70;
    })
    .attr('y', 50)
    .text(d=>d)
    .style("font-size", "14px") ;

mapboxgl.accessToken = 'pk.eyJ1Ijoidmlja3l5dTEiLCJhIjoiY2t2NmQwNmc4N3k2bzJwdDkzZWwzbHc3eCJ9.KxcdAHpuTCIzOSIKyR7dDQ';
const map2 = new mapboxgl.Map({
    container: 'map2', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-118.285, 34.0224], // starting position [lng, lat]
    zoom: 14 // starting zoom
});

const marker1 = new mapboxgl.Marker()
.setLngLat([-118.285, 34.0224])
.addTo(map2);

// let data = d3.json('data/map.geojson').then(json => {
//     // json = topojson.feature(json, json.objects.Living_Wage_2017_projected);
//     console.log(json)
//     console.log(json?.features)

//     data = json.features
//     console.log(data)

//     data = Object.assign(new Map(data.map((d) => [d.properties.BLD_ID, +d.properties.HEIGHT] )));  //🎒 explain: modify the data, crreate lookup map based on id and rate to query data as needed
// 	console.log(data)
//     return data
// })

map2.on('load', function () {
    map2.addSource('footprints_source1', {
        type: 'geojson',
        data: 'data/building1.geojson'
    });

    map2.addLayer({
        'id': 'map1',
        'type': 'fill',
        'source': 'footprints_source1',
        'layout': {},
        'paint': {
            'fill-color': '#F0FFFF',
            'fill-opacity': 0.8
        }
    });

    map2.addSource('footprints_source2', {
        type: 'geojson',
        data: 'data/building2.geojson'
    });

    map2.addLayer({
        'id': 'map2',
        'type': 'fill',
        'source': 'footprints_source2',
        'layout': {},
        'paint': {
            'fill-color': '#0000FF',
            'fill-opacity': 0.8
        }
    });

    map2.addSource('footprints_source3', {
        type: 'geojson',
        data: 'data/building3.geojson'
    });

    map2.addLayer({
        'id': 'map3',
        'type': 'fill',
        'source': 'footprints_source3',
        'layout': {},
        'paint': {
            'fill-color': '#89CFF0',
            'fill-opacity': 0.8
        }
    });

    map2.addSource('footprints_source4', {
        type: 'geojson',
        data: 'data/building4.geojson'
    });

    map2.addLayer({
        'id': 'map4',
        'type': 'fill',
        'source': 'footprints_source4',
        'layout': {},
        'paint': {
            'fill-color': '#F0FFFF',
            'fill-opacity': 0.8
        }
    });

    map2.addSource('footprints_source5', {
        type: 'geojson',
        data: 'data/building5.geojson'
    });

    map2.addLayer({
        'id': 'map5',
        'type': 'fill',
        'source': 'footprints_source5',
        'layout': {},
        'paint': {
            'fill-color': '#F0FFFF',
            'fill-opacity': 0.8
        }
    });


});