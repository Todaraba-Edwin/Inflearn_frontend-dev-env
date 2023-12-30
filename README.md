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

## 1-webpack/2-loader
[jeonghwan-kim 블로그-Webpack-loader](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)

### 1. 로더의 역할 
웹팩은 모든 파일을 모듈로 바라보게 한다. 이 말은 JS로 만든 모듈 뿐만아니라 스타일시트, 이미지, 폰트까지도 전부 import 구문으로 JS 코드 안으로 가져올 수 있다는 것을 말한다. 이러한 기능이 가능한 이유는 웹팩의 로더 덕분이다. 로더를 통해서 `타입스크립트 같은 다른 언어를 자바스크립트`로 변환하거나. 이미지를 data URL 형식의 문자열로 변환하며, CSS 파일을 자바스크립트에서 직접 로딩할 수 있도록 한다. 

### 3. 커스텀 로더 생성하기 
로더의 용례를 살펴보면, 기존의 코드에 기록되어 있었던 console.log 라는 코드를 alert 으로 변경하는 것으로부터 방대하다. 

```javascript
// my-loader.js 를 루트경로에 생성
module.exports = function myloader(content) {
 return content.replace("console.log(", "alert(")
}

// webpack.config.js 에서 로더 돌리기
const path = require('path');

module.exports = {
 // ...
  module : {
    rules : [
      {
        test: /\.js$/, // .js 확장자로 끝나는 모든 파일
        use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
        }
    ]
  }
}
```

### 3. 자주사용되는 로더 4가지  
#### (1-2) : css-loader , style-loader
```javascript 
  import "./style.css"
```

JS 파일에서 css 파일을 호출하는 것도 로더의 역할 덕분이다. 이를 위해서 css 파일이 모듈로 변환되어야 하는데 그 역할을 위한 로더가 `css-loader`이다. 

```bash
yarn add css-loader -D
```

해당 패키지를 설치하고, 위에서 커스텀 로더를 등록한 것과 같이 해당 로더의 역할을 `webpack.config.js`에 등록해 주면 된다. 

```bash
{
  test: /\.css$/, 
  use: ["css-loader"], 
},
```

등록한 역할에 따라서, .css 로 끝나는 파일마다 해당 로더가 살행되며, css 파일을 모듈로 생성해 주는 것이다. 그 결과로, JS는 css를 모듈로 인식하여 호출할 수 있게 되는 것이다. 

호출은 했지만, 스타일을 적용하기 위해서는 추가적인 설정이 필요하다. `style-loader`를 설치해야 한다. 이는 브라우저의 돔이 모듈을 인식하지 못하기 때문이다. 즉 렌더링 과정에서 이뤄지는 CSS-OM 과정에서 모듈이 인식되지 않는 것이다. 해당 로더는 JS 코드를 이용하여 동적으로 스타일을 생성하고 이를 `<script>` 태그를 통해서 HTML 문서에 삽입하며, DOM에 주입하고, 브라우저는 이렇게 DOM에 적용된 스타일을 해석하여 페이지를 렌더링 하는 것이다. 

```bash
  yarn add style-loader -D
```

```javascript
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다
},
```

이때 기억할 것은 `use`에 등록되는 loader의 순서이다. loader는 배열의 뒷부분부터 실행하기에, 나중에 실행되어야 하는 style-loader가 먼저 선언되어야 한다. 

```html
<script>
  /*! 빌드 날짜: 2020. 1. 11. 오전 11:11:06 */
  .FormView {
    position: relative
  }
  
  .FormView input[type=text] {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 15px 0;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #ccc
  }
</script>
```

#### (3-4) : file-loader , url-loader
대표적으로 이미지 파일(png, jpg, svg)을 모듈화하여 JS에 호출하기 위해서는 `file-loader , url-loader` 같은 로더의 도움을 받아야 한다. 먼저 file-loader를 살펴보자. 

```css
body {
  background-image: url(bg.png);
}
```

```bash
yarn add file-loader -D
```

```javascript 
{
  test: /\.png$/,
  loader: "file-loader", 
},
```

해당 로더의 역할에 따라, 웹팩이 png 파일을 발견하게 되면 로더를 실행하며, 이미지 파일을 복사하고, 해당 파일을 해쉬코드로 변경하여 dist 파일에 생성한다. 이때 해쉬값으로 설정한 이유는 캐싱을 위한 처리이다. 그 결과 브라우저에서 해당 파일을 찾지 못하는 결과를 초래할 수 있는데, 이를 위해 로더에 옵션을 설정하여 제어할 수 있다. 

```javascript 
{
  test: /\.png$/, // .png 확장자로 마치는 모든 파일
  loader: "file-loader",
  options: {
    publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
    name: "[name].[ext]?[hash]", // 파일명 형식
  },
},
```

다음으로는 url-loader 로더이다. 해당로더는 브라우저에서 사용하는 이미지의 갯수가 많을 때 발생하는 성능저하 이슈를 제어하고자 작은 이미지들에 한해서 Data URL Scheme를 활용하고자 하는 것이 아이디어다. 이는 이미지를 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 형식이며 이를 도와주는 로더가 url-loader 인 것이다. 

```bash
yarn add url-loader -D
```

```javascript
{
  test: /\.png$/,
  use: {
    loader: 'url-loader', // url 로더를 설정한다
    options: {
      publicPath: './dist/', // file-loader와 동일
      name: '[name].[ext]?[hash]', // file-loader와 동일
      limit: 5000 // 5kb 미만 파일만 data url로 처리
    }
  }
}
```

url-loader 는 limit 옵션을 통해서 분기점을 생성할 수 있는데 해당 분기 이하로는 url-loader 가, 그 이상은 file-loader가 동작하도록 한다. 이는 아이콘처럼 용략이 작거나 사용빈도가 높은 이미지에 대해서 파일 그대로 사용하기 보다 인코딩하여 사용하는 것이 효율적이다. 

여기서 효율적이라는 것은 여러 의미가 있는데 (1) HTTP 요청수를 감소시킨다. 페이지의 각 리소스는 서버로의 HTTP 요청이 필요하지만, 해당 스키마는 이를 발생시키지 않기에, 로딩 시간을 단축시킨다. (2) 파일 자체를 전송하는 것보다 시간과 대역폭에서 유리하다. (3) 이미지 파일을 저장하고 관리하는데 필요한 오버헤드를 피할 수 있지만, 동시에 인라인의 번들 크기는 증가할 수 있다. 그러나 작은 이미지들이 많은 경우, 이를 통해 결과적으로 전체적인 성능 향상을 시도할 수 있다. (4) 이미지가 스키마로 번들에 포함되며, 캐싱이 되어, 로딩 속도를 향상시킬 수 있다. 그러나 용량이 큰 이미지를 이러한 방법으로 도입할 경우, Data URl이 비례하기에 초기로딩이 길어질 수 있다는 것을 함께 고려해야 한다. 


## 1-webpack/2-loader : 로더실습하기 
#### `TypeError: this.getOptions is not a function` 이슈발생
1. index.html : TODO: CSS 파일을 엔트리포인트(app.js)에서 로딩하세요. 웹팩에서 로딩할수 있도록 로더를 설정
2. ResultView.js : TODO: 파일을 로딩할수 있도록 웹팩 로더 설정(file-loader나 image-loader)      

- ` "webpack": "^4.41.5",` 강의용 저장소의 package.json 에 있는 웹팩 버전을 `webpack@5`으로 업로드해주면, 문제없이 loader가 동작하는 것을 볼 수 있다. 