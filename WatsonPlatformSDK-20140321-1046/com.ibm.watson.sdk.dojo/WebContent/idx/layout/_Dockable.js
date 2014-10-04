//>>built
define("idx/layout/_Dockable",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/html","dojo/_base/event","dojo/_base/connect","dojo/keys","dojo/touch","dijit/registry","idx/html","idx/util"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){return _1("idx.layout._Dockable",null,{dockArea:"",delay:10,dragNode:null,topicId:"",_dragging:false,buildRendering:function(){this.inherited(arguments);_5.addClass(this.domNode,"idxDockable");},postCreate:function(){this.inherited(arguments);this.dragNode=this.dragNode||this.focusNode||this.domNode;},startup:function(){if(this._started){return;}this.inherited(arguments);this.connect(this.dragNode,_9.press,"_onDragMouseDown");this.connect(this.dragNode,"onkeyup","_onKey");},_setDockAreaAttr:function(_d){this.dockArea=_d;var _e=(_d!="float");_5.toggleClass(this.domNode,"idxDockableDocked",_e);_5.toggleClass(this.domNode,"idxDockableFloating",!_e);},_setParentSelectable:function(_f){var _10=this.domNode.parentNode;if(!_10){_10=_4.body();}_5.setSelectable(_10,_f);},_onKey:function(evt){var k=evt.keyCode;var dk=_8;if(k==dk.SHIFT){if(this._dragging){var pos=_5.position(this.domNode);var mb=_5.marginBox(this.domNode);var obj={clientX:pos.x+mb.w/2,clientY:pos.y};this._publish("/idx/move/end",obj);this._dragging=false;this._setParentSelectable(true);if(dojo.isIE){var _11=this;setTimeout(function(){_11.focusNode.focus();},30);}return;}}if(k==dk.ENTER||k==dk.SPACE){if(this.toggleable){this.toggle();}_6.stop(evt);return;}if(evt.shiftKey){if(k==dk.UP_ARROW||k==dk.DOWN_ARROW||k==dk.LEFT_ARROW||k==dk.RIGHT_ARROW){this._offsetX=this._offsetY=0;var pos=_5.position(this.domNode);if(k==dk.UP_ARROW){pos.y-=20;}else{if(k==dk.DOWN_ARROW){pos.y+=20;}else{if(k==dk.LEFT_ARROW){pos.x-=20;}else{if(k==dk.RIGHT_ARROW){pos.x+=20;}}}}if(!this._dragging){this._setParentSelectable(false);this._startMove(evt);var _11=this;setTimeout(function(){if(_11.focusNode){_11.focusNode.focus();}else{if(_11.focus){_11.focus();}else{_11.domNode.focus();}}},0);}this.position(pos.x,pos.y);var _12={clientX:pos.x+_5.marginBox(this.domNode).w/2,clientY:pos.y};this._publish("/idx/move",_12);_6.stop(evt);}}},_startMove:function(evt){this._dragging=true;this._startLoc={x:evt.clientX,y:evt.clientY};var _13=this.get("dockArea");if(_13!="float"){this.onUndock(this.get("dockArea"));}this._publish("/idx/move/start",evt);},_endMove:function(evt){this._dragging=false;this._publish("/idx/move/end",evt);},_onDragMouseDown:function(evt){this._setParentSelectable(false);this._mouseDown=true;this._initX=evt.clientX;this._initY=evt.clientY;var pos=_5.position(this.domNode);this._offsetX=evt.clientX-pos.x;this._offsetY=evt.clientY-pos.y;this._globalMouseMove=this._globalMouseMove||[];this._globalMouseUp=this._globalMouseUp||[];this._globalMouseMove.push(_7.connect(_4.body(),_9.move,this,"_onDragMouseMove"));this._globalMouseUp.push(_7.connect(_4.body(),_9.release,this,"_onDragMouseUp"));},_onDragMouseUp:function(evt){this._mouseDown=false;_3.forEach(this._globalMouseMove,_7.disconnect);_3.forEach(this._globalMouseUp,_7.disconnect);if(this._dragging){this._endMove(evt);}this._setParentSelectable(true);},_onDragMouseMove:function(evt){if(!this._mouseDown){return;}if(this._dragging==false){if(Math.abs(this._initX-evt.clientX)>this.delay||Math.abs(this._initY-evt.clientY)>this.delay){this._startMove(evt);}}else{this._publish("/idx/move",evt);this.position(evt.clientX,evt.clientY);}_6.stop(evt);},beforeDock:function(){},onDock:function(_14){},onUndock:function(_15){this.set("dockArea","float");_5.style(this.domNode,{width:"",height:""});},position:function(x,y){var _16=_5.position(this.domNode.offsetParent);var _17=_5.contentBox(this.domNode.offsetParent);var mb=_5.marginBox(this.domNode);var _18=Math.min(Math.max(x-_16.x-this._offsetX,0),_17.w-mb.w);var top=Math.min(Math.max(y-_16.y-this._offsetY,0),_17.h-this._offsetY);_5.marginBox(this.domNode,{l:_18,t:top});},_publish:function(_19,evt){var msg=[{target:this,content:this,event:evt,start:this._startLoc}];_7.publish(this.topicId+_19,msg);}});});