!function(){"use strict";var e,t={82701:function(){var e=window.wp.blocks,t=window.wp.element,o=window.wp.blockEditor,l=window.wp.components,a=window.wp.i18n,n=window.statik.editorUtils;function r(){const{setAttributes:e,attributes:r}=(0,n.useBlockAttributes)(),{descriptionEnabled:s,preSelectedTab:c,tabsAlignment:i,textColor:b,accentColor:u,activeTextColor:d,activeAccentColor:m,contentTextColor:k,contentBackgroundColor:p}=r,C=(0,n.useInnerBlocks)(),v=((0,o.useSettings)("color.palette")||[]).flat(),g=(0,t.useMemo)((()=>C.map(((e,t)=>({value:t,label:e.attributes.title})))),[C]),f=[{value:"left",label:(0,a.__)("Left","statik-blocks")},{value:"center",label:(0,a.__)("Center","statik-blocks")},{value:"right",label:(0,a.__)("Right","statik-blocks")}];return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(l.PanelBody,{title:(0,a.__)("Tabs Selector","statik-blocks")},(0,t.createElement)(l.ToggleControl,{label:"Tab Descriptions",checked:s,onChange:t=>{e({descriptionEnabled:t})}}),(0,t.createElement)(l.SelectControl,{label:(0,a.__)("Pre-selected Tab","statik-blocks"),value:c,onChange:t=>{e({preSelectedTab:Number(t)})},options:g}),(0,t.createElement)(l.SelectControl,{label:(0,a.__)("Selector alignment","statik-blocks"),value:i,onChange:t=>{e({tabsAlignment:t})},options:f})),(0,t.createElement)(l.PanelBody,{title:(0,a.__)("Tabs Selector Settings","statik-blocks")},(0,t.createElement)(o.__experimentalColorGradientControl,{label:(0,a.__)("Accent color","statik-blocks"),colors:v,colorValue:u,onColorChange:t=>{e({accentColor:t||""})},gradients:void 0,disableCustomColors:!1,disableCustomGradients:!0}),(0,t.createElement)(o.__experimentalColorGradientControl,{label:(0,a.__)("Active accent color","statik-blocks"),colors:v,colorValue:m,onColorChange:t=>{e({activeAccentColor:t||""})},gradients:void 0,disableCustomColors:!1,disableCustomGradients:!0}),(0,t.createElement)(o.__experimentalColorGradientControl,{label:(0,a.__)("Text color","statik-blocks"),colors:v,colorValue:b,onColorChange:t=>{e({textColor:t||""})},gradients:void 0,disableCustomColors:!1,disableCustomGradients:!0}),(0,t.createElement)(o.__experimentalColorGradientControl,{label:(0,a.__)("Active text color","statik-blocks"),colors:v,colorValue:d,onColorChange:t=>{e({activeTextColor:t||""})},gradients:void 0,disableCustomColors:!1,disableCustomGradients:!0})),(0,t.createElement)(l.PanelBody,{title:(0,a.__)("Content Settings","statik-blocks")},(0,t.createElement)(o.__experimentalColorGradientControl,{label:(0,a.__)("Background color","statik-blocks"),colors:v,colorValue:p,onColorChange:t=>{e({contentBackgroundColor:t||""})},gradients:void 0,disableCustomColors:!1,disableCustomGradients:!0}),(0,t.createElement)(o.__experimentalColorGradientControl,{label:(0,a.__)("Text color","statik-blocks"),colors:v,colorValue:k,onColorChange:t=>{e({contentTextColor:t||""})},gradients:void 0,disableCustomColors:!1,disableCustomGradients:!0}))))}var s=window.React,c=window.wp.primitives,i=(0,s.createElement)(c.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,s.createElement)(c.Path,{d:"M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"})),b=(0,s.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,s.createElement)(c.Path,{d:"M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6zM10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"})),u=(0,s.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,s.createElement)(c.Path,{d:"M20 5h-5.7c0-1.3-1-2.3-2.3-2.3S9.7 3.7 9.7 5H4v2h1.5v.3l1.7 11.1c.1 1 1 1.7 2 1.7h5.7c1 0 1.8-.7 2-1.7l1.7-11.1V7H20V5zm-3.2 2l-1.7 11.1c0 .1-.1.2-.3.2H9.1c-.1 0-.3-.1-.3-.2L7.2 7h9.6z"})),d=window.wp.data;function m(){const o=(0,n.useBlockClientId)(),r=(0,n.useInnerBlocks)(),{selectBlock:s,insertBlock:c}=(0,d.useDispatch)("core/block-editor"),{getBlockIndex:m}=(0,d.useSelect)("core/block-editor"),{attributes:k,setAttributes:p}=(0,n.useBlockAttributes)(),{activeTab:C}=k,v=(0,t.useMemo)((()=>r.map(((e,t)=>({label:e.attributes.title||`Tab #${t}`,value:e.clientId})))),[r]),g=async e=>{const t=m(e,o);p({activeTab:t}),await s(e);const l=`block-${e}`;window.document.getElementById(l)?.focus()};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l.ToolbarDropdownMenu,{icon:i,label:(0,a.__)("Select Tab","statik-blocks")},(()=>(0,t.createElement)(l.MenuGroup,null,(0,t.createElement)(l.MenuItemsChoice,{choices:v,value:null,onSelect:g})))),(0,t.createElement)(l.ToolbarButton,{icon:b,label:(0,a.__)("Add new Tab","statik-blocks"),onClick:async()=>{const t=(0,e.createBlock)("statik/tab"),l=C+1;await c(t,l,o,!0),await g(t.clientId)}}),(0,t.createElement)(l.ToolbarButton,{icon:u,label:(0,a.__)("Delete Tab","statik-blocks"),isDisabled:!0}))}function k(){return(0,t.createElement)(o.BlockControls,null,(0,t.createElement)(l.ToolbarGroup,null,(0,t.createElement)(m,null)))}const p=[["statik/tab"]],C=["statik/tab"],v=()=>{const e=(0,n.useBlockClientId)(),{removeBlock:r}=(0,d.useDispatch)("core/block-editor");return(0,n.useHasInnerBlocks)()?null:(0,t.createElement)(o.Warning,{actions:[(0,t.createElement)(l.Button,{key:"remove-block",onClick:()=>{r(e)},variant:"primary"},(0,a.__)("Remove block","statik-blocks"))]},(0,a.__)('"Tabs" block requires at least one "Tab" inner block.',"statik-blocks"))};function g(e){var t,o,l="";if("string"==typeof e||"number"==typeof e)l+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(o=g(e[t]))&&(l&&(l+=" "),l+=o);else for(t in e)e[t]&&(l&&(l+=" "),l+=t);return l}var f=function(){for(var e,t,o=0,l="";o<arguments.length;)(e=arguments[o++])&&(t=g(e))&&(l&&(l+=" "),l+=t);return l},h=(0,t.createElement)("svg",{version:"1.1",id:"Layer_1",focusable:"false",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 24 24"},(0,t.createElement)("g",null,(0,t.createElement)("path",{d:"M18,6.7h-1.1V6.1c0-1.1-0.9-2-2-2c0,0,0,0,0,0h-3.1c-0.5,0-1,0.2-1.4,0.5C10.1,4.2,9.6,4,9.1,4H6.1C5,4,4,4.9,4,6v2.7v7.8 v1.5c0,1.1,0.9,2,2,2h11.9c1.1,0,2-0.9,2-2V8.7C20,7.6,19.1,6.7,18,6.7z M11.8,5.4h3c0.4,0,0.7,0.3,0.7,0.7v0.6h-4.4V6.1 C11.1,5.7,11.4,5.4,11.8,5.4z M18.6,17.9c-0.2,0.5-0.5,0.7-0.7,0.7H6.1c-0.4,0-0.7-0.3-0.7-0.7V8V6.8V6.1c0-0.4,0.3-0.7,0.7-0.7h3 c0.4,0,0.7,0.3,0.7,0.7v0.6V8h1.3h4.4h1.3h1.1c0.4,0,0.7,0.3,0.7,0.7V17.9z"}),(0,t.createElement)("path",{d:"M15.2,10.6c-0.2-0.2-0.5-0.1-0.6,0.1L12,13.5c0,0-1.7-1.3-2.1-1.6c-0.2-0.2-0.4-0.2-0.6,0L6.7,14v1.6l2.9-2.4l2,1.5 c0.2,0.2,0.5,0.2,0.8,0l2.5-2.7l2.6,2.7V13L15.2,10.6C15.2,10.6,15.2,10.6,15.2,10.6z"})));const w=e=>{const{attributes:o}=e,{tabs:l=[]}=o;return(0,t.createElement)("nav",{className:"wp-block-statik-tabs__nav"},(0,t.createElement)("ul",{className:"wp-block-statik-tabs__nav-list",role:"tablist"},l.map((e=>(0,t.createElement)(E,{key:e.blockId,tab:e,attributes:o})))))},E=e=>{const{tab:o,attributes:l}=e,{tabs:a,preSelectedTab:n,descriptionEnabled:r}=l,s=a.findIndex((e=>e.blockId===o.blockId)),c=Number(n)===s,i=`wp-block-${o.blockId}-tab`,b=`wp-block-${o.blockId}-tabpanel`;return(0,t.createElement)("li",{key:o.blockId,className:f("wp-block-statik-tabs__nav-list-item",{"wp-block-statik-tabs__nav-list-item--selected":c,[o.tabClassName]:Boolean(o.tabClassName)})},(0,t.createElement)("button",{className:"wp-block-statik-tabs__nav-item",type:"button",role:"tab","aria-selected":c,"aria-controls":b,tabIndex:c?0:-1,id:i},(0,t.createElement)("p",{className:"wp-block-statik-tabs__nav-item-title"},o.title),r&&(0,t.createElement)("p",{className:"wp-block-statik-tabs__nav-item-desc"},o.description)))};var _=[{attributes:{activeTab:{type:"number",default:0},descriptionEnabled:{type:"boolean",default:!1},preSelectedTab:{type:"number",default:0},tabsAlignment:{enum:["left","center","right"],default:"left"},accentColor:{type:"string",default:"#CCE3EB"},textColor:{type:"string",default:"#3858E9"},activeAccentColor:{type:"string",default:"#1D35B4"},activeTextColor:{type:"string",default:"#FFFFFF"},contentBackgroundColor:{type:"string"},contentTextColor:{type:"string"}},save(){return(0,t.createElement)(o.InnerBlocks.Content,null)}}],x=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/tabs","version":"4.18.1","title":"Tabs","category":"layout","description":"Organise content in a tabbed layout","keywords":[],"textdomain":"statik-blocks","attributes":{"activeTab":{"type":"number","default":0},"descriptionEnabled":{"type":"boolean","default":false},"preSelectedTab":{"type":"number","default":0},"tabsAlignment":{"enum":["left","center","right"],"default":"left"},"accentColor":{"type":"string","default":"#CCE3EB"},"textColor":{"type":"string","default":"#3858E9"},"activeAccentColor":{"type":"string","default":"#1D35B4"},"activeTextColor":{"type":"string","default":"#FFFFFF"},"contentBackgroundColor":{"type":"string"},"contentTextColor":{"type":"string"},"tabs":{"type":"array"}},"example":{"attributes":{"descriptionEnabled":true,"contentBackgroundColor":"#FFFFFF","contentTextColor":"#39414D"},"innerBlocks":[{"name":"statik/tab","attributes":{"title":"Tab #1","description":"Tab #1 description"},"innerBlocks":[{"name":"core/group","attributes":{"style":{"spacing":{"padding":{"top":20,"right":20,"bottom":20,"left":20}}}},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Lorem ipsum dolor sit amet"}}]}]},{"name":"statik/tab","attributes":{"title":"Tab #2","description":"Tab #2 description"}}]},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css","viewScript":"file:./build/view.js"}');const T={icon:h,edit:function(e){const{attributes:l}=e,{blockId:a,accentColor:s,activeAccentColor:c,textColor:i,activeTextColor:b,contentBackgroundColor:u,contentTextColor:d,tabsAlignment:m}=l;(()=>{const{attributes:e,setAttributes:o}=(0,n.useBlockAttributes)(),{activeTab:l,preSelectedTab:a}=e,r=(0,n.useInnerBlocks)(),s=(0,n.useInnerBlocksIds)(),c=s.length>0,[i,b]=(0,t.useState)((()=>s[l])),[u,d]=(0,t.useState)((()=>s[a]));(0,t.useEffect)((()=>{c&&b(s[l])}),[l]),(0,t.useEffect)((()=>{c&&d(s[a])}),[a]),(0,t.useEffect)((()=>{c&&(s.includes(i)?o({activeTab:s.indexOf(i)}):o({activeTab:Math.max(0,l-1)})),c&&(s.includes(u)?o({preSelectedTab:s.indexOf(u)}):o({preSelectedTab:Math.max(0,a-1)}))}),[s]),(0,t.useEffect)((()=>{const e=r.map((e=>{const{blockId:t,title:o,description:l,tabClassName:a}=e.attributes;return{blockId:t,title:o,description:l,tabClassName:a}}));o({tabs:e})}),[r])})();const g=(0,o.useBlockProps)({className:f(`wp-block-${a}`,{[`wp-block-statik-tabs--nav-align-${m}`]:Boolean(m)}),style:(0,n.filterEntries)({"--statik-tabs--accentColor":s,"--statik-tabs--activeAccentColor":c,"--statik-tabs--textColor":i,"--statik-tabs--activeTextColor":b,"--statik-tabs--contentBackgroundColor":u,"--statik-tabs--contentTextColor":d},(e=>{let[,t]=e;return""!==t}))}),h=(0,o.useInnerBlocksProps)({className:"wp-block-statik-tabs__inner-blocks"},{allowedBlocks:C,template:p,templateInsertUpdatesSelection:!0,renderAppender:!1,orientation:"horizontal"});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(k,null),(0,t.createElement)(r,null),(0,t.createElement)("div",g,(0,t.createElement)("div",h),(0,t.createElement)(v,null)))},save:(0,n.resolveSave)((function(e){const{attributes:l}=e,{accentColor:a,activeAccentColor:r,textColor:s,activeTextColor:c,contentBackgroundColor:i,contentTextColor:b,tabsAlignment:u}=l,d=o.useBlockProps.save({className:f({[`wp-block-statik-tabs--nav-align-${u}`]:Boolean(u)}),style:(0,n.filterEntries)({"--statik-tabs--accentColor":a,"--statik-tabs--activeAccentColor":r,"--statik-tabs--textColor":s,"--statik-tabs--activeTextColor":c,"--statik-tabs--contentBackgroundColor":i,"--statik-tabs--contentTextColor":b},(e=>{let[,t]=e;return""!==t}))}),m=o.useInnerBlocksProps.save({className:"wp-block-statik-tabs__inner-blocks"});return(0,t.createElement)("div",d,(0,t.createElement)(w,{attributes:l}),(0,t.createElement)("div",m))})),deprecated:_};(0,e.registerBlockType)(x,T)}},o={};function l(e){var a=o[e];if(void 0!==a)return a.exports;var n=o[e]={exports:{}};return t[e](n,n.exports,l),n.exports}l.m=t,e=[],l.O=function(t,o,a,n){if(!o){var r=1/0;for(b=0;b<e.length;b++){o=e[b][0],a=e[b][1],n=e[b][2];for(var s=!0,c=0;c<o.length;c++)(!1&n||r>=n)&&Object.keys(l.O).every((function(e){return l.O[e](o[c])}))?o.splice(c--,1):(s=!1,n<r&&(r=n));if(s){e.splice(b--,1);var i=a();void 0!==i&&(t=i)}}return t}n=n||0;for(var b=e.length;b>0&&e[b-1][2]>n;b--)e[b]=e[b-1];e[b]=[o,a,n]},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={7995:0,9987:0};l.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,n,r=o[0],s=o[1],c=o[2],i=0;if(r.some((function(t){return 0!==e[t]}))){for(a in s)l.o(s,a)&&(l.m[a]=s[a]);if(c)var b=c(l)}for(t&&t(o);i<r.length;i++)n=r[i],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(b)},o=self.webpackChunkroot=self.webpackChunkroot||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var a=l.O(void 0,[9987],(function(){return l(82701)}));a=l.O(a)}();