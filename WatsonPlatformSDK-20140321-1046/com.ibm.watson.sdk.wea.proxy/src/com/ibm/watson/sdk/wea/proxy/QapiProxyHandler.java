/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2013                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.watson.sdk.wea.proxy;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Properties;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.wink.json4j.JSONException;
import org.apache.wink.json4j.JSONObject;


/**
 * Proxy for use with the QAAPI.  The proxy is for use with clients that require handling of cross domain scripting where by the 
 * client is attempting to access a server from which the client did not orginate from.  As an example, the user is developing using 
 * Tomcat, but attempting to access a Watson server on a different domain.
 * 
 * The Proxy takes into account URL content which the QAAPI uses and substitutes a new URL which passes through the proxy.  
 * 
 * To configure the proxy, you will need to specify in the config.properties the Watson service which is handling QAAPI calls and 
 * the local host of the proxy.
 *  
 * @author Kevin Haverlock
 *
 */
@Path("/weaQuestion")
public class QapiProxyHandler {

	final static String PATH_QID_PARAMETER    = "qid";	
	
	private static String restServerURL       = null;  // Watson server endpoint
	private static String proxyServerURL      = null;  // Proxy server endpoint
	private DefaultHttpClient client          = new DefaultHttpClient();
	
	static {

		//
		// Load the properties information for the proxy
		//
		Properties p = new Properties();
		try {
			// load the configuration properties file
			p.load(QapiProxyHandler.class.getClassLoader().getResourceAsStream("../config.properties"));
			
			restServerURL = p.getProperty("qapiServerUrl");
			
			// if proxy server url is present, use that, otherwise fallback to the Watson rest server URL.  
			// This may potentially cause problems for the client if they use the URL since it references across domains. 
			proxyServerURL = p.getProperty("proxyServerUrl") == null ? restServerURL : p.getProperty("proxyServerUrl");			
			
			System.out.println("Watson Server URL is configured too : "+restServerURL);
			System.out.println("Proxy Server URL is configured too  : "+proxyServerURL);
			
			
			if ((restServerURL == null) || restServerURL.isEmpty()){
				System.err.println("ERROR qapiServerUrl is not set by the WEA properties file -- cannot forward submitted questions");
			}
		}
		catch (Exception e){
			System.err.println("WARNING failed to parse qapiTimeout property" + e);
	    }
	}

	
	public QapiProxyHandler(){
	}
	/**
	 * Handle the get request.  Typically, this is for use with the Asynch mode of the QAAPI
	 * 	 
	 * @param  qid The question id
	 * @return Response The answer response
	 */
	@GET 
	@Path("{"+PATH_QID_PARAMETER+"}")
	@Produces({MediaType.APPLICATION_JSON })
	public Response getAnswer(@PathParam(PATH_QID_PARAMETER) String qid) {
		
		// set up the GET request for the question
		HttpGet get = new HttpGet(restServerURL + qid);
		
		try {
			// execute the request
			HttpResponse GETresponse = client.execute(get);	
			
			String normalizedContent = substituteProxyURL(GETresponse.getEntity().getContent());
			
			// return whatever we got back in the get response
			return Response.status(GETresponse.getStatusLine().getStatusCode()).header("Pragma", "no-cache")
				.header("Cache-Control", "no-cache")
				.entity( normalizedContent ).build();
		} catch (Exception e) {			
			// generic error condition
			return Response.status(Response.Status.BAD_REQUEST).header("Pragma", "no-cache")
					.header("Cache-Control", "no-cache")
					.entity("{\"error\" : \"The server returned the following:  "+e.getMessage()+"\"}").build();			
		}
	}


	/**
	 * Handle the POST request for the QAAPI.  This is either going to be an Asynch or Synch post.  Which will depend on
	 * the HTTP Header setting.  For Synch, the X-SyncTimeout is provided by the client.  Recall, by including the X-SyncTimeout, the client
	 * will wait for the final answer response from Watson vs Asynch where Watson returns immediately with a link to where to retrieve the answer.  
	 * 
	 * @param  headers HTTP Headers passed in from the client
	 * @return Response The response to send back to the client
	 * 
	 */
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces( {MediaType.APPLICATION_JSON })
	public Response askQuestion(String requestText, @Context HttpHeaders headers) {			

		// set up the POST request for the question
		HttpPost post = new HttpPost(restServerURL);

		StringEntity ent;
		try {
			ent = new StringEntity(requestText);
			ent.setContentType(MediaType.APPLICATION_JSON);
			post.setEntity(ent);					
		
			MultivaluedMap<String, String> headerMap = headers.getRequestHeaders();
			
			// copy the HTTP Headers which came over from the client
			for ( String key : headerMap.keySet() ) {
				// skip the Content-Length and Content-Type since it is already set by the post entity
				if (!key.toUpperCase().equals("CONTENT-LENGTH") && !key.toUpperCase().equals("CONTENT-TYPE")) {				   
			       post.addHeader(key,headerMap.get(key).get(0));
				} 
			}	
			
			// dump what we are posting to Watson
			System.out.println("Watson Service Endpoint: "+post.getURI().toURL());
			System.out.println("HTTP Headers:");
			Header[] post_headers = post.getAllHeaders();
			for (int l=0;l<post_headers.length;l++) {
				System.out.println("     "+post_headers[l].getName()+" : "+post_headers[l].getValue());				
			}			
			System.out.println(requestText);
						
					
			// execute the request
			HttpResponse POSTresponse = client.execute(post);
			
			// remap URLs that are contained in the payload returned by Watson if necessary. Generally, this shouldn't be 
			// needed.
			String normalizedContent = substituteProxyURL(POSTresponse.getEntity().getContent());

			// all is good return the data from the server
			return Response.status(POSTresponse.getStatusLine().getStatusCode()).header("Pragma", "no-cache")
					.header("Cache-Control", "no-cache")
					.entity( normalizedContent ).build();
			
		} catch (Exception e) {
			
			// generic error condition
			return Response.status(Response.Status.BAD_REQUEST).header("Pragma", "no-cache")
					.header("Cache-Control", "no-cache")
					.entity("{\"error\" : \"The server returned the following:  "+e.getCause()+"\"}").build();			
		}
	}
	
	
	/**
	 * Handle the POST request for the widgets.  The widgets use form encoding which we map to the QAAPI call. 
	 * 
	 * @param  headers HTTP Headers passed in from the client
	 * @return formData The form data sent from the client
	 * 
	 */
	@POST
	@Path("/sync")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED})
	@Produces( {MediaType.APPLICATION_JSON })
	public Response postAnswer(final MultivaluedMap<String, String> formData, @Context HttpHeaders headers) throws UnsupportedEncodingException {

        // check if there is a question present  
		if (formData.containsKey("question")) {

			final String formatted_question = StringEscapeUtils.escapeJava(URLDecoder.decode(formData.getFirst("question"),"UTF-8"));

			//build hashmap for the evidence request
			//
			final HashMap<String, String> evidenceRequest = new HashMap<String, String>() {
				private static final long serialVersionUID = 1L;
				{
					put("items",formData.getFirst("numberEvidence"));
					put("profile","yes");
				}};

				//build hashmap containing the question values
				//
				final HashMap<String, Object> question_info = new HashMap<String, Object>() {
					private static final long serialVersionUID = 1L;
					{
						put("questionText",formatted_question);			
						put("items",formData.getFirst("numberAnswers"));
						put("evidenceRequest",evidenceRequest);
					}};

					try {
						JSONObject question = new JSONObject().put("question",question_info);

						// call the method we would normally use to POST a question since we have done
						// all the hard work of formatting it.
						return this.askQuestion(question.toString(), headers);			

					} catch (JSONException e) {
						// generic error condition
						return Response.status(Response.Status.BAD_REQUEST).header("Pragma", "no-cache")
								.header("Cache-Control", "no-cache")
								.entity("{\"error\" : \"The server returned the following:  "+e.getMessage()+"\"}").build();
					}
		} else {
			// mininmal required parameters in the POST are missing
			return Response.status(Response.Status.BAD_REQUEST).header("Pragma", "no-cache")
					.header("Cache-Control", "no-cache")
					.entity("{\"error\" : \"The server returned the following:  required POST parameters are missing. \"}").build();				
		}
	}

		

	/**
	 * Replace the URL of the Watson server with the URL of the proxy
	 * 
	 * @param content InputStream from an entity response
	 * @return String with the URL of the proxy replacing the URL of the server
	 */
	private String substituteProxyURL(InputStream content) throws IOException{
		
		BufferedReader r = new BufferedReader(new InputStreamReader(content));
		StringBuilder  s = new StringBuilder();
		String l = null;
		
		try {
			while ((l = r.readLine()) != null) {
				// replace the server URL returned from Watson with our Proxy URL							
				s.append(l.replace(restServerURL, proxyServerURL));
			}
		} finally {
			content.close();
		}
		
		return s.toString();
	}
}
