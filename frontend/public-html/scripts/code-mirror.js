var editor;

$(window).ready(_ => {
    var sqlEditor = document.getElementById('sql-editor');
    editor = CodeMirror.fromTextArea(sqlEditor, {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'text/x-sql',
        autoRefresh: true,
    });
    editor.refresh();
    editor.setValue('SELECT * FROM Users');
})