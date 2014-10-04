/* ***************************************************************** */
/*                                                                   */
/* Licensed Materials - Property of IBM                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2013. All Rights Reserved.          */
/*                                                                   */
/* US Government Users Restricted Rights - Use, duplication or       */
/* disclosure restricted by GSA ADP Schedule Contract with IBM Corp. */
/*                                                                   */
/* ***************************************************************** */

define(["dojo/_base/declare", "dojo/text!./templates/Evidence.html",
        "dojo/topic", "dojo/_base/array", "dojo/_base/lang", 
        "dojo/dom-class",  "dijit/_Widget", "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin","dojo/_base/fx", "dojo/string","dijit/_Container", "dijit/layout/_LayoutWidget"],
    function (declare, template, topic, array,
        lang, domClass, _widget, _templateMixin, _widgetInTemplateMixin, fx, string, container, layoutWidget) {

	return declare("com.ibm.watson.ui.Evidence", [layoutWidget, _widget, _templateMixin, _widgetInTemplateMixin], {
		
		/**
    	  * The template for an Evidence Viewer
          * 
          * @type {String}
    	  */
		templateString:template,
		
		/**
		 * The title label to display in the Evidence viewer
		 * 
         * @type {String}
		 */
		evidence_label:"Evidence",
			
		/**
         * Constructor, set the label if specified by user.
         *
         * @constructor 
         */ 
        constructor: function (args) {
        	lang.mixin(this, args);
        } 	
		
	});
});
