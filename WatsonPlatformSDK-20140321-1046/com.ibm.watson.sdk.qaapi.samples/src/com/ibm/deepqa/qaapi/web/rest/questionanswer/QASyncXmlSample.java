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

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.ws.rs.core.MediaType;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.wink.client.ClientConfig;
import org.apache.wink.client.ClientResponse;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * Question and Answer Synchronous API Sample code for a XML request
 *
 */
public class QASyncXmlSample {
	
    static String copyright() { return "\n\nLicensed Materials - Property of IBM\n" +
    "(C) Copyright IBM Corp. 2001, 2014. All Rights Reserved.\n" +
    "US Government Users Restricted Rights - Use, duplication or " +
    "disclosure restricted by GSA ADP Schedule Contract with IBM Corp.\n\n"; }
     
    // Question complete response status
    private static final String STATE_COMPLETE  = "Complete";
        

    public static void main(String args[]) throws InterruptedException, ParserConfigurationException, UnsupportedEncodingException, 
                                                  SAXException, IOException, XPathExpressionException {
        
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
    	
        // XML Question String
        String xml_question_string =  "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>" +
                  "<question xmlns=\"http://www.ibm.com/xmlns/deepqa/question\">" +
                    "<category>Lotus</category>" +
                    "<context>Software context</context>" +
                    "<evidenceRequest profile=\"YES\" items=\"3\"/>" +
                    "<items>3</items>" +
                    "<questionText>Who was the first president of the united states?</questionText>" +
                  "</question>";    
               
                
        // Initialize the Apache JAXRS REST Client 
        RestClient restClient = QASyncXmlSample.initRestClient(); 
        
        // Construct a resource using the REST Client. The URL is the URL of the QA API
        Resource questionResource = restClient.resource(QUESTION_POST_URL);  
        
        // HTTP header that designates the REST service to be synchronous
        questionResource.header("X-SyncTimeout", "-1");
        
        // Post the question to the Q/A API 
        ClientResponse questionResponse = questionResource.accept(MediaType.APPLICATION_XML)      // Accept : application/xml
                                                          .contentType(MediaType.APPLICATION_XML) // Content-Type : application/xml
                                                          .post(xml_question_string);              // HTTP POST
        
        // Check HTTP response code
        if (questionResponse.getStatusType() == javax.ws.rs.core.Response.Status.OK) {
            // Get the XML Data that was returned
            String xmlQuestionResponse = questionResponse.getEntity(String.class);

            // Create our support XML classes so we can parse the XML data
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);

            DocumentBuilder builder = factory.newDocumentBuilder();
        
            // Parse the XML data returned in the response
            Document doc = builder.parse(new InputSource(new ByteArrayInputStream(xmlQuestionResponse.getBytes("utf-8"))));   

            XPathFactory xPathfactory = XPathFactory.newInstance();
            XPath xpath = xPathfactory.newXPath();
          
            // Get the completion status
            XPathExpression expr = xpath.compile("/question/status/text()"); 
            String status = (String) expr.evaluate(doc, XPathConstants.STRING); 
            
            // Check completion status to determine if response contains answer(s)
            if (status.equals(STATE_COMPLETE)) {        
                // At this point, we now have the XML data returned which contains the answer and can precede to use XPath 
            	// (or other XML technology) to parse the XML data and extract the answer contents.
                System.out.println("--------------------- Complete Answer Response Payload -----------------------------");
                System.out.println(xmlQuestionResponse);
            } else {
            	// Question failed or timed out
            	System.out.println("Question response returned status: "+status);
                System.exit(1);
            }
        } else {
            System.out.println("HTTP Response code returned an error: "+questionResponse.getStatusCode());
            System.exit(1);   
        }
    }
    
    //
    // private method that initializes a JAXRS Client 
    //
    private static RestClient initRestClient() {
        ClientConfig conf = new ClientConfig();
        conf.setLoadWinkApplications(false);
        conf.readTimeout(3000000);

        return new RestClient(conf);
    }

}
