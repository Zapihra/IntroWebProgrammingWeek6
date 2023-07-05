// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/frappe-charts/dist/frappe-charts.min.umd.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.frappe=e()}(this,function(){"use strict";function t(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function e(t){var e=t.getBoundingClientRect();return{top:e.top+(document.documentElement.scrollTop||document.body.scrollTop),left:e.left+(document.documentElement.scrollLeft||document.body.scrollLeft)}}function i(t){return null===t.offsetParent}function n(t){var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function a(t){var e=window.getComputedStyle(t),i=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight);return t.clientWidth-i}function s(t,e,i){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0);for(var a in i)n[a]=i[a];return t.dispatchEvent(n)}function r(t){return t.titleHeight+t.margins.top+t.paddings.top}function o(t){return t.margins.left+t.paddings.left}function l(t){return t.margins.top+t.margins.bottom+t.paddings.top+t.paddings.bottom+t.titleHeight+t.legendHeight}function u(t){return t.margins.left+t.margins.right+t.paddings.left+t.paddings.right}function h(t){return parseFloat(t.toFixed(2))}function c(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];i||(i=n?t[0]:t[t.length-1]);var a=new Array(Math.abs(e)).fill(i);return t=n?a.concat(t):t.concat(a)}function d(t,e){return(t+"").length*e}function p(t,e){return{x:Math.sin(t*Zt)*e,y:Math.cos(t*Zt)*e}}function f(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return!Number.isNaN(t)&&(void 0!==t&&(!!Number.isFinite(t)&&!(e&&t<0)))}function v(t){return Number(Math.round(t+"e4")+"e-4")}function g(t){var e=void 0,i=void 0,n=void 0;if(t instanceof Date)return new Date(t.getTime());if("object"!==(void 0===t?"undefined":Ft(t))||null===t)return t;e=Array.isArray(t)?[]:{};for(n in t)i=t[n],e[n]=g(i);return e}function m(t,e){var i=void 0,n=void 0;return t<=e?(i=e-t,n=t):(i=t-e,n=e),[i,n]}function y(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length-t.length;return i>0?t=c(t,i):e=c(e,i),[t,e]}function b(t,e){if(t)return t.length>e?t.slice(0,e-3)+"...":t}function x(t){var e=void 0;if("number"==typeof t)e=t;else if("string"==typeof t&&(e=Number(t),Number.isNaN(e)))return t;var i=Math.floor(Math.log10(Math.abs(e)));if(i<=2)return e;var n=Math.floor(i/3),a=Math.pow(10,i-3*n)*+(e/Math.pow(10,i)).toFixed(1);return Math.round(100*a)/100+" "+["","K","M","B","T"][n]}function k(t,e){for(var i=[],n=0;n<t.length;n++)i.push([t[n],e[n]]);var a=function(t,e){var i=e[0]-t[0],n=e[1]-t[1];return{length:Math.sqrt(Math.pow(i,2)+Math.pow(n,2)),angle:Math.atan2(n,i)}},s=function(t,e,i,n){var s=a(e||t,i||t),r=s.angle+(n?Math.PI:0),o=.2*s.length;return[t[0]+Math.cos(r)*o,t[1]+Math.sin(r)*o]};return function(t,e){return t.reduce(function(t,i,n,a){return 0===n?i[0]+","+i[1]:t+" "+e(i,n,a)},"")}(i,function(t,e,i){var n=s(i[e-1],i[e-2],t),a=s(t,i[e-1],i[e+1],!0);return"C "+n[0]+","+n[1]+" "+a[0]+","+a[1]+" "+t[0]+","+t[1]})}function w(t){return t>255?255:t<0?0:t}function A(t,e){var i=ie(t),n=!1;"#"==i[0]&&(i=i.slice(1),n=!0);var a=parseInt(i,16),s=w((a>>16)+e),r=w((a>>8&255)+e),o=w((255&a)+e);return(n?"#":"")+(o|r<<8|s<<16).toString(16)}function P(t){var e=/(^\s*)(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i;return/(^\s*)(#)((?:[A-Fa-f0-9]{3}){1,2})$/i.test(t)||e.test(t)}function T(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function L(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg",t);for(var n in e){var a=e[n];if("inside"===n)T(a).appendChild(i);else if("around"===n){var s=T(a);s.parentNode.insertBefore(i,s),i.appendChild(s)}else"styles"===n?"object"===(void 0===a?"undefined":Ft(a))&&Object.keys(a).map(function(t){i.style[t]=a[t]}):("className"===n&&(n="class"),"innerHTML"===n?i.textContent=a:i.setAttribute(n,a))}return i}function O(t,e){return L("linearGradient",{inside:t,id:e,x1:0,x2:0,y1:0,y2:1})}function M(t,e,i,n){return L("stop",{inside:t,style:"stop-color: "+i,offset:e,"stop-opacity":n})}function C(t,e,i,n){return L("svg",{className:e,inside:t,width:i,height:n})}function D(t){return L("defs",{inside:t})}function N(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,n={className:t,transform:e};return i&&(n.inside=i),L("g",n)}function S(t){return L("path",{className:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",d:t,styles:{stroke:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",fill:arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none","stroke-width":arguments.length>4&&void 0!==arguments[4]?arguments[4]:2}})}function E(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=i.x+t.x,o=i.y+t.y,l=i.x+e.x,u=i.y+e.y;return"M"+i.x+" "+i.y+"\n\t\tL"+r+" "+o+"\n\t\tA "+n+" "+n+" 0 "+s+" "+(a?1:0)+"\n\t\t"+l+" "+u+" z"}function _(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=i.x+t.x,o=i.y+t.y,l=i.x+e.x,u=2*i.y,h=i.y+e.y;return"M"+i.x+" "+i.y+"\n\t\tL"+r+" "+o+"\n\t\tA "+n+" "+n+" 0 "+s+" "+(a?1:0)+"\n\t\t"+l+" "+u+" z\n\t\tL"+r+" "+u+"\n\t\tA "+n+" "+n+" 0 "+s+" "+(a?1:0)+"\n\t\t"+l+" "+h+" z"}function z(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=i.x+t.x,o=i.y+t.y,l=i.x+e.x,u=i.y+e.y;return"M"+r+" "+o+"\n\t\tA "+n+" "+n+" 0 "+s+" "+(a?1:0)+"\n\t\t"+l+" "+u}function W(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=i.x+t.x,o=i.y+t.y,l=i.x+e.x,u=2*n+o,h=i.y+t.y;return"M"+r+" "+o+"\n\t\tA "+n+" "+n+" 0 "+s+" "+(a?1:0)+"\n\t\t"+l+" "+u+"\n\t\tM"+r+" "+u+"\n\t\tA "+n+" "+n+" 0 "+s+" "+(a?1:0)+"\n\t\t"+l+" "+h}function j(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n="path-fill-gradient-"+e+"-"+(i?"lighter":"default"),a=O(t,n),s=[1,.6,.2];return i&&(s=[.4,.2,0]),M(a,"0%",e,s[0]),M(a,"50%",e,s[1]),M(a,"100%",e,s[2]),n}function F(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:Jt,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none";return L("rect",{className:"percentage-bar",x:t,y:e,width:i,height:n,fill:s,styles:{stroke:A(s,-25),"stroke-dasharray":"0, "+(n+i)+", "+i+", "+n,"stroke-width":a}})}function H(t,e,i,n,a){var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none",r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{},o={className:t,x:e,y:i,width:n,height:n,rx:a,fill:s};return Object.keys(r).map(function(t){o[t]=r[t]}),L("rect",o)}function I(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",a=arguments[4];a=arguments.length>5&&void 0!==arguments[5]&&arguments[5]?b(a,se):a;var s={className:"legend-bar",x:0,y:0,width:i,height:"2px",fill:n},r=L("text",{className:"legend-dataset-text",x:0,y:0,dy:2*re+"px","font-size":1.2*re+"px","text-anchor":"start",fill:le,innerHTML:a}),o=L("g",{transform:"translate("+t+", "+e+")"});return o.appendChild(L("rect",s)),o.appendChild(r),o}function R(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",a=arguments[4];a=arguments.length>5&&void 0!==arguments[5]&&arguments[5]?b(a,se):a;var s={className:"legend-dot",cx:0,cy:0,r:i,fill:n},r=L("text",{className:"legend-dataset-text",x:0,y:0,dx:re+"px",dy:re/3+"px","font-size":1.2*re+"px","text-anchor":"start",fill:le,innerHTML:a}),o=L("g",{transform:"translate("+t+", "+e+")"});return o.appendChild(L("circle",s)),o.appendChild(r),o}function Y(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=a.fontSize||re;return L("text",{className:t,x:e,y:i,dy:(void 0!==a.dy?a.dy:s/2)+"px","font-size":s+"px",fill:a.fill||le,"text-anchor":a.textAnchor||"start",innerHTML:n})}function B(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};a.stroke||(a.stroke=oe);var s=L("line",{className:"line-vertical "+a.className,x1:0,x2:0,y1:i,y2:n,styles:{stroke:a.stroke}}),r=L("text",{x:0,y:i>n?i+ae:i-ae-re,dy:re+"px","font-size":re+"px","text-anchor":"middle",innerHTML:e+""}),o=L("g",{transform:"translate("+t+", 0)"});return o.appendChild(s),o.appendChild(r),o}function V(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};a.stroke||(a.stroke=oe),a.lineType||(a.lineType=""),a.shortenNumbers&&(e=x(e));var s=L("line",{className:"line-horizontal "+a.className+("dashed"===a.lineType?"dashed":""),x1:i,x2:n,y1:0,y2:0,styles:{stroke:a.stroke}}),r=L("text",{x:i<n?i-ae:i+ae,y:0,dy:re/2-2+"px","font-size":re+"px","text-anchor":i<n?"end":"start",innerHTML:e+""}),o=L("g",{transform:"translate(0, "+t+")","stroke-opacity":1});return 0!==r&&"0"!==r||(o.style.stroke="rgba(27, 31, 35, 0.6)"),o.appendChild(s),o.appendChild(r),o}function U(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};f(t)||(t=0),n.pos||(n.pos="left"),n.offset||(n.offset=0),n.mode||(n.mode="span"),n.stroke||(n.stroke=oe),n.className||(n.className="");var a=-1*ne,s="span"===n.mode?i+ne:0;return"tick"===n.mode&&"right"===n.pos&&(a=i+ne,s=i),a+=n.offset,s+=n.offset,V(t,e,a,s,{stroke:n.stroke,className:n.className,lineType:n.lineType,shortenNumbers:n.shortenNumbers})}function G(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};f(t)||(t=0),n.pos||(n.pos="bottom"),n.offset||(n.offset=0),n.mode||(n.mode="span"),n.stroke||(n.stroke=oe),n.className||(n.className="");var a=i+ne,s="span"===n.mode?-1*ne:i;return"tick"===n.mode&&"top"===n.pos&&(a=-1*ne,s=0),B(t,e,a,s,{stroke:n.stroke,className:n.className,lineType:n.lineType})}function q(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};n.labelPos||(n.labelPos="right");var a=L("text",{className:"chart-label",x:"left"===n.labelPos?ae:i-d(e,5)-ae,y:0,dy:re/-2+"px","font-size":re+"px","text-anchor":"start",innerHTML:e+""}),s=V(t,"",0,i,{stroke:n.stroke||oe,className:n.className||"",lineType:n.lineType});return s.appendChild(a),s}function X(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=t-e,r=L("rect",{className:"bar mini",styles:{fill:"rgba(228, 234, 239, 0.49)",stroke:oe,"stroke-dasharray":i+", "+s},x:0,y:0,width:i,height:s});a.labelPos||(a.labelPos="right");var o=L("text",{className:"chart-label",x:"left"===a.labelPos?ae:i-d(n+"",4.5)-ae,y:0,dy:re/-2+"px","font-size":re+"px","text-anchor":"start",innerHTML:n+""}),l=L("g",{transform:"translate(0, "+e+")"});return l.appendChild(r),l.appendChild(o),l}function J(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:{},l=m(e,o.zeroLine),u=Vt(l,2),h=u[0],c=u[1];c-=r,0===h&&(h=o.minHeight,c-=o.minHeight),f(t)||(t=0),f(c)||(c=0),f(h,!0)||(h=0),f(i,!0)||(i=0);var d=L("rect",{className:"bar mini",style:"fill: "+n,"data-point-index":s,x:t,y:c,width:i,height:h});if((a+="")||a.length){d.setAttribute("y",0),d.setAttribute("x",0);var p=L("text",{className:"data-point-value",x:i/2,y:0,dy:re/2*-1+"px","font-size":re+"px","text-anchor":"middle",innerHTML:a}),v=L("g",{"data-point-index":s,transform:"translate("+t+", "+c+")"});return v.appendChild(d),v.appendChild(p),v}return d}function K(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=L("circle",{style:"fill: "+n,"data-point-index":s,cx:t,cy:e,r:i});if((a+="")||a.length){r.setAttribute("cy",0),r.setAttribute("cx",0);var o=L("text",{className:"data-point-value",x:0,y:0,dy:re/2*-1-i+"px","font-size":re+"px","text-anchor":"middle",innerHTML:a}),l=L("g",{"data-point-index":s,transform:"translate("+t+", "+e+")"});return l.appendChild(r),l.appendChild(o),l}return r}function $(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=e.map(function(e,i){return t[i]+","+e}).join("L");n.spline&&(s=k(t,e));var r=S("M"+s,"line-graph-path",i);if(n.heatline){var o=j(a.svgDefs,i);r.style.stroke="url(#"+o+")"}var l={path:r};if(n.regionFill){var u=j(a.svgDefs,i,!0),h="M"+t[0]+","+a.zeroLine+"L"+s+"L"+t.slice(-1)[0]+","+a.zeroLine;l.region=S(h,"region-fill","none","url(#"+u+")")}return l}function Q(t,e,i,n){var a="string"==typeof e?e:e.join(", ");return[t,{transform:i.join(", ")},n,ve,"translate",{transform:a}]}function Z(t,e,i){return Q(t,[i,0],[e,0],pe)}function tt(t,e,i){return Q(t,[0,i],[0,e],pe)}function et(t,e,i,n){var a=e-i,s=t.childNodes[0];return[[s,{height:a,"stroke-dasharray":s.getAttribute("width")+", "+a},pe,ve],Q(t,[0,n],[0,i],pe)]}function it(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,s=m(i,(arguments.length>5&&void 0!==arguments[5]?arguments[5]:{}).zeroLine),r=Vt(s,2),o=r[0],l=r[1];return l-=a,"rect"!==t.nodeName?[[t.childNodes[0],{width:n,height:o},ce,ve],Q(t,t.getAttribute("transform").split("(")[1].slice(0,-1),[e,l],pe)]:[[t,{width:n,height:o,x:e,y:l},ce,ve]]}function nt(t,e,i){return"circle"!==t.nodeName?[Q(t,t.getAttribute("transform").split("(")[1].slice(0,-1),[e,i],pe)]:[[t,{cx:e,cy:i},ce,ve]]}function at(t,e,i,n,a){var s=[],r=i.map(function(t,i){return e[i]+","+t}).join("L");a&&(r=k(e,i));var o=[t.path,{d:"M"+r},de,ve];if(s.push(o),t.region){var l=e[0]+","+n+"L",u="L"+e.slice(-1)[0]+", "+n,h=[t.region,{d:"M"+l+r+u},de,ve];s.push(h)}return s}function st(t,e){return[t,{d:e},ce,ve]}function rt(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"linear",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},r=t.cloneNode(!0),o=t.cloneNode(!0);for(var l in e){var u=void 0;u="transform"===l?document.createElementNS("http://www.w3.org/2000/svg","animateTransform"):document.createElementNS("http://www.w3.org/2000/svg","animate");var h=s[l]||t.getAttribute(l),c=e[l],d={attributeName:l,from:h,to:c,begin:"0s",dur:i/1e3+"s",values:h+";"+c,keySplines:ge[n],keyTimes:"0;1",calcMode:"spline",fill:"freeze"};a&&(d.type=a);for(var p in d)u.setAttribute(p,d[p]);r.appendChild(u),a?o.setAttribute(l,"translate("+c+")"):o.setAttribute(l,c)}return[r,o]}function ot(t,e){t.style.transform=e,t.style.webkitTransform=e,t.style.msTransform=e,t.style.mozTransform=e,t.style.oTransform=e}function lt(t,e){var i=[],n=[];e.map(function(t){var e=t[0],a=e.parentNode,s=void 0,r=void 0;t[0]=e;var o=rt.apply(void 0,Ut(t)),l=Vt(o,2);s=l[0],r=l[1],i.push(r),n.push([s,a]),a&&a.replaceChild(s,e)});var a=t.cloneNode(!0);return n.map(function(t,n){t[1]&&(t[1].replaceChild(i[n],t[0]),e[n][0]=i[n])}),a}function ut(t,e,i){if(0!==i.length){var n=lt(e,i);e.parentNode==t&&(t.removeChild(e),t.appendChild(n)),setTimeout(function(){n.parentNode==t&&(t.removeChild(n),t.appendChild(e))},fe)}}function ht(t,e){var i=document.createElement("a");i.style="display: none";var n=new Blob(e,{type:"image/svg+xml; charset=utf-8"}),a=window.URL.createObjectURL(n);i.href=a,i.download=t,document.body.appendChild(i),i.click(),setTimeout(function(){document.body.removeChild(i),window.URL.revokeObjectURL(a)},300)}function ct(e){var i=e.cloneNode(!0);i.classList.add("chart-container"),i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");var n=t.create("style",{innerHTML:me});i.insertBefore(n,i.firstChild);var a=t.create("div");return a.appendChild(i),a.innerHTML}function dt(t){var e=new Date(t);return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e}function pt(t){var e=t.getDate(),i=t.getMonth()+1;return[t.getFullYear(),(i>9?"":"0")+i,(e>9?"":"0")+e].join("-")}function ft(t){return new Date(t.getTime())}function vt(t,e){var i=xt(t);return Math.ceil(gt(i,e)/xe)}function gt(t,e){var i=we*ke;return(dt(e)-dt(t))/i}function mt(t,e){return t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear()}function yt(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=Ae[t];return e?i.slice(0,3):i}function bt(t,e){return new Date(e,t+1,0)}function xt(t){var e=ft(t),i=e.getDay();return 0!==i&&kt(e,-1*i),e}function kt(t,e){t.setDate(t.getDate()+e)}function wt(t,e,i){var n=Object.keys(Le).filter(function(e){return t.includes(e)}),a=Le[n[0]];return Object.assign(a,{constants:e,getData:i}),new Te(a)}function At(t){if(0===t)return[0,0];if(isNaN(t))return{mantissa:-6755399441055744,exponent:972};var e=t>0?1:-1;if(!isFinite(t))return{mantissa:4503599627370496*e,exponent:972};t=Math.abs(t);var i=Math.floor(Math.log10(t));return[e*(t/Math.pow(10,i)),i]}function Pt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=Math.ceil(t),n=Math.floor(e),a=i-n,s=a,r=1;a>5&&(a%2!=0&&(a=++i-n),s=a/2,r=2),a<=2&&(r=a/(s=4)),0===a&&(s=5,r=1);for(var o=[],l=0;l<=s;l++)o.push(n+r*l);return o}function Tt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=At(t),n=Vt(i,2),a=n[0],s=n[1],r=e?e/Math.pow(10,s):0,o=Pt(a=a.toFixed(6),r);return o=o.map(function(t){return t*Math.pow(10,s)})}function Lt(t){function e(t,e){for(var i=Tt(t),n=i[1]-i[0],a=0,s=1;a<e;s++)a+=n,i.unshift(-1*a);return i}var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Math.max.apply(Math,Ut(t)),a=Math.min.apply(Math,Ut(t)),s=[];if(n>=0&&a>=0)At(n)[1],s=i?Tt(n,a):Tt(n);else if(n>0&&a<0){var r=Math.abs(a);n>=r?(At(n)[1],s=e(n,r)):(At(r)[1],s=e(r,n).reverse().map(function(t){return-1*t}))}else if(n<=0&&a<=0){var o=Math.abs(a),l=Math.abs(n);At(o)[1],s=(s=i?Tt(o,l):Tt(o)).reverse().map(function(t){return-1*t})}return s}function Ot(t){var e=Mt(t);return t.indexOf(0)>=0?t.indexOf(0):t[0]>0?-1*t[0]/e:-1*t[t.length-1]/e+(t.length-1)}function Mt(t){return t[1]-t[0]}function Ct(t){return t[t.length-1]-t[0]}function Dt(t,e){return h(e.zeroLine-t*e.scaleMultiplier)}function Nt(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e.reduce(function(e,i){return Math.abs(i-t)<Math.abs(e-t)?i:e},[]);return i?e.indexOf(n):n}function St(t,e){for(var i=Math.max.apply(Math,Ut(t)),n=1/(e-1),a=[],s=0;s<e;s++){var r=i*(n*s);a.push(r)}return a}function Et(t,e){return e.filter(function(e){return e<t}).length}function _t(t,e){t.labels=t.labels||[];var i=t.labels.length,n=t.datasets,a=new Array(i).fill(0);return n||(n=[{values:a}]),n.map(function(t){if(t.values){var n=t.values;n=(n=n.map(function(t){return isNaN(t)?0:t})).length>i?n.slice(0,i):c(n,i-n.length,0),t.values=n}else t.values=a;t.chartType||(Xt.includes(e),t.chartType=e)}),t.yRegions&&t.yRegions.map(function(t){if(t.end<t.start){var e=[t.end,t.start];t.start=e[0],t.end=e[1]}}),t}function zt(t){var e=t.labels.length,i=new Array(e).fill(0),n={labels:t.labels.slice(0,-1),datasets:t.datasets.map(function(t){return{name:"",values:i.slice(0,-1),chartType:t.chartType}})};return t.yMarkers&&(n.yMarkers=[{value:0,label:""}]),t.yRegions&&(n.yRegions=[{start:0,end:0,label:""}]),n}function Wt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=t/e.length;n<=0&&(n=1);var a=n/Kt,s=void 0;if(i){var r=Math.max.apply(Math,Ut(e.map(function(t){return t.length})));s=Math.ceil(r/a)}return e.map(function(t,e){return(t+="").length>a&&(i?e%s!=0&&(t=""):t=a-3>0?t.slice(0,a-3)+" ...":t.slice(0,a)+".."),t})}function jt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"line",e=arguments[1],i=arguments[2];return"axis-mixed"===t?(i.type="line",new De(e,i)):Se[t]?new Se[t](e,i):void console.error("Undefined chart type: "+t)}!function(t,e){void 0===e&&(e={});var i=e.insertAt;if(t&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===i&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))}}('.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}');var Ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ht=(function(){function t(t){this.value=t}function e(e){function i(t,e){return new Promise(function(i,a){var o={key:t,arg:e,resolve:i,reject:a,next:null};r?r=r.next=o:(s=r=o,n(t,e))})}function n(i,s){try{var r=e[i](s),o=r.value;o instanceof t?Promise.resolve(o.value).then(function(t){n("next",t)},function(t){n("throw",t)}):a(r.done?"return":"normal",r.value)}catch(t){a("throw",t)}}function a(t,e){switch(t){case"return":s.resolve({value:e,done:!0});break;case"throw":s.reject(e);break;default:s.resolve({value:e,done:!1})}(s=s.next)?n(s.key,s.arg):r=null}var s,r;this._invoke=i,"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),It=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Rt=function t(e,i,n){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,i);if(void 0===a){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,i,n)}if("value"in a)return a.value;var r=a.get;if(void 0!==r)return r.call(n)},Yt=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Bt=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},Vt=function(){function t(t,e){var i=[],n=!0,a=!1,s=void 0;try{for(var r,o=t[Symbol.iterator]();!(n=(r=o.next()).done)&&(i.push(r.value),!e||i.length!==e);n=!0);}catch(t){a=!0,s=t}finally{try{!n&&o.return&&o.return()}finally{if(a)throw s}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),Ut=function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)};t.create=function(e,i){var n=document.createElement(e);for(var a in i){var s=i[a];if("inside"===a)t(s).appendChild(n);else if("around"===a){var r=t(s);r.parentNode.insertBefore(n,r),n.appendChild(r)}else"styles"===a?"object"===(void 0===s?"undefined":Ft(s))&&Object.keys(s).map(function(t){n.style[t]=s[t]}):a in n?n[a]=s:n.setAttribute(a,s)}return n};var Gt={margins:{top:10,bottom:10,left:20,right:20},paddings:{top:20,bottom:40,left:30,right:10},baseHeight:240,titleHeight:20,legendHeight:30,titleFontSize:12},qt=700,Xt=["line","bar"],Jt=2,Kt=7,$t=["light-blue","blue","violet","red","orange","yellow","green","light-green","purple","magenta","light-grey","dark-grey"],Qt={bar:$t,line:$t,pie:$t,percentage:$t,heatmap:["#ebedf0","#c6e48b","#7bc96f","#239a3b","#196127"],donut:$t},Zt=Math.PI/180,te=function(){function e(t){var i=t.parent,n=void 0===i?null:i,a=t.colors,s=void 0===a?[]:a;Ht(this,e),this.parent=n,this.colors=s,this.titleName="",this.titleValue="",this.listValues=[],this.titleValueFirst=0,this.x=0,this.y=0,this.top=0,this.left=0,this.setup()}return It(e,[{key:"setup",value:function(){this.makeTooltip()}},{key:"refresh",value:function(){this.fill(),this.calcPosition()}},{key:"makeTooltip",value:function(){var e=this;this.container=t.create("div",{inside:this.parent,className:"graph-svg-tip comparison",innerHTML:'<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>'}),this.hideTip(),this.title=this.container.querySelector(".title"),this.dataPointList=this.container.querySelector(".data-point-list"),this.parent.addEventListener("mouseleave",function(){e.hideTip()})}},{key:"fill",value:function(){var e=this,i=void 0;this.index&&this.container.setAttribute("data-point-index",this.index),i=this.titleValueFirst?"<strong>"+this.titleValue+"</strong>"+this.titleName:this.titleName+"<strong>"+this.titleValue+"</strong>",this.title.innerHTML=i,this.dataPointList.innerHTML="",this.listValues.map(function(i,n){var a=e.colors[n]||"black",s=0===i.formatted||i.formatted?i.formatted:i.value,r=t.create("li",{styles:{"border-top":"3px solid "+a},innerHTML:'<strong style="display: block;">'+(0===s||s?s:"")+"</strong>\n\t\t\t\t\t"+(i.title?i.title:"")});e.dataPointList.appendChild(r)})}},{key:"calcPosition",value:function(){var t=this.container.offsetWidth;this.top=this.y-this.container.offsetHeight-5,this.left=this.x-t/2;var e=this.parent.offsetWidth-t,i=this.container.querySelector(".svg-pointer");if(this.left<0)i.style.left="calc(50% - "+-1*this.left+"px)",this.left=0;else if(this.left>e){var n="calc(50% + "+(this.left-e)+"px)";i.style.left=n,this.left=e}else i.style.left="50%"}},{key:"setValues",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1;this.titleName=i.name,this.titleValue=i.value,this.listValues=n,this.x=t,this.y=e,this.titleValueFirst=i.valueFirst||0,this.index=a,this.refresh()}},{key:"hideTip",value:function(){this.container.style.top="0px",this.container.style.left="0px",this.container.style.opacity="0"}},{key:"showTip",value:function(){this.container.style.top=this.top+"px",this.container.style.left=this.left+"px",this.container.style.opacity="1"}}]),e}(),ee={"light-blue":"#7cd6fd",blue:"#5e64ff",violet:"#743ee2",red:"#ff5858",orange:"#ffa00a",yellow:"#feef72",green:"#28a745","light-green":"#98d85b",purple:"#b554ff",magenta:"#ffa3ef",black:"#36114C",grey:"#bdd3e6","light-grey":"#f0f4f7","dark-grey":"#b8c2cc"},ie=function(t){return/rgb[a]{0,1}\([\d, ]+\)/gim.test(t)?/\D+(\d*)\D+(\d*)\D+(\d*)/gim.exec(t).map(function(t,e){return 0!==e?Number(t).toString(16):"#"}).reduce(function(t,e){return""+t+e}):ee[t]||t},ne=6,ae=4,se=15,re=10,oe="#dadada",le="#555b51",ue={bar:function(t){var e=void 0;"rect"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var i=t.cloneNode();return i.style.fill="#000000",i.style.opacity="0.4",e&&i.setAttribute("transform",e),i},dot:function(t){var e=void 0;"circle"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var i=t.cloneNode(),n=t.getAttribute("r"),a=t.getAttribute("fill");return i.setAttribute("r",parseInt(n)+4),i.setAttribute("fill",a),i.style.opacity="0.6",e&&i.setAttribute("transform",e),i},heat_square:function(t){var e=void 0;"circle"!==t.nodeName&&(e=t.getAttribute("transform"),t=t.childNodes[0]);var i=t.cloneNode(),n=t.getAttribute("r"),a=t.getAttribute("fill");return i.setAttribute("r",parseInt(n)+4),i.setAttribute("fill",a),i.style.opacity="0.6",e&&i.setAttribute("transform",e),i}},he={bar:function(t,e){var i=void 0;"rect"!==t.nodeName&&(i=t.getAttribute("transform"),t=t.childNodes[0]);var n=["x","y","width","height"];Object.values(t.attributes).filter(function(t){return n.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue)}),i&&e.setAttribute("transform",i)},dot:function(t,e){var i=void 0;"circle"!==t.nodeName&&(i=t.getAttribute("transform"),t=t.childNodes[0]);var n=["cx","cy"];Object.values(t.attributes).filter(function(t){return n.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue)}),i&&e.setAttribute("transform",i)},heat_square:function(t,e){var i=void 0;"circle"!==t.nodeName&&(i=t.getAttribute("transform"),t=t.childNodes[0]);var n=["cx","cy"];Object.values(t.attributes).filter(function(t){return n.includes(t.name)&&t.specified}).map(function(t){e.setAttribute(t.name,t.nodeValue)}),i&&e.setAttribute("transform",i)}},ce=350,de=350,pe=ce,fe=250,ve="easein",ge={ease:"0.25 0.1 0.25 1",linear:"0 0 1 1",easein:"0.1 0.8 0.2 1",easeout:"0 0 0.58 1",easeinout:"0.42 0 0.58 1"},me=".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",ye=function(){function e(t,i){if(Ht(this,e),i=g(i),this.parent="string"==typeof t?document.querySelector(t):t,!(this.parent instanceof HTMLElement))throw new Error("No `parent` element to render on was provided.");this.rawChartArgs=i,this.title=i.title||"",this.type=i.type||"",this.realData=this.prepareData(i.data),this.data=this.prepareFirstData(this.realData),this.colors=this.validateColors(i.colors,this.type),this.config={showTooltip:1,showLegend:1,isNavigable:i.isNavigable||0,animate:void 0!==i.animate?i.animate:1,truncateLegends:i.truncateLegends||1},this.measures=JSON.parse(JSON.stringify(Gt));var n=this.measures;this.setMeasures(i),this.title.length||(n.titleHeight=0),this.config.showLegend||(n.legendHeight=0),this.argHeight=i.height||n.baseHeight,this.state={},this.options={},this.initTimeout=qt,this.config.isNavigable&&(this.overlays=[]),this.configure(i)}return It(e,[{key:"prepareData",value:function(t){return t}},{key:"prepareFirstData",value:function(t){return t}},{key:"validateColors",value:function(t,e){var i=[];return(t=(t||[]).concat(Qt[e])).forEach(function(t){var e=ie(t);P(e)?i.push(e):console.warn('"'+t+'" is not a valid color.')}),i}},{key:"setMeasures",value:function(){}},{key:"configure",value:function(){var t=this,e=this.argHeight;this.baseHeight=e,this.height=e-l(this.measures),this.boundDrawFn=function(){return t.draw(!0)},ResizeObserver&&(this.resizeObserver=new ResizeObserver(this.boundDrawFn),this.resizeObserver.observe(this.parent)),window.addEventListener("resize",this.boundDrawFn),window.addEventListener("orientationchange",this.boundDrawFn)}},{key:"destroy",value:function(){this.resizeObserver&&this.resizeObserver.disconnect(),window.removeEventListener("resize",this.boundDrawFn),window.removeEventListener("orientationchange",this.boundDrawFn)}},{key:"setup",value:function(){this.makeContainer(),this.updateWidth(),this.makeTooltip(),this.draw(!1,!0)}},{key:"makeContainer",value:function(){this.parent.innerHTML="";var e={inside:this.parent,className:"chart-container"};this.independentWidth&&(e.styles={width:this.independentWidth+"px"}),this.container=t.create("div",e)}},{key:"makeTooltip",value:function(){this.tip=new te({parent:this.container,colors:this.colors}),this.bindTooltip()}},{key:"bindTooltip",value:function(){}},{key:"draw",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e&&i(this.parent)||(this.updateWidth(),this.calc(e),this.makeChartArea(),this.setupComponents(),this.components.forEach(function(e){return e.setup(t.drawArea)}),this.render(this.components,!1),n&&(this.data=this.realData,setTimeout(function(){t.update(t.data)},this.initTimeout)),this.renderLegend(),this.setupNavigation(n))}},{key:"calc",value:function(){}},{key:"updateWidth",value:function(){this.baseWidth=a(this.parent),this.width=this.baseWidth-u(this.measures)}},{key:"makeChartArea",value:function(){this.svg&&this.container.removeChild(this.svg);var t=this.measures;this.svg=C(this.container,"frappe-chart chart",this.baseWidth,this.baseHeight),this.svgDefs=D(this.svg),this.title.length&&(this.titleEL=Y("title",t.margins.left,t.margins.top,this.title,{fontSize:t.titleFontSize,fill:"#666666",dy:t.titleFontSize}));var e=r(t);this.drawArea=N(this.type+"-chart chart-draw-area","translate("+o(t)+", "+e+")"),this.config.showLegend&&(e+=this.height+t.paddings.bottom,this.legendArea=N("chart-legend","translate("+o(t)+", "+e+")")),this.title.length&&this.svg.appendChild(this.titleEL),this.svg.appendChild(this.drawArea),this.config.showLegend&&this.svg.appendChild(this.legendArea),this.updateTipOffset(o(t),r(t))}},{key:"updateTipOffset",value:function(t,e){this.tip.offset={x:t,y:e}}},{key:"setupComponents",value:function(){this.components=new Map}},{key:"update",value:function(t){t||console.error("No data to update."),this.data=this.prepareData(t),this.calc(),this.render(this.components,this.config.animate),this.renderLegend()}},{key:"render",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.components,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.config.isNavigable&&this.overlays.map(function(t){return t.parentNode.removeChild(t)});var n=[];e.forEach(function(t){n=n.concat(t.update(i))}),n.length>0?(ut(this.container,this.svg,n),setTimeout(function(){e.forEach(function(t){return t.make()}),t.updateNav()},400)):(e.forEach(function(t){return t.make()}),this.updateNav())}},{key:"updateNav",value:function(){this.config.isNavigable&&(this.makeOverlay(),this.bindUnits())}},{key:"renderLegend",value:function(){}},{key:"setupNavigation",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.config.isNavigable&&e&&(this.bindOverlay(),this.keyActions={13:this.onEnterKey.bind(this),37:this.onLeftArrow.bind(this),38:this.onUpArrow.bind(this),39:this.onRightArrow.bind(this),40:this.onDownArrow.bind(this)},document.addEventListener("keydown",function(e){n(t.container)&&(e=e||window.event,t.keyActions[e.keyCode]&&t.keyActions[e.keyCode]())}))}},{key:"makeOverlay",value:function(){}},{key:"updateOverlay",value:function(){}},{key:"bindOverlay",value:function(){}},{key:"bindUnits",value:function(){}},{key:"onLeftArrow",value:function(){}},{key:"onRightArrow",value:function(){}},{key:"onUpArrow",value:function(){}},{key:"onDownArrow",value:function(){}},{key:"onEnterKey",value:function(){}},{key:"addDataPoint",value:function(){}},{key:"removeDataPoint",value:function(){}},{key:"getDataPoint",value:function(){}},{key:"setCurrentDataPoint",value:function(){}},{key:"updateDataset",value:function(){}},{key:"export",value:function(){var t=ct(this.svg);ht(this.title||"Chart",[t])}}]),e}(),be=function(t){function e(t,i){return Ht(this,e),Bt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i))}return Yt(e,t),It(e,[{key:"configure",value:function(t){Rt(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"configure",this).call(this,t),this.config.formatTooltipY=(t.tooltipOptions||{}).formatTooltipY,this.config.maxSlices=t.maxSlices||20,this.config.maxLegendPoints=t.maxLegendPoints||20}},{key:"calc",value:function(){var t=this,e=this.state,i=this.config.maxSlices;e.sliceTotals=[];var n=this.data.labels.map(function(e,i){var n=0;return t.data.datasets.map(function(t){n+=t.values[i]}),[n,e]}).filter(function(t){return t[0]>=0}),a=n;if(n.length>i){n.sort(function(t,e){return e[0]-t[0]}),a=n.slice(0,i-1);var s=0;n.slice(i-1).map(function(t){s+=t[0]}),a.push([s,"Rest"]),this.colors[i-1]="grey"}e.labels=[],a.map(function(t){e.sliceTotals.push(v(t[0])),e.labels.push(t[1])}),e.grandTotal=e.sliceTotals.reduce(function(t,e){return t+e},0),this.center={x:this.width/2,y:this.height/2}}},{key:"renderLegend",value:function(){var t=this,e=this.state;this.legendArea.textContent="",this.legendTotals=e.sliceTotals.slice(0,this.config.maxLegendPoints);var i=0,n=0;this.legendTotals.map(function(a,s){var r=150,o=Math.floor((t.width-u(t.measures))/r);t.legendTotals.length<o&&(r=t.width/t.legendTotals.length),i>o&&(i=0,n+=20);var l=r*i+5,h=t.config.truncateLegends?b(e.labels[s],r/10):e.labels[s],c=t.config.formatTooltipY?t.config.formatTooltipY(a):a,d=R(l,n,5,t.colors[s],h+": "+c,!1);t.legendArea.appendChild(d),i++})}}]),e}(ye),xe=7,ke=1e3,we=86400,Ae=["January","February","March","April","May","June","July","August","September","October","November","December"],Pe=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Te=function(){function t(e){var i=e.layerClass,n=void 0===i?"":i,a=e.layerTransform,s=void 0===a?"":a,r=e.constants,o=e.getData,l=e.makeElements,u=e.animateElements;Ht(this,t),this.layerTransform=s,this.constants=r,this.makeElements=l,this.getData=o,this.animateElements=u,this.store=[],this.labels=[],this.layerClass=n,this.layerClass="function"==typeof this.layerClass?this.layerClass():this.layerClass,this.refresh()}return It(t,[{key:"refresh",value:function(t){this.data=t||this.getData()}},{key:"setup",value:function(t){this.layer=N(this.layerClass,this.layerTransform,t)}},{key:"make",value:function(){this.render(this.data),this.oldData=this.data}},{key:"render",value:function(t){var e=this;this.store=this.makeElements(t),this.layer.textContent="",this.store.forEach(function(t){e.layer.appendChild(t)}),this.labels.forEach(function(t){e.layer.appendChild(t)})}},{key:"update",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.refresh();var e=[];return t&&(e=this.animateElements(this.data)||[]),e}}]),t}(),Le={donutSlices:{layerClass:"donut-slices",makeElements:function(t){return t.sliceStrings.map(function(e,i){var n=S(e,"donut-path",t.colors[i],"none",t.strokeWidth);return n.style.transition="transform .3s;",n})},animateElements:function(t){return this.store.map(function(e,i){return st(e,t.sliceStrings[i])})}},pieSlices:{layerClass:"pie-slices",makeElements:function(t){return t.sliceStrings.map(function(e,i){var n=S(e,"pie-path","none",t.colors[i]);return n.style.transition="transform .3s;",n})},animateElements:function(t){return this.store.map(function(e,i){return st(e,t.sliceStrings[i])})}},percentageBars:{layerClass:"percentage-bars",makeElements:function(t){var e=this;return t.xPositions.map(function(i,n){return F(i,0,t.widths[n],e.constants.barHeight,e.constants.barDepth,t.colors[n])})},animateElements:function(t){if(t)return[]}},yAxis:{layerClass:"y axis",makeElements:function(t){var e=this;return t.positions.map(function(i,n){return U(i,t.labels[n],e.constants.width,{mode:e.constants.mode,pos:e.constants.pos,shortenNumbers:e.constants.shortenNumbers})})},animateElements:function(t){var e=t.positions,i=t.labels,n=this.oldData.positions,a=this.oldData.labels,s=y(n,e),r=Vt(s,2);n=r[0],e=r[1];var o=y(a,i),l=Vt(o,2);return a=l[0],i=l[1],this.render({positions:n,labels:i}),this.store.map(function(t,i){return tt(t,e[i],n[i])})}},xAxis:{layerClass:"x axis",makeElements:function(t){var e=this;return t.positions.map(function(i,n){return G(i,t.calcLabels[n],e.constants.height,{mode:e.constants.mode,pos:e.constants.pos})})},animateElements:function(t){var e=t.positions,i=t.calcLabels,n=this.oldData.positions,a=this.oldData.calcLabels,s=y(n,e),r=Vt(s,2);n=r[0],e=r[1];var o=y(a,i),l=Vt(o,2);return a=l[0],i=l[1],this.render({positions:n,calcLabels:i}),this.store.map(function(t,i){return Z(t,e[i],n[i])})}},yMarkers:{layerClass:"y-markers",makeElements:function(t){var e=this;return t.map(function(t){return q(t.position,t.label,e.constants.width,{labelPos:t.options.labelPos,mode:"span",lineType:"dashed"})})},animateElements:function(t){var e=y(this.oldData,t),i=Vt(e,2);this.oldData=i[0];var n=(t=i[1]).map(function(t){return t.position}),a=t.map(function(t){return t.label}),s=t.map(function(t){return t.options}),r=this.oldData.map(function(t){return t.position});return this.render(r.map(function(t,e){return{position:r[e],label:a[e],options:s[e]}})),this.store.map(function(t,e){return tt(t,n[e],r[e])})}},yRegions:{layerClass:"y-regions",makeElements:function(t){var e=this;return t.map(function(t){return X(t.startPos,t.endPos,e.constants.width,t.label,{labelPos:t.options.labelPos})})},animateElements:function(t){var e=y(this.oldData,t),i=Vt(e,2);this.oldData=i[0];var n=(t=i[1]).map(function(t){return t.endPos}),a=t.map(function(t){return t.label}),s=t.map(function(t){return t.startPos}),r=t.map(function(t){return t.options}),o=this.oldData.map(function(t){return t.endPos}),l=this.oldData.map(function(t){return t.startPos});this.render(o.map(function(t,e){return{startPos:l[e],endPos:o[e],label:a[e],options:r[e]}}));var u=[];return this.store.map(function(t,e){u=u.concat(et(t,s[e],n[e],o[e]))}),u}},heatDomain:{layerClass:function(){return"heat-domain domain-"+this.constants.index},makeElements:function(t){var e=this,i=this.constants,n=i.index,a=i.colWidth,s=i.rowHeight,r=i.squareSize,o=i.radius,l=i.xTranslate,u=0;return this.serializedSubDomains=[],t.cols.map(function(t,i){1===i&&e.labels.push(Y("domain-name",l,-12,yt(n,!0).toUpperCase(),{fontSize:9})),t.map(function(t,i){if(t.fill){var n={"data-date":t.yyyyMmDd,"data-value":t.dataValue,"data-day":i},a=H("day",l,u,r,o,t.fill,n);e.serializedSubDomains.push(a)}u+=s}),u=0,l+=a}),this.serializedSubDomains},animateElements:function(t){if(t)return[]}},barGraph:{layerClass:function(){return"dataset-units dataset-bars dataset-"+this.constants.index},makeElements:function(t){var e=this.constants;return this.unitType="bar",this.units=t.yPositions.map(function(i,n){return J(t.xPositions[n],i,t.barWidth,e.color,t.labels[n],n,t.offsets[n],{zeroLine:t.zeroLine,barsWidth:t.barsWidth,minHeight:e.minHeight})}),this.units},animateElements:function(t){var e=t.xPositions,i=t.yPositions,n=t.offsets,a=t.labels,s=this.oldData.xPositions,r=this.oldData.yPositions,o=this.oldData.offsets,l=this.oldData.labels,u=y(s,e),h=Vt(u,2);s=h[0],e=h[1];var c=y(r,i),d=Vt(c,2);r=d[0],i=d[1];var p=y(o,n),f=Vt(p,2);o=f[0],n=f[1];var v=y(l,a),g=Vt(v,2);l=g[0],a=g[1],this.render({xPositions:s,yPositions:r,offsets:o,labels:a,zeroLine:this.oldData.zeroLine,barsWidth:this.oldData.barsWidth,barWidth:this.oldData.barWidth});var m=[];return this.store.map(function(a,s){m=m.concat(it(a,e[s],i[s],t.barWidth,n[s],{zeroLine:t.zeroLine}))}),m}},lineGraph:{layerClass:function(){return"dataset-units dataset-line dataset-"+this.constants.index},makeElements:function(t){var e=this.constants;return this.unitType="dot",this.paths={},e.hideLine||(this.paths=$(t.xPositions,t.yPositions,e.color,{heatline:e.heatline,regionFill:e.regionFill,spline:e.spline},{svgDefs:e.svgDefs,zeroLine:t.zeroLine})),this.units=[],e.hideDots||(this.units=t.yPositions.map(function(i,n){return K(t.xPositions[n],i,t.radius,e.color,e.valuesOverPoints?t.values[n]:"",n)})),Object.values(this.paths).concat(this.units)},animateElements:function(t){var e=t.xPositions,i=t.yPositions,n=t.values,a=this.oldData.xPositions,s=this.oldData.yPositions,r=this.oldData.values,o=y(a,e),l=Vt(o,2);a=l[0],e=l[1];var u=y(s,i),h=Vt(u,2);s=h[0],i=h[1];var c=y(r,n),d=Vt(c,2);r=d[0],n=d[1],this.render({xPositions:a,yPositions:s,values:n,zeroLine:this.oldData.zeroLine,radius:this.oldData.radius});var p=[];return Object.keys(this.paths).length&&(p=p.concat(at(this.paths,e,i,t.zeroLine,this.constants.spline))),this.units.length&&this.units.map(function(t,n){p=p.concat(nt(t,e[n],i[n]))}),p}}},Oe=function(t){function i(t,e){Ht(this,i);var n=Bt(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t,e));return n.type="percentage",n.setup(),n}return Yt(i,t),It(i,[{key:"setMeasures",value:function(t){var e=this.measures;this.barOptions=t.barOptions||{};var i=this.barOptions;i.height=i.height||20,i.depth=i.depth||Jt,e.paddings.right=30,e.legendHeight=60,e.baseHeight=8*(i.height+.5*i.depth)}},{key:"setupComponents",value:function(){var t=this.state,e=[["percentageBars",{barHeight:this.barOptions.height,barDepth:this.barOptions.depth},function(){return{xPositions:t.xPositions,widths:t.widths,colors:this.colors}}.bind(this)]];this.components=new Map(e.map(function(t){var e=wt.apply(void 0,Ut(t));return[t[0],e]}))}},{key:"calc",value:function(){var t=this;Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"calc",this).call(this);var e=this.state;e.xPositions=[],e.widths=[];var n=0;e.sliceTotals.map(function(i){var a=t.width*i/e.grandTotal;e.widths.push(a),e.xPositions.push(n),n+=a})}},{key:"makeDataByIndex",value:function(){}},{key:"bindTooltip",value:function(){var t=this,i=this.state;this.container.addEventListener("mousemove",function(n){var a=t.components.get("percentageBars").store,s=n.target;if(a.includes(s)){var r=a.indexOf(s),o=e(t.container),l=e(s),u=l.left-o.left+parseInt(s.getAttribute("width"))/2,h=l.top-o.top,c=(t.formattedLabels&&t.formattedLabels.length>0?t.formattedLabels[r]:t.state.labels[r])+": ",d=i.sliceTotals[r]/i.grandTotal;t.tip.setValues(u,h,{name:c,value:(100*d).toFixed(1)+"%"}),t.tip.showTip()}})}}]),i}(be),Me=function(t){function i(t,e){Ht(this,i);var n=Bt(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t,e));return n.type="pie",n.initTimeout=0,n.init=1,n.setup(),n}return Yt(i,t),It(i,[{key:"configure",value:function(t){Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"configure",this).call(this,t),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=t.hoverRadio||.1,this.config.startAngle=t.startAngle||0,this.clockWise=t.clockWise||!1}},{key:"calc",value:function(){var t=this;Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"calc",this).call(this);var e=this.state;this.radius=this.height>this.width?this.center.x:this.center.y;var n=this.radius,a=this.clockWise,s=e.slicesProperties||[];e.sliceStrings=[],e.slicesProperties=[];var r=180-this.config.startAngle;e.sliceTotals.map(function(i,o){var l=r,u=i/e.grandTotal*360,h=u>180?1:0,c=a?-u:u,d=r+=c,f=p(l,n),v=p(d,n),g=t.init&&s[o],m=void 0,y=void 0;t.init?(m=g?g.startPosition:f,y=g?g.endPosition:f):(m=f,y=v);var b=360===u?_(m,y,t.center,t.radius,a,h):E(m,y,t.center,t.radius,a,h);e.sliceStrings.push(b),e.slicesProperties.push({startPosition:f,endPosition:v,value:i,total:e.grandTotal,startAngle:l,endAngle:d,angle:c})}),this.init=0}},{key:"setupComponents",value:function(){var t=this.state,e=[["pieSlices",{},function(){return{sliceStrings:t.sliceStrings,colors:this.colors}}.bind(this)]];this.components=new Map(e.map(function(t){var e=wt.apply(void 0,Ut(t));return[t[0],e]}))}},{key:"calTranslateByAngle",value:function(t){var e=this.radius,i=this.hoverRadio,n=p(t.startAngle+t.angle/2,e);return"translate3d("+n.x*i+"px,"+n.y*i+"px,0)"}},{key:"hoverSlice",value:function(t,i,n,a){if(t){var s=this.colors[i];if(n){ot(t,this.calTranslateByAngle(this.state.slicesProperties[i])),t.style.fill=A(s,50);var r=e(this.svg),o=a.pageX-r.left+10,l=a.pageY-r.top-10,u=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[i]:this.state.labels[i])+": ",h=(100*this.state.sliceTotals[i]/this.state.grandTotal).toFixed(1);this.tip.setValues(o,l,{name:u,value:h+"%"}),this.tip.showTip()}else ot(t,"translate3d(0,0,0)"),this.tip.hideTip(),t.style.fill=s}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave)}},{key:"mouseMove",value:function(t){var e=t.target,i=this.components.get("pieSlices").store,n=this.curActiveSliceIndex,a=this.curActiveSlice;if(i.includes(e)){var s=i.indexOf(e);this.hoverSlice(a,n,!1),this.curActiveSlice=e,this.curActiveSliceIndex=s,this.hoverSlice(e,s,!0,t)}else this.mouseLeave()}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1)}}]),i}(be),Ce=function(t){function e(t,i){Ht(this,e);var n=Bt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i));n.type="heatmap",n.countLabel=i.countLabel||"";var a=["Sunday","Monday"],s=a.includes(i.startSubDomain)?i.startSubDomain:"Sunday";return n.startSubDomainIndex=a.indexOf(s),n.setup(),n}return Yt(e,t),It(e,[{key:"setMeasures",value:function(t){var e=this.measures;this.discreteDomains=0===t.discreteDomains?0:1,e.paddings.top=36,e.paddings.bottom=0,e.legendHeight=24,e.baseHeight=12*xe+l(e);var i=this.data,n=this.discreteDomains?12:0;this.independentWidth=12*(vt(i.start,i.end)+n)+u(e)}},{key:"updateWidth",value:function(){var t=this.discreteDomains?12:0,e=this.state.noOfWeeks?this.state.noOfWeeks:52;this.baseWidth=12*(e+t)+u(this.measures)}},{key:"prepareData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data;if(t.start&&t.end&&t.start>t.end)throw new Error("Start date cannot be greater than end date.");if(t.start||(t.start=new Date,t.start.setFullYear(t.start.getFullYear()-1)),t.end||(t.end=new Date),t.dataPoints=t.dataPoints||{},parseInt(Object.keys(t.dataPoints)[0])>1e5){var e={};Object.keys(t.dataPoints).forEach(function(i){var n=new Date(i*ke);e[pt(n)]=t.dataPoints[i]}),t.dataPoints=e}return t}},{key:"calc",value:function(){var t=this.state;t.start=ft(this.data.start),t.end=ft(this.data.end),t.firstWeekStart=ft(t.start),t.noOfWeeks=vt(t.start,t.end),t.distribution=St(Object.values(this.data.dataPoints),5),t.domainConfigs=this.getDomains()}},{key:"setupComponents",value:function(){var t=this,e=this.state,i=this.discreteDomains?0:1,n=e.domainConfigs.map(function(n,a){return["heatDomain",{index:n.index,colWidth:12,rowHeight:12,squareSize:10,radius:t.rawChartArgs.radius||0,xTranslate:12*e.domainConfigs.filter(function(t,e){return e<a}).map(function(t){return t.cols.length-i}).reduce(function(t,e){return t+e},0)},function(){return e.domainConfigs[a]}.bind(t)]});this.components=new Map(n.map(function(t,e){var i=wt.apply(void 0,Ut(t));return[t[0]+"-"+e,i]}));var a=0;Pe.forEach(function(e,i){if([1,3,5].includes(i)){var n=Y("subdomain-name",-6,a,e,{fontSize:10,dy:8,textAnchor:"end"});t.drawArea.appendChild(n)}a+=12})}},{key:"update",value:function(t){t||console.error("No data to update."),this.data=this.prepareData(t),this.draw(),this.bindTooltip()}},{key:"bindTooltip",value:function(){var t=this;this.container.addEventListener("mousemove",function(e){t.components.forEach(function(i){var n=i.store,a=e.target;if(n.includes(a)){var s=a.getAttribute("data-value"),r=a.getAttribute("data-date").split("-"),o=yt(parseInt(r[1])-1,!0),l=t.container.getBoundingClientRect(),u=a.getBoundingClientRect(),h=parseInt(e.target.getAttribute("width")),c=u.left-l.left+h/2,d=u.top-l.top,p=s+" "+t.countLabel,f=" on "+o+" "+r[0]+", "+r[2];t.tip.setValues(c,d,{name:f,value:p,valueFirst:1},[]),t.tip.showTip()}})})}},{key:"renderLegend",value:function(){var t=this;this.legendArea.textContent="";var e=0,i=this.rawChartArgs.radius||0,n=Y("subdomain-name",e,12,"Less",{fontSize:11,dy:9});e=30,this.legendArea.appendChild(n),this.colors.slice(0,5).map(function(n,a){var s=H("heatmap-legend-unit",e+15*a,12,10,i,n);t.legendArea.appendChild(s)});var a=Y("subdomain-name",e+75+3,12,"More",{fontSize:11,dy:9});this.legendArea.appendChild(a)}},{key:"getDomains",value:function(){for(var t=this.state,e=[t.start.getMonth(),t.start.getFullYear()],i=e[0],n=e[1],a=[t.end.getMonth(),t.end.getFullYear()],s=a[0]-i+1+12*(a[1]-n),r=[],o=ft(t.start),l=0;l<s;l++){var u=t.end;if(!mt(o,t.end)){var h=[o.getMonth(),o.getFullYear()];u=bt(h[0],h[1])}r.push(this.getDomainConfig(o,u)),kt(u,1),o=u}return r}},{key:"getDomainConfig",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=[t.getMonth(),t.getFullYear()],n=i[0],a=i[1],s=xt(t),r={index:n,cols:[]};kt(e=ft(e)||bt(n,a),1);for(var o=vt(s,e),l=[],u=void 0,h=0;h<o;h++)u=this.getCol(s,n),l.push(u),kt(s=new Date(u[xe-1].yyyyMmDd),1);return void 0!==u[xe-1].dataValue&&(kt(s,1),l.push(this.getCol(s,n,!0))),r.cols=l,r}},{key:"getCol",value:function(t,e){for(var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this.state,a=ft(t),s=[],r=0;r<xe;r++,kt(a,1)){var o={},l=a>=n.start&&a<=n.end;i||a.getMonth()!==e||!l?o.yyyyMmDd=pt(a):o=this.getSubDomainConfig(a),s.push(o)}return s}},{key:"getSubDomainConfig",value:function(t){var e=pt(t),i=this.data.dataPoints[e];return{yyyyMmDd:e,dataValue:i||0,fill:this.colors[Et(i,this.state.distribution)]}}}]),e}(ye),De=function(t){function i(t,e){Ht(this,i);var n=Bt(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t,e));return n.barOptions=e.barOptions||{},n.lineOptions=e.lineOptions||{},n.type=e.type||"line",n.init=1,n.setup(),n}return Yt(i,t),It(i,[{key:"setMeasures",value:function(){this.data.datasets.length<=1&&(this.config.showLegend=0,this.measures.paddings.bottom=30)}},{key:"configure",value:function(t){Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"configure",this).call(this,t),t.axisOptions=t.axisOptions||{},t.tooltipOptions=t.tooltipOptions||{},this.config.xAxisMode=t.axisOptions.xAxisMode||"span",this.config.yAxisMode=t.axisOptions.yAxisMode||"span",this.config.xIsSeries=t.axisOptions.xIsSeries||0,this.config.shortenYAxisNumbers=t.axisOptions.shortenYAxisNumbers||0,this.config.formatTooltipX=t.tooltipOptions.formatTooltipX,this.config.formatTooltipY=t.tooltipOptions.formatTooltipY,this.config.valuesOverPoints=t.valuesOverPoints}},{key:"prepareData",value:function(){return _t(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data,this.type)}},{key:"prepareFirstData",value:function(){return zt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data)}},{key:"calc",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.calcXPositions(),t||this.calcYAxisParameters(this.getAllYValues(),"line"===this.type),this.makeDataByIndex()}},{key:"calcXPositions",value:function(){var t=this.state,e=this.data.labels;t.datasetLength=e.length,t.unitWidth=this.width/t.datasetLength,t.xOffset=t.unitWidth/2,t.xAxis={labels:e,positions:e.map(function(e,i){return h(t.xOffset+i*t.unitWidth)})}}},{key:"calcYAxisParameters",value:function(t){var e=Lt(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"false"),i=this.height/Ct(e),n=Mt(e)*i,a=this.height-Ot(e)*n;this.state.yAxis={labels:e,positions:e.map(function(t){return a-t*i}),scaleMultiplier:i,zeroLine:a},this.calcDatasetPoints(),this.calcYExtremes(),this.calcYRegions()}},{key:"calcDatasetPoints",value:function(){var t=this.state,e=function(e){return e.map(function(e){return Dt(e,t.yAxis)})};t.datasets=this.data.datasets.map(function(t,i){var n=t.values,a=t.cumulativeYs||[];return{name:t.name&&t.name.replace(/<|>|&/g,function(t){return"&"==t?"&amp;":"<"==t?"&lt;":"&gt;"}),index:i,chartType:t.chartType,values:n,yPositions:e(n),cumulativeYs:a,cumulativeYPos:e(a)}})}},{key:"calcYExtremes",value:function(){var t=this.state;if(this.barOptions.stacked)return void(t.yExtremes=t.datasets[t.datasets.length-1].cumulativeYPos);t.yExtremes=new Array(t.datasetLength).fill(9999),t.datasets.map(function(e){e.yPositions.map(function(e,i){e<t.yExtremes[i]&&(t.yExtremes[i]=e)})})}},{key:"calcYRegions",value:function(){var t=this.state;this.data.yMarkers&&(this.state.yMarkers=this.data.yMarkers.map(function(e){return e.position=Dt(e.value,t.yAxis),e.options||(e.options={}),e})),this.data.yRegions&&(this.state.yRegions=this.data.yRegions.map(function(e){return e.startPos=Dt(e.start,t.yAxis),e.endPos=Dt(e.end,t.yAxis),e.options||(e.options={}),e}))}},{key:"getAllYValues",value:function(){var t,e=this,i="values";if(this.barOptions.stacked){i="cumulativeYs";var n=new Array(this.state.datasetLength).fill(0);this.data.datasets.map(function(t,a){var s=e.data.datasets[a].values;t[i]=n=n.map(function(t,e){return t+s[e]})})}var a=this.data.datasets.map(function(t){return t[i]});return this.data.yMarkers&&a.push(this.data.yMarkers.map(function(t){return t.value})),this.data.yRegions&&this.data.yRegions.map(function(t){a.push([t.end,t.start])}),(t=[]).concat.apply(t,Ut(a))}},{key:"setupComponents",value:function(){var t=this,e=[["yAxis",{mode:this.config.yAxisMode,width:this.width,shortenNumbers:this.config.shortenYAxisNumbers},function(){return this.state.yAxis}.bind(this)],["xAxis",{mode:this.config.xAxisMode,height:this.height},function(){var t=this.state;return t.xAxis.calcLabels=Wt(this.width,t.xAxis.labels,this.config.xIsSeries),t.xAxis}.bind(this)],["yRegions",{width:this.width,pos:"right"},function(){return this.state.yRegions}.bind(this)]],i=this.state.datasets.filter(function(t){return"bar"===t.chartType}),n=this.state.datasets.filter(function(t){return"line"===t.chartType}),a=i.map(function(e){var n=e.index;return["barGraph-"+e.index,{index:n,color:t.colors[n],stacked:t.barOptions.stacked,valuesOverPoints:t.config.valuesOverPoints,minHeight:0*t.height},function(){var t=this.state,e=t.datasets[n],a=this.barOptions.stacked,s=this.barOptions.spaceRatio||.5,r=t.unitWidth*(1-s),o=r/(a?1:i.length),l=t.xAxis.positions.map(function(t){return t-r/2});a||(l=l.map(function(t){return t+o*n}));var u=new Array(t.datasetLength).fill("");this.config.valuesOverPoints&&(u=a&&e.index===t.datasets.length-1?e.cumulativeYs:e.values);var h=new Array(t.datasetLength).fill(0);return a&&(h=e.yPositions.map(function(t,i){return t-e.cumulativeYPos[i]})),{xPositions:l,yPositions:e.yPositions,offsets:h,labels:u,zeroLine:t.yAxis.zeroLine,barsWidth:r,barWidth:o}}.bind(t)]}),s=n.map(function(e){var i=e.index;return["lineGraph-"+e.index,{index:i,color:t.colors[i],svgDefs:t.svgDefs,heatline:t.lineOptions.heatline,regionFill:t.lineOptions.regionFill,spline:t.lineOptions.spline,hideDots:t.lineOptions.hideDots,hideLine:t.lineOptions.hideLine,valuesOverPoints:t.config.valuesOverPoints},function(){var t=this.state,e=t.datasets[i],n=t.yAxis.positions[0]<t.yAxis.zeroLine?t.yAxis.positions[0]:t.yAxis.zeroLine;return{xPositions:t.xAxis.positions,yPositions:e.yPositions,values:e.values,zeroLine:n,radius:this.lineOptions.dotSize||4}}.bind(t)]}),r=[["yMarkers",{width:this.width,pos:"right"},function(){return this.state.yMarkers}.bind(this)]];e=e.concat(a,s,r);var o=["yMarkers","yRegions"];this.dataUnitComponents=[],this.components=new Map(e.filter(function(e){return!o.includes(e[0])||t.state[e[0]]}).map(function(e){var i=wt.apply(void 0,Ut(e));return(e[0].includes("lineGraph")||e[0].includes("barGraph"))&&t.dataUnitComponents.push(i),[e[0],i]}))}},{key:"makeDataByIndex",value:function(){var t=this;this.dataByIndex={};var e=this.state,i=this.config.formatTooltipX,n=this.config.formatTooltipY;e.xAxis.labels.map(function(a,s){var r=t.state.datasets.map(function(e,i){var a=e.values[s];return{title:e.name,value:a,yPos:e.yPositions[s],color:t.colors[i],formatted:n?n(a):a}});t.dataByIndex[s]={label:a,formattedLabel:i?i(a):a,xPos:e.xAxis.positions[s],values:r,yExtreme:e.yExtremes[s]}})}},{key:"bindTooltip",value:function(){var t=this;this.container.addEventListener("mousemove",function(i){var n=t.measures,a=e(t.container),s=i.pageX-a.left-o(n),l=i.pageY-a.top;l<t.height+r(n)&&l>r(n)?t.mapTooltipXPosition(s):t.tip.hideTip()})}},{key:"mapTooltipXPosition",value:function(t){var e=this.state;if(e.yExtremes){var i=Nt(t,e.xAxis.positions,!0);if(i>=0){var n=this.dataByIndex[i];this.tip.setValues(n.xPos+this.tip.offset.x,n.yExtreme+this.tip.offset.y,{name:n.formattedLabel,value:""},n.values,i),this.tip.showTip()}}}},{key:"renderLegend",value:function(){var t=this,e=this.data;e.datasets.length>1&&(this.legendArea.textContent="",e.datasets.map(function(e,i){var n=I(100*i,"0",100,t.colors[i],e.name,t.config.truncateLegends);t.legendArea.appendChild(n)}))}},{key:"makeOverlay",value:function(){var t=this;if(this.init)return void(this.init=0);this.overlayGuides&&this.overlayGuides.forEach(function(t){var e=t.overlay;e.parentNode.removeChild(e)}),this.overlayGuides=this.dataUnitComponents.map(function(t){return{type:t.unitType,overlay:void 0,units:t.units}}),void 0===this.state.currentIndex&&(this.state.currentIndex=this.state.datasetLength-1),this.overlayGuides.map(function(e){var i=e.units[t.state.currentIndex];e.overlay=ue[e.type](i),t.drawArea.appendChild(e.overlay)})}},{key:"updateOverlayGuides",value:function(){this.overlayGuides&&this.overlayGuides.forEach(function(t){var e=t.overlay;e.parentNode.removeChild(e)})}},{key:"bindOverlay",value:function(){var t=this;this.parent.addEventListener("data-select",function(){t.updateOverlay()})}},{key:"bindUnits",value:function(){var t=this;this.dataUnitComponents.map(function(e){e.units.map(function(e){e.addEventListener("click",function(){var i=e.getAttribute("data-point-index");t.setCurrentDataPoint(i)})})}),this.tip.container.addEventListener("click",function(){var e=t.tip.container.getAttribute("data-point-index");t.setCurrentDataPoint(e)})}},{key:"updateOverlay",value:function(){var t=this;this.overlayGuides.map(function(e){var i=e.units[t.state.currentIndex];he[e.type](i,e.overlay)})}},{key:"onLeftArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex-1)}},{key:"onRightArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex+1)}},{key:"getDataPoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.currentIndex,e=this.state;return{index:t,label:e.xAxis.labels[t],values:e.datasets.map(function(e){return e.values[t]})}}},{key:"setCurrentDataPoint",value:function(t){var e=this.state;(t=parseInt(t))<0&&(t=0),t>=e.xAxis.labels.length&&(t=e.xAxis.labels.length-1),t!==e.currentIndex&&(e.currentIndex=t,s(this.parent,"data-select",this.getDataPoint()))}},{key:"addDataPoint",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.state.datasetLength;Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"addDataPoint",this).call(this,t,e,n),this.data.labels.splice(n,0,t),this.data.datasets.map(function(t,i){t.values.splice(n,0,e[i])}),this.update(this.data)}},{key:"removeDataPoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.datasetLength-1;this.data.labels.length<=1||(Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"removeDataPoint",this).call(this,t),this.data.labels.splice(t,1),this.data.datasets.map(function(e){e.values.splice(t,1)}),this.update(this.data))}},{key:"updateDataset",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.data.datasets[e].values=t,this.update(this.data)}},{key:"updateDatasets",value:function(t){this.data.datasets.map(function(e,i){t[i]&&(e.values=t[i])}),this.update(this.data)}}]),i}(ye),Ne=function(t){function i(t,e){Ht(this,i);var n=Bt(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t,e));return n.type="donut",n.initTimeout=0,n.init=1,n.setup(),n}return Yt(i,t),It(i,[{key:"configure",value:function(t){Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"configure",this).call(this,t),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=t.hoverRadio||.1,this.config.startAngle=t.startAngle||0,this.clockWise=t.clockWise||!1,this.strokeWidth=t.strokeWidth||30}},{key:"calc",value:function(){var t=this;Rt(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"calc",this).call(this);var e=this.state;this.radius=this.height>this.width?this.center.x-this.strokeWidth/2:this.center.y-this.strokeWidth/2;var n=this.radius,a=this.clockWise,s=e.slicesProperties||[];e.sliceStrings=[],e.slicesProperties=[];var r=180-this.config.startAngle;e.sliceTotals.map(function(i,o){var l=r,u=i/e.grandTotal*360,h=u>180?1:0,c=a?-u:u,d=r+=c,f=p(l,n),v=p(d,n),g=t.init&&s[o],m=void 0,y=void 0;t.init?(m=g?g.startPosition:f,y=g?g.endPosition:f):(m=f,y=v);var b=360===u?W(m,y,t.center,t.radius,t.clockWise,h):z(m,y,t.center,t.radius,t.clockWise,h);e.sliceStrings.push(b),e.slicesProperties.push({startPosition:f,endPosition:v,value:i,total:e.grandTotal,startAngle:l,endAngle:d,angle:c})}),this.init=0}},{key:"setupComponents",value:function(){var t=this.state,e=[["donutSlices",{},function(){return{sliceStrings:t.sliceStrings,colors:this.colors,strokeWidth:this.strokeWidth}}.bind(this)]];this.components=new Map(e.map(function(t){var e=wt.apply(void 0,Ut(t));return[t[0],e]}))}},{key:"calTranslateByAngle",value:function(t){var e=this.radius,i=this.hoverRadio,n=p(t.startAngle+t.angle/2,e);return"translate3d("+n.x*i+"px,"+n.y*i+"px,0)"}},{key:"hoverSlice",value:function(t,i,n,a){if(t){var s=this.colors[i];if(n){ot(t,this.calTranslateByAngle(this.state.slicesProperties[i])),t.style.stroke=A(s,50);var r=e(this.svg),o=a.pageX-r.left+10,l=a.pageY-r.top-10,u=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[i]:this.state.labels[i])+": ",h=(100*this.state.sliceTotals[i]/this.state.grandTotal).toFixed(1);this.tip.setValues(o,l,{name:u,value:h+"%"}),this.tip.showTip()}else ot(t,"translate3d(0,0,0)"),this.tip.hideTip(),t.style.stroke=s}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave)}},{key:"mouseMove",value:function(t){var e=t.target,i=this.components.get("donutSlices").store,n=this.curActiveSliceIndex,a=this.curActiveSlice;if(i.includes(e)){var s=i.indexOf(e);this.hoverSlice(a,n,!1),this.curActiveSlice=e,this.curActiveSliceIndex=s,this.hoverSlice(e,s,!0,t)}else this.mouseLeave()}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1)}}]),i}(be),Se={bar:De,line:De,percentage:Oe,heatmap:Ce,pie:Me,donut:Ne},Ee=function t(e,i){return Ht(this,t),jt(i.type,e,i)},_e=Object.freeze({Chart:Ee,PercentageChart:Oe,PieChart:Me,Heatmap:Ce,AxisChart:De}),ze={};return ze.NAME="Frappe Charts",ze.VERSION="1.6.2",ze=Object.assign({},ze,_e)});


},{}],"node_modules/frappe-charts/dist/frappe-charts.min.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieChart = exports.PercentageChart = exports.Heatmap = exports.Chart = exports.AxisChart = void 0;
function styleInject(t, e) {
  void 0 === e && (e = {});
  var n = e.insertAt;
  if (t && "undefined" != typeof document) {
    var i = document.head || document.getElementsByTagName("head")[0],
      a = document.createElement("style");
    a.type = "text/css", "top" === n && i.firstChild ? i.insertBefore(a, i.firstChild) : i.appendChild(a), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t));
  }
}
function $(t, e) {
  return "string" == typeof t ? (e || document).querySelector(t) : t || null;
}
function getOffset(t) {
  var e = t.getBoundingClientRect();
  return {
    top: e.top + (document.documentElement.scrollTop || document.body.scrollTop),
    left: e.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
  };
}
function isHidden(t) {
  return null === t.offsetParent;
}
function isElementInViewport(t) {
  var e = t.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function getElementContentWidth(t) {
  var e = window.getComputedStyle(t),
    n = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight);
  return t.clientWidth - n;
}
function fire(t, e, n) {
  var i = document.createEvent("HTMLEvents");
  i.initEvent(e, !0, !0);
  for (var a in n) i[a] = n[a];
  return t.dispatchEvent(i);
}
function getTopOffset(t) {
  return t.titleHeight + t.margins.top + t.paddings.top;
}
function getLeftOffset(t) {
  return t.margins.left + t.paddings.left;
}
function getExtraHeight(t) {
  return t.margins.top + t.margins.bottom + t.paddings.top + t.paddings.bottom + t.titleHeight + t.legendHeight;
}
function getExtraWidth(t) {
  return t.margins.left + t.margins.right + t.paddings.left + t.paddings.right;
}
function _classCallCheck$4(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function floatTwo(t) {
  return parseFloat(t.toFixed(2));
}
function fillArray(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  n || (n = i ? t[0] : t[t.length - 1]);
  var a = new Array(Math.abs(e)).fill(n);
  return t = i ? a.concat(t) : t.concat(a);
}
function getStringWidth(t, e) {
  return (t + "").length * e;
}
function getPositionByAngle(t, e) {
  return {
    x: Math.sin(t * ANGLE_RATIO) * e,
    y: Math.cos(t * ANGLE_RATIO) * e
  };
}
function isValidNumber(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return !Number.isNaN(t) && void 0 !== t && !!Number.isFinite(t) && !(e && t < 0);
}
function round(t) {
  return Number(Math.round(t + "e4") + "e-4");
}
function deepClone(t) {
  var e = void 0,
    n = void 0,
    i = void 0;
  if (t instanceof Date) return new Date(t.getTime());
  if ("object" !== (void 0 === t ? "undefined" : _typeof$2(t)) || null === t) return t;
  e = Array.isArray(t) ? [] : {};
  for (i in t) n = t[i], e[i] = deepClone(n);
  return e;
}
function getBarHeightAndYAttr(t, e) {
  var n = void 0,
    i = void 0;
  return t <= e ? (n = e - t, i = t) : (n = t - e, i = e), [n, i];
}
function equilizeNoOfElements(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length - t.length;
  return n > 0 ? t = fillArray(t, n) : e = fillArray(e, n), [t, e];
}
function truncateString(t, e) {
  if (t) return t.length > e ? t.slice(0, e - 3) + "..." : t;
}
function shortenLargeNumber(t) {
  var e = void 0;
  if ("number" == typeof t) e = t;else if ("string" == typeof t && (e = Number(t), Number.isNaN(e))) return t;
  var n = Math.floor(Math.log10(Math.abs(e)));
  if (n <= 2) return e;
  var i = Math.floor(n / 3),
    a = Math.pow(10, n - 3 * i) * +(e / Math.pow(10, n)).toFixed(1);
  return Math.round(100 * a) / 100 + " " + ["", "K", "M", "B", "T"][i];
}
function getSplineCurvePointsStr(t, e) {
  for (var n = [], i = 0; i < t.length; i++) n.push([t[i], e[i]]);
  var a = function (t, e) {
      var n = e[0] - t[0],
        i = e[1] - t[1];
      return {
        length: Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2)),
        angle: Math.atan2(i, n)
      };
    },
    r = function (t, e, n, i) {
      var r = a(e || t, n || t),
        o = r.angle + (i ? Math.PI : 0),
        s = .2 * r.length;
      return [t[0] + Math.cos(o) * s, t[1] + Math.sin(o) * s];
    };
  return function (t, e) {
    return t.reduce(function (t, n, i, a) {
      return 0 === i ? n[0] + "," + n[1] : t + " " + e(n, i, a);
    }, "");
  }(n, function (t, e, n) {
    var i = r(n[e - 1], n[e - 2], t),
      a = r(t, n[e - 1], n[e + 1], !0);
    return "C " + i[0] + "," + i[1] + " " + a[0] + "," + a[1] + " " + t[0] + "," + t[1];
  });
}
function limitColor(t) {
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function lightenDarkenColor(t, e) {
  var n = getColor(t),
    i = !1;
  "#" == n[0] && (n = n.slice(1), i = !0);
  var a = parseInt(n, 16),
    r = limitColor((a >> 16) + e),
    o = limitColor((a >> 8 & 255) + e),
    s = limitColor((255 & a) + e);
  return (i ? "#" : "") + (s | o << 8 | r << 16).toString(16);
}
function isValidColor(t) {
  var e = /(^\s*)(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i;
  return /(^\s*)(#)((?:[A-Fa-f0-9]{3}){1,2})$/i.test(t) || e.test(t);
}
function $$1(t, e) {
  return "string" == typeof t ? (e || document).querySelector(t) : t || null;
}
function createSVG(t, e) {
  var n = document.createElementNS("http://www.w3.org/2000/svg", t);
  for (var i in e) {
    var a = e[i];
    if ("inside" === i) $$1(a).appendChild(n);else if ("around" === i) {
      var r = $$1(a);
      r.parentNode.insertBefore(n, r), n.appendChild(r);
    } else "styles" === i ? "object" === (void 0 === a ? "undefined" : _typeof$1(a)) && Object.keys(a).map(function (t) {
      n.style[t] = a[t];
    }) : ("className" === i && (i = "class"), "innerHTML" === i ? n.textContent = a : n.setAttribute(i, a));
  }
  return n;
}
function renderVerticalGradient(t, e) {
  return createSVG("linearGradient", {
    inside: t,
    id: e,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1
  });
}
function setGradientStop(t, e, n, i) {
  return createSVG("stop", {
    inside: t,
    style: "stop-color: " + n,
    offset: e,
    "stop-opacity": i
  });
}
function makeSVGContainer(t, e, n, i) {
  return createSVG("svg", {
    className: e,
    inside: t,
    width: n,
    height: i
  });
}
function makeSVGDefs(t) {
  return createSVG("defs", {
    inside: t
  });
}
function makeSVGGroup(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
    i = {
      className: t,
      transform: e
    };
  return n && (i.inside = n), createSVG("g", i);
}
function makePath(t) {
  return createSVG("path", {
    className: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    d: t,
    styles: {
      stroke: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none",
      fill: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
      "stroke-width": arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2
    }
  });
}
function makeArcPathStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = n.y + e.y;
  return "M" + n.x + " " + n.y + "\n\t\tL" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u + " z";
}
function makeCircleStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = 2 * n.y,
    c = n.y + e.y;
  return "M" + n.x + " " + n.y + "\n\t\tL" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u + " z\n\t\tL" + o + " " + u + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + c + " z";
}
function makeArcStrokePathStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = n.y + e.y;
  return "M" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u;
}
function makeStrokeCircleStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = 2 * i + s,
    c = n.y + t.y;
  return "M" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u + "\n\t\tM" + o + " " + u + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + c;
}
function makeGradient(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    i = "path-fill-gradient-" + e + "-" + (n ? "lighter" : "default"),
    a = renderVerticalGradient(t, i),
    r = [1, .6, .2];
  return n && (r = [.4, .2, 0]), setGradientStop(a, "0%", e, r[0]), setGradientStop(a, "50%", e, r[1]), setGradientStop(a, "100%", e, r[2]), i;
}
function percentageBar(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : PERCENTAGE_BAR_DEFAULT_DEPTH,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none";
  return createSVG("rect", {
    className: "percentage-bar",
    x: t,
    y: e,
    width: n,
    height: i,
    fill: r,
    styles: {
      stroke: lightenDarkenColor(r, -25),
      "stroke-dasharray": "0, " + (i + n) + ", " + n + ", " + i,
      "stroke-width": a
    }
  });
}
function heatSquare(t, e, n, i, a) {
  var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none",
    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : {},
    s = {
      className: t,
      x: e,
      y: n,
      width: i,
      height: i,
      rx: a,
      fill: r
    };
  return Object.keys(o).map(function (t) {
    s[t] = o[t];
  }), createSVG("rect", s);
}
function legendBar(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
    a = arguments[4];
  a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5] ? truncateString(a, LABEL_MAX_CHARS) : a;
  var r = {
      className: "legend-bar",
      x: 0,
      y: 0,
      width: n,
      height: "2px",
      fill: i
    },
    o = createSVG("text", {
      className: "legend-dataset-text",
      x: 0,
      y: 0,
      dy: 2 * FONT_SIZE + "px",
      "font-size": 1.2 * FONT_SIZE + "px",
      "text-anchor": "start",
      fill: FONT_FILL,
      innerHTML: a
    }),
    s = createSVG("g", {
      transform: "translate(" + t + ", " + e + ")"
    });
  return s.appendChild(createSVG("rect", r)), s.appendChild(o), s;
}
function legendDot(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
    a = arguments[4];
  a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5] ? truncateString(a, LABEL_MAX_CHARS) : a;
  var r = {
      className: "legend-dot",
      cx: 0,
      cy: 0,
      r: n,
      fill: i
    },
    o = createSVG("text", {
      className: "legend-dataset-text",
      x: 0,
      y: 0,
      dx: FONT_SIZE + "px",
      dy: FONT_SIZE / 3 + "px",
      "font-size": 1.2 * FONT_SIZE + "px",
      "text-anchor": "start",
      fill: FONT_FILL,
      innerHTML: a
    }),
    s = createSVG("g", {
      transform: "translate(" + t + ", " + e + ")"
    });
  return s.appendChild(createSVG("circle", r)), s.appendChild(o), s;
}
function makeText(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    r = a.fontSize || FONT_SIZE;
  return createSVG("text", {
    className: t,
    x: e,
    y: n,
    dy: (void 0 !== a.dy ? a.dy : r / 2) + "px",
    "font-size": r + "px",
    fill: a.fill || FONT_FILL,
    "text-anchor": a.textAnchor || "start",
    innerHTML: i
  });
}
function makeVertLine(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
  a.stroke || (a.stroke = BASE_LINE_COLOR);
  var r = createSVG("line", {
      className: "line-vertical " + a.className,
      x1: 0,
      x2: 0,
      y1: n,
      y2: i,
      styles: {
        stroke: a.stroke
      }
    }),
    o = createSVG("text", {
      x: 0,
      y: n > i ? n + LABEL_MARGIN : n - LABEL_MARGIN - FONT_SIZE,
      dy: FONT_SIZE + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": "middle",
      innerHTML: e + ""
    }),
    s = createSVG("g", {
      transform: "translate(" + t + ", 0)"
    });
  return s.appendChild(r), s.appendChild(o), s;
}
function makeHoriLine(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
  a.stroke || (a.stroke = BASE_LINE_COLOR), a.lineType || (a.lineType = ""), a.shortenNumbers && (e = shortenLargeNumber(e));
  var r = createSVG("line", {
      className: "line-horizontal " + a.className + ("dashed" === a.lineType ? "dashed" : ""),
      x1: n,
      x2: i,
      y1: 0,
      y2: 0,
      styles: {
        stroke: a.stroke
      }
    }),
    o = createSVG("text", {
      x: n < i ? n - LABEL_MARGIN : n + LABEL_MARGIN,
      y: 0,
      dy: FONT_SIZE / 2 - 2 + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": n < i ? "end" : "start",
      innerHTML: e + ""
    }),
    s = createSVG("g", {
      transform: "translate(0, " + t + ")",
      "stroke-opacity": 1
    });
  return 0 !== o && "0" !== o || (s.style.stroke = "rgba(27, 31, 35, 0.6)"), s.appendChild(r), s.appendChild(o), s;
}
function yLine(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  isValidNumber(t) || (t = 0), i.pos || (i.pos = "left"), i.offset || (i.offset = 0), i.mode || (i.mode = "span"), i.stroke || (i.stroke = BASE_LINE_COLOR), i.className || (i.className = "");
  var a = -1 * AXIS_TICK_LENGTH,
    r = "span" === i.mode ? n + AXIS_TICK_LENGTH : 0;
  return "tick" === i.mode && "right" === i.pos && (a = n + AXIS_TICK_LENGTH, r = n), a += i.offset, r += i.offset, makeHoriLine(t, e, a, r, {
    stroke: i.stroke,
    className: i.className,
    lineType: i.lineType,
    shortenNumbers: i.shortenNumbers
  });
}
function xLine(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  isValidNumber(t) || (t = 0), i.pos || (i.pos = "bottom"), i.offset || (i.offset = 0), i.mode || (i.mode = "span"), i.stroke || (i.stroke = BASE_LINE_COLOR), i.className || (i.className = "");
  var a = n + AXIS_TICK_LENGTH,
    r = "span" === i.mode ? -1 * AXIS_TICK_LENGTH : n;
  return "tick" === i.mode && "top" === i.pos && (a = -1 * AXIS_TICK_LENGTH, r = 0), makeVertLine(t, e, a, r, {
    stroke: i.stroke,
    className: i.className,
    lineType: i.lineType
  });
}
function yMarker(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  i.labelPos || (i.labelPos = "right");
  var a = createSVG("text", {
      className: "chart-label",
      x: "left" === i.labelPos ? LABEL_MARGIN : n - getStringWidth(e, 5) - LABEL_MARGIN,
      y: 0,
      dy: FONT_SIZE / -2 + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": "start",
      innerHTML: e + ""
    }),
    r = makeHoriLine(t, "", 0, n, {
      stroke: i.stroke || BASE_LINE_COLOR,
      className: i.className || "",
      lineType: i.lineType
    });
  return r.appendChild(a), r;
}
function yRegion(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    r = t - e,
    o = createSVG("rect", {
      className: "bar mini",
      styles: {
        fill: "rgba(228, 234, 239, 0.49)",
        stroke: BASE_LINE_COLOR,
        "stroke-dasharray": n + ", " + r
      },
      x: 0,
      y: 0,
      width: n,
      height: r
    });
  a.labelPos || (a.labelPos = "right");
  var s = createSVG("text", {
      className: "chart-label",
      x: "left" === a.labelPos ? LABEL_MARGIN : n - getStringWidth(i + "", 4.5) - LABEL_MARGIN,
      y: 0,
      dy: FONT_SIZE / -2 + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": "start",
      innerHTML: i + ""
    }),
    l = createSVG("g", {
      transform: "translate(0, " + e + ")"
    });
  return l.appendChild(o), l.appendChild(s), l;
}
function datasetBar(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
    s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {},
    l = getBarHeightAndYAttr(e, s.zeroLine),
    u = _slicedToArray(l, 2),
    c = u[0],
    h = u[1];
  h -= o, 0 === c && (c = s.minHeight, h -= s.minHeight), isValidNumber(t) || (t = 0), isValidNumber(h) || (h = 0), isValidNumber(c, !0) || (c = 0), isValidNumber(n, !0) || (n = 0);
  var d = createSVG("rect", {
    className: "bar mini",
    style: "fill: " + i,
    "data-point-index": r,
    x: t,
    y: h,
    width: n,
    height: c
  });
  if ((a += "") || a.length) {
    d.setAttribute("y", 0), d.setAttribute("x", 0);
    var f = createSVG("text", {
        className: "data-point-value",
        x: n / 2,
        y: 0,
        dy: FONT_SIZE / 2 * -1 + "px",
        "font-size": FONT_SIZE + "px",
        "text-anchor": "middle",
        innerHTML: a
      }),
      p = createSVG("g", {
        "data-point-index": r,
        transform: "translate(" + t + ", " + h + ")"
      });
    return p.appendChild(d), p.appendChild(f), p;
  }
  return d;
}
function datasetDot(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = createSVG("circle", {
      style: "fill: " + i,
      "data-point-index": r,
      cx: t,
      cy: e,
      r: n
    });
  if ((a += "") || a.length) {
    o.setAttribute("cy", 0), o.setAttribute("cx", 0);
    var s = createSVG("text", {
        className: "data-point-value",
        x: 0,
        y: 0,
        dy: FONT_SIZE / 2 * -1 - n + "px",
        "font-size": FONT_SIZE + "px",
        "text-anchor": "middle",
        innerHTML: a
      }),
      l = createSVG("g", {
        "data-point-index": r,
        transform: "translate(" + t + ", " + e + ")"
      });
    return l.appendChild(o), l.appendChild(s), l;
  }
  return o;
}
function getPaths(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    r = e.map(function (e, n) {
      return t[n] + "," + e;
    }).join("L");
  i.spline && (r = getSplineCurvePointsStr(t, e));
  var o = makePath("M" + r, "line-graph-path", n);
  if (i.heatline) {
    var s = makeGradient(a.svgDefs, n);
    o.style.stroke = "url(#" + s + ")";
  }
  var l = {
    path: o
  };
  if (i.regionFill) {
    var u = makeGradient(a.svgDefs, n, !0),
      c = "M" + t[0] + "," + a.zeroLine + "L" + r + "L" + t.slice(-1)[0] + "," + a.zeroLine;
    l.region = makePath(c, "region-fill", "none", "url(#" + u + ")");
  }
  return l;
}
function translate(t, e, n, i) {
  var a = "string" == typeof e ? e : e.join(", ");
  return [t, {
    transform: n.join(", ")
  }, i, STD_EASING, "translate", {
    transform: a
  }];
}
function translateVertLine(t, e, n) {
  return translate(t, [n, 0], [e, 0], MARKER_LINE_ANIM_DUR);
}
function translateHoriLine(t, e, n) {
  return translate(t, [0, n], [0, e], MARKER_LINE_ANIM_DUR);
}
function animateRegion(t, e, n, i) {
  var a = e - n,
    r = t.childNodes[0];
  return [[r, {
    height: a,
    "stroke-dasharray": r.getAttribute("width") + ", " + a
  }, MARKER_LINE_ANIM_DUR, STD_EASING], translate(t, [0, i], [0, n], MARKER_LINE_ANIM_DUR)];
}
function animateBar(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
    r = getBarHeightAndYAttr(n, (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}).zeroLine),
    o = _slicedToArray$2(r, 2),
    s = o[0],
    l = o[1];
  return l -= a, "rect" !== t.nodeName ? [[t.childNodes[0], {
    width: i,
    height: s
  }, UNIT_ANIM_DUR, STD_EASING], translate(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, l], MARKER_LINE_ANIM_DUR)] : [[t, {
    width: i,
    height: s,
    x: e,
    y: l
  }, UNIT_ANIM_DUR, STD_EASING]];
}
function animateDot(t, e, n) {
  return "circle" !== t.nodeName ? [translate(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, n], MARKER_LINE_ANIM_DUR)] : [[t, {
    cx: e,
    cy: n
  }, UNIT_ANIM_DUR, STD_EASING]];
}
function animatePath(t, e, n, i, a) {
  var r = [],
    o = n.map(function (t, n) {
      return e[n] + "," + t;
    }).join("L");
  a && (o = getSplineCurvePointsStr(e, n));
  var s = [t.path, {
    d: "M" + o
  }, PATH_ANIM_DUR, STD_EASING];
  if (r.push(s), t.region) {
    var l = e[0] + "," + i + "L",
      u = "L" + e.slice(-1)[0] + ", " + i,
      c = [t.region, {
        d: "M" + l + o + u
      }, PATH_ANIM_DUR, STD_EASING];
    r.push(c);
  }
  return r;
}
function animatePathStr(t, e) {
  return [t, {
    d: e
  }, UNIT_ANIM_DUR, STD_EASING];
}
function _toConsumableArray$1(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function animateSVGElement(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "linear",
    a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
    o = t.cloneNode(!0),
    s = t.cloneNode(!0);
  for (var l in e) {
    var u = void 0;
    u = "transform" === l ? document.createElementNS("http://www.w3.org/2000/svg", "animateTransform") : document.createElementNS("http://www.w3.org/2000/svg", "animate");
    var c = r[l] || t.getAttribute(l),
      h = e[l],
      d = {
        attributeName: l,
        from: c,
        to: h,
        begin: "0s",
        dur: n / 1e3 + "s",
        values: c + ";" + h,
        keySplines: EASING[i],
        keyTimes: "0;1",
        calcMode: "spline",
        fill: "freeze"
      };
    a && (d.type = a);
    for (var f in d) u.setAttribute(f, d[f]);
    o.appendChild(u), a ? s.setAttribute(l, "translate(" + h + ")") : s.setAttribute(l, h);
  }
  return [o, s];
}
function transform(t, e) {
  t.style.transform = e, t.style.webkitTransform = e, t.style.msTransform = e, t.style.mozTransform = e, t.style.oTransform = e;
}
function animateSVG(t, e) {
  var n = [],
    i = [];
  e.map(function (t) {
    var e = t[0],
      a = e.parentNode,
      r = void 0,
      o = void 0;
    t[0] = e;
    var s = animateSVGElement.apply(void 0, _toConsumableArray$1(t)),
      l = _slicedToArray$1(s, 2);
    r = l[0], o = l[1], n.push(o), i.push([r, a]), a && a.replaceChild(r, e);
  });
  var a = t.cloneNode(!0);
  return i.map(function (t, i) {
    t[1] && (t[1].replaceChild(n[i], t[0]), e[i][0] = n[i]);
  }), a;
}
function runSMILAnimation(t, e, n) {
  if (0 !== n.length) {
    var i = animateSVG(e, n);
    e.parentNode == t && (t.removeChild(e), t.appendChild(i)), setTimeout(function () {
      i.parentNode == t && (t.removeChild(i), t.appendChild(e));
    }, REPLACE_ALL_NEW_DUR);
  }
}
function downloadFile(t, e) {
  var n = document.createElement("a");
  n.style = "display: none";
  var i = new Blob(e, {
      type: "image/svg+xml; charset=utf-8"
    }),
    a = window.URL.createObjectURL(i);
  n.href = a, n.download = t, document.body.appendChild(n), n.click(), setTimeout(function () {
    document.body.removeChild(n), window.URL.revokeObjectURL(a);
  }, 300);
}
function prepareForExport(t) {
  var e = t.cloneNode(!0);
  e.classList.add("chart-container"), e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  var n = $.create("style", {
    innerHTML: CSSTEXT
  });
  e.insertBefore(n, e.firstChild);
  var i = $.create("div");
  return i.appendChild(e), i.innerHTML;
}
function _classCallCheck$3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _classCallCheck$2(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$1(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$1(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function treatAsUtc(t) {
  var e = new Date(t);
  return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e;
}
function getYyyyMmDd(t) {
  var e = t.getDate(),
    n = t.getMonth() + 1;
  return [t.getFullYear(), (n > 9 ? "" : "0") + n, (e > 9 ? "" : "0") + e].join("-");
}
function clone(t) {
  return new Date(t.getTime());
}
function getWeeksBetween(t, e) {
  var n = setDayToSunday(t);
  return Math.ceil(getDaysBetween(n, e) / NO_OF_DAYS_IN_WEEK);
}
function getDaysBetween(t, e) {
  var n = SEC_IN_DAY * NO_OF_MILLIS;
  return (treatAsUtc(e) - treatAsUtc(t)) / n;
}
function areInSameMonth(t, e) {
  return t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear();
}
function getMonthName(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    n = MONTH_NAMES[t];
  return e ? n.slice(0, 3) : n;
}
function getLastDateInMonth(t, e) {
  return new Date(e, t + 1, 0);
}
function setDayToSunday(t) {
  var e = clone(t),
    n = e.getDay();
  return 0 !== n && addDays(e, -1 * n), e;
}
function addDays(t, e) {
  t.setDate(t.getDate() + e);
}
function _classCallCheck$5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function getComponent(t, e, n) {
  var i = Object.keys(componentConfigs).filter(function (e) {
      return t.includes(e);
    }),
    a = componentConfigs[i[0]];
  return Object.assign(a, {
    constants: e,
    getData: n
  }), new ChartComponent(a);
}
function _toConsumableArray(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$1(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$2(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$2(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$2(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$4(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function normalize(t) {
  if (0 === t) return [0, 0];
  if (isNaN(t)) return {
    mantissa: -6755399441055744,
    exponent: 972
  };
  var e = t > 0 ? 1 : -1;
  if (!isFinite(t)) return {
    mantissa: 4503599627370496 * e,
    exponent: 972
  };
  t = Math.abs(t);
  var n = Math.floor(Math.log10(t));
  return [e * (t / Math.pow(10, n)), n];
}
function getChartRangeIntervals(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = Math.ceil(t),
    i = Math.floor(e),
    a = n - i,
    r = a,
    o = 1;
  a > 5 && (a % 2 != 0 && (a = ++n - i), r = a / 2, o = 2), a <= 2 && (o = a / (r = 4)), 0 === a && (r = 5, o = 1);
  for (var s = [], l = 0; l <= r; l++) s.push(i + o * l);
  return s;
}
function getChartIntervals(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = normalize(t),
    i = _slicedToArray$4(n, 2),
    a = i[0],
    r = i[1],
    o = e ? e / Math.pow(10, r) : 0,
    s = getChartRangeIntervals(a = a.toFixed(6), o);
  return s = s.map(function (t) {
    return t * Math.pow(10, r);
  });
}
function calcChartIntervals(t) {
  function e(t, e) {
    for (var n = getChartIntervals(t), i = n[1] - n[0], a = 0, r = 1; a < e; r++) a += i, n.unshift(-1 * a);
    return n;
  }
  var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    i = Math.max.apply(Math, _toConsumableArray$4(t)),
    a = Math.min.apply(Math, _toConsumableArray$4(t)),
    r = [];
  if (i >= 0 && a >= 0) normalize(i)[1], r = n ? getChartIntervals(i, a) : getChartIntervals(i);else if (i > 0 && a < 0) {
    var o = Math.abs(a);
    i >= o ? (normalize(i)[1], r = e(i, o)) : (normalize(o)[1], r = e(o, i).reverse().map(function (t) {
      return -1 * t;
    }));
  } else if (i <= 0 && a <= 0) {
    var s = Math.abs(a),
      l = Math.abs(i);
    normalize(s)[1], r = (r = n ? getChartIntervals(s, l) : getChartIntervals(s)).reverse().map(function (t) {
      return -1 * t;
    });
  }
  return r;
}
function getZeroIndex(t) {
  var e = getIntervalSize(t);
  return t.indexOf(0) >= 0 ? t.indexOf(0) : t[0] > 0 ? -1 * t[0] / e : -1 * t[t.length - 1] / e + (t.length - 1);
}
function getIntervalSize(t) {
  return t[1] - t[0];
}
function getValueRange(t) {
  return t[t.length - 1] - t[0];
}
function scale(t, e) {
  return floatTwo(e.zeroLine - t * e.scaleMultiplier);
}
function getClosestInArray(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    i = e.reduce(function (e, n) {
      return Math.abs(n - t) < Math.abs(e - t) ? n : e;
    }, []);
  return n ? e.indexOf(i) : i;
}
function calcDistribution(t, e) {
  for (var n = Math.max.apply(Math, _toConsumableArray$4(t)), i = 1 / (e - 1), a = [], r = 0; r < e; r++) {
    var o = n * (i * r);
    a.push(o);
  }
  return a;
}
function getMaxCheckpoint(t, e) {
  return e.filter(function (e) {
    return e < t;
  }).length;
}
function _toConsumableArray$3(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$7(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$3(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$3(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$6(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function dataPrep(t, e) {
  t.labels = t.labels || [];
  var n = t.labels.length,
    i = t.datasets,
    a = new Array(n).fill(0);
  return i || (i = [{
    values: a
  }]), i.map(function (t) {
    if (t.values) {
      var i = t.values;
      i = (i = i.map(function (t) {
        return isNaN(t) ? 0 : t;
      })).length > n ? i.slice(0, n) : fillArray(i, n - i.length, 0), t.values = i;
    } else t.values = a;
    t.chartType || (AXIS_DATASET_CHART_TYPES.includes(e), t.chartType = e);
  }), t.yRegions && t.yRegions.map(function (t) {
    if (t.end < t.start) {
      var e = [t.end, t.start];
      t.start = e[0], t.end = e[1];
    }
  }), t;
}
function zeroDataPrep(t) {
  var e = t.labels.length,
    n = new Array(e).fill(0),
    i = {
      labels: t.labels.slice(0, -1),
      datasets: t.datasets.map(function (t) {
        return {
          name: "",
          values: n.slice(0, -1),
          chartType: t.chartType
        };
      })
    };
  return t.yMarkers && (i.yMarkers = [{
    value: 0,
    label: ""
  }]), t.yRegions && (i.yRegions = [{
    start: 0,
    end: 0,
    label: ""
  }]), i;
}
function getShortenedLabels(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
    n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
    i = t / e.length;
  i <= 0 && (i = 1);
  var a = i / DEFAULT_CHAR_WIDTH,
    r = void 0;
  if (n) {
    var o = Math.max.apply(Math, _toConsumableArray$6(e.map(function (t) {
      return t.length;
    })));
    r = Math.ceil(o / a);
  }
  return e.map(function (t, e) {
    return (t += "").length > a && (n ? e % r != 0 && (t = "") : t = a - 3 > 0 ? t.slice(0, a - 3) + " ..." : t.slice(0, a) + ".."), t;
  });
}
function _toConsumableArray$5(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$8(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$4(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$4(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$7(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$9(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$5(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$5(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function getChartByType() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "line",
    e = arguments[1],
    n = arguments[2];
  return "axis-mixed" === t ? (n.type = "line", new AxisChart(e, n)) : chartTypes[t] ? new chartTypes[t](e, n) : void console.error("Undefined chart type: " + t);
}
var css_248z = '.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}';
styleInject(css_248z);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};
$.create = function (t, e) {
  var n = document.createElement(t);
  for (var i in e) {
    var a = e[i];
    if ("inside" === i) $(a).appendChild(n);else if ("around" === i) {
      var r = $(a);
      r.parentNode.insertBefore(n, r), n.appendChild(r);
    } else "styles" === i ? "object" === (void 0 === a ? "undefined" : _typeof(a)) && Object.keys(a).map(function (t) {
      n.style[t] = a[t];
    }) : i in n ? n[i] = a : n.setAttribute(i, a);
  }
  return n;
};
var BASE_MEASURES = {
    margins: {
      top: 10,
      bottom: 10,
      left: 20,
      right: 20
    },
    paddings: {
      top: 20,
      bottom: 40,
      left: 30,
      right: 10
    },
    baseHeight: 240,
    titleHeight: 20,
    legendHeight: 30,
    titleFontSize: 12
  },
  INIT_CHART_UPDATE_TIMEOUT = 700,
  CHART_POST_ANIMATE_TIMEOUT = 400,
  DEFAULT_AXIS_CHART_TYPE = "line",
  AXIS_DATASET_CHART_TYPES = ["line", "bar"],
  AXIS_LEGEND_BAR_SIZE = 100,
  BAR_CHART_SPACE_RATIO = .5,
  MIN_BAR_PERCENT_HEIGHT = 0,
  LINE_CHART_DOT_SIZE = 4,
  DOT_OVERLAY_SIZE_INCR = 4,
  PERCENTAGE_BAR_DEFAULT_HEIGHT = 20,
  PERCENTAGE_BAR_DEFAULT_DEPTH = 2,
  HEATMAP_DISTRIBUTION_SIZE = 5,
  HEATMAP_SQUARE_SIZE = 10,
  HEATMAP_GUTTER_SIZE = 2,
  DEFAULT_CHAR_WIDTH = 7,
  TOOLTIP_POINTER_TRIANGLE_HEIGHT = 5,
  DEFAULT_CHART_COLORS = ["light-blue", "blue", "violet", "red", "orange", "yellow", "green", "light-green", "purple", "magenta", "light-grey", "dark-grey"],
  HEATMAP_COLORS_GREEN = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
  DEFAULT_COLORS = {
    bar: DEFAULT_CHART_COLORS,
    line: DEFAULT_CHART_COLORS,
    pie: DEFAULT_CHART_COLORS,
    percentage: DEFAULT_CHART_COLORS,
    heatmap: HEATMAP_COLORS_GREEN,
    donut: DEFAULT_CHART_COLORS
  },
  ANGLE_RATIO = Math.PI / 180,
  FULL_ANGLE = 360,
  _createClass$3 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  SvgTip = function () {
    function t(e) {
      var n = e.parent,
        i = void 0 === n ? null : n,
        a = e.colors,
        r = void 0 === a ? [] : a;
      _classCallCheck$4(this, t), this.parent = i, this.colors = r, this.titleName = "", this.titleValue = "", this.listValues = [], this.titleValueFirst = 0, this.x = 0, this.y = 0, this.top = 0, this.left = 0, this.setup();
    }
    return _createClass$3(t, [{
      key: "setup",
      value: function () {
        this.makeTooltip();
      }
    }, {
      key: "refresh",
      value: function () {
        this.fill(), this.calcPosition();
      }
    }, {
      key: "makeTooltip",
      value: function () {
        var t = this;
        this.container = $.create("div", {
          inside: this.parent,
          className: "graph-svg-tip comparison",
          innerHTML: '<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>'
        }), this.hideTip(), this.title = this.container.querySelector(".title"), this.dataPointList = this.container.querySelector(".data-point-list"), this.parent.addEventListener("mouseleave", function () {
          t.hideTip();
        });
      }
    }, {
      key: "fill",
      value: function () {
        var t = this,
          e = void 0;
        this.index && this.container.setAttribute("data-point-index", this.index), e = this.titleValueFirst ? "<strong>" + this.titleValue + "</strong>" + this.titleName : this.titleName + "<strong>" + this.titleValue + "</strong>", this.title.innerHTML = e, this.dataPointList.innerHTML = "", this.listValues.map(function (e, n) {
          var i = t.colors[n] || "black",
            a = 0 === e.formatted || e.formatted ? e.formatted : e.value,
            r = $.create("li", {
              styles: {
                "border-top": "3px solid " + i
              },
              innerHTML: '<strong style="display: block;">' + (0 === a || a ? a : "") + "</strong>\n\t\t\t\t\t" + (e.title ? e.title : "")
            });
          t.dataPointList.appendChild(r);
        });
      }
    }, {
      key: "calcPosition",
      value: function () {
        var t = this.container.offsetWidth;
        this.top = this.y - this.container.offsetHeight - TOOLTIP_POINTER_TRIANGLE_HEIGHT, this.left = this.x - t / 2;
        var e = this.parent.offsetWidth - t,
          n = this.container.querySelector(".svg-pointer");
        if (this.left < 0) n.style.left = "calc(50% - " + -1 * this.left + "px)", this.left = 0;else if (this.left > e) {
          var i = "calc(50% + " + (this.left - e) + "px)";
          n.style.left = i, this.left = e;
        } else n.style.left = "50%";
      }
    }, {
      key: "setValues",
      value: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
          a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1;
        this.titleName = n.name, this.titleValue = n.value, this.listValues = i, this.x = t, this.y = e, this.titleValueFirst = n.valueFirst || 0, this.index = a, this.refresh();
      }
    }, {
      key: "hideTip",
      value: function () {
        this.container.style.top = "0px", this.container.style.left = "0px", this.container.style.opacity = "0";
      }
    }, {
      key: "showTip",
      value: function () {
        this.container.style.top = this.top + "px", this.container.style.left = this.left + "px", this.container.style.opacity = "1";
      }
    }]), t;
  }(),
  _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  },
  PRESET_COLOR_MAP = {
    "light-blue": "#7cd6fd",
    blue: "#5e64ff",
    violet: "#743ee2",
    red: "#ff5858",
    orange: "#ffa00a",
    yellow: "#feef72",
    green: "#28a745",
    "light-green": "#98d85b",
    purple: "#b554ff",
    magenta: "#ffa3ef",
    black: "#36114C",
    grey: "#bdd3e6",
    "light-grey": "#f0f4f7",
    "dark-grey": "#b8c2cc"
  },
  getColor = function (t) {
    return /rgb[a]{0,1}\([\d, ]+\)/gim.test(t) ? /\D+(\d*)\D+(\d*)\D+(\d*)/gim.exec(t).map(function (t, e) {
      return 0 !== e ? Number(t).toString(16) : "#";
    }).reduce(function (t, e) {
      return "" + t + e;
    }) : PRESET_COLOR_MAP[t] || t;
  },
  _slicedToArray = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  },
  AXIS_TICK_LENGTH = 6,
  LABEL_MARGIN = 4,
  LABEL_MAX_CHARS = 15,
  FONT_SIZE = 10,
  BASE_LINE_COLOR = "#dadada",
  FONT_FILL = "#555b51",
  makeOverlay = {
    bar: function (t) {
      var e = void 0;
      "rect" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]);
      var n = t.cloneNode();
      return n.style.fill = "#000000", n.style.opacity = "0.4", e && n.setAttribute("transform", e), n;
    },
    dot: function (t) {
      var e = void 0;
      "circle" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]);
      var n = t.cloneNode(),
        i = t.getAttribute("r"),
        a = t.getAttribute("fill");
      return n.setAttribute("r", parseInt(i) + DOT_OVERLAY_SIZE_INCR), n.setAttribute("fill", a), n.style.opacity = "0.6", e && n.setAttribute("transform", e), n;
    },
    heat_square: function (t) {
      var e = void 0;
      "circle" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]);
      var n = t.cloneNode(),
        i = t.getAttribute("r"),
        a = t.getAttribute("fill");
      return n.setAttribute("r", parseInt(i) + DOT_OVERLAY_SIZE_INCR), n.setAttribute("fill", a), n.style.opacity = "0.6", e && n.setAttribute("transform", e), n;
    }
  },
  updateOverlay = {
    bar: function (t, e) {
      var n = void 0;
      "rect" !== t.nodeName && (n = t.getAttribute("transform"), t = t.childNodes[0]);
      var i = ["x", "y", "width", "height"];
      Object.values(t.attributes).filter(function (t) {
        return i.includes(t.name) && t.specified;
      }).map(function (t) {
        e.setAttribute(t.name, t.nodeValue);
      }), n && e.setAttribute("transform", n);
    },
    dot: function (t, e) {
      var n = void 0;
      "circle" !== t.nodeName && (n = t.getAttribute("transform"), t = t.childNodes[0]);
      var i = ["cx", "cy"];
      Object.values(t.attributes).filter(function (t) {
        return i.includes(t.name) && t.specified;
      }).map(function (t) {
        e.setAttribute(t.name, t.nodeValue);
      }), n && e.setAttribute("transform", n);
    },
    heat_square: function (t, e) {
      var n = void 0;
      "circle" !== t.nodeName && (n = t.getAttribute("transform"), t = t.childNodes[0]);
      var i = ["cx", "cy"];
      Object.values(t.attributes).filter(function (t) {
        return i.includes(t.name) && t.specified;
      }).map(function (t) {
        e.setAttribute(t.name, t.nodeValue);
      }), n && e.setAttribute("transform", n);
    }
  },
  _slicedToArray$2 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  UNIT_ANIM_DUR = 350,
  PATH_ANIM_DUR = 350,
  MARKER_LINE_ANIM_DUR = UNIT_ANIM_DUR,
  REPLACE_ALL_NEW_DUR = 250,
  STD_EASING = "easein",
  _slicedToArray$1 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  EASING = {
    ease: "0.25 0.1 0.25 1",
    linear: "0 0 1 1",
    easein: "0.1 0.8 0.2 1",
    easeout: "0 0 0.58 1",
    easeinout: "0.42 0 0.58 1"
  },
  CSSTEXT = ".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",
  _createClass$2 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  BaseChart = function () {
    function t(e, n) {
      if (_classCallCheck$3(this, t), n = deepClone(n), this.parent = "string" == typeof e ? document.querySelector(e) : e, !(this.parent instanceof HTMLElement)) throw new Error("No `parent` element to render on was provided.");
      this.rawChartArgs = n, this.title = n.title || "", this.type = n.type || "", this.realData = this.prepareData(n.data), this.data = this.prepareFirstData(this.realData), this.colors = this.validateColors(n.colors, this.type), this.config = {
        showTooltip: 1,
        showLegend: 1,
        isNavigable: n.isNavigable || 0,
        animate: void 0 !== n.animate ? n.animate : 1,
        truncateLegends: n.truncateLegends || 1
      }, this.measures = JSON.parse(JSON.stringify(BASE_MEASURES));
      var i = this.measures;
      this.setMeasures(n), this.title.length || (i.titleHeight = 0), this.config.showLegend || (i.legendHeight = 0), this.argHeight = n.height || i.baseHeight, this.state = {}, this.options = {}, this.initTimeout = INIT_CHART_UPDATE_TIMEOUT, this.config.isNavigable && (this.overlays = []), this.configure(n);
    }
    return _createClass$2(t, [{
      key: "prepareData",
      value: function (t) {
        return t;
      }
    }, {
      key: "prepareFirstData",
      value: function (t) {
        return t;
      }
    }, {
      key: "validateColors",
      value: function (t, e) {
        var n = [];
        return (t = (t || []).concat(DEFAULT_COLORS[e])).forEach(function (t) {
          var e = getColor(t);
          isValidColor(e) ? n.push(e) : console.warn('"' + t + '" is not a valid color.');
        }), n;
      }
    }, {
      key: "setMeasures",
      value: function () {}
    }, {
      key: "configure",
      value: function () {
        var t = this,
          e = this.argHeight;
        this.baseHeight = e, this.height = e - getExtraHeight(this.measures), this.boundDrawFn = function () {
          return t.draw(!0);
        }, ResizeObserver && (this.resizeObserver = new ResizeObserver(this.boundDrawFn), this.resizeObserver.observe(this.parent)), window.addEventListener("resize", this.boundDrawFn), window.addEventListener("orientationchange", this.boundDrawFn);
      }
    }, {
      key: "destroy",
      value: function () {
        this.resizeObserver && this.resizeObserver.disconnect(), window.removeEventListener("resize", this.boundDrawFn), window.removeEventListener("orientationchange", this.boundDrawFn);
      }
    }, {
      key: "setup",
      value: function () {
        this.makeContainer(), this.updateWidth(), this.makeTooltip(), this.draw(!1, !0);
      }
    }, {
      key: "makeContainer",
      value: function () {
        this.parent.innerHTML = "";
        var t = {
          inside: this.parent,
          className: "chart-container"
        };
        this.independentWidth && (t.styles = {
          width: this.independentWidth + "px"
        }), this.container = $.create("div", t);
      }
    }, {
      key: "makeTooltip",
      value: function () {
        this.tip = new SvgTip({
          parent: this.container,
          colors: this.colors
        }), this.bindTooltip();
      }
    }, {
      key: "bindTooltip",
      value: function () {}
    }, {
      key: "draw",
      value: function () {
        var t = this,
          e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        e && isHidden(this.parent) || (this.updateWidth(), this.calc(e), this.makeChartArea(), this.setupComponents(), this.components.forEach(function (e) {
          return e.setup(t.drawArea);
        }), this.render(this.components, !1), n && (this.data = this.realData, setTimeout(function () {
          t.update(t.data);
        }, this.initTimeout)), this.renderLegend(), this.setupNavigation(n));
      }
    }, {
      key: "calc",
      value: function () {}
    }, {
      key: "updateWidth",
      value: function () {
        this.baseWidth = getElementContentWidth(this.parent), this.width = this.baseWidth - getExtraWidth(this.measures);
      }
    }, {
      key: "makeChartArea",
      value: function () {
        this.svg && this.container.removeChild(this.svg);
        var t = this.measures;
        this.svg = makeSVGContainer(this.container, "frappe-chart chart", this.baseWidth, this.baseHeight), this.svgDefs = makeSVGDefs(this.svg), this.title.length && (this.titleEL = makeText("title", t.margins.left, t.margins.top, this.title, {
          fontSize: t.titleFontSize,
          fill: "#666666",
          dy: t.titleFontSize
        }));
        var e = getTopOffset(t);
        this.drawArea = makeSVGGroup(this.type + "-chart chart-draw-area", "translate(" + getLeftOffset(t) + ", " + e + ")"), this.config.showLegend && (e += this.height + t.paddings.bottom, this.legendArea = makeSVGGroup("chart-legend", "translate(" + getLeftOffset(t) + ", " + e + ")")), this.title.length && this.svg.appendChild(this.titleEL), this.svg.appendChild(this.drawArea), this.config.showLegend && this.svg.appendChild(this.legendArea), this.updateTipOffset(getLeftOffset(t), getTopOffset(t));
      }
    }, {
      key: "updateTipOffset",
      value: function (t, e) {
        this.tip.offset = {
          x: t,
          y: e
        };
      }
    }, {
      key: "setupComponents",
      value: function () {
        this.components = new Map();
      }
    }, {
      key: "update",
      value: function (t) {
        t || console.error("No data to update."), this.data = this.prepareData(t), this.calc(), this.render(this.components, this.config.animate), this.renderLegend();
      }
    }, {
      key: "render",
      value: function () {
        var t = this,
          e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.components,
          n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this.config.isNavigable && this.overlays.map(function (t) {
          return t.parentNode.removeChild(t);
        });
        var i = [];
        e.forEach(function (t) {
          i = i.concat(t.update(n));
        }), i.length > 0 ? (runSMILAnimation(this.container, this.svg, i), setTimeout(function () {
          e.forEach(function (t) {
            return t.make();
          }), t.updateNav();
        }, CHART_POST_ANIMATE_TIMEOUT)) : (e.forEach(function (t) {
          return t.make();
        }), this.updateNav());
      }
    }, {
      key: "updateNav",
      value: function () {
        this.config.isNavigable && (this.makeOverlay(), this.bindUnits());
      }
    }, {
      key: "renderLegend",
      value: function () {}
    }, {
      key: "setupNavigation",
      value: function () {
        var t = this,
          e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.config.isNavigable && e && (this.bindOverlay(), this.keyActions = {
          13: this.onEnterKey.bind(this),
          37: this.onLeftArrow.bind(this),
          38: this.onUpArrow.bind(this),
          39: this.onRightArrow.bind(this),
          40: this.onDownArrow.bind(this)
        }, document.addEventListener("keydown", function (e) {
          isElementInViewport(t.container) && (e = e || window.event, t.keyActions[e.keyCode] && t.keyActions[e.keyCode]());
        }));
      }
    }, {
      key: "makeOverlay",
      value: function () {}
    }, {
      key: "updateOverlay",
      value: function () {}
    }, {
      key: "bindOverlay",
      value: function () {}
    }, {
      key: "bindUnits",
      value: function () {}
    }, {
      key: "onLeftArrow",
      value: function () {}
    }, {
      key: "onRightArrow",
      value: function () {}
    }, {
      key: "onUpArrow",
      value: function () {}
    }, {
      key: "onDownArrow",
      value: function () {}
    }, {
      key: "onEnterKey",
      value: function () {}
    }, {
      key: "addDataPoint",
      value: function () {}
    }, {
      key: "removeDataPoint",
      value: function () {}
    }, {
      key: "getDataPoint",
      value: function () {}
    }, {
      key: "setCurrentDataPoint",
      value: function () {}
    }, {
      key: "updateDataset",
      value: function () {}
    }, {
      key: "export",
      value: function () {
        var t = prepareForExport(this.svg);
        downloadFile(this.title || "Chart", [t]);
      }
    }]), t;
  }(),
  _createClass$1 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$1 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  AggregationChart = function (t) {
    function e(t, n) {
      return _classCallCheck$2(this, e), _possibleConstructorReturn$1(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    }
    return _inherits$1(e, t), _createClass$1(e, [{
      key: "configure",
      value: function (t) {
        _get$1(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.config.formatTooltipY = (t.tooltipOptions || {}).formatTooltipY, this.config.maxSlices = t.maxSlices || 20, this.config.maxLegendPoints = t.maxLegendPoints || 20;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this,
          e = this.state,
          n = this.config.maxSlices;
        e.sliceTotals = [];
        var i = this.data.labels.map(function (e, n) {
            var i = 0;
            return t.data.datasets.map(function (t) {
              i += t.values[n];
            }), [i, e];
          }).filter(function (t) {
            return t[0] >= 0;
          }),
          a = i;
        if (i.length > n) {
          i.sort(function (t, e) {
            return e[0] - t[0];
          }), a = i.slice(0, n - 1);
          var r = 0;
          i.slice(n - 1).map(function (t) {
            r += t[0];
          }), a.push([r, "Rest"]), this.colors[n - 1] = "grey";
        }
        e.labels = [], a.map(function (t) {
          e.sliceTotals.push(round(t[0])), e.labels.push(t[1]);
        }), e.grandTotal = e.sliceTotals.reduce(function (t, e) {
          return t + e;
        }, 0), this.center = {
          x: this.width / 2,
          y: this.height / 2
        };
      }
    }, {
      key: "renderLegend",
      value: function () {
        var t = this,
          e = this.state;
        this.legendArea.textContent = "", this.legendTotals = e.sliceTotals.slice(0, this.config.maxLegendPoints);
        var n = 0,
          i = 0;
        this.legendTotals.map(function (a, r) {
          var o = 150,
            s = Math.floor((t.width - getExtraWidth(t.measures)) / o);
          t.legendTotals.length < s && (o = t.width / t.legendTotals.length), n > s && (n = 0, i += 20);
          var l = o * n + 5,
            u = t.config.truncateLegends ? truncateString(e.labels[r], o / 10) : e.labels[r],
            c = t.config.formatTooltipY ? t.config.formatTooltipY(a) : a,
            h = legendDot(l, i, 5, t.colors[r], u + ": " + c, !1);
          t.legendArea.appendChild(h), n++;
        });
      }
    }]), e;
  }(BaseChart),
  NO_OF_YEAR_MONTHS = 12,
  NO_OF_DAYS_IN_WEEK = 7,
  NO_OF_MILLIS = 1e3,
  SEC_IN_DAY = 86400,
  MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  _slicedToArray$3 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  _createClass$4 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  ChartComponent = function () {
    function t(e) {
      var n = e.layerClass,
        i = void 0 === n ? "" : n,
        a = e.layerTransform,
        r = void 0 === a ? "" : a,
        o = e.constants,
        s = e.getData,
        l = e.makeElements,
        u = e.animateElements;
      _classCallCheck$5(this, t), this.layerTransform = r, this.constants = o, this.makeElements = l, this.getData = s, this.animateElements = u, this.store = [], this.labels = [], this.layerClass = i, this.layerClass = "function" == typeof this.layerClass ? this.layerClass() : this.layerClass, this.refresh();
    }
    return _createClass$4(t, [{
      key: "refresh",
      value: function (t) {
        this.data = t || this.getData();
      }
    }, {
      key: "setup",
      value: function (t) {
        this.layer = makeSVGGroup(this.layerClass, this.layerTransform, t);
      }
    }, {
      key: "make",
      value: function () {
        this.render(this.data), this.oldData = this.data;
      }
    }, {
      key: "render",
      value: function (t) {
        var e = this;
        this.store = this.makeElements(t), this.layer.textContent = "", this.store.forEach(function (t) {
          e.layer.appendChild(t);
        }), this.labels.forEach(function (t) {
          e.layer.appendChild(t);
        });
      }
    }, {
      key: "update",
      value: function () {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.refresh();
        var e = [];
        return t && (e = this.animateElements(this.data) || []), e;
      }
    }]), t;
  }(),
  componentConfigs = {
    donutSlices: {
      layerClass: "donut-slices",
      makeElements: function (t) {
        return t.sliceStrings.map(function (e, n) {
          var i = makePath(e, "donut-path", t.colors[n], "none", t.strokeWidth);
          return i.style.transition = "transform .3s;", i;
        });
      },
      animateElements: function (t) {
        return this.store.map(function (e, n) {
          return animatePathStr(e, t.sliceStrings[n]);
        });
      }
    },
    pieSlices: {
      layerClass: "pie-slices",
      makeElements: function (t) {
        return t.sliceStrings.map(function (e, n) {
          var i = makePath(e, "pie-path", "none", t.colors[n]);
          return i.style.transition = "transform .3s;", i;
        });
      },
      animateElements: function (t) {
        return this.store.map(function (e, n) {
          return animatePathStr(e, t.sliceStrings[n]);
        });
      }
    },
    percentageBars: {
      layerClass: "percentage-bars",
      makeElements: function (t) {
        var e = this;
        return t.xPositions.map(function (n, i) {
          return percentageBar(n, 0, t.widths[i], e.constants.barHeight, e.constants.barDepth, t.colors[i]);
        });
      },
      animateElements: function (t) {
        if (t) return [];
      }
    },
    yAxis: {
      layerClass: "y axis",
      makeElements: function (t) {
        var e = this;
        return t.positions.map(function (n, i) {
          return yLine(n, t.labels[i], e.constants.width, {
            mode: e.constants.mode,
            pos: e.constants.pos,
            shortenNumbers: e.constants.shortenNumbers
          });
        });
      },
      animateElements: function (t) {
        var e = t.positions,
          n = t.labels,
          i = this.oldData.positions,
          a = this.oldData.labels,
          r = equilizeNoOfElements(i, e),
          o = _slicedToArray$3(r, 2);
        i = o[0], e = o[1];
        var s = equilizeNoOfElements(a, n),
          l = _slicedToArray$3(s, 2);
        return a = l[0], n = l[1], this.render({
          positions: i,
          labels: n
        }), this.store.map(function (t, n) {
          return translateHoriLine(t, e[n], i[n]);
        });
      }
    },
    xAxis: {
      layerClass: "x axis",
      makeElements: function (t) {
        var e = this;
        return t.positions.map(function (n, i) {
          return xLine(n, t.calcLabels[i], e.constants.height, {
            mode: e.constants.mode,
            pos: e.constants.pos
          });
        });
      },
      animateElements: function (t) {
        var e = t.positions,
          n = t.calcLabels,
          i = this.oldData.positions,
          a = this.oldData.calcLabels,
          r = equilizeNoOfElements(i, e),
          o = _slicedToArray$3(r, 2);
        i = o[0], e = o[1];
        var s = equilizeNoOfElements(a, n),
          l = _slicedToArray$3(s, 2);
        return a = l[0], n = l[1], this.render({
          positions: i,
          calcLabels: n
        }), this.store.map(function (t, n) {
          return translateVertLine(t, e[n], i[n]);
        });
      }
    },
    yMarkers: {
      layerClass: "y-markers",
      makeElements: function (t) {
        var e = this;
        return t.map(function (t) {
          return yMarker(t.position, t.label, e.constants.width, {
            labelPos: t.options.labelPos,
            mode: "span",
            lineType: "dashed"
          });
        });
      },
      animateElements: function (t) {
        var e = equilizeNoOfElements(this.oldData, t),
          n = _slicedToArray$3(e, 2);
        this.oldData = n[0];
        var i = (t = n[1]).map(function (t) {
            return t.position;
          }),
          a = t.map(function (t) {
            return t.label;
          }),
          r = t.map(function (t) {
            return t.options;
          }),
          o = this.oldData.map(function (t) {
            return t.position;
          });
        return this.render(o.map(function (t, e) {
          return {
            position: o[e],
            label: a[e],
            options: r[e]
          };
        })), this.store.map(function (t, e) {
          return translateHoriLine(t, i[e], o[e]);
        });
      }
    },
    yRegions: {
      layerClass: "y-regions",
      makeElements: function (t) {
        var e = this;
        return t.map(function (t) {
          return yRegion(t.startPos, t.endPos, e.constants.width, t.label, {
            labelPos: t.options.labelPos
          });
        });
      },
      animateElements: function (t) {
        var e = equilizeNoOfElements(this.oldData, t),
          n = _slicedToArray$3(e, 2);
        this.oldData = n[0];
        var i = (t = n[1]).map(function (t) {
            return t.endPos;
          }),
          a = t.map(function (t) {
            return t.label;
          }),
          r = t.map(function (t) {
            return t.startPos;
          }),
          o = t.map(function (t) {
            return t.options;
          }),
          s = this.oldData.map(function (t) {
            return t.endPos;
          }),
          l = this.oldData.map(function (t) {
            return t.startPos;
          });
        this.render(s.map(function (t, e) {
          return {
            startPos: l[e],
            endPos: s[e],
            label: a[e],
            options: o[e]
          };
        }));
        var u = [];
        return this.store.map(function (t, e) {
          u = u.concat(animateRegion(t, r[e], i[e], s[e]));
        }), u;
      }
    },
    heatDomain: {
      layerClass: function () {
        return "heat-domain domain-" + this.constants.index;
      },
      makeElements: function (t) {
        var e = this,
          n = this.constants,
          i = n.index,
          a = n.colWidth,
          r = n.rowHeight,
          o = n.squareSize,
          s = n.radius,
          l = n.xTranslate,
          u = 0;
        return this.serializedSubDomains = [], t.cols.map(function (t, n) {
          1 === n && e.labels.push(makeText("domain-name", l, -12, getMonthName(i, !0).toUpperCase(), {
            fontSize: 9
          })), t.map(function (t, n) {
            if (t.fill) {
              var i = {
                  "data-date": t.yyyyMmDd,
                  "data-value": t.dataValue,
                  "data-day": n
                },
                a = heatSquare("day", l, u, o, s, t.fill, i);
              e.serializedSubDomains.push(a);
            }
            u += r;
          }), u = 0, l += a;
        }), this.serializedSubDomains;
      },
      animateElements: function (t) {
        if (t) return [];
      }
    },
    barGraph: {
      layerClass: function () {
        return "dataset-units dataset-bars dataset-" + this.constants.index;
      },
      makeElements: function (t) {
        var e = this.constants;
        return this.unitType = "bar", this.units = t.yPositions.map(function (n, i) {
          return datasetBar(t.xPositions[i], n, t.barWidth, e.color, t.labels[i], i, t.offsets[i], {
            zeroLine: t.zeroLine,
            barsWidth: t.barsWidth,
            minHeight: e.minHeight
          });
        }), this.units;
      },
      animateElements: function (t) {
        var e = t.xPositions,
          n = t.yPositions,
          i = t.offsets,
          a = t.labels,
          r = this.oldData.xPositions,
          o = this.oldData.yPositions,
          s = this.oldData.offsets,
          l = this.oldData.labels,
          u = equilizeNoOfElements(r, e),
          c = _slicedToArray$3(u, 2);
        r = c[0], e = c[1];
        var h = equilizeNoOfElements(o, n),
          d = _slicedToArray$3(h, 2);
        o = d[0], n = d[1];
        var f = equilizeNoOfElements(s, i),
          p = _slicedToArray$3(f, 2);
        s = p[0], i = p[1];
        var v = equilizeNoOfElements(l, a),
          g = _slicedToArray$3(v, 2);
        l = g[0], a = g[1], this.render({
          xPositions: r,
          yPositions: o,
          offsets: s,
          labels: a,
          zeroLine: this.oldData.zeroLine,
          barsWidth: this.oldData.barsWidth,
          barWidth: this.oldData.barWidth
        });
        var y = [];
        return this.store.map(function (a, r) {
          y = y.concat(animateBar(a, e[r], n[r], t.barWidth, i[r], {
            zeroLine: t.zeroLine
          }));
        }), y;
      }
    },
    lineGraph: {
      layerClass: function () {
        return "dataset-units dataset-line dataset-" + this.constants.index;
      },
      makeElements: function (t) {
        var e = this.constants;
        return this.unitType = "dot", this.paths = {}, e.hideLine || (this.paths = getPaths(t.xPositions, t.yPositions, e.color, {
          heatline: e.heatline,
          regionFill: e.regionFill,
          spline: e.spline
        }, {
          svgDefs: e.svgDefs,
          zeroLine: t.zeroLine
        })), this.units = [], e.hideDots || (this.units = t.yPositions.map(function (n, i) {
          return datasetDot(t.xPositions[i], n, t.radius, e.color, e.valuesOverPoints ? t.values[i] : "", i);
        })), Object.values(this.paths).concat(this.units);
      },
      animateElements: function (t) {
        var e = t.xPositions,
          n = t.yPositions,
          i = t.values,
          a = this.oldData.xPositions,
          r = this.oldData.yPositions,
          o = this.oldData.values,
          s = equilizeNoOfElements(a, e),
          l = _slicedToArray$3(s, 2);
        a = l[0], e = l[1];
        var u = equilizeNoOfElements(r, n),
          c = _slicedToArray$3(u, 2);
        r = c[0], n = c[1];
        var h = equilizeNoOfElements(o, i),
          d = _slicedToArray$3(h, 2);
        o = d[0], i = d[1], this.render({
          xPositions: a,
          yPositions: r,
          values: i,
          zeroLine: this.oldData.zeroLine,
          radius: this.oldData.radius
        });
        var f = [];
        return Object.keys(this.paths).length && (f = f.concat(animatePath(this.paths, e, n, t.zeroLine, this.constants.spline))), this.units.length && this.units.map(function (t, i) {
          f = f.concat(animateDot(t, e[i], n[i]));
        }), f;
      }
    }
  },
  _createClass = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  PercentageChart = function (t) {
    function e(t, n) {
      _classCallCheck$1(this, e);
      var i = _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.type = "percentage", i.setup(), i;
    }
    return _inherits(e, t), _createClass(e, [{
      key: "setMeasures",
      value: function (t) {
        var e = this.measures;
        this.barOptions = t.barOptions || {};
        var n = this.barOptions;
        n.height = n.height || PERCENTAGE_BAR_DEFAULT_HEIGHT, n.depth = n.depth || PERCENTAGE_BAR_DEFAULT_DEPTH, e.paddings.right = 30, e.legendHeight = 60, e.baseHeight = 8 * (n.height + .5 * n.depth);
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this.state,
          e = [["percentageBars", {
            barHeight: this.barOptions.height,
            barDepth: this.barOptions.depth
          }, function () {
            return {
              xPositions: t.xPositions,
              widths: t.widths,
              colors: this.colors
            };
          }.bind(this)]];
        this.components = new Map(e.map(function (t) {
          var e = getComponent.apply(void 0, _toConsumableArray(t));
          return [t[0], e];
        }));
      }
    }, {
      key: "calc",
      value: function () {
        var t = this;
        _get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "calc", this).call(this);
        var n = this.state;
        n.xPositions = [], n.widths = [];
        var i = 0;
        n.sliceTotals.map(function (e) {
          var a = t.width * e / n.grandTotal;
          n.widths.push(a), n.xPositions.push(i), i += a;
        });
      }
    }, {
      key: "makeDataByIndex",
      value: function () {}
    }, {
      key: "bindTooltip",
      value: function () {
        var t = this,
          e = this.state;
        this.container.addEventListener("mousemove", function (n) {
          var i = t.components.get("percentageBars").store,
            a = n.target;
          if (i.includes(a)) {
            var r = i.indexOf(a),
              o = getOffset(t.container),
              s = getOffset(a),
              l = s.left - o.left + parseInt(a.getAttribute("width")) / 2,
              u = s.top - o.top,
              c = (t.formattedLabels && t.formattedLabels.length > 0 ? t.formattedLabels[r] : t.state.labels[r]) + ": ",
              h = e.sliceTotals[r] / e.grandTotal;
            t.tip.setValues(l, u, {
              name: c,
              value: (100 * h).toFixed(1) + "%"
            }), t.tip.showTip();
          }
        });
      }
    }]), e;
  }(AggregationChart),
  _createClass$5 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$2 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  PieChart = function (t) {
    function e(t, n) {
      _classCallCheck$6(this, e);
      var i = _possibleConstructorReturn$2(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.type = "pie", i.initTimeout = 0, i.init = 1, i.setup(), i;
    }
    return _inherits$2(e, t), _createClass$5(e, [{
      key: "configure",
      value: function (t) {
        _get$2(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.mouseMove = this.mouseMove.bind(this), this.mouseLeave = this.mouseLeave.bind(this), this.hoverRadio = t.hoverRadio || .1, this.config.startAngle = t.startAngle || 0, this.clockWise = t.clockWise || !1;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this;
        _get$2(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "calc", this).call(this);
        var n = this.state;
        this.radius = this.height > this.width ? this.center.x : this.center.y;
        var i = this.radius,
          a = this.clockWise,
          r = n.slicesProperties || [];
        n.sliceStrings = [], n.slicesProperties = [];
        var o = 180 - this.config.startAngle;
        n.sliceTotals.map(function (e, s) {
          var l = o,
            u = e / n.grandTotal * FULL_ANGLE,
            c = u > 180 ? 1 : 0,
            h = a ? -u : u,
            d = o += h,
            f = getPositionByAngle(l, i),
            p = getPositionByAngle(d, i),
            v = t.init && r[s],
            g = void 0,
            y = void 0;
          t.init ? (g = v ? v.startPosition : f, y = v ? v.endPosition : f) : (g = f, y = p);
          var m = 360 === u ? makeCircleStr(g, y, t.center, t.radius, a, c) : makeArcPathStr(g, y, t.center, t.radius, a, c);
          n.sliceStrings.push(m), n.slicesProperties.push({
            startPosition: f,
            endPosition: p,
            value: e,
            total: n.grandTotal,
            startAngle: l,
            endAngle: d,
            angle: h
          });
        }), this.init = 0;
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this.state,
          e = [["pieSlices", {}, function () {
            return {
              sliceStrings: t.sliceStrings,
              colors: this.colors
            };
          }.bind(this)]];
        this.components = new Map(e.map(function (t) {
          var e = getComponent.apply(void 0, _toConsumableArray$2(t));
          return [t[0], e];
        }));
      }
    }, {
      key: "calTranslateByAngle",
      value: function (t) {
        var e = this.radius,
          n = this.hoverRadio,
          i = getPositionByAngle(t.startAngle + t.angle / 2, e);
        return "translate3d(" + i.x * n + "px," + i.y * n + "px,0)";
      }
    }, {
      key: "hoverSlice",
      value: function (t, e, n, i) {
        if (t) {
          var a = this.colors[e];
          if (n) {
            transform(t, this.calTranslateByAngle(this.state.slicesProperties[e])), t.style.fill = lightenDarkenColor(a, 50);
            var r = getOffset(this.svg),
              o = i.pageX - r.left + 10,
              s = i.pageY - r.top - 10,
              l = (this.formatted_labels && this.formatted_labels.length > 0 ? this.formatted_labels[e] : this.state.labels[e]) + ": ",
              u = (100 * this.state.sliceTotals[e] / this.state.grandTotal).toFixed(1);
            this.tip.setValues(o, s, {
              name: l,
              value: u + "%"
            }), this.tip.showTip();
          } else transform(t, "translate3d(0,0,0)"), this.tip.hideTip(), t.style.fill = a;
        }
      }
    }, {
      key: "bindTooltip",
      value: function () {
        this.container.addEventListener("mousemove", this.mouseMove), this.container.addEventListener("mouseleave", this.mouseLeave);
      }
    }, {
      key: "mouseMove",
      value: function (t) {
        var e = t.target,
          n = this.components.get("pieSlices").store,
          i = this.curActiveSliceIndex,
          a = this.curActiveSlice;
        if (n.includes(e)) {
          var r = n.indexOf(e);
          this.hoverSlice(a, i, !1), this.curActiveSlice = e, this.curActiveSliceIndex = r, this.hoverSlice(e, r, !0, t);
        } else this.mouseLeave();
      }
    }, {
      key: "mouseLeave",
      value: function () {
        this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1);
      }
    }]), e;
  }(AggregationChart),
  _slicedToArray$4 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  _createClass$6 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  COL_WIDTH = HEATMAP_SQUARE_SIZE + HEATMAP_GUTTER_SIZE,
  ROW_HEIGHT = COL_WIDTH,
  Heatmap = function (t) {
    function e(t, n) {
      _classCallCheck$7(this, e);
      var i = _possibleConstructorReturn$3(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      i.type = "heatmap", i.countLabel = n.countLabel || "";
      var a = ["Sunday", "Monday"],
        r = a.includes(n.startSubDomain) ? n.startSubDomain : "Sunday";
      return i.startSubDomainIndex = a.indexOf(r), i.setup(), i;
    }
    return _inherits$3(e, t), _createClass$6(e, [{
      key: "setMeasures",
      value: function (t) {
        var e = this.measures;
        this.discreteDomains = 0 === t.discreteDomains ? 0 : 1, e.paddings.top = 3 * ROW_HEIGHT, e.paddings.bottom = 0, e.legendHeight = 2 * ROW_HEIGHT, e.baseHeight = ROW_HEIGHT * NO_OF_DAYS_IN_WEEK + getExtraHeight(e);
        var n = this.data,
          i = this.discreteDomains ? NO_OF_YEAR_MONTHS : 0;
        this.independentWidth = (getWeeksBetween(n.start, n.end) + i) * COL_WIDTH + getExtraWidth(e);
      }
    }, {
      key: "updateWidth",
      value: function () {
        var t = this.discreteDomains ? NO_OF_YEAR_MONTHS : 0,
          e = this.state.noOfWeeks ? this.state.noOfWeeks : 52;
        this.baseWidth = (e + t) * COL_WIDTH + getExtraWidth(this.measures);
      }
    }, {
      key: "prepareData",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data;
        if (t.start && t.end && t.start > t.end) throw new Error("Start date cannot be greater than end date.");
        if (t.start || (t.start = new Date(), t.start.setFullYear(t.start.getFullYear() - 1)), t.end || (t.end = new Date()), t.dataPoints = t.dataPoints || {}, parseInt(Object.keys(t.dataPoints)[0]) > 1e5) {
          var e = {};
          Object.keys(t.dataPoints).forEach(function (n) {
            var i = new Date(n * NO_OF_MILLIS);
            e[getYyyyMmDd(i)] = t.dataPoints[n];
          }), t.dataPoints = e;
        }
        return t;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this.state;
        t.start = clone(this.data.start), t.end = clone(this.data.end), t.firstWeekStart = clone(t.start), t.noOfWeeks = getWeeksBetween(t.start, t.end), t.distribution = calcDistribution(Object.values(this.data.dataPoints), HEATMAP_DISTRIBUTION_SIZE), t.domainConfigs = this.getDomains();
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this,
          e = this.state,
          n = this.discreteDomains ? 0 : 1,
          i = e.domainConfigs.map(function (i, a) {
            return ["heatDomain", {
              index: i.index,
              colWidth: COL_WIDTH,
              rowHeight: ROW_HEIGHT,
              squareSize: HEATMAP_SQUARE_SIZE,
              radius: t.rawChartArgs.radius || 0,
              xTranslate: e.domainConfigs.filter(function (t, e) {
                return e < a;
              }).map(function (t) {
                return t.cols.length - n;
              }).reduce(function (t, e) {
                return t + e;
              }, 0) * COL_WIDTH
            }, function () {
              return e.domainConfigs[a];
            }.bind(t)];
          });
        this.components = new Map(i.map(function (t, e) {
          var n = getComponent.apply(void 0, _toConsumableArray$3(t));
          return [t[0] + "-" + e, n];
        }));
        var a = 0;
        DAY_NAMES_SHORT.forEach(function (e, n) {
          if ([1, 3, 5].includes(n)) {
            var i = makeText("subdomain-name", -COL_WIDTH / 2, a, e, {
              fontSize: HEATMAP_SQUARE_SIZE,
              dy: 8,
              textAnchor: "end"
            });
            t.drawArea.appendChild(i);
          }
          a += ROW_HEIGHT;
        });
      }
    }, {
      key: "update",
      value: function (t) {
        t || console.error("No data to update."), this.data = this.prepareData(t), this.draw(), this.bindTooltip();
      }
    }, {
      key: "bindTooltip",
      value: function () {
        var t = this;
        this.container.addEventListener("mousemove", function (e) {
          t.components.forEach(function (n) {
            var i = n.store,
              a = e.target;
            if (i.includes(a)) {
              var r = a.getAttribute("data-value"),
                o = a.getAttribute("data-date").split("-"),
                s = getMonthName(parseInt(o[1]) - 1, !0),
                l = t.container.getBoundingClientRect(),
                u = a.getBoundingClientRect(),
                c = parseInt(e.target.getAttribute("width")),
                h = u.left - l.left + c / 2,
                d = u.top - l.top,
                f = r + " " + t.countLabel,
                p = " on " + s + " " + o[0] + ", " + o[2];
              t.tip.setValues(h, d, {
                name: p,
                value: f,
                valueFirst: 1
              }, []), t.tip.showTip();
            }
          });
        });
      }
    }, {
      key: "renderLegend",
      value: function () {
        var t = this;
        this.legendArea.textContent = "";
        var e = 0,
          n = ROW_HEIGHT,
          i = this.rawChartArgs.radius || 0,
          a = makeText("subdomain-name", e, n, "Less", {
            fontSize: HEATMAP_SQUARE_SIZE + 1,
            dy: 9
          });
        e = 2 * COL_WIDTH + COL_WIDTH / 2, this.legendArea.appendChild(a), this.colors.slice(0, HEATMAP_DISTRIBUTION_SIZE).map(function (a, r) {
          var o = heatSquare("heatmap-legend-unit", e + (COL_WIDTH + 3) * r, n, HEATMAP_SQUARE_SIZE, i, a);
          t.legendArea.appendChild(o);
        });
        var r = makeText("subdomain-name", e + HEATMAP_DISTRIBUTION_SIZE * (COL_WIDTH + 3) + COL_WIDTH / 4, n, "More", {
          fontSize: HEATMAP_SQUARE_SIZE + 1,
          dy: 9
        });
        this.legendArea.appendChild(r);
      }
    }, {
      key: "getDomains",
      value: function () {
        for (var t = this.state, e = [t.start.getMonth(), t.start.getFullYear()], n = e[0], i = e[1], a = [t.end.getMonth(), t.end.getFullYear()], r = a[0] - n + 1 + 12 * (a[1] - i), o = [], s = clone(t.start), l = 0; l < r; l++) {
          var u = t.end;
          if (!areInSameMonth(s, t.end)) {
            var c = [s.getMonth(), s.getFullYear()];
            u = getLastDateInMonth(c[0], c[1]);
          }
          o.push(this.getDomainConfig(s, u)), addDays(u, 1), s = u;
        }
        return o;
      }
    }, {
      key: "getDomainConfig",
      value: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = [t.getMonth(), t.getFullYear()],
          i = n[0],
          a = n[1],
          r = setDayToSunday(t),
          o = {
            index: i,
            cols: []
          };
        addDays(e = clone(e) || getLastDateInMonth(i, a), 1);
        for (var s = getWeeksBetween(r, e), l = [], u = void 0, c = 0; c < s; c++) u = this.getCol(r, i), l.push(u), addDays(r = new Date(u[NO_OF_DAYS_IN_WEEK - 1].yyyyMmDd), 1);
        return void 0 !== u[NO_OF_DAYS_IN_WEEK - 1].dataValue && (addDays(r, 1), l.push(this.getCol(r, i, !0))), o.cols = l, o;
      }
    }, {
      key: "getCol",
      value: function (t, e) {
        for (var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = this.state, a = clone(t), r = [], o = 0; o < NO_OF_DAYS_IN_WEEK; o++, addDays(a, 1)) {
          var s = {},
            l = a >= i.start && a <= i.end;
          n || a.getMonth() !== e || !l ? s.yyyyMmDd = getYyyyMmDd(a) : s = this.getSubDomainConfig(a), r.push(s);
        }
        return r;
      }
    }, {
      key: "getSubDomainConfig",
      value: function (t) {
        var e = getYyyyMmDd(t),
          n = this.data.dataPoints[e];
        return {
          yyyyMmDd: e,
          dataValue: n || 0,
          fill: this.colors[getMaxCheckpoint(n, this.state.distribution)]
        };
      }
    }]), e;
  }(BaseChart),
  _createClass$7 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$3 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  AxisChart = function (t) {
    function e(t, n) {
      _classCallCheck$8(this, e);
      var i = _possibleConstructorReturn$4(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.barOptions = n.barOptions || {}, i.lineOptions = n.lineOptions || {}, i.type = n.type || "line", i.init = 1, i.setup(), i;
    }
    return _inherits$4(e, t), _createClass$7(e, [{
      key: "setMeasures",
      value: function () {
        this.data.datasets.length <= 1 && (this.config.showLegend = 0, this.measures.paddings.bottom = 30);
      }
    }, {
      key: "configure",
      value: function (t) {
        _get$3(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), t.axisOptions = t.axisOptions || {}, t.tooltipOptions = t.tooltipOptions || {}, this.config.xAxisMode = t.axisOptions.xAxisMode || "span", this.config.yAxisMode = t.axisOptions.yAxisMode || "span", this.config.xIsSeries = t.axisOptions.xIsSeries || 0, this.config.shortenYAxisNumbers = t.axisOptions.shortenYAxisNumbers || 0, this.config.formatTooltipX = t.tooltipOptions.formatTooltipX, this.config.formatTooltipY = t.tooltipOptions.formatTooltipY, this.config.valuesOverPoints = t.valuesOverPoints;
      }
    }, {
      key: "prepareData",
      value: function () {
        return dataPrep(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data, this.type);
      }
    }, {
      key: "prepareFirstData",
      value: function () {
        return zeroDataPrep(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data);
      }
    }, {
      key: "calc",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.calcXPositions(), t || this.calcYAxisParameters(this.getAllYValues(), "line" === this.type), this.makeDataByIndex();
      }
    }, {
      key: "calcXPositions",
      value: function () {
        var t = this.state,
          e = this.data.labels;
        t.datasetLength = e.length, t.unitWidth = this.width / t.datasetLength, t.xOffset = t.unitWidth / 2, t.xAxis = {
          labels: e,
          positions: e.map(function (e, n) {
            return floatTwo(t.xOffset + n * t.unitWidth);
          })
        };
      }
    }, {
      key: "calcYAxisParameters",
      value: function (t) {
        var e = calcChartIntervals(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "false"),
          n = this.height / getValueRange(e),
          i = getIntervalSize(e) * n,
          a = this.height - getZeroIndex(e) * i;
        this.state.yAxis = {
          labels: e,
          positions: e.map(function (t) {
            return a - t * n;
          }),
          scaleMultiplier: n,
          zeroLine: a
        }, this.calcDatasetPoints(), this.calcYExtremes(), this.calcYRegions();
      }
    }, {
      key: "calcDatasetPoints",
      value: function () {
        var t = this.state,
          e = function (e) {
            return e.map(function (e) {
              return scale(e, t.yAxis);
            });
          };
        t.datasets = this.data.datasets.map(function (t, n) {
          var i = t.values,
            a = t.cumulativeYs || [];
          return {
            name: t.name && t.name.replace(/<|>|&/g, function (t) {
              return "&" == t ? "&amp;" : "<" == t ? "&lt;" : "&gt;";
            }),
            index: n,
            chartType: t.chartType,
            values: i,
            yPositions: e(i),
            cumulativeYs: a,
            cumulativeYPos: e(a)
          };
        });
      }
    }, {
      key: "calcYExtremes",
      value: function () {
        var t = this.state;
        if (this.barOptions.stacked) return void (t.yExtremes = t.datasets[t.datasets.length - 1].cumulativeYPos);
        t.yExtremes = new Array(t.datasetLength).fill(9999), t.datasets.map(function (e) {
          e.yPositions.map(function (e, n) {
            e < t.yExtremes[n] && (t.yExtremes[n] = e);
          });
        });
      }
    }, {
      key: "calcYRegions",
      value: function () {
        var t = this.state;
        this.data.yMarkers && (this.state.yMarkers = this.data.yMarkers.map(function (e) {
          return e.position = scale(e.value, t.yAxis), e.options || (e.options = {}), e;
        })), this.data.yRegions && (this.state.yRegions = this.data.yRegions.map(function (e) {
          return e.startPos = scale(e.start, t.yAxis), e.endPos = scale(e.end, t.yAxis), e.options || (e.options = {}), e;
        }));
      }
    }, {
      key: "getAllYValues",
      value: function () {
        var t,
          e = this,
          n = "values";
        if (this.barOptions.stacked) {
          n = "cumulativeYs";
          var i = new Array(this.state.datasetLength).fill(0);
          this.data.datasets.map(function (t, a) {
            var r = e.data.datasets[a].values;
            t[n] = i = i.map(function (t, e) {
              return t + r[e];
            });
          });
        }
        var a = this.data.datasets.map(function (t) {
          return t[n];
        });
        return this.data.yMarkers && a.push(this.data.yMarkers.map(function (t) {
          return t.value;
        })), this.data.yRegions && this.data.yRegions.map(function (t) {
          a.push([t.end, t.start]);
        }), (t = []).concat.apply(t, _toConsumableArray$5(a));
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this,
          e = [["yAxis", {
            mode: this.config.yAxisMode,
            width: this.width,
            shortenNumbers: this.config.shortenYAxisNumbers
          }, function () {
            return this.state.yAxis;
          }.bind(this)], ["xAxis", {
            mode: this.config.xAxisMode,
            height: this.height
          }, function () {
            var t = this.state;
            return t.xAxis.calcLabels = getShortenedLabels(this.width, t.xAxis.labels, this.config.xIsSeries), t.xAxis;
          }.bind(this)], ["yRegions", {
            width: this.width,
            pos: "right"
          }, function () {
            return this.state.yRegions;
          }.bind(this)]],
          n = this.state.datasets.filter(function (t) {
            return "bar" === t.chartType;
          }),
          i = this.state.datasets.filter(function (t) {
            return "line" === t.chartType;
          }),
          a = n.map(function (e) {
            var i = e.index;
            return ["barGraph-" + e.index, {
              index: i,
              color: t.colors[i],
              stacked: t.barOptions.stacked,
              valuesOverPoints: t.config.valuesOverPoints,
              minHeight: t.height * MIN_BAR_PERCENT_HEIGHT
            }, function () {
              var t = this.state,
                e = t.datasets[i],
                a = this.barOptions.stacked,
                r = this.barOptions.spaceRatio || BAR_CHART_SPACE_RATIO,
                o = t.unitWidth * (1 - r),
                s = o / (a ? 1 : n.length),
                l = t.xAxis.positions.map(function (t) {
                  return t - o / 2;
                });
              a || (l = l.map(function (t) {
                return t + s * i;
              }));
              var u = new Array(t.datasetLength).fill("");
              this.config.valuesOverPoints && (u = a && e.index === t.datasets.length - 1 ? e.cumulativeYs : e.values);
              var c = new Array(t.datasetLength).fill(0);
              return a && (c = e.yPositions.map(function (t, n) {
                return t - e.cumulativeYPos[n];
              })), {
                xPositions: l,
                yPositions: e.yPositions,
                offsets: c,
                labels: u,
                zeroLine: t.yAxis.zeroLine,
                barsWidth: o,
                barWidth: s
              };
            }.bind(t)];
          }),
          r = i.map(function (e) {
            var n = e.index;
            return ["lineGraph-" + e.index, {
              index: n,
              color: t.colors[n],
              svgDefs: t.svgDefs,
              heatline: t.lineOptions.heatline,
              regionFill: t.lineOptions.regionFill,
              spline: t.lineOptions.spline,
              hideDots: t.lineOptions.hideDots,
              hideLine: t.lineOptions.hideLine,
              valuesOverPoints: t.config.valuesOverPoints
            }, function () {
              var t = this.state,
                e = t.datasets[n],
                i = t.yAxis.positions[0] < t.yAxis.zeroLine ? t.yAxis.positions[0] : t.yAxis.zeroLine;
              return {
                xPositions: t.xAxis.positions,
                yPositions: e.yPositions,
                values: e.values,
                zeroLine: i,
                radius: this.lineOptions.dotSize || LINE_CHART_DOT_SIZE
              };
            }.bind(t)];
          }),
          o = [["yMarkers", {
            width: this.width,
            pos: "right"
          }, function () {
            return this.state.yMarkers;
          }.bind(this)]];
        e = e.concat(a, r, o);
        var s = ["yMarkers", "yRegions"];
        this.dataUnitComponents = [], this.components = new Map(e.filter(function (e) {
          return !s.includes(e[0]) || t.state[e[0]];
        }).map(function (e) {
          var n = getComponent.apply(void 0, _toConsumableArray$5(e));
          return (e[0].includes("lineGraph") || e[0].includes("barGraph")) && t.dataUnitComponents.push(n), [e[0], n];
        }));
      }
    }, {
      key: "makeDataByIndex",
      value: function () {
        var t = this;
        this.dataByIndex = {};
        var e = this.state,
          n = this.config.formatTooltipX,
          i = this.config.formatTooltipY;
        e.xAxis.labels.map(function (a, r) {
          var o = t.state.datasets.map(function (e, n) {
            var a = e.values[r];
            return {
              title: e.name,
              value: a,
              yPos: e.yPositions[r],
              color: t.colors[n],
              formatted: i ? i(a) : a
            };
          });
          t.dataByIndex[r] = {
            label: a,
            formattedLabel: n ? n(a) : a,
            xPos: e.xAxis.positions[r],
            values: o,
            yExtreme: e.yExtremes[r]
          };
        });
      }
    }, {
      key: "bindTooltip",
      value: function () {
        var t = this;
        this.container.addEventListener("mousemove", function (e) {
          var n = t.measures,
            i = getOffset(t.container),
            a = e.pageX - i.left - getLeftOffset(n),
            r = e.pageY - i.top;
          r < t.height + getTopOffset(n) && r > getTopOffset(n) ? t.mapTooltipXPosition(a) : t.tip.hideTip();
        });
      }
    }, {
      key: "mapTooltipXPosition",
      value: function (t) {
        var e = this.state;
        if (e.yExtremes) {
          var n = getClosestInArray(t, e.xAxis.positions, !0);
          if (n >= 0) {
            var i = this.dataByIndex[n];
            this.tip.setValues(i.xPos + this.tip.offset.x, i.yExtreme + this.tip.offset.y, {
              name: i.formattedLabel,
              value: ""
            }, i.values, n), this.tip.showTip();
          }
        }
      }
    }, {
      key: "renderLegend",
      value: function () {
        var t = this,
          e = this.data;
        e.datasets.length > 1 && (this.legendArea.textContent = "", e.datasets.map(function (e, n) {
          var i = AXIS_LEGEND_BAR_SIZE,
            a = legendBar(i * n, "0", i, t.colors[n], e.name, t.config.truncateLegends);
          t.legendArea.appendChild(a);
        }));
      }
    }, {
      key: "makeOverlay",
      value: function () {
        var t = this;
        if (this.init) return void (this.init = 0);
        this.overlayGuides && this.overlayGuides.forEach(function (t) {
          var e = t.overlay;
          e.parentNode.removeChild(e);
        }), this.overlayGuides = this.dataUnitComponents.map(function (t) {
          return {
            type: t.unitType,
            overlay: void 0,
            units: t.units
          };
        }), void 0 === this.state.currentIndex && (this.state.currentIndex = this.state.datasetLength - 1), this.overlayGuides.map(function (e) {
          var n = e.units[t.state.currentIndex];
          e.overlay = makeOverlay[e.type](n), t.drawArea.appendChild(e.overlay);
        });
      }
    }, {
      key: "updateOverlayGuides",
      value: function () {
        this.overlayGuides && this.overlayGuides.forEach(function (t) {
          var e = t.overlay;
          e.parentNode.removeChild(e);
        });
      }
    }, {
      key: "bindOverlay",
      value: function () {
        var t = this;
        this.parent.addEventListener("data-select", function () {
          t.updateOverlay();
        });
      }
    }, {
      key: "bindUnits",
      value: function () {
        var t = this;
        this.dataUnitComponents.map(function (e) {
          e.units.map(function (e) {
            e.addEventListener("click", function () {
              var n = e.getAttribute("data-point-index");
              t.setCurrentDataPoint(n);
            });
          });
        }), this.tip.container.addEventListener("click", function () {
          var e = t.tip.container.getAttribute("data-point-index");
          t.setCurrentDataPoint(e);
        });
      }
    }, {
      key: "updateOverlay",
      value: function () {
        var t = this;
        this.overlayGuides.map(function (e) {
          var n = e.units[t.state.currentIndex];
          updateOverlay[e.type](n, e.overlay);
        });
      }
    }, {
      key: "onLeftArrow",
      value: function () {
        this.setCurrentDataPoint(this.state.currentIndex - 1);
      }
    }, {
      key: "onRightArrow",
      value: function () {
        this.setCurrentDataPoint(this.state.currentIndex + 1);
      }
    }, {
      key: "getDataPoint",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.currentIndex,
          e = this.state;
        return {
          index: t,
          label: e.xAxis.labels[t],
          values: e.datasets.map(function (e) {
            return e.values[t];
          })
        };
      }
    }, {
      key: "setCurrentDataPoint",
      value: function (t) {
        var e = this.state;
        (t = parseInt(t)) < 0 && (t = 0), t >= e.xAxis.labels.length && (t = e.xAxis.labels.length - 1), t !== e.currentIndex && (e.currentIndex = t, fire(this.parent, "data-select", this.getDataPoint()));
      }
    }, {
      key: "addDataPoint",
      value: function (t, n) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.state.datasetLength;
        _get$3(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "addDataPoint", this).call(this, t, n, i), this.data.labels.splice(i, 0, t), this.data.datasets.map(function (t, e) {
          t.values.splice(i, 0, n[e]);
        }), this.update(this.data);
      }
    }, {
      key: "removeDataPoint",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.datasetLength - 1;
        this.data.labels.length <= 1 || (_get$3(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "removeDataPoint", this).call(this, t), this.data.labels.splice(t, 1), this.data.datasets.map(function (e) {
          e.values.splice(t, 1);
        }), this.update(this.data));
      }
    }, {
      key: "updateDataset",
      value: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        this.data.datasets[e].values = t, this.update(this.data);
      }
    }, {
      key: "updateDatasets",
      value: function (t) {
        this.data.datasets.map(function (e, n) {
          t[n] && (e.values = t[n]);
        }), this.update(this.data);
      }
    }]), e;
  }(BaseChart),
  _createClass$8 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$4 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  DonutChart = function (t) {
    function e(t, n) {
      _classCallCheck$9(this, e);
      var i = _possibleConstructorReturn$5(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.type = "donut", i.initTimeout = 0, i.init = 1, i.setup(), i;
    }
    return _inherits$5(e, t), _createClass$8(e, [{
      key: "configure",
      value: function (t) {
        _get$4(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.mouseMove = this.mouseMove.bind(this), this.mouseLeave = this.mouseLeave.bind(this), this.hoverRadio = t.hoverRadio || .1, this.config.startAngle = t.startAngle || 0, this.clockWise = t.clockWise || !1, this.strokeWidth = t.strokeWidth || 30;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this;
        _get$4(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "calc", this).call(this);
        var n = this.state;
        this.radius = this.height > this.width ? this.center.x - this.strokeWidth / 2 : this.center.y - this.strokeWidth / 2;
        var i = this.radius,
          a = this.clockWise,
          r = n.slicesProperties || [];
        n.sliceStrings = [], n.slicesProperties = [];
        var o = 180 - this.config.startAngle;
        n.sliceTotals.map(function (e, s) {
          var l = o,
            u = e / n.grandTotal * FULL_ANGLE,
            c = u > 180 ? 1 : 0,
            h = a ? -u : u,
            d = o += h,
            f = getPositionByAngle(l, i),
            p = getPositionByAngle(d, i),
            v = t.init && r[s],
            g = void 0,
            y = void 0;
          t.init ? (g = v ? v.startPosition : f, y = v ? v.endPosition : f) : (g = f, y = p);
          var m = 360 === u ? makeStrokeCircleStr(g, y, t.center, t.radius, t.clockWise, c) : makeArcStrokePathStr(g, y, t.center, t.radius, t.clockWise, c);
          n.sliceStrings.push(m), n.slicesProperties.push({
            startPosition: f,
            endPosition: p,
            value: e,
            total: n.grandTotal,
            startAngle: l,
            endAngle: d,
            angle: h
          });
        }), this.init = 0;
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this.state,
          e = [["donutSlices", {}, function () {
            return {
              sliceStrings: t.sliceStrings,
              colors: this.colors,
              strokeWidth: this.strokeWidth
            };
          }.bind(this)]];
        this.components = new Map(e.map(function (t) {
          var e = getComponent.apply(void 0, _toConsumableArray$7(t));
          return [t[0], e];
        }));
      }
    }, {
      key: "calTranslateByAngle",
      value: function (t) {
        var e = this.radius,
          n = this.hoverRadio,
          i = getPositionByAngle(t.startAngle + t.angle / 2, e);
        return "translate3d(" + i.x * n + "px," + i.y * n + "px,0)";
      }
    }, {
      key: "hoverSlice",
      value: function (t, e, n, i) {
        if (t) {
          var a = this.colors[e];
          if (n) {
            transform(t, this.calTranslateByAngle(this.state.slicesProperties[e])), t.style.stroke = lightenDarkenColor(a, 50);
            var r = getOffset(this.svg),
              o = i.pageX - r.left + 10,
              s = i.pageY - r.top - 10,
              l = (this.formatted_labels && this.formatted_labels.length > 0 ? this.formatted_labels[e] : this.state.labels[e]) + ": ",
              u = (100 * this.state.sliceTotals[e] / this.state.grandTotal).toFixed(1);
            this.tip.setValues(o, s, {
              name: l,
              value: u + "%"
            }), this.tip.showTip();
          } else transform(t, "translate3d(0,0,0)"), this.tip.hideTip(), t.style.stroke = a;
        }
      }
    }, {
      key: "bindTooltip",
      value: function () {
        this.container.addEventListener("mousemove", this.mouseMove), this.container.addEventListener("mouseleave", this.mouseLeave);
      }
    }, {
      key: "mouseMove",
      value: function (t) {
        var e = t.target,
          n = this.components.get("donutSlices").store,
          i = this.curActiveSliceIndex,
          a = this.curActiveSlice;
        if (n.includes(e)) {
          var r = n.indexOf(e);
          this.hoverSlice(a, i, !1), this.curActiveSlice = e, this.curActiveSliceIndex = r, this.hoverSlice(e, r, !0, t);
        } else this.mouseLeave();
      }
    }, {
      key: "mouseLeave",
      value: function () {
        this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1);
      }
    }]), e;
  }(AggregationChart),
  chartTypes = {
    bar: AxisChart,
    line: AxisChart,
    percentage: PercentageChart,
    heatmap: Heatmap,
    pie: PieChart,
    donut: DonutChart
  },
  Chart = function t(e, n) {
    return _classCallCheck(this, t), getChartByType(n.type, e, n);
  };
exports.Chart = Chart;
exports.AxisChart = AxisChart;
exports.Heatmap = Heatmap;
exports.PieChart = PieChart;
exports.PercentageChart = PercentageChart;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
require("../node_modules/frappe-charts/");
var _frappeChartsMin = require("frappe-charts/dist/frappe-charts.min.esm");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchButton = document.getElementById("submit-data");
var getData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(code) {
    var url, query, res, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"; //console.log(code);
          if (code == null || code == undefined) {
            code = "SSS";
          }
          query = {
            "query": [{
              "code": "Vuosi",
              "selection": {
                "filter": "item",
                "values": ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
              }
            }, {
              "code": "Alue",
              "selection": {
                "filter": "item",
                "values": [code]
              }
            }, {
              "code": "Tiedot",
              "selection": {
                "filter": "item",
                "values": ["vaesto"]
              }
            }],
            "response": {
              "format": "json-stat2"
            }
          };
          _context.next = 5;
          return fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(query)
          });
        case 5:
          res = _context.sent;
          if (res.ok) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return");
        case 8:
          _context.next = 10;
          return res.json();
        case 10:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();
var buildChart = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(municipality) {
    var code, data, labels, population, theData, chartData, chart;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(municipality != null || municipality != undefined)) {
            _context2.next = 4;
            break;
          }
          _context2.next = 3;
          return municipalityCheck(municipality);
        case 3:
          code = _context2.sent;
        case 4:
          _context2.next = 6;
          return getData(code);
        case 6:
          data = _context2.sent;
          labels = Object.values(data.dimension.Vuosi.category.label);
          population = data.value;
          theData = [];
          theData[0] = {
            name: "population",
            values: population
          };
          chartData = {
            labels: labels,
            datasets: theData
          };
          chart = new frappe.Chart("#chart", {
            title: "Finnish population",
            data: chartData,
            type: 'line',
            height: 450,
            colors: ['#eb5146']
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function buildChart(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var municipalityCheck = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(municipality) {
    var resp, dataset, candidates, code, i;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return fetch("https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px", {
            method: "GET"
          });
        case 2:
          resp = _context3.sent;
          if (resp.ok) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return");
        case 5:
          _context3.next = 7;
          return resp.json();
        case 7:
          dataset = _context3.sent;
          candidates = dataset.variables[1].valueTexts;
          i = 0;
        case 10:
          if (!(i < candidates.length)) {
            _context3.next = 17;
            break;
          }
          if (!(municipality.toLowerCase() == candidates[i].toLowerCase())) {
            _context3.next = 14;
            break;
          }
          code = dataset.variables[1].values[i];
          return _context3.abrupt("break", 17);
        case 14:
          i++;
          _context3.next = 10;
          break;
        case 17:
          return _context3.abrupt("return", code);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function municipalityCheck(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
fetchButton.addEventListener("click", function () {
  var municipality = document.getElementById("input-area").value;
  buildChart(municipality);
  event.preventDefault();
});
buildChart();
},{"./styles.css":"src/styles.css","../node_modules/frappe-charts/":"node_modules/frappe-charts/dist/frappe-charts.min.umd.js","frappe-charts/dist/frappe-charts.min.esm":"node_modules/frappe-charts/dist/frappe-charts.min.esm.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50103" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map