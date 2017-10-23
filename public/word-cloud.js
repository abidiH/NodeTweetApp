
<script>
var socket = io.connect('http://localhost:8080');
socket.on('message',function(message){
            //var new_tweet_list = message.data.tweet;
            //update with new tweets
            //drawNewTweets(new_tweet_list);
            alert("inside");
            console.log(message);
            });
</script>