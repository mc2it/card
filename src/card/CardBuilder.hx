package card;

using StringTools;

/** Builds a business card by appending string chunks. **/
@:forward(toString)
abstract CardBuilder(StringBuf) from StringBuf {

	/** The string used to indent each line. **/
	static inline final indent = "   ";

	/** The inner width of a line, in characters. **/
	static inline final width = 50;

	/** Creates a new string buffer. **/
	public function new() this = new StringBuf();

	/** Appends a centered line of text. **/
	public inline function center(text: String)
		return line('${repeat(" ", Math.floor((width - getLength(text)) / 2))}$text');

	/** Appends a bottom border. **/
	public inline function footer()
		return addLine('<green>╰${repeat("─")}╯</>');

	/** Appends a top border. **/
	public inline function header()
		return addLine('<green>╭${repeat("─")}╮</>');

	/** Adds a labeled value. **/
	public inline function label(label: String, value: String)
		return line('<light_white>$label:</> '.lpad(" ", 10 + indent.length + "<light_white></>".length) + value);

	/** Appends a line of text. **/
	public inline function line(text = "")
		return addLine('<green>│</>$text${repeat(" ", width - getLength(text))}<green>│</>');

	/** Appends a line of plain text. **/
	function addLine(text: String) {
		this.add('$indent$text${Program.newLine}');
		return (this: CardBuilder);
	}

	/** Gets the length in characters of the specified text, excluding formatting tags. **/
	function getLength(text: String)
		return ~/<[^<]*>/g.replace(text, "").length;

	/** Repeats the specified `character` a given number of `times`. **/
	function repeat(character: String, times = width)
		return [for (_ in 0...times) character].join("");
}
