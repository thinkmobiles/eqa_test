$(document).ready(function () {

    $('.card-tabs-list a').click(function (event) {
        var tab = $(this).attr('href');

        event.preventDefault();
        $('.card-tabs-list .active').removeClass('active');
        $(this).addClass('active');
        $('.tab').not(tab).css({'display': 'none'});
        $(tab).fadeIn(300);
    });

    $('.languages-btn a').click(function () {
        $('.languages-btn a').removeClass('active');
        $(this).addClass('active');
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