//>>built
define("idx/gridx/allModules", [
	'idx/gridx/modules/Focus',
	'idx/gridx/modules/VScroller',
	'idx/gridx/modules/ColumnResizer',
	'idx/gridx/modules/VirtualVScroller',
	'idx/gridx/modules/SingleSort',
	'idx/gridx/modules/NestedSort',
	'idx/gridx/modules/ColumnLock',
	'idx/gridx/modules/select/Row',
	'idx/gridx/modules/select/Column',
	'idx/gridx/modules/select/Cell',
	'idx/gridx/modules/extendedSelect/Row',
	'idx/gridx/modules/extendedSelect/Column',
	'idx/gridx/modules/extendedSelect/Cell',
	'idx/gridx/modules/move/Row',
	'idx/gridx/modules/move/Column',
	'idx/gridx/modules/dnd/Row',
	'idx/gridx/modules/dnd/Column',
	'idx/gridx/modules/Pagination',
	'idx/gridx/modules/pagination/PaginationBar',
	'idx/gridx/modules/pagination/PaginationBarDD',
	'idx/gridx/modules/Filter',
	'idx/gridx/modules/filter/FilterBar',
	'idx/gridx/modules/filter/QuickFilter',
	'idx/gridx/modules/CellWidget',
	'idx/gridx/modules/Edit',
	'idx/gridx/modules/RowHeader',
	'idx/gridx/modules/IndirectSelect',
	'idx/gridx/modules/IndirectSelectColumn',
	'idx/gridx/modules/Persist',
	'idx/gridx/modules/Menu',
	'idx/gridx/modules/Dod',
	'idx/gridx/modules/Tree',
	'idx/gridx/modules/RowLock',
	'idx/gridx/modules/ToolBar',
	'idx/gridx/modules/SummaryBar',
	'idx/gridx/modules/Bar',
	'idx/gridx/modules/NavigableCell',
	'idx/gridx/modules/TouchScroll'
], function(
	Focus, VScroller, ColumnResizer, VirtualVScroller,
	SingleSort, NestedSort, ColumnLock,
	SelectRow, SelectColumn, SelectCell,
	ExtendedSelectRow, ExtendedSelectColumn, ExtendedSelectCell,
	MoveRow, MoveColumn,
	DndRow, DndColumn,
	Pagination,
	PaginationBar, PaginationBarDD,
	Filter, FilterBar, QuickFilter,
	CellWidget, Edit,
	RowHeader, IndirectSelect, IndirectSelectColumn,
	Persist, Menu, Dod, Tree, RowLock,
	ToolBar, SummaryBar, Bar, NavigableCell, TouchScroll){
return {
	Focus: Focus,
	VScroller: VScroller,
	ColumnResizer: ColumnResizer, 
	VirtualVScroller: VirtualVScroller,
	SingleSort: SingleSort,
	NestedSort: NestedSort,
	ColumnLock: ColumnLock,
	SelectRow: SelectRow,
	SelectColumn: SelectColumn,
	SelectCell: SelectCell,
	ExtendedSelectRow: ExtendedSelectRow,
	ExtendedSelectColumn: ExtendedSelectColumn,
	ExtendedSelectCell: ExtendedSelectCell,
	MoveRow: MoveRow,
	MoveColumn: MoveColumn,
	DndRow: DndRow,
	DndColumn: DndColumn,
	Pagination: Pagination,
	PaginationBar: PaginationBar,
	PaginationBarDD: PaginationBarDD,
	Filter: Filter,
	FilterBar: FilterBar,
	QuickFilter: QuickFilter,
	CellWidget: CellWidget,
	Edit: Edit,
	RowHeader: RowHeader,
	IndirectSelect: IndirectSelect,
	IndirectSelectColumn: IndirectSelectColumn,
	Persist: Persist,
	Menu: Menu,
	Dod: Dod,
	Tree: Tree,
	RowLock: RowLock,
	ToolBar: ToolBar,
	SummaryBar: SummaryBar,
	Bar: Bar,
	NavigableCell: NavigableCell,
	TouchScroll: TouchScroll
};
});
