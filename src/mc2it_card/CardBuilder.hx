package mc2it_card;

#if neko import neko.Utf8; #end
using StringTools;

/** Builds a business card by appending string chunks. **/
@:forward(toString)
abstract CardBuilder(StringBuf) from StringBuf {

	/** The string corresponding to a line break. **/
	public static final newLine = Sys.systemName() == "Windows" ? "\r\n" : "\n";

	/** The string used to indent each line. **/
	static inline final indent = "   ";

	/** The inner width of a line, in characters. **/
	static inline final width = 41;

	/** Creates a new string buffer. **/
	public inline function new() this = new StringBuf();

	/** Appends a centered line of text. **/
	public function center(text: String): CardBuilder
		return line('${repeat(" ", Math.floor((width - getLength(text)) / 2))}$text');

	/** Appends a bottom border. **/
	public function footer(): CardBuilder
		return addLine('<green>╰${repeat("─")}╯</>');

	/** Appends a top border. **/
	public function header(): CardBuilder
		return addLine('<green>╭${repeat("─")}╮</>');

	/** Adds a labeled value. **/
	public function label(label: String, value: String): CardBuilder
		return line('<light_white>$label:</> '.lpad(" ", 10 + indent.length + "<light_white></>".length) + value);

	/** Appends a line of text. **/
	public function line(text = ""): CardBuilder
		return addLine('<green>│</>$text${repeat(" ", width - getLength(text))}<green>│</>');

	/** Appends a line of plain text. **/
	function addLine(text: String): CardBuilder {
		this.add('$indent$text$newLine');
		return abstract;
	}

	/** Gets the length in characters of the specified text, excluding formatting tags. **/
	function getLength(text: String): Int {
		final innerText = ~/<[^>]+>/g.replace(text, "");
		return #if neko Utf8.length(innerText) #else innerText.length #end;
	}

	/** Repeats the specified `character` a given number of `times`. **/
	function repeat(character: String, times = width): String
		return [for (_ in 0...times) character].join("");
}
