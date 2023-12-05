const csvFilePath = "MBTA_Rail_Ridership.csv"
//const xLabels = ["red line", "blue line", "green line", "orange line"];
  //  const yLabels = [100, 200, 300, 400, 500, 600, 700];
  d3.csv(csvFilePath).then(data => {
    // Extract only the relevant columns: "route_name" and "total_ons"
    const filteredData = data.map(d => ({ route_name: d.route_name, total_ons: +d.total_ons }));


    const accumulatedData = d3.rollup(
      filteredData,
      v => d3.sum(v, d => d.total_ons),
      d => d.route_name
    );
    
    const xLabels = Array.from(accumulatedData.keys());
    const yLabels = Array.from(accumulatedData.values());
  });

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

    svg.select(".x-axis")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");

  svg.select(".y-axis")
    .call(yAxis);

  const bars = g.selectAll(".bar")
    .data(yLabels);

    bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(xLabels[i]))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d))
    .attr("fill", "steelblue");  

    // g.append("g")
    //   .attr("class", "x-axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis)
    //   .selectAll("text")
    //   .attr("y", 10) // Adjust label position
    //   .attr("x", 9) // Adjust label position
    //   .attr("dy", ".35em")
    //   .attr("transform", "rotate(45)") // Rotate labels for better readability
    //   .style("text-anchor", "start");

    // g.append("g")
    //   .attr("class", "y-axis")
    //   .call(yAxis);
    
