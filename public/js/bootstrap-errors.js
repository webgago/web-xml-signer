(function($) {

  $.fn.addBootstrapError = function(message) {
    var $input = $(this);
    var $control_group = $input.closest('.control-group');
    var $error = $('<p class="help-block">' + message + '</p>');
    $input.removeBootstrapError();
    $control_group.addClass('error');
    $control_group.append($error);
  };

  $.fn.removeBootstrapError = function() {
    var $input = $(this);
    var $control_group = $input.closest('.control-group');
    $control_group.removeClass('error');
    $control_group.find('.help-block').remove();
  };

})(jQuery);
