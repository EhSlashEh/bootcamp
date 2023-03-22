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

            // Bind data to rect elements
            svg.selectAll("rect")
                .data(data.data)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * 4)
                .attr("y", (d) => 500 - d[1] / 50)
                .attr("width", 3)
                .attr("height", (d) => d[1] / 50)
                .attr("fill", "steelblue");
        })
    }
);