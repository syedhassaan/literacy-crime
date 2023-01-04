/////////////////////////////////////////////////////////////
//Color Legend code
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

/////////////////////////////////////////////////////////////
//Choropleth code
var promises = [];

promises.push(d3.json("countries-50m.json"));
promises.push(d3.csv("merged_dataset.csv"));

Promise.all(promises).then(function (values) {
    var world = values[0];
    var data = values[1];
    console.log("WORLD", world)
    console.log("DATA", data)
    var height = 610;
    var width = 975;

    data = d3.filter(data, d=> {
        return d.Series_x == "Intentional homicide rates per 100,000" & d.Series_y == 'Gross enrollment ratio - Tertiary (male)';
    } )

    data = d3.map(data, d => {
        return {'region':d.Region, 'year':+d.Year, 'crime':d.Series_x, 'crime_value':+d.Value_x, 'edu':d.Series_y, 'edu_value':+d.Value_y}
    })

    // console.log(data)

    // make dropdown menu for 
    options = [... new Set(data.map(d => d.crime))].concat([... new Set(data.map(d => d.edu))])
    // console.log(options)
    var data_choice = options[0];
    console.log(data_choice)
    draw_map(data_choice)

    var dropDown = d3.select("#dropdown_container")
        .append("select")
        .attr("class", "selection")
        .attr("name", "options");
    var options = dropDown.selectAll("option")
        .data(options)
        .enter()
        .append("option");
    options.text(function(d) {
            return d;
        })
    dropDown.on("change", menuChanged);

    function menuChanged(){

        var selection = this.value;
    
        console.log('selection', selection)
    
        draw_map(selection)
    }

        
    function draw_map(choice){
        // get selected data
        crime_data = d3.filter(data, d=> {
            return d.crime == choice;
        } )
        edu_data = d3.filter(data, d=> {
            return d.edu == choice;
        } )

        if (crime_data.length > 0) {
            map_data = d3.map(data, d => {
                return {'region':d.region, 'year':+d.year, 'val':+d.crime_value}
            })
            console.log('Crime data')
            console.log(choice)
            console.log(map_data)
        }
        else if (edu_data.length > 0){
            map_data = d3.map(data, d => {
                return {'region':d.region, 'year':+d.year, 'val':+d.edu_value}
            })
            console.log('Edu data')
            console.log(choice)
            console.log(map_data)
        }
        else {
            // Should not enter here
            choice = "Intentional homicide rates per 100,000"
            console.log('Default Choice');
            map_data = d3.map(data, d => {
                return {'region':d.region, 'year':+d.year, 'val':+d.crime_value}
            })
            console.log(choice)
            console.log(map_data)
        }

        // draw map based on data
        countries = new Map(world.objects.countries.geometries.map(d => [d.id, d.properties]));

        var selected_year = d3.median(map_data, (d) => d.year);

        year_data = d3.filter(map_data, d=> {
            return d.year == selected_year;
        } )
        // console.log(selected_year);
        draw_data = Object.assign(
            new Map(year_data.map((d) => [d.region, +d.val])
            )
        );

        // console.log(year_data)
        // console.log(d3.extent(year_data, (d) => +d.val))
        data_range = d3.extent(year_data, (d) => +d.val)
        f = d3.format(".0f");
        // console.log([f(data_range[0]), f(data_range[1])]);
        color = d3.scaleQuantize([f(data_range[0]), f(data_range[1])], d3.schemeSpectral[10])

        land_feats = topojson.feature(world, world.objects.land);
        country_feats = topojson.feature(world, world.objects.countries);

        var project = d3.geoEquirectangular()
            .fitSize([width, height], land_feats)
    
        path = d3.geoPath()
            .projection(project);
        
        var chart_selection = d3.select('#chart');
        chart_selection.selectAll('*').remove();

        var svg = d3.select("#chart")
            .attr("viewBox", [0, 0, width, height]);

        svg.append("path")
            .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))  //🎒 explain: add geopath for all the borders of the staes to the svg
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path);

        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)  //🎒 explain: create map based on id and rate
            .join("path")
            .attr("fill", d => color(draw_data.get(d.properties.name)))  //🎒 explain: fill color for the path based on id and color scale
            .attr("d", path)
            .append("title")
            .text(d => {
            `${d.properties.name}, ${draw_data.get(d.properties.name)}`
            console.log(draw_data.get(d.properties.name));
            console.log(draw_data)
            });  //🎒 explain: set tooltip for when hovering
            

        svg.append("g")
            .attr("transform", "translate(670,20)")
            .append(() => legend({ color, title: choice, width: 260 }));

        // make slider for selected data
        year_range = d3.extent(map_data, (d) => d.year);
        // console.log(year_range);
        years_ls = d3.range(year_range[0], year_range[1]+1);
        // console.log(years_ls);
        scale = d3.scaleLinear().domain([year_range[0], year_range[1]+1]);
        // console.log(scale.domain())

        var dataTime = d3.range(year_range[0], year_range[1]+1).map(function(d) {
            return new Date(d, 10, 3);
        });

        var sliderTime = d3
            .sliderBottom()
            .min(d3.min(dataTime))
            .max(d3.max(dataTime))
            .step(1000 * 60 * 60 * 24 * 365)
            .width(700)
            .tickFormat(d3.timeFormat('%Y'))
            .tickValues(dataTime)
            .default(new Date(d3.median(map_data, (d) => d.year), 10, 3))
            .on('end', val => {
                // do transition
                // console.log(val.getFullYear())
                update(val.getFullYear())
            });

        var slider_selection = d3.select('#slider');
        slider_selection.selectAll('*').remove();
        
        var gTime = slider_selection
            .append('svg')
            .attr('width', 975)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');

        
        gTime.call(sliderTime);
        
        function update(new_year){
            year_data = d3.filter(map_data, d=> {
                return d.year == new_year;
            } )
            
            console.log('year_data', year_data)
            draw_data = Object.assign(
                new Map(year_data.map((d) => [d.region, +d.val])
                )
            );
            console.log('map_data', map_data)
            console.log('year_data', year_data)
            console.log('draw_data', draw_data)

            // console.log(draw_data)
            var chart_selection = d3.select('#chart');
            chart_selection.selectAll('*').remove();
    
            var svg = d3.select("#chart")
                .attr("viewBox", [0, 0, width, height]);
    
            svg.append("path")
                .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))  //🎒 explain: add geopath for all the borders of the staes to the svg
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path);
    
            svg.append("g")
                .selectAll("path")
                .data(topojson.feature(world, world.objects.countries).features)  //🎒 explain: create map based on id and rate
                .join("path")
                .attr("fill", d => color(draw_data.get(d.properties.name)))  //🎒 explain: fill color for the path based on id and color scale
                .attr("d", path)
                .append("title")
                .text(d => `${d.properties.name}, ${draw_data.get(d.properties.name)}`);  //🎒 explain: set tooltip for when hovering
                
    
            svg.append("g")
                .attr("transform", "translate(670,20)")
                .append(() => legend({ color, title: choice, width: 260 }));

        }
    
        
    }

})





