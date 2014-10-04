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

if (!function_exists('curl_init'))
  throw new Exception('PHP does not have CURL support');

if (!function_exists('json_decode'))
  throw new Exception('PHP does not have JSON support');

/**
 * The Watson class encapsulates services available for Watson.
 *
 * @package watson
 * 
 **/
class Watson {
   var $requrl;


  /**
   * Constructor consisting of the URL as a parameter to available REST services
   *
   * @param string $url
   * 
   **/
   function Watson($url) {
      $this->requrl = $url;
   }

   /**
    * Ask a question to the Watson Question and Answer service.
    * The $args array needs to contain 'questionText' key. The value of the key is the text of the question.    
    *
    * @param  array  $args 
    * @return json array object 
    **/  
   protected function do_ask_question($args) {

      $default = array('answers' => 5,
		       'evidence' => 5);

      $args = array_merge($default, $args);

      if (!$args['questionText'])
	 throw new Exception("Question Text must be specified");

      $ch = curl_init($this->requrl);

      if (!$ch)
	throw new Exception("Failure in CURL_INIT");

      $arr = array("items" => $args['answers'],
		   "questionText" => $args['questionText'],
		   "evidenceRequest" => array('items' => $args[evidence],
					      'profile' => 'no'));
      
      $encoded = json_encode(array('question' => $arr));

      $options = array(
	CURLOPT_HTTPHEADER => array('Content-type: application/json', 'Accept: application/json'),
	CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
	CURLOPT_POSTFIELDS => $encoded,
       );

      if (!curl_setopt_array($ch, $options))
	throw new Exception("Failure in CURL_SETOPT: " . curl_error($ch));

      $result = curl_exec($ch);

      if (!$result)
	throw new Exception("Failure in CURL_EXEC: " . curl_error($ch));

      curl_close($ch);

      $array = json_decode($result, true);

      

      $q = $array['question'];
      if (!$q)
	 throw new Exception("No Result");

      $status = $q['status'];
      if ($status != 'Accepted')
	 throw new Exception("Question not accepted");

      $ch = curl_init($q['links']['self']);
      $options = array(
	CURLOPT_HTTPHEADER => array('Content-type: application/json', 'Accept: application/json'),
        CURLOPT_RETURNTRANSFER => TRUE,
	CURLOPT_VERBOSE => TRUE,
      );

      if (!curl_setopt_array($ch, $options))
         throw new Exception("Failure in CURL_SETOPT2: " . curl_error($ch));

      while (true) {
	 $result = curl_exec($ch);
	 if (!$result)
	    throw new Exception("Failure in CURL_EXEC2: " . curl_error($ch));

	 $array = json_decode($result, true);
	 $q = $array['question'];

	 $status = $q['status'];

	 if ($status == 'Queued') {
	    usleep(500);
	    continue;
	 } else if ($status == 'Complete')
	    break;
	 else {
	    throw new Exception("Error retrieval: " . $status);
	 }
      };

      curl_close($ch);

      return $q;
   }

   /** 
    * API service function for Watson class.  The API service takes as a parameter the name of the service
    * to invoke and the required parameters as an array.
    *
    * API services supported:
    *    'ask' - submit a question to Watson.   
    *            example: api('ask', array('questionText' => "Who is the president of the United States?"));
    *
    * @param  string  $req 
    * @return json array object 
    **/    
   function api($req, $args = array()) {
      switch ($req) {
	 case "ask":
	    return $this->do_ask_question($args);
	 default:
	    throw new Exception("Unknown Watson API: " . $req);
      }
   }
}

?>


