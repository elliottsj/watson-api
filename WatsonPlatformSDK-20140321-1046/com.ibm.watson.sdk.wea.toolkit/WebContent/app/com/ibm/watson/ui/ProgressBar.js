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
	"dojo/text!./templates/ProgressBar.html",
	"dojo/_base/array", 
	"dojo/_base/lang", 
	"dojo/dom-class", 
	"dijit/_Widget", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/_base/fx", 
	"dojo/string",
	"dojo/data/ItemFileReadStore"
	],
	function (declare, template, array, lang, domClass, 
			widget, templateMixin, widgetInTemplateMixin, fx, string, ItemFileReadStore) {
   
	return declare("com.ibm.watson.ui.ProgressBar", [widget, templateMixin, widgetInTemplateMixin], {
		
		/**
		 * The widget template for the progress bar
		 */
		templateString: template,
		
		/**
		 * The percentage of the progress bar
   	  	 * 
         * @type {String}
		 */
		percentage:"50",
		
		/**
		 * The left bar of the progress bar percentage. Calculated internally.
   	  	 * 
         * @type {String}
         * @private
		 */
		leftPercentage:"50",
		
		/**
		 * The right bar of the progress bar percentage. Calculated internally.
   	  	 * 
         * @type {String}
         * @private
		 */
		rightPercentage:"50",
		
		/**
		 * The class to apply to the progress bar when it reaches 100%
   	  	 * 
         * @type {String}
         * @private
		 */
		doneClass:"",
		
		/**
		 * The label to display for this progress bar
   	  	 * 
         * @type {String}
         */
		label:"",
		
		/**
		 * Comma separated list of compass points to indicate where the label is shown. 
		 * Eg. "north,south,east,west" would display the label to the top, bottom, right and left
		 * of the progress bar. 
		 * The default value is east only 
   	  	 * 
         * @type {String}
         */
		displayLabel:"east",
		
		/**
		 * The class used to display the label above the progress bar
   	  	 * 
         * @type {String}
         * @private
         */
		north_label_class:"hide",

		/**
		 * The class used to display the label string below the progress bar
   	  	 * 
         * @type {String}
         * @private
         */
		south_label_class:"hide",
		
		/**
		 * The class used to display the label string to the right of the progress bar
   	  	 * 
         * @type {String}
         * @private
         */
		east_label_class:"hide",
		
		/**
		 * The class used to display the label string below to the left of the progress bar
   	  	 * 
         * @type {String}
         * @private
         */
		west_label_class:"hide",
		
		/**
		 * The height of the progress bar. Defaults to 20px
   	  	 * 
         * @type {String}
		 */
		progressBarHeight:"20",
	
		/**
		 * The width of the progress bar. Defaults to 100px
   	  	 * 
         * @type {String}
		 */
		progressBarWidth:"100",
		
		/**
		 * The class used to display the label above the progress bar 
   	  	 * 
         * @type {String}
         * @private
         */
		north_row_class:"",

		/**
		 * The class used to display the label string below the progress bar
   	  	 * 
         * @type {String}
         * @private
         */
		south_row_class:"",
		
		constructor: function(args){
			var percentageVal = args.percentage;
			if(null != percentageVal && percentageVal != undefined){
				this.percentage = percentageVal;
			}
			if(this.percentage == "100"){
				this.doneClass = "done";
				this.leftPercentage = "width:" + this.percentage + "%";
				this.rightPercentage = "display:none";
			}
			else if(null != this.percentage && this.percentage != undefined){
				this.leftPercentage = "width:" + this.percentage + "%";
				this.rightPercentage = "width:" + (100 - this.percentage) + "%";
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
    							this.north_row_class="northRow";
    						}
    						else{
    							this.north_label_class="hide";
    							this.north_row_class="";
    						}
    					}
    					else if(compasPoint.toLowerCase() == "south"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.south_label_class="label";
    							this.south_row_class="southRow";
    						}
    						else{
    							this.south_label_class="hide";
    							this.south_row_class="";
    						}
    					}
    					else if(compasPoint.toLowerCase() == "east"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.east_label_class="label eastLabel";
    						}
    						else{
    							this.east_label_class="hide";
    						}
    					}
    					else if(compasPoint.toLowerCase() == "west"){
    						if(null != this.label && this.label != undefined && this.label != ""){
    							this.west_label_class="label westLabel";
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
