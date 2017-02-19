$(document).on('page:load ready', function() {
  $(document).on('ajax:success', '#new_test_case', function(e, data) {
      $('table#module_case_lists_' + data.id).append(data.html);
      $('.modal-body').html('');
      hide_modal();
  });

  $(document).on('ajax:success', '.edit_test_module', function(e, data) {
      hide_modal();
      // window.location.reload();
  });
  $(document).on('ajax:success', '#new_test_module', function(e, data) {
      if(data.is_parent){
        $('table#module_lists tr#' + data.id).after(data.html);
      } else {
        $('table#module_lists').append(data.html);
      }
      $('.modal-body').html('');
      hide_modal();
  });

  $(document).on('ajax:success', '#test_plan_profile', function(e, data) {
      $('#test_modules').html(data.html);
  });

  $(document).on('ajax:success', '.edit_test_plan', function(e, data) {
    if(data.status == 'ok') {
        hide_modal();
        window.location.reload();
    }
  });

  $(document).on('ajax:success', '#new_test_plan', function(e, data) {
    if(data.status == 'ok') {
      window.location.reload();
    } else {
      $.each(data.message, function(key, value) {
        $('.modal-body form').prepend('<p class="error">' + key + ': ' + value.join(', ') + '</p>');
      })
    }
  });

  $(document).on ('click', '.nav-tabs li:first-child a', function(event) {
    if($(this).attr('disabled'))
      return false;
  });

  sortable_case_init();
});

function sortable_case_init() {

  // console.log('sortable_case_init()');

  $('.caseSortable').sortable({
    connectWith: '.cases-test-content.open .caseSortable',
    items: '> tbody > tr',
    cursor: "move",
    handle: '.drag',
    revert: true,
    helper: multisortable_helper,
    opacity: 0.6,
    receive: receive_event,
    stop: function(event, ui) {
      init_receive(ui);
      ui.item.data('items').show();
    }
  }).disableSelection();

  test_case_nested_checkboxes('.test_case_item td input:checkbox', '.caseSortable thead input:checkbox');
};

function multisortable_helper(e, item) {
  var elements = init_sortable(item);
  var clone = elements.clone();
  elements.hide();
  var helper = $('<tbody />');
  return helper.append(clone).append(item.clone());
}

function init_sortable(item) {
  var elements = item.siblings('.test_case_item')
                     .find('td .checkbox:checked')
                     .parents('.test_case_item');
  item.data('items', elements);
  item.find('td .checkbox').prop('checked', true);
  elements.addClass('row-checked')
  return elements;
}

function change_module_counter(ui, receiver) {
  var items_count = ui.item.data('items').length + 1;

  var sender_counts = ui.sender.parents('.cases-test.module-item')
                               .children('.cases-test-header')
                               .find('.number')
  sender_counts.each(function(i, val) {
    var number_text = $(val).text();
    var number = parseInt(number_text.substring(1, number_text.length-1)) - items_count
    $(val).text('(' + number + ')')
  });

  var receiver_counts = receiver.parents('.cases-test.module-item')
                                .children('.cases-test-header')
                                .find('.number')
  receiver_counts.each(function(i, val) {
    number_text = $(val).text();
    number = parseInt(number_text.substring(1, number_text.length-1)) + items_count
    $(val).text('(' + number + ')')
  });
}

function init_receive(ui) {
  var elements = ui.item.data('items');
  ui.item.before(elements);
  var all_elements = elements.add(ui.item)
  all_elements.find('.checkbox').prop('checked', false);
  all_elements.removeClass('row-checked')
  return elements.add(ui.item);
}

function receive_event(event, ui) {
  var elements = init_receive(ui);
  var module_id = $(this).parents('.cases-info-item-inner').data('id');
  var case_ids = []
  elements.children('td.id').each(function(i, val) {
    case_ids.push($(val).attr('case_id'));
  });

  change_module_counter(ui, $(this));
  ui.sender.find('thead input:checkbox').prop('checked', false);
  $(this).find('thead input:checkbox').prop('checked', false);
  ui.sender.find('thead tr').removeClass('row-checked');
  $(this).find('thead tr').removeClass('row-checked');

  $.ajax({
    type: 'PUT',
    data: {
      module_id: module_id,
      case_ids:  case_ids
    },
    url: '/test_case/update_cases_module',
  });
}
