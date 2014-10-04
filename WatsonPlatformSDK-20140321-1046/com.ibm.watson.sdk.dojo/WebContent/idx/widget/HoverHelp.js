//>>built
require({cache:{"url:idx/widget/templates/HoverHelp.html":"<div class=\"${baseClass}\" data-dojo-attach-event=\"onfocus:_onFocus\">\r\n<div data-dojo-type=\"dijit/form/DropDownButton\" data-dojo-attach-point=\"_button\" data-dojo-attach-event=\"onMouseEnter:_handleMouseOver,onMouseLeave:_handleMouseOut\"\r\n><div tabindex=\"0\" data-dojo-type=\"idx/widget/TooltipDialog\" data-dojo-props=\"idxExtraClasses:'${baseClass}_TooltipDialog'\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onMouseEnter:_handleMouseOver,onMouseLeave:_handleMouseOut\"\r\n><div tabindex=\"0\" id=\"${id}_wrapper\" aria-labelledby=\"${id}_message\" class=\"${baseClass}InfoWrapper\" data-dojo-attach-point=\"_wrapper\"\r\n><div id=\"${id}_message\" class=\"${baseClass}Message\" data-dojo-attach-point=\"_messageNode,containerNode\"\r\n></div><div class=\"${baseClass}Link\" data-dojo-attach-point=\"_linkNode\"\r\n><a tabindex=\"0\" class=\"${baseClass}Link\" target=\"_blank\" data-dojo-attach-point=\"_anchorNode\"\r\n></a></div></div></div></div></div>\r\n"}});define("idx/widget/HoverHelp",["dojo/_base/declare","dojo/aspect","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/_base/lang","dojo/dom-class","dojo/dom-attr","dojo/_base/event","../string","../util","../resources","dojo/text!./templates/HoverHelp.html","dijit/form/DropDownButton","idx/widget/TooltipDialog","../ext","dojo/i18n!../nls/base","dojo/i18n!./nls/base","dojo/i18n!./nls/HoverHelp"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){var _e="standard";var _f={standard:"ProfileStandard",compact:"ProfileCompact"};var _10=_1("idx.widget.HoverHelp",[_3,_4,_5],{message:"",href:"",baseHref:"",topicID:"",hrefLabel:"",messageKeyPrefix:"",messageKeySuffix:"",hrefKeyPrefix:"",hrefKeySuffix:"",resources:null,showDelay:400,hideDelay:800,clickToOpen:false,disabled:false,profile:"",baseClass:"idxHoverHelp",templateString:_d,constructor:function(_11,_12){this._started=false;this._built=false;},postMixInProperties:function(){_b.nullify(this,this.params,["messageKeyPrefix","messageKeySuffix","hrefKeyPrefix","hrefKeySuffix","baseHref","title"]);this.inherited(arguments);this._defaultResources=_c.getResources("idx/widget/HoverHelp",this.lang);},buildRendering:function(){this.inherited(arguments);this._built=true;this._updateProfile();this._updateMessage();this._updateHref();this._updateTitle();this._updateHrefLabel();},_fillContent:function(_13){this.inherited(arguments);this._fillMessage=_a.nullTrim(this.containerNode.innerHTML);},_setLangAttr:function(_14){this.inherited(arguments);this.lang=_14;this._resetResources();},_setDisabledAttr:function(_15){this.disabled=_15;this._button.set("disabled",_15);},_setResourcesAttr:function(_16){this.resources=_16;this._resetResources();},_resetResources:function(){this._updateMessage();this._updateTitle();this._updateHref();this._updateHrefLabel();},_resourceLookup:function(key){var _17=null;if(this.resources){_17=this.resources[key];}if(!_17){_17=this._defaultResources[key];}return _17;},startup:function(){this.inherited(arguments);var _18=_b.getCSSOptions(this.baseClass+"ButtonOptions",this.domNode,this._button);if(_18){for(field in _18){this._button.set(field,_18[field]);}}this._started=true;this._updateMessage();this._updateHref();this._updateHrefLabel();_2.after(this._button,"openDropDown",_6.hitch(this,this._removeTitle),true);_2.after(this._button,"closeDropDown",_6.hitch(this,this._restoreTitle),true);this.own(_2.after(this._dialog,"orient",_6.hitch(this,this._orient),true));var _19=this;this._docHandlers=[];this._attachCount=0;_2.before(this._button,"_onDropDownMouseDown",function(e){if(_19._button.disabled||_19._button.readOnly){return [e];}var _1a=_19._button._docHandler;if(_1a){_19._button.disconnect(_1a);if(_19._button._docHandler===_1a){delete _19._button._docHandler;}else{delete _1a;}}return [e];});_2.before(this._button,"_onDropDownMouseUp",function(e){var _1b=_19._button._docHandler;if(e&&_1b){_19._button.disconnect(_1b);if(_19._button._docHandler===_1b){delete _19._button._docHandler;}else{delete _1b;}}return [e];});},_onFocus:function(){if(this._button.focus){this._button.focus();}else{if(this._button.focusNode){this._button.focusNode.focus();}}},_doOpen:function(){if(this._hideTimer){if(this._showTimer){clearTimeout(this._showTimer);delete this._showTimer;}return;}if(!this._button._opened){this._button._onDropDownMouseDown({preventDefault:function(){}});}if(this._showTimer){clearTimeout(this._showTImer);delete this._showTimer;}},_handleMouseOver:function(e){if(this.clickToOpen){return;}this._removeTitle();if(this._hideTimer){clearTimeout(this._hideTimer);delete this._hideTimer;}if(!this._button._opened){_9.stop(e);e.preventDefault();if(!this._showTimer){this._showTimer=setTimeout(_6.hitch(this,function(){this._doOpen();}),this.showDelay);}}},_doClose:function(e){if(this._showTimer){if(this._hideTimer){clearTimeout(this._hideTimer);delete this._hideTimer;}return;}var _1c=undefined;if(this._button.dropDown){_1c=this._button.dropDown.autoFocus;this._button.dropDown.autoFocus=false;}this._button._onDropDownMouseUp(e);this._button.closeDropDown();if(this._button.dropDown){this._button.dropDown.autoFocus=_1c;}if(this._hideTimer){delete this._hideTimer;this._hiding=false;}},_handleMouseOut:function(e){if(this.clickToOpen){return;}this._hiding=true;this._restoreTitle();if(this._showTimer){clearTimeout(this._showTimer);delete this._showTimer;}if(this._button._opened){_9.stop(e);e.preventDefault();if(!this._hideTimer){var _1d={pageX:e.pageX,pageY:e.pageY,target:e.target};this._hideTimer=setTimeout(_6.hitch(this,this._doClose,_1d),this.hideDelay);}}},_orient:function(_1e,_1f,_20){var c=this._currentOrientClass;if(c){_7.remove(this._dialog.domNode,c);}c="idxHoverHelpAB"+(_20.charAt(1)=="L"?"Left":"Right")+" idxHoverHelp"+(_20.charAt(0)=="T"?"Below":"Above");_7.add(this._dialog.domNode,c);this._currentOrientClass=c;},_getMessageKeyPrefix:function(){if(this.messageKeyPrefix){return this.messageKeyPrefix;}var _21=this._resourceLookup("messageKeyPrefix");return (_21)?_21:"topic_";},_getMessageKeySuffix:function(){if(this.messageKeySuffix){return this.messageKeySuffix;}var _22=this._resourceLookup("messageKeySuffix");return (_22)?_22:"_message";},_getHrefKeyPrefix:function(){if(this.hrefKeyPrefix){return this.hrefKeyPrefix;}var _23=this._resourceLookup("hrefKeyPrefix");return (_23)?_23:"topic_";},_getHrefKeySuffix:function(){if(this.hrefKeySuffix){return this.hrefKeySuffix;}var _24=this._resourceLookup("hrefKeySuffix");return (_24)?_24:"_href";},_getMessage:function(){if(this.message){return this.message;}var _25=null;if(this.topicID){var _25=null;var _26=this._getMessageKeyPrefix();var _27=this._getMessageKeySuffix();var key=(_26+this.topicID+_27);_25=this._resourceLookup(key);}if((!_25)&&(this._built)){_25=this._fillMessage;}if(!_25){_25=this._resourceLookup("defaultMessage");}return (_25?_25:"");},_setMessageAttr:function(_28){this.message=_28;if(this._built){this._messageNode.innerHTML=this._getMessage();}},_setMessageKeyPrefixAttr:function(_29){this.message=_29;if(this._built){this._messageNode.innerHTML=this._getMessage();}},_setMessageKeySuffixAttr:function(_2a){this.message=_2a;if(this._built){this._messageNode.innerHTML=this._getMessage();}},_setTopicIDAttr:function(_2b){this.topicID=_2b;this._updateMessage();this._updateHref();},_setTitleAttr:function(_2c){this.title=_2c;this._updateTitle();},_setHrefAttr:function(_2d){this.href=_2d;this._updateHref();},_setHrefKeyPrefixAttr:function(_2e){this.href=_2e;this._updateHref();},_setHrefKeySuffixAttr:function(_2f){this.href=_2f;},_setHrefLabelAttr:function(_30){this.hrefLabel=_30;this._updateHrefLabel();},_updateMessage:function(){if(!this._built){return;}this._messageNode.innerHTML=this._getMessage();},_updateHref:function(){if(!this._built){return;}var _31=this._getFullHref();if(_31){_7.remove(this._linkNode,"idxHoverHelpLinkHidden");_7.add(this._linkNode,"idxHoverHelpLink");}else{_7.remove(this._linkNode,"idxHoverHelpLink");_7.add(this._linkNode,"idxHoverHelpLinkHidden");}_8.set(this._anchorNode,"href",this._getFullHref());},_removeTitle:function(){_8.remove(this._button.titleNode,"title");},_restoreTitle:function(){this._updateTitle();},_updateTitle:function(){if(!this._built){return;}var _32=this._getTitle();this._button.set("label",_32);this._button.set("title",_32);},_updateHrefLabel:function(){if(!this._built){return;}var _33=this._getHrefLabel();_8.set(this._anchorNode,"innerHTML",_33);},_getTitle:function(){if(_a.nullTrim(this.title)){return this.title;}var _34=this._resourceLookup("defaultTitle");return (_34?_34:"");},_getFullHref:function(){var _35=this._getHref();if(!_35){return null;}return this._getBaseHref()+_35;},_getBaseHref:function(){if(this.baseHref){return this.baseHref;}var _36=this._resourceLookup("baseHref");return (_36)?_36:"";},_getHref:function(){var _37=_a.nullTrim(this.href);if(_37){return _37;}if(!this.topicID){return "";}var _38=null;var _39=this._getHrefKeyPrefix();var _3a=this._getHrefKeySuffix();var key=(_39+this.topicID+_3a);_38=this._resourceLookup(key);return _a.nullTrim(_38);},_getHrefLabel:function(){if(this.hrefLabel){return this.hrefLabel;}var _3b=this._resourceLookup("defaultHrefLabel");return (_3b)?_3b:"";}});_10.setDefaultProfile=function(_3c){if(_3c=="compact"){_e="compact";}else{_e="standard";}};_10.getDefaultProfile=function(){return _e;};_6.extend(_10,{_setProfileAttr:function(_3d){this.profile=_3d;this._updateProfile();},_updateProfile:function(){if(!this._defaultProfileHandle){var _3e=_6.hitch(this,"_updateProfile");this._defaultProfileHandle=this.own(_2.after(_10,"setDefaultProfile",_3e,true));}if(!this._built){return;}var _3f=_a.nullTrim(this.profile);var _40=_10.getDefaultProfile();if((!_3f)||(!(_3f in _f))){_3f=_40;}if(this._profile==_3f){return;}if(this._profile){var _41=this._profile;var _42=this.baseClass+_f[_41?_41:_e];if(this.domNode){_7.remove(this.domNode,_42);}}this._profile=_3f;var _43=this.baseClass+_f[_3f];if(this.domNode){_7.add(this.domNode,_43);}}});return _10;});