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

define(["dojo/_base/declare", "dijit/_Widget", "dijit/_TemplatedMixin",
       "dijit/_WidgetsInTemplateMixin", "dijit/DialogUnderlay",
       "dojo/dom-style", "dojo/has", "dojo/_base/lang", "dojo/_base/fx", "dojo/dom-class"],
    function (declare, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, DialogUnderlay, domStyle, has, lang, fx, domClass) {
        /**
         * Lightweight dialog class with mobile support, using CSS 
         * transitions for fadeIn/fadeOut if supported.
         * 
         * @class
         * @author James Thomas
         */
        return declare("com.ibm.watson.ui._DialogMixin",[_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            /**
             * Dialog underlay to stop user modifying UI 
             * whilst question is being answered. Borrows Dijits
             * native control to do this for us...
             *
             * @type {Object}
             */ 
            underlay: null,

            /** 
             * Fade dialog method to use, depends on platform support
             * for CSS3 Transitions.
             *
             * @type {String}
             */
            fadeMethod: has("csstransition") ? "CssTransitions" : "DojoFX",

            /**
             *
             * @constructor 
             */ 
            constructor: function () {
                this.underlay = new DialogUnderlay();
            }, 

            /**
             * Open the progress dialog, reset back to initial progress state;
             */ 
            open: function () {
                this._showOverlay(true);
                this._fadeInDialog(true);
            },

            /**
             * Close the progress dialog, with optional delay before hiding.
             *
             * @param {Number} delay - (Optional) delay before hiding
             */ 
            close: function (delay) {
                var close = lang.hitch(this, function () {
                    this._fadeInDialog(false, lang.hitch(this, "_showOverlay", false));
                });
                setTimeout(close, delay || 0);
            },

            /**
             * Dynamically fade the dialog in or out of the page,
             * using support fade transitions.
             *
             * @param {boolean} fadeIn - Fade in or out
             * @param {object} callback - optional callback exected after transition event
             * @private
             */ 
            _fadeInDialog: function (fadeIn, callback) {
                var method = fadeIn ? "fadeIn" : "fadeOut";
                this["_" + method + "Using" + this.fadeMethod](callback);
            },

            /**
             * Fade dialog out using CSS transitions. Adding class
             * to trigger transition effects. Use manual timer to execute 
             * callback as attaching to transition events is tricky across
             * browsers....
             *
             * @param {object} callback - optional callback exected after transition event
             * @private
             */ 
            _fadeOutUsingCssTransitions: function (callback) {
                domClass.remove(this.domNode, "open");
                setTimeout(callback, 250);
            },

            /**
             * Fade dialog into the page using CSS transitions. Remove class from 
             * page to trigger event, use setTimeout to allow "display" property to trake 
             * effect first.
             *
             * @private
             */ 
            _fadeInUsingCssTransitions: function () {
                setTimeout(lang.hitch(this, function () {
                    domClass.add(this.domNode, "open");
                }), 0);
            },

            /**
             * Fade dialog from the page using Dojo FX when CSS transitions aren't supported.
             *
             * @param {object} callback - optional callback exected after transition event
             * @private
             */ 
            _fadeOutUsingDojoFX: function (callback) {
                fx.fadeOut({node: this.domNode, onEnd: callback, duration: 250}).play();
            },

            /**
             * Fade dialog into the page using Dojo FX when CSS transitions aren't supported.
             *
             * @private
             */ 
            _fadeInUsingDojoFX: function () {
                fx.fadeIn({node: this.domNode, duration: 250}).play();
            },

            /**
             * Show or hide the overlay and set the dialog's display property to 
             * ensure it's hidden when not in use.
             *
             */ 
            _showOverlay: function (visible) {
                try {
                    var display = visible ? "block" : "", show = visible ? "show" : "hide";
                    this.underlay[show]();
                    domStyle.set(this.domNode, "display", display);
                } catch (e) {
                    // We're seeing a strange bug where setTimeout is being fired twice,
                    // causing us to try and remove the non-existing background. If this happens
                    // just swallow so the user doesn't see the console.error
                }
            }
        });
    });
