(this.webpackJsonpkacky=this.webpackJsonpkacky||[]).push([[0],{50:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a.n(n),c=a(35),i=a.n(c),r=(a(50),a(24)),l=a.n(r),o=a(36),d=a(13),h=a(37),p=a(14),j=a(38),u=a(45),m=a(95),b=a(26),f=a(39),O=a(0);function v(){return Object(O.jsx)(f.a,{animation:"border",role:"status",size:"xxl",children:Object(O.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}function g(e){return Object(O.jsxs)("span",{className:e.className+" fs-1",children:[e.finished," / ",e.total]})}function x(e){return Object(O.jsxs)("header",{className:"py-3 mb-2 border-bottom hstack gap-1",children:[Object(O.jsxs)("div",{className:"d-flex align-items-center mb-3 mb-md-0",children:[Object(O.jsx)("img",{src:"https://static-cdn.jtvnw.net/jtv_user_pictures/78ac5f9f-024b-4bf3-9098-e2278ebdc26a-profile_image-70x70.png",alt:"Wingo logo",width:"70",height:"70",className:"me-2",style:{borderRadius:"50%"}}),Object(O.jsx)("span",{className:"fs-1",children:"Wingobear - Kacky 2021"})]}),Object(O.jsx)(g,{className:"ms-auto",finished:e.finished,total:e.total})]})}var k=a(21),M=a(18),N=a(41),y=a(44);function R(e){var t=e.map;return Object(O.jsx)(y.a,{id:"radio-".concat(t.id),type:"radio",variant:t.finished?"outline-success":"outline-danger",name:"radio",value:t.id,checked:e.checked,onChange:function(){return e.onMapSelection(t.id)},className:"m-1 fw-bolder",children:t.id})}function S(e){var t=e.selectedId;return Object(O.jsx)(N.a,{size:"sm",className:"btn-group-justified",children:e.maps.map((function(a){return Object(O.jsx)(R,{map:a,checked:t===a.id,onMapSelection:e.onMapSelection},a.id)}))})}function w(e){var t=Math.ceil(e.maps.length/3),a=e.selectedId;return Object(O.jsx)(M.a,{children:Object(k.a)(Array(3).keys()).map((function(n){return Object(O.jsx)(S,{selectedId:a,maps:e.maps.slice(n*t,(n+1)*t),onMapSelection:e.onMapSelection},n)}))})}function G(e){var t=e.map;if(!t||!t.finished)return Object(O.jsx)("div",{});return Object(O.jsxs)("div",{className:"vstack flex-grow-0 gap-5 mt-5 fs-3",style:{minWidth:"25%"},children:[Object(O.jsx)("span",{className:"fs-1",children:t.id}),Object(O.jsxs)("div",{children:[Object(O.jsx)("span",{className:"d-block",children:t.date.toLocaleDateString("fr-FR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),Object(O.jsx)("span",{className:"d-block",children:t.date.toLocaleTimeString("fr-FR")})]}),Object(O.jsx)("span",{className:"fs-3",children:t.time})]})}function I(e){return Object(O.jsx)("div",{className:"w-100 h-100",children:e.URL&&Object(O.jsx)("iframe",{title:"Map clip",src:e.URL,width:"100%",height:"100%",allowFullScreen:!0})})}function L(e){return Object(O.jsx)(M.a,{className:"flex-fill",children:Object(O.jsxs)("div",{className:"hstack gap-2",children:[Object(O.jsx)(G,{map:e.selectedMap}),Object(O.jsx)(I,{URL:e.selectedMap?e.selectedMap.clip:""})]})})}var F=a(42),W=a(11),U=function e(t,a,n,s,c){Object(d.a)(this,e),Object.assign(this,{id:t,finished:a,date:n,time:s,clip:c})};function A(e){var t=e.split(" "),a=Object(W.a)(t,2),n=a[0],s=a[1],c=n.split("/"),i=Object(W.a)(c,3),r=i[0],l=i[1],o=i[2],d=0,h=0,p=0;if(s){var j=s.split(":"),u=Object(W.a)(j,3);d=u[0],h=u[1],p=u[2]}return Object(F.a)(Date,Object(k.a)(function(e){var t=Object(W.a)(e,6),a=t[0],n=t[1],s=t[2],c=t[3],i=t[4],r=t[5],l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e?parseInt(e):t};return a=l(a),n=l(n,8)-1,[s=l(s,2012),n,a,c=l(c),i=l(i),r=l(r)]}([r,l,o,d,h,p])))}var D=a(43),T=a.n(D);function _(e){return Object(O.jsx)(M.a,{children:Object(O.jsx)("div",{className:"hstack gap-2"})})}var z=function(e){Object(j.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).onMapSelection=n.onMapSelection.bind(Object(p.a)(n)),n.state={maps:[],selectedMap:void 0},n}return Object(h.a)(a,[{key:"fetchData",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t,a,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet",t="key=".concat("AIzaSyCXaXgfyz_Gneiis7D3yJk22hUQ9NOssUg"),"ranges=WINGO!A2:F33&ranges=WINGO!G2:L33&ranges=WINGO!M2:R12","valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING",a="".concat("https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet","?").concat(t,"&").concat("ranges=WINGO!A2:F33&ranges=WINGO!G2:L33&ranges=WINGO!M2:R12","&").concat("valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING"),e.next=8,T.a.get(a);case 8:n=e.sent,c=n.data,s=c.valueRanges.map((function(e){return e.values.map((function(e){var t=Object(W.a)(e,5),a=t[0],n=t[1],s=t[2],c=t[3],i=t[4];return n?new U(a,n,A(s),c,function(e){var t=e.match(/(https:\/\/clips\.twitch\.tv\/)(.+)";/);return t?t="".concat(t[1],"embed?clip=").concat(t[2],"&parent=").concat("xat0mz.github.io"):(t=e.match(/(https:\/\/streamable\.com\/)(.+)";/),t="".concat(t[1],"o/").concat(t[2])),t}(i)):new U(a,n)}))})).flat(),this.setState({maps:s}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}var c}),e,this,[[0,13]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"onMapSelection",value:function(e){this.setState({selectedMap:m.a.find(this.state.maps,{id:e})})}},{key:"filterAndOrderMaps",value:function(){return this.state.maps}},{key:"render",value:function(){var e=this.state.selectedMap?this.state.selectedMap.id:0,t=m.a.filter(this.state.maps,{finished:!0}).length,a=this.state.maps.length,n=this.filterAndOrderMaps();return this.state.maps.length?Object(O.jsxs)(b.a,{className:"vstack gap-2 p-0 pb-2 text-center",style:{minHeight:"100vh"},children:[Object(O.jsx)(x,{finished:t,total:a}),Object(O.jsx)(_,{}),Object(O.jsx)(w,{maps:n,selectedId:e,onMapSelection:this.onMapSelection}),Object(O.jsx)(L,{selectedMap:this.state.selectedMap})]}):Object(O.jsx)(b.a,{className:"d-flex justify-content-center align-items-center",style:{width:"100vh",height:"100vh"},children:Object(O.jsx)(v,{})})}}]),a}(s.a.Component);i.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(z,{})}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.5b97ca9c.chunk.js.map