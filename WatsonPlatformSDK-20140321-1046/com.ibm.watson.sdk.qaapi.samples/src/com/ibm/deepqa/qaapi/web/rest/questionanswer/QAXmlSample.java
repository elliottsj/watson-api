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
 * Question and Answer API Sample code for a XML request
 * 
 * @author Kevin Haverlock
 *
 */
public class QAXmlSample {
	
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
     * At a high level, we start with an XML string that represents a question and POST it to the QA API using the Apache Wink 
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
     * @throws ParserConfigurationException 
     * @throws IOException 
     * @throws SAXException 
     * @throws UnsupportedEncodingException 
     * @throws XPathExpressionException 
     * 
     */
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
                    "<questionText>Where is the University of North Carolina located?</questionText>" +
                  "</question>";    
               
                
        // Initialize the Apache JAXRS REST Client 
        RestClient restClient = QAXmlSample.initRestClient(); 
        
        // construct a resource using the REST Client. The URL is the URL of the QA API
        Resource questionResource = restClient.resource(QUESTION_POST_URL);  
        
        // post the question to the Q/A API 
        ClientResponse questionResponse = questionResource.accept(MediaType.APPLICATION_XML)      // Accept : application/xml
                                                          .contentType(MediaType.APPLICATION_XML) // Content-Type : application/xml
                                                          .post(xml_question_string);              // HTTP POST
        
        // check HTTP response code
        if (questionResponse.getStatusType() != javax.ws.rs.core.Response.Status.CREATED) {       
           System.out.println("HTTP Response code returned an error: "+questionResponse.getStatusCode());
           System.exit(1);
        }

        // Get the XML Data that was returned
        String xmlQuestionResponse = questionResponse.getEntity(String.class);

        // create our support XML classes so we can parse the XML data
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);

        DocumentBuilder builder = factory.newDocumentBuilder();
        
        // parse the XML data returned in the response
        Document doc = builder.parse(new InputSource(new ByteArrayInputStream(xmlQuestionResponse.getBytes("utf-8"))));   

        XPathFactory xPathfactory = XPathFactory.newInstance();
        XPath xpath = xPathfactory.newXPath();

        XPathExpression expr = null;
               
        // We can also see that the question was Accepted if the 'status' is queued. Other possible values include Error       
        expr = xpath.compile("/question/status/text()"); 
        String status = (String) expr.evaluate(doc, XPathConstants.STRING); 
                
        // Test if the status was not accepted. 'Accepted' state indicates the question has been accepted for 
        // processing
        if (!status.equals(STATE_ACCEPTED)) {
            System.out.println("An error occurred during the question submission (consult the DeepQA Logs): "+status);
            System.exit(1);
        }
       
        // identify the url contained in the link section which refers to "self". This will contain the URL link to where we need to retrieve 
        // the answer from.  The link payload in XML looks similar too:
        //
        //    <link href="http://localhost:8080/deepqa/v1/question/1966405/feedback" rel="feedback"/>
        //    <link href="http://localhost:8080/deepqa/v1/question/1966405" rel="self"/> 
        //
        expr = xpath.compile("/question/link[1]/@rel");
        Object rel1 = expr.evaluate(doc, XPathConstants.STRING);
              
                          
        // figure out which is "self" 
        String self = null;
        if (rel1.equals("self") ) {
            expr = xpath.compile("/question/link[1]/@href");
            self = (String) expr.evaluate(doc, XPathConstants.STRING);
        } else {
            expr = xpath.compile("/question/link[2]/@href");
            self = (String) expr.evaluate(doc, XPathConstants.STRING);
        }
        
        String xmlAnswerResponseData = ""; 
        
        
        // At this point, we have submitted the question and just need to ask until an answer is given to the question.  Here we poll until 
        // the status field, which is a field returned in the answer response is 'Complete'. If the the answer response is 'Queued' then we know that
        // DeepQA is still processing the question. The status condition may change to 'Error' if a timeout occurs or some other error condition occurs
        // while processing the question.
        while (!status.equals(STATE_COMPLETE))  {
            
            // create a URL request to retrieve the answer. The URL of where to retrieve the answer was provided earlier in the response when we 
            // submitted the question
            ClientResponse answerResponse =  restClient.resource(self).accept(MediaType.APPLICATION_XML).get(); 
            
            // check the HTTP response code
            if (answerResponse.getStatusType() != javax.ws.rs.core.Response.Status.OK) {          
                System.out.println("HTTP Response code returned an error: "+answerResponse.getStatusCode());
                System.exit(1);                
            }     

            // get the answer payload. This contains DeepQA's response to the question
            xmlAnswerResponseData = answerResponse.getEntity(String.class);
            
            factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);

            builder = factory.newDocumentBuilder();
            doc = builder.parse(new InputSource(new ByteArrayInputStream(xmlAnswerResponseData.getBytes("utf-8"))));   

            xPathfactory = XPathFactory.newInstance();
            xpath = xPathfactory.newXPath();
            
            // status text is present           
            expr = xpath.compile("/question/status/text()"); 
            status = (String) expr.evaluate(doc, XPathConstants.STRING); 
            
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
        
        // At this point, we now have the XML data returned which contains the answer and can precede to use XPath (or other XML technology) to parse the XML data and
        // extract the answer contents.
        System.out.println("--------------------- Complete Answer Response Payload -----------------------------");
        System.out.println(xmlAnswerResponseData);
        
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
