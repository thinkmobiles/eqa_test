function test_activity_js_actions(browser_path) {
  // console.log('test_activity_js_actions() from /app/assets/javascripts/includes/test_plan_activity.js');
  window.history.pushState({}, '', browser_path);

  $('.testing_activities .nav-tabs a').on('click', function (e){
    if ($(this).attr('disabled')) {
      e.preventDefault();
      e.stopImmediatePropagation();
    } else {
      $('.testing_activities .nav-tabs a').attr('disabled', true);
      $('.testing_activities .nav-tabs a').css('cursor', 'default');
      $.ajax({
        url: $(this).attr('href'),
        dataType: 'script',
        success: function() { set_disabled_test_activities_nav_tabs }
      });
    }
  });

  custom_select();
  init_nav_tabs();
  init_plan_togle_switcher();
  init_carets();

// Modal--------------------------------------------

  $(".open-addTestPlan").click(function () {
    $("#addTestPlan").show();
    $(MODAL_CLASS).addClass("in");
  });

  $(".open-addModule").click(function () {
    $("#addModule").show();
    $(MODAL_CLASS).addClass("in");
  });

  $(".open-addCase").click(function () {
    $("#addCase").show();
    $(MODAL_CLASS).addClass("in");
  });

  $(".modal-content .close").click(function () {
    $(MODAL_CLASS).removeClass("in");
    hide_modal();
  });

  $(".modal-body .cancel").click(function () {
    $(MODAL_CLASS).removeClass("in");
    hide_modal();
  });

  bind_custom_scrollbar();
  img_to_svg_convert();
  jstree_init();
  sortable_case_init();
  set_disabled_test_activities_nav_tabs();
}

function set_disabled_test_activities_nav_tabs() {
  $('.testing_activities .nav-tabs a').attr('disabled', false);
  $('.testing_activities .nav-tabs a').css('cursor', 'pointer');
  $('.testing_activities .nav-tabs a.active').attr('disabled', true);
  $('.testing_activities .nav-tabs a.active').css('cursor', 'default');
}


function jstree_init() {
  // console.log('jstree_init()');

  var $jstreeDemo = $('#jstree_demo_div, #jstree_demo_div_popUp');
  var $caseContainer = $('.testPlans .cases');

  $jstreeDemo.jstree();
  $jstreeDemo.jstree('open_all');

  $jstreeDemo.on('click' , '.jstree-anchor', function(){
    var $target = $(this).find('.folder-title');
    var dataId = $target.data('id');
    var $targetRow;
    var $scroll;
    var $row;

    if (dataId){
      $row = $caseContainer.find('.cases-info-item-inner[data-id=' + dataId + ']');
      $targetRow = $row[0];
      $scroll = $row.parents(".mCustomScrollbar");

      while ($row && $row.length){
        $row.addClass('open');
        $row = $row.parents('.cases-info-item-inner');
      }

      $targetRow ? $scroll.mCustomScrollbar('scrollTo', $targetRow) : false;
    }
  });

  bind_custom_scrollbar();
}

function init_nav_tabs() {
  $('.nav-tabs a').click(function (e) {
    e.preventDefault();
    var tab = $(this);
    var prev_tab = $('.nav-tabs a.active')
    prev_tab.removeClass('active');
    $(this).addClass('active');
    if ($('.card-sdk-integrations').length) {
      $(prev_tab.attr('href')).hide();
      $(tab.attr('href')).show();
    }
    $(tab).fadeIn(300);
  });
}

function add_active_to_test_plan_tab() {
  $("a.highlight_link[href='" + window.location.pathname + "']").addClass('active');
  if ($('.testing_activities a.highlight_link.active').length) {
    $('.project_test_activities').addClass('active');
  } else if (window.location.pathname.match(/test_runs/)) {
    $('.project_test_activities').addClass('active');
    $('.test_runs_nav_link').addClass('active');
  }
};

function init_carets() {
  $(document).on('click', '.cases-test .test-caret', function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();

    $(this).parent().next().toggleClass('open');
    $(this).parents('.cases-info-item-inner').first().toggleClass('open');
    $(this).toggleClass('caret-down');
  });

  var $jstree = $('#jstree');
  var $jstreeDemo = $('#jstree_demo_div, #jstree_demo_div_popUp');
  var $jstreeCheckbox = $('#jstree_demo_div_popUp');

  $jstreeDemo.jstree();
  $jstreeDemo.jstree('open_all');
}

function init_plan_togle_switcher() {
  // console.log('init_plan_togle_switcher()');

  var $plansOpen = $('.tab-pane-content .plans');
  var $containsClose = $('.tab-pane-content .contains');
  var $btnBlock = $('.plans .open-addTestPlan');
  var $plansItemInnerLeft = $('.plans-item-inner-left');
  var $plansTab = $('.main-content-info a.link_profile_menu');
  var $plansToggle = $('.plans-toggle');
  var $caretIcon = $('.plans-toggle span');

  if (toggle_condition($plansTab)) {
    expand_plan_items($plansOpen,          $containsClose, $btnBlock,
                      $plansItemInnerLeft, $plansTab,      $caretIcon,
                      $plansToggle);
  } else {
    narrow_plan_items($plansOpen,          $containsClose, $btnBlock,
                      $plansItemInnerLeft, $plansTab,      $caretIcon,
                      $plansToggle);
  };

  add_toggle_event($plansOpen,          $containsClose, $btnBlock,
                   $plansItemInnerLeft, $plansTab,      $caretIcon,
                   $plansToggle)
}

function toggle_condition($plansTab) {
  // console.log('function toggle_condition($plansTab)');

  return $plansTab.hasClass('expanded');
};

function add_toggle_event($plansOpen,          $containsClose, $btnBlock,
                          $plansItemInnerLeft, $plansTab,      $caretIcon,
                          $plansToggle) {

  $plansToggle.click(function (e) {
      // console.log('switch plan_togle');
    e.stopImmediatePropagation();
    e.preventDefault();

    toggle_plan_items($plansOpen,          $containsClose, $btnBlock,
                      $plansItemInnerLeft, $plansTab,      $caretIcon,
                      $plansToggle);
  });
};

function toggle_plan_items($plansOpen,          $containsClose, $btnBlock,
                           $plansItemInnerLeft, $plansTab,      $caretIcon,
                           $plansToggle) {

  // console.log('function toggle_plan_items()');

  $plansOpen.toggleClass('plans-open');
  $containsClose.toggleClass('contains-close');
  $btnBlock.toggleClass('open-addTestPlan-block');
  $plansItemInnerLeft.toggleClass('grow');
  $plansTab.toggleClass('expanded');
  $plansToggle.toggleClass('open');
  $caretIcon.toggleClass('fa-caret-left').toggleClass('fa-caret-right');
};

function expand_plan_items($plansOpen,          $containsClose, $btnBlock,
                           $plansItemInnerLeft, $plansTab,      $caretIcon,
                           $plansToggle) {

  // console.log('function expand_plan_items()');

  $plansOpen.addClass('plans-open');
  $containsClose.addClass('contains-close');
  $btnBlock.addClass('open-addTestPlan-block');
  $plansItemInnerLeft.addClass('grow');
  $plansTab.addClass('expanded');
  $plansToggle.addClass('open');
  $caretIcon.removeClass('fa-caret-right').addClass('fa-caret-left');
};

function narrow_plan_items($plansOpen,          $containsClose, $btnBlock,
                           $plansItemInnerLeft, $plansTab,      $caretIcon,
                           $plansToggle) {

  // console.log('function narrow_plan_items()');

  $plansOpen.removeClass('plans-open');
  $containsClose.removeClass('contains-close');
  $btnBlock.removeClass('open-addTestPlan-block');
  $plansItemInnerLeft.removeClass('grow');
  $plansTab.removeClass('expanded');
  $plansToggle.removeClass('open');
  $caretIcon.removeClass('fa-caret-left').addClass('fa-caret-right');
};
