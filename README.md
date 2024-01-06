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

### 자주 사용하는 플러그인 
1. BannerPlugin

첫번째는 webpack에서 기본적으로 제공하는 BannerPlugin으로, 설정은 `webpack.config.js`에서 webpack 모듈을 불러오고 해당 내용을 플러그인 하위에 new 키워드를 통해 새로운 인스턴스를 생성하면 된다. 이렇게 설정한 후 `build`를 실행하면 빌드된 파일의 상단에 추가한 내용이 들어 있는 것을 확인해 볼 수 있다. 

```javascript 
// webpack.config.js
const webpack = require('webpack')

module.exports = {
  plugins : [
    new webpack.BannerPlugin({
      banner: '이것은 배너입니다.'
    })
  ]
};

// ⬇⬇⬇ dist/main.js
/*! 이것은 배너입니다. */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
```

이를 통해서 빌드한 날짜, 또는 커밋 버전을 명시하곤 하는데, git이 설치되어 있다면, 다음과 같은 명령어로 해당 버전의 id를 찾아낼 수 있다. 

```bash
 git rev-parse --short HEAD # ex) 27b1db6
```

그렇다면 플러그인을 통해서 위의 명령어를 실행시켜고, 해당 결과를 main.js에 추가해보자. 

```javascript 
const childProcess = require('child_process') // Node에서 제공하는 터미널 실행명령을 담은 모듈을 호출

module.exports = {
   plugins : [
    new webpack.BannerPlugin({
      banner: `
        Build Data: ${new Date().toLocaleDateString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.email')}
      `
    })
  ]
};

/*
  빌드시간, 커밋버전, 작성자등의 정보를 빌드파일에 담을 수 있다. 
*/ 
```

2. DefinePlugin

보통의 개발은 `운영환경`과 `개발환경`으로 각각 개발이 진행된다. 이렇게 될 때 환경에 따라 API 서버 주소가 다를 것이다. 이러한 환경 의존적인 정보를 소스가 아닌 곳에서 관리하는 것이 좋다. 배포할 때마타 코드를 수정하는 것은 곤란하기 때문이다. 이러한 기능을 웹팩은 DefinePlugin에서 제공한다. 

사용에 있어서 그 용도는 env와 유사하다. DefinePlugin과 .env 파일 모두 환경 변수를 다루는 도구로 사용되기 때문이다. 그러나 사용목적과 상황에 따라 다르게 적용될 수 있음을 기억해야 한다. 

    .env
    보통 환경에 따라 변경되는 설정 값들을 저장하는데 사용된다. React앱에서는 `REACT_APP`으로 시작하는 변수들이 선언된다. 

    DefinePlugin
    웹팩의 플러그인으로, 빌드 시에 코드 내에서 정적인 값들을 대체하는 데 사용된다. 예를 들어 개발과 프로덕션 환경에서의 로깅 수준을 다르게 하고자 할 때 사용된다. 

  ```javascript
    plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      LOGGING_LEVEL: process.env.NODE_ENV === 'production' ? '"info"' : '"debug"',
    }),
    ],
  ```

  이러한 로깅설정을 통해서 개발 환경시에 더 많은 로그를 확인할 수 있으며, 프로덕션 환경에서는 불필요한 디버스 정보가 제거되어 가볍게 배포되도록 설정할 수 있다.

3. HtmlWebpackPlugin
서드파티 플러그인이기에 설치가 필요하다. 해당 기능은 아래의 예제를 보면 간단하다. 

```bash
yarn add html-webpack-plugin -D
```

```html
  <head>
    <script defer src="main.js"></script>
  </head>
```

이전까지는 웹팩으로 생성한 아웃풋을 수기로 기록했어야 했다. HtmlWebpackPlugin는 빌드시에 해당 코드를 포함한 html 파일이 아웃풋에 만들어지도록 설정하는 플러그인이다. 

```javascript 
const HtmlWebpackPlugin = require('html-webpack-plugin')
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html'
  })
  ],
```

응용으로는 EJS 문법을 활용하는 사례이다. `html-head-title`에 동적으로 문구를 생성하는 사례이다. 

```html
<head>
    <title>검색, <%= env %></title>
  </head>
```

```javascript
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html',
     templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      }
  })
  ],
```
```bash
NODE_ENV=development yarn build
```

이와 같이 실행하면, 아래와 같이 웹팩 플러그인에 따라서, dist 폴더에 해당 빌드 환경의 정보가 포함되는 것을 확인할 수 있다. 

```html
 <head>
    <title>검색, (개발용)</title>
    <script defer src="main.js"></script>
  </head>
```

뿐만 아니라 해당 플러그인은 개발환경(dev)과 다른 운영환경(prod)을 위해 파일을 압축하고 불필요한 주석을 제거하는 기능도 제공한다. 

```javascript 
plugins : [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      // minify: {
      //   collapseWhitespace: true, // 빈칸을 제거
      //   removeComments: true // 주석을 제거 
      // }
      // 일반적으로 운영설정 시에 주석을 제거하고, 개발환경에서는 빈칸을 남겨놓는 용도로 많이 활용된다. 
       minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true, // 빈칸을 제거
        removeComments: true // 주석을 제거 
      } : false
    })
  ]
```

4. CleanWebpackPlugin
해당 플러그인도 서드파티 플러그인이기에 설치를 해야 한다. 빌드 결과물은 아웃풋 경로에 모이는데 과거 파일이 남아 있을 수 있기에, 빌드시 기존의 dist 파일의 내용을 제거해주는 플러그인이다. 

```bash
yarn add clean-webpack-plugin -D
```
```javascript 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

plugins: [
    new CleanWebpackPlugin()
  ],
```

해당 플러그인은 default 로 선언되어 있지 않기에, {중괄호}를 통해서 모듈을 가져와야 하며, 해당 인스턴스느 함수이기에, 즉시실행을 시켜준다. 그려면 dist 폴더의 덮어씌어지지 않는 파일들이 제거되는 것을 확인 할 수 있다. 

5. MiniCssExtractPlugin
스타일시트가 많아지면, 번들링하는 것이 부담이 될 수 있다. 번들 결과에서 스타일시트만 뽑아서 별도의 css 파일로 만들어 역할에 따라 파일을 분리하는 것이 유리하다. 브라우져에서 큰 파일 하나를 내려받는 것보다 여러 개의 작은 파일을 동시에 다운로드 하는 것이 빠르기 때문이다. 이 역시도 개발환경에서는 상관없지만, 운영환경에서는 분리하는 방향이 효율적일 것이다. 

```bash
yarn add mini-css-extract-plugin -D
```

```javascript 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 
          "style-loader", 
          "css-loader"
        ]
      },
    ]
  },
  plugins : [
    // production 운영환경에서만 동작하도록 인스턴스를 제어할 수 있다. 
    ...(process.env.NODE_ENV === 'production' ? [
      new MiniCssExtractPlugin(
        {
          filename: '[name].css'
        }
      )
    ] : [])
  ]
}
```

이와 같이 플러그인을 설정한 다음에는, 이전의 플러그인과 다르게 로더를 설정해줘야 한다. 이를 통해서 운영환경에서 해당 과정이 동작하도록 하여, 번들링을 분활하고 보다 개선된 환경을 사용자에게 제공할 수 있게 된 것이다. 해당 결과는 main.js 하나 main.css 하나가 분리되어 dist 폴더에 생성되는 것을 확인할 수 있다. 