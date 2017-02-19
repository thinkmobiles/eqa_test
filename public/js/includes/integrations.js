$(document).ready(function () {

    $('.nav-tabs a').click(function (e) {
        var tab = $(this).attr('href');

        e.preventDefault();
        $('.nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('.tab').not(tab).css({'display': 'none'});
        $(tab).fadeIn(300);
    });

    $('.sdk-integration-tabs a').click(function (e) {
        var tab = $(this).attr('href');

        e.preventDefault();
        $('.sdk-integration-tabs a').removeClass('active');
        $(this).addClass('active');
        $('.tab1').not(tab).css({'display': 'none'});
        $(tab).fadeIn(100);
    });

    $(".openAddPlugin").click(function () {
        $("#addPlugin").css({'display': 'block'});
        $(".modal").addClass("in");

        $('.modal-content-scroll').css({
            'max-height': ($(window).height() - 370) + 'px'
        });
    });

    $(".modal-content .close").click(function () {
        $(".modal").removeClass("in");
        $(".modal").css({'display': 'none'});
    });

    $(".modal-content .cancel").click(function () {
        $(".modal").removeClass("in");
        $(".modal").css({'display': 'none'});
    });
});