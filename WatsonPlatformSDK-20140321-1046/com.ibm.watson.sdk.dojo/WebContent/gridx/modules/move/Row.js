//>>built
define("gridx/modules/move/Row",["dojo/_base/declare","../../core/_Module","../../core/model/Mapper"],function(_1,_2,_3){return _2.registerModule(_1("gridx.modules.move.Row",_2,{name:"moveRow",modelExtensions:[_3],getAPIPath:function(){return {move:{row:this}};},rowMixin:{moveTo:function(_4,_5){this.grid.move.row.moveRange(this.index(),1,_4,_5);return this;}},move:function(_6,_7,_8){if(typeof _6==="number"){_6=[_6];}var _9=[],i,_a,_b=[],_c,_d,_e=_7,_f=0;for(i=0,_a=_6.length;i<_a;++i){_9[_6[i]]=true;}for(i=0,_a=_9.length;i<_a;++i){if(_9[i]){_b.push(i);if(_c===undefined){_c=i;}}}_d=_9.length-_c;_9={};_a=_b.length;for(i=_a;i>=0;--i){if(_b[i]<_e){this.model.move(_b[i],1,_e);_9[_b[i]]=_e--;++_f;}}for(i=0;i<_a;++i){if(_b[i]>=_7){_e=_7+i-_f;this.model.move(_b[i],1,_e);_9[_b[i]]=_e;}}if(!_8){this._moveComplete(_9,_c,_d,_7);}return this;},moveRange:function(_10,_11,_12,_13){var _14=this.model.move(_10,_11,_12),map={},i;for(i=_10;i<_10+_11;++i){map[i]=_14+i;}if(!_13){this._moveComplete(map,_10,_11,_12);}return this;},onMoved:function(){},_moveComplete:function(map,_15,_16,_17){if(_15>_17){_16+=_15-_17;_15=_17;}else{if(_15+_16<_17){_16=_17+1-_15;}}var _18=this;this.model.when({start:_15,count:_16}).then(function(){_18.grid.body.refresh(_15,_16);_18.onMoved(map);});}}));});