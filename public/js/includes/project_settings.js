$(document).ready(function () {

    $(".open-manageMembers").click(function () {
        $("#manageMembers").css({'display': 'block'});
        $(".modal").addClass("in");

        $('.modal-content-scroll').css({
            'max-height': ($(window).height() - 370) + 'px'
        });
    });

    $(".openChangeProject").click(function () {
        $("#changeProject").css({'display': 'block'});
        $(".modal").addClass("in");

        $('.modal-content-scroll').css({
            'max-height': ($(window).height() - 330) + 'px'
        });
    });

    $(".modal-content .close").click(function () {
        $(".modal").removeClass("in");
        $(".modal").css({'display': 'none'});
    });

    $(".modal-body .cancel").click(function () {
        $(".modal").removeClass("in");
        $(".modal").css({'display': 'none'});
    });
});