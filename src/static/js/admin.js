
var startDate = "";
var endDate ="";
var limit = 100;
var offset = 0;
var baseurl = "";
var oldcat = "";
var oldAudname = "";
var oldlang = "";
var oldstarttime = "";
var selectedVidUrl = "";
var selectedAudKey = "";
	$(document).ready(function(){
		//today's date
		getLanguages();
		var startDate = $.datepicker.formatDate('yy-mm-dd', new Date());
		//console.log("today:"+startDate)
		//yestreday's date
		var d = new Date();
	var yest = d.setDate(d.getDate() - 1);
	var endDate = $.datepicker.formatDate('yy-mm-dd', new Date(yest));
	//console.log(endDate)
	getVideo(startDate,endDate,limit,offset);
	
		$(function() { 
			$("#e1").daterangepicker(); 
		});

		$("#e1").change(function () {
		  	var datestart =  JSON.parse($("#e1").val());
		  	//var dateend =$("#e1").dateEnd
		 var startDate = datestart.start;
		 var endDate = datestart.end;
		 
		 if($(".audioWrapper").is(":hidden")){
		 	$(".videoCover").empty();
		 	getVideo(startDate,endDate,limit,offset);
		 }
		 
		 
		 if($(".videoCover").is(":hidden")){
		 	$(".audioCover").empty();
		 	getAudio(startDate,endDate,limit,offset);
		 }

	});
	$(".audioButton").click(function(){
		 	//console.log("clickeed")
		 	$(".videoWrapper").hide();
		 	$(".audioWrapper").show();
	});
	$(".videoButton").click(function(){
		 	$(".videoWrapper").show();
		 	$(".audioWrapper").hide();
	});	

	$(".updateVideoSubmit").click(function(e){
		e.stopPropagation();
		var newcat = $(".videocat").val();
		if(newcat != ""){
			console.log(oldcat);
			if(oldcat != newcat)
				updateVideo(newcat);
		}else{
			$(".modal-body").append("<span class='errmsg'>Please select a category</span>");
			setTimeout(function(){
				$(".errmsg").remove();
			},5000);
		}
	});
	$(".updateAudioSubmit").click(function(e){
		e.stopPropagation();
		var newlang = $(".languageFilterSelect").val();
		var newName = $(".audioname").val();
		var newstartrime = $(".videostarttime").val();
		newstartrime=oldstarttime;
		if($.trim(newName) != "" && newlang != "" && $.trim(newstartrime) != ""){
			// console.log(oldcat);
			// if(oldAudname != newName && oldlang != newlang)
				updateAudio(newName,newlang,newstartrime);
		}else{
			$(".modal-body").append("<span class='errmsg'>Please enter name and select language</span>");
			setTimeout(function(){
				$(".errmsg").remove();
			},5000);
		}
	});
});

function getVideo(startDate,endDate,limit,offset){
	$.ajax({
		type:"GET",
		url: baseurl +"/getVideoLinksBydate?offset="+offset+"&limit="+limit+"&startdate="+startDate+"&enddate="+endDate,					
		dataType:"json",
		success:function(resp){
			buildVideo(resp);
		}
	});
}

function buildVideo(resp){
	console.log(resp);
	$.each(resp,function(k,v){
		var ytID = v.videolink.split("/embed/")[1];
		var thumbnail = "https://img.youtube.com/vi/" + ytID + "/mqdefault.jpg";
		 //console.log("link"+ytID)
		var videoWrapper = document.createElement('div');
		var thumbnailWrapper = document.createElement('div');
		var vidParaWrapper = document.createElement('div');
		var videoName = document.createElement('div');
		var vidCat = document.createElement('div');
		var userName = document.createElement('div');
		var userEmail = document.createElement('div');
		var dubCount = document.createElement('div');
		var buttonWrapper = document.createElement('div');
		var ytLink = document.createElement('a');
		var editVideo = document.createElement('div');
		$(editVideo).addClass("edit btn btn-sm btn-primary").text("EDIT");
		$(ytLink).attr({"href":"https://www.youtube.com/watch?v="+ytID,"target":"_blank"}).append("<span><button class='btn btn-primary btn-sm'>GOTO YOUTUBE</button><span>");
		$(videoName).addClass("videoName").text("Name:: ").append(v.videoname);
		$(vidCat).addClass("vidCat").text("Category:: ").append(v.videocat);
		$(userName).addClass("userName").text("User:: ").append(v.userName);
		$(userEmail).addClass("userEmail").text("Email-ID:: ").append(v.userUniqueID);
		$(dubCount).addClass("dubCount").text("Dubs::").append(v.dubscount);
		$(thumbnailWrapper).addClass("col-sm-2 thumbnailWrapper").append("<img src="+thumbnail+" >");
		$(vidParaWrapper).addClass("col-sm-10").append(videoName).append(vidCat).append(userName).append(userEmail).append(dubCount);
		$(buttonWrapper).addClass("col-sm-12").append(ytLink).append(editVideo);
		$(videoWrapper).addClass("vidWrapper  col-sm-12 clearfix").append(thumbnailWrapper).append(vidParaWrapper).append(buttonWrapper);
		$(".videoCover").append(videoWrapper);

		$(editVideo).click(function(){
			 $('#videoModal').modal();
			 $(".videoname").val(v.videoname);
			 $(".videocat").val(v.videocat);
			 oldcat = v.videocat;
			 selectedVidUrl = v.videolink;
		});

	});
}
       
function getAudio(startDate,endDate,limit,offset){
	$.ajax({
		type:"GET",
		url: baseurl +"/getAudiosListByDate?offset="+offset+"&limit="+limit+"&startdate="+startDate+"&enddate="+endDate,					
		dataType:"json",
		success:function(resp){
			//console.log(resp)
			buildAudio(resp);
		}
	});
}

function buildAudio(resp){
	console.log(resp);
	$.each(resp,function(k,v){
		var ytID = v.videolink.split("/embed/")[1];
		//var thumbnail = "http://img.youtube.com/vi/" + ytID + "/mqdefault.jpg";
		 console.log("link"+ytID);
		 console.log("audkey:"+v.audkey);

		var audioWrapper = document.createElement('div');
		//var thumbnailWrapper = document.createElement('div');
		var audioParaWrapper = document.createElement('div');
		var audioName = document.createElement('div');
		var email = document.createElement('div');
		var userName = document.createElement('div');
		var language = document.createElement('div');
		var viewCount = document.createElement('div');
		var buttonWrapper = document.createElement('div');
		var audioLink = document.createElement('a');
		var editAudio = document.createElement('div');
		var userProfileLink = document.createElement('a');

		$(editAudio).addClass("edit btn btn-sm btn-primary").text("EDIT");
		$(audioLink).attr({"href":"https://www.dubroo.com/studio?li="+ytID+"&abk="+v.audkey ,"target":"_blank"}).append("<span><button class='btn btn-primary btn-sm'>GOTO AUDIO</button><span>");
		$(audioName).addClass("videoName").text("Name::").append(v.audname);
		$(email).addClass("email").text("E-mail::").append(v.uniqueID);
		$(userName).addClass("userName").text("User::").append(v.userName);
		$(userProfileLink).attr({"href":"https://www.dubroo.com/profile?uh="+v.userDisplayName,"target":"_blank"}).append(userName);
		$(language).addClass("language").text("Language::").append(v.language);
		$(viewCount).addClass("viewCount").text("Views::").append(v.viewcount);
		//$(thumbnailWrapper).addClass("col-sm-2 thumbnailWrapper").append("<img src="+thumbnail+" >")
		$(audioParaWrapper).addClass("col-sm-12").append(audioName).append(email).append(userProfileLink).append(language).append(viewCount);
		$(buttonWrapper).addClass("col-sm-12").append(audioLink).append(editAudio);
		$(audioWrapper).addClass("audWrapper  col-sm-12 clearfix").append(audioParaWrapper).append(buttonWrapper);
		$(".audioCover").append(audioWrapper);

		$(editAudio).click(function(){
			 $('#audioModal').modal();
			 $(".audioname").val(v.audname);
			 $(".languageFilterSelect").val(v.language);
			 oldAudname = v.audname;
			 oldlang = v.language;
			 oldstarttime = v.starttime;
			 selectedAudKey = v.audkey;
		});
	});
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

function insensitive(s1, s2) {
  	var s1lower = s1.toLowerCase();
  	var s2lower = s2.toLowerCase();
  	return s1lower > s2lower? 1 : (s1lower < s2lower? -1 : 0);
}

function updateVideo(cat){
	var updateObj = {
		"cat": cat,
		"vidurl":selectedVidUrl
	
	};

	$.ajax({
		type : "POST",
		url : baseurl + "/video/update",
		data: updateObj,
		dataType : "json",
		success : function(resp) {
			if(resp.response == "success"){
				console.log("success");
				$('#videoModal').modal("hide");

			}else{
				console.log("fail");				
			}
		}
	});

}
function updateAudio(name,lang,starttime){
	var updateObj = {
		"audName":name,
		"audLang": lang,
		"audkey": selectedAudKey,
		"starttime": oldstarttime
	};
	$.ajax({
		type : "POST",
		url : baseurl + "/audio/update",
		data: updateObj,
		dataType : "json",
		success : function(resp) {
			if(resp.response == "success"){
				console.log("success");
				$('#audioModal').modal("hide");
			}else{
				console.log("fail");				
			}
		}
	});

}
