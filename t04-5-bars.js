const createBarChart = (data) => {
const svg = d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", "0 0 1200 400")
.style("border", "1px solid black");
svg
.selectAll("rect")
.data(data)
.join("rect")
.attr("class", d => `bar bar-${d.count}`)
.attr("width", d => d.count) // uses your numeric column directly
.attr("height", 16); // constant bar height
};