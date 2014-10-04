
<?php

/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2012                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

require 'libs/watson.php';

$questionText = $_GET["question"];
$server = $_GET["server"];

/* calculate start time */
$time_start = time();

/* create a Watson class which will be used to handle service processing */
$watson = new Watson($server);

/* use the api service to ask a question of Watson */
$result = $watson->api("ask", array('questionText' => $questionText));

/* process the results */
foreach ($result['answers'] as $answer) {
   echo 'An answer is: ' . $answer['text'] . ' with confidence ' . $answer['confidence'] . '<br/><br/>';
}

/* display the processing end time */
$time_end = time();
echo " " . "<br/> Answer retrieved in " . ($time_end - $time_start) . " seconds."; 

?>
