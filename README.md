# 프론트엔드 개발 환경의 이해 

"프론트엔드 개발 환경의 이해" 강의 자료입니다.

블로그 연재물 "[프론트엔드 개발 환경의 이해](http://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)"를 읽어보시기 바랍니다.

## 폴더 구성

- src: 프론트엔드 소스
- server: API 서버 코드 
- resource: 강의 진행에 필요한 리소스(이미지, 코드, 리액트 코드 )

## 브랜치 목록

강의 진행에 따라 적절한 브랜치로 이동합니다. 

- 1-webpack/1-entry: 웹팩 엔트리/아웃풋 실습
- 1-webpack/2-loader: 웹팩 로더 실습
- 1-webpack/3-plugin: 웹팩 플러그인 실습
- 2-babel/1-babel: 바벨 실습
- 3-lint/1-eslint: 린트 실습
- 3-lint/2-prettier: 프리티어 실습
- 4-webpack/1-dev-server: 웹팩 개발 서버 실습
- 4-webpack/2-hot: 웹팩 핫로딩 실습
- 4-webpack/3-optimazation: 웹팩 최적화 실습
- 
- master: 최종 결과물 

## 웹팩 플러그인 
플러그 인은 웹팩에서 알아야 할 마지막 기본 개념이다. 로더가 파일 단위로 처리한다면, 플러그인은 번들된 결과물을 처리한다. 다시말해 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용한다. 정의는 클래스로 정의된다. 

사용법은 아래와 같다. 

```javascript 
class MyWebpackPlugin {
  // apply 메소드를 통해서, compiler에 접근하는데, 완료시 해당 실행을 등록할 수 있다. 
  apply(compiler) {
    compiler.hooks.done.tap("My Plugin", stats => {
      console.log("MyPlugin: done")
    })
  }
}

module.exports = MyWebpackPlugin
```

파일을 생성했다면, webpack-config.json에 이를 등록해주어야 한다. loader가 modules 프로퍼티에 등록되었다면, 플러그인은 `plugins` 프로퍼티에 아래와 같이 등록된다. 

```javascript 
const MyWebpackPlugin = require('./my-webpack-plugin')

module.exports = {
  // ... 
  plugins : [
    new MyWebpackPlugin
  ]
};
```

이후 빌드 명령어를 실행하면 다음과 같은 결과를 화면에서 확인할 수 있다. 

```bash
  99% done plugins My PluginMyPlugin: done
  assets by status 8.3 KiB [cached] 1 asset
  asset main.js 51.4 KiB [emitted] (name: main)
  asset default-image.jpg?93d31be034558f18c8e4a0b770139074 12.9 KiB [compared for emit] [from: src/images/default-image.jpg] (auxiliary name: main)
  runtime modules 2.48 KiB 8 modules
```

### 커스텀 플러그인 만들기 

```javascript 
// 위에서 생성한 플러그인에, 아래의 코드를 실행하면, Cli 명령어 부분에서 에러가 발생한다. 
// 이는 저번이 맞지 않는 부분 때문이다. 
// 해결을 위해서 yarn add webpack@5 -D 버전으로 버전을 변경해주고, 
 compiler.plugin("emit", (compilation, callback) => {
      const source = compilation.assets["main.js"].source()
      console.log(source)
      callback()
    })

//compiler.plugin 명령어 대신 아래의 방법으로 코드를 작성해야 한다. 
 compiler.hooks.emit.tap("My Plugin", compilation => {
      const source = compilation.assets["main.js"].source();
      console.log(source);
    });

// 그러나 수업에서 명시적으로 npm install -D webpack@4 webpack-cli@3 을 사용하기에 유의하며 수강하도록하자.     
```

수업애서 하고 싶었던 것은 dist > main.js 의 번들에 일부 내용을 아래와 같이 추가하는 것이다. 
```javascript 
class MyPlugin {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();
      compilation.assets['main.js'].source = () => {
        const banner = [
          '/**',
          ' * 이것은 BannerPlugin이 처리한 결과입니다.',
          ' * Build Date: 2019-10-10',
          ' */'
          ''
        ].join('\n');
        return banner + '\n' + source;
      }

      callback();
    })
  }
}

// webpack@5 환경이라면 아래와 같이 명령이 변경된다. 

class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();
      const banner = [
                         '/**',
                         ' * This is result of processing by BannerPlugin.',
                         ' * Build Date: 2023-08-31',
                         ' */',
                     ].join('\n');
      const objectSourceNew = new compilation.compiler.webpack.sources.RawSource(banner + '\n\n' + source);
      compilation.updateAsset('main.js', objectSourceNew);
      callback();
  });
  }
}
module.exports = MyWebpackPlugin
```