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
        str: [],
        //定义打印方法
        print: function () {
            var str = "";
            for (var cur = 0; cur < this.str.length; cur++) {
                str += ("<div style=\'height: " + parseInt(this.str[cur]) + "px\'>" + this.str[cur] + "</div>");
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
            if (this.str.length > 60) {
                alert("超过60啦");
            } else {
                this.str.unshift(num);
                //打印队列
                this.print();
            }
        },
        //右侧入
        push: function (num) {
            if (this.str.length > 60) {
                alert("超过60啦");
            } else {
                this.str.push(num);
                this.print();
            }
        },
        //左侧出
        shift: function () {
            if (this.str.length == 0) {
                alert("没有数值可以移除！")
            } else {
                alert("移除数值为：" + this.str.shift());
                this.print();
            }
        },
        //右侧出
        pop: function () {
            if (this.str.length == 0) {
                alert("没有数值可以移除！")
            } else {
                alert("移除数值为：" + this.str.pop());
                this.print();
            }
        }


    }

    //冒泡排序
    function bubbleSort() {
        var Clock;
        var count = 0, i = 0;
        console.log(queue.str.length)
        Clock = setInterval(function () {
            if (count >= queue.str.length) {
                clearInterval(Clock);
            }
            if (i == queue.str.length - 1 - count) {
                i = 0;
                count++;
            }
            if (queue.str[i] > queue.str[i + 1]) {
                var temp = queue.str[i];
                queue.str[i] = queue.str[i + 1];
                queue.str[i + 1] = temp;
                queue.print();
            }
            i++;
        }, 100);

    }

//为4个button绑定函数
//左侧入
    addEvent(inputList[1], "click", function () {
        var inputNum = inputList[0].value;
        //判断
        if ((/^[0-9]+$/).test(inputNum)) {
            //将数值添加到左侧入队列
            if (parseInt(inputNum) < 10 || parseInt(inputNum) > 100) {
                alert("请输入10-100数值");
            } else {
                queue.unshift(inputNum);
            }

        }
        else {
            alert("请输入数字！");
        }

    })
//右侧入
    addEvent(inputList[2], "click", function () {
        var inputNum = inputList[0].value;

        if ((/^[0-9]+$/).test(inputNum)) {
            //将数值添加到右侧入队列
            if (parseInt(inputNum) < 10 || parseInt(inputNum) > 100) {
                alert("请输入10-100数值");
            } else {
                queue.push(inputNum);
            }

        }
        else {
            alert("请输入数字！");
        }
    })

//左侧出
    addEvent(inputList[3], "click", function () {
        queue.shift();
    })
//右侧出
    addEvent(inputList[4], "click", function () {
        //队列中移除右侧元素
        queue.pop();
    })
//为显示div 添加删除事件
    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            addEvent(container.childNodes[cur], "click", function (cur) {
                return function () {
                    //队列删除方法
                    return queue.deleteId(cur);
                }
            }(cur))
        }
    }

//绑定排序方法
    addEvent(inputList[5], "click", function () {
        bubbleSort();
    })
//绑定生成随机数方法
addEvent(inputList[6],"click",function () {
    Random();
})
//产生10-100随机数50个
    function Random() {
        for(var i = 0;i<50;i++){

            queue.str.push(Math.floor((Math.random() * 101))+10);
        }
        queue.print();
    }
}


