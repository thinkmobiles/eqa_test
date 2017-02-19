$(document).ready(function () {

    $('.my-projects-nav-tabs a').click(function () {
        $('.my-projects-nav-tabs a').removeClass('active');
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