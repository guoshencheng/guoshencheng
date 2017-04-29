###StackView
这两天有些心烦事，心情不是很好，也抬不起太大的兴趣来写代码。随便拿了个之前写的代码做个小小的讲解。
####Reason
最近可能要用到一个叠起来的View容器，但是似乎网上没有非常合适组件（也可能是我没有深挖），之前我的一位[同事](http://sherlockyao.com)做过一个这样的组件，但是没有发布出来，我看了一下实现的源代码，做了一些改动，并做成了组件，发布到了Pod上。
####做法
这个容器是我重新用View来写的，而且写的比较笨拙，如果有好的改动，欢迎fork我在[Github](https://github.com/guoshencheng/StackView)上面的代码，并提交pull request。</br>
不可否认的是，这肯定是可以通过自定义CollectionViewLayout来实现的，将来可能会带来用CollectionViewLayout来实现的代码，可能还会实现Swift版本，同样很欢迎大家来帮忙写一些代码并pull request上来。</br>
那我们来一起看一看代码:

```objc
/**
 * It's a property save cells and handle cell actions
 *
 */
@property (nonatomic, strong) StackViewDefaultPile *pile;

/**
 * The components datasource
 *
 */
@property (nonatomic, weak) id<StackViewDatasource> datasource;

/**
 * Reload data clear all cell and readd cells into component
 *
 */
- (void)reloadData;

/**
 * Get Cell with Reuseid
 *
 */
- (UIView *)dequeueReusableCellWithReuseIdentifier:(NSString *)identifier forIndex:(NSInteger)index;

/**
 * regist cell with nibname and id
 *
 */
- (void)registerCellWithNibName:(NSString *)nibName forCellReuseIdentifier:(NSString *)identifier;

```
######先看属性
- `@property (nonatomic, strong) StackViewDefaultPile *pile`定义了一个`StackViewDefaultPile`类型的属性，这边是我之前的写法，现在应该变了，这是一个管理组件内部View的堆，在之后的代码中，我抽离了`StackViewPile`的公共接口，定义了`BaseStackViewPie`，使用者可以自定义`StackViewPile`，只要和`StackViewDefaultPile`一样实现了`BaseStackViewPie`的接口就好了。</br>
- `@property (nonatomic, weak) id<StackViewDatasource> datasource;`定义了`StackViewComponent`的数据源，这和`UITableView`和`UICollectionView`一样。（还没有加上delegate）将来有空会加上。</br>

######方法（几乎按照标准的UITableView和UICollectionView来设计）
- `- (void)reloadData;`重新读取这个组件的数据，并且渲染。</br>
- `- (UIView *)dequeueReusableCellWithReuseIdentifier:(NSString *)identifier forIndex:(NSInteger)index;`用过重用的id获取注册的View的对象</br>
- `registerCellWithNibName:(NSString *)nibName forCellReuseIdentifier:(NSString *)identifier;`通过重用id和资源文件名注册View的对象

######`StackViewDatasource`
- `- (UIView *)stackView:(StackViewComponent *)stackView cellForIndex:(NSInteger)index`通过index返回一个当前的View的对象。
- `- (CGSize)stackViewCellSize:(StackViewComponent *)stackView`返回每个View的大小
- `- (NSInteger)stackViewNumberOfRow:(StackViewComponent *)stackView`返回总共View的个数

######实现文件
- `- (void)awakeFromNib`很惭愧，暂时只适用于从xib中加载这个组件。因此，初始化的操作几乎都放在了`- (void)awakeFromNib`中，在``- (void)awakeFromNib``中一共包含了两个步骤，分别是初始化一些内部属性，初始化Views（暂时只有加入手势）
- `- (void)setDatasource:(id<StackViewDatasource>)datasource `datasource发生改变的时候，我们需要`reloadData`
- `- (void)reloadData`分为两个步骤，将所有的View移除并重置pile，然后重新渲染所有的pile上的View
- `- (void)panGestureDidBegin:(UIPanGestureRecognizer *)gesture`当手势要开始的时候记录当前的位置
- `- (void)panGestureDidMove:(UIPanGestureRecognizer *)gesture`根据手势移动的位置调整pile
- `- (void)panGestureDidEnd:(UIPanGestureRecognizer *)gesture`在手势结束的时候判断并使用动画复原或者变化

######pile

```objc
@property (nonatomic, strong) NSArray *alphaArray;
@property (nonatomic, strong) NSArray *zTransformArray;
@property (nonatomic, assign) CGFloat rangeLength;
@property (nonatomic, strong) UIView *previousCell;
@property (nonatomic, strong) UIView *nextCell;
@property (nonatomic, assign) CATransform3D cellTransform;

- (void)reset;
- (void)recover;
- (void)pushNextCell;
- (void)pushPreviousCell;
- (UIView *)cellOfIndex:(NSInteger)index;
- (void)setCell:(UIView *)cell atIndex:(NSInteger)index;
- (UIView *)removeCellAtIndex:(NSInteger)index;
- (UIView *)bringPreviousCellToTop;
- (UIView *)bringNextCellToBottom;
- (NSInteger)maxSize;
- (void)resetCell:(UIView *)cell atIndex:(NSInteger)index;
- (void)updateCellWithOffset:(CGFloat)offset;
```

这些代码就不多做解释了，要想自定义Pile，只要像`StackViewDefaultPile`一样实现
`- (NSInteger)maxSize`, `- (void)reset`, `- (UIView *)cellOfIndex:(NSInteger)index`, `- (void)setCell:(UIView *)cell atIndex:(NSInteger)index`方法，并定义几个View，关于一些属性`alphaArray`,`zTransformArray`,`rangeLength`可以自己定义，产生更好地叠加效果


