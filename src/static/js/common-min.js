var baseurl="";var GetUserLoginStatus,LogOutSuccessFul,LoginNow,loginSuccessFul;var userLoginStatus=false;var manuallogin=false;var offset=0;var limit=12;var uniqueID,username,userDisplayName;var readyToUpload=false;var youtubebase="//www.youtube.com/embed/";var pageUrl=window.location.href;var loginSource="";var page="gallery";var videoCategory="all";var chromebrowser=false;$(document).ready(function(){if($.browser.chrome==true){chromebrowser=true}else{chromebrowser=false}console.log(window.location);GetUserLoginStatus();$("header").load("../static/header.html",function(a){$(".topmenu ul li a.modalanchor").click(function(b){b.stopPropagation();var c=$(this).attr("data-target");if(c=="#loginModal"){manuallogin=true;$(c).modal()}else{if(c=="#addVideo"){if(userLoginStatus==true){$(c).modal()}else{manuallogin=true;$("#loginModal").modal("show")}}else{if(c=="#blogLink"){}else{$(c).modal()}}}});$(".videosearchbox").keyup(function(c){c.stopPropagation();var b=$(this).val();if($.trim(b)!=""){getVideosBySearchTerm(b)}});$(".searchimg").click(function(c){c.stopPropagation();var b=$(this).prev().val();if($.trim(b)!=""){getVideosBySearchTerm(b)}});$(".videourl input").change(function(){var b=$(this).val();if($.trim(b).indexOf("gfycat")!=-1){$(".addvideoname").show()}else{$(".addvideoname").hide()}});$(".addvideobtn").click(function(c){c.preventDefault();var b=$(".addvideoname input").val().toLowerCase();var f=$(".videourl input").val();var d=$(".videocategoryselect").val();if(d=="all"){d="others"}if($.trim(f)!=""){if($.trim(f).indexOf("embed")==-1){if($.trim(f).indexOf("gfycat")!=-1){d="gif";f=f.replace("http://","")}else{f=f.split("v=")[1];if(f.indexOf("&")!=-1){f=f.split("&")[0]}f=youtubebase+$.trim(f)}}if($.trim(b).indexOf("http://")!=-1||$.trim(b).indexOf("https://")!=-1){$("#addVideo .modal-body").append("<div class='errorMsg'>Please enter Video name in the name field not the URL</div>");setTimeout(function(){$(".errorMsg").remove()},5000)}else{addVideoLink(b,f,d)}}else{$("#addVideo .modal-body").append("<div class='errorMsg'>Please enter Video name and URL</div>");setTimeout(function(){$(".errorMsg").remove()},5000)}});$(".fblogin").click(function(b){b.stopPropagation();loginToFBNow()});$("#signinButton").click(function(b){b.stopPropagation();b.preventDefault();gapi.signin.render("signinButton",{callback:signinCallback,clientid:"215885751681-5afb5200v9liiqecc0j2h52h8nh2ql28.apps.googleusercontent.com",cookiepolicy:"single_host_origin",requestvisibleactions:"http://schemas.google.com/AddActivity",scope:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",approvalprompt:"force"})});$(".logoutBtn img").click(function(b){b.stopPropagation();if($(".logoutbox").is(":hidden")){$(".logoutbox").show()}else{$(".logoutbox").hide()}});$("a.logoutLink").click(function(b){b.preventDefault();return $.getJSON("/user/logsOut").done(function(c){return LogOutSuccessFul()})});$(".regBtn").click(function(b){b.preventDefault();return RegisterNow(uniqueID,username)})});$(".catTabs").load("../static/category_tabs.html",function(a){$(".catTabs li").click(function(c){c.stopPropagation();$(".catTabs li").removeClass("active");$(this).addClass("active");var b=$(this).attr("name");if(page==="gallery"){videoCategory=b;$(".categorySection").removeClass("showCatSection");$("."+videoCategory).parent().addClass("showCatSection");if($("."+videoCategory).children().length==0){offset=0;getVideoLinks()}}else{if(videoCategory!==b){$(".videoscontainer").empty()}videoCategory=b;getVideoLinksForNonGallery();gotoRelatedVideos()}})});$(".instooltip").tooltip();$("body").click(function(){$(".suggestionbox").hide();$(".instructionBoard").slideUp(100);$(".toparrow").hide();$(".explainationBoardDub").hide();$("#loginModal").hide();$(".logoutbox").hide()});$(".videostarttime input,.starttime input").keypress(function(a){if($.inArray(a.which,[0,8,46])!==-1||(a.which==65&&a.ctrlKey===true)){return}if((a.which<48||a.which>57)){a.preventDefault()}});$(".previewstarttime input").keypress(function(a){if($.inArray(a.which,[0,8,45,46])!==-1||(a.which==65&&a.ctrlKey===true)){return}if((a.which<48||a.which>57)){a.preventDefault()}});$(".loadMore .loadMoreWrapperGallery").click(function(b){b.stopPropagation();var a=$(this).parent().prev().find(".galleryitem");a=a.length;offset=a;videoCategory=$(this).parent().prev().prev().attr("name");getVideoLinks()});$(".loadMore .loadMoreWrapper").click(function(b){b.stopPropagation();var a=$(this).parent().prev().find(".galleryitem");a=a.length;offset=a;getVideoLinksForNonGallery()})});function resizeVideosContainer(b){var a=(offset+limit)*220;$(b).css("width",a+"px")}function getVideosBySearchTerm(a){$.ajax({type:"GET",url:baseurl+"/searchvideo?term="+a,dataType:"json",success:function(b){if(b!=""){buildSuggestionBox(b)}else{$(".suggestionbox").hide()}}})}function buildSuggestionBox(a){$(".suggestionbox").show();$(".suggestionbox").empty();$.each(a,function(e,d){var c=document.createElement("div");var b=document.createElement("div");$(b).addClass("searchvideorow").append("<span> "+d.videoname+" </span><span> ("+d.dubscount+")</span>");$(c).addClass("searchresult").append(b);$(".suggestionbox").append(c);var f=d.videolink.split("/embed/")[1];if(d.videolink.indexOf("gfycat")!=-1){f=d.videolink}$(c).click(function(){window.location=baseurl+"/studio?li="+f;$(".suggestionbox").show()})})}gotoRelatedVideos=function(){$("html,body").animate({scrollTop:$(".videoscontainer").offset().top},"slow")};pageReload=function(){window.location.reload()};LogOutSuccessFul=function(){gapi.auth.signOut();pageReload();return $(".logoutBtn").hide()};loginSuccessFul=function(){userLoginStatus=true;$(".loginBtn").hide();$(".logoutBtn").show();$(".RegisterBtn").hide();FillUserDetails();if(manuallogin==true){pageReload()}return $("#loginModal").modal("hide")};FillUserDetails=function(){$(".userNameField").html(userDisplayName);if(readyToUpload==true){UploadAudio()}};LoginNow=function(a,c){var b;b="";return $.getJSON(b+"/user/logsIn?uniqueID="+a+"&userName="+c).done(function(d){if(d.invalid!=null){$(".RegisterBtn").show()}else{if(d.userDisplayName!=undefined&&d.userDisplayName!=""&&d.userDisplayName!=null){userDisplayName=d.userDisplayName;userDisplayName=userDisplayName.replace(/_/g," ");console.log("userDisplayName",userDisplayName)}else{userDisplayName=c;userDisplayName=userDisplayName.replace(/_/g," ");console.log("userDisplayName",userDisplayName)}return loginSuccessFul()}})};RegisterNow=function(c,b){var a;a="";return $.getJSON(a+"/user/registers?uniqueID="+c+"&userName="+b).done(function(d){if(d.invalid!=null){}else{return loginSuccessFul()}})};GetUserLoginStatus=function(){var a;a="";return $.getJSON(a+"/user/loginnStatus").done(function(b){if(b.status=="loggedin"){uniqueID=b.uniqueID;username=b.userName;if(b.userDisplayName!=undefined&&b.userDisplayName!=""&&b.userDisplayName!=null){userDisplayName=b.userDisplayName;userDisplayName=userDisplayName.replace(/_/g," ");console.log("userDisplayName",userDisplayName)}else{userDisplayName=userDisplayName.replace(/_/g," ")}loginSuccessFul()}else{$(".logoutBtn").hide();$(".loginBtn").show()}decodePageURL()})};RequestLogin=function(){$("#loginModal").show()};function addVideoLink(a,c,b){$.ajax({type:"GET",url:baseurl+"/addNewVideo?videoname="+a+"&videolink="+encodeURIComponent(c)+"&videocat="+b,dataType:"json",success:function(e){if(e.error!=undefined){var d=c.split("/embed/")[1];if(c.indexOf("gfycat")!=-1){d=v.videolink}window.location=baseurl+"/recorder?li="+d}else{setTimeout(function(){var f=new Date();f=f.getDate();ga("dubroo.send","event","New Video","Added",a);ga("dubroo.send","event","New Video","Added_on",f);$(".videoname input").val("");$(".videourl input").val("");var g=c.split("/embed/")[1];if(c.indexOf("gfycat")!=-1){g=c}window.location=baseurl+"/recorder?li="+g},1500)}}})}examineCategoryUrl=function(b){var a=b.split("/c/"[1]);videoCategory=a};decodePageURL=function(){if(pageUrl.indexOf("studio")!=-1){examineStudioPageUrl(pageUrl)}else{if(pageUrl.indexOf("recorder")!=-1){examineRecordingPageUrl(pageUrl)}else{if(pageUrl.indexOf("profile")!=-1){examineUserProfile(pageUrl)}else{if(pageUrl.indexOf("/c/")!=-1){examineCategoryUrl(pageUrl)}}}}};function insensitive(c,a){var d=c.toLowerCase();var b=a.toLowerCase();return d>b?1:(d<b?-1:0)}function getVideoLinksForNonGallery(){$.ajax({type:"GET",url:baseurl+"/getVideoLinks?cat="+videoCategory+"&sortBy="+sortOption+"&offset="+offset+"&limit="+limit,dataType:"json",success:function(a){buildGalleryForNonGallery(a)}})}function buildGalleryForNonGallery(a){$.each(a,function(f,l){var e=document.createElement("div");var i=document.createElement("div");var b=document.createElement("div");var c=document.createElement("div");var g=document.createElement("div");var d=l.videolink.split("/embed/")[1];if(l.videocat=="gif"){d=l.videolink;link=l.videolink.split("/")[1]}if(l.videocat!="gif"){$(c).addClass("videoimg").css({background:"url(http://img.youtube.com/vi/"+d+"/mqdefault.jpg ) no-repeat center center"})}else{$(c).addClass("videoimg").append("<img  src='http://thumbs."+d+"-thumb100.jpg' />")}$(b).addClass("dubcount").append("<span>Dubs: </span><span>"+l.dubscount+"</span>");var h=l.videoname.length;var j=l.videoname;if(h>20){j=l.videoname.substring(0,20)+"..."}$(i).addClass("vid-name").attr("vid-source",l.videolink).attr("vid-cat",l.videocat).append(j);$(g).addClass("videoThumbnailWrapper").append(c).append(i).append(b);$(e).addClass("galleryitem col-lg-2 col-md-3 col-sm-6 col-xs-12").append(g);$(".videoscontainer").append(e);$(e).click(function(){if(page==="studio"){window.location=baseurl+"/studio?li="+d}else{window.location=baseurl+"/recorder?li="+d}})})};