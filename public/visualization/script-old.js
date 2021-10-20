/**
 * Created by ds on 09/06/16.
 */

/*
 API Call for data retrieval
 */

 function loadData() {

    console.log("Loading Data from API...");

    // Create a new request object
    var xmlHttp = new XMLHttpRequest();

    // Define what happens after successful response
    xmlHttp.onload = function () {
        var response = JSON.parse(this.responseText);

        // Extract a list of names from the relationships
        var names = [];
        var nodes = [];

        response.forEach(function(connection){
            var hasSource = names.find(function(name){
                return name === connection.source;
            });

            var hasTarget = names.find(function(name){
                return name === connection.target;
            });

            if(!hasSource){
                names.push(connection.source);
                nodes.push({ name: connection.source })
            }

            if(!hasTarget){
                names.push(connection.target);
                nodes.push({ name: connection.target })
            }
        });

        var relationships = response.map(function(connection){
            connection.target = names.indexOf(connection.target);
            connection.source = names.indexOf(connection.source);
            return connection;
        });



        createVisualisation(nodes, relationships);
    };

    // Actually start request
    xmlHttp.open("GET", '/api/relationships');
    xmlHttp.send();
}

/*
 Visualisation
 */

function createVisualisation(nodes, links) {

    /*
     Options
     */

    var height = 800;
    var width = 800;
    var nodeRadius = 5;
    var color = d3.scale.category20();


    /*
     Creating an empty svg element
     */
    var svg = d3.select("#root").append("svg")
        .attr("width", width)
        .attr("height", height);

    /*
     Instantiate the graph layout using d3
     */

    var forceLayout = d3.layout.force()
        .charge(-220)
        .linkDistance(100)
        .size([height, width])
        .nodes(nodes)
        .links(links)
        .start();


    /*
     Add svg element for every node and link.
     */

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) {
            return Math.sqrt(d.weight);
        });

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", nodeRadius)
        .style("fill", function (d) {
            return color(d.name);
        });

    /*
     Add event handling
     */

    node.on('click', function () {
            d3.select(this)
                .transition()
                .duration(750)
                .attr("r", 20)
                .style("fill", "lightsteelblue");
        })
        .on('dblclick', function () {
            d3.select(this)
                .transition()
                .duration(750)
                .attr("r", nodeRadius)
                .style("fill", "red");
        });

    /*
     Add render method. This defines the behaviour of
     svg elements at every step ('tick') of the simulation.
     */

    forceLayout.on("tick", function () {
        link.attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    });
}