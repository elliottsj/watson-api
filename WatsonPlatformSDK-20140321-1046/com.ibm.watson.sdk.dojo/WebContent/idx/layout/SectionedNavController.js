//>>built
define("idx/layout/SectionedNavController",["dojo/_base/declare","dijit/_Widget","dijit/registry","dojo/_base/event","dojo/_base/connect","dojo/_base/lang","dojo/keys"],function(_1,_2,_3,_4,_5,_6,_7){return _1("idx.layout.SectionedNavController",[_2],{id:"",associatedGrids:"",_associatedGrids:[],_lastGridSelected:"",_lastRowSelected:-1,constructor:function(n){this.id=n.id;},_setAssociatedGridsAttr:function(_8){this.associatedGrids=_8;if(!this._started){return;}this._connectToGrids();},startup:function(){this.inherited(arguments);this._connectToGrids();},_connectToGrids:function(){if(this._gridConnections){for(var _9=0;_9<this._gridConnections.length;_9++){var _a=this._gridConnections[_9];if(!_a){continue;}_5.disconnect(_a);this._gridConnections[_9]=null;}delete this._gridConnections;}this._associatedGrids=this.associatedGrids.split(",");this._gridConnections=[];this._pendingGrids={};for(var _9=0;_9<this._associatedGrids.length;_9++){var _b=this._associatedGrids[_9];var _c=_3.byId(_b);if(_c){this._connectToGrid(_b,_c);}else{var _d=_b;this._pendingGrids[_b]=_5.connect(_3,"add",_6.hitch(this,function(_e,_f){if(_f.id!=_e){return;}this._connectToGrid(_f.id,_f);},_d));}}},_connectToGrid:function(_10,_11){var _12=this._pendingGrids[_10];if(_12){_5.disconnect(_12);delete this._pendingGrids[_10];}_11.canSort=function(){return false;};var _13={owner:this,grid:_11};var _14=_5.connect(_11,"onSelected",_6.hitch(_13,function(_15){this.owner._handleSelect(this.grid,_15);}));this._gridConnections.push(_14);_14=_5.connect(_11,"onCellFocus",_6.hitch(_13,function(_16,_17){this.owner._handleFocus(this.grid,_16,_17);}));this._gridConnections.push(_14);var _14=_5.connect(_11,"onKeyEvent",_6.hitch(_13,function(e){this.owner._handleKey(this.grid,e);}));this._gridConnections.push(_14);},_handleKey:function(_18,e){var _19="_handle_"+e.dispatch;if(_19 in this){this[_19](_18,e);}},_handle_dokeydown:function(_1a,e){switch(e.keyCode){case _7.UP_ARROW:case _7.DOWN_ARROW:case _7.LEFT_ARROW:case _7.RIGHT_ARROW:break;default:return;}var _1b=_1a.focus.cell;var _1c=_1a.focus.rowIndex;if(!_1b){return;}if(_1c<0){return;}var _1d=_1a.selection.selectedIndex;if(_1d<0){_1a.selection.select(_1c);}else{var _1e=_1b.getNode(_1c);_1e.focus();}_4.stop(e);},_handle_dokeyup:function(_1f,e){switch(e.keyCode){case _7.UP_ARROW:case _7.DOWN_ARROW:case _7.LEFT_ARROW:case _7.RIGHT_ARROW:return;default:break;}var _20=_1f.focus.cell;var _21=_1f.focus.rowIndex;if(!_20){return;}if(_21<0){return;}var _22=_1f.selection.selectedIndex;if(_22<0){_1f.selection.select(_21);}else{var _23=_20.getNode(_21);_23.focus();}_4.stop(e);},_handle_dokeypress:function(_24,e){if((dojo.isIE!=8)&&(dojo.isIE!=9)){return;}if(e.altKey||e.ctrlKey){return;}switch(e.keyCode){case _7.UP_ARROW:case _7.DOWN_ARROW:case _7.LEFT_ARROW:case _7.RIGHT_ARROW:break;default:return;}var _25=_24.focus.cell;if(!_25){_25=_24.getCell(0);}var _26=_24.focus.rowIndex;if(_26<0){_26=0;}var _27=_25.getNode(_26);_27.focus();_4.stop(e);},_handleFocus:function(_28,_29,_2a){if(this._internalCall){this._internalCall=false;return;}if(_2a<0){return;}_28.selection.select(_2a);var _2b=_29.getNode(_2a);if(!_28.focus.isFocusCell(_29,_2a)){this._internalCall=true;_28.focus.setFocusCell(_29,_2a);}},_handleSelect:function(_2c,_2d){for(i=0;i<this._associatedGrids.length;i++){var _2e=this._associatedGrids[i];if(_2e!=_2c.id){var _2f=_3.byId(_2e);if(_2f){_2f.selection.clear();}}}if(this._lastGridSelected!=_2c.id||this._lastRowSelected!=_2d){this._lastGridSelected=_2c.id;this._lastRowSelected=_2d;var e={grid:_2c,rowIndex:_2d};_5.publish(this.id+"-selectionChanged",[e]);}}});});