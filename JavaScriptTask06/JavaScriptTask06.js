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
//trim输入内容
function textareaTrim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}
//将输入内容分割为数组
function textareaSplit(text) {
      var arrInput = (text).split(/[,，;；、\s\n]+/);
    return arrInput;
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
        unshift: function (arr) {
            for (var cur in arr) {
                this.str.unshift(arr[cur]);
            }
                //打印队列
                this.print();

        },
        //右侧入
        push: function (arr) {
            for (var cur in arr) {
                this.str.push(arr[cur]);
            }
                this.print();
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



    function search(text) {
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            container.childNodes[cur].style.color = "#FFFFFF";
            container.childNodes[cur].style.background = "red";
        }

        for (var cur = 0; cur < container.childNodes.length; cur++) {
            if (container.childNodes[cur].innerHTML.indexOf(text) != -1) {
                console.log(container.childNodes[cur].innerHTML);
                container.childNodes[cur].style.color = "green";
                container.childNodes[cur].style.background = "black";
            }
        }
    }
//为4个button绑定函数
//左侧入
    addEvent(inputList[0], "click", function () {
        var input = textareaSplit(textareaTrim((document.getElementById("inputbox")).value));
        queue.unshift(input);

    })
//右侧入
    addEvent(inputList[1], "click", function () {
        var input = textareaSplit(textareaTrim((document.getElementById("inputbox")).value));
                queue.push(input);

    })

//左侧出
    addEvent(inputList[2], "click", function () {
        queue.shift();
    })
//右侧出
    addEvent(inputList[3], "click", function () {
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
    addEvent(inputList[5], "click", function() {
        var inputValue = inputList[4].value;
        search(inputValue);
    })

}


