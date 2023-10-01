<?php

if (!isset($_POST['query'])) die('No query');

$user = 'user';
$pass = 'pass';
$database = 'hackyeah';
$host = 'db';
$port = '3306';

$query = $_POST['query'];
if (empty($query)) die('<div class="error">Empty query</div>');

$pdo;
try {
    $pdo = new PDO('mysql:host='.$host.';port='.$port.';dbname='.$database, $user, $pass);
} catch (PDOException $exception) {
    die('<div class="error">Cannot connect to database</div>');
}

try {
    $stmt = $pdo->query($_POST['query']);
    $first = true;
    echo '<table>';
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($first) {
            echo '<thead>';
            foreach ($row as $key => $value) {
                echo '<th>'.$key.'</th>';
            }
            echo '</thead>';
            $first = false;
        }
        echo '<tr>';
        foreach ($row as $key => $value) {
            echo '<td>'.$value.'</td>';
        }
        echo '</tr>';
    }
    echo '</table>';
} catch (Exception $exception) {
    echo '<div class="error">Incorrect query</div>';
}

?>