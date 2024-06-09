<?php
$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];

$db = new SQLite3('../db/tasks.db');
$stmt = $db->prepare('INSERT INTO tasks (title) VALUES (:title)');
$stmt->bindValue(':title', $title, SQLITE3_TEXT);
$stmt->execute();

echo json_encode(['status' => 'success']);
?>
