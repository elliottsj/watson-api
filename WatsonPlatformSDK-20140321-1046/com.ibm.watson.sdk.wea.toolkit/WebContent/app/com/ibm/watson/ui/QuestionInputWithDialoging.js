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
	"dojo/text!./templates/QuestionInputWithDialogingTemplate.html",
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
    "com/ibm/watson/ui/ErrorDialogHandler",
    "dojo/dom-construct",
	"com/ibm/watson/ui/constants/WeaConstants",
    "com/ibm/watson/ui/QuestionSender",
	"dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/on",
	"dijit/layout/BorderContainer"
	],
	function (declare, template, topic, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, idxString, xhr, PubSubTopics, Menu, 
			MenuItem, ModalDialog, manager, dialogHandler, domConstruct, WeaConstants, questionSender, domStyle, domGeometry, on) {
   
	return declare("com.ibm.watson.ui.QuestionInputWithDialoging", [widget, templateMixin, widgetInTemplateMixin, questionSender], {
		
		templateString: template,
		
		publishAnswersTopic: PubSubTopics.WATSON_QI_ANSWERS_RETRIEVED,
		
		clearSolutionsTopic: PubSubTopics.WATSON_QI_CLEAR_SOLUTIONS,
		
		pipelineErrorTopic: PubSubTopics.WATSON_QI_PIPELINE_ERROR_OCCURRED,
		
		showHistoryDialogTopic: PubSubTopics.WATSON_QI_SHOW_QUESTION_HISTORY,
		
		askQuestionTopic: PubSubTopics.WATSON_QI_ASK_QUESTION,
		
		enterPressedAskQuestionTopic: PubSubTopics.WATSON_QI_ENTER_PRESSED_ASK_QUESTION,
		
		showPipelineMessageTopic: PubSubTopics.WATSON_QI_SHOW_PIPELINE_MESSAGE,
		
		hidePipelineMessageTopic: PubSubTopics.WATSON_QI_HIDE_PIPELINE_MESSAGE,
		
		cancelQuestionTopic: PubSubTopics.WATSON_QI_CANCEL_QUESTION,
		
		previousQuestions:new Array(),
		
		historyMenu:null,
		
		enterQuestionText:"Enter a question",
	
		follupResponseText:"Add details requested below",
		
		asyncMode:true,
		
		constructor: function (args) {
			this.enableDialoging = true;
			this.historyMenu=new Menu({},"historyMenu");
			this.historyMenu.startup();
			topic.subscribe(this.askQuestionTopic, lang.hitch(this, "_askQuestionWithText")); 
			topic.subscribe(this.enterPressedAskQuestionTopic, lang.hitch(this, "_askQuestion")); 
			topic.subscribe(this.cancelQuestionTopic, lang.hitch(this, "_cancelQuestion")); 
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
			if(null != this.questionInputTextAreaAttachPoint.domNode && this.questionInputTextAreaAttachPoint.domNode != undefined){
				this.questionInputTableAttachPoint.style.height = args.h-1 + "px";
				var taHeight = args.h-30 + "px";
				this.questionInputTextAreaAttachPoint.domNode.style.height= taHeight;
				this.dialogContainerTableAttachPoint.style.height = taHeight;
				this.questionInputTextAreaAttachPoint.resize();
			}
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
				textArea.focus();
				var selection = window.getSelection();
				var range = document.createRange();
				range.selectNode(textArea.firstChild);
                selection.removeAllRanges();
                selection.addRange(range);
				//this._askQuestion();
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

		clearChatDialogArea: function(){
			var chatHistoryArea = this.questionHistoryDivAttachPoint;
			if(null != chatHistoryArea && chatHistoryArea != undefined){
				chatHistoryArea.innerHTML = "";
			}
		},
		
		clearQuestionInputText: function(){
			this.questionInputTextAttachPoint.innerHTML="";
		},


		addQuestionToDialog:function(question){
			var historyArea = this.questionHistoryDivAttachPoint;
			if(null != historyArea && historyArea != undefined){
				var tmpDiv = document.createElement("div");
				tmpDiv.innerHTML="<div class='inputQuestionInHistory'><span class='inputQuestionInHistoryText'>"+question+"</div>";
				domConstruct.place(tmpDiv, historyArea,0);
				historyArea.scrollTop = 0;
			}
		},
		
		addFollowUpToDialog:function(question){
			var historyArea = this.questionHistoryDivAttachPoint;
			if(null != historyArea && historyArea != undefined){
				var tmpDiv = document.createElement("div");
				tmpDiv.innerHTML="<div id='followUpQuestionId' class='followUpInHistory'><span class='followUpInHistoryText'>"+question+"</div>";
				var addedNode = domConstruct.place(tmpDiv, historyArea,0);
				historyArea.scrollTop = 0;
				this.highlightResponse(addedNode);
			}
		},
		
		_clearQuestion:function(){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				textArea.innerHTML="";
				textArea.focus();
			}
			var chatHistoryArea = this.questionHistoryDivAttachPoint;
			if(null != chatHistoryArea && chatHistoryArea != undefined){
				chatHistoryArea.innerHTML = "";
			}
			this.isFollowUpAnswer = false;
			topic.publish(this.clearSolutionsTopic);
			topic.publish(this.hidePipelineMessageTopic);
   			topic.publish(this.closeProgressTopic);
   			var arrow = document.getElementById("arrowIcon");
			if(null != arrow && arrow != undefined){
				arrow.style.display="none";
			}
		},
		
		_inputOnFocus:function(args){
			var textArea = this.questionInputTextAttachPoint;
			if(null != textArea && textArea != undefined){
				if(domClass.contains(textArea, ["instructionsMessage"])){
					domClass.remove(textArea, ["instructionsMessage"]);
				}
				if(this._getTextFromQuestionInput() === this.enterQuestionText){
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
					if(this.isFollowUpAnswer){
						textArea.innerHTML=this.follupResponseText;
					}
					else{
						textArea.innerHTML=this.enterQuestionText;
					}
					domClass.add(textArea, ["instructionsMessage"]);
				}
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
		},
		
		_cancelQuestion:function(){
			
		},
		
		highlightResponse:function(div){
			
			var startYellowColor = 136;
			var startGreyColor = 250;
			var endGreyColor= 240;
			var startYellowStyle = "rgb(255,255,136)";
			var yellowFadeSpeed = 100;
			var greyFadeSpeed = 40;
			
			if(null != div && div != undefined){
				var childDiv = div.firstChild;
				childDiv.style.background=startYellowStyle;
			
				var yellowFadeInterval = window.setInterval(function fadeYellow(){
					if(null != childDiv && childDiv != undefined){
						startYellowColor = startYellowColor + 2;
						if(startYellowColor >= 245){
							clearInterval(yellowFadeInterval);
							childDiv.style.background="rgb("+startGreyColor+","+startGreyColor+","+startGreyColor+")";
							var greyFadeInterval = window.setInterval(function fadeGrey(){
								if(null != childDiv && childDiv != undefined){
									startGreyColor = startGreyColor - 2;
									if(startGreyColor <= endGreyColor){
										clearInterval(greyFadeInterval);
									}
									else{
										childDiv.style.background="rgb("+startGreyColor+","+startGreyColor+","+startGreyColor+")";
									}
				    			}
				        	},greyFadeSpeed);
						}
						else{
							childDiv.style.background="rgb(255,255,"+startYellowColor+")";
						}
	    			}
	        	},yellowFadeSpeed);
			}
			
			/*var colorList = ["#FFFF88","#FFFF99","#FFFFAA","#FFFFBB","#FFFFCC","#FFFFDD","#FFFFEE","#FFFFFF","#F8F8F8","#DCDCDC","#F0F0F0"];
			if(null != div && div != undefined){
				var childDiv = div.firstChild;
				childDiv.style.background=colorList[0];
				var timeoutLength = 200;
				if(null != childDiv && childDiv != undefined){
					window.setTimeout(function(){	
						childDiv.style.background=colorList[1];
					},(timeoutLength));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[2];
					},(timeoutLength*2));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[3];
					},(timeoutLength*3));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[4];
					},(timeoutLength*4));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[5];
					},(timeoutLength*5));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[6];
					},(timeoutLength*6));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[7];
					},(timeoutLength*7));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[8];
					},(timeoutLength*8));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[9];
					},(timeoutLength*9));
					window.setTimeout(function(){	
						childDiv.style.background=colorList[9];
					},(timeoutLength*10));
				}
			}*/
		}
		
	});
});
