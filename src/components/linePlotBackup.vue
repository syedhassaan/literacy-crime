<template>
  <div class="d3barchart">

    <div v-if='data'>
        <div class = "container">
    <div class = "row">
      <div class = "col-12 d-flex justify-content-center">
        <label for= 'selectButton' style='margin-right:20px;'><small><b>Country 1</b></small></label>
    <select id="selectButton" class="btn btn-light" ></select>
    <select id="selectButton2" class="btn btn-light" style="margin-left:20px;" ></select>
        <label for= 'selectButton' style='margin-left:20px;'><small><b>Country 2</b></small></label>


  </div>


<div class = "col-12 d-flex justify-content-center mt-4">
  <div class="form-check" style="margin-right:20px;">
    <label class="form-check-label" for="flexRadioDefault1">
      Gross Enrollment Tertiary - Male
    </label>
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
  
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
    <label class="form-check-label" for="flexRadioDefault2">
      Gross Enrollment Tertiary - Female
    </label>
  </div>
</div>


<!-- 

<div class = "col-12 d-flex justify-content-center mt-4">
  <div class="form-check" style="margin-right:20px;">
    <label class="form-check-label" for="crime_type_1">
      Homicides
    </label>
    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="crime_type_1" checked>
  
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="crime_type_2" >
    <label class="form-check-label" for="crime_type_2">
      Assault
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="crime_type_3" >
    <label class="form-check-label" for="crime_type_3">
      Theft
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="crime_type_4" >
    <label class="form-check-label" for="crime_type_4">
      Sexual Violence
    </label>
  </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="crime_type_5" >
    <label class="form-check-label" for="crime_type_5">
      Kidnapping
    </label>
  </div>
      <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="crime_type_6" >
    <label class="form-check-label" for="crime_type_6">
      Robbery
    </label>
  </div>
</div> -->

  
  </div>
  </div>

    <!-- <svg id="my_dataviz3" height=300 width=450></svg> -->

    
    <!-- Create a div where the graph will take place -->
    <div id="my_dataviz"></div>


    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'linePlot',
  props: {
    title: String,
    data: {  //this.data in component
      type: Array
    }    
  },
  methods: {
    linePlot() {

const parseTime = d3.timeParse("%Y");    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 1200 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


    var focus = svg.append("g")                                // **********
    .style("display", "none");  
    
    //Read the data
    // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function(data) {
        // d3.csv("merged_dataset.csv", function(data_csv) {


            var data_csv = this.data;
            // console.log(data_csv)



        // data_csv = d3.filter(data_csv,d=> d.Series_x == "Intentional homicide rates per 100,000")
        // console.log(data)
        var data_unfiltered = []
        var test = []
        for (var i=0;i<data_csv.length; i ++){
            var i_d = data_csv[i]
            data_unfiltered.push({i:i,year:parseTime(i_d.Year),name:i_d.Region,n:i_d.Value_y,prop:i_d.Value_x,ed_type:i_d.Series_y,crime_type:i_d.Series_x})
            test.push(i_d.Series_x)
            
        }





        
        // console.log("DATA")
        // console.log(data_unfiltered)
        // console.log([...new Set(test)])

        var education_type_col_male = 'Gross enrollment ratio - Tertiary (male)';
        var education_type_col_female = 'Gross enrollment ratio - Tertiary (female)'; 


        var crime_type_1 = 'Intentional homicide rates per 100,000';
        var crime_type_2 = 'Assault rate per 100,000 population';
        var crime_type_3 = 'Theft at the national level, rate per 100,000 population';
        var crime_type_4 = 'Total Sexual Violence at the national level, rate per 100,000';
        var crime_type_5 = 'Kidnapping at the national level, rate per 100,000';
        var crime_type_6 = 'Robbery at the national level, rate per 100,000 population';


        var current_education_type = education_type_col_male;
        var current_crime_type = crime_type_1;


        var data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
        
        // console.log(data)

        // console.log(data)
        // data = []
    
        // List of groups (here I have one group per column)
        var allGroup = d3.map(data, function(d){return(d.name)})
         allGroup = [...new Set(allGroup)];

        // console.log(allGroup)

         
        for (i=0;i<allGroup.length;i++){
          if (allGroup[i] == "Brazil"){
            var def_1 = i;
          }
          if (allGroup[i] == "Argentina"){
            var def_2 = i;
          }
        }
        // console.log(allGroup)
        // console.log(allGroup[0])
        // console.log(data.filter(function(d){return d.name==allGroup[0]}))


// 

    
        // add the options to the button
        d3.select("#selectButton")
          .selectAll('myOptions')
             .data(allGroup)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button

          d3.select('#selectButton').property('value','Brazil');


          d3.select("#selectButton2")
          .selectAll('myOptions')
             .data(allGroup)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button

          d3.select('#selectButton2').property('value','Argentina');
    
        // A color scale: one color for each group
        var myColor = d3.scaleOrdinal()
          .domain(allGroup)
          .range(d3.schemeSet1);

          var myColor2 = d3.scaleOrdinal()
          .domain(allGroup)
          .range(d3.schemeSet1);

          // var myColor = function(){

          //   return '#03befc'
            
          // }
          //   var myColor2 = function(){
          //   return 'lightblue'
          // }
    


// LEGEND

// var SVG = d3.select("#my_dataviz3")

// create a list of keys
var keys = ["Brazil Education", "Brazil Crime", "Argentina Education", "Argentina Crime"]

var default_item_1 = allGroup[def_1]
var default_item_2 = allGroup[def_2]


// var c1 = "#005824"; var c2 = "#41ae76"; var c3 = "#91003f"; var c4 = "#c994c7";
var c1 = myColor(default_item_1); var c2 = myColor2(default_item_1); var c3 = myColor(default_item_2); var c4 = myColor2(default_item_2);


// Usually you have a color scale in your chart already
var color = d3.scaleOrdinal()
  .domain(keys)
  .range([c1,c2,c3,c4]);

// Add one dot in the legend for each name.
var size = 20
// svg.selectAll("mydots")
//   .data(keys)
//   .enter()
//   .append("rect")
//     .attr("x", width-180)
//     .attr("y", function(d,i){ return height-350 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
//     .attr("width", size)
//     .attr("height", size)
//     .style("fill", function(d){ return color(d)})
//     .attr('id',function(d,i){return 'color_'+i})





// svg.selectAll("mydots")
//   .data(keys)
//   .enter()
//   .append("path")
//     .attr("x", width-180)
//     .attr("y", function(d,i){ return height-350 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
//     .attr("width", size)
//     .attr("height", size)
//     .style("fill", function(d){ return color(d)})
//     .attr('id',function(d,i){return 'color_'+i})

// Add one dot in the legend for each name.

var lineFunc = function(s){
    if (s.search('Crime') > 0){
        return '---'
    }
    else{
        return '━'
    }
}

svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", width-170 + size*1.5)
    .attr("y", function(d,i){ return height-400 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return lineFunc(d)})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr('id',function(d,i){return 'color_'+i})
    .style('font-size','25px')
            .style('text-shadow',' -1px -1px 0 #000')



svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", width-140 + size*1.5)
    .attr("y", function(d,i){ return height-400 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr('id',function(d,i){return 'label_'+i})
    .style('font-size','10.4px')
        .style('text-shadow',' -1px -1px 0 #000')

    




    //     var line = svg
    //       .append('g')
    //       .append("path")
    //         .datum(data.filter(function(d){return d.name==default_item_1}))
    //         .attr("d", d3.line()
    //           .x(function(d) { return x(d.year) })
    //           .y(function(d) { return y(+d.n) })
    //         )
    //         .attr("stroke",  function(d){return myColor(default_item_1)})
    //         .style("stroke-width", 3)
    //         .style("fill", "none")
    //         .on('mouseover', function (d, i) {
    //   d3.select(this).transition()
    //        .duration('50')
    //        .style('stroke-width', 6);
    //        highlightLine('label_0')



// 


// LEGEND END



















        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain([parseTime(2004),parseTime(2019)])
          .range([ 0, width ]);

        //   d3.extent(data, function(d) { return d.year; })
          


        svg.append("g")
          .style('font-size','18px')
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(7));
    
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, 82.7])
          .range([ height, 0 ]);


         svg.append("g")
          .style('font-size','15px')
          .attr('id','line-y-axis')
          .call(d3.axisLeft(y));

          var transitionY = function(m1,m2){
                      y = d3.scaleLinear()
          .domain([0, (m1>m2?m1:m2)+15])
          .range([ height, 0 ]);
        //   console.log(d3.max(data, function(d) { return d.n }))
        svg.select('#line-y-axis').transition()
        .duration(1000)
          .call(d3.axisLeft(y));
          
          }


        //   svg.append('text')
        // .attr('transform', d => 'translate(20)')  //🎒 explain:
        // .text('Blue')
        // .attr('opacity','0')
        // .style('font-size','20px')
    
        // Initialize line with first group of the list
        var els;
        var highlightLine = function(var_label){
          d3.select('#'+var_label).style('text-decoration','underline')
           d3.select('#'+var_label).style('font-size','15px')

          //  console.log(var_label+'_dots')
           els = document.getElementsByClassName(var_label+'_dots')
           for (i=0;i<els.length;i++){
            els[i].style.display= 'block'
           }

        }
        var unhighlightLine = function(var_label){
          d3.select('#'+var_label).style('text-decoration','none')
           d3.select('#'+var_label).style('font-size','10.4px')


           els = document.getElementsByClassName(var_label+'_dots')
           for (i=0;i<els.length;i++){
            els[i].style.display= 'none'
           }
        }


       var circle1 =  svg.selectAll("myCircles")
      .data(data.filter(function(d){return d.name==default_item_1}))
      .enter()
      .append("text")
        // .attr("fill", d=>myColor(d.name))
        .attr("stroke", "none")
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.n)-10 })
        .text(d=>d.n)
        .style('display','none')
        .attr('class','label_0_dots')
        // .attr('class',function(d){ return d.name+'_0_dots'})


       var circle2 =  svg.selectAll("myCircles")
      .data(data.filter(function(d){return d.name==default_item_1}))
      .enter()
      .append("text")
        // .attr("fill", d=>myColor(d.name))
        .attr("stroke", "none")
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.prop)-10 })
        .text(d=>d.prop)
        .style('display','none')
        .attr('class','label_1_dots')

       var circle3 =  svg.selectAll("myCircles")
      .data(data.filter(function(d){return d.name==default_item_2}))
      .enter()
      .append("text")
        // .attr("fill", d=>myColor(d.name))
        .attr("stroke", "none")
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.n)-10 })
        .text(d=>d.n)
        .style('display','none')
        .attr('class','label_2_dots')

       var circle4= svg.selectAll("myCircles")
      .data(data.filter(function(d){return d.name==default_item_2}))
      .enter()
      .append("text")
        // .attr("fill", d=>myColor(d.name))
        .attr("stroke", "none")
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.prop)-10 })
        .text(d=>d.prop)
        .style('display','none')
        .attr('class','label_3_dots')
        // .attr("r", 3)



        var line = svg
          .append('g')
          .append("path")
            .datum(data.filter(function(d){return d.name==default_item_1}))
            .attr("d", d3.line()
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(+d.n) })
            )
            .attr("stroke",  function(d){return myColor(default_item_1)})
            .style("stroke-width", 3)
            .style("fill", "none")
            .on('mouseover', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 6);
           highlightLine('label_0')




        
        })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 3);
           unhighlightLine('label_0')


        });





        var line2 = svg
          .append('g')
          .append("path")
            .datum(data.filter(function(d){return d.name==default_item_1}))
            .attr("d", d3.line()
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(+d.prop) })
            )
            .attr("stroke",  function(d){return myColor2(default_item_1)})
            .style("stroke-width", 4)
            .style("fill", "none")
            .style('stroke-dasharray',('20,3'))
            .on('mouseover', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 6);
           highlightLine('label_1')


        
        })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 3);
           unhighlightLine('label_1')

        });

        
            // Initialize line with first group of the list
            var line3 = svg
          .append('g')
          .append("path")
            .datum(data.filter(function(d){return d.name==default_item_2}))
            .attr("d", d3.line()
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(+d.n) })
            )
            .attr("stroke",  function(d){return myColor(default_item_2)})
            .style("stroke-width", 3)
            .style("fill", "none")
            .on('mouseover', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 6);
           highlightLine('label_2')


        
        })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 3);
           unhighlightLine('label_2')

        });





        var line4 = svg
          .append('g')
          .append("path")
            .datum(data.filter(function(d){return d.name==default_item_2}))
            .attr("d", d3.line()
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(+d.prop) })
            )
            .attr("stroke",  function(d){return myColor2(default_item_2)})
            .style("stroke-width", 4)
            .style('stroke-dasharray',('20,3'))
            .style("fill", "none")
            .on('mouseover', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 6);
           highlightLine('label_3')


        
        })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
           .duration('50')
           .style('stroke-width', 3);
           unhighlightLine('label_3')

        });




            var max_update_1;
            var max_update_2;

        // A function that update the chart
        function update(selectedGroup,data) {
    
          // Create new data with the selection?
          var dataFilter = data.filter(function(d){return d.name==selectedGroup})
           max_update_1 = d3.max(dataFilter, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
           
           console.log(dataFilter)
        //   transitionY(dataFilter);

          d3.select('#label_0').text(selectedGroup + " Education")
          d3.select('#label_1').text(selectedGroup + " Crime")

          d3.select('#label_0').style('fill',myColor(selectedGroup))
          d3.select('#label_1').style('fill',myColor2(selectedGroup))

          d3.select('#color_0').style('fill',myColor(selectedGroup))
          d3.select('#color_1').style('fill',myColor2(selectedGroup))


    
          // Give these new data to update line
          line
              .datum(dataFilter)
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(+d.n) })
              )
              .attr("stroke", function(d){ return myColor(selectedGroup) })

            line2
              .datum(dataFilter)
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(+d.prop) })
              )
              .attr("stroke", function(d){ return myColor2(selectedGroup) })

              // removeElementsByClass('label_0_dots')

       circle1.data(dataFilter)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.n)-10 })
        .text(d=>d.n)

        circle2.data(dataFilter)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.prop)-10 })
        .text(d=>d.prop)
        
        

        }


        // A function that update the chart
        function update2(selectedGroup) {
    
    // Create new data with the selection?
    var dataFilter = data.filter(function(d){return d.name==selectedGroup});
    max_update_2 = d3.max(dataFilter, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
    // console.log(max_update_2)
    

    d3.select('#label_2').text(selectedGroup + " Education")
    d3.select('#label_3').text(selectedGroup + " Crime")

    d3.select('#label_2').style('fill',myColor(selectedGroup))
    d3.select('#label_3').style('fill',myColor2(selectedGroup))

    d3.select('#color_2').style('fill',myColor(selectedGroup))
    d3.select('#color_3').style('fill',myColor2(selectedGroup))

    // Give these new data to update line
    line3
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function(d) { return x(d.year) })
          .y(function(d) { return y(+d.n) })
        )
        .attr("stroke", function(d){ return myColor(selectedGroup) })

      line4
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function(d) { return x(d.year) })
          .y(function(d) { return y(+d.prop) })
        )
        .attr("stroke", function(d){ return myColor2(selectedGroup) })

        circle3.data(dataFilter)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.n)-10 })
        .text(d=>d.n)

        circle4.data(dataFilter)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(+d.prop)-10 })
        .text(d=>d.prop)
  }
    var selectedOption;
    var selectedOption_2;
    // var test;
    var test_2;
    // var max_update_1;
    // var max_update_2;

        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            document.getElementById('country1').value = d3.select('#selectButton').property("value")
            document.getElementById('country1').click();


           selectedOption = d3.select('#selectButton').property("value")
           selectedOption_2 = d3.select('#selectButton2').property("value")
            // run the updateChart function with this selected option
           test = data.filter(function(d){return d.name==selectedOption})
           test_2 = data.filter(function(d){return d.name==selectedOption_2})

            max_update_1 = d3.max(test, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            max_update_2 = d3.max(test_2, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            transitionY(max_update_1,max_update_2);


            update(selectedOption,data)
            update2(selectedOption_2,data)
        })

        d3.select("#selectButton2").on("change", function(d) {
            // recover the option that has been chosen
            document.getElementById('country2').value = d3.select('#selectButton2').property("value")
            document.getElementById('country2').click();


           selectedOption = d3.select('#selectButton').property("value")
           selectedOption_2 = d3.select('#selectButton2').property("value")
            // run the updateChart function with this selected option
           test = data.filter(function(d){return d.name==selectedOption})
           test_2 = data.filter(function(d){return d.name==selectedOption_2})

            max_update_1 = d3.max(test, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            max_update_2 = d3.max(test_2, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            transitionY(max_update_1,max_update_2);


            update(selectedOption,data)
            update2(selectedOption_2,data)

            
        })

        d3.select('#flexRadioDefault1').on('change',function(){
        current_education_type = education_type_col_male;
        //   data =  d3.filter(data_unfiltered,d=> d.ed_type == education_type_col_male);

          data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
        //   transitionY();

           selectedOption = d3.select('#selectButton').property("value")
           selectedOption_2 = d3.select('#selectButton2').property("value")
            // run the updateChart function with this selected option
           test = data.filter(function(d){return d.name==selectedOption})
           test_2 = data.filter(function(d){return d.name==selectedOption_2})

            max_update_1 = d3.max(test, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            max_update_2 = d3.max(test_2, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            transitionY(max_update_1,max_update_2);


            update(selectedOption,data)
            update2(selectedOption_2,data)

            


        })


        d3.select('#flexRadioDefault2').on('change',function(){
                    current_education_type = education_type_col_female;


        //   data =  d3.filter(data_unfiltered,d=> d.ed_type ==education_type_col_female );

            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
        // transitionY();


           selectedOption = d3.select('#selectButton').property("value")
           selectedOption_2 = d3.select('#selectButton2').property("value")
            // run the updateChart function with this selected option
           test = data.filter(function(d){return d.name==selectedOption})
           test_2 = data.filter(function(d){return d.name==selectedOption_2})

            max_update_1 = d3.max(test, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            max_update_2 = d3.max(test_2, function(d) { return +d.n > +d.prop ? +d.n : +d.prop; });
            transitionY(max_update_1,max_update_2);


            update(selectedOption,data)
            update2(selectedOption_2,data)


        })

        d3.select('#crime_type_1').on('change',function(){
            current_crime_type = crime_type_1;
            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
            // transitionY();

           selectedOption = d3.select('#selectButton').property("value")
            update(selectedOption,data)
             selectedOption = d3.select('#selectButton2').property("value")
            update2(selectedOption,data)
        })
        d3.select('#crime_type_2').on('change',function(){
            current_crime_type = crime_type_2;
            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );


        // transitionY();

        // y.domain([0, d3.max(data, function(d) { return d.n > d.prop ? d.n : d.prop; })]).range([ height, 0 ]);
        // // console.log(d3.max(data, function(d) { return d.n > d.prop ? d.n : d.prop; }))

        // svg.select('#y-axis').transition().duration(1000).call(y)
        //   .range([ height, 0 ]);
        
        // call(d3.axisLeft(y));
        // var yAxis = svg.append("g")
        //   .style('font-size','15px')
        //   .call(d3.axisLeft(y));

           selectedOption = d3.select('#selectButton').property("value")
            update(selectedOption,data)
             selectedOption = d3.select('#selectButton2').property("value")
            update2(selectedOption,data)
        })
        d3.select('#crime_type_3').on('change',function(){
            current_crime_type = crime_type_3;
            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
            // transitionY();
           selectedOption = d3.select('#selectButton').property("value")
            update(selectedOption,data)
             selectedOption = d3.select('#selectButton2').property("value")
            update2(selectedOption,data)
        })
        d3.select('#crime_type_4').on('change',function(){
            current_crime_type = crime_type_4;
            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
            // transitionY();
           selectedOption = d3.select('#selectButton').property("value")
            update(selectedOption,data)
             selectedOption = d3.select('#selectButton2').property("value")
            update2(selectedOption,data)
        })
        d3.select('#crime_type_5').on('change',function(){
            current_crime_type = crime_type_5;
            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
            // transitionY();
           selectedOption = d3.select('#selectButton').property("value")
            update(selectedOption,data)
             selectedOption = d3.select('#selectButton2').property("value")
            update2(selectedOption,data)
        })
        d3.select('#crime_type_6').on('change',function(){
            current_crime_type = crime_type_6;
            data =  d3.filter(data_unfiltered,d=> d.ed_type == current_education_type & d.crime_type == current_crime_type );
            // transitionY();

           selectedOption = d3.select('#selectButton').property("value")
            update(selectedOption,data)
             selectedOption = d3.select('#selectButton2').property("value")
            update2(selectedOption,data)
        })


        // var crime_type_1 = 'Intentional homicide rates per 100,000';
        // var crime_type_2 = 'Assault rate per 100,000 population';
        // var crime_type_3 = 'Theft at the national level, rate per 100,000 population';
        // var crime_type_4 = 'Total Sexual Violence at the national level, rate per 100,000';
        // var crime_type_5 = 'Kidnapping at the national level, rate per 100,000';
        // var crime_type_6 = 'Robbery at the national level, rate per 100,000 population';


        // var current_education_type = education_type_col_male;
        // var current_crime_type = crime_type_1;
        








    
    // })
    







    },
  },
  mounted() {
    this.linePlot();
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
