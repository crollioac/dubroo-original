/**
 * @author Kiran
 */


// var pageUrl = window.location.href;
var languagesKnown = [];

$(document).ready(function(){


	// decodePageURL();


	getLanguages();	



	$(".editIcon").click(function(e){
		e.stopPropagation();
		$(this).parent().next().show();
		// $(".editNameField").show();
	});

	$(".editNameInput").keydown(function(e){
		e.stopPropagation();
		$(".checkAvailableBtn").show();
		$(".submitNameBtn").hide();
		$(".msg").remove();
	});
    
    $(".checkAvailableBtn").click(function(e){
    	e.preventDefault();
        e.stopPropagation();
    	var handle = $(".editNameInput").val();
    	var handle_length = ValidateHandle(handle);
    	// console.log(handle);
    	if(handle_length == "valid"){
    		CheckHandleAvailability(handle);
    	}else{
    		$(".editNameInput").after("<span class='msg errorMsg'>Invalid name</span>");
    		setTimeout(function(){
            	$(".msg").remove();
    		},3000);
    	}
    });

    $(".submitNameBtn").click(function(e){
    	e.stopPropagation();
    	var handle = $(".editNameInput").val();
         UpdateUserDisplayName(handle);
    });
    
    $(".closeEditOption").click(function(e){
    	e.stopPropagation();
    	$(".editNameField").hide();
		// $(".editNameInput").val("");
		$(".checkAvailableBtn").show();
		$(".submitNameBtn").hide();
    });
    $(".closeLanguages").click(function(e){
    	e.stopPropagation();
    	
		$(this).parent().hide();
		
    });
    $(".languageListInput").change(function(e){
    	e.stopPropagation();
    	var lang = $(this).val();
    	$(this).val("");
    	selectLanguage(lang);
    });
    $(".updateLanguages").click(function(e){
    	e.stopPropagation();
    	updateLanguages();
    });

});


CheckHandleAvailability = function(handle){

	$.ajax({
		type:"GET",
		url: baseurl+"/user/checkUserHandleAvailability?handle="+handle,
		dataType:"json",
		success:function(resp){

			if(resp.available == "true"){
				$(".checkAvailableBtn").hide();
				$(".submitNameBtn").show();
				$(".submitNameBtn").after("<span class='msg successMsg'>Available</span>");
			}else{
				$(".checkAvailableBtn").after("<span class='msg errorMsg'>Not Available</span>");
			}

            setTimeout(function(){
            	$(".msg").remove();
            },5000);

		}

	});
};

ValidateHandle = function(handle){


	var handle_length = $.trim(handle).length;
    var regex = /^[a-zA-Z0-9_]+$/;
        // console.log(regex.test(handle))  
    
    if(handle_length > 6 && handle_length < 15 && regex.test(handle)){
        return "valid";
    }else{
    	return "invalid";
    }


};

UpdateUserDisplayName = function(handle){
	$.ajax({
		type:"GET",
		url: baseurl+"/user/updateUserName?handle="+handle,
		dataType:"json",
		success:function(resp){

			if(resp.newName != undefined ){

				$(".userNameField").html(resp.newName);
				$(".userName").html(resp.newName);
				$(".editNameField").hide();
				$(".editNameInput").val("");
				$(".checkAvailableBtn").show();
				$(".submitNameBtn").hide();

			}else{
				$(".editNameInput").after("<span class='msg errorMsg'>Not Available</span>");
			}



		}

	});
};


GetUsersDubs = function(){

};

examineUserProfile = function(pageUrl){
	var handle = pageUrl.split("?uh=")[1];


console.log(handle);

	if(handle == "" || handle == undefined){
		//edit mode on
		setTimeout(function(){
		if(userLoginStatus == false){
			window.location = "/";
		}
		},1000);
		handle = userDisplayName;
		UserDataAPI(handle);

	}else{
		if(handle == userDisplayName){
			window.location = pageUrl.split("?uh=")[0];
		}
		//edit mode off

		disableEditOptions();
		UserDataAPI(handle);
		
	}
    
};


disableEditOptions  = function(){
	$(".editIcon").hide();
};

UserDataAPI = function(handle){

$.ajax({
		type:"GET",
		url: baseurl+"/user/userDetailsByhandle?handle="+handle,
		dataType:"json",
		success:function(resp){
			renderUserProfile(resp);

		}
	});


}

renderUserProfile = function(userData){

	if(userData.error == undefined){
		$(".userName").html(userData.userDisplayName);
		var arr="";
		if(userData.knownlanguages != null)
			arr = userData.knownlanguages.split(",");
		console.log(arr);
		UpdateLanguagesUI(arr);
		buildUsersAudioList(userData.audioList);


	}

};

buildUsersAudioList = function(audioList){

	console.log(audioList);
    
    $.each(audioList,function(k,v){
    	var audioDiv = document.createElement('div');
    	var audio = document.createElement('div');
    	var audioAnchor = document.createElement('a');
        var thumbnail = "";
        var vidID = "";
    	if(v.videolink.indexOf("youtube") >=0 ){
		    ytID = v.videolink.split("/embed/")[1];
		    vidID = ytID;
			thumbnail = "https://img.youtube.com/vi/" + ytID + "/mqdefault.jpg";
			
		}else if(v.videolink.indexOf("gfycat") >=0 ){
			thumbnail = "https://thumbs."+ v.videolink +"-thumb100.jpg";	
			vidID = v.videolink;
		}

		$(audio).addClass("audioDetails").append("<span class='audioName'>" + v.audname+ "</span> in <span class='audioLang'> "+ v.language +" </span>")
		$(audioAnchor).attr("href","/studio?li="+ vidID+"&abk="+v.audkey).append(audio);

		$(audioDiv).addClass("userAudioWrapper").append(audioAnchor);
        
		$(".audioListContainer").append(audioDiv);









    });
    // audioListContainer
};

getLanguages = function() {

	$.ajax({
		type : "GET",
		url : baseurl + "/static/jsons/lang.json",
		dataType : "json",
		success : function(resp) {

			// $("#languageList").append('<option value="all">Type</option>');

            var languages = resp.sort(insensitive);

			$.each(languages,function(k,v){
				// $(".languageFilterSelect").append('<option value="'+ v +'">'+v+'</option>');
				$("#languageList").append('<option value="' + v + '">' + v + '</option>');
			});

		}
	});
};

selectLanguage = function(language){
	if(languagesKnown.indexOf(language) < 0){
		languagesKnown.push(language);
		addLangugeToTheBucket(language);
	}
	
};
addLangugeToTheBucket = function(language){

	console.log(languagesKnown);
	var languageTag = document.createElement('div');
	var lang = document.createElement('span');
	var remove = document.createElement('span');
    $(remove).addClass("removeLang").attr("aria-hidden","true").html('&times;');
    $(lang).html(language);
    $(languageTag).addClass("langTag").append(lang).append(remove);
    $(".selectedLanguages").append(languageTag);
    $(remove).click(function(e){
    	e.stopPropagation();
    	removeLangFromList(language);
    	$(this).parent().remove();

    });

};

removeLangFromList = function(language){
	languagesKnown.pop(language);
};

updateLanguages = function(){

	var updateObj = {
		"handle": userDisplayName,
		"langs": languagesKnown
	};

	$.ajax({
		type:"GET",
		url: baseurl+"/user/updateuserlangauges?handle="+userDisplayName+"&langs="+ languagesKnown,
		// data: updateObj,
		dataType:"json",
		success:function(resp){

			if(resp.result == "success"){
				console.log(resp.langList);
				UpdateLanguagesUI(resp.langList.split(","));
				$(".chooseLanguages").hide();
			}else{
				
			}

            setTimeout(function(){
            	$(".msg").remove();
            },5000);
		}
	});

};

UpdateLanguagesUI = function(langList){
	console.log(langList.length);
	if(langList.length != 0){
		var langString = "";
		$.each(langList,function(k,v){
			langString = langString + v + ", ";
		});
		console.log(langString);
		langString = langString.substring(0,langString.length - 2);
		$(".languagesKnown").html(langString);
	}else{
		$(".languagesKnown").html("Set your languages");
	}
};