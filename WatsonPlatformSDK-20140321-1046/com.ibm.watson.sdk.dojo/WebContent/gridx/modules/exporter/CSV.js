//>>built
define("gridx/modules/exporter/CSV",["dojo/_base/declare","dojo/_base/lang","../../core/_Module","dojo/_base/Deferred","./Exporter"],function(_1,_2,_3,_4){return _3.registerModule(_1("gridx.modules.exporter.CSV",_3,{name:"csv",forced:["exporter"],getAPIPath:function(){return {"exporter":{toCSV:_2.hitch(this,this.toCSV)}};},load:function(_5,_6){},constructor:function(_7){},toCSV:function(_8){this._separator=_8.separator||",";this._newLine=_8.newLine||"\r\n";this._result="";return this.grid.exporter._export(_8||{},this);},getResult:function(){return this._result;},beforeHeader:function(_9,_a){if(!_2.isArray(_a.columnIds)||_a.columnIds.length==0){return false;}this._headerCells=[];},handleHeaderCell:function(_b,_c){var _d=this.grid.column(_c.columnId,true);this._headerCells.push(_d.name());},afterHeader:function(_e,_f){this._result+=this._headerCells.join(this._separator)+this._newLine;},beforeBody:function(_10){this._rows=[];},beforeProgress:function(_11,_12){},beforeRow:function(_13,_14){this._cells=[];},handleCell:function(_15,_16){var _17=_16.data;if(_17===null){_17="";}else{if(_17===undefined){_17=String(grid.cell(_16.rowId,_16.columnId,true).data())||"";}else{_17=String(_17);}}_17=_17.replace(/"/g,"\"\"");if(_17.indexOf(this._separator)>=0||_17.search(/[" \t\r\n]/)>=0){_17="\""+_17+"\"";}this._cells.push(_17);},afterRow:function(_18,_19){this._rows.push(this._cells.join(this._separator));},afterProgress:function(_1a,_1b){},afterBody:function(_1c){this._result+=this._rows.join(this._newLine);}}));});