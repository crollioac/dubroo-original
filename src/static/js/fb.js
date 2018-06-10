/**
 * @author Kiran
 */



loginToFBNow = function(){


	if(FB != undefined){
		FB.login(function(response) {
		   // handle the response
		    	if (response.status === 'connected') {
		    // Logged into your app and Facebook.
		     	FB.api('/me', function(response) {
				    console.log(response);

				    loginSource="fb";
		     	    userID = response.email;
				    uniqueID = userID;
					username = response.first_name+ " "+ response.last_name; 
				    
				  	return LoginNow(userID, username);
				});
		     	

		    	} else if (response.status === 'not_authorized') {
		    // The person is logged into Facebook, but not your app.
		    	} else {
		    // The person is not logged into Facebook, so we're not sure if
		    // they are logged into this app or not.
		    	}

		    }, {scope: 'public_profile,email'});
	}else{
		( function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id))
				return;
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=768565949892327&version=v2.3";
			// js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=287941041330132&version=v2.0";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		setTimeout(function(){
			loginToFBNow();			
		},1000);

	}	
};

// $(document).ready(function(){

// 	setTimeout(function(){

		
// 	},1500);
	
// });
 



