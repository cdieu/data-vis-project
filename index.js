var width = 800;
var height = 500;
var xPos = width / 2;
var yPos = height / 2;
var rad = 10;

var canvas = d3
  .select("#canvas") //Select the div named canvas in html file
  .append("svg") //Give a svg?
  .attr("width", width) //Specify the width attribute to var width
  .attr("height", height); //Specify the height attribute to var width

var SSTData = [];
d3.json("SSTData.json")
  .then(function (data) {
    SSTData = data;
  })
  .then(function (data) {
    draw();
  });

function draw() {
  console.log(SSTData); //SSTData contains a single array 0: {name: '2023', data: Array(366)}

  var tempData = SSTData[0].data; //Access the field "data" in the SSTData array at index 0.
  console.log(tempData); //Temperature data

  //https://observablehq.com/@d3/d3-extent Retrieve min and max of data.
  var minTemp = d3.min(tempData);
  console.log(minTemp);
  var maxTemp = d3.max(tempData);
  console.log(maxTemp);

  //TEMPORARY COLORS FOR DEBUG
  const color = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([minTemp, maxTemp]);
  
    var col = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([minTemp, maxTemp]);
  

  const color2 = d3
    .scaleSequential(d3.interpolateGreens)
    .domain([minTemp, maxTemp]);

  const color3 = d3
    .scaleSequential(d3.interpolateGreys)
    .domain([minTemp, maxTemp]);

  const color4 = d3
    .scaleSequential(d3.interpolateOranges)
    .domain([minTemp, maxTemp]);

  const color5 = d3
    .scaleSequential(d3.interpolateReds)
    .domain([minTemp, maxTemp]);

  //https://d3js.org/d3-shape/curve
  //Make curves to mimic the look of a wave.
  const line = d3
    .line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(d3.curveBasis);

  const frontFrame1 = [
    [0, 500],
    [100, 200],
    [230, 125],
    [250, 125],
    [250, 250],
    [400, 375],
    [500, 300],
    [550, 250],
    [600, 350],
    [700, 300],
    [800, 250],
    [800, 500],
  ];

  const frontFrame2 = [
    [0, 500],
    [200, 230],
    [260, 130],
    [360, 200],
    [300, 230],
    [280, 312],
    [400, 400],
    [550, 300],
    [650, 200],
    [700, 260],
    [800, 475],
    [800, 500],
  ];

  const frontFrame3 = [
    [0, 500],
    [200, 300],
    [300, 300],
    [330, 450],
    [450, 250],
    [600, 200],
    [530, 400],
    [650, 350],
    [750, 100],
    [780, 250],
    [800, 475],
    [800, 500],
  ];

  const backFrame1 = [
    [0, 500],
    [50, 270],
    [100, 250],
    [200, 312],
    [350, 250],
    [400, 125],
    [530, 250],
    [600, 300],
    [800, 187],
    [800, 500],
  ];


  const backFrame2 = [
    [0, 500],
    [80, 430],
    [150, 250],
    [200, 200],
    [300, 260],
    [450, 375],
    [680, 200],
    [750, 250],
    [780, 250],
    [800, 500],
  ];

  const backFrame3 = [
    [0, 500],
    [80, 230],
    [280, 300],
    [360, 230],
    [430, 300],
    [550, 375],
    [680, 300],
    [700, 250],
    [780, 250],
    [800, 500],
  ];

  const backFrame4 = [
    [0, 500],
    [50, 230],
    [150, 350],
    [180, 250],
    [200, 200],
    [300, 187],
    [400, 360],
    [560, 250],
    [750, 130],
    [800, 500],
  ];

  const backWave = canvas
    .append("path")
    .datum(backFrame1)
    .attr("d", line)
    .attr("stroke", color5(d3.mean(tempData)))
    //.attr("fill", "none")
    .attr("fill", color5(d3.mean(tempData)));

  const frontWave = canvas
    .append("path")
    .datum(frontFrame1)
    .attr("d", line)
    .attr("stroke", color(d3.mean(tempData)))
    //.attr("fill", "none")
    .attr("fill", color(d3.mean(tempData)));

  function animateBackWave() {
    backWave
      .datum(backFrame1)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("d", line)
      .attr("stroke", color2(d3.mean(tempData)))
      .attr("fill", color2(d3.mean(tempData)))
      .on("end", () => {
        backWave
          .datum(backFrame2)
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr("d", line)
          .attr("stroke", color3(d3.mean(tempData)))
          .attr("fill", color3(d3.mean(tempData)))
          .on("end", () => {
            backWave
              .datum(backFrame3)
              .transition()
              .duration(1000)
              .ease(d3.easeLinear)
              .attr("d", line)
              .attr("stroke", color4(d3.mean(tempData)))
              .attr("fill", color4(d3.mean(tempData)))
              .on("end", () => {
                backWave
                  .datum(backFrame4)
                  .transition()
                  .duration(1000)
                  .ease(d3.easeLinear)
                  .attr("d", line)
                  .attr("stroke", color5(d3.mean(tempData)))
                  .attr("fill", color5(d3.mean(tempData)))
                  .on("end", animateBackWave); // Loop back to the start
              });
          });
      });
  }

  function animate() {
    frontWave
      .datum(frontFrame1)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("d", line)
      .attr("stroke", color(d3.mean(tempData)))
      .attr("fill", color(d3.mean(tempData)))
      .on("end", () => {
        frontWave
          .datum(frontFrame2)
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr("d", line)
          .attr("stroke", color(d3.mean(tempData)))
          .attr("fill", color(d3.mean(tempData)))
          .on("end", () => {
            frontWave
              .datum(frontFrame3)
              .transition()
              .duration(1000)
              .ease(d3.easeLinear)
              .attr("d", line)
              .attr("stroke", color(d3.mean(tempData)))
              .attr("fill", color(d3.mean(tempData)))
              .on("end", animate);
          });
      });
  }

  animateBackWave();
  animate();
}
