document.addEventListener('DOMContentLoaded', function () {

    // Get the temp data
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
        .then(response => response.json())
        .then(data => {
            // set consts
            const dataset = data.monthlyVariance;
            const years = dataset.map(d => d.year);
            const months = dataset.map(d => d.month - 1); // Subtract 1 to convert to 0-indexed
            const temperatures = dataset.map(d => d.variance);

            // calc max and min temps
            const minTemp = Math.min(...temperatures);
            const maxTemp = Math.max(...temperatures);

            // use the SVG element
            const width = 1200;
            const height = 500;
            const padding = 60;
            const svg = d3.select('#content')
                .attr('width', width)
                .attr('height', height);

            // color scale
            const colorScale = d3.scaleSequential()
                .interpolator(d3.interpolateRdYlBu)
                .domain([maxTemp, minTemp]);

            // Axis Scale
            const xScale = d3.scaleTime()
                .domain([new Date(d3.min(years), 0), new Date(d3.max(years), 0)])
                .range([padding, width ]);
            const yScale = d3.scaleBand()
                .domain(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
                .range([height - padding + 6, padding]);

            // Create a tooltip element for dots
            const tooltip = d3.select('body')
                .append('div')
                .attr('id', 'tooltip')
                .style('opacity', 0);

            // Draw heatmap
            const parseTime = d3.timeParse('%m');

            const rectWidth = Math.ceil((width - padding * 2) / (years.length / 12));
            const rectHeight = Math.ceil((height - padding * 2) / 12);

            svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('class', 'cell')
                .attr('data-month', d => d.months)
                .attr('data-year', d => d.years)
                .attr('data-temp', d => d.temperatures)
                .attr('x', (d, i) => padding + Math.floor(i / 12) * rectWidth)
                .attr('y', (d, i) => padding + (i % 12) * rectHeight)
                .attr('width', rectWidth)
                .attr('height', rectHeight)
                .attr('fill', d => colorScale(d.variance))

                .on("mouseover", function (event, d) {
                    // Show tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    // Update tooltip content
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                    tooltip.html(`${d.year} - ${months[d.month - 1]} <br> Temp: ${(8.66 + d.variance).toFixed(3)}&deg;C <br> Var: ${d.variance >= 0 ? '+' : ''}${d.variance}&deg;C`);
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

            // Axis
            const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat('%Y'));
            const yAxis = d3.axisLeft(yScale)
                .tickSize(0)
                .tickPadding(10);

            svg.append('g')
                .attr('transform', `translate(0, ${height - padding + 5})`)
                .attr('id', 'x-axis')
                .call(xAxis);

            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height - 10)
                .attr('text-anchor', 'middle')
                .text('Year');

            svg.append('g')
                .attr('id', 'y-axis')
                .attr('transform', `translate(${padding}, 0)`)
                .call(yAxis);

            svg.append('text')
                .attr('x', -height / 2)
                .attr('y', padding - 40)
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle')
                .text('Months');
        });
});
