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
        	"dojo/_base/lang",
        	"dojo/string",
        	"dojox/form/Rating",
        	"dojo/text!./templates/RatingSystem.html",
        	"dojo/text!./templates/RatingSystemStars.html",
        	"dojo/dom-attr",
        	"com/ibm/watson/ui/constants/PubSubTopics"],
    function (declare, lang, string, rating, ratingSystem, ratingSystemStars, domAttr, PubSubTopics) {

	return declare("com.ibm.watson.ui.RatingSystem", [rating], {
		
		/**
		 * The number of stars to show for this ratings widget.
		 * Default is 5.
		 * 
		 * @type {int}
		 */
		numStars: 5,
		
		/**
		 * The template used to lay out the stars in the rating system
		 * 
		 * @type {String}
		 */
		ratingSystemTemplate:ratingSystem,
		
		/**
		 * The template used to create each of the stars in the rating system
		 * 
		 * @type {String}
		 */
		ratingSystemStarTemplate:ratingSystemStars,

		/**
		 * The label that should appear along with the rating system
		 * Can be positioned, above, below, to the left or to the right
		 * of the stars. 
   	  	 * 
         * @type {String}
         */
		label:"",
		
		/**
		 * The hover text to appear for the stars. Must be in the form or a 
		 * comma separate list of hover text strings. One for each star.
		 * If the number of hover text strings does not match the number
		 * or stars, the hover text will not be displayed.  
   	  	 * 
         * @type {String}
         */
		hoverText:"",
		
		/**
		 * An array containing the hover text strings for each star. This
		 * is the parsed version of hoverText.  
   	  	 * 
         * @type {String}
         * @private
         */
		hoverTextArray:null,

		/**
		 * Compass points to indicate where the label is shown. 
		 * Eg. "north", "south", "east" or "west"
		 * The default value is east 
   	  	 * 
         * @type {String}
         */
		displayLabel:"west",
		
		/**
		 * The class used to display the label above the star selector
   	  	 * 
         * @type {String}
         * @private
         */
		north_label_class:"hide",

		/**
		 * The class used to display the label string below the star selector
   	  	 * 
         * @type {String}
         * @private
         */
		south_label_class:"hide",
		
		/**
		 * The class used to display the label string to the right of the star selector
   	  	 * 
         * @type {String}
         * @private
         */
		east_label_class:"hide",
		
		/**
		 * The class used to display the label string below to the left of the star selector
   	  	 * 
         * @type {String}
         * @private
         */
		west_label_class:"hide",
		
		/**
		 * The topic to publish	to when the rating is changed
   	  	 * 
         * @type {String}
         */
		ratingChangedTopic:PubSubTopics.WATSON_RATING_VALUE_CHANGED,
		
		/**
		 * Callback function to call when the evidence button is clicked
		 * 
		 * @type {function}
		 */
		ratingChangedCallback:null,
		
		/**
		 * A parameter to store general evidence information. This could be an id to an evidence object, 
		 * or an evidence data source etc... The contents of this field will be added to the click event
		 * and returned to the rating changed callback, as well as published to the rating changed topic.
		 */
		evidenceData:null,
		
		/**
         * Constructor for the Rating System widget
         * 
         * @constructor 
         */ 
        constructor: function (params){
        	
        	//The topic to publish to if when the rating is changed
        	var ratingChangedTopicVal = params.ratingChangedTopic;
        	if(ratingChangedTopicVal != undefined && null != ratingChangedTopicVal){
        		this.ratingChangedTopic=ratingChangedTopicVal;
        	}
        	
        	//Get the label for the rating system
    		var labelVal = params.label;
        	if(null != labelVal && labelVal != undefined){
        		this.label=labelVal;
        	}
        	
        	//Get the displayLable parameter to calculate the location to display the label
        	if(null != this.displayLabel && this.displayLabel != undefined && this.displayLabel != ""){
    			if(this.displayLabel.toLowerCase() == "north"){
    				this.north_label_class="label north";
    			}
				else if(this.displayLabel.toLowerCase() == "south"){
					this.south_label_class="label south";
				}
				else if(this.displayLabel.toLowerCase() == "east"){
					this.east_label_class="label east";
				}
				else if(this.displayLabel.toLowerCase() == "west"){
					this.west_label_class="label west";
				}
    		}
        	
        	//Get the hover text labels to display for the starts
        	var hoverTextVal = params.hoverText;
        	if(null != hoverTextVal && hoverTextVal != undefined){
        		this.hoverText=hoverTextVal;
        	}
        	if(null != this.hoverText && this.hoverText != ""){
    			var hoverTextArrayVal = this.hoverText.split(',');
    			if(null != hoverTextArrayVal && hoverTextArrayVal != undefined && hoverTextArrayVal.length>0){
    				this.hoverTextArray = hoverTextArrayVal;
    			}
        	}
        },
        
        /**
         * Override buildRendering to compute the generated template for the ratings widget to be displayed.
         */
        buildRendering: function(){
        	var tpl = this.ratingSystemTemplate;
    		var starTpl = this.ratingSystemStarTemplate;
    		var rendered = "";
    		for(var i = 0; i < this.numStars; i++){
    			if(this.hoverTextArray != null && this.hoverTextArray != undefined && this.hoverTextArray.length == this.numStars){
    				rendered += string.substitute(starTpl, {value:i+1,title:this.hoverTextArray[i]});
    			}
    			else{
    				rendered += string.substitute(starTpl, {value:i+1,title:i+1});
    			}
    		}
    		this.templateString = string.substitute(tpl, {stars:rendered,
    			ratingLabel:this.label,
    			north_label_class:this.north_label_class,
    			south_label_class:this.south_label_class,
    			east_label_class:this.east_label_class,
    			west_label_class:this.west_label_class
    			});
    		this.inherited(arguments);
        },
    	
    	 /**
         * Override to perform custom mouse out behavior.
         */
        _onMouseOut: function(evt){
    		this._renderStars(this.value);
    	},
    	
    	/**
		 * The function which is fired when the rating value is changed.
		 * Post to the rating changed topic and fire any callback specified.
		 * 
		 */
		onStarClick:function(anEvent){
			this.inherited(arguments);
			anEvent.evidenceData = this.evidenceData;
			topic.publish(this.ratingChangedTopic, anEvent);
			if(null != this.ratingChangedCallback){
				this.ratingChangedCallback(anEvent).call();
			}
		}
	});
});
