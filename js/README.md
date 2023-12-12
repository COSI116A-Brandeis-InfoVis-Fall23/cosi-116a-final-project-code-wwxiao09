# JavaScript Folder
This folder encompasses all the JavaScript files associated with our project. It includes 'twocharts.js', a file that houses the code for our two primary visualizations: the line chart and the bar chart. Additionally, 'timeTable.js' is also part of this collection, containing the timetable functionality integral to establishing links between these two visualizations.
We recommend you separate the implementation details for individual visualizations using the [Reusable Charts](https://bost.ocks.org/mike/chart/) framework Mike Bostock advocates.
Broadly this means implementing visualizations as closures with getter-setter methods.
This can be further extended to [making updatable charts](https://www.toptal.com/d3-js/towards-reusable-d3-js-charts).