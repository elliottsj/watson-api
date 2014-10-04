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

define([
	"dojo/_base/declare",
	"dojo/text!./templates/ErrorDialogTemplate.html",
	"dojo/topic", 
	"dojo/_base/array", 
	"dojo/_base/lang", 
	"dojo/dom-class", 
	"dijit/_Widget", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/_base/fx", 
	"dojo/string",
	"com/ibm/watson/ui/constants/PubSubTopics",
	"com/ibm/watson/ui/_DialogMixin"
	],
	function (declare, template, topic, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, PubSubTopics, _DialogMixin) {
   
	return declare("com.ibm.watson.ui.ErrorDialog", [widget, templateMixin, widgetInTemplateMixin, _DialogMixin], {
		
		templateString: template,
		
		pipelineErrorTopic: PubSubTopics.WATSON_QI_PIPELINE_ERROR_OCCURRED,
		
		constructor: function (args) {
			topic.subscribe(this.pipelineErrorTopic, lang.hitch(this, "displayError"));
		},
	
		displayError:function(message){
			this.open();
			this.messageDiv.innerHTML = message;
			domClass.add(this.domNode, ["open"]);
		},
		
		closeErrorDialog:function(){
			this.close();
			domClass.remove(this.domNode, ["open"]);
		}
		
	});
});
