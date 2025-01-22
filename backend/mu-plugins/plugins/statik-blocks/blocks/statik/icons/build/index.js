!function(){"use strict";var t,e={81584:function(){var t=window.wp.blocks,e=window.wp.element;function n(t){var e,i,o="";if("string"==typeof t||"number"==typeof t)o+=t;else if("object"==typeof t)if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(i=n(t[e]))&&(o&&(o+=" "),o+=i);else for(e in t)t[e]&&(o&&(o+=" "),o+=e);return o}var i=function(){for(var t,e,i=0,o="";i<arguments.length;)(t=arguments[i++])&&(e=n(t))&&(o&&(o+=" "),o+=e);return o},o=window.wp.blockEditor,r=(0,e.createElement)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{fill:"#1e1e1e",d:"M17 3H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V5c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v4zm-8-1.2h5V6.2h-5v1.6zM17 13H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v4zm-8-1.2h5v-1.5h-5v1.5z"})),s=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/icons","version":"4.18.1","title":"Icons","category":"design","description":"Prompt visitors to take action with a group of icons.","keywords":[],"textdomain":"statik-blocks","attributes":{"contentJustification":{"type":"string"},"orientation":{"type":"string","default":"horizontal"}},"supports":{"anchor":true,"align":["wide","full"],"__experimentalExposeControlsToChildren":true},"example":{"innerBlocks":[{"name":"statik/icon","attributes":{"icon":"blocks"}},{"name":"statik/icon","attributes":{"icon":"blocks"}}]},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css"}'),a=[{attributes:{contentJustification:{type:"string"},orientation:{type:"string",default:"horizontal"}},save(){return(0,e.createElement)(o.InnerBlocks.Content,null)}}],l=window.wp.data,c=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/icon","version":"4.18.1","title":"Icon","category":"common","description":"Insert an icon to draw attention of your visitors.","keywords":[],"textdomain":"statik-blocks","attributes":{"align":{"type":"string","default":"center"},"icon":{"type":"string"},"alt":{"type":"string"},"id":{"type":"number"},"iconUrl":{"type":"string"},"iconSize":{"type":"string","default":"120px"},"iconSpacing":{"type":"string","default":"25px"},"iconBorder":{"type":"string","default":"10px"},"iconColor":{"type":"string","default":"#222222"},"accentColor":{"type":"string","default":"#FF8085"},"style":{"type":"object"}},"example":{"attributes":{"icon":"blocks","className":"is-style-circular","iconSpacing":"60px","iconSize":"250px","iconBorder":"20px"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"rectangular","label":"Rectangular"},{"name":"circular","label":"Circular"},{"name":"outline","label":"Outline"}],"supports":{"color":false},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css"}');const{name:u}=c,p=[u],f={type:"default",alignments:[]},d=["left","center","right"],m=["left","center","right","space-between"];var v=window.wp.i18n,b=[{name:"icons-horizontal",isDefault:!0,title:(0,v.__)("Horizontal","statik-blocks"),description:(0,v.__)("Buttons shown in a row.","statik-blocks"),attributes:{orientation:"horizontal"},scope:["transform"]},{name:"icons-vertical",title:(0,v.__)("Vertical","statik-blocks"),description:(0,v.__)("Buttons shown in a column.","statik-blocks"),attributes:{orientation:"vertical"},scope:["transform"]}];const g={icon:r,edit:function(t){let{attributes:{contentJustification:n,orientation:r},setAttributes:s}=t;const a=(0,o.useBlockProps)({className:i({[`is-content-justification-${n}`]:n,"is-vertical":"vertical"===r})}),c=(0,l.useSelect)((t=>{const e=t(o.store).getSettings().__experimentalPreferredStyleVariations;return e?.value?.[u]}),[]),v=(0,o.useInnerBlocksProps)(a,{allowedBlocks:p,template:[[u,{className:c&&`is-style-${c}`}]],orientation:r,__experimentalLayout:f,templateInsertUpdatesSelection:!0}),b="vertical"===r?d:m;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(o.BlockControls,{group:"block",__experimentalShareWithChildBlocks:!0},(0,e.createElement)(o.JustifyContentControl,{allowedControls:b,value:n,onChange:t=>s({contentJustification:t}),popoverProps:{position:"bottom right",isAlternate:!0}})),(0,e.createElement)("div",v))},save:(0,window.statik.editorUtils.resolveSave)((function(t){const{attributes:n}=t,{contentJustification:r,orientation:s}=n,a=o.useBlockProps.save({className:i({[`is-content-justification-${r}`]:r,"is-vertical":"vertical"===s})}),l=o.useInnerBlocksProps.save(a);return(0,e.createElement)("div",l)})),deprecated:a,variations:b};(0,t.registerBlockType)(s,g)}},n={};function i(t){var o=n[t];if(void 0!==o)return o.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,i),r.exports}i.m=e,t=[],i.O=function(e,n,o,r){if(!n){var s=1/0;for(u=0;u<t.length;u++){n=t[u][0],o=t[u][1],r=t[u][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||s>=r)&&Object.keys(i.O).every((function(t){return i.O[t](n[l])}))?n.splice(l--,1):(a=!1,r<s&&(s=r));if(a){t.splice(u--,1);var c=o();void 0!==c&&(e=c)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[n,o,r]},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={3035:0,8206:0};i.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,r,s=n[0],a=n[1],l=n[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(o in a)i.o(a,o)&&(i.m[o]=a[o]);if(l)var u=l(i)}for(e&&e(n);c<s.length;c++)r=s[c],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(u)},n=self.webpackChunkroot=self.webpackChunkroot||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var o=i.O(void 0,[8206],(function(){return i(81584)}));o=i.O(o)}();