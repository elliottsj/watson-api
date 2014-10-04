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
    "dijit/_WidgetBase",
	"dojo/_base/xhr",
	"dojo/topic", 
	"com/ibm/watson/ui/constants/PubSubTopics",
	"com/ibm/watson/ui/constants/WeaConstants"
	],
    function(declare, _WidgetBase, xhr, topic, PubSubTopics, WeaConstants){
	
	return  declare("com.ibm.watson.ui.QuestionSender", [_WidgetBase], {

		/*
		 * number of answers Watson should return - default is 5
		 */
		numberAnswers: 5,
		
		/*
		 * EvidenceRequest values:  numberEvidence and profile -- see QAPI docs
		 * If both numberEvidence and profile are null, no evidenceRequest is made.  
		 * If either is set, an EvidenceRequest is included.  If only one of those
		 * two is specified, the other gets a default value by QAPI for the EvidenceRequest
		 */
		numberEvidence: null,
		profile: null,
		
		/*
		 * Optional QAPI parameters defaults for all questions -- can be supplied on pre-question basis, use these defaults if set
		 */
		lat: null,
		category: null,
		context: null,
		
		/*
		 * url to the wea.QapiProxy
		 */
		url: null,
		
		/*
		 * Default to using the QAPIs in sync mode. Setting this to true will enable running async
		 */
		asyncMode: false,
		
		/* flag to questionSender that dialoging mode should be enabled - override in dialog-supporting questionInput widget */
		enableDialoging: false,
		
		/* flag that we're in a dialoging mode - ignored by basic QuestionInput*/
		isFollowUpAnswer:false,
		
		syncApiURLExt:"/sync",

		asyncApiURLExt:"/async",
		
		//pub-sub topics
		publishAnswersTopic: PubSubTopics.WATSON_QI_ANSWERS_RETRIEVED,
		
		showProgressTopic: PubSubTopics.WATSON_PROGRESS_OPEN,
		
		closeProgressTopic: PubSubTopics.WATSON_PROGRESS_CLOSE,
		
		clearSolutionsTopic: PubSubTopics.WATSON_QI_CLEAR_SOLUTIONS,
		
		pipelineErrorTopic: PubSubTopics.WATSON_QI_PIPELINE_ERROR_OCCURRED,
		
		showHistoryDialogTopic: PubSubTopics.WATSON_QI_SHOW_QUESTION_HISTORY,
		
		askQuestionTopic: PubSubTopics.WATSON_QI_ASK_QUESTION,
		
		enterPressedAskQuestionTopic: PubSubTopics.WATSON_QI_ENTER_PRESSED_ASK_QUESTION,

		hidePipelineMessageTopic: PubSubTopics.WATSON_QI_HIDE_PIPELINE_MESSAGE,
		
		showPipelineMessageTopic: PubSubTopics.WATSON_QI_SHOW_PIPELINE_MESSAGE,
		
		// qapiStatus for progress of one interaction with qapiProxy
		// WeaConstants: idle, await_id, in_progress, complete, aborted
		qapiStatus: WeaConstants.QAPI_STATUS_IDLE,
		qapiQuestionId: null,
		syncPostRequest:null,

		constructor: function(args){
			declare.safeMixin(this, args);
		},
		
		check: function(text){
			console.log("QuestionSender: url = " + this.url + ", numberAnswers = " + this.numberAnswers + ", inputText = " + text);
		},
		
		//default nop impl - override if implementing a question history function
		addToPreviousQuestions: function(text){
			//console.log("QuestionSender.addToPreviousQuestions: " + text);
		},
		
		//default nop impl - override if implementing dialoging
		clearChatDialogArea: function(){
		},
		
		//default nop impl - override if implementing dialoging
		addQuestionToDialog: function(text){
		},
		
		//default nop impl - override if implementing dialoging
		addFollowUpToDialog: function(text){
		},
		
		//default nop -- override for dialoging (not used in non-dialog)
		clearQuestionInputText: function(){
		},

		//must be overriden if the text area is disabled and needs to re-enable on a cancelQuestion
		enableTextArea: function() {
		},


		_formatContent: function(questionText, lat, category, context){
			var retVal = {};
			retVal.question = questionText;
			retVal.numberAnswers = this.numberAnswers;
			if (this.numberEvidence != null){
				retVal.numberEvidence = this.numberEvidence;
			}
			if (this.profile != null){
				retVal.profile = this.profile;
			}
			if (lat != null){
				retVal.lat = lat;
			} else if (this.lat != null){
				retVal.lat = this.lat;
			}
			if (category != null){
				retVal.category = category;
			} else if (this.category != null){
				retVal.category = this.category;
			}
			if (context != null){
				retVal.context = context;
			} else if (this.context != null){
				retVal.context = this.context;
			}

			return retVal;
		},
		
		_getResponse:function(questionText, lat, category, context, responseCallback){
			if(this.asyncMode!=null && this.asyncMode != undefined && (this.asyncMode==true || this.asyncMode=="true")){
				//use async QAPIs
				this._initiateAsyncQuestion(questionText, lat, category, context, responseCallback);
			}
			else{
				//use sync QAPIs
				this._initiateSyncQuestion(questionText, lat, category, context, responseCallback);
			}	
		},
		

		_initiateAsyncQuestion:function(questionText, lat, category, context, responseCallback){
			if ((this.url != null) && (this.url.length > 0)){
				topic.publish(this.clearSolutionsTopic);
				topic.publish(this.hidePipelineMessageTopic);
				if(!this.isFollowUpAnswer){
					this.clearChatDialogArea();
				}
				this.isFollowUpAnswer = false;
				if(null != questionText && questionText != undefined){
					if (this.enableDialoging){
						this.clearQuestionInputText();
					}
					this.addQuestionToDialog(questionText);
					this.addToPreviousQuestions(questionText);
					topic.publish(this.showProgressTopic);
					
					this.qapiStatus = WeaConstants.QAPI_STATUS_AWAIT_ID;
					var reqCont = this._formatContent(questionText, lat, category, context);
					var qi = this;
					
					
					xhr.post({
						url: this.url + this.asyncApiURLExt,
						handleAs: "json",
						content: reqCont,
						load: function(result) {
							var error = result.error;
							if(null != error && error != undefined){
								topic.publish(qi.pipelineErrorTopic,error);
								topic.publish(qi.clearSolutionsTopic);
								topic.publish(qi.closeProgressTopic);
							}
							else {
								var question = result.question;
								if (null != question && question != undefined){
									var id = question.id;
									qi._beginProgress(id, responseCallback);
								}
							}
						}	
					});
				}
			} else {  //null or empty URL variable 
				console.log("WEA Question Widget must be configured with a \"url\" parameter");
			}
		},
		
		_initiateSyncQuestion:function(questionText, lat, category, context, responseCallback){
			if ((this.url != null) && (this.url.length > 0)){
				topic.publish(this.clearSolutionsTopic);
				topic.publish(this.hidePipelineMessageTopic);
				if(!this.isFollowUpAnswer){
					this.clearChatDialogArea();
				}
				this.isFollowUpAnswer = false;
				if(null != questionText && questionText != undefined){
					if (this.enableDialoging){
						this.clearQuestionInputText();
					}
					this.addQuestionToDialog(questionText);
					this.addToPreviousQuestions(questionText);
					topic.publish(this.showProgressTopic);
					
					this.qapiStatus = WeaConstants.QAPI_STATUS_IN_PROGRESS;
					var reqCont = this._formatContent(questionText, lat, category, context);
					var qi = this;	
					
					// X-SyncTimeout specifies this is a Synchronous call to the QAAPI
					qi.syncPostRequest = xhr.post({
						url: this.url + this.syncApiURLExt,
						handleAs: "json",
						content: reqCont,
						headers: {"X-SyncTimeout" : "45", "accept" : "application/json"},
						load: function(result) {
							if(null != responseCallback && responseCallback != undefined){
								responseCallback(result);
							}
							var error = result.error;
							if(null != error && error != undefined){
								topic.publish(qi.pipelineErrorTopic,error);
								topic.publish(qi.clearSolutionsTopic);
								topic.publish(qi.closeProgressTopic);
							}
							else {
								var question = result.question;
								if(null != question && question != undefined){
									if (qi.enableDialoging){
				           				var moreInfoNeeded = question.neededInfo;
				           				if(null != moreInfoNeeded && moreInfoNeeded != undefined){
				           					topic.publish(qi.showPipelineMessageTopic, "<b>Low Confidence Solutions</b><br>Add requested details to increase confidence levels.", WeaConstants.WATSON_PIPELINE_MESSAGE_WARNING_TYPE);
				           					qi.addFollowUpToDialog(moreInfoNeeded);
				           					qi.isFollowUpAnswer = true;
				           				}
									}
									var answers = question.answers;
									if(null != answers && answers != undefined){
										if(answers.length>0){
											topic.publish(qi.closeProgressTopic);
											topic.publish(qi.publishAnswersTopic, answers);
										}
										else{
											var errorNotifications = question.errorNotifications;
											var message = "";
											if(null != errorNotifications && errorNotifications != undefined){
												for(var i=0; i<errorNotifications.length; i++){
													var errorNotification = errorNotifications[i];
													message = message + "<br><b>"+ errorNotification.id+"</b><br>" + errorNotification.text + "<br>";
												}
	
											}
											topic.publish(qi.pipelineErrorTopic,"Sorry, no solutions were found<br>The following notifications were returned by the pipeline<br>"+message);
											topic.publish(qi.clearSolutionsTopic);
											topic.publish(qi.closeProgressTopic);
										}
									}
									else{
										topic.publish(qi.pipelineErrorTopic,"Sorry, no solutions were found");
										topic.publish(qi.clearSolutionsTopic);
										topic.publish(qi.closeProgressTopic);
									}
								}
							}
							qi._completeQapi();
						}	
					});
				}
			} else {  //null or empty URL variable 
				console.log("WEA Question Widget must be configured with a \"url\" parameter");
			}
		},
		
		cancelQuestion: function( ){
			console.log("Cancel Question");
			// drop the cancel if we're not in awaitId or inProgress
			if (this.qapiStatus == WeaConstants.QAPI_STATUS_AWAIT_ID){
				this.qapiStatus = WeaConstants.QAPI_STATUS_ABORTED;
			} else if (this.qapiStatus == WeaConstants.QAPI_STATUS_IN_PROGRESS){
				if(this.asyncMode!=null && this.asyncMode != undefined && (this.asyncMode==true || this.asyncMode=="true")){
					var reqCont = {};
					reqCont.questionId = this.qapiQuestionId;
					var qi = this;
	
					xhr.post({
						url: this.url + "/async/cancel",
						handleAs: "json",
						content: reqCont,
						load: function(result) {
							console.log("Server result of Cancel Question");
							var error = result.error;
							if(null != error && error != undefined){
								topic.publish(qi.pipelineErrorTopic,error);
								topic.publish(qi.clearSolutionsTopic);
								topic.publish(qi.closeProgressTopic);
							}
							else {
								var question = result.question;
								if(null != question && question != undefined){
									var status = question.status;
									if (null != status && status != undefined){
										if (status == "CancelRequested"){
											qi.qapiStatus = WeaConstants.QAPI_STATUS_ABORTED;
										}
									}
								}
							}
						}
					});
				}
				else{
					//if we have the xhr object getting the answer, just cancel it and reset.  
					if(null != this.syncPostRequest && this.syncPostRequest!=undefined){
						this.syncPostRequest.cancel();
						topic.publish(this.clearSolutionsTopic);
						topic.publish(this.closeProgressTopic);
						this.enableTextArea();
						this._completeQapi();
					}
				}
			}
		},

		
		_beginProgress: function( id , responseCallback){
			// if we aborted, we need to wait for quesId before re-enable so we don't queue multiple at the server end
			if (this.qapiStatus == WeaConstants.QAPI_STATUS_ABORTED){
				console.log("ID returned but question aborted - resetting.");
				topic.publish(this.clearSolutionsTopic);
				topic.publish(this.closeProgressTopic);
				this.enableTextArea();
				this._completeQapi();
			} else if (this.qapiStatus == WeaConstants.QAPI_STATUS_AWAIT_ID) {
				this.qapiQuestionId = id;
				this.qapiStatus = WeaConstants.QAPI_STATUS_IN_PROGRESS;
				var reqCont = {};
				reqCont.questionId = id;
				var qi = this;

				xhr.post({
					url: this.url + this.asyncApiURLExt,
					handleAs: "json",
					content: reqCont,
					load: function(result) {
						// if we aborted, wait for the abort handshake before re-enable
						if (qi.qapiStatus == WeaConstants.QAPI_STATUS_ABORTED){
							console.log("Question Aborted after ID established");
							topic.publish(qi.clearSolutionsTopic);
							topic.publish(qi.closeProgressTopic);
							qi.enableTextArea();
							qi._completeQapi();
						} else {
							if(null != responseCallback && responseCallback != undefined){
								responseCallback(result);
							}
							var error = result.error;
							if(null != error && error != undefined){
								topic.publish(qi.pipelineErrorTopic,error);
								topic.publish(qi.clearSolutionsTopic);
								topic.publish(qi.closeProgressTopic);
							}
							else {
								var question = result.question;
								if(null != question && question != undefined){
									if (qi.enableDialoging){
				           				var moreInfoNeeded = question.neededInfo;
				           				if(null != moreInfoNeeded && moreInfoNeeded != undefined){
				           					topic.publish(qi.showPipelineMessageTopic, "<b>Low Confidence Solutions</b><br>Add requested details to increase confidence levels.", WeaConstants.WATSON_PIPELINE_MESSAGE_WARNING_TYPE);
				           					qi.addFollowUpToDialog(moreInfoNeeded);
				           					qi.isFollowUpAnswer = true;
				           				}
									}
									var answers = question.answers;
									if(null != answers && answers != undefined){
										if(answers.length>0){
											topic.publish(qi.closeProgressTopic);
											topic.publish(qi.publishAnswersTopic, answers);
										}
										else{
											var errorNotifications = question.errorNotifications;
											var message = "";
											if(null != errorNotifications && errorNotifications != undefined){
												for(var i=0; i<errorNotifications.length; i++){
													var errorNotification = errorNotifications[i];
													message = message + "<br><b>"+ errorNotification.id+"</b><br>" + errorNotification.text + "<br>";
												}
	
											}
											topic.publish(qi.pipelineErrorTopic,"Sorry, no solutions were found<br>The following notifications were returned by the pipeline<br>"+message);
											topic.publish(qi.clearSolutionsTopic);
											topic.publish(qi.closeProgressTopic);
										}
									}
									else{
										topic.publish(qi.pipelineErrorTopic,"Sorry, no solutions were found");
										topic.publish(qi.clearSolutionsTopic);
										topic.publish(qi.closeProgressTopic);
									}
								}
							}
							qi._completeQapi();
						}
					}	
				});

			}
		},
		
		_completeQapi: function(){
			this.qapiQuestionId = null;
			this.qapiStatus = WeaConstants.QAPI_STATUS_IDLE;
		}
		

	});
});