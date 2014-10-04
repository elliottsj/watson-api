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

define(["dojo/_base/declare", "dojo/text!./templates/EvidenceButton.html",
        "dojo/topic", "dojo/_base/array", "dojo/_base/lang", 
        "dojo/dom-class",  "dijit/_Widget", "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin","dojo/_base/fx", "dojo/string","com/ibm/watson/ui/constants/PubSubTopics"],
    function (declare, template, topic, array,
        lang, domClass, _widget, _templateMixin, _widgetInTemplateMixin, fx, string, PubSubTopics) {

	return declare("com.ibm.watson.ui.EvidenceButton", [_widget, _templateMixin, _widgetInTemplateMixin], {
		/**
    	  * The template for an evidence button
          * 
          * @type {String}
    	 */
		templateString:template,
		
		/**
		 * The label to display for this evidence button
   	  	 * 
         * @type {String}
         */
		label:"",
		
		/**
		 * 
		 * The topic to publish	to when the button is clicked
   	  	 * 
         * @type {String}
         */
		evidenceButtonClickedTopic:PubSubTopics.WATSON_EVIDENCE_BUTTON_CLICKED,
		
		/**
		 * Comma separated list of compass points to indicate where the label is shown. 
		 * Eg. "north,south,east,west" would display the label to the top, bottom, right and left
		 * of the confidence bar. 
		 * The default value is south only 
   	  	 * 
         * @type {String}
         */
		displayLabel:"south",
		
		/**
		 * The class used to display the label above the confidence bar
   	  	 * 
         * @type {String}
         * @private
         */
		north_label_class:"hide",

		/**
		 * The class used to display the label string below the confidence bar
   	  	 * 
         * @type {String}
         * @private
         */
		south_label_class:"hide",
		
		/**
		 * The class used to display the label string to the right of the confidence bar
   	  	 * 
         * @type {String}
         * @private
         */
		east_label_class:"hide",
		
		/**
		 * The class used to display the label string below to the left of the confidence bar
   	  	 * 
         * @type {String}
         * @private
         */
		west_label_class:"hide",
		
		/**
		 * Callback function to call when the evidence button is clicked
		 * 
		 * @type {function}
		 */
		evidenceBtnClickedCallback:null,
		
		/**
		 * A parameter to store general evidence information. This could be an id to an evidence object, 
		 * or an evidence data source etc... The contents of this field will be added to the click event
		 * and returned to the button clicked callback, as well as published to the button clicked topic.
		 */
		evidenceData:null,
		
		/**
		 * The function which is fired when the evidence button is clicked.
		 * Post to the evidence button clicked topic and fire any callback specified.
		 * 
		 */
		evidenceButtonClicked:function(anEvent){
			anEvent.evidenceData = this.evidenceData;
			topic.publish(this.evidenceButtonClickedTopic, anEvent);
			if(null != this.evidenceBtnClickedCallback){
				this.evidenceBtnClickedCallback(anEvent);
			}
		},
		
		/**
         * The constructor for an Evidence Button widget.
         * 
         * @constructor 
         */ 
        constructor: function (args) {
        	//The topic to publish to if when the button is clicked
        	var evidenceButtonClickedTopicVal = args.evidenceButtonClickedTopic;
        	if(evidenceButtonClickedTopicVal != undefined && null != evidenceButtonClickedTopicVal){
        		this.evidenceButtonClickedTopic=evidenceButtonClickedTopicVal;
        	}
        	
        	//The location that this label should be displayed
        	var displayLabelVal = args.displayLabel;
        	if(displayLabelVal != undefined && null != displayLabelVal){
        		this.displayLabel=displayLabelVal;
        	}
        	
        	//The label to display with the evidence button
        	var labelVal = args.label;
        	if(labelVal != undefined && null != labelVal){
        		this.label=labelVal;
        	}
        	
        	//Compute style classes for labels, so that they appear in the appropriate locations.
        	if(null != this.displayLabel && this.displayLabel != ""){
    			var displayLabelArray = this.displayLabel.split(',');
    			for(var i=0; i<displayLabelArray.length; i++){
    				var compasPoint = displayLabelArray[i];
    				if(compasPoint!= null && compasPoint != undefined){
    					if(compasPoint.toLowerCase() == "north"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.north_label_class="label";
    						}
    						else{
    							this.north_label_class="hide";
    						}
    					}
    					else if(compasPoint.toLowerCase() == "south"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.south_label_class="label";
    						}
    						else{
    							this.south_label_class="hide";
    						}
    					}
    					else if(compasPoint.toLowerCase() == "east"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.east_label_class="label";
    						}
    						else{
    							this.east_label_class="hide";
    						}
    					}
    					else if(compasPoint.toLowerCase() == "west"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.west_label_class="label";
    						}
    						else{
    							this.west_label_class="hide";
    						}
    					}
    				}
    			}
    		}
        }   
	});
});
