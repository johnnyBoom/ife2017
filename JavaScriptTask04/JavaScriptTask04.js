//对元素添加绑定事件函数

function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);//DOM2.0
        return true;
    }
    else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn);//IE5+
        return r;
    }
    else {
        elm["on"+ evType] = fn;//DOM 0
    }
}

//窗体加载执行
window.onload = function () {
    var inputList = document.getElementsByTagName("input");
	 var container = document.getElementById("container");
    //定义队列,队列方法
    var queue = {
        //定义队列
        str:[],
        //定义打印方法
        print: function () {
            var str = "";
            for (var cur = 0; cur < this.str.length; cur++) {
                str+=("<div>"+this.str[cur]+"</div>");
            }
            container.innerHTML = str;
            //添加删除事件
            addDivDelEvent();
        },
        //定义删除方法
        deleteId: function (id) {
            console.log(id);
            this.str.splice(id, 1);
            this.print();
        },
        //左侧入
        unshift: function (num) {
            this.str.unshift(num);
            //打印队列
            this.print();
        },
        //右侧入
        push: function (num) {
            this.str.push(num);
            this.print();
        },
        //左侧出
        shift :function () {
            if(this.str.length == 0){
                alert("没有数值可以移除！")
            }else{
                alert("移除数值为："+this.str.shift());
                this.print();
            }
        },
        //右侧出
        pop: function () {
            if(this.str.length == 0){
                alert("没有数值可以移除！")
            }else{
                alert("移除数值为："+this.str.pop());
                this.print();
            }
        }



    }
//为4个button绑定函数
//左侧入
addEvent(inputList[1],"click",function () {
    var inputNum = inputList[0].value;
    //判断
    if((/^[0-9]+$/).test(inputNum)){
        //将数值添加到左侧入队列
        queue.unshift(inputNum);
    }
   else{
        alert("请输入数字！");
    }

})
//右侧入
addEvent(inputList[2],"click",function () {
    var inputNum = inputList[0].value;

    if((/^[0-9]+$/).test(inputNum)){
        //将数值添加到右侧入队列
        queue.push(inputNum);
    }
    else{
        alert("请输入数字！");
    }
})

//左侧出
addEvent(inputList[3],"click",function () {
   queue.shift();
})
//右侧出
addEvent(inputList[4],"click",function () {
    //队列中移除右侧元素
    queue.pop();
})
//为显示div 添加删除事件
function addDivDelEvent(){
 for(var cur = 0;cur<container.childNodes.length;cur++){
    addEvent(container.childNodes[cur],"click",function (cur) {
        return function () {
            //队列删除方法
            return queue.deleteId(cur);
        }
    }(cur))
 }
}



}