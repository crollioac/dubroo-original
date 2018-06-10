/**
 * @author Kiran
 */

(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] ||
	function() {
		(i[r].q = i[r].q || []).push(arguments);
	}, i[r].l = 1 * new Date();
	a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

var bloburl = "";
// var videourl=window.location.href;
// videourl = videourl.split("li=")[1];
// console.log(videourl);

var audiou = "";
var blob = "";

var videoID = "";
// var pageurl = window.location.href;

var videottype = "";
var blobkey = "";

var yturl = "//www.youtube.com/embed/";
var gifurl = "gfycat.com/";
var videourl = "";

var ok = false;
var globalaudiotag = "";
var videoHeight = 450;
var sortOption = "dubscount";
var VideoName = "";
var audioispaused = false;
var audioisplaying = false;
var videoPausedCosOfBuffering = false;
var audstarttime = "";
var videopaused = false;

// var pageUrl = window.location.href;
var audkey = "";
var curaudioname = "";
var curaudiolanguage = "";
var curaudiocomposer = "";
var audiobuffering = false;
var videoCategory = "all";

var pausedaudio = false;
var wantsToRecord = false;
var pausedRecording = false;
var resumedRecording = false;
var stoppedRecording = false;
var viewingPreview = false;
var pausedPreview = false;
var recordingSession = false;

var videoStoppedTime = 0;
var curpageurl = "";
var previewstarttime = 0;

var languageSelected = '';
var audiooffset = 0;
var audiolimit = 10;
var playOriginal = false;


var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('videoplayer', {
		height : videoHeight,
		width : '100%',
		videoId : videoID,
		events : {
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange
		},
		playerVars : {
			wmode : 'transparent',
			autoplay : 0,
			controls : 1,
			disablekb : 1,
			fs : 1,
			iv_load_policy : 3,
			loop : 0,
			modestbranding : 1,
			rel : 0,
			showinfo : 0
		}
	});
}

function onPlayerReady(event) {

}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		videoPausedCosOfBuffering = false;
		videopaused = false;
		if(playOriginal == false){
			if (audioisplaying == false && audioispaused == false) {
				player.mute();
				if (audstarttime >= 0) {

					audioispaused = false;
					audioisplaying = true;
					// $(".pageloader").hide();
					$(".videocover").show();
					$("#mainaudio")[0].play();
				} else {
					
					audioispaused = false;
					audioisplaying = true;
					// $(".pageloader").hide();
					$(".videocover").hide();
					var audioDelay = -(audstarttime);
					var aud = document.getElementById("mainaudio");
					aud.currentTime = audioDelay;
					$("#mainaudio")[0].play();

				}

			}	
		}
		
	
	}

	if (event.data == YT.PlayerState.BUFFERING) {
		if(playOriginal == false){
			if (audioisplaying == true) {
				// console.log("buffering");
				videoPausedCosOfBuffering = true;

				$("#mainaudio")[0].pause();
				audioisplaying = false;
			}
		}

	}

	// if(event.data == YT.PlayerState.PAUSED ){
	// console.log(recordingSession +"   "+ audioispaused);
	//
	// if(audioispaused == false){
	//
	// videopaused = true;
	// audioispaused=false;
	// audioisplaying=false;
	// if(audiobuffering == false){
	// $("#mainaudio")[0].pause();
	// }
	// }
	//
	//
	// }

}


function stopVideo() {
	//	console.log("asssssssss");

}


$(document).ready(function() {
	page = 'studio';
	ga('create', 'UA-58598109-1', 'auto', {
		'name' : 'dubroo'
	});
	ga('send', 'pageview');

	//	if ( $.browser.webkit ) {
	//		$(".recording-studio").remove();
	//	}

	// if ($.browser) {
		// $(".mozillamsg").remove();
	// }
	
	
	setTimeout(function(){
		if(player == undefined){
			onYouTubeIframeAPIReady();
		}
	},1000);
    
	// $(".audiolikes .fb-like").attr("data-href",pageurl);
	// if(typeof(FB) !== 'undefined')
	// FB.XFBML.parse(document.getElementById('fb-like'));

	// $(".bgcover,.messageboard").slideDown(200);
	// $(".messageboard p").html("Enable microphone to Record your Voice");
	// $(".closebtn,.okbtn,.bgcover").unbind().bind("click",function(){
	// $(".bgcover,.messageboard").slideUp(200);
	// $(".messageboard p").empty();
	//
	//
	// });

	$('.audio-list').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {

        	if(!$(".audio-list > p").hasClass("noaudiosmsg")){
        		 getMoreAudios($(this));
        	}
           
        }
   });
	




	// if (blobkey == "")
		// if (pageurl.indexOf("abk=") > -1) {
// 			
			// var temppageurl = pageurl.split("abk=")[0] + "abk=";
			// blobkey = pageurl.split("abk=")[1];
// 			
			// pageurl = temppageurl;
			// //				  console.log(pageurl);
			// if (blobkey != "") {
				// $(".pageloader").show();
				// curpageurl = pageurl;
				// getAudioDetails(blobkey);
			// }
// 
		// } else {
			// $(".socialplugin").hide();
			// pageurl = pageurl + "&abk=";
// 
		// }
	//
	// $(".audio-list").niceScroll({
	// cursorcolor : "#828282",
	// cursorwidth : 10,
	// cursorborder : "none",
	// autohidemode : false,
	// cursoropacitymin: 0.5
	// });
	
	$(".languageFilterSelect").change(function() {

		languageSelected = $(this).val();
		audiolimit = 10;
		audiooffset = 0;
		getAudioLinks();

	});

    $('.languageFilterSearch').keyup(function(e){
		e.stopPropagation();
		var term = $(this).val();
		if($.trim(term) != ""){
			getAudiosBySearchTerm(term);
		}
	});

    $(".mainaudioplayer .fbcomment").click(function(e) {
			e.stopPropagation();
            // console.log(e);
			if (!$(this).parent().next().is(":hidden")) {
				$(this).parent().next().hide();
			} else {
				$(this).parent().next().show();
			}

		});
	$("#mainaudio").bind("play", function() {

		//		globalaudiotag = audiotag;
		audioisplaying = true;
		audioispaused = false;
		if (videoCategory == "karaoke") {
			player.unMute();
		} else {
			player.mute();
		}
		player.playVideo();
		//		$(playbtn).html("Stop");

	});

	$(".rePlaybutton a").click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		playOriginal =false;
		audioisplaying = false;
		audioispaused = false;
		$(".pageloader").show();
		openVideoScreen();
		var curviewcount = parseInt($(".mainaudioplayer .viewcount .playedcount").html()) + 1;
		RecordPlayCount(blobkey, curviewcount);
		$(".mainaudioplayer .viewcount .playedcount").html(curviewcount);
		$("#mainaudio").attr('src', baseurl + "/getAudioBlobByKey?abk=" + encodeURIComponent(blobkey));
		$("#mainaudio").load();
		ga('dubroo.send', 'event', "Audio", "Playing", curaudioname);
	});

	$("#mainaudio").unbind().bind("loadeddata", function() {
		
		if(videottype == "gif"){
			$(".gfyVid")[0].load();
			$(this).attr("loop","loop");
			if(audstarttime < 0){
				var audioDelay = -(audstarttime);
				var aud = document.getElementById("mainaudio");
				aud.currentTime = audioDelay;
			}
				// $("#mainaudio")[0].play();
			$(this)[0].play();
			
			
		}else{
		
			var vidstarttime = 0;
			if (audstarttime < 0) {
				vidstarttime = 0;
			} else {
				vidstarttime = audstarttime;
			}
	        if(player == undefined){
	        	onYouTubeIframeAPIReady();
	        	setTimeout(function(){

	        		player.seekTo(parseInt(vidstarttime));

	    //     		player.loadVideoById({
					// 	videoId : videoID,
					// 	startSeconds : parseInt(vidstarttime)
					// });
			if (videoCategory == "karaoke") {
				player.unMute();
			} else {
				player.mute();
			}
			player.playVideo();
	        	},1000);
	        	
	        	
	        	
	        }else{
	        	player.loadVideoById({
				videoId : videoID,
				startSeconds : parseInt(vidstarttime)
			});
			if (videoCategory == "karaoke") {
				player.unMute();
			} else {
				player.mute();
			}
			player.playVideo();
	        }
			
		}
	});

	$("#mainaudio").bind("ended", function() {

		audioisplaying = false;
		$(this).attr("src", "");
		$(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");
		player.stopVideo();
		$(".rePlaybutton").show();
		closeVideoScreen();
		
		

	});
	$("#mainaudio").bind("pause", function() {

		if (videoPausedCosOfBuffering == false && videopaused == false) {
			audioispaused = true;
			audioisplaying = false;
			player.pauseVideo();
			player.unMute();
		}

	});

   	$("#mainaudio").bind("seeked", function() {
   		
   		// console.log(audstarttime);
   		// if(){
//    			
   		// }
   		
   		// var audoffset =  - parseFloat(audstarttime);
   		
   		var seekvidto =parseFloat($(this)[0].currentTime) + audstarttime;
   		
   		player.seekTo(seekvidto); 
   		
   	});
   	
	$("#mainaudio").bind("waiting", function() {
		// console.log("audio buffering");
		audiobuffering = true;
		audioispaused = false;
		audioisplaying = false;
		player.pauseVideo();
		player.unMute();

	});

	$("#mainaudio").bind("playing", function() {

		audiobuffering = false;
		player.mute();
		if (videoCategory == "karaoke") {
			player.unMute();
		}
		player.playVideo();

	});
	$(".audiopopularity .upvoteIcon img").click(function(){
			
			// console.log(v.voted);
			
		if(userLoginStatus == true){
			if($(this).hasClass("votedNone")){
			    VoteThisAudio("up",encodeURIComponent(blobkey));
			    $(this).attr("src","../static/imgs/upvotedicon.png");
			    var upvotecount = $(this).prev().text();
			    upvotecount = parseInt(upvotecount) + 1;
			    $(this).prev().html(upvotecount);
			    
			}
		}else{
				manuallogin = true;
				$('#loginModal').modal("show");
		}
			
			
	});
		
	$(".audiopopularity .downvoteIcon img").click(function(e){
		e.stopPropagation();
		if(userLoginStatus == true){
			if($(this).hasClass("votedNone")){
				VoteThisAudio("down",encodeURIComponent(blobkey));
				$(this).attr("src","../static/imgs/downvotedicon.png");
			    var downvotecount = $(this).prev().text();
			    downvotecount = parseInt(downvotecount) + 1;
			    $(this).prev().html(downvotecount);
			}
		
		}else{
			manuallogin = true;
			$('#loginModal').modal("show");
		}
		
	});

	$(".PlayOriginalbutton a").click(function(e){
		e.stopPropagation();
		// e.preventDefault();
		$("#mainaudio").hide();
		$(".videocover").hide();
		player.loadVideoById({
				videoId : videoID,
				startSeconds : 0
		});
		playOriginal = true;
		$(".rePlaybutton").hide();
		stopPlayingAudios();
		openVideoScreen();

		player.unMute();
		player.playVideo();



	});
	

});

function getAudioLinks() {
	// var baseurll = "http://www.dubroo.com";
	// console.log(pageUrl);
	
	$.ajax({
		type : "GET",
		url : baseurl + "/getAudiosList?videolink=" + videourl + "&lang=" + languageSelected + "&limit=" + audiolimit + "&offset=" + audiooffset+"&byUser=false",
		dataType : "json",
		success : function(resp) {
			if (resp == "") {


				if($(".audio-list").children().length == 0){


				var lang = languageSelected; 
				if(languageSelected != "")
				   lang = "in "+ languageSelected;
				if(languageSelected == "all" )
				   lang = "";
				$(".audio-list").html("<p>No dubbings for this video "+ lang +". </p>");
				}else{
					$(".audio-list").append("<p class='noaudiosmsg'>No More Audios</p>");
				}
			} else {
				$(".audio-list").empty();
				buildAudioList(resp);
			}
		}
	});
}

function buildAudioList(resp) {
	var fbthumbnail = "";
	$.each(resp, function(k, v) {
		var audioitem = document.createElement("div");
		var itemname = document.createElement("div");
		var audioplayer = document.createElement("div");
		var playbtn = document.createElement("span");
		var audiotag = document.createElement("audio");
		var audiosocialbar = document.createElement("div");
		var fbcustom = document.createElement("div");
		var viewcount = document.createElement("div");
		// var fbcomment = document.createElement("div");
		// var fbcommentholder = document.createElement("div");
		var audioData = document.createElement("div");
        var voteholder = document.createElement("div");
		var upvoteicon = document.createElement("div");
		var downvoteicon = document.createElement("div");
		var dlLink = document.createElement("a");
		var socialOpts = document.createElement("div");





        
		if (v.voted == "up") {
			$(upvoteicon).addClass("voteicon upvotedIcon").append('<span class="votecount">'+ v.upvotes +'</span><img src="../static/imgs/upvotedicon.png" alt="upvoteicon" />');
		} else {
			$(upvoteicon).addClass("voteicon upvoteIcon").append('<span class="votecount">'+ v.upvotes +'</span><img src="../static/imgs/upvoteicon.png" alt="upvoteicon" />');
		}

		if (v.voted == "down") {
			$(downvoteicon).addClass("voteicon downvotedIcon").append('<span class="votecount">'+ v.downvotes +'</span><img src="../static/imgs/downvotedicon.png" alt="downvoteicon" />');
		} else {
			$(downvoteicon).addClass("voteicon downvoteIcon").append('<span class="votecount">'+ v.downvotes +'</span><img src="../static/imgs/downvoteicon.png" alt="downvoteicon" />');
		}
		
		$(voteholder).addClass("voteicons clearfix").append(viewcount).append(downvoteicon).append(upvoteicon);
        
		// $(fbcomment).addClass("fbcomment").append('comment');
		//$(fbcommentholder).addClass("fbcommentholder").attr("id",k+"_"+v.audkey).append('<div class="fb-comments" data-href="' + pageUrl + encodeURIComponent(v.audkey) + '" data-numposts="5" data-width="440px" data-colorscheme="light"></div>');
		// <div class="fb-comments" data-href="http://developers.facebook.com/docs/plugins/comments/" data-numposts="5" data-colorscheme="light"></div>
		$(fbcustom).addClass("fbcustom").append("<img src='../static/imgs/fbshare.jpg'/><span>share</span>");
		if($.browser.mozilla){
			$(dlLink).addClass("dlLink").attr(
				{
					"download":v.audname.replace(/\s/g,"_")+".ogg",
					"href": baseurl + "/downloadaudio?abk=" + encodeURIComponent(v.audkey),
				}).html("download");
		}else{
			$(dlLink).addClass("dlLink").attr(
				{
					"download":v.audname.replace(/\s/g,"_")+".wav",
					"href": baseurl + "/downloadaudio?abk=" + encodeURIComponent(v.audkey),
				}).html("download");
		}
		

		$(socialOpts).addClass("shareOpts clearfix").append(dlLink).append(fbcustom);

		$(audiosocialbar).addClass("audiosocialbar clearfix").append(voteholder).append(socialOpts);
		$(viewcount).addClass("viewcount").append("<span class='glyphicon glyphicon-eye-open'> </span><span class='playedcount'>" + v.viewcount + "</span>");

		$(playbtn).addClass("playaudiobtn controlIcon playBtnIcon");
		//		$(audiotag).addClass("audioplayertag").attr("controls","contorls").attr("autoplay","autoplay");
		// $(audiotag).addClass("audioplayertag").attr("controls","contorls");
		// $(audioplayer).addClass("audioplayer clearfix").append(playbtn).append(audiotag);
		$(audioplayer).addClass("audioplayer clearfix").append(playbtn).append('<div class="loader"></div>');
		$(itemname).addClass("aud-name").attr("aud-source", v.audkey).append("<div class='dubname'>" + v.audname + "</div><div class='dublang'><span>in</span> " + v.language + "</div><div class='dubber'> <span>by </span> <a href='/profile?uh="+ v.composer +"'>" + v.composer + "</a></div>");
		// $(audioData).addClass("audioDetails").append(itemname).append(audiosocialbar).append(fbcommentholder);
		$(audioData).addClass("audioDetails").append(itemname).append(audiosocialbar);
		$(audioitem).addClass("audioitem clearfix").append(audioplayer).append(audioData);
		$(".audio-list").append(audioitem);
		if ( typeof (FB) !== 'undefined')
			FB.XFBML.parse(document.getElementById(k+"_"+v.audkey));
		
		
		
		if(v.videolink.indexOf("youtube") >=0 ){
			var ytID = v.videolink.split("/embed/")[1];
			
			fbthumbnail = "https://img.youtube.com/vi/" + ytID + "/mqdefault.jpg";
			
		}else if(v.videolink.indexOf("gfycat") >=0 ){
			fbthumbnail = "https://thumbs."+ v.videolink +"-thumb100.jpg";
			
		}
		
		
		
		$(fbcustom).click(function(e) {
			e.stopPropagation();
			// console.log(pageUrl + encodeURIComponent(v.audkey));
			FB.ui({
				method : 'feed',
				name : v.audname + " in " + v.language + " by " + v.composer,
				link : pageUrl + encodeURIComponent(v.audkey),
				caption : 'Dubroo - A new way of watching videos',
				picture: fbthumbnail,
				description : "An online platform to record your voice over any youtube video and make the content available in different languages and versions"
			}, function(response) {

				if (response && !response.error_code) {
					// alert('Posting completed.');
				} else {
					// alert('Error while posting.');
				}
			});
		});

		// $(fbcomment).click(function(e) {
		// 	e.stopPropagation();

		// 	if (!$(fbcommentholder).is(":hidden")) {
		// 		$(fbcommentholder).hide();
		// 	} else {
		// 		$(fbcommentholder).show();
		// 	}

		// });
		$(playbtn).click(function() {
			//			console.log(audioisplaying);
			//			if(audioisplaying == false){
				
			if($(this).hasClass("playBtnIcon")) {
				$(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");
				// $(".playaudiobtn").html("Play");
				$(".rePlaybutton").hide();

				$("#mainaudio").show();
				openVideoScreen();




				if(v.starttime == "") {
					audstarttime = 0;
				} else {
					audstarttime = parseFloat(v.starttime);
				}
				curaudioname = v.audname;
				curaudiocomposer = v.composer;
				curaudiolanguage = v.language;
				$(".pageloader").show();
				$(".mainaudiodetails").html("<span class='dubname'>" + curaudioname + "</span> in <span class='dublang'>" + curaudiolanguage + "</span> by <a class='dubber' href='/profile?=uh="+curaudiocomposer+"'> " + curaudiocomposer + "</a>");
				playOriginal = false;
				audioispaused = false;
				audioisplaying = false;
				$(".videocover").hide();
				$(playbtn).removeClass("playBtnIcon").addClass("pauseBtnIcon");
				// $(playbtn).html("Stop");
				blobkey = v.audkey;
				 // $('html, body').animate({
     //  				  scrollTop: "50px"
    	// 		}, 300);

				$('html,body').animate({
			        scrollTop: $("#mainStudioSection").offset().top},
			     300);

				
				$(".audioplayertag").hide();
				// $(audiotag).show().attr('src',baseurl+"/getAudioBlobByKey?abk="+ encodeURIComponent(blobkey));
				// $(audiotag).load();
				//				setTimeout(function(){
				$("#mainaudio").attr('src', baseurl + "/getAudioBlobByKey?abk=" + encodeURIComponent(blobkey));


				$(".audioLink").attr("href",baseurl + "/downloadaudio?abk=" + encodeURIComponent(blobkey));
				$("#mainaudio").load();
				//				},1000);


                
				window.history.pushState(curaudioname + " - Dubroo studio ", "Title", pageUrl + encodeURIComponent(blobkey));
				//				$(audiotag).attr("src",baseurl+"/getAudioBlobByKey?abk="+ encodeURIComponent(blobkey));
				var newCount = parseInt($(viewcount).find(".playedcount").text()) + 1;
				RecordPlayCount(v.audkey, newCount);
				$(".audiopopularity").show();
				$(viewcount).find(".playedcount").html(newCount);
				$(".mainaudioplayer .viewcount .playedcount").html(newCount);

				$(this).parent().next().find(".viewcount .playedcount").html(newCount);
				$(".audiopopularity .upvoteIcon .votecount").html(v.upvotes);
				$(".audiopopularity .downvoteIcon .votecount").html(v.downvotes);
				if(v.voted == "up"){
					$(".audiopopularity .upvoteIcon img").attr("src","../static/imgs/upvotedicon.png");
				}else if(v.voted == "down") {
					$(".audiopopularity .downvoteIcon img").attr("src","../static/imgs/downvotedicon.png");
				}else{
					$(".audiopopularity .downvoteIcon img").addClass("votedNone");
				}



				ga('dubroo.send', 'event', "Audio", "Playing", v.audname);
				// $(".mainaudioplayer").find(".fb-comments").attr("data-href",pageUrl + encodeURIComponent(blobkey));
				
				// $(".socialplugin").show();
				// $(".socialplugin .fb-like").attr("data-href", pageUrl + encodeURIComponent(blobkey));
				curpageurl = pageUrl + encodeURIComponent(blobkey);
				// if ( typeof (FB) !== 'undefined')
				// 	FB.XFBML.parse(document.getElementById('fb-com'));

				//			}
			} else {
				// console.log($(playbtn).attr("class"));
				$("#mainaudio").attr('src', "");
				player.stopVideo();
				$(this).removeClass("pauseBtnIcon").addClass("playBtnIcon");
				
				audioisplaying = false;
				audioispaused = false;
				}
		});
		
		
		$(upvoteicon).click(function(){
			
			// console.log(v.voted);
			
			if(userLoginStatus == true){
				if(v.voted == "none"){
			    VoteThisAudio("up",encodeURIComponent(v.audkey));
			}
			}else{
				manuallogin = true;
				$('#loginModal').modal("show");
			}
			
			
		});
		
		$(downvoteicon).click(function(){
			if(userLoginStatus == true){
			if(v.voted == "none"){
				VoteThisAudio("down",encodeURIComponent(v.audkey));
			}
			
			}else{
				manuallogin = true;
				$('#loginModal').modal("show");
			}
			
		});

		// $(audiotag).bind("loadeddata",function(){
		// var vidstarttime = 0;
		// if(audstarttime < 0){
		// vidstarttime = 0;
		// }else{
		// vidstarttime = audstarttime;
		// }
		//
		// player.loadVideoById({
		// videoId:videoID,
		// startSeconds: parseInt(vidstarttime)
		// });
		// if(videoCategory == "karaoke"){
		// player.unMute();
		// }else{
		// player.mute();
		// }
		// player.playVideo();
		//
		// });
		//
		// $(audiotag).bind("ended",function(){
		//
		// audioisplaying = false;
		// $(this).attr("src","");
		// $(".playaudiobtn").html("Play");
		// player.stopVideo();
		// $(".replay").show();
		//
		// });
		// $(audiotag).bind("pause",function(){
		//
		// if(videoPausedCosOfBuffering == false && videopaused == false){
		// audioispaused=true;
		// audioisplaying = false;
		// player.pauseVideo();
		// player.unMute();
		// }
		//
		// });

		//		$(audiotag).bind("seeked",function(){
		//			if($.trim($(playbtn).text()) == "Stop"){
		//
		//			var aud = $(this);
		//			console.log(aud[0].currentTime);
		//
		//			var newtime = parseInt(v.starttime) + parseInt(aud[0].currentTime);
		//
		//			console.log(newtime);
		//			player.seekTo(newtime,false);
		//				$(playbtn).html("Stop");
		//
		//			player.playVideo();
		//
		//			}
		//
		//		});

	});
	// $(".audio-list").getNiceScroll().resize();

}

function getLanguages() {

	$.ajax({
		type : "GET",
		url : baseurl + "/static/jsons/lang.json",
		dataType : "json",
		success : function(resp) {

			$(".languageFilterSelect").append('<option value="all">Filter by language</option>');

            var languages = resp.sort(insensitive);

			$.each(languages,function(k,v){
				// $(".languageFilterSelect").append('<option value="'+ v +'">'+v+'</option>');
				$(".languageFilterSelect").append('<option value="' + v + '">' + v + '</option>');
			});

		}
	});
}

function RecordPlayCount(audkey, newCount) {
	$.ajax({
		type : "GET",
		url : baseurl + "/increaseviewcount?abk=" + audkey + "&viewcount=" + newCount,
		dataType : "json",
		success : function(resp) {

			if (resp.result != undefined) {

			}
		}
	});
}





function getVideoDetails() {
	$.ajax({
		type : "GET",
		url : baseurl + "/getVideoDetails?videoUrl=" + videourl,
		dataType : "json",
		success : function(resp) {
			//			console.log(resp)
			
			if(videottype == "gif"){
				$(".videoplayer").hide();
				
				$(".gifholder").append("<img class='gfyitem' data-id='"+ videoID  +"' />");
				
				
			}
           
			$(".videoname").html(resp.videoname);
			VideoName = resp.videoname;
			videoCategory = resp.videocat;
			//$(".catTabs ."+ videoCategory +"-li").addClass("active");
			$('title').html(VideoName+ " - Dubroo");
			
				getVideoLinksForNonGallery();
			ga('dubroo.send', 'event', "Page visit", "studio", VideoName);
			setTimeout(function(){
		$(".gifholder .gfyVid").attr("width",600).attr("height",450);
		// $(".gfyVid");
		$(".gifholder .gfyitem > div").css("width","600px").css("height",450);
		$(".gifholder .gfyPreLoadCanvas").attr("width",600).attr("height",450);
		
	},3000);
			//			buildGallery(resp);
		}
	});
}

function getAudioDetails(blobkey) {

	$.ajax({
		type : "GET",
		url : baseurl + "/getaudiodetails?abk=" + blobkey,
		dataType : "json",
		success : function(resp) {
			// console.log(resp[0].error);
			if (resp[0].error == undefined) {

				if (resp[0].starttime == "") {
					audstarttime = 0;
				} else {
					audstarttime = parseFloat(resp[0].starttime);
				}
					
				curaudioname = resp[0].audname;
				curaudiocomposer = resp[0].composer;
				curaudiolanguage = resp[0].language;
				curviewCount = parseInt(resp[0].viewcount) + 1;
				RecordPlayCount(blobkey, curviewCount);
				$(".audiopopularity").show();
				
				$(".audiopopularity .upvoteIcon .votecount").html(resp[0].upvotes);
				$(".audiopopularity .downvoteIcon .votecount").html(resp[0].downvotes);
				if(resp[0].voted == "up"){
					$(".audiopopularity .upvoteIcon img").attr("src","../static/imgs/upvotedicon.png");
				}else if(resp[0].voted == "down") {
					$(".audiopopularity .downvoteIcon img").attr("src","../static/imgs/downvotedicon.png");
				}else{
					$(".audiopopularity .downvoteIcon img").addClass("votedNone");
				}
				$(".audioLink").attr("href",baseurl + "/downloadaudio?abk=" + encodeURIComponent(blobkey));
				$(".mainaudiodetails").html("<span class='dubname'>" + curaudioname + "</span> in <span class='dublang'>" + curaudiolanguage + "</span> by <a class='dubber' href='/profile?=uh="+curaudiocomposer+"'> " + curaudiocomposer + "</a>");
				$(".mainaudioplayer .viewcount .playedcount").html(curviewCount);
				// $(".mainaudioplayer").find(".fb-comments").attr("data-href",pageUrl + encodeURIComponent(blobkey));
				audioisplaying = false;
				audioispaused = false;
				setTimeout(function() {
					// $(".socialplugin").show();
					// $(".socialplugin .fb-like").attr("data-href", pageUrl + encodeURIComponent(blobkey));
					curpageurl = pageUrl + encodeURIComponent(blobkey);

					// if ( typeof (FB) !== 'undefined')
					//     FB.XFBML.parse(document.getElementById('fb-com'));
					$("#mainaudio").attr('src', baseurl + "/getAudioBlobByKey?abk=" + encodeURIComponent(blobkey));
					$("#mainaudio").load();
					openVideoScreen();

				}, 1000);

			} else {
				var temppageurl = pageUrl.split("&abk=")[0];

				window.history.pushState("object or string", "Title", temppageurl);
			}
			//			buildGallery(resp);
		}
	});

}



function VoteThisAudio(direction,akey){
	
	$.ajax({
		type : "GET",
		url : baseurl + "/user/votes?audiokey=" + akey + "&direction=" + direction,
		dataType : "json",
		success : function(resp) {

			if (resp.result != undefined) {
				
				getAudioLinks();
				
				
				
			}

		}
	});
	
	
}

function getAudiosBySearchTerm(term){
	
	$.ajax({
		type:"GET",
		url: baseurl+"/searchaudio?term="+ term+"&videoLink="+ encodeURIComponent(videourl),
		dataType:"json",
		success:function(resp){
			// console.log(resp);
			if(resp != ""){
				buildAudioSuggestionBox(resp);
			}else{
				$(".audiosuggestionbox").hide();
			}
			
		}
		
	});
	
	
}


function buildAudioSuggestionBox(resp){
	$(".audiosuggestionbox").show();
	$(".audiosuggestionbox").empty();
	$.each(resp,function(k,v){
		var searchresult=document.createElement('div');
		var searchvideo=document.createElement('div');
		
		$(searchvideo).addClass("searchvideorow").append("<span> "+v.audioname +" </span><span> ("+ v.language +")</span>");
		
		$(searchresult).addClass("searchresult").append(searchvideo);
		$(".audiosuggestionbox").append(searchresult);
		
		// var ytID = v.videolink.split("/embed/")[1];
		
		$(searchresult).click(function(){
			window.location = baseurl+"/studio?li="+ videoID+"&abk="+ encodeURIComponent(v.audiokey);
			$(".audiosuggestionbox").show();
		});
		
	});
	
	
}

openVideoScreen = function(){
	$(".right-col").removeClass("col-md-12 col-lg-12").addClass("col-lg-5 col-md-5");
	$(".videoscreen").show(300);
	
};

closeVideoScreen = function(){
	// $(".left-col").hide(500,function(){
	// 		$(".right-col").removeClass("col-md-5 col-lg-5").addClass("col-lg-12 col-md-12");
	// 	});
    $(".videoscreen").hide(500);
	$(".right-col").removeClass("col-md-5 col-lg-5").addClass("col-lg-12 col-md-12");
};


var examineStudioPageUrl = function(pageUrll){
	pageUrl = pageUrll;
	var	paramString = pageUrl.split("?li=")[1];
	if (blobkey == "")
	if (paramString.indexOf("&abk=") >= 0) {

		//AudioID exists in the url

		blobkey = paramString.split("&abk=")[1]; 
		videoID = paramString.split("&abk=")[0];
		$(".recorderLink a").attr("href","/recorder?li="+ videoID);
		if(paramString.indexOf("gfycat") != -1 ){
			videourl = gifurl;
			$(".recorderLink a").attr("href","/recorder?li="+ videoID);
			videoID = videoID.split("/")[1];
			videottype = "gif";
		}else{
			videourl= yturl;
		}
		
		videourl = videourl + videoID;
		// console.log(videourl);
		if (blobkey != "") {
			$(".pageloader").show();
			curpageurl = pageUrl;
			setTimeout(function(){
				getAudioDetails(blobkey);
			},1000);
	    }
	    pageUrl = pageUrl.split("&abk=")[0];
		
	}else{

		// only video ID exists in the url
		// $(".socialplugin").hide();
		videoID = paramString;
		$(".recorderLink a").attr("href","/recorder?li="+ videoID);
		if(paramString.indexOf("gfycat") != -1 ){
			videourl = gifurl;
			$(".recorderLink a").attr("href","/recorder?li="+ videoID);
			videoID = videoID.split("/")[1];
			videottype = "gif";
			
		}else{
			videourl= yturl;
		}
		videourl = videourl + videoID;
		
	}


	pageUrl = pageUrl + "&abk=";
	getAudioLinks();
	getVideoDetails();
	getLanguages();
};


stopPlayingAudios = function(){
	$("#mainaudio").attr('src', "");
	player.stopVideo();
	$(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");
				// $(".playaudiobtn").html("Play");
	$(".rePlaybutton").hide();
	
	audioisplaying = false;
	audioispaused = false;
};

getMoreAudios = function(elem){

	audiooffset = $(elem).children().length + 10;
	getAudioLinks();

};