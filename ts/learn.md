# 字符串模版类型
exp:
foo.on("nameChanged", () => {});
类型：
```
type Listenable<T> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};
declare function watch<T>(obj: T): T & Listenable<T>;
```
# 函数重载
interface User{
  name: string;
}
// 重载
function saveUser(user: User): User;
function saveUser(id: number, idChecker: () => boolean): User;
// 实现 (上述重载的作用就是使得函数实现的时候，第一个和第二个参数实现强依赖，当只传id不传idcheck会报错)
function saveUser(userOrId: User | number, idChecker: () => boolean): User {

};

# 接口
可以描述结构，也可以约束类的实现（implements)
已经声明的接口可在其他地方再次声明（扩展性，开放性），不过还是更推荐用extends扩展
type 只是类型的别名，而interface是描述的是一种结构的类型
# 泛型
定义的时候不指定类型，使用的时候才具象化到具体类型
interface Foo {name: string;}
interface Foo<T> {name: T}
or type Foo<T> {name: T;}

exp:
function logKeyValueObj<K,V>(key: K, value: V) {
  cnosole.log({
    [key]: value
  })
}
logKeyValueObj<string, boolean>('male', true);

// sum<T> // error must: sum<T extends number>
function sum<T extends number>(value: T[]): number{
  let count = 0;
  value.forEach(v => count+=v); // pass
  return count;
}

extends : 泛型条件 a extends b 表示 a 是b的子集 （可作为三元运算符使用）

阻断分配行为: 中括号
type Result<T> = [T] extends ['x'] ? string: number;
type C = Result<'x'|'y'> // 得到结果为 number
注意:
extends 作为条件类型时，只支持在type中使用

泛型推断 infer
type GetIdType<T> = T extends{name: infer N} ? N : never;
type B = GetIdType<{name: boolean}> // boolean 因为泛型参数匹配上了。

泛型与递归
type Recur<T> {
  readonly [key in keyof T]: Recur<T[key]>;
}
# 装饰器
装饰器就是一种包装，将核心内容和可插拔部分分离
它就是个语法糖，本质还是一个普通函数
调用顺序： 类的非静态成员、静态成员，类本身的装饰器

# 反射
更多学习资源： https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E5%9F%BA%E7%A1%80

动态操作自身内容的一种技术
Reflect.getMetadata 可获取 design:paramtypes 等信息

```
@Reflect.metadata("name", "A")
class A {
  @Reflect.metadata('hello', 'world')
  public nullo(): string {
    return 'hello world';
  }
}

@Reflect.getMetadata('name', A) // A
@Reflect.getMetadata('hello', new A()) // world
```

进一步学习：github
https://github.com/type-challenges/type-challenges