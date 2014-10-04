//>>built
define("gridx/modules/Dod",["dojo/_base/kernel","../core/_Module","dojo/_base/declare","dojo/_base/html","dojo/fx","dojo/query"],function(_1,_2,_3,_4,fx,_5){return _2.registerModule(_3("gridx.modules.Dod",_2,{name:"dod",required:["body"],useAnimation:true,duration:750,defaultShow:false,showExpando:true,autoClose:false,load:function(_6,_7){this._rowMap={};this.connect(this.grid.body,"onAfterRow","_onAfterRow");this.connect(this.grid.bodyNode,"onclick","_onBodyClick");if(this.grid.columnResizer){this.connect(this.grid.columnResizer,"onResize","_onColumnResize");}this.loaded.callback();},getAPIPath:function(){return {dod:this};},rowMixin:{showDetail:function(){this.grid.dod.show(this);},hideDetail:function(){this.grid.dod.hide(this);},toggleDetail:function(){this.grid.dod.toggle(this);},refreshDetail:function(){this.grid.dod.refreshDetail(this);},isDetailShown:function(){return this.grid.dod.isShown(this);},},show:function(_8){var _9=this._row(_8);if(_9.dodShown||_9.inAnim){return;}_9.dodShown=true;var _a=_8.node(),w=_a.scrollWidth;if(!_9.dodLoadingNode){_9.dodLoadingNode=_1.create("div",{className:"dojoxGridxDodLoadNode",innerHTML:"Loading..."});}if(!_9.dodNode){_9.dodNode=_1.create("div",{className:"dojoxGridxDodNode"});}_4.place(_9.dodLoadingNode,_a,"last");_4.place(_9.dodNode,_a,"last");_4.style(_9.dodLoadingNode,"width",w+"px");_4.style(_9.dodNode,"width",w+"px");_4.addClass(_a,"dojoxGridxDodShown");_4.style(_9.dodNode,"display","none");if(_9.dodLoaded){this._detailLoadComplete(_8);return;}else{_4.style(_9.dodLoadingNode,"display","block");}var df=new _1.Deferred(),_b=this;this.detailProvider(this.grid,_8.id,_9.dodNode,df);df.then(_1.hitch(this,"_detailLoadComplete",_8),_1.hitch(this,"_detailLoadError",_8));},hide:function(_c){var _d=this._row(_c),g=this.grid;if(!_d.dodShown||_d.inAnim){return;}_4.removeClass(_c.node(),"dojoxGridxDodShown");_4.style(_d.dodLoadingNode,"display","none");_d.inAnim=true;fx.wipeOut({node:_d.dodNode,duration:this.duration,onEnd:function(){_d.dodShown=false;_d.inAnim=false;g.body.onRender();}}).play();_d.defaultShow=false;},toggle:function(_e){if(this.isShown(_e)){this.hide(_e);}else{this.show(_e);}},refresh:function(_f){var _10=this._row(_f);_10.dodLoaded=false;this.show(_f);},isShown:function(row){var _11=this._row(row);return !!_11.dodShown;},onShow:function(row){},onHide:function(row){},_rowMap:null,_lastOpen:null,_row:function(row){var id=row.id||row;return this._rowMap[id]||(this._rowMap[id]={});},_onBodyClick:function(e){if(!_4.hasClass(e.target,"dojoxGridxDodExpando")){return;}var _12=e.target;while(_12&&!_4.hasClass(_12,"dojoxGridxRow")){_12=_12.parentNode;}var idx=_4.attr(_12,"rowindex");this.toggle(this.grid.row(parseInt(idx)));},_onAfterRow:function(_13,_14,_15){var row=this.grid.row(_14.rowIndex),_16=this._row(row);if(this.isShown(row)||(this.defaultShow&&_16.dodShown===undefined)){_16.dodShown=false;_16.defaultShow=true;this.show(row);}if(this.showExpando){var tbl=_1.query("table",_13)[0];var _17=tbl.rows[0].cells[0];var _18=_1.create("span",{className:"dojoxGridxDodExpando"},_17,"first");}},_onColumnResize:function(){_1.query(".dojoxGridxDodNode",this.grid.bodyNode).forEach(function(_19){_4.style(_19,"width",_19.parentNode.firstChild.offsetWidth+"px");});},_detailLoadComplete:function(row){var _1a=this._row(row),g=this.grid;if(!this.isShown(row)){return;}_1a.dodLoaded=true;if(_1a.defaultShow){_4.style(_1a.dodNode,"display","block");g.body.onRender();}else{if(_1.style(_1a.dodLoadingNode,"display")=="block"){_4.marginBox(_1a.dodNode,{h:_4.marginBox(_1a.dodLoadingNode).h});_4.style(_1a.dodNode,"display","block");}_1a.inAnim=true;fx.wipeIn({node:_1a.dodNode,duration:this.duration,onEnd:function(){_1a.inAnim=false;g.body.onRender();}}).play();}_4.style(_1a.dodLoadingNode,"display","none");},_detailLoadError:function(row){var _1b=this._row(row);_1b.dodLoaded=false;if(!this.isShown(row)){return;}_1b.dodLoadingNode.innerHTML="Error: failed to load detail.";},_showLoading:function(row){var _1c=this._row(row);var _1d=_1c.dodLoadingNode;_1d.innerHTML="Loading...";},_hideLoading:function(row){},endFunc:function(){}}));});