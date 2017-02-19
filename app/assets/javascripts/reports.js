function InitializeCanvas(canvas, labels, label, results, backgroundColors, borderColors) {
  var myChart = new Chart(canvas, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: label,
            data: results,
            borderWidth: 1,
            options: { responsive: true },
            backgroundColor: backgroundColors,
            borderColor: borderColors
        }]
    },
    options: {
      legend: {
        display: true,
        labels: {
          fontSize: 12
        }
      }
    }
  });
}

function drawCanvas(reports) {
  $('canvas').remove();
  reports.forEach(function (report, i) {
    report['canvas'] = $('<canvas></canvas>')[0];
    $('.chart').eq(i).append(report['canvas']);
    InitializeCanvas(
      report['canvas'],
      report['labels'],
      report['label'],
      report['results'],
      report['backgroundColors'],
      report['borderColors']
    );
  });
}

function init_test_reports() {
  var main_selector = '#report-type',
      secondary_selectors = '#test-run-report, #test-plan-report, #user-report',
      report_button = $('#report-button'),
      project_id = $('.test-reports-item').data('project-id');

  create_main_select();
  create_test_plan_report_select();
  create_test_run_report_select();
  create_user_report_select();

  $(secondary_selectors).hide();
  $(secondary_selectors).siblings('label').hide();

  report_button.click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    $.ajax({
      url: $(this).attr('path'),
      success: function (data) {
        $('.preview-report').html(data.html);
      }
    });
  });

  function create_main_select() {
    $(main_selector).ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(data) {
        $(secondary_selectors).hide();
        $(secondary_selectors).siblings('label').hide();
        $('#test-run-report').ddslick('select', { index: 0 });
        $('#test-plan-report').ddslick('select', { index: 0 });
        $('#user-report').ddslick('select', { index: 0 });
        report_button.removeClass('btn-nonActive');

        if (data.selectedData.value.length == 0) {
          report_button.addClass('btn-nonActive');
        } else if (secondary_selectors.includes(data.selectedData.value)) {
          $('#' + data.selectedData.value).show();
          $('#' + data.selectedData.value).prev('label').show();
          report_button.addClass('btn-nonActive');
        } else {
          report_button.attr('path', data.selectedData.value);
        }
      }
    });
  }

  function create_test_plan_report_select() {
    $('#test-plan-report').ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(data) {
        report_button.removeClass('btn-nonActive');
        if (data.selectedData.value.length == 0) {
          report_button.addClass('btn-nonActive');
        } else {
          report_button.attr('path', '/test_reports/TestPlan/'+ data.selectedData.value + '/TestCase');
        }
      }
    });
  }

  function create_test_run_report_select() {
    $('#test-run-report').ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(data) {
        report_button.removeClass('btn-nonActive');

        if (data.selectedData.value.length == 0) {
          report_button.addClass('btn-nonActive');
        } else {
          report_button.attr('path', '/test_reports/TestRun/'+ data.selectedData.value + '/TestRunResult');
        }
      }
    });
  }

  function create_user_report_select() {
    $('#user-report').ddslick({
      width: "100%",
      background: "#fff",
      onSelected: function(data) {
        report_button.removeClass('btn-nonActive');
        if (data.selectedData.value.length == 0) {
          report_button.addClass('btn-nonActive');
        } else {
          path = '/test_reports/User/'+ data.selectedData.value +
                 '/TimeManagement?project_id=' + project_id +
                 '&report_type=issue_type';
          report_button.attr('path', path);
        }
      }
    });
  }
}

function generate_pdf() {
  var doc;

  $('.download-pdf').click(function() {
    element = $(this).parents('.report-info').parent('.preview-wrap').first();
    downloadReport(element);
  });

  $('.print-reports').click(function() {
    element = $(this).parents('.report-info').parent('.preview-wrap').first();
    printReport(element);
  });

  function downloadReport(element) {
    canvas = element.find('canvas');
    image = $('<img src="' + canvas[0].toDataURL() + '">');
    canvas.remove();
    element.find('.chart').append(image);
    $.ajax({
      type: 'POST',
      url: '/test_reports',
      data: { report_html: element.html() },
      success: function(data) {
        window.open('/' + data.path, '_blank');
      }
    });
    image.remove();
    element.find('.chart').append(canvas);
  }

  function printReport(element) {
    canvas = element.find('canvas');
    image = $('<img src="' + canvas[0].toDataURL() + '">');
    element.find('.chart').append(image);
    element.print({
      stylesheet: '/css/print_reports.css'
    });
    image.remove();
  }
};
