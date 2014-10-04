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

define(["dojo/_base/declare", "com/ibm/watson/ui/_DialogMixin", "dojo/text!./templates/ProgressDialog.html", 
        "com/ibm/watson/ui/ProgressMonitor", "dojo/dom-class", "dojo/topic",  "dojo/_base/lang", "com/ibm/watson/ui/constants/PubSubTopics"],
    function (declare, _DialogMixin, template, progressMixin, domClass, topic, lang, PubSubTopics) {
       
        return declare("com.ibm.watson.ui.ProgressDialog", [progressMixin, _DialogMixin], {
            
        	/**
             * HTML template for widget.
             *
             * @type {String}
             */ 
            templateString: template,

            /**
             * Set up pubsub subscriptions to be notified when the dialog should be opened
             * or when a user clicks the close button
             *
             * @constructor 
             */ 
            constructor: function () {
                this.inherited(arguments);
            	topic.subscribe(this.openTopic, lang.hitch(this, "open"));
            	topic.subscribe(this.closeTopic, lang.hitch(this, "close"));
            }, 
            
            
            /**
             * Close the dialog. Called when a user clicks the close button in the progress dialog.  
             * 
             * @private
             */
            closeDialog: function () {
            	this.close();
                this.closeMonitor();
            },
            
            /**
             * User clicked the cancel button in the progress dialog.
             * Close the dialog and perform any actions required.
             * 
             * @private
             */
            cancelDialog: function(){
            	this.close();
            	this.cancelMonitor();
            }
           
        });
    });
