
document.addEventListener('DOMContentLoaded', function () {
    /*
    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
        .then(response => response.json())
        .then(countyData => {
            fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
                .then(response => response.json())
                .then(eduData => {
                    const contentDiv = document.getElementById("content");
                    const width = contentDiv.offsetWidth;
                    const height = contentDiv.offsetHeight;
                    const svg = d3.select("#content")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

                    const path = d3.geoPath();
                    const counties = topojson.feature(countyData, countyData.objects.counties);
                    const states = topojson.feature(countyData, countyData.objects.states);

                    svg.append("g")
                        .selectAll("path")
                        .data(counties.features)
                        .enter()
                        .append("path")
                        .attr("class", "county")
                        .attr("d", path)
                        .attr("fill", d => {
                            const county = eduData.find(c => c.fips === d.id);
                            if (county) {
                                return colorScale(county.bachelorsOrHigher);
                            }
                            return "#ccc";
                        });

                    svg.append("path")
                        .datum(states)
                        .attr("class", "state")
                        .attr("d", path);
                });
        });

    const colorScale = d3.scaleThreshold()
        .domain([10, 20, 30, 40, 50, 60, 70, 80])
        .range(d3.schemeBlues[9]);
        */
    // set the width and height of the map
    var width = 960;
    var height = 600;

    // create an SVG element to hold the map
    var svg = d3.select("body")
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


