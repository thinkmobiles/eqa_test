$(document).ready(function () {

    $('.sign-tabs-list a').click(function (event) {
        var tab = $(this).attr('href');

        event.preventDefault();
        $('.sign-tabs-list .tab-active').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('.tab').not(tab).css({'display': 'none'});
        $(tab).fadeIn(300);
    });
    
});


