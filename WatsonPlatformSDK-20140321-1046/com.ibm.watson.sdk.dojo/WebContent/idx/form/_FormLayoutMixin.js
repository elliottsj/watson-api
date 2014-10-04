//>>built
define("idx/form/_FormLayoutMixin",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/query","dijit/registry"],function(_1,_2,_3,_4,_5,_6){return _1("idx.form._FormLayoutMixin",null,{rows:null,columns:null,rowWidth:"600px",forceRows:false,postMixInProperties:function(){this.inherited(arguments);this.children=this.children||[];if(this.columns){if(typeof this.columns=="number"){var _7=[];for(var i=0;i<this.columns;i++){_7.push({labelWidth:"120px",fieldWidth:"180px"});}this.columns=_7;}if(!(this.rows instanceof Array)){return;}this.rows=_3.map(this.rows,function(){return {itemNumber:this.columns.length,node:this._newRow()};},this);}else{if(!(this.rows instanceof Array)){return;}this.rows=_3.map(this.rows,function(_8){return {itemNumber:_8,node:this._newRow()};},this);}},addChild:function(_9,_a,_b){_9=_6.byId(_9);if(!_9){return;}if(typeof _a=="undefined"){_a=this._lastRowIndex();}else{if(this._isRowFilled(_a)){return;}}var _c=this.rows?this.rows[_a]:null;var _b=(typeof _b=="undefined")?this.getWidgetsInRow(_a).length:_b;if(_c&&_c["itemNumber"]&&(_c["itemNumber"]<=_b)){return;}if(_c){this.children.push({row:_a,index:_b,item:_9});}else{if(!this.rows||(!this.forceRows&&_a==this.rows.length)){var _c={itemNumber:this.columns?this.columns.length:"",node:this._newRow()};this.children.push({row:_a,index:_b,item:_9});if(!this.rows){this.rows=[];}this.rows.push(_c);}else{return;}}},_lastRowIndex:function(){if(!this.rows||this.rows.length==0){return 0;}var i=this.rows.length;while(this.getWidgetsInRow(i).length==0&&i>0){if(this._isRowFilled(i-1)){break;}i--;}return i;},_isRowFilled:function(_d){if(this.rows&&this.rows[_d]){var _e=this.rows[_d].itemNumber;return _e&&this.getWidgetsInRow(_d).length==_e;}else{return false;}},_setChildrenAttr:function(_f){this.children=[];_3.forEach(_f,function(_10){this.addChild(_10);},this);},_setColumnsAttr:function(_11){if(typeof _11=="number"){this.columns=[];for(var i=0;i<_11;i++){this.columns.push({labelWidth:"120px",fieldWidth:"180px"});}}else{if(_11 instanceof Array){this.columns=_11;}else{return;}}if(this.forceRows){var _12=(this.rows instanceof Array)?this.rows:new Array(this.rows);this.rows=_3.map(_12,function(){return {itemNumber:this.columns.length,node:this._newRow()};},this);}else{this.rows=null;}this.children.sort(function(a,b){return (a.row-b.row>0)||((a.row==b.row)&&(a.index>b.index));});var _13=_3.map(this.children,function(_14){return _14.item;});this.children=[];this.set("children",_13);},_setRowsAttr:function(_15){this.forceRows=(_15!=null);if(_15 instanceof Array){this.columns=null;this.rows=_3.map(_15,function(_16){return {itemNumber:_16,node:this._newRow()};},this);}else{if(typeof _15=="number"){this.rows=_3.map(new Array(_15),function(){return {itemNumber:this.columns?this.columns.length:"",node:this._newRow()};},this);}else{return;}}},setLabelWidthInColumn:function(_17,_18){if((!this.columns)||(this.columns.length<=_17)){return;}var _19=this.getWidgetsInColumn(_17);_3.forEach(_19,function(_1a){_1a.set("labelWidth",_18);});this.columns[_17]["labelWidth"]=_18;},setFieldWidthInColumn:function(_1b,_1c){if((!this.columns)||(this.columns.length<=_1b)){return;}var _1d=this.getWidgetsInColumn(_1b);_3.forEach(_1d,function(_1e){_1e.set("fieldWidth",_1c);});this.columns[_1b]["fieldWidth"]=_1c;},getLabelWidthInColumn:function(_1f){return this.columns[_1f]["labelWidth"];},getFieldWidthInColumn:function(_20){return this.columns[_20]["fieldWidth"];},getWidgetsInColumn:function(_21){if(this.columns&&!this.columns[_21]){return [];}var _22=_3.filter(this.children,function(_23){return _23.index==_21;});return _3.map(_22,function(_24){return _24.item;});},getWidgetsInRow:function(_25){if(this.rows&&!this.rows[_25]){return [];}var _26=_3.filter(this.children,function(_27){return _27.row==_25;});return _3.map(_26,function(_28){return _28.item;});},startup:function(){this.set("labelAlignment",this.labelAlignment);if(this.children.length==0){return;}if(this.columns){_3.forEach(this.columns,function(_29,_2a){var _2b=this.getWidgetsInColumn(_2a);_3.forEach(_2b,function(_2c){_2c.set("labelWidth",_29.labelWidth);_2c.set("fieldWidth",_29.fieldWidth);});},this);}else{_3.forEach(this.rows,function(row,_2d){var _2e=this.getWidgetsInRow(_2d),_2f=_2e.length,_30=parseInt(this.rowWidth),_31,_32,_33;_30-=_2f>2?21*(_2f-2)+38:19*_2f;if(this.labelAlignment=="vertical"){_31=_32=Math.ceil(_30/_2f);_33=_30-_32*(_2f-1);}else{_31=Math.ceil((_30/_2f)*0.4),_32=Math.ceil((_30/_2f)*0.6);_33=_30-(_31+_32)*(_2f-1);}_3.forEach(_2e,function(_34,_35){if(_35==_2f-1){if(this.labelAlignment=="vertical"){_34.set("labelWidth",_33+"px");_34.set("fieldWidth",_33+"px");}else{_34.set("labelWidth",_33*0.4+"px");_34.set("fieldWidth",_33*0.6+"px");}}else{_34.set("labelWidth",_31+"px");_34.set("fieldWidth",_32+"px");}},this);},this);}this._clean();this.children.sort(function(a,b){return (a.row-b.row>0)||((a.row==b.row)&&(a.index>b.index));});_3.forEach(this.children,function(_36){_4.place(_36.item.domNode,this.rows[_36.row].node,_36.index);},this);_3.forEach(this.rows,function(row,_37){_4.place(row.node,this.containerNode);},this);this.inherited(arguments);},_newRow:function(){return _4.create("div",{className:"oneuiFormBodyRow"});},_clean:function(){var _38=_5(".oneuiFormBodyRow",this.containerNode);_3.forEach(_38,function(row){if(row&&row.parentNode){var _39=_5(".idxComposite",row);_3.forEach(_39,function(_3a){if(_3a&&_3a.parentNode){_3a.parentNode.removeChild(_3a);}});row.parentNode.removeChild(row);}});}});});