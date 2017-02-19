$(document).ready(function() {
  $('#addNewColumn').on('click', newColumnDialog);
  $('.cancel').on('click', closeDialog);
});

function activeBtn() {
  var $self = $(this);
  var $parrent = $self.closest('.head_title_middle');

  $parrent.find('.active').removeClass('active');
  $self.addClass('active');
}

function activeColor(e) {
  var $target = $(e.target);
  var $parrent = $target.closest('.color_list');

  $parrent.find('.active').removeClass('active');
  $target.closest('li').addClass('active');
  validate_color_picker($parrent.parents('.color_picker'));
}

function newColumnDialog() {
  $('.new_border').fadeIn();
}

function closeDialog(e) {
  $(e.target).closest(MODAL_CLASS).fadeOut();
}

function initialize_scroll_bar() {

  bind_custom_scrollbar();
  // console.log('function initialize_scroll_bar()');
}

function init_issue_info() {
  init_spent_time_tab();
  init_comments_tab();
  init_description_field();

  $('.edit_issue_btn').click(function () {
    $('.issue-info-block.info_block, .view-btn-group').hide();

    $('.issue-info-block.edit-issue-block, .edit-btn-group').show();
    $('.edit-issue-block .edit-inner-wrap').append($('.row.issue-attachments'));
    $('.issue-info-tab .modal-content-scroll').addClass('edit-block');
    $('#user-select-data').appendTo('.row.assigned-to .col.xs-10');
  });

  $('.submit_editing').on('click', function () {
    $('.issue-info-block.info_block, .view-btn-group').show();
    $('.issue-info-block.edit-issue-block, .edit-btn-group').hide();
    $('.description-field').html($('#issue_description').val().replace(/(?:\n\r?|\r\n?)/g, '<br>'));
    $('.issue-title').html($('#issue_summary').val());
    $('.issue-info-block.info_block').append($('.row.issue-attachments'));
    $('.issue-info-tab .modal-content-scroll').removeClass('edit-block');
    $('#user-select-data').appendTo('.row.assigned-to .col.xs-4');
    init_description_field();
  });

  $('.show-all').on('click', function () {
    var $descField = $('.description-field');
    $descField.toggleClass('open-all');
    if ($(this).text() === "Show all") {
      $(this).text("Show less");
    } else {
      $(this).text("Show all");
    }
  });
}

function init_description_field() {
  description_field = $('.description-field')
  // if field empty?
  if (description_field.html().match(/^\s*$/)) {
    description_field.parents('.description').addClass('empty');
  } else {
    description_field.parents('.description').removeClass('empty');
  }
}

function update_issues_board(project_id, must_show) {
  //console.log('function update_issues_board()')
  $.ajax({
    type: 'GET',
    dataType: 'script',
    url: '/projects/' + project_id + '/issues',
    success: function() {
      if (must_show) {
        show_modal();
      } else {
        hide_modal();
      }
    }
  });
}

function init_upload_csv_file() {
  if ($('#upload_csv_file').length) {
    $("#upload_csv_file").dropzone({
      paramName: '[file]',
      autoProcessQueue: false,
      maxFiles: 1,
      uploadMultiple: true,
      clickable: '.dropzone',
      previewsContainer: '#loadPreview',
      acceptedFiles: ".csv",
      previewTemplate: FILE_ITEM_VIEW,
      success: function(file, response){
        $(MODAL_CLASS).html(response.html);
        show_modal();
      },
      init: function() {
        myDropzone = this;

        myDropzone.on("addedfile", function(file) {
          if (this.files.length > 1) {
            this.removeFile(this.files[0]);
          }
          $('#info_notice').html('');
          $('#start-import').toggleClass('btn-green btn-grey');
        });
        myDropzone.on("removedfile", function(file) {
          $('#start-import').toggleClass('btn-green btn-grey');
        });
        myDropzone.on("error", function(file) {
          myDropzone.removeAllFiles(true);
          $('.dropzone-previews > .dz-preview').hide();
          $('#info_notice').html('You cant upload files of this type.');
        });
      }
    });
    $('#start-import').on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      PreventDoubleClickDropzone($("#start-import"));
      var select = $('#test_plan_id_csv');
      var selected = select.find('.dd-selected-value');
      if (selected.val() == "") {
        if (!select.parent().is(".field_with_errors")) {
          select.after("<label class='message'>can't be blank</label>")
                .siblings()
                .andSelf()
                .wrapAll( "<div class='field_with_errors' />");
        }
      } else if (select.parent().is(".field_with_errors")){
        $('.field_with_errors .message').remove();
        select.unwrap();
      } else if (myDropzone.getQueuedFiles().length > 0){
        myDropzone.processQueue();
      }
    });
  }
}
