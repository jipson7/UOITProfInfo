<?php

$fullName = $_GET["profname"];

$id = $_GET["profid"];

$pythonStatement = "python getRatings.py \"" . $fullName . "\"";

$dataFeed = exec($pythonStatement);

echo $id . " " . $dataFeed;

?>
