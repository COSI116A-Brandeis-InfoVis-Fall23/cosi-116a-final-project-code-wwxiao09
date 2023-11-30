
const svgWidth = 1200;
const svgHeight = 400;

const svgWidth1 = 1200;
const svgHeight1 = 1200;

fetch('../data/line_chart_data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(calculated_data => {
    if (Array.isArray(calculated_data)) {

      console.log(calculated_data); 
      
      const nodesData = [];
    for (let i = 0; i < 4; i++) {
      let lineColor, lineLabel;
      switch (i) {
        case 0:
          lineColor = "red";
          lineLabel = "Red Line";
          break;
        case 1:
          lineColor = "blue";
          lineLabel = "Blue Line";
          break;
        case 2:
          lineColor = "green";
          lineLabel = "Green Line";
          break;
        case 3:
          lineColor = "orange";
          lineLabel = "Orange Line";
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
      d3.select("#chart") 
        .append("text")
        .attr("class", "line-label")
        .attr("x", (svgWidth / 3) * 2)
        .attr("y", 50 + i * 100)
        .text(lineLabel);
    }

const margin = { top: 20, right: 30, bottom: 80, left: 40 };
const plotWidth = (svgWidth / 3) - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select("#chart")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  const svg2 = d3.select("#chart")
  .attr("width", svgWidth1)
  .attr("height", svgHeight1);

// Create the first plot
const g1 = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

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
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)") // Rotate labels for better readability
      .style("text-anchor", "start");

g1.append("g")
  .attr("class", "y-axis")
  .call(yAxis1);

  // const data_calculated = await d3.json('line_chart_data.json');
  // console.log(data_calculated[0]["Route_name"]);
  
  const dataLines = [
    [
      { x: "Very Early Morning", y: calculated_data[1]["VERY_EARLY_MORNING"] },
      { x: "Early AM", y: calculated_data[1]["EARLY_AM"] },
      { x: "AM Peak", y: calculated_data[1]["AM_PEAK"] },
      { x: "Midday Base", y: calculated_data[1]["MIDDAY_BASE"] },
      { x: "Midday School", y: calculated_data[1]["MIDDAY_SCHOOL"] },
      { x: "PM Peak", y: calculated_data[1]["PM_PEAK"] },
      { x: "Evening", y: calculated_data[1]["EVENING"] },
      { x: "Late Evening", y: calculated_data[1]["LATE_EVENING"] },
      { x: "Night", y: calculated_data[1]["NIGHT"] }

    ],
    [
      { x: "Very Early Morning", y: calculated_data[3]["VERY_EARLY_MORNING"] },
      { x: "Early AM", y: calculated_data[3]["EARLY_AM"] },
      { x: "AM Peak", y: calculated_data[3]["AM_PEAK"] },
      { x: "Midday Base", y: calculated_data[3]["MIDDAY_BASE"] },
      { x: "Midday School", y: calculated_data[3]["MIDDAY_SCHOOL"] },
      { x: "PM Peak", y: calculated_data[3]["PM_PEAK"] },
      { x: "Evening", y: calculated_data[3]["EVENING"] },
      { x: "Late Evening", y: calculated_data[3]["LATE_EVENING"] },
      { x: "Night", y: calculated_data[3]["NIGHT"] }
    ],
    [
      { x: "Very Early Morning", y: calculated_data[2]["VERY_EARLY_MORNING"] },
      { x: "Early AM", y: calculated_data[2]["EARLY_AM"] },
      { x: "AM Peak", y: calculated_data[2]["AM_PEAK"] },
      { x: "Midday Base", y: calculated_data[2]["MIDDAY_BASE"] },
      { x: "Midday School", y: calculated_data[2]["MIDDAY_SCHOOL"] },
      { x: "PM Peak", y: calculated_data[2]["PM_PEAK"] },
      { x: "Evening", y: calculated_data[2]["EVENING"] },
      { x: "Late Evening", y: calculated_data[2]["LATE_EVENING"] },
      { x: "Night", y: calculated_data[2]["NIGHT"] }
    ],
    [
      { x: "Very Early Morning", y: calculated_data[0]["VERY_EARLY_MORNING"] },
      { x: "Early AM", y: calculated_data[0]["EARLY_AM"] },
      { x: "AM Peak", y: calculated_data[0]["AM_PEAK"] },
      { x: "Midday Base", y: calculated_data[0]["MIDDAY_BASE"] },
      { x: "Midday School", y: calculated_data[0]["MIDDAY_SCHOOL"] },
      { x: "PM Peak", y: calculated_data[0]["PM_PEAK"] },
      { x: "Evening", y: calculated_data[0]["EVENING"] },
      { x: "Late Evening", y: calculated_data[0]["LATE_EVENING"] },
      { x: "Night", y: calculated_data[0]["NIGHT"] }
    ]
  ];
  // Define line colors
const lineColors = ["blue", "red", "orange", "green"];

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
  .style("stroke-width", 1.5);

// Create a table

let table = d3.select("#table-container") 
  .append("table")
  .classed("my-table", true);

// Append rows to the table
//const rowData = ["Very Early Morning", 'Early AM', 'AM Peak', 'Midday Base', 'Midday School', "PM Peak", "Evening", "Late Evening", "Night"];
const rowData = xLabels1;
// Append rows and cells to the table
const rows = table.selectAll("tr")
  .data(rowData)
  .enter().append("tr")

const row = table.append("tr");

row.selectAll("td")  
    .data(rowData)   
    .enter()          
    .append("td")     
    .text(d => d)
    .on("click", highlightPoints);

function highlightPoints(label) {
    table.selectAll("td")
    .style("background-color", "lightblue");

    d3.select(this)
    .style("background-color", "yellow");

    const index = xLabels1.indexOf(label);
    
    const categoryColor = xLabels1[index];

    g1.selectAll(".dot")
        .style("fill", d => d.color === categoryColor ? "yellow" : "#fff");
    
    dataLines.forEach((line, lineIndex) => {
      line.forEach(dot => {
        if (dot.x === label) {
          g1.select(`.line-group:nth-child(${lineIndex+3}) .dot:nth-child(${line.indexOf(dot)+2})`)
            .style("fill", "yellow");
        }
      });
    });

  }
  
// Create the second plot
const g2 = svg.append("g")
  .attr("transform", `translate(${plotWidth + margin.left * 2},${margin.top})`);

const xLabels2 = ["blue line", "red line", "orange line", "green line"];
const yLabels2 = [100, 200, 300, 400, 500, 600, 700];

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
  .call(xAxis2);

g2.append("g")
  .attr("class", "y-axis")
  .call(yAxis2);

  const data = [120, 280, 180, 350]; 
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
    .style("fill", (d, i) => barColors[i]);
  
  // Add labels to the bars
  g2.selectAll(".bar-label")
    .data(data)
    .enter().append("text")
    .attr("class", "bar-label")
    .attr("x", (d, i) => xScale2(xLabels2[i]) + xScale2.bandwidth() / 2)
    .attr("y", d => yScale2(d) - 5) 
    .attr("text-anchor", "middle")
    .text(d => d);

// Create the third plot (node links)
const g3 = svg.append("g")
  .attr("transform", `translate(${(plotWidth * 2) + margin.left * 3},${margin.top})`);

// Create nodes for the third plot
const nodes = g3.selectAll(".node")
      .data(nodesData)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 3) 
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .style("fill", d => d.color);

    // Add corresponding text labels
    g3.selectAll(".line-label")
      .data(nodesData.filter((d, i) => i % 20 === 0)) 
      .enter().append("text")
      .attr("class", "line-label")
      .attr("x", (svgWidth / 3) * 2)
      .attr("y", d => d.y)
      .text(d => {
        switch (d.color) {
          case "red":
            return "Red Line";
          case "blue":
            return "Blue Line";
          case "green":
            return "Green Line";
          case "orange":
            return "Orange Line";
          default:
            return "";
        }
      });


// Create the time table




    } else {
      console.error('Invalid data format:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


//console.log(calculated_data["Blue Line"]["VERY_EARLY_MORNING"]);
// Create the data for the third plot (4 lines of 20 nodes each)
