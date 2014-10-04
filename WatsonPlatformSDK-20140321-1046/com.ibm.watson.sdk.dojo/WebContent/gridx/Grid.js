//>>built
require({cache:{"url:gridx/templates/grid.html":"<div class=\"dojoxGridx\" role=\"grid\" tabindex=\"0\">\n\t<div class=\"dojoxGridxHeader\" role=\"presentation\" dojoAttachPoint=\"headerNode\"></div>\n\t<div class=\"dojoxGridxMain\" role=\"presentation\" dojoAttachPoint=\"mainNode\">\n\t\t<div class=\"dojoxGridxBody\" role=\"presentation\" dojoAttachPoint=\"bodyNode\"></div>\n\t\t<div class=\"dojoxGridxVScroller\" dojoAttachPoint=\"vScrollerNode\"><div style=\"width:1px; height: 1px;\"></div></div>\n\t\t<div class=\"clear\"></div>\n\t</div>\n\t<div class=\"dojoxGridxFooter\" dojoAttachPoint=\"footerNode\">\n\t\t<div class=\"dojoxGridxHScroller\" dojoAttachPoint=\"hScrollerNode\"><div style=\"width:1px;height: 1px\"></div></div>\n\t</div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n"}});define("gridx/Grid",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/html","dojo/_base/Deferred","dojo/query","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/grid.html","./core/Core","./modules/Header","./modules/Body","./modules/VLayout","./modules/HLayout","./modules/VScroller","./modules/HScroller","./modules/ColumnResizer"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){var _12=_1("gridx.Grid",[_7,_8,_a],{templateString:_9,postMixInProperties:function(){var _13=[_b,_c,_d,_e,_f,_10,_11];this._coreModCount=_13.length;this._eventFlags={};this.modules=_13.concat(this.modules||[]);this._initEvents(this._compNames,this._eventNames);this.reset(this);},buildRendering:function(){this.inherited(arguments);_4.toggleClass(this.domNode,"dojoxGridxRtl",!this.isLeftToRight());},postCreate:function(){this.inherited(arguments);this._postCreate();},startup:function(){if(!this._started){this.inherited(arguments);this._deferStartup.callback();}},destroy:function(){this._uninit();this.inherited(arguments);},resize:function(_14){if(_14){if(this.autoWidth){delete _14.w;}if(this.autoHeight){delete _14.h;}_4.setMarginBox(this.domNode,_14);}var ds={};this._onResizeBegin(_14,ds);this._onResizeEnd(_14,ds);},_onResizeBegin:function(){},_onResizeEnd:function(){},_dummyFunc:function(){},_compNames:["Cell","HeaderCell","Row","Header"],_eventNames:["Click","DblClick","MouseDown","MouseUp","MouseOver","MouseOut","MouseMove","ContextMenu","KeyDown","KeyPress","KeyUp"],_initEvents:function(_15,_16){_2.forEach(_15,function(_17){_2.forEach(_16,function(_18){var _19="on"+_17+_18;if(!this[_19]){this[_19]=this._dummyFunc;}},this);},this);},_connectEvents:function(_1a,_1b,_1c){_2.forEach(this._eventNames,function(_1d){this.connect(_1a,"on"+_1d.toLowerCase(),_3.hitch(_1c,_1b,_1d));},this);},_isConnected:function(_1e){return this[_1e]!==this._dummyFunc;}});_12.markupFactory=function(_1f,_20,_21){var _22=function(n){var w=_4.attr(n,"width")||"auto";if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){w=parseInt(w,10)+"px";}return w;};if(!_1f.structure&&_20.nodeName.toLowerCase()=="table"){_1f.structure=[];_6("thead > tr > th",_20).forEach(function(th,_23){var _24={name:_3.trim(_4.attr(th,"name")||th.innerHTML),field:_4.attr(th,"field"),hidden:!!_4.attr(th,"hidden"),width:_22(th)};if(_4.hasAttr(th,"id")){_24.id=_3.trim(_4.attr(th,"id"));}if(_4.hasAttr(th,"dataType")){_24.dataType=_3.trim(_4.attr(th,"dataType"));}_1f.structure.push(_24);});}return new _21(_1f,_20);};return _12;});