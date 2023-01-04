<template>
  <div class="d3barchart">

    <div v-if='data'>
        <div class = "container">     
            
<h4 style="text-align: left; margin-top: 40px">MapBox Autozoom</h4>
<div style = 'visibility:hidden; font-size:0px;margin-top:-50px;'>
    <!-- <label for="country1">Country</label><span style="color: red !important; display: inline; float: none;">*</span>       -->
    <!-- Credit to danrovito (Github) -->
    <select id="country1" name="country" class="form-control" onchange="setCountry1(this.value)">
        <option value="Afghanistan">Afghanistan</option>
        <option value="Åland Islands">Åland Islands</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Bouvet Island">Bouvet Island</option>
        <option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
        <option value="Brunei">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo">Congo</option>
        <option value="Cook Islands">Cook Islands</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Ivory Coast">Cote D'ivoire (Ivory Coast)</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
        <option value="Faroe Islands">Faroe Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guiana">French Guiana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guernsey">Guernsey</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-bissau">Guinea-bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran">Iran, Islamic Republic of</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Isle of Man">Isle of Man</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jersey">Jersey</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kiribati">Kiribati</option>
        <option value="North Korea">Korea, North</option>
        <option value="South Korea">Korea, South</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Arab">Libyan Arab Jamahiriya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macau">Macau</option>
        <option value="North Macedonia">Macedonia, The Former Yugoslav Republic of</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Mexico">Mexico</option>
        <option value="Federated States of Micronesia">Micronesia, Federated States of</option>
        <option value="Moldova">Moldova, Republic of</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="Norfolk Island">Norfolk Island</option>
        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Palestinian Territories">Palestinian Territory, Occupied</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Pitcairn">Pitcairn</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="Russia">Russian Federation</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Helena">Saint Helena</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
        <option value="Saint Vincent and the Grenadines">Saint Vincent and The Grenadines</option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Eswatini">Swaziland (Eswatini)</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania">Tanzania, United Republic of</option>
        <option value="Thailand">Thailand</option>
        <option value="Timor leste">Timor-leste</option>
        <option value="Togo">Togo</option>
        <option value="Tokelau">Tokelau</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Vietnam">Vietnam</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
    </select>
    <select id="country2" name="country" class="form-control" onchange="setCountry2(this.value)">
        <option value="Afghanistan">Afghanistan</option>
        <option value="Åland Islands">Åland Islands</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Bouvet Island">Bouvet Island</option>
        <option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
        <option value="Brunei">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo">Congo</option>
        <option value="Cook Islands">Cook Islands</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Ivory Coast">Cote D'ivoire (Ivory Coast)</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
        <option value="Faroe Islands">Faroe Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guiana">French Guiana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guernsey">Guernsey</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-bissau">Guinea-bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran">Iran, Islamic Republic of</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Isle of Man">Isle of Man</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jersey">Jersey</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kiribati">Kiribati</option>
        <option value="North Korea">Korea, North</option>
        <option value="South Korea">Korea, South</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Arab">Libyan Arab Jamahiriya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macau">Macau</option>
        <option value="North Macedonia">Macedonia, The Former Yugoslav Republic of</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Mexico">Mexico</option>
        <option value="Federated States of Micronesia">Micronesia, Federated States of</option>
        <option value="Moldova">Moldova, Republic of</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="Norfolk Island">Norfolk Island</option>
        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Palestinian Territories">Palestinian Territory, Occupied</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Pitcairn">Pitcairn</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="Russia">Russian Federation</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Helena">Saint Helena</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
        <option value="Saint Vincent and the Grenadines">Saint Vincent and The Grenadines</option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Eswatini">Swaziland (Eswatini)</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania">Tanzania, United Republic of</option>
        <option value="Thailand">Thailand</option>
        <option value="Timor leste">Timor-leste</option>
        <option value="Togo">Togo</option>
        <option value="Tokelau">Tokelau</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Vietnam">Vietnam</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
    </select>
    </div>

    <div class="maps">

    <section class="mapbox_child">
        <div id='map2'></div>
    </section>

    <section class="mapbox_child">
        <div id='map3'></div>
    </section>
</div>
            
               </div>





    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson'
import * as mapboxgl from 'mapbox-gl'

export default {
  name: 'mapBox',
  props: {
    title: String,
    data: {  //this.data in component
      type: Array
    }    
  },
  methods: {
    mapBox() {

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
    //   .attr("xlink:href", ramp(color.interpolator()).toDataURL());

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

                // function ramp(color, n = 256) {
                //   const canvas = DOM.canvas(n, 1);
                //   const context = canvas.getContext("2d");
                //   for (let i = 0; i < n; ++i) {
                //     context.fillStyle = color(i / (n - 1));
                //     context.fillRect(i, 0, 1, 1);
                //   }
                //   return canvas;
                // }

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
        // console.log("HERE")
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


    d3.select('#country1').on('click',function(){
        setCountry1(this.value);
  });

    d3.select('#country2').on('click',function(){
        setCountry2(this.value);
  });



    



  
  

    },
  },
  mounted() {

      
 

    
    //              let script_1 = document.createElement('script');
    //   script_1.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js');
    //   document.head.appendChild(script_1);



    this.mapBox();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

    <style>
        .maps {
    border: 3px solid #fff;
    /*padding: 1%;*/
}
        .mapbox_child {
            position: relative;
            height: 300px !important;
            /*width: 500px !important;*/
            display: inline-block;
            float: left;
            width: 45%;
            padding: 20px;
    /*border: 2px solid red;*/

        }

        #map2 {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 95%;
        }
        #map3 {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 95%;
        }
    </style>