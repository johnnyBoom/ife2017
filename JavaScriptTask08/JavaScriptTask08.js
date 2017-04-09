
var list = [];
var search=[];
var timer;

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


//开始遍历
function preOrder(node) {
    if(node){
        list.push(node);
        for(var i = 0;i<node.children.length;i++)
        {
            preOrder(node.children[i]);

        }
    }
}

//搜索
var tag = true;
function searchNode(tree, content) {

    var equal = (tree.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, "") === content);
    if (!equal && tag) {
        search.push(tree);
        for (var i = 0; i < tree.children.length; i++) {
            searchNode(tree.children[i], content);
        }
    } else if (equal) {
        search.push(tree);
        tag = false;
    }
}
//依次改变数组中元素背景色样式,搜索功能
function changeColor(divList,type) {
     var i = 0;
     divList[i].style.backgroundColor = "blue";
      timer =  setInterval(function () {
          i++;
          if (i < divList.length) {
              divList[i - 1].style.backgroundColor = 'white';
              divList[i].style.backgroundColor = 'blue';
          } else if (type === 1) {
              clearInterval(timer);
              divList[divList.length - 1].style.backgroundColor = "tomato";
          } else if (type === 2) {
              clearInterval(timer);
              divList[divList.length - 1].style.backgroundColor = "#fff";
          } else if (type === 3) {
              clearInterval(timer);
              divList[divList.length-1].style.backgroundColor = '#fff';
              alert('没查询到该搜索内容');
          }

      },500)
}
//初始化背景色
    function settingStyle() {
        list = [];
        var divs = document.getElementsByTagName("div");
        for(var i = 0;i<divs.length;i++){
            divs[i].style.backgroundColor = "white";
        }
        clearInterval(timer);
        search=[];
        tag = true;
    }

window.onload = function () {
    //开始遍历绑定事件
    addEvent(document.getElementsByTagName("input")[0],"click",function () {

            settingStyle();
            preOrder(document.getElementById("tree"));
            changeColor(list,2);
    })
    //查询绑定事件
    addEvent(document.getElementsByTagName("input")[2],"click",function () {
        settingStyle();
        var content = document.getElementsByTagName("input")[1].value;
        if(content === "")
        {
            alert("请填写内容！");
        }else{
            settingStyle();
            searchNode(document.getElementById("tree"),content);
            if(!tag)
            {
                changeColor(search,1);
            }else{
                changeColor(search,3);
            }
        }
    })

}
