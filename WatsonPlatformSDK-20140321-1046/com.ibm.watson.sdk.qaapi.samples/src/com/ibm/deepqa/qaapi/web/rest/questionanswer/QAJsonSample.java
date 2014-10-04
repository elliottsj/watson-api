/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2013                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.deepqa.qaapi.web.rest.questionanswer;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.Properties;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import org.apache.wink.client.ClientConfig;
import org.apache.wink.client.ClientResponse;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;
import org.apache.wink.json4j.JSONException;
import org.apache.wink.json4j.JSONObject;
import org.apache.wink.json4j.JSONArray;


import com.ibm.deepqa.qaapi.rest.ext.wink.WinkJsonProvider;

/**
 * Question and Answer API Sample code for a JSON request
 * 
 * @author Kevin Haverlock
 *
 */
public class QAJsonSample {
	
    static String copyright() { return "\n\nLicensed Materials - Property of IBM\n" +
    "(C) Copyright IBM Corp. 2001, 2013. All Rights Reserved.\n" +
    "US Government Users Restricted Rights - Use, duplication or " +
    "disclosure restricted by GSA ADP Schedule Contract with IBM Corp.\n\n"; }
  
    // Various response states. 
    private static final String STATE_ACCEPTED  = "Accepted";  
    private static final String STATE_COMPLETE  = "Complete";
    private static final String STATE_ERROR     = "Error";
    
    /**
     * 
     * This code will walk through the various steps to POST a question and poll for the answer until a 
     * final answer response is returned from DeepQA. We will also explore output contained in the final answer.
     * 
     * At a high level, we are building up a JSON request and posting it to the QA API using the Apache Wink 
     * JAXRS client.  Once posted, we examine the return results to ensure that it was posted correctly and
     * pull the 'link' attribute that will provide us the URL to ask for the answer response. The link 
     * information will contain the generated question ID that uniquely identifies the question and a link to the
     * URL of where the answer can be retrieved.
     * 
     * The answer may take some time to process so we set up a polling loop back to the server using URL provided 
     * in the 'link'. The response will contain a status entry which we will use to tell us when the 
     * final answer has been provided or if an error occurred. 
     *  
     * @throws InterruptedException 
     * @throws JSONException 
     * 
     */
    public static void main(String args[]) throws InterruptedException, JSONException {
    	
    	// load the properties file containing the configuration information
    	Properties prop = new Properties();
    	
        try { 
        	prop.load(new FileInputStream(new File("qapi.properties")));        	
		} catch (FileNotFoundException e) {
			System.out.println("Properties file was not found");
			System.exit(1);
		} catch (IOException e) {
			System.out.println("Error loading properties file");
			System.exit(1);
		}
        
        // URL of the Q/A API for submitting questions
        String QUESTION_POST_URL = prop.getProperty("server");
        
        System.out.println("Watson endpoint URL in 'qapi.properties' file is configured to :" + QUESTION_POST_URL);
    	        
        // Initialize the Apache JAXRS REST Client 
        RestClient restClient = QAJsonSample.initRestClient();        

        //
        // Create a question.
        // We are going to use IBM's JSON4J to build a JSON Object. To do that, we will start with a 
        // collection.  
        //
        @SuppressWarnings("serial")
		final HashMap<String, String> evidenceRequest = new HashMap<String, String>() {
        {
            put("items","4");        // The top 5 answers will return 4 passages      
            put("profile","yes");    // Those passages will contain feature support information 
        }};
        
        // create the question portion
        @SuppressWarnings("serial")
		HashMap<String, Object> question_info = new HashMap<String, Object>() {{
            put("category", "Lotus");
            put("lat", "Software");
            put("questionText", "How do I uninstall Lotus Notes?");   
            put("context", "Software");
            put("items", "6");
            put("evidenceRequest",evidenceRequest);   
        }};
        
           
        // given the collection we created above, serialize it into a JSON object
        JSONObject question = new JSONObject().put("question",question_info);

        // construct a resource using the REST Client. The URL is the URL of the QA API
        Resource resource = restClient.resource(QUESTION_POST_URL);        
        
        // post the question to the Q/A API 
        ClientResponse response = resource.accept(MediaType.APPLICATION_JSON)      // Accept : application/json
                                          .contentType(MediaType.APPLICATION_JSON) // Content-Type : application/json
                                          .post(question.toString());              // HTTP POST
        
        // check HTTP response code
        if (response.getStatusType() != javax.ws.rs.core.Response.Status.CREATED) {
           System.out.println("HTTP Response code returned an error: "+response.getStatusCode());
           System.exit(1);
        }
        
        //
        //  If we were successful, our JSON response will look something like this:
        //
        // {
        //  "question": 
        //   {
        //     "links": {
        //         "self": "http://localhost:8080/deepqa/v1/question/1966410",
        //         "feedback": "http://localhost:8080/deepqa/v1/question/1966410/feedback"
        //     },
        //     "id": 1966410,
        //     "lat": "Software",
        //     "category": "Lotus",
        //     "questionText": "How do I uninstall Lotus Notes?",
        //     "status": "Accepted",
        //     "evidenceRequest": {
        //         "items": 1,
        //         "profile": "yes"
        //     }
        //   }
        // }
        //     
        //
        //  If you notice, we don't have an answer yet, just an acknowledgement the question was 
        //  accepted.
        //         
        
        // marshal the entity response from the POST into a JSON Object that we can process
        JSONObject payloadResponse = response.getEntity(JSONObject.class); 
        
        // pull the question from the JSON Object
        JSONObject questionResponse = payloadResponse.getJSONObject("question");

        // At this point we have acknowledgement that a question has been submitted to DeepQA. As part of the
        // response, we've gotten a link to where we can retrieve the answer once processing has completed.
        // The URL contains a unique id which we will need to use to retrieve the answer.
        //
        // NOTE: once you have the 'self' URL, you can retrieve the answer again without having to resubmit the question.  Though
        // consult the retention policy for how long answers remain cached.
        String self = questionResponse.getJSONObject("links").getString("self");

        // We can also see that the question was Accepted if the 'status' is queued. Other possible values include ERROR       
        String status = questionResponse.getString("status");
        
        // Test if the status wasn't accepted. 'Accepted' state indicates the question has been accepted for 
        // processing
        if (!status.equals(STATE_ACCEPTED)) {
            System.out.println("An error occurred during the question submission (consult the DeepQA Logs): "+status);
            System.exit(1);
        }
        
        
        JSONObject answerPayload = null;  // Answer response as a JSON object      
       
        // At this point, we have submitted the question and just need to ask until an answer is given to the question.  Here we poll until 
        // the status field, which is a field returned in the answer response is 'Complete'. If the the answer response is 'Queued' then we know that
        // DeepQA is still processing the question. The status condition may change to 'Error' if a timeout occurs or some other error condition occurs
        // while processing the question.
        while (!status.equals(STATE_COMPLETE))  {
            
            // create a URL request to retrieve the answer. The URL of where to retrieve the answer was provided in the response when we 
            // submitted the question
            ClientResponse answerResponse =  restClient.resource(self).accept(MediaType.APPLICATION_JSON).get(); 
            
            // check the HTTP response code
            if (answerResponse.getStatusType() != javax.ws.rs.core.Response.Status.OK) {
                System.out.println("HTTP Response code returned an error: "+answerResponse.getStatusCode());
                System.exit(1);                
            }            
            
            // get the answer payload. This contains DeepQA's response to the question
            answerPayload = answerResponse.getEntity(JSONObject.class);      
            
            // retrieve the status
            status = answerPayload.getJSONObject("question").getString("status");
            
            // check if the status turned into an Error. This might occur if there was a timeout.  Normally the status will be 
            // Queued
            if (status.equals(STATE_ERROR)) {
                System.out.println("An error occurred while trying to answer the question. (consult the DeepQA Logs): "+status);
                System.exit(1);
            }
                                   
            System.out.println("Polling for status.  The Current answer Status is :"+status);
                       
            // poll every five seconds
            Thread.sleep(5000);
        }
        
        // Here we have gotten an answer back and we are going to display some results               
        JSONObject answer = answerPayload.getJSONObject("question");
        
        System.out.println("------------ Portions of the Answer Payload shown as an example ------------------");

        
        //display various Example answer values
        System.out.println("status :"+answer.getString("status"));
        System.out.println("questionText :"+answer.getString("questionText"));
        
        //loop through the answers displaying some information
        JSONArray answers = answer.getJSONArray("answers");
        for (int i=0;i < answers.size();i++ ) {
            System.out.println("answer id         :"+answers.getJSONObject(i).getString("id"));
            System.out.println("    answer text       :"+answers.getJSONObject(i).getString("text")); 
            System.out.println("    answer confidence :"+answers.getJSONObject(i).getString("confidence"));            
        }
        
        //loop through the answers displaying some information
        JSONArray errors = answer.getJSONArray("errorNotifications");
        for (int i=0;i < errors.size();i++ ) {
            System.out.println("error component id         :"+errors.getJSONObject(i).getString("id"));
            System.out.println("    error text       :"+errors.getJSONObject(i).getString("text")); 
        }
        
        System.out.println("--------------------- Complete Answer Response Payload -----------------------------");
        System.out.println(answerPayload.toString());
        
    }
    
    
    private static RestClient initRestClient() {
        ClientConfig conf = new ClientConfig();
        conf.setLoadWinkApplications(false);
        conf.readTimeout(3000000);
        /*
         * Need to set the Providers for the RestClient so that it includes the WinkJsonProvider. This is to avoid any
         * of the following things at the moment: 1. Having to put the wink config file in the classpath using
         * wink-application name 2. Having to create a SimpleWinkApplication and referring to our tools.config file that
         * the RestServlet uses.
         * 
         * Without this providers, tests that are trying to get response entities as JSONObjects will fail because of
         * not having a JSON provider registered.
         */
        conf.applications(new Application() {

            protected Set<Class<?>> classes = null;

            @Override
            public Set<Class<?>> getClasses() {
                if (classes == null) {
                    classes = new HashSet<Class<?>>(Arrays.asList(new Class<?>[] {
                            WinkJsonProvider.class
                    }));
                }
                return classes;
            }
        });
        return new RestClient(conf);
    }

}
