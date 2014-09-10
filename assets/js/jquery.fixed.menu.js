$(document).ready(function(){
    var nav = $(".nav-container");
    $(window).scroll(function(){
        if($(this).scrollTop() > 80){
            nav.addClass("fixedMenu");
			$("header").css("box-shadow","0 1px 3px rgba(0, 0, 0, 0.75)");
			$(".site").css("display","none");
			$(".nav-container h1 a").addClass("fixedMenuLogo");
        }else{
            nav.removeClass("fixedMenu");
			$("header").css("box-shadow","0 0 3px rgba(0, 0, 0, 0.75)");
			$(".site").css("display","block");
			$(".nav-container h1 a").removeClass("fixedMenuLogo");
        }
    });
});