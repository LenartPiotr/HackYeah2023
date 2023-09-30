$(window).ready(_ => {
    var input = $('input[type=text]');
    var runButton = $('.sql-area button');

    Hide('h1');
    Hide(input);
    Hide('.sql-area button');

    FadeIn('h1', 500, 0);
    FadeIn(input, 500, 200);

    input.on('keydown', e => {
        if (e.keyCode == 13) {
            var text = input.val();
            // ajax to background
            text = 'SELECT * FROM \'JPK_PODMIOT\' LIMIT 30';
            text = StylizeSql(text);
            ShowSql(text);
        }
    });

    runButton.on('click', ()=>{
        var text = editor.getValue();
        $.ajax({
            type: "POST",
            url: '/php/sql-query.php',
            data: {query: text},
            success: value => {
                PrintData(value, true);
            }
        });
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
    var newlineRegex = /(?<=.) (alter|backup|create|drop|from|having|select|distinct|where|order|limit|group)/ig;
    sql = sql.replace(newlineRegex, '\n$1')
    return sql;
}

function ShowSql(sql) {
    FadeIn('.CodeMirror', 500);
    FadeIn('.sql-area button', 500, 100);
    editor.setValue(sql);
}

function PrintData(data, scroll) {
    var res = $('.results');
    res.html('');
    setTimeout(() => {
        res.html(data);
        Hide(res);
        setTimeout(() => {
            FadeIn(res, 500);
            if (scroll) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: res.offset().top
                }, 1000);
            }
        }, 100);
    }, 1);
}