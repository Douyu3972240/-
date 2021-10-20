function init(canvasDOM) {
	let canvas = canvasDOM
	let ctx = canvas.getContext('2d')
	this.isShowFPS = false
	this.FPS = 30
	this.spirit = [] //用于记录canvas里面添加了哪些元素
	this.timer = {
		refresh: null //自动刷新的定时器
	}
	this.ctx = ctx
	return this
}


init.prototype.Image = function(src, name) {
	let image = new Image()
	image.src = src
	image.attribute = {}
	// image.attribute.id = 
	image.attribute.name = name || ""
	this.spirit.push(image)
	return image
}


init.prototype.controller = {
	// 键盘控制，
	onFire: function(FPS) {
		// 按下键盘空格键开始开火，现在先做成游戏开始就自动开火
		let bulletArr = [] //用来装子弹的数组
		let bullet = this.Image("./resource/images/bullet.png")
		bullet.attribute.width = 36 / 4
		bullet.attribute.height = 185 / 4
		bullet.attribute.speedY = 5
		bullet.attribute.speedX = 0
		bullet.attribute.x = 0
		bullet.attribute.y = 0

		bullet.onload = () => {
			for (let i in this.spirt) {
				// 找到我的飞机，让子弹从飞机的前面发射出来
				if (this.spirt[i].name == "myPlane") {
					// this.ctx.drawImage(bullet, this.spirt[i].attribute.x + (this.spirt[i].attribute.width+bullet.attribute.width) / 2, this.spirt[i].attribute.y - bullet.attribute
					// 	.height, bullet.attribute
					// 	.width,
					// 	bullet.attribute.height)
					debugger
					this.ctx.drawImage(bullet, 0, 0, bullet.attribute
						.width,
						bullet.attribute.height)
					break
				}
			}

		}
	},
	onLeftDown: function(fn) {
		addEventListener('keydown', function(e) {
			if (e.keyCode == "65" || e.keyCode == "37") {
				// 按下了A或者是左方向键
				fn()
			} else {}
		})
	},
	onRightDown: function(fn) {
		addEventListener('keydown', function(e) {
			if (e.keyCode == "68" || e.keyCode == "39") {
				// 按下了D或者是右方向键
				fn()
			} else {

			}
		})
	},
	onTopDown: function(fn) {
		addEventListener('keydown', function(e) {
			if (e.keyCode == "38" || e.keyCode == "87") {
				// 按下了W或者是上方向键
				fn()
			} else {}
		})
	},
	onBottomDown: function(fn) {
		addEventListener('keydown', function(e) {
			if (e.keyCode == "83" || e.keyCode == "40") {
				// 按下了S或者是下方向键
				fn()
			} else {}
		})
	},
	onLeftUp: function(fn) {
		addEventListener('keyup', function(e) {
			if (e.keyCode == "65" || e.keyCode == "37") {
				// 按下了A或者是左方向键
				fn()
			} else {}
		})
	},
	onRightUp: function(fn) {
		addEventListener('keyup', function(e) {
			if (e.keyCode == "68" || e.keyCode == "39") {
				// 按下了D或者是右方向键
				fn()
			} else {

			}
		})
	},
	onTopUp: function(fn) {
		addEventListener('keyup', function(e) {
			if (e.keyCode == "38" || e.keyCode == "87") {
				// 按下了W或者是上方向键
				fn()
			} else {}
		})
	},
	onBottomUp: function(fn) {
		addEventListener('keyup', function(e) {
			if (e.keyCode == "83" || e.keyCode == "40") {
				// 按下了S或者是下方向键
				fn()
			} else {}
		})
	}
}




init.prototype.update = function() {
	// 用于更新界面
	// 需要先清除画布，然后再次渲染画布
	this.ctx.clearRect(0, 0, 375, 667)
	// 清空元素管理数组
	this.spirit = []
	return this
}


init.prototype.setFPS = function(FPS) {
	// 设置一个帧率
	this.FPS = FPS
	return this
}

init.prototype.autoRefresh = function() {
	// 设置自动刷新
	// 需要先清除画布，然后再次渲染画布
	this.timer.refresh = setInterval(() => {
		// 1000ms需要刷新60次
	}, Math.round(1000 / this.FPS))
}


init.prototype.showFPS = function(position) {
	// 显示FPS，接受一个位置参数，值分别是left top right buttom
	let p = position || 'left'
	if (this.isShowFPS) {
		this.ctx.font = "24px 微软雅黑"
		this.ctx.fillStyle = "#f40"
		this.ctx.fillText(`FPS:${this.FPS}`, 5, 24)
	}
}

init.prototype.closeFPS = function() {
	this.isShowFPS = false
}


init.prototype.checkSpriteMargin = function(mainSprite, otherSprite) {
	// 碰撞检测
	// 主要是拿mainSprite和otherSprite的边缘区做检测
	// otherSprite为数组

	// 目前先只判断一个
	// 判断逻辑是主要目标的4个点的坐标是否在被检测目标的范围内
	let mainSpritePosition = {}
	mainSpritePosition["width"] = mainSprite.attribute.width
	mainSpritePosition["height"] = mainSprite.attribute.height
	mainSpritePosition["center"] = [mainSprite.attribute.x + mainSprite.attribute.width / 2, mainSprite.attribute
		.y + mainSprite.attribute.height / 2
	]
	mainSpritePosition["left-top"] = [mainSprite.attribute.x, mainSprite.attribute.y]
	mainSpritePosition["right-top"] = [mainSprite.attribute.x + mainSprite.attribute.width, mainSprite.attribute.y]
	mainSpritePosition["left-bottom"] = [mainSprite.attribute.x, mainSprite.attribute.y + mainSprite.attribute
		.height
	]
	mainSpritePosition["right-bottom"] = [mainSprite.attribute.x + mainSprite.attribute.width, mainSprite.attribute
		.y +
		mainSprite.attribute.height
	]


	let checkOtherSprite = []

	for (let i in otherSprite) {

		let data = {}
		data["width"] = otherSprite[i].attribute.width
		data["height"] = otherSprite[i].attribute.height
		data["center"] = [otherSprite[i].attribute.x + otherSprite[i].attribute.width / 2, otherSprite[i].attribute
			.y + otherSprite[i].attribute.height / 2
		]
		data["left-top"] = [otherSprite[i].attribute.x, otherSprite[i].attribute.y]
		data["right-top"] = [otherSprite[i].attribute.x + otherSprite[i].attribute.width, otherSprite[i]
			.attribute.y
		]
		data["left-bottom"] = [otherSprite[i].attribute.x, otherSprite[i].attribute.y + otherSprite[i]
			.attribute.height
		]
		data["right-bottom"] = [otherSprite[i].attribute.x + otherSprite[i].attribute.width, otherSprite[i]
			.attribute
			.y + otherSprite[i].attribute.height
		]

		checkOtherSprite.push(data)
	}


	// 开始循环判断，用每一个其他元素和主元素去比较判断位置
	for (let i in checkOtherSprite) {
		// 首先得到这两个元素谁的长宽更大
		// let maxWidth = checkOtherSprite[i].width > mainSpritePosition.width ? checkOtherSprite[i].width :
		// 	mainSpritePosition.width
		// let maxHeight = checkOtherSprite[i].height > mainSpritePosition.height ? checkOtherSprite[i].height :
		// 	mainSpritePosition.height

		let centerX = Math.abs(Math.abs(mainSpritePosition["center"][0]) - Math.abs(checkOtherSprite[i]["center"][
			0
		]))
		let centerY = Math.abs(Math.abs(mainSpritePosition["center"][1]) - Math.abs(checkOtherSprite[i]["center"][
			1
		]))

		if ((centerX <= checkOtherSprite[i].width / 2 + mainSpritePosition.width / 2) && (centerY <=
				checkOtherSprite[i].height / 2 + mainSpritePosition.height / 2)) {
			logs.error("发生了碰撞")
			return false
		}
	}
}
