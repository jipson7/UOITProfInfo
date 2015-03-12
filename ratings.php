<?php

$fullName = $_POST["profname"];

$pythonStatement = "python getRatings.py \"" . $fullName . "\"";

$dataFeed = exec($pythonStatement);

echo $dataFeed;

?>
