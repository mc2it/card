//! --define hxnodejs --define no-deprecation-warnings --library hxnodejs --library tink_core
import haxe.Timer;
import js.glob_watcher.GlobWatcher;
import js.lib.Error as JsError;
using DateTools;
using tink.CoreApi;

/** Watches for file changes. **/
function main() {
	measureCommand("lix Build --debug");
	Sys.command("node --enable-source-maps bin/mc2it_card.js");

	GlobWatcher.watch("src/mc2it/card/**/*.hx", done -> {
		measureCommand(done, "haxe --debug build.hxml");
		Sys.command("node --enable-source-maps bin/mc2it_card.js");
	});
}

/** Formats the specified `duration` in seconds. **/
private function formatDuration(duration: Float) {
	final operand = Math.pow(10, 3);
	final timestamp = Math.round(duration * operand) / operand;
	final seconds = Std.int(timestamp);
	final milliseconds = Std.int((timestamp - seconds).seconds());
	return seconds > 1 ? '${seconds}s ${milliseconds}ms' : '${milliseconds}ms';
}

/** Measures the time it takes to run the specified `command` line. **/
private function measureCommand(?done: Callback<Null<JsError>>, command: String)
	measurePromise(done, command, () -> Promise.irreversible((resolve, reject) -> {
		final exitCode = Sys.command(command);
		exitCode == 0 ? resolve(Noise) : reject(Error.withData('The command "$command" failed.', exitCode));
	}));

/** Measures the time it takes to run the specified `promise` generator. **/
private function measurePromise(?done: Callback<Null<JsError>>, prompt: String, promise: () -> Promise<Any>) {
	Sys.print('$prompt ');
	final timestamp = Timer.stamp();
	promise().handle(outcome -> switch outcome {
		case Failure(error):
			Sys.println(error);
			done?.invoke(error.toJsError());
		case Success(_):
			Sys.println('> ${formatDuration(Timer.stamp() - timestamp)}');
			done?.invoke(null);
	});
}
