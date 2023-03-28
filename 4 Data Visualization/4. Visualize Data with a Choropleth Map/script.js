
document.addEventListener('DOMContentLoaded', function () {
    // set the width and height of the map
    var width = 960;
    var height = 600;

    // create an SVG element to hold the map
    var svg = d3.select("#content")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // load the counties data from the JSON file
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json", function (error, counties) {
        if (error) throw error;

        // create a geoPath generator to draw the county shapes
        var path = d3.geoPath();

        // draw the county shapes on the map
        svg.selectAll("path")
            .data(counties.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "steelblue");
    });
});


