/**
 * @author Kiran
 */

var player;
var base = "";
var recordRTC;
var audio = $('#audio');
var audiou = "";
var reader="";
var arrayBuffer;
var baseurl="";



navigator.getUserMedia({audio: true}, function(mediaStream) {
   recordRTC = RecordRTC(mediaStream);
   // recordRTC.startRecording();
},function(){
	console.log("errorr");
});
$(document).ready(function(){
	
// 	
// var tag = document.createElement('script');
// tag.src = "//www.youtube.com/player_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	
	// Recorder.initialize({
    // swfSrc: "./js/recorder.swf",                                  // URL to recorder.swf
    // // optional:
    // flashContainer: document.getElementById("somecont"), // (optional) element where recorder.swf will be placed (needs to be 230x140 px)
    // onFlashSecurity: function(){                              // (optional) callback when the flash swf needs to be visible
                                                              // // this allows you to hide/show the flashContainer element on demand.
    // },
  // });
	
	$(".recordicon").click(function(e){
		
		recordRTC.startRecording();
	// Recorder.record({
    // start: function(){                 // will be called when the recording started 
         // alert("say something");                       // which could be delayed because Adobe Flash asks the user for microphone access permission
         // player.playVideo();
    // },
    // progress: function(milliseconds){  // will be called in a <1s frequency with the current position in milliseconds
// 
    // }
    // });
	});
	$(".play").click(function(){
		alert("keep quiet!! SILENCE !!");
		$(".ytvideo").attr("src","//www.youtube.com/embed/9Y-8Mat7PFs?feature=player_detailpage");
		
//		$('#audio').muted = true;
//		$('#audio').attr("src",audiou);
		$('#audio').attr("src","/getAudioBlobByKey?audioblobkey=UouLBZPtHY_Y6rePJmazbw==");
		
//		$('#audio').play();
		
		
//		player.playVideo();
//	Recorder.play({
//    finished: function(){               // will be called when playback is finished
//		 
//    },
//    progress: function(milliseconds){  // will be called in a <1s frequency with the current position in milliseconds
//      
//    }
// });
		
	});
	
	$(".stop").click(function(){
//	recordRTC.stopRecording(function() {
//    var blob = recordRTC.blob;
//
//    // equivalent to: recordRTC.getBlob() method
//    var blob = recordRTC.getBlob();
//    
//    
//    
//    
//});
	
	recordRTC.stopRecording(function(audioURL) {
		console.log(audioURL);
		audiou = audioURL;
		var blob = recordRTC.getBlob();
//		var blob = recordRTC.blob;
		console.log(blob);
		storeAudio(blob);
		
//		reader = new FileReader();
//		reader.readAsArrayBuffer(blob);
//		console.log(reader);
//		reader.onload = function (event) {
//		    arrayBuffer = event.target.result;
//		    
//		};
		
		
		
//		$('#audio').attr("controls","pause");
//		$('#audio').attr("paused",true);
 	   
// 	  audio.src = URL.createObjectURL(mediaStream);
 	});
 
		// Recorder.stop();
		// alert("recording stopped"); 
	});
	
	$(".upload").click(function(){
	    // Recorder.upload({
        // method: "POST",                             // (not implemented) (optional, defaults to POST) HTTP Method can be either POST or PUT 
        // url: base + "./imgs/",   // URL to upload to (needs to have a suitable crossdomain.xml for Adobe Flash)
        // audioParam: "track[asset_data]",           // Name for the audio data parameter
     // params: {                                  // Additional parameters (needs to be a flat object)
      // "track[title]": "video.mp3",
      // "oauth_token":  "VALID_TOKEN"
    // },
    // success: function(responseText){           // will be called after successful upload
          // console.log(responseText);
    // },
    // error: function(){                  // (not implemented) will be called if an error occurrs
// 
    // },
    // progress: function(milliseconds){
//     	
    // }                    // (not yet implemented)
  // });
	});
	
	
	$('input').click(function(){
		
		player.stopVideo();
		
		$('audio')[0].pause();
		
		var audio = $(this).attr("class");
		
		$('audio').attr('src','imgs/'+ audio +'.mp3');
		
		player.playVideo();
		$('audio')[0].play();
		
	});
});
function onYouTubeIframeAPIReady() {
	
    player = new YT.Player('video', {
      events: {
        'onReady': onPlayerReady
      }
    });
}

function onPlayerReady(event){
  event.target.mute();
}


function storeAudio(blob){
	
	var composer="AR Rehman";
	var composeremail="arrehman@gmail.com";
	var videolink="https://www.youtube.com/embed/9Y-8Mat7PFs?feature=player_detailpage";
		
	
//	var audioobj={
//			"blob":blob,
//			"composer": composer,
//			"composeremail": composeremail,
//			"videolink":videolink,
//			"audioname":"sample"
//	}
	
	var fd = new FormData();
	fd.append("blob",blob);
	fd.append("composer", composer);
	fd.append("composeremail", composeremail);
	fd.append("videolink", videolink);
	fd.append("audioname", "sample");
	
	var url = $(".theform").attr("action");
	
//	$(".theform input").val(blob);
	
//	$(".theform").submit();
	
	
	$.ajax({
		type:"POST",
		url: url,
		data: fd,
		dataType:"json",
		processData: false,
	    contentType: false,
		success:function(resp){
			console.log(resp)
		}
	});
	
	
	
	
}
