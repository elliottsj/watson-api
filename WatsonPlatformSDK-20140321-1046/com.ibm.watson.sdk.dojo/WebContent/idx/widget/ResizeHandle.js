//>>built
define("idx/widget/ResizeHandle",["dojo/_base/declare","dojo/_base/html","dojo/_base/event","dojo/keys","dojox/layout/ResizeHandle","idx/resources"],function(_1,_2,_3,_4,_5,_6){return _1("idx.widget.ResizeHandle",_5,{postCreate:function(){this.inherited(arguments);var _7=_6.getResources("idx/widget/ResizeHandle",this.lang);var _8=_7.idxResizeHandle_resize;_2.attr((this.resizeHandle.firstChild||this.resizeHandle),"innerHTML","<span class='idxResizeHandleText' title='"+_8+"'>/</span>");_2.attr(this.resizeHandle,"tabindex",0);this.connect(this.resizeHandle,"keypress",this._onKeyPress);},_onKeyPress:function(_9){if(_9&&_9.shiftKey){var _a=_9.keyCode;var _b=_4;if((this._resizeX&&(_a==_b.LEFT_ARROW||_a==_b.RIGHT_ARROW))||(this._resizeY&&(_a==_b.UP_ARROW||_a==_b.DOWN_ARROW))){this.targetWidget=dijit.byId(this.targetId);this.targetDomNode=(this.targetContainer||(this.targetWidget?this.targetWidget.domNode:_2.byId(this.targetId)));if(this.targetDomNode){var _c=(this.targetWidget?_2.marginBox(this.targetDomNode):_2.contentBox(this.targetDomNode));this.startSize={w:_c.w,h:_c.h};this._changeSizing(_9);if(!this.intermediateChanges){this.onResize(_9);}_3.stop(_9);}}}},_getNewCoords:function(_d){if(_d&&_d.keyCode){var _e=_d.keyCode;var _f=_4;var w=this.startSize.w;var h=this.startSize.h;var d=10;if(_e==_f.UP_ARROW){h-=d;}else{if(_e==_f.DOWN_ARROW){h+=d;}else{if(_e==_f.LEFT_ARROW){if(this.isLeftToRight()){w-=d;}else{w+=d;}}else{if(_e==_f.RIGHT_ARROW){if(this.isLeftToRight()){w+=d;}else{w-=d;}}}}}return this._checkConstraints(w,h);}return this.inherited(arguments);},_setResizeAxisAttr:function(_10){_2.removeClass(this.resizeHandle,this._getResizeClass());this._resizeAxis=_10;this._resizeX=(_10.indexOf("x")>-1);this._resizeY=(_10.indexOf("y")>-1);dojo.addClass(this.resizeHandle,this._getResizeClass());},_getResizeClass:function(){var _11=this._resizeAxis;var cls;if(_11=="xy"){cls="dojoxResizeNW";}else{if(_11=="x"){cls="dojoxResizeW";}else{if(_11=="y"){cls="dojoxResizeN";}else{cls="";}}}return cls;}});});