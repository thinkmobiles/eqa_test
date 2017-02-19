function update_comments_count(count) {
  $('.modal-tabs-list .comments-count').text(count);
}

var editingComment;

function init_comments_tab() {
  if ($._data( $('.comments-tab .save_btn')[0], 'events' )) { return }

  var textarea = document.querySelector('.add-comment');
  textarea.addEventListener('keydown', autoresizeTextarea);
  function autoresizeTextarea() {
    var el = this;
    setTimeout(function () {
      el.style.cssText = 'height:auto;';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }

  $('#new_comment').submit(function (e) {
    if (editingTimeManagement.length) {
      e.preventDefault();
      e.stopImmediatePropagation();

      $('.spent-time-tab .save_btn').click();
    }
  });

  $(document).on('click', '.destroy_comment_btn', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (confirm('Are you sure?')) {
      id = $(this).parents('.comment-block').data('comment-id');

      $.ajax({
        url: '/comments/' + id,
        method: 'DELETE'
      });

      if ($('.comments-tab .save_btn').is(':visible')) { view_mode(); }
    }
  });

  $(document).on('click', '.edit_comment_btn', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if ($('.comments-tab .save_btn').is(':visible')) { view_mode(); }

    body = $(this).parents('.comment-block')
                  .find('.comment-text .displayText').text();
    $('#comment_body').val(body);

    $('.comments-tab form input.btn').hide();
    $('.comments-tab .save_btn, .comments-tab .cancel_btn').show();

    editingComment = $(this).parents('.comment-block');
    editingComment.addClass('edit-field');
    editingComment.parents('.comments-tab').addClass('comment-edit');
  });

  $('.comments-tab .cancel_btn').click(function() {
    view_mode();
  });

  $('.comments-tab .save_btn').click(function() {
    body = $('#comment_body').val();

    if (body.length) {
      editingComment.find('.comment-text .displayText').text(body);

      id = editingComment.data('comment-id');
      $.ajax({
        url: '/comments/' + id,
        method: 'PUT',
        data: { comment: { body: body } }
      });

      view_mode();
    }
  });

  function view_mode() {
    $("#comment_body").val('');

    $('.comments-tab').removeClass('comment-edit');
    $('.comments-tab form input.btn').show();
    $('.comments-tab .save_btn, .comments-tab .cancel_btn').hide();
    editingComment.removeClass('edit-field');
    editingComment = false;
  }
}
