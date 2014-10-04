//>>built
require({cache:{"url:idx/widget/templates/EditController.html":"<div class=\"${baseClass}\"\n><div data-dojo-type=\"idx/form/Link\" class=\"${baseClass}EditLink\"\n      data-dojo-attach-point=\"_editLink\">${editLabel}</div\n><div data-dojo-type=\"idx/layout/ButtonBar\" data-dojo-attach-point=\"_buttonBar\"\n      class=\"${baseClass}ButtonBar\"\n><div data-dojo-type=\"dijit/form/Button\" data-dojo-attach-point=\"_saveButton\">${saveLabel}</div\n><div data-dojo-type=\"dijit/form/Button\" data-dojo-props=\"placement: 'secondary'\" data-dojo-attach-point=\"_cancelButton\">${cancelLabel}</div\n></div>\n</div>\n"}});define("idx/widget/EditController",["dojo/_base/declare","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/_base/lang","dojo/aspect","dojo/dom-attr","dojo/dom-class","dijit/registry","dijit/form/Button","../resources","../string","../util","../form/Link","../layout/ButtonBar","dojo/text!./templates/EditController.html","dojo/i18n!../nls/base","dojo/i18n!./nls/base","dojo/i18n!./nls/EditController"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){return _1("idx.widget.EditController",[_2,_3,_4],{readControlledNodeIDs:"",editControlledNodeIDs:"",readOnly:false,disabled:false,editLabel:"",saveLabel:"",cancelLabel:"",baseClass:"idxEditController",templateString:_10,constructor:function(_11,_12){this._started=false;this._editMode=false;this._linkedEditors={};},destroy:function(){if(this._linkedEditors){for(var _13 in this._linkedEditors){var _14=this._linkedEditors[_13];if(_14.changeHandle){_14.changeHandle.remove();delete _14.changeHandle;}}}this.inherited(arguments);},buildRendering:function(){var _15=_b.getResources("idx/widget/EditController",this.lang);if(_c.nullTrim(this.editLabel)==null){this.editLabel=_15.editLabel;}if(_c.nullTrim(this.saveLabel)==null){this.saveLabel=_15.saveLabel;}if(_c.nullTrim(this.cancelLabel)==null){this.cancelLabel=_15.cancelLabel;}this.inherited(arguments);this._built=true;this._updateReadControlNodeIDs();this._updateEditControlNodeIDs();},postCreate:function(){this.inherited(arguments);this.own(_6.after(this._saveButton,"onClick",_5.hitch(this,this._onSaveClick),true));this.own(_6.after(this._cancelButton,"onClick",_5.hitch(this,this._onCancelClick),true));this.own(_6.after(this._editLink,"onClick",_5.hitch(this,this._onEditClick),true));},_setReadControlledNodeIDsAttr:function(ids){this.readControlledNodeIDs=ids;this._updateReadControlNodeIDs();},_updateReadControlNodeIDs:function(){if(!this._built){return;}var ids={};if(_c.nullTrim(this.readControlledNodeIDs)){var _16=this.readControlledNodeIDs.split(",");for(var _17=0;_17<_16.length;_17++){var id=_c.nullTrim(_16[_17]);if(id){ids[id]=true;}}}for(var _18 in this._linkedEditors){var _19=this._linkedEditors[_18];var _1a=_19.readNodeIDs;if(_c.nullTrim(_1a)){var _16=_1a.split(",");for(var _17=0;_17<_16.length;_17++){var id=_c.nullTrim(_16[_17]);if(id){ids[id]=true;}}}}var _1b="";var _1c="";for(var _1d in ids){_1b=_1b+_1c+_1d;_1c=" ";}if(!_c.nullTrim(_1b)){_7.remove(this._editLink.domNode,"aria-controls");}else{_7.set(this._editLink.domNode,"aria-controls",_1b);}},_setEditControlledNodeIDsAttr:function(ids){this.editControlledNodeIDs=ids;this._updateEditControlNodeIDs();},_updateEditControlNodeIDs:function(){if(!this._built){return;}var ids={};if(_c.nullTrim(this.editControlledNodeIDs)){var _1e=this.editControlledNodeIDs.split(",");for(var _1f=0;_1f<_1e.length;_1f++){var id=_c.nullTrim(_1e[_1f]);if(id){ids[id]=true;}}}for(var _20 in this._linkedEditors){var _21=this._linkedEditors[_20];var _22=_21.editNodeIDs;if(_c.nullTrim(_22)){var _1e=_22.split(",");for(var _1f=0;_1f<_1e.length;_1f++){var id=_c.nullTrim(_1e[_1f]);if(id){ids[id]=true;}}}}var _23="";var _24="";for(var _25 in ids){_23=_23+_24+_25;_24=" ";}if(!_c.nullTrim(_23)){_7.remove(this._saveButton.focusNode,"aria-controls");_7.remove(this._cancelButton.focusNode,"aria-controls");}else{_7.set(this._saveButton.focusNode,"aria-controls",_23);_7.set(this._cancelButton.focusNode,"aria-controls",_23);}},_setEditLabelAttr:function(_26){this._editLink.set("label",_26);},_setSaveLabelAttr:function(_27){this._saveButton.set("label",_27);},_setCancelLabelAttr:function(_28){this._cancelButton.set("label",_28);},startup:function(){if(this._started){return;}this.inherited(arguments);this._editLink.startup();this._saveButton.startup();this._cancelButton.startup();this._buttonBar.startup();},_onSaveClick:function(){if(!this._editMode){return;}for(var _29 in this._linkedEditors){var _2a=this._linkedEditors[_29];if(_2a.onPreSave){_2a.onPreSave();}}this.onPreSave();this._editMode=false;_8.remove(this.domNode,this.baseClass+"EditMode");this.onResize();this._editLink.focus();for(var _29 in this._linkedEditors){var _2a=this._linkedEditors[_29];if(_2a.onSave){_2a.onSave();}}this.onSave();for(var _29 in this._linkedEditors){var _2a=this._linkedEditors[_29];if(_2a.onPostSave){_2a.onPostSave();}}this.onPostSave();},_onCancelClick:function(){if(!this._editMode){return;}this._editMode=false;_8.remove(this.domNode,this.baseClass+"EditMode");this.onResize();this._editLink.focus();for(var _2b in this._linkedEditors){var _2c=this._linkedEditors[_2b];if(_2c.onCancel){_2c.onCancel();}}this._valid=true;this._updateButtons();this.onCancel();},_onEditClick:function(){if(this._editMode){return;}this._editMode=true;_8.add(this.domNode,this.baseClass+"EditMode");this.onResize();this._cancelButton.focus();for(var _2d in this._linkedEditors){var _2e=this._linkedEditors[_2d];if(_2e.onEdit){_2e.onEdit();}}this.onEdit();},onEdit:function(){},onSave:function(){},onPreSave:function(){},onPostSave:function(){},onCancel:function(){},_setDisabledAttr:function(_2f){this.disabled=_2f;var _30=this.disabled||this.readOnly;_8.toggle(this.domNode,this.baseClass+"Disabled",_2f);this._editLink.set("disabled",_2f);this._saveButton.set("disabled",_30);this._cancelButton.set("disabled",_2f);},_setReadOnlyAttr:function(_31){this.readOnly=_31;this._updateButtons();},_updateButtons:function(){_8.toggle(this.domNode,this.baseClass+"ReadOnly",this.readOnly);this._editLink.set("readOnly",this.readOnly);this._saveButton.set("readOnly",this.readOnly);this._cancelButton.set("readOnly",this.readOnly);this._saveButton.set("disabled",(this.readOnly||this.disabled||!this._valid));},onResize:function(){},_editorChanged:function(){var _32=true;for(var _33 in this._linkedEditors){var _34=this._linkedEditors[_33];if(!_34){continue;}if(_34.validCheck&&(!_34.validCheck())){_32=false;}}this._valid=_32;this._updateButtons();},_checkEditorValid:function(_35,_36){if((_36=="invalid")||(_36=="isInvalid")||(_36=="errant")){return (!_35.get(_36));}else{return (_35.get(_36));}},_interpretNotifier:function(_37,_38,_39){var _3a=((_38&&_38[_39])?_38[_39]:null);if(_3a&&(_d.typeOfObject(_3a)=="string")&&(_3a in _37)&&(_d.typeOfObject(_37[_3a]=="function"))){_3a=_5.hitch(_37,_3a);}if(_3a&&(_d.typeOfObject(_3a)=="object")&&("attribute" in _3a)&&("value" in _3a)&&(_37[_3a.attribute])){_3a=_5.hitch(editor,"set",_3a.attribute,_3a.value);}if(_3a&&(_d.typeOfObject(_3a)!="function")){throw "The specified "+_39+" handler is not a function of the specified widget, "+"nor is it an object describing an attribute and value for the specified widget.  "+"notifier=[ "+_3a+" ], notifier.attribute=[ "+_3a.attribute+" ], notifier.value=[ "+_3a.value+" ]";}return _3a;},linkEditor:function(_3b,_3c){_3b=_9.byId(_3b);var _3d=_3b.get("id");if(this._linkedEditors[_3d]){this.unlinkEditor(_3b);}var _3e=((_3c&&_3c.changeEvent)?_3c.changeEvent:null);if((!_3e)&&("onEditorChange" in _3b)&&(_d.typeOfObject(_3b.onChange)=="function")){_3e="onEditorChange";}if((!_3e)&&("onChange" in _3b)&&(_d.typeOfObject(_3b.onChange)=="function")){_3e="onChange";}if((_3e)&&((!((""+_3e) in _3b))||(_d.typeOfObject(_3b[""+_3e])!="function"))){throw "The specified change event is not recognized as a function of the specified editor "+"widget.  changeEvent=[ "+_3e+" ]";}var _3f=((_3c&&_3c.validCheck)?_3c.validCheck:null);if((!_3f)&&("isEditorValid" in _3b)&&(_d.typeOfObject(_3b.isEditorValid)=="function")){_3f=_5.hitch(_3b,"isEditorValid");}if((!_3f)&&("isValid" in _3b)&&(_d.typeOfObject(_3b.isValid)=="function")){_3f=_5.hitch(_3b,"isValid");}if(_3f&&(_d.typeOfObject(_3f)=="string")&&(_3f in _3b)){var _40=_3f;_3f=_5.hitch(this,"_checkEditorValid",editor,_40);}if(_3f&&(_d.typeOfObject(_3f)!="function")){throw "The specified validity check is not a function or attribute of the speciifed widget, "+"nor is it a function that can be called.  validCheck=[ "+_3f+" ]";}var _41=this._interpretNotifier(_3b,_3c,"onSave");var _42=this._interpretNotifier(_3b,_3c,"onPreSave");var _43=this._interpretNotifier(_3b,_3c,"onPostSave");var _44=this._interpretNotifier(_3b,_3c,"onEdit");var _45=this._interpretNotifier(_3b,_3c,"onCancel");var _46=null;if(_3e){_46=_6.after(_3b,""+_3e,_5.hitch(this,"_editorChanged"),true);}var _47={editor:_3b,changeHandle:_46,validCheck:_3f,onEdit:_44,onPreSave:_42,onSave:_41,onPostSave:_43,onCancel:_45,readNodeIDs:(_3c.readNodeIDs?_3c.readNodeIDs:null),editNodeIDs:(_3c.editNodeIDs?_3c.editNodeIDs:null)};this._linkedEditors[_3d]=_47;if(_47.readNodeIDs){this._updateReadControlNodeIDs();}if(_47.editNodeIDs){this._updateEditControlNodeIDs();}},unlinkEditor:function(_48){_48=_9.byId(_48);var _49=_48.get("id");if(!(_49 in this._linkedEditors)){return;}var _4a=this._linkedEditors[_49];var _4b=false;var _4c=false;if(_4a){if(_4a.changeHandle){_4a.changeHandle.remove();delete _4a.changeHandle;}_4a.changeHandle=null;if(_4a.readNodeIDs){_4b=true;}if(_4a.editNodeIDs){_4c=true;}for(var _4d in _4a){if(_4a[_4d]){delete _4a[_4d];}_4a[_4d]=null;}}delete this._linkedEditors[_49];if(_4b){this._updateReadControlNodeIDs();}if(_4c){this._updateEditControlNodeIDs();}}});});