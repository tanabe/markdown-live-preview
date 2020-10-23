$(function() {
    var isEdited = false;

    // Setup editor
    var editor = ace.edit('editor');
    editor.getSession().setUseWrapMode(true);
    editor.setOptions({
        maxLines: Infinity,
        indentedSoftWrap: false,
        fontSize: 14,
        theme: 'ace/theme/github',
        // TODO consider some options
    });

    editor.on('change', () => {
        isEdited = true;
        convert();
    });

    let convert = () => {
        let html = marked(editor.getValue());
        let sanitized = DOMPurify.sanitize(html);
        $('#output').html(sanitized);
    }
    
    //leave
    $(window).bind('beforeunload', function() {
      if (isEdited) {
        return 'Are you sure you want to leave? Your changes will be lost.';
      }
    });

    convert();
});