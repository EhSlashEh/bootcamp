document.addEventListener('DOMContentLoaded', function () {

    // Get the temp data
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
        .then(response => response.json())
        .then(data => {
            const dataset = data.monthlyVariance;
            const years = dataset.map(d => d.year);
            const months = dataset.map(d => d.month - 1) // Subtract 1 to convert to 0-indexed
                .filter(m => m >= 0 && m <= 11); // Only keep months between 0 and 11
            const temperatures = dataset.map(d => d.variance);

            const minTemp = Math.min(...temperatures);
            const maxTemp = Math.max(...temperatures);

            const width = 1200;
            const height = 500;
            const padding = 60;
            const svg = d3.select('#content')
                .attr('width', width)
                .attr('height', height);

            const colorScale = d3.scaleSequential()
                .interpolator(d3.interpolateRdYlBu)
                .domain([maxTemp, minTemp]);

            const xScale = d3.scaleTime()
                .domain([new Date(d3.min(years), 0), new Date(d3.max(years), 0)])
                .range([padding, width]);
            let monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const yScale = d3.scaleBand()
                .domain(monthsArr)
                .range([height - padding + 6, padding]);

            const tooltip = d3.select('body')
                .append('div')
                .attr('id', 'tooltip')
                .style('opacity', 0);

            const rectWidth = Math.ceil((width - padding * 2) / (years.length / 12));
            const rectHeight = Math.ceil((height - padding * 2) / 12);

            svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('class', 'cell')
                .attr('data-month', (d, i) => d.month - 1)
                .attr('data-year', d => d.year)
                .attr('data-temp', d => d.variance)
                .attr('x', (d, i) => padding + Math.floor(i / 12) * rectWidth)
                .attr('y', (d, i) => padding + (d.month - 1) * rectHeight)
                .attr('width', rectWidth)
                .attr('height', rectHeight)
                .attr('fill', d => colorScale(d.variance))

                .on("mouseover", function (event, d) {
                    tooltip.attr('data-year', d.year); // update the data-year attribute
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(`${d.year} - ${monthsArr[d.month - 1]} <br> Temp: ${(8.66 + d.variance).toFixed(3)}&deg;C <br> Var: ${d.variance >= 0 ? '+' : ''}${d.variance}&deg;C`);
                })
                .on("mousemove", function (event, d) {
                    tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 70) + "px")
                        .style("position", "absolute");
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            const yAxis = d3.axisLeft(yScale);
            svg.append('g')
                .attr('id', 'y-axis')
                .attr('transform', `translate(${padding}, 0)`)
                .call(yAxis);

            const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat('%Y'));
            svg.append('g')
                .attr('id', 'x-axis')
                .attr('transform', `translate(0, ${height - padding + 5})`)
                .call(xAxis);

            const legendRectWidth = 40;
            const legendRectHeight = 20;
            const legendValues = [-7, -4, -1, 2, 5, 8];
            const legendDiv = document.getElementById('legend');
            const legendWidth = legendDiv.clientWidth;
            const legendPadding = 10;
            const legend = d3.select('#legend')
                .append('svg')
                .attr('viewBox', `0 0 ${legendWidth} ${legendRectHeight + legendPadding * 2}`)
                .append('g');

            legend.selectAll('rect')
                .data(legendValues)
                .enter()
                .append('rect')
                .attr('x', (d, i) => i * legendRectWidth)
                .attr('y', 0)
                .attr('width', legendRectWidth)
                .attr('height', legendRectHeight)
                .attr('fill', d => colorScale(d));

            legend.selectAll('text')
                .data(legendValues)
                .enter()
                .append('text')
                .attr('x', (d, i) => i * legendRectWidth + legendRectWidth / 2)
                .attr('y', legendRectHeight + 15) // increase the y value to move the text further down
                .text(d => d + '\u00B0C')
                .style('text-anchor', 'middle')
                .style('font-size', '12px'); // reduce the font size of the text;
        });
});
