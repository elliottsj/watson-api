//>>built
define("idx/widgets",["dojo/_base/lang","idx/main","dojo/dom-class","dijit/_WidgetBase","dijit/_base/manager","./string","./util"],function(_1,_2,_3,_4,_5,_6,_7){var _8=_1.getObject("widgets",true,_2);_1.extend(_4,{idxBaseClass:"",idxExtraClasses:"",idxDefaultsClass:"",idxChildClass:"",mixinArgs:null,idxBeforePostMixInProperties:function(){var _9=this.mixinArgs;while(this.mixinArgs!=null){var _a=this.mixinArgs;this.mixinArgs=null;_1.mixin(this,_a);if(!this.params){this.params={};}_1.mixin(this.params,_a);}this.mixinArgs=_9;if(this.params){this.params.mixinArgs=_9;}else{this.params={mixinArgs:_9};}},idxAfterPostMixInProperties:function(){},idxBeforeBuildRendering:function(){},idxAfterBuildRendering:function(){if((this.domNode)&&(_6.nullTrim(this.idxBaseClass))){_3.add(this.domNode,this.idxBaseClass);}if((this.domNode)&&(_6.nullTrim(this.idxExtraClasses))){var _b=this.idxExtraClasses.split(",");for(var _c=0;_c<_b.length;_c++){var _d=_b[_c];_3.add(this.domNode,_d);}}},idxBeforePostCreate:function(){},idxAfterPostCreate:function(){},idxBeforeStartup:function(){},idxAfterStartup:function(){var _e=this.getChildren();if((this.domNode)&&(_6.nullTrim(this.idxChildClass))){this._idxStyleChildNodes(this.idxChildClass,this.domNode);}this._idxStyleChildren();},_idxWidgetPostMixInProperties:function(){if(!("_idxWidgetOrigPostMixInProperties" in this)){return;}if(!this._idxWidgetOrigPostMixInProperties){return;}this.postMixInProperties=this._idxWidgetOrigPostMixInProperties;this.idxBeforePostMixInProperties();this.postMixInProperties();this.idxAfterPostMixInProperties();},_idxWidgetBuildRendering:function(){if(!("_idxWidgetOrigBuildRendering" in this)){return;}if(!this._idxWidgetOrigBuildRendering){return;}this.buildRendering=this._idxWidgetOrigBuildRendering;this.idxBeforeBuildRendering();this.buildRendering();this.idxAfterBuildRendering();},_idxWidgetPostCreate:function(){if(!("_idxWidgetOrigPostCreate" in this)){return;}if(!this._idxWidgetOrigPostCreate){return;}this.postCreate=this._idxWidgetOrigPostCreate;this.idxBeforePostCreate();this.postCreate();this.idxAfterPostCreate();},_idxWidgetStartup:function(){if(!("_idxWidgetOrigStartup" in this)){return;}if(!this._idxWidgetOrigStartup){return;}this.startup=this._idxWidgetOrigStartup;this.idxBeforeStartup();this.startup();this.idxAfterStartup();},_idxStyleChildren:function(){if(!_6.nullTrim(this.idxChildClass)){return;}if(!_6.nullTrim(this.baseClass)){return;}var _f=this._idxPrevStyledChildren;if((_f)&&(_f.length>0)){var _10=this._idxPrevChildBase;var _11=_10+"-idxChild";var _12=_10+"-idxFirstChild";var _13=_10+"-idxMiddleChild";var _14=_10+"-idxLastChild";var _15=_10+"-idxOnlyChild";for(var _16=0;_16<_f.length;_16++){var _17=_f[_16];if(!_17.domNode){continue;}if(_17._idxUnstyleChildNodes){_17._idxUnstyleChildNodes(_17.domNode,_10);}else{dRemoveClass(_17.domNode,_11);dRemoveClass(_17.domNode,_12);dRemoveClass(_17.domNode,_13);dRemoveClass(_17.domNode,_14);dRemoveClass(_17.domNode,_15);}}}this._idxPrevStyledChildren=null;this._idxPrevChildBase=null;var _16=0;var _18=this.getChildren();if((_18)&&(_18.length>0)){var _10=this.baseClass+"-"+this.idxChildClass;var _11=_10+"-idxChild";var _12=_10+"-idxFirstChild";var _13=_10+"-idxMiddleChild";var _14=_10+"-idxLastChild";var _15=_10+"-idxOnlyChild";this._idxPrevStyledChildren=[];this._idxPrevChildBase=_10;for(_16=0;_16<_18.length;_16++){var _17=_18[_16];if(!_17.domNode){continue;}this._idxPrevStyledChildren.push(_17);if(_17._idxStyleChildNodes){_17._idxStyleChildNodes(_11,_17.domNode);}else{_3.add(_17.domNode,_11);}if(_16==0){if(_17._idxStyleChildNodes){_17._idxStyleChildNodes(_12,_17.domNode);}else{_3.add(_17.domNode,_12);}}if((_16>0)&&(_16<(_18.length-1))){if(_17._idxStyleChildNodes){_17._idxStyleChildNodes(_13,_17.domNode);}else{_3.add(_17.domNode,_13);}}if(_16==(_18.length-1)){if(_17._idxStyleChildNodes){_17._idxStyleChildNodes(_14,_17.domNode);}else{_3.add(_17.domNode,_14);}}if(_18.length==1){if(_17._idxStyleChildNodes){_17._idxStyleChildNodes(_15,_17.domNode);}else{_3.add(_17.domNode,_15);}}}}},_idxUnstyleChildNodes:function(_19,_1a){if(!_19){_19=this.domNode;}if(!_19){return;}var _1b=_1a+"-idxChild";var _1c=_1a+"-idxFirstChild";var _1d=_1a+"-idxMiddleChild";var _1e=_1a+"-idxLastChild";var _1f=_1a+"-idxOnlyChild";dRemoveClass(_19,_1b);dRemoveClass(_19,_1c);dRemoveClass(_19,_1d);dRemoveClass(_19,_1e);dRemoveClass(_19,_1f);var _20=_19.childNodes;if(!_20){return;}for(var _21=0;_21<_20.length;_21++){var _22=_20[_21];if(_5.getEnclosingWidget(_22)==this){this._idxUnstyleChildNodes(_22,_1a);}}},_idxStyleChildNodes:function(_23,_24){if(!_24){_24=this.domNode;}if(!_24){return;}_3.add(_24,_23);var _25=_24.childNodes;if(!_25){return;}for(var _26=0;_26<_25.length;_26++){var _27=_25[_26];if(_27.nodeType!=1){continue;}if(_5.getEnclosingWidget(_27)==this){this._idxStyleChildNodes(_23,_27);}}}});var _28=_4.prototype;var _29=_28.create;_28.create=function(_2a,_2b){var _2c="";var _2d=false;if(_2a){if(_2a.idxDefaultsClass){_2c=_2a.idxDefaultsClass;_2c=_6.nullTrim(_2c);_2d=false;}if((!_2c)&&_2a.idxBaseClass){_2c=_2a.idxBaseClass;_2c=_6.nullTrim(_2c);_2d=true;}if((!_2c)&&_2a.baseClass){_2c=_2a.baseClass;_2c=_6.nullTrim(_2c);_2d=true;}}if(!_2c){_2c=_6.nullTrim(this.idxDefaultsClass);_2d=false;}if(!_2c){_2c=_6.nullTrim(this.idxBaseClass);_2d=true;}if(!_2c){_2c=_6.nullTrim(this.baseClass);_2d=true;}if((_2c)&&(_2b)){if(_2d){_2c=_2c+"_idxDefaults";}var _2e=_7.getCSSOptions(_2c,dojo.byId(_2b),this);if(_2e!=null){for(var _2f in _2e){if(!(_2f in _2a)){_2a[_2f]=_2e[_2f];}}}}if(!this._idxWidgetOrigBuildRendering){this._idxWidgetOrigBuildRendering=this.buildRendering;}this.buildRendering=this._idxWidgetBuildRendering;if(!this._idxWidgetOrigPostMixInProperties){this._idxWidgetOrigPostMixInProperties=this.postMixInProperties;}this.postMixInProperties=this._idxWidgetPostMixInProperties;if(!this._idxWidgetOrigPostCreate){this._idxWidgetOrigPostCreate=this.postCreate;}this.postCreate=this._idxWidgetPostCreate;if(!this._idxWidgetOrigStartup){this._idxWidgetOrigStartup=this.startup;}this.startup=this._idxWidgetStartup;return _29.call(this,_2a,_2b);};return _8;});