//>>built
define("gridx/modules/HScroller",["dojo/_base/declare","dojo/_base/html","dojo/_base/sniff","dojo/_base/Deferred","dojox/html/metrics","../core/_Module"],function(_1,_2,_3,_4,_5,_6){return _6.registerModule(_1("gridx.modules.HScroller",_6,{name:"hscroller",required:["vLayout"],constructor:function(){this.grid._initEvents(["H"],["Scroll"]);},getAPIPath:function(){return this.grid.autoWidth?{}:{hScroller:this};},load:function(_7){if(!this.grid.autoWidth){this.grid.vLayout.register(this,"domNode","footerNode",0);this.domNode=this.grid.hScrollerNode;this.stubNode=this.domNode.firstChild;_2.style(this.domNode,"display","block");this.connect(this.grid.body,"onRender","refresh");this.connect(this.domNode,"onscroll","_onScroll");this.connect(this.grid,"_onResizeBegin",function(_8,ds){ds.hScroller=new _4();});this.connect(this.grid,"_onResizeEnd",function(_9,ds){var _a=this;_4.when(ds.header,function(){_a.refresh();ds.hScroller.callback();});});if(_3("ie")<7){this.domNode.style.height=dojox.html.metrics.getScrollbar().h+"px";}}this.loaded.callback();},scroll:function(_b){this.domNode.scrollLeft=_b;},refresh:function(){var bn=this.grid.bodyNode;var pl=_2.style(bn,"paddingLeft")||0;_2.style(this.domNode,{marginLeft:_2.style(bn,"marginLeft")+pl+"px",marginRight:_2.style(bn,"marginRight")+"px",width:bn.offsetWidth+"px"});_2.style(this.stubNode,"width",bn.scrollWidth+"px");},_onScroll:function(e){if(this._lastLeft==this.domNode.scrollLeft){return;}this._lastLeft=this.domNode.scrollLeft;this._doScroll();},_doScroll:function(_c){var _d=this.domNode.scrollLeft;this.grid.bodyNode.scrollLeft=_d;this.grid.onHScroll(_d);}}));});