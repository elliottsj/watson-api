//>>built
define("gridx/modules/CellDijit", [
	"dojo/_base/declare",	
	"dojo/_base/html",
	"dojo/_base/lang",
	"dojo/_base/query",
	"dojo/_base/event",
	"dojo/_base/sniff",
	"dojo/_base/array",
	"dojo/keys",
	"dijit",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"../core/_Module"
], function(declare, html, lang, query, event, sniff, array, keys, 
	dijit, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Module){

	/*=====
	var columnDefinitionCellDijitMixin = {
		// widgetsInCell: Boolean
		//		Indicating whether this column should use this CellDijit module.
		//		CellDijit module reuses widgets in cell, so if there is no widgets in cell, you don't need this module at all.
		widgetsInCell: false,

		// decorator: Function() return String
		//		This decorator function is slightly different from the one when this module is not used.
		//		This function should return a template string (see the doc for template string in dijit._TemplatedMixin
		//		and dijit._WidgetsInTemplateMixin). 
		//		In the template string, dijits or widgets can be used and they will be properly set value if they
		//		have the CSS class 'dojoxGridxHasGridCellValue' in their DOM node.
		//		Since setting value will be done automatically, and the created widgets will be reused between rows,
		//		so there's no arguments for this function.
		//		By default the dijits or widgets will be set value using the grid data (the result of the formatter function,
		//		if there is a formatter function for this column), not the store data (the raw data stored in store).
		//		If you'd like to use store data in some dijit, you can simly add a CSS class 'dojoxGridxUseStoreData' to it.
		decorator: null,
	
		// setCellValue: Function(gridData, storeData, cellWidget)
		//		If the settings in the decorator function can not meet your requirements, you use this function as a kind of complement.
		//		gridData: anything
		//				The data shown in grid cell. It's the result of formatter function if that function exists.
		//		storeData: anything
		//				The raw data in dojo store.
		//		cellWidget: CellWidget
		//				A widget representing the whole cell. This is the container of the templateString returned by decorator.
		//				So you can access any dojoAttachPoint from it (maybe your special dijit or node, and then set value for them).
		setCellValue: null,
	};
	=====*/
	
	var CellWidget = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
	
		content: '',
	
		setCellValue: null,
	
		postMixInProperties: function(){
			this.templateString = ['<div class="dojoxGridxCellWidget">', this.content, '</div>'].join('');
		},
	
		setValue: function(gridData, storeData){
			query('.dojoxGridxHasGridCellValue', this.domNode).map(function(node){
				return dijit.byNode(node);
			}).forEach(function(widget){
				if(widget){
					var useStoreData = html.hasClass(widget.domNode, 'dojoxGridxUseStoreData');
					widget.set('value', useStoreData ? storeData : gridData);
				}
			});
			if(this.setCellValue){
				this.setCellValue(gridData, storeData, this);
			}
		}
	});
	
	return _Module.registerModule(
	declare("gridx.modules.CellDijit", _Module, {
		name: 'cellDijit',
	
		required: ['focus'],

		forced: ['body'],
	
		getAPIPath: function(){
			return {
				cellDijit: this
			};
		},
	
		constructor: function(){
			this._decorators = {};
		},
	
		load: function(){
			var i, col, columns = this.grid._columns;
			var dummy = function(){
				return "";
			};
			for(i = columns.length - 1; i >= 0; --i){
				col = columns[i];
				if(col.decorator && col.widgetsInCell){
					col.userDecorator = col.decorator;
					col.decorator = dummy;
					col._cellWidgets = [];
				}
			}
			this.connect(this.grid.body, 'onAfterRow', '_showDijits');
			this.connect(this.grid.body, 'onAfterCell', '_showDijit');
			this.connect(this.grid.body, 'onRender', '_releaseWidgets');
			this._initFocus();
			this.loaded.callback();
		},
	
		destory: function(){
			this.inherited(arguments);
			var i, j, col, columns = this.grid._columns;
			for(i = columns.length - 1; i >= 0; --i){
				col = columns[i];
				if(col._cellWidgets){
					for(j = col._cellWidgets.length - 1; j >= 0; --j){
						col._cellWidgets[j].destroyRecursive();
					}
					delete col._cellWidgets;
				}
			}
		},
	
		//Public-----------------------------------------------------------------
		setCellDecorator: function(rowId, colId, decorator, setCellValue){
			var rowDecs = this._decorators[rowId];
			if(!rowDecs){
				rowDecs = this._decorators[rowId] = {};
			}
			var cellDec = rowDecs[colId];
			if(!cellDec){
				cellDec = rowDecs[colId] = {};
			}
			cellDec.decorator = decorator;
			cellDec.setCellValue = setCellValue;
			cellDec.widget = null;
		},
	
		restoreCellDecorator: function(rowId, colId){
			var rowDecs = this._decorators[rowId];
			if(rowDecs){
				var cellDec = rowDecs[colId];
				if(cellDec){
					if(cellDec.widget){
						//Because dijit.form.TextBox use setTimeout to fire onInput event, 
						//so we can not simply destroy the widget when ENTER key is pressed for an editing cell!!
						var parentNode = cellDec.widget.domNode.parentNode;
						if(parentNode){
							parentNode.innerHTML = null;
						}
						window.setTimeout(function(){
							cellDec.widget.destroyRecursive();
							cellDec.widget = null;
							cellDec.decorator = null;
							cellDec.setCellValue = null;
						}, 0);
					}
				}
				delete rowDecs[colId];
			}
		},
	
		getCellWidget: function(rowId, colId){
			var cellNode = this.grid.body.getCellNode({
				rowId: rowId, 
				colId: colId
			});
			if(cellNode){
				var widgetNode = query('.dojoxGridxCellWidget', cellNode)[0];
				if(widgetNode){
					return dijit.byNode(widgetNode);
				}
			}
			return null;
		},
	
		//Private---------------------------------------------------------------
		_showDijits: function(rowNode, rowInfo, rowCache){
			var _this = this;
			var func = function(){
				var i, col, cellNode, cellWidget, columns = _this.grid._columns;
				for(i = columns.length - 1; i >= 0; --i){
					col = columns[i];
					if(col.userDecorator || _this._getSpecialCellDec(rowInfo.rowId, col.id)){
						cellNode = query('[colid="' + col.id + '"]', rowNode)[0];
						if(cellNode){
							cellWidget = _this._getCellWidget(col, rowInfo, rowCache);
							cellNode.innerHTML = "";
							cellWidget.placeAt(cellNode);
							cellWidget.startup();
						}
					}
				}
			};
			if(sniff('webkit')){
				func();
			}else{
				setTimeout(func, 0);
			}
		},

		_showDijit: function(cellNode, rowInfo, col, rowCache){
			var _this = this;
			var func = function(){
				if(col.userDecorator || _this._getSpecialCellDec(rowInfo.rowId, col.id)){
					cellWidget = _this._getCellWidget(col, rowInfo, rowCache);
					cellNode.innerHTML = "";
					cellWidget.placeAt(cellNode);
					cellWidget.startup();
				}
			};
			if(sniff('webkit')){
				func();
			}else{
				setTimeout(func, 0);
			}
		},
	
		_getCellWidget: function(column, rowInfo, rowCache){
			var widget = this._getSpecialWidget(column, rowInfo, rowCache),
				gridData = rowCache.data[column.id],
				storeData = rowCache.rawData[column.field];
			if(!widget){
				widget = new CellWidget({
					content: column.userDecorator(),
					setCellValue: column.setCellValue
				});
				column._cellWidgets.push(widget);
			}
			widget.setValue(gridData, storeData);
			return widget;
		},

		_releaseHandler: null,
		_releaseWidgets: function(){
			if(this._releaseHandler){
				clearTimeout(this._releaseHandler);
				delete this._releaseHandler;
			}
			var _this = this;
			this._releaseHandler = setTimeout(function(){
				var bn = _this.grid.bodyNode,
					columns = _this.grid._columns,
					i, col, j, widget,
					getRoot = function(node){
						while(node && node !== bn){
							node = node.parentNode;
						}
						return node;
					};
				for(i = columns.length - 1; i >= 0; --i){
					col = columns[i];
					if(col._cellWidgets){
						for(j = col._cellWidgets.length - 1; j >= 0; --j){
							widget = col._cellWidgets[j];
							if(!getRoot(widget.domNode)){
								col._cellWidgets.splice(j, 1);
								widget.destroyRecursive();
							}
						}
					}
				}
			}, 100);
		},
	
		_getSpecialCellDec: function(rowId, colId){
			var rowDecs = this._decorators[rowId];
			return rowDecs && rowDecs[colId];
		},
	
		_getSpecialWidget: function(column, rowInfo, rowCache){
			var rowDecs = this._decorators[rowInfo.rowId];
			if(rowDecs){
				var cellDec = rowDecs[column.id];
				if(cellDec){
					if(!cellDec.widget && cellDec.decorator){
						cellDec.widget = new CellWidget({
							content: cellDec.decorator(rowCache.data[column.id], rowInfo.rowId, rowInfo.rowIndex),
							setCellValue: cellDec.setCellValue
						});
					}
					return cellDec.widget;
				}
			}
			return null;
		},

		//Focus
		_initFocus: function(){
			if(this.grid.focus){
				this.grid.focus.registerArea({
					name: 'celldijit',
					priority: 1,
					doFocus: lang.hitch(this, '_doFocus'),
					doBlur: lang.hitch(this, '_doBlur'),
					onFocus: lang.hitch(this, '_onFocus'),
					onBlur: lang.hitch(this, '_endNavigate')
				});
				this.connect(this.grid, 'onCellKeyPress', '_onKey');
			}
		},

		_doFocus: function(evt, step){
			if(this._navigating){
				var elems = this._navElems;
				var func = function(){
					var toFocus = step < 0 ? (elems.highest || elems.last) : (elems.lowest || elems.first);
					if(toFocus){
						console.log("navigation focus ok!");
						toFocus.focus();
					}
				};
				if(sniff('webkit')){
					func();
				}else{
					setTimeout(func, 5);
				}
				return true;
			}
			return false;
		},

		_doBlur: function(evt, step){
			if(evt){
				var elems = this._navElems;
				var firstElem = elems.lowest || elems.first;
				var lastElem = elems.last || elems.highest || firstElem;
				var target = sniff('ie') ? evt.srcElement : evt.target;
				if(target == (step > 0 ? lastElem : firstElem)){
					event.stop(evt);
					this.model.when({id: this._focusRowId}, function(){
						var rowIndex = this.grid.body.getRowInfo({
							parentId: this.model.treePath(this._focusRowId).pop(), 
							rowIndex: this.model.idToIndex(this._focusRowId)
						}).visualIndex;
						var colIndex = this.grid._columnsById[this._focusColId].index;
						var dir = step > 0 ? 1 : -1;
						var _this = this;
						var checker = function(r, c){
							return _this._isNavigable(_this.grid._columns[c].id);
						};
						this.grid.body._nextCell(rowIndex, colIndex, dir, checker).then(function(obj){
							_this._focusColId = _this.grid._columns[obj.c].id;
							//This kind of breaks the encapsulation...
							var rowInfo = _this.grid.body.getRowInfo({visualIndex: obj.r});
							_this._focusRowId = _this.model.indexToId(rowInfo.rowIndex, rowInfo.parentId);
							_this.grid.body._focusCellCol = obj.c;
							_this.grid.body._focusCellRow = obj.r;
							_this._beginNavigate(_this._focusRowId, _this._focusColId);
							_this._doFocus(null, step);
						});
					}, this);
				}
				return false;
			}else{
				this._navigating = false;
				return true;
			}
		},

		_isNavigable: function(colId){
			var col = this.grid._columnsById[colId];
			return col && col.navigable && col.decorator;
		},

		_beginNavigate: function(rowId, colId){
			if(this._isNavigable(colId)){
				this._navigating = true;
				this._focusColId = colId;
				this._focusRowId = rowId;
				this._navElems = dijit._getTabNavigable(this.grid.body.getCellNode({
					rowId: rowId, 
					colId: colId
				}));
				return true;
			}
			return false;
		},

		_endNavigate: function(){
			this._navigating = false;
		},

		_isFocusable: function(node){
			var tag = node.tagName.toLowerCase();
			return array.indexOf(['input', 'textarea', 'button', 'a'], tag) >= 0 || node.tabIndex >= 0;
		},

		_onFocus: function(evt){
			var node = evt.target;
			if(this._isFocusable(node)){
				while(node && node !== this.grid.domNode && !html.hasClass(node, 'dojoxGridxCell')){
					node = node.parentNode;
				}
				if(node && node !== this.grid.domNode){
					var colId = node.getAttribute('colid');
					while(node && !html.hasClass(node, 'dojoxGridxRow')){
						node = node.parentNode;
					}
					if(node){
						var rowId = node.getAttribute('rowid');
						return this._beginNavigate(rowId, colId);
					}
				}
			}
			return false;
		},
		
		_onKey: function(e){
			var focus = this.grid.focus;
			if(e.keyCode === keys.F2 && !this._navigating && focus.currentArea() === 'body'){
				if(this._beginNavigate(e.rowId, e.columnId)){
					event.stop(e);
					focus.focusArea('celldijit');
				}
			}else if(e.keyCode === keys.ESCAPE && this._navigating && focus.currentArea() === 'celldijit'){
				this._navigating = false;
				focus.focusArea('body');
			}else if(this._navigating && e.keyCode !== keys.TAB){
				event.stop(e);
			}
		}
	}));
});

