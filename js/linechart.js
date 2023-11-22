// /* global D3 */

// // Initialize a line chart. Modeled after Mike Bostock's
// // Reusable Chart framework https://bost.ocks.org/mike/chart/
// function linechart() {

//   // Based on Mike Bostock's margin convention
//   // https://bl.ocks.org/mbostock/3019563
//   let margin = {
//       top: 60,
//       left: 50,
//       right: 30,
//       bottom: 35
//     },
//     width = 500 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom,
//     xValue = d => d[0],
//     yValue = d => d[1],
//     xLabelText = "",
//     yLabelText = "",
//     yLabelOffsetPx = 0,
//     xScale = d3.scalePoint(),
//     yScale = d3.scaleLinear(),
//     ourBrush = null,
//     selectableElements = d3.select(null),
//     dispatcher;

//   // Create the chart by adding an svg to the div with the id 
//   // specified by the selector using the given data
//   function chart(selector, data) {
//     let svg = d3.select(selector)
//       .append("svg")
//         .attr("preserveAspectRatio", "xMidYMid meet")
//         .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
//         .classed("svg-content", true);

//     svg = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     //Define scales
//     xScale
//       .domain(d3.map(data, xValue).keys())
//       .rangeRound([0, width]);

//     yScale
//       .domain([
//         d3.min(data, d => yValue(d)),
//         d3.max(data, d => yValue(d))
//       ])
//       .rangeRound([height, 0]);

//     // X axis
//     let xAxis = svg.append("g")
//         .attr("transform", "translate(0," + (height) + ")")
//         .call(d3.axisBottom(xScale));
        
//     // Put X axis tick labels at an angle
//     xAxis.selectAll("text") 
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", "rotate(-65)");
        
//     // X axis label
//     xAxis.append("text")        
//         .attr("class", "axisLabel")
//         .attr("transform", "translate(" + (width - 50) + ",-10)")
//         .text(xLabelText);
    
//     // Y axis and label
//     let yAxis = svg.append("g")
//         .call(d3.axisLeft(yScale))
//       .append("text")
//         .attr("class", "axisLabel")
//         .attr("transform", "translate(" + yLabelOffsetPx + ", -12)")
//         .text(yLabelText);

//     // Add the line
//     svg.append("path")
//         .datum(data)
//         .attr("class", "linePath")
//         .attr("d", d3.line()
//           // Just add that to have a curve instead of segments
//           .x(X)
//           .y(Y)
//         );

//     // Add the points
//     let points = svg.append("g")
//       .selectAll(".linePoint")
//         .data(data);
    
//     points.exit().remove();
          
//     points = points.enter()
//       .append("circle")
//         .attr("class", "point linePoint")
//       .merge(points)
//         .attr("cx", X)
//         .attr("cy", Y)        
//         .attr("r",5);
        
//     selectableElements = points;

//     svg.call(brush);

//     // Highlight points when brushed
//     function brush(g) {
//       const brush = d3.brush()
//         .on("start brush", highlight)
//         .on("end", brushEnd)
//         .extent([
//           [-margin.left, -margin.bottom],
//           [width + margin.right, height + margin.top]
//         ]);

//       ourBrush = brush;

//       g.call(brush); // Adds the brush to this element

//       // Highlight the selected circles.
//       function highlight() {
//         if (d3.event.selection === null) return;
//         const [
//           [x0, y0],
//           [x1, y1]
//         ] = d3.event.selection;
//         points.classed("selected", d =>
//           x0 <= X(d) && X(d) <= x1 && y0 <= Y(d) && Y(d) <= y1
//         );

//         // Get the name of our dispatcher's event
//         let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

//         // Let other charts know
//         dispatcher.call(dispatchString, this, svg.selectAll(".selected").data());
//       }
      
//       function brushEnd() {
//         // We don't want an infinite recursion
//         if (d3.event.sourceEvent.type != "end") {
//           d3.select(this).call(brush.move, null);
//         }
//       }
//     }

//     return chart;
//   }

//   // The x-accessor from the datum

//   chart.margin = function (_) {
//     if (!arguments.length) return margin;
//     margin = _;
//     return chart;
//   };

//   chart.width = function (_) {
//     if (!arguments.length) return width;
//     width = _;
//     return chart;
//   };

//   chart.height = function (_) {
//     if (!arguments.length) return height;
//     height = _;
//     return chart;
//   };
//   // Gets or sets the dispatcher we use for selection events

//   return chart;
// }

const xLabels = ["Very Early Morning", "Early Morning", "Noon", "Afternoon", "Evening", "Late Night"];
    const yLabels = [100, 200, 300, 400, 500, 600, 700];

    const svg = d3.select("svg"),
      margin = { top: 20, right: 50, bottom: 30, left: 35 },
      width = 400 - margin.left - margin.right,
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