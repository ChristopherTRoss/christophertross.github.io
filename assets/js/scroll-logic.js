$(document).ready(function () {
    $(document).on("scroll", onScroll);
});

//Underlines tab on navbar based on position on site
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-right a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top- 60 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-right a').removeClass("link");
            currLink.addClass("link");
        }
        else{
            currLink.removeClass("link");
        }
    });
}
