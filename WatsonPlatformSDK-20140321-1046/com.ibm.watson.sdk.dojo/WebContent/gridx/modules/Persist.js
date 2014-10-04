//>>built
define("gridx/modules/Persist",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/json","dojo/_base/unload","dojo/cookie","../core/_Module"],function(_1,_2,_3,_4,_5,_6,_7){return _7.registerModule(_1("gridx.modules.Persist",_7,{name:"persist",constructor:function(_8,_9){this.grid=_8;this.arg("enabled");this.key=window.location+"/"+this.arg("key",_8.id,function(_a){return _a;});this.arg("options",function(_b){return _b&&_3.isObject(_b);});this.arg("put",function(_c){return _3.isFunction(_c);});this.arg("get",function(_d){return _3.isFunction(_d);});this._persistedList={};var _e=this,_f=_8.destroy;_8.destroy=function(){_e.save();_f.call(_8);};this._restoreColumnState();_5.addOnWindowUnload(function(){_e.save();});},getAPIPath:function(){return {persist:this};},enabled:true,options:null,key:"",put:function(key,_10,_11){if(_10&&_3.isObject(_10)){_6(key,_4.toJson(_10),_11);}else{_6(key,null,{expires:-1});}},get:function(key){return _4.fromJson(_6(key));},registerAndLoad:function(_12,_13,_14){if(!_3.isString(_12)||_12===""){throw new Error("feature name must be an unempty string");}if(!_3.isFunction(_13)){throw new Error("save function must be provided");}this._persistedList[_12]={saver:_13,scope:_14,enabled:true};var _15=this.get(this.key);return _15?_15[_12]:null;},enable:function(_16){this._setEnable(_16,true);},disable:function(_17){this._setEnable(_17,false);},isEnabled:function(_18){if(this._persistedList[_18]){return this._persistedList[_18].enabled;}return false;},save:function(){var _19=null;if(this.enabled){var _1a,_1b=this._persistedList;_19={};for(_1a in _1b){if(_1b[_1a].enabled){_19[_1a]=_1b[_1a].saver.call(_1b[_1a].scope||_3.global);}}}this.put(this.key,_19,this.options);},_persistedList:null,_setEnable:function(_1c,_1d){var _1e=this._persistedList;if(_1e[_1c]){_1e[_1c].enabled=_1d;}else{if(_1c===null||_1c===undefined){for(_1c in _1e){_1e[_1c].enabled=_1d;}this.enabled=_1d;}}},_restoreColumnState:function(){var _1f=this.grid,_20=this.registerAndLoad("column",this._columnStateSaver,this);if(_3.isArray(_20)){var col,_21=[];_2.forEach(_20,function(col){_2.some(_1f._columns,function(c,i){if(c.id===col.id){_21[col.index]=_1f._columns[i];_21[col.index].width=col.width;return true;}});});_1f.setColumns(_21);}},_columnStateSaver:function(){return _2.map(this.grid._columns,function(c){return {id:c.id,index:c.index,width:c.width};});}}));});