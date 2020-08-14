$(function() {
  var isEdited = false;

  let convert = () => {
    let html = marked($('#markdown').val());
    let sanitized = DOMPurify.sanitize(html);
    $('#output').html(sanitized);
  }

  $('#markdown').bind('keyup', function() {
    isEdited = true;
    convert();
    $('#output a').each(function(index, element) {
        var href = element.getAttribute('href');
        if (RegExp('^javascript', 'i').test(href)) {
            element.setAttribute('href', '#');
        }
    });
  });

  //autoresize
  $('textarea').autosize();
  
  //leave
  $(window).bind('beforeunload', function() {
    if (isEdited) {
      return 'Are you sure you want to leave? Your changes will be lost.';
    }
  });

  convert();
});