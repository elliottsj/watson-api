//>>built
require({cache:{
'url:gridx/templates/FilterDialog.html':"<label>Match </label>\n<select dojoType=\"dijit.form.Select\">\n\t<option value=\"all\">All rules</option>\n\t<option value=\"any\">Any rules</option>\n</select>\n\n<div class=\"dojoxGridxFilterAccordionWrapper\">\n\t<div dojoType=\"dijit.layout.AccordionContainer\"></div>\n</div>\n\n<div class=\"dojoxGridxFilterDialogButtons\">\n\t<input type=\"button\" class=\"dojoxGridxFilterDialogBtnAdd\" dojoType=\"dijit.form.Button\" showLabel=\"false\" iconClass=\"dojoxGridxFilterBtnAddRule\"/>\n\t<input type=\"button\" dojoType=\"dijit.form.Button\" label=\"Filter\"/>\n\t<input type=\"button\" dojoType=\"dijit.form.Button\" label=\"Clear\"/>\n\t<input type=\"button\" dojoType=\"dijit.form.Button\" label=\"Cancel\"/>\n</div>"}});
define("gridx/modules/filter/FilterDialog", [
	"dojo/_base/kernel",
	"dijit",
	"dojo/text!../../templates/FilterDialog.html",
	"dijit/Dialog",
	"dijit/layout/AccordionContainer",
	"dojo/data/ItemFileReadStore",
	"./FilterPane",
	"./Filter",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/html",
	"dojo/query"
], function(dojo, dijit, template){

	return dojo.declare('gridx.modules.filter.FilterDialog', dijit.Dialog, {
		title: 'Filter',
		cssClass: 'dojoxGridxFilterDialog',
		grid: null,
		autofocus: false,
		postCreate: function(){
			this.inherited(arguments);
			this.set('content', template);
			this._initWidgets();
			dojo.addClass(this.domNode, 'dojoxGridxFilterDialog');
		},
		
		done: function(){
			//summary:
			//	Apply the filter.
			this.hide();
			this.grid.filterBar.applyFilter(this.getData());
		},
		
		getData: function(){
			//summary:
			//	Get filter data.
			return {
				type: this._sltMatch.get('value'),
				conditions: dojo.map(this._accordionContainer.getChildren(), function(p){
					return p.getData();
				})
			};
		},
		
		setData: function(data){
			//summary:
			//	Set filter data.
			this.removeChildren();
			if(!data || !data.conditions.length){
				return;
			}
			this._sltMatch.set('value', 'all' && data && data.type);
			dojo.forEach(data.conditions, function(d){
				this.addRule().setData(d);
			}, this);
		},
		
		removeChildren: function(){
			//summary:
			//	Remove all child of the accodion container.
			dojo.forEach(this._accordionContainer.getChildren(), dojo.hitch(this._accordionContainer, 'removeChild'));
		},
		
		clear: function(){
			this.grid.filterBar.confirmToExecute(function(){
				this.grid.filterBar.clearFilter(true);
				this.hide();
			}, this);
		},
		
		cancel: function(){
			this.hide();
		},
		
		show: function(){
			this.inherited(arguments);
			if(!this._accordionContainer.hasChildren()){
				this.addRule();
			}
		},
		
		addRule: function(){
			var ac = this._accordionContainer;
			if(ac.getChildren().length === 3){
				ac._contentBox.w -= dojox.html.metrics.getScrollbar().w;
			}
			var fp = new gridx.modules.filter.FilterPane({grid: this.grid, title: 'Rule'});
			ac.addChild(fp);
			ac.selectChild(fp);
			
			if(!this._titlePaneHeight){
				this._titlePaneHeight = dojo.position(fp._buttonWidget.domNode).h + 3;
			}
			fp._initCloseButton();
			fp._onColumnChange();
			try{
				fp.tbSingle.focus();//TODO: this doesn't work now.
			}catch(e){}
			dojo.toggleClass(ac.domNode, 'dojoxGridxFilterSingleRule', ac.getChildren().length === 1);
			
			this.connect(fp, 'onChange', '_updateButtons');
			this._updateButtons();
			this._updateAccordionContainerHeight();
			//scroll to bottom when add a rule
			ac.domNode.parentNode.scrollTop = 100000;
			return fp;
		},
		
		_initWidgets: function(){
			this._accordionContainer = dijit.byNode(dojo.query('.dijitAccordionContainer', this.domNode)[0]);
			this._sltMatch = dijit.byNode(dojo.query('.dijitSelect', this.domNode)[0]);
			var btns = dojo.query('.dijitButton', this.domNode);
			this._btnAdd = dijit.byNode(btns[0]);
			this._btnFilter = dijit.byNode(btns[1]);
			this._btnClear = dijit.byNode(btns[2]);
			this._btnCancel = dijit.byNode(btns[3]);
			this.connect(this._btnAdd, 'onClick', 'addRule');
			this.connect(this._btnFilter, 'onClick', 'done');
			this.connect(this._btnClear, 'onClick', 'clear');
			this.connect(this._btnCancel, 'onClick', 'cancel');
			this.connect(this._accordionContainer, 'removeChild', '_updateButtons');
			this.connect(this._accordionContainer, 'removeChild', '_updatePaneTitle');
		},
		
		_updatePaneTitle: function(){
			// summary:
			//		Update each pane title. Only called after remove a RULE pane.
			dojo.forEach(this._accordionContainer.getChildren(), function(pane){
				pane._updateTitle();
			});
		},
		
		_updateButtons: function(){
			var children = this._accordionContainer.getChildren();
			//toggle filter button disable
			if(dojo.some(children, function(c){return c.getData() === null;})){
				this._btnFilter.set('disabled', true);
			}else{
				this._btnFilter.set('disabled', false);
			}
			//toggle add rule button disable
			var c = this.grid.filterBar.maxRuleCount;
			this._btnAdd.set('disabled', children.length >= c && c > 0);
			this._btnClear.set('disabled', !this.grid.filterBar.filterData);
		},
		
		_updateAccordionContainerHeight: function(){
			//summary:
			//	Update the height of the accordion container to ensure consistent height of each accordion pane.
			var ac = this._accordionContainer, len = ac.getChildren().length;
			dojo.style(ac.domNode, 'height', 145 + len * this._titlePaneHeight + 'px');
			ac.resize();
		}
	});
});