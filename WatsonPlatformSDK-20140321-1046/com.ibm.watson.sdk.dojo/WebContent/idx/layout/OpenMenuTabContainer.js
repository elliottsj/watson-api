//>>built
define("idx/layout/OpenMenuTabContainer",["dojo/_base/declare","dojo/_base/lang","dijit/registry","dojo/dom-class","dojo/dom-attr","dojo/dom-style","dojo/query","dijit/layout/utils","dijit/MenuItem","dijit/MenuSeparator","dijit/layout/TabContainer","dijit/layout/ScrollingTabController","idx/resources","dojo/i18n!../nls/base","dojo/i18n!./nls/base","dojo/i18n!./nls/OpenMenuTabContainer"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){var _e=_1("idx.layout.OpenMenuTabContainer",[_b],{idxBaseClass:"idxOpenMenuTabContainer",numinit:null,constructor:function(_f){this.numinit=3;if(_f){_2.mixin(this,_f);}if(this.useMenu){this.controllerWidget="idx.layout.OpenMenuTabController";this.useSlider=false;}},buildRendering:function(){this.inherited(arguments);_4.add(this.domNode,this.baseclass);_5.set(this.tablist._menuBtn.focusNode,"tabindex","0");if(this.useMenu){_4.add(this.domNode,this.idxBaseClass+"WithOpenMenu");}else{_4.add(this.domNode,this.idxBaseClass+"NoOpenMenu");}}});_1("idx.layout.OpenMenuTabController",[_c],{MIN_NUM:3,MAX_NUM:10,num:null,numinit:null,msg:{},pane2add:null,constructor:function(){this.pane2add=new Object();this.num=0;this.numinit=this.MIN_INIT;},postMixInProperties:function(){this.inherited(arguments);this.msg=_d.getResources("idx/layout/OpenMenuTabContainer",this.lang);},postCreate:function(){var MN=this.declaredClass+".postCreate";this.inherited(arguments);this.num=0;var btn={loadDropDown:_2.hitch(this._menuBtn,this._loadDropDown)};_2.mixin(this._menuBtn,btn);var _10=_3.byId(this.containerId);if(!_10){throw Error(MN+" Error. Unable to find tab container with id : "+this.containerId);}this.numinit=_10.numinit?_10.numinit:this.numinit;if(this.numinit<this.MIN_NUM){this.numinit=this.MIN_NUM;}else{if(this.numinit>this.MAX_NUM){this.numinit=this.MAX_NUM;}}},onAddChild:function(_11,_12){var MN=this.declaredClass+".onAddChild";var _13=_3.byId(this.containerId);if(!_13){throw new Error(MN+" Error. Unable to find tab container with id : "+this.containerId);}var _14=this.pane2add[_11.title]?true:false;if(this.num<this.numinit||_14){this.num++;this.inherited(arguments);}else{if(!_14){this.pane2add[_11.title]=_11;_13.removeChild(_11);}}},resize:function(dim){this.inherited(arguments);this._menuBtn.layoutAlign=this.isLeftToRight()?"left":"right";_8.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);_6.set(this._menuBtn.id,"visibility","visible");},_initButtons:function(){var _15="tabStripButton-"+this.tabPosition;_4.remove(this._menuBtn.domNode,_15);_4.remove(this._menuBtn.domNode,"tabStripButton");this._menuBtn.set("label",this.msg.open);this._menuBtn.set("showLabel",true);this._buttons=_7("> .tabStripButton",this.domNode).filter(function(btn){},this);this.inherited(arguments);_4.add(this._menuBtn.domNode,"tabStripButton");},_loadDropDown:function(_16){var MN=this.declaredClass+"._loadDropDown";this.inherited("loadDropDown",arguments);var _17=_3.byId(this.containerId);if(!_17){throw new Error(MN+" Error. Unable to find tab container with id : "+this.containerId);}var _18=_17.tablist;var _19=0;for(var key in _18.pane2add){var _1a=_18.pane2add[key];var _1b=new _9({id:_1a.id+"_stcMi",label:_1a.title,iconClass:_1a.iconClass,dir:_1a.dir,lang:_1a.lang,onClick:function(){var _1c=_18.pane2add[this.label];_17.addChild(_1c);_17.selectChild(_1c);delete _18.pane2add[this.label];}});_19++;if(_19==1){this.dropDown.addChild(new _a());}this.dropDown.addChild(_1b);}}});return _e;});