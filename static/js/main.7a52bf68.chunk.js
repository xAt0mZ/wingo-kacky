(this.webpackJsonpkacky=this.webpackJsonpkacky||[]).push([[0],{53:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),c=a(39),i=a.n(c),r=(a(53),a(29)),l=a.n(r),o=a(13),d=a(40),h=a(20),j=a(41),u=a(14),p=a(42),b=a(47),m=a(99),f=a(25),O=a(43),g=a(0);function x(){return Object(g.jsx)(O.a,{animation:"border",role:"status",size:"xxl",children:Object(g.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}var v=a(10);function y(){return Object(g.jsxs)(v.a,{children:[Object(g.jsx)("span",{className:"d-block fs-1 mx-auto",children:"Impossible de r\xe9cup\xe9rer les donn\xe9es"}),Object(g.jsx)("span",{className:"fs-1 d-block mx-auto",children:"Recharge la page"})]})}function k(e){return Object(g.jsxs)("span",{className:e.className+" fs-1",children:[e.finished," / ",e.total]})}function N(e){return Object(g.jsxs)("header",{className:"py-3 mb-2 border-bottom hstack gap-1",children:[Object(g.jsxs)("div",{className:"d-flex align-items-center mb-3 mb-md-0",children:[Object(g.jsx)("img",{src:"https://static-cdn.jtvnw.net/jtv_user_pictures/78ac5f9f-024b-4bf3-9098-e2278ebdc26a-profile_image-70x70.png",alt:"Wingo logo",width:"70",height:"70",className:"me-2",style:{borderRadius:"50%"}}),Object(g.jsx)("span",{className:"fs-1",children:"Wingobear - Kacky 2021"})]}),Object(g.jsx)(k,{className:"ms-auto",finished:e.finished,total:e.total})]})}var M=a(26),S=a(18);function w(e){return Object(g.jsx)(M.a,{className:"ms-1",children:Object(g.jsxs)(v.a,{className:"align-items-center fs-3",children:[Object(g.jsx)(S.a,{children:Object(g.jsx)(M.a.Select,{"aria-label":"Filter select",onChange:function(t){return e.onFilterChange(t.target.value)},children:e.options.map((function(e){return Object(g.jsx)("option",{children:e},e)}))})}),Object(g.jsxs)(S.a,{children:[Object(g.jsx)("span",{children:"Trier par num\xe9ro"}),Object(g.jsx)(M.a.Check,{inline:!0,type:"switch",id:"custom-switch",className:"mx-3 fs-4",onChange:function(t){return e.onOrderChange(t.target.checked)}}),Object(g.jsx)("span",{children:"ordre de finish"})]})]})})}var C=a(44),F=a(48);function R(e){var t=e.map;return Object(g.jsx)(F.a,{id:"radio-".concat(t.id),type:"radio",variant:t.finished?"outline-success":"outline-danger",name:"radio",value:t.id,checked:e.checked,onChange:function(){return e.onMapSelection(t.id)},className:"m-1 fw-bolder",children:t.id})}function I(e){var t=e.selectedId;return Object(g.jsx)(C.a,{size:"sm",className:"btn-group-justified",children:e.maps.map((function(a){return Object(g.jsx)(R,{map:a,checked:t===a.id,onMapSelection:e.onMapSelection},a.id)}))})}function L(e){var t=3,a=Math.ceil(e.maps.length/t);75!==e.maps.length&&(t=1,a=e.maps.length);var n=e.selectedId;return Object(g.jsx)(v.a,{children:Object(o.a)(Array(t).keys()).map((function(t){return Object(g.jsx)(I,{selectedId:n,maps:e.maps.slice(t*a,(t+1)*a),onMapSelection:e.onMapSelection},t)}))})}var D="fr-FR",G={year:"numeric",month:"long",day:"numeric"},U="Tous les jours";function W(e){var t=e.map;return t&&t.finished?Object(g.jsxs)("div",{className:"vstack flex-grow-0 gap-5 mt-5 fs-3",style:{minWidth:"25%"},children:[Object(g.jsx)("span",{className:"fs-1",children:t.id}),Object(g.jsxs)("div",{children:[Object(g.jsx)("span",{className:"d-block",children:t.date.toLocaleDateString(D,G)}),Object(g.jsx)("span",{className:"d-block",children:t.date.toLocaleTimeString(D)})]}),Object(g.jsx)("span",{className:"fs-3",children:t.time})]}):Object(g.jsx)("div",{})}function A(e){return Object(g.jsx)("div",{className:"w-100 h-100",children:e.URL&&Object(g.jsx)("iframe",{title:"Map clip",src:e.URL,width:"100%",height:"100%",allowFullScreen:!0})})}function T(e){return Object(g.jsx)(v.a,{className:"flex-fill",children:Object(g.jsxs)("div",{className:"hstack gap-2",children:[Object(g.jsx)(W,{map:e.selectedMap}),Object(g.jsx)(A,{URL:e.selectedMap?e.selectedMap.clip:""})]})})}var z=a(45),B=a(16),_=function e(t,a,n,s,c){Object(h.a)(this,e),Object.assign(this,{id:t,finished:a,date:n,time:s,clip:c})};function J(e){var t=e.split(" "),a=Object(B.a)(t,2),n=a[0],s=a[1],c=n.split("/"),i=Object(B.a)(c,3),r=i[0],l=i[1],d=i[2],h=0,j=0,u=0;if(s){var p=s.split(":"),b=Object(B.a)(p,3);h=b[0],j=b[1],u=b[2]}return Object(z.a)(Date,Object(o.a)(function(e){var t=Object(B.a)(e,6),a=t[0],n=t[1],s=t[2],c=t[3],i=t[4],r=t[5],l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e?parseInt(e):t};return a=l(a),n=l(n,8)-1,[s=l(s,2021),n,a,c=l(c),i=l(i),r=l(r)]}([r,l,d,h,j,u])))}var X=a(46),q=a.n(X),E="key=".concat("AIzaSyCXaXgfyz_Gneiis7D3yJk22hUQ9NOssUg"),H="".concat("https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet","?").concat(E,"&").concat("ranges=WINGO!A2:F33&ranges=WINGO!G2:L33&ranges=WINGO!M2:R12","&").concat("valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING"),K={get:function(){return q.a.get(H)}},Q=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).onMapSelection=n.onMapSelection.bind(Object(u.a)(n)),n.onOrderChange=n.onOrderChange.bind(Object(u.a)(n)),n.onFilterChange=n.onFilterChange.bind(Object(u.a)(n)),n.state={maps:[]},n}return Object(j.a)(a,[{key:"componentDidMount",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,a,n,s,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,K.get();case 3:t=e.sent,r=t.data,a=r.valueRanges.map((function(e){return e.values.map((function(e){var t=Object(B.a)(e,5),a=t[0],n=t[1],s=t[2],c=t[3],i=t[4];return n?new _(a,n,J(s),c,function(e){var t=e.match(/(https:\/\/clips\.twitch\.tv\/)(.+)";/);return t?t="".concat(t[1],"embed?clip=").concat(t[2],"&parent=").concat("xat0mz.github.io"):(t=e.match(/(https:\/\/streamable\.com\/)(.+)";/),t="".concat(t[1],"o/").concat(t[2])),t}(i)):new _(a,n)}))})).flat(),n=m.a.filter(a,{finished:!0}),s=m.a.sortBy(n,(function(e){return e.date.getDate()})),c=m.a.uniq(s.map((function(e){return e.date.toLocaleDateString(D,G)}))),i=m.a.concat.apply(m.a,[[U]].concat(Object(o.a)(c))),this.setState({maps:a,options:i}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),this.setState({err:e.t0});case 15:case"end":return e.stop()}var r}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}()},{key:"onFilterChange",value:function(e){this.setState({filter:e})}},{key:"onOrderChange",value:function(e){this.setState({orderByDate:e})}},{key:"onMapSelection",value:function(e){this.setState({selectedMap:m.a.find(this.state.maps,{id:e})})}},{key:"filterAndOrderMaps",value:function(){var e=this,t=this.state.maps;return this.state.orderByDate&&(t=m.a.orderBy(t,"date")),this.state.filter&&this.state.filter!==U&&(t=m.a.filter(t,(function(t){return t.finished&&t.date.toLocaleDateString(D,G)===e.state.filter}))),t}},{key:"render",value:function(){var e=this.state.selectedMap?this.state.selectedMap.id:0,t=m.a.filter(this.state.maps,{finished:!0}).length,a=this.state.maps.length,n=this.filterAndOrderMaps();return this.state.maps.length||this.state.err?this.state.err?Object(g.jsx)(f.a,{className:"d-flex align-items-center text-center",style:{width:"100vh",height:"100vh"},children:Object(g.jsx)(y,{})}):Object(g.jsxs)(f.a,{className:"vstack gap-2 p-0 pb-2 text-center",style:{minHeight:"100vh"},children:[Object(g.jsx)(N,{finished:t,total:a}),Object(g.jsx)(w,{options:this.state.options,onFilterChange:this.onFilterChange,onOrderChange:this.onOrderChange}),Object(g.jsx)(L,{maps:n,selectedId:e,onMapSelection:this.onMapSelection}),Object(g.jsx)(T,{selectedMap:this.state.selectedMap})]}):Object(g.jsx)(f.a,{className:"d-flex justify-content-center align-items-center",style:{width:"100vh",height:"100vh"},children:Object(g.jsx)(x,{})})}}]),a}(s.a.Component);i.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(Q,{})}),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.7a52bf68.chunk.js.map