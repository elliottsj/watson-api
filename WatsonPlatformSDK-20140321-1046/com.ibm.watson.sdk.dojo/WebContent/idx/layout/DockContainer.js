//>>built
define("idx/layout/DockContainer",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/html","dojo/_base/event","dojo/_base/connect","dojo/keys","dijit/registry","idx/html","idx/util","idx/layout/BorderContainer"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){return _1("idx.layout.DockContainer",[_c],{design:"sidebar",_topZ:50,delay:10,topicId:"",buildRendering:function(){this.inherited(arguments);this.topicId=this.topicId||this.id;},startup:function(){if(this._started){return;}this.inherited(arguments);this.subscribe(this.topicId+"/idx/move/start","_onChildMoveStart");this.subscribe(this.topicId+"/idx/move","_onChildMove");this.subscribe(this.topicId+"/idx/move/end","_onChildMoveEnd");this._startupFloatingChildren();var _d=this.getChildren();_3.forEach(_d,function(_e){var _f=_e.get("region");var cs=_e.getChildren?_e.getChildren():[];if(_f&&cs.length==0&&_e.get("collapseEmpty")){this.collapse(_f);}},this);},layout:function(){this.inherited(arguments);var mb=_5.marginBox(this.domNode);this._dockWidth=mb.w;this._dockHeight=mb.h;},getChildren:function(all){var _10=this.inherited(arguments);return _3.filter(_10,function(_11){return _11.region||all;});},addChild:function(_12){this.inherited(arguments);if(_12.dockArea){_12.set("dockArea","float");_5.style(_12.domNode,"position","absolute");_5.style(_12.domNode,"zIndex",this._topZ++);}},_startupFloatingChildren:function(){var _13=this.getChildren(true);_3.forEach(_13,function(_14){if(!_14.region){_14.startup();}},this);},_onChildDocked:function(_15,_16){_5.toggleClass(this.domNode,"idxDockableDocked",false);_5.toggleClass(this.domNode,"idxDockableFloating",true);this.domNode.appendChild(this.domNode);},_contains:function(_17,_18){if(_17==_18){return true;}return _5.isDescendant(_18,_17);},_onChildMoveStart:function(msg){var _19=msg.content;if(_3.indexOf(this.domNode.childNodes,_19.domNode)==-1){if(_19.getParent){this._currentDockArea=_19.getParent();}this.domNode.appendChild(_19.domNode);_19.focusNode&&_19.focusNode.focus();}_5.style(_19.domNode,"zIndex",this._topZ++);this._rootPos=_5.position(this.domNode);var _1a=this._getChildPane("center");if(_1a){this._centerPos=_5.position(_1a.domNode);}if(_19.layoutAlign){this._clearLayoutAlign(_19);}},_getChildPane:function(_1b){var c;_3.some(this.getChildren(),function(_1c){if(_1c.region==_1b){c=_1c;return true;}});return c;},_clearLayoutAlign:function(_1d){delete _1d.layoutAlign;_5.removeClass(_1d.domNode,"dijitAlignLeft");_5.removeClass(_1d.domNode,"dijitAlignRight");_5.removeClass(_1d.domNode,"dijitAlignTop");_5.removeClass(_1d.domNode,"dijitAlignBottom");_5.removeClass(_1d.domNode,"dijitAlignClient");},_onChildMove:function(msg){var evt=msg.event;var _1e=msg.content;this._collisionCheck({x:evt.clientX,y:evt.clientY},_1e);},_onChildMoveEnd:function(msg){if(this._currentDockArea){var pos={x:msg.event.clientX,y:msg.event.clientY};this._currentDockArea.dock(msg.content,pos);}},_collisionCheck:function(pos,_1f){var _20=this._rootPos;var _21=this._centerPos;if(pos.x<_21.x+5){this._showDockArea(pos,"left",_1f);}else{if(pos.x>_21.x+_21.w-5){this._showDockArea(pos,"right",_1f);}else{if(pos.y<_21.y+5){this._showDockArea(pos,"top",_1f);}else{if(pos.y>_21.y+_21.h-5){this._showDockArea(pos,"bottom",_1f);}else{this._resetDockArea();}}}}},_resetDockArea:function(){if(this._currentDockArea){this._currentDockArea.resetDockArea();var da=this._currentDockArea;if(da.getChildren().length==0&&da.get("collapseEmpty")){this.collapse(this._currentRegion);}this._currentDockArea=null;this._currentRegion=null;}},_showDockArea:function(pos,_22,_23){var _24=this._getChildPane(_22);if(!_24||!_24.showDockArea){return;}if(this._currentRegion!=_22){this._resetDockArea();if(_24.get("collapseEmpty")&&_24.getChildren().length==0){this.restore(_22);}}_24.showDockArea(pos,_23);this._currentRegion=_22;this._currentDockArea=_24;},_getParentWidget:function(_25){var _26=_25.domNode;while(_26!=_4.body()){_26=_26.parentNode;var _27=_9.byNode(_26);if(_27&&_27.get("region")){var _28=_27.getChildren?_27.getChildren():[];for(var i=0;i<_28.length;i++){if(_28[i]==_25){return _27;}}}}}});});