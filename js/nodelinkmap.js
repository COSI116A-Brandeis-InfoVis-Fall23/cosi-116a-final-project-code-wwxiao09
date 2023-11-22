let margin = {
  top: 20,
  left: 50,
  right: 30,
  bottom: 35
};

const nodesData = [];

// Generate 4 lines of 20 nodes each
for (let i = 0; i < 4; i++) {
  let lineColor, lineLabel;
  switch (i) {
    case 0:
      lineColor = "green";
      lineLabel = "Green Line";
      break;
    case 1:
      lineColor = "blue";
      lineLabel = "Blue Line";
      break;
    case 2:
      lineColor = "orange";
      lineLabel = "Orange Line";
      break;
    case 3:
      lineColor = "red";
      lineLabel = "Red Line";
      break;
  }

  for (let j = 0; j < 20; j++) {
    nodesData.push({
      x: 50 + j * 25, // Adjust x position based on index
      y: 50 + i * 100, // Adjust y position for each line
      id: i * 20 + j + 1, // Assign a unique ID to each node
      color: lineColor // Assign color to nodes in the line
    });
  }

  // Add text label for each line
  d3.select("#nodeLinkMap") // Select SVG by ID
    .append("text")
    .attr("class", "line-label")
    .attr("x", 400)
    .attr("y", 70 + i * 100)
    .text(lineLabel);
}

// Create the SVG
const svg = d3.select("#nodeLinkMap"), // Select SVG by ID
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Create nodes
const nodes = svg.selectAll(".node")
  .data(nodesData)
  .enter().append("circle")
  .attr("class", "node")
  .attr("r", 5) // Node radius
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .style("fill", d => d.color);

