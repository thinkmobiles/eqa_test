const FILE_ITEM_VIEW = '<div class="preview_item">'+
                        '<span class="file-name" data-dz-name></span>' +
                        '<img src="/images/basket-icon.svg" alt="icon" class="img-svg remove" data-dz-remove></a>' +
                       '</div>';
const ISSUES_DROPZONE_PARAMS = {
  paramName1: 'issue[attachments_attributes[]]',
  paramName2: '[file]',
  maxFilesize: 100,
  parallelUploads: 10,
  uploadMultiple: true,
  clickable: '.upload_file',
  previewTemplate: FILE_ITEM_VIEW,
  previewsContainer: '#preview .items',
  init: function() {
    myDropzone = this;
  }
};

function init_new_issue_dropzone() {
  if ($('#new_issue, .edit_issue, .issue_info').length) {

    if ($("#new_issue").length) {
      $("#new_issue").dropzone($.extend({
        autoProcessQueue: false
      }, ISSUES_DROPZONE_PARAMS));

      myDropzone.on("success", function(data) {
        if ($('.add_issue #new_issue').length) {
          var project_id = $('#new_issue').data('project-id');
          update_issues_board(project_id, false);
        } else {
          hide_modal();
          response = JSON.parse(data.xhr.response);
          $('body').append($(response.notification));
          img_to_svg_convert();
        }
      });
    } else {
      $(".edit_issue, .issue_info").dropzone($.extend({
        url: $('.edit_issue').attr('action'),
        method: 'PUT',
        autoProcessQueue: true,
        success: function(data, response) {
          $('.preview_item').last().replaceWith(response.html_preview);
        }
      }, ISSUES_DROPZONE_PARAMS));
    }

    $(".btn-delete").click(function() {
      myDropzone.removeAllFiles(true);
    });
    dropzone_submit(myDropzone);
  }
  $(document).on('click', '.delete_attachment', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var attachment_id = $(this).parents('.preview_item').data('attachment-id');
    var that = $(this);
    if (confirm('Are you sure you want to delete this?')) {
      $.ajax({
        type: 'DELETE',
        url: 'attachments/' + attachment_id,
        success: function(data) {
          that.parent().fadeOut(300);
        }
      });
    }
  });
}
