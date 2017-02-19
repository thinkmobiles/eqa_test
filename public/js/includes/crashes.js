$(document).ready(function () {

    var $buttonDown = $('.crashes-table .chevron-down');
    var $showBuildsTableDetails = $('.crashes-table .crash-details');

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
});
