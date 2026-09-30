const createBarChart = (data) => {

    const viewW = 500, viewH = 1600;

    const displayW = 640, displayH = 420;

    const svg = d3.select(".responsive-svg-container")

        .append("svg")

        .attr("viewBox", `0 0 ${viewW} ${viewH}`)

        .attr("width", displayW)

        .attr("height", displayH)

        .style("border", "1px solid black");

    // X scale (numeric)

    const xMax = d3.max(data, d => d.count);

    const xScale = d3.scaleLinear()

        .domain([0, xMax])

        .range([0, viewW]);

    // Create a band scale for the categorical y-axis

    const yScale = d3.scaleBand()

        // Extract all brand names and use them as categories

        .domain(data.map(d => d.brand))

        // Distribute the categories from the top to the bottom of the SVG

        .range([0, viewH])

        // Add space between neighbouring bars

        .paddingInner(0.2)

        // Add space before the first bar and after the last bar

        .paddingOuter(0.1);

    // Bars

    svg.selectAll("rect")

        // connect the dataset to the rectangles

        .data(data)

        // Create rectangles for data and update existing rectangles

        .join("rect")

        // Assign a general class and a count-specific class to each bar

        .attr("class", d => `bar bar-${d.count}`)

        // Start every bar from the left edge of the SVG

        .attr("x", 0)

        // Position each bar vertically according to its brand

        .attr("y", d => yScale(d.brand))

        // Convert each count into a scaled bar width

        .attr("width", d => xScale(d.count))

        // Use the height calculated by the band scale

        .attr("height", yScale.bandwidth())

        // Set the colour of the bars

        .attr("fill", "steelblue");

};