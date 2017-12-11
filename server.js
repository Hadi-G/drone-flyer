const express  = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');


//graph representation
const node = [
  {
    node : 1,
    child: [
      {
        node : 2,
        weight : 1
      },
      {
        node : 4,
        weight : 4
      }
    ]
  },
  {
    node : 2,
    child : [
      {
        node : 1,
        weight : 1
      },
      {
        node : 3,
        weight : 10
      },
      {
        node : 5,
        weight : 4
      }
    ]
  },
  {
    node: 3,
    child : [
      {
        node :2,
        weight:10
      },
      {
        node :4,
        weight:6
      },
      {
        node:6,
        weight:5
      }
    ]
  },
  {
    node:4,
    child:[
      {
        node:1,
        weight:4
      },
      {
        node:3,
        weight:6
      },
      {
        node:7,
        weight:9
      },
      {
        node:10,
        weight:2
      }
    ]
  },
  {
    node :5,
    child:[
      {
        node:2,
        weight:4
      },
      {
        node:6,
        weight:7
      }
    ]
  },
  {
    node :6,
    child:[
      {
        node:3,
        weight:5
      },
      {
        node:5,
        weight:7
      },
      {
        node:7,
        weight:6
      },
      {
        node:8,
        weight:3
      }
    ]
  },
  {
    node:7,
    child:[
      {
        node:4,
        weight:9
      },
      {
        node:6,
        weight:6
      },
      {
        node:9,
        weight:7
      },
      {
        node:10,
        weight:1
      }
    ]
  },
  {
    node:8,
    child:[
      {
        node:6,
        weight:3
      },
      {
        node:9,
        weight:2
      }
    ]
  },
  {
    node:9,
    child:[
      {
        node:7,
        weight:7
      },
      {
        node:8,
        weight:2
      },
      {
        node:10,
        weight:9
      }
    ]
  },
  {
    node:10,
    child:[
      {
        node:4,
        weight:2
      },
      {
        node:7,
        weight:1
      },
      {
        node:9,
        weight:9
      }
    ]
  }
];

//creation of the way followed by the drone (including nodes and weight)
let allNodes = [{node:0, weight:0},{node:0, weight:0}];

//function returning the minimum weight for each node
function minWeight(array){
  return Math.min.apply(this, array);
}

//principal function that programs the drone
function droneFlyer(departure, arrival, way){
var allWeigths = [];


//first condition : check that arrival is not within the child of the node (premature arrival)
for(var i = 0; i<node[departure-1].child.length; i++){

  if(node[departure-1].child[i].node == arrival){
    allNodes.push(node[departure-1].child[i]);
    allNodes.splice(0,2);
    console.log(`
      CONGRATS, arrival reached`);
    var finalNodes = {
      crossedNodes:[],
      totalWeigth:0
    };
    for(let valueNodes of allNodes){
      finalNodes.crossedNodes.push(valueNodes.node);
      finalNodes.totalWeigth += valueNodes.weight;
    }
    return console.log(way, finalNodes);
  } else {
        //creating a table with all the weights of the child
          allWeigths.push(node[departure-1].child[i].weight);
        }}

//index of the minimum weight
var index = allWeigths.indexOf(minWeight(allWeigths));

//second condition : check the last node is not arrival
if (allNodes[allNodes.length-1].node !== arrival){

//third condition : check the node has still children
if (node[departure-1].child[index] == undefined){
    allNodes.splice(0,2);
    console.log(`
      ERROR, cannot reach arrival`);
    var finalNodes = {
      crossedNodes:[],
      totalWeigth:0
    };
    for(let valueNodes of allNodes){
      finalNodes.crossedNodes.push(valueNodes.node);
      finalNodes.totalWeigth += valueNodes.weight;
    }
    console.log(way, finalNodes);

  }

else {
    allNodes.push(node[departure-1].child[index]);

//removal of nodes already passed
for (var j = 0; j<node.length; j++){
  for (var k = 0; k<node[j].child.length; k++){
    if(node[j].child[k].node == departure){
      node[j].child.splice(k,1);
    }
  }
}

//repetition of the function
droneFlyer(allNodes[allNodes.length-1].node, arrival, way);


}

}
//final situation of arrival without error and premature arrival
else {
        allNodes.splice(0,2);
        console.log(`
          CONGRATS, arrival reached`);
        var finalNodes = {
          crossedNodes:[],
          totalWeigth:0
        };
        for(let valueNodes of allNodes){
          finalNodes.crossedNodes.push(valueNodes.node);
          finalNodes.totalWeigth += valueNodes.weight;
        }
        console.log(way, finalNodes);
    }
}

//message to understand which drone is called
const way1 = 'Way for Drone 1 ';
const way2 = 'Way for Drone 2 ';
const way3 = 'Way for Drone 3 ';

//calling the function for every drone (please remove // for the one you want to test)

// droneFlyer(1,8, way1);
// droneFlyer(4,5, way2);
// droneFlyer(10,1, way3);

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log(` `);
});
