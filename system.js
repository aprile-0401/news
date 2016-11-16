$(document).ready(function(){
	//刷新新闻列表
	refreshNews();

	//插入新闻
	$("#btn-submit").click(function(){
		if ($("#newstitle").val()==""||$("#newsimg").val()==""||$("#newstime").val()==""||$("#newsicon").val()=="") {
			if ($("#newsimg").val()=="") {
				$("#newsimg").parent().addClass("has-error");
			} else {
				$("#newsimg").parent().removeClass("has-error");
			}
			if ($("#newstitle").val()=="") {
				$("#newstitle").parent().addClass("has-error");
			} else {
				$("#newstitle").parent().removeClass("has-error");
			}
			if ($("#newstime").val()=="") {
				$("#newstime").parent().addClass("has-error");
			} else {
				$("#newstime").parent().removeClass("has-error");
			}
			if ($("#newsicon").val()=="") {
				$("#newsicon").parent().addClass("has-error");
			} else {
				$("#newsicon").parent().removeClass("has-error");
			}
		} else {
			var dataNews={
				newstype:$("#newstype").val(),
				newsimg:$("#newsimg").val(),
				newstitle:$("#newstitle").val(),
				newstime:$("#newstime").val(),
				newsicon:$("#newsicon").val()
			}
			$.ajax({
				url:"/system/insert",
				type:"post",
				data:dataNews,
				datatype:"json",
				success:function(data){
					refreshNews();
				}
			})
		}
		
	});

	//删除新闻
	$("tbody").on('click','.btn-warning',function(e){
		$("#deleteModal").modal('show');
		$index=$(this).parent().siblings().eq(0).html();
	});
	$("#confirmDelete").on('click',function(){
			// var dataId={
			// 	id:$index
			// }
			$.ajax({
				url:"/system/delete",
				type:"post",
				data:{id:$index},
				datatype:"json",
				success:function(data){
					$("#deleteModal").modal('hide');
					refreshNews();
				}

			});
		});
	//修改新闻
	$("tbody").on('click','.btn-success',function(e){
		$("#updateModal").modal('show');
		updateId=$(this).parent().siblings().eq(0).html();
		$.ajax({
			url:"/system/currentnews",
			type:"post",
			data:{id:updateId},
			datatype:"json",
			success:function(data){
				$("#updatetype").val(data[0].newstype);
				$("#updatetitle").val(data[0].newstitle);
				$("#updateimg").val(data[0].newsimg);
				$("#updatetime").val(data[0].newstime.split('T')[0]);
				$("#updateicon").val(data[0].newsicon);
			}
		});
		
	});
	$("#confirmUpdate").click(function(){
		var uNews={
				newstype:$("#updatetype").val(),
				newsimg:$("#updateimg").val(),
				newstitle:$("#updatetitle").val(),
				newstime:$("#updatetime").val(),
				newsicon:$("#updateicon").val(),
				id:updateId
		}
		$.ajax({
			url:"/system/update",
			type:"post",
			data:uNews,
			datatype:"json",
			success:function(data){
				refreshNews();
			}
		})
		$("#updateModal").modal('hide');
		
	})
	




	function refreshNews(){
		$("tbody").empty();
		$.ajax({
			url:"/system/getnews",
			type:"get",
			datatype:"json",
			success:function(data){
				data.forEach(function(item,index,array){
					var $tdid=$("<td>").html(item.newsid);
					var $tdtype=$("<td>").html(item.newstype);
					var $tdimg=$("<td>").html(item.newsimg);
					var $tdtitle=$("<td>").html(item.newstitle);
					var $tdtime=$("<td>").html(item.newstime.split('T')[0]);
					var $tdicon=$("<td>").html(item.newsicon);
					var $tdbtn=$("<td>");
					var $btnupdate=$("<button></button>").addClass("btn btn-xs btn-success").html("修改");
					var $btndelete=$("<button></button>").addClass("btn btn-xs btn-warning").html("删除");
					$tdbtn.append($btnupdate,$btndelete);
					var $trow=$("<tr>");
					$trow.append($tdid,$tdtype,$tdimg,$tdtitle,$tdtime,$tdicon,$tdbtn);
					$("tbody").append($trow);
				})
				
			}
		})
	};

})