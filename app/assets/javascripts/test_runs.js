  var testRunCases = [],
      visible_plans = [];

  $(document).on('change', '#select_specific_test_cases', function() {
    $('.change-selection').show();
  });
  $(document).on('change', '#include_all_test_cases', function() {
    $('.change-selection').hide();
  });


  $(document).on('click', ".close_selection_test_cases", function() {
    $(".modal-add-test-run .modal-select-cases").removeClass('modal-select-cases-show');
  });

  $(document).on('click', ".change-selection .change", function () {
    if ($('#selectCases .modal-select-cases').length) {
      $(".modal-add-test-run .modal-select-cases").addClass("modal-select-cases-show");
    } else {
      var $form = $('#new_test_run, .edit_test_run'),
          project_id = $('#test_run_project_id').val(),
          test_plan_id = $('#testRunSelect .dd-selected-value').val(),
          test_run_id =  $(this).data('run-id');

      $.ajax ({
        url: '/projects/' + project_id + '/select_test_cases',
        method: 'post',
        data: { test_plan_id: test_plan_id, test_run_id: test_run_id },
        success: function(data) {
          testRunCases = data.results_array;
          $('#selectCases').html(data.html);
          $('#plan-id-' + test_plan_id).parent().addClass('active');
          visible_plans = [test_plan_id];

          if(testRunCases[test_plan_id]) {
            setTimeout(function() {
              testRunCases[test_plan_id].map(function(result_item) { $("#test-case-" + result_item['test_case_id']).click() })
            }, 100)
          }
        }
      });
    }
  });

  test_case_nested_checkboxes('input.module_checkbox:checkbox', 'input.checkbox-all:checkbox');
  $(document).on('change', '.module_checkbox, .checkbox-all', function() {
    var module_id = $(this).data('module-id');
    if ($('#case-content-module-' + module_id + ' input.checkbox:checked').length == 0) {
      $('a#jstree-module-' + module_id + '_anchor').removeClass('jstree-checked');
    }
    else {
      $('a#jstree-module-' + module_id + '_anchor').addClass('jstree-checked');
    }
  })

  $(document).on('ajax:success', '#new_test_run, .edit_test_run', function(e, data){
    if ($(this).hasClass('edit_test_run')) {
      test_run_id = $(this).parent().data('test-run-id');
      $('#test-run-' + test_run_id).html(data.html);
    }
    else {
      $('#test_runs_list').prepend(data.html);
    }
    hide_modal();
  });


  $(document).on('click', '.plans-info-item-inner', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var plan_id = $(this).data('plan-id'),
        project_id = $(this).data('project-id'),
        run_id = $(this).data('run-id'),
        module_container = $('.modules-for-plan-' + plan_id);

    if($(this).parent().hasClass('active')) {
      return;
    } else if (module_container.length){
      $('.plans-info-item').removeClass('active');
      $('#plan-id-' + plan_id).parent().addClass('active');
      $('.modules-and-cases').hide();
      module_container.show();
    } else {
      $.ajax({
        url: '/projects/' + project_id + '/select_modules',
        data: { test_plan_id: plan_id, test_run_id: run_id },
        method: 'post',
        success: function(data) {
          $('.plans-info-item').removeClass('active');
          $('#plan-id-' + plan_id).parent().addClass('active');
          $('.modules-and-cases').hide();
          $('.modules-and-cases').last().after(data.html);

          visible_plans.push(String(plan_id));
          jstree_test_run_init(plan_id);
          bind_custom_scrollbar();
          if (testRunCases[plan_id]) {
            testRunCases[plan_id].map(function(result_item) { $("#test-case-" + result_item['test_case_id']).click()});
          }
        }
      });
    }
  })

  $(document).on('click', '.save_select_cases', function() {
    test_run_results_attributes = retrieve_test_run_results_array();
    $('#select_specific_test_cases').val(JSON.stringify(test_run_results_attributes));
    $(".modal-add-test-run .modal-select-cases").removeClass('modal-select-cases-show');

    item_length = test_run_results_attributes.filter(function (result_item) {
      return !result_item['_destroy']
    }).length;
    $('.change-selection span').text(item_length);
  });

  $(document).on('click', 'i.jstree-checkbox', function(e) {
    $('.cases-info-item-inner').addClass('open');
    $('.cases-info-item-inner .test-caret').addClass('caret-down');
    $('#checkbox-module-' + $(this).siblings('span').attr('data-id')).click()
  });

  $(document).on('click', '.checked-all-modules', function() {
    $('.modules-and-cases:visible li.jstree-node a.jstree-anchor').addClass('jstree-checked');
    $('.modules-and-cases:visible .cases-info-item-inner').addClass('open');
    $('.modules-and-cases:visible .cases-info-item-inner .test-caret').addClass('caret-down');

    $('.modules-and-cases:visible input.checkbox').prop('checked', true);
  })

  $(document).on('click', '.unchecked-all-modules', function() {
    $('.modules-and-cases:visible li.jstree-node a.jstree-anchor').removeClass('jstree-checked');
    $('.modules-and-cases:visible input.checkbox').prop('checked', false);
  })

  $(document).on('ajax:success', '.test_run_profile_button', function(e, data){
    hide_modal()
    if(data.html != null) {
      $('.tab-content').html(data.html);
      add_profile_table_links();
      if (data.gon_values.length != 0){
        BuildDiagram(data.gon_values);
      }
    } else {
      JsDataRender.test_run_profile.render_data(data) }
  });

  $(document).on('click', '.radio-status-result input', function() {
    var $this = $(this),
        result_id = $this.attr('data-result-id'),
        status = $this.val(),
        project_id = $this.data('project-id');
    $.ajax({
      url: '/projects/' + project_id + '/update_result_status',
      method: 'post',
      data: { result_id: result_id, status: status },
      success: function(data) {
        if($('input#radio5:checked').length > 0) {
          $(MODAL_CLASS).find('.modal-test-run-steps').css('display','none');
          $(MODAL_CLASS).append('<div class="double-modal" style="display:none"></div>')
          $(MODAL_CLASS).append(data.html)
          initialize_modal();
        }
      }
    })
  })

  function BuildDiagram(values){
    var context2 = document.getElementById('test_run_statuses_calculating_chart').getContext('2d');
    var data2 = {
        datasets: [{
            data: values,
            backgroundColor: [
                "#4CAF50",
                "#4E5C4E",
                "#E7E9ED",
                "#FF6384"
            ],
            label: 'My dataset' // for legend
        }],
        labels: [
            "Passed",
            "Blocked",
            "Untested",
            "Failed"
        ]
    };
    new Chart(context2, {
        data: data2,
        type: 'pie',
        options: { responsive: false }
    });
  };

  $(document).on('click', "#printLink", function() {
    printPage();
  });

  function printPage() {
    var dataUrl = document.getElementById('test_run_statuses_calculating_chart').toDataURL();
    var printContents = document.getElementById('printImage').innerHTML;
    var windowContent = '<html>';
    windowContent += '<body>';
    windowContent += '<img style="margin-top: 25%;" src="' + dataUrl + '">';
    windowContent += "<p style='font-size: 26px; text-align: center;'>" +printContents+ "</p>";
    windowContent += '</body>';
    windowContent += '</html>';
    $(windowContent).print()
  }

  $(document).on('ajax:success', '.btn-step.btn-prev, .btn-step.next-case', function(e, data) {
    if(data.html != null) {
      $(MODAL_CLASS).html(data.html);
      bind_custom_scrollbar()
    } else {
      JsDataRender.execute_test_case.render_data(data);
    }
  })

function replace_modal_to_execute_test_run() {
  $(MODAL_CLASS).find('.add_issue').remove();
  $(MODAL_CLASS).find('.double-modal').remove();
  $(MODAL_CLASS).find('.modal-test-run-steps').css('display','block');
}

function add_profile_table_links() {
  $('.cases-test-content-item table tbody tr').on('click', function() {
    tr = $(this)
    $.ajax({
      url: '/test_runs/' + tr.data('test-run-id') + '/test_case/' + tr.data('test-case-id'),
      method: 'get',
      success: function(data) {
        modal = $(MODAL_CLASS);
        modal.html(data.html);
        modal.show();
        initialize_modal();
      }
    });
  });
}

function retrieve_test_run_results_array() {
  case_ids = $(".checkbox.module_checkbox:checked").map(function(){ return $(this).val() }).get();
  array = [];
  $.each(testRunCases, function(test_plan_id, test_cases) {
    array.push(test_cases.map(function(result_item) {
      if ($.inArray(String(result_item['test_case_id']), case_ids) == -1 && $.inArray(String(test_plan_id), visible_plans) > -1) {
        result_item['_destroy'] = true
      } else {
        case_ids.splice(case_ids.indexOf(String(result_item['test_case_id'])), 1)
      }
      return result_item
    }));
  });

  array.push(case_ids.map(function(case_id){
    return { test_case_id: case_id }
  }));
  return [].concat.apply([], array);
}

function jstree_test_run_init(plan_id) {
  $jstreeCheckbox = $('#jstree_demo_div_popUp_' + plan_id);
  $jstreeCheckbox.jstree({
      "plugins": ["checkbox"],
      checkbox: {
        three_state : false, // to avoid that fact that checking a node also check others
        whole_node : false,  // to avoid checking the box just clicking the node
        tie_selection : false // for checking without selecting and selecting without checking
      }
  });
  $jstreeCheckbox.jstree('open_all');
}
