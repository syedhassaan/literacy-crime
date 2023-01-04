# Final presentation transcript

Topic: Presentation Transcript

Team name: DATArt

Team members:

- Rehan Ahmed rehanahm@usc.edu
- Jimi Cao jimicao@usc.edu
- Vicky Yu vickyyu@usc.edu
- Syed Hassaan syedhass@usc.edu

---

## Title
Hello, my name is Jimi and this is my partner Vicky and we are going to present our project.

## Slide 1
Our data is primarily about the comparison between education levels and crime rates in countries around the world. We obtain or data from the UN data source. More specifically, we selected gender-wise tertiary education and intentional homicides per 100,000 population as our metrics.

## Slide 2
This data could be used by investors and business owners who want to expand their business to new countries. It could be viewed by politicians to assist in deciding where to allocate resources. It could also be used by families to help determine if they want to move to a certain country.

## Slide 3
However, what we found was that there was no centralized location to view all the information across all countries in one location. We created a centralized hub that contains all the information to easily allow users to view and compare the data between countries in one place.

## Slide 4
We found 2 research articles that also looked into the correlation between education and crime rate. They found that increasing education lead to a lowering of crime rate. There are also many others sources that explore and display relations between these two data and/or among many countries.

## Slide 5
Now I'll be talking a bit about the implementation detail.
As Jimi mentioned before, we have multiple seaparate datasets of educaiton and crime from the UN website, but to find the relationship and determine correlation between the two, we had to merge the datasets using the Pandas library from python.

## Slide 6
On the left, you can see our application layout and on the right, you can see some of the tools and frameworks used for our application. Vue was used to create the web application and bootstrap was used for styling. D3 was used to create the choropleth map, bar charts, and line charts. Mapbox was used to create the country comparison map. Lastly, this application was deployed to Heroku.


## Slide 7
Zooming in, we want to illustrate to our audience the safest, least safe, most and least literate countries through a choropleth map that allows you to easily point out the regions visually are safe in terms of crime and education relative to other countries in the world.

## Slide 8
To be a bit more specific in terms of countries we suggest our target audience to consider moving into or investing in, we show the top 20 and bottom 20 countries in terms of education and crime through a bar chart.

## Slide 9
In case our target audience are really interested and debating between two countries, we allow them to interact with our application through a dropdown that allows them to compare two countries and plots the data on a line chart.

## Slide 10
Lastly, we used a mapbox to automatically zoom into the countries selected for comparison and display the crime and education data on hover.
