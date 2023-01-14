# ts react 计算器
```
// example
https://github.com/xieguanglei/calculator-app
```
## 核心类设计实现
- 操作
  - 按下按钮
    - 实时显示结果

- 接口设计
  - Calculator#press
  - Calculator#on
```
const calculator = new Calculator()
calculator.on("change", (value)=>{console.log('value ', value)})
calculator.press('1') // => 1
calculator.press('2') // => 2
calculator.press('3') // => 3
```
## 状态设计
- 按键分类：数字、单目运算符、双目运算符、小数点、清除键、等于键
```
type KeyNumber = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';
type KeyOpBinary = '+'|'-'|'*'|'/'
type KeyOpUnary = '%'|'+/-'
export type Key = KeyNumber|KeyOpUnary|KeyOpBinary|'.'|'C'|'='
```
- 三种可能的状态：[string]/[string,OpBinary]/[string,OpBinary,string]
```
1 初始态 :['0']
2 按下'1':['1']
3 按下'.':['1.']
4 按下'2':['1.2']

5 按下'*': ['1.2', '*']
6 按下'+':['1.2','+']
7 按下'2':['1.2','+','2']
8 按下'-':['3.2','-']

9 按下'3':['3.2','-','3']
10 按下'C':['0']
```

