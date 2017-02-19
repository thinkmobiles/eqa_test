$(document).ready(function () {

    var $buttonDown = $('.builds-table .chevron-down');
    var $showBuildsTableDetails = $('.builds-table .builds-added-details');

    $buttonDown.click(function () {

        $showBuildsTableDetails.toggle();

        if ($(this).hasClass('chevron-up')) {
            $(this).removeClass('chevron-up');
            $(this).addClass('chevron-down');

        } else {
            $(this).addClass('chevron-up');
            $(this).removeClass('chevron-down');
        }
    });

    $(".openLinkToTestObject").click(function () {
        $("#linkToTestObject").css({'display': 'block'});
        $(".modal").addClass("in");
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

