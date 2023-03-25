// html loaded
document.addEventListener('DOMContentLoaded', function () {

    // Get the cyclist data
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        .then(response => response.json())
        .then(data => {

            // use a div
            const canvas = document.getElementById('content');
            canvas.width = 800;
            canvas.height = 600;

            // Get a 2D drawing context
            const context = canvas.getContext('2d');

            // Define dimensions and margins
            const margin = { top: 20, right: 20, bottom: 50, left: 70 };
            const width = canvas.width - margin.left - margin.right;
            const height = canvas.height - margin.top - margin.bottom;

            // Define scales for x and y-axes
            const xScale = d3.scaleLinear()
                .domain([d3.min(data, d => d.Year) - 1, d3.max(data, d => d.Year) + 1])
                .range([0, width]);
            const yScale = d3.scaleLinear()
                .domain([d3.max(data, d => d.Seconds), d3.min(data, d => d.Seconds)])
                .range([0, height]);

            // Create circles for each data point
            const circles = d3.select(canvas)
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.Year))
                .attr('cy', d => yScale(d.Seconds))
                .attr('r', 6)
                .attr('fill', d => d.Doping ? 'red' : 'steelblue');

            // Define x and y-axes
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            // Add the x and y-axes to the scatterplot
            d3.select(canvas)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
                .call(xAxis);

            d3.select(canvas)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .call(yAxis);
        });
});
