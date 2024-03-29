document.addEventListener('DOMContentLoaded', function () {

    // Get the cyclist data
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        .then(response => response.json())
        .then(data => {

            // use the SVG element
            const svg = d3.select('#content');
            svg.attr('width', 800)
                .attr('height', 600);

            // Define dimensions and margins
            const margin = { top: 20, right: 20, bottom: 50, left: 50 };
            const width = svg.attr('width') - margin.left - margin.right;
            const height = svg.attr('height') - margin.top - margin.bottom;

            // Define scales for x and y-axes
            const xScale = d3.scaleLinear()
                .domain([d3.min(data, dataPoint => dataPoint.Year) - 1, d3.max(data, dataPoint => dataPoint.Year) + 1])
                .range([0, width]);

            const yMin = d3.min(data, dataPoint => dataPoint.Seconds);
            const yMax = d3.max(data, dataPoint => dataPoint.Seconds);
            const yPadding = (yMax - yMin) * 0.05; // 5% padding on both top and bottom
            const yScale = d3.scaleLinear()
                .domain([yMin - yPadding, yMax + yPadding])
                .range([0, height]);

            // Create a tooltip element for dots
            const tooltip = d3.select('body')
                .append('div')
                .attr('id', 'tooltip')
                .style('opacity', 0);

            // Create circles for each data point
            const circles = svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.Year) + margin.left)
                .attr('cy', d => yScale(d.Seconds) + margin.top)
                .attr('r', 6)
                .attr("class", "dot")
                .attr("data-xvalue", d => d.Year)
                .attr("data-yvalue", d => new Date(1970, 0, 1, 0, Math.floor(d.Seconds / 60), d.Seconds % 60))
                .attr('fill', d => d.Doping ? 'red' : 'green')

                .on("mouseover", function (event, d) {
                    // Show tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    // Update tooltip content
                    tooltip.html(`${d.Name}<br/>${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br/>${d.Doping}`)
                        .attr("data-year", d.Year); // Add data-year attribute

                })
                .on("mousemove", function (event, d) {
                    // Update tooltip position
                    tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 70) + "px")
                        .style("position", "absolute");
                })
                .on("mouseout", function (d) {
                    // Hide tooltip
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            // Define x and y-axes
            const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
            const yAxis = d3.axisLeft(yScale).tickFormat(d => {
                const date = new Date(1970, 0, 1, 0, 0, d);
                return d3.timeFormat('%M:%S')(date);
            });
            // Add the x and y-axes to the scatterplot
            svg.append("g")
                .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
                .attr("id", "x-axis")
                .call(xAxis);

            svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .attr("id", "y-axis")
                .call(yAxis);

            // a legend
            const legend = svg.append('g')
                .attr('id', 'legend')
                .attr('transform', `translate(${width - 130}, ${height - 300})`);

            legend.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'red');

            legend.append('text')
                .attr('x', 25)
                .attr('y', 15)
                .text('Doping Allegations');

            legend.append('rect')
                .attr('x', 0)
                .attr('y', 30)
                .attr('fill', 'green');

            legend.append('text')
                .attr('x', 25)
                .attr('y', 45)
                .text('No Doping Allegations');
        });
});
