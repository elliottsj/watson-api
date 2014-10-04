//>>built
define("idx/app/Header",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/aspect","dojo/query","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/i18n","dojo/keys","dojo/string","dijit/_base/popup","dijit/place","dijit/registry","dijit/_Widget","dijit/_TemplatedMixin","idx/util","idx/resources","dojo/NodeList-dom","dojo/i18n!../nls/base","dojo/i18n!./nls/base","dojo/i18n!./nls/Header"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14){var _15=_3.getObject("idx.oneui",true);var _16={},_17={};var _18=function(){log.error("dijit/form/Button has been used without being loaded");};var _19=function(){log.error("dijit/form/TextBox has been used without being loaded");};var _1a=function(){log.error("idx/layout/MenuTabController has been used without being loaded");};return _15.Header=_2("idx.app.Header",[_11,_12],{primaryTitle:"",primaryBannerType:"thin",navigation:undefined,showNavigationDropDownArrows:true,primarySearch:undefined,user:undefined,showUserDropDownArrow:true,settings:undefined,showSettingsDropDownArrow:true,help:undefined,showHelpDropDownArrow:true,secondaryTitle:"",secondaryBannerType:"blue",secondarySubtitle:"",additionalContext:"",actions:undefined,contentContainer:"",contentTabsInline:false,secondarySearch:undefined,layoutType:"variable",templateString:"<div role=\"banner\">"+"<div style=\"visibility: hidden; display: none;\" data-dojo-attach-point=\"containerNode\">"+"</div>"+"<div data-dojo-attach-point=\"_mainContainerNode\">"+"</div>"+"</div>",_getComputedUserName:function(){return (this.user&&(typeof this.user.displayName=="function"))?this.user.displayName():(this.user.displayName||"");},_getComputedUserImage:function(){return (this.user&&(typeof this.user.displayImage=="function"))?this.user.displayImage():this.user.displayImage;},_getComputedUserMessage:function(){var _1b=this._getComputedUserName(),_1c=((typeof this.user.messageName=="function")?this.user.messageName():this.user.messageName)||_1b,_1d=_1c;if(this.user&&this.user.message){var _1e=(typeof this.user.message=="function")?this.user.message():this.user.message;_1d=_d.substitute(_1e,this.user,function(_1f,key){switch(key){case "messageName":return _1c;case "displayName":return _1b;default:return _1f||"";}});}return _1d;},_setUserDisplayNameAttr:function(_20){this.user=this.user||{};this.user.displayName=_20;this._refreshUser();},_setUserDisplayImageAttr:function(_21){this.user=this.user||{};this.user.displayImage=_21;this._refreshUser();},_setUserMessageNameAttr:function(_22){this.user=this.user||{};this.user.messageName=_22;this._refreshUser();},_setUserMessageAttr:function(_23){this.user=this.user||{};this.user.message=_23;this._refreshUser();},_prepareMenu:function(_24,_25,_26,_27,_28,_29){if(!_29){_29=[];}if(_25){if(_25[0]){var _2a=null;var _2b=_5.after(_24,"onOpen",function(){if(_24._popupWrapper){if(!_24._oneuiWrapper){_24._oneuiWrapper=_9.create("div",{"class":"idxHeaderContainer "+_25[0]},_4.body());var _2c=null;_2c=_5.after(_24,"destroy",function(){_9.destroy(_24._oneuiWrapper);delete _24._oneuiWrapper;if(_2c){_2c.remove();}});_29.push(_2c);}_24._oneuiWrapper.appendChild(_24._popupWrapper);}});_2a=_5.after(_24,"destroy",function(){if(_2b){_2b.remove();}if(_2a){_2a.remove();}});_29.push(_2a);_29.push(_2b);}var _2d=(_25.length>1)?_25.slice(1):_25,me=this;_1.forEach(_24.getChildren(),function(_2e){if(_2e.popup){me._prepareMenu(_2e.popup,_2d,undefined,undefined,undefined,_29);}if(_2e.currentPage){_8.add(_2e.domNode,"idxHeaderNavCurrentPage");}});}if(_27){var _2f=_27;_24._scheduleOpen=function(_30,_31,_32){if(!this._openTimer){var ltr=_24.isLeftToRight(),_33=_f.around(_e._createWrapper(_24),_2f,_28?["below-alt","below","above-alt","above"]:["below","below-alt","above","above-alt"],ltr,_24.orient?_3.hitch(_24,"orient"):null);if(!ltr){_33.x=_33.x+_33.w;}this._openTimer=setTimeout(_3.hitch(this,function(){delete this._openTimer;this._openMyself({target:_30,iframe:_31,coords:_33});}),1);}};_24.leftClickToOpen=true;if(_26){_24.bindDomNode(_26);}}return _29;},_refreshUser:function(){if(this.userNode){var _34=this._getComputedUserName(),_35=this._getComputedUserImage(),msg=this._getComputedUserMessage();_7.set(this.userNode,"title",_34);_7.set(this.userImageNode,"src",_35||"");_a.set(this.userImageNode,"display",_35?"block":"none");this.userTextNode.innerHTML=msg;_8.replace(this.userNode,msg?"idxHeaderUserName":"idxHeaderUserNameNoText","idxHeaderUserName idxHeaderUserNameNoText");}},_injectTemplate:function(_36,_37){var _38=_12.getCachedTemplate(_37,true);var _39;if(_3.isString(_38)){_39=_9.toDom(this._stringRepl(_38));}else{_39=_38.cloneNode(true);}this._attachTemplateNodes(_39,function(n,p){return n.getAttribute(p);});_36.appendChild(_39);},postMixInProperties:function(){this._nls=_14.getResources("idx/app/Header",this.lang);},_setup:function(){if(this.contentContainer&&this.secondaryBannerType&&this.secondaryBannerType.toLowerCase()=="white"){require.log("*** Warning: Header will not display content tabs when secondaryBannerType is \"white\". Specify a different type to see content tabs.");}var _3a=this.primaryTitle,_3b=true,_3c=this.help,_3d=this.settings,_3e=this.user,_3f=this.navigation,_40=this.primarySearch,_41=this.secondaryTitle||this.secondarySubtitle,_42=this.contextActions,_43=this.secondarySearch,_44=this.contentContainer&&(!this.secondaryBannerType||(this.secondaryBannerType.toLowerCase()!="white")),_45=_44&&(this.contentTabsInline||!_41),_46=this.secondaryBannerType&&(this.secondaryBannerType.toLowerCase()=="white"),_47=_44&&!_45,_48=_3a||_3b||_3c||_3d||_3e||_3f||_40,_49=_41||_42||_43||_45,_4a=_47,_4b;if(_48||_49||_4a){_8.add(this.domNode,"idxHeaderContainer");if(this.primaryBannerType&&(this.primaryBannerType.toLowerCase()=="thick")){_8.add(this._mainContainerNode,"idxHeaderPrimaryThick");}else{_8.add(this._mainContainerNode,"idxHeaderPrimaryThin");}if(this.secondaryBannerType&&((this.secondaryBannerType.toLowerCase()=="lightgrey")||(this.secondaryBannerType.toLowerCase()=="lightgray"))){_8.add(this._mainContainerNode,"idxHeaderSecondaryGray");_8.add(this._mainContainerNode,_4a?"idxHeaderSecondaryGrayDoubleRow":"idxHeaderSecondaryGraySingleRow");_4b=_48;}else{if(this.secondaryBannerType&&(this.secondaryBannerType.toLowerCase()=="white")){_8.add(this._mainContainerNode,"idxHeaderSecondaryWhite");_8.add(this._mainContainerNode,_4a?"idxHeaderSecondaryWhiteDoubleRow":"idxHeaderSecondaryWhiteSingleRow");_4b=_48;}else{_8.add(this._mainContainerNode,"idxHeaderSecondaryBlue");_8.add(this._mainContainerNode,(_4a)?"idxHeaderSecondaryBlueDoubleRow":"idxHeaderSecondaryBlueSingleRow");_4b=_48&&!_49&&!_4a;}}_8.add(this._mainContainerNode,_4a?"idxHeaderSecondaryDoubleRow":"idxHeaderSecondarySingleRow");if(this.layoutType&&(this.layoutType.toLowerCase()=="fixed")){_8.add(this._mainContainerNode,"idxHeaderWidthFixed");}else{_8.add(this._mainContainerNode,"idxHeaderWidthLiquid");}}var _4c=[],_4d=[],me=this;if(_40||_43||_42){_4c.push("dijit/form/Button");_4d.push(function(obj){_18=obj;});}if(_40||_43){_4c.push("dijit/form/TextBox");_4d.push(function(obj){_19=obj;});}if(_44){_4c.push("idx/layout/MenuTabController");_4d.push(function(obj){_1a=obj;});}require(_4c,function(){for(var i=0;i<_4d.length;i++){_4d[i](arguments[i]);}if(_48){me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderPrimary\">"+"<div class=\"idxHeaderPrimaryInner\" data-dojo-attach-point=\"primaryBannerNode\">"+"<ul data-dojo-attach-point=\"_globalActionsNode\" role=\"menubar\">"+"</ul>"+"</div>"+"</div>");}if(_3a){me._renderPrimaryTitle(me._globalActionsNode);}if(_3b){me._renderLogo(me._globalActionsNode);}if(_3c){me._renderHelp(me._globalActionsNode,_3d||_3e);}if(_3d){me._renderSettings(me._globalActionsNode,_3e);}if(_3e){me._renderUser(me._globalActionsNode);}if(_40){me._renderPrimarySearch(me._globalActionsNode);}if(_3f){me._renderNavigation(me.primaryBannerNode);}if(_4b){me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderBlueLip\">"+"</div>");}if(_49){me._injectTemplate(me._mainContainerNode,"<div class=\"idxHeaderSecondary\"> "+"<div class=\"idxHeaderSecondaryInner\" data-dojo-attach-point=\"secondaryBannerNode\">"+"</div>"+"</div>");}if(_43){me._renderSecondarySearch(me.secondaryBannerNode);}if(_41){me._renderSecondaryTitle(me.secondaryBannerNode);}if(_45){me._renderContent(me.secondaryBannerNode,false);}if(_42){me._renderContextActions(me.secondaryBannerNode);}if(_46){me._renderSecondaryInnerBorder(me.secondaryBannerNode);}if(_47){me._renderContent(me._mainContainerNode,true);}if(me._refreshing>0){me._refreshing--;}if(me._refreshing==0){me._refreshRequired=false;}else{me._doRefresh();}});},_reset:function(){_8.remove(this.domNode,"idxHeaderContainer");_8.remove(this._mainContainerNode,"idxHeaderPrimaryThick");_8.remove(this._mainContainerNode,"idxHeaderPrimaryThin");_8.remove(this._mainContainerNode,"idxHeaderSecondaryGray");_8.remove(this._mainContainerNode,"idxHeaderSecondaryGrayDoubleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondaryGraySingleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondaryWhite");_8.remove(this._mainContainerNode,"idxHeaderSecondaryWhiteDoubleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondaryWhiteSingleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondaryBlue");_8.remove(this._mainContainerNode,"idxHeaderSecondaryBlueDoubleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondaryBlueSingleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondaryDoubleRow");_8.remove(this._mainContainerNode,"idxHeaderSecondarySingleRow");_8.remove(this._mainContainerNode,"idxHeaderWidthFixed");_8.remove(this._mainContainerNode,"idxHeaderWidthLiquid");if(this.help){this.help=_10.byId(this.help);if(this.help){this.help.placeAt(this.containerNode);}}this._clearHandles("_helpHandles");if(this.settings){this.settings=_10.byId(this.settings);if(this.settings){this.settings.placeAt(this.containerNode);}}this._clearHandles("_settingsHandles");if(this.user&&this.user.actions){this.user.actions=_10.byId(this.user.actions);if(this.user.actions){this.user.actions.placeAt(this.containerNode);}}this._clearHandles("_actionsHandles");if(this.navigation){this.navigation=_10.byId(this.navigation);if(this.navigation){this.navigation.placeAt(this.containerNode);}}this._clearHandles("_navHandles");this._clearHandles("_controllerHandlers");_1.forEach(_10.findWidgets(this._mainContainerNode),function(_4e){_4e.destroy();});var _4f=[];_1.forEach(this._mainContainerNode.childNodes,function(_50){_4f.push(_50);});_1.forEach(_4f,function(_51){_9.destroy(_51);});this._globalActionsNode=null;this.primaryTitleTextNode=null;this.primaryBannerNode=null;this.secondaryBannerNode=null;this._helpNode=null;this._settingsNode=null;this.userNode=null;this.userImageNode=null;this.userTextNode=null;this.primarySearchTextNode=null;this.primarySearchButtonNode=null;this.secondaryTitleTextNode=null;this._secondaryTitleSeparatorNode=null;this.secondarySubtitleTextNode=null;this.additionalContextTextNode=null;this._contextActionsNode=null;if(this.contextActionNodes){delete this.contextActionNodes;}this.secondarySearchTextNode=null;this.secondarySearchButtonNode=null;this.contentControllerNode=null;},constructor:function(_52,_53){this._refreshing=0;},destroy:function(){if(this.navigation){if(this.navigation.destroyRecursive){this.navigation.destroyRecursive();}else{if(this.navigation.destroy){this.navigation.destroy();}}this.navigation=null;}this._clearHandles("_navHandles");if(this._controller){if(this._controller.destroyRecursive){this._controller.destroyRecursive();}else{if(this._controller.destroy){this._controller.destroy();}}delete this._controller;}this._clearHandles("_controllerHandles");if(this.settings){if(this.settings.destroyRecursive){this.settings.destroyRecursive();}else{if(this.settings.destroy){this.settings.destroy();}}this.settings=null;}this._clearHandles("_settingsHandles");if(this.help){if(this.help.destroyRecursive){this.help.destroyRecursive();}else{if(this.help.destroy){this.help.destroy();}}this.help=null;}this._clearHandles("_helpHandles");if(this.user&&this.user.actions){if(this.user.actions.destroyRecursive){this.user.actions.destroyRecursive();}else{if(this.user.actions.destroy){this.user.actions.destroy();}}this.user.actions=null;this.user=null;}this._clearHandles("_actionsHandles");this.inherited(arguments);},_clearHandles:function(_54){if(!(_54 in this)){return;}var _55=this[_54];_1.forEach(_55,function(_56){_56.remove();});delete this[_54];},buildRendering:function(){this.inherited(arguments);this._setup();},_setContentTabsInlineAttr:function(_57){var _58=this.contentTabsInline;this.contentTabsInline=_57;if(_58!=_57){this._refresh();}},_setContentContainerAttr:function(_59){var _5a=this.contentContainer;this.contentContainer=_59;if(!_13.widgetEquals(_5a,_59)){this._refresh();}},_setActionsAttr:function(_5b){var _5c=this.actions;this.actions=_5b;if(_5c!==_5b){this._refresh();}},_setAdditionalContextAttr:function(_5d){var _5e=this.additionalContext;var _5f=this.additionalContextTextNode;this.additionalContext=_5d;if(_5f){_5f.innerHTML=(_5d)?_5d:"";}},_setSecondaryBannerTypeAttr:function(_60){var _61=this.secondaryBannerType;this.secondaryBannerType=_60;if(_61!=_60){this._refresh();}},_setPrimaryTitleAttr:function(_62){var _63=this.primaryTitle;var _64=this.primaryTitleTextNode;this.primaryTitle=_62;if((_62&&!_63)||(_63&&!_62)){this._refresh();}else{if(_64&&_62){_64.innerHTML=_62;}}},_setSecondaryTitleAttr:function(_65){var _66=this.secondaryTitle;var _67=this.secondaryTitleTextNode;this.secondaryTitle=_65;if((_65&&!_66)||(_66&&!_65)){this._refresh();}else{if(_67&&_65){_67.innerHTML=_65;}}},_setLayoutTypeAttr:function(_68){var _69=this.layoutType;this.layoutType=_68;if(this._mainContainerNode){if(this.layoutType&&(this.layoutType.toLowerCase()=="fixed")){_8.add(this._mainContainerNode,"idxHeaderWidthFixed");}else{_8.add(this._mainContainerNode,"idxHeaderWidthLiquid");}}},_setSecondarySubtitleAttr:function(_6a){var _6b=this.secondarySubtitle;var _6c=this.secondarySubtitleTextNode;this.secondarySubtitle=_6a;if((_6a&&!_6b)||(_6b&&!_6a)){this._refresh();}else{if(_6c&&_6a){_6c.innerHTML=_6a;}}},_setShowHelpDropDownArrowAttr:function(_6d){var _6e=this.showHelpDropDownArrow;this.showHelpDropDownArrow=_6d;if(this._helpNode){_8.toggle(this._helpNode,"idxHeaderDropDown",this.showHelpDropDownArrow);}},_setShowSettingsDropDownArrowAttr:function(_6f){var _70=this.showSettingsDropDownArrow;this.showSettingsDropDownArrow=_6f;if(this._settingsNode){_8.toggle(this._settingsNode,"idxHeaderDropDown",this.showSettingsDropDownArrow);}},_setShowUserDropDownArrowAttr:function(_71){var _72=this.showUserDropDownArrow;this.showUserDropDownArrow=_71;if(this.userNode){_8.toggle(this.userNode,"idxHeaderDropDown",this.showUserDropDownArrow);}},_setUserAttr:function(_73){var _74=this.user;this.user=_73;if(_74===_73){return;}else{if((_74&&!_73)||(_73&&!_74)){this._refresh();}else{if(_74&&_74.actions!==_73.actions){this._refresh();}else{this._refreshUser();}}}},_setShowNavigationDropDownArrowsAttr:function(_75){var _76=this.showNavigationDropDownArrows;this.showNavigationDropDownArrows=_75;if(_76!=_75){this._refresh();}},_setPrimarySearchAttr:function(_77){var _78=this.primarySearch;this.primarySearch=_77;if(_78!==_77){this._refresh();}},_setSecondarySearchAttr:function(_79){var _7a=this.secondarySearch;this.secondarySearch=_79;if(_7a!==_79){this._refresh();}},_setNavigationAttr:function(_7b){var _7c=this.navigation;this.navigation=_7b;if(!_13.widgetEquals(_7c,_7b)){this._refresh();}},_setSettingsAttr:function(_7d){var _7e=this.settings;this.settings=_7d;if(!_13.widgetEquals(_7e,_7d)){this._refresh();}},_setHelpAttr:function(_7f){var _80=this.help;this.help=_7f;if(!_13.widgetEquals(_80,_7f)){this._refresh();}},deferRefresh:function(){this._refreshDeferred=true;},refresh:function(){if(this._refreshDeferred){this._refreshDeferred=false;}if(this._refreshRequired){this._refresh();}},_refresh:function(){this._refreshRequired=true;if(this._started&&(!this._refreshDeferred)){this._refreshing++;if(this._refreshing==1){this._doRefresh();}}else{}},_doRefresh:function(){this._reset();this._setup();},_setupChild:function(_81){if(!("region" in _81)){return;}var _82=_81.region;switch(_82){case "navigation":this.set("navigation",_81);break;case "settings":this.set("settings",_81);break;case "help":this.set("help",_81);break;default:undefined;break;}},addChild:function(_83){this.inherited(arguments);this._setupChild(_83);},removeChild:function(_84){if(_84===this.help){this.set("help",null);}if(_84===this.navigation){this.set("navigation",null);}if(_84===this.settings){this.set("settings",null);}this.inherited(arguments);},startup:function(){this.inherited(arguments);this.deferRefresh();var _85=this.getChildren();for(var _86=0;_86<_85.length;_86++){var _87=_85[_86];this._setupChild(_87);}this.refresh();},_renderPrimaryTitle:function(_88){this._injectTemplate(_88,"<li>"+"<span>"+"<div class=\"idxHeaderPrimaryTitle\" data-dojo-attach-point=\"primaryTitleTextNode\">"+"${primaryTitle}"+"</div>"+"</span>"+"</li>");},_renderLogo:function(_89){this._injectTemplate(_89,"<li class=\"idxHeaderPrimaryAction idxHeaderEnd\">"+"<span>"+"<div class=\"idxHeaderLogoBox\">"+"<div class=\"idxHeaderLogo\" alt=\"${_nls.ibmlogo}\">"+"<span class=\"idxTextAlternative\">${_nls.ibmlogo}</span>"+"</div>"+"</div>"+"</span>"+"</li>");},_renderHelp:function(_8a,_8b){this._injectTemplate(_8a,"<li class=\"idxHeaderPrimaryAction idxHeaderHelp\">"+"<a tabindex=\"0\" href=\"javascript://\" data-dojo-attach-point=\"_helpNode\" title=\"${_nls.actionHelp}\" role=\"presentation\">"+"<span class=\"idxHeaderHelpIcon\">"+"<span class=\"idxTextAlternative\">${_nls.actionHelp}</span>"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"<span class=\"idxTextAlternative\">(v)</span>"+"</span>"+"</a>"+"</li>");if(_8b){this._injectTemplate(_8a,"<li class=\"idxHeaderPrimaryAction idxHeaderSeparator\" role=\"separator\"><span></span></li>");}if(this.help){this.help=_10.byId(this.help);this._clearHandles("_helpHandles");this._helpHandles=this._prepareMenu(this.help,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this._helpNode,this._helpNode,true);_8.toggle(this._helpNode,"idxHeaderDropDown",this.showHelpDropDownArrow);this._helpNode.setAttribute("role","menuitem");this._helpNode.setAttribute("aria-haspopup",true);}},_renderSettings:function(_8c,_8d){this._injectTemplate(_8c,"<li class=\"idxHeaderPrimaryAction idxHeaderTools\">"+"<a tabindex=\"0\" href=\"javascript://\" data-dojo-attach-point=\"_settingsNode\" title=\"${_nls.actionShare}\" role=\"presentation\">"+"<span class=\"idxHeaderShareIcon\">"+"<span class=\"idxTextAlternative\">${_nls.actionShare}</span>"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"<span class=\"idxTextAlternative\">(v)</span>"+"</span>"+"</a>"+"</li>");if(_8d){this._injectTemplate(_8c,"<li class=\"idxHeaderPrimaryAction idxHeaderSeparator\" role=\"separator\"><span></span></li>");}if(this.settings){this.settings=_10.byId(this.settings);this._clearHandles("_settingsHandles");this._settingsHandles=this._prepareMenu(this.settings,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this._settingsNode,this._settingsNode,true);_8.toggle(this._settingsNode,"idxHeaderDropDown",this.showSettingsDropDownArrow);this._settingsNode.setAttribute("role","menuitem");this._settingsNode.setAttribute("aria-haspopup",true);}},_renderUser:function(_8e){this._injectTemplate(_8e,"<li class=\"idxHeaderPrimaryAction\">"+"<a tabindex=\"0\" href=\"javascript://\" data-dojo-attach-point=\"userNode\" class=\"idxHeaderUserNameNoText\" role=\"presentation\">"+"<span class=\"idxHeaderUserIcon\">"+"<img data-dojo-attach-point=\"userImageNode\" class=\"idxHeaderUserIcon\" alt=\"\" />"+"</span>"+"<span class=\"idxHeaderUserText\" data-dojo-attach-point=\"userTextNode\">"+"</span>"+"<span class=\"idxHeaderDropDownArrow\">"+"<span class=\"idxTextAlternative\">(v)</span>"+"</span>"+"</a>"+"</li>");this._refreshUser();if(this.user&&this.user.actions){this.user.actions=_10.byId(this.user.actions);this._clearHandles("_actionsHandles");this._actionsHandles=this._prepareMenu(this.user.actions,["oneuiHeaderGlobalActionsMenu","oneuiHeaderGlobalActionsSubmenu"],this.userNode,this.userNode,true);_8.toggle(this.userNode,"idxHeaderDropDown",this.showUserDropDownArrow);this.userNode.setAttribute("role","menuitem");this.userNode.setAttribute("aria-haspopup",true);}},_renderNavigation:function(_8f){this.navigation=((typeof this.navigation=="object")&&("nodeType" in this.navigation))?_10.byNode(this.navigation):_10.byId(this.navigation);if(!this.navigation){require.log("WARNING: navigation widget not found");}else{this.navigation.placeAt(_8f);this.navigation.startup();var _90=this.navigation.getChildren();if((_90.length==1)&&(_90[0].label=="")){_8.toggle(_90[0].containerNode,"idxHeaderNavigationHome",true);}else{if(this.showNavigationDropDownArrows){for(var i=0;i<_90.length;i++){if(_90[i].popup){var _91=_6(".idxHeaderDropDownArrow",_90[i].focusNode);_8.toggle(_90[i].domNode,"idxHeaderDropDown",true);if(_91.length>0){continue;}this._injectTemplate(_90[i].focusNode,"<span class=\"idxHeaderDropDownArrow\"><span class=\"idxTextAlternative\">(v)</span></span>");}}}}var _92=this.navigation.domNode.firstChild,del;while(_92){del=_92;_92=_92.nextSibling;if((del.nodeType==3)&&(!del.nodeValue.match(/\S/))){this.navigation.domNode.removeChild(del);}}this._clearHandles("_navHandles");this._navHandles=this._prepareMenu(this.navigation,[null,"oneuiHeaderNavigationMenu","oneuiHeaderNavigationSubmenu"]);}},_renderPrimarySearch:function(_93){this._injectTemplate(_93,"<li role=\"search\" class=\"idxHeaderSearchContainer\">"+"<input type=\"text\" data-dojo-attach-point=\"primarySearchTextNode\" />"+"<input type=\"image\" data-dojo-attach-point=\"primarySearchButtonNode\" />"+"</li>");this.primarySearch.onChange=_3.isFunction(this.primarySearch.onChange)?this.primarySearch.onChange:new Function("value",this.primarySearch.onChange);this.primarySearch.onSubmit=_3.isFunction(this.primarySearch.onSubmit)?this.primarySearch.onSubmit:new Function("value",this.primarySearch.onSubmit);var me=this,_94=("entryPrompt" in this.primarySearch)?this.primarySearch.entryPrompt:this._nls.searchEntry,_95=("submitPrompt" in this.primarySearch)?this.primarySearch.submitPrompt:this._nls.searchSubmit;var _96=new _19({trim:true,placeHolder:_94,intermediateChanges:true,title:_94},this.primarySearchTextNode);_96.own(_5.after(_96,"onChange",function(){me._onPrimarySearchChange(_96.attr("value"));}));_96.own(_5.after(_96,"onKeyUp",function(_97){if(_97.keyCode==_c.ENTER){me._onPrimarySearchSubmit(_96.attr("value"));}}));var _98=new _18({label:_95,showLabel:false,iconClass:"idxHeaderSearchButton"},this.primarySearchButtonNode);_98.own(_5.after(_98,"onClick",function(){me._onPrimarySearchSubmit(_96.attr("value"));}));},_renderSecondaryTitle:function(_99){this._injectTemplate(_99,"<span class=\"idxHeaderSecondaryTitleContainer\">"+"<span class=\"idxHeaderSecondaryTitle\" data-dojo-attach-point=\"secondaryTitleTextNode\">"+"${secondaryTitle}"+"</span>"+"<span class=\"idxHeaderSecondarySubtitle\" data-dojo-attach-point=\"_secondaryTitleSeparatorNode\">"+"&nbsp;&ndash;&nbsp;"+"</span>"+"<span class=\"idxHeaderSecondarySubtitle\" data-dojo-attach-point=\"secondarySubtitleTextNode\">"+"${secondarySubtitle}"+"</span>"+"&nbsp;&nbsp;"+"<span class=\"idxHeaderSecondaryAdditionalContext\" data-dojo-attach-point=\"additionalContextTextNode\">"+"${additionalContext}"+"</span>"+"</span>");_a.set(this._secondaryTitleSeparatorNode,"display",(this.secondaryTitle&&this.secondarySubtitle)?"":"none");},_renderContextActions:function(_9a){this._injectTemplate(_9a,"<div class=\"idxHeaderSecondaryActions\" data-dojo-attach-point=\"_contextActionsNode\"></div>");this.contextActionNodes=[];for(var i=0;i<this.contextActions.length;i++){this._injectTemplate(this._contextActionsNode,"<button type=\"button\" data-dojo-attach-point=\"_nextActionNode\"></button>");new _18(this.contextActions[i],this._nextActionNode);this.contextActionNodes.push(this._nextActionNode);delete this._nextActionNode;}},_renderSecondarySearch:function(_9b){this._injectTemplate(_9b,"<div role=\"search\" class=\"idxHeaderSearchContainer\">"+"<input type=\"text\" data-dojo-attach-point=\"secondarySearchTextNode\" />"+"<input type=\"image\" data-dojo-attach-point=\"secondarySearchButtonNode\" />"+"</div>");this.secondarySearch.onChange=_3.isFunction(this.secondarySearch.onChange)?this.secondarySearch.onChange:new Function("value",this.secondarySearch.onChange);this.secondarySearch.onSubmit=_3.isFunction(this.secondarySearch.onSubmit)?this.secondarySearch.onSubmit:new Function("value",this.secondarySearch.onSubmit);var me=this,_9c=("entryPrompt" in this.secondarySearch)?this.secondarySearch.entryPrompt:this._nls.searchEntry,_9d=("submitPrompt" in this.secondarySearch)?this.secondarySearch.submitPrompt:this._nls.searchSubmit;var _9e=new _19({trim:true,placeHolder:_9c,intermediateChanges:true,title:_9c},this.secondarySearchTextNode);_9e.own(_5.after(_9e,"onChange",function(){me._onSecondarySearchChange(_9e.attr("value"));}));_9e.own(_5.after(_9e,"onKeyUp",function(_9f){if(_9f.keyCode==_c.ENTER){me._onSecondarySearchSubmit(_9e.attr("value"));}}));var _a0=new _18({label:_9d,showLabel:false,iconClass:"idxHeaderSearchButton"},this.secondarySearchButtonNode);_a0.own(_5.after(_a0,"onClick",function(){me._onSecondarySearchSubmit(_9e.attr("value"));}));},_renderSecondaryInnerBorder:function(_a1){this._injectTemplate(_a1,"<div class=\"idxHeaderSecondaryInnerBorder\">"+"</div>");},_renderContent:function(_a2,_a3){this._injectTemplate(_a2,"<div class=\"oneuiContentContainer\">"+(_a3?"<div class=\"oneuiContentContainerInner\">":"")+"<div data-dojo-attach-point=\"contentControllerNode\"></div>"+(_a3?"</div>":"")+"</div>");var _a4=new _1a({containerId:(typeof this.contentContainer==="string")?this.contentContainer:this.contentContainer.id,"class":"dijitTabContainerTop-tabs",useMenu:this._tabMenu,useSlider:this._tabSlider,buttonWidget:_3.extend(idx.layout._PopupTabButton,{tabDropDownText:"",tabSeparatorText:"|"})},this.contentControllerNode),me=this;this._clearHandles("_controllerHandles");this._controllerHandles=this._prepareMenu(_a4._menuBtn,["oneuiHeader2ndLevMenu","oneuiHeader2ndLevSubmenu"]);this._controllerHandles.push(_5.after(_a4,"_bindPopup",function(_a5,_a6,_a7,_a8){me._prepareMenu(_a8,["oneuiHeader2ndLevMenu","oneuiHeader2ndLevSubmenu"],_a7,_a6,this._controllerHandles);},true));_a4.startup();this._controller=_a4;var _a9=_10.byId(this.contentContainer);if(_a9&&_a9._started){_a4.onStartup({children:_a9.getChildren(),selected:_a9.selectedChildWidget});}},_onPrimarySearchChange:function(_aa){this.primarySearch.onChange(_aa);},_onPrimarySearchSubmit:function(_ab){this.primarySearch.onSubmit(_ab);},_onSecondarySearchChange:function(_ac){this.secondarySearch.onChange(_ac);},_onSecondarySearchSubmit:function(_ad){this.secondarySearch.onSubmit(_ad);}});});