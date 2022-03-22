
// function to create an array of all Commodity names
function label_set(object) {
  var arr_ret = [];
  Object.entries(object).forEach(item => arr_ret.push(item[1]['Commodity']));
  return arr_ret;
};

// Create a function for an array of all of the column objects

// Function to display the values of each column, showing output for each Commodity for each type of Op.
function data_set(object, type) { 
  var arr_ret = [];
  Object.entries(object).forEach(item => arr_ret.push(item[1][type]));
  return arr_ret;
}

// Define a function for pulling the name of all data types
function type_names(object) { 
  var arr_ret = [];
  Object.entries(object[0]).forEach(item => arr_ret.push(item[0]));
  // drop the first array value ('Commodity')
  arr_ret.shift();
  return arr_ret;
}

// Create a function for returning all of the tabular data in array of arrays form
function tabular_data(object) {
  var ret_arr = [];
  type_names(object).forEach(item => ret_arr.push(data_set(object, item)));
  return ret_arr
}

// For each Chart data loading, need to create an array of objects with the following elements:
// - label
// - data
// - backgroundColor
// - borderColor
function chart_data(object) {
  // create an array of colors to choose from when picking column colors
  back_colors = ['rgba(128, 0, 0, 0.8)',
                 'rgba(170, 110, 40, 0.8)',
                 'rgba(128, 128, 0, 0.8)',
                 'rgba(0, 128, 128, 0.8)',
                 'rgba(0, 0, 128, 0.8)',
                 'rgba(0, 0, 0, 0.8)',
                 'rgba(230, 25, 75, 0.8)',
                 'rgba(245, 130, 48, 0.8)',
                 'rgba(255, 255, 25, 0.8)',
                 'rgba(210, 245, 60, 0.8)',
                 'rgba(60, 180, 75, 0.8)',
                 'rgba(70, 240, 240, 0.8)',
                 'rgba(0, 130, 200, 0.8)',
                 'rgba(145, 30, 180, 0.8)',
                 'rgba(240, 50, 230, 0.8)',
                 'rgba(200, 200, 200, 0.8)',
                 'rgba(250, 190, 212, 0.8)',
                 'rgba(255, 215, 180, 0.8)',
                 'rgba(255, 250, 200, 0.8)',
                 'rgba(170, 255, 195, 0.8)',
                 'rgba(220, 190, 255, 0.8)',
                 'rgba(100, 100, 100, 0.8)']
    bord_colors = ['rgba(128, 0, 0, 1)',
                  'rgba(170, 110, 40, 1)',
                  'rgba(128, 128, 0, 1)',
                  'rgba(0, 128, 128, 1)',
                  'rgba(0, 0, 128, 1)',
                  'rgba(0, 0, 0, 1)',
                  'rgba(230, 25, 75, 1)',
                  'rgba(245, 130, 48, 1)',
                  'rgba(255, 255, 25, 1)',
                  'rgba(210, 245, 60, 1)',
                  'rgba(60, 180, 75, 1)',
                  'rgba(70, 240, 240, 1)',
                  'rgba(0, 130, 200, 1)',
                  'rgba(145, 30, 180, 1)',
                  'rgba(240, 50, 230, 1)',
                  'rgba(200, 200, 200, 1)',
                  'rgba(250, 190, 212, 1)',
                  'rgba(255, 215, 180, 1)',
                  'rgba(255, 250, 200, 1)',
                  'rgba(170, 255, 195, 1)',
                  'rgba(220, 190, 255, 1)',
                  'rgba(100, 100, 100, 1)']


  // create a return array
  var ret_arr = [];
  // Loop through each col of data (representing each type, which will be their own datasets)
  var i = 0;
  for (const data_arr of tabular_data(object)) {
     // Create an object with three elements as described above
     const type = new Object();
     type.label = type_names(object)[i];
     type.data = data_arr;
     type.backgroundColor = back_colors[i];
     type.borderColor = bord_colors[i];
     type.borderWidth = 1;
     i += 1;

     // add object to return array
     ret_arr.push(type);};
  return ret_arr;  
}


/* Need to send a network request to read local JSON files */
fetch('./javascript/Tech Ops Stats.json')

  .then(resp => resp.json())
  .then( function(data) {

  var ctx = document.getElementById('stat_chart')
  // Generate new chart
  var stat_chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label_set(data),
      // Make a dataset for each excel data column
      datasets: chart_data(data)
    },
    options: {
      responsive: true,
      legend: {display: false},
      scales: {
        xAxes: [{stacked: true}],
        yAxes: [{stacked: true,
            beginAtZero: true}]
      }
    }
  });
})