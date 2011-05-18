var example = [
  "# hello, This is Markdown Live Previewer",
  "",
  "----",
  "## what is Markdown?",
  "see [Wikipedia](http://en.wikipedia.org/wiki/Markdown)",
  "",
  "> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people \"to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)\".",
  "",
  "----",
  "## usage",
  "1. write markdown text in above textarea",
  "2. render automatically to the output area",
  "",
  "----",
  "## thanks",
  "* [markdown-js](https://github.com/evilstreak/markdown-js)"
].join("\n");

$(function() {
  $("#markdown").val(example);
  $("#output").html(markdown.toHTML(example));
  $("#output").html(markdown.toHTML(example));
  $("#markdown").bind("keyup", function() {
    $("#output").html(markdown.toHTML($("#markdown").val()));
  });

  //reference
  $("table#reference tr td:odd").each(function(index, element) {
    var self = $(element);
    if (self.html() === "") {
      self.html(markdown.toHTML(self.siblings().html()));
    }
  });
});
