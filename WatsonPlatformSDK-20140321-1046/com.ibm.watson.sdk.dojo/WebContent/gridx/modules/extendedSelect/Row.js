//>>built
define("gridx/modules/extendedSelect/Row",["dojo/_base/declare","dojo/_base/array","dojo/_base/query","dojo/_base/html","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/sniff","dojo/mouse","dojo/keys","../../core/_Module","./_RowCellBase"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){return _a.registerModule(_1("gridx.modules.extendedSelect.Row",_b,{name:"selectRow",rowMixin:{select:function(){this.grid.select.row.selectById(this.id);return this;},deselect:function(){this.grid.select.row.deselectById(this.id);return this;},isSelected:function(){return this.model.isMarked(this.id);}},triggerOnCell:false,getSelected:function(){return this.model.getMarkedIds();},isSelected:function(){return _2.every(arguments,function(id){return this.model.isMarked(id);},this);},onHighlightChange:function(){},_type:"row",_init:function(){this.inherited(arguments);this.model._spTypes.select=1;var g=this.grid;this.batchConnect(g.rowHeader&&[g.rowHeader,"onMoveToRowHeaderCell","_onMoveToRowHeaderCell"],[g,"onRowMouseDown",function(e){if(_8.isLeft(e)&&(this.arg("triggerOnCell")||!e.columnId)){this._isOnCell=e.columnId;this._start({row:e.visualIndex},e.ctrlKey,e.shiftKey);}}],[g,"onRowMouseOver",function(e){if(this._selecting&&this.arg("triggerOnCell")&&e.columnId){g.body._focusCellCol=e.columnIndex;}this._highlight({row:e.visualIndex});}],[g,_7("ff")<4?"onRowKeyUp":"onRowKeyDown",function(e){if((this.arg("triggerOnCell")||!e.columnId)&&e.keyCode===_9.SPACE){this._isOnCell=e.columnId;this._start({row:e.visualIndex},e.ctrlKey,e.shiftKey);this._end();}}]);},_markById:function(_c,_d){_2.forEach(_c,function(_e){this.model.markById(_e,_d);},this);},_markByIndex:function(_f,_10){_2.forEach(_f,function(arg){if(_5.isArrayLike(arg)){var _11=arg[0];var end=arg[1];if(_11>=0&&_11<Infinity){var _12;if(end>=_11&&end<Infinity){_12=end-_11+1;}else{_12=this.grid.body.visualCount-_11;}_11=this.grid.body.getRowInfo({visualIndex:_11}).rowIndex;var i;for(i=0;i<_12;++i){this.model.markByIndex(i+_11,_10);}}}else{if(arg>=0&&arg<Infinity){arg=this.grid.body.getRowInfo({visualIndex:arg}).rowIndex;this.model.markByIndex(arg,_10);}}},this);return this.model.when();},_markAll:function(_13,_14){if(_14){_3(".dojoxGridxRow",this.grid.bodyNode).forEach(function(_15){_4.addClass(_15,"dojoxGridxRowSelected");});}else{_3(".dojoxGridxRowSelected",this.grid.bodyNode).forEach(function(_16){_4.removeClass(_16,"dojoxGridxRowSelected");});}this.model.markAll(_14);return this.model.when();},_onRender:function(_17,_18){var i,end=_17+_18;for(i=_17;i<end;++i){var _19={row:i};if(this._isSelected(_19)||(this._selecting&&this._toSelect&&this._inRange(i,this._startItem.row,this._currentItem.row,true))){this._doHighlight(_19,true);}}},_onMark:function(_1a,id,_1b){if(_1b==="select"&&!this._marking){var _1c=_3("[rowid=\""+id+"\"]",this.grid.bodyNode)[0];if(_1c){_4[_1a?"addClass":"removeClass"](_1c,"dojoxGridxRowSelected");this.onHighlightChange({row:parseInt(_1c.getAttribute("visualindex"),10)},_1a);}}},_onMoveToCell:function(_1d,_1e,e){if(this.arg("triggerOnCell")&&e.shiftKey&&(e.keyCode==_9.UP_ARROW||e.keyCode==_9.DOWN_ARROW)){var id=this._getRowIdByVisualIndex(_1d);this._start({row:_1d},e.ctrlKey,true);this._end();}},_onMoveToRowHeaderCell:function(_1f,e){if(e.shiftKey){var id=this._getRowIdByVisualIndex(_1f);this._start({row:_1f},e.ctrlKey,true);this._end();}},_isSelected:function(_20){var id=this._getRowIdByVisualIndex(_20.row);return this._isRange?_2.indexOf(this._refSelectedIds,id)>=0:this.model.isMarked(id);},_beginAutoScroll:function(){this._autoScrollH=this.grid.autoScroll.horizontal;this.grid.autoScroll.horizontal=false;},_endAutoScroll:function(){this.grid.autoScroll.horizontal=this._autoScrollH;},_doHighlight:function(_21,_22){var _23=_3("[visualindex=\""+_21.row+"\"]",this.grid.bodyNode);_23.forEach(function(_24){_4[_22?"addClass":"removeClass"](_24,"dojoxGridxRowSelected");});this.onHighlightChange(_21,_22);},_end:function(){this.inherited(arguments);delete this._isOnCell;},_focus:function(_25){var _26=this.grid.focus;if(_26){this.grid.body._focusCellRow=_25.row;_26.focusArea(this._isOnCell?"body":"rowHeader",true);}},_addToSelected:function(_27,end,_28){if(!this._isRange){this._refSelectedIds=this.model.getMarkedIds();}var a,b,i;if(this._isRange&&this._inRange(end.row,_27.row,this._lastEndItem.row)){a=Math.min(end.row,this._lastEndItem.row);b=Math.max(end.row,this._lastEndItem.row);_27=this.grid.body.getRowInfo({visualIndex:a}).rowIndex+1;end=this.grid.body.getRowInfo({visualIndex:b}).rowIndex;return this.model.when({start:_27,count:end-_27+1},function(){for(i=_27;i<=end;++i){var id=this.model.indexToId(i);var _29=_2.indexOf(this._refSelectedIds,id)>=0;this.model.markById(id,_29);}},this);}else{a=Math.min(_27.row,end.row);b=Math.max(_27.row,end.row);_27=this.grid.body.getRowInfo({visualIndex:a}).rowIndex;end=this.grid.body.getRowInfo({visualIndex:b}).rowIndex;for(i=_27;i<=end;++i){this.model.markByIndex(i,_28);}return this.model.when();}}}));});