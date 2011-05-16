$(function() {
  $("#markdown").bind("keyup", function() {
    $("#output").html(markdown.toHTML($("#markdown").val()));
  });
});
