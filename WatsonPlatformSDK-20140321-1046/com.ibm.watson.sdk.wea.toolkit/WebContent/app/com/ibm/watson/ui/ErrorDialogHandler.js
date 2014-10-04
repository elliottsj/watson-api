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
	"dojo/text!./templates/ErrorDialogHandlerTemplate.html",
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
	"com/ibm/watson/ui/_DialogMixin",
    "idx/widget/ModalDialog"
	],
	function (declare, template, topic, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, PubSubTopics, _DialogMixin, ModalDialog) {
   
	return declare("com.ibm.watson.ui.ErrorDialogHandler", [widget, templateMixin, widgetInTemplateMixin, _DialogMixin], {
		
		templateString: template,
		
		pipelineErrorTopic: PubSubTopics.WATSON_QI_PIPELINE_ERROR_OCCURRED,
		
		constructor: function (args) {
			topic.subscribe(this.pipelineErrorTopic, lang.hitch(this, "displayError"));
		},
	
		displayError:function(error){
			var errorDialogWidget = dijit.byId("errorDialogId");
			if(errorDialogWidget != null && errorDialogWidget != undefined){
				errorDialogWidget.destroy();
			}
			
			var errorDialog = new ModalDialog({
       			id: "errorDialogId",
       			type: "error",
       			text: "Error Occurred",
       			info: [{
           			title: "Error Description",
           			content: error
        		}]
       		},this.errorDialogAttachPoint);
			errorDialog.show();
		}
		
	});
});
