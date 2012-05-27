window.Rainbow=function(){function q(a,b,c,d){var e=a.getAttribute&&a.getAttribute(b)||0;if(!e){c=a.attributes;for(d=0;d<c.length;++d)if(c[d].nodeName===b)return c[d].nodeValue}return e}function C(a,b){a.className+=a.className?" "+b:b}function D(a){var b=q(a,"data-language")||q(a.parentNode,"data-language");if(!b){var c=/\blang(?:uage)?-(\w+)/;(a=a.className.match(c)||a.parentNode.className.match(c))&&(b=a[1])}return b}function E(a,b){for(var c in j[f]){c=parseInt(c,10);var d;d=j[f][c];d=a==c&&b==d?!1:a<=c&&b>=d;d&&(delete j[f][c],delete i[f][c]);d=j[f][c];d=a>=c&&a<d?!0:b>c&&b<d;if(d)return!0}return!1}function r(a,b){return'<span class="'+a.replace(/\./g," ")+(k?" "+k:"")+'">'+b+"</span>"}function s(a,b,c,d){var e=a.exec(c);if(!e)return d();++t;!b.name&&"string"==typeof b.matches[0]&&(b.name=b.matches[0],delete b.matches[0]);var l=e[0],h=e.index,u=e[0].length+h,g=function(){var e=function(){s(a,b,c,d)};return t%100>0?e():setTimeout(e,0)};if(E(h,u))return g();var m=v(b.matches),k=function(a,c,d){if(a>=c.length)return d(l);var f=e[c[a]];if(f){var h=b.matches[c[a]],j=h.language,i=h.name&&h.matches?h.matches:h,g=function(b,f,h){var i=0,g;for(g=1;g<c[a];++g)e[g]&&(i=i+e[g].length);l=w(i,b,h?r(h,f):f,l);k(++a,c,d)};if(j)return n(f,j,function(a){g(f,a)});if(typeof h==="string")return g(f,f,h);x(f,i.length?i:[i],function(a){g(f,a,h.matches?h.name:0)})}else k(++a,c,d)};k(0,m,function(a){b.name&&(a=r(b.name,a));if(!i[f]){i[f]={};j[f]={}}i[f][h]={replace:e[0],"with":a};j[f][h]=u;g()})}function w(a,b,c,d){var e=d.substr(a);return d.substr(0,a)+e.replace(b,c)}function v(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b.sort(function(a,b){return b-a})}function x(a,b,c){function d(b,l){if(l<b.length)return s(b[l].pattern,b[l],a,function(){d(b,++l)});F(a,function(a){delete i[f];delete j[f];--f;c(a)})}++f;d(b,0)}function F(a,b){function c(a,b,d,j){if(d<b.length){++y;var g=b[d],k=i[f][g],a=w(g,k.replace,k["with"],a),g=function(){c(a,b,++d,j)};return 0<y%250?g():setTimeout(g,0)}j(a)}var d=v(i[f]);c(a,d,0,b)}function n(a,b,c){var d=m[b]||[],e=m[z]||[],b=A[b]?d:d.concat(e);x(a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&(?![\w\#]+;)/g,"&amp;"),b,c)}function o(a,b,c){if(b<a.length){var d=a[b],e=D(d);return!(-1<(" "+d.className+" ").indexOf(" rainbow "))&&e?(e=e.toLowerCase(),C(d,"rainbow"),n(d.innerHTML,e,function(f){d.innerHTML=f;i={};j={};p&&p(d,e);setTimeout(function(){o(a,++b,c)},0)})):o(a,++b,c)}c&&c()}function B(a,b){var a=a&&"function"==typeof a.getElementsByTagName?a:document,c=a.getElementsByTagName("pre"),d=a.getElementsByTagName("code"),e,f=[];for(e=0;e<d.length;++e)f.push(d[e]);for(e=0;e<c.length;++e)c[e].getElementsByTagName("code").length||f.push(c[e]);o(f,0,b)}var i={},j={},m={},A={},f=0,z=0,t=0,y=0,k,p;return{extend:function(a,b,c){1==arguments.length&&(b=a,a=z);A[a]=c;m[a]=b.concat(m[a]||[])},onHighlight:function(a){p=a},addClass:function(a){k=a},color:function(a,b,c){if("string"==typeof a)return n(a,b,c);if("function"==typeof a)return B(0,a);B(a,b)}}}();(function(){if(window.addEventListener)return window.addEventListener("load",Rainbow.color,!1);window.attachEvent("onload",Rainbow.color)})();Rainbow.onHighlight=Rainbow.onHighlight;Rainbow.addClass=Rainbow.addClass;Rainbow.extend([{matches:{1:{name:"keyword.operator",pattern:/\=/g},2:{name:"string",matches:{name:"constant.character.escape",pattern:/\\('|"){1}/g}}},pattern:/(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm},{name:"comment",pattern:/\/\*[\s\S]*?\*\/|(\/\/|\#)[\s\S]*?$/gm},{name:"constant.numeric",pattern:/\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi},{matches:{1:"keyword"},pattern:/\b(and|array|as|bool(ean)?|c(atch|har|lass|onst)|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\(|\b)/gi},{name:"constant.language",pattern:/true|false|null/g},{name:"keyword.operator",pattern:/\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g},{matches:{1:"function.call"},pattern:/(\w+?)(?=\()/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(function)\s(.*?)(?=\()/g}]);Rainbow.extend("html",[{name:"source.php.embedded",matches:{2:{language:"php"}},pattern:/&lt;\?=?(?!xml)(php)?([\s\S]*?)(\?&gt;)/gm},{name:"source.css.embedded",matches:{"0":{language:"css"}},pattern:/&lt;style(.*?)&gt;([\s\S]*?)&lt;\/style&gt;/gm},{name:"source.js.embedded",matches:{"0":{language:"javascript"}},pattern:/&lt;script(?! src)(.*?)&gt;([\s\S]*?)&lt;\/script&gt;/gm},{name:"comment.html",pattern:/&lt;\!--[\S\s]*?--&gt;/g},{matches:{1:"support.tag.open",2:"support.tag.close"},pattern:/(&lt;)|(\/?\??&gt;)/g},{name:"support.tag",matches:{1:"support.tag",2:"support.tag.special",3:"support.tag-name"},pattern:/(&lt;\??)(\/|\!?)(\w+)/g},{matches:{1:"support.attribute"},pattern:/([a-z-]+)(?=\=)/g},{matches:{1:"support.operator",2:"string.quote",3:"string.value",4:"string.quote"},pattern:/(=)('|")(.*?)(\2)/g},{matches:{1:"support.operator",2:"support.value"},pattern:/(=)([a-zA-Z\-0-9]*)\b/g},{matches:{1:"support.attribute"},pattern:/\s(\w+)(?=\s|&gt;)(?![\s\S]*&lt;)/g}],!0);Rainbow.extend("javascript",[{name:"selector",pattern:/(\s|^)\$(?=\.|\()/g},{name:"support",pattern:/\b(window|document)\b/g},{matches:{1:"support.property"},pattern:/\.(length|node(Name|Value))\b/g},{matches:{1:"support.function"},pattern:/(setTimeout|setInterval)(?=\()/g},{matches:{1:"support.method"},pattern:/\.(getAttribute|push|getElementById|getElementsByClassName|log|setTimeout|setInterval)(?=\()/g},{matches:{1:"support.tag.script",2:[{name:"string",pattern:/('|")(.*?)(\1)/g},{name:"entity.tag.script",pattern:/(\w+)/g}],3:"support.tag.script"},pattern:/(&lt;\/?)(script.*?)(&gt;)/g},{name:"string.regexp",matches:{1:"string.regexp.open",2:{name:"constant.regexp.escape",pattern:/\\(.){1}/g},3:"string.regexp.close",4:"string.regexp.modifier"},pattern:/(\/)(?!\*)(.+)(\/)([igm]{0,3})/g},{matches:{1:"storage",3:"entity.function"},pattern:/(var)?(\s|^)(.*)(?=\s?=\s?function\()/g},{name:"entity.function",pattern:/(\w+)(?=:\s{0,}function)/g}]);Rainbow.extend("ruby",[{name:"string",matches:{1:"string.open",2:{name:"string.keyword",pattern:/(\#\{.*?\})/g},3:"string.close"},pattern:/("|`)(.*?[^\\\1])?(\1)/g},{name:"string",pattern:/('|"|`)([^\\\1\n]|\\.)*\1/g},{name:"string",pattern:/%[qQ](?=(\(|\[|\{|&lt;|.)(.*?)(?:'|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)/g},{matches:{1:"string",2:"string",3:"string"},pattern:/(&lt;&lt;)(\w+).*?$([\s\S]*?^\2)/gm},{matches:{1:"string",2:"string",3:"string"},pattern:/(&lt;&lt;\-)(\w+).*?$([\s\S]*?\2)/gm},{name:"string.regexp",matches:{1:"string.regexp",2:{name:"string.regexp",pattern:/\\(.){1}/g},3:"string.regexp",4:"string.regexp"},pattern:/(\/)(.*?)(\/)([a-z]*)/g},{name:"string.regexp",matches:{1:"string.regexp",2:{name:"string.regexp",pattern:/\\(.){1}/g},3:"string.regexp",4:"string.regexp"},pattern:/%r(?=(\(|\[|\{|&lt;|.)(.*?)('|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)([a-z]*)/g},{name:"comment",pattern:/#.*$/gm},{name:"comment",pattern:/^\=begin[\s\S]*?\=end$/gm},{matches:{1:"constant"},pattern:/(\w+:)[^:]/g},{matches:{1:"constant.symbol"},pattern:/[^:](:(?:\w+|(?=['"](.*?)['"])(?:"\2"|'\2')))/g},{name:"constant.numeric",pattern:/\b(0x[\da-f]+|\d+)\b/g},{name:"support.class",pattern:/\b[A-Z]\w*(?=((\.|::)[A-Za-z]|\[))/g},{name:"constant",pattern:/\b[A-Z]\w*\b/g},{matches:{1:"storage.class",2:"entity.name.class",3:"entity.other.inherited-class"},pattern:/\s*(class)\s+((?:(?:::)?[A-Z]\w*)+)(?:\s+&lt;\s+((?:(?:::)?[A-Z]\w*)+))?/g},{matches:{1:"storage.module",2:"entity.name.class"},pattern:/\s*(module)\s+((?:(?:::)?[A-Z]\w*)+)/g},{name:"variable.global",pattern:/\$([a-zA-Z_]\w*)\b/g},{name:"variable.class",pattern:/@@([a-zA-Z_]\w*)\b/g},{name:"variable.instance",pattern:/@([a-zA-Z_]\w*)\b/g},{matches:{1:"keyword.control"},pattern:/[^\.]\b(BEGIN|begin|case|class|do|else|elsif|END|end|ensure|for|if|in|module|rescue|then|unless|until|when|while)\b(?![?!])/g},{matches:{1:"keyword.control.pseudo-method"},pattern:/[^\.]\b(alias|alias_method|break|next|redo|retry|return|super|undef|yield)\b(?![?!])|\bdefined\?|\bblock_given\?/g},{matches:{1:"constant.language"},pattern:/\b(nil|true|false)\b(?![?!])/g},{matches:{1:"variable.language"},pattern:/\b(__(FILE|LINE)__|self)\b(?![?!])/g},{matches:{1:"keyword.special-method"},pattern:/\b(require|gem|initialize|new|loop|include|extend|raise|attr_reader|attr_writer|attr_accessor|attr|catch|throw|private|module_function|public|protected)\b(?![?!])/g},{name:"keyword.operator",pattern:/\s\?\s|=|&lt;&lt;|&lt;&lt;=|%=|&=|\*=|\*\*=|\+=|\-=|\^=|\|{1,2}=|&lt;&lt;|&lt;=&gt;|&lt;(?!&lt;|=)|&gt;(?!&lt;|=|&gt;)|&lt;=|&gt;=|===|==|=~|!=|!~|%|&amp;|\*\*|\*|\+|\-|\/|\||~|&gt;&gt;/g},{matches:{1:"keyword.operator.logical"},pattern:/[^\.]\b(and|not|or)\b/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(def)\s(.*?)(?=(\s|\())/g}],!0);

$(document).ready(function() {
  $('#toc').on('click', function(e) {
    $('#menu').toggle();
    e.stopPropagation();
  });
  $(document).on('keydown', function(e) {
    if (e.keyCode == 27) { $('#menu').hide(); }
  });
  $(document).on('click', function() { $('#menu').hide(); });

  $('a.anchor').each(function(){ new POI(this); });
  $(document).resize(POI.refresh);
  $(window).resize(POI.refresh);
});


// Scrollbar navigaion taken from http://bottlepy.org/ and modified
POI = function(anchor, title, options) {
  // Create a Point-Of-Interest, a named position within the document.
  // @param anchor is the point of interest (HTML or jquery node). This MUST
  //    have an ID attribute.
  // @param title is the name of the POI (string)
  POI.all.push(this);

  //: Number of pixels the handle should be visible
  options = options || {};
  this.peak = options.peak || POI.peak;
  this.delay = options.delay || POI.delay;
  this.css = options.css || POI.css;

  this.pinned = false;
  this.visible = false;
  this.hide_timeout = null;

  this.anchor = $(anchor);
  this.id = this.anchor.attr('name');
  this.title = this.anchor.next().text();
  this.node  = $('<div>').addClass(this.css).appendTo('body');
  this.link  = $('<a>').text(this.title)
             .attr('href', '#'+this.id)
             .appendTo(this.node);
  this.node.css('right', '-'+(this.node.outerWidth()-this.peak)+'px');
  this.refresh();
  this.node.mouseenter(function() { POI.show(); });
  this.node.mouseleave(function() { POI.hide(POI.delay); });
}

POI.prototype.refresh = function() {
  // Re-arrange the anchors
  var dsize = $(document).height();
  var wsize = $(window).height();
  var pos = this.anchor.offset().top;
  var hpos = Math.round(wsize*(pos/dsize));
  if (hpos < 60) { hpos += 60; }
  this.node.css('top', hpos+'px');
}

POI.prototype.show = function() {
  // Show the handle
  if(this.visible) return;
  this.node.stop(true).animate({'right': '0px'}, 250);
  this.link.css({opacity: 1});
  this.visible = true;
}

POI.prototype.hide = function() {
  // Hide the handle
  if(this.pinned) return;
  if(! this.visible) return;
  this.node.stop(true).animate({
    'right': '-'+(this.node.outerWidth()-this.peak-10)+'px'
  }, 250);
  this.link.css({opacity: 0.2});
  this.visible = false;
}



// Static attributes and methods.

POI.all = Array();
POI.peak = 30;
POI.delay = 500;
POI.css = 'sidelegend';
POI.hide_timeout = null;

POI.refresh = function() {
  // Refresh all at once
  jQuery.each(POI.all, function() {
    this.refresh();
  })
}

POI.show = function() {
  // Show all at once
  if(POI.hide_timeout) window.clearTimeout(POI.hide_timeout);
  POI.hide_timeout = null;
  jQuery.each(POI.all, function() {
    this.show();
  })
}

POI.hide = function(delay) {
  // Hide all at once after a specific delay
  if(POI.hide_timeout) window.clearTimeout(POI.hide_timeout);
  if(delay) {
    POI.hide_timeout = window.setTimeout(function() {
      POI.hide_timeout = null;
      POI.hide();
    }, delay)
  } else {
    jQuery.each(POI.all, function() {
      this.hide();
    })
  }
}