(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
var js_node_ChildProcess = require("child_process");
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
	static random(x) {
		if(x <= 0) {
			return 0;
		} else {
			return Math.floor(Math.random() * x);
		}
	}
}
Std.__name__ = true;
class Sys {
	static environment() {
		let m = new haxe_ds_StringMap();
		let _g = 0;
		let _g1 = Reflect.fields(process.env);
		while(_g < _g1.length) {
			let key = _g1[_g];
			++_g;
			let v = process.env[key];
			m.h[key] = v;
		}
		return m;
	}
	static systemName() {
		let _g = process.platform;
		switch(_g) {
		case "darwin":
			return "Mac";
		case "freebsd":
			return "BSD";
		case "linux":
			return "Linux";
		case "win32":
			return "Windows";
		default:
			return _g;
		}
	}
}
Sys.__name__ = true;
class Reflect {
	static fields(o) {
		let a = [];
		if(o != null) {
			let hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
				a.push(f);
			}
			}
		}
		return a;
	}
}
Reflect.__name__ = true;
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""));
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	matched(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	matchedPos() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	matchSub(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			let b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			let b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	map(s,f) {
		let offset = 0;
		let buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			let p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
}
EReg.__name__ = true;
Object.assign(EReg.prototype, {
	__class__: EReg
});
class Console {
	static printlnFormatted(s,outputStream) {
		if(outputStream == null) {
			outputStream = 0;
		}
		if(s == null) {
			s = "";
		}
		Console.printFormatted(s + "\n",outputStream);
	}
	static println(s,outputStream) {
		if(outputStream == null) {
			outputStream = 0;
		}
		if(s == null) {
			s = "";
		}
		Console.print(s + "\n",outputStream);
	}
	static format(s,formatMode) {
		s += "<//>";
		let activeFormatFlagStack = [];
		let groupedProceedingTags = [];
		let browserFormatArguments = [];
		return { formatted : Console.formatTagPattern.map(s,function(e) {
			if(e.matched(1) != null) {
				return e.matched(0);
			}
			let open = e.matched(2) == null;
			let tags = e.matched(3).split(",");
			if(!open && tags.length == 1) {
				if(tags[0] == "") {
					let i = activeFormatFlagStack.indexOf(activeFormatFlagStack[activeFormatFlagStack.length - 1]);
					if(i != -1) {
						let proceedingTags = groupedProceedingTags[i];
						activeFormatFlagStack.splice(i - proceedingTags,proceedingTags + 1);
						groupedProceedingTags.splice(i - proceedingTags,proceedingTags + 1);
					}
				} else if(FormatFlag.fromString(tags[0]) == "reset") {
					activeFormatFlagStack = [];
					groupedProceedingTags = [];
				} else {
					let flag = FormatFlag.fromString(tags[0]);
					if(flag != null) {
						let i = activeFormatFlagStack.indexOf(flag);
						if(i != -1) {
							let proceedingTags = groupedProceedingTags[i];
							activeFormatFlagStack.splice(i - proceedingTags,proceedingTags + 1);
							groupedProceedingTags.splice(i - proceedingTags,proceedingTags + 1);
						}
					}
				}
			} else {
				let proceedingTags = 0;
				let _g = 0;
				while(_g < tags.length) {
					let flag = FormatFlag.fromString(tags[_g++]);
					if(flag == null) {
						return e.matched(0);
					}
					if(open) {
						activeFormatFlagStack.push(flag);
						groupedProceedingTags.push(proceedingTags);
						++proceedingTags;
					} else {
						let i = activeFormatFlagStack.indexOf(flag);
						if(i != -1) {
							let proceedingTags = groupedProceedingTags[i];
							activeFormatFlagStack.splice(i - proceedingTags,proceedingTags + 1);
							groupedProceedingTags.splice(i - proceedingTags,proceedingTags + 1);
						}
					}
				}
			}
			switch(formatMode) {
			case 0:
				if(open) {
					if(activeFormatFlagStack.length > 0) {
						let lastFlagCount = groupedProceedingTags[groupedProceedingTags.length - 1] + 1;
						let asciiFormatString = "";
						let _g = 0;
						while(_g < lastFlagCount) asciiFormatString += Console.getAsciiFormat(activeFormatFlagStack[groupedProceedingTags.length - 1 - _g++]);
						return asciiFormatString;
					} else {
						return "";
					}
				} else {
					let result = Console.getAsciiFormat("reset");
					let result1 = new Array(activeFormatFlagStack.length);
					let _g = 0;
					let _g1 = activeFormatFlagStack.length;
					while(_g < _g1) {
						let i = _g++;
						result1[i] = Console.getAsciiFormat(activeFormatFlagStack[i]);
					}
					let _g2 = [];
					let _g3 = 0;
					while(_g3 < result1.length) {
						let v = result1[_g3];
						++_g3;
						if(v != null) {
							_g2.push(v);
						}
					}
					return result + _g2.join("");
				}
				break;
			case 1:
				let browserFormatArguments1 = browserFormatArguments;
				let result = new Array(activeFormatFlagStack.length);
				let _g = 0;
				let _g1 = activeFormatFlagStack.length;
				while(_g < _g1) {
					let i = _g++;
					result[i] = Console.getBrowserFormat(activeFormatFlagStack[i]);
				}
				let _g2 = [];
				let _g3 = 0;
				while(_g3 < result.length) {
					let v = result[_g3];
					++_g3;
					if(v != null) {
						_g2.push(v);
					}
				}
				browserFormatArguments1.push(_g2.join(";"));
				return "%c";
			case 2:
				return "";
			}
		}), browserFormatArguments : browserFormatArguments};
	}
	static stripFormatting(s) {
		return Console.format(s,2).formatted;
	}
	static printFormatted(s,outputStream) {
		if(outputStream == null) {
			outputStream = 0;
		}
		if(s == null) {
			s = "";
		}
		let result = Console.format(s,Console.formatMode);
		if(Console.formatMode == 1) {
			let logArgs = [result.formatted].concat(result.browserFormatArguments);
			switch(outputStream) {
			case 1:
				console.warn.apply(console, logArgs);
				break;
			case 2:
				console.error.apply(console, logArgs);
				break;
			case 0:case 3:
				console.log.apply(console, logArgs);
				break;
			}
			return;
		}
		Console.print(result.formatted,outputStream);
	}
	static print(s,outputStream) {
		if(outputStream == null) {
			outputStream = 0;
		}
		if(s == null) {
			s = "";
		}
		if(Console.printIntercept != null) {
			if(!Console.printIntercept(s,outputStream)) {
				return;
			}
		}
		if(Console.unicodeCompatibilityMode == 1 && !Console.unicodeCompatibilityEnabled) {
			Console.exec("chcp 65001");
			Console.unicodeCompatibilityEnabled = true;
		}
		switch(outputStream) {
		case 1:case 2:
			new _$Sys_FileOutput(2).writeString(s);
			break;
		case 0:case 3:
			new _$Sys_FileOutput(1).writeString(s);
			break;
		}
	}
	static getAsciiFormat(flag) {
		if(flag.charAt(0) == "#") {
			let hex = HxOverrides.substr(flag,1,null);
			return "\x1B[38;5;" + Console.rgbToAscii256(Std.parseInt("0x" + HxOverrides.substr(hex,0,2)),Std.parseInt("0x" + HxOverrides.substr(hex,2,2)),Std.parseInt("0x" + HxOverrides.substr(hex,4,2))) + "m";
		}
		if(HxOverrides.substr(flag,0,3) == "bg#") {
			let hex = HxOverrides.substr(flag,3,null);
			return "\x1B[48;5;" + Console.rgbToAscii256(Std.parseInt("0x" + HxOverrides.substr(hex,0,2)),Std.parseInt("0x" + HxOverrides.substr(hex,2,2)),Std.parseInt("0x" + HxOverrides.substr(hex,4,2))) + "m";
		}
		switch(flag) {
		case "bg_black":
			return "\x1B[48;5;" + 0 + "m";
		case "bg_blue":
			return "\x1B[48;5;" + 4 + "m";
		case "bg_cyan":
			return "\x1B[48;5;" + 6 + "m";
		case "bg_green":
			return "\x1B[48;5;" + 2 + "m";
		case "bg_light_black":
			return "\x1B[48;5;" + 8 + "m";
		case "bg_light_blue":
			return "\x1B[48;5;" + 12 + "m";
		case "bg_light_cyan":
			return "\x1B[48;5;" + 14 + "m";
		case "bg_light_green":
			return "\x1B[48;5;" + 10 + "m";
		case "bg_light_magenta":
			return "\x1B[48;5;" + 13 + "m";
		case "bg_light_red":
			return "\x1B[48;5;" + 9 + "m";
		case "bg_light_white":
			return "\x1B[48;5;" + 15 + "m";
		case "bg_light_yellow":
			return "\x1B[48;5;" + 11 + "m";
		case "bg_magenta":
			return "\x1B[48;5;" + 5 + "m";
		case "bg_red":
			return "\x1B[48;5;" + 1 + "m";
		case "bg_white":
			return "\x1B[48;5;" + 7 + "m";
		case "bg_yellow":
			return "\x1B[48;5;" + 3 + "m";
		case "black":
			return "\x1B[38;5;" + 0 + "m";
		case "blink":
			return "\x1B[5m";
		case "blue":
			return "\x1B[38;5;" + 4 + "m";
		case "bold":
			return "\x1B[1m";
		case "cyan":
			return "\x1B[38;5;" + 6 + "m";
		case "dim":
			return "\x1B[2m";
		case "green":
			return "\x1B[38;5;" + 2 + "m";
		case "hidden":
			return "\x1B[8m";
		case "invert":
			return "\x1B[7m";
		case "italic":
			return "\x1B[3m";
		case "light_black":
			return "\x1B[38;5;" + 8 + "m";
		case "light_blue":
			return "\x1B[38;5;" + 12 + "m";
		case "light_cyan":
			return "\x1B[38;5;" + 14 + "m";
		case "light_green":
			return "\x1B[38;5;" + 10 + "m";
		case "light_magenta":
			return "\x1B[38;5;" + 13 + "m";
		case "light_red":
			return "\x1B[38;5;" + 9 + "m";
		case "light_white":
			return "\x1B[38;5;" + 15 + "m";
		case "light_yellow":
			return "\x1B[38;5;" + 11 + "m";
		case "magenta":
			return "\x1B[38;5;" + 5 + "m";
		case "red":
			return "\x1B[38;5;" + 1 + "m";
		case "reset":
			return "\x1B[m";
		case "underline":
			return "\x1B[4m";
		case "white":
			return "\x1B[38;5;" + 7 + "m";
		case "yellow":
			return "\x1B[38;5;" + 3 + "m";
		default:
			return "";
		}
	}
	static rgbToAscii256(r,g,b) {
		let nearIdx = function(c,set) {
			let delta = Infinity;
			let index = -1;
			let _g = 0;
			let _g1 = set.length;
			while(_g < _g1) {
				let i = _g++;
				let d = Math.abs(c - set[i]);
				if(d < delta) {
					delta = d;
					index = i;
				}
			}
			return index;
		};
		let colorSteps = [0,95,135,175,215,255];
		let ir = nearIdx(r,colorSteps);
		let ig = nearIdx(g,colorSteps);
		let ib = nearIdx(b,colorSteps);
		let jr = Math.round((r - 8) / 10);
		if(Math.abs(r - Math.max(Math.min(jr * 10 + 8,238),8)) + Math.abs(g - Math.max(Math.min(Math.round((g - 8) / 10) * 10 + 8,238),8)) + Math.abs(b - Math.max(Math.min(Math.round((b - 8) / 10) * 10 + 8,238),8)) < Math.abs(r - colorSteps[ir]) + Math.abs(g - colorSteps[ig]) + Math.abs(b - colorSteps[ib]) && r == g && g == b) {
			return jr + 232;
		} else {
			return 16 + ir * 36 + ig * 6 + ib;
		}
	}
	static getBrowserFormat(flag) {
		if(flag.charAt(0) == "#") {
			return "color: " + flag;
		}
		if(HxOverrides.substr(flag,0,3) == "bg#") {
			return "background-color: " + HxOverrides.substr(flag,2,null);
		}
		if(flag.charAt(0) == "{") {
			return HxOverrides.substr(flag,1,flag.length - 2);
		}
		switch(flag) {
		case "bg_black":
			return "background-color: black";
		case "bg_blue":
			return "background-color: blue";
		case "bg_cyan":
			return "background-color: cyan";
		case "bg_green":
			return "background-color: green";
		case "bg_light_black":
			return "background-color: gray";
		case "bg_light_blue":
			return "background-color: lightBlue";
		case "bg_light_cyan":
			return "background-color: lightCyan";
		case "bg_light_green":
			return "background-color: lightGreen";
		case "bg_light_magenta":
			return "background-color: lightPink";
		case "bg_light_red":
			return "background-color: salmon";
		case "bg_light_white":
			return "background-color: white";
		case "bg_light_yellow":
			return "background-color: lightYellow";
		case "bg_magenta":
			return "background-color: magenta";
		case "bg_red":
			return "background-color: red";
		case "bg_white":
			return "background-color: whiteSmoke";
		case "bg_yellow":
			return "background-color: gold";
		case "black":
			return "color: black";
		case "blink":
			return "text-decoration: blink";
		case "blue":
			return "color: blue";
		case "bold":
			return "font-weight: bold";
		case "cyan":
			return "color: cyan";
		case "dim":
			return "color: gray";
		case "green":
			return "color: green";
		case "hidden":
			return "visibility: hidden; color: white";
		case "invert":
			return "-webkit-filter: invert(100%); filter: invert(100%)";
		case "italic":
			return "font-style: italic";
		case "light_black":
			return "color: gray";
		case "light_blue":
			return "color: lightBlue";
		case "light_cyan":
			return "color: lightCyan";
		case "light_green":
			return "color: lightGreen";
		case "light_magenta":
			return "color: lightPink";
		case "light_red":
			return "color: salmon";
		case "light_white":
			return "color: white";
		case "light_yellow":
			return "color: #ffed88";
		case "magenta":
			return "color: magenta";
		case "red":
			return "color: red";
		case "reset":
			return "";
		case "underline":
			return "text-decoration: underline";
		case "white":
			return "color: whiteSmoke";
		case "yellow":
			return "color: #f5ba00";
		default:
			return "";
		}
	}
	static determineConsoleFormatMode() {
		if(typeof(window) != "undefined") {
			return 1;
		}
		let tputColors = Console.exec("tput colors");
		if(tputColors.exit == 0) {
			let tputResult = Std.parseInt(tputColors.stdout);
			if(tputResult != null && tputResult > 2) {
				return 0;
			}
		}
		let termEnv = Sys.environment().h["TERM"];
		if(termEnv != null && new EReg("cygwin|xterm|vt100","").match(termEnv)) {
			return 0;
		}
		return 2;
	}
	static exec(cmd,args) {
		let p = js_node_ChildProcess.spawnSync(cmd,args != null ? args : [],{ });
		let stdout = p.stdout == null ? "" : p.stdout.toString();
		if(stdout == null) {
			stdout = "";
		}
		return { exit : p.status, stdout : stdout};
	}
}
Console.__name__ = true;
class FormatFlag {
	static fromString(str) {
		str = str.toLowerCase();
		if(str.charAt(0) == "#" || HxOverrides.substr(str,0,3) == "bg#") {
			let hIdx = str.indexOf("#");
			let hex = HxOverrides.substr(str,hIdx + 1,null);
			if(hex.length == 3) {
				let a = hex.split("");
				hex = [a[0],a[0],a[1],a[1],a[2],a[2]].join("");
			}
			if(new EReg("[^0-9a-f]","i").match(hex) || hex.length < 6) {
				return "";
			}
			let normalized = str.substring(0,hIdx) + "#" + hex;
			return normalized;
		}
		switch(str) {
		case "!":
			return "invert";
		case "/":
			return "reset";
		case "b":
			return "bold";
		case "bg_gray":
			return "bg_light_black";
		case "gray":
			return "light_black";
		case "i":
			return "italic";
		case "u":
			return "underline";
		default:
			return str;
		}
	}
}
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class Lambda {
	static fold(it,f,first) {
		let x = $getIterator(it);
		while(x.hasNext()) first = f(x.next(),first);
		return first;
	}
	static find(it,f) {
		let v = $getIterator(it);
		while(v.hasNext()) {
			let v1 = v.next();
			if(f(v1)) {
				return v1;
			}
		}
		return null;
	}
}
Lambda.__name__ = true;
Math.__name__ = true;
class StringBuf {
	constructor() {
		this.b = "";
	}
	toString() {
		return this.b;
	}
}
StringBuf.__name__ = true;
Object.assign(StringBuf.prototype, {
	__class__: StringBuf
});
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
	static lpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		l -= s.length;
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		buf_b += s == null ? "null" : "" + s;
		return buf_b;
	}
	static rpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		buf_b = "" + (s == null ? "null" : "" + s);
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		return buf_b;
	}
}
StringTools.__name__ = true;
class haxe_io_Output {
	writeByte(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	writeBytes(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		let b = s.b;
		let k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	close() {
	}
	writeFullBytes(s,pos,len) {
		while(len > 0) {
			let k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	writeString(s,encoding) {
		let b = haxe_io_Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
}
haxe_io_Output.__name__ = true;
Object.assign(haxe_io_Output.prototype, {
	__class__: haxe_io_Output
});
class _$Sys_FileOutput extends haxe_io_Output {
	constructor(fd) {
		super();
		this.fd = fd;
	}
	writeByte(c) {
		js_node_Fs.writeSync(this.fd,String.fromCodePoint(c));
	}
	writeBytes(s,pos,len) {
		let data = s.b;
		return js_node_Fs.writeSync(this.fd,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length),pos,len);
	}
	writeString(s,encoding) {
		js_node_Fs.writeSync(this.fd,s);
	}
	flush() {
		js_node_Fs.fsyncSync(this.fd);
	}
	close() {
		js_node_Fs.closeSync(this.fd);
	}
}
_$Sys_FileOutput.__name__ = true;
_$Sys_FileOutput.__super__ = haxe_io_Output;
Object.assign(_$Sys_FileOutput.prototype, {
	__class__: _$Sys_FileOutput
});
class haxe_io_Input {
	readByte() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	readBytes(s,pos,len) {
		let k = len;
		let b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	close() {
	}
	readUntil(end) {
		let buf = new haxe_io_BytesBuffer();
		let last;
		while(true) {
			last = this.readByte();
			if(!(last != end)) {
				break;
			}
			buf.addByte(last);
		}
		return buf.getBytes().toString();
	}
}
haxe_io_Input.__name__ = true;
Object.assign(haxe_io_Input.prototype, {
	__class__: haxe_io_Input
});
class _$Sys_FileInput extends haxe_io_Input {
	constructor(fd) {
		super();
		this.fd = fd;
	}
	readByte() {
		let buf = js_node_buffer_Buffer.alloc(1);
		try {
			js_node_Fs.readSync(this.fd,buf,0,1,null);
		} catch( _g ) {
			let _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
			}
		}
		return buf[0];
	}
	readBytes(s,pos,len) {
		let data = s.b;
		let buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		try {
			return js_node_Fs.readSync(this.fd,buf,pos,len,null);
		} catch( _g ) {
			let _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
			}
		}
	}
	close() {
		js_node_Fs.closeSync(this.fd);
	}
}
_$Sys_FileInput.__name__ = true;
_$Sys_FileInput.__super__ = haxe_io_Input;
Object.assign(_$Sys_FileInput.prototype, {
	__class__: _$Sys_FileInput
});
class card_CardBuilder {
	static _new() {
		return new StringBuf();
	}
	static center(this1,text) {
		let text1 = "" + card_CardBuilder.repeat(this1," ",Math.floor((50 - card_CardBuilder.getLength(this1,text)) / 2)) + text;
		if(text1 == null) {
			text1 = "";
		}
		return card_CardBuilder.addLine(this1,"<green>│</>" + text1 + card_CardBuilder.repeat(this1," ",50 - card_CardBuilder.getLength(this1,text1)) + "<green>│</>");
	}
	static footer(this1) {
		return card_CardBuilder.addLine(this1,"<green>╰" + card_CardBuilder.repeat(this1,"─") + "╯</>");
	}
	static header(this1) {
		return card_CardBuilder.addLine(this1,"<green>╭" + card_CardBuilder.repeat(this1,"─") + "╮</>");
	}
	static label(this1,label,value) {
		let text = StringTools.lpad("<light_white>" + label + ":</> "," ",10 + "   ".length + "<light_white></>".length) + value;
		if(text == null) {
			text = "";
		}
		return card_CardBuilder.addLine(this1,"<green>│</>" + text + card_CardBuilder.repeat(this1," ",50 - card_CardBuilder.getLength(this1,text)) + "<green>│</>");
	}
	static line(this1,text) {
		if(text == null) {
			text = "";
		}
		return card_CardBuilder.addLine(this1,"<green>│</>" + text + card_CardBuilder.repeat(this1," ",50 - card_CardBuilder.getLength(this1,text)) + "<green>│</>");
	}
	static addLine(this1,text) {
		this1.b += Std.string("   " + text + card_Program.newLine);
		return this1;
	}
	static getLength(this1,text) {
		let _this_r = new RegExp("<[^<]*>","g".split("u").join(""));
		return text.replace(_this_r,"").length;
	}
	static repeat(this1,character,times) {
		if(times == null) {
			times = 50;
		}
		let _g = [];
		let _g1 = 0;
		while(_g1 < times) {
			++_g1;
			_g.push(character);
		}
		return _g.join("");
	}
}
class card_Program {
	constructor() {
		this.version = false;
		this.help = false;
	}
	run(rest) {
		if(this.help || this.version) {
			let v = this.help ? new tink_cli_doc_DefaultFormatter().format(tink_cli_Doc0.get()) : card_Version.get_packageVersion();
			process.stdout.write(Std.string(v));
			process.stdout.write("\n");
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
		}
		let this1 = card_CardBuilder._new();
		let this2 = card_CardBuilder.addLine(this1,"<green>╭" + card_CardBuilder.repeat(this1,"─") + "╮</>");
		let this3 = card_CardBuilder.addLine(this2,"<green>│</>" + card_CardBuilder.repeat(this2," ",50 - card_CardBuilder.getLength(this2,"")) + "<green>│</>");
		let text = "" + card_CardBuilder.repeat(this3," ",Math.floor((50 - card_CardBuilder.getLength(this3,"<light_white>MC2IT</>")) / 2)) + "<light_white>MC2IT</>";
		if(text == null) {
			text = "";
		}
		let this4 = card_CardBuilder.addLine(this3,"<green>│</>" + text + card_CardBuilder.repeat(this3," ",50 - card_CardBuilder.getLength(this3,text)) + "<green>│</>");
		let text1 = "" + card_CardBuilder.repeat(this4," ",Math.floor((50 - card_CardBuilder.getLength(this4,"<white>Distribution & Services</>")) / 2)) + "<white>Distribution & Services</>";
		if(text1 == null) {
			text1 = "";
		}
		let this5 = card_CardBuilder.addLine(this4,"<green>│</>" + text1 + card_CardBuilder.repeat(this4," ",50 - card_CardBuilder.getLength(this4,text1)) + "<green>│</>");
		let this6 = card_CardBuilder.addLine(this5,"<green>│</>" + card_CardBuilder.repeat(this5," ",50 - card_CardBuilder.getLength(this5,"")) + "<green>│</>");
		let text2 = StringTools.lpad("<light_white>" + "GitHub" + ":</> "," ",10 + "   ".length + "<light_white></>".length) + "<gray>https://github.com/</><cyan>mc2it</>";
		if(text2 == null) {
			text2 = "";
		}
		let this7 = card_CardBuilder.addLine(this6,"<green>│</>" + text2 + card_CardBuilder.repeat(this6," ",50 - card_CardBuilder.getLength(this6,text2)) + "<green>│</>");
		let text3 = StringTools.lpad("<light_white>" + "LinkedIn" + ":</> "," ",10 + "   ".length + "<light_white></>".length) + "<gray>https://linkedin.com/company/</><cyan>sab-entreprises-sab-international-</>";
		if(text3 == null) {
			text3 = "";
		}
		let this8 = card_CardBuilder.addLine(this7,"<green>│</>" + text3 + card_CardBuilder.repeat(this7," ",50 - card_CardBuilder.getLength(this7,text3)) + "<green>│</>");
		let this9 = card_CardBuilder.addLine(this8,"<green>│</>" + card_CardBuilder.repeat(this8," ",50 - card_CardBuilder.getLength(this8,"")) + "<green>│</>");
		let text4 = StringTools.lpad("<light_white>" + "Card" + ":</> "," ",10 + "   ".length + "<light_white></>".length) + "<yellow>npx</> <white>@mc2it/card</>";
		if(text4 == null) {
			text4 = "";
		}
		let this10 = card_CardBuilder.addLine(this9,"<green>│</>" + text4 + card_CardBuilder.repeat(this9," ",50 - card_CardBuilder.getLength(this9,text4)) + "<green>│</>");
		let text5 = StringTools.lpad("<light_white>" + "E-mail" + ":</> "," ",10 + "   ".length + "<light_white></>".length) + "<white>dev@mc2it.com</>";
		if(text5 == null) {
			text5 = "";
		}
		let this11 = card_CardBuilder.addLine(this10,"<green>│</>" + text5 + card_CardBuilder.repeat(this10," ",50 - card_CardBuilder.getLength(this10,text5)) + "<green>│</>");
		let text6 = StringTools.lpad("<light_white>" + "Web" + ":</> "," ",10 + "   ".length + "<light_white></>".length) + "<white>https://mc2it.com</>";
		if(text6 == null) {
			text6 = "";
		}
		let this12 = card_CardBuilder.addLine(this11,"<green>│</>" + text6 + card_CardBuilder.repeat(this11," ",50 - card_CardBuilder.getLength(this11,text6)) + "<green>│</>");
		let this13 = card_CardBuilder.addLine(this12,"<green>│</>" + card_CardBuilder.repeat(this12," ",50 - card_CardBuilder.getLength(this12,"")) + "<green>│</>");
		let builder = card_CardBuilder.addLine(this13,"<green>╰" + card_CardBuilder.repeat(this13,"─") + "╯</>");
		Console.formatMode = 0;
		Console.logPrefix = "";
		let s = Console.logPrefix + ("" + ("" + card_Program.newLine + Std.string(builder)));
		if(s == null) {
			s = "";
		}
		Console.printFormatted(s + "\n",0);
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
	}
	static main() {
		new tink_cli_Router0(new card_Program(),new tink_cli_prompt_RetryPrompt(5)).process(process.argv.slice(2)).handle(tink_Cli.exit);
	}
}
card_Program.__name__ = true;
Object.assign(card_Program.prototype, {
	__class__: card_Program
});
class card_Version {
	static get_gitCommitHash() {
		if(card_Version.gitCommitHash == null) {
			card_Version.gitCommitHash = "bb7ea5018ae320d2c64d472c3e6ff322527a016a";
		}
		return card_Version.gitCommitHash;
	}
	static get_haxeTarget() {
		return "js";
	}
	static get_haxeVersion() {
		return "4.2.4";
	}
	static get_packageVersion() {
		if(card_Version.packageVersion == null) {
			card_Version.packageVersion = "1.0.0";
		}
		return card_Version.packageVersion;
	}
}
card_Version.__name__ = true;
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:true,__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
class haxe_IMap {
}
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	unwrap() {
		return this.__nativeException;
	}
	toString() {
		return this.get_message();
	}
	get_message() {
		return this.message;
	}
	get_native() {
		return this.__nativeException;
	}
	static caught(value) {
		if(((value) instanceof haxe_Exception)) {
			return value;
		} else if(((value) instanceof Error)) {
			return new haxe_Exception(value.message,null,value);
		} else {
			return new haxe_ValueException(value,null,value);
		}
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
});
class haxe__$Int64__$_$_$Int64 {
	constructor(high,low) {
		this.high = high;
		this.low = low;
	}
}
haxe__$Int64__$_$_$Int64.__name__ = true;
Object.assign(haxe__$Int64__$_$_$Int64.prototype, {
	__class__: haxe__$Int64__$_$_$Int64
});
class haxe_Timer {
	constructor(time_ms) {
		let me = this;
		this.id = setInterval(function() {
			me.run();
		},time_ms);
	}
	stop() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	run() {
	}
	static delay(f,time_ms) {
		let t = new haxe_Timer(time_ms);
		t.run = function() {
			t.stop();
			f();
		};
		return t;
	}
}
haxe_Timer.__name__ = true;
Object.assign(haxe_Timer.prototype, {
	__class__: haxe_Timer
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
	unwrap() {
		return this.value;
	}
}
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
var haxe_ds_Either = $hxEnums["haxe.ds.Either"] = { __ename__:true,__constructs__:null
	,Left: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Either",toString:$estr}; },$_._hx_name="Left",$_.__params__ = ["v"],$_)
	,Right: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"haxe.ds.Either",toString:$estr}; },$_._hx_name="Right",$_.__params__ = ["v"],$_)
};
haxe_ds_Either.__constructs__ = [haxe_ds_Either.Left,haxe_ds_Either.Right];
class haxe_ds_ObjectMap {
	constructor() {
		this.h = { __keys__ : { }};
	}
}
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_ObjectMap.prototype, {
	__class__: haxe_ds_ObjectMap
});
var haxe_ds_Option = $hxEnums["haxe.ds.Option"] = { __ename__:true,__constructs__:null
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Option",toString:$estr}; },$_._hx_name="Some",$_.__params__ = ["v"],$_)
	,None: {_hx_name:"None",_hx_index:1,__enum__:"haxe.ds.Option",toString:$estr}
};
haxe_ds_Option.__constructs__ = [haxe_ds_Option.Some,haxe_ds_Option.None];
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
	}
}
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_StringMap.prototype, {
	__class__: haxe_ds_StringMap
});
class haxe_exceptions_PosException extends haxe_Exception {
	constructor(message,previous,pos) {
		super(message,previous);
		if(pos == null) {
			this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
		} else {
			this.posInfos = pos;
		}
	}
	toString() {
		return "" + super.toString() + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
}
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
Object.assign(haxe_exceptions_PosException.prototype, {
	__class__: haxe_exceptions_PosException
});
class haxe_exceptions_NotImplementedException extends haxe_exceptions_PosException {
	constructor(message,previous,pos) {
		if(message == null) {
			message = "Not implemented";
		}
		super(message,previous,pos);
	}
}
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
Object.assign(haxe_exceptions_NotImplementedException.prototype, {
	__class__: haxe_exceptions_NotImplementedException
});
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	blit(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	sub(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let code = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	toString() {
		return this.getString(0,this.length);
	}
	toHex() {
		let s_b = "";
		let chars = [];
		let str = "0123456789abcdef";
		let _g = 0;
		let _g1 = str.length;
		while(_g < _g1) chars.push(HxOverrides.cca(str,_g++));
		let _g2 = 0;
		let _g3 = this.length;
		while(_g2 < _g3) {
			let c = this.b[_g2++];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
	static ofData(b) {
		let hb = b.hxBytes;
		if(hb != null) {
			return hb;
		}
		return new haxe_io_Bytes(b);
	}
}
haxe_io_Bytes.__name__ = true;
Object.assign(haxe_io_Bytes.prototype, {
	__class__: haxe_io_Bytes
});
class haxe_io_BytesBuffer {
	constructor() {
		this.pos = 0;
		this.size = 0;
	}
	addByte(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	grow(delta) {
		let req = this.pos + delta;
		let nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		let nbuf = new ArrayBuffer(nsize);
		let nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	getBytes() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		let b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
}
haxe_io_BytesBuffer.__name__ = true;
Object.assign(haxe_io_BytesBuffer.prototype, {
	__class__: haxe_io_BytesBuffer
});
class haxe_io_BytesInput extends haxe_io_Input {
	constructor(b,pos,len) {
		super();
		if(pos == null) {
			pos = 0;
		}
		if(len == null) {
			len = b.length - pos;
		}
		if(pos < 0 || len < 0 || pos + len > b.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		this.b = b.b;
		this.pos = pos;
		this.len = len;
		this.totlen = len;
	}
	readByte() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
	readBytes(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.len == 0 && len > 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		if(this.len < len) {
			len = this.len;
		}
		let b1 = this.b;
		let b2 = buf.b;
		let _g = 0;
		let _g1 = len;
		while(_g < _g1) {
			let i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
}
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
Object.assign(haxe_io_BytesInput.prototype, {
	__class__: haxe_io_BytesInput
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
class haxe_io_Eof {
	constructor() {
	}
	toString() {
		return "Eof";
	}
}
haxe_io_Eof.__name__ = true;
Object.assign(haxe_io_Eof.prototype, {
	__class__: haxe_io_Eof
});
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
class haxe_io_FPHelper {
	static i64ToDouble(low,high) {
		haxe_io_FPHelper.helper.setInt32(0,low,true);
		haxe_io_FPHelper.helper.setInt32(4,high,true);
		return haxe_io_FPHelper.helper.getFloat64(0,true);
	}
	static doubleToI64(v) {
		let i64 = haxe_io_FPHelper.i64tmp;
		haxe_io_FPHelper.helper.setFloat64(0,v,true);
		i64.low = haxe_io_FPHelper.helper.getInt32(0,true);
		i64.high = haxe_io_FPHelper.helper.getInt32(4,true);
		return i64;
	}
}
haxe_io_FPHelper.__name__ = true;
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
	static __interfLoop(cc,cl) {
		while(true) {
			if(cc == null) {
				return false;
			}
			if(cc == cl) {
				return true;
			}
			let intf = cc.__interfaces__;
			if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
				let _g = 0;
				let _g1 = intf.length;
				while(_g < _g1) {
					let i = intf[_g++];
					if(i == cl || js_Boot.__interfLoop(i,cl)) {
						return true;
					}
				}
			}
			cc = cc.__super__;
		}
	}
	static __instanceof(o,cl) {
		if(cl == null) {
			return false;
		}
		switch(cl) {
		case Array:
			return ((o) instanceof Array);
		case Bool:
			return typeof(o) == "boolean";
		case Dynamic:
			return o != null;
		case Float:
			return typeof(o) == "number";
		case Int:
			if(typeof(o) == "number") {
				return ((o | 0) === o);
			} else {
				return false;
			}
			break;
		case String:
			return typeof(o) == "string";
		default:
			if(o != null) {
				if(typeof(cl) == "function") {
					if(js_Boot.__downcastCheck(o,cl)) {
						return true;
					}
				} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
					if(((o) instanceof cl)) {
						return true;
					}
				}
			} else {
				return false;
			}
			if(cl == Class ? o.__name__ != null : false) {
				return true;
			}
			if(cl == Enum ? o.__ename__ != null : false) {
				return true;
			}
			return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
		}
	}
	static __downcastCheck(o,cl) {
		if(!((o) instanceof cl)) {
			if(cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static __implements(o,iface) {
		return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __isNativeObj(o) {
		return js_Boot.__nativeClassName(o) != null;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = true;
var js_node_Fs = require("fs");
class js_node_KeyValue {
	static get_key(this1) {
		return this1[0];
	}
	static get_value(this1) {
		return this1[1];
	}
}
var js_node_Readline = require("readline");
var js_node_buffer_Buffer = require("buffer").Buffer;
class js_node_buffer__$Buffer_Helper {
	static bytesOfBuffer(b) {
		let o = Object.create(haxe_io_Bytes.prototype);
		o.length = b.byteLength;
		o.b = b;
		b.bufferValue = b;
		b.hxBytes = o;
		b.bytes = b;
		return o;
	}
}
js_node_buffer__$Buffer_Helper.__name__ = true;
var js_node_stream_PassThrough = require("stream").PassThrough;
class js_node_stream_WritableNewOptionsAdapter {
	static from(options) {
		if(!Object.prototype.hasOwnProperty.call(options,"final")) {
			Object.defineProperty(options,"final",{ get : function() {
				return options.final_;
			}});
		}
		return options;
	}
}
class js_node_url_URLSearchParamsEntry {
	static _new(name,value) {
		return [name,value];
	}
	static get_name(this1) {
		return this1[0];
	}
	static get_value(this1) {
		return this1[1];
	}
}
class tink_chunk_ChunkBase {
	getCursor() {
		if(this.flattened == null) {
			this.flatten(this.flattened = []);
		}
		return tink_chunk_ChunkCursor.create(this.flattened.slice());
	}
	flatten(into) {
	}
}
tink_chunk_ChunkBase.__name__ = true;
Object.assign(tink_chunk_ChunkBase.prototype, {
	__class__: tink_chunk_ChunkBase
});
class tink_chunk_ChunkObject {
}
tink_chunk_ChunkObject.__name__ = true;
tink_chunk_ChunkObject.__isInterface__ = true;
Object.assign(tink_chunk_ChunkObject.prototype, {
	__class__: tink_chunk_ChunkObject
});
class tink__$Chunk_EmptyChunk extends tink_chunk_ChunkBase {
	constructor() {
		super();
	}
	getByte(i) {
		return 0;
	}
	getLength() {
		return 0;
	}
	slice(from,to) {
		return this;
	}
	blitTo(target,offset) {
	}
	toString() {
		return "";
	}
	toBytes() {
		return tink__$Chunk_EmptyChunk.EMPTY;
	}
}
tink__$Chunk_EmptyChunk.__name__ = true;
tink__$Chunk_EmptyChunk.__interfaces__ = [tink_chunk_ChunkObject];
tink__$Chunk_EmptyChunk.__super__ = tink_chunk_ChunkBase;
Object.assign(tink__$Chunk_EmptyChunk.prototype, {
	__class__: tink__$Chunk_EmptyChunk
});
class tink_Chunk {
	static get_length(this1) {
		return this1.getLength();
	}
	static getByte(this1,i) {
		return this1.getByte(i);
	}
	static concat(this1,that) {
		return tink_chunk_CompoundChunk.cons(this1,that);
	}
	static cursor(this1) {
		return this1.getCursor();
	}
	static iterator(this1) {
		return new tink_chunk_ChunkIterator(this1.getCursor());
	}
	static sub(this1,pos,len) {
		return this1.slice(pos,pos + len);
	}
	static slice(this1,from,to) {
		return this1.slice(from,to);
	}
	static blitTo(this1,target,offset) {
		this1.blitTo(target,offset);
	}
	static toHex(this1) {
		return this1.toBytes().toHex();
	}
	static toString(this1) {
		return this1.toString();
	}
	static toBytes(this1) {
		return this1.toBytes();
	}
	static toBuffer(this1) {
		let b = this1.toBytes();
		let data = b.b;
		return js_node_buffer_Buffer.from(data.buffer,data.byteOffset,b.length);
	}
	static join(chunks) {
		if(chunks == null) {
			return tink_Chunk.EMPTY;
		} else {
			switch(chunks.length) {
			case 0:
				return tink_Chunk.EMPTY;
			case 1:
				return chunks[0];
			default:
				let ret = tink_Chunk.concat(chunks[0],chunks[1]);
				let _g = 2;
				let _g1 = chunks.length;
				while(_g < _g1) ret = tink_Chunk.concat(ret,chunks[_g++]);
				return ret;
			}
		}
	}
	static ofBytes(b) {
		return tink_chunk_ByteChunk.of(b);
	}
	static ofString(s) {
		return tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(s));
	}
	static ofBuffer(b) {
		return new tink_chunk_nodejs_BufferChunk(b);
	}
	static ofByte(byte) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(1));
		bytes.b[0] = byte;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static ofHex(s) {
		let length = s.length >> 1;
		let bytes = new haxe_io_Bytes(new ArrayBuffer(length));
		let _g = 0;
		while(_g < length) {
			let i = _g++;
			bytes.b[i] = Std.parseInt("0x" + HxOverrides.substr(s,i * 2,2));
		}
		return tink_chunk_ByteChunk.of(bytes);
	}
	static parseHex(v) {
		return Std.parseInt("0x" + v);
	}
	static catChunk(a,b) {
		return tink_Chunk.concat(a,b);
	}
	static rcatString(a,b) {
		return tink_Chunk.concat(a,tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(b)));
	}
	static lcatString(a,b) {
		return tink_Chunk.concat(tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(a)),b);
	}
	static lcatBytes(a,b) {
		return tink_Chunk.concat(tink_chunk_ByteChunk.of(a),b);
	}
	static rcatBytes(a,b) {
		return tink_Chunk.concat(a,tink_chunk_ByteChunk.of(b));
	}
	static eqChunk(a,b) {
		return a.toString() == b.toString();
	}
	static reqString(a,b) {
		return a.toString() == b.toString();
	}
	static leqString(a,b) {
		return a.toString() == b.toString();
	}
	static leqBytes(a,b) {
		return a.toString() == b.toString();
	}
	static reqBytes(a,b) {
		return a.toString() == b.toString();
	}
}
class tink_Cli {
	static exit(result) {
		switch(result._hx_index) {
		case 0:
			process.exit(0);
			break;
		case 1:
			let _g = result.failure;
			let message = _g.message;
			if(_g.data != null) {
				message += ", " + (_g.data == null ? "null" : Std.string(_g.data));
			}
			process.stdout.write(Std.string(message));
			process.stdout.write("\n");
			let code = _g.code;
			process.exit(code);
			break;
		}
	}
}
tink_Cli.__name__ = true;
class tink_Stringly {
	static isNumber(s,allowFloat) {
		if(s.length == 0) {
			return false;
		}
		let pos = 0;
		let max = s.length;
		if(0 < max && s.charCodeAt(0) == 45) {
			pos = 1;
		}
		if(!allowFloat) {
			if(pos < max && s.charCodeAt(pos) == 48 && pos++ > -1) {
				if(pos < max && s.charCodeAt(pos) == 120) {
					++pos;
				}
			}
		}
		while(pos < max && (s.charCodeAt(pos) ^ 48) < 10) ++pos;
		if(allowFloat && pos < max) {
			if(pos < max && s.charCodeAt(pos) == 46 && pos++ > -1) {
				while(pos < max && (s.charCodeAt(pos) ^ 48) < 10) ++pos;
			}
			if(pos < max && s.charCodeAt(pos) == 101 && pos++ > -1 || pos < max && s.charCodeAt(pos) == 69 && pos++ > -1) {
				if(!(pos < max && s.charCodeAt(pos) == 43 && pos++ > -1)) {
					if(pos < max && s.charCodeAt(pos) == 45) {
						++pos;
					}
				}
				while(pos < max && (s.charCodeAt(pos) ^ 48) < 10) ++pos;
			}
		}
		return pos == max;
	}
	static toBool(this1) {
		if(this1 != null) {
			switch(StringTools.trim(this1).toLowerCase()) {
			case "0":case "false":case "no":
				return false;
			default:
				return true;
			}
		} else {
			return false;
		}
	}
	static isFloat(this1) {
		return tink_Stringly.isNumber(StringTools.trim(this1),true);
	}
	static parseFloat(this1) {
		let _g = StringTools.trim(this1);
		if(tink_Stringly.isNumber(_g,true)) {
			return tink_core_Outcome.Success(parseFloat(_g));
		} else {
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"" + _g + " (encoded as " + this1 + ") is not a valid float",{ fileName : "tink/Stringly.hx", lineNumber : 65, className : "tink._Stringly.Stringly_Impl_", methodName : "parseFloat"}));
		}
	}
	static toFloat(this1) {
		return tink_core_OutcomeTools.sure(tink_Stringly.parseFloat(this1));
	}
	static isInt(this1) {
		return tink_Stringly.isNumber(StringTools.trim(this1),false);
	}
	static parseInt(this1) {
		let _g = StringTools.trim(this1);
		if(tink_Stringly.isNumber(_g,false)) {
			return tink_core_Outcome.Success(Std.parseInt(_g));
		} else {
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"" + _g + " (encoded as " + this1 + ") is not a valid integer",{ fileName : "tink/Stringly.hx", lineNumber : 80, className : "tink._Stringly.Stringly_Impl_", methodName : "parseInt"}));
		}
	}
	static toInt(this1) {
		return tink_core_OutcomeTools.sure(tink_Stringly.parseInt(this1));
	}
	static parseDate(this1) {
		let _g = tink_Stringly.parseFloat(this1);
		switch(_g._hx_index) {
		case 0:
			return tink_core_Outcome.Success(new Date(_g.data));
		case 1:
			if(!tink_Stringly.SUPPORTED_DATE_REGEX.match(this1)) {
				return tink_core_Outcome.Failure(new tink_core_TypedError(422,"" + this1 + " is not a valid date",{ fileName : "tink/Stringly.hx", lineNumber : 101, className : "tink._Stringly.Stringly_Impl_", methodName : "parseDate"}));
			}
			let date = new Date(this1);
			let f = date.getTime();
			if(isNaN(f)) {
				return tink_core_Outcome.Failure(new tink_core_TypedError(422,"" + this1 + " is not a valid date",{ fileName : "tink/Stringly.hx", lineNumber : 104, className : "tink._Stringly.Stringly_Impl_", methodName : "parseDate"}));
			} else {
				return tink_core_Outcome.Success(date);
			}
			break;
		}
	}
	static toDate(this1) {
		return tink_core_OutcomeTools.sure(tink_Stringly.parseDate(this1));
	}
	static parse(this1,f) {
		let _g = f;
		let a1 = this1;
		return tink_core_TypedError.catchExceptions(function() {
			return _g(a1);
		},null,{ fileName : "tink/Stringly.hx", lineNumber : 164, className : "tink._Stringly.Stringly_Impl_", methodName : "parse"});
	}
	static ofBool(b) {
		if(b) {
			return "true";
		} else {
			return "false";
		}
	}
	static ofInt(i) {
		if(i == null) {
			return "null";
		} else {
			return "" + i;
		}
	}
	static ofFloat(f) {
		if(f == null) {
			return "null";
		} else {
			return "" + f;
		}
	}
	static ofDate(d) {
		let f = d.getTime();
		if(f == null) {
			return "null";
		} else {
			return "" + f;
		}
	}
}
class tink_chunk_ByteChunk extends tink_chunk_ChunkBase {
	constructor(data,from,to) {
		super();
		this.data = data;
		this.from = from;
		this.to = to;
	}
	get_wrapped() {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		return this.wrapped;
	}
	getByte(index) {
		return this.data.bytes[this.from + index];
	}
	flatten(into) {
		into.push(this);
	}
	getLength() {
		return this.to - this.from;
	}
	getSlice(from,to) {
		if(to > this.to - this.from) {
			to = this.to - this.from;
		}
		if(from < 0) {
			from = 0;
		}
		if(to <= from) {
			return null;
		} else if(to == this.to - this.from && from == 0) {
			return this;
		} else {
			return new tink_chunk_ByteChunk(this.data,this.from + from,to + this.from);
		}
	}
	slice(from,to) {
		let _g = this.getSlice(from,to);
		if(_g == null) {
			return tink_Chunk.EMPTY;
		} else {
			return _g;
		}
	}
	blitTo(target,offset) {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		target.blit(offset,this.wrapped,this.from,this.to - this.from);
	}
	toBytes() {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		return this.wrapped.sub(this.from,this.to - this.from);
	}
	toString() {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		return this.wrapped.getString(this.from,this.to - this.from);
	}
	static of(b) {
		if(b.length == 0) {
			return tink_Chunk.EMPTY;
		}
		let ret = new tink_chunk_ByteChunk(b.b.bufferValue,0,b.length);
		ret.wrapped = b;
		return ret;
	}
}
tink_chunk_ByteChunk.__name__ = true;
tink_chunk_ByteChunk.__interfaces__ = [tink_chunk_ChunkObject];
tink_chunk_ByteChunk.__super__ = tink_chunk_ChunkBase;
Object.assign(tink_chunk_ByteChunk.prototype, {
	__class__: tink_chunk_ByteChunk
});
class tink_chunk_ChunkCursor {
	constructor() {
		this.currentByte = -1;
		this.currentPos = 0;
		this.length = 0;
		this.curLength = 0;
		this.curOffset = 0;
		this.curPartIndex = 0;
	}
	clone() {
		let ret = new tink_chunk_ChunkCursor();
		ret.parts = this.parts.slice();
		ret.curPart = this.curPart;
		ret.curPartIndex = this.curPartIndex;
		ret.curOffset = this.curOffset;
		ret.curLength = this.curLength;
		ret.length = this.length;
		ret.currentPos = this.currentPos;
		ret.currentByte = this.currentByte;
		return ret;
	}
	reset() {
		this.length = 0;
		this.currentPos = 0;
		this.currentByte = -1;
		this.curOffset = 0;
		let _g = 0;
		let _g1 = this.parts;
		while(_g < _g1.length) {
			let p = _g1[_g];
			++_g;
			this.length += p.to - p.from;
		}
		this.curPartIndex = 0;
		this.curPart = this.parts[0];
		if(this.curPart != null) {
			let _this = this.curPart;
			this.curLength = _this.to - _this.from;
			let _this1 = this.curPart;
			this.currentByte = _this1.data.bytes[_this1.from];
		}
	}
	flush() {
		let ret = this.left();
		this.shift();
		return ret;
	}
	prune() {
		this.shift();
	}
	add(chunk) {
		chunk.flatten(this.parts);
		this.reset();
	}
	shift(chunk) {
		this.parts.splice(0,this.curPartIndex);
		let _g = this.parts[0];
		if(_g != null) {
			let _g1 = _g.getSlice(this.curOffset,this.curLength);
			if(_g1 == null) {
				this.parts.shift();
			} else {
				this.parts[0] = _g1;
			}
		}
		if(chunk != null) {
			this.add(chunk);
		} else {
			this.reset();
		}
	}
	clear() {
		this.parts = [];
		this.reset();
	}
	left() {
		if(this.curPart == null) {
			return tink_Chunk.EMPTY;
		}
		let _g = [];
		let _g1 = 0;
		let _g2 = this.curPartIndex;
		while(_g1 < _g2) _g.push(this.parts[_g1++]);
		_g.push(this.curPart.slice(0,this.curOffset));
		return tink_Chunk.join(_g);
	}
	right() {
		if(this.curPart == null) {
			return tink_Chunk.EMPTY;
		}
		let _g = [];
		let _g1 = this.curPartIndex;
		let _g2 = this.parts.length;
		while(_g1 < _g2) _g.push(this.parts[_g1++]);
		if(_g.length > 0) {
			_g[0] = this.curPart.slice(this.curOffset,this.curLength);
		}
		return tink_Chunk.join(_g);
	}
	seek(seekable,options) {
		if(this.curPart == null || seekable == null || seekable.length == 0) {
			return haxe_ds_Option.None;
		}
		let max = seekable.length - 1;
		let first = seekable[0];
		let candidates = [];
		let count = 0;
		let copy = this.clone();
		copy.shift();
		let _gthis = this;
		let part = function(b,offset) {
			let data = b.data;
			let _g = b.from + offset;
			let _g1 = b.to;
			while(_g < _g1) {
				let i = _g++;
				let byte = data.bytes[i];
				if(candidates.length > 0) {
					let c = 0;
					while(c < count) {
						let pos = candidates[c];
						if(seekable[pos] == byte) {
							if(pos == max) {
								copy.moveTo(copy.currentPos + (i - (b.from + offset) - seekable.length + 1));
								let before = copy.left();
								let delta = before.getLength() + seekable.length;
								_gthis.moveTo(_gthis.currentPos + delta);
								if(options == null) {
									_gthis.shift();
								} else {
									let _g = options.withoutPruning;
									if(_g == null) {
										_gthis.shift();
									} else if(_g == false) {
										_gthis.shift();
									}
								}
								return haxe_ds_Option.Some(before);
							} else {
								candidates[c++] = pos + 1;
							}
						} else {
							count -= 1;
							let last = candidates.pop();
							if(count > c) {
								candidates[c] = last;
							}
						}
					}
				}
				if(byte == first) {
					count = candidates.push(1);
				}
			}
			copy.moveTo(copy.currentPos + (b.to - (b.from + offset)));
			return haxe_ds_Option.None;
		};
		let _g = part(this.curPart,this.curOffset);
		if(_g._hx_index == 1) {
			let _g = this.curPartIndex + 1;
			let _g1 = this.parts.length;
			while(_g < _g1) {
				let _g1 = part(this.parts[_g++],0);
				switch(_g1._hx_index) {
				case 0:
					return haxe_ds_Option.Some(_g1.v);
				case 1:
					break;
				}
			}
			return haxe_ds_Option.None;
		} else {
			return _g;
		}
	}
	sweep(len) {
		let data = this.right().slice(0,len);
		this.moveTo(this.currentPos + len);
		return data;
	}
	sweepTo(pos) {
		return this.sweep(pos - this.currentPos);
	}
	moveBy(delta) {
		return this.moveTo(this.currentPos + delta);
	}
	moveTo(position) {
		if(this.length == 0) {
			return 0;
		}
		if(position > this.length) {
			position = this.length - 1;
		}
		if(position < 0) {
			position = 0;
		}
		this.currentPos = position;
		if(position == this.length) {
			this.ffwd();
		} else {
			let _g = 0;
			let _g1 = this.parts.length;
			while(_g < _g1) {
				let i = _g++;
				let c = this.parts[i];
				let _g1 = c.to - c.from;
				if(_g1 > position) {
					this.curPart = c;
					this.curPartIndex = i;
					this.curOffset = position;
					this.curLength = c.to - c.from;
					this.currentByte = c.data.bytes[c.from + position];
					break;
				} else {
					position -= _g1;
				}
			}
		}
		return this.currentPos;
	}
	ffwd() {
		this.currentByte = -1;
		this.curLength = 0;
		this.curOffset = 0;
		this.curPart = null;
		this.curPartIndex = this.parts.length;
	}
	next() {
		if(this.currentPos == this.length) {
			return false;
		}
		this.currentPos++;
		if(this.currentPos == this.length) {
			this.ffwd();
			return false;
		}
		if(this.curOffset == this.curLength - 1) {
			this.curOffset = 0;
			this.curPart = this.parts[++this.curPartIndex];
			let _this = this.curPart;
			this.curLength = _this.to - _this.from;
			let _this1 = this.curPart;
			this.currentByte = _this1.data.bytes[_this1.from];
		} else {
			let _this = this.curPart;
			this.currentByte = _this.data.bytes[_this.from + ++this.curOffset];
		}
		return true;
	}
	static create(parts) {
		let ret = new tink_chunk_ChunkCursor();
		ret.parts = parts;
		ret.reset();
		return ret;
	}
}
tink_chunk_ChunkCursor.__name__ = true;
Object.assign(tink_chunk_ChunkCursor.prototype, {
	__class__: tink_chunk_ChunkCursor
});
class tink_chunk_ChunkIterator {
	constructor(target) {
		this.target = target;
		this._hasNext = target.length > target.currentPos;
	}
	hasNext() {
		return this._hasNext;
	}
	next() {
		let ret = this.target.currentByte;
		this._hasNext = this.target.next();
		return ret;
	}
}
tink_chunk_ChunkIterator.__name__ = true;
Object.assign(tink_chunk_ChunkIterator.prototype, {
	__class__: tink_chunk_ChunkIterator
});
class tink_chunk_ChunkTools {
	static readUInt8(chunk,offset) {
		if(chunk.getLength() < offset + 1) {
			throw haxe_Exception.thrown("Out of range (chunk length = " + chunk.getLength() + ", read offset = " + offset + ", read length = " + 1 + ")");
		}
		return chunk.getByte(offset);
	}
	static readInt8(chunk,offset) {
		let val = tink_chunk_ChunkTools.readUInt8(chunk,offset);
		if(val > 127) {
			return val - 256;
		} else {
			return val;
		}
	}
	static readUInt16LE(chunk,offset) {
		if(chunk.getLength() < offset + 2) {
			throw haxe_Exception.thrown("Out of range (chunk length = " + chunk.getLength() + ", read offset = " + offset + ", read length = " + 2 + ")");
		}
		return chunk.getByte(offset) + (chunk.getByte(offset + 1) << 8);
	}
	static readInt16LE(chunk,offset) {
		let val = tink_chunk_ChunkTools.readUInt16LE(chunk,offset);
		if(val > 32767) {
			return val - 65536;
		} else {
			return val;
		}
	}
	static readUInt24LE(chunk,offset) {
		if(chunk.getLength() < offset + 3) {
			throw haxe_Exception.thrown("Out of range (chunk length = " + chunk.getLength() + ", read offset = " + offset + ", read length = " + 3 + ")");
		}
		return chunk.getByte(offset) + (chunk.getByte(offset + 1) << 8) + (chunk.getByte(offset + 2) << 16);
	}
	static readInt24LE(chunk,offset) {
		let val = tink_chunk_ChunkTools.readUInt24LE(chunk,offset);
		if(val > 8388607) {
			return val - 16777216;
		} else {
			return val;
		}
	}
	static readInt32LE(chunk,offset) {
		if(chunk.getLength() < offset + 4) {
			throw haxe_Exception.thrown("Out of range (chunk length = " + chunk.getLength() + ", read offset = " + offset + ", read length = " + 4 + ")");
		}
		return chunk.getByte(offset) + (chunk.getByte(offset + 1) << 8) + (chunk.getByte(offset + 2) << 16) + (chunk.getByte(offset + 3) << 24);
	}
	static readDoubleLE(chunk,offset) {
		return haxe_io_FPHelper.i64ToDouble(tink_chunk_ChunkTools.readInt32LE(chunk,0),tink_chunk_ChunkTools.readInt32LE(chunk,4));
	}
	static readNullTerminatedString(chunk,offset) {
		try {
			return new haxe_io_BytesInput(chunk.toBytes(),offset).readUntil(0);
		} catch( _g ) {
			return chunk.toString();
		}
	}
	static writeUInt8(v) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(1));
		bytes.b[0] = v & 255;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static writeInt8(v) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(1));
		v &= 255;
		if(v < 0) {
			v += 256;
		}
		bytes.b[0] = v;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static writeUInt16LE(v) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(2));
		bytes.b[0] = v & 255;
		bytes.b[1] = v >>> 8 & 255;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static writeInt16LE(v) {
		return tink_chunk_ChunkTools.writeUInt16LE(v);
	}
	static writeUInt24LE(v) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(3));
		bytes.b[0] = v & 255;
		bytes.b[1] = v >>> 8 & 255;
		bytes.b[2] = v >>> 16 & 255;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static writeInt24LE(v) {
		return tink_chunk_ChunkTools.writeUInt24LE(v);
	}
	static writeInt32LE(v) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(4));
		bytes.b[0] = v & 255;
		bytes.b[1] = v >>> 8 & 255;
		bytes.b[2] = v >>> 16 & 255;
		bytes.b[3] = v >>> 24 & 255;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static writeDoubleLE(v) {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(8));
		let i64 = haxe_io_FPHelper.doubleToI64(v);
		let l = i64.low;
		let h = i64.high;
		bytes.b[0] = l & 255;
		bytes.b[1] = l >>> 8 & 255;
		bytes.b[2] = l >>> 16 & 255;
		bytes.b[3] = l >>> 24 & 255;
		bytes.b[4] = h & 255;
		bytes.b[5] = h >>> 8 & 255;
		bytes.b[6] = h >>> 16 & 255;
		bytes.b[7] = h >>> 24 & 255;
		return tink_chunk_ByteChunk.of(bytes);
	}
	static lpad(chunk,pad,length) {
		if(pad.getLength() != 0) {
			while(chunk.getLength() < length) chunk = tink_Chunk.concat(pad,chunk);
		}
		return chunk;
	}
	static rpad(chunk,pad,length) {
		if(pad.getLength() != 0) {
			while(chunk.getLength() < length) chunk = tink_Chunk.concat(chunk,pad);
		}
		return chunk;
	}
	static check(chunk,offset,length) {
		if(chunk.getLength() < offset + length) {
			throw haxe_Exception.thrown("Out of range (chunk length = " + chunk.getLength() + ", read offset = " + offset + ", read length = " + length + ")");
		}
	}
}
tink_chunk_ChunkTools.__name__ = true;
class tink_chunk_CompoundChunk extends tink_chunk_ChunkBase {
	constructor() {
		super();
	}
	getByte(i) {
		let index = this.findChunk(i);
		return this.chunks[index].getByte(i - this.offsets[index]);
	}
	getLength() {
		return this.length;
	}
	findChunk(target) {
		let min = 0;
		let max = this.offsets.length - 1;
		while(min + 1 < max) {
			let guess = min + max >> 1;
			if(this.offsets[guess] > target) {
				max = guess;
			} else {
				min = guess;
			}
		}
		return min;
	}
	flatten(into) {
		let _g = 0;
		let _g1 = this.chunks;
		while(_g < _g1.length) _g1[_g++].flatten(into);
	}
	slice(from,to) {
		let idxFrom = this.findChunk(from);
		let idxTo = this.findChunk(to);
		if(idxFrom == idxTo) {
			let offset = this.offsets[idxFrom];
			return this.chunks[idxFrom].slice(from - offset,to - offset);
		}
		let ret = this.chunks.slice(idxFrom,idxTo + 1);
		ret[0] = ret[0].slice(from - this.offsets[idxFrom],this.offsets[idxFrom + 1]);
		ret[ret.length - 1] = ret[ret.length - 1].slice(0,to - this.offsets[idxTo]);
		return tink_chunk_CompoundChunk.create(ret,this.depth);
	}
	blitTo(target,offset) {
		let _g = 0;
		let _g1 = this.chunks.length;
		while(_g < _g1) {
			let i = _g++;
			this.chunks[i].blitTo(target,offset + this.offsets[i]);
		}
	}
	toString() {
		return this.toBytes().toString();
	}
	toBytes() {
		let ret = new haxe_io_Bytes(new ArrayBuffer(this.length));
		this.blitTo(ret,0);
		return ret;
	}
	static asCompound(c) {
		if(((c) instanceof tink_chunk_CompoundChunk)) {
			return c;
		} else {
			return null;
		}
	}
	static cons(a,b) {
		let _g = a.getLength();
		let _g1 = b.getLength();
		if(_g == 0) {
			if(_g1 == 0) {
				return tink_Chunk.EMPTY;
			} else {
				return b;
			}
		} else if(_g1 == 0) {
			return a;
		} else {
			let _g = tink_chunk_CompoundChunk.asCompound(a);
			let _g1 = tink_chunk_CompoundChunk.asCompound(b);
			if(_g == null) {
				if(_g1 == null) {
					return tink_chunk_CompoundChunk.create([a,b],2);
				} else if(_g1.depth < 100) {
					return tink_chunk_CompoundChunk.create([a,b],_g1.depth + 1);
				} else {
					let flat = [];
					_g1.flatten(flat);
					b.flatten(flat);
					return tink_chunk_CompoundChunk.create(flat,2);
				}
			} else if(_g1 == null) {
				if(_g.depth < 100) {
					return tink_chunk_CompoundChunk.create([a,b],_g.depth + 1);
				} else {
					let flat = [];
					_g.flatten(flat);
					b.flatten(flat);
					return tink_chunk_CompoundChunk.create(flat,2);
				}
			} else {
				let depth = _g.depth > _g1.depth ? _g.depth : _g1.depth;
				return tink_chunk_CompoundChunk.create(_g.chunks.concat(_g1.chunks),depth);
			}
		}
	}
	static create(chunks,depth) {
		let ret = new tink_chunk_CompoundChunk();
		let offsets = [0];
		let length = 0;
		let _g = 0;
		while(_g < chunks.length) offsets.push(length += chunks[_g++].getLength());
		ret.chunks = chunks;
		ret.offsets = offsets;
		ret.length = length;
		ret.depth = depth;
		return ret;
	}
}
tink_chunk_CompoundChunk.__name__ = true;
tink_chunk_CompoundChunk.__interfaces__ = [tink_chunk_ChunkObject];
tink_chunk_CompoundChunk.__super__ = tink_chunk_ChunkBase;
Object.assign(tink_chunk_CompoundChunk.prototype, {
	__class__: tink_chunk_CompoundChunk
});
class tink_chunk_Seekable {
	static _new(a) {
		return a;
	}
	static get_length(this1) {
		return this1.length;
	}
	static get(this1,index) {
		return this1[index];
	}
	static ofChunk(c) {
		return tink_chunk_Seekable.ofBytes(c.toBytes());
	}
	static ofBytes(b) {
		let _g = [];
		let _g1 = 0;
		let _g2 = b.length;
		while(_g1 < _g2) _g.push(b.b[_g1++]);
		return _g;
	}
	static ofString(s) {
		return tink_chunk_Seekable.ofBytes(haxe_io_Bytes.ofString(s));
	}
}
class tink_chunk_nodejs_BufferChunk {
	constructor(buffer) {
		this.buffer = buffer;
	}
	getByte(i) {
		return this.buffer[i];
	}
	getCursor() {
		return tink_chunk_ByteChunk.of(this.toBytes()).getCursor();
	}
	flatten(into) {
		tink_chunk_ByteChunk.of(this.toBytes()).flatten(into);
	}
	getLength() {
		return this.buffer.length;
	}
	slice(from,to) {
		if(to > this.getLength()) {
			to = this.getLength();
		}
		if(from < 0) {
			from = 0;
		}
		if(to <= from) {
			return tink_Chunk.EMPTY;
		} else if(to == this.getLength() && from == 0) {
			return this;
		} else {
			return new tink_chunk_nodejs_BufferChunk(this.buffer.slice(from,to));
		}
	}
	toString() {
		return this.buffer.toString();
	}
	toBytes() {
		let copy = js_node_buffer_Buffer.allocUnsafe(this.buffer.length);
		this.buffer.copy(copy);
		return js_node_buffer__$Buffer_Helper.bytesOfBuffer(copy);
	}
	blitTo(target,offset) {
		let data = target.b;
		this.buffer.copy(js_node_buffer_Buffer.from(data.buffer,data.byteOffset,target.length),offset);
	}
}
tink_chunk_nodejs_BufferChunk.__name__ = true;
tink_chunk_nodejs_BufferChunk.__interfaces__ = [tink_chunk_ChunkObject];
Object.assign(tink_chunk_nodejs_BufferChunk.prototype, {
	__class__: tink_chunk_nodejs_BufferChunk
});
class tink_cli_Doc0 {
	static get() {
		if(tink_cli_Doc0.doc == null) {
			tink_cli_Doc0.doc = { doc : " Print the business card of Cédric Belin, full stack developer. ", commands : [{ isDefault : true, isSub : false, names : [], doc : null}], flags : [{ names : ["--help"], aliases : ["h"], doc : " Output usage information. "},{ names : ["--version"], aliases : ["v"], doc : " Output the version number. "}]};
		}
		return tink_cli_Doc0.doc;
	}
}
tink_cli_Doc0.__name__ = true;
class tink_cli_DocFormatter {
}
tink_cli_DocFormatter.__name__ = true;
tink_cli_DocFormatter.__isInterface__ = true;
Object.assign(tink_cli_DocFormatter.prototype, {
	__class__: tink_cli_DocFormatter
});
class tink_cli_Prompt {
}
tink_cli_Prompt.__name__ = true;
tink_cli_Prompt.__isInterface__ = true;
Object.assign(tink_cli_Prompt.prototype, {
	__class__: tink_cli_Prompt
});
class tink_cli_PromptType {
	static ofString(v) {
		return tink_cli_PromptTypeBase.Simple(v);
	}
}
var tink_cli_PromptTypeBase = $hxEnums["tink.cli.PromptTypeBase"] = { __ename__:true,__constructs__:null
	,Simple: ($_=function(prompt) { return {_hx_index:0,prompt:prompt,__enum__:"tink.cli.PromptTypeBase",toString:$estr}; },$_._hx_name="Simple",$_.__params__ = ["prompt"],$_)
	,MultipleChoices: ($_=function(prompt,choices) { return {_hx_index:1,prompt:prompt,choices:choices,__enum__:"tink.cli.PromptTypeBase",toString:$estr}; },$_._hx_name="MultipleChoices",$_.__params__ = ["prompt","choices"],$_)
	,Secure: ($_=function(prompt) { return {_hx_index:2,prompt:prompt,__enum__:"tink.cli.PromptTypeBase",toString:$estr}; },$_._hx_name="Secure",$_.__params__ = ["prompt"],$_)
};
tink_cli_PromptTypeBase.__constructs__ = [tink_cli_PromptTypeBase.Simple,tink_cli_PromptTypeBase.MultipleChoices,tink_cli_PromptTypeBase.Secure];
class tink_cli_Rest {
	static asArray(this1) {
		return this1;
	}
}
class tink_cli_Router {
	constructor(command,prompt,hasFlags) {
		this.command = command;
		this.prompt = prompt;
		this.hasFlags = hasFlags;
	}
	process(args) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
	}
	processArgs(args) {
		let _gthis = this;
		if(!this.hasFlags) {
			return tink_core_Outcome.Success(args);
		} else {
			return tink_core_TypedError.catchExceptions(function() {
				let args1 = tink_cli_Router.expandAssignments(args);
				let rest = [];
				let i = 0;
				let flagsEnded = false;
				while(i < args1.length) {
					let arg = args1[i];
					if(arg == "--") {
						flagsEnded = true;
						++i;
					} else if(!flagsEnded && HxOverrides.cca(arg,0) == 45) {
						let _g = _gthis.processFlag(args1,i);
						if(_g == -1) {
							if(HxOverrides.cca(arg,1) != 45) {
								let _g = _gthis.processAlias(args1,i);
								if(_g == -1) {
									throw haxe_Exception.thrown("Unrecognized alias \"" + arg + "\"");
								} else {
									i += _g + 1;
								}
							} else {
								throw haxe_Exception.thrown("Unrecognized flag \"" + arg + "\"");
							}
						} else {
							i += _g + 1;
						}
					} else {
						rest.push(arg);
						++i;
					}
				}
				return rest;
			},null,{ fileName : "tink/cli/Router.hx", lineNumber : 25, className : "tink.cli.Router", methodName : "processArgs"});
		}
	}
	processFlag(args,index) {
		return -1;
	}
	processAlias(args,index) {
		return -1;
	}
	promptRequired() {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
	}
	static expandAssignments(args) {
		let ret = [];
		let flags = true;
		let _g = 0;
		while(_g < args.length) {
			let arg = args[_g];
			++_g;
			if(arg == "--") {
				flags = false;
			}
			if(!flags) {
				ret.push(arg);
			} else {
				let _g = HxOverrides.cca(arg,0);
				let _g1 = HxOverrides.cca(arg,1);
				let _g2 = arg.indexOf("=");
				if(_g == null) {
					ret.push(arg);
				} else if(_g == 45) {
					if(_g1 == null) {
						ret.push(arg);
					} else if(_g1 == 45) {
						if(_g2 != -1) {
							ret.push(HxOverrides.substr(arg,0,_g2));
							ret.push(HxOverrides.substr(arg,_g2 + 1,null));
						} else {
							ret.push(arg);
						}
					} else {
						ret.push(arg);
					}
				} else {
					ret.push(arg);
				}
			}
		}
		return ret;
	}
}
tink_cli_Router.__name__ = true;
Object.assign(tink_cli_Router.prototype, {
	__class__: tink_cli_Router
});
class tink_cli_Router0 extends tink_cli_Router {
	constructor(command,prompt) {
		super(command,prompt,true);
	}
	process(args) {
		let _gthis = this;
		if(args[0] == null) {
			let args1;
			let _g = this.processArgs(args);
			switch(_g._hx_index) {
			case 0:
				args1 = _g.data;
				break;
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(_g.failure)));
			}
			return tink_core_Promise.next(this.promptRequired(),function(_) {
				return _gthis.run_run(args1);
			});
		} else {
			let args1;
			let _g = this.processArgs(args);
			switch(_g._hx_index) {
			case 0:
				args1 = _g.data;
				break;
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(_g.failure)));
			}
			return tink_core_Promise.next(this.promptRequired(),function(_) {
				return _gthis.run_run(args1);
			});
		}
	}
	processFlag(args,index) {
		switch(args[index]) {
		case "--help":
			this.command.help = true;
			break;
		case "--version":
			this.command.version = true;
			break;
		default:
			return -1;
		}
		return index - index;
	}
	processAlias(args,index) {
		let str = args[index];
		let _g = 1;
		let _g1 = str.length;
		while(_g < _g1) {
			let i = _g++;
			let _g1 = HxOverrides.cca(str,i);
			if(_g1 == null) {
				throw haxe_Exception.thrown("Invalid alias '-" + str.charAt(i) + "'");
			} else {
				switch(_g1) {
				case 104:
					this.command.help = true;
					break;
				case 118:
					this.command.version = true;
					break;
				default:
					throw haxe_Exception.thrown("Invalid alias '-" + str.charAt(i) + "'");
				}
			}
		}
		return index - index;
	}
	promptRequired() {
		return tink_core_Future.async(function(cb) {
			cb(tink_core_Outcome.Success(null));
		});
	}
	run_run(args) {
		if(args.length < 0) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(null,"Insufficient arguments. Expected: " + 0 + ", Got: " + args.length,{ fileName : "src/card/Program.hx", lineNumber : 30, className : "tink.cli.Router0", methodName : "run_run"}))));
		}
		return this.command.run(args.slice(0,args.length));
	}
}
tink_cli_Router0.__name__ = true;
tink_cli_Router0.__super__ = tink_cli_Router;
Object.assign(tink_cli_Router0.prototype, {
	__class__: tink_cli_Router0
});
class tink_cli_doc_DefaultFormatter {
	constructor(root) {
		this.re = new EReg("^\\s*\\*?\\s{0,2}(.*)$","");
		this.root = root;
	}
	format(spec) {
		let out_b = "";
		out_b += "\n";
		let _g = this.formatDoc(spec.doc);
		if(_g != null) {
			out_b += Std.string("" + _g + "\n" + "\n");
		}
		let _this = spec.commands;
		let _g1 = [];
		let _g2 = 0;
		while(_g2 < _this.length) {
			let v = _this[_g2];
			++_g2;
			if(!v.isDefault) {
				_g1.push(v);
			}
		}
		if(this.root != null) {
			out_b += Std.string("  Usage: " + this.root + "\n");
		}
		let _g3 = Lambda.find(spec.commands,function(c) {
			return c.isDefault;
		});
		if(_g3 != null) {
			let _g = this.formatDoc(_g3.doc);
			if(_g != null) {
				out_b += Std.string(this.indent(_g,4) + "\n" + "\n");
			}
		}
		let _gthis = this;
		if(_g1.length > 0) {
			let maxCommandLength = Lambda.fold(_g1,function(command,max) {
				let _g = 0;
				let _g1 = command.names;
				while(_g < _g1.length) {
					let name = _g1[_g];
					++_g;
					if(name.length > max) {
						max = name.length;
					}
				}
				return max;
			},0);
			if(this.root != null) {
				out_b += Std.string("  Usage: " + this.root + " <subcommand>" + "\n");
			}
			out_b += Std.string("    Subcommands:" + "\n");
			let addCommand = function(name,doc) {
				if(doc == null) {
					doc = "(doc missing)";
				}
				out_b += Std.string(_gthis.indent(StringTools.lpad(name," ",maxCommandLength) + " : " + StringTools.trim(_gthis.indent(doc,maxCommandLength + 3)),6) + "\n");
			};
			let _g = 0;
			while(_g < _g1.length) {
				let command = _g1[_g];
				++_g;
				let name = command.names[0];
				addCommand(name,this.formatDoc(command.doc));
				if(command.names.length > 1) {
					let _g = 1;
					let _g1 = command.names.length;
					while(_g < _g1) addCommand(command.names[_g++],"Alias of " + name);
				}
			}
		}
		if(spec.flags.length > 0) {
			let nameOf = function(flag) {
				let variants = flag.names.join(", ");
				if(flag.aliases.length > 0) {
					let _this = flag.aliases;
					let result = new Array(_this.length);
					let _g = 0;
					let _g1 = _this.length;
					while(_g < _g1) {
						let i = _g++;
						result[i] = "-" + _this[i];
					}
					variants += ", " + result.join(", ");
				}
				return variants;
			};
			let maxFlagLength = Lambda.fold(spec.flags,function(flag,max) {
				let name = nameOf(flag);
				if(name.length > max) {
					max = name.length;
				}
				return max;
			},0);
			let addFlag = function(name,doc) {
				if(doc == null) {
					doc = "";
				}
				out_b += Std.string(_gthis.indent(StringTools.lpad(name," ",maxFlagLength) + " : " + StringTools.trim(_gthis.indent(doc,maxFlagLength + 3)),6) + "\n");
			};
			out_b = (out_b += "\n") + Std.string("  Flags:" + "\n");
			let _g = 0;
			let _g1 = spec.flags;
			while(_g < _g1.length) {
				let flag = _g1[_g];
				++_g;
				addFlag(nameOf(flag),this.formatDoc(flag.doc));
			}
		}
		return out_b;
	}
	indent(v,level) {
		let _this = v.split("\n");
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = StringTools.lpad(""," ",level) + _this[i];
		}
		return result.join("\n");
	}
	formatDoc(doc) {
		if(doc == null) {
			return null;
		}
		let _this = doc.split("\n");
		let f = StringTools.trim;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = f(_this[i]);
		}
		let lines = result;
		while(lines[0] == "") lines = lines.slice(1);
		while(lines[lines.length - 1] == "") lines.pop();
		let result1 = new Array(lines.length);
		let _g2 = 0;
		let _g3 = lines.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let line = lines[i];
			result1[i] = this.re.match(line) ? this.re.matched(1) : line;
		}
		return result1.join("\n");
	}
}
tink_cli_doc_DefaultFormatter.__name__ = true;
tink_cli_doc_DefaultFormatter.__interfaces__ = [tink_cli_DocFormatter];
Object.assign(tink_cli_doc_DefaultFormatter.prototype, {
	__class__: tink_cli_doc_DefaultFormatter
});
class tink_cli_macro_Router {
}
tink_cli_macro_Router.__name__ = true;
class tink_cli_prompt_IoPrompt {
	constructor(source,sink) {
		this.source = source;
		this.sink = sink;
	}
	print(v) {
		return tink_core_Future.map(tink_io_Source.pipeTo(new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(v)))),this.sink),function(r) {
			if(r._hx_index == 0) {
				return tink_core_Outcome.Success(null);
			} else {
				return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Pipe Error",r,{ fileName : "tink/cli/prompt/IoPrompt.hx", lineNumber : 24, className : "tink.cli.prompt.IoPrompt", methodName : "print"}));
			}
		});
	}
	println(v) {
		return this.print("" + v + "\n");
	}
	prompt(type) {
		let secure = false;
		let display;
		switch(type._hx_index) {
		case 0:
			display = "" + type.prompt + ": ";
			break;
		case 1:
			display = "" + type.prompt + " [" + type.choices.join("/") + "]: ";
			break;
		case 2:
			secure = true;
			display = "" + type.prompt + ": ";
			break;
		}
		let _gthis = this;
		return tink_core_Future.flatMap(tink_io_Source.pipeTo(new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(display)))),this.sink),function(o) {
			if(o._hx_index == 0) {
				if(secure) {
					return _gthis.secureInput(display);
				} else {
					let split = tink_io_RealSourceTools.split(_gthis.source,tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString("\n")));
					_gthis.source = split.after;
					return tink_core_Promise.next(tink_io_RealSourceTools.all(split.before),function(chunk) {
						let s = chunk.toString();
						if(HxOverrides.cca(s,s.length - 1) == 13) {
							return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(HxOverrides.substr(s,0,s.length - 1))));
						} else {
							return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(s)));
						}
					});
				}
			} else {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(null,"",{ fileName : "tink/cli/prompt/IoPrompt.hx", lineNumber : 54, className : "tink.cli.prompt.IoPrompt", methodName : "prompt"}))));
			}
		});
	}
	secureInput(prompt) {
		throw haxe_Exception.thrown("not implemented");
	}
}
tink_cli_prompt_IoPrompt.__name__ = true;
tink_cli_prompt_IoPrompt.__interfaces__ = [tink_cli_Prompt];
Object.assign(tink_cli_prompt_IoPrompt.prototype, {
	__class__: tink_cli_prompt_IoPrompt
});
class tink_cli_prompt_NodePrompt extends tink_cli_prompt_IoPrompt {
	constructor() {
		let r = process.stdin;
		let options = null;
		options = { };
		super(tink_io_nodejs_NodejsSource.wrap("stdin",r,options.chunkSize,options.onEnd),tink_io_nodejs_NodejsSink.wrap("stdout",process.stdout));
	}
	secureInput(prompt) {
		return tink_core_Future.async(function(cb) {
			let rl = js_node_Readline.createInterface({ input : process.stdin, output : process.stdout});
			let hidden = function(query,callback) {
				let stdin = process.openStdin();
				process.stdin.on("data",function(buf) {
					let char = buf.toString();
					switch(char) {
					case "\x04":case "\n":case "\r":
						stdin.pause();
						break;
					default:
						process.stdout.write("\x1B[2K\x1B[200D" + query);
					}
				});
				rl.question(query,function(value) {
					rl.history = rl.history.slice(1);
					callback(value);
				});
			};
			hidden(prompt,function(password) {
				cb(tink_core_Outcome.Success(password));
			});
		});
	}
}
tink_cli_prompt_NodePrompt.__name__ = true;
tink_cli_prompt_NodePrompt.__super__ = tink_cli_prompt_IoPrompt;
Object.assign(tink_cli_prompt_NodePrompt.prototype, {
	__class__: tink_cli_prompt_NodePrompt
});
class tink_cli_prompt_RetryPrompt {
	constructor(trials,proxy) {
		this.trials = trials;
		this.proxy = proxy == null ? new tink_cli_prompt_NodePrompt() : proxy;
	}
	print(v) {
		return this.proxy.print(v);
	}
	println(v) {
		return this.proxy.println(v);
	}
	prompt(type) {
		let _gthis = this;
		switch(type._hx_index) {
		case 0:
			return this.proxy.prompt(type);
		case 1:
			let c = type.choices;
			return tink_core_Future.async(function(cb) {
				let remaining = _gthis.trials;
				let next = null;
				next = function() {
					remaining -= 1;
					let retry = function() {
						if(remaining > 0) {
							next();
						} else {
							cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"Maximum retries reached",{ fileName : "tink/cli/prompt/RetryPrompt.hx", lineNumber : 36, className : "tink.cli.prompt.RetryPrompt", methodName : "prompt"})));
						}
					};
					_gthis.proxy.prompt(type).handle(function(o) {
						switch(o._hx_index) {
						case 0:
							let _g = o.data;
							if(c.indexOf(_g) == -1) {
								retry();
							} else {
								cb(tink_core_Outcome.Success(_g));
							}
							break;
						case 1:
							retry();
							break;
						}
					});
				};
				next();
			});
		case 2:
			return this.proxy.prompt(type);
		}
	}
}
tink_cli_prompt_RetryPrompt.__name__ = true;
tink_cli_prompt_RetryPrompt.__interfaces__ = [tink_cli_Prompt];
Object.assign(tink_cli_prompt_RetryPrompt.prototype, {
	__class__: tink_cli_prompt_RetryPrompt
});
class tink_core_Annex {
	constructor(target) {
		this.target = target;
		this.registry = new haxe_ds_ObjectMap();
	}
}
tink_core_Annex.__name__ = true;
Object.assign(tink_core_Annex.prototype, {
	__class__: tink_core_Annex
});
class tink_core_Callback {
	static _new(f) {
		return f;
	}
	static toFunction(this1) {
		return this1;
	}
	static invoke(this1,data) {
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			this1(data);
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				this1(data);
			});
		}
	}
	static fromNiladic(f) {
		return f;
	}
	static fromMany(callbacks) {
		return function(v) {
			let _g = 0;
			while(_g < callbacks.length) tink_core_Callback.invoke(callbacks[_g++],v);
		};
	}
	static defer(f) {
		process.nextTick(f);
	}
}
class tink_core_LinkObject {
}
tink_core_LinkObject.__name__ = true;
tink_core_LinkObject.__isInterface__ = true;
Object.assign(tink_core_LinkObject.prototype, {
	__class__: tink_core_LinkObject
});
class tink_core_CallbackLinkRef {
	constructor() {
	}
	cancel() {
		let this1 = this.link;
		if(this1 != null) {
			this1.cancel();
		}
	}
}
tink_core_CallbackLinkRef.__name__ = true;
tink_core_CallbackLinkRef.__interfaces__ = [tink_core_LinkObject];
Object.assign(tink_core_CallbackLinkRef.prototype, {
	__class__: tink_core_CallbackLinkRef
});
class tink_core_CallbackLink {
	static _new(link) {
		return new tink_core_SimpleLink(link);
	}
	static cancel(this1) {
		if(this1 != null) {
			this1.cancel();
		}
	}
	static dissolve(this1) {
		if(this1 != null) {
			this1.cancel();
		}
	}
	static noop() {
	}
	static toFunction(this1) {
		if(this1 == null) {
			return tink_core_CallbackLink.noop;
		} else {
			return $bind(this1,this1.cancel);
		}
	}
	static toCallback(this1) {
		if(this1 == null) {
			return tink_core_CallbackLink.noop;
		} else {
			return $bind(this1,this1.cancel);
		}
	}
	static fromFunction(f) {
		return new tink_core_SimpleLink(f);
	}
	static join(this1,b) {
		return new tink_core__$Callback_LinkPair(this1,b);
	}
	static fromMany(callbacks) {
		return new tink_core_SimpleLink(function() {
			if(callbacks != null) {
				let _g = 0;
				while(_g < callbacks.length) {
					let cb = callbacks[_g];
					++_g;
					if(cb != null) {
						cb.cancel();
					}
				}
			} else {
				callbacks = null;
			}
		});
	}
}
class tink_core_SimpleLink {
	constructor(f) {
		this.f = f;
	}
	cancel() {
		if(this.f != null) {
			this.f();
			this.f = null;
		}
	}
}
tink_core_SimpleLink.__name__ = true;
tink_core_SimpleLink.__interfaces__ = [tink_core_LinkObject];
Object.assign(tink_core_SimpleLink.prototype, {
	__class__: tink_core_SimpleLink
});
class tink_core__$Callback_LinkPair {
	constructor(a,b) {
		this.dissolved = false;
		this.a = a;
		this.b = b;
	}
	cancel() {
		if(!this.dissolved) {
			this.dissolved = true;
			let this1 = this.a;
			if(this1 != null) {
				this1.cancel();
			}
			let this2 = this.b;
			if(this2 != null) {
				this2.cancel();
			}
			this.a = null;
			this.b = null;
		}
	}
}
tink_core__$Callback_LinkPair.__name__ = true;
tink_core__$Callback_LinkPair.__interfaces__ = [tink_core_LinkObject];
Object.assign(tink_core__$Callback_LinkPair.prototype, {
	__class__: tink_core__$Callback_LinkPair
});
class tink_core__$Callback_ListCell {
	constructor(cb,list) {
		if(cb == null) {
			throw haxe_Exception.thrown("callback expected but null received");
		}
		this.cb = cb;
		this.list = list;
	}
	invoke(data) {
		if(this.list != null) {
			this.cb(data);
		}
	}
	clear() {
		this.cb = null;
		this.list = null;
	}
	cancel() {
		if(this.list != null) {
			let list = this.list;
			this.cb = null;
			this.list = null;
			if(--list.used <= list.cells.length >> 1) {
				list.compact();
			}
		}
	}
}
tink_core__$Callback_ListCell.__name__ = true;
tink_core__$Callback_ListCell.__interfaces__ = [tink_core_LinkObject];
Object.assign(tink_core__$Callback_ListCell.prototype, {
	__class__: tink_core__$Callback_ListCell
});
class tink_core_Disposable {
}
tink_core_Disposable.__name__ = true;
tink_core_Disposable.__isInterface__ = true;
Object.assign(tink_core_Disposable.prototype, {
	__class__: tink_core_Disposable
});
class tink_core_OwnedDisposable {
}
tink_core_OwnedDisposable.__name__ = true;
tink_core_OwnedDisposable.__isInterface__ = true;
tink_core_OwnedDisposable.__interfaces__ = [tink_core_Disposable];
Object.assign(tink_core_OwnedDisposable.prototype, {
	__class__: tink_core_OwnedDisposable
});
class tink_core_SimpleDisposable {
	constructor(dispose) {
		if(tink_core_SimpleDisposable._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(dispose);
	}
	_hx_constructor(dispose) {
		this.disposeHandlers = [];
		this.f = dispose;
	}
	get_disposed() {
		return this.disposeHandlers == null;
	}
	ondispose(d) {
		let _g = this.disposeHandlers;
		if(_g == null) {
			d();
		} else {
			_g.push(d);
		}
	}
	dispose() {
		let _g = this.disposeHandlers;
		if(_g != null) {
			this.disposeHandlers = null;
			let f = this.f;
			this.f = tink_core_SimpleDisposable.noop;
			f();
			let _g1 = 0;
			while(_g1 < _g.length) _g[_g1++]();
		}
	}
	static noop() {
	}
}
tink_core_SimpleDisposable.__name__ = true;
tink_core_SimpleDisposable.__interfaces__ = [tink_core_OwnedDisposable];
Object.assign(tink_core_SimpleDisposable.prototype, {
	__class__: tink_core_SimpleDisposable
});
class tink_core_CallbackList extends tink_core_SimpleDisposable {
	constructor(destructive) {
		tink_core_SimpleDisposable._hx_skip_constructor = true;
		super();
		tink_core_SimpleDisposable._hx_skip_constructor = false;
		this._hx_constructor(destructive);
	}
	_hx_constructor(destructive) {
		if(destructive == null) {
			destructive = false;
		}
		this.onfill = function() {
		};
		this.ondrain = function() {
		};
		this.busy = false;
		this.queue = [];
		this.used = 0;
		let _gthis = this;
		super._hx_constructor(function() {
			if(!_gthis.busy) {
				_gthis.destroy();
			}
		});
		this.destructive = destructive;
		this.cells = [];
	}
	get_length() {
		return this.used;
	}
	release() {
		if(--this.used <= this.cells.length >> 1) {
			this.compact();
		}
	}
	destroy() {
		let _g = 0;
		let _g1 = this.cells;
		while(_g < _g1.length) {
			let c = _g1[_g];
			++_g;
			c.cb = null;
			c.list = null;
		}
		this.queue = null;
		this.cells = null;
		if(this.used > 0) {
			this.used = 0;
			let fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		}
	}
	drain() {
		let fn = this.ondrain;
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			fn();
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(fn);
		}
	}
	add(cb) {
		if(this.disposeHandlers == null) {
			return null;
		}
		let node = new tink_core__$Callback_ListCell(cb,this);
		this.cells.push(node);
		if(this.used++ == 0) {
			let fn = this.onfill;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		}
		return node;
	}
	invoke(data) {
		let _gthis = this;
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			if(_gthis.disposeHandlers != null) {
				if(_gthis.busy) {
					if(_gthis.destructive != true) {
						let _g = $bind(_gthis,_gthis.invoke);
						let data1 = data;
						let tmp = function() {
							_g(data1);
						};
						_gthis.queue.push(tmp);
					}
				} else {
					_gthis.busy = true;
					if(_gthis.destructive) {
						_gthis.dispose();
					}
					let length = _gthis.cells.length;
					let _g = 0;
					while(_g < length) {
						let _this = _gthis.cells[_g++];
						if(_this.list != null) {
							_this.cb(data);
						}
					}
					_gthis.busy = false;
					if(_gthis.disposeHandlers == null) {
						_gthis.destroy();
					} else {
						if(_gthis.used < _gthis.cells.length) {
							_gthis.compact();
						}
						if(_gthis.queue.length > 0) {
							(_gthis.queue.shift())();
						}
					}
				}
			}
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				if(_gthis.disposeHandlers != null) {
					if(_gthis.busy) {
						if(_gthis.destructive != true) {
							let _g = $bind(_gthis,_gthis.invoke);
							let data1 = data;
							let tmp = function() {
								_g(data1);
							};
							_gthis.queue.push(tmp);
						}
					} else {
						_gthis.busy = true;
						if(_gthis.destructive) {
							_gthis.dispose();
						}
						let length = _gthis.cells.length;
						let _g = 0;
						while(_g < length) {
							let _this = _gthis.cells[_g++];
							if(_this.list != null) {
								_this.cb(data);
							}
						}
						_gthis.busy = false;
						if(_gthis.disposeHandlers == null) {
							_gthis.destroy();
						} else {
							if(_gthis.used < _gthis.cells.length) {
								_gthis.compact();
							}
							if(_gthis.queue.length > 0) {
								(_gthis.queue.shift())();
							}
						}
					}
				}
			});
		}
	}
	compact() {
		if(this.busy) {
			return;
		} else if(this.used == 0) {
			this.resize(0);
			let fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		} else {
			let compacted = 0;
			let _g = 0;
			let _g1 = this.cells.length;
			while(_g < _g1) {
				let i = _g++;
				let _g1 = this.cells[i];
				if(_g1.cb != null) {
					if(compacted != i) {
						this.cells[compacted] = _g1;
					}
					if(++compacted == this.used) {
						break;
					}
				}
			}
			this.resize(this.used);
		}
	}
	resize(length) {
		this.cells.length = length;
	}
	clear() {
		if(this.busy) {
			this.queue.push($bind(this,this.clear));
		}
		let _g = 0;
		let _g1 = this.cells;
		while(_g < _g1.length) {
			let cell = _g1[_g];
			++_g;
			cell.cb = null;
			cell.list = null;
		}
		this.resize(0);
	}
}
tink_core_CallbackList.__name__ = true;
tink_core_CallbackList.__super__ = tink_core_SimpleDisposable;
Object.assign(tink_core_CallbackList.prototype, {
	__class__: tink_core_CallbackList
});
class tink_core_AlreadyDisposed {
	constructor() {
	}
	get_disposed() {
		return true;
	}
	ondispose(d) {
		d();
	}
	dispose() {
	}
}
tink_core_AlreadyDisposed.__name__ = true;
tink_core_AlreadyDisposed.__interfaces__ = [tink_core_OwnedDisposable];
Object.assign(tink_core_AlreadyDisposed.prototype, {
	__class__: tink_core_AlreadyDisposed
});
class tink_core_TypedError {
	constructor(code,message,pos) {
		if(code == null) {
			code = 500;
		}
		this.isTinkError = true;
		this.code = code;
		this.message = message;
		this.pos = pos;
		this.exceptionStack = [];
		this.callStack = [];
	}
	printPos() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	toString() {
		let ret = "Error#" + this.code + ": " + this.message;
		if(this.pos != null) {
			ret += " @ " + this.printPos();
		}
		return ret;
	}
	toPromise() {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(this)));
	}
	throwSelf() {
		throw haxe_Exception.thrown(this);
	}
	toJsError() {
		let value = this.data;
		let _g = ((value) instanceof Error) ? value : null;
		if(_g == null) {
			return new tink_core__$Error_TinkError(this);
		} else {
			return _g;
		}
	}
	static withData(code,message,data,pos) {
		return tink_core_TypedError.typed(code,message,data,pos);
	}
	static typed(code,message,data,pos) {
		let ret = new tink_core_TypedError(code,message,pos);
		ret.data = data;
		return ret;
	}
	static ofJsError(e,pos) {
		return tink_core_TypedError.withData(500,e.message,e,pos);
	}
	static asError(v) {
		if(v != null && v.isTinkError) {
			return v;
		} else {
			return null;
		}
	}
	static catchExceptions(f,report,pos) {
		try {
			return tink_core_Outcome.Success(f());
		} catch( _g ) {
			let e = tink_core_TypedError.asError(haxe_Exception.caught(_g).unwrap());
			return tink_core_Outcome.Failure(e == null ? report == null ? tink_core_TypedError.withData(null,"Unexpected Error",e,pos) : report(e) : e);
		}
	}
	static reporter(code,message,pos) {
		return function(e) {
			return tink_core_TypedError.withData(code,message,e,pos);
		};
	}
	static rethrow(any) {
		throw haxe_Exception.thrown(any);
	}
	static tryFinally(f,cleanup) {
		try { return f(); } finally { cleanup(); }
		return null;
	}
}
tink_core_TypedError.__name__ = true;
Object.assign(tink_core_TypedError.prototype, {
	__class__: tink_core_TypedError
});
class tink_core_Stack {
	static toString(this1) {
		return "Error stack not available. Compile with -D error_stack.";
	}
}
class tink_core__$Error_TinkError extends Error {
	constructor(e) {
		super();
		this.message = e.message;
		this.data = e;
	}
}
tink_core__$Error_TinkError.__name__ = true;
tink_core__$Error_TinkError.__super__ = Error;
Object.assign(tink_core__$Error_TinkError.prototype, {
	__class__: tink_core__$Error_TinkError
});
class tink_core__$Future_FutureObject {
}
tink_core__$Future_FutureObject.__name__ = true;
tink_core__$Future_FutureObject.__isInterface__ = true;
Object.assign(tink_core__$Future_FutureObject.prototype, {
	__class__: tink_core__$Future_FutureObject
});
class tink_core__$Future_NeverFuture {
	constructor() {
	}
	getStatus() {
		return tink_core_FutureStatus.NeverEver;
	}
	handle(callback) {
		return null;
	}
	eager() {
	}
}
tink_core__$Future_NeverFuture.__name__ = true;
tink_core__$Future_NeverFuture.__interfaces__ = [tink_core__$Future_FutureObject];
Object.assign(tink_core__$Future_NeverFuture.prototype, {
	__class__: tink_core__$Future_NeverFuture
});
class tink_core__$Lazy_Computable {
}
tink_core__$Lazy_Computable.__name__ = true;
tink_core__$Lazy_Computable.__isInterface__ = true;
Object.assign(tink_core__$Lazy_Computable.prototype, {
	__class__: tink_core__$Lazy_Computable
});
class tink_core__$Lazy_LazyObject {
}
tink_core__$Lazy_LazyObject.__name__ = true;
tink_core__$Lazy_LazyObject.__isInterface__ = true;
tink_core__$Lazy_LazyObject.__interfaces__ = [tink_core__$Lazy_Computable];
Object.assign(tink_core__$Lazy_LazyObject.prototype, {
	__class__: tink_core__$Lazy_LazyObject
});
class tink_core__$Lazy_LazyConst {
	constructor(value) {
		this.value = value;
	}
	isComputed() {
		return true;
	}
	get() {
		return this.value;
	}
	compute() {
	}
	underlying() {
		return null;
	}
}
tink_core__$Lazy_LazyConst.__name__ = true;
tink_core__$Lazy_LazyConst.__interfaces__ = [tink_core__$Lazy_LazyObject];
Object.assign(tink_core__$Lazy_LazyConst.prototype, {
	__class__: tink_core__$Lazy_LazyConst
});
class tink_core__$Future_SyncFuture {
	constructor(value) {
		this.value = value;
	}
	getStatus() {
		return tink_core_FutureStatus.Ready(this.value);
	}
	handle(cb) {
		tink_core_Callback.invoke(cb,tink_core_Lazy.get(this.value));
		return null;
	}
	eager() {
		if(!this.value.isComputed()) {
			tink_core_Lazy.get(this.value);
		}
	}
}
tink_core__$Future_SyncFuture.__name__ = true;
tink_core__$Future_SyncFuture.__interfaces__ = [tink_core__$Future_FutureObject];
Object.assign(tink_core__$Future_SyncFuture.prototype, {
	__class__: tink_core__$Future_SyncFuture
});
class tink_core_Future {
	static get_status(this1) {
		return this1.getStatus();
	}
	static _new(wakeup) {
		return new tink_core__$Future_SuspendableFuture(wakeup);
	}
	static handle(this1,callback) {
		return this1.handle(callback);
	}
	static eager(this1) {
		this1.eager();
		return this1;
	}
	static noise(this1) {
		if(this1.getStatus()._hx_index == 4) {
			return tink_core_Future.NEVER;
		} else {
			return tink_core_Future.map(this1,function(_) {
				return null;
			});
		}
	}
	static first(this1,that) {
		let _g = this1;
		switch(_g.getStatus()._hx_index) {
		case 3:
			switch(that.getStatus()._hx_index) {
			case 3:
				return _g;
			case 4:
				return _g;
			default:
				return _g;
			}
			break;
		case 4:
			return that;
		default:
			switch(that.getStatus()._hx_index) {
			case 3:
				return that;
			case 4:
				return _g;
			default:
				return new tink_core__$Future_SuspendableFuture(function(fire) {
					return new tink_core__$Callback_LinkPair(this1.handle(fire),that.handle(fire));
				});
			}
		}
	}
	static map(this1,f,gather) {
		let _g = this1.getStatus();
		switch(_g._hx_index) {
		case 3:
			let this2 = _g.result;
			let f1 = f;
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyFunc(function() {
				return f1(this2.get());
			},this2));
		case 4:
			return tink_core_Future.NEVER;
		default:
			return new tink_core__$Future_SuspendableFuture(function(fire) {
				return this1.handle(function(v) {
					fire(f(v));
				});
			});
		}
	}
	static flatMap(this1,next,gather) {
		let _g = this1.getStatus();
		switch(_g._hx_index) {
		case 3:
			let l = _g.result;
			return new tink_core__$Future_SuspendableFuture(function(fire) {
				return next(tink_core_Lazy.get(l)).handle(function(v) {
					fire(v);
				});
			});
		case 4:
			return tink_core_Future.NEVER;
		default:
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				let inner = new tink_core_CallbackLinkRef();
				return new tink_core__$Callback_LinkPair(this1.handle(function(v) {
					let outer = next(v).handle($yield);
					inner.link = outer;
				}),inner);
			});
		}
	}
	static next(this1,n) {
		return tink_core_Future.flatMap(this1,n);
	}
	static gather(this1) {
		return this1;
	}
	static merge(this1,that,combine) {
		let _g = this1.getStatus();
		let _g1 = that.getStatus();
		if(_g._hx_index == 4) {
			return tink_core_Future.NEVER;
		} else if(_g1._hx_index == 4) {
			return tink_core_Future.NEVER;
		} else {
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				let check = function(v) {
					let _g = this1.getStatus();
					let _g1 = that.getStatus();
					if(_g._hx_index == 3) {
						if(_g1._hx_index == 3) {
							$yield(combine(tink_core_Lazy.get(_g.result),tink_core_Lazy.get(_g1.result)));
						}
					}
				};
				return new tink_core__$Callback_LinkPair(this1.handle(check),that.handle(check));
			});
		}
	}
	static flatten(f) {
		return tink_core_Future.flatMap(f,function(v) {
			return v;
		});
	}
	static ofJsPromise(promise) {
		return tink_core_Future.irreversible(function(cb) {
			promise.then(function(a) {
				let _g = cb;
				let a1 = tink_core_Outcome.Success(a);
				tink_core_Callback.defer(function() {
					_g(a1);
				});
			},function(e) {
				cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,e.message,e,{ fileName : "tink/core/Future.hx", lineNumber : 158, className : "tink.core._Future.Future_Impl_", methodName : "ofJsPromise"})));
			});
		});
	}
	static neverToAny(l) {
		return l;
	}
	static ofAny(v) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
	}
	static asPromise(s) {
		return s;
	}
	static ofMany(futures,gather) {
		return tink_core_Future.inSequence(futures);
	}
	static inParallel(futures,concurrency) {
		return tink_core_Future.many(futures,concurrency);
	}
	static inSequence(futures) {
		return tink_core_Future.many(futures,1);
	}
	static many(a,concurrency) {
		return tink_core_Future.processMany(a,concurrency,tink_core_Outcome.Success,function(o) {
			return tink_core_OutcomeTools.orNull(o);
		});
	}
	static processMany(a,concurrency,fn,lift) {
		if(a.length == 0) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(lift(tink_core_Outcome.Success([]))));
		} else {
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				let links = [];
				let _g = [];
				let _g1 = 0;
				while(_g1 < a.length) {
					++_g1;
					_g.push(null);
				}
				let ret = _g;
				let index = 0;
				let pending = 0;
				let done = false;
				let concurrency1;
				if(concurrency == null) {
					concurrency1 = a.length;
				} else {
					let v = concurrency;
					concurrency1 = v < 1 ? 1 : v > a.length ? a.length : v;
				}
				let fireWhenReady = function() {
					if(index == ret.length) {
						if(pending == 0) {
							let v = lift(tink_core_Outcome.Success(ret));
							done = true;
							$yield(v);
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				};
				let step = null;
				step = function() {
					if(!done && !fireWhenReady()) {
						while(index < ret.length) {
							index += 1;
							let index1 = index - 1;
							let p = a[index1];
							let check = function(o) {
								let _g = fn(o);
								switch(_g._hx_index) {
								case 0:
									ret[index1] = _g.data;
									fireWhenReady();
									break;
								case 1:
									let _g1 = _g.failure;
									let _g2 = 0;
									while(_g2 < links.length) {
										let l = links[_g2];
										++_g2;
										if(l != null) {
											l.cancel();
										}
									}
									let v = lift(tink_core_Outcome.Failure(_g1));
									done = true;
									$yield(v);
									break;
								}
							};
							let _g = p.getStatus();
							if(_g._hx_index == 3) {
								let _hx_tmp;
								_hx_tmp = tink_core_Lazy.get(_g.result);
								check(_hx_tmp);
								if(!done) {
									continue;
								}
							} else {
								pending += 1;
								links.push(p.handle(function(o) {
									pending -= 1;
									check(o);
									if(!done) {
										step();
									}
								}));
							}
							break;
						}
					}
				};
				let _g2 = 0;
				let _g3 = concurrency1;
				while(_g2 < _g3) {
					++_g2;
					step();
				}
				return tink_core_CallbackLink.fromMany(links);
			});
		}
	}
	static lazy(l) {
		return new tink_core__$Future_SyncFuture(l);
	}
	static sync(v) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
	}
	static isFuture(maybeFuture) {
		return js_Boot.__implements(maybeFuture,tink_core__$Future_FutureObject);
	}
	static async(init,lazy) {
		if(lazy == null) {
			lazy = false;
		}
		let ret = tink_core_Future.irreversible(init);
		if(lazy) {
			return ret;
		} else {
			ret.eager();
			return ret;
		}
	}
	static irreversible(init) {
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			init($yield);
			return null;
		});
	}
	static or(a,b) {
		return tink_core_Future.first(a,b);
	}
	static either(a,b) {
		return tink_core_Future.first(tink_core_Future.map(a,haxe_ds_Either.Left),tink_core_Future.map(b,haxe_ds_Either.Right));
	}
	static and(a,b) {
		return tink_core_Future.merge(a,b,function(a,b) {
			return new tink_core_MPair(a,b);
		});
	}
	static _tryFailingFlatMap(f,map) {
		return tink_core_Future.flatMap(f,function(o) {
			switch(o._hx_index) {
			case 0:
				return map(o.data);
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
			}
		});
	}
	static _tryFlatMap(f,map) {
		return tink_core_Future.flatMap(f,function(o) {
			switch(o._hx_index) {
			case 0:
				return tink_core_Future.map(map(o.data),tink_core_Outcome.Success);
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
			}
		});
	}
	static _tryFailingMap(f,map) {
		return tink_core_Future.map(f,function(o) {
			return tink_core_OutcomeTools.flatMap(o,tink_core__$Outcome_OutcomeMapper.withSameError(map));
		});
	}
	static _tryMap(f,map) {
		return tink_core_Future.map(f,function(o) {
			return tink_core_OutcomeTools.map(o,map);
		});
	}
	static _flatMap(f,map) {
		return tink_core_Future.flatMap(f,map);
	}
	static _map(f,map) {
		return tink_core_Future.map(f,map);
	}
	static trigger() {
		return new tink_core_FutureTrigger();
	}
	static delay(ms,value) {
		let this1 = tink_core_Future.irreversible(function(cb) {
			haxe_Timer.delay(function() {
				cb(tink_core_Lazy.get(value));
			},ms);
		});
		this1.eager();
		return this1;
	}
}
var tink_core_FutureStatus = $hxEnums["tink.core.FutureStatus"] = { __ename__:true,__constructs__:null
	,Suspended: {_hx_name:"Suspended",_hx_index:0,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Awaited: {_hx_name:"Awaited",_hx_index:1,__enum__:"tink.core.FutureStatus",toString:$estr}
	,EagerlyAwaited: {_hx_name:"EagerlyAwaited",_hx_index:2,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Ready: ($_=function(result) { return {_hx_index:3,result:result,__enum__:"tink.core.FutureStatus",toString:$estr}; },$_._hx_name="Ready",$_.__params__ = ["result"],$_)
	,NeverEver: {_hx_name:"NeverEver",_hx_index:4,__enum__:"tink.core.FutureStatus",toString:$estr}
};
tink_core_FutureStatus.__constructs__ = [tink_core_FutureStatus.Suspended,tink_core_FutureStatus.Awaited,tink_core_FutureStatus.EagerlyAwaited,tink_core_FutureStatus.Ready,tink_core_FutureStatus.NeverEver];
class tink_core_FutureTrigger {
	constructor() {
		this.status = tink_core_FutureStatus.Awaited;
		this.list = new tink_core_CallbackList(true);
	}
	getStatus() {
		return this.status;
	}
	handle(callback) {
		let _g = this.status;
		if(_g._hx_index == 3) {
			tink_core_Callback.invoke(callback,tink_core_Lazy.get(_g.result));
			return null;
		} else {
			let _this = this.list;
			if(_this.disposeHandlers == null) {
				return null;
			} else {
				let node = new tink_core__$Callback_ListCell(callback,_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					let fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				return node;
			}
		}
	}
	eager() {
	}
	asFuture() {
		return this;
	}
	trigger(result) {
		if(this.status._hx_index == 3) {
			return false;
		} else {
			this.status = tink_core_FutureStatus.Ready(new tink_core__$Lazy_LazyConst(result));
			this.list.invoke(result);
			return true;
		}
	}
}
tink_core_FutureTrigger.__name__ = true;
tink_core_FutureTrigger.__interfaces__ = [tink_core__$Future_FutureObject];
Object.assign(tink_core_FutureTrigger.prototype, {
	__class__: tink_core_FutureTrigger
});
class tink_core_JsPromiseTools {
	static toSurprise(promise) {
		return tink_core_Future.ofJsPromise(promise);
	}
	static toPromise(promise) {
		return tink_core_Future.ofJsPromise(promise);
	}
}
tink_core_JsPromiseTools.__name__ = true;
class tink_core__$Future_SuspendableFuture {
	constructor(wakeup) {
		this.status = tink_core_FutureStatus.Suspended;
		this.wakeup = wakeup;
		this.callbacks = new tink_core_CallbackList(true);
		let _gthis = this;
		this.callbacks.ondrain = function() {
			if(_gthis.status == tink_core_FutureStatus.Awaited) {
				_gthis.status = tink_core_FutureStatus.Suspended;
				let this1 = _gthis.link;
				if(this1 != null) {
					this1.cancel();
				}
				_gthis.link = null;
			}
		};
		this.callbacks.onfill = function() {
			if(_gthis.status == tink_core_FutureStatus.Suspended) {
				_gthis.status = tink_core_FutureStatus.Awaited;
				_gthis.arm();
			}
		};
	}
	getStatus() {
		return this.status;
	}
	trigger(value) {
		if(this.status._hx_index != 3) {
			this.status = tink_core_FutureStatus.Ready(new tink_core__$Lazy_LazyConst(value));
			let link = this.link;
			this.link = null;
			this.wakeup = null;
			this.callbacks.invoke(value);
			if(link != null) {
				link.cancel();
			}
		}
	}
	handle(callback) {
		let _g = this.status;
		if(_g._hx_index == 3) {
			tink_core_Callback.invoke(callback,tink_core_Lazy.get(_g.result));
			return null;
		} else {
			let _this = this.callbacks;
			if(_this.disposeHandlers == null) {
				return null;
			} else {
				let node = new tink_core__$Callback_ListCell(callback,_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					let fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				return node;
			}
		}
	}
	arm() {
		let _gthis = this;
		this.link = this.wakeup(function(x) {
			_gthis.trigger(x);
		});
	}
	eager() {
		switch(this.status._hx_index) {
		case 0:
			this.status = tink_core_FutureStatus.EagerlyAwaited;
			this.arm();
			break;
		case 1:
			this.status = tink_core_FutureStatus.EagerlyAwaited;
			break;
		default:
		}
	}
}
tink_core__$Future_SuspendableFuture.__name__ = true;
tink_core__$Future_SuspendableFuture.__interfaces__ = [tink_core__$Future_FutureObject];
Object.assign(tink_core__$Future_SuspendableFuture.prototype, {
	__class__: tink_core__$Future_SuspendableFuture
});
class tink_core_Lazy {
	static get_computed(this1) {
		return this1.isComputed();
	}
	static get(this1) {
		this1.compute();
		return this1.get();
	}
	static fromNoise(l) {
		return l;
	}
	static ofFunc(f) {
		return new tink_core__$Lazy_LazyFunc(f);
	}
	static map(this1,f) {
		return new tink_core__$Lazy_LazyFunc(function() {
			return f(this1.get());
		},this1);
	}
	static flatMap(this1,f) {
		return new tink_core__$Lazy_LazyFunc(function() {
			return tink_core_Lazy.get(f(this1.get()));
		},this1);
	}
	static ofConst(c) {
		return new tink_core__$Lazy_LazyConst(c);
	}
}
class tink_core__$Lazy_LazyFunc {
	constructor(f,from) {
		this.f = f;
		this.from = from;
	}
	underlying() {
		return this.from;
	}
	isComputed() {
		return this.f == null;
	}
	get() {
		return this.result;
	}
	compute() {
		let _g = this.f;
		if(_g != null) {
			this.f = null;
			let _g1 = this.from;
			if(_g1 != null) {
				let cur = _g1;
				this.from = null;
				let stack = [];
				while(cur != null && !cur.isComputed()) {
					stack.push(cur);
					cur = cur.underlying();
				}
				stack.reverse();
				let _g = 0;
				while(_g < stack.length) stack[_g++].compute();
			}
			this.result = _g();
		}
	}
}
tink_core__$Lazy_LazyFunc.__name__ = true;
tink_core__$Lazy_LazyFunc.__interfaces__ = [tink_core__$Lazy_LazyObject];
Object.assign(tink_core__$Lazy_LazyFunc.prototype, {
	__class__: tink_core__$Lazy_LazyFunc
});
class tink_core_NamedWith {
	constructor(name,value) {
		this.name = name;
		this.value = value;
	}
}
tink_core_NamedWith.__name__ = true;
Object.assign(tink_core_NamedWith.prototype, {
	__class__: tink_core_NamedWith
});
class tink_core_Noise {
	static ofAny(t) {
		return null;
	}
}
class tink_core_OptionTools {
	static force(o,pos) {
		if(o._hx_index == 0) {
			return o.v;
		} else {
			throw haxe_Exception.thrown(new tink_core_TypedError(404,"Some value expected but none found",pos));
		}
	}
	static sure(o,pos) {
		if(o._hx_index == 0) {
			return o.v;
		} else {
			throw haxe_Exception.thrown(new tink_core_TypedError(404,"Some value expected but none found",pos));
		}
	}
	static toOutcome(o,pos) {
		switch(o._hx_index) {
		case 0:
			return tink_core_Outcome.Success(o.v);
		case 1:
			return tink_core_Outcome.Failure(new tink_core_TypedError(404,"Some value expected but none found in " + pos.fileName + "@line " + pos.lineNumber,{ fileName : "tink/core/Option.hx", lineNumber : 31, className : "tink.core.OptionTools", methodName : "toOutcome"}));
		}
	}
	static or(o,l) {
		if(o._hx_index == 0) {
			return o.v;
		} else {
			return tink_core_Lazy.get(l);
		}
	}
	static orTry(o,fallback) {
		if(o._hx_index == 0) {
			return o;
		} else {
			return tink_core_Lazy.get(fallback);
		}
	}
	static orNull(o) {
		if(o._hx_index == 0) {
			return o.v;
		} else {
			return null;
		}
	}
	static filter(o,f) {
		if(o._hx_index == 0) {
			if(f(o.v) == false) {
				return haxe_ds_Option.None;
			} else {
				return o;
			}
		} else {
			return o;
		}
	}
	static satisfies(o,f) {
		if(o._hx_index == 0) {
			return f(o.v);
		} else {
			return false;
		}
	}
	static equals(o,v) {
		if(o._hx_index == 0) {
			return o.v == v;
		} else {
			return false;
		}
	}
	static map(o,f) {
		if(o._hx_index == 0) {
			return haxe_ds_Option.Some(f(o.v));
		} else {
			return haxe_ds_Option.None;
		}
	}
	static flatMap(o,f) {
		if(o._hx_index == 0) {
			return f(o.v);
		} else {
			return haxe_ds_Option.None;
		}
	}
	static iterator(o) {
		return new tink_core_OptionIter(o);
	}
	static toArray(o) {
		if(o._hx_index == 0) {
			return [o.v];
		} else {
			return [];
		}
	}
}
tink_core_OptionTools.__name__ = true;
class tink_core_OptionIter {
	constructor(o) {
		this.alive = true;
		if(o._hx_index == 0) {
			this.value = o.v;
		} else {
			this.alive = false;
		}
	}
	hasNext() {
		return this.alive;
	}
	next() {
		this.alive = false;
		return this.value;
	}
}
tink_core_OptionIter.__name__ = true;
Object.assign(tink_core_OptionIter.prototype, {
	__class__: tink_core_OptionIter
});
var tink_core_Outcome = $hxEnums["tink.core.Outcome"] = { __ename__:true,__constructs__:null
	,Success: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Success",$_.__params__ = ["data"],$_)
	,Failure: ($_=function(failure) { return {_hx_index:1,failure:failure,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Failure",$_.__params__ = ["failure"],$_)
};
tink_core_Outcome.__constructs__ = [tink_core_Outcome.Success,tink_core_Outcome.Failure];
class tink_core_OutcomeTools {
	static sure(outcome) {
		switch(outcome._hx_index) {
		case 0:
			return outcome.data;
		case 1:
			let _g = outcome.failure;
			let _g1 = tink_core_TypedError.asError(_g);
			if(_g1 == null) {
				throw haxe_Exception.thrown(_g);
			} else {
				return _g1.throwSelf();
			}
			break;
		}
	}
	static toOption(outcome) {
		switch(outcome._hx_index) {
		case 0:
			return haxe_ds_Option.Some(outcome.data);
		case 1:
			return haxe_ds_Option.None;
		}
	}
	static orNull(outcome) {
		switch(outcome._hx_index) {
		case 0:
			return outcome.data;
		case 1:
			return null;
		}
	}
	static orUse(outcome,fallback) {
		return tink_core_OutcomeTools.or(outcome,fallback);
	}
	static or(outcome,fallback) {
		switch(outcome._hx_index) {
		case 0:
			return outcome.data;
		case 1:
			return tink_core_Lazy.get(fallback);
		}
	}
	static orTry(outcome,fallback) {
		switch(outcome._hx_index) {
		case 0:
			return outcome;
		case 1:
			return tink_core_Lazy.get(fallback);
		}
	}
	static equals(outcome,to) {
		switch(outcome._hx_index) {
		case 0:
			return outcome.data == to;
		case 1:
			return false;
		}
	}
	static map(outcome,transform) {
		switch(outcome._hx_index) {
		case 0:
			return tink_core_Outcome.Success(transform(outcome.data));
		case 1:
			return tink_core_Outcome.Failure(outcome.failure);
		}
	}
	static isSuccess(outcome) {
		if(outcome._hx_index == 0) {
			return true;
		} else {
			return false;
		}
	}
	static flatMap(o,mapper) {
		return tink_core__$Outcome_OutcomeMapper.apply(mapper,o);
	}
	static swap(outcome,v) {
		switch(outcome._hx_index) {
		case 0:
			return tink_core_Outcome.Success(v);
		case 1:
			return tink_core_Outcome.Failure(outcome.failure);
		}
	}
	static next(outcome,f) {
		switch(outcome._hx_index) {
		case 0:
			return f(outcome.data);
		case 1:
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(outcome.failure)));
		}
	}
	static attempt(f,report) {
		try {
			return tink_core_Outcome.Success(f());
		} catch( _g ) {
			return tink_core_Outcome.Failure(report(haxe_Exception.caught(_g).unwrap()));
		}
	}
	static flatten(o) {
		switch(o._hx_index) {
		case 0:
			let _g = o.data;
			switch(_g._hx_index) {
			case 0:
				return tink_core_Outcome.Success(_g.data);
			case 1:
				return tink_core_Outcome.Failure(_g.failure);
			}
			break;
		case 1:
			return tink_core_Outcome.Failure(o.failure);
		}
	}
}
tink_core_OutcomeTools.__name__ = true;
class tink_core__$Outcome_OutcomeMapper {
	static _new(f) {
		return { f : f};
	}
	static apply(this1,o) {
		return this1.f(o);
	}
	static withSameError(f) {
		return tink_core__$Outcome_OutcomeMapper._new(function(o) {
			switch(o._hx_index) {
			case 0:
				return f(o.data);
			case 1:
				return tink_core_Outcome.Failure(o.failure);
			}
		});
	}
	static withEitherError(f) {
		return tink_core__$Outcome_OutcomeMapper._new(function(o) {
			switch(o._hx_index) {
			case 0:
				let _g = f(o.data);
				switch(_g._hx_index) {
				case 0:
					return tink_core_Outcome.Success(_g.data);
				case 1:
					return tink_core_Outcome.Failure(haxe_ds_Either.Right(_g.failure));
				}
				break;
			case 1:
				return tink_core_Outcome.Failure(haxe_ds_Either.Left(o.failure));
			}
		});
	}
}
class tink_core_Pair {
	static _new(a,b) {
		return new tink_core_MPair(a,b);
	}
	static get_a(this1) {
		return this1.a;
	}
	static get_b(this1) {
		return this1.b;
	}
	static toBool(this1) {
		return this1 != null;
	}
	static isNil(this1) {
		return this1 == null;
	}
	static nil() {
		return null;
	}
}
class tink_core_MPair {
	constructor(a,b) {
		this.a = a;
		this.b = b;
	}
}
tink_core_MPair.__name__ = true;
Object.assign(tink_core_MPair.prototype, {
	__class__: tink_core_MPair
});
class tink_core_ProgressValue {
	static _new(value,total) {
		return new tink_core_MPair(value,total);
	}
	static normalize(this1) {
		let o = this1.b;
		if(o._hx_index == 0) {
			return haxe_ds_Option.Some(this1.a / o.v);
		} else {
			return haxe_ds_Option.None;
		}
	}
	static get_value(this1) {
		return this1.a;
	}
	static get_total(this1) {
		return this1.b;
	}
}
class tink_core_Progress {
	static listen(this1,cb) {
		return this1.progressed.listen(cb);
	}
	static handle(this1,cb) {
		return this1.result.handle(cb);
	}
	static trigger() {
		return new tink_core_ProgressTrigger();
	}
	static make(f) {
		return new tink_core__$Progress_SuspendableProgress(function(fire) {
			return f(function(value,total) {
				fire(tink_core_ProgressStatus.InProgress(new tink_core_MPair(value,total)));
			},function(result) {
				fire(tink_core_ProgressStatus.Finished(result));
			});
		});
	}
	static map(this1,f) {
		return new tink_core__$Progress_ProgressObject(tink_core_Signal.map(this1.changed,function(s) {
			return tink_core_ProgressStatusTools.map(s,f);
		}),function() {
			return tink_core_ProgressStatusTools.map(this1.getStatus(),f);
		});
	}
	static asFuture(this1) {
		return this1.result;
	}
	static promise(v) {
		return new tink_core__$Progress_SuspendableProgress(function(fire) {
			let inner = new tink_core_CallbackLinkRef();
			return new tink_core__$Callback_LinkPair(v.handle(function(o) {
				switch(o._hx_index) {
				case 0:
					let this1 = o.data.changed.listen(function(s) {
						fire(tink_core_ProgressStatusTools.map(s,tink_core_Outcome.Success));
					});
					inner.link = this1;
					break;
				case 1:
					fire(tink_core_ProgressStatus.Finished(tink_core_Outcome.Failure(o.failure)));
					break;
				}
			}),inner);
		});
	}
	static flatten(v) {
		return tink_core_Progress.map(tink_core_Progress.promise(v),function(o) {
			switch(o._hx_index) {
			case 0:
				let _g = o.data;
				switch(_g._hx_index) {
				case 0:
					return tink_core_Outcome.Success(_g.data);
				case 1:
					return tink_core_Outcome.Failure(_g.failure);
				}
				break;
			case 1:
				return tink_core_Outcome.Failure(o.failure);
			}
		});
	}
	static future(v) {
		return new tink_core__$Progress_SuspendableProgress(function(fire) {
			let inner = new tink_core_CallbackLinkRef();
			return new tink_core__$Callback_LinkPair(v.handle(function(p) {
				let this1 = p.changed.listen(fire);
				inner.link = this1;
			}),inner);
		});
	}
	static next(this1,f) {
		return tink_core_Future.flatMap(this1.result,f);
	}
}
class tink_core__$Progress_ProgressObject {
	constructor(changed,getStatus) {
		if(tink_core__$Progress_ProgressObject._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(changed,getStatus);
	}
	_hx_constructor(changed,getStatus) {
		this.changed = changed;
		this.progressed = new tink_core__$Signal_Suspendable(function(fire) {
			return changed.listen(function(s) {
				if(s._hx_index == 0) {
					fire(s.v);
				}
			});
		},null);
		this.getStatus = getStatus;
		this.result = new tink_core__$Future_SuspendableFuture(function(fire) {
			let _g = getStatus();
			if(_g._hx_index == 1) {
				fire(_g.v);
				return null;
			} else {
				return changed.listen(function(s) {
					if(s._hx_index == 1) {
						fire(s.v);
					}
				});
			}
		});
	}
	get_status() {
		return this.getStatus();
	}
}
tink_core__$Progress_ProgressObject.__name__ = true;
Object.assign(tink_core__$Progress_ProgressObject.prototype, {
	__class__: tink_core__$Progress_ProgressObject
});
class tink_core__$Progress_SuspendableProgress extends tink_core__$Progress_ProgressObject {
	constructor(wakeup,status) {
		if(status == null) {
			status = tink_core_ProgressStatus.InProgress(tink_core_ProgressValue.ZERO);
		}
		let disposable = tink_core_AlreadyDisposed.INST;
		let changed;
		switch(status._hx_index) {
		case 0:
			changed = new tink_core__$Signal_Suspendable(function(fire) {
				return wakeup(function(s) {
					status = s;
					fire(status);
				});
			},function(d) {
				disposable = d;
			});
			break;
		case 1:
			changed = tink_core_Signal.dead();
			break;
		}
		super(changed,function() {
			return status;
		});
	}
	noop(_,_1) {
		return null;
	}
}
tink_core__$Progress_SuspendableProgress.__name__ = true;
tink_core__$Progress_SuspendableProgress.__super__ = tink_core__$Progress_ProgressObject;
Object.assign(tink_core__$Progress_SuspendableProgress.prototype, {
	__class__: tink_core__$Progress_SuspendableProgress
});
class tink_core_ProgressTrigger extends tink_core__$Progress_ProgressObject {
	constructor(status) {
		tink_core__$Progress_ProgressObject._hx_skip_constructor = true;
		super();
		tink_core__$Progress_ProgressObject._hx_skip_constructor = false;
		this._hx_constructor(status);
	}
	_hx_constructor(status) {
		this._changed = null;
		if(status == null) {
			status = tink_core_ProgressStatus.InProgress(tink_core_ProgressValue.ZERO);
			this._status = status;
		}
		let _gthis = this;
		super._hx_constructor((status == null ? false : status._hx_index == 1) ? tink_core_Signal.dead() : this._changed = tink_core_Signal.trigger(),function() {
			return _gthis._status;
		});
	}
	asProgress() {
		return this;
	}
	progress(v,total) {
		if(this._status._hx_index != 1) {
			this._changed.handlers.invoke(this._status = tink_core_ProgressStatus.InProgress(new tink_core_MPair(v,total)));
		}
	}
	finish(v) {
		if(this._status._hx_index != 1) {
			this._changed.handlers.invoke(this._status = tink_core_ProgressStatus.Finished(v));
		}
	}
}
tink_core_ProgressTrigger.__name__ = true;
tink_core_ProgressTrigger.__super__ = tink_core__$Progress_ProgressObject;
Object.assign(tink_core_ProgressTrigger.prototype, {
	__class__: tink_core_ProgressTrigger
});
class tink_core_UnitInterval {
	static toPercentageString(this1,dp) {
		let m = Math.pow(10,dp);
		let v = Math.round(this1 * m * 100) / m;
		let s = v == null ? "null" : "" + v;
		let _g = s.indexOf(".");
		if(_g == -1) {
			return s + "." + StringTools.lpad("","0",dp) + "%";
		} else if(s.length - _g > dp) {
			return HxOverrides.substr(s,0,dp + _g + 1) + "%";
		} else {
			return StringTools.rpad(s,"0",_g + dp + 1) + "%";
		}
	}
}
var tink_core_ProgressStatus = $hxEnums["tink.core.ProgressStatus"] = { __ename__:true,__constructs__:null
	,InProgress: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"tink.core.ProgressStatus",toString:$estr}; },$_._hx_name="InProgress",$_.__params__ = ["v"],$_)
	,Finished: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"tink.core.ProgressStatus",toString:$estr}; },$_._hx_name="Finished",$_.__params__ = ["v"],$_)
};
tink_core_ProgressStatus.__constructs__ = [tink_core_ProgressStatus.InProgress,tink_core_ProgressStatus.Finished];
class tink_core_ProgressStatusTools {
	static map(p,f) {
		switch(p._hx_index) {
		case 0:
			return tink_core_ProgressStatus.InProgress(p.v);
		case 1:
			return tink_core_ProgressStatus.Finished(f(p.v));
		}
	}
}
tink_core_ProgressStatusTools.__name__ = true;
class tink_core_TotalTools {
	static eq(a,b) {
		switch(a._hx_index) {
		case 0:
			if(b._hx_index == 0) {
				return a.v == b.v;
			} else {
				return false;
			}
			break;
		case 1:
			if(b._hx_index == 1) {
				return true;
			} else {
				return false;
			}
			break;
		}
	}
}
tink_core_TotalTools.__name__ = true;
class tink_core_ProgressTools {
	static asPromise(p) {
		return p.result;
	}
}
tink_core_ProgressTools.__name__ = true;
class tink_core_Promise {
	static _new(f) {
		return new tink_core__$Future_SuspendableFuture(function(cb) {
			return f(function(v) {
				cb(tink_core_Outcome.Success(v));
			},function(e) {
				cb(tink_core_Outcome.Failure(e));
			});
		});
	}
	static eager(this1) {
		this1.eager();
		return this1;
	}
	static map(this1,f) {
		return tink_core_Future.map(this1,f);
	}
	static flatMap(this1,f) {
		return tink_core_Future.flatMap(this1,f);
	}
	static tryRecover(this1,f) {
		return tink_core_Future.flatMap(this1,function(o) {
			switch(o._hx_index) {
			case 0:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o));
			case 1:
				return f(o.failure);
			}
		});
	}
	static recover(this1,f) {
		return tink_core_Future.flatMap(this1,function(o) {
			switch(o._hx_index) {
			case 0:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o.data));
			case 1:
				return f(o.failure);
			}
		});
	}
	static mapError(this1,f) {
		return tink_core_Future.map(this1,function(o) {
			switch(o._hx_index) {
			case 0:
				return o;
			case 1:
				return tink_core_Outcome.Failure(f(o.failure));
			}
		});
	}
	static handle(this1,cb) {
		return this1.handle(cb);
	}
	static noise(this1) {
		if(this1.getStatus()._hx_index == 4) {
			return tink_core_Promise.NEVER;
		} else {
			return tink_core_Promise.next(this1,function(v) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
			});
		}
	}
	static isSuccess(this1) {
		return tink_core_Future.map(this1,function(o) {
			return tink_core_OutcomeTools.isSuccess(o);
		});
	}
	static next(this1,f,gather) {
		return tink_core_Future.flatMap(this1,function(o) {
			switch(o._hx_index) {
			case 0:
				return f(o.data);
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
			}
		});
	}
	static swap(this1,v) {
		return tink_core_Promise.next(this1,function(_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(v)));
		});
	}
	static swapError(this1,e) {
		return tink_core_Promise.mapError(this1,function(_) {
			return e;
		});
	}
	static merge(this1,other,merger,gather) {
		return tink_core_Future.flatMap(tink_core_Future.merge(this1,other,function(a,b) {
			switch(a._hx_index) {
			case 0:
				let _g = a.data;
				switch(b._hx_index) {
				case 0:
					return merger(_g,b.data);
				case 1:
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(b.failure)));
				}
				break;
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(a.failure)));
			}
		}),function(o) {
			return o;
		});
	}
	static and(a,b) {
		return tink_core_Promise.merge(a,b,function(a,b) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(new tink_core_MPair(a,b))));
		});
	}
	static iterate(promises,$yield,fallback) {
		return tink_core_Future.irreversible(function(cb) {
			let iter = $getIterator(promises);
			let next = null;
			next = function() {
				if(iter.hasNext()) {
					iter.next().handle(function(o) {
						switch(o._hx_index) {
						case 0:
							$yield(o.data).handle(function(o) {
								switch(o._hx_index) {
								case 0:
									let _g = o.data;
									switch(_g._hx_index) {
									case 0:
										cb(tink_core_Outcome.Success(_g.v));
										break;
									case 1:
										next();
										break;
									}
									break;
								case 1:
									cb(tink_core_Outcome.Failure(o.failure));
									break;
								}
							});
							break;
						case 1:
							cb(tink_core_Outcome.Failure(o.failure));
							break;
						}
					});
				} else {
					fallback.handle(cb);
				}
			};
			next();
		});
	}
	static retry(gen,next) {
		let stamp = function() {
			let hrtime = process.hrtime();
			return (hrtime[0] + hrtime[1] / 1e9) * 1000;
		};
		let start = stamp();
		let attempt = null;
		attempt = function(count) {
			let f = function(error) {
				return tink_core_Promise.next(next({ attempt : count, error : error, elapsed : stamp() - start}),function(_) {
					return attempt(count + 1);
				});
			};
			return tink_core_Future.flatMap(gen(),function(o) {
				switch(o._hx_index) {
				case 0:
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o));
				case 1:
					return f(o.failure);
				}
			});
		};
		return attempt(1);
	}
	static ofJsPromise(promise) {
		return tink_core_Future.ofJsPromise(promise);
	}
	static toJsPromise(this1) {
		return new Promise(function(resolve,reject) {
			this1.handle(function(o) {
				switch(o._hx_index) {
				case 0:
					resolve(o.data);
					break;
				case 1:
					reject(o.failure.toJsError());
					break;
				}
			});
		});
	}
	static ofSpecific(s) {
		return s;
	}
	static fromNever(l) {
		return l;
	}
	static ofTrigger(f) {
		return f;
	}
	static ofHappyTrigger(f) {
		return tink_core_Future.map(f,tink_core_Outcome.Success);
	}
	static ofFuture(f) {
		return tink_core_Future.map(f,tink_core_Outcome.Success);
	}
	static ofOutcome(o) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o));
	}
	static ofError(e) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(e)));
	}
	static ofData(d) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(d)));
	}
	static lazy(p) {
		return new tink_core__$Future_SuspendableFuture(function(cb) {
			return tink_core_Lazy.get(p).handle(cb);
		});
	}
	static inParallel(a,concurrency) {
		return tink_core_Promise.many(a,concurrency);
	}
	static many(a,concurrency) {
		return tink_core_Future.processMany(a,concurrency,function(o) {
			return o;
		},function(o) {
			return o;
		});
	}
	static inSequence(a) {
		return tink_core_Promise.many(a,1);
	}
	static cache(gen) {
		let p = null;
		return function() {
			let ret = p;
			if(ret == null) {
				let sync = false;
				ret = tink_core_Promise.next(gen(),function(o) {
					o.b.handle(function(_) {
						sync = true;
						p = null;
					});
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(o.a)));
				});
				if(!sync) {
					p = ret;
				}
			}
			return tink_core_Future.map(ret,function(o) {
				if(!tink_core_OutcomeTools.isSuccess(o)) {
					p = null;
				}
				return o;
			});
		};
	}
	static lift(p) {
		return p;
	}
	static trigger() {
		return new tink_core_FutureTrigger();
	}
	static resolve(v) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(v)));
	}
	static reject(e) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(e)));
	}
}
class tink_core_Next {
	static ofSafe(f) {
		return function(x) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(x)));
		};
	}
	static ofSync(f) {
		return function(x) {
			return tink_core_Future.map(f(x),tink_core_Outcome.Success);
		};
	}
	static ofSafeSync(f) {
		return function(x) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(f(x))));
		};
	}
	static _chain(a,b) {
		return function(v) {
			return tink_core_Promise.next(a(v),b);
		};
	}
}
class tink_core_Recover {
	static ofSync(f) {
		return function(e) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(e)));
		};
	}
}
class tink_core_Combiner {
	static ofSync(f) {
		return function(x1,x2) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(x1,x2)));
		};
	}
	static ofSafe(f) {
		return function(x1,x2) {
			return tink_core_Future.map(f(x1,x2),tink_core_Outcome.Success);
		};
	}
	static ofSafeSync(f) {
		return function(x1,x2) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(f(x1,x2))));
		};
	}
}
class tink_core_PromiseTrigger {
	static _new() {
		return new tink_core_FutureTrigger();
	}
	static resolve(this1,v) {
		return this1.trigger(tink_core_Outcome.Success(v));
	}
	static reject(this1,e) {
		return this1.trigger(tink_core_Outcome.Failure(e));
	}
	static asPromise(this1) {
		return this1;
	}
}
class tink_core_Ref {
	static _new() {
		return new Array(1);
	}
	static get_value(this1) {
		return this1[0];
	}
	static set_value(this1,param) {
		return this1[0] = param;
	}
	static toString(this1) {
		return "@[" + Std.string(this1[0]) + "]";
	}
	static to(v) {
		let ret = new Array(1);
		ret[0] = v;
		return ret;
	}
}
class tink_core_Gather {
	static _new(v) {
		return v;
	}
	static ofBool(b) {
		return b;
	}
}
class tink_core_Signal {
	static _new(f,init) {
		return new tink_core__$Signal_Suspendable(f,init);
	}
	static handle(this1,handler) {
		return this1.listen(handler);
	}
	static map(this1,f,gather) {
		return tink_core__$Signal_Suspendable.over(this1,function(fire) {
			return this1.listen(function(v) {
				fire(f(v));
			});
		});
	}
	static flatMap(this1,f,gather) {
		return tink_core__$Signal_Suspendable.over(this1,function(fire) {
			return this1.listen(function(v) {
				f(v).handle(fire);
			});
		});
	}
	static filter(this1,f,gather) {
		return tink_core__$Signal_Suspendable.over(this1,function(fire) {
			return this1.listen(function(v) {
				if(f(v)) {
					fire(v);
				}
			});
		});
	}
	static select(this1,selector,gather) {
		return tink_core__$Signal_Suspendable.over(this1,function(fire) {
			return this1.listen(function(v) {
				let _g = selector(v);
				if(_g._hx_index == 0) {
					fire(_g.v);
				}
			});
		});
	}
	static join(this1,that,gather) {
		if(this1.get_disposed()) {
			return that;
		} else if(that.get_disposed()) {
			return this1;
		} else {
			return new tink_core__$Signal_Suspendable(function(fire) {
				let cb = fire;
				return new tink_core__$Callback_LinkPair(this1.listen(cb),that.listen(cb));
			},function(self) {
				let release = function() {
					if(this1.get_disposed() && that.get_disposed()) {
						self.dispose();
					}
				};
				this1.ondispose(release);
				that.ondispose(release);
			});
		}
	}
	static nextTime(this1,condition) {
		return tink_core_Signal.pickNext(this1,function(v) {
			if(condition == null || condition(v)) {
				return haxe_ds_Option.Some(v);
			} else {
				return haxe_ds_Option.None;
			}
		});
	}
	static pickNext(this1,selector) {
		let ret = new tink_core_FutureTrigger();
		let link = null;
		link = this1.listen(function(v) {
			let _g = selector(v);
			switch(_g._hx_index) {
			case 0:
				ret.trigger(_g.v);
				break;
			case 1:
				break;
			}
		});
		ret.handle(link == null ? tink_core_CallbackLink.noop : ($_=link,$bind($_,$_.cancel)));
		return ret;
	}
	static until(this1,end) {
		return new tink_core__$Signal_Suspendable(function($yield) {
			return this1.listen($yield);
		},function(self) {
			end.handle($bind(self,self.dispose));
		});
	}
	static next(this1,condition) {
		return tink_core_Signal.nextTime(this1,condition);
	}
	static noise(this1) {
		return tink_core_Signal.map(this1,function(_) {
			return null;
		});
	}
	static gather(this1) {
		return this1;
	}
	static create(f) {
		return new tink_core__$Signal_Suspendable(f,null);
	}
	static generate(generator,init) {
		return new tink_core__$Signal_Suspendable(function(fire) {
			generator(fire);
			return null;
		},init);
	}
	static trigger() {
		return new tink_core_SignalTrigger();
	}
	static ofClassical(add,remove,gather) {
		return new tink_core__$Signal_Suspendable(function(fire) {
			add(fire);
			let _g = remove;
			let a1 = fire;
			return new tink_core_SimpleLink(function() {
				_g(a1);
			});
		});
	}
	static dead() {
		return tink_core__$Signal_Disposed.INST;
	}
}
class tink_core__$Signal_SignalObject {
}
tink_core__$Signal_SignalObject.__name__ = true;
tink_core__$Signal_SignalObject.__isInterface__ = true;
tink_core__$Signal_SignalObject.__interfaces__ = [tink_core_Disposable];
Object.assign(tink_core__$Signal_SignalObject.prototype, {
	__class__: tink_core__$Signal_SignalObject
});
class tink_core__$Signal_Disposed extends tink_core_AlreadyDisposed {
	constructor() {
		super();
	}
	listen(cb) {
		return null;
	}
}
tink_core__$Signal_Disposed.__name__ = true;
tink_core__$Signal_Disposed.__interfaces__ = [tink_core__$Signal_SignalObject];
tink_core__$Signal_Disposed.__super__ = tink_core_AlreadyDisposed;
Object.assign(tink_core__$Signal_Disposed.prototype, {
	__class__: tink_core__$Signal_Disposed
});
class tink_core__$Signal_Suspendable {
	constructor(activate,init) {
		this.handlers = new tink_core_CallbackList();
		this.activate = activate;
		this.init = init;
		let _gthis = this;
		this.handlers.ondrain = function() {
			let this1 = _gthis.subscription;
			if(this1 != null) {
				this1.cancel();
			}
		};
		this.handlers.onfill = function() {
			if(init != null) {
				let f = init;
				init = null;
				f(_gthis);
			}
			_gthis.subscription = activate(($_=_gthis.handlers,$bind($_,$_.invoke)));
		};
	}
	get_disposed() {
		return this.handlers.disposeHandlers == null;
	}
	dispose() {
		this.handlers.dispose();
	}
	ondispose(handler) {
		this.handlers.ondispose(handler);
	}
	listen(cb) {
		let _this = this.handlers;
		if(_this.disposeHandlers == null) {
			return null;
		} else {
			let node = new tink_core__$Callback_ListCell(cb,_this);
			_this.cells.push(node);
			if(_this.used++ == 0) {
				let fn = _this.onfill;
				if(tink_core_Callback.depth < 500) {
					tink_core_Callback.depth++;
					fn();
					tink_core_Callback.depth--;
				} else {
					tink_core_Callback.defer(fn);
				}
			}
			return node;
		}
	}
	static over(s,activate) {
		if(s.get_disposed()) {
			return tink_core_Signal.dead();
		} else {
			let ret = new tink_core__$Signal_Suspendable(activate);
			s.ondispose($bind(ret,ret.dispose));
			return ret;
		}
	}
}
tink_core__$Signal_Suspendable.__name__ = true;
tink_core__$Signal_Suspendable.__interfaces__ = [tink_core_OwnedDisposable,tink_core__$Signal_SignalObject];
Object.assign(tink_core__$Signal_Suspendable.prototype, {
	__class__: tink_core__$Signal_Suspendable
});
class tink_core_SignalTrigger {
	constructor() {
		this.handlers = new tink_core_CallbackList();
	}
	get_disposed() {
		return this.handlers.disposeHandlers == null;
	}
	dispose() {
		this.handlers.dispose();
	}
	ondispose(d) {
		this.handlers.ondispose(d);
	}
	trigger(event) {
		this.handlers.invoke(event);
	}
	getLength() {
		return this.handlers.used;
	}
	listen(cb) {
		let _this = this.handlers;
		if(_this.disposeHandlers == null) {
			return null;
		} else {
			let node = new tink_core__$Callback_ListCell(cb,_this);
			_this.cells.push(node);
			if(_this.used++ == 0) {
				let fn = _this.onfill;
				if(tink_core_Callback.depth < 500) {
					tink_core_Callback.depth++;
					fn();
					tink_core_Callback.depth--;
				} else {
					tink_core_Callback.defer(fn);
				}
			}
			return node;
		}
	}
	clear() {
		this.handlers.clear();
	}
	asSignal() {
		return this;
	}
}
tink_core_SignalTrigger.__name__ = true;
tink_core_SignalTrigger.__interfaces__ = [tink_core_OwnedDisposable,tink_core__$Signal_SignalObject];
Object.assign(tink_core_SignalTrigger.prototype, {
	__class__: tink_core_SignalTrigger
});
class tink_io_PipeOptions {
	static get_end(this1) {
		if(this1 != null) {
			return this1.end;
		} else {
			return false;
		}
	}
	static get_destructive(this1) {
		if(this1 != null) {
			return this1.destructive;
		} else {
			return false;
		}
	}
}
var tink_io_PipeResult = $hxEnums["tink.io.PipeResult"] = { __ename__:true,__constructs__:null
	,AllWritten: {_hx_name:"AllWritten",_hx_index:0,__enum__:"tink.io.PipeResult",toString:$estr}
	,SinkEnded: ($_=function(result,rest) { return {_hx_index:1,result:result,rest:rest,__enum__:"tink.io.PipeResult",toString:$estr}; },$_._hx_name="SinkEnded",$_.__params__ = ["result","rest"],$_)
	,SinkFailed: ($_=function(e,rest) { return {_hx_index:2,e:e,rest:rest,__enum__:"tink.io.PipeResult",toString:$estr}; },$_._hx_name="SinkFailed",$_.__params__ = ["e","rest"],$_)
	,SourceFailed: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"tink.io.PipeResult",toString:$estr}; },$_._hx_name="SourceFailed",$_.__params__ = ["e"],$_)
};
tink_io_PipeResult.__constructs__ = [tink_io_PipeResult.AllWritten,tink_io_PipeResult.SinkEnded,tink_io_PipeResult.SinkFailed,tink_io_PipeResult.SourceFailed];
class tink_io_PipeResultTools {
	static toOutcome(result) {
		switch(result._hx_index) {
		case 0:
			return tink_core_Outcome.Success(haxe_ds_Option.None);
		case 1:
			return tink_core_Outcome.Success(haxe_ds_Option.Some(result.result));
		case 2:
			return tink_core_Outcome.Failure(result.e);
		case 3:
			return tink_core_Outcome.Failure(result.e);
		}
	}
	static toResult(c,result,buffered) {
		let mk = function(s) {
			if(buffered == null) {
				return s;
			} else {
				return s.prepend(new tink_streams_Single(new tink_core__$Lazy_LazyConst(buffered)));
			}
		};
		switch(c._hx_index) {
		case 0:
			return tink_io_PipeResult.SinkEnded(result,mk(c.rest));
		case 1:
			return tink_io_PipeResult.SinkFailed(c.error,mk(c.at));
		case 2:
			return tink_io_PipeResult.SourceFailed(c.error);
		case 3:
			return tink_io_PipeResult.AllWritten;
		}
	}
}
tink_io_PipeResultTools.__name__ = true;
class tink_io_SinkObject {
}
tink_io_SinkObject.__name__ = true;
tink_io_SinkObject.__isInterface__ = true;
Object.assign(tink_io_SinkObject.prototype, {
	__class__: tink_io_SinkObject
});
class tink_io_SinkBase {
	get_sealed() {
		return true;
	}
	consume(source,options) {
		throw haxe_Exception.thrown("not implemented");
	}
}
tink_io_SinkBase.__name__ = true;
tink_io_SinkBase.__interfaces__ = [tink_io_SinkObject];
Object.assign(tink_io_SinkBase.prototype, {
	__class__: tink_io_SinkBase
});
class tink_io__$Sink_Blackhole extends tink_io_SinkBase {
	constructor() {
		super();
	}
	consume(source,options) {
		return tink_core_Future.map(source.forEach(tink_streams_Handler.ofSafe(function(_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
		})),function(o) {
			switch(o._hx_index) {
			case 0:
				throw haxe_Exception.thrown("unreachable");
			case 2:
				return tink_io_PipeResult.SourceFailed(o.error);
			case 3:
				return tink_io_PipeResult.AllWritten;
			}
		});
	}
}
tink_io__$Sink_Blackhole.__name__ = true;
tink_io__$Sink_Blackhole.__super__ = tink_io_SinkBase;
Object.assign(tink_io__$Sink_Blackhole.prototype, {
	__class__: tink_io__$Sink_Blackhole
});
class tink_io_SinkYielding {
	static end(this1) {
		if(this1.get_sealed()) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(false)));
		} else {
			return tink_core_Future.map(this1.consume(tink_io_Source.EMPTY,{ end : true}),function(r) {
				switch(r._hx_index) {
				case 0:
					return tink_core_Outcome.Success(true);
				case 1:
					return tink_core_Outcome.Success(true);
				case 2:
					return tink_core_Outcome.Failure(r.e);
				}
			});
		}
	}
	static dirty(this1) {
		return this1;
	}
	static ofError(e) {
		return new tink_io__$Sink_ErrorSink(e);
	}
	static ofPromised(p) {
		return new tink_io__$Sink_FutureSink(tink_core_Future.map(p,function(o) {
			switch(o._hx_index) {
			case 0:
				return o.data;
			case 1:
				return tink_io_SinkYielding.ofError(o.failure);
			}
		}));
	}
	static ofNodeStream(name,r) {
		return tink_io_nodejs_NodejsSink.wrap(name,r);
	}
	static ofOutput(name,target,options) {
		let tmp;
		if(options == null) {
			tmp = tink_io_Worker.get();
		} else {
			let _g = options.worker;
			tmp = _g == null ? tink_io_Worker.get() : _g;
		}
		return new tink_io_std_OutputSink(name,target,tmp);
	}
}
class tink_io__$Sink_FutureSink extends tink_io_SinkBase {
	constructor(f) {
		super();
		this.f = f;
	}
	consume(source,options) {
		return tink_core_Future.flatMap(this.f,function(sink) {
			return sink.consume(source,options);
		});
	}
}
tink_io__$Sink_FutureSink.__name__ = true;
tink_io__$Sink_FutureSink.__super__ = tink_io_SinkBase;
Object.assign(tink_io__$Sink_FutureSink.prototype, {
	__class__: tink_io__$Sink_FutureSink
});
class tink_io__$Sink_ErrorSink extends tink_io_SinkBase {
	constructor(error) {
		super();
		this.error = error;
	}
	get_sealed() {
		return false;
	}
	consume(source,options) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_PipeResult.SinkFailed(this.error,source)));
	}
}
tink_io__$Sink_ErrorSink.__name__ = true;
tink_io__$Sink_ErrorSink.__super__ = tink_io_SinkBase;
Object.assign(tink_io__$Sink_ErrorSink.prototype, {
	__class__: tink_io__$Sink_ErrorSink
});
class tink_streams_StreamObject {
}
tink_streams_StreamObject.__name__ = true;
tink_streams_StreamObject.__isInterface__ = true;
Object.assign(tink_streams_StreamObject.prototype, {
	__class__: tink_streams_StreamObject
});
class tink_streams_StreamBase {
	constructor() {
		if(tink_streams_StreamBase._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.retainCount = 0;
	}
	get_depleted() {
		return false;
	}
	retain() {
		this.retainCount++;
		let retained = true;
		let _gthis = this;
		return function() {
			if(retained) {
				retained = false;
				if(--_gthis.retainCount == 0) {
					_gthis.destroy();
				}
			}
		};
	}
	next() {
		throw haxe_Exception.thrown("not implemented");
	}
	regroup(f) {
		return new tink_streams__$Stream_RegroupStream(this,f);
	}
	map(f) {
		return this.regroup(f);
	}
	filter(f) {
		return this.regroup(f);
	}
	destroy() {
	}
	append(other) {
		if(this.get_depleted()) {
			return other;
		} else {
			return tink_streams__$Stream_CompoundStream.of([this,other]);
		}
	}
	prepend(other) {
		if(this.get_depleted()) {
			return other;
		} else {
			return tink_streams__$Stream_CompoundStream.of([other,this]);
		}
	}
	blend(other) {
		if(this.get_depleted()) {
			return other;
		} else {
			return new tink_streams_BlendStream(this,other);
		}
	}
	decompose(into) {
		if(!this.get_depleted()) {
			into.push(this);
		}
	}
	idealize(rescue) {
		if(this.get_depleted()) {
			return tink_streams_Empty.inst;
		} else {
			return new tink_streams_IdealizeStream(this,rescue);
		}
	}
	reduce(initial,reducer) {
		let _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.forEach(tink_streams_Handler.ofUnknown(function(item) {
				return tink_core_Future.map(reducer(initial,item),function(o) {
					switch(o._hx_index) {
					case 0:
						initial = o.result;
						return tink_streams_Handled.Resume;
					case 1:
						return tink_streams_Handled.Clog(o.e);
					}
				});
			})).handle(function(c) {
				switch(c._hx_index) {
				case 0:
					throw haxe_Exception.thrown("assert");
				case 1:
					cb(tink_streams_Reduction.Crashed(c.error,c.at));
					break;
				case 2:
					cb(tink_streams_Reduction.Failed(c.error));
					break;
				case 3:
					cb(tink_streams_Reduction.Reduced(initial));
					break;
				}
			});
		});
	}
	forEach(handler) {
		throw haxe_Exception.thrown("not implemented");
	}
}
tink_streams_StreamBase.__name__ = true;
tink_streams_StreamBase.__interfaces__ = [tink_streams_StreamObject];
Object.assign(tink_streams_StreamBase.prototype, {
	__class__: tink_streams_StreamBase
});
class tink_streams_Empty extends tink_streams_StreamBase {
	constructor() {
		super();
	}
	get_depleted() {
		return true;
	}
	next() {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Step.End));
	}
	forEach(handler) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Conclusion.Depleted));
	}
	static make() {
		return tink_streams_Empty.inst;
	}
}
tink_streams_Empty.__name__ = true;
tink_streams_Empty.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams_Empty.prototype, {
	__class__: tink_streams_Empty
});
class tink_io_Source {
	static dirty(this1) {
		return this1;
	}
	static get_depleted(this1) {
		return this1.get_depleted();
	}
	static ofNodeStream(name,r,options) {
		if(options == null) {
			options = { };
		}
		return tink_io_nodejs_NodejsSource.wrap(name,r,options.chunkSize,options.onEnd);
	}
	static toNodeStream(this1) {
		let native = new js_node_stream_PassThrough();
		let source = tink_io_Source.chunked(this1);
		let write = null;
		write = function() {
			source.forEach(tink_streams_Handler.ofSafe(function(chunk) {
				let native1 = native;
				let b = chunk.toBytes();
				let data = b.b;
				if(native1.write(js_node_buffer_Buffer.from(data.buffer,data.byteOffset,b.length))) {
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
				} else {
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Finish));
				}
			})).handle(function(o) {
				switch(o._hx_index) {
				case 0:
					source = o.rest;
					break;
				case 2:
					native.emit("error",new Error(o.error.message));
					break;
				case 3:
					native.removeListener("drain",write);
					native.end();
					break;
				}
			});
		};
		let f = write;
		let time_ms = 1;
		let tmp = function() {
			return haxe_Timer.delay(f,time_ms);
		};
		native.on("drain",tmp);
		write();
		return native;
	}
	static ofJsFile(name,file,options) {
		return new tink_io_js_BlobSource(name,file,0,options == null || options.chunkSize == null ? 16777216 : options.chunkSize);
	}
	static ofJsBlob(name,blob,options) {
		return new tink_io_js_BlobSource(name,blob,0,options == null || options.chunkSize == null ? 16777216 : options.chunkSize);
	}
	static ofInput(name,input,options) {
		if(options == null) {
			options = { };
		}
		let tmp = tink_io_Worker.ensure(options.worker);
		let _g = options.chunkSize;
		return new tink_io_std_InputSource(name,input,tmp,new haxe_io_Bytes(new ArrayBuffer(_g == null ? 65536 : _g)),0);
	}
	static chunked(this1) {
		return this1;
	}
	static concatAll(s) {
		return s.reduce(tink_Chunk.EMPTY,tink_streams_Reducer.ofSafe(function(res,cur) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_ReductionStep.Progress(tink_Chunk.concat(res,cur))));
		}));
	}
	static pipeTo(this1,target,options) {
		return target.consume(this1,options);
	}
	static append(this1,that) {
		return this1.append(that);
	}
	static prepend(this1,that) {
		return this1.prepend(that);
	}
	static transform(this1,transformer) {
		return transformer.transform(this1);
	}
	static skip(this1,len) {
		return this1.regroup(tink_streams_Regrouper.ofIgnoranceSync(function(chunks) {
			let chunk = chunks[0];
			if(len <= 0) {
				return tink_streams_RegroupResult.Converted(tink_streams_Stream.single(chunk));
			}
			let length = chunk.getLength();
			let out = len < length ? tink_streams_Stream.single(chunk.slice(len,length)) : tink_streams_Empty.inst;
			len -= length;
			return tink_streams_RegroupResult.Converted(out);
		}));
	}
	static limit(this1,len) {
		if(len == 0) {
			return tink_io_Source.EMPTY;
		}
		return this1.regroup(tink_streams_Regrouper.ofIgnoranceSync(function(chunks) {
			if(len <= 0) {
				return tink_streams_RegroupResult.Terminated(haxe_ds_Option.None);
			}
			let chunk = chunks[0];
			let length = chunk.getLength();
			let out = len == length ? tink_streams_RegroupResult.Terminated(haxe_ds_Option.Some(tink_streams_Stream.single(chunk))) : tink_streams_RegroupResult.Converted(tink_streams_Stream.single(len < length ? chunk.slice(0,len) : chunk));
			len -= length;
			return out;
		}));
	}
	static ofError(e) {
		return tink_streams_Stream.ofError(e);
	}
	static ofFuture(f) {
		return tink_streams_Stream.future(f);
	}
	static ofPromised(p) {
		return tink_streams_Stream.future(tink_core_Future.map(p,function(o) {
			switch(o._hx_index) {
			case 0:
				return o.data;
			case 1:
				return tink_io_Source.ofError(o.failure);
			}
		}));
	}
	static ofChunk(chunk) {
		return new tink_streams_Single(new tink_core__$Lazy_LazyConst(chunk));
	}
	static ofString(s) {
		return new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(s))));
	}
	static ofBytes(b) {
		return new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_chunk_ByteChunk.of(b)));
	}
	static ofFutureChunk(chunk) {
		return tink_io_Source.ofFuture(tink_core_Future.map(chunk,tink_io_Source.ofChunk));
	}
	static ofFutureString(s) {
		return tink_io_Source.ofFuture(tink_core_Future.map(s,tink_io_Source.ofString));
	}
	static ofFutureBytes(b) {
		return tink_io_Source.ofFuture(tink_core_Future.map(b,tink_io_Source.ofBytes));
	}
	static ofPromiseChunk(chunk) {
		return tink_io_Source.ofPromised(tink_core_Promise.next(chunk,tink_core_Next.ofSafeSync(tink_io_Source.ofChunk)));
	}
	static ofPromiseString(s) {
		return tink_io_Source.ofPromised(tink_core_Promise.next(s,tink_core_Next.ofSafeSync(tink_io_Source.ofString)));
	}
	static ofPromiseBytes(b) {
		return tink_io_Source.ofPromised(tink_core_Promise.next(b,tink_core_Next.ofSafeSync(tink_io_Source.ofBytes)));
	}
}
class tink_io_RealSourceTools {
	static all(s) {
		return tink_core_Future.map(tink_io_Source.concatAll(s),function(o) {
			switch(o._hx_index) {
			case 1:
				return tink_core_Outcome.Failure(o.error);
			case 2:
				return tink_core_Outcome.Success(o.result);
			}
		});
	}
	static parse(s,p) {
		return tink_core_Future.map(tink_io_StreamParser.parse(s,p),function(r) {
			switch(r._hx_index) {
			case 0:
				return tink_core_Outcome.Success(new tink_core_MPair(r.data,r.rest));
			case 1:
				return tink_core_Outcome.Failure(r.e);
			case 2:
				return tink_core_Outcome.Failure(r.e);
			}
		});
	}
	static split(src,delim) {
		let s = tink_io_RealSourceTools.parse(src,new tink_io_Splitter(delim));
		return { before : tink_streams_Stream.promise(tink_core_Promise.next(s,tink_core_Next.ofSafeSync(function(p) {
			let _g = p.a;
			switch(_g._hx_index) {
			case 0:
				return new tink_streams_Single(new tink_core__$Lazy_LazyConst(_g.v));
			case 1:
				return src;
			}
		}))), delimiter : tink_core_Promise.next(s,function(p) {
			switch(p.a._hx_index) {
			case 0:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(delim)));
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Delimiter not found",{ fileName : "tink/io/Source.hx", lineNumber : 213, className : "tink.io.RealSourceTools", methodName : "split"}))));
			}
		}), after : tink_streams_Stream.promise(tink_core_Promise.next(s,tink_core_Next.ofSafeSync(function(p) {
			return p.b;
		})))};
	}
	static parseStream(s,p) {
		return tink_io_StreamParser.parseStream(s,p);
	}
	static idealize(s,rescue) {
		return tink_io_Source.chunked(s).idealize(rescue);
	}
}
tink_io_RealSourceTools.__name__ = true;
class tink_io_IdealSourceTools {
	static all(s) {
		return tink_core_Future.map(tink_io_Source.concatAll(s),function(o) {
			return o.result;
		});
	}
	static parse(s,p) {
		return tink_core_Future.map(tink_io_StreamParser.parse(s,p),function(r) {
			switch(r._hx_index) {
			case 0:
				return tink_core_Outcome.Success(new tink_core_MPair(r.data,r.rest));
			case 1:
				return tink_core_Outcome.Failure(r.e);
			}
		});
	}
	static parseStream(s,p) {
		return tink_io_StreamParser.parseStream(s,p);
	}
	static split(s,delim) {
		let s1 = tink_io_RealSourceTools.split(s,delim);
		return { before : tink_io_RealSourceTools.idealize(s1.before,function(e) {
			return tink_io_Source.EMPTY;
		}), delimiter : s1.delimiter, after : tink_io_RealSourceTools.idealize(s1.after,function(e) {
			return tink_io_Source.EMPTY;
		})};
	}
}
tink_io_IdealSourceTools.__name__ = true;
var tink_io_ParseStep = $hxEnums["tink.io.ParseStep"] = { __ename__:true,__constructs__:null
	,Progressed: {_hx_name:"Progressed",_hx_index:0,__enum__:"tink.io.ParseStep",toString:$estr}
	,Done: ($_=function(r) { return {_hx_index:1,r:r,__enum__:"tink.io.ParseStep",toString:$estr}; },$_._hx_name="Done",$_.__params__ = ["r"],$_)
	,Failed: ($_=function(e) { return {_hx_index:2,e:e,__enum__:"tink.io.ParseStep",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["e"],$_)
};
tink_io_ParseStep.__constructs__ = [tink_io_ParseStep.Progressed,tink_io_ParseStep.Done,tink_io_ParseStep.Failed];
var tink_io_ParseResult = $hxEnums["tink.io.ParseResult"] = { __ename__:true,__constructs__:null
	,Parsed: ($_=function(data,rest) { return {_hx_index:0,data:data,rest:rest,__enum__:"tink.io.ParseResult",toString:$estr}; },$_._hx_name="Parsed",$_.__params__ = ["data","rest"],$_)
	,Invalid: ($_=function(e,rest) { return {_hx_index:1,e:e,rest:rest,__enum__:"tink.io.ParseResult",toString:$estr}; },$_._hx_name="Invalid",$_.__params__ = ["e","rest"],$_)
	,Broke: ($_=function(e) { return {_hx_index:2,e:e,__enum__:"tink.io.ParseResult",toString:$estr}; },$_._hx_name="Broke",$_.__params__ = ["e"],$_)
};
tink_io_ParseResult.__constructs__ = [tink_io_ParseResult.Parsed,tink_io_ParseResult.Invalid,tink_io_ParseResult.Broke];
class tink_io_StreamParser {
	static doParse(source,p,consume,finish) {
		let cursor = tink_Chunk.EMPTY.getCursor();
		let resume = true;
		let mk = function(source) {
			if(cursor.currentPos < cursor.length) {
				return source.prepend(new tink_streams_Single(new tink_core__$Lazy_LazyConst(cursor.right())));
			} else {
				return source;
			}
		};
		let flush = function() {
			let _g = cursor.flush();
			if(_g.getLength() == 0) {
				return tink_io_Source.EMPTY;
			} else {
				return new tink_streams_Single(new tink_core__$Lazy_LazyConst(_g));
			}
		};
		return tink_core_Future.flatMap(source.forEach(tink_streams_Handler.ofUnknown(function(chunk) {
			if(chunk.getLength() == 0) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
			}
			cursor.shift(chunk);
			return tink_core_Future.async(function(cb) {
				let next = null;
				next = function() {
					cursor.shift();
					let lastPos = cursor.currentPos;
					let _g = p.progress(cursor);
					switch(_g._hx_index) {
					case 0:
						if(lastPos != cursor.currentPos && cursor.currentPos < cursor.length) {
							next();
						} else {
							cb(tink_streams_Handled.Resume);
						}
						break;
					case 1:
						consume(_g.r).handle(function(o) {
							resume = o.resume;
							if(resume) {
								if(lastPos != cursor.currentPos && cursor.currentPos < cursor.length) {
									next();
								} else {
									cb(tink_streams_Handled.Resume);
								}
							} else {
								cb(tink_streams_Handled.Finish);
							}
						});
						break;
					case 2:
						cb(tink_streams_Handled.Clog(_g.e));
						break;
					}
				};
				next();
			});
		})),function(c) {
			switch(c._hx_index) {
			case 0:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Parsed(finish(),mk(c.rest))));
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Invalid(c.error,mk(c.at))));
			case 2:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Broke(c.error)));
			case 3:
				if(cursor.currentPos < cursor.length) {
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Parsed(finish(),mk(new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_Chunk.EMPTY))))));
				} else if(!resume) {
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Parsed(finish(),flush())));
				} else {
					let _g = p.eof(cursor);
					switch(_g._hx_index) {
					case 0:
						return tink_core_Future.map(consume(_g.data),function(_) {
							return tink_io_ParseResult.Parsed(finish(),flush());
						});
					case 1:
						return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Invalid(_g.failure,flush())));
					}
				}
				break;
			}
		});
	}
	static parse(s,p) {
		let res = null;
		return tink_io_StreamParser.doParse(s,p,function(r) {
			res = r;
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst({ resume : false}));
		},function() {
			return res;
		});
	}
	static parseStream(s,p) {
		let next = null;
		next = function(step) {
			if(s.get_depleted()) {
				step(tink_streams_Step.End);
			} else {
				tink_io_StreamParser.parse(s,p).handle(function(o) {
					switch(o._hx_index) {
					case 0:
						s = o.rest;
						step(tink_streams_Step.Link(o.data,tink_streams_Generator.stream(next)));
						break;
					case 1:
						step(tink_streams_Step.Fail(o.e));
						break;
					case 2:
						step(tink_streams_Step.Fail(o.e));
						break;
					}
				});
			}
		};
		return tink_streams_Generator.stream(next);
	}
}
class tink_io_StreamParserObject {
}
tink_io_StreamParserObject.__name__ = true;
tink_io_StreamParserObject.__isInterface__ = true;
Object.assign(tink_io_StreamParserObject.prototype, {
	__class__: tink_io_StreamParserObject
});
class tink_io_BytewiseParser {
	read(char) {
		throw haxe_Exception.thrown("abstract");
	}
	progress(cursor) {
		while(true) {
			let _g = this.read(cursor.currentByte);
			switch(_g._hx_index) {
			case 0:
				break;
			case 1:
				cursor.next();
				return tink_io_ParseStep.Done(_g.r);
			case 2:
				return tink_io_ParseStep.Failed(_g.e);
			}
			if(!cursor.next()) {
				break;
			}
		}
		return tink_io_ParseStep.Progressed;
	}
	eof(rest) {
		let _g = this.read(-1);
		switch(_g._hx_index) {
		case 0:
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"Unexpected end of input",{ fileName : "tink/io/StreamParser.hx", lineNumber : 180, className : "tink.io.BytewiseParser", methodName : "eof"}));
		case 1:
			return tink_core_Outcome.Success(_g.r);
		case 2:
			return tink_core_Outcome.Failure(_g.e);
		}
	}
}
tink_io_BytewiseParser.__name__ = true;
tink_io_BytewiseParser.__interfaces__ = [tink_io_StreamParserObject];
Object.assign(tink_io_BytewiseParser.prototype, {
	__class__: tink_io_BytewiseParser
});
class tink_io_Splitter extends tink_io_BytewiseParser {
	constructor(delim) {
		super();
		this.buf = tink_Chunk.EMPTY;
		this.delim = delim;
	}
	read(char) {
		if(char == -1) {
			return tink_io_ParseStep.Done(haxe_ds_Option.None);
		}
		this.buf = tink_Chunk.concat(this.buf,tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(String.fromCodePoint(char))));
		if(this.buf.getLength() >= this.delim.getLength()) {
			let bcursor = this.buf.getCursor();
			let delta = this.buf.getLength() - this.delim.getLength();
			bcursor.moveTo(bcursor.currentPos + delta);
			let dcursor = this.delim.getCursor();
			let _g = 0;
			let _g1 = this.delim.getLength();
			while(_g < _g1) {
				_g++;
				if(bcursor.currentByte != dcursor.currentByte) {
					return tink_io_ParseStep.Progressed;
				} else {
					bcursor.next();
					dcursor.next();
				}
			}
			let out = tink_io_ParseStep.Done(haxe_ds_Option.Some(this.buf.slice(0,bcursor.currentPos - this.delim.getLength())));
			this.buf = tink_Chunk.EMPTY;
			return out;
		} else {
			return tink_io_ParseStep.Progressed;
		}
	}
}
tink_io_Splitter.__name__ = true;
tink_io_Splitter.__super__ = tink_io_BytewiseParser;
Object.assign(tink_io_Splitter.prototype, {
	__class__: tink_io_Splitter
});
class tink_io_SimpleBytewiseParser extends tink_io_BytewiseParser {
	constructor(f) {
		super();
		this._read = f;
	}
	read(char) {
		return this._read(char);
	}
}
tink_io_SimpleBytewiseParser.__name__ = true;
tink_io_SimpleBytewiseParser.__super__ = tink_io_BytewiseParser;
Object.assign(tink_io_SimpleBytewiseParser.prototype, {
	__class__: tink_io_SimpleBytewiseParser
});
class tink_io_Transformer {
}
tink_io_Transformer.__name__ = true;
tink_io_Transformer.__isInterface__ = true;
Object.assign(tink_io_Transformer.prototype, {
	__class__: tink_io_Transformer
});
class tink_io_WorkerObject {
}
tink_io_WorkerObject.__name__ = true;
tink_io_WorkerObject.__isInterface__ = true;
Object.assign(tink_io_WorkerObject.prototype, {
	__class__: tink_io_WorkerObject
});
class tink_io__$Worker_EagerWorker {
	constructor() {
	}
	work(task) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Lazy.get(task)));
	}
}
tink_io__$Worker_EagerWorker.__name__ = true;
tink_io__$Worker_EagerWorker.__interfaces__ = [tink_io_WorkerObject];
Object.assign(tink_io__$Worker_EagerWorker.prototype, {
	__class__: tink_io__$Worker_EagerWorker
});
class tink_io_Worker {
	static ensure(this1) {
		if(this1 == null) {
			return tink_io_Worker.get();
		} else {
			return this1;
		}
	}
	static get() {
		return tink_io_Worker.pool[Std.random(tink_io_Worker.pool.length)];
	}
	static work(this1,task) {
		return this1.work(task);
	}
}
class tink_streams_Generator extends tink_streams_StreamBase {
	constructor(upcoming) {
		if(tink_streams_StreamBase._hx_skip_constructor) {
			super();
			return;
		}
		tink_streams_StreamBase._hx_skip_constructor = true;
		super();
		tink_streams_StreamBase._hx_skip_constructor = false;
		this._hx_constructor(upcoming);
	}
	_hx_constructor(upcoming) {
		super._hx_constructor();
		this.upcoming = upcoming;
	}
	next() {
		return this.upcoming;
	}
	forEach(handler) {
		let _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.upcoming.handle(function(e) {
				switch(e._hx_index) {
				case 0:
					let then = e.next;
					handler(e.value).handle(function(s) {
						switch(s._hx_index) {
						case 0:
							cb(tink_streams_Conclusion.Halted(_gthis));
							break;
						case 1:
							cb(tink_streams_Conclusion.Halted(then));
							break;
						case 2:
							then.forEach(handler).handle(cb);
							break;
						case 3:
							cb(tink_streams_Conclusion.Clogged(s.e,_gthis));
							break;
						}
					});
					break;
				case 1:
					cb(tink_streams_Conclusion.Failed(e.e));
					break;
				case 2:
					cb(tink_streams_Conclusion.Depleted);
					break;
				}
			});
		});
	}
	static stream(step) {
		return new tink_streams_Generator(tink_core_Future.async(step));
	}
}
tink_streams_Generator.__name__ = true;
tink_streams_Generator.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams_Generator.prototype, {
	__class__: tink_streams_Generator
});
class tink_io_js_BlobSource extends tink_streams_Generator {
	constructor(name,blob,pos,chunkSize) {
		tink_streams_StreamBase._hx_skip_constructor = true;
		super();
		tink_streams_StreamBase._hx_skip_constructor = false;
		this._hx_constructor(name,blob,pos,chunkSize);
	}
	_hx_constructor(name,blob,pos,chunkSize) {
		this.name = name;
		super._hx_constructor(tink_core_Future.async(function(cb) {
			if(pos >= blob.size) {
				cb(tink_streams_Step.End);
			} else {
				let end = pos + chunkSize;
				if(end > blob.size) {
					end = blob.size;
				}
				let reader = new FileReader();
				reader.onload = function() {
					let chunk = tink_chunk_ByteChunk.of(haxe_io_Bytes.ofData(reader.result));
					cb(tink_streams_Step.Link(chunk,new tink_io_js_BlobSource(name,blob,end,chunkSize)));
				};
				reader.onerror = function(e) {
					cb(tink_streams_Step.Fail(tink_core_TypedError.withData(500,e.message,e,{ fileName : "tink/io/js/BlobSource.hx", lineNumber : 29, className : "tink.io.js.BlobSource", methodName : "new"})));
				};
				reader.readAsArrayBuffer(blob.slice(pos,end));
			}
		},true));
	}
	static wrap(name,blob,chunkSize) {
		return new tink_io_js_BlobSource(name,blob,0,chunkSize);
	}
}
tink_io_js_BlobSource.__name__ = true;
tink_io_js_BlobSource.__super__ = tink_streams_Generator;
Object.assign(tink_io_js_BlobSource.prototype, {
	__class__: tink_io_js_BlobSource
});
class tink_io_nodejs_NodejsSink extends tink_io_SinkBase {
	constructor(target) {
		super();
		this.target = target;
	}
	consume(source,options) {
		let _gthis = this;
		let ret = source.forEach(tink_streams_Handler.ofUnknown(function(c) {
			return tink_core_Future.map(_gthis.target.write(c),function(w) {
				switch(w._hx_index) {
				case 0:
					if(w.data) {
						return tink_streams_Handled.Resume;
					} else {
						return tink_streams_Handled.BackOff;
					}
					break;
				case 1:
					return tink_streams_Handled.Clog(w.failure);
				}
			});
		}));
		if(options != null && options.end) {
			ret.handle(function(end) {
				_gthis.target.end();
			});
		}
		return tink_core_Future.map(ret,function(c) {
			return tink_io_PipeResultTools.toResult(c,null);
		});
	}
	static wrap(name,native) {
		return new tink_io_nodejs_NodejsSink(new tink_io_nodejs_WrappedWritable(name,native));
	}
}
tink_io_nodejs_NodejsSink.__name__ = true;
tink_io_nodejs_NodejsSink.__super__ = tink_io_SinkBase;
Object.assign(tink_io_nodejs_NodejsSink.prototype, {
	__class__: tink_io_nodejs_NodejsSink
});
class tink_io_nodejs_NodejsSource extends tink_streams_Generator {
	constructor(target) {
		super(tink_core_Future.async(function(cb) {
			target.read().handle(function(o) {
				let cb1 = cb;
				let tmp;
				switch(o._hx_index) {
				case 0:
					let _g = o.data;
					tmp = _g == null ? tink_streams_Step.End : tink_streams_Step.Link(_g,new tink_io_nodejs_NodejsSource(target));
					break;
				case 1:
					tmp = tink_streams_Step.Fail(o.failure);
					break;
				}
				cb1(tmp);
			});
		},true));
	}
	static wrap(name,native,chunkSize,onEnd) {
		return new tink_io_nodejs_NodejsSource(new tink_io_nodejs_WrappedReadable(name,native,chunkSize,onEnd));
	}
}
tink_io_nodejs_NodejsSource.__name__ = true;
tink_io_nodejs_NodejsSource.__super__ = tink_streams_Generator;
Object.assign(tink_io_nodejs_NodejsSource.prototype, {
	__class__: tink_io_nodejs_NodejsSource
});
class tink_io_nodejs_WrappedReadable {
	constructor(name,native,chunkSize,onEnd) {
		this.name = name;
		this.native = native;
		this.chunkSize = chunkSize;
		let this1 = tink_core_Future.async(function(cb) {
			native.once("end",function() {
				cb(tink_core_Outcome.Success(null));
			});
			native.once("error",function(e) {
				cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"" + e.code + " - Failed reading from " + name + " because " + e.message,{ fileName : "tink/io/nodejs/WrappedReadable.hx", lineNumber : 22, className : "tink.io.nodejs.WrappedReadable", methodName : "new"})));
			});
		});
		this1.eager();
		this.end = this1;
		if(onEnd != null) {
			this.end.handle(function() {
				process.nextTick(onEnd);
			});
		}
	}
	read() {
		let _gthis = this;
		return tink_core_Future.first(tink_core_Future.async(function(cb) {
			let attempt = null;
			attempt = function() {
				try {
					let _g = _gthis.native.read(_gthis.chunkSize);
					if(_g == null) {
						_gthis.native.once("readable",attempt);
					} else {
						let buf = typeof(_g) == "string" ? new js_node_buffer_Buffer(_g) : _g;
						cb(tink_core_Outcome.Success(new tink_chunk_nodejs_BufferChunk(buf)));
					}
				} catch( _g ) {
					let _g1 = haxe_Exception.caught(_g).unwrap();
					cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Error while reading from " + _gthis.name,_g1,{ fileName : "tink/io/nodejs/WrappedReadable.hx", lineNumber : 48, className : "tink.io.nodejs.WrappedReadable", methodName : "read"})));
				}
			};
			attempt();
		}),this.end);
	}
}
tink_io_nodejs_WrappedReadable.__name__ = true;
Object.assign(tink_io_nodejs_WrappedReadable.prototype, {
	__class__: tink_io_nodejs_WrappedReadable
});
class tink_io_nodejs_WrappedWritable {
	constructor(name,native) {
		this.name = name;
		this.native = native;
		this.ended = tink_core_Future.async(function(cb) {
			native.once("end",function() {
				cb(tink_core_Outcome.Success(false));
			});
			native.once("finish",function() {
				cb(tink_core_Outcome.Success(false));
			});
			native.once("close",function() {
				cb(tink_core_Outcome.Success(false));
			});
			native.on("error",function(e) {
				cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"" + e.code + ": " + e.message,{ fileName : "tink/io/nodejs/WrappedWritable.hx", lineNumber : 24, className : "tink.io.nodejs.WrappedWritable", methodName : "new"})));
			});
		});
	}
	end() {
		let didEnd = false;
		let this1 = this.ended.handle(function() {
			didEnd = true;
		});
		if(this1 != null) {
			this1.cancel();
		}
		if(didEnd) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(false)));
		}
		this.native.end();
		return tink_core_Promise.next(this.ended,function(_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(true)));
		});
	}
	write(chunk) {
		let _gthis = this;
		return tink_core_Future.first(tink_core_Future.async(function(cb) {
			if(chunk.getLength() == 0) {
				cb(tink_core_Outcome.Success(true));
				return;
			}
			let buf;
			if(js_node_buffer_Buffer.isBuffer(chunk.buffer)) {
				buf = chunk.buffer;
			} else {
				let b = chunk.toBytes();
				let data = b.b;
				buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,b.length);
			}
			let _g = cb;
			let a1 = tink_core_Outcome.Success(true);
			let tmp = function() {
				_g(a1);
			};
			_gthis.native.write(buf,null,tmp);
		}),this.ended);
	}
}
tink_io_nodejs_WrappedWritable.__name__ = true;
Object.assign(tink_io_nodejs_WrappedWritable.prototype, {
	__class__: tink_io_nodejs_WrappedWritable
});
class tink_io_std_InputSource extends tink_streams_Generator {
	constructor(name,target,worker,buf,offset) {
		let next = function(buf,offset) {
			return new tink_io_std_InputSource(name,target,worker,buf,offset);
		};
		let free = buf.length - offset;
		super(tink_core_Future.async(function(cb) {
			tink_io_Worker.work(worker,new tink_core__$Lazy_LazyFunc(function() {
				try {
					let read = target.readBytes(buf,offset,free);
					if(read == 0) {
						return tink_streams_Step.Link(tink_Chunk.EMPTY,next(buf,offset));
					} else {
						let nextOffset = free - read < 1024 ? 0 : offset + read;
						let nextBuf = nextOffset == 0 ? new haxe_io_Bytes(new ArrayBuffer(buf.length)) : buf;
						return tink_streams_Step.Link(tink_chunk_ByteChunk.of(buf).slice(offset,offset + read),next(nextBuf,nextOffset));
					}
				} catch( _g ) {
					let _g1 = haxe_Exception.caught(_g).unwrap();
					if(((_g1) instanceof haxe_io_Eof)) {
						return tink_streams_Step.End;
					} else if(js_Boot.__instanceof(_g1,haxe_io_Error)) {
						let e = _g1;
						if(e._hx_index == 0) {
							return tink_streams_Step.Link(tink_Chunk.EMPTY,next(buf,offset));
						} else {
							return tink_streams_Step.Fail(tink_core_TypedError.withData(null,"Failed to read from " + name,e,{ fileName : "tink/io/std/InputSource.hx", lineNumber : 50, className : "tink.io.std.InputSource", methodName : "new"}));
						}
					} else {
						throw _g;
					}
				}
			})).handle(function(step) {
				switch(step._hx_index) {
				case 1:
					try {
						target.close();
					} catch( _g ) {
					}
					break;
				case 2:
					try {
						target.close();
					} catch( _g ) {
					}
					break;
				default:
				}
				cb(step);
			});
		},true));
	}
}
tink_io_std_InputSource.__name__ = true;
tink_io_std_InputSource.__super__ = tink_streams_Generator;
Object.assign(tink_io_std_InputSource.prototype, {
	__class__: tink_io_std_InputSource
});
class tink_io_std_OutputSink extends tink_io_SinkBase {
	constructor(name,target,worker) {
		super();
		this.name = name;
		this.target = target;
		this.worker = worker;
	}
	consume(source,options) {
		let rest = tink_Chunk.EMPTY;
		let _gthis = this;
		let ret = source.forEach(tink_streams_Handler.ofUnknown(function(c) {
			return tink_core_Future.async(function(cb) {
				let pos = 0;
				let bytes = c.toBytes();
				let write = null;
				write = function() {
					if(pos == bytes.length) {
						cb(tink_streams_Handled.Resume);
					} else {
						tink_io_Worker.work(_gthis.worker,new tink_core__$Lazy_LazyFunc(function() {
							try {
								return tink_core_Outcome.Success(_gthis.target.writeBytes(bytes,pos,bytes.length - pos));
							} catch( _g ) {
								let _g1 = haxe_Exception.caught(_g).unwrap();
								if(((_g1) instanceof haxe_io_Eof)) {
									return tink_core_Outcome.Success(-1);
								} else if(js_Boot.__instanceof(_g1,haxe_io_Error)) {
									let e = _g1;
									if(e._hx_index == 0) {
										return tink_core_Outcome.Success(0);
									} else {
										return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Error writing to " + _gthis.name,e,{ fileName : "tink/io/std/OutputSink.hx", lineNumber : 40, className : "tink.io.std.OutputSink", methodName : "consume"}));
									}
								} else if(((_g1) instanceof tink_core_TypedError)) {
									return tink_core_Outcome.Failure(_g1);
								} else {
									return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Error writing to " + _gthis.name,_g1,{ fileName : "tink/io/std/OutputSink.hx", lineNumber : 46, className : "tink.io.std.OutputSink", methodName : "consume"}));
								}
							}
						})).handle(function(o) {
							switch(o._hx_index) {
							case 0:
								let _g = o.data;
								if(_g == -1) {
									rest = tink_chunk_ByteChunk.of(bytes).slice(pos,bytes.length);
									cb(tink_streams_Handled.Finish);
								} else {
									pos += _g;
									if(pos == bytes.length) {
										cb(tink_streams_Handled.Resume);
									} else {
										write();
									}
								}
								break;
							case 1:
								cb(tink_streams_Handled.Clog(o.failure));
								break;
							}
						});
					}
				};
				write();
			});
		}));
		if(options != null && options.end) {
			ret.handle(function(end) {
				try {
					_gthis.target.close();
				} catch( _g ) {
				}
			});
		}
		return tink_core_Future.map(ret,function(c) {
			return tink_io_PipeResultTools.toResult(c,null,rest);
		});
	}
}
tink_io_std_OutputSink.__name__ = true;
tink_io_std_OutputSink.__super__ = tink_io_SinkBase;
Object.assign(tink_io_std_OutputSink.prototype, {
	__class__: tink_io_std_OutputSink
});
class tink_streams_IdealStream {
	static promiseOfIdealStream(p) {
		return tink_streams_Stream.promise(p);
	}
	static promiseOfStreamNoise(p) {
		return tink_streams_Stream.promise(p);
	}
	static collect(this1) {
		let buf = [];
		return tink_core_Future.map(this1.forEach(tink_streams_Handler.ofSafe(function(x) {
			buf.push(x);
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
		})),function(c) {
			return buf;
		});
	}
}
class tink_streams_IdealStreamBase extends tink_streams_StreamBase {
	constructor() {
		super();
	}
	idealize(rescue) {
		return this;
	}
}
tink_streams_IdealStreamBase.__name__ = true;
tink_streams_IdealStreamBase.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams_IdealStreamBase.prototype, {
	__class__: tink_streams_IdealStreamBase
});
class tink_streams_RealStream {
	static promiseOfIdealStream(p) {
		return tink_streams_Stream.promise(p);
	}
	static promiseOfStreamNoise(p) {
		return tink_streams_Stream.promise(p);
	}
	static promiseOfRealStream(p) {
		return tink_streams_Stream.promise(p);
	}
	static promiseOfStreamError(p) {
		return tink_streams_Stream.promise(p);
	}
	static collect(this1) {
		let buf = [];
		return tink_core_Future.map(this1.forEach(tink_streams_Handler.ofSafe(function(x) {
			buf.push(x);
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
		})),function(c) {
			switch(c._hx_index) {
			case 0:
				throw haxe_Exception.thrown("unreachable");
			case 2:
				return tink_core_Outcome.Failure(c.error);
			case 3:
				return tink_core_Outcome.Success(buf);
			}
		});
	}
}
class tink_streams_Stream {
	static get_depleted(this1) {
		return this1.get_depleted();
	}
	static dirty(this1) {
		return this1;
	}
	static single(i) {
		return new tink_streams_Single(new tink_core__$Lazy_LazyConst(i));
	}
	static ofIterator(i) {
		let next = null;
		next = function(step) {
			step(i.hasNext() ? tink_streams_Step.Link(i.next(),tink_streams_Generator.stream(next)) : tink_streams_Step.End);
		};
		return tink_streams_Generator.stream(next);
	}
	static flatten(stream) {
		return stream.regroup(tink_streams_Regrouper.ofIgnoranceSync(function(arr) {
			return tink_streams_RegroupResult.Converted(arr[0]);
		}));
	}
	static future(f) {
		return new tink_streams_FutureStream(f);
	}
	static promiseIdeal(f) {
		return tink_streams_Stream.promise(f);
	}
	static promiseReal(f) {
		return tink_streams_Stream.promise(f);
	}
	static promise(f) {
		return tink_streams_Stream.future(tink_core_Future.map(f,function(o) {
			switch(o._hx_index) {
			case 0:
				return tink_streams_Stream.dirty(o.data);
			case 1:
				return tink_streams_Stream.ofError(o.failure);
			}
		}));
	}
	static ofError(e) {
		return new tink_streams__$Stream_ErrorStream(e);
	}
	static ofNodeStream(name,r,options) {
		return tink_streams_nodejs_NodejsStream.wrap(name,r,options == null ? null : options.onEnd);
	}
}
var tink_streams_RegroupStatus = $hxEnums["tink.streams.RegroupStatus"] = { __ename__:true,__constructs__:null
	,Flowing: {_hx_name:"Flowing",_hx_index:0,__enum__:"tink.streams.RegroupStatus",toString:$estr}
	,Errored: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.RegroupStatus",toString:$estr}; },$_._hx_name="Errored",$_.__params__ = ["e"],$_)
	,Ended: {_hx_name:"Ended",_hx_index:2,__enum__:"tink.streams.RegroupStatus",toString:$estr}
};
tink_streams_RegroupStatus.__constructs__ = [tink_streams_RegroupStatus.Flowing,tink_streams_RegroupStatus.Errored,tink_streams_RegroupStatus.Ended];
var tink_streams_RegroupResult = $hxEnums["tink.streams.RegroupResult"] = { __ename__:true,__constructs__:null
	,Converted: ($_=function(data,untouched) { return {_hx_index:0,data:data,untouched:untouched,__enum__:"tink.streams.RegroupResult",toString:$estr}; },$_._hx_name="Converted",$_.__params__ = ["data","untouched"],$_)
	,Terminated: ($_=function(data) { return {_hx_index:1,data:data,__enum__:"tink.streams.RegroupResult",toString:$estr}; },$_._hx_name="Terminated",$_.__params__ = ["data"],$_)
	,Untouched: {_hx_name:"Untouched",_hx_index:2,__enum__:"tink.streams.RegroupResult",toString:$estr}
	,Errored: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"tink.streams.RegroupResult",toString:$estr}; },$_._hx_name="Errored",$_.__params__ = ["e"],$_)
};
tink_streams_RegroupResult.__constructs__ = [tink_streams_RegroupResult.Converted,tink_streams_RegroupResult.Terminated,tink_streams_RegroupResult.Untouched,tink_streams_RegroupResult.Errored];
class tink_streams_Regrouper {
	static ofIgnorance(f) {
		return { apply : function(i,_) {
			return f(i);
		}};
	}
	static ofIgnoranceSync(f) {
		return { apply : function(i,_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(i)));
		}};
	}
	static ofFunc(f) {
		return { apply : f};
	}
	static ofFuncSync(f) {
		return { apply : function(i,s) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(i,s)));
		}};
	}
}
class tink_streams__$Stream_CompoundStream extends tink_streams_StreamBase {
	constructor(parts) {
		super();
		this.parts = parts;
	}
	get_depleted() {
		switch(this.parts.length) {
		case 0:
			return true;
		case 1:
			return this.parts[0].get_depleted();
		default:
			return false;
		}
	}
	next() {
		let _gthis = this;
		if(this.parts.length == 0) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Step.End));
		} else {
			return tink_core_Future.flatMap(this.parts[0].next(),function(v) {
				switch(v._hx_index) {
				case 0:
					let copy = _gthis.parts.slice();
					copy[0] = v.next;
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Step.Link(v.value,new tink_streams__$Stream_CompoundStream(copy))));
				case 2:
					if(_gthis.parts.length > 1) {
						return _gthis.parts[1].next();
					} else {
						return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
					}
					break;
				default:
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
				}
			});
		}
	}
	decompose(into) {
		let _g = 0;
		let _g1 = this.parts;
		while(_g < _g1.length) _g1[_g++].decompose(into);
	}
	forEach(handler) {
		let parts = this.parts;
		let handler1 = handler;
		return tink_core_Future.async(function(cb) {
			tink_streams__$Stream_CompoundStream.consumeParts(parts,handler1,cb);
		});
	}
	static consumeParts(parts,handler,cb) {
		if(parts.length == 0) {
			cb(tink_streams_Conclusion.Depleted);
		} else {
			parts[0].forEach(handler).handle(function(o) {
				switch(o._hx_index) {
				case 0:
					parts = parts.slice();
					parts[0] = o.rest;
					cb(tink_streams_Conclusion.Halted(new tink_streams__$Stream_CompoundStream(parts)));
					break;
				case 1:
					let _g = o.at;
					if(_g.get_depleted()) {
						parts = parts.slice(1);
					} else {
						parts = parts.slice();
						parts[0] = _g;
					}
					cb(tink_streams_Conclusion.Clogged(o.error,new tink_streams__$Stream_CompoundStream(parts)));
					break;
				case 2:
					cb(tink_streams_Conclusion.Failed(o.error));
					break;
				case 3:
					tink_streams__$Stream_CompoundStream.consumeParts(parts.slice(1),handler,cb);
					break;
				}
			});
		}
	}
	static of(streams) {
		let ret = [];
		let _g = 0;
		while(_g < streams.length) streams[_g++].decompose(ret);
		if(ret.length == 0) {
			return tink_streams_Empty.inst;
		} else {
			return new tink_streams__$Stream_CompoundStream(ret);
		}
	}
}
tink_streams__$Stream_CompoundStream.__name__ = true;
tink_streams__$Stream_CompoundStream.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams__$Stream_CompoundStream.prototype, {
	__class__: tink_streams__$Stream_CompoundStream
});
class tink_streams__$Stream_RegroupStream extends tink_streams__$Stream_CompoundStream {
	constructor(source,f,prev,buf) {
		if(prev == null) {
			prev = tink_streams_Empty.inst;
		}
		if(buf == null) {
			buf = [];
		}
		let ret = null;
		let terminated = false;
		super([prev,tink_streams_Stream.future(tink_core_Future.map(source.forEach(tink_streams_Handler.ofUnknown(function(item) {
			buf.push(item);
			return tink_core_Future.map(f.apply(buf,tink_streams_RegroupStatus.Flowing),function(o) {
				switch(o._hx_index) {
				case 0:
					ret = o.data;
					buf = o.untouched;
					return tink_streams_Handled.Finish;
				case 1:
					let _g = o.data;
					ret = _g._hx_index == 0 ? _g.v : tink_core_Lazy.get(new tink_core__$Lazy_LazyFunc(tink_streams_Empty.make));
					terminated = true;
					return tink_streams_Handled.Finish;
				case 2:
					return tink_streams_Handled.Resume;
				case 3:
					return tink_streams_Handled.Clog(o.e);
				}
			});
		})),function(o) {
			switch(o._hx_index) {
			case 0:
				if(terminated) {
					return ret;
				} else {
					return new tink_streams__$Stream_RegroupStream(o.rest,f,ret,buf);
				}
				break;
			case 1:
				return new tink_streams__$Stream_ErrorStream(o.error);
			case 2:
				return tink_streams_Stream.ofError(o.error);
			case 3:
				if(buf.length == 0) {
					return tink_streams_Empty.inst;
				} else {
					return tink_streams_Stream.future(tink_core_Future.map(f.apply(buf,tink_streams_RegroupStatus.Ended),function(o) {
						switch(o._hx_index) {
						case 0:
							return o.data;
						case 1:
							let _g = o.data;
							if(_g._hx_index == 0) {
								return _g.v;
							} else {
								return tink_core_Lazy.get(new tink_core__$Lazy_LazyFunc(tink_streams_Empty.make));
							}
							break;
						case 2:
							return tink_streams_Empty.inst;
						case 3:
							return tink_streams_Stream.ofError(o.e);
						}
					}));
				}
				break;
			}
		}))]);
	}
}
tink_streams__$Stream_RegroupStream.__name__ = true;
tink_streams__$Stream_RegroupStream.__super__ = tink_streams__$Stream_CompoundStream;
Object.assign(tink_streams__$Stream_RegroupStream.prototype, {
	__class__: tink_streams__$Stream_RegroupStream
});
var tink_streams_Handled = $hxEnums["tink.streams.Handled"] = { __ename__:true,__constructs__:null
	,BackOff: {_hx_name:"BackOff",_hx_index:0,__enum__:"tink.streams.Handled",toString:$estr}
	,Finish: {_hx_name:"Finish",_hx_index:1,__enum__:"tink.streams.Handled",toString:$estr}
	,Resume: {_hx_name:"Resume",_hx_index:2,__enum__:"tink.streams.Handled",toString:$estr}
	,Clog: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"tink.streams.Handled",toString:$estr}; },$_._hx_name="Clog",$_.__params__ = ["e"],$_)
};
tink_streams_Handled.__constructs__ = [tink_streams_Handled.BackOff,tink_streams_Handled.Finish,tink_streams_Handled.Resume,tink_streams_Handled.Clog];
var tink_streams_Conclusion = $hxEnums["tink.streams.Conclusion"] = { __ename__:true,__constructs__:null
	,Halted: ($_=function(rest) { return {_hx_index:0,rest:rest,__enum__:"tink.streams.Conclusion",toString:$estr}; },$_._hx_name="Halted",$_.__params__ = ["rest"],$_)
	,Clogged: ($_=function(error,at) { return {_hx_index:1,error:error,at:at,__enum__:"tink.streams.Conclusion",toString:$estr}; },$_._hx_name="Clogged",$_.__params__ = ["error","at"],$_)
	,Failed: ($_=function(error) { return {_hx_index:2,error:error,__enum__:"tink.streams.Conclusion",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["error"],$_)
	,Depleted: {_hx_name:"Depleted",_hx_index:3,__enum__:"tink.streams.Conclusion",toString:$estr}
};
tink_streams_Conclusion.__constructs__ = [tink_streams_Conclusion.Halted,tink_streams_Conclusion.Clogged,tink_streams_Conclusion.Failed,tink_streams_Conclusion.Depleted];
var tink_streams_ReductionStep = $hxEnums["tink.streams.ReductionStep"] = { __ename__:true,__constructs__:null
	,Progress: ($_=function(result) { return {_hx_index:0,result:result,__enum__:"tink.streams.ReductionStep",toString:$estr}; },$_._hx_name="Progress",$_.__params__ = ["result"],$_)
	,Crash: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.ReductionStep",toString:$estr}; },$_._hx_name="Crash",$_.__params__ = ["e"],$_)
};
tink_streams_ReductionStep.__constructs__ = [tink_streams_ReductionStep.Progress,tink_streams_ReductionStep.Crash];
var tink_streams_Reduction = $hxEnums["tink.streams.Reduction"] = { __ename__:true,__constructs__:null
	,Crashed: ($_=function(error,at) { return {_hx_index:0,error:error,at:at,__enum__:"tink.streams.Reduction",toString:$estr}; },$_._hx_name="Crashed",$_.__params__ = ["error","at"],$_)
	,Failed: ($_=function(error) { return {_hx_index:1,error:error,__enum__:"tink.streams.Reduction",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["error"],$_)
	,Reduced: ($_=function(result) { return {_hx_index:2,result:result,__enum__:"tink.streams.Reduction",toString:$estr}; },$_._hx_name="Reduced",$_.__params__ = ["result"],$_)
};
tink_streams_Reduction.__constructs__ = [tink_streams_Reduction.Crashed,tink_streams_Reduction.Failed,tink_streams_Reduction.Reduced];
class tink_streams__$Stream_CloggedStream extends tink_streams_StreamBase {
	constructor(rest,error) {
		super();
		this.rest = rest;
		this.error = error;
	}
	next() {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Step.Fail(this.error)));
	}
	forEach(handler) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Conclusion.Clogged(this.error,this.rest)));
	}
}
tink_streams__$Stream_CloggedStream.__name__ = true;
tink_streams__$Stream_CloggedStream.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams__$Stream_CloggedStream.prototype, {
	__class__: tink_streams__$Stream_CloggedStream
});
class tink_streams__$Stream_ErrorStream extends tink_streams_StreamBase {
	constructor(error) {
		super();
		this.error = error;
	}
	next() {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Step.Fail(this.error)));
	}
	forEach(handler) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Conclusion.Failed(this.error)));
	}
}
tink_streams__$Stream_ErrorStream.__name__ = true;
tink_streams__$Stream_ErrorStream.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams__$Stream_ErrorStream.prototype, {
	__class__: tink_streams__$Stream_ErrorStream
});
class tink_streams_Mapping {
	static _new(o) {
		return o;
	}
	static ofNext(n) {
		return { apply : function(i,_) {
			let this1 = tink_core_Promise.next(n(i[0]),function(o) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(tink_streams_RegroupResult.Converted(tink_streams_Stream.single(o)))));
			});
			let f = tink_core_Recover.ofSync(tink_streams_RegroupResult.Errored);
			return tink_core_Future.flatMap(this1,function(o) {
				switch(o._hx_index) {
				case 0:
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o.data));
				case 1:
					return f(o.failure);
				}
			});
		}};
	}
	static ofAsync(f) {
		return { apply : function(i,_) {
			return tink_core_Future.map(f(i[0]),function(o) {
				return tink_streams_RegroupResult.Converted(tink_streams_Stream.single(o));
			});
		}};
	}
	static ofSync(f) {
		return { apply : function(i,_) {
			let v;
			let _g = f(i[0]);
			switch(_g._hx_index) {
			case 0:
				v = tink_streams_RegroupResult.Converted(tink_streams_Stream.single(_g.data));
				break;
			case 1:
				v = tink_streams_RegroupResult.Errored(_g.failure);
				break;
			}
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
		}};
	}
	static ofPlain(f) {
		return { apply : function(i,_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_RegroupResult.Converted(tink_streams_Stream.single(f(i[0])))));
		}};
	}
}
class tink_streams_Filter {
	static _new(o) {
		return o;
	}
	static ofNext(n) {
		return { apply : function(i,_) {
			let this1 = tink_core_Promise.next(n(i[0]),function(matched) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(tink_streams_RegroupResult.Converted(matched ? tink_streams_Stream.single(i[0]) : tink_streams_Empty.inst))));
			});
			let f = tink_core_Recover.ofSync(tink_streams_RegroupResult.Errored);
			return tink_core_Future.flatMap(this1,function(o) {
				switch(o._hx_index) {
				case 0:
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o.data));
				case 1:
					return f(o.failure);
				}
			});
		}};
	}
	static ofAsync(f) {
		return { apply : function(i,_) {
			return tink_core_Future.map(f(i[0]),function(matched) {
				return tink_streams_RegroupResult.Converted(matched ? tink_streams_Stream.single(i[0]) : tink_streams_Empty.inst);
			});
		}};
	}
	static ofSync(f) {
		return { apply : function(i,_) {
			let v;
			let _g = f(i[0]);
			switch(_g._hx_index) {
			case 0:
				v = tink_streams_RegroupResult.Converted(_g.data ? tink_streams_Stream.single(i[0]) : tink_streams_Empty.inst);
				break;
			case 1:
				v = tink_streams_RegroupResult.Errored(_g.failure);
				break;
			}
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
		}};
	}
	static ofPlain(f) {
		return { apply : function(i,_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_RegroupResult.Converted(f(i[0]) ? tink_streams_Stream.single(i[0]) : tink_streams_Empty.inst)));
		}};
	}
}
class tink_streams_IdealizeStream extends tink_streams_IdealStreamBase {
	constructor(target,rescue) {
		super();
		this.target = target;
		this.rescue = rescue;
	}
	get_depleted() {
		return this.target.get_depleted();
	}
	next() {
		let _gthis = this;
		return tink_core_Future.flatMap(this.target.next(),function(v) {
			if(v._hx_index == 1) {
				return _gthis.rescue(v.e).idealize(_gthis.rescue).next();
			} else {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
			}
		});
	}
	forEach(handler) {
		let _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.target.forEach(handler).handle(function(end) {
				switch(end._hx_index) {
				case 0:
					cb(tink_streams_Conclusion.Halted(end.rest.idealize(_gthis.rescue)));
					break;
				case 1:
					cb(tink_streams_Conclusion.Clogged(end.error,end.at.idealize(_gthis.rescue)));
					break;
				case 2:
					_gthis.rescue(end.error).idealize(_gthis.rescue).forEach(handler).handle(cb);
					break;
				case 3:
					cb(tink_streams_Conclusion.Depleted);
					break;
				}
			});
		});
	}
}
tink_streams_IdealizeStream.__name__ = true;
tink_streams_IdealizeStream.__super__ = tink_streams_IdealStreamBase;
Object.assign(tink_streams_IdealizeStream.prototype, {
	__class__: tink_streams_IdealizeStream
});
class tink_streams_Single extends tink_streams_StreamBase {
	constructor(value) {
		super();
		this.value = value;
	}
	next() {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Step.Link(tink_core_Lazy.get(this.value),tink_streams_Empty.inst)));
	}
	forEach(handle) {
		let _gthis = this;
		return tink_core_Future.map(handle(tink_core_Lazy.get(this.value)),function(step) {
			switch(step._hx_index) {
			case 0:
				return tink_streams_Conclusion.Halted(_gthis);
			case 1:
				return tink_streams_Conclusion.Halted(tink_streams_Empty.inst);
			case 2:
				return tink_streams_Conclusion.Depleted;
			case 3:
				return tink_streams_Conclusion.Clogged(step.e,_gthis);
			}
		});
	}
}
tink_streams_Single.__name__ = true;
tink_streams_Single.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams_Single.prototype, {
	__class__: tink_streams_Single
});
class tink_streams_Handler {
	static _new(f) {
		return f;
	}
	static apply(this1,item) {
		return this1(item);
	}
	static ofSafeSync(f) {
		return function(i) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(i)));
		};
	}
	static ofUnknownSync(f) {
		return function(i) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(i)));
		};
	}
	static ofSafe(f) {
		return f;
	}
	static ofUnknown(f) {
		return f;
	}
}
class tink_streams_Reducer {
	static _new(f) {
		return f;
	}
	static apply(this1,res,item) {
		return this1(res,item);
	}
	static ofSafeSync(f) {
		return function(res,cur) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(res,cur)));
		};
	}
	static ofUnknownSync(f) {
		return function(res,cur) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(res,cur)));
		};
	}
	static ofSafe(f) {
		return f;
	}
	static ofPlainSync(f) {
		return function(res,cur) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_ReductionStep.Progress(f(res,cur))));
		};
	}
	static ofUnknown(f) {
		return f;
	}
	static ofPromiseBased(f) {
		return function(res,cur) {
			return tink_core_Future.map(f(res,cur),function(s) {
				switch(s._hx_index) {
				case 0:
					return tink_streams_ReductionStep.Progress(s.data);
				case 1:
					return tink_streams_ReductionStep.Crash(s.failure);
				}
			});
		};
	}
}
class tink_streams_FutureStream extends tink_streams_StreamBase {
	constructor(f) {
		super();
		this.f = f;
	}
	next() {
		return tink_core_Future.flatMap(this.f,function(s) {
			return s.next();
		});
	}
	forEach(handler) {
		let _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.f.handle(function(s) {
				s.forEach(handler).handle(cb);
			});
		});
	}
}
tink_streams_FutureStream.__name__ = true;
tink_streams_FutureStream.__super__ = tink_streams_StreamBase;
Object.assign(tink_streams_FutureStream.prototype, {
	__class__: tink_streams_FutureStream
});
class tink_streams_BlendStream extends tink_streams_Generator {
	constructor(a,b) {
		let first = null;
		let wait = function(s) {
			return tink_core_Future.map(s.next(),function(o) {
				if(first == null) {
					first = s;
				}
				return o;
			});
		};
		let n1 = wait(a);
		let n2 = wait(b);
		super(tink_core_Future.async(function(cb) {
			tink_core_Future.first(n1,n2).handle(function(o) {
				switch(o._hx_index) {
				case 0:
					cb(tink_streams_Step.Link(o.value,new tink_streams_BlendStream(o.next,first == a ? b : a)));
					break;
				case 1:
					cb(tink_streams_Step.Fail(o.e));
					break;
				case 2:
					(first == a ? n2 : n1).handle(cb);
					break;
				}
			});
		}));
	}
}
tink_streams_BlendStream.__name__ = true;
tink_streams_BlendStream.__super__ = tink_streams_Generator;
Object.assign(tink_streams_BlendStream.prototype, {
	__class__: tink_streams_BlendStream
});
var tink_streams_Step = $hxEnums["tink.streams.Step"] = { __ename__:true,__constructs__:null
	,Link: ($_=function(value,next) { return {_hx_index:0,value:value,next:next,__enum__:"tink.streams.Step",toString:$estr}; },$_._hx_name="Link",$_.__params__ = ["value","next"],$_)
	,Fail: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.Step",toString:$estr}; },$_._hx_name="Fail",$_.__params__ = ["e"],$_)
	,End: {_hx_name:"End",_hx_index:2,__enum__:"tink.streams.Step",toString:$estr}
};
tink_streams_Step.__constructs__ = [tink_streams_Step.Link,tink_streams_Step.Fail,tink_streams_Step.End];
class tink_streams_SignalStream extends tink_streams_Generator {
	constructor(signal) {
		let this1 = tink_core_Future.map(tink_core_Signal.nextTime(signal),function(o) {
			switch(o._hx_index) {
			case 0:
				return tink_streams_Step.Link(o.data,new tink_streams_SignalStream(signal));
			case 1:
				return tink_streams_Step.Fail(o.e);
			case 2:
				return tink_streams_Step.End;
			}
		});
		this1.eager();
		super(this1);
	}
}
tink_streams_SignalStream.__name__ = true;
tink_streams_SignalStream.__super__ = tink_streams_Generator;
Object.assign(tink_streams_SignalStream.prototype, {
	__class__: tink_streams_SignalStream
});
var tink_streams_Yield = $hxEnums["tink.streams.Yield"] = { __ename__:true,__constructs__:null
	,Data: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.streams.Yield",toString:$estr}; },$_._hx_name="Data",$_.__params__ = ["data"],$_)
	,Fail: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.Yield",toString:$estr}; },$_._hx_name="Fail",$_.__params__ = ["e"],$_)
	,End: {_hx_name:"End",_hx_index:2,__enum__:"tink.streams.Yield",toString:$estr}
};
tink_streams_Yield.__constructs__ = [tink_streams_Yield.Data,tink_streams_Yield.Fail,tink_streams_Yield.End];
class tink_streams_nodejs_NodejsStream extends tink_streams_Generator {
	constructor(target) {
		super(tink_core_Future.async(function(cb) {
			target.read().handle(function(o) {
				let cb1 = cb;
				let tmp;
				switch(o._hx_index) {
				case 0:
					let _g = o.data;
					tmp = _g == null ? tink_streams_Step.End : tink_streams_Step.Link(_g,new tink_streams_nodejs_NodejsStream(target));
					break;
				case 1:
					tmp = tink_streams_Step.Fail(o.failure);
					break;
				}
				cb1(tmp);
			});
		}));
	}
	static wrap(name,native,onEnd) {
		return new tink_streams_nodejs_NodejsStream(new tink_streams_nodejs_WrappedReadable(name,native,onEnd));
	}
}
tink_streams_nodejs_NodejsStream.__name__ = true;
tink_streams_nodejs_NodejsStream.__super__ = tink_streams_Generator;
Object.assign(tink_streams_nodejs_NodejsStream.prototype, {
	__class__: tink_streams_nodejs_NodejsStream
});
class tink_streams_nodejs_WrappedReadable {
	constructor(name,native,onEnd) {
		this.name = name;
		this.native = native;
		let this1 = tink_core_Future.async(function(cb) {
			native.once("end",function() {
				cb(tink_core_Outcome.Success(null));
			});
			native.once("close",function() {
				cb(tink_core_Outcome.Success(null));
			});
			native.once("error",function(e) {
				cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"" + e.code + " - Failed reading from " + name + " because " + e.message,{ fileName : "tink/streams/nodejs/WrappedReadable.hx", lineNumber : 21, className : "tink.streams.nodejs.WrappedReadable", methodName : "new"})));
			});
		});
		this1.eager();
		this.end = this1;
		if(onEnd != null) {
			this.end.handle(function() {
				process.nextTick(onEnd);
			});
		}
	}
	read() {
		let _gthis = this;
		return tink_core_Future.first(tink_core_Future.async(function(cb) {
			let attempt = null;
			attempt = function() {
				try {
					let _g = _gthis.native.read();
					if(_g == null) {
						_gthis.native.once("readable",attempt);
					} else {
						cb(tink_core_Outcome.Success(_g));
					}
				} catch( _g ) {
					let _g1 = haxe_Exception.caught(_g).unwrap();
					cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Error while reading from " + _gthis.name,_g1,{ fileName : "tink/streams/nodejs/WrappedReadable.hx", lineNumber : 41, className : "tink.streams.nodejs.WrappedReadable", methodName : "read"})));
				}
			};
			attempt();
		}),this.end);
	}
}
tink_streams_nodejs_WrappedReadable.__name__ = true;
Object.assign(tink_streams_nodejs_WrappedReadable.prototype, {
	__class__: tink_streams_nodejs_WrappedReadable
});
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
	Date.prototype.__class__ = Date;
	Date.__name__ = "Date";
	var Int = { };
	var Dynamic = { };
	var Float = Number;
	var Bool = Boolean;
	var Class = { };
	var Enum = { };
}
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
Console.formatMode = Console.determineConsoleFormatMode();
Console.logPrefix = "<b,gray>><//> ";
Console.warnPrefix = "<b,yellow>><//> ";
Console.errorPrefix = "<b,red>></b> ";
Console.successPrefix = "<b,light_green>><//> ";
Console.debugPrefix = "<b,magenta>><//> ";
Console.argSeparator = " ";
Console.unicodeCompatibilityMode = Sys.systemName() == "Windows" ? 1 : 0;
Console.unicodeCompatibilityEnabled = false;
Console.formatTagPattern = new EReg("(\\\\)?<(/)?([^><{}\\s]*|{[^}<>]*})>","g");
FormatFlag.RESET = "reset";
FormatFlag.BOLD = "bold";
FormatFlag.ITALIC = "italic";
FormatFlag.DIM = "dim";
FormatFlag.UNDERLINE = "underline";
FormatFlag.BLINK = "blink";
FormatFlag.INVERT = "invert";
FormatFlag.HIDDEN = "hidden";
FormatFlag.BLACK = "black";
FormatFlag.RED = "red";
FormatFlag.GREEN = "green";
FormatFlag.YELLOW = "yellow";
FormatFlag.BLUE = "blue";
FormatFlag.MAGENTA = "magenta";
FormatFlag.CYAN = "cyan";
FormatFlag.WHITE = "white";
FormatFlag.LIGHT_BLACK = "light_black";
FormatFlag.LIGHT_RED = "light_red";
FormatFlag.LIGHT_GREEN = "light_green";
FormatFlag.LIGHT_YELLOW = "light_yellow";
FormatFlag.LIGHT_BLUE = "light_blue";
FormatFlag.LIGHT_MAGENTA = "light_magenta";
FormatFlag.LIGHT_CYAN = "light_cyan";
FormatFlag.LIGHT_WHITE = "light_white";
FormatFlag.BG_BLACK = "bg_black";
FormatFlag.BG_RED = "bg_red";
FormatFlag.BG_GREEN = "bg_green";
FormatFlag.BG_YELLOW = "bg_yellow";
FormatFlag.BG_BLUE = "bg_blue";
FormatFlag.BG_MAGENTA = "bg_magenta";
FormatFlag.BG_CYAN = "bg_cyan";
FormatFlag.BG_WHITE = "bg_white";
FormatFlag.BG_LIGHT_BLACK = "bg_light_black";
FormatFlag.BG_LIGHT_RED = "bg_light_red";
FormatFlag.BG_LIGHT_GREEN = "bg_light_green";
FormatFlag.BG_LIGHT_YELLOW = "bg_light_yellow";
FormatFlag.BG_LIGHT_BLUE = "bg_light_blue";
FormatFlag.BG_LIGHT_MAGENTA = "bg_light_magenta";
FormatFlag.BG_LIGHT_CYAN = "bg_light_cyan";
FormatFlag.BG_LIGHT_WHITE = "bg_light_white";
card_CardBuilder.indent = "   ";
card_CardBuilder.width = 50;
card_Program.newLine = Sys.systemName() == "Windows" ? "\r\n" : "\n";
haxe_io_FPHelper.i64tmp = new haxe__$Int64__$_$_$Int64(0,0);
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
tink__$Chunk_EmptyChunk.EMPTY = new haxe_io_Bytes(new ArrayBuffer(0));
tink_Chunk.EMPTY = new tink__$Chunk_EmptyChunk();
tink_Stringly.SUPPORTED_DATE_REGEX = new EReg("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})(\\.\\d{3})?(Z|[\\+-]\\d{2}:\\d{2})$","");
tink_core_Callback.depth = 0;
tink_core_Callback.MAX_DEPTH = 500;
tink_core_SimpleDisposable._hx_skip_constructor = false;
tink_core_AlreadyDisposed.INST = new tink_core_AlreadyDisposed();
tink_core_Future.NOISE = new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(null));
tink_core_Future.NULL = tink_core_Future.NOISE;
tink_core_Future.NEVER = new tink_core__$Future_NeverFuture();
tink_core_Lazy.NOISE = new tink_core__$Lazy_LazyConst(null);
tink_core_Lazy.NULL = tink_core_Lazy.NOISE;
tink_core_Noise.Noise = null;
tink_core_ProgressValue.ZERO = new tink_core_MPair(0,haxe_ds_Option.None);
tink_core_Progress.INIT = tink_core_ProgressValue.ZERO;
tink_core__$Progress_ProgressObject._hx_skip_constructor = false;
tink_core_Promise.NOISE = new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
tink_core_Promise.NULL = tink_core_Promise.NOISE;
tink_core_Promise.NEVER = tink_core_Future.NEVER;
tink_core__$Signal_Disposed.INST = new tink_core__$Signal_Disposed();
tink_io__$Sink_Blackhole.inst = new tink_io__$Sink_Blackhole();
tink_io_SinkYielding.BLACKHOLE = tink_io__$Sink_Blackhole.inst;
tink_streams_StreamBase._hx_skip_constructor = false;
tink_streams_Empty.inst = new tink_streams_Empty();
tink_io_Source.EMPTY = tink_streams_Empty.inst;
tink_io_Worker.EAGER = new tink_io__$Worker_EagerWorker();
tink_io_Worker.pool = [tink_io_Worker.EAGER];
card_Program.main();
})(global);
