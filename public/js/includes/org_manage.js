$(document).ready(function () {

    $('.card-tabs-list a').click(function (event) {
        var tab = $(this).attr('href');

        event.preventDefault();
        $('.card-tabs-list .active').removeClass('active');
        $(this).addClass('active');
        $('.tab').not(tab).css({'display': 'none'});
        $(tab).fadeIn(300);
    });

    var $showProjectRole = $('.org-members .dropdown-menu-1');

    $('.table-dropdown .status-1').click(function () {
        if ($showProjectRole.hasClass('show')) {
            $showProjectRole.removeClass('show');

        } else {
            $showProjectRole.addClass('show');
        }
    });

    var $buttonDown = $('.org-members-table .chevron-down');
    var $showProjectList = $('.org-members-table .org-projects-table');

    $buttonDown.click(function () {
        $showProjectList.toggle();

        if ($(this).hasClass('chevron-up')) {
            $(this).removeClass('chevron-up');
            $(this).addClass('chevron-down');

        } else {
            $(this).addClass('chevron-up');
            $(this).removeClass('chevron-down');
        }
    });

    $(".openAddTestObject").click(function () {
        $("#addTestObject").css({'display': 'block'});
        $(".modal").addClass("in");
    });

    $(".open-addTestObjectLink").click(function () {
        $("#addTestObjectLink").css({'display': 'block'});
        $(".modal").addClass("in");
    });

    $(".openAddMembers").click(function () {
        $("#addOrganizationMembers").css({'display': 'block'});
        $(".modal").addClass("in");

        $('.modal-content-scroll').css({
            'max-height': ($(window).height() - 330) + 'px'
        });
    });

    $(".openChangeOrganizationProfile").click(function () {
        $("#changeOrganizationProfile").css({'display': 'block'});
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

    Dropzone.options.uploadBuild = {
        dictDefaultMessage: '<a href="javascript:;" class="default-message">Drop your <span>IPA</span> or <span>APK</span> here or click to select file</a>' +
        '<a href="javascript:;" class="default-message"><p>Maximum file size allowed is 1 Gb</p></a>',
        maxFilesize: 1024
    };

});