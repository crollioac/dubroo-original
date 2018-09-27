var baseurl = "https://www.dubroo.com";
// var baseurl = "";
var GetUserLoginStatus,
    LogOutSuccessFul,
    LoginNow,
    loginSuccessFul;
var userLoginStatus = false;
var manuallogin = false;
var offset = 0;
var limit = 12;
var uniqueID,
    username,
    userDisplayName;
var readyToUpload = false;
var youtubebase = "//www.youtube.com/embed/";
var pageUrl = window.location.href;
var loginSource = "";
var page = "gallery";
var videoCategory = "all";
var chromebrowser = false;
var _addVideoComplete = false;

$(document).ready(function() {
	if ($.browser.chrome == true) {
		chromebrowser = true;
	} else {
		chromebrowser = false;
	}
	
	GetUserLoginStatus();
	$("header").load("../static/header.html", function(e) {
		$(".topmenu ul li a.modalanchor").click(function(e) {
			e.stopPropagation();
			var id = $(this).attr("data-target");
			if (id == "#loginModal") {
				manuallogin = true;
				$(id).modal();
			} else if (id == "#addVideo") {
				if (userLoginStatus == true) {
					$(id).modal();
				} else {
					manuallogin = true;
					$("#loginModal").modal("show");
				}
			} else if (id == "#blogLink") {

			} else {
				$(id).modal();
			}
		});

		$('.videosearchbox').keyup(function(e) {
			e.stopPropagation();
			var term = $(this).val();
			if ($.trim(term) != "") {
				getVideosBySearchTerm(term);
			}
		});

		$(".searchimg").click(function(e) {
			e.stopPropagation();
			var term = $(this).prev().val();
			if ($.trim(term) != "") {
				getVideosBySearchTerm(term);
			}
		});

		$(".videourl input").change(function() {
			var videolink = $(this).val();

			if ($.trim(videolink).indexOf("gfycat") != -1) {
				$(".addvideoname").show();
			} else {
				$(".addvideoname").hide();
			}
		});

		$(".addvideobtn").click(function(e) {
			e.preventDefault();
			var videoname = $(".addvideoname input").val().toLowerCase();
			var videolink = $(".videourl input").val();
			var videocat = $(".videocategoryselect").val();
		    	
			if (videocat == "all") {
				videocat = "others";
			}
			if ($.trim(videolink) != "") {
				if ($.trim(videolink).indexOf("embed") == -1) {
					videolink = videolink.split("v=")[1];
					if (videolink.indexOf("&") != -1) {
						videolink = videolink.split("&")[0];
					}
					videolink = youtubebase + $.trim(videolink);
				}

				if ($.trim(videoname).indexOf("http://") != -1 || $.trim(videoname).indexOf("https://") != -1) {
					$("#addVideo .modal-body").append("<div class='errorMsg'>Please enter Video name in the name field not the URL</div>");
					setTimeout(function() {
						$('.errorMsg').remove();

					}, 5000);
				} else {
					addVideoLink(videoname, videolink, videocat);
				}


			} else {
				$("#addVideo .modal-body").append("<div class='errorMsg'>Please enter Video name and URL</div>");
				setTimeout(function() {
					$('.errorMsg').remove();
				}, 5000);
			}

		});

		$(".fblogin").click(function(e) {
			e.stopPropagation();
			loginToFBNow();
		});

		$("#signinButton").click(function(e) {
			e.stopPropagation();
			e.preventDefault();
			gapi.signin.render("signinButton", {
				callback : signinCallback,
				clientid : "215885751681-5afb5200v9liiqecc0j2h52h8nh2ql28.apps.googleusercontent.com",
				cookiepolicy : "single_host_origin",
				requestvisibleactions : "http://schemas.google.com/AddActivity",
				scope : "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",
				approvalprompt : "force"
			});
		});

		$(".logoutBtn img").click(function(e) {
			e.stopPropagation();
			if ($(".logoutbox").is(":hidden")) {
				$(".logoutbox").show();
			} else {
				$(".logoutbox").hide();
			}

		});

		$("a.logoutLink").click(function(e) {
			e.preventDefault();

			return $.getJSON("" + "/user/logsOut").done(function(jsonData) {
				return LogOutSuccessFul();
			});
		});

		$(".regBtn").click(function(e) {
			e.preventDefault();
			return RegisterNow(uniqueID, username);
		});

	});

	// Loading Category html

	$(".catTabs").load("../static/category_tabs.html", function(e) {

		$(".catTabs li").click(function(e) {
			e.stopPropagation();

			$(".catTabs li").removeClass("active");
			$(this).addClass("active");
			var name = $(this).attr("name");
			

			if (page === "gallery") {
				videoCategory = name;
				$(".categorySection").removeClass("showCatSection");
				$("." + videoCategory).parent().addClass("showCatSection");
				if ($("." + videoCategory).children().length == 0) {
					offset = 0;
					getVideoLinks();	
					
					
				}
			} else {
				if(videoCategory !== name){
					$(".videoscontainer").empty();
				}
				videoCategory = name;
				getVideoLinksForNonGallery();
				gotoRelatedVideos();
			}

		});

	});

	$(".instooltip").tooltip();

	$('body').click(function() {
		$(".suggestionbox").hide();
		$(".instructionBoard").slideUp(100);
		$(".toparrow").hide();
		$(".explainationBoardDub").hide();
		$('#loginModal').hide();
		$(".logoutbox").hide();

	});

	$(".videostarttime input,.starttime input").keypress(function(e) {

		// console.log(e.which);
		// Allow: delete, .
		if ($.inArray(e.which, [0, 8, 46]) !== -1 ||
		// Allow: Ctrl+A
		(e.which == 65 && e.ctrlKey === true))
		// Allow: home, end, left, right, down, up
		{
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.which < 48 || e.which > 57)) {
			e.preventDefault();
		}
	});

	$(".previewstarttime input").keypress(function(e) {
		// Allow: delete,. , -

		if ($.inArray(e.which, [0, 8, 45, 46]) !== -1 ||
		// Allow: Ctrl+A
		(e.which == 65 && e.ctrlKey === true))
		// Allow: home, end, left, right, down, up
		{
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.which < 48 || e.which > 57)) {
			e.preventDefault();
		}

	});

	$(".loadMore .loadMoreWrapperGallery").click(function(e) {
		e.stopPropagation();
		var vidCount = $(this).parent().prev().find(".galleryitem");
		vidCount = vidCount.length;
		offset = vidCount;
		videoCategory = $(this).parent().prev().prev().attr("name");
		getVideoLinks();
	});
	
	$(".loadMore .loadMoreWrapper").click(function(e) {
		e.stopPropagation();
		var vidCount = $(this).parent().prev().find(".galleryitem");
		vidCount = vidCount.length;
		offset = vidCount;
		getVideoLinksForNonGallery();
	});
});

function resizeVideosContainer(target) {
	var wid = (offset + limit) * 220;
	$(target).css("width", wid + "px");
}

function getVideosBySearchTerm(term) {
	$.ajax({
		type : "GET",
		url : baseurl + "/searchvideo?term=" + term,
		dataType : "json",
		success : function(resp) {
			// console.log(resp);
			if (resp != "") {
				buildSuggestionBox(resp);
			} else {
				$(".suggestionbox").hide();
			}
		}
	});
}

function buildSuggestionBox(resp) {
	$(".suggestionbox").show();
	$(".suggestionbox").empty();
	$.each(resp, function(k, v) {
		var searchresult = document.createElement('div');
		var searchvideo = document.createElement('div');

		$(searchvideo).addClass("searchvideorow").append("<span> " + v.videoname + " </span><span> (" + v.dubscount + ")</span>");

		$(searchresult).addClass("searchresult").append(searchvideo);
		$(".suggestionbox").append(searchresult);
		var ytID = v.videolink.split("/embed/")[1];
		if (v.videolink.indexOf("gfycat") != -1) {
			ytID = v.videolink;
		}

		// var ytID = v.videolink.split("/embed/")[1];

		$(searchresult).click(function() {
			window.location = baseurl + "/studio?li=" + ytID;
			$(".suggestionbox").show();
		});

	});

}

gotoRelatedVideos = function(){
	$('html,body').animate({
        scrollTop: $(".videoscontainer").offset().top},
        'slow');
};
pageReload = function() {
	window.location.reload();

};

LogOutSuccessFul = function() {
	gapi.auth.signOut();
	// userLoginStatus = false;
	// $(".loginBtn").show();
	// console.log(manuallogin);
	// if(manuallogin == true){
	pageReload();
	// }

	return $(".logoutBtn").hide();
};

loginSuccessFul = function() {
	userLoginStatus = true;
	$(".loginBtn").hide();
	$(".logoutBtn").show();
	$(".RegisterBtn").hide();
	FillUserDetails();

	if (manuallogin == true) {
		pageReload();
	}
	return $('#loginModal').modal("hide");
};

FillUserDetails = function() {

	$(".userNameField").html(userDisplayName);
	if (readyToUpload == true) {
		UploadAudio();

	}

	// $(".userEmailID").html(uniqueID);
};
LoginNow = function(email, userName) {
	var base;
	base = '';
	return $.getJSON(base + '/user/logsIn?uniqueID=' + email + '&userName=' + userName).done(function(jsonData) {
		if (jsonData.invalid != null) {
			$(".RegisterBtn").show();

			// return console.log("user Needs to Register");
		} else {

			// console.log(jsonData.userDisplayName);
			if (jsonData.userDisplayName != undefined && jsonData.userDisplayName != "" && jsonData.userDisplayName != null) {
				userDisplayName = jsonData.userDisplayName;
				userDisplayName = userDisplayName.replace(/_/g, ' ');
				console.log("userDisplayName",userDisplayName);
			} else {
				userDisplayName = userName;
				userDisplayName = userDisplayName.replace(/_/g, ' ');
				console.log("userDisplayName",userDisplayName);
				
			}

			return loginSuccessFul();
		}
	});
};

RegisterNow = function(uniqueID, userName) {
	var base;
	base = '';
	return $.getJSON(base + '/user/registers?uniqueID=' + uniqueID + '&userName=' + userName).done(function(jsonData) {
		if (jsonData.invalid != null) {
			// return; console.log("user Needs to Register");
		} else {
			return loginSuccessFul();
		}
	});
};

GetUserLoginStatus = function() {
	var base;
	base = '';
	return $.getJSON(base + '/user/loginnStatus').done(function(jsonData) {
		if (jsonData.status == "loggedin") {
			uniqueID = jsonData.uniqueID;
			username = jsonData.userName;
			// console.log(jsonData.userDisplayName);
			if (jsonData.userDisplayName != undefined && jsonData.userDisplayName != "" && jsonData.userDisplayName != null) {
				userDisplayName = jsonData.userDisplayName;
				userDisplayName = userDisplayName.replace(/_/g, ' ');
				console.log("userDisplayName",userDisplayName);
			} else {
				userDisplayName = userDisplayName.replace(/_/g, ' ');
			}

			loginSuccessFul();
		} else {

			$(".logoutBtn").hide();
			$(".loginBtn").show();
		}
		decodePageURL();
	});
};

RequestLogin = function() {

	$('#loginModal').show();
	// $(".RegisterBtn").hide();
};

function addVideoLink(videoname, videolink, videocat) {

	return $.ajax({
		type : "GET",
		url : baseurl + "/addNewVideo?videoname=" + videoname + "&videolink=" + encodeURIComponent(videolink) + "&videocat=" + videocat,
		dataType : "json",
		success : function(resp) {

			if (resp.error != undefined) {
				var ytID = videolink.split("/embed/")[1];
				if (videolink.indexOf("gfycat") != -1) {
					ytID = v.videolink;
				}

				window.location = baseurl + "/recorder?li=" + ytID;
			
			} else {

				setTimeout(function() {
					// $(".videoscontainer").empty();
					var date = new Date();
					date = date.getDate();
					ga('dubroo.send', 'event', "New Video", "Added", videoname);
					ga('dubroo.send', 'event', "New Video", "Added_on", date);
					
					
					// getVideoLinks();
					
					$(".videoname input").val("");
					$(".videourl input").val("");

					var ytID = videolink.split("/embed/")[1];
					if (videolink.indexOf("gfycat") != -1) {
						ytID = videolink;
					}
					window.location = baseurl + "/recorder?li=" + ytID;

				}, 1500);
			}
		}
	});
}

var examineCategoryUrl = function(pageur) {

	var cat = pageur.split("/c/"[1]);
	videoCategory = cat;

};



decodePageURL = function() {
	// console.log(pageUrl)
	if (pageUrl.indexOf("studio") != -1) {
		examineStudioPageUrl(pageUrl);
	} else if (pageUrl.indexOf("recorder") != -1) {
		examineRecordingPageUrl(pageUrl);
	} else if (pageUrl.indexOf("profile") != -1) {
		examineUserProfile(pageUrl);
	} else if (pageUrl.indexOf("/c/") != -1) {
		examineCategoryUrl(pageUrl);
	}
};

function insensitive(s1, s2) {
	var s1lower = s1.toLowerCase();
	var s2lower = s2.toLowerCase();
	return s1lower > s2lower ? 1 : (s1lower < s2lower ? -1 : 0);
}

function getVideoLinksForNonGallery() {

	$.ajax({
		type : "GET",
		url : baseurl + "/getVideoLinks?cat=" + videoCategory + "&sortBy=" + sortOption+"&offset="+offset+"&limit="+limit,
		dataType : "json",
		success : function(resp) {
			buildGalleryForNonGallery(resp);
		}
	});
}
function buildGalleryForNonGallery(resp) {

	$.each(resp, function(k, v) {
		var galleryitem = document.createElement("div");
		var itemname = document.createElement("div");
		var dubcount = document.createElement("div");
		var videoimg = document.createElement("div");
		var videoThumbnail = document.createElement("div");
		//		var
		var ytID = v.videolink.split("/embed/")[1];
		if(v.videocat == "gif"){
			ytID = v.videolink;
			link = v.videolink.split("/")[1];
			
		}
		
			
		
		if(v.videocat != "gif"){
		
		$(videoimg).addClass("videoimg").css({
			"background" : "url(https://img.youtube.com/vi/" + ytID + "/mqdefault.jpg ) no-repeat center center"
		});
		}else{
			// $(videoimg).addClass("videoimg").append("<img class='gfyitem' data-id='"+ link +"' />");
			$(videoimg).addClass("videoimg").append("<img  src='https://thumbs."+ ytID +"-thumb100.jpg' />");
			
		}
		
		$(dubcount).addClass("dubcount").append('<span>Dubs: </span><span>' + v.dubscount + '</span>');
		//		var  = document.createElement("div");
		//		var galleryitrm = document.createElement("div");   
		var len = v.videoname.length;
        var vname = v.videoname;
        if(len > 20){
           vname = v.videoname.substring(0,20) + "...";
        }
        
		$(itemname).addClass("vid-name").attr("vid-source",v.videolink).attr("vid-cat",v.videocat).append(vname);
		$(videoThumbnail).addClass("videoThumbnailWrapper").append(videoimg).append(itemname).append(dubcount);	
		$(galleryitem).addClass("galleryitem col-lg-2 col-md-3 col-sm-6 col-xs-12").append(videoThumbnail);

		$(".videoscontainer").append(galleryitem);
		
		
		$(galleryitem).click(function() {
			if(page === 'studio'){
				window.location = baseurl + "/studio?li=" + ytID;
	
			}else{
				window.location = baseurl + "/recorder?li=" + ytID;
			}

			
		});
	});
	
	// setTimeout(function(){
		// $(".videoscontainer .gfyVid").attr("width",160).attr("height",100);
		// // $(".gfyVid");
		// $(".videoscontainer .gfyitem > div").css("width","160px").css("height",100);
		// $(".videoscontainer .gfyPreLoadCanvas").attr("width",160).attr("height",100);
// 		
	// },2000);
}