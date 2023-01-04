<template>

  <div class="smallMultiples">
    <div v-if="datasets.length == 0">Loading...</div>
    <div v-else>



      

<div class = "container">

  <div class = "row">
<h1>Visualizing the Link Between Literacy and Crime</h1>
    </div>
    <hr>
  <div class = "row">
    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Safest Country</h5>
    <h6 class="card-subtitle mb-2 text-white bg-primary" style='padding-top:10px;padding-bottom:10px;'><b>Singapore 🇸🇬</b></h6>
    <p class="card-text">Singapore had the lowest mean homicide rate of 0.33 per 100k of population.</p>
    

  </div>
</div>      </div>
    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Most Dangerous Country</h5>
    <h6 class="card-subtitle mb-2 text-white bg-danger" style='padding-top:10px;padding-bottom:10px;'><b>El Salvadore 🇸🇻</b></h6>
    <p class="card-text">El Salvador is by far the most dangerous country to live in, with the highest mean homicide rate of 73 per 100k of population.</p>
    

  </div>
</div>      </div>
    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Most Literate Country</h5>
    <h6 class="card-subtitle mb-2 text-white bg-primary" style='padding-top:10px;padding-bottom:10px;'><b>Greece 🇸🇬</b></h6>
    <p class="card-text">Greece stood out as the most literate country, with the best male as well as female gross enrollment ratio of 109% and 114% respectively.</p>
    

  </div>
</div>      </div>

    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Least Literate Country</h5>
    <h6 class="card-subtitle mb-2 text-white bg-danger" style='padding-top:10px;padding-bottom:10px;'><b>Chad 🇸🇹 (F)<br>Tanzania 🇹🇿 (M)</b></h6>
    <p class="card-text">Chad, with a mean gross enrollment ratio of 0.84% (Female), and Tanzania, with a ratio of 3.5% (Male), stood out as the overall least literate countries.</p>
    

  </div>
</div>      </div>


  </div>
          <div class="row">
            <worldMap
              :data="datasets[0]"
              title="Secondary School Enrollment % for 10 Countries"
            />


</div>

</div>


<div class = "container">
          <div class="row">
            <barPlot
              :data="datasets[0]"
              title="Secondary School Enrollment % for 10 Countries"
            />


</div>
<hr>

</div>

<div class = "container">
  <h2 style="padding: 20px;">Education & Crime Trends</h2>
  <div class = "row">
    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Crime Fighter <span style='color:green'>⬆</span></h5>
    <h6 class="card-subtitle mb-2 text-white bg-primary" style='padding-top:10px;padding-bottom:10px;'><b>Georgia 🇬🇪</b></h6>
    <p class="card-text">Georgia has had the most improvement in cutting down on homicides, reducing their homicide rate by 89% between the years of 2010 and 2016.</p>
    

  </div>
</div>      </div>
    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Losing the Fight <span style="color:red">⬇</span></h5>
    <h6 class="card-subtitle mb-2 text-white bg-danger" style='padding-top:10px;padding-bottom:10px;'><b>Egypt 🇪🇬</b></h6>
    <p class="card-text">Egypt had a 369% increase in the rate of intentional homicides per 100k of population, from 0.6912 in 2005 to 2.5537 in 2012.</p>
    

  </div>
</div>      </div>
    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">Educating the Masses <span style='color:green'>⬆</span></h5>
    <h6 class="card-subtitle mb-2 text-white bg-primary" style='padding-top:10px;padding-bottom:10px;'><b>Mozambique 🇸🇲<br>Chad 🇹🇩</b></h6>
    <p class="card-text">Mozambique, with a 401% increase in Tertiary Gross enrollment ratio (Male), and Chad with a 850% increase in Tertiary Gross Enrollment Ratio (Female), had the best improvement in education.</p>
    

  </div>
</div>      </div>

    <div class = "col-md-3 col-sm-6">
<div class="card h-100" >
  <div class="card-body">
    <h5 class="card-title">One Step Backward <span style="color:red">⬇</span></h5>
    <h6 class="card-subtitle mb-2 text-white bg-danger" style='padding-top:10px;padding-bottom:10px;'><b>Aruba 🇸🇦</b></h6>
    <p class="card-text">Aruba, between the years of 2005 and 2016, had a 57% decrease in Gross Enrollment Ratio (Male) and 42% decrease in Gross Enrollment Ratio (Female), the worst downfall for both categories among all the countries.</p>
    

  </div>
</div>      </div>


  </div>


          <div class="row mt-4 mb-4">
            <linePlot
              :data="datasets[1]"
              title="Secondary School Enrollment % for 10 Countries"
            />


</div>

</div>


<div class = "container">
          <div class="row mt-4 mb-4">
            <mapBox
              :data="datasets[0]"
              title="Secondary School Enrollment % for 10 Countries"
            />


</div>
  </div>


      <!-- <div class="container">
        <div class="row">
          <div class="col-2 mt-4">
            <h3>Secondary School Enrollment %</h3>
            <p>
              Net enrollment rate is the ratio of children of official school
              age who are enrolled in school to the population of the
              corresponding official school age. Secondary education completes
              the provision of basic education that began at the primary level,
              and aims at laying the foundations for lifelong learning and human
              development, by offering more subject- or skill-oriented
              instruction using more specialized teachers.
            </p>
          </div>
          <div class="col-10">
             <a5lollipopChart
              :data="datasets[0]"
              title="Secondary School Enrollment % for 10 Countries"
            /> 
          </div>
        </div>

      </div>


 -->






    </div>
  </div>
</template>

<script>
// import a5lollipopChart from "@/components/a5lollipopChart.vue"; // @ is an alias to /src
import worldMap from "@/components/worldMap.vue"; // @ is an alias to /src
import linePlot from "@/components/linePlot.vue"; // @ is an alias to /src
import barPlot from "@/components/barPlot.vue"; // @ is an alias to /src
import mapBox from "@/components/mapBox.vue"; // @ is an alias to /src


import * as d3 from "d3";

export default {
  name: "smallMultiples",
  components: {
    // BarChart,
    // a5lollipopChart,
    worldMap,
    linePlot,
    barPlot,
    mapBox
  },
  data: function () {
    return {
      datasets: [],
    };
  },
  mounted: function () {
    var promises = [];
    // promises.push(d3.json("my_data.json"));
    document.title='DatArt - Dashboard'
    promises.push(d3.csv("merged_dataset.csv"));
    promises.push(d3.csv("test.csv"));

    var that = this; //`this` points to the component instance, to use it inside Promises.all we set it to that

    Promise.all(promises).then((result) => {
      that.datasets = result;
    });
    

           

  },
};
</script>

<style>
body{
    background-image:url('https://i.imgur.com/gsOQXpm.png');
  /* background-color: black; */
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size:cover;
}

</style>


