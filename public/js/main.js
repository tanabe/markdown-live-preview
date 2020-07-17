$(function() {
  var currentMode = 'edit';
  var scrollTops = {
    'edit' : 0,
    'preview' : 0
  };

  var isEdited = false;

  //$('#markdown').val(example);
  $('#markdown').bind('keyup', function() {
    isEdited = true;
    $('#output').html(markdown.toHTML($('#markdown').val()));
    $('#output a').each(function(index, element) {
        var href = element.getAttribute('href');
        if (RegExp('^javascript', 'i').test(href)) {
            element.setAttribute('href', '#');
        }
    });
  });

  //menu
  var menuItems = $('#menu a');
  menuItems.click(function(event) {
    event.preventDefault();

    menuItems.removeClass('active');
    var sender = $(event.currentTarget);
    sender.addClass('active');

    $('#content .mode').hide();
    var menuId = sender.data('menuId');
    currentMode = menuId;
    $('#' + menuId).show();
    $(window).scrollTop(scrollTops[currentMode]);

  });

  //reference
  $("table#reference tr td:odd").each(function(index, element) {
    var self = $(element);
    if (self.html() === "") {
      self.html(markdown.toHTML(self.siblings().html()));
    }
  });

  //clear
  $('#clearButton').click(function(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete?')) {
      $('#markdown').val('');
      $('#output').html('');
    }
  });

  //autoresize
  $('textarea').autosize();
  
  //leave
  $(window).bind('beforeunload', function() {
    if (isEdited) {
      return 'Are you sure you want to leave? Your changes will be lost.';
    }
  });

  $('#output').html(markdown.toHTML($('#markdown').val()));
});
