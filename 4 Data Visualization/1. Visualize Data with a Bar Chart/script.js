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
        const formatDate = d3.timeFormat("%Y-%m-%d");

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

        // Add tooltip on mouse over
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("display", "none")
            .style("background-color", "white")
            .style("padding", "10px");

        // Bind data to rect elements
        svg.selectAll("rect")
            .data(data.data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(new Date(d[0])))
            .attr("y", (d) => yScale(d[1]))
            .attr("width", 2)
            .attr("height", (d) => 500 - yScale(d[1]) - padding)
            .attr("fill", "steelblue")
            .attr("data-date", (d) => d[0]) // attach data-date attribute to each bar
            .attr("data-gdp", (d) => d[1]) // attach data-gdp attribute to each bar

            .on("mouseover", function (event, d) {
                tooltip.style("display", "block")
                    .attr("data-date", this.getAttribute("data-date")) // get data-date attribute of moused-over bar
                    .html(formatDate(new Date(this.getAttribute("data-date"))) + "<br>" + "$" + this.getAttribute("data-gdp") + " Billion") // format tooltip text
                    .style("left", (event.pageX + 10) + "px") // position tooltip next to mouse
                    .style("top", (event.pageY - 30) + "px");

            })
            .on("mousemove", function (event, d) {
                tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 30) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.style("display", "none");
            });

        // Add x and y axis to SVG
        svg.append("g")
            .attr("transform", "translate(0," + (500 - padding) + ")")
            .attr("id", "x-axis") // add an ID to the g element
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .attr("id", "y-axis") // add an ID to the g element
            .call(yAxis);

        // Add x and y axis labels
        svg.append("text")
            .attr("x", 400)
            .attr("y", 480)
            .text("Year");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -290)
            .attr("y", 10)
            .text("GDP (billions of dollars)");
    });
});
