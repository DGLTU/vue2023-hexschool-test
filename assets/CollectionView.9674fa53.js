import{r,o as a,c as l,F as f,g,a as u,e as s,t as _}from"./index.a7f24905.js";const x={class:"container d-flex justify-content-start"},y={class:"collection border rounded my-4 me-4 p-4"},b={class:"d-flex justify-content-end"},k=["onClick"],m={class:"brief"},$={__name:"CollectionView",setup(C){const i=r([]),n=r(),p=e=>{const t=`; ${document.cookie}`.split(`; ${e}=`);if(t.length===2)return t.pop().split(";").shift()};n.value=p("userId");const d=e=>{u.get("http://localhost:3000/data").then(o=>{i.value=o.data.filter(t=>t.userId.includes(e))}).catch(o=>{console.log(o)})},h=(e,o)=>{u.put(`http://localhost:3000/data/${o}`,e).then(t=>{console.log(t),d(n.value)}).catch(t=>{console.log(t)})},v=(e,o)=>{const t=e.userId.indexOf(n.value),c=e;c.userId.splice(t,1),h(c,o)};return d(n.value),(e,o)=>(a(),l("div",x,[(a(!0),l(f,null,g(i.value,t=>(a(),l("div",{key:t.id},[s("div",y,[s("div",b,[s("button",{type:"button",class:"mb-4 btn btn-warning",onClick:c=>v(t,t.id)},"\u5DF2\u6536\u85CF",8,k)]),s("h1",null,_(t.title),1),s("p",m,_(t.description),1)])]))),128))]))}};export{$ as default};