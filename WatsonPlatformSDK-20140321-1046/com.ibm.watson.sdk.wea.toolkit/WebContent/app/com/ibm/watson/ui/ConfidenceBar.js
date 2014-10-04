/* ***************************************************************** */
/*                                                                   */
/* (C) Copyright IBM Corp. 2001, 2013                                */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define(["dojo/_base/declare", "dojo/text!./templates/ConfidenceBar.html",
        "dojo/topic", "dojo/_base/array", "dojo/_base/lang", 
        "dojo/dom-class", "dijit/_Widget", "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin", "dojox/mvc/_DataBindingMixin", "dojo/_base/fx", "dojo/string"],
    function (declare, template, topic, array,
        lang, domClass, widget, templateMixin, widgetInTemplateMixin, dataBindingMixin, fx, string) {

	return declare("com.ibm.watson.ui.ConfidenceBar", [widget, templateMixin, widgetInTemplateMixin, dataBindingMixin], {
		
		/**
   	  	 * The width of the confidence bar to display. Optional. Defaults to 48px
         * 
         * @type {String}
         */
		confidenceBarWidth:"48",
		
		/**
   	  	 * The height for a confidence bar to display, Optional. Defaults to 16px
         * 
         * @type {String}
         */
		confidenceBarHeight:"16",
		
		/**
   	  	 * Set to true to show the smaller 3 box version of the confidence bar
         * 
         * @type {Boolean}
         */
		useSmallConfidenceBars:"false",
		
		/**
   	  	 * Set to true if the confidence bar is being placed on a dark background and you want a darker grey dispalyed in the confidence bars.
         * 
         * @type {Boolean}
         */
		useDarkBackground:"false",
		
		/**
   	  	 * The template for a confidence bar
         * 
         * @type {String}
         */
		templateString:template,
		
		/**
		 * The percentage confidence level to display. 
  	  	 * 
         * @type {float}
         */
		confidence:0,
		
		/**
		 * Comma separated list of compass points to indicate where the confidence percentage is shown. 
		 * Eg. "north,south,east,west" would display the percentage to the top, bottom, right and left
		 * of the confidence bar. 
		 * The default value is north only 
  	  	 * 
         * @type {String}
         */
		displayPercentage:"east",
		
		/**
		 * Comma separated list of compass points to indicate where the confidence level is shown. 
		 * Eg. "north,south,east,west" would display the confidence level to the top, bottom, right and left
		 * of the confidence bar. 
		 * The default value is north only
  	  	 * 
        * @type {String}
        */
		displayLevel:"east",
		
		
		/**
		 * Comma separated list of confidence levels. The confidence bar supports 3 confidence levels. 
		 * By default these are "Low", "Medium" and "High", but these display values can be changed using this attribute.
		 * The list must be in the form <Low Level String>,<Medium Level String>,<Hight Level String>
		 * The default value is "Low,Medium,High"
		 *  
        * @type {String}
        */
		confidenceLevelStrings:"Very Low,Low,Medium,High,Very High",
		
		/**
		 * Comma separated list of clipped confidence levels. The confidence bar supports 3 confidence levels, whose 
		 * display values are customizable using the confidenceLevelStrings attribute. However occasionally those
		 * strings are too long to be displayed in the UI. In that case, shorter (clipped) versions can be provided which will
		 * be displayed instead of the full version.  
		 * The list must be in the form <Low Level Clipped String>,<Medium Level Clipped String>,<High Level Clipped String>
		 * The default value is "Low,Med,High"
		 * 
        * @type {String}
        */
		confidenceLevelClippedStrings:"V Low,Low,Med,High,V High",
		
		/**
		 * The confidence bar supports 3 confidence levels, whose display values are customizable using the confidenceLevelStrings attribute. 
		 * However occasionally those strings are too long to be displayed in the UI. In that case, shorter (clipped) versions can be provided 
		 * using the confidenceLevelClippedStrings attribute. Set clipConfidenceLevelString to true, to display the clipped version
		 * of the confidence levels.  
  	  	 * 
        * @type {Boolean}
        */
		clipConfidenceLevelString:false,
		
		/**
		 * A comma separated list of confidence levels. For a 5 box version of the confidence bar, 4 confidence levels are needed.
		 * The default is "10,40,70,80", or "40,70" for the 3 box version.
		 * The confidence levels need to be set in the form "<very low cut off>,<low cut off>,<medium cut off>,<high cut off>"
		 * Any value greater than the high cut off is considered very high
		 * For a 3 box version of the confidence bar, only 2 confidence levels are needed, in the form "<low cut off>,<medium cut off>"
  	  	 * 
         * @type {String}
         */
		confidenceLevels:"10,40,70,80",
		
		/**
		 * A comma separated list of confidence level classes to use. For a 5 box version of the confidence bar, 5 confidence levels are needed.
		 * The default is "very_low,low,moderate,high,very_high" or "low,moderate,high" for the 3 box version. 
		 * The confidence level classes need to be set in the form "<very low class>,<low class>,<medium class>,<high class>,<very high class>"
		 * For a 3 box version of the confidence bar, only 3 confidence classes are needed, in the form "<low class>,<medium class>,<high class>"
  	  	 * 
         * @type {String}
         */
		confidenceLevelClasses:"very_low,low,moderate,high,very_high",
		
		/**
		 * Class used to display the confidence level. Either 'low', 'moderate' or 'high'. Sets the background image etc.. for the 
		 * confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		confidence_level_class:"",
		
		/**
		 * The string to display for the confidence level. 
  	  	 * 
         * @type {String}
         * @private
         */
		confidence_level_display_val:"",
		
		/**
		 * The class used to display the confidence level string above the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		north_confidence_level_class:"hide",
		
		/**
		 * The class used to display the percentage above the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		north_confidence_percentage_class:"hide",
		
		/**
		 * The class used to display the confidence level string below the confidence bar
  	  	 * 
         * @type {String}
          * @private
        */
		south_confidence_level_class:"hide",
		
		/**
		 * The class used to display the percentage string below the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		south_confidence_percentage_class:"hide",
		
		/**
		 * The class used to display the confidence level string to the left of the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		east_confidence_level_class:"hide",
		
		/**
		 * The class used to display the percentage string to the right of the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		east_confidence_percentage_class:"hide",
		
		/**
		 * The class used to display the confidence level string to the right of the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		west_confidence_level_class:"hide",
		
		/**
		 * The class used to display the percentage string below to the left of the confidence bar
  	  	 * 
         * @type {String}
         * @private
         */
		west_confidence_percentage_class:"hide",
		
		/**
         * Create a new Confidence bar widget. 
         * 
         * @constructor 
         */ 
        constructor: function (args) {
        	
        	//Boolean flag to set whether to use light or dark grey in the confidence bars
        	var useDarkBackgroundVal = args.useDarkBackground;
        	if(useDarkBackgroundVal != undefined && null != useDarkBackgroundVal){
        		this.useDarkBackground=useDarkBackgroundVal;
        	}
        	
        	//Boolean flag to set to use small confidence bars with 3 boxes instead of 5
        	var useSmallConfidenceBarsVal = args.useSmallConfidenceBars;
        	if(useSmallConfidenceBarsVal != undefined && null != useSmallConfidenceBarsVal){
        		this.useSmallConfidenceBars=useSmallConfidenceBarsVal;
        	}
        	
        	//The height of the confidence bars to create. This is an override for the css styles that are applied 
        	var confidenceBarHeightVal = args.confidenceBarHeight;
        	if(confidenceBarHeightVal != undefined && null != confidenceBarHeightVal){
        		this.confidenceBarHeight=confidenceBarHeightVal;
        	}
        	
        	//Confidence level to work from 
        	var confidenceVal = args.confidence;
        	if(confidenceVal != undefined && null != confidenceVal){
        		this.confidence=confidenceVal;
        	}
        	
        	//The width to use to create the confidence bars.
        	var confidenceBarWidthVal = args.confidenceBarWidth;
        	if(confidenceBarWidthVal != undefined && null != confidenceBarWidthVal){
        		this.confidenceBarWidth=confidenceBarWidthVal;
        	}  
        	
        	//Where do we want to display the percentage
        	var displayPercentageVal = args.displayPercentage;
        	if(displayPercentageVal != undefined && null != displayPercentageVal){
        		this.displayPercentage=displayPercentageVal;
        	}
        	if(null != this.displayPercentage && this.displayPercentage != ""){
    			var displayPercentageArray = this.displayPercentage.split(',');
    			for(var i=0; i<displayPercentageArray.length; i++){
    				var compasPoint = displayPercentageArray[i];
    				if(compasPoint!= null && compasPoint != undefined){
    					if(compasPoint.toLowerCase() == "north"){
    						this.north_confidence_percentage_class="percentage north";
    					}
    					else if(compasPoint.toLowerCase() == "south"){
    						this.south_confidence_percentage_class="percentage south";
    					}
    					else if(compasPoint.toLowerCase() == "east"){
    						this.east_confidence_percentage_class="percentage east";
    					}
    					else if(compasPoint.toLowerCase() == "west"){
    						this.west_confidence_percentage_class="percentage west";
    					}
    				}
    			}
    		}
        	
        	//Where do we want to display the confidence levels
        	var displayLevelVal = args.displayLevel;
        	if(displayLevelVal != undefined && null != displayLevelVal){
        		this.displayLevel=displayLevelVal;
        	}
        	if(null != this.displayLevel && this.displayLevel != ""){
    			var displayLevelArray = this.displayLevel.split(',');
    			for(var i=0; i<displayLevelArray.length; i++){
    				var compasPoint = displayLevelArray[i];
    				if(compasPoint!= null && compasPoint != undefined){
    					if(compasPoint.toLowerCase() == "north"){
    						this.north_confidence_level_class="confidence_level north";
    					}
    					else if(compasPoint.toLowerCase() == "south"){
    						this.south_confidence_level_class="confidence_level south";
    					}
    					else if(compasPoint.toLowerCase() == "east"){
    						this.east_confidence_level_class="confidence_level east";
    					}
    					else if(compasPoint.toLowerCase() == "west"){
    						this.west_confidence_level_class="confidence_level west";
    					}
    				}
    			}
    		}
        	
        	//Do we want display the clipped confidence level strings or not
        	var clipConfidenceLevelStringVal = args.clipConfidenceLevelString;
        	if(clipConfidenceLevelStringVal != undefined && null != clipConfidenceLevelStringVal){
        		this.clipConfidenceLevelString=clipConfidenceLevelStringVal;
        	}

        	//What confidence level strings do we want to display
        	var confidenceLevelStringsVal = args.confidenceLevelStrings;
        	if(confidenceLevelStringsVal != undefined && null != confidenceLevelStringsVal){
        		//user has specified confidence level strings to use.
        		//If we are showing the small version of the bars
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			//check to make sure they gave us 3 confidence levels to use
        			var confidenceLevelStringArray = confidenceLevelStringsVal.split(',');
    				if( null != confidenceLevelStringArray && confidenceLevelStringArray.length==3){
    					this.confidenceLevelStrings=confidenceLevelStringArray;
    				}
    				else{
    					//confidence levels given do not contain 3 levels so use defaults
    					this.confidenceLevelStrings=["Low","Medium","High"];
    				}
        		}
        		else{
        			//we are displaying the larger 5 box confidence bars. Check that the user gave us 5 confidence level string
        			var confidenceLevelStringArray = confidenceLevelStringsVal.split(',');
    				if( null != confidenceLevelStringArray && confidenceLevelStringArray.length==5){
    					this.confidenceLevelStrings=confidenceLevelStringArray;
    				}
    				else{
    					//we were not given 5 confidence levels, use defaults. Just split our default string and store it back as an array. 
    					var confidenceLevelStringArray = this.confidenceLevelStrings.split(',');
        				if( null != confidenceLevelStringArray && confidenceLevelStringArray.length==5){
        					this.confidenceLevelStrings=confidenceLevelStringArray;
        				}
    				}
        		}
        	}
        	else{
        		//no confidence levels given so use defaults.
        		//If we need to show the smaller confidence bars, reset the default to our 3 confidence levels
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			this.confidenceLevelStrings=["Low","Medium","High"];
        		}
        		else{
        			//We are showing the larger 5 box confidence bars, so just split our default string and save it back as an array.
        			var confidenceLevelStringArray = this.confidenceLevelStrings.split(',');
        			if( null != confidenceLevelStringArray && confidenceLevelStringArray.length==5){
        				this.confidenceLevelStrings=confidenceLevelStringArray;
        			}
        		}
        	}
        	
        	//What clipped version of the confidence level strings do we want to display
        	var confidenceLevelClippedStringsVal = args.confidenceLevelClippedStrings;
        	if(confidenceLevelClippedStringsVal != undefined && null != confidenceLevelClippedStringsVal){
        		//user has specified clipped confidence level strings to use.
        		//If we are showing the small version of the bars
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			//check to make sure they gave us 3 clipped confidence levels to use
        			var confidenceLevelClippedStringArray = confidenceLevelClippedStringsVal.split(',');
        			if( null != confidenceLevelClippedStringArray && confidenceLevelClippedStringArray.length==3){
        				this.confidenceLevelClippedStrings=confidenceLevelClippedStringArray;
        			}
        			else{
        				//clipped confidence levels given do not contain 3 levels so use defaults
    					this.confidenceLevelClippedStrings=["Low","Med","High"];
        			}
        		}
        		else{
        			//we are displaying the larger 5 box confidence bars. Check that the user gave us 5 cilpped confidence level string
        			var confidenceLevelClippedStringArray = confidenceLevelClippedStringsVal.split(',');
        			if( null != confidenceLevelClippedStringArray && confidenceLevelClippedStringArray.length==5){
        				this.confidenceLevelClippedStrings=confidenceLevelClippedStringArray;
        			}
        			else{
        				//we were not given 5 clipped confidence levels, use defaults. Just split our default string and store it back as an array. 
    					var confidenceLevelClippedStringArray = this.confidenceLevelClippedStrings.split(',');
        				if( null != confidenceLevelClippedStringArray && confidenceLevelClippedStringArray.length==5){
        					this.confidenceLevelClippedStrings=confidenceLevelClippedStringArray;
        				}
        			}
        		}
        	}
        	else{
        		//no clipped confidence levels given so use defaults.
        		//If we need to show the smaller confidence bars, reset the default to our 3 clpped confidence levels
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			this.confidenceLevelClippedStrings=["Low","Med","High"];
        		}
        		else{
        			//We are showing the larger 5 box confidence bars, so just split our default string and save it back as an array.
        			var confidenceLevelClippedStringArray = this.confidenceLevelClippedStrings.split(',');
    				if( null != confidenceLevelClippedStringArray && confidenceLevelClippedStringArray.length==5){
    					this.confidenceLevelClippedStrings=confidenceLevelClippedStringArray;
    				}
        		}
        	}
        	
        	//What confidence level values do we want to use to decide what style to apply to the confidence bars
        	var confidenceLevelsVal = args.confidenceLevels;
        	if(confidenceLevelsVal != undefined && null != confidenceLevelsVal){
        		//user has specified clipped confidence level strings to use.
        		//If we are showing the small version of the bars
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && 
        				(this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			//check to make sure they gave us 2 confidence levels to use
        			var confidenceLevelsArray = confidenceLevelsVal.split(',');
        			if( null != confidenceLevelsArray && confidenceLevelsArray.length==2){
        				this.confidenceLevels=confidenceLevelsArray;
        			}
        			else{
        				//confidence levels given do not contain 2 levels so use defaults
    					this.confidenceLevels=["40","70"];
        			}
        		}
        		else{
        			//we are displaying the larger 5 box confidence bars. Check that the user gave us 4 confidence levels
        			var confidenceLevelsArray = confidenceLevelsVal.split(',');
        			if( null != confidenceLevelsArray && confidenceLevelsArray.length==4){
        				this.confidenceLevels=confidenceLevelsArray;
        			}
        			else{
        				//we were not given 4 confidence levels, use defaults. Just split our default string and store it back as an array. 
    					var confidenceLevelsArray = this.confidenceLevels.split(',');
        				if( null != confidenceLevelsArray && confidenceLevelsArray.length==4){
        					this.confidenceLevels=confidenceLevelsArray;
        				}
        			}
        		}
        	}
        	else{
        		//no confidence levels were given, so use defaults
        		//If we need to show the smaller confidence bars, reset the default to our 2 default confidence levels
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			this.confidenceLevels=["40","70"];
        		}
        		else{
        			//We are showing the larger 5 box confidence bars, so just split our default string and save it back as an array.
        			var confidenceLevelsArray = this.confidenceLevels.split(',');
    				if( null != confidenceLevelsArray && confidenceLevelsArray.length==4){
    					this.confidenceLevels=confidenceLevelsArray;
    				}
        		}
        	}
        	
        	//What confidence level classes do we want to use
        	var confidenceLevelClassesVal = args.confidenceLevelClasses;
        	if(confidenceLevelClassesVal != undefined && null != confidenceLevelClassesVal){
        		//user has specified confidence class strings to use.
        		//If we are showing the small version of the bars
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			//check to make sure they gave us 3 classes
        			var confidenceLevelClassesArray = confidenceLevelClassesVal.split(',');
        			if( null != confidenceLevelClassesArray && confidenceLevelClassesArray.length==3){
        				this.confidenceLevelClasses=confidenceLevelClassesArray;
        			}
        			else{
        				//classes given do not contain 3 levels so use defaults
    					this.confidenceLevelClasses=["low","moderate","high"];
        			}
        		}
        		else{
        			//we are displaying the larger 5 box confidence bars. Check that the user gave us 5 classes
        			var confidenceLevelClassesArray = confidenceLevelClassesVal.split(',');
        			if( null != confidenceLevelClassesArray && confidenceLevelClassesArray.length==5){
        				this.confidenceLevelClasses=confidenceLevelClassesArray;
        			}
        			else{
        				//we were not given 5 classes, use defaults. Just split our default string and store it back as an array. 
    					var confidenceLevelClassesArray = this.confidenceLevelClasses.split(',');
        				if( null != confidenceLevelClassesArray && confidenceLevelClassesArray.length==5){
        					this.confidenceLevelClasses=confidenceLevelClassesArray;
        				}
        			}
        		}
        	}
        	else{
        		//no confidence level classes given so use defaults.
        		//If we need to show the smaller confidence bars, reset the default to our 3 confidence classes
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			this.confidenceLevelClasses=["low","moderate","high"];
        		}
        		else{
        			//We are showing the larger 5 box confidence bars, so just split our default string and save it back as an array.
        			var confidenceLevelClassesArray = this.confidenceLevelClasses.split(',');
    				if( null != confidenceLevelClassesArray && confidenceLevelClassesArray.length==5){
    					this.confidenceLevelClasses=confidenceLevelClassesArray;
    				}
        		}
        	}
        	
        	//Now we have all the information we need to calculate what style class to display for this confidence bar
        	if(null != this.confidence && this.confidence != undefined){
        		//we have a confidence level, need to see where that fits in our confidence levels
        		//If we are showing the small bars, then we expect 2 confidence levels. 
        		if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        			if(null != this.confidenceLevels && this.confidenceLevels!=undefined){
        				//get the medium and high cut offs.
        				var mediumCutOff = this.confidenceLevels[0];
        				var highCutOff = this.confidenceLevels[1];
        				//if this is low confidence
        				if(this.confidence<mediumCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[0];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[0];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[0];
            				}
            			}
        				//if this is medium confidence
            			else if(this.confidence>=mediumCutOff && this.confidence<highCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[1];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[1];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[1];
            				}
            			}
        				//if this is high confidence
            			else if(this.confidence>=highCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[2];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[2];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[2];
            				}
            			}
        			}
        		}
        		//we are using large confidence bars, we expect 4 confidence levels
        		else{
        			if(null != this.confidenceLevels && this.confidenceLevels!=undefined){
        				//get the cut offs
	        			var veryLowCutOff = this.confidenceLevels[0];
	        			var lowCutOff  = this.confidenceLevels[1];
	        			var mediumCutOff  = this.confidenceLevels[2];
	        			var highCutOff = this.confidenceLevels[3];
	        			//if this is low confidence
        				if(this.confidence<veryLowCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[0];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[0];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[0];
            				}
            			}
        				//if this is medium confidence
            			else if(this.confidence>=veryLowCutOff && this.confidence<lowCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[1];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[1];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[1];
            				}
            			}
        				//if this is medium confidence
            			else if(this.confidence>=lowCutOff && this.confidence<mediumCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[2];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[2];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[2];
            				}
            			}
        				//if this is medium confidence
            			else if(this.confidence>=mediumCutOff && this.confidence<highCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[3];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[3];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[3];
            				}
            			}
        				//if this is high confidence
            			else if(this.confidence>=highCutOff){
            				this.confidence_level_class = this.confidenceLevelClasses[4];
            				if(null != this.clipConfidenceLevelString && this.clipConfidenceLevelString != undefined 
            	        			&& (this.clipConfidenceLevelString==true || this.clipConfidenceLevelString=='true')){
            					this.confidence_level_display_val = this.confidenceLevelClippedStrings[4];
            				}
            				else{
            					this.confidence_level_display_val =  this.confidenceLevelStrings[4];
            				}
            			}
        			}
        		}
        	}
        }, 
        
        buildRendering:function(){
        	this.inherited(arguments);
        	/* Each box is 4 times the width of a space.
        	 * For x (5) boxes there are x-1 (4) spaces.
        	 * Each box is 4 times as wide as a space.
        	 * So given a width of y pixels (100), it consists of (x*4 pixels for each box and (x-1)pixels for each space).
        	 * If each space is 1 px, then that would x*4*1 = 20px for the boxes and (x-1)*1 = 4px for the spaces.
        	 * So our minimum size is ((x*4) + x-1)px = 24px.
        	 * Divide the width by our minimum (100)/24 = 4 (can't do less than whole numbers).
        	 * So the minimum pixels width multiplied by 4 is the width of the boxes. In this case 4*4= 16px for the boxes and 4*1 = 4px for the spaces.
        	 * 
        	 * Assuming we still get percentages for confidence values, we need to calculate how many boxes to light up.  
        	 */
        	var numBoxesToCreate = 5;
        	if(this.useSmallConfidenceBars != null && this.useSmallConfidenceBars != undefined && (this.useSmallConfidenceBars == true || this.useSmallConfidenceBars == "true")){
        		numBoxesToCreate = 3;
        	}
        	if(null != numBoxesToCreate && numBoxesToCreate != undefined){
        		var min = (numBoxesToCreate * 4) + (numBoxesToCreate -1);
        		var numColoredBars = numBoxesToCreate*(this.confidence/100);
        		var multipleFactor = this.confidenceBarWidth/min;
        		var boxWidth = 4 * multipleFactor;
        		var spaceWidth = multipleFactor;
        		var rendering = "";
        		var greyStyleClassToApply = "confidenceBarGray";
        		if(this.useDarkBackground != null && this.useDarkBackground != undefined && (this.useDarkBackground == true || this.useDarkBackground == "true")){
            		greyStyleClassToApply = "confidenceBarGray dark";
            	}
        		
        		for(var i = 0; i< numBoxesToCreate; i++){
        			if(i<numColoredBars){
            			if(this.confidenceBarHeight>0){
            				rendering = rendering + "<span style='height:"+ this.confidenceBarHeight +"px;width:"+boxWidth+"px' class='"+this.confidence_level_class+"'></span>";
            			}
            			else{
            				rendering = rendering + "<span style='width:"+boxWidth+"px' class='"+this.confidence_level_class+"'></span>";
            			}
            		}
            		else{
            			if(this.confidenceBarHeight>0){
            				rendering = rendering + "<span style='height:"+ this.confidenceBarHeight +"px;width:"+boxWidth+"px' class='"+greyStyleClassToApply+"'></span>";
            			}
            			else{
            				rendering = rendering + "<span style='width:"+boxWidth+"px' class='"+greyStyleClassToApply+"'></span>";
            			}
            		}
        			if(i<numBoxesToCreate){
        				rendering = rendering + "<span style='display:inline-block;height:"+ this.confidenceBarHeight +"px;width:"+spaceWidth+"px'></span>";
        			}
        		}
        	}
        	this.confidenceBarAttach.innerHTML = rendering;
        }
        
	});
});
