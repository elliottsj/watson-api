//>>built
define("idx/bench/benchUtil",["dojo/_base/lang","dojo/dom-class","dojo/dom-style","dojo/string","idx/widget/Dialog","dijit/Dialog","dojo/data/ItemFileReadStore","idx/widget/SingleMessage","dojox/charting/Chart","dojox/charting/axis2d/Default","dojox/charting/widget/SelectableLegend","dojox/charting/plot2d/ClusteredBars","dojox/charting/themes/MiamiNice","dojox/charting/action2d/Tooltip"],function(_1,_2,_3,_4,_5,_6){_1.extend(_5,{startup:function(){}});var _7=null;var _8=null;var _9=null;var _a=null;var _b=null;var _c={clazz:"",description:"",declaration:null};var _d={isRunning:false,startTimer:null,masterResults:{clientNavigator:navigator.userAgent,dataSet:[],errors:[]},init:function(){this.masterResults.dojoVersion=dojo.version.toString();_7=oneuiWidgetStore;var _e=this;dijit.byId("widgetList")["onChange"]=function(_f){_e.clearWidget("widgetSamples");_7.fetchItemByIdentity({identity:_f,onItem:function(_10){dijit.byId("singleRunner").set("disabled",false);dijit.byId("compareRunner").set("disabled",false);dojo.style(dojo.byId("sampleContainer"),"display","inline-block");_8=_7.getValues(_10,"templates");var _11=_10.clazz;dojo.forEach(_8,function(_12,idx){if(idx==0){_c.declaration=_8[0].declaration;_c.clazz=_11;_c.description=_8[0].description;}_11=dojo.map(_11,function(_13){return _13.replace(/\./g,"/");});require(_11,function(){var div=dojo.create("div",{className:"widgetSample"+((idx==0)?" widgetSampleSelected":"")},"widgetSamples");dojo.create("h4",{innerHTML:_12.description},div);var _14=dojo.create("div",{},div);_14.innerHTML=_12.declaration;dojo.parser.parse(_14);dojo.connect(div,"onclick",_e.selectWidgetSample);});});}});};dijit.byId("masterCheckBox")["onChange"]=function(){if(dijit.byId("masterCheckBox").checked){_e.selectAllReports();}else{_e.deselectAllReports();}};},createWidget:function(_15,_16,_17,_18){var _19=dojo.create("div",{});_19.innerHTML=_4.rep(_16,_17);this.startTimer=new Date().getTime();dojo.parser.parse(_19);dojo.place(_19,_18);},selectWidgetSample:function(){dojo.query(".widgetSample").forEach(function(_1a,idx){dojo.toggleClass(_1a,"widgetSampleSelected",this==_1a);if(this==_1a){_c.declaration=_8[idx].declaration;_c.description=_8[idx].description;}},this);},clearWidget:function(_1b){var _1c=dojo.byId(_1b);dojo.forEach(dijit.findWidgets(_1c),function(_1d){_1d.destroyRecursive();});_1c.innerHTML=null;},generateCharting:function(){var _1e=[],_1f=[],_20=[];this.masterResults.dataSet=[];dojo.query(".dijitCheckBox","results").forEach(function(_21,idx){var _22=dijit.byNode(_21);if(_22.checked){var _23=_22.perfData;this.masterResults.dataSet.push(_23);var _24=this._getWidgetName(_23.clazz);if(_20.indexOf(_24)==-1){_20.push(_24);}if(this._isBaseWidget(_23.description)){_1f.push({y:_23.average,tooltip:_23.description+": "+_23.average+"ms"});}else{_1e.push({y:_23.average,tooltip:_23.description+": "+_23.average+"ms"});}}},this);_20=dojo.map(_20,function(_25,idx){return {value:++idx,text:_25};});if(_9){_9.destroy();}if(_a){_a.destroy();}if(_b){_b.destroy();}dijit.byId("resultTabs").selectChild(dijit.byId("benchPane"));_9=new dojox.charting.Chart("benchChart");_9.setTheme(dojox.charting.themes.MiamiNice).addPlot("default",{type:"ClusteredBars",gap:2}).addSeries("One UI Widget",_1e).addSeries("Dijit Widget",_1f).addAxis("y",{vertical:true,includeZero:true,natural:true,miniorLabel:true,majorLabel:true,labels:_20}).addAxis("x",{includeZero:true});_a=new dojox.charting.action2d.Tooltip(_9,"default");_9.render();_b=new dojox.charting.widget.SelectableLegend({chart:_9},"legend");},_isBaseWidget:function(_26){return _26.indexOf("base widget")>-1;},_getWidgetName:function(_27){return _27.join(" / ");},deselectAllReports:function(){dojo.query(".dijitCheckBox","results").forEach(function(_28){dijit.byNode(_28).set("checked",false);});},clearAllReports:function(){dojo.query(".dijitCheckBox","results").forEach(function(_29){dijit.byNode(_29).destroy();});dojo.query(".idxSingleMessage","results").forEach(function(_2a){dijit.byNode(_2a).destroy();});this.clearWidget("widgetsContainer");},selectAllReports:function(){dojo.query(".dijitCheckBox","results").forEach(function(_2b){dijit.byNode(_2b).set("checked",true);});},resetRunnerLabel:function(){this.currentRunnerButton.set("label",this.runnerLabel).set("disabled",false);},_getSingleTestTask:function(){return [{clazz:_c.clazz,declaration:_c.declaration,description:_c.description,count:dijit.byId("count").get("value"),method:"parse",container:"widgetsContainer"},{type:"resetRunnerLabel"}];},_getPairTestsTask:function(){this.deselectAllReports();return [{clazz:_c.clazz,declaration:_8[0].declaration,description:_8[0].description,count:dijit.byId("count").get("value"),method:"parse",container:"widgetsContainer"},{clazz:_c.clazz,declaration:_8[1].declaration,description:_8[1].description,count:dijit.byId("count").get("value"),method:"parse",container:"widgetsContainer"},{type:"generatingChart"},{type:"resetRunnerLabel"}];},_getAllTestsTask:function(){this.deselectAllReports();var d=new dojo.Deferred();var _2c=[],_2d=this;_7.fetch({onComplete:function(_2e){dojo.forEach(_2e,function(_2f){if(_2f.templates&&_2f.templates[1]){if(_2d._isBaseWidget(_2f.templates[1].description)){var _30=_2f.templates;_2c.push({clazz:_2f.clazz,declaration:_30[0].declaration,description:_30[0].description,count:dijit.byId("count").get("value"),method:"parse",container:"widgetsContainer"});_2c.push({clazz:_2f.clazz,declaration:_30[1].declaration,description:_30[1].description,count:dijit.byId("count").get("value"),method:"parse",container:"widgetsContainer"});}}});_2c.push({type:"generatingChart"});_2c.push({type:"resetRunnerLabel"});d.callback(_2c);}});return d;},_timer:function(_31,_32,_33){setTimeout(function(){var _34=_31.shift();_32.call(_33,_34);if(_31.length>0){setTimeout(arguments.callee,100);}},100);},_runner:function(_35){if(_35.type&&_35.type=="generatingChart"){this.generateCharting();}else{if(_35.type&&_35.type=="resetRunnerLabel"){this.resetRunnerLabel();}else{this.clearWidget(_35.container);this.createWidget(_35.clazz,_35.declaration,_35.count,_35.container);var _36=this;setTimeout(function(){var _37=(new Date().getTime()-_36.startTimer)/_35.count,_38=dojo.mixin({average:_37},_35);_36._addReport(_38);},0);}}},_addReport:function(_39){var _3a="It took: "+_39.average+"ms to "+_39.method+" "+_39.description+" in average.";var _3b=new idx.widget.SingleMessage({title:_3a,type:"information",showAction:false,style:"width: 90%"});var _3c=new dijit.form.CheckBox({checked:true});_3c.perfData=_39;var _3d=dojo.create("div",{className:"resultItem"});dojo.place(_3c.domNode,_3d);dojo.place(_3b.domNode,_3d);_3b.onClose=function(){_3c.destroyRecursive();_3d.parentNode.removeChild(_3d);};dojo.style(dojo.byId("resultActions"),"display","block");dojo.style(dojo.byId("results"),"display","block");dojo.place(_3d,dojo.byId("results"),"first");},_runRealTest:function(_3e){this._timer(_3e,this._runner,this);},runSingleTest:function(){if(this.isRunning){return;}this.currentRunnerButton=dijit.byId("singleRunner");this.runnerLabel=this.currentRunnerButton.get("label");this.currentRunnerButton.set("label","Running...").set("disabled",true);var _3f=this._getSingleTestTask();setTimeout(dojo.hitch(this,function(){this._runRealTest(_3f);}),1000);},runPairTests:function(){if(this.isRunning){return;}this.currentRunnerButton=dijit.byId("compareRunner");this.runnerLabel=this.currentRunnerButton.get("label");dijit.byId("compareRunner").set("label","Running...").set("disabled",true);var _40=this._getPairTestsTask();setTimeout(dojo.hitch(this,function(){this._runRealTest(_40);}),1000);},runAllTests:function(){if(this.isRunning){return;}this.currentRunnerButton=dijit.byId("compareAllRunner");this.runnerLabel=this.currentRunnerButton.get("label");dijit.byId("compareAllRunner").set("label","Running...").set("disabled",true);var d=this._getAllTestsTask();var _41=[],_42=this;_7.fetch({onComplete:function(_43){dojo.forEach(_43,function(_44){var _45=dojo.map(_44.clazz,function(_46){return _46.replace(/\./g,"/");});_41=_41.concat(_45);});require(_41,function(){d.then(function(_47){_42._runRealTest(_47);});});}});},showSummary:function(){var _48=this._constructTable();var _49=dijit.byId("summaryDialog");if(_49){_49.set("content","<div style='height:530px;width:1050px;overflow-y:scroll;'>"+_48+"</div>");}else{_49=new _5({title:"Benchmark Summary",instruction:"Compare oneui widgets with dijit widget",content:"<div style='height:530px;width:880px;overflow-y:scroll;'>"+_48+"</div>",closeButtonLabel:"Close"},"summaryDialog");}_49.show();},_constructTable:function(){var _4a={},_4b=this;dojo.forEach(this.masterResults.dataSet,function(_4c){var _4d=_4c.clazz[0];if(!_4a[_4d]){var o={};if(_4b._isBaseWidget(_4c.description)){o.compareWith=_4c.description;o.baseCost=_4c.average;}else{o.description=_4c.description;o.extCost=_4c.average;}_4a[_4d]=o;}else{if(_4b._isBaseWidget(_4c.description)){_4a[_4d].compareWith=_4c.description;_4a[_4d].baseCost=_4c.average;}else{_4a[_4d].description=_4c.description;_4a[_4d].extCost=_4c.average;}}});var _4e="<table id='summaryTable'>"+"<thead><tr>"+"<th>Widget</th>"+"<th>Description</th>"+"<th>Compare with...</th>"+"<th>Dijit Widget (ms)</th>"+"<th>OneUI Widget (ms)</th>"+"<th>Time Cost (%)</th>";"</tr></thead>"+"<tbody>";for(var i in _4a){var _4f=((_4a[i].extCost-_4a[i].baseCost)/_4a[i].baseCost)*100;status=_4f>30?"bad":(_4f<5?"good":"");var _50="<tr>"+"<td>"+i+"</td>"+"<td>"+_4a[i].description+"</td>"+"<td>"+_4a[i].compareWith+"</td>"+"<td>"+_4a[i].baseCost+"ms</td>"+"<td>"+_4a[i].extCost+"ms</td>"+"<td class='"+status+"'>"+(_4f>0?"+":"")+_4f.toFixed(1)+"%</td>"+"</tr>";_4e+=_50;}_4e+="</tbody></table>";return _4e;}};return _d;});