webpackJsonp([1],{"6S3J":function(t,e){},ALLR:function(t,e){},"G/3p":function(t,e){},G2Oa:function(t,e){},GwAu:function(t,e){},Hr5C:function(t,e){},NHnr:function(t,e,a){"use strict";function i(t){a("oNXm")}function n(t){a("hhD2")}function s(t){a("G2Oa")}function o(t){a("VgBD")}function r(t){a("GwAu")}function l(t){a("Ytyn")}function c(t){a("khom")}function d(t){a("6S3J")}function u(t){a("G/3p")}function f(t){a("ALLR")}function m(t){a("oDh2")}function h(){var t=document.querySelector("#footer"),e=t.getBoundingClientRect().height,a=document.querySelector("#table"),i=a.getBoundingClientRect().height,n=document.querySelector("#upload"),s=n.childNodes[0].childNodes[0].childNodes[0];s.style.top=window.innerHeight/2+"px",window.addEventListener("scroll",Me.a.throttle(function(){window.scrollY+window.innerHeight>=document.body.clientHeight-e?s.style.top=window.innerHeight/8+"px":window.scrollY<i&&(s.style.top=window.innerHeight/2+"px")},500,{leading:!0,trailing:!0}))}function p(t){a("Hr5C")}Object.defineProperty(e,"__esModule",{value:!0});var v=a("/5sW"),_=a("3EgV"),b=a.n(_),g=(a("QCv7"),a("NYxO")),x=a("Sazm"),y={namespaced:!0,state:function(){return{fileInfo:null}},mutations:{setFileInfo:function(t,e){t.fileInfo=e}},actions:{checkIfFileExists:function(t,e){var a=t.dispatch,i=t.commit,n=t.rootGetters;console.log("Checking..."),n["table/items"].find(function(t){return t.name===e.name})?(a("table/displayAlertInfo",{show:!0,message:"Same file already exists",color:"warning"},{root:!0}),i("setFileInfo",{name:"File Already Exist",type:"",size:"",date:""}),console.log("File already exists!")):a("setUploadFileInfo",e)},handleUpload:function(t,e){var a=t.commit,i=t.dispatch;a("shared/setLoading",!0,{root:!0}),Object(x.database)().ref("files").push(e).then(function(t){e.id=t.key,a("table/addFile",e,{root:!0}),a("shared/setLoading",!1,{root:!0})}).catch(function(t){a("shared/setLoading",!1,{root:!0}),console.log(t)}),i("table/displayAlertInfo",{show:!0,message:"Upload succesfull",color:"success"},{root:!0}),i("notifications/updateNotifications",null,{root:!0}),console.log("Ok... File Added!")},setUploadFileInfo:function(t,e){(0,t.commit)("setFileInfo",e)}},getters:{fileInfo:function(t){return null===t.fileInfo?{name:"",type:"",size:""}:t.fileInfo}}},w={namespaced:!0,state:function(){return{items:[],count:8,loadNum:8,searchText:"",showDialog:!1,currentItem:null,currentIndex:null,displayAlert:!1,alertMessage:"",alertColor:"info"}},mutations:{setLoadedItems:function(t,e){t.items=e},searchText:function(t,e){t.searchText=e},addFile:function(t,e){t.items.unshift(e)},setCount:function(t){t.count+=t.loadNum},showDialog:function(t,e){t.showDialog=e},deleteItem:function(t,e){t.items.splice(e,1)},currentItem:function(t,e){t.currentItem=e},currentIndex:function(t,e){t.currentIndex=e},displayAlert:function(t,e){t.displayAlert=e.show,t.alertMessage=e.message,t.alertColor=e.color},resetAlert:function(t){t.displayAlert=!1,t.alertMessage="",t.alertColor=""}},actions:{loadItems:function(t){var e=t.commit;e("shared/setLoading",!0,{root:!0}),Object(x.database)().ref("files").once("value").then(function(t){var a=[],i=t.val();for(var n in i)a.push({id:n,name:i[n].name,type:i[n].type,size:i[n].size,date:i[n].date});e("setLoadedItems",a),e("shared/setLoading",!1,{root:!0})}).catch(function(t){e("shared/setLoading",!1,{root:!0}),console.log(t)})},setSearchText:function(t,e){(0,t.commit)("searchText",e)},saveEditedName:function(t,e){t.commit;console.log(e),Object(x.database)().ref("files").child(e.id).update({name:e.name})},readyToDelete:function(t,e){var a=t.commit,i=t.dispatch;a("currentItem",e.item),a("currentIndex",e.index),i("showDialog",!0)},clearCurrent:function(t){var e=t.commit,a=t.dispatch;e("currentItem",null),e("currentIndex",null),a("showDialog",!1)},showDialog:function(t,e){(0,t.commit)("showDialog",e)},deleteItem:function(t){var e=t.state,a=t.commit,i=t.dispatch;a("shared/setLoading",!0,{root:!0}),Object(x.database)().ref("files").child(e.currentItem.id).remove().then(function(t){a("shared/setLoading",!1,{root:!0})}).catch(function(t){a("shared/setLoading",!1,{root:!0}),console.log(t)}),a("deleteItem",e.currentIndex),i("showDialog",!1),i("displayAlertInfo",{show:!0,message:"File deleted",color:"error"})},displayAlertInfo:function(t,e){var a=t.commit,i=t.dispatch;a("displayAlert",e),setTimeout(function(){i("resetAlert")},3e3)},resetAlert:function(t){(0,t.commit)("resetAlert")},loadMore:function(t){(0,t.commit)("setCount")}},getters:{items:function(t){return t.items.sort(function(t,e){return t=new Date(t.date),e=new Date(e.date),t>e?-1:t<e?1:0})},count:function(t){return t.count},displayItems:function(t){return t.items.slice(0,t.count)},searchText:function(t){return t.searchText},searchedItems:function(t,e){if(t.searchText){var a=new RegExp(t.searchText.trim().toLowerCase().replace(/\s+/g,"|"));return e.displayItems.filter(function(t){return-1!==t.name.toLowerCase().search(a)||-1!==t.type.toLowerCase().search(a)||-1!==t.size.toLowerCase().search(a)||-1!==t.date.toLowerCase().search(a)})}return e.displayItems},currentItemName:function(t){return t.currentItem?t.currentItem.name:null},currentIndex:function(t){return t.currentIndex},showDialog:function(t){return t.showDialog},alert:function(t){return{show:t.displayAlert,message:t.alertMessage,color:t.alertColor}}}},C={namespaced:!0,state:function(){return{showNotification:!1,notificationCount:0}},mutations:{updateNotifications:function(t){t.notificationCount+=1,t.showNotification=!0},clearNotifications:function(t){t.notificationCount=0,t.showNotification=!1}},actions:{updateNotifications:function(t){(0,t.commit)("updateNotifications")},clearNotifications:function(t){(0,t.commit)("clearNotifications")}},getters:{showNotification:function(t){return t.showNotification},notificationCount:function(t){return t.notificationCount}}},I={namespaced:!0,state:{loading:!1},mutations:{setLoading:function(t,e){t.loading=e}},getters:{loading:function(t){return t.loading}}};v.a.use(g.a);var k=new g.a.Store({modules:{upload:y,table:w,notifications:C,shared:I}}),D=a("Dd8w"),N=a.n(D),F={computed:N()({},Object(g.c)("notifications",["showNotification","notificationCount"])),watch:{notificationCount:function(t){var e=new Audio("static/plucky.mp3");0!==this.notificationCount&&e.play()}},methods:N()({},Object(g.b)("notifications",["clearNotifications"]))},T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header__nav-stats"},[a("v-chip",{staticClass:"white--text body-2 mt-3 mb-0",attrs:{color:"transparent"}},[a("v-icon",{attrs:{left:"",dark:""}},[t._v("\n      notifications\n    ")]),t._v(" "),a("v-badge",{staticClass:"header__notification",attrs:{color:"red"},nativeOn:{click:function(e){t.clearNotifications(e)}}},[t.showNotification?a("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.notificationCount))]):t._e(),t._v(" "),a("span",[t._v("Notifications")]),t._v(" "),t.showNotification?a("p",{staticClass:"header__tooltip"},[t._v("You have a new file "),a("br"),t._v(" on the top of the list!")]):t._e()])],1),t._v(" "),a("v-chip",{staticClass:"white--text body-2 mb-2 mt-0",attrs:{color:"transparent"}},[a("v-avatar",[a("img",{attrs:{src:"static/zeljko.png",alt:"zeljko"}})]),t._v("\n    Olah Zeljko\n  ")],1)],1)},E=[],z={render:T,staticRenderFns:E},S=z,A=a("VU/8"),L=i,U=A(F,S,!1,L,"data-v-2e1cbefd",null),$=U.exports,M={components:{Notifications:$}},j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-toolbar",{staticClass:"light-blue lighten-1 elevation-1",attrs:{fixed:"",height:"80px",dark:""}},[a("v-spacer"),t._v(" "),a("img",{staticClass:"header__logo",attrs:{src:"static/cloud.png",alt:""}}),t._v(" "),a("v-toolbar-title",{staticClass:"display-1 mb-1 hidden-sm-and-down"},[t._v("\n    Happy Cloud\n  ")]),t._v(" "),a("v-spacer"),t._v(" "),a("v-spacer"),t._v(" "),a("notifications"),t._v(" "),a("v-spacer")],1)},R=[],O={render:j,staticRenderFns:R},B=O,V=a("VU/8"),P=n,H=V(M,B,!1,P,"data-v-71c96b91",null),Y=H.exports,G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",[a("v-flex",{attrs:{xs12:"",sm8:"",lg6:"","offset-sm2":"","offset-lg3":""}},[a("v-jumbotron",{staticClass:"mt-5",attrs:{height:"300px",color:"white"}},[a("v-container",{attrs:{"fill-height":""}},[a("v-layout",{attrs:{"align-center":""}},[a("v-flex",{staticClass:"text-xs-center"},[a("h2",{staticClass:"jumbotron__heading display-2 text-xs-center light-blue--text mb-4"},[t._v("EASY, FAST AND SAFE")]),t._v(" "),a("span",{staticClass:"jumbotron__subheading"},[t._v("Upload your music, documents, power point presentations and pdf!")]),t._v(" "),a("div",{staticClass:"jumbotron__description"},[t._v("(*.mp3, *.doc, *.ppt, *.pdf)")])])],1)],1)],1)],1)],1)],1)},q=[],J={render:G,staticRenderFns:q},W=J,Q=a("VU/8"),K=s,X=Q(null,W,!1,K,null,null),Z=X.exports,tt={computed:{name:function(){return this.$store.getters["upload/fileInfo"].name},type:function(){return this.$store.getters["upload/fileInfo"].type},size:function(){return this.$store.getters["upload/fileInfo"].size}}},et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card-title",{staticClass:"light-blue lighten-1 upload__headline white--text"},[a("h2",[t._v("Upload Files")]),t._v(" "),a("v-spacer"),t._v(" "),a("v-icon",{attrs:{dark:"",medium:""}},[t._v("file_upload")])],1),t._v(" "),a("v-card-text",{staticClass:"upload__text grey--text"},[a("p",{attrs:{title:t.name}},[t._v("\n      Name:\n      "),a("span",[a("strong",[t._v(t._s(t._f("allowedNameLength")(t.name)))])])]),t._v(" "),a("p",[t._v("Type:\n      "),a("span",[a("strong",[t._v(t._s(t.type))])])]),t._v(" "),a("p",[t._v("Size:\n      "),0!=t.size?a("span",[a("strong",[t._v(t._s(t.size))])]):t._e()])])],1)},at=[],it={render:et,staticRenderFns:at},nt=it,st=a("VU/8"),ot=o,rt=st(tt,nt,!1,ot,null,null),lt=rt.exports,ct=a("9qgI"),dt=a.n(ct),ut={props:["animatedElement"],data:function(){return{fileName:"",fileSize:"",fileType:"",fileDate:null,fileInfo:{},addFileDisabled:!1,uploadDisabled:!0,deleteDisabled:!0,playDisabled:!0,pauseDisabled:!0,animationDuration:1e3}},computed:{checkFileType:function(){if("doc"!==this.fileType&&"mp3"!==this.fileType&&"ppt"!==this.fileType&&"pdf"!==this.fileType){var t=this.fileType;return this.resetForm(),this.fileName="."+t+" is not supported!",this.uploadDisabled=!0,!1}return!0},fileNameInformation:function(){return this.$store.getters["upload/fileInfo"].name}},methods:{resetForm:function(){this.fileName="",this.fileSize="",this.fileType="",this.fileDate=null,this.$refs.formDom.reset(),this.addFileDisabled=!1,this.uploadDisabled=!0,this.deleteDisabled=!0,this.playDisabled=!0,this.pauseDisabled=!0,this.$store.dispatch("upload/setUploadFileInfo",{name:"",type:"",size:"",date:""}),console.log("Form Cleared Succesfully"),this.animatedElement&&(this.animatedElement.style.width=0,dt()(this.animatedElement,"stop"))},onPickFile:function(){this.$refs.fileInput.click()},onFilePicked:function(t){var e=t.target.files[0];return this.fileType=e.name.split(".").pop(),this.checkFileType?(this.fileName=e.name.replace(/\.[^\/.]+$/,""),this.animationDuration=e.size/5e3,this.fileSize=this.$options.filters.formatSize(e.size),this.fileDate=(new Date).toISOString(),this.fileInfo={name:this.fileName,type:this.fileType,size:this.fileSize,date:this.fileDate},this.$store.dispatch("upload/checkIfFileExists",this.fileInfo),this.addFileDisabled=!0,this.uploadDisabled=!1,this.deleteDisabled=!1,"File Already Exist"===this.fileNameInformation?(this.resetForm(),void this.$store.dispatch("upload/setUploadFileInfo",{name:"File Already Exist",type:"",size:"",date:""})):void console.log("File Added for Upload!")):(this.$store.dispatch("upload/setUploadFileInfo",{name:"File type not supported!",type:"",size:"",date:""}),!1)},uploadFile:function(){this.pauseDisabled=!1,this.uploadDisabled=!0,this.deleteDisabled=!1,console.log("Upload Process Started!"),this.animateProgress()},animateProgress:function(){console.log("Progress Animation Started!");var t=this;dt()(this.animatedElement,{width:"100%"},{duration:this.animationDuration,complete:function(){setTimeout(function(){t.animatedElement.style.width=0,t.pauseDisabled=t.deleteDisabled=!0,t.addFileDisabled=!1,t.resetForm(),t.$store.dispatch("upload/handleUpload",t.fileInfo)},1e3)}})},play:function(){console.log("File Upload Resumed!"),this.playDisabled=!0,this.pauseDisabled=!1,dt()(this.animatedElement,"resume")},pause:function(){this.playDisabled=!1,this.pauseDisabled=!0,console.log("Upload Transfer Paused!"),dt()(this.animatedElement,"pause")}}},ft=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card-actions",[a("form",{ref:"formDom",on:{submit:function(e){e.preventDefault(),t.uploadFile(e)}}},[a("div",{staticClass:"text-xs-center",attrs:{id:"buttons"}},[a("v-btn",{staticClass:"upload__button",attrs:{fab:"",dark:"",color:"amber lighten-2",disabled:t.addFileDisabled},on:{click:t.onPickFile}},[a("v-icon",{staticClass:"upload__button-icon",attrs:{large:""}},[t._v("add")])],1),t._v(" "),a("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"*"},on:{change:t.onFilePicked}}),t._v(" "),a("v-btn",{staticClass:"upload__button",attrs:{fab:"",dark:"",color:"green lighten-3",disabled:t.uploadDisabled},on:{click:t.uploadFile}},[a("v-icon",{staticClass:"upload__button-icon",attrs:{dark:"",large:""}},[t._v("cloud_upload")])],1),t._v(" "),a("v-btn",{staticClass:"upload__button",attrs:{fab:"",dark:"",color:"red lighten-3",disabled:t.deleteDisabled},on:{click:t.resetForm}},[a("v-icon",{staticClass:"upload__button-icon",attrs:{dark:"",large:""}},[t._v("do_not_disturb_alt")])],1),t._v(" "),a("v-btn",{staticClass:"upload__button",attrs:{fab:"",dark:"",color:"green lighten-3",disabled:t.playDisabled},on:{click:t.play}},[a("v-icon",{staticClass:"upload__button-icon",attrs:{dark:"",large:""}},[t._v("play_arrow")])],1),t._v(" "),a("v-btn",{staticClass:"upload__button",attrs:{fab:"",dark:"",color:"deep-purple lighten-3",disabled:t.pauseDisabled},on:{click:t.pause}},[a("v-icon",{staticClass:"upload__button-icon",attrs:{dark:"",large:""}},[t._v("pause")])],1)],1)])])},mt=[],ht={render:ft,staticRenderFns:mt},pt=ht,vt=a("VU/8"),_t=r,bt=vt(ut,pt,!1,_t,null,null),gt=bt.exports,xt={components:{UploadInfo:lt,ControlButtons:gt},data:function(){return{animatedElement:null}},mounted:function(){this.animatedElement=this.$refs.progress.$el.childNodes[0].nextSibling.childNodes[1]}},yt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",[a("v-flex",{attrs:{sm12:""}},[a("v-card",{staticClass:"upload elevation-4"},[a("upload-info"),t._v(" "),a("v-progress-linear",{ref:"progress",staticClass:"upload__progress",attrs:{height:"13",color:"warning","background-color":"grey lighten-2"}}),t._v(" "),a("control-buttons",{attrs:{animatedElement:t.animatedElement}})],1)],1)],1)],1)},wt=[],Ct={render:yt,staticRenderFns:wt},It=Ct,kt=a("VU/8"),Dt=l,Nt=kt(xt,It,!1,Dt,null,null),Ft=Nt.exports,Tt={data:function(){return{searchText:"",lastSearch:""}},methods:N()({},Object(g.b)("table",["setSearchText"]),{clearText:function(){this.lastSearch=this.searchText,this.searchText=""}})},Et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[a("div",{staticClass:"table-search"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"table-search__input",attrs:{type:"text",id:"user"},domProps:{value:t.searchText},on:{focus:function(e){t.searchText=t.lastSearch},blur:t.clearText,keyup:[function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key))return null;t.clearText(e)},function(e){t.setSearchText(t.searchText)}],input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),t._v(" "),a("label",{staticClass:"table-search__label",attrs:{for:"user"}},[t._v("Search")])])])],1)],1)},zt=[],St={render:Et,staticRenderFns:zt},At=St,Lt=a("VU/8"),Ut=c,$t=Lt(Tt,At,!1,Ut,null,null),Mt=$t.exports,jt={computed:N()({},Object(g.c)("table",["alert"]))},Rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"fade"}},[t.alert.show?a("v-alert",{attrs:{color:t.alert.color,outline:"",icon:"info",value:"true"}},[t._v("\n    "+t._s(t.alert.message)+"\n  ")]):t._e()],1)},Ot=[],Bt={render:Rt,staticRenderFns:Ot},Vt=Bt,Pt=a("VU/8"),Ht=d,Yt=Pt(jt,Vt,!1,Ht,null,null),Gt=Yt.exports,qt={data:function(){return{editName:"",editMode:!1}},props:["item","index"],methods:N()({},Object(g.b)("table",["displayAlertInfo","readyToDelete","saveEditedName"]),{prependIcons:function(t){switch(t){case"mp3":return"fa-music";case"ppt":return"fa-file-powerpoint-o";case"doc":return"fa-file-text-o";case"pdf":return"fa-file-pdf-o"}},showEditMode:function(t){var e=this;this.editName=t.name,this.editMode=!0,this.$nextTick(function(){return e.$refs.editInput.focus()})},saveEdit:function(t){t.name!==this.editName.trim()&&(t.name=this.editName,this.saveEditedName(t),this.editMode=!1,this.displayAlertInfo({show:!0,message:"File name updated",color:"success"}))}})},Jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticClass:"items-table__tr"},[a("td",{staticClass:"items-table__td text-xs-center"},[a("i",{staticClass:"fa fa-edit items-table__icon info--text",on:{click:function(e){e.stopPropagation(),t.showEditMode(t.item)}}})]),t._v(" "),a("td",{staticClass:"items-table__td items-table__td--name"},[a("div",{staticClass:"items-table__td--wrap"},[a("transition",{attrs:{appear:"",name:"fade",mode:"out-in"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:!t.editMode,expression:"!editMode"}],staticClass:"items-table__td--noedit",attrs:{title:t.item.name}},[t._v(t._s(t._f("allowedNameLength")(t.item.name,28)))])]),t._v(" "),a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("input",{directives:[{name:"show",rawName:"v-show",value:t.editMode,expression:"editMode"},{name:"model",rawName:"v-model",value:t.editName,expression:"editName"}],ref:"editInput",staticClass:"items-table__td--edit light-blue lighten-4",attrs:{type:"text"},domProps:{value:t.editName},on:{keyup:[function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.saveEdit(t.item)},function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key))return null;t.editMode=!1}],blur:function(e){t.editMode=!1},input:function(e){e.target.composing||(t.editName=e.target.value)}}})])],1)]),t._v(" "),a("td",{staticClass:"items-table__td items-table__td--type text-xs-right"},[a("i",{staticClass:"fa",class:t.prependIcons(t.item.type)}),t._v("\n   "+t._s(t.item.type)+"\n  ")]),t._v(" "),a("td",{staticClass:"items-table__td text-xs-right"},[t._v(t._s(t.item.size))]),t._v(" "),a("td",{staticClass:"items-table__td text-xs-right"},[t._v(t._s(t._f("formatDate")(t.item.date)))]),t._v(" "),a("td",{staticClass:"items-table__td text-xs-center"},[a("i",{staticClass:"fa fa-remove items-table__icon red--text",on:{click:function(e){e.stopPropagation(),t.readyToDelete({item:t.item,index:t.index})}}})])])},Wt=[],Qt={render:Jt,staticRenderFns:Wt},Kt=Qt,Xt=a("VU/8"),Zt=u,te=Xt(qt,Kt,!1,Zt,null,null),ee=te.exports,ae={components:{TableItem:ee},data:function(){return{scrollToLoadMoreButton:{el:"#tableScrollToBottom",container:"body",duration:700,easing:"ease",offset:-200},filteredItems:[],prefix:1}},computed:N()({},Object(g.c)("table",["searchedItems","items","displayItems"]),{noMoreResults:function(){return 0===this.items.length||this.displayItems.length===this.items.length&&!!this.items.length}}),watch:{searchedItems:function(t){this.filteredItems=this.searchedItems}},methods:{loadMore:function(){console.log(!!this.items.length),this.$store.dispatch("table/loadMore")},sortByName:function(){var t=this;this.filteredItems=this.searchedItems.sort(function(e,a){var i=e.name.toUpperCase(),n=a.name.toUpperCase();return i<n?-1*t.prefix:i>n?1*t.prefix:0}),this.change(this.prefix)},sortBySize:function(){var t=this;this.filteredItems=this.searchedItems.sort(function(e,a){return(parseFloat(e.size)-parseFloat(a.size))*t.prefix}),this.change(this.prefix)},sortByDate:function(){var t=this;this.filteredItems=this.searchedItems.sort(function(e,a){return(new Date(e.date).getTime()-new Date(a.date).getTime())*t.prefix}),this.change(this.prefix)},change:function(t){t=1===t?-1:1,this.prefix=t}},mounted:function(){this.filteredItems=this.searchedItems}},ie=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card-text",[t.items?a("table",{staticClass:"items-table"},[a("thead",{staticClass:"items-table__head"},[a("th",{staticClass:"items-table__th"},[a("i",{staticClass:"fa fa-edit info--text text-xs-left"})]),t._v(" "),a("th",{staticClass:"items-table__th text-xs-left",on:{click:t.sortByName}},[t._v("\n          Name\n          "),a("i",{staticClass:"fa fa-sort"})]),t._v(" "),a("th",{staticClass:"items-table__th text-xs-right"},[t._v("Type")]),t._v(" "),a("th",{staticClass:"items-table__th text-xs-right",on:{click:t.sortBySize}},[t._v("\n          Size\n          "),a("i",{staticClass:"fa fa-sort"})]),t._v(" "),a("th",{staticClass:"items-table__th text-xs-right",on:{click:t.sortByDate}},[t._v("\n          Date\n          "),a("i",{staticClass:"fa fa-sort"})]),t._v(" "),a("th",{staticClass:"items-table__th"},[a("i",{staticClass:"fa fa-remove error--text text-xs-right"})])]),t._v(" "),a("transition-group",{tag:"tbody",staticClass:"items-table__body",attrs:{name:"table-row"}},t._l(t.filteredItems,function(t,e){return a("tableItem",{key:t.id,attrs:{item:t,index:e}})}))]):t._e()]),t._v(" "),a("v-divider"),t._v(" "),a("v-card-actions",{staticClass:"table__card-actions ml-4"},[a("transition",{attrs:{name:"fade",mode:"out-in"}},[t.noMoreResults||0===t.filteredItems.length?0===t.filteredItems.length?a("p",[t._v("No items to load.")]):t.noMoreResults&&t.items.length>8?a("p",[t._v("No more items to load.")]):t._e():a("v-btn",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:t.scrollToLoadMoreButton,expression:"scrollToLoadMoreButton"}],staticClass:"elevation-5 mt-2 mb-2",attrs:{id:"tableScrollToBottom",large:"",color:"info"},on:{click:function(e){t.loadMore()}}},[t._v("\n      Load\n      "),a("v-icon",{attrs:{medium:"",right:""}},[t._v("autorenew")])],1)],1)],1)],1)},ne=[],se={render:ie,staticRenderFns:ne},oe=se,re=a("VU/8"),le=f,ce=re(ae,oe,!1,le,null,null),de=ce.exports,ue={props:["currentItem"],computed:N()({},Object(g.c)("table",["currentItemName","showDialog"])),methods:N()({},Object(g.b)("table",["clearCurrent","deleteItem"]))},fe=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{persistent:"","max-width":"430"},model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"}),t._v(" "),a("v-card-text",[t._v("Do you really want to delete "+t._s(t.currentItemName)+"?\n      ")]),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"red darken-1",flat:"flat"},nativeOn:{click:function(e){t.clearCurrent(e)}}},[t._v("\n          Cancel\n        ")]),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",flat:"flat"},on:{click:t.deleteItem}},[t._v("\n          Delete\n        ")])],1)],1)],1)],1)},me=[],he={render:fe,staticRenderFns:me},pe=he,ve=a("VU/8"),_e=ve(ue,pe,!1,null,null,null),be=_e.exports,ge={components:{SearchItems:Mt,Alert:Gt,ItemsTable:de,DeleteDialog:be},computed:{loading:function(){return this.$store.getters["shared/loading"]}}},xe=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",[a("v-flex",{attrs:{xs12:""}},[a("v-card",{staticClass:"table elevation-4"},[a("v-card-title",[a("search-items")],1),t._v(" "),a("alert"),t._v(" "),t.loading?a("v-card-text",{staticClass:"text-xs-center"},[a("v-progress-circular",{staticClass:"primary--text",attrs:{indeterminate:"",width:7,size:70}})],1):t._e(),t._v(" "),t.loading?t._e():a("items-table")],1)],1)],1),t._v(" "),a("delete-dialog")],1)},ye=[],we={render:xe,staticRenderFns:ye},Ce=we,Ie=a("VU/8"),ke=Ie(ge,Ce,!1,null,null,null),De=ke.exports,Ne={data:function(){return{isMobile:!1}},computed:{orientation:function(){return this.isMobile}},mounted:function(){this.onResize(),window.addEventListener("resize",this.onResize,{passive:!0})},beforeDestroy:function(){"undefined"!=typeof window&&window.removeEventListener("resize",this.onResize,{passive:!0})},methods:{onResize:function(){this.isMobile=window.innerWidth<600}}},Fe=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"appfooter",attrs:{id:"footer"}},[a("v-layout",{attrs:{column:""}},[a("v-card",{attrs:{dark:"",color:"light-blue darken-1"}},[a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{column:t.orientation,row:!t.orientation}},[a("v-flex",{attrs:{xs12:"",sm4:"",md6:"","offset-sm1":"","offset-md2":""}},[a("v-card",{attrs:{flat:"",color:"light-blue darken-1"}},[a("v-card-title",[a("h2",{staticClass:"headline d-inline-block"},[t._v("\n                  What is Cloud Computing?\n                  "),a("v-icon",{attrs:{right:"",dark:""}},[t._v("cloud")])],1)]),t._v(" "),a("v-card-text",[a("p",{staticClass:"body"},[t._v('Cloud storage is a cloud computing model in which data is stored on remote servers accessed from the Internet, or "cloud." It is maintained, operated and managed by a cloud storage service provider on a storage servers that are built on virtualization techniques.')])])],1)],1),t._v(" "),a("v-flex",{attrs:{xs12:"",sm3:"","offset-sm1":"","offset-md0":""}},[a("v-card",{attrs:{flat:"",color:"light-blue darken-1"}},[a("v-card-title",[a("h2",{staticClass:"headline"},[t._v("Connect With Us!")])]),t._v(" "),a("v-card-actions",[a("a",{attrs:{href:"https://github.com/zeljko-olah",target:"_blank"}},[a("v-btn",{staticClass:"ma-0",attrs:{flat:"",fab:""}},[a("v-icon",[t._v("\n                      fa-github\n                    ")])],1)],1),t._v(" "),a("a",{attrs:{href:"https://www.linkedin.com/in/zeljko-olah-11b97a13b/",target:"_blank"}},[a("v-btn",{staticClass:"ma-0",attrs:{flat:"",fab:""}},[a("v-icon",[t._v("\n                    fa-linkedin\n                  ")])],1)],1),t._v(" "),a("a",{attrs:{href:"https://twitter.com/zeljkoolah",target:"_blank"}},[a("v-btn",{staticClass:"ma-0",attrs:{flat:"",fab:""}},[a("v-icon",[t._v("\n                      fa-twitter\n                    ")])],1)],1),t._v(" "),a("a",{attrs:{href:"mailto:olah.zeljko@gmail.com"}},[a("v-btn",{staticClass:"ma-0",attrs:{flat:"",fab:""}},[a("v-icon",[t._v("\n                      fa-envelope-open\n                    ")])],1)],1)])],1)],1)],1)],1)],1),t._v(" "),a("v-card",{staticClass:"pa-1",attrs:{dark:"",flat:"",color:"light-blue darken-2"}},[a("v-container",[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[a("span",[t._v("Made with "),a("i",{staticClass:"fa fa-heart"}),t._v(" and VueJS, Vuex, Vuetify and Firebase by "),a("strong",[t._v("Zeljko Olah")]),t._v(" © "+t._s((new Date).getFullYear()))]),t._v(" "),a("br"),t._v(" "),a("span",[t._v("Inspiration from dear Front-End friend "),a("strong",[t._v("Nikola Lakovic.")])])])],1)],1)],1)],1),t._v(" "),a("v-btn",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#top",expression:"'#top'"}],attrs:{fab:"",dark:"",fixed:"",bottom:"",right:"",color:"light-blue lighten-1"}},[a("v-icon",{attrs:{large:""}},[t._v("\n      keyboard_arrow_up\n    ")])],1)],1)},Te=[],Ee={render:Fe,staticRenderFns:Te},ze=Ee,Se=a("VU/8"),Ae=m,Le=Se(Ne,ze,!1,Ae,null,null),Ue=Le.exports,$e=a("M4fF"),Me=a.n($e),je={components:{AppHeader:Y,AppJumbotron:Z,BaseUpload:Ft,BaseTable:De,AppFooter:Ue},mounted:function(){h()}},Re=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{staticClass:"white",attrs:{id:"top"}},[a("app-header"),t._v(" "),a("app-jumbotron"),t._v(" "),a("v-container",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm10:"","offset-sm1":"",md4:""}},[a("base-upload",{attrs:{id:"upload"}})],1),t._v(" "),a("v-flex",{attrs:{xs12:"",sm10:"","offset-sm1":"",md8:"","offset-md4":""}},[a("base-table",{attrs:{xs12:"",id:"table"}})],1)],1)],1),t._v(" "),a("app-footer")],1)},Oe=[],Be={render:Re,staticRenderFns:Oe},Ve=Be,Pe=a("VU/8"),He=p,Ye=Pe(je,Ve,!1,He,null,null),Ge=Ye.exports,qe=function(t){if(t){if(t=parseInt(t),!isNaN(t)&&t>1024){var e=" KB";return t/=1024,t>=1024&&(t/=1024,e=" MB"),(t=Math.round(10*t)/10)+e}return" 1kB"}return" 0kB"},Je=function(t){return new Date(t).toLocaleString(["en-US"],{month:"short",day:"2-digit",year:"numeric"})},We=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,a=t.split("").slice(0,e).join("");return a.length>=e?a+"...":a},Qe=a("bm7V"),Ke=a.n(Qe),Xe=new v.a;Object.defineProperty(v.a.prototype,"$bus",{get:function(){return Xe}}),v.a.use(b.a),v.a.use(Ke.a),v.a.use(Ke.a,{container:"body",duration:500,easing:"ease",offset:0,cancelable:!0,onDone:!1,onCancel:!1,x:!1,y:!0}),v.a.filter("formatSize",qe),v.a.filter("formatDate",Je),v.a.filter("allowedNameLength",We),v.a.config.productionTip=!1,new v.a({el:"#app",store:k,render:function(t){return t(Ge)},created:function(){Object(x.initializeApp)({apiKey:"AIzaSyCYFxP8LoqH46OQD46byPTTFy_mytErEbw",authDomain:"vue-uploader.firebaseapp.com",databaseURL:"https://vue-uploader.firebaseio.com",projectId:"vue-uploader"}),this.$store.dispatch("table/loadItems")}})},QCv7:function(t,e){},VgBD:function(t,e){},Ytyn:function(t,e){},hhD2:function(t,e){},khom:function(t,e){},oDh2:function(t,e){},oNXm:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.57e8d9e9d8cd3088209b.js.map