//>>built
define("gridx/modules/ColumnResizer",["dojo/_base/declare","dojo/_base/html","dojo/_base/sniff","dojo/_base/window","dojo/query","../core/_Module"],function(_1,_2,_3,_4,_5,_6){return _6.registerModule(_1("gridx.modules.ColumnResizer",_6,{name:"columnResizer",resizeNode:null,minWidth:20,detectWidth:5,load:function(_7){var g=this.grid,_8=_4.body();this.batchConnect([g,"onHeaderMouseMove","_mousemove"],[g,"onHeaderMouseOut","_mouseout"],[g,"onHeaderMouseDown","_mousedown",this,this.name],[_8,"mousemove","_docMousemove"],[_8,"onmouseup","_mouseup"]);this.loaded.callback();},getAPIPath:function(){return {columnResizer:this};},columnMixin:{setWidth:function(_9){this.grid.columnResizer.setWidth(this.id,_9);}},setWidth:function(_a,_b){_b=parseInt(_b);if(_b<this.minWidth){_b=this.minWidth;}this.grid._columnsById[_a].width=_b+"px";var _c;_5("[colid=\""+_a+"\"]",this.grid.domNode).forEach(function(_d){if(!_c){_c=_3("webkit")?_d.offsetWidth:_2.style(_d,"width");}_d.style.width=_b+"px";});this.grid.vLayout.reLayout();this.grid.body.onRender();this.onResize(_a,_b,_c);},onResize:function(){},_mousemove:function(e){if(this._resizing||!this._getCell(e)||this._ismousedown){return;}this._readyToResize=this._isInResizeRange(e);var _e=this.grid._eventFlags;_e.onHeaderMouseDown=_e.onHeaderCellMouseDown=this._readyToResize?this.name:undefined;_2.toggleClass(_4.body(),"dojoxGridxColumnResizing",this._readyToResize);},_docMousemove:function(e){if(!this._resizing){return;}this._updateResizerPosition(e);},_mouseout:function(e){if(this._resizing){return;}this._readyToResize=false;_2.removeClass(_4.body(),"dojoxGridxColumnResizing");},_updateResizerPosition:function(e){var _f=e.pageX-this._startX,_10=this._targetCell;var _11=e.pageX-this._gridX;if(_10.offsetWidth+_f<this.minWidth){_11=this._startX-this._gridX-(_10.offsetWidth-this.minWidth);}this._resizer.style.left=_11+"px";},_showResizer:function(e){if(!this._resizer){this._resizer=_2.create("div",{className:"dojoxGridxColumnResizer"},this.grid.domNode,"last");this.connect(this._resizer,"mouseup","_mouseup");}this._resizer.style.display="block";this._updateResizerPosition(e);},_hideResizer:function(){this._resizer.style.display="none";},_mousedown:function(e){if(!this._readyToResize){this._ismousedown=true;return;}_2.setSelectable(this.grid.domNode,false);this._resizing=true;this._startX=e.pageX;this._gridX=_2.position(this.grid.bodyNode).x-this.grid.bodyNode.offsetLeft;this._showResizer(e);},_mouseup:function(e){this._ismousedown=false;if(!this._resizing){return;}this._resizing=false;this._readyToResize=false;_2.removeClass(_4.body(),"dojoxGridxColumnResizing");_2.setSelectable(this.grid.domNode,true);var _12=this._targetCell,_13=e.pageX-this._startX;var w=(_3("webkit")?_12.offsetWidth:_2.style(_12,"width"))+_13;if(w<this.minWidth){w=this.minWidth;}this.setWidth(_12.getAttribute("colid"),w);this._hideResizer();},_isInResizeRange:function(e){var _14=this._getCell(e);var x=this._getCellX(e);if(x<this.detectWidth){this._targetCell=_14.previousSibling;if(!this._targetCell){return false;}return true;}else{if(x>_14.offsetWidth-this.detectWidth&&x<=_14.offsetWidth){this._targetCell=_14;return true;}}return false;},_getCellX:function(e){var _15=this._getCell(e);if(!_15){return 100000;}var lx=e.layerX;var x=lx-_15.offsetLeft;if(x<0){x=lx;}return x;},_getCell:function(e){var _16=e.target;while(_16&&_16.tagName&&_16.tagName.toLowerCase()!=="th"){_16=_16.parentNode;}return _16;}}));});