var ready = function() {

  // console.log('ready function()');
  Dropzone.autoDiscover = false;
  init_test_reports();
  remove_subscribe_push_up_notifications();
  test_activity_js_actions();
  bind_custom_scrollbar();
  initialize_tabs();
  custom_select();
  init_test_activities_diagrams();
  init_root_diagram();
  init_project_overview_diagram();
  img_to_svg_convert(jQuery);
  test_activity_js_actions();
  test_objects_init();
  issues_agile_board_init();
  add_active_to_test_plan_tab();
  close_push_up_notification();
  scroll_agile_board();
};

function scroll_agile_board() {
  var width = $('.agile_bord').width();
  var scroll_header = $('.agile_title, .change-bg-btn');

  scroll_header.css('width', width);
}

function close_push_up_notification() {
  $(document).on('click', '.close_notification, .retry-btn', function() {
    $(this).parents('.notification').remove();
  });
}

function insert_ajax_popup_title(data) {
  // console.log('function insert_ajax_popup_title(data)');
  if ( 'title' in data ) { change_popup_title(data.title) };
};

function change_popup_title(title) {
  // console.log('function change_popup_title(title)');
  $('.modal-content .title-main h3').text(title);
};

function img_to_svg_convert(e) {
  // console.log('in converter');
  var t = jQuery("img.img-svg");
  t.each(function () {
    var e = jQuery(this), t = e.attr("id"), i = e.attr("class"), s = e.attr("src");
    jQuery.get(s, function (s) {
      var n = jQuery(s).find("svg");
      "undefined" != typeof t && (n = n.attr("id", t)), "undefined" != typeof i && (n = n.attr("class", i + " svg")), n = n.removeAttr("xmlns:a"), e.replaceWith(n)
  }, "xml")
  })
}

function custom_select() {

  if ($('.validate_select').length) {
    $('.validate_select').each(function(index, element) {
      var element_id = $(element).attr('id');
      $(element).ddslick({
        width: "100%",
        background: "#fff",
        onSelected: function(e){
          check_select_validation($('#' + element_id + '.dd-container'));
        }
      });
    });
  }

  if ($('.import_select').length) {
    $('.import_select').ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(data){
        check_any_ddslick_selected();
      }
    });
  }
  $('.edit_issue select, .add_issue select').ddslick({
    width: "100%",
    background: "#fff",
    onSelected: function(data) {
      params = {}
      selected_name = data.selectedItem
                          .parents('.dd-container')
                          .find('input')
                          .attr('name')
      params[selected_name] = data.selectedData.value

      wrapper = data.selectedItem.parents('.input_wrapper');
      class_list = wrapper.find('.dd-option-value').map(function() {
        return $(this).val()
      }).get().join(' ');
      wrapper.removeClass(class_list);
      wrapper.addClass(data.selectedData.value);

      if($('.edit_issue').length) {
        $.ajax({
          url: $('.edit_issue').attr('action'),
          method: 'PUT',
          data: params
        })
      }
    }
  })

  var params_name = $('#company').attr('name');
  $('#company').ddslick({
    width: "100%",
    background: "#fff",
    onSelected: function(e){
      hidden_input = $(e.selectedItem).parents('.dd-container')
                                      .children('.dd-select')
                                      .children('input');
      if ( typeof hidden_input.attr('name') == 'undefined') {
        hidden_input.attr('name', params_name);
      } else {
        hidden_input.attr('name', params_name);
        window.location.href = '/organizations/' + hidden_input.attr('value');
      }
    }
  });

  // ROLES DDSLICK
  $('.orgRole').each(function (index, element) {
    var params_name = $(element).attr('name')
    $(element).closest('td').attr('user')
    $(element).ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(e){
        var user = $(e.selectedItem).closest('td').attr('member')
        hidden_input = $(e.selectedItem).parents('.dd-container')
                                        .children('.dd-select')
                                        .children('input');
       if ( typeof hidden_input.attr('name') == 'undefined') {
          hidden_input.attr('name', params_name);
        } else {
          hidden_input.attr('name', params_name);
          var organization_id = $(e.selectedItem).closest('td').attr('organization')
          var role = e.selectedData.text
          $.ajax ({
            url: '/organizations/members/change_member_role',
            type: 'POST',
            data: { user_id: user, organization_id: organization_id,
                    role: role },
            success: function(data) {
              if (data.admin == true){
                var tr = "tr[member=" + data.member_id + "]"
                $(tr).html(data.html_org);
                init_current_member($(tr).find('.chevron-down'))
                if (data.projects > 0){
                  $(tr).next('tr').html(data.html_proj)
                } else {
                  $(tr).next('tr').children().remove()
                }
                custom_select();
              }
            }
          });
        }
      }
    });
  });

  $('#testRunSelect').ddslick({
    width: "100%",
    background: "#fff",
    onSelected: function(e){
      check_select_validation($('#testRunSelect.dd-container'));
      $('#include_all_test_cases').val(JSON.stringify([{test_plan_id: e.selectedData.value}]));
    }
  });

  $('.projRole').each(function (index, element) {
    var params_name = $(element).attr('name')
    $(element).ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(e){
        var user = $(e.selectedItem).closest('td').attr('member')
        var project_id = $(e.selectedItem).closest('td').attr('project')
        hidden_input = $(e.selectedItem).parents('.dd-container')
                                        .children('.dd-select')
                                        .children('input');
        if (typeof hidden_input.attr('name') == 'undefined') {
          hidden_input.attr('name', params_name);
        } else {
          hidden_input.attr('name', params_name);
          if ($(e.selectedItem).closest('td').attr('changes') == 'true'){
            select_selector = '#checkbox_' + user
            $(select_selector).prop('checked', true);
            push_data_to_changes_hash(user);
            check_box_title();
          } else {
            var organization_id = $(e.selectedItem).closest('td').attr('organization')
            var role = e.selectedData.text
            $.ajax ({
              url: '/organizations/members/change_member_role',
              type: 'POST',
              data: { user_id: user, organization_id: organization_id,
                      project_id: project_id, role: role }
            });
          }
        }
      }
    });
  });

  if ($('.plugin_select').length) {
    $('select').ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(e) {
        plugin_name = e.selectedData.value;
        if (plugin_name == ''){
          cancel_btn = $('.new_integration_form button.btn.cancel:not(:visible)');
          $('.new_integration_form').html('');
          $('.new_integration_form').append(cancel_btn);
          cancel_btn.show();
        } else {
          url_to_new = window.location.pathname.match(/\/projects\/\d+\/plugin\//)
          $.ajax ({
            url: url_to_new + plugin_name + '/new',
            type: 'GET',
          });
        }
      }
    });
  };

  $('#test_plan_id_csv').ddslick({
    width: "100%",
    background: "#fff",
    onSelected: function(e){
      select = $('#test_plan_id_csv.dd-container');
      check_select_validation(select);
    }
  });

  if ($('select').length) {
    $('select').ddslick({
      width: "100%",
      background: "#fff"
    });
  }

  select_user_element = $('#user-select-data')
  if(select_user_element.length) {
    $('#assigned, #assignedTestRun').first().ddslick('select', {
      value: select_user_element.data('default-id'),
      disableTrigger: true
    });
  }
}

function bind_custom_scrollbar() {

  // console.log('bind_custom_scrollbar() from /app/assets/javascripts/main.js');

  var selectors = $(".sidebar, .plans-info, .modal-content-scroll, .custom-select-list, .table-dropdown-menu, .history-list")

  if (selectors.length) {
     selectors.mCustomScrollbar({
      autoHideScrollbar: true,
      mouseWheel:{ preventDefault: true },
      callbacks: {
        onCreate: init_popup_height
      }
    });
  }

  var options = { autoExpandHorizontalScroll: true,
                  autoScrollOnFocus: false,
                  updateOnContentResize: true };

  add_horizontal_scrollbar('.horizontalScroll',
                           options);

  $(".cases-info, .cases-info-modal").mCustomScrollbar({
      axis: "yx",
      scrollInertia: 550,
      scrollButtons: {enable: true},
      scrollbarPosition: "outside",
      advanced: { autoScrollOnFocus: false }
  });
  $('.issue_content').mCustomScrollbar({
    axis: "x",
    mouseWheel: false,
    keyboard: { enable: true },
    scrollbarPosition: "outside",
    advanced: {
      autoExpandHorizontalScroll: true,
      updateOnImageLoad: false
    }
  });
  $('body').mCustomScrollbar({
      theme:"dark-thin",
      mouseWheel:{ scrollAmount: 150 },
      callbacks:{
          whileScrolling:function() {
              if (this.mcs.top < -254) {
                  $("body").addClass("fix-agile");
              } else {
                  $("body").removeClass("fix-agile");
              }
          }
          /*whileScrolling:function(){
              $("body").addClass('top'+this.mcs.top);
          }*/
        }
  });
};
function add_horizontal_scrollbar(selector, options) {
  var searched_element = $(selector);
  if (searched_element.length && !searched_element.hasClass('mCustomScrollbar')) {

    $(selector).mCustomScrollbar({
      axis: "x",
      scrollbarPosition: "outside",
      advanced: options
    });
  };
};

function initialize_tabs() {
  $('.sign-tabs-list a').click(function (event) {
    var tab = $(this).attr('href');
    event.preventDefault();
    $('.sign-tabs-list .tab-active').removeClass('tab-active');
    $(this).addClass('tab-active');
    $('.tab').not(tab).css({'display': 'none'});
    $(tab).fadeIn(300);
    $(document).find('form').enableClientSideValidations();
  });

  $('.card-tabs-list a').click(function (event) {
    var tab = $(this);
    event.preventDefault();
    $('.card-tabs-list .active').removeClass('active');
    $(this).addClass('active');
    $('.tab').not(tab).css({'display': 'none'});
    $(tab).fadeIn(300);
  });

  $('.modal-tabs-list a').click(function (event) {
    var tab = $(this).attr('href');
    event.preventDefault();
    $('.modal-tabs-list .tab-active').removeClass('tab-active');
    $(this).addClass('tab-active');
    $('.tab').not(tab).css({'display': 'none'});
    $(tab).fadeIn(300);
  });
}

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function PreventDoubleClickDropzone() {
  button = $('.form_with_dropzone input[type=submit]');
  button.attr("disabled", true);
  setTimeout(function() {
    button.removeAttr("disabled");
  }, 2000);
}

function check_any_ddslick_selected() {
  if ($('.dd-selected-value[value!=""]').length) {
    $('#next').addClass('btn-green');
    $( '#next' ).unbind('click', import_submit).one('click', import_submit);
  } else {
    $('#next').removeClass('btn-green');
    $( "#next" ).unbind("click", import_submit);
  }
}

var import_submit = function(e) {
  $('.modal-body').find('form').submit();
};

function ddslick_direction() {
  if ($('.map-fields, .import-preview').length) {
    $('.dd-container').on( "click", function() {
      selectors = '.map-fields .modal-content-scroll, .import-preview .modal-content-scroll';
      var y = ($(this).parents(selectors).offset().top);
      var x = ($(this).offset().top);

      if (x - y > 140) {
          $(this).addClass('ddslick-top');
      } else {
          $(this).removeClass('ddslick-top');
      }
    });
  }
}

function dropzone_submit(dropzone) {
  $('.form_with_dropzone').on("submit", function(e) {
    if (!$(this).isValid(this.ClientSideValidations.settings.validators)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    } else  if (dropzone.getQueuedFiles().length > 0) {
      e.preventDefault();
      e.stopPropagation();
      dropzone.processQueue();
      button = $('.form_with_dropzone input[type=submit]');
      button.attr("disabled", true);
    }
  });

  $('.form_with_dropzone').on("error", function(e) {
      button = $('.form_with_dropzone input[type=submit]');
      button.removeAttr("disabled");
  });

  $('.form_with_dropzone').on("success", function(e) {
      button = $('.form_with_dropzone input[type=submit]');
      button.removeAttr("disabled");
  });
}

function check_select_validation(select) {
  form = select.parents(ClientSideValidations.selectors.forms)[0]
  if (!form) return true;

  if (select.find('.dd-selected-value').val() == "") {
    form.ClientSideValidations.addError(select, "can't be blank");
    return false;
  } else {
    form.ClientSideValidations.removeError(select)
    return true;
  }
}

$(document).ready(ready);
$(document).on('turbolinks:load', ready);