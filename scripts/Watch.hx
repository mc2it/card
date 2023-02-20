//! --class-path src --define hxnodejs --library hxnodejs --library tink_core
import haxe.Timer;
import js.glob_watcher.GlobWatcher;
import js.lib.Error as JsError;
using tink.CoreApi;

/** Watches for file changes. **/
function main() GlobWatcher.watch("src/mc2it_card/**/*.hx", {ignoreInitial: false}, done -> measureCallback(done, () -> {
	Sys.command("lix Build --debug");
	Sys.command("node bin/mc2it_card.js");
}));

/** Measures the time it takes to run the specified `callback` function. **/
private function measureCallback(?done: Callback<Null<JsError>>, callback: Callback<Noise>, ?prompt: String) try {
	if (prompt != null) Sys.print('$prompt ');
	final timestamp = Timer.stamp();
	callback.invoke(Noise);
	Sys.println('> ${Tools.formatDuration(Timer.stamp() - timestamp)}');
	if (done != null) done.invoke(null);
} catch (e) { done != null ? done.invoke(new JsError(e.message)) : throw e; }
