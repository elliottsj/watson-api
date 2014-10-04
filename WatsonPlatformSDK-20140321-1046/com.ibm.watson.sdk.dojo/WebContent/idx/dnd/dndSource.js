//>>built
define("idx/dnd/dndSource",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/dom-geometry","dijit/tree/dndSource","dijit/tree/_dndSelector","./Manager"],function(_1,_2,_3,_4,_5,_6,_7){return _3("idx.dnd.dndSource",[_5],{_onDragMouse:function(e){var m=_7.manager(),_8=this.targetAnchor,_9=this.current,_a=this.dropPosition;var _b="Over";if(_9&&this.betweenThreshold>0){if(!this.targetBox||_8!=_9){this.targetBox=_4.position(_9.rowNode,true);}if((e.pageY-this.targetBox.y)<=this.betweenThreshold){_b="Before";}else{if((e.pageY-this.targetBox.y)>=(this.targetBox.h-this.betweenThreshold)){_b="After";}}}if(_9!=_8||_b!=_a){if(_8){this._removeItemClass(_8.rowNode,_a);}if(_9){this._addItemClass(_9.rowNode,_b);}if(!_9){m.canDrop(false);}else{if(_9==this.tree.rootNode&&_b!="Over"){m.canDrop(false);}else{var _c=this.tree.model,_d=false;if(m.source==this){for(var _e in this.selection){var _f=this.selection[_e];if(_f.item===_9.item){_d=true;break;}}}if(_d){m.canDrop(false);}else{if(this.checkItemAcceptance(_9.rowNode,m.source,_b.toLowerCase())&&!this._isParentChildDrop(m.source,_9.rowNode)){m.canDrop(true);}else{m.canDrop(false);}}}}this.targetAnchor=_9;this.dropPosition=_b;}},onMouseMove:function(e){if(this.isDragging&&this.targetState=="Disabled"){return;}_6.prototype.onMouseMove.apply(this,arguments);var m=_7.manager();if(this.isDragging){this._onDragMouse(e);}else{if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>=this.dragThreshold||Math.abs(e.pageY-this._lastY)>=this.dragThreshold)){var _10=this.getSelectedTreeNodes();if(_10.length){if(_10.length>1){var _11=this.selection,i=0,r=[],n,p;nextitem:while((n=_10[i++])){for(p=n.getParent();p&&p!==this.tree;p=p.getParent()){if(_11[p.id]){continue nextitem;}}r.push(n);}_10=r;}_10=_1.map(_10,function(n){return n.domNode;});m.startDrag(this,_10,this.copyState(_2.isCopyKey(e)));}}}},onDndSourceOver:function(_12){if(this!=_12){this.mouseDown=false;this._unmarkTargetAnchor();}else{if(this.isDragging){var m=_7.manager();m.canDrop(false);}}},onDndStart:function(_13,_14,_15){if(this.isSource){this._changeState("Source",this==_13?(_15?"Copied":"Moved"):"");}var _16=this.checkAcceptance(_13,_14);this._changeState("Target",_16?"":"Disabled");if(this==_13){_7.manager().overSource(this);}this.isDragging=true;},onOverEvent:function(){_6.prototype.onOverEvent.apply(this,arguments);_7.manager().overSource(this);},onOutEvent:function(){this._unmarkTargetAnchor();var m=_7.manager();if(this.isDragging){m.canDrop(false);}m.outSource(this);_6.prototype.onOutEvent.apply(this,arguments);}});});