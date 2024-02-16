---
title: Jekyll과 Chirpy 테마를 통한 Github Pages 시작 
date: 2023-06-19 12:30 +0900
categories: [Jekyll]
tags: [jekyll]
img_path: /assets/img/posts/2023-06-19-github-pages-with-jekyll-chirpy-theme/
---

![Chirpy theme](chirpy.png){: w="250" h="250"}
_This is chirpy._

## 📝 먼저 읽어보고 따라하기
1. [Jekyll 설치](https://jekyllrb.com/docs/installation/){:target="_blank"}
2. [Chirpy 테마 설치 - Chirpy Starter 사용](https://chirpy.cotes.page/posts/getting-started/){:target="_blank"}
  - [jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)을 Fork해서 블로그를 시작하는 방법보다 Chirpy Starter를 사용하는 것이 더 빠르게 블로그를 시작할 수 있는 방법이라고 한다.
3. [jekyll-compose 추가](https://github.com/jekyll/jekyll-compose){:target="_blank"}
4. [구글 애널리틱스 4 + Chirpy 설정](https://aouledissa.com/posts/Jekyll-Google-Analytics-4-Integration-With-Chirpy-Theme/){:target="_blank"}
5. [Chirpy 테마에서 favicon 설정 방법](https://chirpy.cotes.page/posts/customize-the-favicon/){:target="_blank"}
5. [Chirpy 테마에서 포스트 작성 방법](https://chirpy.cotes.page/posts/write-a-new-post/){:target="_blank"}

## ⚡ 각종 명령
```console
$ bundle update jekyll-theme-chirpy
```

> 업데이트 방법 참고: [jekyll-theme-chirpy/wiki/Upgrade-Guide](https://github.com/cotes2020/jekyll-theme-chirpy/wiki/Upgrade-Guide)  

어느날 사용하다가 문제가 생긴 경우 `jekyll-theme-chirpy`를 업데이트해보자. 

---

```console
$ bundle exec jekyll s
```
깃허브에 push 하지 않고도 로컬(`http://127.0.0.1:4000/`)에서 브라우저를 통해 바로 블로그를 확인할 수 있게 해준다. 변경사항이 저장될 때마다 바로 반영된다.

---

```console
$ bundle exec jekyll compose "My New Post" --post
```
`yyyy-mm-dd-My-New-Post.md` 포스트를 `_posts/`{: .filepath}에 새로 생성한다. (위에서 추가한 `jekyll-compose`를 사용)

```console
$ bundle exec jekyll compose "My New Post" --collection "posts/_posts/내부의/서브디렉터리"
$ bundle exec jekyll compose "자료구조 - 그래프" --collection "posts/data-structure"
```
> 두번째 줄: `_posts/data-structure` 안에 *"자료구조 - 그래프"* 라는 제목의 게시글을 생성한다.

`_posts`{: .filepath} 폴더 내부에 카테고리 폴더를 만들어 게시글들을 정리한 경우에는 `--collection` 옵션을 주어 원하는 폴더 안에 게시글 문서를 바로 만들 수 있다.

## 🎨 SCSS 변수 오버라이딩하기
jekyll-theme-chirpy 저장소의 [파일(`_sass/addon/variables.scss`)](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_sass/addon/variables.scss)을 보면 테마에 사용되는 SCSS 변수들이 있다. 이를 내 마음대로 오버라이드 할 수 있다.

1. 현재 내 프로젝트의 루트 폴더에 `_sass/`{: .filepath} 폴더를 만든다. (Chirpy starter 방법으로 블로그를 시작했다면)
2. 위 저장소 링크의 [`main.scss`](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_sass/main.scss)를 다운로드하거나 내용물을 복붙하여 방금 만든 `_sass/`{: .filepath} 폴더 안에 `main.scss`파일을 둔다.
3. `_sass/`{: .filepath} 폴더 안에 `variables-hook.scss`의 파일을 만든다.
4. `variables-hook.scss` 파일에 `variables.scss`에 적혀있는 변수들을 마음대로 재정의하면 된다.

정의된 변수들 중에는 게시글의 폰트를 담당하는 변수가 있다. 이를 원하는 폰트로 재정의하여 폰트를 바꿀 수 있다.

```scss
$font-family-base: 'IBM Plex Sans KR', 'Microsoft Yahei', sans-serif;
$font-family-heading: 'IBM Plex Sans KR', 'Microsoft Yahei', sans-serif;
```
{: file="_sass/variables-hook.scss"}

우선 블로그 전체의 폰트를 한글 폰트를 적용할 수 있게 위처럼 한글 폰트로 재정의 했다. 여기서 끝이 아닌데...

```html
<!-- ... -->
{% raw %} {% include favicons.html %} {% if site.resources.ignore_env !=
  jekyll.environment and site.resources.self_hosted %}
  <link
    rel="stylesheet"
    href="{{ site.data.origin[type].webfonts | relative_url }}"
  />  
<!-- ... -->

<!-- ... -->
  <link
    rel="stylesheet"
    href="{{ site.data.origin[type].webfonts | relative_url }}"
  />
  {% endif %} {% endraw %}
<!-- ... -->
```
{: file="_includes/head.html"}

> Chirpy Starter 방식으로 시작했다면 아마도 `_includes/head.html`이 프로젝트 폴더가 아니라 Ruby가 Gem 패키지들을 받아둔 곳에 있을 것이다. `bundle info --path jekyll-theme-chirpy` 명령어로 내 컴퓨터 어디에 다운받아놨는지 확인할 수 있다.
>
> 없다면 [jekyll-theme-chirpy 저장소](https://github.com/cotes2020/jekyll-theme-chirpy/tree/master/_includes)나 위의 패키지 다운로드 디렉터리에서 `_includes/head.html`을 스윽 가져오자.
{: .prompt-tip}

`_includes/head.html`을 보면 `href="{%raw%}{{ site.data.origin[type].webfonts | relative_url }}{%endraw%}"` 작성된 부분이 있다. 이 부분에 나중에 사이트를 렌더링하면 사용될 구글 폰트 URL이 들어간다.

[jekyll-theme-chirpy저장소의 `cors.yml`](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_data/origin/cors.yml)파일을 보면 기존 폰트인 Source Sans Pro를 불러오는 부분이 있다. 이 링크를 교체해주면 된다.

(Chirpy Starter 방식으로 시작했다면) 프로젝트 루트에서 `_data/`{: .filepath} 아래에 `origin/`{: .filepath} 폴더를 새로 만들고, 거기에 `cors.yml` 파일을 새로 만든다.

```yaml
# fonts
webfonts: https://fonts.googleapis.com/...
```
{: file="_data/origin/cors.yml"}

여기에 `webfonts:`에 대한 URL 값은 아래의 스크린샷을 참조하여 [Google Font](https://fonts.google.com/)로부터 링크를 가져오면 된다.

![font1](font1.png){: w="1231" h="798"}
_원하는 폰트들을 담고 위의 장바구니 버튼을 누른다._

![font2](font2.png){: w="382" h="824"}
_아래의 `href` 링크를 복사해오면 된다._


## 🎨 커스텀 CSS 작성하기

```scss
---
---

@import 'main';

/* append your custom style below */
```
{: file="assets/css/jekyll-theme-chirpy.scss"}

1. 프로젝트 루트 폴더의 `assets/`{: .filepath}에다가 jekyll-theme-chirpy 저장소의 [`jekyll-theme-chirpy.scss` 파일](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/assets/css/jekyll-theme-chirpy.scss)을 가져다둔다. 이 파일에 아래에다가 원하는 CSS 속성을 덧붙여서 블로그를 커스터마이징 할 수 있다.
2. 혹은 [jekyll-theme-chirpy 저장소의 `_sass/`{: .filepath}](https://github.com/cotes2020/jekyll-theme-chirpy/tree/master/_sass)나 jekyll-theme-chirpy Gem 패키지가 다운로드 된 폴더에서 가져와서 `_sass/`{: .filepath} 아래에 두어 직접 커스터마이징 해도 된다.

> ```html
> <!-- ... -->
> {%raw%}
> <link rel="stylesheet" href="{{ '/assets/css/:THEME.css' | replace: ':THEME', site.theme | relative_url }}">
> {%endraw%}
> <!-- ... -->
> ```
> {: file="_includes/head.html"}
> 
> 필자는 구버젼의 `_includes/head.html`을 쓰고있었어서 위의 템플릿 부분에 `/assets/css/style.css`가 들어가게 되어있었다. 지금(2023-12-26 기준)은 위처럼 수정되었으므로, `assets/jekyll-theme-chirpy.scss`의 이름으로 커스텀 CSS 속성을 두면 된다.

블로그를 로컬에서 돌리면서 개발자 도구 창을 띄워 변경하고 싶은 부분을 확인하면서 `jekyll-theme-chirpy.scss` 에다가 SCSS 형식으로 달아주면 된다. SCSS 문법에 대해서는 [Sass Documentation](https://sass-lang.com/documentation/)을 참고하자. CSS 문법과 거의 다르지 않고 개선된 버젼이다.

### CSS 변수에 SCSS 변수 값 할당하기
```scss
$my-color: #ABCDEF;

@mixin some-mixin {
  --favorite-color: #{ $my-color };

  .some-class {
    background-color: var(--favorite-color);
  }
}
```

`_sass/`{: .filepath}의 파일들을 커스터마이징하다가 알게 된 사실인데, `--변수명` 형태의 CSS 변수에 `$변수명` 형태의 SCSS 변수의 값을 넣으려면 `#{ $SCSS-변수명 }` 처럼 `#{}`의 중괄호 안에 변수를 넣는 interpolation이 필요하다.


## 🖼&#xFE0F; 포스트에 이미지 넣는 방법
```
.
└── 📂assets/
    └── 📂img/
        └── 📂posts/
            ├── 📂포스트1/
            │   ├── 🎨 image1.png
            │   ├── 🎨 image2.png
            │   └── ...
            ├── 📂포스트2/
            │   ├── 🎨 image3.png
            │   └── ...
            └── ...
```
`assets/img/`{: .filepath} 폴더에 `posts/`{: .filepath} 폴더를 새로 만들어준다. 이후 현재 작성하는 포스트의 폴더를 새로 하나 만들어 그 안에 사용할 이미지들을 불러오면 된다. 

```yaml
---
img_path : /assets/img/posts/새로-만든-포스트-폴더
---
```
{: file="_posts/작성할-포스트.md"}
현재 작성중인 포스트에서 이미지를 편하게 넣기위해, 현재 포스트 상단 frontmatter에 `img_path`를 추가해준다.

```md
![image1](image1.png){: w="300" h="300"}
_이미지 캡션_
```

이후 이미지를 삽입할 때 전체 경로를 생략하고 `assets/img/posts/포스트-이름`{: .filepath} 내에 있는 이미지 이름만 `( )`안에 넣어주면 문제없이 삽입된다. 추가적으로 `{: w="너비 px" h="높이 px"}`를 달아줘서 이미지의 크기도 지정해준다. 추가적인 서식은 [여기](https://chirpy.cotes.page/posts/write-a-new-post/#images){:target="_blank"}를 참고하자. 

## 😀&#xFE0F; 포스트에 이모지 넣기
[Variation Selectors](https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block))를 사용해서 이모지 문자가 Symbol 폰트로 뜨는 것을 막거나 강제할 수 있다. 이모지 뒤에 **띄어쓰기 없이** `&#xFE0F;`(이모지 강제) `&#xFE0E;` (심볼, 텍스트 형태 강제)를 바로 붙여쓰면 된다.

```markdown
Force Emoji : ❤&#xFE0F; 
Force Symbol:  ❤&#xFE0E; 
```
> ❤&#xFE0F;(이모지) vs ❤&#xFE0E;(심볼)

이렇게 강제할 수 있다. Jekyll이 `.markdown` 문서를 `.html`형태로 변환하기 때문에 쓸 수 있다.

## 🚩 포스트에 prompt (callout) 넣기

> 정보글입니다.
{: .prompt-info}

```md
> 정보글입니다.
{: .prompt-info}
```
위와 같이 블록인용 아래에 `{: .prompt-info / tip / warning / danger}` 4가지 종류의 prompt를 삽입할 수 있다.