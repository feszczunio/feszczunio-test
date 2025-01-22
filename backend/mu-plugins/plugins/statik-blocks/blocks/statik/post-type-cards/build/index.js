!function(){"use strict";var e,t={46827:function(){var e=window.wp.blocks,t=window.wp.element,l=(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0",y:"0",enableBackground:"new 0 0 560 560",version:"1.1",viewBox:"0 0 560 560",xmlSpace:"preserve"},(0,t.createElement)("path",{d:"M258.6 348.6H78.8v-80.4h179.7v80.4zM99.9 327.5h137.6v-38.3H99.9v38.3zm381.3-80.8H78.8v-80.5h402.4v80.5zm-381.3-21h360.2v-38.3H99.9v38.3zm381.3-80.8H78.8V64.5h402.4v80.4zm-381.3-21h360.2V85.5H99.9v38.4zM0 0v560h355l205-205V0H0zm361.2 524.1v-163h162.9l-162.9 163zm-21.1-184V539h-319V21.1H539v319H340.1z"})),a=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"statik/post-type-cards","version":"4.18.1","title":"Post Type Cards","category":"layout","description":"Present WordPress entities as card components either organised as a rows and columns or a carousel.","keywords":[],"textdomain":"statik-blocks","attributes":{"postType":{"type":"string"},"cardsPerRow":{"type":"array","items":{"type":"number"},"default":[3]},"displayFeaturedImage":{"type":"boolean","default":true},"displayTitle":{"type":"boolean","default":true},"displayExcerpt":{"type":"boolean","default":true},"displayCategories":{"type":"boolean","default":true},"displayTags":{"type":"boolean","default":true},"displayLastUpdatedDate":{"type":"boolean","default":true},"displayReadMoreButton":{"type":"boolean","default":true},"followUpArea":{"enum":["none","area","button"],"type":"string","default":"none"},"destination":{"type":"string","default":"default"},"query":{"type":"object","default":{"per_page":3}},"excludeCurrentPost":{"type":"boolean","default":false}},"example":{"query":{}},"supports":{"align":["wide","full"]},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css","viewScript":"file:./build/view.js"}'),n=window.wp.components,s=window.wp.i18n,o=window.wp.blockEditor,r=window.statik.editorUtils;const i=12,c=3;function p(){const{attributes:e,setAttributes:l}=(0,r.useBlockAttributes)(),{postType:a,query:p,cardsPerRow:u,displayFeaturedImage:d,displayExcerpt:m,displayTitle:y,displayCategories:k,displayTags:b,displayLastUpdatedDate:g,displayReadMoreButton:E,followUpArea:_,destination:w,excludeCurrentPost:f}=e,h="none"!==_,v=(0,r.useRwdAttribute)(u),C=(e,t,a)=>n=>{t.setDeviceValue(a,n),l({[e]:t.toRwd()})},{per_page:T=c}=p,S=t=>()=>{const a=e[t];l({[t]:!a})},x=(0,r.useBlockAcfSchemaOptions)(null!=a?a:""),{hasThumbnailSupport:P,hasTitleSupport:B,hasExcerptSupport:R,hasCategoriesSupport:I,hasTagsSupport:N}=(0,r.usePostTypeSupports)(a);return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(n.PanelBody,{title:(0,s.__)("Settings","statik-blocks")},(0,t.createElement)(n.RangeControl,{label:(0,s.__)("Number of Cards to display"),value:parseInt(T),onChange:("per_page",e=>{l({query:{...p,per_page:e}})}),min:1,max:i,required:!0}),(0,t.createElement)(r.ResponsiveSettingsTabs,null,(e=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.__experimentalDivider,{marginTop:"0 !important"}),(0,t.createElement)(n.RangeControl,{label:(0,s.__)("Number of Cards to display in a row","statik-blocks"),value:v.getDeviceValue(e.name),onChange:C("cardsPerRow",v,e.name),min:1,max:4}))))),(0,t.createElement)(n.PanelBody,{title:(0,s.__)("Layout","statik-blocks")},P&&(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Featured Images","statik-blocks"),checked:d,onChange:S("displayFeaturedImage")}),B&&(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Entity Title","statik-blocks"),checked:y,onChange:S("displayTitle")}),R&&(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Entity Excerpt","statik-blocks"),checked:m,onChange:S("displayExcerpt")}),I&&(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Categories","statik-blocks"),checked:k,onChange:S("displayCategories")}),N&&(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Tags","statik-blocks"),checked:b,onChange:S("displayTags")}),(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Last Updated Date","statik-blocks"),checked:g,onChange:S("displayLastUpdatedDate")}),(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Display Read More Button","statik-blocks"),checked:E,onChange:()=>{S("displayReadMoreButton")(),E&&"button"===_&&l({followUpArea:"none"})}})),(0,t.createElement)(n.PanelBody,{title:(0,s.__)("Follow-up action","statik-blocks")},(0,t.createElement)(n.SelectControl,{label:(0,s.__)("Follow-up area","statik-blocks"),options:[{value:"none",label:(0,s.__)("No follow-up","statik-blocks")},{value:"area",label:(0,s.__)("Card area is clickable","statik-blocks")},{value:"button",label:(0,s.__)("Read More button is clickable","statik-blocks"),disabled:!E}],value:_,onChange:e=>{l({followUpArea:e})}}),h&&(0,t.createElement)(n.SelectControl,{label:(0,s.__)("Destination","statik-blocks"),options:[{value:"default",label:(0,s.__)("Default","statik-blocks")},...x.length?x:[{value:"none",label:(0,s.__)("No acf fields of url type associated with selected post type","statik-blocks"),disabled:!0}]],value:w,onChange:e=>{l({destination:e})}}))),(0,t.createElement)(o.InspectorAdvancedControls,null,(0,t.createElement)(n.BaseControl,null,(0,t.createElement)(n.ToggleControl,{label:(0,s.__)("Exclude current post","statik-blocks"),checked:f,onChange:S("excludeCurrentPost")}),(0,t.createElement)(r.QueryControl,{value:p,onApplyQuery:e=>{l({query:e})}}))))}function u(e){const{entities:l,cardComponent:a}=e;return(0,t.createElement)(t.Fragment,null,l.map((e=>(0,t.createElement)(a,{key:e.id,entity:e}))))}var d=window.wp.date;function m(e){const{attributes:l}=(0,r.useBlockAttributes)(),{displayFeaturedImage:a,displayTitle:n,displayExcerpt:o,displayCategories:i,displayTags:c,displayLastUpdatedDate:p,displayReadMoreButton:u,postType:m}=l,{entity:y}=e,{title:k,excerpt:b,date_gmt:g,featured_media:E,categories:_=[],tags:w=[]}=y,f=(0,r.useMedia)(E),h=(0,t.useMemo)((()=>{const e=f?.media_details?.sizes["post-thumbnail"]?.source_url,t=f?.source_url;return null!=e?e:t}),[f]),{entities:v,isResolvingEntities:C}=(0,r.useEntitiesByTaxonomy)("category",{include:_}),{entities:T,isResolvingEntities:S}=(0,r.useEntitiesByTaxonomy)("post_tag",{include:w}),x=(0,d.__experimentalGetSettings)().formats.date,P=(0,d.dateI18n)(x,g),B=(0,d.dateI18n)("Y-m-d",g),{hasThumbnailSupport:R,hasTitleSupport:I,hasExcerptSupport:N,hasCategoriesSupport:A,hasTagsSupport:D}=(0,r.usePostTypeSupports)(m);return(0,t.createElement)("div",{className:"wp-block-statik-post-type-cards__card"},R&&a&&h&&(0,t.createElement)("div",{className:"wp-block-statik-post-type-cards__image"},(0,t.createElement)("img",{src:h,alt:k.rendered})),A&&i&&(0,t.createElement)("ul",{className:"wp-block-statik-post-type-cards__categories"},C&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Lorem ipsum"))),v?.map((e=>(0,t.createElement)("li",{key:e.id},e.name)))),p&&(0,t.createElement)("time",{className:"wp-block-statik-post-type-cards__updated",dateTime:B},P),I&&n&&(0,t.createElement)("h3",{className:"wp-block-statik-post-type-cards__title",dangerouslySetInnerHTML:{__html:k.rendered}}),N&&o&&(0,t.createElement)("div",{className:"wp-block-statik-post-type-cards__excerpt",dangerouslySetInnerHTML:{__html:b?.rendered}}),D&&c&&(0,t.createElement)("ul",{className:"wp-block-statik-post-type-cards__tags"},S&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Lorem")),(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Dolor amet")),(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Dolor"))),T?.map((e=>(0,t.createElement)("li",{key:e.id},e.name)))),u&&(0,t.createElement)("button",{className:"wp-block-statik-post-type-cards__read-more"},(0,s.__)("Read More","statik-blocks")))}function y(e){var t,l,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(l=y(e[t]))&&(a&&(a+=" "),a+=l);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}var k=function(){for(var e,t,l=0,a="";l<arguments.length;)(e=arguments[l++])&&(t=y(e))&&(a&&(a+=" "),a+=t);return a};function b(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Lorem")),(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Dolor amet")))}function g(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("li",null,(0,t.createElement)(r.Skeleton.Inline,null,"Lorem ipsum")))}function E(){const{attributes:e}=(0,r.useBlockAttributes)(),{displayFeaturedImage:l,displayExcerpt:a,displayTitle:n,displayCategories:s,displayTags:o,displayLastUpdatedDate:i,displayReadMoreButton:c}=e,p=k("wp-block-statik-post-type-cards__card","wp-block-statik-post-type-cards__card--preview");return(0,t.createElement)("div",{className:p},l&&(0,t.createElement)("div",{className:"wp-block-statik-post-type-cards__image"},(0,t.createElement)(r.Skeleton,{style:{height:200,width:"100%"}})),s&&(0,t.createElement)("ul",{className:"wp-block-statik-post-type-cards__categories"},(0,t.createElement)(g,null)),i&&(0,t.createElement)("time",{className:"wp-block-statik-post-type-cards__updated",dateTime:"2012-12-12"},(0,t.createElement)(r.Skeleton.Inline,null,"12.12.2012")),n&&(0,t.createElement)("h3",{className:"wp-block-statik-post-type-cards__title"},(0,t.createElement)(r.Skeleton.Inline,null,"Sample title")),a&&(0,t.createElement)("div",{className:"wp-block-statik-post-type-cards__excerpt"},(0,t.createElement)(r.Skeleton.Text,{tag:"p"},"Lorem ipsum dolor sit amet Consectetur adipiscing elit. Suspendisse et ligula eu est eleifend molestie.")),o&&(0,t.createElement)("ul",{className:"wp-block-statik-post-type-cards__tags"},(0,t.createElement)(b,null)),c&&(0,t.createElement)("button",{className:"wp-block-statik-post-type-cards__read-more"},(0,t.createElement)(r.Skeleton.Inline,null,"Read More")))}var _=window.wp.data;function w(){var e;const{attributes:l}=(0,r.useBlockAttributes)(),{postType:a,query:n,excludeCurrentPost:p}=l,d=(0,_.select)("core/editor").getCurrentPostId(),y=(0,t.useMemo)((()=>{const e=n.exclude?[].concat(n.exclude):[];return p&&e.push(d),{...n,per_page:i,exclude:e.length?e:void 0}}),[n,p,d]),{hasEntities:k,isResolvingEntities:b,hasResolvedEntities:g,entities:w}=(0,r.useEntitiesByPostType)(a,y),f=null!==(e=n.per_page)&&void 0!==e?e:c;if(g&&!k)return(0,t.createElement)(o.Warning,null,(0,s.__)("Could not find any entities.","statik-blocks"));if(b){const e=[...Array(f).keys()].map((e=>({id:e})));return(0,t.createElement)(u,{key:"cards-rows-preview",entities:e,cardComponent:E})}if(k){const e=w.slice(0,f);return(0,t.createElement)(u,{key:"cards-rows",entities:e,cardComponent:m})}return null}var f=window.React,h=window.wp.primitives,v=(0,f.createElement)(h.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,f.createElement)(h.Path,{d:"M18.7 3H5.3C4 3 3 4 3 5.3v13.4C3 20 4 21 5.3 21h13.4c1.3 0 2.3-1 2.3-2.3V5.3C21 4 20 3 18.7 3zm.8 15.7c0 .4-.4.8-.8.8H5.3c-.4 0-.8-.4-.8-.8V5.3c0-.4.4-.8.8-.8h13.4c.4 0 .8.4.8.8v13.4zM10 15l5-3-5-3v6z"}));function C(){const{attributes:e,setAttributes:l}=(0,r.useBlockAttributes)(),{postType:a}=e,{postTypes:i,isLoading:c}=(0,r.usePostTypes)(),p=(0,r.usePostTypesOptions)(i),u=[{label:(0,s.__)("None","statik-blocks"),value:"none"},...p],d=null!=a?a:"none";return(0,t.createElement)(n.Placeholder,{icon:(0,t.createElement)(o.BlockIcon,{icon:v}),label:(0,s.__)("Post Type Cards","statik-blocks"),instructions:(0,s.__)("Present WordPress entities as a cards","statik-blocks"),isColumnLayout:!1},c?(0,t.createElement)(n.Spinner,null):(0,t.createElement)(n.SelectControl,{label:(0,s.__)("Post Type"),value:d,options:u,help:(0,s.__)("Select Post Type to display","statik-blocks"),onChange:e=>{l({postType:e})}}))}const T=(0,s.__)("Reset Post Type Selection","statik-blocks");function S(){const{setAttributes:e}=(0,r.useBlockAttributes)();return(0,t.createElement)(o.BlockControls,null,(0,t.createElement)(n.ToolbarButton,{label:T,onClick:()=>{e({postType:void 0})}},(0,t.createElement)("span",null,T)))}const x={icon:l,edit:function(e){const{attributes:l}=e,{cardsPerRow:a,postType:n}=l,s=(0,o.useBlockProps)({className:k({[`wp-block-statik-post-type-cards--${n}`]:!!n})}),i=(0,r.useRwdAttribute)(a),c=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-post-type-cards--attr--cardsPerRow: ${i.inherit.default};\n\t`),u=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-post-type-cards--attr--cardsPerRow: ${i.inherit.mobile};\n\t`,{before:"@media (min-width: 0) {",after:"}"}),d=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-post-type-cards--attr--cardsPerRow: ${i.inherit.tablet};\n\t`,{before:"@media (min-width: 768px) {",after:"}"}),m=(0,r.useBlockStyle)(`\n\t\t--wp-block-statik-post-type-cards--attr--cardsPerRow: ${i.inherit.desktop};\n\t`,{before:"@media (min-width: 1000px) {",after:"}"});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(S,null),(0,t.createElement)(p,null),(0,t.createElement)("div",s,(0,t.createElement)("style",c),(0,t.createElement)("style",u),(0,t.createElement)("style",d),(0,t.createElement)("style",m),n&&(0,t.createElement)(w,null),!n&&(0,t.createElement)(C,null)))},save:()=>null};(0,e.registerBlockType)(a,x)}},l={};function a(e){var n=l[e];if(void 0!==n)return n.exports;var s=l[e]={exports:{}};return t[e](s,s.exports,a),s.exports}a.m=t,e=[],a.O=function(t,l,n,s){if(!l){var o=1/0;for(p=0;p<e.length;p++){l=e[p][0],n=e[p][1],s=e[p][2];for(var r=!0,i=0;i<l.length;i++)(!1&s||o>=s)&&Object.keys(a.O).every((function(e){return a.O[e](l[i])}))?l.splice(i--,1):(r=!1,s<o&&(o=s));if(r){e.splice(p--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var p=e.length;p>0&&e[p-1][2]>s;p--)e[p]=e[p-1];e[p]=[l,n,s]},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={6874:0,2566:0};a.O.j=function(t){return 0===e[t]};var t=function(t,l){var n,s,o=l[0],r=l[1],i=l[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in r)a.o(r,n)&&(a.m[n]=r[n]);if(i)var p=i(a)}for(t&&t(l);c<o.length;c++)s=o[c],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(p)},l=self.webpackChunkroot=self.webpackChunkroot||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var n=a.O(void 0,[2566],(function(){return a(46827)}));n=a.O(n)}();