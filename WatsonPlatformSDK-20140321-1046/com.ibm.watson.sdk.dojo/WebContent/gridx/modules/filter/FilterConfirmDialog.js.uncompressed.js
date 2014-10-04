//>>built
require({cache:{
'url:gridx/templates/FilterConfirmDialog.html':"\n<div class=\"dojoxGridxFilterConfirmDialogMessage\">This will remove the filter and show all available records.</div>\n<div class=\"dojoxGridxFilterConfirmDialogButtons\">\n\t<input type=\"button\" dojoType=\"dijit.form.Button\" label=\"Clear\"/>\n\t<input type=\"button\" dojoType=\"dijit.form.Button\" label=\"Cancel\"/>\n</div>"}});
define("gridx/modules/filter/FilterConfirmDialog", [
	"dojo/_base/kernel",
	"dijit",
	"dojo/text!../../templates/FilterConfirmDialog.html",
	"dijit/Dialog",
	"dijit/layout/AccordionContainer",
	"dojo/_base/declare",
	"dojo/data/ItemFileReadStore",
	"./FilterPane",
	"./Filter"
], function(dojo, dijit, template){

	return dojo.declare('gridx.modules.filter.FilterConfirmDialog', dijit.Dialog, {
		title: 'Clear Filter',
		cssClass: 'dojoxGridxFilterConfirmDialog',
		autofocus: false,
		postCreate: function(){
			this.inherited(arguments);
			this.set('content', template);
			var arr = dijit.findWidgets(this.domNode);
			this.btnClear = arr[0];
			this.btnCancel = arr[1];
			this.connect(this.btnCancel, 'onClick', 'hide');
			this.connect(this.btnClear, 'onClick', 'onExecute');
		},
		onExecute: function(){
			this.execute();
		},
		execute: function(){}
	});
});