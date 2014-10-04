//>>built
define("idx/grid/_DataGridMixin",["dojo/_base/declare","dojo/_base/array","dojox/grid/Selection"],function(_1,_2,_3){return _1("idx.grid._DataGridMixin",null,{getCellByField:function(_4){var _5;_2.some((this.layout.cells||[]),function(c){if(c.field==_4){_5=c;return true;}return false;});return _5;},getSelectedItem:function(){var _6;var _7=this.selection.selectedIndex;if(_7>=0&&_7<this.rowCount){_6=this.getItem(_7);}return _6;},selectByAttribute:function(_8,_9){var _a=this.selection;var _b=this.store;var _c=this.rowCount;for(var i=0;i<_c;i++){var _d=this.getItem(i);if(_b.isItem(_d)&&_b.getValue(_d,_8)==_9){_a.addToSelection(i);}}},moveItem:function(_e,to){if(to===_e){return;}var _f=this._by_idx[_e];if(to<_e){for(var i=_e;i>to;i--){this._by_idx[i]=this._by_idx[i-1];}}else{for(var i=_e;i<to;i++){this._by_idx[i]=this._by_idx[i+1];}}this._by_idx[to]=_f;},moveUpSelectedRows:function(top){var _10=_3.prototype.getSelected.call(this.selection);if(!_10||!_10.length){return;}var _11=_10[0];if(!_11){return;}var _12=_10[_10.length-1];var _13=(top?0-_11:-1);var _14=this.selection.selectedIndex;this.edit.apply();this.selection.deselectAll();var _15=_10.length;for(var i=0;i<_15;i++){var _16=_10[i];this.moveItem(_16,_16+_13);}this.updateRows(_11+_13,(_12-(_11+_13)+1));for(var i=0;i<_15;i++){this.selection.addToSelection(_10[i]+_13);}this.selection.addToSelection(_14+_13);},moveDownSelectedRows:function(_17){var _18=_3.prototype.getSelected.call(this.selection);if(!_18||!_18.length){return;}var _19=this.rowCount-1;var _1a=_18[_18.length-1];if(_1a<0||_1a>=_19){return;}var _1b=_18[0];var _1c=(_17?_19-_1a:1);var _1d=this.selection.selectedIndex;this.edit.apply();this.selection.deselectAll();var _1e=_18.length;for(var i=_1e-1;i>=0;i--){var _1f=_18[i];this.moveItem(_1f,_1f+_1c);}this.updateRows(_1b,(_1a+_1c)-_1b+1);for(var i=0;i<_1e;i++){this.selection.addToSelection(_18[i]+_1c);}this.selection.addToSelection(_1d+_1c);}});});