// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery-ui/sortable
//= require jquery-ui/droppable
//= require jquery-ui/selectmenu
//= require jquery-ui/progressbar
//= require jquery-ui/autocomplete
//= require Chart.min
//= require jsDataRender/init.js
//= require_tree .

window.addEventListener("popstate", function(e) {
    document.location.href = location.pathname;
}, false)

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

Dropzone.prototype._getParamName = function(n) {
  if (typeof this.options.paramName === "function") {
    return this.options.paramName(n);
  } else if (this.options.paramName1) {
    return this.options.paramName1 + this.options.paramName2;
  } else {
    return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
  }
};

$.ajaxSetup({ cache: false });