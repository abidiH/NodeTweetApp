$(document).ready(function ()
{
  var socket = io.connect('http://localhost:8080');
  var tweet;
  var count = 0;

 
  socket.on('message',function(tweetJson){
            
      //console.log(tweetJson);
      count ++;
      tweet = tweetJson.text;
      if(count > 1)
        //console.log("new tweet")
        updateWordCloud(tweet);
        
      else
        createWordCloud(tweet);       
    });

 
});

var fill = d3.scale.category20();

function createWordCloud(tweet){

    var merged_list= splitTweets(tweet);

    var layout = d3.layout.cloud()
        .size([1000, 1000])
        .words(merged_list.map(function(d) {
          return {text: d, size: 10 + Math.random() * 90};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {

          d3.select("#messageChart").append("svg")
              .attr("width", 1000)
              .attr("height", 1000)
            .append("g")
              .attr("transform", "translate(500,500)")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.text; })
              .on("mouseover", function(d){
                d3.select(this).style("font-size",
                    d.size + 10 +"px");

              })
              .on("mouseout", function(d){
              d3.select(this).style("font-size", d.size -10 +"px")

              });
        }
    
    }
   

        function updateWordCloud(newTweetJson){
           
            //console.log(newTweetJson);
            var merged_list = splitTweets(newTweetJson);

            d3.layout.cloud()
            .size([1000,1000])
            .words(merged_list.map(function(d) {
              return {text: d, size: 10 + Math.random() * 90};
            }))
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .start();
           
           
            var wordCloud = d3.select("#messageChart").selectAll("g").attr("transform", "translate(500,500)").selectAll("text").data(merged_list.map(function(d) {
              return {text: d, size: 10 + Math.random() * 90};
            }));

            //enter
            wordCloud.enter().append("text").style("font-size", function(d) { return d.size + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .text(function(d) { //console.log(d); 
                return d.text; })
              .on("mouseover", function(d){
                d3.select(this).style("font-size",
                    d.size + 10 +"px");

              })
              .on("mouseout", function(d){
              d3.select(this).style("font-size", d.size -10 +"px")

              });

            //update
            wordCloud.style("font-size", function(d) { return d.size + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")

              .text(function(d) { //console.log(d); 
                return d.text; })
              .on("mouseover", function(d){
                d3.select(this).style("font-size",
                    d.size + 10 +"px");

              })
              .on("mouseout", function(d){
              d3.select(this).style("font-size", d.size -10 +"px")

              });
            
              //remove
              wordCloud.exit().remove();

                      
        }

        function splitTweets(tweet){
            var split_words_list = [];
            var split = tweet.split(" ");
            split_words_list.push(split);

            //console.log(splitWords);
            var merged_list = [].concat.apply([], split_words_list);
            return merged_list;
        }
    


