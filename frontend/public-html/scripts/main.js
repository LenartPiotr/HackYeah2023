$(window).ready(_ => {
    var input = $('input[type=text]');

    Hide('h1');
    Hide(input);

    FadeIn('h1', 500, 0);
    FadeIn(input, 500, 200);

    input.on('keydown', e => {
        if (e.keyCode == 13) {
            var text = input.val();
            // ajax to background
            text = StylizeSql(text);
            ShowSql(text);
        }
    });
})

function Hide(element) {
    $(element).css({
        position: 'relative',
        opacity: 0,
        top: '-30px'
    });
}

function FadeIn(element, duration, timeout) {
    setTimeout(() => {
        $(element).animate({
            opacity: 1,
            top: 0
        }, duration);
    }, timeout);
}

function StylizeSql(sql) {
    var newlineWords = ['alter','backup','create','drop','from','having','select','distinct','where','order','limit','group'];
    var newlineRegex = /(?<=.) (alter|backup|create|drop|from|having|select|distinct|where|order|limit|group)/ig;
    sql = sql.replace(newlineRegex, '\n$1')
    return sql;
}

function ShowSql(sql) {
    FadeIn('.CodeMirror', 500);
    editor.setValue(sql);
}