function init_change_roles() {
  changes = {};
  changes.roles = {};

  deletion_role();

  if ($('#invitation_modal').length) {
    // json data creation with check or uncheck all
    change_multiple_roles();
    // json data creation with input tag(check-uncheck)
    change_single_role();
    // json data creation with select tag removed to main.js
    applying_changes();
  }
}

function deletion_role(){
  deletion_proj_role();
}

$(document).on('click', 'table .delete-org-role', function() {
  organization = $('.org-members-table').data('organization');
  user = user_id=$(this).data('user');
  var that = $(this);
  if (confirm('Are you sure?')) {
    $.ajax({
      type: 'DELETE',
      data: {organization_id: organization, user_id: user},
      url: '/organizations/members/delete_member_role',
      success: function () {
        that.closest('tr').next().hide();
        that.closest('tr').hide();
      }
    });
  }
});

function deletion_proj_role(){
  $('table .delete-proj-role').click(function() {
    project_id=$(this).data('project');
    user_id=$(this).closest('table').data('user');
    changes.roles[user_id] = { role: '',
                               operation: false };
    var that = $(this);
    $.ajax({
      type: 'POST',
      data: changes,
      url: '/projects/' + project_id + '/add_members',
      success: function () {
        that.closest('tr').hide();
      }
    });
  });
}

function change_multiple_roles(){
  $('#invitation_modal table').on('click', 'tr.table-title td #checkbox', function(e) {
    $('#invitation_modal table tr.member td .checkbox').each(function(){
      if ( ($(this).prop('checked') != $('#checkbox').prop('checked')) && !$(this).prop('disabled')) {
        $(this).prop('checked', $('#checkbox').prop('checked')).trigger('change');
      }
    })
  })
}

function change_single_role(){
  $('#invitation_modal table').on('change', 'tr.member td .checkbox', function(e) {
    var user_id = $(this).attr('user');
    push_data_to_changes_hash(user_id)
  });
  $('#invitation_modal table').on('click', 'tr.member td input', function(e) {
    check_box_title();
  });
}

function push_data_to_changes_hash(user_id) {
  select_selector = '#checkbox_' + user_id;
  if ($(select_selector).prop('checked') == false && changes.roles[user_id]) {
    delete changes.roles[user_id];
  } else {
    changes.roles[user_id] = log_changes($(select_selector));
  }
}

function log_changes(checkbox) {
  user_id = checkbox.attr('user');
  select_selector = 'div#' + user_id;
  option = select_selector + ' input';
  operation = checkbox.prop('checked');
  return {
    role: $(option).attr('value'),
    operation: operation
  };
}

function check_box_title() {
  var i = $('#invitation_modal table tr.member td input:checked').length;
  if ($('#invitation_modal table tr.member td .checkbox').length == i ) {
    $('#invitation_modal table tr.table-title td input').prop('checked', true);
  } else {
    $('#invitation_modal table tr.table-title td input').prop('checked', false);
  }
}

function applying_changes(){
  $('#send').on('click', function(e) {
    project_id = $('#invitation_modal').data('project');
    changes.show_list = $(this).attr('show_list')
    $.ajax({
      type: 'POST',
      data: changes,
      url: '/projects/' + project_id + '/add_members',
      success: function () {
        $('#myModal').css('display', 'none');
      }
    });
  });
}
