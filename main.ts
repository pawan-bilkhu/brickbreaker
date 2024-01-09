namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Brick = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ball, function (sprite, otherSprite) {
    otherSprite.vy = otherSprite.vy * -1
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Brick, SpriteKind.Ball, function (sprite, otherSprite) {
    otherSprite.vy = otherSprite.vy * -1
    if (sprites.readDataNumber(sprite, "life") > 0) {
        sprites.changeDataNumberBy(sprite, "life", -1)
        sprite.setImage(brickSpriteImageList[sprites.readDataNumber(sprite, "life")])
    } else {
        sprites.destroy(sprite)
    }
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.UntilDone)
})
let brickSprite: Sprite = null
let brickPositionX = 0
let brickSpriteImageList: Image[] = []
brickSpriteImageList = [
img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    `,
img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `,
img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `,
img`
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    `
]
let paddleSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    `, SpriteKind.Player)
paddleSprite.setPosition(74, 115)
controller.moveSprite(paddleSprite, 100, 0)
paddleSprite.setStayInScreen(true)
let ballSprite = sprites.create(img`
    5 5 5 5 
    5 5 5 5 
    5 5 5 5 
    5 5 5 5 
    `, SpriteKind.Ball)
ballSprite.setFlag(SpriteFlag.ShowPhysics, true)
ballSprite.setVelocity(randint(-25, 25), randint(-75, -30))
ballSprite.setPosition(randint(10, 170), randint(35, 80))
ballSprite.setBounceOnWall(true)
let stepSize = 6
let brickPositionY = 50
for (let rows = 0; rows <= 3; rows++) {
    brickPositionX = scene.screenHeight() / stepSize
    for (let index = 0; index <= stepSize; index++) {
        brickSprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Brick)
        sprites.setDataNumber(brickSprite, "life", rows)
        brickSprite.setImage(brickSpriteImageList[sprites.readDataNumber(brickSprite, "life")])
        brickSprite.setPosition(brickPositionX, brickPositionY)
        brickPositionX += 20
    }
    brickPositionY += -10
}
game.onUpdate(function () {
	
})
