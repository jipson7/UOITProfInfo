<?php

//$firstName = "randy";

//$lastName = "fortier";

$fullName = "randy fortier";

$pythonStatement = "python getRatings.py \"" . $fullName . "\"";

$result = exec($pythonStatement);

echo $result;

?>
