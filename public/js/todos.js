define(['{lib}ui/item/item.js', '{lib}util/template/tpl.js'], todos);

function todos() {
	var _ = NEJ.P,
	_e = _('nej.e'),
	_o = NEJ.P('nej.o'),
	_v = NEJ.P('nej.v'),
	_ui = NEJ.P('nej.ui'),
	_u = NEJ.P('nej.u'),
	_p = _('nej.todos'),
	_j = NEJ.P('nej.j'),
	_todoItem,
	_supTodoItem;

	//工作条模板
	var _todoItemTpl = _e._$addNodeTemplate(`<li class="todo-item">
		<div class="view-panel">
		<input type="checkbox" class="check-item">
		<span class="pre-item"></span>
		<a class="delete-icon"></a>
		</div>
		<input type="text" class="newContent hiddenBlock">
		</li>`);
	//构造新工作条,继承自_ui._$$Item
	_p._$$todoItem = NEJ.C();
	_todoItem = _p._$$todoItem._$extend(_ui._$$Item, !0);
	_supTodoItem = _ui._$$Item.prototype;

	/**
	 * 初始化
	 * @return {Void}
	 */
	 _todoItem.__init = function(_opt) {
	 	this.__super(_opt);
	 	_opt = _opt || _o;
	 	this.__onCheck = _opt.oncheck;
	 };

	/**
	 * 初始化节点，子类重写具体逻辑
	 * @return {Void}
	 */
	 _todoItem.__initNode = function() {
	 	this.__body = _e._$getNodeTemplate(_todoItemTpl);
	 	this._todoView = _e._$getByClassName(this.__body, 'view-panel')[0];
	 	this._todoCheck = _e._$getByClassName(this.__body, 'check-item')[0];
	 	this._todoContent = _e._$getByClassName(this.__body, 'pre-item')[0];
	 	this._todoDelete = _e._$getByClassName(this.__body, 'delete-icon')[0];
	 	this._todoEdit = _e._$getByClassName(this.__body, 'newContent')[0];
		//完成项
		_v._$addEvent(this._todoCheck, 'click', this.__onClickCheck._$bind(this));
		//删除项
		_v._$addEvent(this._todoDelete, 'click', this.__onClickDelete._$bind(this));
		//编辑项
		_v._$addEvent(this._todoContent, 'dblclick', this.__onClickEdit._$bind(this));
		//编辑框失焦
		_v._$addEvent(this._todoEdit, 'blur', this.__onEditEnd._$bind(this));
	};
	/**
	 * 刷新项,子类实现具体逻辑
	 * @return {Void}
	 */
	 _todoItem.__doRefresh = function(_data) {
	 	this._todoId = _data._id;
	 	this._todoCheck.checked = _data.done;
	 	this._todoContent.innerText = _data.content;
	 	this._todoView.style['text-decoration']=_data.done?'line-through':'none';
	 };
	/**
	 * 点击删除的响应函数
	 * @param {Object} _event	事件对象
	 */
	 _todoItem.__onClickDelete = function(_event) {

	 	var _this = this;
	 	if (!this._$checked()) this._todoCheck.click();
	 	var newItems = [];
		//把todoItems中对应的项删掉
		_u._$forEach(todoItems, function(item) {
			if (item._todoId != _this._todoId) {
				newItems.push(item);
			}
		});
		todoItems = newItems;
		_p._$$todoItem._$recycle(this);
		//删除数据库中的对应记录
		deleteCommit(this._todoId);
		var _checkedItems = getCheckedItems();
		var _selectAll = _e._$get('markDone');
		if (_checkedItems.length != todoItems.length || !todoItems.length) {
			_selectAll.checked = false;
			return;
		}

	};
	function deleteCommit(_id){
		var _url='../remove';
		var _requestId = _j._$request(_url, {
			sync: false,
			type: 'json',
			method: 'post',
			data:{id:_id},
			mode: 0,
			onload: function(_data) {
				// 正常回调处理
				console.log('edit content success');
			},
			onerror: function(_error) {
				// 异常处理
				console.log(_error);
			}
		});
	}
	/**
	 * 点击复选框的响应函数
	 * @param {Object} _event	事件对象
	 */
	 _todoItem.__onClickCheck = function(_event) {
	 	this.__data.done = this._$checked();
	 	this.__onCheck && this.__onCheck(this);
	 	this._todoView.style['text-decoration']=this._todoView.style['text-decoration'] == "line-through"?"none": "line-through";
	 	//update the data in db
		updateCommit({id:this._todoId,done:this.__data.done});
	 };
	/**
	 * 双击项可编辑函数
	 * @param {Object} _event	事件对象
	 */
	 _todoItem.__onClickEdit = function(_event) {
	 	this._todoEdit.value = this._todoContent.innerText;
	 	this._todoView.style.display = "none";
	 	this._todoEdit.style.display = "block";
	 	this._todoEdit.focus();
	 };
	/**
	 * 编辑框失焦
	 * @param {Object} _event	事件对象
	 */
	 _todoItem.__onEditEnd = function(_event) {
	 	this._todoContent.innerText = this._todoEdit.value;
	 	this.__data.content = this._todoEdit.value;
	 	this._todoEdit.style.display = "none";
	 	this._todoView.style.display = "flex";
		//update the data in db
		updateCommit({id:this._todoId,content:this._todoEdit.value});
	};
	function updateCommit(_data){
		var _url='../edit';
		var _requestId = _j._$request(_url, {
			sync: false,
			type: 'json',
			method: 'post',
			data:_data,
			mode: 0,
			onload: function(_data) {
				// 正常回调处理
				console.log('edit content success');
			},
			onerror: function(_error) {
				// 异常处理
				console.log(_error);
			}
		});
	}
	/**
	 * check该项
	 * @param {Boolean} _checked
	 */
	 _todoItem._$check = function(_checked) {
	 	this._todoCheck.checked = !!_checked;
	 };
	/**
	 * 获取该项是否选中
	 * @return  {Boolean} _checked	是否选中
	 */
	 _todoItem._$checked = function() {
	 	return this._todoCheck.checked;
	 };

	 function init(_data) {
	 	var _todoList = _e._$get('todo-list');
	 	var _doneAll = true;
		//todoItems=null;
		todoItems = _e._$getItemTemplate(_data, _p._$$todoItem, {
			parent: _todoList,
			oncheck: onCheck
		});
		for (i = 0; i < _data.length; i++) {
			if (_data[i].done == false) {
				_doneAll = false;
				break;
			}
		}
		_e._$get('markDone').checked = _doneAll;
		_e._$get("todo-reamin").innerText = getUnCheckedItems().length + "项待办工作";
		_v._$addEvent('addItem', 'click', _addItem);
		_v._$addEvent('markDone', 'click', onClickSelectAll);
		_v._$addEvent('clearDone', 'click', onClickDeleteDone);

	}

	function _addItem() {
		var _todoList = _e._$get('todo-list');
		var content = _e._$get("newContent").value;
		var item = {
			content: content,
			done: false
		};
		appendItem = _e._$getItemTemplate([item], _p._$$todoItem, {
			parent: _todoList,
			oncheck: onCheck
		});
		saveCommit(appendItem[0],item);
		todoItems = todoItems.concat(appendItem);
		_e._$get("todo-reamin").innerText = parseInt(_e._$get("todo-reamin").innerText.substr(0, 1)) + 1 + "项待办工作";
		_e._$get('markDone').checked = false;
	}
	function saveCommit(item,_data){
		var _url='../save';
		var _requestId = _j._$request(_url, {
			sync: false,
			type: 'json',
			method: 'post',
			data:_data,
			mode: 0,
			onload: function(data) {
				// 正常回调处理
				item.__data=data;
				item._todoId=data._id;
				console.log('save item success');
			},
			onerror: function(_error) {
				// 异常处理
				console.log(_error);
			}
		});
	}
	/**
	 * 工人项check的回调函数
	 * @param {Object} _item	工人项
	 */
	 function onCheck(_item) {
	 	if (_item._$checked()) {
	 		_e._$get("todo-reamin").innerText = parseInt(_e._$get("todo-reamin").innerText.substr(0, 1)) - 1 + "项待办工作";
	 	} else {
	 		_e._$get("todo-reamin").innerText = parseInt(_e._$get("todo-reamin").innerText.substr(0, 1)) + 1 + "项待办工作";
	 	}
	 	var _checkedItems = getCheckedItems();
	 	var _selectAll = _e._$get('markDone');
	 	var _checked;
	 	if (_checkedItems.length != todoItems.length) {
	 		_selectAll.checked = false;
	 		return;
	 	}
	 	if (_checkedItems.length == todoItems.length) {
	 		_selectAll.checked = true;
	 	}
	 }
	/**
	 * 获取所有的选中项
	 * @return	{Array}	选中项列表
	 */
	 function getCheckedItems() {
	 	var _items = [];
	 	_u._$forEach(todoItems, function(item) {
	 		if (item._$checked()) {
	 			_items.push(item);
	 		}
	 	});
	 	return _items;
	 }
	/**
	 * 获取所有的未选中项数目
	 * @return	{Array}	选中项列表
	 */
	 function getUnCheckedItems() {
	 	var _items = [];
	 	_u._$forEach(todoItems, function(item) {
	 		if (!item._$checked()) {
	 			_items.push(item);
	 		}
	 	});
	 	return _items;
	 }
	/**
	 * 点击"删除已完成"按钮的响应函数
	 * @param {Object} _event	事件对象
	 */
	 function onClickDeleteDone(_event) {
	 	var _checkedItems = getCheckedItems();
	 	if (_checkedItems.length) {
	 		_p._$$todoItem._$recycle(_checkedItems);
	 	}
	 	todoItems = getUnCheckedItems();
	 }
	/**
	 * 点击"全选"复选框的响应函数
	 * @param {Object} _event	事件对象
	 */
	 function onClickSelectAll(_event) {
	 	var _checked = _v._$getElement(_event).checked;
	 	_u._$forEach(todoItems, function(item) {
	 		if (item._$checked() != _checked) item._todoCheck.click();
			//item._$check(_checked);
		});
	 }
	/**
	 * 生成新的UUID
	 * 
	 */
	 function generateUUID() {
	 	var d = new Date().getTime();
	 	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	 		var r = (d + Math.random() * 16) % 16 | 0;
	 		d = Math.floor(d / 16);
	 		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	 	});
	 	return uuid;
	 };

	 function loadData() {
	 	var _url='../list';
	 	var _requestId = _j._$request(_url, {
	 		sync: false,
	 		type: 'json',
	 		method: 'post',
	 		mode: 0,
	 		onload: function(_data) {
				// 正常回调处理
				init(_data);
				console.log(_data);
			},
			onerror: function(_error) {
				// 异常处理
				console.log(_error);
				init([]);
			}
		});
	 }
	 loadData();

	}