//>>built
define("gridx/core/Cell",["dojo/_base/declare","dojo/_base/lang"],function(_1,_2){return _1("gridx.core.Cell",null,{constructor:function(_3,_4,_5){this.grid=_3;this.model=_3.model;this.row=_4;this.column=_5;},data:function(){return this.model.byId(this.row.id).data[this.column.id];},rawData:function(){var f=this.column.field();return f&&this.model.byId(this.row.id).rawData[f];},setRawData:function(_6){var _7=this.column.field(),s=this.grid.store;if(_7){if(s.setValue){s.setValue(this.model.byId(this.row.id).item,_7,_6);}else{if(s.put){var _8=_2.clone(this.model.byId(this.row.id).item);_8[_7]=_6;s.put(_8);}}}return this;}});});