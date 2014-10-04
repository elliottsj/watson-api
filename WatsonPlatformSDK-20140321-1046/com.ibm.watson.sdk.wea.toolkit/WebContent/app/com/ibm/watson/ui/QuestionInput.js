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
	"dojo/text!./templates/QuestionInputTemplate.html",
	"dojo/topic", 
	"dojo/_base/array", 
	"dojo/_base/lang", 
	"dojo/dom-class", 
	"dijit/_Widget", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/_base/fx", 
	"dojo/string",
	"idx/string",
	"dojo/_base/xhr",
	"com/ibm/watson/ui/constants/PubSubTopics",
	"dijit/Menu",
    "dijit/MenuItem",
    "idx/widget/ModalDialog",
    "dijit/_base/manager",
    "dojo/dom-geometry",
    "dojo/on",
    "com/ibm/watson/ui/QuestionSender",
    "com/ibm/watson/ui/ErrorDialogHandler"
	],
	function (declare, template, topic, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, idxString, xhr, PubSubTopics, Menu, MenuItem, ModalDialog, manager, domGeometry, on, questionSender) {
   
	return declare("com.ibm.watson.ui.QuestionInput", [widget, templateMixin, widgetInTemplateMixin, questionSender], {
		
		templateString: template,
		
		publishAnswersTopic: PubSubTopics.WATSON_QI_ANSWERS_RETRIEVED,
		
		clearSolutionsTopic: PubSubTopics.WATSON_QI_CLEAR_SOLUTIONS,
		
		pipelineErrorTopic: PubSubTopics.WATSON_QI_PIPELINE_ERROR_OCCURRED,
		
		showHistoryDialogTopic: PubSubTopics.WATSON_QI_SHOW_QUESTION_HISTORY,
		
		askQuestionTopic: PubSubTopics.WATSON_QI_ASK_QUESTION,
		
		enterPressedAskQuestionTopic: PubSubTopics.WATSON_QI_ENTER_PRESSED_ASK_QUESTION,
		
		previousQuestions:new Array(),
		
		historyMenu:null,
		
		asyncMode:false,

		constructor: function (args) {
			this.historyMenu=new Menu({},"historyMenu");
			this.historyMenu.startup();
			topic.subscribe(this.askQuestionTopic, lang.hitch(this, "_askQuestionWithText")); 
			topic.subscribe(this.enterPressedAskQuestionTopic, lang.hitch(this, "_askQuestion"));
			topic.subscribe(this.publishAnswersTopic, lang.hitch(this, "_answersPublished"));
			topic.subscribe(this.pipelineErrorTopic, lang.hitch(this, "_pipelineErrors"));
		},
		
		postCreate: function() {
			this.inherited(arguments);
			this._sizeCheck();
			var textArea = this.questionInputTextAttachPoint;
			var qiw = this;
			on(textArea, "keypress", function(e){
				if(e.keyCode==13 && e.shiftKey===false){
					//console.log("dojo-on enter");
					qiw._askQuestion();
				}
			});
		},
		
		resize:function(args){
			//console.log("resize called, args = " + args);
			this.questionInputTextAreaAttachPoint.style.height= args.h-30 + "px";
			this.questionInputTextAttachPoint.style.height= args.h-38 + "px";
			this.textEntryTableAttachPoint.style.height= args.h-38 + "px";
			this.domNode.style.height = args.h-1 + "px";
		},
		
		_sizeCheck:function(){
			//console.log("sizeCheck called");
			var myNode = this.domNode;
			if (myNode != null){
				var parent = myNode.parentNode;
				if (null != parent && parent != undefined){
					var cb =  domGeometry.getContentBox(parent);
					if(null != cb && cb != undefined){
						//console.log("cb.h, cb.w: " + cb.h + ", " + cb.w);
						this.resize(cb);
					} else {
						console.log("QuestionInput.sizeCheck: null contentBox");
					}
				} else {
					console.log("QuestionInput.sizeCheck: null parent");
				}
			} else {
				console.log("QuestionInput.sizeCheck: null this.domNode");
			}
		},
		
		_answersPublished: function() {
			this.enableTextArea();
		},
		
		_pipelineErrors: function() {
			this.enableTextArea();
		},
		
		enableTextArea: function() {
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				textArea.contentEditable = true;
				domClass.remove(textArea, "disabled");
				textArea.focus();
			}
		},
				
		_askQuestionWithText:function(questionText){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				textArea.innerHTML = questionText;
				this._askQuestion();
				
			}
		},
		
		_askQuestion:function(){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				var text = this._getTextFromQuestionInput();
				if(null != text && text != undefined){
					textArea.contentEditable = false;
					domClass.add(textArea, "disabled");
					this._getResponse(text);	
					var selection = window.getSelection();
					var range = document.createRange();
					range.selectNode(textArea.firstChild);
        	        selection.removeAllRanges();
            	    selection.addRange(range);
				}
			}
		},
		
		_getTextFromQuestionInput:function(){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				var text = "";
				//IE9+. FF, Chrome, Safari
				if(textArea.textContent != undefined){
					text = textArea.textContent;
				}
				//IE8
				else{
					text = textArea.innerText;
				}
				if(null != text && text != undefined){
					return text;	
				}
			}
			return null;
		},

		_inputOnFocus:function(args){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				if(domClass.contains(textArea, ["instructionsMessage"])){
					domClass.remove(textArea, ["instructionsMessage"]);
				}
				if(this._getTextFromQuestionInput() === "Enter a question"){
					textArea.innerHTML = "";
				}
				else{
					var selection = window.getSelection();
					var range = document.createRange();
					range.selectNode(textArea.firstChild);
        	        selection.removeAllRanges();
            	    selection.addRange(range);
				}
			}
		},
		
		_inputFocusLost:function(args0){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				var text = this._getTextFromQuestionInput();
				if(null == text || text == undefined || text === ""){
					textArea.innerHTML="Enter a question";
					domClass.add(textArea, ["instructionsMessage"]);
				}
			}
		},
		
		_clearQuestion:function(){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				textArea.innerHTML="";
				textArea.focus();
			}
			topic.publish(this.clearSolutionsTopic);
			topic.publish(this.closeProgressTopic);
   			var arrow = document.getElementById("arrowIcon");
			if(null != arrow && arrow != undefined){
				arrow.style.display="none";
			}
		},
		
		_showHistory:function(args){
			topic.publish(this.showHistoryDialogTopic,this.previousQuestions);
		},
		
		addToPreviousQuestions:function(question){
			if(null != this.previousQuestions && this.previousQuestions != undefined){
				for(var i=0; i<this.previousQuestions.length; i++){
					if(this.previousQuestions[i] === question){
						this.previousQuestions.splice(i,1);
					}
				}
			}
			this.previousQuestions.push(question);
		}
		
	});
});
