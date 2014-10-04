/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2013                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.deepqa.qaapi.rest.ext.wink;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import org.apache.wink.common.annotations.Asset;
import org.codehaus.jackson.jaxrs.JacksonJaxbJsonProvider;
import org.codehaus.jackson.map.AnnotationIntrospector;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;
import org.codehaus.jackson.map.introspect.JacksonAnnotationIntrospector;
import org.codehaus.jackson.xc.JaxbAnnotationIntrospector;

@Provider
@Consumes( {MediaType.APPLICATION_JSON, "text/json"})
@Produces( {MediaType.APPLICATION_JSON, "text/json"})
/**
 * This code is based on Wink's org.apache.wink.providers.jackson.WinkJacksonJaxbJsonProvider
 * 
 * Add the Jackson JSON provider to Wink
 */
public class WinkJsonProvider implements MessageBodyReader<Object>, MessageBodyWriter<Object> {
    //static String copyright() { return com.ibm.deepqa.legal.Copyright.IBM_COPYRIGHT; }

    JacksonJaxbJsonProvider jacksonProvider;

    @SuppressWarnings("deprecation")
	public WinkJsonProvider() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.getSerializationConfig().setSerializationInclusion(Inclusion.NON_NULL);
        AnnotationIntrospector pair =
            new AnnotationIntrospector.Pair(new JaxbAnnotationIntrospector(),
                                            new JacksonAnnotationIntrospector());
        mapper.getDeserializationConfig().setAnnotationIntrospector(pair);
        mapper.getSerializationConfig().setAnnotationIntrospector(pair);
        this.jacksonProvider = new JacksonJaxbJsonProvider();
        jacksonProvider.setMapper(mapper);
    }

    public long getSize(Object t,
                        Class<?> type,
                        Type genericType,
                        Annotation[] annotations,
                        MediaType mediaType) {
        return jacksonProvider.getSize(t, type, genericType, annotations, mediaType);
    }

    public boolean isWriteable(Class<?> type,
                               Type genericType,
                               Annotation[] annotations,
                               MediaType mediaType) {
        
        if( type.getAnnotation( Asset.class ) == null ){;
            return jacksonProvider.isWriteable(type, genericType, annotations, mediaType);
        }
        else{
            return false;
        }
    }

    public void writeTo(Object t,
                        Class<?> type,
                        Type genericType,
                        Annotation[] annotations,
                        MediaType mediaType,
                        MultivaluedMap<String, Object> httpHeaders,
                        OutputStream entityStream) throws IOException {
        jacksonProvider.writeTo(t,
                                type,
                                genericType,
                                annotations,
                                mediaType,
                                httpHeaders,
                                entityStream);
    }

    public boolean isReadable(Class<?> type,
                              Type genericType,
                              Annotation[] annotations,
                              MediaType mediaType) {
        return jacksonProvider.isReadable(type, genericType, annotations, mediaType);
    }

    public Object readFrom(Class<Object> type,
                           Type genericType,
                           Annotation[] annotations,
                           MediaType mediaType,
                           MultivaluedMap<String, String> httpHeaders,
                           InputStream entityStream) throws IOException {
        return jacksonProvider.readFrom(type,
                                        genericType,
                                        annotations,
                                        mediaType,
                                        httpHeaders,
                                        entityStream);
    }

}
