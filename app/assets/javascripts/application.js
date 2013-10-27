//= require sugar.min

//= require jquery
//= require turbolinks
//= require bookies
//= require routes

//= require jquery.pnotify
//= require jquery.slabtext

//= require modernizr.custom.63321

//= require_tree .

$(function() {
  $(window).on('click', '.ui-pnotify', function() {
    $(this).fadeOut(300, function() {
      $(this).remove()
    });
  });
});
