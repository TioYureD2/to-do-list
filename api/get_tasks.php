<?php
$db = new SQLite3('../db/tasks.db');
$result = $db->query('SELECT * FROM tasks');

$tasks = [];
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $tasks[] = $row;
}

echo json_encode($tasks);
?>
