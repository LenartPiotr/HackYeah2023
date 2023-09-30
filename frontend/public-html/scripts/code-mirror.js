$(window).ready(_ => {
    var sqlEditor = document.getElementById('sql-editor');
    var editor = CodeMirror.fromTextArea(sqlEditor, {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'text/x-sql'
    });
})

