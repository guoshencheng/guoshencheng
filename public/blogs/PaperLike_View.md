上周有翻译到一篇关于使用Layout实现可拖拽的CollectionView的英文[博客](http://www.jianshu.com/p/8d1bf1838882)，之后就去大概实现了一下[Facebook  Paper](https://www.facebook.com/paper)的Paper选择页，大概界面是这样的

![](http://img-storage.qiniudn.com/15-10-28/27520472.jpg)

上下的标签可以互相拖拽。

因此，我们这次的目标就是实现在两个CollectionView中拖拽一个Cell。

我在[Github](https://github.com/guoshencheng/PaperLike)上已经粗糙的实现了一下，当然这个上面还包含了Paper的其他页面，但是我们这次只介绍关于如何实现在两个CollectionView中拖拽一个Cell的部分。

###### 先实现上周的效果
我们首先先实现上周介绍的，在单一的CollectionView中的拖拽，这次我们使用Objective-C来实现。</br>
首先我们要有一个Bundle来记录和被拖拽的Cell相关的属性。

```objc
@interface Bundle : NSObject
@property (assign, nonatomic) CGPoint offset;
@property (strong, nonatomic) UICollectionViewCell *sourceCell;
@property (strong, nonatomic) UIView *representationImageView;
@property (strong, nonatomic) NSIndexPath *currentIndexPath;
@end

```
定义Layout并命名为`RearrangeableCollectionViewFlowLayout`，大致代码为：

```objc
@property (assign, nonatomic) BOOL animating;
//@property (strong, nonatomic) NSIndexPath *currentIndexPath;
@property (assign, nonatomic) CGRect collectionViewFrameInCanvas;
@property (strong, nonatomic) NSMutableDictionary *hitTestRectagles;
@property (strong, nonatomic) UIView *canvas;
@property (strong, nonatomic) Bundle *bundle;
@property (strong, nonatomic) MoveItemData moveItemData;
```
和上周翻译的文章里介绍的不同的是，我们这里使用一个Block：

```objc
typedef void (^MoveItemData)(NSIndexPath *fromIndexPath, NSIndexPath *toIndexPath);
```
在Cell交换位置的时候进行数据的对换。

###### 实现文件
实现文件中，比那篇英文翻译中多了一个`hasAddLongPressGesture`变量，这个变量初始化为`NO`，当加上了手势之后变为`YES`。防止多次加手势导致内存的滥用。</br>

在`- (void)setup`中加入手势，初始化傀儡拖拽Cell的父View(`canvas`)。</br>
在`- (void)prepareLayout`中`setup`并计算两边的触发滚动区域。</br>
在`- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer`中判断是否在点击某个Cell并对Bundle初始化。</br>
在`- (void)handleGestureBegan:(UILongPressGestureRecognizer *)gesture`中隐藏原Cell并在`canvas`中加入傀儡cell。</br>
在`- (void)handleGestureChanged:(UILongPressGestureRecognizer *)gesture dragPointOnCanvas:(CGPoint)dragPointOnCanvas`中根据手势移动傀儡Cell。得到移动位置对应的Cell的indexPath，并和之前的IndexPath进行比较，进行必要的Cell位置对换。</br>
在`- (void)handleGestureEnded:(UILongPressGestureRecognizer *)gesture dragPointOnCanvas:(CGPoint)dragPointOnCanvas`中用动画返回cell对应的位置。

那么这样我们将这个Layout赋值个某个CollectionView的Layout的时候，这个CollectionView就能够实现长按移动Cell的功能了。

###### 进一步实现

解决完了上面的问题，那么问题接着来了，我们怎么能够实现两个CollectionView都因为一个Cell而动起来，并且这个Cell能够在两个CollectionView之间传递。

其实最好的办法还是能够把关于拖拽的东西写到另一个类中，这样这个拖拽的功能就和这个CollectionView的耦合度更低。然而我还是懒得想，就都放在了这个Layout中。

这样我们就有两个CollectionView：collectionview1和collectionview2。已经两个FlowLayout：layout1和layout2。我们可以想象，里那个歌Layout必须公用一些数据，也就是手势信息。当一个layout命令它对应的Cell做一些事情的时候，另一个layout也要做一些事情来响应这相同的手势，所以，我决定将手势的信息在两个layout之间传递。
当然，传递的方式有三种，1、直接通过方法调用并传递参数，2、使用Block的方法传递参数，3、使用Delegate的方法传递参数。
这里我们使用Block加方法调用的方式传递参数，当然delegate是完全可行的，这些只是脑子里灵光一现的事情~~爱用什么用什么。

###### Blocks

我们要使用这些Block：

```objc
typedef void (^FinishAnimationForCellMove)();
typedef void (^DeleteItemData)(NSIndexPath *indexPath);
typedef void (^AddItemData)(NSIndexPath *indexPath);
typedef void (^SendGestureBeganOut)(UILongPressGestureRecognizer *gesture);
typedef void (^SendGestureChangedOut)(UILongPressGestureRecognizer *gesture, CGPoint dragPointOnCanvas);
typedef void (^SendGestureEndedOut)(UILongPressGestureRecognizer *gesture, CGPoint dragPointOnCanvas);
typedef BOOL (^CheckIfBack)(CGPoint drag);
typedef void (^SendIfShouldBeganGesture)(Bundle *bundle);
typedef void (^SendIfShouldFlyToOthers)();
```

`FinishAnimationForCellMove`定义我们在最后动画结束之后应该移动Cell。
`DeleteItemData`定义当我们删除Cell之后应该删除数据。`AddItemData`定义当我们加入Cell之后应该添加数据,`SendGestureBeganOut`定义当手势要开始的时候的该干什么，要将手势传递出去，同理`SendGestureEndedOut`, `SendGestureChangedOut`都是定义手势发生变化的时候外面该干什么，`SendIfShouldBeganGesture`在手势开始缠身Bundle的时候将Bundle传出去共享部分信息，`CheckIfBack`通过最后手指的位置返回是否需要返回或是飞到另一个CollectionView上去，`SendIfShouldFlyToOthers`通知Cell做动画飞到另一个CollectionView上去。

###### Public Function

接下来就是一些对外的方法

```objc
- (void)publicHandleGestureBegan:(UILongPressGestureRecognizer *)gesture;
- (void)publicHandleGestureChanged:(UILongPressGestureRecognizer *)gesture dragPointOnCanvas:(CGPoint)dragPointOnCanvas;
- (void)publicHandleGestureEnded:(UILongPressGestureRecognizer *)gesture dragPointOnCanvas:(CGPoint)dragPointOnCanvas;
- (void)publicAnimationAddCell;
```

`- (void)publicHandleGestureBegan:(UILongPressGestureRecognizer *)gesture`当另一个Cell被手势产生`GestureBegan`的时候通过Block`SendGestureBeganOut`命令当前CollectionView做一些事情。
同理

```objc
- (void)publicHandleGestureChanged:(UILongPressGestureRecognizer *)gesture dragPointOnCanvas:(CGPoint)dragPointOnCanvas;
- (void)publicHandleGestureEnded:(UILongPressGestureRecognizer *)gesture dragPointOnCanvas:(CGPoint)dragPointOnCanvas;
```
的作用差不多</br>

`- (void)publicAnimationAddCell;`是当另一个CollectionView的Cell飞到当前CollectionView的时候的动画

大致的实现差不多就是这样。详细实现还是在[代码](https://github.com/guoshencheng/PaperLike)中。
