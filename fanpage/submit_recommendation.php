<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recommendation = trim($_POST['recommendation']);
    if (!empty($recommendation)) {
        $file = 'recommendations.txt';
        file_put_contents($file, $recommendation . "\n", FILE_APPEND);
    }
}

header('Location: index.html');
exit();
?>
