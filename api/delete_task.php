<?php
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$db = new SQLite3('../db/tasks.db');
$stmt = $db->prepare('DELETE FROM tasks WHERE id = :id');
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
$stmt->execute();

echo json_encode(['status' => 'success']);
?>