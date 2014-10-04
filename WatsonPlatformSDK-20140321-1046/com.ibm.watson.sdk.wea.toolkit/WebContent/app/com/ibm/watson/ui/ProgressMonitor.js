/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2013                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define(["dojo/_base/declare", "dojo/text!./templates/ProgressMonitor.html",
        "dojo/topic", "com/ibm/watson/ui/constants/PubSubTopics", "dojo/_base/lang", 
        "dojo/dom-class", "dijit/_Widget", "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin"],
    function (declare, template, topic, PubSubTopics,
        lang, domClass, widget, templateMixin, widgetInTemplateMixin) {
  
        return declare("com.ibm.watson.ui.ProgressMonitor", [widget, templateMixin, widgetInTemplateMixin], {
            
        	/**
        	  * The topic to subscribe to which tells us when to display the progress monitor
              * 
              * @type {String}
        	  */
        	 openTopic: PubSubTopics.WATSON_PROGRESS_OPEN,
            
        	 /**
         	  * The topic to subscribe to which tells us to update the progress status
              * 
              * @type {String}
         	  */
             statusTopic: PubSubTopics.WATSON_PROGRESS_STATUS_UPDATE,
             
             /**
         	  * The topic to subscribe to which tells us when to close the progress monitor
              * 
              * @type {String}
         	  */
             closeTopic: PubSubTopics.WATSON_PROGRESS_CLOSE,
             
             /**
          	  * The topic to subscribe to which tells us what to update the progress percentage to
              * 
              * @type {String}
          	  */
             progressTopic : PubSubTopics.WATSON_PROGRESS_UPDATE,
             
             /**
           	  * The topic to publish to if a user clicks the cancel button in the progress monitor
              * 
              * @type {String}
           	  */
              cancelTopic : null,
             
             /**
              * Loop the progress monitor and don't wait for progress updates
              * 
              * @type {String}
              */
             loopProgress:"false",
             
             /**
              * The speed in ms to loop the progress bar
              * 
              * @type {String}
              */
             loopProgressSpeed:"35",
             
             /**
              * Specify whether or not you want to see the percent done alongside the progress status in the progress monitor. 
              * 
              * @type {String}
              */
             displayProgressPercent:"false",
             
             /**
              * Internal place holder to keep track of the interval used to update the progress bar when in looping mode. 
              * We need to keep track of it so that we can remove it after the monitor is closed
              * 
              * @type {String}
              * @private
              */
             _progressLoopInterval:null,
             
             /**
              * Place holder to keep track of the status message currently being displayed by the progress monitor. This cannot be 
              * used to set the initial status message in the dialog. 
              * 
              * @type {String}
              * @private
              */
             _statusMessage:"",
             
             /**
              * Place holder to keep track of the percent done to potentially be displayed in the progress monitor. This cannot be 
              * used to set the initial percent done for the progress monitor
              * 
              * @type {String}
              * @private
              */
             _percentDone:"0",
        	
        	/**
             * HTML template for widget.
             *
             * @type {String}
             */ 
            templateString: template,

            /**
             * Set up the initial state of all properties. Set up Pub/Sub Topics
             * for opening monitor, closing minotor, updating status and updating progress. 
             *
             * @constructor 
             */ 
            constructor: function (args) {
            	//setup the initial values of all the arguments. 
            	var openTopicVal = args.openTopic;
            	if(openTopicVal != undefined && null != openTopicVal){
            		this.openTopic=openTopicVal;
            	}
            	var statusTopicVal = args.statusTopic;
            	if(statusTopicVal != undefined && null != statusTopicVal){
            		this.statusTopic=statusTopicVal;
            	}
            	var closeTopicVal = args.closeTopic;
            	if(closeTopicVal != undefined && null != closeTopicVal){
            		this.closeTopic=closeTopicVal;
            	}
            	var progressTopicVal = args.progressTopic;
            	if(progressTopicVal != undefined && null != progressTopicVal){
            		this.progressTopic=progressTopicVal;
            	}
            	var cancelTopicVal = args.cancelTopic;
            	if(cancelTopicVal != undefined && null != cancelTopicVal){
            		this.cancelTopic=cancelTopicVal;
            	}
            	var loopProgressVal = args.loopProgress;
            	if(loopProgressVal != undefined && null != loopProgressVal){
            		this.loopProgress=loopProgressVal;
            	}
            	var displayProgressVal = args.displayProgressPercent;
            	if(displayProgressVal != undefined && null != displayProgressVal){
            		this.displayProgressPercent=displayProgressVal;
            	}
            	var loopProgressSpeedVal = args.loopProgressSpeed;
            	if(loopProgressSpeedVal != undefined && null != loopProgressSpeedVal){
            		this.loopProgressSpeed=loopProgressSpeedVal;
            	}
            	
            	//subscribe to the topics we are interested in to perform progress monitor operations
                topic.subscribe(this.openTopic, lang.hitch(this, "openMonitor"));
                topic.subscribe(this.statusTopic, lang.hitch(this, "statusUpdate"));
                topic.subscribe(this.closeTopic, lang.hitch(this, "closeMonitor"));
                topic.subscribe(this.progressTopic, lang.hitch(this, "progressUpdate"));
                
            }, 

            /**
             * Display the progress monitor
             * 
             * @param {String} displayValue - Initial status message to display in the progress monitor
             */ 
            openMonitor: function (displayValue) {
            	if (displayValue == undefined) {
            		displayValue = "Retrieving";
            	}
            	//Publish the initial status message to the monitor.  
            	topic.publish(this.statusTopic, displayValue);
            	//Add the open style class to make the monitor visible
            	domClass.add(this.domNode, ["open"]);
            	//If the progress monitor is set to loop, start up the update function that will fire at the specified intervals
            	if(this.loopProgress=='true'){
            		var progress = 0;
            		var aDomNode = this.domNode;
            		this._progressLoopInterval = window.setInterval(function animateProgress(){
            			if(null != aDomNode && aDomNode != undefined){
	            			progress++;
	            			var progressSteps = ["twenty","forty","sixty","eighty","onehundred"];
	                    	if(progress>120){
	                    		progress=20;
	                    	}else if(progress >=0 && progress <20){
	                    		domClass.remove(aDomNode, progressSteps);
	                    	}
	                    	else if(progress >=20 && progress <40){
	                    		domClass.replace(aDomNode, "twenty", progressSteps);
	                    	}
	                    	else if(progress >=40 && progress <60){
	                    		domClass.replace(aDomNode, "forty", progressSteps);
	                    	}
	                    	else if(progress >=60 && progress <80){
	                    		domClass.replace(aDomNode, "sixty", progressSteps);
	                    	}
	                    	else if(progress >=80 && progress <100){
	                    		domClass.replace(aDomNode, "eighty", progressSteps);
	                    	}
	                    	else if(progress == 100){
	                    		domClass.replace(aDomNode, "onehundred", progressSteps);
	                    	}
            			}
                	},this.loopProgressSpeed);
            	}
            },

            /**
             * Update the status of the progress monitor
             *
             * @param {String} displayValue - The status message to display
             * @private
             */ 
            statusUpdate: function (displayValue) {
            	this._statusMessage = displayValue;
            	if(this.displayProgressPercent=='true'){
            		this.status_message_field.innerHTML=displayValue+ " " + this._percentDone + "%";
            	}
            	else{
            		this.status_message_field.innerHTML=displayValue;
            	}
            },
            
            /**
             * Update the progress bar in the progress monitor
             *
             * @param {int} progress - The percent done
             * @private
             */ 
            progressUpdate: function (progress) {
            	this._percentDone = progress;
            	if(this.displayProgressPercent=='true'){
            		this.status_message_field.innerHTML=this._statusMessage + " " + this._percentDone + "%";
            	}
            	var progressSteps = ["twenty","forty","sixty","eighty","onehundred"];
            	if(progress >=0 && progress <20){
            		domClass.remove(this.domNode, progressSteps);
            	}
            	else if(progress >=20 && progress <40){
            		domClass.replace(this.domNode, "twenty", progressSteps);
            	}
            	else if(progress >=40 && progress <60){
            		domClass.replace(this.domNode, "forty", progressSteps);
            	}
            	else if(progress >=60 && progress <80){
            		domClass.replace(this.domNode, "sixty", progressSteps);
            	}
            	else if(progress >=80 && progress <100){
            		domClass.replace(this.domNode, "eighty", progressSteps);
            	}
            	else if(progress == 100){
            		domClass.replace(this.domNode, "onehundred", progressSteps);
            	}
            },
            
            /**
             * Close the progress monitor and remove any interval we created for the spinning progress bar
             *
             * @private
             */ 
            closeMonitor: function(){
            	//Remove the open style class that makes the progress monitor visible
            	domClass.remove(this.domNode, ["open"]);
            	if(this.loopProgress){
            		clearInterval(this._progressLoopInterval);
            	}
            },

            /**
             * User has clicked the cancel button in the progress monitor.
             * Close the monitor and publish the user defined topic to perform any actions on cancel.
             *
             * @private
             */ 
            cancelMonitor: function () {
            	this.closeMonitor();
            	if(null != this.cancelTopic && this.cancelTopic != undefined){
            		 topic.publish(this.cancelTopic);
            	}
            }

        });
    });
