<?php

if (!isset($_POST['query'])) die('No query');

$user = 'user';
$pass = 'pass';
$database = 'database';
$host = '127.0.0.1';

$query = $_POST['query'];

$dbh = new PDO('mysql:host='.$host.';dbname='.$database, $user, $pass);

$stmt = $pdo->query("SELECT * FROM 'JPK_PODMIOT' LIMIT 30");
$first = true;
echo '<table>';
while ($row = $stmt->fetch()) {
    if ($first) {
        foreach ($row as $key => $value) {
            echo '<th>'.$key.'</th>';
        }
        $first = false;
    }
    echo '<tr>';
    foreach ($row as $key => $value) {
        echo '<td>'.$value.'</td>';
    }
    echo '</tr>';
}
echo '</table>';

?>