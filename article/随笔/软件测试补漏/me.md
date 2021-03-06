### 一些写在前面的话

无论什么时候都该保有质疑的态度

在课件里躺了那么多年的例子：手机运算 10%+10%=0.11

被说成是软件缺陷——真的是这样吗？从智能手机到现在已经多少年了？计算器的算法提不上多难吧？为什么还会有缺陷？

最后发现：实际上这是一种语法糖：%只是一种计算符号：它一定会存在一个基准——那就是上一个输入的数。因此，10%+10%实际上就是：

10%+（10%）*10%=0.11

为了证实我还使用了电脑计算器，在没有输入其它值的情况下直接输入n%是会返回0的，而手机仍可以计算是因为基准值一开始就设为了一

总结：谨慎对待你电课程

### 等价类划分

#### 定义

它属于 **黑盒测试** 的一种用例测试方法。**采用等价类划分法时，完全不用考虑程序内部结构，设计测试用例的唯一依据是软件需求规格说明书。**

等价类又分为**有效等价类**和**无效等价类**。有效等价类代表对程序有效的输入，而无效等价类则是其他任何可能的输入（即不正确的输入值）。有效等价类和无效等价类都是使用等价类划分法设计用例时所必须的，因为**被测程序若是正确的，就应该既能接受有效的输入，也能接受无效输入的考验。**

