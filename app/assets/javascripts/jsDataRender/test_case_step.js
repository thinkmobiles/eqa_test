JsDataRender.execute_test_case = {

// Main function
  render_data: function(data) {
    if(data != null && $(MODAL_CLASS).find('.modal-test-run-steps')) {
      this.private_stuff.render_case_text(data.test_case)
      this.private_stuff.render_case_radio(data.test_run_result.status)
      this.private_stuff.set_up_data_props(data.test_run_result.id)
      this.private_stuff.render_case_buttons(data
                                             .additional_data
                                             .test_run_step_controls)
      return true;
    } else { return false; }
  },

// Service procedures
  private_stuff: {
    render_case_text: function(test_case) {
      info_table = $('.test-run-info-table')
      info_table.find('.mark-case-title').html(test_case.title)
      info_table.find('.mark-case-presteps').html(test_case.pre_steps)
      info_table.find('.mark-case-steps').html(test_case.steps)
      info_table.find('.mark-case-expected-result').html(test_case.expected_result)
    },
    render_case_radio: function(status) {
  // WARNING status values can change, and current code will fail.
      switch(status) {
        case 'pass':
          $('input#radio4').prop('checked',true);
          break;
        case 'fail':
          $('input#radio5').prop('checked',true);
          break;
        case 'block':
          $('input#radio6').prop('checked',true);
          break;
        case 'untested':
          $('input#radio4').prop('checked',false)
          $('input#radio5').prop('checked',false)
          $('input#radio6').prop('checked',false)
          break;
      }
    },
    set_up_data_props: function(result_id) {
      if((radio = $('input#radio4')).length > 0) {
        radio.attr('data-result-id', result_id);
      }
      if((radio = $('input#radio5')).length > 0) {
        radio.attr('data-result-id', result_id);
      }
      if((radio = $('input#radio6')).length > 0) {
        radio.attr('data-result-id', result_id);
      }
    },
    render_case_buttons: function(controls) {

      container =  $('.test-run-step-controls')
      container.find('a.btn-step, a.test_run_profile_button').remove();
      if(controls.prev_button != null) {
        container.append(controls.prev_button)
      }
      if(controls.next_button != null) {
        container.append(controls.next_button)
      }
      if(controls.finish_button != null) {
        container.append(controls.finish_button)
      }
    }
  }
}
