(function(d,e,j,h,f,c,b){d.GoogleAnalyticsObject=f;d[f]=d[f]||function(){(d[f].q=d[f].q||[]).push(arguments)},d[f].l=1*new Date();c=e.createElement(j),b=e.getElementsByTagName(j)[0];c.async=1;c.src=h;b.parentNode.insertBefore(c,b)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");var bloburl="";var audiou="";var blob="";var videoID="";var videottype="";var blobkey="";var yturl="//www.youtube.com/embed/";var gifurl="gfycat.com/";var videourl="";var ok=false;var globalaudiotag="";var videoHeight=450;var sortOption="dubscount";var VideoName="";var audioispaused=false;var audioisplaying=false;var videoPausedCosOfBuffering=false;var audstarttime="";var videopaused=false;var audkey="";var curaudioname="";var curaudiolanguage="";var curaudiocomposer="";var audiobuffering=false;var videoCategory="all";var pausedaudio=false;var wantsToRecord=false;var pausedRecording=false;var resumedRecording=false;var stoppedRecording=false;var viewingPreview=false;var pausedPreview=false;var recordingSession=false;var videoStoppedTime=0;var curpageurl="";var previewstarttime=0;var languageSelected="";var audiooffset=0;var audiolimit=10;var playOriginal=false;var player;function onYouTubeIframeAPIReady(){player=new YT.Player("videoplayer",{height:videoHeight,width:"100%",videoId:videoID,events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange},playerVars:{wmode:"transparent",autoplay:0,controls:1,disablekb:1,fs:1,iv_load_policy:3,loop:0,modestbranding:1,rel:0,showinfo:0}})}function onPlayerReady(a){}function onPlayerStateChange(b){if(b.data==YT.PlayerState.PLAYING){videoPausedCosOfBuffering=false;videopaused=false;if(playOriginal==false){if(audioisplaying==false&&audioispaused==false){player.mute();if(audstarttime>=0){audioispaused=false;audioisplaying=true;$(".videocover").show();$("#mainaudio")[0].play()}else{audioispaused=false;audioisplaying=true;$(".videocover").hide();var a=-(audstarttime);var c=document.getElementById("mainaudio");c.currentTime=a;$("#mainaudio")[0].play()}}}}if(b.data==YT.PlayerState.BUFFERING){if(playOriginal==false){if(audioisplaying==true){videoPausedCosOfBuffering=true;$("#mainaudio")[0].pause();audioisplaying=false}}}}function stopVideo(){}$(document).ready(function(){page="studio";ga("create","UA-58598109-1","auto",{name:"dubroo"});ga("send","pageview");setTimeout(function(){if(player==undefined){onYouTubeIframeAPIReady()}},1000);$(".audio-list").on("scroll",function(){if($(this).scrollTop()+$(this).innerHeight()>=this.scrollHeight){if(!$(".audio-list > p").hasClass("noaudiosmsg")){getMoreAudios($(this))}}});$(".languageFilterSelect").change(function(){languageSelected=$(this).val();audiolimit=10;audiooffset=0;getAudioLinks()});$(".languageFilterSearch").keyup(function(b){b.stopPropagation();var a=$(this).val();if($.trim(a)!=""){getAudiosBySearchTerm(a)}});$(".mainaudioplayer .fbcomment").click(function(a){a.stopPropagation();if(!$(this).parent().next().is(":hidden")){$(this).parent().next().hide()}else{$(this).parent().next().show()}});$("#mainaudio").bind("play",function(){audioisplaying=true;audioispaused=false;if(videoCategory=="karaoke"){player.unMute()}else{player.mute()}player.playVideo()});$(".rePlaybutton a").click(function(a){a.stopPropagation();a.preventDefault();playOriginal=false;audioisplaying=false;audioispaused=false;$(".pageloader").show();openVideoScreen();var b=parseInt($(".mainaudioplayer .viewcount .playedcount").html())+1;RecordPlayCount(blobkey,b);$(".mainaudioplayer .viewcount .playedcount").html(b);$("#mainaudio").attr("src",baseurl+"/getAudioBlobByKey?abk="+encodeURIComponent(blobkey));$("#mainaudio").load();ga("dubroo.send","event","Audio","Playing",curaudioname)});$("#mainaudio").unbind().bind("loadeddata",function(){if(videottype=="gif"){$(".gfyVid")[0].load();$(this).attr("loop","loop");if(audstarttime<0){var b=-(audstarttime);var c=document.getElementById("mainaudio");c.currentTime=b}$(this)[0].play()}else{var a=0;if(audstarttime<0){a=0}else{a=audstarttime}if(player==undefined){onYouTubeIframeAPIReady();setTimeout(function(){player.seekTo(parseInt(a));if(videoCategory=="karaoke"){player.unMute()}else{player.mute()}player.playVideo()},1000)}else{player.loadVideoById({videoId:videoID,startSeconds:parseInt(a)});if(videoCategory=="karaoke"){player.unMute()}else{player.mute()}player.playVideo()}}});$("#mainaudio").bind("ended",function(){audioisplaying=false;$(this).attr("src","");$(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");player.stopVideo();$(".rePlaybutton").show();closeVideoScreen()});$("#mainaudio").bind("pause",function(){if(videoPausedCosOfBuffering==false&&videopaused==false){audioispaused=true;audioisplaying=false;player.pauseVideo();player.unMute()}});$("#mainaudio").bind("seeked",function(){var a=parseFloat($(this)[0].currentTime)+audstarttime;player.seekTo(a)});$("#mainaudio").bind("waiting",function(){audiobuffering=true;audioispaused=false;audioisplaying=false;player.pauseVideo();player.unMute()});$("#mainaudio").bind("playing",function(){audiobuffering=false;player.mute();if(videoCategory=="karaoke"){player.unMute()}player.playVideo()});$(".audiopopularity .upvoteIcon img").click(function(){if(userLoginStatus==true){if($(this).hasClass("votedNone")){VoteThisAudio("up",encodeURIComponent(blobkey));$(this).attr("src","../static/imgs/upvotedicon.png");var a=$(this).prev().text();a=parseInt(a)+1;$(this).prev().html(a)}}else{manuallogin=true;$("#loginModal").modal("show")}});$(".audiopopularity .downvoteIcon img").click(function(b){b.stopPropagation();if(userLoginStatus==true){if($(this).hasClass("votedNone")){VoteThisAudio("down",encodeURIComponent(blobkey));$(this).attr("src","../static/imgs/downvotedicon.png");var a=$(this).prev().text();a=parseInt(a)+1;$(this).prev().html(a)}}else{manuallogin=true;$("#loginModal").modal("show")}});$(".PlayOriginalbutton a").click(function(a){a.stopPropagation();$("#mainaudio").hide();$(".videocover").hide();player.loadVideoById({videoId:videoID,startSeconds:0});playOriginal=true;$(".rePlaybutton").hide();stopPlayingAudios();openVideoScreen();player.unMute();player.playVideo()})});function getAudioLinks(){$.ajax({type:"GET",url:baseurl+"/getAudiosList?videolink="+videourl+"&lang="+languageSelected+"&limit="+audiolimit+"&offset="+audiooffset+"&byUser=false",dataType:"json",success:function(b){if(b==""){if($(".audio-list").children().length==0){var a=languageSelected;if(languageSelected!=""){a="in "+languageSelected}if(languageSelected=="all"){a=""}$(".audio-list").html("<p>No dubbings for this video/GIF "+a+". </p><p> Be the first one to dub. <a class='btn recordLink btn-primary' href='/recorder?li="+videoID+"'> Dub This Video </a>. </p>")}else{$(".audio-list").append("<p class='noaudiosmsg'>No More Audios</p>")}}else{$(".audio-list").empty();buildAudioList(b)}}})}function buildAudioList(b){var a="";$.each(b,function(j,s){var q=document.createElement("div");var o=document.createElement("div");var f=document.createElement("div");var t=document.createElement("span");var p=document.createElement("audio");var c=document.createElement("div");var r=document.createElement("div");var d=document.createElement("div");var n=document.createElement("div");var i=document.createElement("div");var e=document.createElement("div");var m=document.createElement("div");var l=document.createElement("a");var h=document.createElement("div");if(s.voted=="up"){$(e).addClass("voteicon upvotedIcon").append('<span class="votecount">'+s.upvotes+'</span><img src="../static/imgs/upvotedicon.png" alt="upvoteicon" />')}else{$(e).addClass("voteicon upvoteIcon").append('<span class="votecount">'+s.upvotes+'</span><img src="../static/imgs/upvoteicon.png" alt="upvoteicon" />')}if(s.voted=="down"){$(m).addClass("voteicon downvotedIcon").append('<span class="votecount">'+s.downvotes+'</span><img src="../static/imgs/downvotedicon.png" alt="downvoteicon" />')}else{$(m).addClass("voteicon downvoteIcon").append('<span class="votecount">'+s.downvotes+'</span><img src="../static/imgs/downvoteicon.png" alt="downvoteicon" />')}$(i).addClass("voteicons clearfix").append(d).append(m).append(e);$(r).addClass("fbcustom").append("<img src='../static/imgs/fbshare.jpg'/><span>share</span>");if($.browser.mozilla){$(l).addClass("dlLink").attr({download:s.audname.replace(/\s/g,"_")+".ogg",href:baseurl+"/downloadaudio?abk="+encodeURIComponent(s.audkey),}).html("download")}else{$(l).addClass("dlLink").attr({download:s.audname.replace(/\s/g,"_")+".wav",href:baseurl+"/downloadaudio?abk="+encodeURIComponent(s.audkey),}).html("download")}$(h).addClass("shareOpts clearfix").append(l).append(r);$(c).addClass("audiosocialbar clearfix").append(i).append(h);$(d).addClass("viewcount").append("<span class='glyphicon glyphicon-eye-open'> </span><span class='playedcount'>"+s.viewcount+"</span>");$(t).addClass("playaudiobtn controlIcon playBtnIcon");$(f).addClass("audioplayer clearfix").append(t).append('<div class="loader"></div>');$(o).addClass("aud-name").attr("aud-source",s.audkey).append("<div class='dubname'>"+s.audname+"</div><div class='dublang'><span>in</span> "+s.language+"</div><div class='dubber'> <span>by </span> <a href='/profile?uh="+s.composer+"'>"+s.composer+"</a></div>");$(n).addClass("audioDetails").append(o).append(c);$(q).addClass("audioitem clearfix").append(f).append(n);$(".audio-list").append(q);if(typeof(FB)!=="undefined"){FB.XFBML.parse(document.getElementById(j+"_"+s.audkey))}if(s.videolink.indexOf("youtube")>=0){var g=s.videolink.split("/embed/")[1];a="http://img.youtube.com/vi/"+g+"/mqdefault.jpg"}else{if(s.videolink.indexOf("gfycat")>=0){a="http://thumbs."+s.videolink+"-thumb100.jpg"}}$(r).click(function(k){k.stopPropagation();FB.ui({method:"feed",name:s.audname+" in "+s.language+" by "+s.composer,link:pageUrl+encodeURIComponent(s.audkey),caption:"Dubroo - A new way of watching videos",picture:a,description:"An online platform to record your voice over any youtube video and make the content available in different languages and versions"},function(u){if(u&&!u.error_code){}else{}})});$(t).click(function(){if($(this).hasClass("playBtnIcon")){$(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");$(".rePlaybutton").hide();$("#mainaudio").show();openVideoScreen();if(s.starttime==""){audstarttime=0}else{audstarttime=parseFloat(s.starttime)}curaudioname=s.audname;curaudiocomposer=s.composer;curaudiolanguage=s.language;$(".pageloader").show();$(".mainaudiodetails").html("<span class='dubname'>"+curaudioname+"</span> in <span class='dublang'>"+curaudiolanguage+"</span> by <a class='dubber' href='/profile?=uh="+curaudiocomposer+"'> "+curaudiocomposer+"</a>");playOriginal=false;audioispaused=false;audioisplaying=false;$(".videocover").hide();$(t).removeClass("playBtnIcon").addClass("pauseBtnIcon");blobkey=s.audkey;$("html,body").animate({scrollTop:$("#mainStudioSection").offset().top},300);$(".audioplayertag").hide();$("#mainaudio").attr("src",baseurl+"/getAudioBlobByKey?abk="+encodeURIComponent(blobkey));$(".audioLink").attr("href",baseurl+"/downloadaudio?abk="+encodeURIComponent(blobkey));$("#mainaudio").load();window.history.pushState(curaudioname+" - Dubroo studio ","Title",pageUrl+encodeURIComponent(blobkey));var k=parseInt($(d).find(".playedcount").text())+1;RecordPlayCount(s.audkey,k);$(".audiopopularity").show();$(d).find(".playedcount").html(k);$(".mainaudioplayer .viewcount .playedcount").html(k);$(this).parent().next().find(".viewcount .playedcount").html(k);$(".audiopopularity .upvoteIcon .votecount").html(s.upvotes);$(".audiopopularity .downvoteIcon .votecount").html(s.downvotes);if(s.voted=="up"){$(".audiopopularity .upvoteIcon img").attr("src","../static/imgs/upvotedicon.png")}else{if(s.voted=="down"){$(".audiopopularity .downvoteIcon img").attr("src","../static/imgs/downvotedicon.png")}else{$(".audiopopularity .downvoteIcon img").addClass("votedNone")}}ga("dubroo.send","event","Audio","Playing",s.audname);curpageurl=pageUrl+encodeURIComponent(blobkey)}else{$("#mainaudio").attr("src","");player.stopVideo();$(this).removeClass("pauseBtnIcon").addClass("playBtnIcon");audioisplaying=false;audioispaused=false}});$(e).click(function(){if(userLoginStatus==true){if(s.voted=="none"){VoteThisAudio("up",encodeURIComponent(s.audkey))}}else{manuallogin=true;$("#loginModal").modal("show")}});$(m).click(function(){if(userLoginStatus==true){if(s.voted=="none"){VoteThisAudio("down",encodeURIComponent(s.audkey))}}else{manuallogin=true;$("#loginModal").modal("show")}})})}function getLanguages(){$.ajax({type:"GET",url:baseurl+"/static/jsons/lang.json",dataType:"json",success:function(b){$(".languageFilterSelect").append('<option value="all">Filter by language</option>');var a=b.sort(insensitive);$.each(a,function(d,c){$(".languageFilterSelect").append('<option value="'+c+'">'+c+"</option>")})}})}function RecordPlayCount(a,b){$.ajax({type:"GET",url:baseurl+"/increaseviewcount?abk="+a+"&viewcount="+b,dataType:"json",success:function(c){if(c.result!=undefined){}}})}function getVideoDetails(){$.ajax({type:"GET",url:baseurl+"/getVideoDetails?videoUrl="+videourl,dataType:"json",success:function(a){if(videottype=="gif"){$(".videoplayer").hide();$(".gifholder").append("<img class='gfyitem' data-id='"+videoID+"' />")}$(".videoname").html(a.videoname);VideoName=a.videoname;videoCategory=a.videocat;$(".catTabs ."+videoCategory+"-li").addClass("active");$("title").html(VideoName+" - Dubroo");getVideoLinksForNonGallery();ga("dubroo.send","event","Page visit","studio",VideoName);setTimeout(function(){$(".gifholder .gfyVid").attr("width",600).attr("height",450);$(".gifholder .gfyitem > div").css("width","600px").css("height",450);$(".gifholder .gfyPreLoadCanvas").attr("width",600).attr("height",450)},3000)}})}function getAudioDetails(a){$.ajax({type:"GET",url:baseurl+"/getaudiodetails?abk="+a,dataType:"json",success:function(c){if(c[0].error==undefined){if(c[0].starttime==""){audstarttime=0}else{audstarttime=parseFloat(c[0].starttime)}curaudioname=c[0].audname;curaudiocomposer=c[0].composer;curaudiolanguage=c[0].language;curviewCount=parseInt(c[0].viewcount)+1;RecordPlayCount(a,curviewCount);$(".audiopopularity").show();$(".audiopopularity .upvoteIcon .votecount").html(c[0].upvotes);$(".audiopopularity .downvoteIcon .votecount").html(c[0].downvotes);if(c[0].voted=="up"){$(".audiopopularity .upvoteIcon img").attr("src","../static/imgs/upvotedicon.png")}else{if(c[0].voted=="down"){$(".audiopopularity .downvoteIcon img").attr("src","../static/imgs/downvotedicon.png")}else{$(".audiopopularity .downvoteIcon img").addClass("votedNone")}}$(".audioLink").attr("href",baseurl+"/downloadaudio?abk="+encodeURIComponent(a));$(".mainaudiodetails").html("<span class='dubname'>"+curaudioname+"</span> in <span class='dublang'>"+curaudiolanguage+"</span> by <a class='dubber' href='/profile?=uh="+curaudiocomposer+"'> "+curaudiocomposer+"</a>");$(".mainaudioplayer .viewcount .playedcount").html(curviewCount);audioisplaying=false;audioispaused=false;setTimeout(function(){curpageurl=pageUrl+encodeURIComponent(a);$("#mainaudio").attr("src",baseurl+"/getAudioBlobByKey?abk="+encodeURIComponent(a));$("#mainaudio").load();openVideoScreen()},1000)}else{var b=pageUrl.split("&abk=")[0];window.history.pushState("object or string","Title",b)}}})}function VoteThisAudio(a,b){$.ajax({type:"GET",url:baseurl+"/user/votes?audiokey="+b+"&direction="+a,dataType:"json",success:function(c){if(c.result!=undefined){getAudioLinks()}}})}function getAudiosBySearchTerm(a){$.ajax({type:"GET",url:baseurl+"/searchaudio?term="+a+"&videoLink="+encodeURIComponent(videourl),dataType:"json",success:function(b){if(b!=""){buildAudioSuggestionBox(b)}else{$(".audiosuggestionbox").hide()}}})}function buildAudioSuggestionBox(a){$(".audiosuggestionbox").show();$(".audiosuggestionbox").empty();$.each(a,function(e,d){var c=document.createElement("div");var b=document.createElement("div");$(b).addClass("searchvideorow").append("<span> "+d.audioname+" </span><span> ("+d.language+")</span>");$(c).addClass("searchresult").append(b);$(".audiosuggestionbox").append(c);$(c).click(function(){window.location=baseurl+"/studio?li="+videoID+"&abk="+encodeURIComponent(d.audiokey);$(".audiosuggestionbox").show()})})}openVideoScreen=function(){$(".right-col").removeClass("col-md-12 col-lg-12").addClass("col-lg-5 col-md-5");$(".videoscreen").show(300)};closeVideoScreen=function(){$(".videoscreen").hide(500);$(".right-col").removeClass("col-md-5 col-lg-5").addClass("col-lg-12 col-md-12")};examineStudioPageUrl=function(a){pageUrl=a;var b=pageUrl.split("?li=")[1];if(blobkey==""){if(b.indexOf("&abk=")>=0){blobkey=b.split("&abk=")[1];videoID=b.split("&abk=")[0];$(".recorderLink a").attr("href","/recorder?li="+videoID);if(b.indexOf("gfycat")!=-1){videourl=gifurl;$(".recorderLink a").attr("href","/recorder?li="+videoID);videoID=videoID.split("/")[1];videottype="gif"}else{videourl=yturl}videourl=videourl+videoID;if(blobkey!=""){$(".pageloader").show();curpageurl=pageUrl;setTimeout(function(){getAudioDetails(blobkey)},1000)}pageUrl=pageUrl.split("&abk=")[0]}else{videoID=b;$(".recorderLink a").attr("href","/recorder?li="+videoID);if(b.indexOf("gfycat")!=-1){videourl=gifurl;$(".recorderLink a").attr("href","/recorder?li="+videoID);videoID=videoID.split("/")[1];videottype="gif"}else{videourl=yturl}videourl=videourl+videoID}}pageUrl=pageUrl+"&abk=";getAudioLinks();getVideoDetails();getLanguages()};stopPlayingAudios=function(){$("#mainaudio").attr("src","");player.stopVideo();$(".playaudiobtn").removeClass("pauseBtnIcon").addClass("playBtnIcon");$(".rePlaybutton").hide();audioisplaying=false;audioispaused=false};getMoreAudios=function(a){audiooffset=$(a).children().length+10;getAudioLinks()};