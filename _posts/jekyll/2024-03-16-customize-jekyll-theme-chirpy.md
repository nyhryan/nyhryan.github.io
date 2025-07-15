---
title: Chirpy 테마를 적용한 블로그의 스타일 커스터마이징
description: Jekyll Chirpy theme를 적용한 블로그의 스타일을 변경해봅시다.
categories: [Jekyll]
tags: [jekyll]
date: 2024-03-16 22:13 +0900
media_subpath: /assets/img/posts/jekyll/2024-03-16-customize-jekyll-theme-chirpy
---

이번 포스트에서는 Jekyll 테마 중 하나인 Chirpy 테마를 커스터마이징하는 방법에 대해 소개합니다.

설명에서는 [chirpy-starter](https://github.com/cotes2020/chirpy-starter)를 사용한다고 가정합니다.

## 📜 폰트 변경하기

### 1. 폰트 선택하기

Chirpy의 기본 폰트는 `Source Sans Pro`와 `Lato`(헤딩 폰트)로 구성되어있습니다.

한글 폰트로 바꾸기 위해서 우선 Google Fonts에서 원하는 폰트를 찾습니다.

```html
...
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
```
{: .nolineno}

저는 IBM Plex Sans KR를 선택하였습니다. Google Fonts에서 위와 같이 `<link>` 임베딩 태그를 제공하는 부분을 메모해둡니다.

### 2. 필요한 파일 준비

Chirpy Starter에서 폰트를 변경하기 위해서는 원본 Chirpy 테마 폴더로부터 파일을 복사해와야합니다.

```shell
☁  nyhryan.github.io [main] bundle info --path jekyll-theme-chirpy
/home/atai-wsl/gems/gems/jekyll-theme-chirpy-7.3.0
```
{: .nolineno}

위의 명령어를 통해서 Chirpy 테마가 설치된 폴더로의 경로를 알 수 있습니다. 해당 경로에서 `_data/origin/cors.yml`{: .filepath} 파일을 똑같이 복사해옵니다. `origin`{: .filepath} 폴더가 없다면 똑같이 만들어줍니다.

`_sass`{: .filepath} 폴더와 그 안에 있는 내용물도 똑같이 복사해옵니다.

### 3. 디폴트 설정 편집

```yml
# Web Fonts
webfonts: https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap
```
{: .nolineno file="_data/origin/cors.yml"}

`_data/origin/cors.yml`{: .filepath} 파일을 보면 Web Fonts를 지정하는 부분이 있습니다. 여기에 Google Fonts에서 찾은 폰트들의 임베딩 URL을 작성하면 됩니다.

```scss
// 디폴트 폰트
// $font-family-base: 'Source Sans Pro', 'Microsoft Yahei', sans-serif !default;
// $font-family-heading: Lato, 'Microsoft Yahei', sans-serif !default;

// 👉 새 폰트!
$font-family-base: 'IBM Plex Sans KR', 'Microsoft Yahei', sans-serif !default;
$font-family-heading: 'IBM Plex Sans KR', 'Microsoft Yahei', sans-serif !default;
```
{: .nolineno file="_sass/abstracts/_variables.scss"}

이후 `_sass/abstracts/_variables.scss`{: .filepath}에 기존 폰트를 변경해주면 됩니다.

### 코드 블럭의 고정폭 폰트 바꾸기

코드 블럭에 사용되는 고정폭 폰트도 변경할 수 있습니다.

고정폭 폰트도 Google Fonts에서 찾아서 `cors.yml`에 추가합니다.

```scss
/* Code block fonts */
.highlighter-rouge {
  font-family: 'JetBrains Mono', monospace;
  font-optical-sizing: auto;
}
```
{: file="assets/css/jekyll-theme-chirpy.scss" .nolineno}

`assets/css/jekyll-theme-chirpy.scss`{: .filepath} 파일에 `highlighter-rouge` class의 `font-family` 속성을 위에서 `cors.yml`에 추가한 폰트로 지정해주면 됩니다.

## 🎨 커스텀 CSS 적용하기

> 이하 내용은 현재 버젼의 Chirpy(2025/07/15 기준 `v7.3.0`)와 더 이상 호환되지 않는 내용입니다!!
{: .prompt-danger}

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
