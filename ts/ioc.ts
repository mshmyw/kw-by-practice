/**
 * 目标：实现依赖注入（DI）
 * 控制反转 IOC
 * 假设业务方C ->依赖服务 B ->依赖服务A
 * 那么通常做法是：
 * C 先创建A，然后用A去创建B
 * 这样耦合度比较高
 * IOC的思想是通过中间层做到依赖解耦
 *   具体是：创建容器层D，然后分别将 A 和 B 注册进D
 * 最后，业务方直接使用D就好，不用再关心A和B
 * 这样后续A,B的改动尽可能少的影响到业务方C
 * C后续也可以方便的切换到其他的服务
 */
// 另外可参考：https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC%E5%92%8C%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5
// 文件存储服务
abstract  class StoreService {
  abstract addFile(file: File);
}

class MongoService extends StoreService {
  addFile(file: File) {
      console.log(`[Mongo] 通过mongo存储, ${file}`)
  }
}

class CloudService extends StoreService {
  addFile(file: File) {
    console.log(`[Cloud] 通过云服务器存储, ${file}`);
  }
}


// 该函数唯一作用就是让ts注入一些元数据，并通过getMetaData获取
function Injectable(target: any) {}
// img service
@Injectable
class ImgService {
  // 声明对service 依赖
  constructor(private storage: StoreService) {}
  uploadImg(img) {
    console.log(`[imgService] 图片各种处理`);
    this.storage.addFile(img);  // upload
  }
}

// img App
//注意依赖注入的作用就在于此，这里并未通过new创建imgService，
@Injectable
class App{
  // 声明对imgService 的依赖
  constructor(private imgService: ImgService) {}
  onUpload(img: File) {
    this.imgService.uploadImg(img);
  }
}

// ioc 容器核心实现
const container = {
  // 服务的provider
  providers: {
    [ImgService]: ImgService,
    [StoreService]: StoreService
    // 后续可方便替换为其他的存储服务
  },
  // 注入器
  inject(cls: Function) {
    const tokenTypes = Reflect.getMetaData(
      "design: paramtypes", cls
    );
    const params = tokenTypes
    ? // recursive 注入
    tokenTypes.map((tokenType) =>
    this.inject(this.providers[tokenType]))
    : [];
    return Reflect.construct(cls, params);
  }
};

// 通过ioc容器进行di依赖注入
const app = container.inject(App);
app.onUpload('[img]xxx');
// console.log 打印 [imgService]xx [Mongo] xx


/**
 * 另外可参考此例子理解
 * 运行：https://www.typescriptlang.org/play?target=99#code/C4TwDgpgBAwg9gOwM7AE4FcDGw6oDwAqUAvFAIYIgB8JUCEA7lABQB07ZqA5kgFzmUA2gF0AlCRoEA3ACgZmRCigBJBACsI2MgCMANtFLNR-GLrJIkAEU24yOVBKjBOXCMEcBvAL6z5Zi1AA8sAAFhCoAMrhAG4AlpjQHjJQ5LQAjLJecgACqhpaehBGfuZIUAQQKFGocQlQSSkKyGhY9sxg6HrxUKgQZAAmiLogUHCh4dW1EPzBYZEx8RDi3nIpwJXAALJuIXD9RvXJKVBNSHD6rLpwXMyhsUisY3OTi6xkorIpWVnyiu4AYmRsLgRoZnNw3PwKCBxMQaA0oAB6RFQQDtwYA15UAAkaASHNABc2gFNFQAhboBYc0AhUpHU7uMCoOBxfrhMqkABKEAAZvpsKxXFs3AM7GRmAByelIWJcBC8MCcMgAW1AkCQgoANE4XG4PkiUYJZhMFglhBTFOcIJdrswAETUuCQVDAWKVc0q5j0JhWukMwQABjEUFizQoCTgrKC43mNUWH0NzXI3EZUDdsXpqAeMrIYGY7Rp7tQJj+GGBqFhNBd8azifCRkjKV6wHQqAQdEYqohwDYHFjkZ8ckBBZAzAqVT1S1Y6xQ21CeyMUk1UDSQA
 */

type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => target => {};

class OtherService {
  a = 1;
}

@Injectable()
class TestService {
  constructor(public readonly otherService: OtherService) {}

  testMethod() {
    console.log(this.otherService.a);
  }
}

const Factory = (target: any) => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
  console.log("properties", (new providers[0]) instanceof OtherService);
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

Factory(TestService).testMethod(); // 1