/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2014                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.deepqa.qaapi.web.rest.questionanswer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import org.apache.wink.client.ClientConfig;
import org.apache.wink.client.ClientResponse;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;
import org.apache.wink.json4j.JSONArray;
import org.apache.wink.json4j.JSONException;
import org.apache.wink.json4j.JSONObject;

import com.ibm.deepqa.qaapi.rest.ext.wink.WinkJsonProvider;

public class QASyncJsonSample {
	
    static String copyright() { return "\n\nLicensed Materials - Property of IBM\n" +
    "(C) Copyright IBM Corp. 2001, 2014. All Rights Reserved.\n" +
    "US Government Users Restricted Rights - Use, duplication or " +
    "disclosure restricted by GSA ADP Schedule Contract with IBM Corp.\n\n"; }
     
    // Question complete response status
    private static final String STATE_COMPLETE  = "Complete";
    

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
        RestClient restClient = QASyncJsonSample.initRestClient();        

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
        
        ClientResponse response = null;
        
        // HTTP header that designates the REST service to be synchronous
        resource.header("X-SyncTimeout", "-1");
        
        // post the question to the Q/A API 
        try{
            response = resource.accept(MediaType.APPLICATION_JSON)      // Accept : application/json
                                              .contentType(MediaType.APPLICATION_JSON) // Content-Type : application/json
                                              .post(question.toString());              // HTTP POST
        
            // check HTTP response code
            if (response.getStatusType() != javax.ws.rs.core.Response.Status.OK) {            
               System.out.println("HTTP Response code returned an error: "+response.getStatusCode());
               System.exit(1);
            }
        }
        catch(Exception e){
            System.out.println("Unable to connect to server on " + QUESTION_POST_URL);
            System.exit(1);
        }        
        
        // marshal the entity response from the POST into a JSON Object that we can process
        JSONObject payloadResponse = response.getEntity(JSONObject.class); 
        
        // pull the question from the JSON Object
        JSONObject questionResponse = payloadResponse.getJSONObject("question");

        // We can also see that the question was Accepted if the 'status' is queued. Other possible values include ERROR       
        String status = questionResponse.getString("status");
    
        if (status.equals(STATE_COMPLETE))  {            
            // Here we have gotten an answer back and we are going to display some results                          
            System.out.println("------------ Portions of the Answer Payload shown as an example ------------------");

            
            //display various Example answer values
            System.out.println("status :"+questionResponse.getString("status"));
            System.out.println("questionText :"+questionResponse.getString("questionText"));
            
            //loop through the answers displaying some information
            JSONArray answers = questionResponse.getJSONArray("answers");
            for (int i=0;i < answers.size();i++ ) {
                System.out.println("answer id         :"+answers.getJSONObject(i).getString("id"));
                System.out.println("    answer text       :"+answers.getJSONObject(i).getString("text")); 
                System.out.println("    answer confidence :"+answers.getJSONObject(i).getString("confidence"));            
            }
            
            //loop through the answers displaying some information
            JSONArray errors = questionResponse.getJSONArray("errorNotifications");
            for (int i=0;i < errors.size();i++ ) {
                System.out.println("error component id         :"+errors.getJSONObject(i).getString("id"));
                System.out.println("    error text       :"+errors.getJSONObject(i).getString("text")); 
            }
            
            System.out.println("--------------------- Complete Answer Response Payload -----------------------------");
            System.out.println(questionResponse.toString());
   
        } else {
        	// Question failed or timed out
        	System.out.println("Question response returned status: "+status);
            System.exit(1);
        }
                
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
