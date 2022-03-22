// Define function to convert Date object to military date
Date.prototype.toMiliTime = function() {

    let monthNames =["JAN","FEB","MAR","APR",
                      "MAY","JUN","JUL","AUG",
                      "SEP", "OCT","NOV","DEC"];
    
    let day = this.getDate();
    
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];
    
    // Convert 4-digit year to 2-digit
    let year = this.getFullYear()-2000;
    
    return `${day}${monthName}${year}`;  
}

// Generate a function for morphing the JSON object to an array for better parsing
oper_array = function(temp_obj) {
    temp_arr = [];
    for (key in Object.keys(temp_obj)) {
        temp_arr.push(temp_obj[key]);
    };
    return temp_arr
}

// Generate a function for changing the status bar color
function template_color(card) {
    if (card.Progress == "G") {
        return "bg-success";
    } else if (card.Progress == "Y") {
        return "bg-warning";
    } else if (card.Progress == "R") {
        return "bg-danger";
    } else { return "";}
}

// Generate a function for filling out a list of achievements for each card (if they are filled)
function bullet_list(card) {
    return `
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${card['Bullet 1']}</li>
            ${card['Bullet 2'] ? `<li class="list-group-item">${card['Bullet 2']}</li>` : ``}
            ${card['Bullet 3'] ? `<li class="list-group-item">${card['Bullet 3']}</li>` : ``}
            ${card['Bullet 4'] ? `<li class="list-group-item">${card['Bullet 4']}</li>` : ``}
            ${card['Bullet 5'] ? `<li class="list-group-item">${card['Bullet 5']}</li>` : ``}
        </ul>`;
}

// Define function for output of each card:
function cardTemplate(card) {
    return `
        <div class='card border-dark mx-2' style="width: 30rem; margin: 10 60 15 60">
            <div class="card-header text-center text-white bg-dark" style='position: relative; top: -5px'><h4>${card.Requirement}: ${card.Team}</h4></div>
            <div class="card-body">
                <h5 class="card-title">${card.Team}: ${card.Capability}</h5>
                ${card['Bullet 1'] ? bullet_list(card) : ''}
            </div>
            <div class="card-footer text-white ${template_color(card)}" style='position: relative; bottom: -5px'><h5>${card.Status}</h5></div>
        </div>
         `
}

/* ONGOING TECHNICAL OPERATIONS SECTION */

/* Need to send a network request to read local JSON files */
fetch('./javascript/Ongoing Ops.json')
    // Save the loaded JSON file into a local JSON format
    //   The below code is comparable to .then(function(resp) {return resp.json();}), just nicer looking
    .then(resp => resp.json())
    // Once loaded, we can use that file, loaded as a response in 'data' in a local function
    .then( function(data) {
        
        // Specify an array for indexing JSON file objects
        var data_keys = Object.keys(data)
        // Update the calendar [military] date to show when lists where updated (add additional time to convert to local date from standard GMT)
        var UpDate = new Date(data[0]['Updated']+30000000).toMiliTime();
        document.getElementById("calen_ongoing").innerHTML += UpDate;

        // Update Page Header to show number of Ongoing Reports
        document.getElementById("ongoing_title").innerHTML += ` <h4>${data_keys.length} Reports</h4>`;

        // Use the backtick character (`) to create a template literal (sort of like python's "".format())
        for (var proj in data) {
            document.getElementById("op_cards").innerHTML = `
            ${oper_array(data).map(cardTemplate).join()}
            `}
    })

/* UPCOMING TECHNICAL OPERATIONS SECTION */

/* Need to send a network request to read local JSON files */
fetch('./javascript/Upcoming Ops.json')
    // Save the loaded JSON file into a local JSON format
    .then(resp => resp.json())
    .then( function(data_upcom) {
        
        // Specify an array for indexing JSON file objects
        var data_keys = Object.keys(data_upcom)

        // Update Page Header to show number of Ongoing Reports
        document.getElementById("upcoming_title").innerHTML += `<h4>${data_keys.length} Reports</h4>`;

        // Use the backtick character (`) to create a template literal (sort of like python's "".format())
        for (var proj in data_upcom) {
            document.getElementById("upcom_cards").innerHTML = `
            ${oper_array(data_upcom).map(cardTemplate).join()}
            `}
    })

/* COMPLETED TECHNICAL OPERATIONS SECTION */

/* Need to send a network request to read local JSON files */
fetch('./javascript/Completed Ops.json')
    // Save the loaded JSON file into a local JSON format
    .then(resp => resp.json())
    .then( function(data_compl) {
        
        // Specify an array for indexing JSON file objects
        var data_keys = Object.keys(data_compl)
        // Update the calendar [military] date to show when lists where updated (add additional time to convert to local date from standard GMT)
        var UpDate = new Date(data_compl[0]['Updated']+30000000).toMiliTime();
        document.getElementById("calen_compl").innerHTML += UpDate;

        // Update Page Header to show number of Ongoing Reports
        document.getElementById("compl_title").innerHTML += `<h4>${data_keys.length} Reports</h4>`;

        // Use the backtick character (`) to create a template literal (sort of like python's "".format())
        for (var proj in data_compl) {
            document.getElementById("compl_cards").innerHTML = `
            ${oper_array(data_compl).map(cardTemplate).join()}
            `}
    })

/* TECHNICAL OPERATIONS STATISTICS SECTION */


// Develop a function for fill in each row or head (true) input from a JSON object
function table_fill(obj, head) {
    // type is either 'true' or 'false'
    var t_st = (head ? `<th>` : `<td>`);
    var t_ed = (head ? `</th>` : `</td>`);
    var ret_str = `<tr>`;
    // For the head row, use the JSON keys for the entry values
    var obj_array = (head ? Object.keys(obj) : Object.values(obj));
    for (const val of obj_array) {
        // If value is null or zero, don't display 'null'    
        ret_str += `${t_st + (!!val ? val : '') + t_ed}`;}
    return ret_str + `</tr>`;
}

function table_head(obj) {
    return `
        <thead>
            ${table_fill(obj, true)}    
        </thead><tbody>`
}


/* Need to send a network request to read local JSON files */
fetch('./javascript/Tech Ops Stats.json')
    // Save the loaded JSON file into a local JSON format
    .then(resp => resp.json())
    .then( function(data_stats) {
        
        // Develop a responsive table with each of the Tech Ops stats
        for (var i = -1; i < Object.keys(data_stats).length; i++) {
            document.getElementById("tech_table").innerHTML += `
            ${i == -1 ? table_head(data_stats[0]) : table_fill(data_stats[i], false)}
            `};
        document.getElementById("tech_table").innerHTML += `</tbody>`;
    })