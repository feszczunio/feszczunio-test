!function(){"use strict";var e,t={72328:function(){var e=window.wp.blocks,t=window.wp.element,a=window.wp.components,l=window.wp.i18n,n=window.wp.blockEditor,r=window.statik.editorUtils;const o="video",i=12,s=3;function c(){const{attributes:e,setAttributes:i}=(0,r.useBlockAttributes)(),{query:c,cardsPerRow:d,displayFeaturedImage:u,displayExcerpt:p,displayTitle:m,displayCategories:k,displayTags:y,displayLastUpdatedDate:b,displayReadMoreButton:g,displayPlayButton:_,followUpArea:v,destination:E,followUpBehaviour:f}=e,w="none"!==v,h=(0,r.useRwdAttribute)(d),C=(e,t,a)=>l=>{t.setDeviceValue(a,l),i({[e]:t.toRwd()})},{per_page:x=s}=c,B=t=>()=>{const a=e[t];i({[t]:!a})},T=(0,r.useBlockAcfSchemaOptions)(o);return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Settings","statik-blocks")},(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Number of Cards to display"),value:parseInt(x),onChange:("per_page",e=>{i({query:{...c,per_page:e}})}),min:1,max:12,required:!0}),(0,t.createElement)(r.ResponsiveSettingsTabs,null,(e=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)(a.__experimentalDivider,{marginTop:"0 !important"}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Number of Cards to display in a row","statik-blocks"),value:h.getDeviceValue(e.name),onChange:C("cardsPerRow",h,e.name),min:1,max:4}))))),(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Layout","statik-blocks")},(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Featured Image","statik-blocks"),checked:u,onChange:B("displayFeaturedImage")}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Entity Title","statik-blocks"),checked:m,onChange:B("displayTitle")}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Entity Excerpt","statik-blocks"),checked:p,onChange:B("displayExcerpt")}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Categories","statik-blocks"),checked:k,onChange:B("displayCategories")}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Tags","statik-blocks"),checked:y,onChange:B("displayTags")}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Last Updated Date","statik-blocks"),checked:b,onChange:B("displayLastUpdatedDate")}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Read More Button","statik-blocks"),checked:g,onChange:()=>{B("displayReadMoreButton")(),g&&"button"===v&&i({followUpArea:"none"})}}),(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Display Play Icon","statik-blocks"),checked:_,onChange:B("displayPlayButton")})),(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Follow-up action","statik-blocks")},(0,t.createElement)(a.SelectControl,{label:(0,l.__)("Follow-up area","statik-blocks"),options:[{value:"none",label:(0,l.__)("None","statik-blocks")},{value:"area",label:(0,l.__)("Post area is clickable","statik-blocks")},{value:"button",label:(0,l.__)("Only Read More button is clickable","statik-blocks")}],value:v,onChange:e=>{i({followUpArea:e})}}),w&&(0,t.createElement)(a.SelectControl,{label:(0,l.__)("Destination","statik-blocks"),options:[{value:"default",label:(0,l.__)("Default","statik-blocks")},...T.length?T:[{value:"none",label:(0,l.__)("No acf fields of url type associated with selected post type","statik-blocks"),disabled:!0}]],value:E,onChange:e=>{i({destination:e})}}),w&&(0,t.createElement)(a.SelectControl,{label:(0,l.__)("Follow-up behavior","statik-blocks"),options:[{value:"redirect",label:(0,l.__)("Redirect","statik-blocks")},{value:"modal",label:(0,l.__)("Display in a modal","statik-blocks")}],value:f,onChange:e=>{i({followUpBehaviour:e})}}))),(0,t.createElement)(n.InspectorAdvancedControls,null,(0,t.createElement)(a.BaseControl,null,(0,t.createElement)(r.QueryControl,{value:c,onApplyQuery:e=>{i({query:e})}}))))}function d(e){const{entities:a,cardComponent:l}=e;return(0,t.createElement)(t.Fragment,null,a.map((e=>(0,t.createElement)(l,{key:e.id,entity:e}))))}var u=window.wp.date;function p(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Lorem")),(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Dolor amet")))}function m(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Lorem ipsum")))}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},k.apply(this,arguments)}function y(e){return(0,t.createElement)("svg",k({xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32"},e),(0,t.createElement)("path",{fill:"fill",d:"M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z"}))}function b(e){const{attributes:a}=(0,r.useBlockAttributes)(),{displayFeaturedImage:n,displayTitle:o,displayExcerpt:i,displayCategories:s,displayTags:c,displayLastUpdatedDate:d,displayReadMoreButton:k,displayPlayButton:b}=a,{entity:g}=e,{title:_,excerpt:v={},date_gmt:E,featured_media:f,videos_category:w=[],videos_tag:h=[]}=g,C=(0,r.useMedia)(f),x=(0,t.useMemo)((()=>{const e=C?.media_details?.sizes["post-thumbnail"]?.source_url,t=C?.source_url;return null!=e?e:t}),[C]),{entities:B,isResolvingEntities:T}=(0,r.useEntitiesByTaxonomy)("videos_category",{include:w}),{entities:S,isResolvingEntities:R}=(0,r.useEntitiesByTaxonomy)("videos_tag",{include:h}),P=(0,u.__experimentalGetSettings)().formats.date,N=(0,u.dateI18n)(P,E),D=(0,u.dateI18n)("Y-m-d",E);return(0,t.createElement)("div",{className:"wp-block-statik-video-cards__card"},n&&x&&(0,t.createElement)("div",{className:"wp-block-statik-video-cards__image"},(0,t.createElement)("img",{src:x,alt:_.rendered})),s&&(0,t.createElement)("ul",{className:"wp-block-statik-video-cards__categories"},T&&(0,t.createElement)(m,null),B?.map((e=>(0,t.createElement)("li",{key:e.id},e.name)))),d&&(0,t.createElement)("time",{className:"wp-block-statik-video-cards__updated",dateTime:D},N),o&&(0,t.createElement)("h3",{className:"wp-block-statik-video-cards__title",dangerouslySetInnerHTML:{__html:_.rendered}}),i&&(0,t.createElement)("div",{className:"wp-block-statik-video-cards__excerpt",dangerouslySetInnerHTML:{__html:v.rendered}}),c&&(0,t.createElement)("ul",{className:"wp-block-statik-video-cards__tags"},R&&(0,t.createElement)(p,null),S?.map((e=>(0,t.createElement)("li",{key:e.id},e.name)))),k&&(0,t.createElement)("button",{className:"wp-block-statik-video-cards__read-more"},(0,l.__)("Read More","statik-blocks")),b&&(0,t.createElement)("button",{className:"wp-block-statik-video-cards__play-button"},(0,t.createElement)(y,null)))}function g(e){var t,a,l="";if("string"==typeof e||"number"==typeof e)l+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=g(e[t]))&&(l&&(l+=" "),l+=a);else for(t in e)e[t]&&(l&&(l+=" "),l+=t);return l}var _=function(){for(var e,t,a=0,l="";a<arguments.length;)(e=arguments[a++])&&(t=g(e))&&(l&&(l+=" "),l+=t);return l};function v(){const{attributes:e}=(0,r.useBlockAttributes)(),{displayFeaturedImage:a,displayExcerpt:l,displayTitle:n,displayCategories:o,displayTags:i,displayLastUpdatedDate:s,displayReadMoreButton:c}=e,d=_("wp-block-statik-video-cards__card","wp-block-statik-video-cards__card--preview");return(0,t.createElement)("div",{className:d},a&&(0,t.createElement)("div",{className:"wp-block-statik-video-cards__image"},(0,t.createElement)(r.Skeleton,{style:{height:200,width:"100%"}})),o&&(0,t.createElement)("ul",{className:"wp-block-statik-video-cards__categories"},(0,t.createElement)(m,null)),s&&(0,t.createElement)("time",{className:"wp-block-statik-video-cards__updated",dateTime:"2012-12-12"},(0,t.createElement)(r.Skeleton.Inline,null,"12.12.2012")),n&&(0,t.createElement)("h3",{className:"wp-block-statik-video-cards__title"},(0,t.createElement)(r.Skeleton.Inline,null,"Sample title")),l&&(0,t.createElement)("div",{className:"wp-block-statik-video-cards__excerpt"},(0,t.createElement)(r.Skeleton.Text,{tag:"p"},"Lorem ipsum dolor sit amet Consectetur adipiscing elit. Suspendisse et ligula eu est eleifend molestie.")),i&&(0,t.createElement)("ul",{className:"wp-block-statik-video-cards__tags"},(0,t.createElement)(p,null)),c&&(0,t.createElement)("button",{className:"wp-block-statik-video-cards__read-more"},(0,t.createElement)(r.Skeleton.Inline,null,"Read More")))}function E(){var e;const{attributes:a}=(0,r.useBlockAttributes)(),{query:c}=a,u=(0,t.useMemo)((()=>({...c,per_page:i})),[c]),{hasEntities:p,isResolvingEntities:m,hasResolvedEntities:k,entities:y}=(0,r.useEntitiesByPostType)(o,u),g=null!==(e=c.per_page)&&void 0!==e?e:s;if(k&&!p)return(0,t.createElement)(n.Warning,null,(0,l.__)("Could not find any entities.","statik-blocks"));if(m){const e=[...Array(g).keys()].map((e=>({id:e})));return(0,t.createElement)(d,{key:"cards-rows-preview",entities:e,cardComponent:v})}if(p){const e=y.slice(0,g);return(0,t.createElement)(d,{key:"cards-rows",entities:e,cardComponent:b})}return null}var f=(0,t.createElement)("svg",{version:"1.1",id:"Layer_1",focusable:"false",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 24 24"},(0,t.createElement)("g",null,(0,t.createElement)("g",{id:"Layer_1-2"},(0,t.createElement)("path",{id:"Path_1",d:"M6,4C4.9,4,4,4.9,4,6l0,0v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V6c0-1.1-0.8-2-2-2.1l0,0L6,4L6,4z M18,18.7 H6c-0.4,0-0.7-0.3-0.7-0.7V6.1c0-0.4,0.3-0.7,0.7-0.7h12c0.4,0,0.7,0.3,0.7,0.7V18C18.4,18.5,18.2,18.7,18,18.7L18,18.7z"}),(0,t.createElement)("path",{d:"M0.4,4H0v1.3h0.4C0.7,5.3,1,5.6,1.1,6v11.9c-0.2,0.5-0.5,0.7-0.7,0.7H0V20h0.4c1.1,0,2-0.9,2-2V6C2.4,4.9,1.6,4,0.4,4 L0.4,4z"}),(0,t.createElement)("path",{d:"M23.6,4H24v1.3h-0.4C23.3,5.3,23,5.6,23,6v11.9c0.2,0.5,0.5,0.7,0.7,0.7H24V20h-0.4c-1.1,0-2-0.9-2-2V6 C21.6,4.9,22.5,4,23.6,4z"}),(0,t.createElement)("path",{d:"M14.7,11.1l-4.3-2.5C9.7,8.2,8.8,8.7,8.8,9.4v5c0,0.8,0.8,1.2,1.5,0.9l4.3-2.5C15.3,12.4,15.3,11.5,14.7,11.1z"})))),w=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/video-cards","version":"4.18.1","title":"Video Cards","category":"media","description":"Present WordPress entities as card components either organised as a rows and columns or a carousel.","keywords":[],"textdomain":"statik-blocks","attributes":{"cardsPerRow":{"type":"array","items":{"type":"number"},"default":[3]},"displayFeaturedImage":{"type":"boolean","default":true},"displayTitle":{"type":"boolean","default":true},"displayExcerpt":{"type":"boolean","default":true},"displayCategories":{"type":"boolean","default":true},"displayTags":{"type":"boolean","default":true},"displayLastUpdatedDate":{"type":"boolean","default":true},"displayReadMoreButton":{"type":"boolean","default":true},"displayPlayButton":{"type":"boolean","default":true},"followUpArea":{"type":"string","enum":["none","area","button"],"default":"none"},"destination":{"type":"string","default":"default"},"followUpBehaviour":{"type":"string","enum":["redirect","modal"],"default":"redirect"},"query":{"type":"object","default":{}}},"supports":{"align":["wide","full"]},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css","viewScript":"file:./build/view.js"}');const h={icon:f,edit:function(e){const{attributes:a}=e,{cardsPerRow:l}=a,o=(0,n.useBlockProps)(),i=(0,r.useRwdAttribute)(l),s=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-video-cards--attr--cardsPerRow: ${i.inherit.default};\n\t`),d=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-video-cards--attr--cardsPerRow: ${i.inherit.mobile};\n\t`,{before:"@media (min-width: 0) {",after:"}"}),u=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-video-cards--attr--cardsPerRow: ${i.inherit.tablet};\n\t`,{before:"@media (min-width: 768px) {",after:"}"}),p=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-video-cards--attr--cardsPerRow: ${i.inherit.desktop};\n\t`,{before:"@media (min-width: 1000px) {",after:"}"});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(c,null),(0,t.createElement)("div",o,(0,t.createElement)("style",s),(0,t.createElement)("style",d),(0,t.createElement)("style",u),(0,t.createElement)("style",p),(0,t.createElement)(E,null)))},save:()=>null};(0,e.registerBlockType)(w,h)}},a={};function l(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=function(t,a,n,r){if(!a){var o=1/0;for(d=0;d<e.length;d++){a=e[d][0],n=e[d][1],r=e[d][2];for(var i=!0,s=0;s<a.length;s++)(!1&r||o>=r)&&Object.keys(l.O).every((function(e){return l.O[e](a[s])}))?a.splice(s--,1):(i=!1,r<o&&(o=r));if(i){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,n,r]},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={3664:0,5075:0};l.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,r,o=a[0],i=a[1],s=a[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in i)l.o(i,n)&&(l.m[n]=i[n]);if(s)var d=s(l)}for(t&&t(a);c<o.length;c++)r=o[c],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(d)},a=self.webpackChunkroot=self.webpackChunkroot||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var n=l.O(void 0,[5075],(function(){return l(72328)}));n=l.O(n)}();