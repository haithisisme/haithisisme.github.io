<?php
// Simple leaderboard storing scores in a file
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $score = intval($_POST['score']);
    $name = htmlspecialchars($_POST['name']);

    if ($score && $name) {
        $file = 'leaderboard.txt';
        file_put_contents($file, "$name - $score\n", FILE_APPEND);
    }
}

$scores = file_exists('leaderboard.txt') ? file_get_contents('leaderboard.txt') : '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Justin Bieber Memory Game Leaderboard</title>
</head>
<body>
    <h1>Leaderboard</h1>
    <pre><?php echo $scores; ?></pre>
</body>
</html>
