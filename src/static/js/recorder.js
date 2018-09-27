(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] ||
	function() {
		(i[r].q = i[r].q || []).push(arguments);
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
	m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

var recordplayer;
var videoID = "";
// var pageUrl = window.location.href;
// videoID = pageUrl.split("?li=")[1];
var yturl = "//www.youtube.com/embed/";
var videottype = "";
var gifurl = "";
var videourl = "";

var timer = "";
var count = 3;
var previewstarttime = 0;
var wantsToRecord = false;
var resumedRecording = false;
var viewingPreview = false;
var pausedRecording = false;
var resumedRecording = false;
var videoHeight = 350;
var recordRTC = "";
var VideoName = "";
var bloburl = "";
var sortOption = "dubscount";
var recordingSession = false;

function onYouTubeIframeAPIReady() {
	recordplayer = new YT.Player('videoplayer', {
		height : videoHeight,
		width : '100%',
		videoId : videoID,
		events : {
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange
		},
		playerVars : {
			fs : 1
		}
	});
}

function onPlayerReady(event) {}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		if (recordingSession == true) {
			if (wantsToRecord == true && resumedRecording == false) {
				wantsToRecord = false;
				ga('dubroo.send', 'event', "Audio", "Recording", VideoName);
				$(".recordbtn").html("Record");
				recordingSesseionOn();
				$(".recordingStatus").html("Recording ...");
				recordplayer.pauseVideo();
				recordBegin();
				// }else if(!$(".previewaudioplayer").is(":hidden")){
			} else if (resumedRecording == true) {
				$(".resumebtn").hide();
				$(".pausebtn").show();
				recordRTC.resumeRecording();
				$(".recordingStatus").html("Recording Resumed ...");
			}
		} else if (viewingPreview == true) {
			// viewingPreview = false;
			if (videoCategory == "karaoke") {
				recordplayer.unMute();
			} else {
				recordplayer.mute();
			}
			$('#audio')[0].play();

		}
	} else if (event.data == YT.PlayerState.ENDED) {

		if (recordingSession == true) {
			$(".stopbtn").trigger("click");
		}

	}

}



$(document).ready(function() {
	page = 'studio';
	ga('create', 'UA-58598109-1', 'auto', {
		'name' : 'dubroo'
	});
	ga('send', 'pageview');

	$("#audio").bind("ended", function() {
		recordplayer.stopVideo();

	});

	if (videottype == "gif") {
		$(".videostarttime").hide();
		$(".pauseResumeStopDiv").hide();
		$(".starttime").hide();
		$(".gifstop").show();

	} else {
		$(".gifstop").hide();
	}
	
	if(!recordRTC) {
		enableMicrophone();
	}

	$("#audio").unbind().bind("loadeddata", function() {

		var vidstarttime = 0;

		if (recordplayer == undefined) {
			onYouTubeIframeAPIReady();
			setTimeout(function() {
				recordplayer.loadVideoById({
					videoId : videoID,
					startSeconds : parseInt(vidstarttime)
				});
				if (videoCategory == "karaoke") {
					recordplayer.unMute();
				} else {
					recordplayer.mute();
				}
				recordplayer.playVideo();
			}, 1000);

		} else {

			// if(editMode == false){
			var samplestarttime = $(".previewstarttime input").val();
			previewstarttime = parseFloat(samplestarttime);
			if (samplestarttime == "") {
				samplestarttime = 0;
				previewstarttime = 0;
			}

			viewingPreview = true;
			$(".previewaudioplayer").css("display", "inline-block");


			if (previewstarttime < 0) {

				var audioDelay = -(previewstarttime);
				// console.log(audioDelay);
				var aud = document.getElementById("audio");
				// console.log("audio delay" + audioDelay);
				aud.currentTime = audioDelay;
			}

			recordplayer.loadVideoById({
				videoId : videoID,
				startSeconds : parseInt(previewstarttime)
			});
			if (videoCategory == "karaoke") {
				recordplayer.unMute();
			} else {
				recordplayer.mute();
			}
			recordplayer.playVideo();
		}

		// }
	});

	$("#audio").bind("ended", function() {

		audioisplaying = false;
		$(this).attr("src", "");
		// $(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");
		recordplayer.stopVideo();

		previewSessionOn();

	});

	$("#audio").bind("pause", function() {
		recordplayer.pauseVideo();
		recordplayer.unMute();
		// }

	});

	$("#audio").bind("seeked", function() {

		var seekvidto = parseFloat($(this)[0].currentTime) + previewstarttime;

		recordplayer.seekTo(seekvidto);

	});

	$("#audio").bind("waiting", function() {
		// console.log("audio buffering");
		audiobuffering = true;
		audioispaused = false;
		audioisplaying = false;
		recordplayer.pauseVideo();
		recordplayer.unMute();

	});

	$("#audio").bind("playing", function() {

		audiobuffering = false;
		recordplayer.mute();
		if (videoCategory == "karaoke") {
			recordplayer.unMute();
		}
		recordplayer.playVideo();

	});

	$(".recordbtn").click(function(e) {
		// if(userLoginStatus == true){
		// if (recordRTC != "") {

			// if($.trim($(this).text()) == "Record"){
			if (wantsToRecord == false) {
				count = 3;
				$('.counter').empty().show();
				blob = "";
				$(".audiometadata").hide();
				recordplayer.stopVideo();
				$('#audio').attr("src", "");
				$(this).html("wait");
				wantsToRecord = true;
				timer = setInterval(function() {
					handleTimer(count);
				}, 1000);

			}
		// } else {
			// $(".enableMicrophone").show();
			// $(".bgcover,.messageboard").slideDown(200);
			// $(".messageboard p").html("Enable microphone to Record your Voice");
			// $(".closebtn,.okbtn,.bgcover").unbind().bind("click", function() {
			// 	$(".bgcover,.messageboard").slideUp(200);
			// 	$(".messageboard p").empty();
			// });
			// enableMicrophone();
		// }
	});

	$(".enableMicrophone").click(function(e) {
		e.stopPropagation();
		if (recordRTC == "")
			enableMicrophone();
		else {
			$(this).hide();
		}

	});

	$(".pausebtn").click(function() {
		pausedRecording = true;
		resumedRecording = false;
		recordplayer.pauseVideo();
		videoStoppedTime = Math.floor(recordplayer.getCurrentTime());

		// console.log(videoStoppedTime);
		$(this).hide();
		$(".resumebtn").show();
		recordRTC.pauseRecording();
		$(".recordingStatus").html("Recording Paused");
		// }

	});

	$(".resumebtn").click(function() {

		resumedRecording = true;
		pausedRecording = false;

		recordplayer.loadVideoById({
			videoId : videoID,
			startSeconds : parseInt($.trim(videoStoppedTime))
		});
		if (videoCategory == "karaoke") {
			recordplayer.unMute();
		} else {
			recordplayer.mute();
		}
		recordplayer.playVideo();

	});

	$(".stopbtn").click(function() {

		previewSessionOn();
		recordingSession = false;
			recordplayer.stopVideo();
		// $(".pausebtn").show().addClass("disabledBtns");
		$(".resumebtn").hide();
		$(".recordingStatus").html("Preview recording");
		resumedRecording = false;
		pausedRecording = false;
		wantsToRecord = false;
		$(".pageloader").show();

		recordRTC.resumeRecording();

		recordRTC.stopRecording(function(audioURL) {

			console.log(audioURL);
			audiou = audioURL;
			blob = recordRTC.getBlob();
			recordplayer.stopVideo();

			$(".pageloader").hide();

		});
	});

	$(".cancelbtn").click(function() {
		$(".audioname input").val("");
		$(".starttime input").val("");
		resetRecordingPage();
		$('#audio').attr("src", "");
		$(".recordingStatus").html("");
    $(".previewstarttime").hide();

		blob = "";
		recordRTC = "";

	});

	$(".gifstop").click(function() {
		$(".gfyVid")[0].pause();
		$('#audio').attr("src", "");
	});

	$(".previewbtn").click(function() {

		if (videottype == "gif") {

			$(".gfyVid")[0].load();
			previewstarttime = parseFloat($(".previewstarttime input").val());

			$('#audio').attr("src", audiou).attr("loop", "loop");

			if (previewstarttime < 0) {
				var audioDelay = -(previewstarttime);
				var aud = document.getElementById("audio");
				// console.log("audio delay" + audioDelay);
				aud.currentTime = audioDelay;
			}

			ga('dubroo.send', 'event', "Audio_preview", "vid_" + VideoName, "by_" + username);
			if ($(".audiometadata").is(":hidden")) {
				//			$(this).html("uploading...");

				// getBurl();
				// recordplayer.pauseVideo();

				var videostarttime = $(".previewstarttime input").val();
				if (videostarttime == "") {
					videostarttime = 0;
					previewstarttime = 0;
				}
				// $(".starttime input").val(videostarttime);
				// $(".previewaudioplayer").hide();
				$(".audiometadata").show();

			}

		} else {

			$('#audio').attr("src", URL.createObjectURL(blob));
			// $('#audio').load();
			// }

			$('#audio').load();
			previewingSession();
		}

	});

	$(".stopPreview").click(function(e) {
		e.stopPropagation();
		$("#audio").attr("src", "");
		
		previewSessionOn();
	});

	$(".audioname input").change(function() {
		getBurl();
	});

	$(".uploadaudio").click(function() {

		var audioname = $(".audioname input").val().toLowerCase();
		if ($.trim(audioname) != "") {
			if (userLoginStatus == true) {
				UploadAudio();
			} else {
				readyToUpload = true;
				$("#loginModal").modal("show");
			}
		} else {

			//				alert("Audio should have a name and the composer name!!!");
			$(".bgcover,.messageboard").show();
			$(".messageboard p").html("Audio should have a name!!!");
			$(".closebtn,.okbtn,.bgcover").unbind().bind("click", function() {

				$(".bgcover,.messageboard").hide();
				$(".messageboard p").empty();

			});
		}
	});
	
	$(".syncbtn").click(function(){
		$(".previewstarttime").show();
	});
});

function getVideoDetails() {
	$.ajax({
		type : "GET",
		url : baseurl + "/getVideoDetails?videoUrl=" + videourl,
		dataType : "json",
		success : function(resp) {
			console.log(resp)
			if (videottype == "gif") {
				$(".videoplayer").hide();

				$(".gifholder").append("<img class='gfyitem' data-id='" + videoID + "' />");
			}
			$(".videoname").html(resp.videoname);
			VideoName = resp.videoname;
			videoCategory = resp.videocat;
			
			getVideoLinksForNonGallery();
			   
			$(".catTabs ."+ videoCategory +"-li").addClass("active");
			   
			$('title').html(VideoName + " - Dubroo");
			ga('dubroo.send', 'event', "Page visit", "studio", VideoName);

			setTimeout(function() {
				$(".gifholder .gfyVid").attr("width", 600).attr("height", 450);
				// $(".gfyVid");
				$(".gifholder .gfyitem > div").css("width", "600px").css("height", 450);
				$(".gifholder .gfyPreLoadCanvas").attr("width", 600).attr("height", 450);

			}, 3000);
		}
	});
}

function getBurl() {
	$.ajax({
		type : "GET",
		url : baseurl + "/getburl",
		dataType : "text",
		success : function(resp) {

			bloburl = resp;
			console.log("bloburl: ", bloburl);
		}
	});
}

function getLanguages() {

	$.ajax({
		type : "GET",
		url : baseurl + "/static/jsons/lang.json",
		dataType : "json",
		success : function(resp) {

			$(".languageFilterSelect").append('<option value="all">Select a language</option>');

			var languages = resp.sort(insensitive);

			$.each(languages, function(k, v) {
				// $(".languageFilterSelect").append('<option value="'+ v +'">'+v+'</option>');
				$(".langselector").append('<option value="' + v + '">' + v + '</option>');
			});
		}
	});
}

function storeAudio(audioname, composer, composermail, starttime, language) {
	var fd = new FormData();
	fd.append("blob", blob);
	fd.append("composer", composer);
	fd.append("composeremail", composermail);
	fd.append("videolink", videourl);
	fd.append("audioname", audioname);
	fd.append("starttime", starttime);
	fd.append("language", language);
	
	return $.ajax({
		type : "POST",
		url : bloburl,
		data : fd,
		dataType : "json",
		processData : false,
		contentType : false,
		success : function(resp) {

			// $(".audio-list").empty();
			var date = new Date();
			date = date.getDate();
			ga('dubroo.send', 'event', "Audio", "Uploaded", audioname);
			ga('dubroo.send', 'event', "Audio", "Uploaded_for", VideoName);
			ga('dubroo.send', 'event', "Audio", "Uploaded_on", date);
			// var ytID = resp.result.split("/embed/")[1];
			if (videottype == "gif") {
				window.location = baseurl + "/studio?li=" + videourl + "&abk=" + resp.result;
			} else {
				window.location = baseurl + "/studio?li=" + videoID + "&abk=" + resp.result;
			}
		}
	});

}

startRecording = function() {
	$('.counter').hide();
	// if (videottype == "gif") {
	// 	// setTimeout(function(){

	// 	// console.log($(".gfyVid"));
	// 	var duration = $(".gfyVid")[0].duration;
	// 	// console.log(duration);
	// 	// duration = Math.ceil(duration);

	// 	duration = parseFloat(duration) * 1000;
	// 	// console.log(duration);
	// 	recordRTC.startRecording();
	// 	$(".gfyVid")[0].load();
	// 	$(".recordbtndiv").hide();
	// 	$(".pauseResumeStopDiv").show();
	// 	$(".recordingStatus").html("Recording ...");

	// 	setTimeout(function() {

	// 		$(".stopbtn").trigger("click");
	// 	}, duration);
	// 	// },2000);

	// } else {

	var videostarttime = $(".videostarttime input").val();
	if (videostarttime == "") {
		videostarttime = 0;
	}

	recordplayer.loadVideoById({
		videoId : videoID,
		startSeconds : parseInt($.trim(videostarttime))
	});
	wantsToRecord = true;
	recordingSession = true;

	if (videoCategory == "karaoke") {
		recordplayer.unMute();
	} else {
		recordplayer.mute();
	}
	recordplayer.playVideo();

	// }
};

const enableMicrophone = function() {
	if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

  if(navigator.mediaDevices.getUserMedia)
	  navigator.getUserMedia = navigator.mediaDevices.getUserMedia;
  
  if (navigator.getUserMedia) {
		navigator.getUserMedia({
			audio : true
		}, function(mediaStream) {
			// recordRTC = RecordRTC(mediaStream);

			recordRTC = RecordRTC(mediaStream, {
				type : 'audio',
				mimeType: 'audio/ogg',
				recorderType : StereoAudioRecorder,
				numberOfAudioChannels : 1 // or leftChannel:true
			});

			// $(".gfyVid")[0].pause();
			// $(".bgcover,.messageboard").slideUp(200);
			// $(".messageboard p").empty();
			$(".enableMicrophone").hide();
			// startRecording();
		}, function() {
			recordRTC = "";
		});
	}
};

function endCountdown() {
	// logic to finish the countdown here
	enableMicrophone();
	startRecording();
}

function handleTimer() {
	if (count === 0) {
		clearInterval(timer);
		endCountdown();
	} else {
		$('.recordingStatus').html("Recording starts in - ");
		$('.counter').html(count);
		count--;
	}
}

UploadAudio = function() {
	var audioname = $(".audioname input").val().toLowerCase();
	var composer = userDisplayName;
	var composermail = uniqueID;
	var starttime = previewstarttime;
	var language = $(".langselector").val();

	// if(blob != ""){
	if ($.trim(audioname) != "") {

		// $(".uploadbtn").html("Processing...");
		// $(".uploadbtn").attr("processing");
		$(".pageloader").show();
		$(".audiometadata").hide();
		// if(userLoginStatus == true){
		storeAudio(audioname, composer, composermail, starttime, language);

		// }
	} else {
		//				alert("Audio should have a name and the composer name!!!");
		$(".bgcover,.messageboard").show();
		$(".messageboard p").html("Audio should have a name!!!");
		$(".closebtn,.okbtn,.bgcover").unbind().bind("click", function() {

			$(".bgcover,.messageboard").hide();
			$(".messageboard p").empty();

		});
	}
};

var examineRecordingPageUrl = function(pageUrl) {

	videoID = pageUrl.split("?li=")[1];
	yturl = "//www.youtube.com/embed/" + videoID;
	videottype = "";
	gifurl = videoID;
	videourl = yturl;

	if (videoID.indexOf("gfycat") != -1) {
		videoID = videoID.split("/")[1];
		videourl = gifurl;
		videottype = "gif";
	} else {
		setTimeout(function() {
			if (recordplayer == undefined) {
				onYouTubeIframeAPIReady();
			}
		}, 100);
	}
	$(".gotoStudio").attr("href", "/studio?li=" + videoID);

	getVideoDetails();

	// if(navigator.userAgent.indexOf("Chrome") === -1 ){
    $(".recordstudio > div").show();
		$(".recordstudio > p").hide();
	getLanguages();
};

recordingSesseionOn = function() {
	$(".UploadFunctions,.audiometadata,.previewSection,.recordbtndiv,.previewaudioplayer").hide();
	$(".pauseResumeStopDiv").show();

};

previewSessionOn = function() {

	$(".pauseResumeStopDiv,.previewaudioplayer").hide();
	$(".UploadFunctions,.audiometadata,.previewSection").show();

	$(".previewstarttime input").attr("disabled", false);
	$(".previewstarttime input").val($(".videostarttime input").val());
};

previewingSession = function() {
	$(".UploadFunctions,.audiometadata ,.recordbtndiv,.previewSection").hide();
	$(".previewaudioplayer").show();
};

resetRecordingPage = function() {
	$(".pauseResumeStopDiv,.audiometadata,.previewaudioplayer,.UploadFunctions,.previewSection").hide();
	$(".recordbtndiv").show();
};

recordBegin = function() {
	recordRTC.startRecording();
	recordplayer.playVideo();
};
// ["D","b","A","c"].sort(insensitive);