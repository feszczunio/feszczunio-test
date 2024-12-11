!function(){"use strict";var e,t={13229:function(){var e=window.wp.i18n,t=window.wp.element,r=(0,t.createElement)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{fill:"#1e1e1e",d:"M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"})),n=window.wp.blockEditor,o=window.wp.blocks,a=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"core/code","title":"Code","category":"text","description":"Display code snippets that respect your spacing and tabs.","textdomain":"default","attributes":{"content":{"type":"string","source":"html","selector":"code","__unstablePreserveWhiteSpace":true}},"supports":{"align":["wide"],"anchor":true,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"spacing":{"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"margin":false,"padding":false}},"__experimentalBorder":{"radius":true,"color":true,"width":true,"style":true,"__experimentalDefaultControls":{"width":true,"color":true}},"color":{"text":true,"background":true,"gradients":true,"__experimentalDefaultControls":{"background":true,"text":true}}},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css"}'),c=window.wp.compose;function i(e){return e.replace(/\[/g,"&#91;")}function l(e){return e.replace(/^(\s*https?:)\/\/([^\s<>"]+\s*)$/m,"$1&#47;&#47;$2")}var s=window.wp.richText,u={from:[{type:"enter",regExp:/^```$/,transform:()=>(0,o.createBlock)("core/code")},{type:"block",blocks:["core/paragraph"],transform:e=>{let{content:t}=e;return(0,o.createBlock)("core/code",{content:t})}},{type:"block",blocks:["core/html"],transform:e=>{let{content:t}=e;return(0,o.createBlock)("core/code",{content:(0,s.toHTMLString)({value:(0,s.create)({text:t})})})}},{type:"raw",isMatch:e=>"PRE"===e.nodeName&&1===e.children.length&&"CODE"===e.firstChild.nodeName,schema:{pre:{children:{code:{children:{"#text":{}}}}}}}],to:[{type:"block",blocks:["core/paragraph"],transform:e=>{let{content:t}=e;return(0,o.createBlock)("core/paragraph",{content:t})}}]},p=window.statik.editorUtils;const{name:d}=a,m={icon:r,example:{attributes:{
// translators: Preserve \n markers for line breaks
content:(0,e.__)("// A “block” is the abstract term used\n// to describe units of markup that\n// when composed together, form the\n// content or layout of a page.\nregisterBlockType( name, settings );")}},merge(e,t){return{content:e.content+"\n\n"+t.content}},transforms:u,edit:function(r){let{attributes:a,setAttributes:c,onRemove:i,insertBlocksAfter:l,mergeBlocks:s}=r;const u=(0,n.useBlockProps)();return(0,t.createElement)("pre",u,(0,t.createElement)(n.RichText,{tagName:"code",identifier:"content",value:a.content,onChange:e=>c({content:e}),onRemove:i,onMerge:s,placeholder:(0,e.__)("Write code…"),"aria-label":(0,e.__)("Code"),preserveWhiteSpace:!0,__unstablePastePlainText:!0,__unstableOnSplitAtDoubleLineEnd:()=>l((0,o.createBlock)((0,o.getDefaultBlockName)()))}))},save:function(e){let{attributes:r}=e;return(0,t.createElement)("pre",n.useBlockProps.save(),(0,t.createElement)(n.RichText.Content,{tagName:"code",value:(o=r.content,(0,c.pipe)(i,l)(o||""))}));var o}};(0,p.overrideBlockType)(d,a,m)}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,n),a.exports}n.m=t,e=[],n.O=function(t,r,o,a){if(!r){var c=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var i=!0,l=0;l<r.length;l++)(!1&a||c>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(i=!1,a<c&&(c=a));if(i){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={4217:0,535:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,c=r[0],i=r[1],l=r[2],s=0;if(c.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(l)var u=l(n)}for(t&&t(r);s<c.length;s++)a=c[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},r=self.webpackChunkroot=self.webpackChunkroot||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[535],(function(){return n(13229)}));o=n.O(o)}();