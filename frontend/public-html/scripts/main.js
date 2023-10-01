$(window).ready(_ => {
    var input = $('input[type=text]');
    var runButton = $('#bt_run');
    var advButton = $('#bt_adv');
    var arrow = $('.arrow');

    Hide('h1');
    Hide(input);
    Hide('.sql-area');

    FadeIn('h1', 500, 0);
    FadeIn(input, 500, 200);

    arrow.css({display: 'none'});

    input.on('keydown', e => {
        if (e.keyCode == 13) {
            var text = input.val();
            $.ajax({
                url: "127.0.0.1:8080",
                type: "get",
                data: { 
                    input: text,
                    lang: lang,
                    temperature: $('#id_temp').val(),
                    top_p: $('#id_top').val()
                },
                success: function(response) {
                    text = response;
                    AddConversation(text);
                    text = StylizeSql(text);
                    ShowSql(text);
                },
                error: function(xhr) {
                    setTimeout(() => {
                        text = 'Błąd konwersacji';
                        AddConversation(text);
                        ShowSql('');
                    }, 1000);
                }
            });
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

    arrow.on('click', () => {
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 500);
    });

    $(window).scroll(() => {
        if ($(window).scrollTop() > 300) {
            arrow.fadeIn();
        } else {
            arrow.fadeOut();
        }
    });

    advButton.on('click', () => ShowHideAdvancedOptions());
})

function Hide(element) {
    //$(element).data('height', $(element).css('height'));
    $(element).css({
        position: 'relative',
        opacity: 0,
        //height: 0,
        top: '-30px'
    });
}

function FadeIn(element, duration, timeout, heightAuto) {
    setTimeout(() => {
        $(element).animate({
            opacity: 1,
            top: 0,
            //height: $(element).data('height'),
        }, duration);
    }, timeout);
}

function StylizeSql(sql) {
    var newlineRegex = /(?<=.) (alter|backup|create|drop|from|having|select|distinct|where|order|limit|group)/ig;
    sql = sql.replace(newlineRegex, '\n$1')
    return sql;
}

function ShowSql(sql) {
    $('.sql-area').css({display: 'flex'});
    FadeIn('.CodeMirror', 500);
    FadeIn('.sql-area', 500, 100, true);
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

function AddConversation(text) {
    var newElement;
    $('#conversation').append(
        newElement = $('<div>').text(text)
    );
    Hide(newElement);
    FadeIn(newElement, 300);
    setTimeout(() => {
        $('#conversation').animate({
            scrollTop: $('#conversation')[0].scrollHeight
        }, 100);
    }, 1);
}

var hideOptions = true;

function ShowHideAdvancedOptions() {
    advOptions = $('#adv-options');
    advOptions.css({display: hideOptions ? 'flex' : 'none'});
    hideOptions = !hideOptions;
}