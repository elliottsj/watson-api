//>>built
define("idx/gridx/modules/Pagination",["dojo/_base/declare","dojo/_base/array","../core/_Module"],function(_1,_2,_3){return _1(_3,{name:"pagination",forced:["body"],getAPIPath:function(){return {pagination:this};},rowMixin:{getPage:function(){return this.grid.pagination.pageOfIndex(this.index());},indexInPage:function(){return this.grid.pagination.indexInPage(this.index());}},preload:function(){this.grid.body.autoChangeSize=false;},load:function(){var t=this,_4=function(){t._updateBody(1);t.connect(t.model,"onSizeChange","_onSizeChange");t.loaded.callback();};t._pageSize=t.arg("initialPageSize")||t._pageSize;t._page=t.arg("initialPage",t._page,function(_5){return _5>=0;});t.model.when({}).then(_4,_4);},pageSize:function(){var s=this._pageSize;return s>0?s:this.model.size();},isAll:function(){return this._pageSize===0;},pageCount:function(){return this.isAll()?1:Math.max(Math.ceil(this.model.size()/this.pageSize()),1);},currentPage:function(){return this._page;},firstIndexInPage:function(_6){if(!_6&&_6!==0){_6=this._page;}else{if(!(_6>=0)){return -1;}}var _7=_6*this.pageSize();return _7<this.model.size()?_7:-1;},lastIndexInPage:function(_8){var t=this,_9=t.firstIndexInPage(_8);if(_9>=0){var _a=_9+t.pageSize()-1,_b=t.model.size();return _a<_b?_a:_b-1;}return -1;},pageOfIndex:function(_c){return this.isAll()?0:Math.floor(_c/this.pageSize());},indexInPage:function(_d){return this.isAll()?_d:_d%this.pageSize();},filterIndexesInPage:function(_e,_f){var _10=this.firstIndexInPage(_f),end=this.lastIndexInPage(_f);return _10<0?[]:_2.filter(_e,function(_11){return _11>=_10&&_11<=end;});},gotoPage:function(_12){var t=this,_13=t._page;if(_12!=_13&&t.firstIndexInPage(_12)>=0){t._page=_12;t._updateBody();t.onSwitchPage(_12,_13);}},setPageSize:function(_14){var t=this,_15=t._pageSize;if(_14!=_15&&_14>=0){var _16=t.firstIndexInPage(),_17=-1;t._pageSize=_14;if(t._page>=t.pageCount()){_17=t._page;t._page=t.pageOfIndex(_16);}t._updateBody();t.onChangePageSize(_14,_15);if(_17>=0){t.onSwitchPage(t._page,_17);}}},onSwitchPage:function(){},onChangePageSize:function(){},_page:0,_pageSize:10,_updateBody:function(_18){var t=this,bd=t.grid.body,_19=t.model.size(),_1a=t.pageSize(),_1b=t.firstIndexInPage();if(_19===0||_1b<0){_1b=0;_1a=0;}else{if(_19-_1b<_1a){_1a=_19-_1b;}}bd.updateRootRange(_1b,_1a);if(!_18){bd.refresh();}},_onSizeChange:function(_1c){var t=this;if(_1c===0){t._page=0;t.grid.body.updateRootRange(0,0);}else{var _1d=t.firstIndexInPage();if(_1d<0&&t._page!==0){var _1e=t._page;t._page=0;t.onSwitchPage(0,_1e);}t._updateBody();}}});});