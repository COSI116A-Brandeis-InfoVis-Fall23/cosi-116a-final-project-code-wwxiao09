// function to create the time table
function timeTable(data, highlightPoints){
    let table = d3.select("#table-container") 
      .append("table")
      .classed("my-table", true)

    // Append rows to the table
    const rowData = data;
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
    return table;

  }