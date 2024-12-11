!function(){var e={94184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=l.apply(null,n);o&&e.push(o)}}else if("object"===i){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)r.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(n=function(){return l}.apply(t,[]))||(e.exports=n)}()}},t={};function n(r){var l=t[r];if(void 0!==l)return l.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.element,t=(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)("path",{fill:"#1e1e1e",d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"})),r=n(94184),l=n.n(r),i=window.wp.blockEditor,o=[{attributes:{verticalAlignment:{type:"string"},width:{type:"number",min:0,max:100}},isEligible(e){let{width:t}=e;return isFinite(t)},migrate(e){return{...e,width:`${e.width}%`}},save(t){let{attributes:n}=t;const{verticalAlignment:r,width:o}=n,a=l()({[`is-vertically-aligned-${r}`]:r}),s={flexBasis:o+"%"};return(0,e.createElement)("div",{className:a,style:s},(0,e.createElement)(i.InnerBlocks.Content,null))}}],a=window.wp.components,s=window.wp.data,c=window.wp.i18n,u=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"core/column","title":"Column","category":"design","parent":["core/columns"],"description":"A single column within a columns block.","textdomain":"default","attributes":{"verticalAlignment":{"type":"string"},"width":{"type":"string"},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]}},"supports":{"__experimentalOnEnter":true,"anchor":true,"reusable":false,"html":false,"color":{"gradients":true,"heading":true,"button":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"spacing":{"blockGap":true,"padding":true,"__experimentalDefaultControls":{"padding":true,"blockGap":true}},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"layout":true},"editorScript":"file:./build/index.js"}'),p=window.statik.editorUtils;const{name:d}=u,m={icon:t,edit:function(t){let{attributes:{verticalAlignment:n,width:r,templateLock:o,allowedBlocks:u},setAttributes:p,clientId:d}=t;const m=l()("block-core-columns",{[`is-vertically-aligned-${n}`]:n}),[g]=(0,i.useSettings)("spacing.units"),f=(0,a.__experimentalUseCustomUnits)({availableUnits:g||["%","px","em","rem","vw"]}),{columnsIds:h,hasChildBlocks:v,rootClientId:w}=(0,s.useSelect)((e=>{const{getBlockOrder:t,getBlockRootClientId:n}=e(i.store),r=n(d);return{hasChildBlocks:t(d).length>0,rootClientId:r,columnsIds:t(r)}}),[d]),{updateBlockAttributes:b}=(0,s.useDispatch)(i.store),_=Number.isFinite(r)?r+"%":r,x=(0,i.useBlockProps)({className:m,style:_?{flexBasis:_}:void 0}),y=h.length,k=h.indexOf(d)+1,B=(0,c.sprintf)(/* translators: 1: Block label (i.e. "Block: Column"), 2: Position of the selected block, 3: Total number of sibling blocks of the same type */
(0,c.__)("%1$s (%2$d of %3$d)"),x["aria-label"],k,y),C=(0,i.useInnerBlocksProps)({...x,"aria-label":B},{templateLock:o,allowedBlocks:u,renderAppender:v?void 0:i.InnerBlocks.ButtonBlockAppender});return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.BlockControls,null,(0,e.createElement)(i.BlockVerticalAlignmentToolbar,{onChange:e=>{p({verticalAlignment:e}),b(w,{verticalAlignment:null})},value:n,controls:["top","center","bottom","stretch"]})),(0,e.createElement)(i.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,c.__)("Column settings")},(0,e.createElement)(a.__experimentalUnitControl,{label:(0,c.__)("Width"),labelPosition:"edge",__unstableInputWidth:"80px",value:r||"",onChange:e=>{e=0>parseFloat(e)?"0":e,p({width:e})},units:f}))),(0,e.createElement)("div",C))},save:function(t){let{attributes:n}=t;const{verticalAlignment:r,width:o}=n,a=l()({[`is-vertically-aligned-${r}`]:r});let s;if(o&&/\d/.test(o)){let e=Number.isFinite(o)?o+"%":o;if(!Number.isFinite(o)&&o?.endsWith("%")){const t=1e12;e=Math.round(Number.parseFloat(o)*t)/t+"%"}s={flexBasis:e}}const c=i.useBlockProps.save({className:a,style:s}),u=i.useInnerBlocksProps.save(c);return(0,e.createElement)("div",u)},deprecated:o};(0,p.overrideBlockType)(d,u,m)}()}();