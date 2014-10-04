//>>built
define("gridx/modules/Body",["dojo/_base/declare","dojo/_base/query","dojo/_base/html","dojo/_base/lang","dojo/_base/event","dojo/_base/Deferred","dojo/keys","../core/_Module","../util"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _8.registerModule(_1("gridx.modules.Body",_8,{name:"body",optional:["tree"],getAPIPath:function(){return {body:this};},load:function(_a,_b){this.domNode=this.grid.bodyNode;this.grid._connectEvents(this.domNode,"_onMouseEvent",this);this.batchConnect([this.model,"onDelete","_onDelete"],[this.model,"onNew","_onNew"],[this.model,"onSet","_onSet"],[this.model,"onSizeChange","_onSizeChange"],[this.grid,"onRowMouseOver","_onRowMouseHover"],[this.grid,"onRowMouseOut","_onRowMouseHover"],[this.grid,"onCellMouseOver","_onCellMouseHover"],[this.grid,"onCellMouseOut","_onCellMouseHover"],[this.grid,"setColumns",function(){this.refresh();}]);this._initFocus();this.model.when({},function(){if(!this.rootCount){this.rootCount=this.model.size();}this.visualCount=this.grid.tree?this.grid.tree.getVisualSize(this.rootStart,this.rootCount):this.rootCount;this.loaded.callback();},this);},destroy:function(){this.inherited(arguments);this.domNode.innerHTML="";},rowMixin:{node:function(){return this.grid.body.getRowNode({rowId:this.id});},visualIndex:function(){return this.grid.body.getRowInfo({rowId:this.id,rowIndex:this.index(),parentId:this.model.treePath(this.id).pop()}).visualIndex;}},cellMixin:{node:function(){return this.grid.body.getCellNode({rowId:this.row.id,cellId:this.column.id});}},rootStart:0,rootCount:0,renderStart:0,renderCount:0,visualStart:0,visualCount:0,autoUpdate:true,autoChangeSize:true,getRowNode:function(_c){return _2(this._getRowNodeQuery(_c),this.domNode)[0]||null;},getRowInfo:function(_d){if(_d.id){_d.rowIndex=this.model.idToIndex(_d.id);_d.parentId=this.model.treePath(_d.id).pop();}if(typeof _d.rowIndex=="number"&&_d.rowIndex>=0){_d.visualIndex=this.grid.tree?this.grid.tree.getVisualIndexByRowInfo(parentId,rowIndex,this.rootStart):_d.rowIndex-this.rootStart;}else{if(typeof _d.visualIndex=="number"&&_d.visualIndex>=0){if(this.grid.tree){var _e=this.grid.tree.getRowInfoByVisualIndex(_d.visualIndex,this.rootStart);_d.rowIndex=_e.start;_d.parentId=_e.parentId;}else{_d.rowIndex=this.rootStart+_d.visualIndex;}}else{return _d;}}_d.id=_d.id||this.model.indexToId(_d.rowIndex,_d.parentId);return _d;},getCellNode:function(_f){var req=this._getRowNodeQuery(_f),_10=_f.colId;if(req){if(!_10&&typeof _f.colIndex=="number"){_10=this.grid._columns[_f.colIndex].id;}req+=" [colid='"+_10+"'].dojoxGridxCell";return _2(req,this.domNode)[0]||null;}else{return null;}},refreshVisual:function(_11,_12){var _13=this.model,_14=this;return _13.when({}).then(function(){if(typeof _11=="number"&&_11>=0){var _15=false;if(!(_12>0)){_15=true;_12=_14.visualCount-_11;}var end=_11+_12,_16=_14.renderStart+_14.renderCount;if(_16<end){end=_16;}if(_14.renderStart>_11){_11=_14.renderStart;}_12=end-_11;var _17=_2("[visualindex=\""+_11+"\"]",_14.domNode)[0];if(_17){var _18=_14._buildRowFrames(_11,_12);if(_18){_3.place(_18,_17,"before");}}_6.when(_14._buildRows(_11,_12),function(){var i;for(i=_11;(_15||i<end)&&_17;++i){var tmp=_17.nextSibling;_3.destroy(_17);_17=tmp;}_14.onRender(_11,_12);});}else{_14.renderRows(_14.renderStart,_14.renderCount);}});},refresh:function(_19,_1a,_1b){if(arguments.length){_19=this.getRowInfo({rowIndex:_19,parentId:_1b}).visualIndex;}return this.refreshVisual(_19,_1a);},refreshCell:function(_1c,_1d){var d=new _6(),col=this.grid._columns[_1d],_1e=this.grid.focus&&(this.grid.focus.currentArea()==="body");if(col){var _1f=this.getCellNode({visualIndex:_1c,colId:col.id});if(_1f){var _20,_21=this.getRowInfo({visualIndex:_1c});this.model.when({start:_21.rowIndex,count:1,parentId:_21.parentId},function(){_20=this.model.byIndex(_21.rowIndex,_21.parentId);if(_20){_21.rowId=this.model.indexToId(_21.rowIndex,_21.parentId);this.onBeforeCell(_1f,_21,col,_20);var _22=this.grid.tree&&rowData[col.id]===undefined;_1f.innerHTML=this._buildCellContent(col,_21,_20.data,_22);this.onAfterCell(_1f,_21,col,_20);}},this).then(function(){d.callback(!!_20);});return d;}}d.callback(0);return d;},updateRootRange:function(_23,_24){var _25=this.rootStart!==_23||this.rootCount!==_24;this.rootStart=_23;this.rootCount=_24;var _26=this.visualCount;this.visualCount=this.grid.tree?this.grid.tree.getVisualSize(_23,_24):_24;if(_25){this.domNode.innerHTML="";this.renderStart=this.renderCount=0;this.onRootRangeChange(_23,_24);}else{if(_26!==this.visualCount){var _27=this.getRowNode({visualIndex:this.visualCount});while(_27){var tmp=_27.nextSibling;_3.destroy(_27);_27=tmp;}if(this.renderStart>=this.visualCount){this.renderStart=this.renderCount=0;}else{if(this.renderStart+this.renderCount>this.visualCount){this.renderCount=this.visualCount-this.renderStart;}}this.onVisualCountChange(this.visualCount,_26);}}},renderRows:function(_28,_29,_2a){var d,_2b=this,str="";if(_29>0){str=this._buildRowFrames(_28,_29);}if(_29>0&&_2a==="top"){this.renderCount+=this.renderStart-_28;this.renderStart=_28;_3.place(str,this.domNode,"first");}else{if(_29>0&&_2a==="bottom"){this.renderCount=_28+_29-this.renderStart;_3.place(str,this.domNode,"last");}else{this.renderStart=_28;this.renderCount=_29;var nd=this.domNode;nd.scrollTop=0;nd.innerHTML=str;this.model.free();}}d=this._buildRows(_28,_29);_6.when(d,function(){_2b.onRender(_28,_29);});},unrenderRows:function(_2c,_2d){if(_2c>0){var i=0,id,bn=this.domNode;if(_2d==="post"){for(;i<_2c&&bn.lastChild;++i){id=bn.lastChild.getAttribute("rowid");this.model.free(id);bn.removeChild(bn.lastChild);}}else{var t=bn.scrollTop;for(;i<_2c&&bn.firstChild;++i){id=bn.lastChild.getAttribute("rowid");this.model.free(id);t-=bn.firstChild.offsetHeight;bn.removeChild(bn.firstChild);}this.renderStart+=i;bn.scrollTop=t>0?t:0;}this.renderCount-=i;}},onBeforeRow:function(){},onAfterRow:function(){},onBeforeCell:function(){},onAfterCell:function(){},onRootRangeChange:function(){},onVisualCountChange:function(){},onRender:function(){},onNew:function(){},onDelete:function(){},onSet:function(){},collectCellWrapper:function(_2e,_2f,_30){},onMoveToCell:function(){},_getRowNodeQuery:function(_31){var req;if(_31.rowId){req="[rowid='"+_31.rowId+"']";}else{if(typeof _31.rowIndex=="number"&&_31.rowIndex>=0){req="[rowindex='"+_31.rowIndex+"']";if(_31.parentId){req+="[parentid='"+_31.parentId+"']";}}else{if(typeof _31.visualIndex=="number"&&_31.visualIndex>=0){req="[visualindex='"+_31.visualIndex+"']";}}}return req;},_buildRowFrames:function(_32,_33){var i,end=_32+_33,s=[],_34=this.grid.id;for(i=_32;i<end;++i){s.push("<div class=\"dojoxGridxRow dojoxGridxRowDummy\" role=\"row\" visualindex=\"",i,"\"></div>");}return s.join("");},_buildRows:function(_35,_36){var d,_37=this;if(_36>0){var i,end=_35+_36,_38=[];for(i=_35;i<end;++i){var _39=this.getRowInfo({visualIndex:i});if(!this._buildRowContent(_39)){_39.start=_39.rowIndex;_39.count=1;_38.push(_39);}}if(_38.length){d=this._buildUncachedRows(_38);}}return d;},_buildUncachedRows:function(_3a){return this.model.when(_3a,function(){for(var i=0,len=_3a.length;i<len;++i){this._buildRowContent(_3a[i]);}},this);},_buildRowContent:function(_3b){var _3c=this.getRowNode({visualIndex:_3b.visualIndex});if(_3c){var _3d=this.model.byIndex(_3b.rowIndex,_3b.parentId);if(_3d){_3b.rowId=this.model.indexToId(_3b.rowIndex,_3b.parentId);this.model.keep(_3b.rowId);_3.removeClass(_3c,"dojoxGridxRowDummy");_3c.setAttribute("rowid",_3b.rowId);_3c.setAttribute("rowindex",_3b.rowIndex);_3c.setAttribute("parentid",_3b.parentId||"");this.onBeforeRow(_3c,_3b,_3d);_3c.innerHTML=this._buildCells(_3d.data,_3b);this.onAfterRow(_3c,_3b,_3d);return true;}return null;}return false;},_buildCells:function(_3e,_3f){var i,col,len,s,_40,_41=this.grid._columns,_42=this.grid.focus&&(this.grid.focus.currentArea()==="body"),sb=["<table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>"];for(i=0,len=_41.length;i<len;++i){col=_41[i];_40=this.grid.tree&&_3e[col.id]===undefined;sb.push("<td class=\"dojoxGridxCell ");if(_40){sb.push("dojoxGridxPaddingCell");}if(_42&&this._focusCellRow===_3f.visualIndex&&this._focusCellCol===i){sb.push("dojoxGridxCellFocus");}sb.push("\" role=\"gridcell\" tabindex=\"-1\" colid=\"",col.id,"\" style=\"width: ",col.width,"\">");sb.push(this._buildCellContent(col,_3f,_3e,_40));sb.push(s,"</td>");}sb.push("</tr></table>");return sb.join("");},_buildCellContent:function(col,_43,_44,_45){if(_45){s="";}else{if(col.decorator){s=col.decorator(_44[col.id],_43.rowId,_43.visualIndex);}else{s=_44[col.id];}}return this._wrapCellData(s,_43.rowId,col.id);},_wrapCellData:function(_46,_47,_48){var _49=[];this.collectCellWrapper(_49,_47,_48);var i=_49.length-1;if(i>0){_49.sort(function(a,b){a.priority>=b.priority;});}for(;i>=0;--i){_46=_49[i].wrap(_46,_47,_48);}return _46;},_onMouseEvent:function(_4a,e){var g=this.grid,_4b="onCell"+_4a,_4c="onRow"+_4a;if(g._isConnected(_4b)||g._isConnected(_4c)){this._decorateEvent(e);if(e.rowIndex>=0){if(e.columnIndex>=0){g[_4b](e);}g[_4c](e);}}},_decorateEvent:function(e){var _4d=e.target||e.originalTarget,g=this.grid;while(_4d&&_4d!==g.bodyNode){if(_4d.tagName.toLowerCase()==="td"&&_3.hasClass(_4d,"dojoxGridxCell")){var col=g._columnsById[_4d.getAttribute("colid")];e.cellNode=_4d;e.columnId=col.id;e.columnIndex=col.index;}if(_4d.tagName.toLowerCase()==="div"&&_3.hasClass(_4d,"dojoxGridxRow")){e.rowId=_4d.getAttribute("rowid");e.parentId=_4d.getAttribute("parentid");e.rowIndex=parseInt(_4d.getAttribute("rowindex"),10);e.visualIndex=parseInt(_4d.getAttribute("visualindex"),10);return;}_4d=_4d.parentNode;}},_onSet:function(id,_4e,_4f){if(this.autoUpdate){var _50=this.getRowNode({rowId:id});if(_50){var _51=this.getRowInfo({rowId:id,rowIndex:_4e});this.onBeforeRow(_50,_51,_4f);_50.innerHTML=this._buildCells(_4f.data,_51);this.onAfterRow(_50,_51,_4f);this.onSet(id,_4e,_4f);this.onRender(_4e,1);}}},_onNew:function(id,_52,_53){if(this.autoUpdate&&this.start+this.count===this.model.size()){this.renderRows(this.start+this.count,1,"bottom");this.onNew(id,_52,_53);this.onRender(_52,1);}},_onDelete:function(id){if(this.autoUpdate){var _54=this.getRowNode({rowId:id});if(_54){var _55,_56,_57=0;for(_55=_54;_55;_55=_55.nextSibling){_56=parseInt(_55.getAttribute("rowindex"),10);_55.setAttribute("rowindex",_56-1);++_57;}_3.destroy(_54);this.onDelete(id,_56);this.onRender(_56,_57);}}},_onSizeChange:function(_58,_59){if(this.autoChangeSize&&this.rootStart===0&&this.rootCount===_59){this.updateRootRange(0,_58);}},_onRowMouseHover:function(e){var _5a=this.getRowNode({rowId:e.rowId});_3[e.type=="mouseout"?"removeClass":"addClass"](_5a,"dojoxGridxRowOver");},_onCellMouseHover:function(e){_3[e.type=="mouseout"?"removeClass":"addClass"](e.cellNode,"dojoxGridxCellOver");},_focusCellCol:0,_focusCellRow:0,_initFocus:function(){var _5b=this.grid,_5c=_5b.focus;if(_5c){_5c.registerArea({name:"body",priority:1,focusNode:_5b.bodyNode,doFocus:_4.hitch(this,"_doFocus"),doBlur:_4.hitch(this,"_blurCell"),onFocus:_4.hitch(this,"_onFocus"),onBlur:_4.hitch(this,"_blurCell")});this.connect(_5b.mainNode,"onkeypress",function(evt){if(_5c.currentArea()=="body"&&(!_5b.tree||!evt.ctrlKey)){var dk=_7,arr={},dir=_5b.isLeftToRight()?1:-1;arr[dk.LEFT_ARROW]=[0,-dir,evt];arr[dk.RIGHT_ARROW]=[0,dir,evt];arr[dk.UP_ARROW]=[-1,0,evt];arr[dk.DOWN_ARROW]=[1,0,evt];this._moveFocus.apply(this,arr[evt.keyCode]||[]);}});this.connect(_5b,"onCellClick",function(evt){this._focusCellRow=evt.visualIndex;this._focusCellCol=evt.columnIndex;});this.connect(this,"onRender",function(_5d,_5e){if(this._focusCellRow>=_5d&&this._focusCellRow<_5d+_5e&&_5c.currentArea()==="body"){this._focusCell();}});if(_5b.hScroller){this.connect(this.grid.bodyNode,"onscroll",function(){_5b.hScroller.scroll(_5b.bodyNode.scrollLeft);});}}},_doFocus:function(evt){return this._focusCell(evt)||this._focusCell(null,0,0);},_focusCell:function(evt,_5f,_60){_9.stopEvent(evt);_60=_60>=0?_60:this._focusCellCol;_5f=_5f>=0?_5f:this._focusCellRow;var _61=this.getCellNode({visualIndex:_5f,colId:this.grid._columns[_60].id});if(_61){var _62=_2(".dojoxGridxCellFocus",this.domNode)[0];if(_61!==_62){if(_62){_3.removeClass(_62,"dojoxGridxCellFocus");}_3.addClass(_61,"dojoxGridxCellFocus");this._focusCellRow=_5f;this._focusCellCol=_60;}_61.focus();}return _61;},_moveFocus:function(_63,_64,evt){if(_63||_64){_5.stop(evt);var r,c;r=this._focusCellRow+_63;r=r<0?0:(r>=this.visualCount?this.visualCount-1:r);c=this._focusCellCol+_64;c=c<0?0:(c>=this.grid._columns.length?this.grid._columns.length-1:c);var _65=this;this.grid.vScroller.scrollToRow(r).then(function(){_65._focusCell(null,r,c);_65.onMoveToCell(r,c,evt);});}},_nextCell:function(r,c,dir,_66){var d=new _6(),_67=this.grid._columns.length,_68=this.visualCount;do{c+=dir;if(c<0||c>=_67){r+=dir;c=c<0?_67-1:0;if(r<0){r=_68-1;c=_67-1;}else{if(r>=_68){r=0;c=0;}}}}while(!_66(r,c));this.grid.vScroller.scrollToRow(r).then(function(){d.callback({r:r,c:c});});return d;},_blurCell:function(){var _69=_2(".dojoxGridxCellFocus",this.domNode)[0];if(_69){_3.removeClass(_69,"dojoxGridxCellFocus");}return true;},_onFocus:function(evt){var _6a=evt.target;while(_6a&&_6a!==this.domNode&&!_3.hasClass(_6a,"dojoxGridxCell")){_6a=_6a.parentNode;}if(_6a&&_6a!==this.domNode){var _6b=this.grid._columnsById[_6a.getAttribute("colid")].index;while(_6a&&!_3.hasClass(_6a,"dojoxGridxRow")){_6a=_6a.parentNode;}var _6c=parseInt(_6a.getAttribute("visualindex"),10);return this._focusCell(null,_6c,_6b);}return false;}}));});