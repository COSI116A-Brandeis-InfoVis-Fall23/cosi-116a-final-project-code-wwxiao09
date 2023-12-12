((() => {
  d3.json("https://cosi116a-brandeis-infovis-fall23.github.io/cosi-116a-final-project-code-wwxiao09/data/line_chart_data.json", (calculated_data) => {

    const svgWidth = 1400;
    const svgHeight = 400;

    const margin = { top: 20, right: 60, bottom: 180, left: 40 };
    const plotWidth = (svgWidth / 3) - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#chart")
      .attr("width", svgWidth)
      .attr("height", svgHeight+50);


      
    // Create the first plot
    const g1 = svg.append("g")
      .attr("transform", `translate(${margin.left + 200},${margin.top + 80})`);

    const brush = d3.brushX()
      .extent([[0, 0], [plotWidth, height]])
      .on("end", brushed); // Define what happens on brush end

    // Append the brush to the chart
    g1.append("g")
      .attr("class", "brush")
      .call(brush);

    const xLabels1 = ["Very Early Morning", 'Early AM', 'AM Peak', 'Midday Base', 'Midday School', "PM Peak", "Evening", "Late Evening", "Night"];
    const yLabels1 = [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];

    const xScale1 = d3.scaleBand()
      .domain(xLabels1)
      .range([0, plotWidth])
      .padding(0.1);

    const yScale1 = d3.scaleLinear()
      .domain([0, d3.max(yLabels1)])
      .range([height, 0]);

    const xAxis1 = d3.axisBottom(xScale1);
    const yAxis1 = d3.axisLeft(yScale1);

    g1.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis1)
          .selectAll("text")
          .attr("y", 10) // Adjust label position
          .attr("x", 9) // Adjust label position
          .attr("dy", ".5em")
          .attr("transform", "rotate(45)") // Rotate labels for better readability
          .style("text-anchor", "start")
          .style("font-size", "11px");

    g1.append("g")
      .attr("class", "y-axis")
      .call(yAxis1)
      .style("font-size", "12px");

    // X Axis Label
    g1.append("text")
      .attr("transform", "translate(" + (margin.left + plotWidth / 2 - 20) + " ," + (svgHeight - margin.bottom / 3 - 30) + ")")
      .style("text-anchor", "middle")
      .text("Different Time Periods of the Day");

    // Y Axis Label
    g1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left / 5 - 70)
      .attr("x", 0 - (svgHeight / 2) + 100)
      .style("text-anchor", "middle")
      .text("Average Passenger Flow");

    // title
    addTitle(g1, "Average Passenger Flow Throughout the Day");
      
    const dataLines = [
      [
        { x: "Very Early Morning", y: calculated_data[1]["VERY_EARLY_MORNING"]['avgFlow'] },
        { x: "Early AM", y: calculated_data[1]["EARLY_AM"]['avgFlow'] },
        { x: "AM Peak", y: calculated_data[1]["AM_PEAK"]['avgFlow'] },
        { x: "Midday Base", y: calculated_data[1]["MIDDAY_BASE"]['avgFlow'] },
        { x: "Midday School", y: calculated_data[1]["MIDDAY_SCHOOL"]['avgFlow'] },
        { x: "PM Peak", y: calculated_data[1]["PM_PEAK"]['avgFlow'] },
        { x: "Evening", y: calculated_data[1]["EVENING"]['avgFlow'] },
        { x: "Late Evening", y: calculated_data[1]["LATE_EVENING"]['avgFlow'] },
        { x: "Night", y: calculated_data[1]["NIGHT"]['avgFlow'] }

      ],
      [
        { x: "Very Early Morning", y: calculated_data[3]["VERY_EARLY_MORNING"]['avgFlow'] },
        { x: "Early AM", y: calculated_data[3]["EARLY_AM"]['avgFlow'] },
        { x: "AM Peak", y: calculated_data[3]["AM_PEAK"]['avgFlow'] },
        { x: "Midday Base", y: calculated_data[3]["MIDDAY_BASE"]['avgFlow'] },
        { x: "Midday School", y: calculated_data[3]["MIDDAY_SCHOOL"]['avgFlow'] },
        { x: "PM Peak", y: calculated_data[3]["PM_PEAK"]['avgFlow'] },
        { x: "Evening", y: calculated_data[3]["EVENING"]['avgFlow'] },
        { x: "Late Evening", y: calculated_data[3]["LATE_EVENING"]['avgFlow'] },
        { x: "Night", y: calculated_data[3]["NIGHT"]['avgFlow'] }
      ],
      [
        { x: "Very Early Morning", y: calculated_data[2]["VERY_EARLY_MORNING"]['avgFlow'] },
        { x: "Early AM", y: calculated_data[2]["EARLY_AM"]['avgFlow'] },
        { x: "AM Peak", y: calculated_data[2]["AM_PEAK"]['avgFlow'] },
        { x: "Midday Base", y: calculated_data[2]["MIDDAY_BASE"]['avgFlow'] },
        { x: "Midday School", y: calculated_data[2]["MIDDAY_SCHOOL"]['avgFlow'] },
        { x: "PM Peak", y: calculated_data[2]["PM_PEAK"]['avgFlow'] },
        { x: "Evening", y: calculated_data[2]["EVENING"]['avgFlow'] },
        { x: "Late Evening", y: calculated_data[2]["LATE_EVENING"]['avgFlow'] },
        { x: "Night", y: calculated_data[2]["NIGHT"]['avgFlow'] }
      ],
      [
        { x: "Very Early Morning", y: calculated_data[0]["VERY_EARLY_MORNING"]['avgFlow'] },
        { x: "Early AM", y: calculated_data[0]["EARLY_AM"]['avgFlow'] },
        { x: "AM Peak", y: calculated_data[0]["AM_PEAK"]['avgFlow'] },
        { x: "Midday Base", y: calculated_data[0]["MIDDAY_BASE"]['avgFlow'] },
        { x: "Midday School", y: calculated_data[0]["MIDDAY_SCHOOL"]['avgFlow'] },
        { x: "PM Peak", y: calculated_data[0]["PM_PEAK"]['avgFlow'] },
        { x: "Evening", y: calculated_data[0]["EVENING"]['avgFlow'] },
        { x: "Late Evening", y: calculated_data[0]["LATE_EVENING"]['avgFlow'] },
        { x: "Night", y: calculated_data[0]["NIGHT"]['avgFlow'] }
      ]
    ];
    console.log(calculated_data);
    // Define line colors
    const lineColors = ["blue", "red", "orange", "green"];

    lineChartAddLines();

    function lineChartAddLines(){
      // Create line generators for each line
      const lineGenerator = d3.line()
        .x(d => xScale1(d.x) + xScale1.bandwidth() / 2) // Adjust x position for the line
        .y(d => yScale1(d.y));

      // Append the lines to the SVG
      const lines = g1.selectAll(".line")
        .data(dataLines)
        .enter().append("g")
        .attr("class", "line-group");

      lines.append("path")
        .attr("class", "line")
        .attr("d", d => lineGenerator(d))
        .style("stroke", (d, i) => lineColors[i])
        .style("fill", "none")
        .style("stroke-width", 2);

      lines.selectAll(".dot")
        .data(d => d) 
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale1(d.x) + xScale1.bandwidth() / 2) 
        .attr("cy", d => yScale1(d.y)) 
        .attr("r", 4) 
        .style("fill", "#fff") 
        .style("stroke", "#000") 
        .style("stroke-width", 1.5)
        .on("mouseover", showData)
        .on("mouseout", hideData);
      
      function showData(d) {
        // Show data on mouseover
        g1.append("text")
          .attr("class", "data-text")
          .attr("x", xScale1(d.x) + xScale1.bandwidth() / 2)
          .attr("y", yScale1(d.y) - 10)
          .text(Math.round(d.y))
          .style("text-anchor", "middle")
          .style("font-size", "12px")
          .style("fill", "#000");
      }
      
      function hideData() {
        // Remove text on mouseout
        g1.selectAll(".data-text").remove();
      }

    }


    // Add Legend
    lineChartAddLegend();

    function lineChartAddLegend(){
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${plotWidth + margin.left * 5},${margin.top + 50})`);

      // Add colored lines and corresponding labels to the legend
      lineColors.forEach((color, i) => {
        legend.append("line")
          .attr("x1", 0)
          .attr("y1", i * 30)
          .attr("x2", 20)
          .attr("y2", i * 30)
          .attr("stroke", color)
          .style("stroke-width", 2);

        legend.append("text")
          .attr("x", 30)
          .attr("y", i * 30)
          .attr("dy", "0.35em")
          .text(`${color.charAt(0).toUpperCase() + color.slice(1)} Line`)
          .style("font-size", "14px");
      });

    }
    

    // Create a table

    let table = timeTable(xLabels1, highlightPoints);



    function highlightPoints(label) {
      table.selectAll("td")
      // .style("background-color", "lightblue");
      .classed("table-highlighted", false)
      .classed("table-non-highlighted", true);

      d3.select(this)
      // .style("background-color", "yellow");
      .classed("table-highlighted", true)
      .classed("table-non-highlighted", false);

      const index = xLabels1.indexOf(label);
      
      const categoryColor = xLabels1[index];

      // g1.selectAll(".dot")
      //     .style("fill", d => d.color === categoryColor ? "red" : "#fff");
      g1.selectAll(".dot")
        .classed("selected-dot", d => d.color === categoryColor)
        .classed("non-selected-dot", d => !d.color === categoryColor);
      
      dataLines.forEach((line, lineIndex) => {
        line.forEach(dot => {
          if (dot.x === label) {
            g1.select(`.line-group:nth-child(${lineIndex+7}) .dot:nth-child(${line.indexOf(dot)+2})`)
              // .style("fill", "red");
              .classed("selected-dot", true).classed("non-selected-dot", false);
          }
        });
      });

      const updated_average_array = [];

      calculated_data.forEach(data => {
        // Assuming label is the key you want to access in each dictionary
        const valueForLabel = data[label.toUpperCase().split(' ').join('_')]['avgFlow']; // Accessing the value for the provided label key
        updated_average_array.push(valueForLabel);
      });


      // Update g2 based on the updated_average_array
      updateBarChart(updated_average_array, xLabels1);

    }


    function brushed() {
      const selection = d3.event.selection;
    
      if (!selection) {
        // Reset table if no selection
        // table.selectAll("td").style("background-color", "lightblue");
        table.selectAll("td").classed("table-highlighted", false).classed("table-non-highlighted", true);
    
        // Reset dot colors
        // g1.selectAll(".dot").style("fill", "#fff");
        g1.selectAll(".dot").classed("selected-dot", false).classed("non-selected-dot", true);
        const updated_average_array = updateBarChartData(xLabels1);
        updateDetailData(xLabels1);
        updateBarChart(updated_average_array, xLabels1);
        return;
      }
    
      // Get the selected dots based on the x-axis position
      const selectedXValues = [];
    
      // g1.selectAll(".dot")
      //   .each(function(d) {
      //     const dotX = +d3.select(this).attr("cx");
      //     if (dotX >= selection[0] && dotX <= selection[1]) {
      //       selectedXValues.push(d.x);
    
      //       // Change selected dots color to red
      //       d3.select(this).style("fill", "red");
      //     }else {
      //       // Reset non-selected dots to their original color
      //       d3.select(this).style("fill", "#fff");
      //     }
      //   });

      g1.selectAll(".dot")
        .each(function(d) {
        const dotX = +d3.select(this).attr("cx");
        if (dotX >= selection[0] && dotX <= selection[1]) {
          selectedXValues.push(d.x);
          d3.select(this).classed("selected-dot", true).classed("non-selected-dot", false);
        } else {
          d3.select(this).classed("selected-dot", false).classed("non-selected-dot", true);
        }
      });

    
      // Highlight corresponding table entries
      // table.selectAll("td")
      //   .style("background-color", d =>
      //     selectedXValues.includes(d) ? "yellow" : "lightblue"
      //   );

      table.selectAll("td")
        .each(function(d) {
        if (selectedXValues.includes(d)){
          d3.select(this).classed("table-highlighted", true).classed("table-non-highlighted", false);
          // d3.select(this).style("background-color", "yellow")
        } else {
          d3.select(this).classed("table-highlighted", false).classed("table-non-highlighted", true);  
        }
      });
      

      const updated_average_array = updateBarChartData(getSelectedTimePeriod(selectedXValues));
      updateDetailData(getSelectedTimePeriod(selectedXValues));
      updateBarChart(updated_average_array, getSelectedTimePeriod(selectedXValues));

    }


    let isBrushing = false;
    let selectedValues = [];
    
    // Function to handle table brushing
    function handleTableBrushing(values) {
      const updated_average_array = updateBarChartData(values);
      updateDetailData(values);
      // Update bar chart based on selected values
      updateBarChart(updated_average_array, values);
    
      // Highlight corresponding dots in the line chart
      g1.selectAll(".dot")
        .each(function(d) {
          const isSelected = values.includes(d.x);
    
          // Change dot color based on selection in table
          d3.select(this).classed("selected-dot", isSelected)
          .classed("non-selected-dot", !isSelected);
        });
    
      // Highlight corresponding table entries
      // table.selectAll("td")
      //   .style("background-color", d =>
      //     values.includes(d) ? "yellow" : "lightblue"
      //   );

      table.selectAll("td")
        .each(function(d) {
        if (values.includes(d)){
          d3.select(this).classed("table-highlighted", true).classed("table-non-highlighted", false);
        } else {
          d3.select(this).classed("table-highlighted", false).classed("table-non-highlighted", true);  
        }
      });
    }

    // Attach mousedown event to table cells for starting the brushing
    table.selectAll("td")
    .on("mousedown", function(d) {
      g1.select(".brush").call(brush.move, null);
      isBrushing = true;
      selectedValues = []; // Reset selected values on starting a new brush

      // table.selectAll("td").style("background-color", "lightblue");
      table.selectAll("td").classed("table-non-highlighted", true).classed("table-highlighted", false);

      // Highlight the cell on mousedown
      // d3.select(this).style("background-color", "yellow");
      d3.select(this).classed("table-non-highlighted", false).classed("table-highlighted", true);

      // Store the value of the cell for brushing
      selectedValues.push(d);

      // Prevent text selection during brushing
      d3.event.preventDefault();
    });
      // Attach mousemove event for brushing while dragging over cells
    table.selectAll("td")
      .on("mousemove", function(d) {
        if (isBrushing) {
          // Highlight the cell on mousemove within the table
          // d3.select(this).style("background-color", "yellow");
          d3.select(this).classed("table-non-highlighted", false).classed("table-highlighted", true);
    
          // Store the value of the cell for brushing
          if (!selectedValues.includes(d)) {
            selectedValues.push(d);
          }
    
          // Prevent text selection during brushing
          d3.event.preventDefault();
        }
      });
      
    // Attach mouseup event to stop the brushing and trigger the handleTableBrushing function
    d3.select("body")
      .on("mouseup", function() {
        if (isBrushing) {
          isBrushing = false;
    
          // Handle the selection in the table after brushing ends
          handleTableBrushing(selectedValues);
        }
      });
      

      
    // Create the second plot

    const g2 = svg.append("g")
      .attr("transform", `translate(${plotWidth + margin.left * 2 + 400},${margin.top + 80})`);
      const average_array = [];

    calculated_data.forEach(data => {
      let sum = 0;
      let count = 0;
      for (let key in data) {
        if (key !== 'Route_name') { // Assuming 'Route_name' is not part of the sum
          sum += data[key]['avgFlow'];
          count += 1;
        }
      }
      const average = Math.round(sum/count);
      average_array.push(average);
    });

    const xLabels2 = ["blue line", "red line", "orange line", "green line"];
    const yLabels2 = yLabels1;

    const xScale2 = d3.scaleBand()
      .domain(xLabels2)
      .range([0, plotWidth])
      .padding(0.1);

    const yScale2 = d3.scaleLinear()
      .domain([0, d3.max(yLabels2)])
      .range([height, 0]);

    const xAxis2 = d3.axisBottom(xScale2);
    const yAxis2 = d3.axisLeft(yScale2);

    g2.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis2)
      .style("font-size", "15px");

    g2.append("g")
      .attr("class", "y-axis")
      .call(yAxis2)
      .style("font-size", "12px");

    // X Axis Label
    g2.append("text")
      .attr("transform", "translate(" + (margin.left + plotWidth / 2 - 20) + " ," + (svgHeight - margin.bottom / 3 - 30) + ")")
      .style("text-anchor", "middle")
      .text("Four MBTA Lines");

    // Y Axis Label
    g2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left / 5 - 70)
      .attr("x", 0 - (svgHeight / 2) + 100)
      .style("text-anchor", "middle")
      .text("Average Passenger Flow");

    // title
    addTitle(g2, "Average Passenger Flow For the Selected Time Period(s)");

    const details = detailData(xLabels1);
    console.log(details)

    function detailData(timePeriods){
      const colors = ['green', 'blue', 'orange', 'red'];
      const result = {};
      colors.forEach((color, i) => {
        const averages = [];
        const ons = [];
        const offs = [];
        timePeriods.forEach(time => {
          ons.push(calculated_data[i][time.toUpperCase().split(' ').join('_')]["avgOns"]);
          offs.push(calculated_data[i][time.toUpperCase().split(' ').join('_')]["avgOffs"]);
        })
        const avgOns = ons.reduce((acc, val) => acc + val, 0) / ons.length;
        const avgOffs = offs.reduce((acc, val) => acc + val, 0) / offs.length;
        result[color] = { ons: avgOns, offs: avgOffs };

      });
      

      return result; // green, blue, orange, red

    }

    const data = [average_array[1], average_array[3], average_array[2], average_array[0]]; 
    const barColors = ['blue', 'red', 'orange', 'green']; 
    
    // Create bars
    g2.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale2(xLabels2[i]))
      .attr("y", d => yScale2(d))
      .attr("width", xScale2.bandwidth() * 0.8) 
      .attr("height", d => height - yScale2(d))
      .style("fill", (d, i) => barColors[i])
      .on("mouseover", function(d, i) {
        console.log("cliked on bars")
        const colorDetails = details[barColors[i]]; // Get details for the clicked color
        const ons = colorDetails.ons;
        const offs = colorDetails.offs;
        g2.append("text")
          .attr("class", "data-text")
          .attr("x", xScale2(xLabels2[i]) + xScale2.bandwidth() / 2)
          .attr("y", yScale2(d) - 50) // Adjust vertical position for the first line
          .style("text-anchor", "middle")
          .style("font-size", "14px")
          .style("fill", "#000")
          .text(`Avg Ons: ${Math.round(ons)}`)
          .append("tspan")
          .attr("x", xScale2(xLabels2[i]) + xScale2.bandwidth() / 2)
          .attr("dy", "1.2em") // Set the line spacing for the second line
          .text(`Avg Offs: ${Math.round(offs)}`);
    
      })
      .on("mouseout", function() {
        g2.selectAll(".data-text").remove();
      });
    
    // Add labels to the bars
    g2.selectAll(".bar-label")
      .data(data)
      .enter().append("text")
      .attr("class", "bar-label")
      .attr("x", (d, i) => xScale2(xLabels2[i]) + xScale2.bandwidth() / 2)
      .attr("y", d => yScale2(d) - 5) 
      .attr("text-anchor", "middle")
      .text(d => d)
      .style("font-size", "14px");


    function getSelectedTimePeriod(selectedXValues) {
      const selected = new Set();
    
      selectedXValues.forEach(selectedX => {
        selected.add(selectedX); 
      });
    
      return selected;
    }
    
    function updateBarChartData(selectedTime) {

      const updatedData = [];
    
      calculated_data.forEach(dictionary => {
        let sum = 0;
        let count = 0;
        // Iterate through each key-value pair in the dictionary
        for (const key of selectedTime) {
          sum += dictionary[key.toUpperCase().split(' ').join('_')]['avgFlow'];
          count++;
        }
    
        // Calculate the average for the selected keys in the dictionary
        const average = count > 0 ? sum / count : 0;
        updatedData.push(average);
      });
    
      return updatedData;
    }
      
    function updateBarChart(data, timePeriod){
     
      const updatedData = [
        Math.round(data[1]),
        Math.round(data[3]),
        Math.round(data[2]),
        Math.round(data[0])
      ];
    
      g2.selectAll(".bar")
        .data(updatedData)
        .transition()
        .duration(500) // Add transition for a smooth update effect
        .attr("y", d => yScale2(d))
        .attr("height", d => height - yScale2(d))
        .style("fill", (d, i) => barColors[i]);
    
      g2.selectAll(".bar-label")
        .data(updatedData)
        .transition()
        .duration(500) // Add transition for a smooth update effect
        .attr("y", d => yScale2(d) - 5)
        .text(d => d);
  
    }

    function addTitle(vis, title){
      vis.append("text")
      .attr("x", (svgWidth / 6)-60)
      .attr("y", margin.top / 2 - 70)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(title);
    }

    function updateDetailData(timePeriod){
      newDetail = detailData(timePeriod);
      details.green.ons = newDetail['green']['ons']
      details.green.offs = newDetail['green']['offs']
      details.blue.ons = newDetail['blue']['ons']
      details.blue.offs = newDetail['blue']['offs']
      details.orange.ons = newDetail['orange']['ons']
      details.orange.offs = newDetail['orange']['offs']
      details.red.ons = newDetail['red']['ons']
      details.red.offs = newDetail['red']['offs']
    }

  });

})());




