//>>built
define("gridx/core/model/Model",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/connect","dojo/_base/json"],function(_1,_2,_3,_4,_5,_6){return _1("gridx.core.model.Model",null,{constructor:function(_7){this._cmdQueue=[];this._prevCmdQueues=[];this._pendingCmdCount=0;this._model=this._cache=new _7.cacheClass(this,_7);this._createExtensions(_7.modelExtensions||[],_7);this._connects=[_5.connect(this._model,"onDelete",this,"onDelete"),_5.connect(this._model,"onNew",this,"onNew"),_5.connect(this._model,"onSet",this,"onSet"),_5.connect(this._model,"onSizeChange",this,"onSizeChange")];if(_7.query){this.query(_7.query);}},destroy:function(){_2.forEach(this._connects,_5.disconnect);if(this._plugins){var i=this._plugins.length-1;for(;i>=0;--i){this._plugins[i].destroy();}}},onDelete:function(id,_8){},onNew:function(id,_9,_a){},onSet:function(id,_b,_c){},onSizeChange:function(_d,_e){},onMarked:function(id,_f){},onMarkRemoved:function(id,_10){},onFiltered:function(ids){},clearCache:function(){this._cache.clear();},restore:function(){this.clearCache();var _11=this._plugins,i=_11.length-1;for(;i>=0;--i){_11[i].clear();}this._cmdQueue=[];this._prevCmdQueues=[];},when:function(_12,_13,_14){this._cache.skipCacheSizeCheck=this._cache.skipCacheSizeCheck||0;++this._cache.skipCacheSizeCheck;var d=new _4();var _15=this._prevCmdQueues;var _16=_15[_15.length-1];var _17=this;var _18=function(){_17._model._call("when",[_17._normalizeArgs(_12),function(){if(_13){_13.apply(_14||window);}--_17._cache.skipCacheSizeCheck;}]).then(function(){_15.shift();d.callback();},_3.hitch(d,d.errback));};_15.push(d);if(!this._cmdQueue.length&&!this._pendingCmdCount){_18();}else{var _19=this._cmdQueue;this._pendingCmdCount+=_19.length;this._cmdQueue=[];_4.when(_16,function(){_17._exec(_19).then(_18,_3.hitch(d,d.errback));});}return d;},scan:function(_1a,_1b){var d=new _4(),_1c=_1a.start||0,_1d=_1a.pageSize||this._cache.pageSize||1,end=_1a.count>0?_1c+_1a.count:Infinity,_1e=_1a.whenScope||this,_1f=_1a.whenFunc||_1e.when;var f=function(s){_1f.call(_1e,{id:[],range:[{start:s,count:_1d}]},function(){var i,r,_20=[];for(i=s;i<s+_1d&&i<end;++i){r=_1e.byIndex(i);if(r){_20.push(r);}else{end=-1;break;}}if(_1b(_20,s)||i===end){end=-1;}}).then(function(){if(end===-1){d.callback();}else{f(s+_1d);}});};f(_1c);return d;},sort:function(_21){this._sortOrQuery("_sort","_query",arguments);},query:function(req){this._sortOrQuery("_query","_sort",arguments);},_exec:function(_22){var _23=this,d=new _4();var _24=function(){while(_22.length){var cmd=_22.shift();var dd=cmd.scope[cmd.name].apply(cmd.scope,cmd.args);if(cmd.async){dd.then(function(){--_23._pendingCmdCount;_24();});return;}else{--_23._pendingCmdCount;}}d.callback();};_24();return d;},_sortOrQuery:function(_25,_26,_27){if(!this._cache.isAsync){this[_25].apply(this,_27);return;}var _28=this._cmdQueue,len=_28.length,i,cmd,_29=0;for(i=len-1;i>=0;--i){if(_28[i].name==="_mark"){_29=i+1;break;}}var pre=_29>0?_28.slice(0,_29):[];this._cmdQueue=[{scope:this,name:_25,args:_27}];for(i=len-1;i>=_29;--i){cmd=_28[i];if(cmd.name===_26){this._cmdQueue.push(cmd);break;}}for(i=len-1;i>=_29;--i){cmd=_28[i];if(cmd.name==="_filter"){this._cmdQueue.push(cmd);break;}}this._cmdQueue=pre.concat(this._cmdQueue);},_sort:function(_2a){var c=this._cache,i;if(_3.isArrayLike(_2a)){for(i=0;i<_2a.length;++i){var s=_2a[i];if(s.colId!==undefined){s.attribute=c.columns?(c.columns[s.colId].field||s.colId):s.colId;}else{s.colId=s.attribute;}}}c.options=c.options||{};var _2b=false;if(c.options.sort&&c.options.sort.length){if(_6.toJson(c.options.sort)!==_6.toJson(_2a)){_2b=true;}}else{if(_2a&&_2a.length){_2b=true;}}c.options.sort=_3.clone(_2a);if(_2b){c.clear();}if(this._model.onStoreReorder){this._model.onStoreReorder(this._cache.isAsync);}},_query:function(_2c,_2d){var c=this._cache,ops=c.options=c.options||{};ops.query=_2c;ops.queryOptions=_2d;if(this._model.onStoreReorder){this._model.onStoreReorder(this._cache.isAsync);}c.clear();},_createExtensions:function(_2e,_2f){this._plugins=[];var i,len,_30=[];for(i=_2e.length-1;i>=0;--i){_30[_2e[i].prototype.priority]=_2e[i];}for(i=0,len=_30.length;i<len;++i){if(_30[i]){this._plugins.push(new _30[i](this,_2f));}}},_normalizeArgs:function(_31){var i,res={range:[],id:[]},_32=function(a){return typeof a==="number"&&a>=0;},_33=function(a){return a&&typeof a.start==="number"&&a.start>=0;},f=function(a){if(_33(a)){res.range.push(a);}else{if(_32(a)){res.range.push({start:a,count:1});}else{if(_3.isArrayLike(a)){for(i=a.length-1;i>=0;--i){if(_32(a[i])){res.range.push({start:a[i],count:1});}else{if(_33(a[i])){res.range.push(a[i]);}else{if(_3.isString(a)){res.id.push(a[i]);}}}}}else{if(_3.isString(a)){res.id.push(a);}}}}};if(_31&&(_31.index||_31.range||_31.id)){f(_31.index);f(_31.range);if(_3.isArrayLike(_31.id)){for(i=_31.id.length-1;i>=0;--i){res.id.push(_31.id[i]);}}else{if(_31.id!==undefined){res.id.push(_31.id);}}}else{f(_31);}if(!res.range.length&&!res.id.length&&this.size()<0){res.range.push({start:0,count:1});}return res;}});});