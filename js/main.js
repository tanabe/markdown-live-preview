var example = [
  "# hello, This is Markdown Live Preview",
  "",
  "----",
  "## what is Markdown?",
  "see [Wikipedia](http://en.wikipedia.org/wiki/Markdown)",
  "",
  "> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people \"to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)\".",
  "",
  "----",
  "## usage",
  "1. Write markdown text in this textarea.",
  "2. Click 'HTML Preview' button.",
  "",
  "----",
  "## markdown quick reference",
  "# headers",
  "",
  "*emphasis*",
  "",
  "**strong**",
  "",
  "* list",
  "",
  ">block quote",
  "",
  "    code (4 spaces indent)",
  "[links](http://wikipedia.org)",
  "",
  "----",
  "## changelog",
  "* 17-Feb-2013 re-design",
  "",
  "----",
  "## thanks",
  "* [markdown-js](https://github.com/evilstreak/markdown-js)",
  ""
].join("\n");

$(function() {
  var currentMode = 'edit';
  var container = $('#container');
  var header = $('#header');
  var headerHeight = header.outerHeight();
  var titleHeight = $('#header h1').outerHeight();
  var fixedTop = -titleHeight;
  var scrollTops = {
    'edit' : 0,
    'preview' : 0
  };

  var isEdited = false;

  $('#markdown').val(example);
  $('#output').html(markdown.toHTML(example));
  $('#markdown').bind('keyup', function() {
    isEdited = true;
    $('#output').html(markdown.toHTML($('#markdown').val()));
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
});
