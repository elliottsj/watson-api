/* ***************************************************************** */
/*                                                                   */
/* Licensed Materials - Property of IBM                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2014. All Rights Reserved.          */
/*                                                                   */
/* US Government Users Restricted Rights - Use, duplication or       */
/* disclosure restricted by GSA ADP Schedule Contract with IBM Corp. */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo/_base/declare",
	"dojo/text!./templates/AnswerTemplate.html",
	"dojo/topic", 
	"dojo/_base/array", 
	"dojo/_base/lang", 
	"dojo/dom-class", 
	"dijit/_Widget", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/_base/fx", 
	"dojo/string",
	"dojox/grid/DataGrid",
	"dojo/data/ItemFileReadStore",
	"com/ibm/watson/ui/ConfidenceBar",
	"com/ibm/watson/ui/EvidenceButton",
	"dojo/html",
	"dojox/html/entities"
	],
	function (declare, template, topic, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, DataGrid, ItemFileReadStore, ConfidenceBar, EvidenceButton, html, entities) {
   
	return declare("com.ibm.watson.sdk.demo.app.Answer", [widget, templateMixin, widgetInTemplateMixin], {
		
		templateString: template,
		
		confidenceValue:"",
		
		evidenceRows:"",
		
		answerTitle:"",
		
		constructor: function(answer){
			var confidenceVal = answer.confidence * 100;
			if(null != confidenceVal && confidenceVal != undefined){
				this.confidenceValue = Math.round(confidenceVal);
			}
			this.answerTitle=answer.text;
			var evidences = answer.evidence;
			var evidenceHTML = "";
			if(null != evidences && evidences != undefined){
				for(var i=0; i<evidences.length; i++){
					var evidence = evidences[i];
					if(null != evidence && evidence != undefined){
						evidenceHTML = evidenceHTML + 
						"<tr class='evidenceRow'>"+
							"<td>"+
								"<table class='evidenceTable'>"+
									"<tr class='innerEvidenceTableRow'>"+
										"<td class='primaryEvidenceCell'>"+
											"<span class='primaryEvidenceSpan'>"+evidence.title+"</span>"+
										"</td>"+
										"<td class='evidenceDescriptionCell'>"+
											"<span class='evidenceDescriptionSpan'>"+evidence.text+"</span>"+
										"</td>"+
									"</tr>"+
								"</table>"+
							"</td>"+
						"</tr>";
					}
				}
			}
			this.evidenceRows = evidenceHTML;
		}

	});
});
