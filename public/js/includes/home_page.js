$(document).ready(function () {

    // $('#organization').selectmenu();

    Dropzone.autoDiscover = false;

    $("#attachments").dropzone({
        paramName: 'images[]',
        autoProcessQueue: false,
        uploadMultiple: true,
        clickable: '.dropzone',
        previewsContainer: '#loadPreview2',
        previewTemplate: '<div class="preview_item">' +
        '<span class="clip"><span class="progress" data-dz-uploadprogress></span><i class="fa fa-paperclip" aria-hidden="true"></i></span>' +
        '<span class="file-name" data-dz-name></span>' +
        '<img src="../images/basket-icon.svg" alt="icon" class="img-svg remove" data-dz-remove></a>' +
        '</div>'
    });

    $(".openReportBug").click(function () {
        $("#reportBug").css({'display': 'block'});
        $(".modal").addClass("in");

        $('.modal-content-scroll').css({
            'max-height': ($(window).height() - 330) + 'px'
        });
    });

    $(".openAddOrganization").click(function () {
        $("#addOrganization").css({'display': 'block'});
        $(".modal").addClass("in");
    });

    $(".openAddProject").click(function () {
        $("#addProject").css({'display': 'block'});
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
