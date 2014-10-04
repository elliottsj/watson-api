//>>built
define("gridx/modules/Header", [
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/html",
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"dojo/_base/query",
	"dojo/_base/sniff",
	"dojo/_base/event",
	"dojo/keys",
	"dojox/html/metrics",
	"../core/_Module"
], function(declare, array, html, lang, Deferred, query, sniff, event, keys, metrics, _Module){

	return _Module.registerModule(
	declare('gridx.modules.Header', _Module, {
		name: 'header',
	
		required: ['hLayout', 'vLayout'],
	
		getAPIPath: function(){
			return {
				header: this
			};
		},

		constructor: function(){
			//Prepare this.domNode
			this.domNode = html.create('div', {
				'class': 'dojoxGridxHeaderRow',
				role: 'presentation'
			});
			this.innerNode = html.create('div', {
				'class': 'dojoxGridxHeaderRowInner',
				role: 'row'
			});
			this.domNode.appendChild(this.innerNode);
		},

		destroy: function(){
			this.inherited(arguments);
			html.destroy(this.domNode);
		},
	
		load: function(args, startup){
			var g = this.grid, _this = this;
			//Add this.domNode to be a part of the grid header
			g.vLayout.register(this, 'domNode', 'headerNode');
			this.batchConnect(
				[g, 'onHScroll', '_onHScroll'],
				[g, 'onHeaderCellMouseOver', '_onHeaderCellMouseHover'],
				[g, 'onHeaderCellMouseOut', '_onHeaderCellMouseHover'],
				[g, '_onResizeBegin', function(changeSize, ds){
					ds.header = new Deferred();
					this._adaptWidth();
					ds.header.callback();
				}],
				[g.hLayout, 'onUpdateWidth', '_adaptWidth'],
				[g, 'setColumns', '_adaptWidth'],
				g.autoWidth && g.columnResizer && [g.columnResizer, 'onResize', '_onColumnResize']
			);
			this._initFocus();
			
			//Prepare mouse events
			g._connectEvents(this.domNode, '_onMouseEvent', this);
			//Set width and render after grid is started up
			g.hLayout.loaded.then(function(){
				_this.loaded.callback();
			});
		},
	
		columnMixin: {
			headerNode: function(){
				return this.grid.header.getHeaderNode(this.id);
			}
		},
	
		//Public-----------------------------------------------------------------------------
		defaultColumnWidth: 60,

		getHeaderNode: function(id){
			return query("[colid='" + id + "']", this.domNode)[0];
		},
		
		refresh: function(){
			var sb = ['<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>'],
				f = this.grid.focus, _this = this;
			array.forEach(this.grid.columns(), function(col){
				sb.push('<th colid="', col.id, '" class="dojoxGridxCell ',
					f && f.currentArea() == 'header' && col.id == _this._focusHeaderId ? _this._focusClass : '',
					'" role="columnheader" aria-readonly="true" tabindex="-1" style="width: ',
					(col.getWidth() || _this.arg('defaultColumnWidth') + 'px'), 
					'"><div class="dojoxGridxSortNode">', 
					col.name(), 
					'</div></th>');
			});
			sb.push('</tr></table>');
			this.innerNode.innerHTML = sb.join('');
		},

		onMoveToHeaderCell: function(/* columnId, e */){},
		
		//Private-----------------------------------------------------------------------------
		_onColumnResize: function(colId, width, oldWidth){
			this._columnsWidth += width - oldWidth;
			var g = this.grid;
			g.bodyNode.style.width = this._columnsWidth + 'px';
			g.domNode.style.width = g.hLayout.lead + g.hLayout.tail + this._columnsWidth + 'px';
		},

		_adaptWidth: function(){
			var g = this.grid;
			var ltr = g.isLeftToRight();
			var marginLead = ltr ? 'marginLeft' : 'marginRight';
			var marginTail = ltr ? 'marginRight' : 'marginLeft';
			var lead = g.hLayout.lead;
			var tail = g.hLayout.tail;
			html.style(this.innerNode, marginLead, lead + 'px');
			html.style(this.innerNode, marginTail, tail + 'px');
			html.style(g.bodyNode, marginLead, lead + 'px');
			if(g.autoWidth){
				this.refresh();
				if(!this.domNode.parentNode){
					g.headerNode.appendChild(this.domNode);
				}
				var headers = query('th.dojoxGridxCell', this.innerNode);
				var totalWidth = 0;
				headers.forEach(function(node){
					//var w = node.offsetWidth;
					var w = sniff('webkit') ? node.offsetWidth : html.style(node, 'width');
					totalWidth += node.offsetWidth;
					g._columnsById[node.getAttribute('colid')].width = w + 'px';
				});
				this._columnsWidth = totalWidth;
				g.bodyNode.style.width = totalWidth + 'px';
				g.domNode.style.width = (lead + tail + totalWidth) + 'px';
			}else{
				var bodyWidth = g.domNode.clientWidth - lead - tail;
				g.bodyNode.style.width = bodyWidth + 'px';
				var autoCols = [];
				array.forEach(g._columns, function(col){
					if(!col.width || col.width == 'auto'){
						col.width = 'auto';
						autoCols.push(col);
					}else if(/%$/.test(col.width)){
						col.width = (bodyWidth * parseFloat(col.width, 10) / 100) + 'px';
					}
				});
				this.refresh();
				if(!this.domNode.parentNode){
					g.headerNode.appendChild(this.domNode);
				}
				var fixedWidth = 0;
				array.forEach(g._columns, function(col){
					if(col.width != 'auto'){
						var node = this.getHeaderNode(col.id);
						//var w = node.offsetWidth;
						var w = sniff('webkit') ? node.offsetWidth : html.style(node, 'width');
						col.width = w + 'px';
						fixedWidth += w;
					}
				}, this);

				var spacing = (g._spacingWidth ? g._spacingWidth : 0);
				var w = (bodyWidth > fixedWidth ? ((bodyWidth - fixedWidth - spacing) / autoCols.length) : 
					this.arg('defaultColumnWidth')) + 'px';
				array.forEach(autoCols, function(col){
					col.width = w; 
				});
				this.refresh();
			}
		},

		_onHScroll: function(left){
			this.innerNode.scrollLeft = left;
		},
	
		_onMouseEvent: function(eventName, e){
			var g = this.grid,
				evtCell = 'onHeaderCell' + eventName,
				evtRow = 'onHeader' + eventName;
			if(g._isConnected(evtCell) || g._isConnected(evtRow)){
				this._decorateEvent(e);
				if(e.columnIndex >= 0){
					this.grid[evtCell](e);
				}
				this.grid[evtRow](e);
			}
		},
	
		_decorateEvent: function(e){
			var node = e.target;
			while(node && node !== this.domNode){
				if(node.tagName.toLowerCase() === 'th'){
					var col = this.grid._columnsById[node.getAttribute('colid')];
					if(col){
						e.columnId = col.id;
						e.columnIndex = col.index;
					}
					return;
				}
				node = node.parentNode;
			}
		},
		
		_onHeaderCellMouseHover: function(e){
			var node = this.getHeaderNode(e.columnId);
			html[e.type == 'mouseout' ? 'removeClass' : 'addClass'](node, "dojoxGridxHeaderCellOver");
		},
		
		// Focus
		_focusHeaderId: null,

		_focusClass: "dojoxGridxHeaderCellFocus",

		_initFocus: function(){
			var g = this.grid;
			if(g.focus){
				g.focus.registerArea({
					name: 'header',
					priority: 0,
					focusNode: this.domNode,
					doFocus: lang.hitch(this, '_doFocus'),
					doBlur: lang.hitch(this, '_blurNode'),
					onBlur: lang.hitch(this, '_blurNode'),
					connects: [
						this.connect(this.domNode, 'onkeydown', '_onKeyDown'),
						this.connect(g, 'onHeaderCellMouseDown', function(evt){
							this._focusNode(this.getHeaderNode(evt.columnId));
						})
					]
				});
			}
		},

		_doFocus: function(evt, step){
			var node;
			if(this._focusHeaderId){
				node = this.getHeaderNode(this._focusHeaderId);
			}
			return this._focusNode(node || query('th.dojoxGridxCell', this.domNode)[0]);
		},

		_focusNode: function(node){
			if(node){
				this._focusHeaderId = node.getAttribute('colid');
				if(this._focusHeaderId){
					this._blurNode();
					node.focus();
					if(this.grid.hScroller){
						//keep scrolling
						var rowNode = node.parentNode.parentNode.parentNode.parentNode;
						this.grid.hScroller.scroll(rowNode.scrollLeft);
					}
					html.addClass(node, this._focusClass);
					return true;
				}
			}
			return false;
		},

		_blurNode: function(){
			var node = query('th.' + this._focusClass, this.domNode)[0];
			if(node){
				html.removeClass(node, this._focusClass);
			}
			return true;
		},

		_onKeyDown: function(evt){
			if(this._focusHeaderId){
				var col, grid = this.grid,
					dir = grid.isLeftToRight() ? 1 : -1,
					delta = evt.keyCode == keys.LEFT_ARROW ? -dir : dir;
				if(evt.keyCode == keys.LEFT_ARROW || evt.keyCode == keys.RIGHT_ARROW){
					//Prevent scrolling the whole page.
					event.stop(evt);
					col = grid._columnsById[this._focusHeaderId];
					col = grid._columns[col.index + delta];
					if(col){
						this._focusNode(this.getHeaderNode(col.id));
						this.onMoveToHeaderCell(col.id, evt);
					}
				}
			}
		}
	}));
});

