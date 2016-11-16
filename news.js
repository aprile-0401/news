$(document).ready(function () {
	refreshNews('精选');
	$("nav a").click(function(e){
		e.preventDefault();
		var type = $(this).html();
		refreshNews(type);
	})

})
function refreshNews(type){
	$(".news ul").empty();
	$.ajax({
		url:"/news/getnewstype",
		type:"post",
		datatype:"json",
		data:{newstype:type},
		success:function(data){
			data.forEach(function(item,index,array){
			var $lists=$(".news ul");
			var $list=$("<li></li>").prependTo($lists);
			var $newsImg=$("<div></div>").addClass("newsimg").appendTo($list);
			var $img=$("<img>").attr("src",item.newsimg).appendTo($newsImg);
			var $newsInfo=$("<div></div>").addClass("newsinfo").appendTo($list);
			var $h2=$("<h2></h2>").html(item.newstitle).appendTo($newsInfo);
			var $p=$("<p></p>").appendTo($newsInfo);
			var $mewsTime=$("<span></span>").html(item.newstime.split('T')[0]).addClass("newstime").appendTo($p);
			var $mewsIcon=$("<span></span>").html(item.newsicon).addClass("newsicon").appendTo($p);
				})
		}
	})
	
}