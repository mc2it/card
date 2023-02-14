#!/usr/bin/env node
(function(ae){"use strict";var y=function(){return O.__string_rec(this,"")},M=M||{},c,Pe=require("child_process");class b{static string(e){return O.__string_rec(e,"")}static parseInt(e){if(e!=null){let t=0,r=e.length;for(;t<r;){let n=t++,s=e.charCodeAt(n);if(s<=8||s>=14&&s!=32&&s!=45){let u=e.charCodeAt(n+1),l=parseInt(e,u==120||u==88?16:10);return isNaN(l)?null:l}}}return null}}b.__name__=!0;class Y{static environment(){let e=new oe,t=0,r=ue.fields(process.env);for(;t<r.length;){let n=r[t];++t;let s=process.env[n];e.h[n]=s}return e}static systemName(){let e=process.platform;switch(e){case"darwin":return"Mac";case"freebsd":return"BSD";case"linux":return"Linux";case"win32":return"Windows";default:return e}}}Y.__name__=!0;class ue{static fields(e){let t=[];if(e!=null){let n=Object.prototype.hasOwnProperty;for(var r in e)r!="__id__"&&r!="hx__closures__"&&n.call(e,r)&&t.push(r)}return t}}ue.__name__=!0;class z{constructor(e,t){this.r=new RegExp(e,t.split("u").join(""))}match(e){return this.r.global&&(this.r.lastIndex=0),this.r.m=this.r.exec(e),this.r.s=e,this.r.m!=null}matched(e){if(this.r.m!=null&&e>=0&&e<this.r.m.length)return this.r.m[e];throw F.thrown("EReg::matched")}matchedPos(){if(this.r.m==null)throw F.thrown("No string matched");return{pos:this.r.m.index,len:this.r.m[0].length}}matchSub(e,t,r){if(r==null&&(r=-1),this.r.global){this.r.lastIndex=t,this.r.m=this.r.exec(r<0?e:o.substr(e,0,t+r));let n=this.r.m!=null;return n&&(this.r.s=e),n}else{let n=this.match(r<0?o.substr(e,t,null):o.substr(e,t,r));return n&&(this.r.s=e,this.r.m.index+=t),n}}map(e,t){let r=0,n="";for(;!(r>=e.length);){if(!this.matchSub(e,r)){n+=b.string(o.substr(e,r,null));break}let s=this.matchedPos();if(n+=b.string(o.substr(e,r,s.pos-r)),n+=b.string(t(this)),s.len==0?(n+=b.string(o.substr(e,s.pos,1)),r=s.pos+1):r=s.pos+s.len,!this.r.global)break}return!this.r.global&&r>0&&r<e.length&&(n+=b.string(o.substr(e,r,null))),n}}z.__name__=!0;class g{static format(e,t){e+="<//>";let r=[],n=[],s=[];return{formatted:g.formatTagPattern.map(e,function(u){if(u.matched(1)!=null)return u.matched(0);let l=u.matched(2)==null,_=u.matched(3).split(",");if(!l&&_.length==1)if(_[0]==""){let a=r.indexOf(r[r.length-1]);if(a!=-1){let h=n[a];r.splice(a-h,h+1),n.splice(a-h,h+1)}}else if(re.fromString(_[0])=="reset")r=[],n=[];else{let a=re.fromString(_[0]);if(a!=null){let h=r.indexOf(a);if(h!=-1){let d=n[h];r.splice(h-d,d+1),n.splice(h-d,d+1)}}}else{let a=0,h=0;for(;h<_.length;){let d=re.fromString(_[h++]);if(d==null)return u.matched(0);if(l)r.push(d),n.push(a),++a;else{let m=r.indexOf(d);if(m!=-1){let w=n[m];r.splice(m-w,w+1),n.splice(m-w,w+1)}}}}switch(t){case 0:if(l)if(r.length>0){let f=n[n.length-1]+1,v="",I=0;for(;I<f;)v+=g.getAsciiFormat(r[n.length-1-I++]);return v}else return"";else{let f=g.getAsciiFormat("reset"),v=new Array(r.length),I=0,ee=r.length;for(;I<ee;){let $=I++;v[$]=g.getAsciiFormat(r[$])}let te=[],U=0;for(;U<v.length;){let $=v[U];++U,$!=null&&te.push($)}return f+te.join("")}break;case 1:let a=s,h=new Array(r.length),d=0,m=r.length;for(;d<m;){let f=d++;h[f]=g.getBrowserFormat(r[f])}let w=[],p=0;for(;p<h.length;){let f=h[p];++p,f!=null&&w.push(f)}return a.push(w.join(";")),"%c";case 2:return""}}),browserFormatArguments:s}}static printFormatted(e,t){t==null&&(t=0),e==null&&(e="");let r=g.format(e,g.formatMode);if(g.formatMode==1){let n=[r.formatted].concat(r.browserFormatArguments);switch(t){case 1:console.warn.apply(console,n);break;case 2:console.error.apply(console,n);break;case 0:case 3:console.log.apply(console,n);break}return}g.print(r.formatted,t)}static print(e,t){if(t==null&&(t=0),e==null&&(e=""),!(g.printIntercept!=null&&!g.printIntercept(e,t)))switch(g.unicodeCompatibilityMode==1&&!g.unicodeCompatibilityEnabled&&(g.exec("chcp 65001"),g.unicodeCompatibilityEnabled=!0),t){case 1:case 2:new ne(2).writeString(e);break;case 0:case 3:new ne(1).writeString(e);break}}static getAsciiFormat(e){if(e.charAt(0)=="#"){let t=o.substr(e,1,null);return"\x1B[38;5;"+g.rgbToAscii256(b.parseInt("0x"+o.substr(t,0,2)),b.parseInt("0x"+o.substr(t,2,2)),b.parseInt("0x"+o.substr(t,4,2)))+"m"}if(o.substr(e,0,3)=="bg#"){let t=o.substr(e,3,null);return"\x1B[48;5;"+g.rgbToAscii256(b.parseInt("0x"+o.substr(t,0,2)),b.parseInt("0x"+o.substr(t,2,2)),b.parseInt("0x"+o.substr(t,4,2)))+"m"}switch(e){case"bg_black":return"\x1B[48;5;0m";case"bg_blue":return"\x1B[48;5;4m";case"bg_cyan":return"\x1B[48;5;6m";case"bg_green":return"\x1B[48;5;2m";case"bg_light_black":return"\x1B[48;5;8m";case"bg_light_blue":return"\x1B[48;5;12m";case"bg_light_cyan":return"\x1B[48;5;14m";case"bg_light_green":return"\x1B[48;5;10m";case"bg_light_magenta":return"\x1B[48;5;13m";case"bg_light_red":return"\x1B[48;5;9m";case"bg_light_white":return"\x1B[48;5;15m";case"bg_light_yellow":return"\x1B[48;5;11m";case"bg_magenta":return"\x1B[48;5;5m";case"bg_red":return"\x1B[48;5;1m";case"bg_white":return"\x1B[48;5;7m";case"bg_yellow":return"\x1B[48;5;3m";case"black":return"\x1B[38;5;0m";case"blink":return"\x1B[5m";case"blue":return"\x1B[38;5;4m";case"bold":return"\x1B[1m";case"cyan":return"\x1B[38;5;6m";case"dim":return"\x1B[2m";case"green":return"\x1B[38;5;2m";case"hidden":return"\x1B[8m";case"invert":return"\x1B[7m";case"italic":return"\x1B[3m";case"light_black":return"\x1B[38;5;8m";case"light_blue":return"\x1B[38;5;12m";case"light_cyan":return"\x1B[38;5;14m";case"light_green":return"\x1B[38;5;10m";case"light_magenta":return"\x1B[38;5;13m";case"light_red":return"\x1B[38;5;9m";case"light_white":return"\x1B[38;5;15m";case"light_yellow":return"\x1B[38;5;11m";case"magenta":return"\x1B[38;5;5m";case"red":return"\x1B[38;5;1m";case"reset":return"\x1B[m";case"underline":return"\x1B[4m";case"white":return"\x1B[38;5;7m";case"yellow":return"\x1B[38;5;3m";default:return""}}static rgbToAscii256(e,t,r){let n=function(h,d){let m=1/0,w=-1,p=0,f=d.length;for(;p<f;){let v=p++,I=Math.abs(h-d[v]);I<m&&(m=I,w=v)}return w},s=[0,95,135,175,215,255],u=n(e,s),l=n(t,s),_=n(r,s),a=Math.round((e-8)/10);return Math.abs(e-Math.max(Math.min(a*10+8,238),8))+Math.abs(t-Math.max(Math.min(Math.round((t-8)/10)*10+8,238),8))+Math.abs(r-Math.max(Math.min(Math.round((r-8)/10)*10+8,238),8))<Math.abs(e-s[u])+Math.abs(t-s[l])+Math.abs(r-s[_])&&e==t&&t==r?a+232:16+u*36+l*6+_}static getBrowserFormat(e){if(e.charAt(0)=="#")return"color: "+e;if(o.substr(e,0,3)=="bg#")return"background-color: "+o.substr(e,2,null);if(e.charAt(0)=="{")return o.substr(e,1,e.length-2);switch(e){case"bg_black":return"background-color: black";case"bg_blue":return"background-color: blue";case"bg_cyan":return"background-color: cyan";case"bg_green":return"background-color: green";case"bg_light_black":return"background-color: gray";case"bg_light_blue":return"background-color: lightBlue";case"bg_light_cyan":return"background-color: lightCyan";case"bg_light_green":return"background-color: lightGreen";case"bg_light_magenta":return"background-color: lightPink";case"bg_light_red":return"background-color: salmon";case"bg_light_white":return"background-color: white";case"bg_light_yellow":return"background-color: lightYellow";case"bg_magenta":return"background-color: magenta";case"bg_red":return"background-color: red";case"bg_white":return"background-color: whiteSmoke";case"bg_yellow":return"background-color: gold";case"black":return"color: black";case"blink":return"text-decoration: blink";case"blue":return"color: blue";case"bold":return"font-weight: bold";case"cyan":return"color: cyan";case"dim":return"color: gray";case"green":return"color: green";case"hidden":return"visibility: hidden; color: white";case"invert":return"-webkit-filter: invert(100%); filter: invert(100%)";case"italic":return"font-style: italic";case"light_black":return"color: gray";case"light_blue":return"color: lightBlue";case"light_cyan":return"color: lightCyan";case"light_green":return"color: lightGreen";case"light_magenta":return"color: lightPink";case"light_red":return"color: salmon";case"light_white":return"color: white";case"light_yellow":return"color: #ffed88";case"magenta":return"color: magenta";case"red":return"color: red";case"reset":return"";case"underline":return"text-decoration: underline";case"white":return"color: whiteSmoke";case"yellow":return"color: #f5ba00";default:return""}}static determineConsoleFormatMode(){if(typeof window<"u")return 1;if(typeof process<"u"&&process?.stdout?.isTTY===!0)return 0;let e=g.exec("tput colors");if(e.exit==0){let r=b.parseInt(e.stdout);if(r!=null&&r>2)return 0}let t=Y.environment().h.TERM;return t!=null&&new z("cygwin|xterm|vt100","").match(t)?0:2}static exec(e,t){let r=Pe.spawnSync(e,t??[],{}),n=r.stdout==null?"":r.stdout.toString();return n==null&&(n=""),{exit:r.status,stdout:n}}}g.__name__=!0;class re{static fromString(e){if(e=e.toLowerCase(),e.charAt(0)=="#"||o.substr(e,0,3)=="bg#"){let t=e.indexOf("#"),r=o.substr(e,t+1,null);if(r.length==3){let s=r.split("");r=[s[0],s[0],s[1],s[1],s[2],s[2]].join("")}return new z("[^0-9a-f]","i").match(r)||r.length<6?"":e.substring(0,t)+"#"+r}switch(e){case"!":return"invert";case"/":return"reset";case"b":return"bold";case"bg_gray":return"bg_light_black";case"gray":return"light_black";case"i":return"italic";case"u":return"underline";default:return e}}}class o{static cca(e,t){let r=e.charCodeAt(t);if(r==r)return r}static substr(e,t,r){if(r==null)r=e.length;else if(r<0)if(t==0)r=e.length+r;else return"";return e.substr(t,r)}static now(){return Date.now()}}o.__name__=!0;class J{static fold(e,t,r){let n=Re(e);for(;n.hasNext();)r=t(n.next(),r);return r}static find(e,t){let r=Re(e);for(;r.hasNext();){let n=r.next();if(t(n))return n}return null}}J.__name__=!0,Math.__name__=!0;class ce{constructor(){this.b=""}toString(){return this.b}}ce.__name__=!0;class B{static isSpace(e,t){let r=o.cca(e,t);return r>8&&r<14?!0:r==32}static ltrim(e){let t=e.length,r=0;for(;r<t&&B.isSpace(e,r);)++r;return r>0?o.substr(e,r,t-r):e}static rtrim(e){let t=e.length,r=0;for(;r<t&&B.isSpace(e,t-r-1);)++r;return r>0?o.substr(e,0,t-r):e}static trim(e){return B.ltrim(B.rtrim(e))}static lpad(e,t,r){if(t.length<=0)return e;let n="";for(r-=e.length;n.length<r;)n+=t==null?"null":""+t;return n+=e==null?"null":""+e,n}}B.__name__=!0;class _e{writeByte(e){throw new ge(null,null,{fileName:"haxe/io/Output.hx",lineNumber:47,className:"haxe.io.Output",methodName:"writeByte"})}writeBytes(e,t,r){if(t<0||r<0||t+r>e.length)throw F.thrown(T.OutsideBounds);let n=e.b,s=r;for(;s>0;)this.writeByte(n[t]),++t,--s;return r}writeFullBytes(e,t,r){for(;r>0;){let n=this.writeBytes(e,t,r);t+=n,r-=n}}writeString(e,t){let r=H.ofString(e,t);this.writeFullBytes(r,0,r.length)}}_e.__name__=!0;class ne extends _e{constructor(e){super(),this.fd=e}writeByte(e){ie.writeSync(this.fd,String.fromCodePoint(e))}writeBytes(e,t,r){let n=e.b;return ie.writeSync(this.fd,fe.from(n.buffer,n.byteOffset,e.length),t,r)}writeString(e,t){ie.writeSync(this.fd,e)}}ne.__name__=!0;var D=M["haxe.StackItem"]={__ename__:!0,__constructs__:null,CFunction:{_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:y},Module:(c=function(i){return{_hx_index:1,m:i,__enum__:"haxe.StackItem",toString:y}},c._hx_name="Module",c.__params__=["m"],c),FilePos:(c=function(i,e,t,r){return{_hx_index:2,s:i,file:e,line:t,column:r,__enum__:"haxe.StackItem",toString:y}},c._hx_name="FilePos",c.__params__=["s","file","line","column"],c),Method:(c=function(i,e){return{_hx_index:3,classname:i,method:e,__enum__:"haxe.StackItem",toString:y}},c._hx_name="Method",c.__params__=["classname","method"],c),LocalFunction:(c=function(i){return{_hx_index:4,v:i,__enum__:"haxe.StackItem",toString:y}},c._hx_name="LocalFunction",c.__params__=["v"],c)};D.__constructs__=[D.CFunction,D.Module,D.FilePos,D.Method,D.LocalFunction];class F extends Error{constructor(e,t,r){super(e),this.message=e,this.__previousException=t,this.__nativeException=r??this}unwrap(){return this.__nativeException}toString(){return this.get_message()}get_message(){return this.message}get_native(){return this.__nativeException}static caught(e){return e instanceof F?e:e instanceof Error?new F(e.message,null,e):new se(e,null,e)}static thrown(e){return e instanceof F?e.get_native():e instanceof Error?e:new se(e)}}F.__name__=!0;class se extends F{constructor(e,t,r){super(String(e),t,r),this.value=e}unwrap(){return this.value}}se.__name__=!0;class oe{constructor(){this.h=Object.create(null)}}oe.__name__=!0;class he extends F{constructor(e,t,r){super(e,t),r==null?this.posInfos={fileName:"(unknown)",lineNumber:0,className:"(unknown)",methodName:"(unknown)"}:this.posInfos=r}toString(){return""+super.toString()+" in "+this.posInfos.className+"."+this.posInfos.methodName+" at "+this.posInfos.fileName+":"+this.posInfos.lineNumber}}he.__name__=!0;class ge extends he{constructor(e,t,r){e==null&&(e="Not implemented"),super(e,t,r)}}ge.__name__=!0;class H{constructor(e){this.length=e.byteLength,this.b=new Uint8Array(e),this.b.bufferValue=e,e.hxBytes=this,e.bytes=this.b}static ofString(e,t){if(t==K.RawNative){let s=new Uint8Array(e.length<<1),u=0,l=e.length;for(;u<l;){let _=u++,a=e.charCodeAt(_);s[_<<1]=a&255,s[_<<1|1]=a>>8}return new H(s.buffer)}let r=[],n=0;for(;n<e.length;){let s=e.charCodeAt(n++);55296<=s&&s<=56319&&(s=s-55232<<10|e.charCodeAt(n++)&1023),s<=127?r.push(s):s<=2047?(r.push(192|s>>6),r.push(128|s&63)):s<=65535?(r.push(224|s>>12),r.push(128|s>>6&63),r.push(128|s&63)):(r.push(240|s>>18),r.push(128|s>>12&63),r.push(128|s>>6&63),r.push(128|s&63))}return new H(new Uint8Array(r).buffer)}}H.__name__=!0;var K=M["haxe.io.Encoding"]={__ename__:!0,__constructs__:null,UTF8:{_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:y},RawNative:{_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:y}};K.__constructs__=[K.UTF8,K.RawNative];var T=M["haxe.io.Error"]={__ename__:!0,__constructs__:null,Blocked:{_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:y},Overflow:{_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:y},OutsideBounds:{_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:y},Custom:(c=function(i){return{_hx_index:3,e:i,__enum__:"haxe.io.Error",toString:y}},c._hx_name="Custom",c.__params__=["e"],c)};T.__constructs__=[T.Blocked,T.Overflow,T.OutsideBounds,T.Custom];class de{constructor(e){this.current=0,this.array=e}hasNext(){return this.current<this.array.length}next(){return this.array[this.current++]}}de.__name__=!0;class O{static __string_rec(e,t){if(e==null)return"null";if(t.length>=5)return"<...>";let r=typeof e;switch(r=="function"&&(e.__name__||e.__ename__)&&(r="object"),r){case"function":return"<function>";case"object":if(e.__enum__){let a=M[e.__enum__].__constructs__[e._hx_index],h=a._hx_name;return a.__params__?(t=t+"	",h+"("+function(d){var m;let w=[];{let p=0,f=a.__params__;for(;p<f.length;){let v=f[p];p=p+1,w.push(O.__string_rec(e[v],t))}}return m=w,m}(this).join(",")+")"):h}if(e instanceof Array){let _="[";t+="	";let a=0,h=e.length;for(;a<h;){let d=a++;_+=(d>0?",":"")+O.__string_rec(e[d],t)}return _+="]",_}let n;try{n=e.toString}catch{return"???"}if(n!=null&&n!=Object.toString&&typeof n=="function"){let _=e.toString();if(_!="[object Object]")return _}let s=`{
`;t+="	";let u=e.hasOwnProperty!=null,l=null;for(l in e)u&&!e.hasOwnProperty(l)||l=="prototype"||l=="__class__"||l=="__super__"||l=="__interfaces__"||l=="__properties__"||(s.length!=2&&(s+=`, 
`),s+=t+l+" : "+O.__string_rec(e[l],t));return t=t.substring(1),s+=`
`+t+"}",s;case"string":return e;default:return String(e)}}}O.__name__=!0;var ie=require("fs"),fe=require("buffer").Buffer;class x{static _new(){return new ce}static center(e,t){return x.line(e,""+x.repeat(e," ",Math.floor((39-x.getLength(e,t))/2))+t)}static footer(e){return x.addLine(e,"<green>\u2570"+x.repeat(e,"\u2500")+"\u256F</>")}static header(e){return x.addLine(e,"<green>\u256D"+x.repeat(e,"\u2500")+"\u256E</>")}static label(e,t,r){return x.line(e,B.lpad("<light_white>"+t+":</> "," ",9+3+16)+r)}static line(e,t){return t==null&&(t=""),x.addLine(e,"<green>\u2502</>"+t+x.repeat(e," ",39-x.getLength(e,t))+"<green>\u2502</>")}static addLine(e,t){return e.b+=b.string("   "+t+P.newLine),e}static getLength(e,t){let r=new RegExp("<[^<]*>","g".split("u").join(""));return t.replace(r,"").length}static repeat(e,t,r){r==null&&(r=39);let n=[],s=0;for(;s<r;)++s,n.push(t);return n.join("")}}class P{constructor(){this.version=!1,this.help=!1}run(e){if(this.help||this.version){let n=this.version?W.get_packageVersion():new be().format(q.get());return process.stdout.write(b.string(n)),process.stdout.write(`
`),new j(new L(S.Success(null)))}let t=x.footer(x.line(x.label(x.label(x.label(x.line(x.label(x.line(x.center(x.line(x.header(x._new())),"<light_white>MC2IT</> <white>- Distribution & Services</>")),"GitHub","<gray>https://github.com/</><cyan>mc2it</>")),"Card","<yellow>npx</> <white>@mc2it/card</>"),"Email","<white>dev@mc2it.com</>"),"Website","<white>https://www.mc2it.com</>")));g.formatMode=0,g.logPrefix="";let r=g.logPrefix+(""+P.newLine+b.string(t));return r==null&&(r=""),g.printFormatted(r+`
`,0),new j(new L(S.Success(null)))}static main(){new we(new P,new ye(5)).process(process.argv.slice(2)).handle(me.exit)}}P.__name__=!0;class W{static get_packageVersion(){return W.packageVersion==null&&(W.packageVersion="4.0.0"),W.packageVersion}}W.__name__=!0;class me{static exit(e){switch(e._hx_index){case 0:process.exit(0);break;case 1:let t=e.failure,r=t.message;t.data!=null&&(r+=", "+(t.data==null?"null":b.string(t.data))),process.stdout.write(b.string(r)),process.stdout.write(`
`);let n=t.code;process.exit(n);break}}}me.__name__=!0;class pe{constructor(e){this.buffer=e}}pe.__name__=!0;class q{static get(){return q.doc==null&&(q.doc={doc:" Print the business card of MC2IT, distribution and services. ",commands:[{isDefault:!0,isSub:!1,names:[],doc:null}],flags:[{names:["--help"],aliases:["h"],doc:" Display this help. "},{names:["--version"],aliases:["v"],doc:" Output the version number. "}]}),q.doc}}q.__name__=!0;class Q{constructor(e,t,r){this.command=e,this.prompt=t,this.hasFlags=r}processArgs(e){let t=this;return this.hasFlags?N.catchExceptions(function(){let r=Q.expandAssignments(e),n=[],s=0,u=!1;for(;s<r.length;){let l=r[s];if(l=="--")u=!0,++s;else if(!u&&o.cca(l,0)==45){let _=t.processFlag(r,s);if(_==-1)if(o.cca(l,1)!=45){let a=t.processAlias(r,s);if(a==-1)throw F.thrown('Unrecognized alias "'+l+'"');s+=a+1}else throw F.thrown('Unrecognized flag "'+l+'"');else s+=_+1}else n.push(l),++s}return n},null,{fileName:"tink/cli/Router.hx",lineNumber:25,className:"tink.cli.Router",methodName:"processArgs"}):S.Success(e)}processFlag(e,t){return-1}processAlias(e,t){return-1}static expandAssignments(e){let t=[],r=!0,n=0;for(;n<e.length;){let s=e[n];if(++n,s=="--"&&(r=!1),!r)t.push(s);else{let u=o.cca(s,0),l=o.cca(s,1),_=s.indexOf("=");u==null?t.push(s):u==45?l==null?t.push(s):l==45&&_!=-1?(t.push(o.substr(s,0,_)),t.push(o.substr(s,_+1,null))):t.push(s):t.push(s)}}return t}}Q.__name__=!0;class we extends Q{constructor(e,t){super(e,t,!0)}process(e){let t=this;if(e[0]==null){let r,n=this.processArgs(e);switch(n._hx_index){case 0:r=n.data;break;case 1:return new j(new L(S.Failure(n.failure)))}return Be.next(this.promptRequired(),function(s){return t.run_run(r)})}else{let r,n=this.processArgs(e);switch(n._hx_index){case 0:r=n.data;break;case 1:return new j(new L(S.Failure(n.failure)))}return Be.next(this.promptRequired(),function(s){return t.run_run(r)})}}processFlag(e,t){switch(e[t]){case"--help":this.command.help=!0;break;case"--version":this.command.version=!0;break;default:return-1}return t-t}processAlias(e,t){let r=e[t],n=1,s=r.length;for(;n<s;){let u=n++,l=o.cca(r,u);if(l==null)throw F.thrown("Invalid alias '-"+r.charAt(u)+"'");switch(l){case 104:this.command.help=!0;break;case 118:this.command.version=!0;break;default:throw F.thrown("Invalid alias '-"+r.charAt(u)+"'")}}return t-t}promptRequired(){return E.async(function(e){e(S.Success(null))})}run_run(e){return e.length<0?new j(new L(S.Failure(new N(null,"Insufficient arguments. Expected: 0, Got: "+e.length,{fileName:"src/mc2it_card/Program.hx",lineNumber:29,className:"tink.cli.Router0",methodName:"run_run"})))):this.command.run(e.slice(0,e.length))}}we.__name__=!0;class be{constructor(e){this.re=new z("^\\s*\\*?\\s{0,2}(.*)$",""),this.root=e}format(e){let t="";t+=`
`;let r=this.formatDoc(e.doc);r!=null&&(t+=b.string(""+r+`

`));let n=e.commands,s=[],u=0;for(;u<n.length;){let a=n[u];++u,a.isDefault||s.push(a)}this.root!=null&&(t+=b.string("  Usage: "+this.root+`
`));let l=J.find(e.commands,function(a){return a.isDefault});if(l!=null){let a=this.formatDoc(l.doc);a!=null&&(t+=b.string(this.indent(a,4)+`

`))}let _=this;if(s.length>0){let a=J.fold(s,function(m,w){let p=0,f=m.names;for(;p<f.length;){let v=f[p];++p,v.length>w&&(w=v.length)}return w},0);this.root!=null&&(t+=b.string("  Usage: "+this.root+` <subcommand>
`)),t+=b.string(`    Subcommands:
`);let h=function(m,w){w==null&&(w="(doc missing)"),t+=b.string(_.indent(B.lpad(m," ",a)+" : "+B.trim(_.indent(w,a+3)),6)+`
`)},d=0;for(;d<s.length;){let m=s[d];++d;let w=m.names[0];if(h(w,this.formatDoc(m.doc)),m.names.length>1){let p=1,f=m.names.length;for(;p<f;)h(m.names[p++],"Alias of "+w)}}}if(e.flags.length>0){let a=function(p){let f=p.names.join(", ");if(p.aliases.length>0){let v=p.aliases,I=new Array(v.length),ee=0,te=v.length;for(;ee<te;){let U=ee++;I[U]="-"+v[U]}f+=", "+I.join(", ")}return f},h=J.fold(e.flags,function(p,f){let v=a(p);return v.length>f&&(f=v.length),f},0),d=function(p,f){f==null&&(f=""),t+=b.string(_.indent(B.lpad(p," ",h)+" : "+B.trim(_.indent(f,h+3)),6)+`
`)};t=(t+=`
`)+b.string(`  Flags:
`);let m=0,w=e.flags;for(;m<w.length;){let p=w[m];++m,d(a(p),this.formatDoc(p.doc))}}return t}indent(e,t){let r=e.split(`
`),n=new Array(r.length),s=0,u=r.length;for(;s<u;){let l=s++;n[l]=B.lpad(""," ",t)+r[l]}return n.join(`
`)}formatDoc(e){if(e==null)return null;let t=e.split(`
`),r=B.trim,n=new Array(t.length),s=0,u=t.length;for(;s<u;){let d=s++;n[d]=r(t[d])}let l=n;for(;l[0]=="";)l=l.slice(1);for(;l[l.length-1]=="";)l.pop();let _=new Array(l.length),a=0,h=l.length;for(;a<h;){let d=a++,m=l[d];_[d]=this.re.match(m)?this.re.matched(1):m}return _.join(`
`)}}be.__name__=!0;class xe{constructor(e,t){this.source=e,this.sink=t}}xe.__name__=!0;class ke extends xe{constructor(){let e=process.stdin,t=null;t={},super(G.wrap("stdin",e,t.chunkSize,t.onEnd),Z.wrap("stdout",process.stdout))}}ke.__name__=!0;class ye{constructor(e,t){this.trials=e,this.proxy=t??new ke}}ye.__name__=!0;class k{static invoke(e,t){k.depth<500?(k.depth++,e(t),k.depth--):k.defer(function(){e(t)})}static defer(e){process.nextTick(e)}}class Se{constructor(){}cancel(){let e=this.link;e?.cancel()}}Se.__name__=!0;class le{constructor(e,t){this.dissolved=!1,this.a=e,this.b=t}cancel(){if(!this.dissolved){this.dissolved=!0;let e=this.a;e?.cancel();let t=this.b;t?.cancel(),this.a=null,this.b=null}}}le.__name__=!0;class ve{constructor(e,t){if(e==null)throw F.thrown("callback expected but null received");this.cb=e,this.list=t}cancel(){if(this.list!=null){let e=this.list;this.cb=null,this.list=null,--e.used<=e.cells.length>>1&&e.compact()}}}ve.__name__=!0;class R{constructor(e){R._hx_skip_constructor||this._hx_constructor(e)}_hx_constructor(e){this.disposeHandlers=[],this.f=e}dispose(){let e=this.disposeHandlers;if(e!=null){this.disposeHandlers=null;let t=this.f;this.f=R.noop,t();let r=0;for(;r<e.length;)e[r++]()}}static noop(){}}R.__name__=!0;class Fe extends R{constructor(e){R._hx_skip_constructor=!0,super(),R._hx_skip_constructor=!1,this._hx_constructor(e)}_hx_constructor(e){e==null&&(e=!1),this.onfill=function(){},this.ondrain=function(){},this.busy=!1,this.queue=[],this.used=0;let t=this;super._hx_constructor(function(){t.busy||t.destroy()}),this.destructive=e,this.cells=[]}destroy(){let e=0,t=this.cells;for(;e<t.length;){let r=t[e];++e,r.cb=null,r.list=null}if(this.queue=null,this.cells=null,this.used>0){this.used=0;let r=this.ondrain;k.depth<500?(k.depth++,r(),k.depth--):k.defer(r)}}invoke(e){let t=this;if(k.depth<500){if(k.depth++,t.disposeHandlers!=null)if(t.busy){if(t.destructive!=!0){let r=Le(t,t.invoke),n=e,s=function(){r(n)};t.queue.push(s)}}else{t.busy=!0,t.destructive&&t.dispose();let r=t.cells.length,n=0;for(;n<r;){let s=t.cells[n++];s.list!=null&&s.cb(e)}t.busy=!1,t.disposeHandlers==null?t.destroy():(t.used<t.cells.length&&t.compact(),t.queue.length>0&&t.queue.shift()())}k.depth--}else k.defer(function(){if(t.disposeHandlers!=null)if(t.busy){if(t.destructive!=!0){let r=Le(t,t.invoke),n=e,s=function(){r(n)};t.queue.push(s)}}else{t.busy=!0,t.destructive&&t.dispose();let r=t.cells.length,n=0;for(;n<r;){let s=t.cells[n++];s.list!=null&&s.cb(e)}t.busy=!1,t.disposeHandlers==null?t.destroy():(t.used<t.cells.length&&t.compact(),t.queue.length>0&&t.queue.shift()())}})}compact(){if(!this.busy)if(this.used==0){this.resize(0);let e=this.ondrain;k.depth<500?(k.depth++,e(),k.depth--):k.defer(e)}else{let e=0,t=0,r=this.cells.length;for(;t<r;){let n=t++,s=this.cells[n];if(s.cb!=null&&(e!=n&&(this.cells[e]=s),++e==this.used))break}this.resize(this.used)}}resize(e){this.cells.length=e}}Fe.__name__=!0;class N{constructor(e,t,r){e==null&&(e=500),this.isTinkError=!0,this.code=e,this.message=t,this.pos=r,this.exceptionStack=[],this.callStack=[]}static withData(e,t,r,n){return N.typed(e,t,r,n)}static typed(e,t,r,n){let s=new N(e,t,n);return s.data=r,s}static asError(e){return e!=null&&e.isTinkError?e:null}static catchExceptions(e,t,r){try{return S.Success(e())}catch(n){let s=N.asError(F.caught(n).unwrap());return S.Failure(s??(t==null?N.withData(null,"Unexpected Error",s,r):t(s)))}}}N.__name__=!0;class Ae{constructor(){}getStatus(){return A.NeverEver}handle(e){return null}eager(){}}Ae.__name__=!0;class L{constructor(e){this.value=e}isComputed(){return!0}get(){return this.value}compute(){}}L.__name__=!0;class j{constructor(e){this.value=e}getStatus(){return A.Ready(this.value)}handle(e){return k.invoke(e,X.get(this.value)),null}eager(){this.value.isComputed()||X.get(this.value)}}j.__name__=!0;class E{static first(e,t){let r=e;switch(r.getStatus()._hx_index){case 3:switch(t.getStatus()._hx_index){case 3:return r;case 4:return r;default:return r}break;case 4:return t;default:switch(t.getStatus()._hx_index){case 3:return t;case 4:return r;default:return new V(function(n){return new le(e.handle(n),t.handle(n))})}}}static flatMap(e,t,r){let n=e.getStatus();switch(n._hx_index){case 3:let s=n.result;return new V(function(u){return t(X.get(s)).handle(function(l){u(l)})});case 4:return E.NEVER;default:return new V(function(u){let l=new Se;return new le(e.handle(function(_){let a=t(_).handle(u);l.link=a}),l)})}}static async(e,t){t==null&&(t=!1);let r=E.irreversible(e);return t||r.eager(),r}static irreversible(e){return new V(function(t){return e(t),null})}}var A=M["tink.core.FutureStatus"]={__ename__:!0,__constructs__:null,Suspended:{_hx_name:"Suspended",_hx_index:0,__enum__:"tink.core.FutureStatus",toString:y},Awaited:{_hx_name:"Awaited",_hx_index:1,__enum__:"tink.core.FutureStatus",toString:y},EagerlyAwaited:{_hx_name:"EagerlyAwaited",_hx_index:2,__enum__:"tink.core.FutureStatus",toString:y},Ready:(c=function(i){return{_hx_index:3,result:i,__enum__:"tink.core.FutureStatus",toString:y}},c._hx_name="Ready",c.__params__=["result"],c),NeverEver:{_hx_name:"NeverEver",_hx_index:4,__enum__:"tink.core.FutureStatus",toString:y}};A.__constructs__=[A.Suspended,A.Awaited,A.EagerlyAwaited,A.Ready,A.NeverEver];class V{constructor(e){this.status=A.Suspended,this.wakeup=e,this.callbacks=new Fe(!0);let t=this;this.callbacks.ondrain=function(){if(t.status==A.Awaited){t.status=A.Suspended;let r=t.link;r?.cancel(),t.link=null}},this.callbacks.onfill=function(){t.status==A.Suspended&&(t.status=A.Awaited,t.arm())}}getStatus(){return this.status}trigger(e){if(this.status._hx_index!=3){this.status=A.Ready(new L(e));let t=this.link;this.link=null,this.wakeup=null,this.callbacks.invoke(e),t?.cancel()}}handle(e){let t=this.status;if(t._hx_index==3)return k.invoke(e,X.get(t.result)),null;{let r=this.callbacks;if(r.disposeHandlers==null)return null;{let n=new ve(e,r);if(r.cells.push(n),r.used++==0){let s=r.onfill;k.depth<500?(k.depth++,s(),k.depth--):k.defer(s)}return n}}}arm(){let e=this;this.link=this.wakeup(function(t){e.trigger(t)})}eager(){switch(this.status._hx_index){case 0:this.status=A.EagerlyAwaited,this.arm();break;case 1:this.status=A.EagerlyAwaited;break;default:}}}V.__name__=!0;class X{static get(e){return e.compute(),e.get()}}var S=M["tink.core.Outcome"]={__ename__:!0,__constructs__:null,Success:(c=function(i){return{_hx_index:0,data:i,__enum__:"tink.core.Outcome",toString:y}},c._hx_name="Success",c.__params__=["data"],c),Failure:(c=function(i){return{_hx_index:1,failure:i,__enum__:"tink.core.Outcome",toString:y}},c._hx_name="Failure",c.__params__=["failure"],c)};S.__constructs__=[S.Success,S.Failure];class Be{static next(e,t,r){return E.flatMap(e,function(n){switch(n._hx_index){case 0:return t(n.data);case 1:return new j(new L(S.Failure(n.failure)))}})}}class Ne{}Ne.__name__=!0;class Ee{constructor(){}}Ee.__name__=!0;class Ie extends Ee{constructor(e){super(),this.upcoming=e}}Ie.__name__=!0;class Z extends Ne{constructor(e){super(),this.target=e}static wrap(e,t){return new Z(new Oe(e,t))}}Z.__name__=!0;class G extends Ie{constructor(e){super(E.async(function(t){e.read().handle(function(r){let n=t,s;switch(r._hx_index){case 0:let u=r.data;s=u==null?C.End:C.Link(u,new G(e));break;case 1:s=C.Fail(r.failure);break}n(s)})},!0))}static wrap(e,t,r,n){return new G(new Me(e,t,r,n))}}G.__name__=!0;class Me{constructor(e,t,r,n){this.name=e,this.native=t,this.chunkSize=r;let s=E.async(function(u){t.once("end",function(){u(S.Success(null))}),t.once("error",function(l){u(S.Failure(new N(null,""+l.code+" - Failed reading from "+e+" because "+l.message,{fileName:"tink/io/nodejs/WrappedReadable.hx",lineNumber:22,className:"tink.io.nodejs.WrappedReadable",methodName:"new"})))})});s.eager(),this.end=s,n!=null&&this.end.handle(function(){process.nextTick(n)})}read(){let e=this;return E.first(E.async(function(t){let r=null;r=function(){try{let n=e.native.read(e.chunkSize);if(n==null)e.native.once("readable",r);else{let s=typeof n=="string"?new fe(n):n;t(S.Success(new pe(s)))}}catch(n){let s=F.caught(n).unwrap();t(S.Failure(N.withData(null,"Error while reading from "+e.name,s,{fileName:"tink/io/nodejs/WrappedReadable.hx",lineNumber:48,className:"tink.io.nodejs.WrappedReadable",methodName:"read"})))}},r()}),this.end)}}Me.__name__=!0;class Oe{constructor(e,t){this.name=e,this.native=t,this.ended=E.async(function(r){t.once("end",function(){r(S.Success(!1))}),t.once("finish",function(){r(S.Success(!1))}),t.once("close",function(){r(S.Success(!1))}),t.on("error",function(n){r(S.Failure(new N(null,""+n.code+": "+n.message,{fileName:"tink/io/nodejs/WrappedWritable.hx",lineNumber:24,className:"tink.io.nodejs.WrappedWritable",methodName:"new"})))})})}}Oe.__name__=!0;var C=M["tink.streams.Step"]={__ename__:!0,__constructs__:null,Link:(c=function(i,e){return{_hx_index:0,value:i,next:e,__enum__:"tink.streams.Step",toString:y}},c._hx_name="Link",c.__params__=["value","next"],c),Fail:(c=function(i){return{_hx_index:1,e:i,__enum__:"tink.streams.Step",toString:y}},c._hx_name="Fail",c.__params__=["e"],c),End:{_hx_name:"End",_hx_index:2,__enum__:"tink.streams.Step",toString:y}};C.__constructs__=[C.Link,C.Fail,C.End];function Re(i){return i instanceof Array?new de(i):i.iterator()}function Le(i,e){if(e==null)return null;e.__id__==null&&(e.__id__=ae.$haxeUID++);var t;return i.hx__closures__==null?i.hx__closures__={}:t=i.hx__closures__[e.__id__],t==null&&(t=e.bind(i),i.hx__closures__[e.__id__]=t),t}ae.$haxeUID|=0,String.fromCodePoint==null&&(String.fromCodePoint=function(i){return i<65536?String.fromCharCode(i):String.fromCharCode((i>>10)+55232)+String.fromCharCode((i&1023)+56320)}),String.__name__=!0,Array.__name__=!0,typeof performance<"u"&&typeof performance.now=="function"&&(o.now=performance.now.bind(performance)),O.__toStr={}.toString,g.formatMode=g.determineConsoleFormatMode(),g.logPrefix="<b,gray>><//> ",g.unicodeCompatibilityMode=Y.systemName()=="Windows"?1:0,g.unicodeCompatibilityEnabled=!1,g.formatTagPattern=new z("(\\\\)?<(/)?([^><{}\\s]*|{[^}<>]*})>","g"),P.newLine=Y.systemName()=="Windows"?`\r
`:`
`,k.depth=0,R._hx_skip_constructor=!1,E.NEVER=new Ae,P.main()})(global);
