define("gallery/ztree/3.5.2/core",["$"],function(require,exports,module){var jQuery=require("$");(function($){var settings={},roots={},caches={},_consts={event:{NODECREATED:"ztree_nodeCreated",CLICK:"ztree_click",EXPAND:"ztree_expand",COLLAPSE:"ztree_collapse",ASYNC_SUCCESS:"ztree_async_success",ASYNC_ERROR:"ztree_async_error"},id:{A:"_a",ICON:"_ico",SPAN:"_span",SWITCH:"_switch",UL:"_ul"},line:{ROOT:"root",ROOTS:"roots",CENTER:"center",BOTTOM:"bottom",NOLINE:"noline",LINE:"line"},folder:{OPEN:"open",CLOSE:"close",DOCU:"docu"},node:{CURSELECTED:"curSelectedNode"}},_setting={treeId:"",treeObj:null,view:{addDiyDom:null,autoCancelSelected:!0,dblClickExpand:!0,expandSpeed:"fast",fontCss:{},nameIsHTML:!1,selectedMulti:!0,showIcon:!0,showLine:!0,showTitle:!0},data:{key:{children:"children",name:"name",title:"",url:"url"},simpleData:{enable:!1,idKey:"id",pIdKey:"pId",rootPId:null},keep:{parent:!1,leaf:!1}},async:{enable:!1,contentType:"application/x-www-form-urlencoded",type:"post",dataType:"text",url:"",autoParam:[],otherParam:[],dataFilter:null},callback:{beforeAsync:null,beforeClick:null,beforeDblClick:null,beforeRightClick:null,beforeMouseDown:null,beforeMouseUp:null,beforeExpand:null,beforeCollapse:null,beforeRemove:null,onAsyncError:null,onAsyncSuccess:null,onNodeCreated:null,onClick:null,onDblClick:null,onRightClick:null,onMouseDown:null,onMouseUp:null,onExpand:null,onCollapse:null,onRemove:null}},_initRoot=function(a){var b=data.getRoot(a);b||(b={},data.setRoot(a,b)),b[a.data.key.children]=[],b.expandTriggerFlag=!1,b.curSelectedList=[],b.noSelection=!0,b.createdNodes=[],b.zId=0,b._ver=(new Date).getTime()},_initCache=function(a){var b=data.getCache(a);b||(b={},data.setCache(a,b)),b.nodes=[],b.doms=[]},_bindEvent=function(a){var b=a.treeObj,c=consts.event;b.bind(c.NODECREATED,function(b,c,d){tools.apply(a.callback.onNodeCreated,[b,c,d])}),b.bind(c.CLICK,function(b,c,d,e,f){tools.apply(a.callback.onClick,[c,d,e,f])}),b.bind(c.EXPAND,function(b,c,d){tools.apply(a.callback.onExpand,[b,c,d])}),b.bind(c.COLLAPSE,function(b,c,d){tools.apply(a.callback.onCollapse,[b,c,d])}),b.bind(c.ASYNC_SUCCESS,function(b,c,d,e){tools.apply(a.callback.onAsyncSuccess,[b,c,d,e])}),b.bind(c.ASYNC_ERROR,function(b,c,d,e,f,g){tools.apply(a.callback.onAsyncError,[b,c,d,e,f,g])})},_unbindEvent=function(a){var b=a.treeObj,c=consts.event;b.unbind(c.NODECREATED).unbind(c.CLICK).unbind(c.EXPAND).unbind(c.COLLAPSE).unbind(c.ASYNC_SUCCESS).unbind(c.ASYNC_ERROR)},_eventProxy=function(a){var b=a.target,c=data.getSetting(a.data.treeId),d="",e=null,f="",g="",h=null,i=null,j=null;if(tools.eqs(a.type,"mousedown")?g="mousedown":tools.eqs(a.type,"mouseup")?g="mouseup":tools.eqs(a.type,"contextmenu")?g="contextmenu":tools.eqs(a.type,"click")?tools.eqs(b.tagName,"span")&&null!==b.getAttribute("treeNode"+consts.id.SWITCH)?(d=($(b).parent("li").get(0)||$(b).parentsUntil("li").parent().get(0)).id,f="switchNode"):(j=tools.getMDom(c,b,[{tagName:"a",attrName:"treeNode"+consts.id.A}]),j&&(d=($(j).parent("li").get(0)||$(j).parentsUntil("li").parent().get(0)).id,f="clickNode")):tools.eqs(a.type,"dblclick")&&(g="dblclick",j=tools.getMDom(c,b,[{tagName:"a",attrName:"treeNode"+consts.id.A}]),j&&(d=($(j).parent("li").get(0)||$(j).parentsUntil("li").parent().get(0)).id,f="switchNode")),g.length>0&&0==d.length&&(j=tools.getMDom(c,b,[{tagName:"a",attrName:"treeNode"+consts.id.A}]),j&&(d=($(j).parent("li").get(0)||$(j).parentsUntil("li").parent().get(0)).id)),d.length>0)switch(e=data.getNodeCache(c,d),f){case"switchNode":e.isParent?tools.eqs(a.type,"click")||tools.eqs(a.type,"dblclick")&&tools.apply(c.view.dblClickExpand,[c.treeId,e],c.view.dblClickExpand)?h=handler.onSwitchNode:f="":f="";break;case"clickNode":h=handler.onClickNode}switch(g){case"mousedown":i=handler.onZTreeMousedown;break;case"mouseup":i=handler.onZTreeMouseup;break;case"dblclick":i=handler.onZTreeDblclick;break;case"contextmenu":i=handler.onZTreeContextmenu}var k={stop:!1,node:e,nodeEventType:f,nodeEventCallback:h,treeEventType:g,treeEventCallback:i};return k},_initNode=function(a,b,c,d,e,f){if(c){var h=data.getRoot(a),i=a.data.key.children;c.level=b,c.tId=a.treeId+"_"+ ++h.zId,c.parentTId=d?d.tId:null,c[i]&&c[i].length>0?("string"==typeof c.open&&(c.open=tools.eqs(c.open,"true")),c.open=!!c.open,c.isParent=!0,c.zAsync=!0):(c.open=!1,"string"==typeof c.isParent&&(c.isParent=tools.eqs(c.isParent,"true")),c.isParent=!!c.isParent,c.zAsync=!c.isParent),c.isFirstNode=e,c.isLastNode=f,c.getParentNode=function(){return data.getNodeCache(a,c.parentTId)},c.getPreNode=function(){return data.getPreNode(a,c)},c.getNextNode=function(){return data.getNextNode(a,c)},c.isAjaxing=!1,data.fixPIdKeyValue(a,c)}},_init={bind:[_bindEvent],unbind:[_unbindEvent],caches:[_initCache],nodes:[_initNode],proxys:[_eventProxy],roots:[_initRoot],beforeA:[],afterA:[],innerBeforeA:[],innerAfterA:[],zTreeTools:[]},data={addNodeCache:function(a,b){data.getCache(a).nodes[data.getNodeCacheId(b.tId)]=b},getNodeCacheId:function(a){return a.substring(a.lastIndexOf("_")+1)},addAfterA:function(a){_init.afterA.push(a)},addBeforeA:function(a){_init.beforeA.push(a)},addInnerAfterA:function(a){_init.innerAfterA.push(a)},addInnerBeforeA:function(a){_init.innerBeforeA.push(a)},addInitBind:function(a){_init.bind.push(a)},addInitUnBind:function(a){_init.unbind.push(a)},addInitCache:function(a){_init.caches.push(a)},addInitNode:function(a){_init.nodes.push(a)},addInitProxy:function(a){_init.proxys.push(a)},addInitRoot:function(a){_init.roots.push(a)},addNodesData:function(a,b,c){var d=a.data.key.children;b[d]||(b[d]=[]),b[d].length>0&&(b[d][b[d].length-1].isLastNode=!1,view.setNodeLineIcos(a,b[d][b[d].length-1])),b.isParent=!0,b[d]=b[d].concat(c)},addSelectedNode:function(a,b){var c=data.getRoot(a);data.isSelectedNode(a,b)||c.curSelectedList.push(b)},addCreatedNode:function(a,b){if(a.callback.onNodeCreated||a.view.addDiyDom){var c=data.getRoot(a);c.createdNodes.push(b)}},addZTreeTools:function(a){_init.zTreeTools.push(a)},exSetting:function(a){$.extend(!0,_setting,a)},fixPIdKeyValue:function(a,b){a.data.simpleData.enable&&(b[a.data.simpleData.pIdKey]=b.parentTId?b.getParentNode()[a.data.simpleData.idKey]:a.data.simpleData.rootPId)},getAfterA:function(){for(var d=0,e=_init.afterA.length;e>d;d++)_init.afterA[d].apply(this,arguments)},getBeforeA:function(){for(var d=0,e=_init.beforeA.length;e>d;d++)_init.beforeA[d].apply(this,arguments)},getInnerAfterA:function(){for(var d=0,e=_init.innerAfterA.length;e>d;d++)_init.innerAfterA[d].apply(this,arguments)},getInnerBeforeA:function(){for(var d=0,e=_init.innerBeforeA.length;e>d;d++)_init.innerBeforeA[d].apply(this,arguments)},getCache:function(a){return caches[a.treeId]},getNextNode:function(a,b){if(!b)return null;for(var c=a.data.key.children,d=b.parentTId?b.getParentNode():data.getRoot(a),e=0,f=d[c].length-1;f>=e;e++)if(d[c][e]===b)return e==f?null:d[c][e+1];return null},getNodeByParam:function(a,b,c,d){if(!b||!c)return null;for(var e=a.data.key.children,f=0,g=b.length;g>f;f++){if(b[f][c]==d)return b[f];var h=data.getNodeByParam(a,b[f][e],c,d);if(h)return h}return null},getNodeCache:function(a,b){if(!b)return null;var c=caches[a.treeId].nodes[data.getNodeCacheId(b)];return c?c:null},getNodeName:function(a,b){var c=a.data.key.name;return""+b[c]},getNodeTitle:function(a,b){var c=""===a.data.key.title?a.data.key.name:a.data.key.title;return""+b[c]},getNodes:function(a){return data.getRoot(a)[a.data.key.children]},getNodesByParam:function(a,b,c,d){if(!b||!c)return[];for(var e=a.data.key.children,f=[],g=0,h=b.length;h>g;g++)b[g][c]==d&&f.push(b[g]),f=f.concat(data.getNodesByParam(a,b[g][e],c,d));return f},getNodesByParamFuzzy:function(a,b,c,d){if(!b||!c)return[];for(var e=a.data.key.children,f=[],g=0,h=b.length;h>g;g++)"string"==typeof b[g][c]&&b[g][c].indexOf(d)>-1&&f.push(b[g]),f=f.concat(data.getNodesByParamFuzzy(a,b[g][e],c,d));return f},getNodesByFilter:function(a,b,c,d,e){if(!b)return d?null:[];for(var f=a.data.key.children,g=d?null:[],h=0,i=b.length;i>h;h++){if(tools.apply(c,[b[h],e],!1)){if(d)return b[h];g.push(b[h])}var j=data.getNodesByFilter(a,b[h][f],c,d,e);if(d&&j)return j;g=d?j:g.concat(j)}return g},getPreNode:function(a,b){if(!b)return null;for(var c=a.data.key.children,d=b.parentTId?b.getParentNode():data.getRoot(a),e=0,f=d[c].length;f>e;e++)if(d[c][e]===b)return 0==e?null:d[c][e-1];return null},getRoot:function(a){return a?roots[a.treeId]:null},getSetting:function(a){return settings[a]},getSettings:function(){return settings},getZTreeTools:function(a){var b=this.getRoot(this.getSetting(a));return b?b.treeTools:null},initCache:function(){for(var b=0,c=_init.caches.length;c>b;b++)_init.caches[b].apply(this,arguments)},initNode:function(){for(var g=0,h=_init.nodes.length;h>g;g++)_init.nodes[g].apply(this,arguments)},initRoot:function(){for(var b=0,c=_init.roots.length;c>b;b++)_init.roots[b].apply(this,arguments)},isSelectedNode:function(a,b){for(var c=data.getRoot(a),d=0,e=c.curSelectedList.length;e>d;d++)if(b===c.curSelectedList[d])return!0;return!1},removeNodeCache:function(a,b){var c=a.data.key.children;if(b[c])for(var d=0,e=b[c].length;e>d;d++)arguments.callee(a,b[c][d]);data.getCache(a).nodes[data.getNodeCacheId(b.tId)]=null},removeSelectedNode:function(a,b){for(var c=data.getRoot(a),d=0,e=c.curSelectedList.length;e>d;d++)b!==c.curSelectedList[d]&&data.getNodeCache(a,c.curSelectedList[d].tId)||(c.curSelectedList.splice(d,1),d--,e--)},setCache:function(a,b){caches[a.treeId]=b},setRoot:function(a,b){roots[a.treeId]=b},setZTreeTools:function(){for(var c=0,d=_init.zTreeTools.length;d>c;c++)_init.zTreeTools[c].apply(this,arguments)},transformToArrayFormat:function(a,b){if(!b)return[];var c=a.data.key.children,d=[];if(tools.isArray(b))for(var e=0,f=b.length;f>e;e++)d.push(b[e]),b[e][c]&&(d=d.concat(data.transformToArrayFormat(a,b[e][c])));else d.push(b),b[c]&&(d=d.concat(data.transformToArrayFormat(a,b[c])));return d},transformTozTreeFormat:function(a,b){var c,d,e=a.data.simpleData.idKey,f=a.data.simpleData.pIdKey,g=a.data.key.children;if(!e||""==e||!b)return[];if(tools.isArray(b)){var h=[],i=[];for(c=0,d=b.length;d>c;c++)i[b[c][e]]=b[c];for(c=0,d=b.length;d>c;c++)i[b[c][f]]&&b[c][e]!=b[c][f]?(i[b[c][f]][g]||(i[b[c][f]][g]=[]),i[b[c][f]][g].push(b[c])):h.push(b[c]);return h}return[b]}},event={bindEvent:function(){for(var b=0,c=_init.bind.length;c>b;b++)_init.bind[b].apply(this,arguments)},unbindEvent:function(){for(var b=0,c=_init.unbind.length;c>b;b++)_init.unbind[b].apply(this,arguments)},bindTree:function(a){var b={treeId:a.treeId},c=a.treeObj;c.bind("selectstart",function(a){var b=a.srcElement.nodeName.toLowerCase();return"input"===b||"textarea"===b}).css({"-moz-user-select":"-moz-none"}),c.bind("click",b,event.proxy),c.bind("dblclick",b,event.proxy),c.bind("mouseover",b,event.proxy),c.bind("mouseout",b,event.proxy),c.bind("mousedown",b,event.proxy),c.bind("mouseup",b,event.proxy),c.bind("contextmenu",b,event.proxy)},unbindTree:function(a){var b=a.treeObj;b.unbind("click",event.proxy).unbind("dblclick",event.proxy).unbind("mouseover",event.proxy).unbind("mouseout",event.proxy).unbind("mousedown",event.proxy).unbind("mouseup",event.proxy).unbind("contextmenu",event.proxy)},doProxy:function(){for(var b=[],c=0,d=_init.proxys.length;d>c;c++){var e=_init.proxys[c].apply(this,arguments);if(b.push(e),e.stop)break}return b},proxy:function(a){var b=data.getSetting(a.data.treeId);if(!tools.uCanDo(b,a))return!0;for(var c=event.doProxy(a),d=!0,e=!1,f=0,g=c.length;g>f;f++){var h=c[f];h.nodeEventCallback&&(e=!0,d=h.nodeEventCallback.apply(h,[a,h.node])&&d),h.treeEventCallback&&(e=!0,d=h.treeEventCallback.apply(h,[a,h.node])&&d)}return d}},handler={onSwitchNode:function(a,b){var c=data.getSetting(a.data.treeId);if(b.open){if(0==tools.apply(c.callback.beforeCollapse,[c.treeId,b],!0))return!0;data.getRoot(c).expandTriggerFlag=!0,view.switchNode(c,b)}else{if(0==tools.apply(c.callback.beforeExpand,[c.treeId,b],!0))return!0;data.getRoot(c).expandTriggerFlag=!0,view.switchNode(c,b)}return!0},onClickNode:function(a,b){var c=data.getSetting(a.data.treeId),d=c.view.autoCancelSelected&&a.ctrlKey&&data.isSelectedNode(c,b)?0:c.view.autoCancelSelected&&a.ctrlKey&&c.view.selectedMulti?2:1;return 0==tools.apply(c.callback.beforeClick,[c.treeId,b,d],!0)?!0:(0===d?view.cancelPreSelectedNode(c,b):view.selectNode(c,b,2===d),c.treeObj.trigger(consts.event.CLICK,[a,c.treeId,b,d]),!0)},onZTreeMousedown:function(a,b){var c=data.getSetting(a.data.treeId);return tools.apply(c.callback.beforeMouseDown,[c.treeId,b],!0)&&tools.apply(c.callback.onMouseDown,[a,c.treeId,b]),!0},onZTreeMouseup:function(a,b){var c=data.getSetting(a.data.treeId);return tools.apply(c.callback.beforeMouseUp,[c.treeId,b],!0)&&tools.apply(c.callback.onMouseUp,[a,c.treeId,b]),!0},onZTreeDblclick:function(a,b){var c=data.getSetting(a.data.treeId);return tools.apply(c.callback.beforeDblClick,[c.treeId,b],!0)&&tools.apply(c.callback.onDblClick,[a,c.treeId,b]),!0},onZTreeContextmenu:function(a,b){var c=data.getSetting(a.data.treeId);return tools.apply(c.callback.beforeRightClick,[c.treeId,b],!0)&&tools.apply(c.callback.onRightClick,[a,c.treeId,b]),"function"!=typeof c.callback.onRightClick}},tools={apply:function(a,b,c){return"function"==typeof a?a.apply(zt,b?b:[]):c},canAsync:function(a,b){var c=a.data.key.children;return a.async.enable&&b&&b.isParent&&!(b.zAsync||b[c]&&b[c].length>0)},clone:function(a){if(null===a)return null;var b=a.constructor===Array?[]:{};for(var c in a)b[c]=a[c]instanceof Date?new Date(a[c].getTime()):"object"==typeof a[c]?arguments.callee(a[c]):a[c];return b},eqs:function(a,b){return a.toLowerCase()===b.toLowerCase()},isArray:function(a){return"[object Array]"===Object.prototype.toString.apply(a)},getMDom:function(a,b,c){if(!b)return null;for(;b&&b.id!==a.treeId;){for(var d=0,e=c.length;b.tagName&&e>d;d++)if(tools.eqs(b.tagName,c[d].tagName)&&null!==b.getAttribute(c[d].attrName))return b;b=b.parentNode}return null},uCanDo:function(){return!0}},view={addNodes:function(a,b,c,d){if(!a.data.keep.leaf||!b||b.isParent)if(tools.isArray(c)||(c=[c]),a.data.simpleData.enable&&(c=data.transformTozTreeFormat(a,c)),b){var e=$("#"+b.tId+consts.id.SWITCH),f=$("#"+b.tId+consts.id.ICON),g=$("#"+b.tId+consts.id.UL);b.open||(view.replaceSwitchClass(b,e,consts.folder.CLOSE),view.replaceIcoClass(b,f,consts.folder.CLOSE),b.open=!1,g.css({display:"none"})),data.addNodesData(a,b,c),view.createNodes(a,b.level+1,c,b),d||view.expandCollapseParentNode(a,b,!0)}else data.addNodesData(a,data.getRoot(a),c),view.createNodes(a,0,c,null)},appendNodes:function(a,b,c,d,e,f){if(!c)return[];for(var g=[],h=a.data.key.children,i=0,j=c.length;j>i;i++){var k=c[i];if(e){var l=d?d:data.getRoot(a),m=l[h],n=m.length==c.length&&0==i,o=i==c.length-1;data.initNode(a,b,k,d,n,o,f),data.addNodeCache(a,k)}var p=[];k[h]&&k[h].length>0&&(p=view.appendNodes(a,b+1,k[h],k,e,f&&k.open)),f&&(view.makeDOMNodeMainBefore(g,a,k),view.makeDOMNodeLine(g,a,k),data.getBeforeA(a,k,g),view.makeDOMNodeNameBefore(g,a,k),data.getInnerBeforeA(a,k,g),view.makeDOMNodeIcon(g,a,k),data.getInnerAfterA(a,k,g),view.makeDOMNodeNameAfter(g,a,k),data.getAfterA(a,k,g),k.isParent&&k.open&&view.makeUlHtml(a,k,g,p.join("")),view.makeDOMNodeMainAfter(g,a,k),data.addCreatedNode(a,k))}return g},appendParentULDom:function(a,b){var c=[],d=$("#"+b.tId),e=$("#"+b.tId+consts.id.UL),f=a.data.key.children,g=view.appendNodes(a,b.level+1,b[f],b,!1,!0);view.makeUlHtml(a,b,c,g.join("")),!d.get(0)&&b.parentTId&&(view.appendParentULDom(a,b.getParentNode()),d=$("#"+b.tId)),e.get(0)&&e.remove(),d.append(c.join(""))},asyncNode:function(setting,node,isSilent,callback){var i,l;if(node&&!node.isParent)return tools.apply(callback),!1;if(node&&node.isAjaxing)return!1;if(0==tools.apply(setting.callback.beforeAsync,[setting.treeId,node],!0))return tools.apply(callback),!1;if(node){node.isAjaxing=!0;var icoObj=$("#"+node.tId+consts.id.ICON);icoObj.attr({style:"","class":"button ico_loading"})}var tmpParam={};for(i=0,l=setting.async.autoParam.length;node&&l>i;i++){var pKey=setting.async.autoParam[i].split("="),spKey=pKey;pKey.length>1&&(spKey=pKey[1],pKey=pKey[0]),tmpParam[spKey]=node[pKey]}if(tools.isArray(setting.async.otherParam))for(i=0,l=setting.async.otherParam.length;l>i;i+=2)tmpParam[setting.async.otherParam[i]]=setting.async.otherParam[i+1];else for(var p in setting.async.otherParam)tmpParam[p]=setting.async.otherParam[p];var _tmpV=data.getRoot(setting)._ver;return $.ajax({contentType:setting.async.contentType,type:setting.async.type,url:tools.apply(setting.async.url,[setting.treeId,node],setting.async.url),data:tmpParam,dataType:setting.async.dataType,success:function(msg){if(_tmpV==data.getRoot(setting)._ver){var newNodes=[];try{newNodes=msg&&0!=msg.length?"string"==typeof msg?eval("("+msg+")"):msg:[]}catch(err){newNodes=msg}node&&(node.isAjaxing=null,node.zAsync=!0),view.setNodeLineIcos(setting,node),newNodes&&""!==newNodes?(newNodes=tools.apply(setting.async.dataFilter,[setting.treeId,node,newNodes],newNodes),view.addNodes(setting,node,newNodes?tools.clone(newNodes):[],!!isSilent)):view.addNodes(setting,node,[],!!isSilent),setting.treeObj.trigger(consts.event.ASYNC_SUCCESS,[setting.treeId,node,msg]),tools.apply(callback)}},error:function(a,b,c){_tmpV==data.getRoot(setting)._ver&&(node&&(node.isAjaxing=null),view.setNodeLineIcos(setting,node),setting.treeObj.trigger(consts.event.ASYNC_ERROR,[setting.treeId,node,a,b,c]))}}),!0},cancelPreSelectedNode:function(a,b){for(var c=data.getRoot(a).curSelectedList,d=0,e=c.length-1;e>=d;e--)if((!b||b===c[e])&&($("#"+c[e].tId+consts.id.A).removeClass(consts.node.CURSELECTED),b)){data.removeSelectedNode(a,b);break}b||(data.getRoot(a).curSelectedList=[])},createNodeCallback:function(a){if(a.callback.onNodeCreated||a.view.addDiyDom)for(var b=data.getRoot(a);b.createdNodes.length>0;){var c=b.createdNodes.shift();tools.apply(a.view.addDiyDom,[a.treeId,c]),a.callback.onNodeCreated&&a.treeObj.trigger(consts.event.NODECREATED,[a.treeId,c])}},createNodes:function(a,b,c,d){if(c&&0!=c.length){var e=data.getRoot(a),f=a.data.key.children,g=!d||d.open||!!$("#"+d[f][0].tId).get(0);e.createdNodes=[];var h=view.appendNodes(a,b,c,d,!0,g);if(d){var i=$("#"+d.tId+consts.id.UL);i.get(0)&&i.append(h.join(""))}else a.treeObj.append(h.join(""));view.createNodeCallback(a)}},destroy:function(a){a&&(data.initCache(a),data.initRoot(a),event.unbindTree(a),event.unbindEvent(a),a.treeObj.empty())},expandCollapseNode:function(a,b,c,d,e){var f=data.getRoot(a),g=a.data.key.children;if(!b)return tools.apply(e,[]),void 0;if(f.expandTriggerFlag){var h=e;e=function(){h&&h(),b.open?a.treeObj.trigger(consts.event.EXPAND,[a.treeId,b]):a.treeObj.trigger(consts.event.COLLAPSE,[a.treeId,b])},f.expandTriggerFlag=!1}if(!b.open&&b.isParent&&(!$("#"+b.tId+consts.id.UL).get(0)||b[g]&&b[g].length>0&&!$("#"+b[g][0].tId).get(0))&&(view.appendParentULDom(a,b),view.createNodeCallback(a)),b.open==c)return tools.apply(e,[]),void 0;var i=$("#"+b.tId+consts.id.UL),j=$("#"+b.tId+consts.id.SWITCH),k=$("#"+b.tId+consts.id.ICON);b.isParent?(b.open=!b.open,b.iconOpen&&b.iconClose&&k.attr("style",view.makeNodeIcoStyle(a,b)),b.open?(view.replaceSwitchClass(b,j,consts.folder.OPEN),view.replaceIcoClass(b,k,consts.folder.OPEN),0==d||""==a.view.expandSpeed?(i.show(),tools.apply(e,[])):b[g]&&b[g].length>0?i.slideDown(a.view.expandSpeed,e):(i.show(),tools.apply(e,[]))):(view.replaceSwitchClass(b,j,consts.folder.CLOSE),view.replaceIcoClass(b,k,consts.folder.CLOSE),0!=d&&""!=a.view.expandSpeed&&b[g]&&b[g].length>0?i.slideUp(a.view.expandSpeed,e):(i.hide(),tools.apply(e,[])))):tools.apply(e,[])},expandCollapseParentNode:function(a,b,c,d,e){if(b){if(!b.parentTId)return view.expandCollapseNode(a,b,c,d,e),void 0;view.expandCollapseNode(a,b,c,d),b.parentTId&&view.expandCollapseParentNode(a,b.getParentNode(),c,d,e)}},expandCollapseSonNode:function(a,b,c,d,e){var f=data.getRoot(a),g=a.data.key.children,h=b?b[g]:f[g],i=b?!1:d,j=data.getRoot(a).expandTriggerFlag;if(data.getRoot(a).expandTriggerFlag=!1,h)for(var k=0,l=h.length;l>k;k++)h[k]&&view.expandCollapseSonNode(a,h[k],c,i);data.getRoot(a).expandTriggerFlag=j,view.expandCollapseNode(a,b,c,d,e)},makeDOMNodeIcon:function(a,b,c){var d=data.getNodeName(b,c),e=b.view.nameIsHTML?d:d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");a.push("<span id='",c.tId,consts.id.ICON,"' title='' treeNode",consts.id.ICON," class='",view.makeNodeIcoClass(b,c),"' style='",view.makeNodeIcoStyle(b,c),"'></span><span id='",c.tId,consts.id.SPAN,"'>",e,"</span>")},makeDOMNodeLine:function(a,b,c){a.push("<span id='",c.tId,consts.id.SWITCH,"' title='' class='",view.makeNodeLineClass(b,c),"' treeNode",consts.id.SWITCH,"></span>")},makeDOMNodeMainAfter:function(a){a.push("</li>")},makeDOMNodeMainBefore:function(a,b,c){a.push("<li id='",c.tId,"' class='level",c.level,"' tabindex='0' hidefocus='true' treenode>")},makeDOMNodeNameAfter:function(a){a.push("</a>")},makeDOMNodeNameBefore:function(a,b,c){var d=data.getNodeTitle(b,c),e=view.makeNodeUrl(b,c),f=view.makeNodeFontCss(b,c),g=[];for(var h in f)g.push(h,":",f[h],";");a.push("<a id='",c.tId,consts.id.A,"' class='level",c.level,"' treeNode",consts.id.A,' onclick="',c.click||"",'" ',null!=e&&e.length>0?"href='"+e+"'":""," target='",view.makeNodeTarget(c),"' style='",g.join(""),"'"),tools.apply(b.view.showTitle,[b.treeId,c],b.view.showTitle)&&d&&a.push("title='",d.replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"'"),a.push(">")},makeNodeFontCss:function(a,b){var c=tools.apply(a.view.fontCss,[a.treeId,b],a.view.fontCss);return c&&"function"!=typeof c?c:{}},makeNodeIcoClass:function(a,b){var c=["ico"];return b.isAjaxing||(c[0]=(b.iconSkin?b.iconSkin+"_":"")+c[0],b.isParent?c.push(b.open?consts.folder.OPEN:consts.folder.CLOSE):c.push(consts.folder.DOCU)),"button "+c.join("_")},makeNodeIcoStyle:function(a,b){var c=[];if(!b.isAjaxing){var d=b.isParent&&b.iconOpen&&b.iconClose?b.open?b.iconOpen:b.iconClose:b.icon;d&&c.push("background:url(",d,") 0 0 no-repeat;"),0!=a.view.showIcon&&tools.apply(a.view.showIcon,[a.treeId,b],!0)||c.push("width:0px;height:0px;")}return c.join("")},makeNodeLineClass:function(a,b){var c=[];return a.view.showLine?0==b.level&&b.isFirstNode&&b.isLastNode?c.push(consts.line.ROOT):0==b.level&&b.isFirstNode?c.push(consts.line.ROOTS):b.isLastNode?c.push(consts.line.BOTTOM):c.push(consts.line.CENTER):c.push(consts.line.NOLINE),b.isParent?c.push(b.open?consts.folder.OPEN:consts.folder.CLOSE):c.push(consts.folder.DOCU),view.makeNodeLineClassEx(b)+c.join("_")},makeNodeLineClassEx:function(a){return"button level"+a.level+" switch "},makeNodeTarget:function(a){return a.target||"_blank"},makeNodeUrl:function(a,b){var c=a.data.key.url;return b[c]?b[c]:null},makeUlHtml:function(a,b,c,d){c.push("<ul id='",b.tId,consts.id.UL,"' class='level",b.level," ",view.makeUlLineClass(a,b),"' style='display:",b.open?"block":"none","'>"),c.push(d),c.push("</ul>")},makeUlLineClass:function(a,b){return a.view.showLine&&!b.isLastNode?consts.line.LINE:""},removeChildNodes:function(a,b){if(b){var c=a.data.key.children,d=b[c];if(d){for(var e=0,f=d.length;f>e;e++)data.removeNodeCache(a,d[e]);if(data.removeSelectedNode(a),delete b[c],a.data.keep.parent)$("#"+b.tId+consts.id.UL).empty();else{b.isParent=!1,b.open=!1;var g=$("#"+b.tId+consts.id.SWITCH),h=$("#"+b.tId+consts.id.ICON);view.replaceSwitchClass(b,g,consts.folder.DOCU),view.replaceIcoClass(b,h,consts.folder.DOCU),$("#"+b.tId+consts.id.UL).remove()}}}},setFirstNode:function(a,b){var c=a.data.key.children,d=b[c].length;d>0&&(b[c][0].isFirstNode=!0)},setLastNode:function(a,b){var c=a.data.key.children,d=b[c].length;d>0&&(b[c][d-1].isLastNode=!0)},removeNode:function(a,b){var c=data.getRoot(a),d=a.data.key.children,e=b.parentTId?b.getParentNode():c;if(b.isFirstNode=!1,b.isLastNode=!1,b.getPreNode=function(){return null},b.getNextNode=function(){return null},data.getNodeCache(a,b.tId)){$("#"+b.tId).remove(),data.removeNodeCache(a,b),data.removeSelectedNode(a,b);for(var f=0,g=e[d].length;g>f;f++)if(e[d][f].tId==b.tId){e[d].splice(f,1);break}view.setFirstNode(a,e),view.setLastNode(a,e);var h,i,j,k=e[d].length;if(a.data.keep.parent||0!=k){if(a.view.showLine&&k>0){var l=e[d][k-1];if(h=$("#"+l.tId+consts.id.UL),i=$("#"+l.tId+consts.id.SWITCH),j=$("#"+l.tId+consts.id.ICON),e==c)if(1==e[d].length)view.replaceSwitchClass(l,i,consts.line.ROOT);else{var m=$("#"+e[d][0].tId+consts.id.SWITCH);view.replaceSwitchClass(e[d][0],m,consts.line.ROOTS),view.replaceSwitchClass(l,i,consts.line.BOTTOM)}else view.replaceSwitchClass(l,i,consts.line.BOTTOM);h.removeClass(consts.line.LINE)}}else e.isParent=!1,e.open=!1,h=$("#"+e.tId+consts.id.UL),i=$("#"+e.tId+consts.id.SWITCH),j=$("#"+e.tId+consts.id.ICON),view.replaceSwitchClass(e,i,consts.folder.DOCU),view.replaceIcoClass(e,j,consts.folder.DOCU),h.css("display","none")}},replaceIcoClass:function(a,b,c){if(b&&!a.isAjaxing){var d=b.attr("class");if(void 0!=d){var e=d.split("_");switch(c){case consts.folder.OPEN:case consts.folder.CLOSE:case consts.folder.DOCU:e[e.length-1]=c}b.attr("class",e.join("_"))}}},replaceSwitchClass:function(a,b,c){if(b){var d=b.attr("class");if(void 0!=d){var e=d.split("_");switch(c){case consts.line.ROOT:case consts.line.ROOTS:case consts.line.CENTER:case consts.line.BOTTOM:case consts.line.NOLINE:e[0]=view.makeNodeLineClassEx(a)+c;break;case consts.folder.OPEN:case consts.folder.CLOSE:case consts.folder.DOCU:e[1]=c}b.attr("class",e.join("_")),c!==consts.folder.DOCU?b.removeAttr("disabled"):b.attr("disabled","disabled")}}},selectNode:function(a,b,c){c||view.cancelPreSelectedNode(a),$("#"+b.tId+consts.id.A).addClass(consts.node.CURSELECTED),data.addSelectedNode(a,b)},setNodeFontCss:function(a,b){var c=$("#"+b.tId+consts.id.A),d=view.makeNodeFontCss(a,b);d&&c.css(d)},setNodeLineIcos:function(a,b){if(b){var c=$("#"+b.tId+consts.id.SWITCH),d=$("#"+b.tId+consts.id.UL),e=$("#"+b.tId+consts.id.ICON),f=view.makeUlLineClass(a,b);0==f.length?d.removeClass(consts.line.LINE):d.addClass(f),c.attr("class",view.makeNodeLineClass(a,b)),b.isParent?c.removeAttr("disabled"):c.attr("disabled","disabled"),e.removeAttr("style"),e.attr("style",view.makeNodeIcoStyle(a,b)),e.attr("class",view.makeNodeIcoClass(a,b))}},setNodeName:function(a,b){var c=data.getNodeTitle(a,b),d=$("#"+b.tId+consts.id.SPAN);if(d.empty(),a.view.nameIsHTML?d.html(data.getNodeName(a,b)):d.text(data.getNodeName(a,b)),tools.apply(a.view.showTitle,[a.treeId,b],a.view.showTitle)){var e=$("#"+b.tId+consts.id.A);e.attr("title",c?c:"")}},setNodeTarget:function(a){var b=$("#"+a.tId+consts.id.A);b.attr("target",view.makeNodeTarget(a))},setNodeUrl:function(a,b){var c=$("#"+b.tId+consts.id.A),d=view.makeNodeUrl(a,b);null==d||0==d.length?c.removeAttr("href"):c.attr("href",d)},switchNode:function(a,b){if(b.open||!tools.canAsync(a,b))view.expandCollapseNode(a,b,!b.open);else if(a.async.enable){if(!view.asyncNode(a,b))return view.expandCollapseNode(a,b,!b.open),void 0}else b&&view.expandCollapseNode(a,b,!b.open)}};$.fn.zTree={consts:_consts,_z:{tools:tools,view:view,event:event,data:data},getZTreeObj:function(a){var b=data.getZTreeTools(a);return b?b:null},destroy:function(a){if(a&&a.length>0)view.destroy(data.getSetting(a));else for(var b in settings)view.destroy(settings[b])},init:function(a,b,c){var d=tools.clone(_setting);$.extend(!0,d,b),d.treeId=a.attr("id"),d.treeObj=a,d.treeObj.empty(),settings[d.treeId]=d,document.body.style.maxHeight===void 0&&(d.view.expandSpeed=""),data.initRoot(d);var e=data.getRoot(d),f=d.data.key.children;c=c?tools.clone(tools.isArray(c)?c:[c]):[],e[f]=d.data.simpleData.enable?data.transformTozTreeFormat(d,c):c,data.initCache(d),event.unbindTree(d),event.bindTree(d),event.unbindEvent(d),event.bindEvent(d);var g={setting:d,addNodes:function(a,b,c){function f(){view.addNodes(d,a,e,1==c)}if(!b)return null;if(a||(a=null),a&&!a.isParent&&d.data.keep.leaf)return null;var e=tools.clone(tools.isArray(b)?b:[b]);return tools.canAsync(d,a)?view.asyncNode(d,a,c,f):f(),e},cancelSelectedNode:function(a){view.cancelPreSelectedNode(this.setting,a)},destroy:function(){view.destroy(this.setting)},expandAll:function(a){return a=!!a,view.expandCollapseSonNode(this.setting,null,a,!0),a},expandNode:function(a,b,c,e,f){if(!a||!a.isParent)return null;if(b!==!0&&b!==!1&&(b=!a.open),f=!!f,f&&b&&0==tools.apply(d.callback.beforeExpand,[d.treeId,a],!0))return null;if(f&&!b&&0==tools.apply(d.callback.beforeCollapse,[d.treeId,a],!0))return null;if(b&&a.parentTId&&view.expandCollapseParentNode(this.setting,a.getParentNode(),b,!1),b===a.open&&!c)return null;if(data.getRoot(d).expandTriggerFlag=f,c)view.expandCollapseSonNode(this.setting,a,b,!0,function(){if(e!==!1)try{$("#"+a.tId).focus().blur()}catch(b){}});else if(a.open=!b,view.switchNode(this.setting,a),e!==!1)try{$("#"+a.tId).focus().blur()}catch(g){}return b},getNodes:function(){return data.getNodes(this.setting)},getNodeByParam:function(a,b,c){return a?data.getNodeByParam(this.setting,c?c[this.setting.data.key.children]:data.getNodes(this.setting),a,b):null},getNodeByTId:function(a){return data.getNodeCache(this.setting,a)},getNodesByParam:function(a,b,c){return a?data.getNodesByParam(this.setting,c?c[this.setting.data.key.children]:data.getNodes(this.setting),a,b):null},getNodesByParamFuzzy:function(a,b,c){return a?data.getNodesByParamFuzzy(this.setting,c?c[this.setting.data.key.children]:data.getNodes(this.setting),a,b):null},getNodesByFilter:function(a,b,c,d){return b=!!b,a&&"function"==typeof a?data.getNodesByFilter(this.setting,c?c[this.setting.data.key.children]:data.getNodes(this.setting),a,b,d):b?null:[]},getNodeIndex:function(a){if(!a)return null;for(var b=d.data.key.children,c=a.parentTId?a.getParentNode():data.getRoot(this.setting),e=0,f=c[b].length;f>e;e++)if(c[b][e]==a)return e;return-1},getSelectedNodes:function(){for(var a=[],b=data.getRoot(this.setting).curSelectedList,c=0,d=b.length;d>c;c++)a.push(b[c]);return a},isSelectedNode:function(a){return data.isSelectedNode(this.setting,a)},reAsyncChildNodes:function(a,b,c){if(this.setting.async.enable){var e=!a;if(e&&(a=data.getRoot(this.setting)),"refresh"==b){for(var f=this.setting.data.key.children,g=0,h=a[f]?a[f].length:0;h>g;g++)data.removeNodeCache(d,a[f][g]);if(data.removeSelectedNode(d),a[f]=[],e)this.setting.treeObj.empty();else{var i=$("#"+a.tId+consts.id.UL);i.empty()}}view.asyncNode(this.setting,e?null:a,!!c)}},refresh:function(){this.setting.treeObj.empty();var a=data.getRoot(this.setting),b=a[this.setting.data.key.children];data.initRoot(this.setting),a[this.setting.data.key.children]=b,data.initCache(this.setting),view.createNodes(this.setting,0,a[this.setting.data.key.children])},removeChildNodes:function(a){if(!a)return null;var b=d.data.key.children,c=a[b];return view.removeChildNodes(d,a),c?c:null},removeNode:function(a,b){a&&(b=!!b,b&&0==tools.apply(d.callback.beforeRemove,[d.treeId,a],!0)||(view.removeNode(d,a),b&&this.setting.treeObj.trigger(consts.event.REMOVE,[d.treeId,a])))},selectNode:function(a,b){if(a&&tools.uCanDo(this.setting)){if(b=d.view.selectedMulti&&b,a.parentTId)view.expandCollapseParentNode(this.setting,a.getParentNode(),!0,!1,function(){try{$("#"+a.tId).focus().blur()}catch(b){}});else try{$("#"+a.tId).focus().blur()}catch(c){}view.selectNode(this.setting,a,b)}},transformTozTreeNodes:function(a){return data.transformTozTreeFormat(this.setting,a)},transformToArray:function(a){return data.transformToArrayFormat(this.setting,a)},updateNode:function(a){if(a){var c=$("#"+a.tId);c.get(0)&&tools.uCanDo(this.setting)&&(view.setNodeName(this.setting,a),view.setNodeTarget(a),view.setNodeUrl(this.setting,a),view.setNodeLineIcos(this.setting,a),view.setNodeFontCss(this.setting,a))}}};return e.treeTools=g,data.setZTreeTools(d,g),e[f]&&e[f].length>0?view.createNodes(d,0,e[f]):d.async.enable&&d.async.url&&""!==d.async.url&&view.asyncNode(d),g}};var zt=$.fn.zTree,consts=zt.consts})(jQuery)});