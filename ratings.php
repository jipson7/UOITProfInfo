<?php

$fullName = $_GET["profname"];

$pythonStatement = "python getRatings.py \"" . $fullName . "\"";

$dataFeed = exec($pythonStatement);

echo $dataFeed;

?>
