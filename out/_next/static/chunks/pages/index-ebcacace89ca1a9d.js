(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7181)}])},1210:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,o){return!1};("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(4941).Z;n(5753).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(2648).Z,l=n(7273).Z,a=r(n(7294)),u=n(6273),i=n(2725),s=n(3462),c=n(1018),f=n(7190),d=n(1210),p=n(8684),v="undefined"!==typeof a.default.useTransition,h={};function x(e,t,n,o){if(e&&u.isLocalURL(t)){Promise.resolve(e.prefetch(t,n,o)).catch((function(e){0}));var r=o&&"undefined"!==typeof o.locale?o.locale:e&&e.locale;h[t+"%"+n+(r?"%"+r:"")]=!0}}var m=a.default.forwardRef((function(e,t){var n,r=e.href,m=e.as,b=e.children,y=e.prefetch,g=e.passHref,j=e.replace,_=e.shallow,C=e.scroll,M=e.locale,w=e.onClick,N=e.onMouseEnter,L=e.onTouchStart,R=e.legacyBehavior,E=void 0===R?!0!==Boolean(!1):R,P=l(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=b,!E||"string"!==typeof n&&"number"!==typeof n||(n=a.default.createElement("a",null,n));var k=!1!==y,O=o(v?a.default.useTransition():[],2)[1],S=a.default.useContext(s.RouterContext),I=a.default.useContext(c.AppRouterContext);I&&(S=I);var T,B=a.default.useMemo((function(){var e=o(u.resolveHref(S,r,!0),2),t=e[0],n=e[1];return{href:t,as:m?u.resolveHref(S,m):n||t}}),[S,r,m]),U=B.href,Z=B.as,A=a.default.useRef(U),D=a.default.useRef(Z);E&&(T=a.default.Children.only(n));var H=E?T&&"object"===typeof T&&T.ref:t,K=o(f.useIntersection({rootMargin:"200px"}),3),z=K[0],G=K[1],X=K[2],q=a.default.useCallback((function(e){D.current===Z&&A.current===U||(X(),D.current=Z,A.current=U),z(e),H&&("function"===typeof H?H(e):"object"===typeof H&&(H.current=e))}),[Z,H,U,X,z]);a.default.useEffect((function(){var e=G&&k&&u.isLocalURL(U),t="undefined"!==typeof M?M:S&&S.locale,n=h[U+"%"+Z+(t?"%"+t:"")];e&&!n&&x(S,U,Z,{locale:t})}),[Z,U,G,M,k,S]);var F={ref:q,onClick:function(e){E||"function"!==typeof w||w(e),E&&T.props&&"function"===typeof T.props.onClick&&T.props.onClick(e),e.defaultPrevented||function(e,t,n,o,r,l,a,i,s,c){if("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(n)){e.preventDefault();var f=function(){"beforePopState"in t?t[r?"replace":"push"](n,o,{shallow:l,locale:i,scroll:a}):t[r?"replace":"push"](n,{forceOptimisticNavigation:!c})};s?s(f):f()}}(e,S,U,Z,j,_,C,M,I?O:void 0,k)},onMouseEnter:function(e){E||"function"!==typeof N||N(e),E&&T.props&&"function"===typeof T.props.onMouseEnter&&T.props.onMouseEnter(e),!k&&I||u.isLocalURL(U)&&x(S,U,Z,{priority:!0})},onTouchStart:function(e){E||"function"!==typeof L||L(e),E&&T.props&&"function"===typeof T.props.onTouchStart&&T.props.onTouchStart(e),!k&&I||u.isLocalURL(U)&&x(S,U,Z,{priority:!0})}};if(!E||g||"a"===T.type&&!("href"in T.props)){var J="undefined"!==typeof M?M:S&&S.locale,Q=S&&S.isLocaleDomain&&d.getDomainLocale(Z,J,S.locales,S.domainLocales);F.href=Q||p.addBasePath(i.addLocale(Z,J,S&&S.defaultLocale))}return E?a.default.cloneElement(T,F):a.default.createElement("a",Object.assign({},P,F),n)}));t.default=m,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,s=e.disabled||!a,c=o(r.useState(!1),2),f=c[0],d=c[1],p=o(r.useState(null),2),v=p[0],h=p[1];r.useEffect((function(){if(a){if(s||f)return;if(v&&v.tagName){var e=function(e,t,n){var o=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},o=i.find((function(e){return e.root===n.root&&e.margin===n.margin}));if(o&&(t=u.get(o)))return t;var r=new Map,l=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return t={id:n,observer:l,elements:r},i.push(n),u.set(n,t),t}(n),r=o.id,l=o.observer,a=o.elements;return a.set(e,t),l.observe(e),function(){if(a.delete(e),l.unobserve(e),0===a.size){l.disconnect(),u.delete(r);var t=i.findIndex((function(e){return e.root===r.root&&e.margin===r.margin}));t>-1&&i.splice(t,1)}}}(v,(function(e){return e&&d(e)}),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!f){var o=l.requestIdleCallback((function(){return d(!0)}));return function(){return l.cancelIdleCallback(o)}}}),[v,s,n,t,f]);var x=r.useCallback((function(){d(!1)}),[]);return[h,f,x]};var r=n(7294),l=n(9311),a="function"===typeof IntersectionObserver,u=new Map,i=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GlobalLayoutRouterContext=t.LayoutRouterContext=t.AppRouterContext=void 0;var o=(0,n(2648).Z)(n(7294)),r=o.default.createContext(null);t.AppRouterContext=r;var l=o.default.createContext(null);t.LayoutRouterContext=l;var a=o.default.createContext(null);t.GlobalLayoutRouterContext=a},7181:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c},default:function(){return f}});var o=n(5893),r=n(9008),l=n.n(r),a=n(7294),u=n(1664),i=n.n(u);function s(e){var t=e.posts,n=t.length,r=(0,a.useState)(Number(localStorage.getItem("beforePage"))||1),l=r[0],u=r[1];(0,a.useEffect)((function(){localStorage.removeItem("beforePage")}));var s=n<=5?1:Math.ceil(n/5),c=1==l?" pointer-events-none":"",f=l==s?" pointer-events-none":"",d="mr-4 px-3 py-2 float-left cursor-pointer border-solid border-2 rounded-md",p=(0,a.useState)(t.slice(5*l-5,5*l)),v=p[0],h=p[1],x=function(e,n,o){h(t.slice(n,o))},m=function(e){var t=e.target,n=Number(t.id),o=5*n-5,r=5*n;u(n),x(0,o,r)},b=function(e){var t=e.target.id,n=5*l-5,o=5*l,r=l;if("prev"==t){if(1==l)return;n=5*(r=l-1)-5,o=5*r,u(r)}else{if(l==s)return;n=5*(r=l+1)-5,o=5*r,u(r)}x(0,n,o)},y=function(){localStorage.setItem("beforePage",String(l))};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"w-full min-h-screen pb-24 mt-8",children:v.map((function(e,t){return(0,o.jsx)("article",{className:"my-6 p-6 border-solid border-2 rounded-md",onClick:y,children:(0,o.jsx)(i(),{href:"/post/".concat(e.slug),children:(0,o.jsxs)("a",{children:[(0,o.jsx)("span",{className:"display: inline-block",children:(0,o.jsx)("p",{className:"text-xl font-bold mb-4 hover:text-rose-400 float-left",children:e.title})}),(0,o.jsx)("p",{className:"text-neutral-500 mb-4",children:e.description}),(0,o.jsx)("p",{className:"text-xs",children:e.date})]})})},t)}))}),(0,o.jsx)("nav",{className:"position-relative translate-y-full mb-20",children:(0,o.jsxs)("ul",{className:"list-none flex justify-center items-center",children:[(0,o.jsx)("li",{id:"prev",className:d+" hover:border-rose-400 md:hover:none"+c,onClick:b,children:(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5",children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z",clipRule:"evenodd"})})}),function(){for(var e=[],t=1;t<=s;t++)e.push((0,o.jsx)("li",{id:String(t),className:l==t?d+" border-rose-400":d,onClick:function(e){return m(e)},children:t},t));return e}(),(0,o.jsx)("li",{id:"next",className:d+" hover:border-rose-400 md:hover:none"+f,onClick:b,children:(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5",children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",clipRule:"evenodd"})})})]})})]})}var c=!0,f=function(e){var t=e.posts;return(0,o.jsxs)("div",{children:[(0,o.jsx)(l(),{children:(0,o.jsx)("title",{children:"MitNy.log"})}),(0,o.jsx)("p",{className:"text-4xl font-bold text-neutral-500",children:"Posts"}),(0,o.jsx)(s,{posts:t})]})}},1664:function(e,t,n){e.exports=n(8418)}},function(e){e.O(0,[774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);