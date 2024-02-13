$(document).ready(function () {
    $(document).on("scroll", onScroll);
    //Smooth scroll
    $('a[href^="#"]').on('click', function (e) {
       
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('link');
        })
        $(this).addClass('link');
      
        var target = this.hash,
        menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 60
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

//Underlines tab on navbar based on position on site
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top- 60 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center a').removeClass("link");
            currLink.addClass("link");
        }
        else{
            currLink.removeClass("link");
        }
    });
}
