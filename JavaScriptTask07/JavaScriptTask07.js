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

var list = [];
//前序遍历
function preOrder(node) {
    if(node){
        list.push(node);
        if(node.firstElementChild){
            preOrder(node.firstElementChild);
        }
        if(node.lastElementChild){
            preOrder(node.lastElementChild);
        }
    }
}
//中序遍历
function midOrder(node) {
    if(node){
        if(node.firstElementChild){
            midOrder(node.firstElementChild);
        }
        list.push(node);
        if(node.lastElementChild){
            midOrder(node.lastElementChild);
        }
    }
}
//后序遍历
function backOrder(node) {
    if(node){
        if(node.firstElementChild){
            backOrder(node.firstElementChild);
        }

        if(node.lastElementChild){
            backOrder(node.lastElementChild);
        }
        list.push(node);
    }
}
//依次改变数组中元素背景色样式
function changeColor() {
     var i = 0;
     list[i].style.backgroundColor = "blue";
     var timer =  setInterval(function () {
        i++;
        if (i < list.length) {
            list[i-1].style.backgroundColor = 'white';
            list[i].style.backgroundColor = 'blue';
        }else{
            clearInterval(timer);
            list[i-1].style.backgroundColor = 'white';
        }},500);
}
//初始化背景色
    function settingStyle() {
        list = [];
        var divs = document.getElementsByTagName("div");
        for(var i = 0;i<divs.length;i++){
            divs[i].style.backgroundColor = "white";
        }
    }

window.onload = function () {
    //前序遍历绑定事件
    addEvent(document.getElementsByTagName("input")[0],"click",function () {

            settingStyle()
            preOrder(document.getElementById("tree"));
            changeColor();


    })
    //中序遍历事件
    addEvent(document.getElementsByTagName("input")[1],"click",function () {

            settingStyle();
            midOrder(document.getElementById("tree"));
            changeColor();

    })
    //后序遍历
    addEvent(document.getElementsByTagName("input")[2],"click",function () {

            settingStyle();
            backOrder(document.getElementById("tree"));
            changeColor();


    })
}
