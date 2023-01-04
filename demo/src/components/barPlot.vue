<template>
  <div class="d3barchart">

    <div v-if='data'>
        <div class = "container">
            <div class = "row">
                <div class = "col-12">

<div class="form">
<form>
    <div style="visibility:hidden; font-size:0px;margin-top:-50px;">
    <input type="radio" id="bar_rad_1" name="group1" value="Education"  checked="checked">
    <label for="html">Education</label>
    <input type="radio" id="bar_rad_2" name="group1" value="Crime" >
    <label for="css">Crime</label>
    </div>


      <div class = "btn btn-dark text-white">
  <input type="radio" id="bar_rad_7" name="group4" value=2005  checked="checked">
  <label style = "margin-right:20px;margin-left:10px;" for="html">2005</label>


  <input type="radio" id="bar_rad_8" name="group4" value=2010  >
  <label style = "margin-right:20px;margin-left:10px;" for="html">2010</label>

    <input type="radio" id="bar_rad_2014" name="group4" value=2014  >
  <label style = "margin-right:20px;margin-left:10px;" for="html">2014</label>
    <input type="radio" id="bar_rad_2015" name="group4" value=2015  >
  <label style = "margin-right:20px;margin-left:10px;" for="html">2015</label>


  <input type="radio" id="bar_rad_9" name="group4" value=2017  >
  <label style = "margin-left:10px;" for="html">2017</label>
  </div>
  

  <div style="visibility:hidden; font-size:0px;">
  <input type="radio" id="bar_rad_5" name="group3" value="Male"  checked="checked">
  <label for="html">Male</label>
  <input type="radio" id="bar_rad_6" name="group3" value="Female" >
  <label for="css">Female</label>
  </div>

    <div class = "btn btn-dark text-white mb-3">
  <input   type="radio" id="bar_rad_3" name="group2" value="Top 20"  checked="checked">
  <label style = "margin-right:20px;margin-left:10px;"  for="html" ><b>Top 20</b></label>
  
  <input type="radio" id="bar_rad_4" name="group2" value="Bottom 20" >
  <label style = "margin-left:10px;" for="css">Bottom 20</label><br>
  </div>




  
</form>
</div>

















<h2 id="title" style="text-align: center;">Title</h2>
<div id="bar_dataviz"></div>


                </div>

                </div>

        </div>



    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'barPlot',
  props: {
    title: String,
    data: {  //this.data in component
      type: Array
    }    
  },
  methods: {
    barPlot() {
var margin = {top: 30, right: 30, bottom: 100, left: 60},
      width = 1060 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  var svg = d3.select("#bar_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  // Initialize the X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
    
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    
  // Initialize the Y axis
  var y = d3.scaleLinear()
    .range([ height, 0]);
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")
  
          var filters;
        var i;
  
  // A function that create / update the plot for a given variable:

var global_data = this.data;

  function update() {
      var data = global_data;

    var ele = document.getElementsByTagName('input');
    filters = []
    for(i = 0; i < ele.length; i++) {
          
        if(ele[i].type=="radio") {
          if(ele[i].checked){
            filters.push(ele[i].value)
          }
        }
    }
    
    // Parse the Data
    // Change location of final file
    // d3.csv("merged_dataset.csv", function(data) {


      
      //console.log(data)
        var color;
        var selectedVar;
        var gender;
        var i_d;
        var year;
        var title;

        var data_csv = d3.filter(data,d=>d.Year == filters[1])
        
         data = []
        
        if (filters[0] === "Crime"){
          color = "red"
          selectedVar = "crime_percentage"
          if (filters[2] === "Male"){
            for (i=0;i<data_csv.length; i ++){
              i_d = data_csv[i]
              if (i_d.Series_x ==  "Intentional homicide rates per 100,000" & i_d.Value_x != 0){
                data.push({year:i_d.Year,country:i_d.Region,crime_percentage:+i_d.Value_x})
              }
            }            
          } else {
            for (i=0;i<data_csv.length; i ++){
              i_d = data_csv[i]
              if (i_d.Series_x ==  "Intentional homicide rates per 100,000" & i_d.Value_x != 0){
                data.push({year:i_d.Year,country:i_d.Region,crime_percentage:+i_d.Value_x})
              }
            }            
          }
        
        } else {
          color = "blue"
          selectedVar = "education_percentage"
          if (filters[2] === "Male"){
            gender = "Gross enrollment ratio - Tertiary (male)"
            for (i=0;i<data_csv.length; i ++){
              i_d = data_csv[i]
              if (i_d.Series_y ==  "Gross enrollment ratio - Tertiary (male)" & i_d.Value_y != 0){
                data.push({year:i_d.Year,country:i_d.Region,education_percentage:+i_d.Value_y} )
              }
            }
            
          } else {
            for (i=0;i<data_csv.length; i ++){
              i_d = data_csv[i]
              if (i_d.Series_y ==  "Gross enrollment ratio - Tertiary (female)" & i_d.Value_y != 0){
                data.push({year:i_d.Year,country:i_d.Region,education_percentage:+i_d.Value_y})
              }
            }
            
          }
        }

        data = Array.from(new Set(data.map(JSON.stringify)), JSON.parse)

        var heading = document.getElementById('title');
        // var heading = d3.select('#title')



        year = filters[1]
        if (filters[0] === "Crime"){
        data = data.sort((a, b) => d3.descending(a.crime_percentage, b.crime_percentage));
          if (filters[3] === "Top 20"){
            title = "The 20 Most Dangerous Countries (" + year + ")"
            heading.innerHTML = title
            if (data.length > 20){
              data = data.slice(0,20) 
            }
          } else {
            title = "The 20 Most Safest Countries (" + year + ")"
            heading.innerHTML = title
            if (data.length > 20){
              data = data.slice(Math.max(data.length - 20, 1))
            }
          }
        } else {
          data = data.sort((a, b) => d3.descending(a.education_percentage, b.education_percentage));
          if (filters[3] === "Top 20"){
            title = "The 20 Most Literate Countries (" + year + " - "+filters[2]+")"
            heading.innerHTML = title
            if (data.length > 20){
              data = data.slice(0,20)
            }
          } else {
            title = "The 20 Most Iliterate Countries (" + year + " - "+filters[2]+")"
            heading.innerHTML = title
            if (data.length > 20){
              data = data.slice(Math.max(data.length - 20, 1))
            }
          }
        }

      // X axis
      x.domain(data.map(function(d) { return d.country; }))
      xAxis.transition().duration(1000)//.call(d3.axisBottom(x))
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));
  
      // variable u: map data to existing bars
      var u = svg.selectAll("rect")
        .data(data)
  
      // update bars
      u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
          .attr("x", function(d) { return x(d.country); })
          .attr("y", function(d) { return y(d[selectedVar]); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d[selectedVar]); })
          .attr("fill", color)
      
        // u.append('text')
        // .attr('x', 100)
        // .attr('y', 100)
        // .attr('transform', 'rotate(-90)')
        // .attr('class', 'ylabel')
        // .append('tspan').text('Gravity ms')
        // .append('tspan').text('-2')
        // .style('baseline-shift', 'super')
        // .style('font-size', '10em');

    
  }
  
  // Initialize plot
  update()

  d3.select('#bar_rad_1').on('change',function(){
      update()
  });
    d3.select('#bar_rad_2').on('change',function(){
      update()
  });
    d3.select('#bar_rad_3').on('change',function(){
      update()
  });
    d3.select('#bar_rad_4').on('change',function(){
      update()
  });
    d3.select('#bar_rad_5').on('change',function(){
      update()
  });
    d3.select('#bar_rad_6').on('change',function(){
      update()
  });
    d3.select('#bar_rad_7').on('change',function(){
        document.getElementById('world_2005').click();
        
      update()
  });
    d3.select('#bar_rad_8').on('change',function(){
        document.getElementById('world_2010').click();
      update()
  });
    d3.select('#bar_rad_9').on('change',function(){
        document.getElementById('world_2017').click();
      update()
  });
      d3.select('#bar_rad_2014').on('change',function(){
        document.getElementById('world_2014').click();
      update()
  });
    d3.select('#bar_rad_2015').on('change',function(){
        document.getElementById('world_2015').click();
      update()
  });
  
  

    },
  },
  mounted() {
    this.barPlot();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>

