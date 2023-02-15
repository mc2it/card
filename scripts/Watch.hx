//! --class-path src --define hxnodejs --library hxnodejs --library tink_core
import haxe.Timer;
import js.glob_watcher.GlobWatcher;
import js.lib.Error as JsError;
using tink.CoreApi;

/** Runs the script. **/
function main() GlobWatcher.watch("src/mc2it_card/**/*.hx", {ignoreInitial: false}, done -> measureCommand(done, () -> {
	Sys.command("haxe", ["build.hxml"]);
	Sys.command("node", ["bin/mc2it_card.js");
}));

/** Measures the time it takes to run the specified `command`. **/
private function measureCommand(done: Callback<Null<JsError>>, command: Callback<Noise>) try {
	final timestamp = Timer.stamp();
	command.invoke(Noise);
	Sys.println(Tools.formatDuration(Timer.stamp() - timestamp));
	done.invoke(null);
} catch (e) { done.invoke(new JsError(e.message)); }
