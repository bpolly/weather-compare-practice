document.addEventListener("DOMContentLoaded", function(){
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    var bData = [
        { city: 'Columbus', month: 1, avg: '36' },
        { city: 'Columbus', month: 2, avg: '40' },
        { city: 'Columbus', month: 3, avg: '52' },
        { city: 'Columbus', month: 4, avg: '64' },
        { city: 'Columbus', month: 5, avg: '74' },
        { city: 'Columbus', month: 6, avg: '82' },
        { city: 'Columbus', month: 7, avg: '85' },
        { city: 'Columbus', month: 8, avg: '84' },
        { city: 'Columbus', month: 9, avg: '78' },
        { city: 'Columbus', month: 10, avg: '66' },
        { city: 'Columbus', month: 11, avg: '53' },
        { city: 'Columbus', month: 12, avg: '41' },
    ];
    //Read the data
    //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
    //d3.json(bData,
      // When reading the csv, I must format variables:
      //function(d){
        //return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
        //return { date: d.month, value: d.avg }
      //},
      // Now I can use this dataset:
    //  function(data) {

    var data = bData;
    var monthNums = [1,2,3,4,5,6,7,8,9,10,11,12];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.month; }))
    .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3.axisBottom(x)
          .tickValues(monthNums)
          .tickFormat((d, i) => monthNames[i])
    );

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.avg; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y))

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Degrees f °");
        // .append("text")
        // .attr("fill", "black")//set the fill here
        // .attr("transform","translate(120, 40)")
        // .text("Hello World!!!");

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
            .x(function(d) { return x(d.month) })
            .y(function(d) { return y(d.avg) })
           )
});
