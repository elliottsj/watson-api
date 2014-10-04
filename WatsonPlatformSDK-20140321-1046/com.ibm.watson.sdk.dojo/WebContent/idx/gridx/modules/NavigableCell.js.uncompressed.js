//>>built
define("idx/gridx/modules/NavigableCell", [
	"dojo/_base/declare",
	"dojo/_base/event",
	"dojo/_base/sniff",
	"dojo/dom-class",
	"dojo/keys",
	"dijit/a11y",
	"../core/_Module"
], function(declare, event, sniff, domClass, keys, a11y, _Module){

/*=====
	return declare(_Module, {
		// summary:
		//		This module allow the elements in grid cell be focusable.
		// description:
		//		When focus is on a cell, press F2 to focus the first focusable element in that cell.
		//		TAB to move focus to the next focusable element in that cell.
		//		If there's no more focusable elements in current cell, focus the focusable element in next cell.
		//		If the current cell is the last cell in current view, move focus to the first cell.
		//		SHIFT+TAB to move focus to the previous focusable element in that cell.
		//		If there's no more focusable elements in current cell, focus the focusable element in the previous cell.
		//		If the current cell is the first cell in current view, move focus to the last cell.
		//		Press ESC to move focus back to the cell itself.
	});
=====*/

	return _Module.register(
	declare(_Module, {
		name: 'navigableCell',

		preload: function(){
			var t = this,
				focus = t.grid.focus;
			focus.registerArea({
				name: 'navigablecell',
				priority: 1,
				scope: t,
				doFocus: t._doFocus,
				doBlur: t._doBlur,
				onFocus: t._onFocus,
				onBlur: t._endNavigate,
				connects: [
					t.connect(t.grid, 'onCellKeyDown', '_onKey')
				]
			});
		},

		_doFocus: function(evt, step){
			if(this._navigating){
				var elems = this._navElems,
					func = function(){
						var toFocus = step < 0 ? (elems.highest || elems.last) : (elems.lowest || elems.first);
						if(toFocus){
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
				var t = this,
					m = t.model,
					g = t.grid,
					body = g.body,
					elems = t._navElems,
					firstElem = elems.lowest || elems.first,
					lastElem = elems.last || elems.highest || firstElem,
					target = sniff('ie') ? evt.srcElement : evt.target;
				if(target == (step > 0 ? lastElem : firstElem)){
					event.stop(evt);
					m.when({id: t._focusRowId}, function(){
						var rowIndex = body.getRowInfo({
								parentId: m.treePath(t._focusRowId).pop(), 
								rowIndex: m.idToIndex(t._focusRowId)
							}).visualIndex,
							colIndex = g._columnsById[t._focusColId].index,
							dir = step > 0 ? 1 : -1,
							checker = function(r, c){
								return t._isNavigable(g._columns[c].id);
							};
						body._nextCell(rowIndex, colIndex, dir, checker).then(function(obj){
							t._focusColId = g._columns[obj.c].id;
							//This kind of breaks the encapsulation...
							var rowInfo = body.getRowInfo({visualIndex: obj.r});
							t._focusRowId = m.indexToId(rowInfo.rowIndex, rowInfo.parentId);
							body._focusCellCol = obj.c;
							body._focusCellRow = obj.r;
							t._beginNavigate(t._focusRowId, t._focusColId);
							t._doFocus(null, step);
						});
					});
				}
				return false;
			}else{
				this._navigating = false;
				return true;
			}
		},

		_isNavigable: function(colId){
			var col = this.grid._columnsById[colId];
			return col && (col.navigable || col.navigable === undefined) && col.decorator;
		},

		_beginNavigate: function(rowId, colId){
			var t = this;
			if(t._isNavigable(colId)){
				t._navigating = true;
				t._focusColId = colId;
				t._focusRowId = rowId;
				t._navElems = a11y._getTabNavigable(t.grid.body.getCellNode({
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

		_onFocus: function(evt){
			var node = evt.target, dn = this.grid.domNode;
			while(node && node !== dn && !domClass.contains(node, 'gridxCell')){
				node = node.parentNode;
			}
			if(node && node !== dn){
				var cellNode = node,
					colId = node.getAttribute('colid');
				while(node && !domClass.contains(node, 'gridxRow')){
					node = node.parentNode;
				}
				if(node){
					var rowId = node.getAttribute('rowid');
					return cellNode != evt.target && this._beginNavigate(rowId, colId);
				}
			}
			return false;
		},

		_onKey: function(e){
			var t = this, focus = t.grid.focus;
			if(e.keyCode == keys.F2 && !t._navigating && focus.currentArea() == 'body'){
				if(t._beginNavigate(e.rowId, e.columnId)){
					event.stop(e);
					focus.focusArea('navigablecell');
				}
			}else if(e.keyCode == keys.ESCAPE && t._navigating && focus.currentArea() == 'navigablecell'){
				t._navigating = false;
				focus.focusArea('body');
			}
		}
	}));
});
