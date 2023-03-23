// html loaded
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
        // Create SVG element
        const svg = d3.select("#content")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500);

        const padding = 60;

        // Define x and y scales
        const xScale = d3.scaleTime()
            .domain([new Date(d3.min(data.data, d => d[0])), new Date(d3.max(data.data, d => d[0]))])
            .range([padding, 800 - padding]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data.data, d => d[1])])
            .range([500 - padding, padding]);

        // Create x and y axis
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Bind data to rect elements
        svg.selectAll("rect")
            .data(data.data)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(new Date(d[0])))
            .attr("y", (d) => yScale(d[1]))
            .attr("width", 2)
            .attr("height", (d) => 500 - yScale(d[1]) - padding)
            .attr("fill", "steelblue");

        // Add x and y axis to SVG
        svg.append("g")
            .attr("transform", "translate(0," + (500 - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
    });
});
