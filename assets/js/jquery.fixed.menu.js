$(document).ready(function(){
    var nav = $(".nav-container");
    var links = [];
    var origLinks = [];
    $('nav.species > ul li').each(function(i, item) {
        origLinks.push($(item)[0].outerHTML);
    });

    $('li.nav-switch-item').each(function(i, item) {
        links.push($(item)[0].outerHTML);
    });
    links.pop();
    links.push('<li class="nav-switch-item"><a href="http://gamers.tm" title="搞活動">搞活動</a>');

    $(window).scroll(function(){
        console.log('> 200');
        if($(this).scrollTop() > 200){
            nav.addClass("fixedMenu");
			$("header").css("box-shadow","0 1px 3px rgba(0, 0, 0, 0.75)");
			$(".site").css("display","none");
			$(".nav-container h1 a").addClass("fixedMenuLogo");
            if($("body").hasClass('switch-menu')) {
                $('nav.species > ul').html(links.join(''));
                nav.addClass("switchMenu");
            }
        }else if($(this).scrollTop() < 100) {
            console.log('< 100');
            nav.removeClass("fixedMenu");
			$("header").css("box-shadow","0 0 3px rgba(0, 0, 0, 0.75)");
			$(".site").css("display","block");
			$(".nav-container h1 a").removeClass("fixedMenuLogo");
            if($("body").hasClass('switch-menu')) {
                $('nav.species > ul').html(origLinks.join(''));
                nav.removeClass("switchMenu");
            }
        }
    });
});
