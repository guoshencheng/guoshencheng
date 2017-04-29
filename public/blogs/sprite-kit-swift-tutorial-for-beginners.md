######[Translate form http://www.raywenderlich.com/84434/sprite-kit-swift-tutorial-beginners](http://www.raywenderlich.com/84434/sprite-kit-swift-tutorial-beginners)

小贴士：这是从之前的一个[很受欢迎的教程](http://www.raywenderlich.com/?p=25736)用Swift重写出来的，并作为iOS8盛宴的一部分发布。</br>
就像众多的超级英雄结合在一起一样，Sprite Kit和Swift是一个令人惊讶的组合。</br>

- `Sprite Kit` 是制作iOS游戏的最好方式之一，它容易上手，强大而且完全受Apple官方支持。
- `Swift` 是一个非常简单的语言，尤其对于那些新进入iOS的人来说，这是非常容易上手的。

在这个教程里，你会学到如何使用Apple官方的2D游戏引擎来创建2D游戏，我们会使用Sprite Kit和Swift！</br>
你可以跟着这个教程学习，也可以直接跳过教程去看最后的项目代码。当然，我们的主题是忍者。
>> Note：这个教程在我心中有些特别，因为这个教程[之前的版本](http://www.raywenderlich.com/?p=25736)是我们这个网站最早发布的教程之一。它使用一个完全不同的语言（Objective-C）和另一个游戏引擎（Cocos2d）编写的。时间过得真是快！

###Sprite Kit 对比 Unity
有一个能够替代Sprite Kit而且很受欢迎的游戏引擎叫做Unity，Unity最早之前是一个3D引擎，但是最近也开始在内部支持2D。

所以，在你开始学习之前，我建议你先想好Sprite Kit和Unity中哪个会是你的项目的最好选择。

#####Sprite Kit的优点

- `它直接编译在iOS原生框架上`： 它没有必要去下载额外的库或者产生外部依赖。你可以在不依靠额外的插件的情况下无缝的使用其他比如像`iAd`，`In-App Purchases`等等之类的iOS框架。
- `它依赖你现有的技能`：如果已经了解Swift和iOS的开发，你可以马上学会Sprite Kit。
- `这是Apple官方提供的`：它给你了你迁移到所有Apple新产品支持的优势。
- `这是免费的`：这可能是最重要的原因了！你可以在不花费一分钱的情况下获得到所有的Sprite Kit的功能，Unity有一个免费的版本，但是它不包括Pro版本的所有功能（而且比如你如果要避免Unity的弹出界面，你需要升级它）。

#####Unity的优点

- `跨平台` 这是最大的一点了，如果你使用Sprite Kit。你就定死在iOS环境下，使用Unity，你可以随意到处你的游戏到Android，Windows等等。
- `虚拟场景设计` Unity在设计场景的时候非常简单，Sprite Kit在iOS8也有一个场景设计工具，但是这对于Unity提供的来说非常基础。
- `资源商店` Unity内建了一个资源商店，你可以为你的游戏在这个商店里面购买各种各样的资源，有很多组件资源能够节省你不少的开发时间。
- `更加强大` Unity比Sprite Kit含有更多地功能。

###我应该选择哪个？

这看过上面的之后应该在想：”那么我应该选择哪个2D框架引擎呢？“

这个答案取决你想要的目标是什么，这里是我的答案：

- 如果你是一个编程新手，并且想要专注学习iOS：使用Sprite Kit——它是内建的，学起来简单，你可以很好的完成。
- 如果你需要跨平台开发或者开发一个复杂的游戏：使用Unity——它非常强大而且灵活。

如果你觉得Unity适合你，可以看看我们的[Unity教程](http://raywenderlich.com/tutorials#unity)或者我们的[Unity视频教程](http://www.raywenderlich.com/?p=82832);

否则的话，继续阅读并且开始学习Sprite Kit！

###你好 Sprite Kit!

我们从使用Sprite Kit游戏模板创建一个Hello World例子开始，我们使用Xcode6创建。打开Xcode 选择File\New\Project，选择iOS\Application\Game template， 点击继续。

![](http://cdn1.raywenderlich.com/wp-content/uploads/2014/09/001_New_Game-480x282.png)

输入项目名称为SpriteKitSimpleGame， 语言为Swift， 使用框架为SpriteKit，设备为iPhone，然后点击继续

![](http://cdn1.raywenderlich.com/wp-content/uploads/2014/09/002_Options-480x280.png)

在你的硬盘上选择一个地方来保存你的项目，然后点击创建，学则iPhone6模拟器，然后点击运行按钮，在载入界面结束后：

![](http://cdn3.raywenderlich.com/wp-content/uploads/2014/09/003_Hello_World-281x500.png)

Sprite Kit是通过场景的概念组织的，场景就是游戏里有层级的一系列荧幕，比如你会有一个场景来防止游戏的主要区域，还有一个场景来放世界地图，在他们之间就有层级。
如果你看一下你的项目，你会看见模板已经在你的项目中默认创建了一个叫做`GameScene`的场景，打开`GameScene.swift`文件你会发现这包含了一些代码放置一段文字当屏幕上，并在你点击的时候加入一个宇宙飞船。

在这个教程中，你主要会和这个`GameScene`场景打交道，但是在开始之前，你需要做一些改变，因为这个游戏是横屏的而不是竖屏的。

###准备工作

对于这个模板项目还有两个问题，第一个问题是我们需要一个横屏的，而这个项目是竖屏的，选择`SpriteKitSimpleGame`的target，然后在`Deployment Info`这些选项中，取消竖屏，然后只剩下向左横屏和向右横屏被勾上就像下面显示的那样：

![](http://cdn2.raywenderlich.com/wp-content/uploads/2014/09/004_Landscape-700x445.png)

其次，删除`GameScene.sks`文件，在弹出的时候选择`移除到垃圾桶`,这个文件可以让你可视化的在场景上设置精灵和其他组件，但是对于这个游戏，这个游戏非常简单的通过代码加入元素，所以你并不需要它。

接下来，打开GameViewController.swift 然后 用下面的代码替换里面的内容：

```swift
import UIKit
import SpriteKit
 
class GameViewController: UIViewController {
 
  override func viewDidLoad() {
    super.viewDidLoad()
    let scene = GameScene(size: view.bounds.size)
    let skView = view as SKView
    skView.showsFPS = true
    skView.showsNodeCount = true
    skView.ignoresSiblingOrder = true
    scene.scaleMode = .ResizeFill
    skView.presentScene(scene)
  }
 
  override func prefersStatusBarHidden() -> Bool {
    return true
  }
}
```

`GameViewController`除了他的`View`是个`SKView`之外他就是个普通的`UIViewController`,这个View包含了一个`Sprite Kit`的场景。

在这里你在`viewDidLoad()`中创建了一个`GameScene`对象，并把它初始化为屏幕大小。

这些就是准备工作，那么接下来让我们在屏幕上画点东西吧。

###加入精灵元素

首先，下载[这个项目的资源](http://cdn3.raywenderlich.com/wp-content/uploads/2015/01/SpriteKitSimpleGameResources.zip)，然后将这些资源拖拽到项目中，请确认在拖进去的时候你选择了`拷贝到项目文件夹中`，并选择了`SpriteKitSimpleGame`为Target。

然后打开`GameScene.swift` 然后用下面的代码代替里面的内容：

```swift
import SpriteKit
 
class GameScene: SKScene {
 
  // 1
  let player = SKSpriteNode(imageNamed: "player")
 
  override func didMoveToView(view: SKView) {
    // 2
    backgroundColor = SKColor.whiteColor()
    // 3
    player.position = CGPoint(x: size.width * 0.1, y: size.height * 0.5)
    // 4
    addChild(player)
  }
}
```

让我们一步一步来看这段代码

1、这里定义了一个叫做`player`的私有属性，这个属性就是一个精灵元素，你可以看到，创建一个精灵元素非常简单，只要使用这个图片的名字就能创建。

2、这里设置背景颜色就和App设置背景颜色一样简单。在这里你设置了背景色为白色。

3、你设置了这个精灵的位置为x为宽度的0.1，y为居中。

4、你必须要将精灵加入到场景中去才能看到这个精灵，就和你要将Views加入其他的Views里面一样。

Build 并 运行，忍者就出现在了屏幕上。

![](http://cdn1.raywenderlich.com/wp-content/uploads/2014/09/005_Ninja-480x269.png)

###移动的怪物

接下来你就要加入一些怪物到你的场景中来和你的忍者战斗，为了让事情变得有趣些，你需要让怪物动起来，不然的话就没有什么挑战性了！所以，让我们在屏幕的右边创建一些怪物，并给他加上移动到左边的动作。

将下面的代码加入到`GameScene.swift`：

```swift
func random() -> CGFloat {
  return CGFloat(Float(arc4random()) / 0xFFFFFFFF)
}
 
func random(#min: CGFloat, max: CGFloat) -> CGFloat {
  return random() * (max - min) + min
}
 
func addMonster() {
 
  // Create sprite
  let monster = SKSpriteNode(imageNamed: "monster")
 
  // Determine where to spawn the monster along the Y axis
  let actualY = random(min: monster.size.height/2, max: size.height - monster.size.height/2)
 
  // Position the monster slightly off-screen along the right edge,
  // and along a random position along the Y axis as calculated above
  monster.position = CGPoint(x: size.width + monster.size.width/2, y: actualY)
 
  // Add the monster to the scene
  addChild(monster)
 
  // Determine speed of the monster
  let actualDuration = random(min: CGFloat(2.0), max: CGFloat(4.0))
 
  // Create the actions
  let actionMove = SKAction.moveTo(CGPoint(x: -monster.size.width/2, y: actualY), duration: NSTimeInterval(actualDuration))
  let actionMoveDone = SKAction.removeFromParent()
  monster.runAction(SKAction.sequence([actionMove, actionMoveDone]))
}
```

我已经加上了很多的注释来让大家更好地理解，首先我们要向之前讨论那样建立对象，你需要做一些简单的计算来确定我们在哪里创建这个怪物对象，设置它的位置，然后就像你加入忍者一样的加入怪物。

唯一不同的是我们这次要加入一些动作，Sprite Kit提供了很多极其简便的内建方式来帮助你改变精灵元素的状态，比如移动动作，旋转动作，渐变动作，动画动作等等，在这里你会对怪物使用三种动作。

- `SKAction.moveTo(_:duration:)`：你使用这个方法让对象横跨屏幕到屏幕的左边，注意你可以动过设置`duration`来确定这大哥移动动画的时间，我们这里使用一个2~4的随机值。
- `SKAction.removeFromParent()`：Sprite Kit提供一个简便的方法来将精灵节点从他的父节点移除，就是把它从场景移除的意思，我们使用这个方法将怪物从场景中移除，这样这个怪物就消失了，这点非常重要，因为如果你不提供让怪物对象消亡的方法，你的设备的内存会被消耗光。
- `SKAction.sequence(_:)`：`sequence`将我们想要执行的方法序列化，使用这个东西可以先执行“移动”的动作，等到这个完成了，再执行“从父节点删除”的动作。

在这些动作之前，你必须要先调用创建怪物对象的方法。为了让这些更加有趣些，我们需要让怪物连续不断的出现在屏幕上。我们只需要在`didMoveToView()`的最后加入以下代码：

```swift
runAction(SKAction.repeatActionForever(
  SKAction.sequence([
    SKAction.runBlock(addMonster),
    SKAction.waitForDuration(1.0)
  ])
))
```
这样你就可以有序的调用在代码块中的动作（多亏了Swift的强大，你可以无缝的在addMaster()中加入动作代码），在完成后等待一秒钟之后，你可以虚幻这个动作的序列。

好了！运行这个项目，现在你可以欣喜的看见怪物在屏幕上移动。

![](http://cdn2.raywenderlich.com/wp-content/uploads/2014/09/006_Monsters-480x269.png)

###发射飞镖！

这个时候，忍者正在等着你给他下指令呢！那么让我们发射飞镖吧！有很多方式可以实现发射飞镖，但是在这个游戏中，我们需要完成的效果是当用户点击屏幕的时候，忍者会向用户点击的方向发射飞镖。

对于一个初学者来说，我们会使用“移动”动作来实现，但是要使用“移动“来实现我们需要做一些数学计算。

因为”移动“动作需要你告诉他一个飞镖的目的地，但是你点击的位置只是指明一个方向，而不是飞镖的目的地，你要做的是让飞镖沿着手点击的方向一直移动，直到这个飞镖飞出屏幕。

下面这张图说明了这种情况：

![](http://cdn5.raywenderlich.com/wp-content/uploads/2010/02/ProjectileTriangle.jpg)

你可以发现，你在原始点和点击的点的之间建立了一个三角形，你需要建立一个等比的三角形，然后你会直到这个点将会从屏幕的哪里飞出。

如果你对向量计算有所了解的话，你使用起这些计算会比较得心应手，但是Srpite Kit没有默认的这些方法，需要自己去实现。

非常幸运，多亏了强的Swift的[运算符重载](http://www.raywenderlich.com/?p=80818)功能，我们能够非常简单的实现这些功能。将这些方法加入到文件的顶部，就在`GameScene`之前。

```swift
func + (left: CGPoint, right: CGPoint) -> CGPoint {
  return CGPoint(x: left.x + right.x, y: left.y + right.y)
}
 
func - (left: CGPoint, right: CGPoint) -> CGPoint {
  return CGPoint(x: left.x - right.x, y: left.y - right.y)
}
 
func * (point: CGPoint, scalar: CGFloat) -> CGPoint {
  return CGPoint(x: point.x * scalar, y: point.y * scalar)
}
 
func / (point: CGPoint, scalar: CGFloat) -> CGPoint {
  return CGPoint(x: point.x / scalar, y: point.y / scalar)
}
 
#if !(arch(x86_64) || arch(arm64))
func sqrt(a: CGFloat) -> CGFloat {
  return CGFloat(sqrtf(Float(a)))
}
#endif
 
extension CGPoint {
  func length() -> CGFloat {
    return sqrt(x*x + y*y)
  }
 
  func normalized() -> CGPoint {
    return self / length()
  }
}
```
这些都是一些非常基础的向量计算的实现，如果你对这里为什么会这么做或者你是第一次接触向量计算的话，可以看一些这个[网站](http://www.mathsisfun.com/algebra/vectors.html)迅速学期一下。

接下来，在文件中加入这个方法：

```swift
override func touchesEnded(touches: NSSet, withEvent event: UIEvent) {
 
  // 1 - Choose one of the touches to work with
  let touch = touches.anyObject() as UITouch
  let touchLocation = touch.locationInNode(self)
 
  // 2 - Set up initial location of projectile
  let projectile = SKSpriteNode(imageNamed: "projectile")
  projectile.position = player.position
 
  // 3 - Determine offset of location to projectile
  let offset = touchLocation - projectile.position
 
  // 4 - Bail out if you are shooting down or backwards
  if (offset.x < 0) { return }
 
  // 5 - OK to add now - you've double checked position
  addChild(projectile)
 
  // 6 - Get the direction of where to shoot
  let direction = offset.normalized()
 
  // 7 - Make it shoot far enough to be guaranteed off screen
  let shootAmount = direction * 1000
 
  // 8 - Add the shoot amount to the current position
  let realDest = shootAmount + projectile.position
 
  // 9 - Create the actions
  let actionMove = SKAction.moveTo(realDest, duration: 2.0)
  let actionMoveDone = SKAction.removeFromParent()
  projectile.runAction(SKAction.sequence([actionMove, actionMoveDone]))
}
```
这里有很多知识点，我们还是一步一步来看代码。

1、一个非常酷的事情就是SpriteKit包含了UITouch的一些方法比如`locationInNode(_:)`和`previousLocationInNode(_:)`，这些方法能让你找到你在SKNode系统中的点击事件，通过这点，你可以找到在SKNode的点击位置。
2、然后你在忍者的位置上面创建一个飞镖对象，这时候你还不需要将这个飞镖加到场景中去，因为你需要先进行检测，因为我们的游戏不允许忍者向后发射飞镖。
3、然后通过运算计算出点击位置和忍者位置的向量。
4、如果X值小于或者等于0那么，这说明忍者将要向后发射，我们就直接return不做任何操作。
5、否则的话，将飞镖加入到场景中。
6、将获得的向量转换为长度为1的单位向量，这样我们可以用这个向量更容易的得到我们所要的长度的向量，因为1 * 长度 = 长度。
7、我们将这个单位向量乘以1000，为什么是1000？因为这样会有足够的长度让飞镖飞出屏幕。
8、加入当前的位置的数据，这样我们就能知道飞镖什么时候飞出屏幕。
9、最后像创建怪物对象一样使用`moveTo(_:, duration:)`方法和`removeFromParent()`方法。

运行代码，现在你的忍者就能够向着成群飞来的怪物发射了！

![](http://cdn1.raywenderlich.com/wp-content/uploads/2014/09/007_Shoot-480x269.png)

###碰撞检测和物理效果

我们从在文件头部加入下面这段代码开始：

```swift
struct PhysicsCategory {
  static let None      : UInt32 = 0
  static let All       : UInt32 = UInt32.max
  static let Monster   : UInt32 = 0b1       // 1
  static let Projectile: UInt32 = 0b10      // 2
}
```
This is setting up the constants for the physics categories you’ll need in a bit – no pun intended! :] （这句翻译不好，各位自己理解）

`注意`：你会想这TM是什么语句，你会发现这个Sprite Kit的类是一个作为位掩码的32位的Integer数据，这个方式说明数字总的每一个位可以代表一个类（所以你最多能够含有32个类）。在这里，你设置第一位指向怪物对象，第二位指向飞镖对象等等。

接下来，让`GameScene`实现`SKPhysicsContactDelegate`接口：

```swift
class GameScene: SKScene, SKPhysicsContactDelegate {
```
然后，在`didMoveToView(_:) `中在加入忍者之后加入这几行代码：

```swift
physicsWorld.gravity = CGVectorMake(0, 0)
physicsWorld.contactDelegate = self
```
这设置这个这个物理世界没有重力，并且能够将两个物体的碰撞事件通过delegate传递到场景中。

在`addMonster()`方法中，在创建怪物对象的后面插入这几行代码：

```swift
monster.physicsBody = SKPhysicsBody(rectangleOfSize: monster.size) // 1
monster.physicsBody?.dynamic = true // 2
monster.physicsBody?.categoryBitMask = PhysicsCategory.Monster // 3
monster.physicsBody?.contactTestBitMask = PhysicsCategory.Projectile // 4
monster.physicsBody?.collisionBitMask = PhysicsCategory.None // 5
```
我们一行一行来看这些代码做了什么

1、为精灵元素创建SKPhysicsBody，在这个栗子中，SKPhysicsBody是一个和精灵大小相同的矩形，我们把这个当做这个怪物的近似形状。

2、这只精灵元素是动态的，这意味着物理引擎是不能控制这个精灵元素的移动的，你可以通过代码来设置这个精灵元素的移动。

3、设置精灵元素的`bit mask`为我们之前定义的`monsterCategory`。

4、`contactTestBitMask` indicates what categories of objects this object should notify the contact listener when they intersect. You choose projectiles here. 

5、`The collisionBit` Mask indicates what categories of objects this object that the physics engine handle contact responses to (i.e. bounce off of). You don’t want the monster and projectile to bounce off each other – it’s OK for them to go right through each other in this game – so you set this to 0.(这两段没看懂)

接下来，在`touchesEnded(_:withEvent:)`中，在设置飞镖的地点之后加入下面代码：

```swift
projectile.physicsBody = SKPhysicsBody(circleOfRadius: projectile.size.width/2)
projectile.physicsBody?.dynamic = true
projectile.physicsBody?.categoryBitMask = PhysicsCategory.Projectile
projectile.physicsBody?.contactTestBitMask = PhysicsCategory.Monster
projectile.physicsBody?.collisionBitMask = PhysicsCategory.None
projectile.physicsBody?.usesPreciseCollisionDetection = true
```

可以自己尝试着看懂这些代码，如果你还不懂，就回过头去看看之前的讲解。

第二个测试就是看看这两段代码有什么不一样的地方。

接下来，定义一个飞镖碰撞怪物之后的处理的方法，注意这个方法不会自动调用，你需要自己调用，

```swift
func projectileDidCollideWithMonster(projectile:SKSpriteNode, monster:SKSpriteNode) {
  println("Hit")
  projectile.removeFromParent()
  monster.removeFromParent()
}
```

你在这里只是当他们碰撞的时候从场景中移除怪物和飞镖，很简单！是吗？

现在，是时候实现delete了，将下面这个新方法加到文件中

```swift
func didBeginContact(contact: SKPhysicsContact) {
 
  // 1
  var firstBody: SKPhysicsBody
  var secondBody: SKPhysicsBody
  if contact.bodyA.categoryBitMask < contact.bodyB.categoryBitMask {
    firstBody = contact.bodyA
    secondBody = contact.bodyB
  } else {
    firstBody = contact.bodyB
    secondBody = contact.bodyA
  }
 
  // 2
  if ((firstBody.categoryBitMask & PhysicsCategory.Monster != 0) &&
      (secondBody.categoryBitMask & PhysicsCategory.Projectile != 0)) {
    projectileDidCollideWithMonster(firstBody.node as SKSpriteNode, monster: secondBody.node as SKSpriteNode)
  }
 
}
```

因为你设置了这个场景为这个物理世界的代理，这个方法在每次两个精灵经行碰撞的时候都会调用。

这个方法有两部分：

1、这个方法传递了两个碰撞的精灵元素，但是我们不能保证两个精灵元素的前后顺序，所以这些位掩码可以帮助我们识别两个精灵元素。

2、最后，判断碰撞的两个精灵元素是不是一个是怪物精灵，一个是飞镖精灵，然后调用之前定义的那个方法。

运行程序，现在，当你的飞镖撞击到目标的时候，他们就会消失。

###结束点击

现在，你离一个非常好玩（但是非常简单）的游戏已经很近了，你现在只需要一些特效和音乐（当然，哪个游戏没有音乐效果？）和一些简单的游戏逻辑。

Sprite Kit本身没有像cocos2D一样带有一个音频引擎，但是有一个好消息就是我们有个方法来根据动作来播放音乐，你可以使用AVFoundation来播放背景音乐。

你现在已经一些我给的非常酷炫的音乐，这会对你的项目产生非常棒的效果，这些音乐就在之前你加入项目的资源文件里面，你只需要播放他们！

为了实现这些，你需要在`GameScene.swift`中加入这些代码：

```swift
import AVFoundation
 
var backgroundMusicPlayer: AVAudioPlayer!
 
func playBackgroundMusic(filename: String) {
  let url = NSBundle.mainBundle().URLForResource(
    filename, withExtension: nil)
  if (url == nil) {
    println("Could not find file: \(filename)")
    return
  }
 
  var error: NSError? = nil
  backgroundMusicPlayer = 
    AVAudioPlayer(contentsOfURL: url, error: &error)
  if backgroundMusicPlayer == nil {
    println("Could not create audio player: \(error!)")
    return
  }
 
  backgroundMusicPlayer.numberOfLoops = -1
  backgroundMusicPlayer.prepareToPlay()
  backgroundMusicPlayer.play()
}
```

这些是一些AVFoundation的代码。
想要试一试这些，只要在`didMoveToView(_:)`刚开始加入下面这些代码：

```swift
playBackgroundMusic("background-music-aac.caf")
```

至于特效音乐，在`touchesEnded(_:withEvent:)`加入下面代码：

```swift
runAction(SKAction.playSoundFileNamed("pew-pew-lei.caf", waitForCompletion: false))
```

非常方便，是不是？你只需要一行代码就能播放音效了。
运行项目，享受这些音乐吧！

###游戏结束，小伙子！

现在让我们新建一个场景来作为“获胜”或者“失败”页面，新建文件`iOS\Source\Swift File template`，为文件命名，然后点击创建。

然后在`GameOverScene.swift`中用下面代码代替里面的内容：

```swift
import Foundation
import SpriteKit
 
class GameOverScene: SKScene {
 
  init(size: CGSize, won:Bool) {
 
    super.init(size: size)
 
    // 1
    backgroundColor = SKColor.whiteColor()
 
    // 2
    var message = won ? "You Won!" : "You Lose :["
 
    // 3
    let label = SKLabelNode(fontNamed: "Chalkduster")
    label.text = message
    label.fontSize = 40
    label.fontColor = SKColor.blackColor()
    label.position = CGPoint(x: size.width/2, y: size.height/2)
    addChild(label)
 
    // 4
    runAction(SKAction.sequence([
      SKAction.waitForDuration(3.0),
      SKAction.runBlock() {
        // 5
        let reveal = SKTransition.flipHorizontalWithDuration(0.5)
        let scene = GameScene(size: size)
        self.view?.presentScene(scene, transition:reveal)
      }
    ]))
 
  }
 
  // 6
  required init(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
```
这个代码中有5个值得提及的部分：

1、设置背景为白色，就和之前在主场景做的一样。

2、通过won参数来决定是“胜利”或者“失败”。

3、这展示了应该怎么在使用Sprite Kit在屏幕上放一个文字，正如你所见的，这非常简单，你只需要设置字体并定义一些参数。

4、最后，定义两个有序的动作，刚开始先等待两秒，然后它运行了代码块

5、这是我们切换场景的动画，你可以在多种多样的动画中选择一种方式来切换场景，在这里你选择了Flip动画，并设置动画时间为0.5秒，然后你创建了一个你想要显示的场景，然后使用self.view的`presentScene(_:transition:)`方法来切换。

6、如果你实现了场景的init方法，那么你必须也实现`init(coder:)`方法， 虽然这个方法是不会被调用的，所以你只需要随便加上`fatalError(_:)`之类的代码。

这下好了，现在你只需要启动你的主场景，然后在适当的时候切换到游戏结束场景就好了。

切换回到`GameScene.swift`， 在`addMonster()`中的最后加入下面的代码：

```swift
let loseAction = SKAction.runBlock() {
  let reveal = SKTransition.flipHorizontalWithDuration(0.5)
  let gameOverScene = GameOverScene(size: self.size, won: false)
  self.view?.presentScene(gameOverScene, transition: reveal)
}
monster.runAction(SKAction.sequence([actionMove, loseAction, actionMoveDone]))
```

这设定了当怪物走出了屏幕之后你就失败了，如果你理解了所有的代码，如果不参考教程对之前代码的解释，这里给你来个突击检测：你为什么要在`actionMoveDone`之前运行`loseAction`，如果你不知道会发生什么的话，你可以颠倒顺序试试看。

现在你需要处理胜利的逻辑了，别对你的玩家太残忍了，在`GameScene`的最上面加上一个新的属性，就放在`Player`的下面：

```swift
var monstersDestroyed = 0
```

并且在`projectile(_:didCollideWithMonster:):`最下面加上这些代码：

```swift
monstersDestroyed++
if (monstersDestroyed > 30) {
  let reveal = SKTransition.flipHorizontalWithDuration(0.5)
  let gameOverScene = GameOverScene(size: self.size, won: true)
  self.view?.presentScene(gameOverScene, transition: reveal)
}
```
继续运行项目，现在你就可以产生胜利和失败的条件，并在适当的时候切换到游戏结束的场景！

![](http://cdn2.raywenderlich.com/wp-content/uploads/2014/09/008_You_Won-480x269.png)

###看完这个该何去何从

结束了，这是这个`Sprite Kit Swift Tutorial for beginners`教程的全部[代码](http://cdn2.raywenderlich.com/wp-content/uploads/2014/10/SpriteKitSimpleGameSwift2.zip)

我希望你能够喜欢学习Sprite Kit并能够有兴趣自己做一个自己的游戏

如果你想逃学习更多地关于Sprite Kit的知识，你可以看一下我们的书[《 iOS Games by Tutorials》](http://www.raywenderlich.com/?page_id=48022)