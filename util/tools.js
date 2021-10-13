addEventListener('load', function() {
	window.log = function(message, style) {
		// 如果是只传字符串，那就是只有一个key，如果是带样式选择，那就需要两个参数
		console.log(message, style || "")
	}

	window.logs = {
		info: function(message) {
			console.log(`%c ${message}`, "color:#3196d9")
		},
		success: function(message) {
			console.log(`%c ${message}`, "color:#34d55e")
		},
		error: function(message) {
			console.log(`%c ${message}`, "color:#d53434")
		},
		warning: function(message) {
			console.log(`%c ${message}`, "color:#e78633")
		},
	}
})
