!function(){"use strict";var e,t={3136:function(){var e=window.wp.blocks,t=window.wp.element,i=(0,t.createElement)("svg",{version:"1.1",id:"Layer_1",focusable:"false",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 24 24"},(0,t.createElement)("g",null,(0,t.createElement)("polygon",{points:"2.5,14.8 6,11.3 9.4,14.8 11.5,14.8 6,9.2 0.4,14.8 \t"}),(0,t.createElement)("polygon",{points:"21.5,9.2 18,12.6 14.6,9.2 12.5,9.2 18,14.8 23.6,9.2 \t"})),(0,t.createElement)("rect",{y:"3.9",width:"24",height:"1.4"}),(0,t.createElement)("rect",{y:"18.6",width:"24",height:"1.4"})),n=window.wp.blockEditor,s=window.statik.editorUtils,r=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/spacer","version":"4.18.1","title":"Spacer","category":"layout","description":"Display a vertical white-space to position other visible elements of the website.","keywords":[],"textdomain":"statik-blocks","attributes":{"height":{"type":"array","items":{"type":"string"},"default":["100px"]}},"example":{"attributes":{"height":["100px"]}},"supports":{"anchor":true},"editorScript":"file:./build/index.js","editorStyle":["file:./build/index.css","file:./build/style-index.css"],"style":"file:./build/style-index.css"}'),o=window.wp.components,a=window.wp.i18n;function l(){const{attributes:e,setAttributes:i}=(0,s.useBlockAttributes)(),{height:r}=e,l=(0,s.useRwdAttribute)(r),c=e=>t=>{l.setDeviceValue(e,t),i({height:l.toRwd()})};return(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(o.PanelBody,{title:(0,a.__)("Spacer settings","statik-blocks")},(0,t.createElement)(s.ResponsiveSettingsTabs,null,(e=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.__experimentalDivider,{marginTop:"0 !important"}),(0,t.createElement)(o.__experimentalUnitControl,{label:(0,a.__)("Vertical spacing","statik-blocks"),value:l.getDeviceValue(e.name),onChange:c(e.name),step:1,isPressEnterToChange:!0,placeholder:(0,a.__)("inherit","statik-blocks"),__unstableInputWidth:"80px"}))))))}var c=window.wp.data;const p=[16,24,32,42,64,72,96,128,256],u={icon:i,edit:function(e){const{isSelected:i}=e,{boxHeight:r,isResizing:a,handleResizeStart:u,handleResize:h,handleResizeStop:d}=(()=>{const{attributes:e,setAttributes:i}=(0,s.useBlockAttributes)(),{height:n}=e,r=(0,s.useRwdAttribute)(n),o=r.default,[a,l]=(0,t.useState)(!1),[u,h]=(0,t.useState)(o),{toggleSelection:d}=(0,c.useDispatch)("core/editor");return{boxHeight:a?u:o,isResizing:a,setIsResizing:l,handleResizeStart:()=>{l(!0),d(!1)},handleResize:(e,t,i)=>{h(i.clientHeight),l(!0),d(!1)},handleResizeStop:(e,t,n,s)=>{if(0!==s.height){const e=((e,t)=>{const i=e-void 0;let n=e;if(!p.includes(e))if(i>0){const t=10*Math.ceil(e/10);n=p.find((i=>i>e&&i<t))||t}else if(i<0){const t=10*Math.floor(e/10);n=p.find((i=>i<e&&i>t))||t}return n=Math.min(parseInt(n,10),1/0),n})(n.clientHeight);r.setDefault(`${e}px`),h(e),i({height:r.toRwd()})}l(!1),d(!0)}}})(),b=(0,n.useBlockProps)();return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l,null),(0,t.createElement)("div",b,(0,t.createElement)(o.ResizableBox,{className:"wp-block-statik-spacer__resizable-box",size:{height:r},enable:{top:!1,right:!1,bottom:!0,left:!1},minHeight:10,onResizeStart:u,onResize:h,onResizeStop:d,showHandle:i,__experimentalShowTooltip:!0,__experimentalTooltipProps:{axis:"y",position:"bottom",isVisible:a}})))},save:function(e){const{attributes:i}=e,{height:r}=i,o=n.useBlockProps.save(),a=(0,s.rwdAttribute)(r);return(0,t.createElement)("div",o,(0,t.createElement)("div",{className:"wp-block-statik-spacer--mobile",style:{height:a.inherit.mobile}}),(0,t.createElement)("div",{className:"wp-block-statik-spacer--tablet",style:{height:a.inherit.tablet}}),(0,t.createElement)("div",{className:"wp-block-statik-spacer--desktop",style:{height:a.inherit.desktop}}))},deprecated:[{attributes:{height:{type:"array",items:{type:"string"},default:["100px"]}},save(){return null}}]};(0,e.registerBlockType)(r,u)}},i={};function n(e){var s=i[e];if(void 0!==s)return s.exports;var r=i[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=function(t,i,s,r){if(!i){var o=1/0;for(p=0;p<e.length;p++){i=e[p][0],s=e[p][1],r=e[p][2];for(var a=!0,l=0;l<i.length;l++)(!1&r||o>=r)&&Object.keys(n.O).every((function(e){return n.O[e](i[l])}))?i.splice(l--,1):(a=!1,r<o&&(o=r));if(a){e.splice(p--,1);var c=s();void 0!==c&&(t=c)}}return t}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[i,s,r]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={1712:0,3128:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,r,o=i[0],a=i[1],l=i[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(s in a)n.o(a,s)&&(n.m[s]=a[s]);if(l)var p=l(n)}for(t&&t(i);c<o.length;c++)r=o[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(p)},i=self.webpackChunkroot=self.webpackChunkroot||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var s=n.O(void 0,[3128],(function(){return n(3136)}));s=n.O(s)}();