const createBarChart = (data) => {
    // --- Sizes (logical vs. display) ---
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);

    // --- 1. DEFINE labelX FIRST 
    const labelX = 180;

    // --- SVG root ---
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
            .attr("viewBox", `0 0 ${viewW} ${viewH}`)
            .attr("width", displayW)
            .attr("height", displayH)
            .style("border", "1px solid #ccc");

    // --- Scales ---
    const xMax = d3.max(data, d => d.count);
    
    // Uses labelX to prevent overflow past the right border
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW - labelX - 40]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) 
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // --- Group per row ---
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
            .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // --- Bar rectangle inside the group ---
    barAndLabel
        .append("rect")
            .attr("x", labelX) // Start bar exactly at labelX
            .attr("y", 0)
            .attr("width", d => xScale(d.count))
            .attr("height", yScale.bandwidth())
            .attr("fill", "steelblue");

    // --- Category text (Brand name) ---
    barAndLabel
        .append("text")
            .text(d => d.brand)
            .attr("x", labelX - 5) // Position 5px to the left of bar start
            .attr("y", 15)
            .attr("text-anchor", "end") // Right-aligned
            .style("font-family", "sans-serif")
            .style("font-size", "13px");

    // --- Value text (Count) ---
    barAndLabel
        .append("text")
            .text(d => d.count)
            .attr("x", d => labelX + xScale(d.count) + 4) // Position 4px past bar end
            .attr("y", 12)
            .style("font-family", "sans-serif")
            .style("font-size", "13px");
};