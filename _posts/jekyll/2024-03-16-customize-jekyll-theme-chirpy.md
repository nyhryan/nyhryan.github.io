---
title: Chirpy 테마를 적용한 블로그의 스타일 커스터마이징
description: Jekyll Chirpy theme를 적용한 블로그의 스타일을 변경해봅시다.
categories: [Jekyll]
tags: [jekyll]
date: 2024-03-16 22:13 +0900
img_path: /assets/img/posts/jekyll/2024-03-16-customize-jekyll-theme-chirpy
---

## 📜 폰트 변경하기

```scss
/* fonts */

$font-family-base: 'Source Sans Pro', 'Microsoft Yahei', sans-serif !default;
$font-family-heading: Lato, 'Microsoft Yahei', sans-serif !default;
```
{: file="_sass/addon/variables.scss"}


jekyll-theme-chirpy 저장소의 [`_sass/addon/variables.scss`](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_sass/addon/variables.scss){: target="_blank"}을 보면 테마에 사용되는 SCSS 변수들이 있고, 잘 보면 폰트를 정의하는 변수도 있다.

`variables.scss`에 있는 변수들은 `variables-hook.scss`파일을 만들어 오버라이드할 수 있게 해준다. 과정은 아래와 같다.
> 참고: [Customizing Stylesheet](https://chirpy.cotes.page/posts/getting-started/#customizing-stylesheet)

1. jekyll-theme-chirpy 저장소나 패키지가 설치된 곳의 [`main.scss`](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_sass/main.scss){: target="_blank"}를 `_sass/`{: .filepath} 안에 둔다.
3. `_sass/`{: .filepath} 안에 `variables-hook.scss`의 파일을 만든다.
4. `variables-hook.scss` 파일에다가 `variables.scss`에 적혀있는 변수들을 마음대로 재정의하면 된다.

`variables-hook.scss`파일을 만들어 아래 두줄을 추가해주었다. 원하는 폰트를 구글 폰트로부터 찾아서 이름을 넣어주면 된다.

```scss
$font-family-base: 'IBM Plex Sans KR', 'Microsoft Yahei', sans-serif;
$font-family-heading: 'IBM Plex Sans KR', 'Microsoft Yahei', sans-serif;
```
{: file="_sass/variables-hook.scss"}

우선 블로그 전체의 폰트를 한글 폰트를 적용할 수 있게 IBM Plex Sans KR로 했다.

```html
<!-- ... -->

<link
  rel="stylesheet"
  href="{%raw%}{{ site.data.origin[type].webfonts | relative_url }}{%endraw%}"
/>  

<!-- ... -->
```
{: file="_includes/head.html"}

`_includes/head.html`을 보면 `href="{%raw%}{{ site.data.origin[type].webfonts | relative_url }}{%endraw%}"` 작성된 부분이 있다. 사이트 빌드 후 이 템플릿 부분에 구글 폰트 URL이 들어간다.

`_data/origin/`{: .filepath}의 `cors.yml` 파일을 아래와 같이 수정한다.

> 없다면 경로와 파일을 jekyll-theme-chirpy 패키지에서 있는 경로, 파일을 동일하게 해서 블로그 프로젝트 안에도 만들어 주면 된다.
> 
> 참고: [로컬에 설치된 jekyll-theme-chirpy Gem 패키지 찾기]({% post_url jekyll/2023-06-19-github-pages-with-jekyll-chirpy-theme %}#로컬에-설치된-jekyll-theme-chirpy-패키지-폴더-찾기){: target="_blank"}
{: .prompt-tip}

```yaml
# fonts
webfonts: https://fonts.googleapis.com/...
```
{: file="_data/origin/cors.yml"}

여기에 `webfonts:`에 대한 URL 값은 아래의 스크린샷을 참조하여 [Google Font](https://fonts.google.com/)로부터 링크를 가져오면 된다.

![font1](font1.png){: w="1000" h=""}
_원하는 폰트들을 담고 위의 장바구니 버튼을 누른다._

![font2](font2.png){: w="300" h=""}
_URL 링크를 복사해오면 된다._

### 코드 블럭의 고정폭 폰트 바꾸기

코드 블럭에 사용되는 고정폭 폰트도 변경할 수 있다.

우선 `cors.yml`의 `webfonts:`에 원하는 고정폭 폰트를 넣어준다. 위에서 구글 폰트에서 블로그 전체에 적용할 글꼴과 함께 장바구니에 담아서 URL을 한번에 가져와 넣으면 된다.

```scss
pre,
code {
  font-family: 'JetBrains Mono NL', monospace;
}
```
{: file="_sass/addon/syntax.scss"}

`_sass/addon/`{: .filepath}의 `syntax.scss`를 보면 `font-family`를 정의하는 부분이 있다. 이곳에 구글 폰트로부터 가져온 고정폭 글꼴의 이름을 넣어주면 된다.

## 🎨 커스텀 CSS 적용하기

Chirpy 테마의 CSS를 수정하는 방법에는 두가지가 있다.

1. 프로젝트 루트 폴더의 `assets/`{: .filepath}에다가 jekyll-theme-chirpy 저장소의 [`jekyll-theme-chirpy.scss` 파일](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/assets/css/jekyll-theme-chirpy.scss)을 가져다둔다. 이 파일에 아래에다가 원하는 CSS 속성을 덧붙여서 블로그를 커스터마이징 할 수 있다.
2. 혹은 [jekyll-theme-chirpy의 `_sass/`{: .filepath}](https://github.com/cotes2020/jekyll-theme-chirpy/tree/master/_sass)를 직접 커스터마이징 해도 된다. Chirpy Starter 방법의 블로그라면 블로그 프로젝트 루트에 `_sass/`{: .filepath}를 그대로 복사해와서 거기서 작업하면 된다.

블로그를 로컬에서 돌리면서 개발자 도구 창을 띄워 변경하고 싶은 부분을 확인하면서 SCSS 형식으로 작성하면 된다. SCSS 문법에 대해서는 [Sass Documentation](https://sass-lang.com/documentation/){: target="_blank"}을 참고하자. CSS 문법과 거의 다르지 않고 개선된 버젼이다.

> 이 블로그에 Catppuccin 테마의 색상을 적용한 예는 제 저장소의 [`_sass/`](https://github.com/nyhryan/nyhryan.github.io/tree/main/_sass){: target="_blank"}를 참고하세요.
{: .prompt-info}

### Syntax highlighting 색상 변경

코드 블럭의 Syntax highlighting 색상도 수동으로 변경할 수 있다. `_sass/colors/`{: .filepath}의 `syntax-dark.scss`를 보면 여러 스타일들이 정의되어 있는 것을 볼 수 있다. 이 파일을 토대로 나만의 색상으로 정의하면 된다.

```scss
  .highlight,
  .highlight .w {
    color: #d0d0d0;
    background-color: #151515;
  }

  .highlight .err {
    color: #151515;
    background-color: #ac4142;
  }

  .highlight .c,
  .highlight .ch,
  .highlight .cd,
  .highlight .cm,
  .highlight .cpf,
  .highlight .c1,
  .highlight .cs {
    color: #848484;
  }
```
{: file="_sass/colors/syntax-dark.scss"}

이런 식으로 정의되어 있는 것을 볼 수 있다. 코드의 토큰별로 원하는 CSS 속성을 추가한다. `.c, .w, .err` 처럼 토큰명은 [List of tokens](https://github.com/rouge-ruby/rouge/wiki/List-of-tokens)를 참고하자.토큰 리스트에 없는 CSS 클래스가 있다면... 감으로 때려 맞추자.

브라우저 개발자 도구를 띄워서 코드 블럭내의 코드와 해당 토큰의 클래스 이름을 비교하면서 수정하면 편리하다.

### CSS 변수에 SCSS 변수 값 할당 문제

CSS를 커스터마이징하다가, SCSS 타입으로 선언해둔 변수를 CSS 타입의 변수에다가 넣어서 사용해야하는데 잘 안되는 문제가 생겼다.

```scss
@mixin dark-scheme {
  --main-bg: rgb(27, 27, 30);
  
  // catppuccin palette에서 base 변수의 색상을 main-bg에 넣고 싶다...
  --main-bg: $base;
}
```

jekyll-theme-chirpy의 SCSS 파일들에는 위와 같이 CSS 타입의 변수에 값들을 저장해둔다.

내가 이 블로그에 [catppuccin palette](https://github.com/catppuccin/palette){: target="_blank"}의 색상을 적용하기 위해서는 catppuccin에서 제공하는 SCSS 타입의 색상 변수들을 가져다 써야했다. CSS 버젼의 palette도 있지만 변수명이 너무 길어서 SCSS 버젼을 택했다.

```scss
$my-color: #ABCDEF; // SCSS에서는 $로 변수를 선언

@mixin some-mixin {
  // --favorite-color: $my-color;   // Error!
  --favorite-color: #{ $my-color }; // OK!
}
```

해결법은 이렇다.

 `--변수명` 형태의 CSS 변수에 `$변수명` 형태의 SCSS 변수의 값을 할당하려면 `#{ $SCSS-변수명 }` 처럼 `#{}`의 중괄호 안에 변수를 넣는 [interpolation](https://sass-lang.com/documentation/interpolation/){: target="_blank"}이 필요하다.
