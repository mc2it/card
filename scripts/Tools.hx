import sys.FileSystem;
import sys.io.File;
using DateTools;
using haxe.io.Path;

/** Recursively deletes all files in the specified `directory`. **/
function cleanDirectory(directory: String) for (entry in FileSystem.readDirectory(directory).filter(entry -> entry != ".gitkeep")) {
	final path = Path.join([directory, entry]);
	FileSystem.isDirectory(path) ? removeDirectory(path) : FileSystem.deleteFile(path);
}

/** Formats the specified `duration` in seconds. **/
function formatDuration(duration: Float) {
	final timestamp = Math.round(duration * 1_000) / 1_000;
	final seconds = Std.int(timestamp);
	final milliseconds = Std.int((timestamp - seconds).seconds());
	return seconds > 0 ? '${seconds}s ${milliseconds}ms' : '${milliseconds}ms';
}

/** Recursively deletes the specified `directory`. **/
function removeDirectory(directory: String) {
	cleanDirectory(directory);
	FileSystem.deleteDirectory(directory);
}

/** Replaces in the specified `file` the substring which the `pattern` matches with the given `replacement`. **/
function replaceInFile(file: String, pattern: EReg, replacement: String)
	File.saveContent(file, pattern.replace(File.getContent(file), replacement));
