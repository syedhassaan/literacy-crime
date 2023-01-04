    function enableReset(){
        d3.select('#reset').style('opacity',"100%");
    }
    function disableReset(){
        d3.select('#reset').style('opacity',"50%");
    }


      var margin = { top: 100, left: 75, bottom: 60, right: 50 },
        width = 850 - margin.left - margin.right,
        height = 510 - margin.top - margin.bottom;

      var svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      var x = d3.scaleBand();
      var y = d3.scaleLinear();

      var xAxis;


      var delay = function (d, i) {
        return i * 50;
      };

      var all, closer, farther, earth;
      var current, sortMode, filterMode;

    //   d3.tsv('planets.tsv', d => {
    //     return {
    //       name: d.name,
    //       gravity: +d.gravity,
    //       temperature: +d.temperature,
    //       distance: +d.distance,
    //     };
    //   }).then(data => {

    d3.json('my_data.json').then(data =>{

        data = data.sort((a, b) => d3.ascending(a.name, b.name))
        console.log(data)

        all = data;
        console.log(JSON.stringify(all));

        //🎒 set earth using array.find here
        // console.log(data);
        // earth = data.find(d => d.name = "EARTH")
        sorted_data = data.slice().sort((a, b) => d3.ascending(a.gravity, b.gravity))

        //🎒 set closer to the 4 planets closest to the sun using array.slice here
        farther = sorted_data.slice(0,5)
        console.log(farther)
        //🎒 set farther to the 4 planets farthest from the sun using array.slice here
        closer = sorted_data.slice(5,10)
        console.log(closer)

        filter('#all');
        sort('#distance');

        toggleFilter('#all');
        toggleSort('#distance');

        draw();
      });

      //sort event handlers
      d3.select('#distance')
        .on('click', () => {
        enableReset()
          sort('#distance');
          transition();
          toggleSort('#distance');
        });

      d3.select('#temperature')
        .on('click', () => {
            enableReset()

          sort('#temperature');
          transition();
          toggleSort('#temperature');
        });
        d3.select('#gravity')
        .on('click', () => {
            enableReset()

          sort('#gravity');
          transition();
          toggleSort('#gravity');
        });
        d3.select('#reset')
        .on('click', () => {
            disableReset()

            filter('#all');
        //   includeEarth(d3.select('input').property('checked'));
          sort('#distance');
          transition_X();
          toggleSort('#distance');
          toggleFilter('#all');

          redraw();

        });
      //🎒 implement click events to sort by temperature and gravity here (same as click event for distance)
    
      ////

      //filter event handlers
      d3.select('#all')
        .on('click', () => {
            enableReset()

          filter('#all');
        //   includeEarth(d3.select('input').property('checked'));
          sort(sortMode);
          transition_X();
          toggleSort(sortMode);
          toggleFilter('#all');

          redraw();
        });

      d3.select('#closer')
        .on('click', () => {
            enableReset()

          filter('#closer');
        //   includeEarth(d3.select('input').property('checked'));
          sort(sortMode);
          transition_X();
          toggleSort(sortMode);
          toggleFilter('#closer');

          redraw();
        });

      d3.select('#farther')
        .on('click', () => {
            enableReset()

          filter('#farther');
          sort(sortMode);
          transition_X();
          toggleSort(sortMode);
          toggleFilter('#farther');

          redraw();
        });

    //   function includeEarth(includeEarth) {
    //     if (filterMode === '#all') {
    //       var index = current
    //         .map(d => d.name)
    //         .indexOf('EARTH');

    //       if (index == -1 && includeEarth) {  //not found
    //         current.push(earth);
    //       } else if (!includeEarth) {
    //         current.splice(index, 1); //remove Earth
    //       }
    //     } else if (filterMode === '#closer') {
    //       if (!includeEarth) {
    //         current = JSON.parse(JSON.stringify(all));

    //         var index = current
    //           .map(d => d.name)
    //           .indexOf('EARTH');
    //         if (index != -1) {
    //           current.splice(index, 1); //remove Earth
    //         }

    //         current = current.slice(0, 4);
    //       } else {
    //         current = JSON.parse(JSON.stringify(closer));
    //       }
    //     }
    //   }

      function filter(mode) {
        if (mode === '#all') {
          current = JSON.parse(JSON.stringify(all));
        } else if (mode === '#closer') {
          current = JSON.parse(JSON.stringify(closer));
        } else if (mode === '#farther') {
          current = JSON.parse(JSON.stringify(farther));
        }
        filterMode = mode;
      }

      function sort(mode) {
        if (mode === '#distance') {
          current.sort((a, b) => d3.ascending(a.name, b.name));
        } else if (mode === '#gravity') {
          current.sort((a, b) => d3.descending(a.gravity, b.gravity));
        } else if (mode === '#temperature') {
          current.sort((a, b) => d3.ascending(a.gravity, b.gravity));
        }
        x.domain(current.map(d => d.name));
        sortMode = mode;
      }

      function toggleSort(id) {
        d3.selectAll('.sort')
          .style('background-color', '#eee');
        d3.select(id)
          .style('background-color', 'lightblue');
      }

      //🎒 implement toggleFilter to highlight buttons with class .filter here (same as toggleSort with class .sort)
      function toggleFilter(id) {
        d3.selectAll('.filter')
          .style('background-color', '#eee');
        d3.select(id)
          .style('background-color', 'lightblue');

      }
      ///

      function redraw() {
        //update scale
        x.domain(current.map(d => d.name));

        ////////////////////////////////
        // DATA JOIN FOR BARS.
        var bars = svg.selectAll('.bar')
          .data(current, d => d.name);

        // UPDATE.
        bars.transition()
          .duration(750)
          .delay(delay)
          .attr('x', d => x(d.name))
          .attr('width', x.bandwidth());

        // ENTER.
        bars.enter()
          .append('rect')
          .attr('x', d => x(d.name))
          .attr('y', d => y(0))
          .attr('width', x.bandwidth())
          .transition()
          .duration(750)
          .attr('class', 'bar')
          .attr('x', d => x(d.name))
          .attr('y', d => y(d.gravity))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.gravity));

        // EXIT.
        bars.exit()
          .transition()
          .duration(750)
          .style('opacity', 0)
          .remove();

        ////////////////////////////////
        // DATA JOIN FOR NAMES.
        var name = svg.selectAll('.name')
          .data(current, d => d.name);

        // UPDATE.
        name.transition()
          .duration(750)
          .delay(delay)
          .attr('x', (d, i) => x(d.name) + x.bandwidth() / 2);

        // ENTER.
        name.enter()
          .append('text')
          .attr('x', d => x(d.name) + x.bandwidth() / 2)
          .attr('y', d => y(d.gravity) + (height - y(d.gravity)) / 2)
          .style('opacity', 0)
          .transition()
          .duration(1000)
          .text(d => d.name)
          .attr('class', 'name')
          .attr('style', d => d.name === 'EARTH' ? 'fill: red' : '')
          .attr('x', d => x(d.name) + x.bandwidth() / 2)
          .attr('y', d => y(d.gravity) + (height - y(d.gravity)) / 2)
          .style('opacity', 1);

        // EXIT.
        name.exit()
          .transition()
          .duration(750)
          .style('opacity', 0)
          .remove();
      }

      function transition() {
        var transition = svg.transition()
          .duration(750);

        transition.selectAll('.bar')
          .delay(delay)
          .attr('x', d => x(d.name));

        transition.selectAll('.name')
          .delay(delay)
          .attr('x', d => x(d.name) + x.bandwidth() / 2);

          transition  //transition the axis
					.select('#x-axis')
					.call(xAxis);
      }

      function transition_X(){
        var transition = svg.transition()
          .duration(750);

        transition.select('#x-axis')
        .call(xAxis);
      }
      function draw() {
        x.domain(current.map(d => d.name))
          .range([0, width])
          .paddingInner(0.2);

        y.domain([0, d3.max(current, d => d.gravity)])
          .range([height, 0]);

        svg.selectAll('.bar')
          .data(current, d => d.name)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.name))
          .attr('y', d => y(d.gravity))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.gravity));

        svg.selectAll('.name')
          .data(current, d => d.name)
          .enter()
          .append('text')
          .text(d => d.name)
          .attr('class', 'name')
          .attr('style', d => d.name === 'EARTH' ? 'fill: red' : '')
          .attr('x', d => x(d.name) + x.bandwidth() / 2)
          .attr('y', d => y(d.gravity) + (height - y(d.gravity)) / 2);

        xAxis = d3.axisBottom()
          .scale(x);
          


        svg.append('g')
          .attr('class', 'axis')
          .attr('id','x-axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

        // svg.append('text')
        //   .attr('class', 'xlabel')
        //   .text('smaller')
        //   .attr('x', 30)
        //   .attr('y', height + 20);
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0-(margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Secondary School Enrollment % by Country - 2017");

          svg.append('text')
          .attr('class', 'xlabel')
          .text('Countries')
          .attr('x', width/2)
          .attr('y', height + 40);

        // svg.append('text')
        //   .attr('class', 'xlabel')
        //   .text('larger')
        //   .attr('x', width - 30)
        //   .attr('y', height + 20);

        var yAxis = d3.axisLeft()
          .scale(y)
          .ticks(10, 'd');

        svg.append('g')
          .attr('class', 'axis')
          .call(yAxis);

        svg.append('text')
          .attr('x', - height / 2)
          .attr('y', - margin.left * 0.7)
          .attr('transform', 'rotate(-90)')
          .attr('class', 'ylabel')
          .append('tspan').text('Enrollment %')

      }
