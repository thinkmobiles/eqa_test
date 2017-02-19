JsDataRender.test_run_profile = {
  // Main function
  render_data: function(data) {
    this.private_stuff.render_table(data.table_data, data.labels)
    this.private_stuff.render_chart(data.gon_values)
    this.private_stuff.render_chart_info(data.chart_info)
  },

  private_stuff: {
    // Render functions
    render_chart: function(chart_data) {
      container = $('div.testRun-chart');
      container.find('iframe, canvas').remove();
      container.prepend('<canvas id="test_run_statuses_calculating_chart" width="700" height="350""></canvas>');
      BuildDiagram(chart_data);
    },
    render_table: function(table_data, labels) {
      t_rows = $('div.cases-test-content-item table tbody tr')
      if(table_data.untested != null) {
        untested = this.filter_rows(t_rows, table_data.untested)
        this.repaint_statuses(labels, "untested", untested)
      }
      if(table_data.pass != null) {
        passed = this.filter_rows(t_rows, table_data.pass)
        this.repaint_statuses(labels, "pass", $(passed))
      }
      if(table_data.fail != null) {
        failed = this.filter_rows(t_rows, table_data.fail)
        this.repaint_statuses(labels, "fail", $(failed))
      }
      if(table_data.block != null) {
        blocked = this.filter_rows(t_rows, table_data.block)
        this.repaint_statuses(labels, "block", $(blocked))
      }
    },
    render_chart_info: function(info) {
      $('div.testRun-chart').find('#printImage').remove();
      container.append(info);
    },

    // Help functions
    filter_rows: function(all_rows, result_ids) {
      filtered = all_rows.filter(function() {
        this_element = $(this);
        this_id = this_element.data('test-result-id');

        if(this_id === undefined)
          this_id = 0

        for(i = 0; i < result_ids.length; i++) {
          if(this_id == result_ids[i]) {
            return this_element
          }
        }
      })
      return filtered;
    },
    repaint_statuses: function(labels, status, elements) {
      repaint = function(status_class, label) {
        for(i = 0; i < elements.length; i++) {
          element =  $(elements[i]).find('td.status div.status-block')
          element.removeClass('pass fail untested block')
          element.addClass(status_class)
          element.text(label)
        }
      }
      switch(status) {
        case "pass":
          repaint("pass", labels.pass)
          break;
        case "block":
          repaint("block", labels.block)
          break;
        case "fail":
          repaint("fail", labels.fail)
          break;
        case "untested":
          repaint("untested", labels.untested)
          break;
      }
    }

  }
}
