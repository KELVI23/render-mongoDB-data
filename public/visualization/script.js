// const { relationships } = require("../../app/controllers/relationships");

 // Declare global variables
var input, filter, table, tr, td, i, txtValue;

$(document).ready(function () {

    //fecth data
    $.getJSON("medications.json", function (data){
        var jsonData = '';
        var filter = '';

        //iterating through objects
        $.each(data, function (key, value) {
            
            //contruction of rows 
            jsonData += '<tr>';
            jsonData += '<td>' + value.category + '</td>';
            
            jsonData += '<td>' + value.name + '</td>';

            jsonData += '<td>' + value.dose + '</td>';

            jsonData += '<td>' + value.description + '</td>';

            jsonData += '<td>' + value.cost + '</td>';

            jsonData += '</tr>';

        });

        //inserting rows into table
      $('#table').append(jsonData);
           
    });
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onload = function(){
      var response = JSON.parse(this.responseText);

      var jsonData = [];
      var filter =[];

      response.forEach(function(connection){
        var hasCategory = jsonData.find(function(data){
          return data == connection.category;
        });

          var hasName = jsonData.find(function(data){
            return data == connection.name;
          });

        var hasDose = jsonData.find(function(data){
          return data == connection.dose;
        });

        var hasDescription = jsonData.find(function(data){
          return data == connection.description;
        });

        var hasCost = jsonData.find(function(data){
          return data == connection.cost;
        });
          
        if(!hasCategory){
            jsonData.push(connection.category);
            filter.push({ name: connection.category })
        }

        if(!hasName){
          jsonData.push(connection.name);
          filter.push({ name: connection.name })
      }
        if(!hasDescription){
            jsonData.push(connection.description);
            filter.push({ name: connection.description })
        }

      if(!hasCost){
            jsonData.push(connection.cost);
            filter.push({ name: connection.cost})
        }

        if(!hasDose){
            jsonData.push(connection.dose);
            filter.push({ name: connection.dose })
        }

    });
    
    var relationships = response.map(function(connection){
      connection.target = names.indexOf(connection.target);
      connection.source = names.indexOf(connection.source);
      return connection;
  });

   $('#table').append(data);
  };

  xmlHttp.open("GET", '/api/relationships');
  xmlHttp.send();

});




function searchFunction(num, input) {

  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through  table rows, and hide rows that do not match the search
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[num];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


//filter table by category
function searchbyFilters(){
    input = document.getElementById("filtered");
    searchFunction(0,input); //0 index to search in category column

}

//make category filter visible
function category() {
document.getElementById('filtered').style.visibility = "visible";
}

//remove table catefory filter
function clearFilter(){
 
    document.getElementById('filtered').style.visibility = "hidden"; 
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through  table rows, and shows all data
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
         tr[i].style.display = "";
      }
    }
  
//search table by name      
function searchbyName(){
  input = document.getElementById("myInput");
  searchFunction(1, input); //1 index to search in name column
}



