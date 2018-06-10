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


var sortOption = "dubscount";

var pageurl = window.location.href;
var allVideosByDubs = "";
var allVideosByDate = "";

$(document).ready(function(){
	videoCategory=pageurl.split("?cat=")[1];	
	if(videoCategory == undefined || videoCategory == ""){
		videoCategory="education";
	}else{
		$(".categorySection").hide();
		$(".videoscontainer ."+videoCategory).parent().show();
	}
	
	
	
	// console.log(jQuery.browser);
	if ( $.browser ) {
		  $(".mozillamsg").remove();
	}
	getVideoLinks();
	
	var cats = $(".videocategoryselectfilter option");
	
	
	
	ga('create', 'UA-58598109-1', 'auto',{
		'name' : 'dubroo'
	});
	ga('send', 'pageview');
	ga('dubroo.send', 'event',"Page visit","Gallery","new dubber");
	
	$(".videocategoryselectfilter").change(function(){
		videoCategory = $(this).val();
		
		$(".videoscontainer .categoryVideos").empty();
		if(videoCategory != "all"){
			$(".categorySection").hide();
			$(".videoscontainer ."+videoCategory).parent().parent().show();
			getVideoLinks();
		}else{
			$(".categorySection").show();
			if(sortOption == "dubscount" && allVideosByDubs != ""){
				buildGallery(allVideosByDubs);
				
			}else if(sortOption != "dubscount" && allVideosByDate != ""){
				buildGallery(allVideosByDate);
			}else{
				getVideoLinks();
			}
				
		}
		
	});
	
	// $(".catTabs li").click(function(e){
		// e.stopPropagation();
		// $(".catTabs li").removeClass("active");
		// $(this).addClass("active");
		// var name = $(this).attr("name"); 
		// videoCategory = name;
		// $(".categorySection").removeClass("showCatSection");
		// $("."+videoCategory).parent().addClass("showCatSection");
		// console.log($("."+videoCategory).children().length)
        // if($("."+videoCategory).children().length == 0){
        	// offset = 0;
        	// getVideoLinks();
        // }
// 
	// });
	
	
	$(".sortOptions label input").click(function(e){
		// console.log($(this).is(":checked"));
        if(!$(this).hasClass("activeradio")){

	        $(".sortOptions label input").removeClass("activeradio");
	        $(this).addClass("activeradio");
			var sortval  = $(this).attr("filterval");
			sortOption = sortval;
			$(".videoscontainer .categoryVideos").empty();
	        $("."+videoCategory).empty();
			getVideoLinks();
        }
	});
	
});


function getVideoLinks(){
	$.ajax({
		type:"GET",
		url: baseurl+"/getVideoLinks?cat="+ videoCategory +"&sortBy="+sortOption+"&offset="+offset+"&limit="+limit,
		dataType:"json",
		success:function(resp){
			if(videoCategory == "all"){
				
				if(sortOption == "dubscount"){
					allVideosByDubs = resp;
				}else{
					allVideosByDate = resp;
				}
				
				
			}
			
			
			buildGallery(resp);
		}
	});
}

function buildGallery(resp){
	
	
	$.each(resp,function(k,v){
		var galleryitem = document.createElement("div");
		var itemname = document.createElement("div");
		var dubcount = document.createElement("div");
		var videoimg = document.createElement("div");
		var funcbtns = document.createElement("div");
		var listen = document.createElement("div");
		var recordbtn = document.createElement("div");
		var videoimganchor = document.createElement("a");
		var videoThumbnail = document.createElement("div");
		
		var ytID = "";
		var link = "";
		
		if(v.videocat == "gif"){
			ytID = v.videolink;
			link = v.videolink.split("/")[1];
			// $(listen).addClass("funcbtn dubroo-studio-btn").append('<a href="/studio?li='+ ytID +'"><span> VIEW </span></a>');
		$(recordbtn).addClass("funcbtn dubroo-record-btn").append('<a href="/recorder?li='+ ytID +'" class="btn btn-primary"><span> RECORD </span></a>');
		// $(funcbtns).addClass("dubroo-functions clearfix").append(listen).append(recordbtn);
		$(funcbtns).addClass("dubroo-functions clearfix").append(recordbtn);
			$(videoimg).addClass("videoimg").append("<img  src='https://thumbs."+ ytID +"-thumb100.jpg' />");
			$(videoimganchor).attr("href","/studio?li="+ ytID).append(videoimg);
		}else{
			ytID = v.videolink.split("/embed/")[1];
			// $(listen).addClass("funcbtn dubroo-studio-btn").append('<a href="/studio?li='+ ytID +'"><span> VIEW </span></a>');
		$(recordbtn).addClass("funcbtn dubroo-record-btn").append('<a href="/recorder?li='+ ytID +'" class="btn btn-primary"><span> RECORD </span></a>');
		// $(funcbtns).addClass("dubroo-functions clearfix").append(listen).append(recordbtn);
		$(funcbtns).addClass("dubroo-functions clearfix").append(recordbtn);
		$(videoimg).addClass("videoimg").css({
			"background":"url(https://img.youtube.com/vi/"+ ytID +"/mqdefault.jpg ) no-repeat center center"
		}).append(funcbtns);
		$(videoimganchor).attr("href","/studio?li="+ ytID).append(videoimg);
		}

		$(dubcount).addClass("dubcount").append('<span>Dubs: </span><span>'+ v.dubscount +'</span>');
        var len = v.videoname.length;
        var vname = v.videoname;
        if(len > 20){
           vname = v.videoname.substring(0,20) + "...";
        }
        
		$(itemname).addClass("vid-name").attr("vid-source",v.videolink).attr("vid-cat",v.videocat).append(vname);
		$(videoThumbnail).addClass("videoThumbnailWrapper").append(videoimganchor).append(itemname).append(dubcount);

		$(galleryitem).addClass("galleryitem col-lg-3 col-md-3 col-sm-6 col-xs-12").append(videoThumbnail);
		


		
		var vidcat = v.videocat;
		if(vidcat == "all"){
			vidcat= "others";
		}
		
		$("."+vidcat).append(galleryitem);
		
	});
	
	
}


