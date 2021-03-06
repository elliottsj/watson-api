//>>built
define("gridx/modules/SingleSort", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/keys",
	"../core/_Module"
], function(declare, lang, keys, _Module){

	return _Module.registerModule(
	declare('gridx.modules.SingleSort', _Module, {
		name: 'sort',

		forced: ['header'],

		required: ['vLayout'],
		
		getAPIPath: function(){
			return {
				sort: this
			};
		},

		preload: function(args){
			var g = this.grid, sort;
			this.connect(g, 'onHeaderCellClick', '_onClick');
			this.connect(g, 'onHeaderCellKeyDown', '_onKeyDown');
			//persistence support
			if(g.persist){
				var _this = this;
				sort = g.persist.registerAndLoad('sort', function(){
					return [{
						colId: _this._sortId,
						descending: _this._sortDescend 
					}];
				});
			}
			//Presort...
			sort = sort || args.preSort || g.preSort;
			if(lang.isArrayLike(sort)){
				sort = sort[0];
			}
			if(sort && sort.colId){
				this._sortId = sort.colId;
				this._sortDescend = sort.descending;
				//sort here so the body can render correctly.
				this.model.sort([sort]);
			}
		},
	
		load: function(){
			for(var colId in this.grid._columnsById){
				this._initHeader(colId);
			}
			//If presorted, update header UI
			if(this._sortId){
				this._updateHeader(this._sortId, this._sortDescend);
			}
			this.loaded.callback();
		},
	
		columnMixin: {
			sort: function(isDescending, skipUpdateBody){
				this.grid.sort.sort(this.id, isDescending, skipUpdateBody);
				return this;
			},
	
			isSorted: function(){
				return this.grid.sort.isSorted(this.id);
			},
	
			clearSort: function(skipUpdateBody){
				if(this.isSorted()){
					this.grid.sort.clear(skipUpdateBody);
				}
				return this;
			},
	
			isSortable: function(){
				var col = this.grid._columnsById[this.id];
				return col.sortable || col.sortable === undefined;
			},
	
			setSortable: function(isSortable){
				this.grid._columnsById[this.id].sortable = !!isSortable;
				return this;
			}
		},
	
		//Public--------------------------------------------------------------
		sort: function(colId, isDescending, skipUpdateBody){
			var g = this.grid, col = g._columnsById[colId];
			if(col && (col.sortable || col.sortable === undefined)){
				if(this._sortId !== colId || this._sortDescend === !isDescending){
					this._updateHeader(colId, isDescending);
				}
				this.model.sort([{colId: colId, descending: isDescending}]);
				if(!skipUpdateBody){
					g.body.refresh();
				}
			}
		},
	
		isSorted: function(colId){
			if(colId === this._sortId){
				return this._sortDescend ? -1 : 1;
			}
			return 0;
		},
	
		clear: function(skipUpdateBody){
			if(this._sortId !== null){
				this._initHeader(this._sortId);
				this.model.sort();
				if(!skipUpdateBody){
					this.grid.body.refresh();
				}
			}
		},

		getSortData: function(){
			return this._sortId ? [{colId: this._sortId, descending: this._sortDescend}] : [];
		},
	
		//Private--------------------------------------------------------------
		_sortId: null,

		_sortDescend: null, 
		
		_initHeader: function(colId){
			var	headerCell = this.grid.header.getHeaderNode(colId);
			headerCell.innerHTML = ["<div class='dojoxGridxSortNode'>", this.grid.column(colId, true).name(), "</div>"].join('');
			headerCell.removeAttribute('aria-sort');
		},
	
		_updateHeader: function(colId, isDescending){
			//Change the structure of sorted header
			if(this._sortId && this._sortId !== colId){
				this._initHeader(this._sortId);
			}
			this._sortId = colId;
			this._sortDescend = !!isDescending;
			var str = ["<div class='dojoxGridxSortNode ",
				(isDescending ? 'dojoxGridxSortDown' : 'dojoxGridxSortUp'),
				"'><div class='dojoxGridxArrowButtonChar'>",
				(isDescending ? "&#9662;" : "&#9652;"),
				"</div><div role='presentation' class='dojoxGridxArrowButtonNode'></div><div class='dojoxGridxColCaption'>",
				this.grid.column(colId, true).name(),
				"</div></div>"].join('');
			var	headerCell = this.grid.header.getHeaderNode(colId);
			headerCell.innerHTML = str;
			headerCell.setAttribute('aria-sort', isDescending ? 'descending' : 'ascending');
			this.grid.vLayout.reLayout();
		},
	
		_onClick: function(e){
			this.sort(e.columnId, (this._sortId !== e.columnId ? false : !this._sortDescend));
		},
		
		_onKeyDown: function(e){
			if(e.keyCode == keys.ENTER){
				this._onClick(e);
			}
		}
	}));
});

