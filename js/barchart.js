// create the bar chart
const xLabels = ["red line", "blue line", "green line", "orange line"];
    const yLabels = [100, 200, 300, 400, 500, 600, 700];

    const svg = d3.select("svg"),
      margin = { top: 60, right: 50, bottom: 30, left: 400 },
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .domain(xLabels)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(yLabels)])
      .range([height, 0]);

    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 10) // Adjust label position
      .attr("x", 9) // Adjust label position
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)") // Rotate labels for better readability
      .style("text-anchor", "start");

    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis);