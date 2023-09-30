<!DOCTYPE html>
<html lang="en">
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

    <title>Talk to your data</title>
</head>
<body>
    <h1>Talk To Your Data</h1>
    <input type="text" id="text-input" placeholder="Enter your prompt here (e.g. Give me all users with age greater than 30)"/>
    <section class="sql-area">
        <div></div>
        <textarea id="sql-editor" cols="30" rows="6"></textarea>
        <div>
            <button>Run</button>
        </div>
    </section>
    <section class="results"></section>
</body>
</html>