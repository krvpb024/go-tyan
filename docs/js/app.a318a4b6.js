(function(t){function e(e){for(var r,s,o=e[0],c=e[1],l=e[2],d=0,f=[];d<o.length;d++)s=o[d],a[s]&&f.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={app:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("04f5"),a=n.n(r);a.a},"04f5":function(t,e,n){},"07d1":function(t,e,n){"use strict";var r=n("cfbd"),a=n.n(r);a.a},4414:function(t,e,n){"use strict";var r=n("f62c"),a=n.n(r);a.a},"4b42":function(t,e,n){"use strict";var r=n("565d"),a=n.n(r);a.a},"53f6":function(t,e,n){"use strict";var r=n("78c5"),a=n.n(r);a.a},"565d":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],s=(n("f5df"),{created:function(){localStorage.getItem("hiragana")||localStorage.setItem("hiragana",JSON.stringify([["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],["や","ya"],["ゆ","yu"],["よ","yo"],["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],["わ","wa"],["を","wo"],["ん","n"]])),localStorage.getItem("katakana")||localStorage.setItem("katakana",JSON.stringify([["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],["ヤ","ya"],["ユ","yu"],["ヨ","yo"],["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],["ワ","wa"],["ヲ","wo"],["ン","n"]]))}}),o=s,c=(n("034f"),n("2877")),l=Object(c["a"])(o,a,i,!1,null,null,null),u=l.exports,d=n("8c4f"),f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section-container",[r("section-header",[t._v("\n    選擇模式\n    "),r("section-header-btn",{attrs:{slot:"right",position:"right",tag:"button",show:!0,insideType:"img",insideSrc:n("9bbe"),insideAlt:"info"},slot:"right"})],1),r("mode-group",[r("h2",[t._v("五十音 -> 拼音")]),r("mode-link",{attrs:{to:"/gtop/hiragana"}},[t._v("平假名")]),r("mode-link",{attrs:{to:"/gtop/katakana"}},[t._v("片假名")])],1),r("mode-group",[r("h2",[t._v("拼音 -> 五十音")]),r("mode-link",[t._v("平假名")]),r("mode-link",[t._v("片假名")]),r("mode-link",[t._v("平、片假名")])],1)],1)},h=[],p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"home-section-title"},[n("div",{staticClass:"header-nav"},[t._t("left",[n("sectionHeaderBtn",{attrs:{slot:"left",position:"left",tag:"a",show:!1},slot:"left"})]),n("h1",{staticClass:"header-nav-title"},[t._t("default")],2),t._t("right",[n("sectionHeaderBtn",{attrs:{slot:"right",position:"right",tag:"a",show:!1},slot:"right"})])],2)])},g=[],m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-nav-btn",class:t.position},[t.show&&"a"===t.tag?n("router-link",{staticClass:"header-nav-btn-item",attrs:{to:t.toUrl}},["img"===t.insideType?n("img",{staticClass:"header-nav-btn-item-img",attrs:{src:t.insideSrc,alt:t.insideAlt}}):t._e()]):t._e(),t.show&&"button"===t.tag?n("button",{staticClass:"header-nav-btn-item",attrs:{tag:t.tag}},["img"===t.insideType?n("img",{staticClass:"header-nav-btn-item-img",attrs:{src:t.insideSrc,alt:t.insideAlt}}):t._e()]):t._e(),t._t("modal")],2)},v=[],b={props:{position:{type:String,required:!0},tag:{type:String,required:!0},toUrl:{type:String,default:"/"},show:{type:Boolean,required:!0},insideType:{type:String,default:"text"},insideSrc:{type:String},insideAlt:{type:String}}},w=b,_=(n("6b88"),Object(c["a"])(w,m,v,!1,null,"62c62855",null)),y=_.exports,x={components:{sectionHeaderBtn:y}},k=x,S=(n("a6fe"),Object(c["a"])(k,p,g,!1,null,"5345d893",null)),O=S.exports,C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container"},[t._t("default")],2)},A=[],E=(n("07d1"),{}),T=Object(c["a"])(E,C,A,!1,null,"77521a51",null),j=T.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mode-group-container"},[t._t("default")],2)},H=[],$=(n("4b42"),{}),I=Object(c["a"])($,M,H,!1,null,"ef0d88e4",null),N=I.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-link",{staticClass:"mode-link",attrs:{to:t.to}},[n("p",[t._t("default")],2)])},B=[],J={props:{to:{type:String,default:"/"}}},q=J,L=(n("f2fd"),Object(c["a"])(q,P,B,!1,null,"6810bd17",null)),U=L.exports,D={components:{sectionHeader:O,sectionHeaderBtn:y,sectionContainer:j,modeGroup:N,modeLink:U}},G=D,z=(n("4414"),Object(c["a"])(G,f,h,!1,null,null,null)),F=z.exports,K=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section-container",[r("section-header",[r("section-header-btn",{attrs:{slot:"left",position:"left",tag:"a",show:!0,insideType:"img",insideSrc:n("c18c"),alt:"back"},slot:"left"}),t._v("\n    "+t._s(t.title)+"\n    "),r("section-header-btn",{attrs:{slot:"right",position:"right",tag:"button",show:!0,insideType:"img",insideSrc:n("a1d5"),alt:"back"},nativeOn:{click:function(e){return t.showModal(e)}},slot:"right"},[r("transition",{attrs:{slot:"modal","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"},slot:"modal"},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.triggerModal,expression:"triggerModal"}],staticClass:"gtop-modal"},[r("p",[t._v("點擊兩次換行鍵(enter)可以獲得提示")])])])],1)],1),r("form",{staticClass:"exam-container",on:{submit:function(e){return e.preventDefault(),t.showHelp(e)}}},[r("div",{staticClass:"exam-container-title"},[r("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut posA"},on:{"after-leave":t.clearAnswer}},[t.cursor%2===0?r("label",{key:"even",staticClass:"exam-container-title-label",attrs:{for:"exam-container-input"}},[t._v(t._s(t.currentExam[t.cursor][0]))]):r("label",{key:"odd",staticClass:"exam-container-title-label",attrs:{for:"exam-container-input"}},[t._v(t._s(t.currentExam[t.cursor][0]))])])],1),r("div",{staticClass:"exam-container-div"},[r("input",{directives:[{name:"focus",rawName:"v-focus"},{name:"model",rawName:"v-model",value:t.userAnswer,expression:"userAnswer"}],staticClass:"exam-container-input",attrs:{type:"text",id:"exam-container-input",placeholder:t.helpAnswer},domProps:{value:t.userAnswer},on:{input:function(e){e.target.composing||(t.userAnswer=e.target.value)}}}),r("p",[t._v(t._s(t.cursor+1)+"/"+t._s(t.currentExam.length))])])])],1)},Q=[],R=(n("77ed"),{data:function(){return{hiragana:JSON.parse(localStorage.getItem("hiragana")),katakana:JSON.parse(localStorage.getItem("katakana")),cursor:44,userAnswer:"",helpAnswer:"",showHelpTrigger:!1,triggerModal:!1,currentExam:[]}},created:function(){this.currentExam=this.generateExam()},computed:{gType:function(){return this.$route.params.gType},title:function(){return"hiragana"===this.gType?"平假名":"片假名"}},watch:{userAnswer:function(t){this.currentExam[this.cursor][1]===t.toLowerCase()&&(this.cursor+=1,this.cursor===this.currentExam.length&&(this.cursor=0,this.currentExam=this.generateExam()))}},methods:{showHelp:function(){this.showHelpTrigger?this.helpAnswer||(this.helpAnswer=this.currentExam[this.cursor][1],this.userAnswer="",this.showHelpTrigger=!1):this.showHelpTrigger=!0},clearAnswer:function(){this.helpAnswer="",this.userAnswer="",this.showHelpTrigger=!1},shuffle:function(t){var e,n,r=t.length;while(r)n=Math.floor(Math.random()*r--),e=t[r],t[r]=t[n],t[n]=e;return t},showModal:function(){var t=this;this.triggerModal?this.triggerModal=!1:(this.triggerModal=!0,setTimeout(function(){t.triggerModal=!1},3e3))},generateExam:function(){return this.shuffle(this.$data[this.gType])}},directives:{focus:{inserted:function(t){t.focus()}}},components:{sectionHeader:O,sectionHeaderBtn:y,sectionContainer:j}}),V=R,W=(n("53f6"),Object(c["a"])(V,K,Q,!1,null,"c743bd42",null)),X=W.exports;r["a"].use(d["a"]);var Y=new d["a"]({routes:[{path:"/",name:"modeSelect",component:F},{path:"/gtop/:gType",name:"gtopMode",component:X}]});r["a"].config.productionTip=!1,new r["a"]({router:Y,render:function(t){return t(u)}}).$mount("#app")},"6b88":function(t,e,n){"use strict";var r=n("d4b8"),a=n.n(r);a.a},"78c5":function(t,e,n){},"818a":function(t,e,n){},"9bbe":function(t,e,n){t.exports=n.p+"img/info.86e18a97.svg"},a1d5:function(t,e,n){t.exports=n.p+"img/ihelp.529de732.svg"},a6fe:function(t,e,n){"use strict";var r=n("818a"),a=n.n(r);a.a},c18c:function(t,e,n){t.exports=n.p+"img/arrow_back.b948abb0.svg"},cfbd:function(t,e,n){},d4b8:function(t,e,n){},dd9f:function(t,e,n){},f2fd:function(t,e,n){"use strict";var r=n("dd9f"),a=n.n(r);a.a},f62c:function(t,e,n){}});
//# sourceMappingURL=app.a318a4b6.js.map