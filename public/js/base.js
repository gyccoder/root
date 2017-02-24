$(function(){
	$(".tab").click(function(){
		var activeId=$(this).index();
		var otherId=1-activeId;
		console.log(activeId);
		$(".title h1").text($(this).text().toUpperCase());
		$(this).addClass("active-tab").siblings().removeClass("active-tab");

		$(".card").eq(otherId).animate({
			width:'0%'
		})
		$(".card").eq(activeId).animate({
			width:'100%'
		});
	});
});