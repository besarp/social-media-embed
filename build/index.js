(()=>{"use strict";const e=window.wp.blocks,t=window.React,o=window.wp.i18n,n=window.wp.blockEditor,l=window.wp.components,r=window.wp.element,a=JSON.parse('{"UU":"social-media-embed/block"}');(0,e.registerBlockType)(a.UU,{edit:({attributes:e,setAttributes:a})=>{const{url:c,backgroundColor:s,postContent:d}=e,[i,m]=(0,r.useState)(!1),[u,p]=(0,r.useState)(null),b=(0,n.useBlockProps)({style:{backgroundColor:s}});return(0,r.useEffect)((()=>{c&&(m(!0),fetch(`http://localhost/jmg/wp-json/social-media-embed/v1/fetch-youtube?url=${encodeURIComponent(c)}`).then((e=>e.json())).then((e=>{if(!e.html)throw new Error("Invalid data format");a({postContent:e.html}),m(!1)})).catch((e=>{p(e),m(!1)})))}),[c]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(l.PanelBody,{title:(0,o.__)("Settings","social-media-embed")},(0,t.createElement)(l.TextControl,{label:(0,o.__)("Post URL","social-media-embed"),value:c,onChange:e=>a({url:e}),placeholder:(0,o.__)("Enter social media post URL","social-media-embed")}),(0,t.createElement)("div",null,(0,t.createElement)("p",null,(0,o.__)("Background Color","social-media-embed")),(0,t.createElement)(n.ColorPalette,{value:s,onChange:e=>a({backgroundColor:e})})))),(0,t.createElement)("div",{...b},(0,t.createElement)("p",null,(0,o.__)("Enter the URL you want to embed:","social-media-embed")),(0,t.createElement)(l.TextControl,{value:c,onChange:e=>{a({url:e}),a({postContent:""})},placeholder:(0,o.__)("Enter URL","social-media-embed")}),i&&(0,t.createElement)(l.Spinner,null),u&&(0,t.createElement)(l.Notice,{status:"error"},(0,o.__)("Error fetching post","social-media-embed")),(0,t.createElement)("div",{dangerouslySetInnerHTML:{__html:d}})))},save:({attributes:e})=>{const{postContent:o,backgroundColor:l}=e,r=n.useBlockProps.save({style:{backgroundColor:l}});return(0,t.createElement)("div",{...r},(0,t.createElement)("div",{dangerouslySetInnerHTML:{__html:o}}))}})})();