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
	"dojo/text!./templates/HistoryDialogTemplate.html",
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
	"idx/widget/Dialog",
	"dojo/store/Memory",
    "idx/gridx/core/model/cache/Sync",
    "idx/gridx/Grid",
    'idx/gridx/modules/SingleSort',
    'idx/gridx/modules/select/Row'
	],
	function (declare, template, topic, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, PubSubTopics, idxDialog,
			Memory, Cache, Grid, Sort, RowSelect) {
   
	return declare("com.ibm.watson.ui.HistoryDialog", [widget, templateMixin, widgetInTemplateMixin], {
		
		templateString: template,
		
		showHistoryDialogTopic: PubSubTopics.WATSON_QI_SHOW_QUESTION_HISTORY,
		
		closeHistoryDialogTopic: PubSubTopics.WATSON_QI_CLOSE_QUESTION_HISTORY,
		
		_grid:null,
		
		constructor: function (args) {
			topic.subscribe(this.showHistoryDialogTopic, lang.hitch(this, "displayHistory"));
			topic.subscribe(this.closeHistoryDialogTopic, lang.hitch(this, "closeHistoryDialog"));
		},
		
		displayHistory:function(previousQuestions){
			var dialog = dijit.byId("historyDialog");
			if(null != dialog && dialog != undefined){
				dialog.show();
				if(null != previousQuestions && previousQuestions != undefined){
					var qData = "[";
					for(var i=previousQuestions.length-1; i>=0; i--){
						qData = qData + "{id:'"+i+"', question: '"+previousQuestions[i]+"'}";
						if(i > 0){
							qData = qData + ",";
						}
					}
					qData = qData + "]";
					//var data = eval(qData);
					var data =eval ("(" + qData + ")");
					var store = new Memory({data: data});
					//GridX is having trouble when store is reset, so have to destroy the entire grid and
					//recreate it each time. This issue was causing the row selected method to fire
					//multiple times. Once for each time the store was set. 
					if(null != this._grid && this._grid != undefined){
						this._grid.destroy();
						this._grid = null;
					}
					if(null == this._grid || this._grid == undefined){
						var structure = [{field: 'question', name: 'Questions', width:'100%'}];
						this._grid = new Grid({
							id: 'questionHistoryGrid',
						    cacheClass: Cache,
						    store: store,
						    structure: structure,
						    modules: [
		    		            Sort,
		    		            RowSelect
		            		]
						});
						this._grid.placeAt(this.historyDialogGridAttachPoint);
						this._grid.startup();
						dojo.connect(this._grid, "onRowClick", this.rowSelected)
					}
					else{
						//We should be updating the grid we have instead of recreating it, but we need this for
						//now because of GridX issues. 
						//this._grid.setStore(store);
					}
				}
			}
		},
		
		rowSelected:function(event){
			var rowId = event.rowId;
			var row = this.row(rowId);
			var cell = this.cell(rowId, 0);
			var question = cell.data();
			topic.publish(PubSubTopics.WATSON_QI_ASK_QUESTION, question);
			topic.publish(PubSubTopics.WATSON_QI_CLOSE_QUESTION_HISTORY);
		},
		
		closeHistoryDialog:function(){
			var dialog = dijit.byId("historyDialog");
			if(null != dialog && dialog != undefined){
				dialog.hide();
			}
		}
	});
});
