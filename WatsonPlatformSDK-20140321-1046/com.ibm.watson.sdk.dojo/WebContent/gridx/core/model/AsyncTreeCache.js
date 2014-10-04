//>>built
define("gridx/core/model/AsyncTreeCache",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/DeferredList","./_TreeCache"],function(_1,_2,_3,_4,_5,_6){return _1("gridx.core.model.AsyncTreeCache",_6,{isAsync:true,cacheSize:200,pageSize:100,neighborSize:100,constructor:function(_7,_8){this.cacheSize=parseInt(_8.cacheSize||this.cacheSize,10);this.pageSize=parseInt(_8.pageSize||this.pageSize,10);this.neighborSize=parseInt(_8.neighborSize||this.neighborSize,10);},clear:function(){if(this._requests&&this._requests.length){this._toClear=true;return;}this.inherited(arguments);this._requests=[];this._priority=[];this._kept={};this._keptSize=0;},keep:function(id){if(!this._kept[id]&&this._cache[id]){this._kept[id]=true;++this._keptSize;return true;}return false;},free:function(id){if(this._kept[id]){delete this._kept[id];--this._keptSize;}else{if(id===undefined){this._kept={};this._keptSize=0;}}},when:function(_9,_a){var d=_9._def=new _4();try{_9=this._classifyRanges(_9);this._fetchById(_9,_a,d);}catch(e){d.errback(e);}return d;},_f:function(_b,_c,_d,_e,_f){var _10=this._findMissingIds(_d);if(_10.length){var _11=_b?this.store.getIdentity(_b):"";var _12=this._struct[_11];var _13=this._cache;var _14=this,i,end=_c+this.pageSize;for(i=_c;i<end;++i){if(!_13[_12[i+1]]){break;}}if(i<end){this._storeFetch({start:i,count:end-i},_b,_f).then(function(){_14._g(_b,_11,_c,_10,0,_e,_f);});}else{this._g(_b,_11,_c,_10,0,_e,_f);}}else{_e.callback([]);}},_g:function(_15,_16,_17,ids,i,_18,_19){var _1a=this,_1b=this._cache[this._struct[_16][++i+_17]];if(_1b){this._subFetchById(_1b.item,ids,_19+1).then(function(ids){if(ids.length){if(i<_1a.pageSize&&_17+i<_1a.size(_16)){_1a._g(_15,_16,_17,ids,i,_18,_19);}else{_1a._f(_15,_17+_1a.pageSize,ids,_18,_19);}}else{_18.callback([]);}});}else{_18.callback(ids);}},_subFetchById:function(_1c,ids,_1d){var d=new _4();this._f(_1c,0,ids,d,_1d);return d;},_fetchById:function(_1e,_1f,_20){var _21=this;this._reloadItemsById(_1e.id).then(function(){_21._subFetchById(null,_1e.id,0).then(function(ids){if(ids.length){console.warn("Some ids are not found: ",ids);}_21._fetchByIndex(_1e,_1f,_20);});});},_reloadItemsById:function(ids){var _22=this,s=this.store;var _23=_3.filter(ids,function(id){return _22._struct[id]&&!_22._cache[id];});return new _5(_3.map(_23,function(id){var d=new _4();s.fetchItemByIdentity({identity:id,onItem:function(_24){_22._addRow(_22._itemToObject(_24),_22.idToIndex(id),id,_24,_22.treePath(id).pop());d.callback();}});return d;}));},_findMissingIds:function(ids){return _3.filter(ids,function(id){return !this._cache[id];},this);},_classifyRanges:function(_25){var sr=_25.subrange={},pr=_25.pathrange=[];_3.forEach(_25.range,function(r){var _26,_27=r.parentIndexPath;if(_27){var i,_28=this._struct[""];for(i=0;i<_27.length-1&&_28;++i){_28=this._struct[_28[_27[i]]];}var id=_28&&_28[_27[_27.length-1]];_26=sr[id||""]=sr[id||""]||[];if(id){_26.push(r);}else{_26.push({start:r.parentIndexPath[0],count:1});pr.push(r);}}else{var _29=r.parentId||"";_26=sr[_29]=sr[_29]||[];_26.push(r);if(_29){_25.id.push(_29);}}},this);return _25;},_fetchByIndex:function(_2a,_2b,_2c){_2a=this._connectRanges(this._mergePendingRequests(this._mergeRanges(_2a)));var _2d,_2e=this,dl=[],i;for(_2d in _2a.subrange){var _2f=_2a.subrange[_2d],_30=_2d&&this._cache[_2d],_31=_2d?this.treePath(_2d).length:0;for(i=0;i<_2f.length;++i){dl.push(this._storeFetch(_2f[i],_30&&_30.item,_31));}}(new _5(dl)).then(function(){dl=_3.map(_2a.pathrange,function(pr){return _2e._fetchPathRange(pr);});(new _5(dl)).then(function(){_2e._finishReady(_2a,_2b,_2c);});});},_finishPathLevel:function(_32,_33,_34,d){if(_34===_32.length-1){d.callback(_33);}else{this._getPathLevel(_32,_33,_34+1);}},_getPathLevel:function(_35,_36,_37){var dd=new _4();var _38=_35[_37];var id=this.store.getIdentity(_36);var _39=this._cache[this._struct[id][_38+1]];if(_39){this._finishPathLevel(_35,_39.item,_37,dd);}else{var _3a=this;this._storeFetch({start:_38,count:1},_36,_37).then(function(_3b){if(_3b.length){_3a._finishPathLevel(_35,_3b[0],_37,dd);}else{dd.callback(null);}});}return dd;},_fetchPathRange:function(_3c){var d=new _4();var _3d=this;var _3e=_3c.parentIndexPath;var _3f=this.byIndex(_3e[0]);if(_3f){this._getPathLevel(_3e,_3f.item,1).then(function(_40){if(_40){_3d._storeFetch(_3c,_40,_3e.length-1).then(function(){d.callback();});}else{d.callback();}});}else{d.callback();}return d;},_finish:function(_41,_42,_43){if(_42){_42();}this._requests.shift();if(!this.skipCacheSizeCheck&&!this._requests.length){this._checkSize();}_43.callback();},_finishReady:function(_44,_45,_46){if(_44._req){_44._req.then(_2.hitch(this,"_finish",_44,_45,_46));}else{this._finish(_44,_45,_46);}},_connectRanges:function(_47){var i,_48,_49,r,pad=this.neighborSize/2;for(_48 in _47.subrange){if(_48===""||this.lazyChildren){_49=_47.subrange[_48];for(i=_49.length-1;i>=0;--i){r=_49[i];if(r.count<this.pageSize||!r.count){r.start=r.start-pad<0?0:r.start-pad;if(r.count){r.count+=this.neighborSize;}}}_47.subrange[_48]=this._subMergeRanges(_49);}}return _47;},_mergePendingRequests:function(_4a){var _4b=function(_4c,_4d){if(!_4d.length||!_4c.length){return _4c;}var _4e=[];var _4f=function(idx,_50){_4e[idx]=_4e[idx]||0;_4e[idx]+=_50;};var _51=function(_52,_53){var i,r;for(i=_52.length-1;i>=0;--i){r=_52[i];_4f(r.start,_53);if(r.count){_4f(r.start+r.count,-_53);}}};_51(_4c,1);_51(_4d,2);var f=0,i,r,res=[];for(i=0;i<_4e.length;++i){if(_4e[i]){f+=_4e[i];if(f===1){res.push({start:i});}else{if(f===3){res._overlap=true;}r=res[res.length-1];if(r&&!r.count){r.count=i-r.start;}}}}return res;};var i,req,j,ids={},_54=[];for(i=this._requests.length-1;i>=0;--i){req=this._requests[i];_4a.range=_4b(_4a.range,req.range);var _55,_56=_4a.range._overlap;for(_55 in req.subrange){if(_4a.subrange[_55]){_4a.subrange[_55]=_4b(_4a.subrange[_55],req.subrange);_56=_4a.subrange[_55]._overlap||_56;}}if(_56){_54.push(req._def);}for(j=req.id.length-1;j>=0;--j){ids[req.id[j]]=true;}}_4a.id=_3.filter(_4a.id,function(id){return !ids[id];});if(_54.length){_4a._req=new _5(_54);}this._requests.push(_4a);return _4a;},_subFindMissingIndexes:function(_57,_58){var i,j,r,end,_59,_5a=[];var _5b=this.size(_58);for(i=_57.length-1;i>=0;--i){r=_57[i];end=r.count?r.start+r.count:_5b;_59=true;for(j=r.start;j<end;++j){if(!this.byIndex(j,_58)){if(_59){_5a.push({start:j,count:1});}else{++_5a[_5a.length-1].count;}_59=false;}else{_59=true;}}if(!r.count){if(!_59){delete _5a[_5a.length-1].count;}else{if(_5b<0||j<_5b){_5a.push({start:j});}}}}return _5a;},_findIdByIndexPath:function(_5c){var i,_5d=this._struct[""];for(i=0;i<_5c.length-1&&_5d;++i){_5d=this._struct[_5d[_5c[i]]];}return _5d&&_5d[_5c[_5c.length-1]];},_subMergeRanges:function(_5e){var _5f=[],tmp={},i,a,b,c,_60;while(_5e.length>0){a=_5e.pop();_60=false;for(i=_5e.length-1;i>=0;--i){b=_5e[i];c=_2.clone(a);if(c.start<b.start){tmp=b;b=c;c=tmp;}if(b.count){if(c.start<=b.start+b.count){if(c.count&&c.start+c.count>b.start+b.count){b.count=c.start+c.count-b.start;}else{if(!c.count){b.count=null;}}}else{continue;}}_5e[i]=b;_60=true;break;}if(!_60){_5f.push(a);}}return _5f;},_mergeRanges:function(_61){var _62;for(_62 in _61.subrange){_61.subrange[_62]=this._subFindMissingIndexes(this._subMergeRanges(_61.subrange[_62]),_62);}return _61;},_addRow:function(_63,_64,id,_65,_66){if(!this._cache[id]){this._priority.push(id);}this.inherited(arguments);},_checkSize:function(){if(this._toClear){delete this._toClear;this.clear();}var c=this.cacheSize;if(c<=0){return;}c+=this._keptSize;var p=this._priority,_67=this._cache;while(p.length>c){var id=p.shift();if(this._kept[id]){p.push(id);}else{delete _67[id];}}},_onSet:function(_68){var id=this.store.getIdentity(_68),_69=this.idToIndex(id),_6a=this.treePath(id);if(_6a.length){this._addRow(this._itemToObject(_68),_69,id,_68,_6a.pop());}this.onSet(id,_69,this._cache[id]);},_onNew:function(_6b,_6c){var id=this.store.getIdentity(_6b),_6d=_6c&&_6c.item,_6e=_6d?this.store.getIdentity(_6d):"",idx=this._size[_6e];if(this._size[_6e]>=0){this._size[_6e]++;this._addRow(this._itemToObject(_6b),idx,id,_6b,_6e);}this.onNew(id,idx,this._cache[id]);},_onDelete:function(_6f){var id=this.store.fetch?this.store.getIdentity(_6f):_6f,_70=this.treePath(id),_71;if(_70.length){var _72,i,j,ids=[id],_73=_70.pop();_71=_3.indexOf(this._struct[_73],id);this._struct[_73].splice(idx,1);--this._size[_73];for(i=0;i<ids.length;++i){_72=this._struct[ids[i]];if(_72){for(j=_72.length-1;j>0;--j){ids.push(_72[j]);}}}for(i=ids.length-1;i>=0;--i){j=ids[i];delete this._cache[j];delete this._struct[j];delete this._size[j];var idx=_3.indexOf(this._priority,id);if(idx>=0){this._priority.splice(idx,1);}}}this.onDelete(id,_71);}});});