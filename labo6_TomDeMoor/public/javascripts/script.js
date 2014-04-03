$(document).ready(function(){
  var postID = 0;
  var postIdCollection = [];

	//client aanmaken zoals op http://faye.jcoglan.com/node/clients.html
	var client = new Faye.Client('http://localhost:3000/faye/',{
				timeout: 20
	});

	//subscribe en vraag printen http://faye.jcoglan.com/browser/subscribing.html
	var postSubscribtion = client.subscribe('/post', function(message) {
  		//handle messages en voeg ID aan messages toe om ze uniek te maken
  		var newsPost = $(".bulletin").append("<p class='newspost' id='p" + postID + "'><span class='user'>" + message.user + "</span><span class='posted'> posted:</span></br>" + message.post + "</br><div class='vote' id='v" + postID + "'>vote</div></p>")
	    postID++;
      //id's in array zodat we ze later kunnen gebruiken bij andere gebruikers
      postIdCollection.push("p" + postID);
  });

  	//onclick subscribe / publish
    $('#send').on('click', function(){
  			//haal values op
  			var userVal = $('#user').val();
  			var postVal = $('#question').val();

		//als velden leeg zijn, error msg
		if(userVal === "" || postVal === "" )
    	{
    		$(".error").text("Please enter name and message.");
    		$(".error").show();
    	}
    	else
    	{
    		$(".error").text("");
    		$(".error").hide();
    		$('#question').val("");
			  var postPublication = client.publish('/post', {post : postVal, user : userVal});
      }
    //maxlength 100 characters al defined in index.jade  
	  }); //einde van post button onclick

  //get all posts
  var allPostsSubscription = client.subscribe('/allposts', function(vote) {
      //elke vote hoort bij een index

      //voor elke .vote gaan we overlopen of de index van de vote waar 
      //op geklikt is overeenkomt met die van de post

      //als die hetzelfde is gaan we die size groter maken

  });

    //click on .vote within .bullet
    $(".bulletin").on("click",".vote",function(event){
      //index verkrijgen van welke .vote we moeten publishen

      //publish met index

    });//einde van vote button on click

});