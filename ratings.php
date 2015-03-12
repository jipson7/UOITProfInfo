<?php

$fullName = $_GET["profname"];

$pythonStatement = "python getRatings.py \"" . $fullName . "\"";

$dataFeed = exec($pythonStatement);

$dataList = preg_split('[\s]', $dataFeed);

$dataJSON = json_encode($dataList);

echo $dataJSON;

?>
