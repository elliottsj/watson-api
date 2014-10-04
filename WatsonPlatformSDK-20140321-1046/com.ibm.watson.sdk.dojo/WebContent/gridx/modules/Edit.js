//>>built
define("gridx/modules/Edit",["dojo/_base/declare","dojo/_base/lang","dojo/_base/json","dojo/_base/Deferred","dojo/_base/sniff","dojo/_base/event","dojo/keys","../core/_Module","../util","dijit/form/TextBox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _8.registerModule(_1("gridx.modules.Edit",_8,{name:"edit",forced:["cellDijit"],constructor:function(){this._editingCells={};},getAPIPath:function(){return {edit:this};},load:function(){this.connect(this.grid,"onCellDblClick","_onUIBegin");this.connect(this.grid,"onCellMouseDown","_onMouseApply");this._initFocus();this.loaded.callback();},cellMixin:{beginEdit:function(){return this.grid.edit.begin(this.row.id,this.column.id);},cancelEdit:function(){this.grid.edit.cancel(this.row.id,this.column.id);return this;},applyEdit:function(){return this.grid.edit.apply(this.row.id,this.column.id);},isEditing:function(){return this.grid.edit.isEditing(this.row.id,this.column.id);}},columnMixin:{isEditable:function(){return this.grid._columnsById[this.id].editable;},setEditable:function(_a){this.grid._columnsById[this.id].editable=!!_a;return this;},editor:function(){return this.grid._columnsById[this.id].editor;},setEditor:function(_b,_c){this.grid.edit.setEditor(this.id,_b,_c);return this;}},begin:function(_d,_e){var d=new _4();if(!this.isEditing(_d,_e)){var _f=this,_10=this.model.idToIndex(_d),col=this.grid._columnsById[_e];if(_10>=0&&col.editable){this.grid.cellDijit.setCellDecorator(_d,_e,this._getDecorator(_e),this._getEditorValueSetter((col.editorArgs&&col.editorArgs.toEditor)||_2.hitch(this.grid,this.grid._getTypeData,_e)));this._record(_d,_e);this.grid.body.refreshCell(_10,col.index).then(function(){_f._focusEditor(_d,_e);d.callback(true);});}else{d.callback(false);}}else{d.callback(true);}return d;},cancel:function(_11,_12){var d=new _4(),_13=this.model.idToIndex(_11);if(_13>=0){this.grid.cellDijit.restoreCellDecorator(_11,_12);this._erase(_11,_12);var _14=this.grid._columnsById[_12].index;this.grid.body.refreshCell(_13,_14).then(function(){d.callback();});}else{d.callback();}return d;},apply:function(_15,_16){var d=new _4(),_17=this.grid.cell(_15,_16,true);if(_17){var _18=this.grid.cellDijit.getCellWidget(_15,_16);if(_18&&_18.gridCellEditField){var v=_18.gridCellEditField.get("value");try{var _19=_17.column.editorArgs;if(_19&&_19.fromEditor){v=_19.fromEditor(v);}_17.setRawData(v);}catch(e){console.warn("Can not apply change! Error message: ",e);d.callback(false);return d;}this.grid.cellDijit.restoreCellDecorator(_15,_16);this._erase(_15,_16);var _1a=_17.row.index();var _1b=this.grid._columnsById[_16].index;this.grid.body.refreshCell(_1a,_1b).then(function(){d.callback(true);});return d;}}d.callback(false);return d;},isEditing:function(_1c,_1d){var _1e=this.grid.cellDijit.getCellWidget(_1c,_1d);return !!_1e&&!!_1e.gridCellEditField;},setEditor:function(_1f,_20,_21){var col=this.grid._columnsById[_1f],_22=col.editorArgs=col.editorArgs||{};col.editor=_20;if(_21){_22.toEditor=_21.toEditor;_22.fromEditor=_21.fromEditor;_22.dijitProperties=_21.dijitProperties;}},_getColumnEditor:function(_23){var _24=this.grid._columnsById[_23].editor;if(_2.isFunction(_24)){return _24.prototype.declaredClass;}else{if(_2.isString(_24)){return _24;}else{return "dijit.form.TextBox";}}},_focusEditor:function(_25,_26){var _27=this.grid.cellDijit;var _28=function(){var _29=_27.getCellWidget(_25,_26);if(_29&&_29.gridCellEditField){_29.gridCellEditField.focus();_29.gridCellEditField.focus();}};if(_5("webkit")){_28();}else{setTimeout(_28,1);}},_getDecorator:function(_2a){var _2b=this._getColumnEditor(_2a);var p,_2c=[];var col=this.grid._columnsById[_2a];var _2d=(col.editorArgs&&col.editorArgs.dijitProperties)||{};var _2e=col.gridPattern||col.storePattern;if(_2e){var _2f=_2d.constraints=_2d.constraints||{};_2.mixin(_2f,_2e);}for(p in _2d){if(_2d.hasOwnProperty(p)){_2c.push(p,"='",_3.toJson(_2d[p]),"' ");}}_2c=_2c.join("");return function(){return ["<div dojoType='",_2b,"' ","dojoAttachPoint='gridCellEditField' ","class='dojoxGridxHasGridCellValue dojoxGridxUseStoreData' ","style='width: 100%; height:100%;' ",_2c,"></div>"].join("");};},_getEditorValueSetter:function(_30){return _30&&function(_31,_32,_33){var v=_30(_32,_31);_33.gridCellEditField.set("value",v);};},_record:function(_34,_35){var _36=this._editingCells,r=_36[_34];if(!r){r=_36[_34]={};}r[_35]=true;},_erase:function(_37,_38){var _39=this._editingCells,r=_39[_37];if(r){delete r[_38];}},_cancelAll:function(){var _3a=this._editingCells,r,c;for(r in _3a){for(c in _3a[r]){this.cancel(r,c);}}},_onUIBegin:function(evt){this._cancelAll();return this.begin(evt.rowId,evt.columnId);},_initFocus:function(){if(this.grid.focus){this.grid.focus.registerArea({name:"edit",priority:1,doFocus:_2.hitch(this,"_onFocus"),doBlur:_2.hitch(this,"_doBlur"),onFocus:_2.hitch(this,"_onFocus"),onBlur:_2.hitch(this,"_onBlur")});this.connect(this.grid,"onCellKeyPress","_onKey");this.connect(this,"_focusEditor","_focus");}},_onFocus:function(){return this._editing;},_doBlur:function(evt,_3b){if(this._editing){var _3c=this.grid.body.getRowInfo({parentId:this.model.treePath(this._focusCellRow).pop(),rowIndex:this.model.idToIndex(this._focusCellRow)}).visualIndex;var _3d=this.grid._columnsById[this._focusCellCol].index;var dir=_3b>0?1:-1;var _3e=this;var _3f=function(r,c){return _3e.grid._columns[c].editable;};this.grid.body._nextCell(_3c,_3d,dir,_3f).then(function(obj){_9.stopEvent(evt);_3e._cancelAll();_3e._focusCellCol=_3e.grid._columns[obj.c].id;var _40=_3e.grid.body.getRowInfo({visualIndex:obj.r});_3e._focusCellRow=_3e.model.indexToId(_40.rowIndex,_40.parentId);_3e.grid.body._focusCellCol=obj.c;_3e.grid.body._focusCellRow=obj.r;_3e.begin(_3e._focusCellRow,_3e._focusCellCol);});return false;}return true;},_onBlur:function(){this._cancelAll();this._editing=false;return true;},_focus:function(_41,_42){this._editing=true;this._focusCellCol=_42;this._focusCellRow=_41;this.grid.focus.focusArea("edit");},_blur:function(){this._editing=false;var _43=this.grid.focus;if(_5("ie")){setTimeout(function(){_43.focusArea("body");},1);}else{_43.focusArea("body");}},_onKey:function(e){var _44=this;if(this.grid._columnsById[e.columnId].editable){var _45=this.isEditing(e.rowId,e.columnId);if(e.keyCode===_7.ENTER){if(_45){this.apply(e.rowId,e.columnId).then(function(_46){if(_46){_44._blur();}});}else{if(this.grid.focus.currentArea()==="body"){_6.stop(e);this._onUIBegin(e);}}}else{if(e.keyCode===_7.ESCAPE&&_45){this.cancel(e.rowId,e.columnId).then(_2.hitch(this,this._blur));}}}if(this._editing&&e.keyCode!==_7.TAB){e.stopPropagation();}},_onMouseApply:function(e){var _47=this._editingCells,r,c;if(this._editing&&(!(e.rowId in _47)||(_47[e.rowId]&&!(e.columnId in _47[e.rowId])))){for(r in _47){for(c in _47[r]){this.apply(r,c).then(_2.hitch(this,this._blur));}}}}}));});