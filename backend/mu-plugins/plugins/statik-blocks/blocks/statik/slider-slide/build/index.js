!function(){"use strict";var e,t={82797:function(){var e=window.wp.blocks,t=window.wp.element,l=window.wp.blockEditor,n=window.wp.components,o=window.React,s=window.wp.primitives,r=(0,o.createElement)(s.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,o.createElement)(s.Path,{d:"M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"})),i=(0,o.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,o.createElement)(s.Path,{d:"M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6zM10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"})),c=(0,o.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,o.createElement)(s.Path,{d:"M20 5h-5.7c0-1.3-1-2.3-2.3-2.3S9.7 3.7 9.7 5H4v2h1.5v.3l1.7 11.1c.1 1 1 1.7 2 1.7h5.7c1 0 1.8-.7 2-1.7l1.7-11.1V7H20V5zm-3.2 2l-1.7 11.1c0 .1-.1.2-.3.2H9.1c-.1 0-.3-.1-.3-.2L7.2 7h9.6z"})),a=window.wp.data,d=window.wp.i18n,u=window.statik.editorUtils;function m(l){const{rootClientId:o}=l,s=(0,u.useBlockClientId)(),m=(0,u.useInnerBlocksIds)(o),{selectBlock:k,insertBlock:p,removeBlock:b}=(0,a.useDispatch)("core/block-editor"),{getBlockIndex:f}=(0,a.useSelect)("core/block-editor"),{attributes:w,setAttributes:v}=(0,u.useBlockAttributes)(o),{selectedSlideIndex:h}=w,B=s===o,E=m.length>1&&!B,g=m[h],I=(0,t.useMemo)((()=>m.map(((e,t)=>({label:`Slide #${t}`,value:e})))),[m]),S=async e=>{const t=f(e,o);v({selectedSlideIndex:t}),await k(e);const l=`block-${e}`;window.document.getElementById(l)?.focus()};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.ToolbarButton,{label:(0,d.__)("Slide index","statik-blocks"),isDisabled:!0},(0,t.createElement)("span",null,"  ",`#${h}`)),(0,t.createElement)(n.ToolbarDropdownMenu,{icon:r,label:(0,d.__)("Select slide","statik-blocks")},(()=>(0,t.createElement)(n.MenuGroup,null,(0,t.createElement)(n.MenuItemsChoice,{choices:I,value:B?void 0:g,onSelect:S})))),(0,t.createElement)(n.ToolbarButton,{icon:i,label:(0,d.__)("Add new slide","statik-blocks"),onClick:async()=>{const t=(0,e.createBlock)("statik/slider-slide"),l=h+1;await p(t,l,o,!1),await S(t.clientId)}}),(0,t.createElement)(n.ToolbarButton,{icon:c,label:(0,d.__)("Delete slide","statik-blocks"),onClick:async()=>{E&&(await b(s),v({selectedSlideIndex:Math.max(0,h-1)}))},isDisabled:!E}))}function k(){const e=(0,u.useBlockRootClientId)();return(0,t.createElement)(l.BlockControls,null,(0,t.createElement)(n.ToolbarGroup,null,(0,t.createElement)(m,{rootClientId:e})))}function p(){return(0,t.createElement)(l.InspectorControls,null,(0,t.createElement)(n.PanelBody,{title:(0,d.__)("Settings","statik-blocks")},(0,t.createElement)(n.Notice,{isDismissible:!1,status:"info"},(0,d.__)("Settings are not available for a single slide. Please select “Slider” block out of a breadcrumb navigation located at the bottom section of Gutenberg.","statik-blocks"))))}function b(e){var t,l,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(l=b(e[t]))&&(n&&(n+=" "),n+=l);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}var f=function(){for(var e,t,l=0,n="";l<arguments.length;)(e=arguments[l++])&&(t=b(e))&&(n&&(n+=" "),n+=t);return n},w=(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 27.68 18"},(0,t.createElement)("defs",null),(0,t.createElement)("g",{id:"Layer_2","data-name":"Layer 2"},(0,t.createElement)("g",{id:"Layer_1-2","data-name":"Layer 1"},(0,t.createElement)("path",{id:"Path_1","data-name":"Path 1",d:"M7.14,0a2.27,2.27,0,0,0-2.3,2.23V15.7A2.27,2.27,0,0,0,7.07,18H20.54a2.27,2.27,0,0,0,2.3-2.23V2.3A2.26,2.26,0,0,0,20.62,0H7.14Zm13.4,16.5H7.14a.86.86,0,0,1-.8-.8V2.3a.86.86,0,0,1,.8-.8h13.4a.86.86,0,0,1,.8.8V15.7C21.07,16.23,20.81,16.5,20.54,16.5Z"}),(0,t.createElement)("polygon",{points:"27.68 8.99 25 6.31 24.1 7.22 25.88 9 24.1 10.79 25 11.69 27.68 9.01 27.67 9 27.68 8.99"}),(0,t.createElement)("polygon",{points:"0 8.99 2.68 6.31 3.58 7.22 1.8 9 3.58 10.79 2.68 11.69 0 9.01 0.01 9 0 8.99"}),(0,t.createElement)("rect",{id:"Rectangle_2","data-name":"Rectangle 2",x:"7.86",y:"12.45",width:"9",height:"1.5"}),(0,t.createElement)("path",{className:"cls-1",d:"M7.8,7.5l3-2.4a.45.45,0,0,1,.64,0c.45.36,2.34,1.82,2.34,1.82l2.9-3.18a.52.52,0,0,1,.81,0c.47.5,2.45,2.66,2.45,2.66V8.24L17.07,5.16,14.24,8.24a.69.69,0,0,1-.85,0c-.62-.43-2.29-1.63-2.29-1.63L7.79,9.33Z"})))),v=[{attributes:{},save(){return(0,t.createElement)(l.InnerBlocks.Content,null)}}],h=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/slider-slide","version":"4.18.1","title":"Slide","parent":["statik/slider"],"category":"layout","description":"A child item of a Slider Block.","keywords":[],"textdomain":"statik-blocks","attributes":{"isPreSelected":{"type":"boolean","default":false},"slideIndex":{"type":"number"},"slidesCount":{"type":"number"}},"supports":{"inserter":false,"reusable":false,"html":false},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css"}');const B={icon:w,edit:function(){(()=>{const{setAttributes:e}=(0,u.useBlockAttributes)(),l=(0,u.useBlockRootClientId)(),n=(0,u.useInnerBlocksIds)(l),{attributes:o}=(0,u.useBlockRootAttributes)(),{preSelectedSlide:s}=o,r=(0,u.useBlockIndex)();(0,t.useEffect)((()=>{e({isPreSelected:Number(r)===Number(s)})}),[s]),(0,t.useEffect)((()=>{e({slideIndex:r})}),[r]),(0,t.useEffect)((()=>{e({slidesCount:n.length})}),[n.length])})();const{hasInnerBlocks:e,isSelectedSlide:n}=(()=>{const e=(0,u.useBlockClientId)(),t=(0,u.useBlockRootClientId)(),{getBlockIndex:l}=(0,a.useSelect)("core/block-editor"),n=l(e,t),{attributes:o}=(0,u.useBlockRootAttributes)(),{selectedSlideIndex:s}=o;return{isSelectedSlide:s===n,hasInnerBlocks:(0,u.useHasInnerBlocks)()}})(),o=(0,l.useBlockProps)({className:f({"wp-block-statik-slider-slide--selected":n})}),s=(0,l.useInnerBlocksProps)(o,{templateLock:!1,renderAppender:e?void 0:l.InnerBlocks.ButtonBlockAppender});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(k,null),(0,t.createElement)(p,null),(0,t.createElement)("div",s))},save:(0,u.resolveSave)((function(e){const{attributes:n}=e,{isPreSelected:o,slideIndex:s,slidesCount:r}=n,i=l.useBlockProps.save({className:f({"wp-block-statik-slider-slide--selected":Boolean(o)}),role:"group","aria-roledescription":"slide","aria-label":`${s+1} of ${r}`}),c=l.useInnerBlocksProps.save(i);return(0,t.createElement)("div",c)})),deprecated:v};(0,e.registerBlockType)(h,B)}},l={};function n(e){var o=l[e];if(void 0!==o)return o.exports;var s=l[e]={exports:{}};return t[e](s,s.exports,n),s.exports}n.m=t,e=[],n.O=function(t,l,o,s){if(!l){var r=1/0;for(d=0;d<e.length;d++){l=e[d][0],o=e[d][1],s=e[d][2];for(var i=!0,c=0;c<l.length;c++)(!1&s||r>=s)&&Object.keys(n.O).every((function(e){return n.O[e](l[c])}))?l.splice(c--,1):(i=!1,s<r&&(r=s));if(i){e.splice(d--,1);var a=o();void 0!==a&&(t=a)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[l,o,s]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={9756:0,2087:0};n.O.j=function(t){return 0===e[t]};var t=function(t,l){var o,s,r=l[0],i=l[1],c=l[2],a=0;if(r.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var d=c(n)}for(t&&t(l);a<r.length;a++)s=r[a],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},l=self.webpackChunkroot=self.webpackChunkroot||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var o=n.O(void 0,[2087],(function(){return n(82797)}));o=n.O(o)}();