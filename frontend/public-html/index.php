<?php

$lang = 'en';
$support_languages = array('pl', 'en');

if (isset($_GET['lang'])) {
    if (in_array($_GET['lang'], $support_languages)) {
        $lang = $_GET['lang'];
    }
}

include_once 'dictionary/'.$lang.'.php';

?>

<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet/less" type="text/css" href="styles/main.less"/>
    <link rel="stylesheet" href="libs/codemirror/6.65.7/theme/dracula.min.css">
    <link rel="stylesheet" href="libs/codemirror/6.65.7/theme/tomorrow-night-bright.min.css">
    <link rel="stylesheet" href="libs/codemirror/6.65.7/codemirror.min.css" />
    
    <script src="libs/jquery/jquery-3.7.1.min.js.js"></script>
    <script src="libs/less/less.js"></script>
    <script src="libs/codemirror/6.65.7/codemirror.min.js"></script>
    <script src="libs/codemirror/6.65.7/mode/sql/sql.min.js"></script>
    <script src="scripts/main.js"></script>
    <script src="scripts/code-mirror.js"></script>

    <title><?php echo $web_title; ?></title>
</head>
<body>
    <div class='flags'>
        <a href="?lang=pl"><img src="assets/pl.png" alt=""></a>
        <a href="?lang=en"><img src="assets/en.png" alt=""></a>
    </div>
    <h1><?php echo $title; ?></h1>
    <input type="text" id="text-input" placeholder="<?php echo $placeholder; ?>"/>
    <section class="sql-area">
        <div></div>
        <textarea id="sql-editor" cols="30" rows="6"></textarea>
        <div>
            <button><?php echo $button; ?></button>
        </div>
    </section>
    <section class="results"></section>
</body>
</html>