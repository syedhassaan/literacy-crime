<template>
  <div class="d3barchart">

    <div v-if='data'>
      <div class="title">{{ title }}</div>
      <svg class="chart" ref="svg" width="800" height="700"/>  <!-- ref is a vue reference! -->
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'd3barchart',
  props: {
    title: String,
    data: {  //this.data in component
      type: Array
    }    
  },
  methods: {
    a5lollipopChart() {




    //   var svg = d3.select(this.$refs["svg"]);  //refs to reference the svg in this component
    //   var sel = svg.selectAll('rect')
    //     .data(this.data)  //this.data from the data prop
    //     .enter();
      
    //   sel.append('rect')
    //     .attr('x', 100)
    //     .attr('y', (d, i) => 20 + i * 25)
    //     .attr('width', d => d.value / 1000)
    //     .attr('class', 'bar');

    //   sel.append('text')
    //     .attr('x', 90)
    //     .attr('y', (d, i) => 30 + i * 25)
    //     .attr('class', 'label')
    //     .text(d => d.label);

    //   sel.append('text')
    //     .attr('x', d => 90 + d.value / 1000)
    //     .attr('y', (d, i) => 30 + i * 25)
    //     .attr('class', 'value')
    //     .text(d => Number(d.value).toLocaleString());



var xScale = d3.scaleBand()  //🎒  explain
    .round(true)
    .paddingInner(0.05);

var yScale = d3.scaleLinear();

var xAxis = d3.axisBottom()  //🎒  explain
    .scale(xScale);

var yAxis = d3.axisLeft()
    .scale(yScale);

    // console.log(this.data[0].name)

    // console.log(this.data)

    // console.log(this.data[0].dist)

    var data=[]
    var y_lab = "Secondary Enrollment %"

 for (var x=0;x<this.data.length;x++){
        data.push({name:this.data[x].label,gravity:this.data[x].value})

   }

// d3.tsv("planets.tsv", function (d) {  //🎒  explain
//     return {
//         name: d.name,
//         gravity: +d.gravity,
//         temperature: +d.temperature,
//         distance: +d.distance,
//     };
// }).then(function (data) {
    //🎒  explain




    var margin = { top: 20, left: 40, bottom: 40, right: 40 };
    var width = parseInt(d3.select(this.$refs["svg"]).style("width")) - margin.left - margin.right;
    var height = parseInt(d3.select(this.$refs["svg"]).style("height")) - margin.top - margin.bottom;
    var svg = d3.select(this.$refs["svg"])
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    xScale.domain(data.map(function (d) { //🎒  explain
        return d.name;
    }))
        .range([0, width]);

    yScale.domain([0, d3.max(data, function (d) { //🎒  explain
        return +d.gravity;
    })])
        .range([height, 0]).nice();

    // svg.append('g') //🎒  explain
    //     .attr('class', 'x axis')
    //     .attr('transform', 'translate(0,' + height + ')')
    //     .call(xAxis);

    svg.append('g') //🎒  explain
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -35)
        .attr('dy', '.7em')
        .text(y_lab)

    var move_x = 15
    svg.selectAll('.bar')  //🎒  explain
        .data(data, function (d) {
            return d.name;
        })
        .enter().append('line') //ENTER
        .style('stroke', 'black')
        .attr('x1', function (d) {
            return xScale(d.name)+move_x;
        })
        .attr('y1', function (d) {
            return yScale(d.gravity);
        })
        .attr('x2', function (d) {
            return xScale(d.name)+move_x;
        })
        .attr('y2', function (d) {
            return height;
        })

    svg.selectAll('.bar')  //🎒  explain
        .data(data, function (d) {
            return d.name;
        })
        .enter().append('circle') //ENTER
        .attr('cx', function (d) {
            return xScale(d.name)+move_x;
        })
        .attr('cy', function (d) {
            return yScale(d.gravity);
        })
        .attr('r', function (d) {
            return 5;
        })
        .attr('fill', 'lightblue');

    console.log(this.data[0].gravity)
    console.log(height-yScale(3.7))

    svg.selectAll('.name')  //🎒  explain
        .data(data, function (d) {
            return d.name;
        })
        .enter() //ENTER
        .append('text')
        .text(function (d) {
            return d.name;
        })
        .attr('class', 'name')
        .attr('x', function (d) {
            return xScale(d.name) + xScale.bandwidth() / 2;
        })
        .attr('y', function (d) {
            return height + 10;
        })

    svg.selectAll('.gravity')  //🎒  explain
        .data(data, function (d) {
            return d.name;
        })
        .enter() //ENTER
        .append('text')
        .text(function (d) {
            return d.gravity + ' % ';
        })
        .attr('class', 'gravity')
        .attr('x', function (d) {
            return xScale(d.name) -10 + xScale.bandwidth() / 2 ;
        })
        .attr('y', function (d) {
            return yScale(d.gravity)-10;
        })
        .style('font-size', '0.7em');

console.log(height)
        console.log(height +(10-  yScale(this.data[0].gravity)))
                console.log(height +(10-  yScale(this.data[1].gravity)))

        console.log(height +(10-  yScale(this.data[2].gravity)))


    // resize();  //🎒  explain why we call resize

    //bind window resize event to call resize() 
    // d3.select(window).on('resize', resize(this.$refs["svg"]));  //🎒  explain

    // function resize(svg) {
    //     // var svg = d3.select(this.$refs["svg"]);
        
    //     //🎒  explain
    //     width = parseInt(svg.style('width')) - margin.left - margin.right;
    //     height = parseInt(svg.style('height')) - margin.top - margin.bottom;
    //     svg.attr('width', width)
    //         .attr('height', height)

    //     //🎒  explain
    //     xScale.range([0, width]);
    //     yScale.range([height, 0]).nice();

    //     //🎒  explain
    //     svg.selectAll('.bar')
    //         .data(data, function (d) {
    //             return d.name;
    //         }) //UPDATE
    //         .attr('x', function (d) {
    //             return xScale(d.name);
    //         })
    //         .attr('y', function (d) {
    //             return yScale(d.gravity);
    //         })
    //         .attr('width', xScale.bandwidth())
    //         .attr('height', function (d) {
    //             return height - yScale(d.gravity);
    //         });

    //     if (width < 550 || height < 90) {
    //         //🎒  explain
    //         svg.select('.x.axis').style('display', 'none');
    //         svg.select('.y.axis').style('display', 'none');

    //         //🎒  explain
    //         svg.selectAll('.name')
    //             .data(data, function (d) {
    //                 return d.name;
    //             }) //UPDATE
    //             .attr('x', function (d) {
    //                 return xScale(d.name) + xScale.bandwidth() / 2;
    //             })
    //             .attr('y', function (d) {
    //                 return height + 10;
    //             })
    //             .style('display', 'initial');

    //         //🎒  explain
    //         svg.selectAll('.gravity')
    //             .data(data, function (d) {
    //                 return d.name;
    //             }) //UPDATE
    //             .attr('x', function (d) {
    //                 return xScale(d.name) + xScale.bandwidth() / 2;
    //             })
    //             .attr('y', function (d) {
    //                 return height + 20;
    //             })
    //             .style('display', 'initial');

    //         //🎒  explain
    //         svg.select('.x.axis').style('display', 'none');
    //         svg.select('.y.axis').style('display', 'none');
    //         svg.selectAll('.name').style('display', 'initial');
    //         svg.selectAll('.gravity').style('display', 'initial');
    //     } else {
    //         //🎒  explain
    //         yAxis.ticks(Math.max(height / 50, 2)); //one every 50 pixels
    //         xAxis.ticks(Math.max(width / 50, 2));

    //         //🎒  explain
    //         svg.select('.x.axis')
    //             .attr('transform', 'translate(0,' + height + ')')
    //             .call(xAxis);

    //         svg.select('.y.axis')
    //             .call(yAxis);

    //         //🎒  explain
    //         svg.select('.x.axis').style('display', 'initial');
    //         svg.select('.y.axis').style('display', 'initial');
    //         svg.selectAll('.name').style('display', 'none');
    //         svg.selectAll('.gravity').style('display', 'none');
    //     }
    // }









    },
  },
  mounted() {
    this.a5lollipopChart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
>>> .axis path,
.axis line {
    shape-rendering: crispEdges;
}

>>> .axis text {
    fill: black;
}

>>> text.name,
text.gravity {
    text-anchor: middle;
    fill: black;
    font-size: 0.5em;
}

>>> #chart {
    width: 100%;
    height: 350px;
    background-color: #ffeeee;
}


</style>
