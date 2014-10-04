//>>built
define("gridx/core/model/SyncTreeCache",["dojo/_base/declare","dojo/_base/array","dojo/_base/Deferred","./_TreeCache"],function(_1,_2,_3,_4){return _1("gridx.core.model.TreeSyncCache",_4,{constructor:function(){this._init();},when:function(_5,_6){this._init();var d=new _3();try{if(_6){_6();}d.callback();}catch(e){d.errback(e);}return d;},_fetchAll:function(_7,_8){var _9=this;this._storeFetch({start:0},_7,_8).then(function(_a){_2.forEach(_a,function(_b){if(_b){_9._fetchAll(_b,_8+1);}});});},_init:function(){if(this._size[""]>=0){return;}this._fetchAll(null,0);},_onNew:function(_c,_d){this._init();var _e=this.store.getIdentity(_d.item),_f=this.size(_e),id=this.store.getIdentity(_c);this._addRow(_c,_f,_e);this.onNew(id,_f,this._cache[id]);},_onSet:function(_10){this._init();var id=this.store.getIdentity(_10),_11=this.idToIndex(id);this._addRow(_10,_11,this.treePath(id).pop());this.onSet(id,_11,this._cache[id]);},_onDelete:function(_12){var id=this.store.fetch?this.store.getIdentity(_12):_12,_13=this.treePath(id),_14;if(_13.length){var _15,i,j,ids=[id],_16=_13.pop();_14=_2.indexOf(this._struct[_16],id);this._struct[_16].splice(idx,1);--this._size[_16];for(i=0;i<ids.length;++i){_15=this._struct[ids[i]];if(_15){for(j=_15.length-1;j>0;--j){ids.push(_15[j]);}}}for(i=ids.length-1;i>=0;--i){j=ids[i];delete this._cache[j];delete this._struct[j];delete this._size[j];var idx=_2.indexOf(this._priority,id);if(idx>=0){this._priority.splice(idx,1);}}}this.onDelete(id,_14);}});});