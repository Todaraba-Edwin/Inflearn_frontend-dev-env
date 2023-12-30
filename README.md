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

## 강의내용
[프론트엔드 - NPM](#프론트엔드-개발환경의-이해--npm)</br>
[프론트엔드 - WEBPACK](#프론트엔드-개발환경의-이해--웹팩기본)</br>

<details>
<summary>프론트엔드 개발환경의 이해 : NPM</summary>

### [프론트엔드 개발환경의 이해 : NPM](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)
⭐️⭐️ jeonghwan-kim 님의 블로그를 요약 정리 했음을 밝힘<br/> 
⭐️⭐️ 링크는 상단의 타이들을 클릭하면 이동합니다. 

#### 1. Node.js 와 NPM
Node.js 라고 하면 백엔드를 구현하는 기술로 알려져 있다. 그러나 프론트엔드 개발자가 웹 어플리케이션 개발을 하다보면 개발 환경을 이해하고 구성하는 부분에 있어서 한계에 부딪히게 된다. 이때 Node.js 를 프론트엔드 개발자는 필요로하게 된다. 

(1) 최신 스펙으로 개발할 수 있다. <br/>
자바스크립트 스펙의 빠른 발전에 비해 `브라우저의 지원 속도는 항상 뒤쳐진다`. 편리한 스펙이 나오더라도, 이를 구현해주는 징검다리(바벨)의 도움이 없이는 부족하다.

(2) 빌드 자동화 <br/>
과거에는 코딩의 결과물을 브라우저에 바로 올리는 경우가 흔지 않았다. 파일 >> 압축 >> 코드의 난독화 >> 폴리필 추가 >> 배포. Node.js는 이러한 일련의 빌드 과정을 이해하는데 적지 않는 역할을 수행한다. 라이브러리들의 의존성을 해결하고, 각종 테스트를 자동화하는데 도움을 준다. 

(3) 개발환경 커스터마이징<br/>
각 프레임워크에서 제공하는 도구를 사용하면 손쉽게 개발환경을 갖출 수 있다. 대표적인 사례가 React.js의 `CRA; create-react-app`이다. 그러나 개발 프로젝트는 각자의 형편이라는 것이 있기에 해당 툴을 그대로 사용할 수 없는 경우들도 발생한다. 이때 커스터마이징을 하려면 Node.js 지식이 요구된다. 이러한 배경하에 Node.js는 프론트엔드 개발에서 필수 기술로 자리매김하고 있다. 

(4) Node.js 설치, NPM(Node Package Manage) & Yarn <br/>
Node.js를 설치하면, Node의 설치매니저인 NPM이 함께 설치된다. 이를 통해서 각종 서드파티 라이브러리들을 다운로드 받을 수 있다. NPM보다 빠른 설치매니저를 요한다면, `yarn`을 설치하여 진행할 수도 있다. 

    현재적시점에서 npm과 yarn은 둘다 발전하고 있으며 프로젝트에 따라 어떤 도구를 설정할 것인지는 사용자의 선호도 및 프로젝트의 특정 요구에 따라 다르다. 

    npm은 Node.js가 처음 소개되면서 등장하였다. 초기에 npm은 JS 프로젝트의 종속성을 관리하고 패키지를 설치하는 주요 도구로 자리잡았다. 

    yarn은 npm이 가진 몇가지 문제, 패키지 설치속도 및 의존성 관리로 인해 등장하였다. yarn 은 현 meta(facebook)에서 소개하며 등장하였다. yarn은 npm과 호환성을 유지하면서도 빠른 패키지 설치 및 보다 효과적인 의존성 해결을 제공하며, 오프라인 상태에서도 패키지 설치가 가능하도록 캐시를 지원하고, 보안 및 안정성을 강조하여 사용자들에게 새로운 선택지를 제공하였다. 

    npm(ver.5)은 패키지 잠금파일(package-lock.json)을 도입하여 의존성 버전을 더욱 정확하게 관리하는 방향으로 발전하며 나아가고 있다. 

- `종속성`(dependencies) : 프로그램에서 특정 프로그램이나 패키지가 동작할 때 필요한 외부 모듈이나 라이브러리를 가리킨다. 이는 프로그램이나 패키지를 구성하는데 필요한 다른 소프트웨어 요소들을 나타난다. 
- `의존성`(devDependencies) : 의존성은 하나의 소프트웨어 모듈이 다른 모듈의 기능을 이용하거나 다른 모듈과 협력하여 동작할 때 발생한다. 즉 한 모듈이 다른 모듈에 의존한다는 것은 다른 모듈의 기능, 인터페이스, 혹은 자원을 필요로 한다는 것을 뜻한다. 
- 사례 : `React` : 종속성에는 `styled-components`와 같이 스타일링을 돕는 라이브러리들이 해당된다. React 안에서 특정 부분이 이 라이브러리에 의존하고 있기 때문이다. 의존성에는 `typescript`, `eslint`, `prettier`와 같이 개발 및 빌드 프로세스에서 사용되는 도구들이 해당된다. 이러한 도구들은 개발 시간에만 필요하며, 프로덕션 환경에서는 직접적으로 애플리케이션의 기능에 영향을 미치지 않기 때문이다. 

```bash
# npm - 종속성 설치 
npm install package-name

# npm - 의존성 설치
npm install --save-dev package-name
npm install -D package-name

# yarn - 종속성 설치 
yarn add package-name

# yarn - 의존성 설치 
yarn add package-name -D
yarn add package-name --dev

# 또는 CDN을 통해서 직접 다운로드 할 수 있지만, 최신 버전을 관리하기 위해서는 위의 방법이 적합하다. 이는 구체적인 버전의 버전이 요구될 때 사용된다. 
```

(5) Package.json<br/>
`npm init`를 통해 프로젝트 초기설정을 할 수 있다. 패키지 이름, 버전 등 프로젝트와 관련환 정보들이 기록되는 파일을 생성한다. `npm init -y`는 질문들을 생략하고 package.json 파일을 생성한다. 

```json
{
  "name": "프로젝트 이름",
  "version": "1.0.0", // 프로젝트의 버전 정보 
  "description": "프로젝트 설명",
//   "main": "index.js", // 노드 어플리케이션일 경어 진입점 경로, 프론트엔드는 사용하지 않는다. 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }, // 프로젝트 명령어를 등록할 수 있으며, test는 샘플명령어이다. 
  "author": "프로그램 작성자", 
  "license": "ISC" // 라이센스 
}
```

(6) Package.json과 유의적 버전표시
```json
{
  "dependencies": {
    "react": "^16.12.0"
  }
}
```

설치한 패키지들의 버전을 관리하기 위한 규칙, 이를 `유의적 버전`(Sementic Version)이라고 한다. 
- Maior(주버전) : 기존 버전과 호환되지 않게 변경
- Minor(부버전) : 기존 버전과 호환되면서 기능이 추가된 경우
- patch(수버전) : 기존 버전과 호환되면서 버그를 수정한 경우 

```json
// 특정버전 
"react": "16.12.0"

// 부등호
"react": ">16.12.0" // 해당 버전보다 크면 허용
"react": ">=16.12.0" // 해당 버전이상 이면 허용
"react": "<16.12.0" // 해당 버전보다 작은 경우
"react": "<=16.12.0" // 해당 버전이하 이면 허용 

// 틸트(~)와 캐럿(^)
"react": "~16.12.0" // 해당 버전의 miror 버전 안에서 허용 16.12.a ~ 16.12.z
"react": "^16.12.0" // 해당 버전의 major 버전 안에서 허용 16.a.0 ~ 16.z.0
```

보통 라이브러리가 정식 릴리즈 되기 전에는 패키지 버전이 수시로 변한다. 이때 주버전이 변할 때 하위 호환성이 지켜지지 않는 경우가 빈번하다. 이러한 경우의 호환성을 위해서 유의적 버전이 활용된다. 
[목차로 이동하기](#강의내용)
</details>

<details>
<summary>프론트엔드 개발환경의 이해 : 웹팩(기본)</summary>

### [프론트엔드 개발환경의 이해 : 웹팩(기본)](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)

#### 1. Webpack 배경
문법 수준에서 모듈이 지원된 것은 ES2015(import && export)부터이다. ES2015 이전에 모듈을 구현하는 방식에는 `AMD`와 `CommnonJS`가 대표적이다. 그 가운데 CommonJS는 exports && require() 함수로 자바스크립트를 불러들인다. AMD는 `Asynchronous` 비동기로 로딩되는 브라우져의 환경에서의 자바스크립트를 불러들이는 방식이다. 

#### 2. 엔트리 & 아웃풋의 기본개념
웹팩은 여러개 JS 파일을 하나로 합쳐주는 번들러(Bundler)이다. 하나의 `사작점(entry)`로부터 의존적인 모듈을 전부 찾아내서 하나의 결과물을 만들어낸다. 

```bash
npm install -D webpack webpack-cli
yarn add webpack webpack-cli -D

# 설치가 마무리되면, node_modules/.bin 폴더안에 관련 패키지에 대한 폴더가 있다. 

node_modules/.bin/webpack --help
# 해당 명령어를 설치하면, 실행 가능한 명령어 목록을 확인 할 수 있다. 
# Usage: webpack [entries...] [options]
# Alternative usage to run commands: webpack [command] [options]

# The build tool for modern web applications.
# Options:
#   -c, --config <pathToConfigFile...>     Provide path to one or more webpack
#                                          configuration files to process, e.g.
#                                          "./webpack.config.js".
```

여기서 중요한 명령어는 `--mode`, `--entry`, `--output` 이다. 세 개 옵션을 사용하여 번들을 수행할 수 있다. 

- `--mode` : 웹팩 실행모드를 의미하는데, 개발 버전인 development를 지정
- `--entry` : 시작점 경로를 지정하는 옵션
- `--output` : 번들링 결과물을 위치할 경로

```bash
node_modules/.bin/webpack --mode development --entry ./src/app.js -o dist/main.js 
# 강의안과 다르게 명령어가 면경되었다. 
# -o, --output-path <value>              The output directory as **absolute path**
#                                          (required).

# 실행하면, 그 결과과 함께, 디렉토리 안에 main.js가 생성된 것을 확인할 수 있다. 
asset main.js 20.1 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 8.57 KiB
  modules by path ./src/views/*.js 4.78 KiB
    ./src/views/FormView.js 1.01 KiB [built] [code generated]
    ./src/views/ResultView.js 742 bytes [built] [code generated]
    ./src/views/TabView.js 759 bytes [built] [code generated]
    ./src/views/KeywordView.js 994 bytes [built] [code generated]
    ./src/views/HistoryView.js 884 bytes [built] [code generated]
    ./src/views/View.js 482 bytes [built] [code generated]
  modules by path ./src/models/*.js 1.37 KiB
    ./src/models/SearchModel.js 500 bytes [built] [code generated]
    ./src/models/KeywordModel.js 279 bytes [built] [code generated]
    ./src/models/HistoryModel.js 626 bytes [built] [code generated]
  ./src/app.js 145 bytes [built] [code generated]
  ./src/controllers/MainController.js 2.28 KiB [built] [code generated]
webpack 5.89.0 compiled successfully in 78 ms
```

이후, index.html에 번들된 결과를 기록하면 된다. 
```html
<script src="dist/main.js"></script>
```

#### 3. webpack.config.js
```bash
node_modules/.bin/webpack --help
# --config               Path to the config file
#                        [문자열] [기본: webpack.config.js or webpackfile.js]
```

webpack 명령어 가운데 `--config`는 웹팩 설정파일의 경로를 지정할 수 있으며 기본 파일명은 webpack.config.js 혹은 webpackfile.js이다. 프로젝트에 webpack.config.js 파일이 없다면, 직접 생성하여 해당 파일을 설정한 후 명령을 실행하면 된다.

```bash
# package.json 스크립트 명령어를 추가하고 실행해보자. 
# "build": "./node_modules/.bin/webpack"

yarn build                     
yarn run v1.22.21
$ ./node_modules/.bin/webpack
asset main.js 20.1 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 8.57 KiB
  modules by path ./src/views/*.js 4.78 KiB
    ./src/views/FormView.js 1.01 KiB [built] [code generated]
    ./src/views/ResultView.js 742 bytes [built] [code generated]
    ./src/views/TabView.js 759 bytes [built] [code generated]
    ./src/views/KeywordView.js 994 bytes [built] [code generated]
    ./src/views/HistoryView.js 884 bytes [built] [code generated]
    ./src/views/View.js 482 bytes [built] [code generated]
  modules by path ./src/models/*.js 1.37 KiB
    ./src/models/SearchModel.js 500 bytes [built] [code generated]
    ./src/models/KeywordModel.js 279 bytes [built] [code generated]
    ./src/models/HistoryModel.js 626 bytes [built] [code generated]
  ./src/app.js 145 bytes [built] [code generated]
  ./src/controllers/MainController.js 2.28 KiB [built] [code generated]
webpack 5.89.0 compiled successfully in 76 ms
✨  Done in 0.61s.
```

모든 옵션을 웹팩 설정 파일로 옮겼기 때문데 단순히 webpack 명령어만 실행하면 된다. 

---
### 1. 웹팩 : 앤트리와 아웃풋 실습
```bash 
# TODO: 웹팩으로 빌드한 자바스크립트를 여기에 로딩하세요
# branch : 1-webpack/1-entry
# 1) index.html 을 npm 환경으로 세팅해야 한다. 
```
[목차로 이동하기](#강의내용)
</details>