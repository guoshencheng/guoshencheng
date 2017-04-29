<a style='color:#5f5ecb;font-size:40px;text-align:center
'>通过layout实现可拖拽自动排序的UICollectionView</a>
<div style='text-align:center;color:#b4b4b4'>2015年3月18日</div>
#####Translate from [http://blog.karmadust.com/drag-and-rearrange-uicollectionviews-through-layouts/](http://blog.karmadust.com/drag-and-rearrange-uicollectionviews-through-layouts/)</br>

--------------------------------------------------------
（[Github](https://github.com/mmick66/KDRearrangeableCollectionViewFlowLayout)上的代码 - 使用XCode6.3编译）</br>
我们将会在UICollectionView上添加很多功能。使得CollectionViewCell具备能够被拖拽并重新在上面找到新的位置的功能。

######为了实现这些需求，我们需要：

&emsp;&emsp;1.&nbsp;&nbsp;添加一些手势，在这个例子中，我们使用长按手势，这个手势能够很明显的辨别出用户想要拖拽哪个Cell</br>
&emsp;&emsp;2.&nbsp;&nbsp;设置一个引用这个CollectionView的对象，用于处理手势的代理(UIGestureDelegate)和拖拽的动作(Dragging Action)</br>
&emsp;&emsp;3.&nbsp;&nbsp;创建一个Cell的截图（是一个UIImageView），隐藏原始的那个Cell，这样我们就能够只操作它的截图。然后我们把这个截图田间驾到一个父View上，我们把这个View叫做canvas</br>
&emsp;&emsp;4.&nbsp;&nbsp;当我们拖拽经过另一个Cell的时候，我们应该先交换CollectionView的对应的两个数据源（如果你的CollectionView是数据驱动的，那这是非常重要的一点）并交换两个Cell的位置</br>
&emsp;&emsp;5.&nbsp;&nbsp;当用户放掉Cell的时候，我们从canvas上面移除这个截图，并且显示出原来的那个Cell

######设计
首先我们必须要做的决定是手势识别我们应该放在哪里。有很多的选择，这其实很随意，但是这次我们选择将这些放在UICollectionView的Layout类中。这使得为我们的代码耦合度更低，我们只需要将一个文件拖拽到工程中，简单的使用这个类的对象代替原本的CollectionView的Layout属性，就能够达到拖拽并重新排序的功能。

![image](http://46.101.33.206/wp-content/uploads/2015/03/d2.png)


我们创建`KDRearrangeableCollectionViewFlowLayout.swift`

```swift

class KDRearrangeableCollectionViewFlowLayout: UICollectionViewFlowLayout, UIGestureRecognizerDelegate {
 
   var canvas : UIView? {
        didSet {
            if canvas != nil {
                self.calculateBorders()
            }
        }
    }
 
    override init() {
        super.init()
        self.setup()
    }
 
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.setup()
    }
    
    func setup() {
        if let collectionView = self.collectionView {
            let gesture = UILongPressGestureRecognizer(target: self, 
                                            action: "handleGesture:")
            gesture.minimumPressDuration = 0.2
            gesture.delegate = self
            collectionView.addGestureRecognizer(gesture)
            
        }
    }
 
     override func prepareLayout() {
        super.prepareLayout()
        if self.canvas == nil {
            self.canvas = self.collectionView!.superview
        }
        self.calculateBorders()
    }
}
```

我们需要决定我们在哪里绘制这个移动的截图，如果这个View没有被明确地声明，我们就使用CollectionView的父View，这看起来是我们想要的。（这句实在翻译的不好）

当我们拖拽的时候，我们需要引用这个被拖拽的Cell的原Cell，它的截图，和从点击开始移动的距离。

![](http://46.101.33.206/wp-content/uploads/2015/04/D10.png)

同时我们应该追踪当前的Cell的位置，所以我们最好顶一个叫做Bundle的结构体来保存这些信息，并把它加入到Layout类中

```swift
struct Bundle {
    var offset : CGPoint = CGPointZero
    var sourceCell : UICollectionViewCell
    var representationImageView : UIView
    var currentIndexPath : NSIndexPath
    var canvas : UIView
}
var bundle : Bundle?
```
offset是cell原始位置到用户手指位置的距离，这记录了我们拖拽的距离，而不是截图的位置到手指的位置的距离</br>
`UIGestureRecognizerDelegate`定义了`gestureRecognizerShouldBegin`方法，让我们有机会能够在发现手势没有发生在Cell上的时候停止手势。我们遍历CollectionView中的所有的Cell，转换它们的frame到Canvas的坐标，并对这些坐标和我们的手势坐标经行碰撞检测。当我们发现我们所进行操作的Cell之后，我们初始化bundl的对象，是否初始化了这个对象将成为将来我们判断是否要对这次手势处理的标志。

```swift
func gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer) -> Bool {
        
        if let ca = self.canvas {
            
            if let cv = self.collectionView {
                
                let pointPressedInCanvas = gestureRecognizer.locationInView(ca)
                
                for cell in cv.visibleCells() as [UICollectionViewCell] {
                    
                    let cellInCanvasFrame = ca.convertRect(cell.frame, fromView: cv)
                    
                    if CGRectContainsPoint(cellInCanvasFrame, pointPressedInCanvas ) {
                        
                        let representationImage = cell.snapshotViewAfterScreenUpdates(true)
                        representationImage.frame = cellInCanvasFrame
                        
                        let offset = CGPointMake(pointPressedInCanvas.x - cellInCanvasFrame.origin.x, pointPressedInCanvas.y - cellInCanvasFrame.origin.y)
                        
                        let indexPath : NSIndexPath = cv.indexPathForCell(cell as UICollectionViewCell)!
                        
                        self.bundle = Bundle(offset: offset, sourceCell: cell, representationImageView:representationImage, currentIndexPath: indexPath)
                        
                        
                        break
                    }
                    
                }
                
            }
            
        }
        return (self.bundle != nil)
    }
```

######拖拽Cell
现在，又出现了新的问题。`UILongPressGestureRecognizer`有3个状态是我们该注意的，分别是`Began`, `Changed` 和 `Ended`，首先，我们隐藏拖拽的Cell，并将截图的View添加到Canvas上

```swift
if gesture.state == UIGestureRecognizerState.Began {                
     bundle.sourceCell.hidden = true
     bundle.canvas.addSubview(bundle.representationImageView)
}
```
当我们拖拽的时候我们需要更新截图的View的位置，获取我们手指位置当前的indexPath并检验是否是最后的一个Cell然后将结果存入Bundle中，如果indexPath变化了，我们需要交换两个Cell的位置

```swift
if gesture.state == UIGestureRecognizerState.Changed {
                
    // Update the representation image
    var imageViewFrame = bundle.representationImageView.frame
    var point = CGPointZero
    point.x = dragPointOnCanvas.x - bundle.offset.x
    point.y = dragPointOnCanvas.y - bundle.offset.y
    imageViewFrame.origin = point
    bundle.representationImageView.frame = imageViewFrame
 
    if let indexPath = self.collectionView?.indexPathForItemAtPoint(gesture.locationInView(self.collectionView)) {
                    
        self.checkForDraggingAtTheEdgeAndAnimatePaging(gesture)
        if indexPath.isEqual(bundle.currentIndexPath) == false {
 
            if let delegate = self.collectionView!.delegate as? KDRearrangeableCollectionViewDelegate {
                delegate.moveDataItem(bundle.currentIndexPath, toIndexPath: indexPath)
            }
                        
            self.collectionView!.moveItemAtIndexPath(bundle.currentIndexPath, toIndexPath: indexPath)
                        
            self.bundle!.currentIndexPath = indexPath
                        
        }          
    }            
}
```
在最后我们会将bundle的值更新，我们注意到我们有行代码`moveDataItem `能够交换cell对应的data，这个方法是可选的。为了实现这个，我们需要创建一个接口并在里面加入一个可以通过indexPath移动数据的方法

```swift
@objc protocol KDRearrangeableCollectionViewDelegate : UICollectionViewDelegate {
func moveDataItem(fromIndexPath : NSIndexPath, toIndexPath: NSIndexPath) -> Void
}
```

[项目](https://bitbucket.org/mmick66/kdrearrangeablecollectionviewflowlayout)中的Controller会像这么实现：

```swift
// MARK: - KDRearrangeableCollectionViewDelegate
func moveDataItem(fromIndexPath : NSIndexPath, toIndexPath: NSIndexPath) {
     let name = self.data[fromIndexPath.item]
     self.data.removeAtIndex(fromIndexPath.item)
     self.data.insert(name, atIndex: toIndexPath.item)   
}
```

最后，在`End`的时候我们需要移除截图的View并且显示出原始的Cell，我们检查是否实现了`delegate`并`reloadData`。

```swift
if gestureRecognizer.state == UIGestureRecognizerState.Ended {     
    bundle.sourceCell.hidden = false
    bundle.representationImageView.removeFromSuperview()
    if let delegate = self.collectionView?.delegate as? KDRearrangeableCollectionViewDelegate { 
        bundle.sourceCollectionView.reloadData()
    }         
    bundle = nil          
}
```
######页面移动
有些东西会消失，会随着页面移动。当我们拖拽到collectionView的边界的时候无论是横向还是竖向我们需要将页面滑动到下一页，我们需要定义一些“零界点”来触发翻页。

![](http://46.101.33.206/wp-content/uploads/2015/03/DragEdges.jpg)

我们定义了一个方法`checkForDraggingAtTheEdgeAndAnimatePaging`就像他的命名上写的一样，这个方法检验是否在边界并翻页，我们可以提前缓存4个零界区域，将他们保存在一个`Dictionary`中，就像这个[代码](https://bitbucket.org/mmick66/kdrearrangeablecollectionviewflowlayout)中一样。唯一值得提及的是我们如果要翻很多页。我们就要设置一个计时器并且每次都做检测。如果这个截图的图片还是在这块区域上面，我们就继续翻页。

```swift
if !CGRectEqualToRect(nextPageRect, self.collectionView!.bounds){ // animate
 
    let delayTime = dispatch_time(DISPATCH_TIME_NOW, Int64(0.8 * Double(NSEC_PER_SEC)))
    dispatch_after(delayTime, dispatch_get_main_queue(), {
        self.animating = false        
        self.handleGesture(gestureRecognizer)                    
     });
 
     self.animating = true
     self.collectionView!.scrollRectToVisible(nextPageRect, animated: true)
                
}
```
试一试吧！
更多关于`UICollectionView的`教程

- [Variable Height of a UICollectionViewCell Depending on Data](http://blog.karmadust.com/variable-height-of-a-uicollectionviewcell-depending-on-data/)
- [Centered Paging with Preview Cells on UICollectionView](http://blog.karmadust.com/centered-paging-with-preview-cells-on-uicollectionview/)
- [Drag and Drop between UICollectionViews](http://blog.karmadust.com/drag-and-drop-between-uicollectionviews/)
- [Let’s create a Calendar supporting EventKit using a UICollectionView!](http://blog.karmadust.com/lets-create-a-calendar-using-a-uicollectionview/)
- [Drag and Rearrange UICollectionViews through Layouts](http://blog.karmadust.com/drag-and-rearrange-uicollectionviews-through-layouts/)