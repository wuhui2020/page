;$(function(){
	
	function Paging(element,options){
		this.element = element;
		this.options = {
			pageNo:options.pageNo || 1,
			totalPage:options.totalPage,
			totalCount:options.totalCount,
			callback:options.callback,
		};
		this.init();
	}

	Paging.prototype = {
		constructor:Paging,
		init:function(){
			this.createHtml();
			this.bindEvent();
		},
		//createHtml  start  创建分页-----------------------
		createHtml:function(){
			var _This = this;
			var pageHtml = "";
			var currentPage = _This.options.currentPage;
			var pageTotal = _This.options.totalPage;
			var totalCount = _This.options.totalCount;

			pageHtml+='<div id="PAGEDIV">'
					+'<a id="firstPage">首页</a>'
					+'<a id="prePage">上一页</a>'
			//判断总页数大于6页			
			if(pageTotal > 6){
				//判断当前小于5
				if(currentPage < 5){
					for (var i = 1; i < 6 ; i++) {
						if(currentPage == i){
							pageHtml +='<a class="pageCheck">'+i+'</a>'
						}else{
							pageHtml +='<a>'+i+'</a>'
						}
					};
					pageHtml+='<i>...</i>'
							+'<a>'+pageTotal+'</a>'
				}else{
					//当前大于5时
					//判断中间页
					if(currentPage < parseInt(pageTotal) -3){
						for(var i = parseInt(currentPage) - 2 ;i < parseInt(currentPage) + 3; i++){
							if(currentPage == i){
								pageHtml+='<a class="pageCheck">'+i+'</a>'
							}else{
								pageHtml+='<a>'+i+'</a>'
							}
						}
					}else {
						//判断是否在未尾几页
						pageHtml+='<a>1</a>'
								+'<i>...</i>'
						for(var i = parseInt(pageTotal) - 4; i < parseInt(pageTotal) + 1*1; i++){
							if(currentPage == i){
								pageHtml+='<a class="pageCheck">'+i+'</a>'
							}else{
								pageHtml+='<a>'+i+'</a>'
							}
						}
					}
				}
			}else{
				//总页数小于6页的时候
				for (var i = 1; i < parseInt(currentPage) + 1 ; i++) {
					if(currentPage == i){
						pageHtml +='<a class="pageCheck">'+i+'</a>'
					}else{
						pageHtml +='<a>'+i+'</a>'
					}
				};
			}
			pageHtml+=	'<a id="nextPage">下一页</a>'
					+	'<a id="lastPage">尾页</a>'
					+	'<span>共 '+pageTotal+' 页</span>'
					+	'<span>共 '+totalCount+' 条记录</span>'
					+'</div>'
			_This.element.html(pageHtml)
		},
		//createHtml  end-----------------------
		//bindEvent  start  绑定点击事件-----------------------
		bindEvent:function(){
			var _This = this;
			_This.element.off("click",'a');
			_This.element.on("click",'a',function(){
				var num = $(this).text();
				var pageID = $(this).attr("id");
				if(pageID == "firstPage"){
					_This.options.currentPage = 1;
				}else if(pageID == "prePage"){
					if(_This.options.currentPage == 1){
						_This.options.currentPage = 1;
					}else{
						_This.options.currentPage = _This.options.currentPage - 1;
					}

				}else if(pageID == "nextPage"){
					if(_This.options.currentPage == _This.options.totalPage){
						_This.options.currentPage = _This.options.totalPage;
					}else{
						_This.options.currentPage = _This.options.currentPage + 1;
					}
					
				}else if(pageID == "lastPage"){
					_This.options.currentPage = _This.options.totalPage;
				}else{
					_This.options.currentPage = num;
				}

				_This.createHtml();
				if(_This.options.callback){
					_This.options.callback(_This.options.currentPage);
				}

			});
		}
		//bindEvent  end-----------------------
	};

	$.fn.paging = function(options){
		return new Paging($(this),options);
	};

});