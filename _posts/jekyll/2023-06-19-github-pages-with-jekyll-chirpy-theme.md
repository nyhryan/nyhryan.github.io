---
title: Jekyll과 Chirpy 테마를 통한 Github Pages 시작
description: GitHub Page와 Jekyll로 개인 블로그를 만들어 봅시다.
date: 2023-06-19 12:30 +0900
categories: [Jekyll]
tags: [jekyll]
media_subpath: /assets/img/posts/jekyll/2023-06-19-github-pages-with-jekyll-chirpy-theme/
---

![Chirpy theme](chirpy.png){: w="250" h="250"}
_This is chirpy._

## 📝 먼저 읽어보고 따라하기

1. [Jekyll 설치](https://jekyllrb.com/docs/installation/){:target="_blank"}
2. [Chirpy 테마 설치 - Chirpy Starter 사용](https://chirpy.cotes.page/posts/getting-started/){:target="_blank"}
  - [jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)을 Fork해서 블로그를 시작하는 방법보다 Chirpy Starter를 사용하는 것이 더 빠르게 블로그를 시작할 수 있는 방법이라고 한다.
3. [jekyll-compose 추가](https://github.com/jekyll/jekyll-compose){:target="_blank"}
4. [Chirpy 테마에서 favicon 설정 방법](https://chirpy.cotes.page/posts/customize-the-favicon/){:target="_blank"}
5. [Chirpy 테마에서 포스트 작성 방법](https://chirpy.cotes.page/posts/write-a-new-post/){:target="_blank"}

## ⚡ 각종 명령

### `jekyll-theme-chirpy` 패키지 업데이트

```console
$ bundle update jekyll-theme-chirpy
```

> 업데이트 방법 참고: [jekyll-theme-chirpy/wiki/Upgrade-Guide](https://github.com/cotes2020/jekyll-theme-chirpy/wiki/Upgrade-Guide)  

어느날 사용하다가 문제가 생긴 경우 `jekyll-theme-chirpy`를 업데이트해보자.

### 로컬에 설치된 `jekyll-theme-chirpy` 패키지 폴더 찾기

```console
$ bundle info --path jekyll-theme-chirpy
H:/Dev/Ruby31-x64/lib/ruby/gems/3.1.0/gems/jekyll-theme-chirpy-6.5.0
```

Chirpy Starter 방식으로 블로그를 만들었다면 `jekyll-theme-chirpy` Gem 패키지는 다른 곳에 설치된다. 설치 경로는 위의 커맨드로 확인할 수 있다.

![copy_files](copy_files.png){: w="500"}

Chirpy Starter 방식의 블로그에다가 `jekyll-theme-chirpy` Gem 패키지 폴더 내의 파일을 복사해오면, 해당 파일들은 원본 Gem 페키지에 있는 파일들을 오버라이드하게 된다. 즉 내 마음대로 블로그를 커스터마이징하고 싶다면 원본 Gem 패키지로부터 파일을 복사해와서 수정해서 쓰면 된다.

위 이미지는 `jekyll-theme-chirpy-6.5.0/data/locales/`{: .filepath}로부터 블로그의 로케일 설정 파일을 복사해와서 쓰는 예시이다. Chirpy Starter으로 시작할 때 `{현제-블로그-루트}/data/locales`{: .filepath}라는 디렉터리가 없기 때문에 파일을 복사해 올 때 *경로와 파일명을 원본 Gem 패키지에서와 동일하게* 해서 진행하면 된다.

### 로컬에서 블로그 보기

```console
$ bundle exec jekyll s
```

블로그를 온라인에 배포하지 않고도 로컬(`http://127.0.0.1:4000/`)에서 브라우저를 통해 바로 블로그를 확인할 수 있게 해준다. 변경사항이 저장될 때마다 바로 반영된다.

### `jekyll-compose`로 쉽게 새 글 작성

```console
$ bundle exec jekyll compose "My New Post" --post
```

`yyyy-mm-dd-My-New-Post.md` 포스트를 `_posts/`{: .filepath}에 새로 생성한다.

카테고리 폴더로 프로젝트를 정리했다면 새로 생긴 파일을 해당 폴더로 직접 이동시켜주면 된다. 이때 해당 글 Frontmatter에 `categories, tags` 속성을 추가하는 것을 잊지말자.

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

`assets/img/`{: .filepath} 폴더에 `posts/`{: .filepath} 폴더를 새로 만들어준다. 이후 현재 작성하는 포스트의 폴더를 새로 하나 만들어 그 안에 사용할 이미지들을 불러오면 된다. 폴더명은 현재 포스트의 파일명과 동일하게 해도 된다.

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

이후 이미지를 삽입할 때 전체 경로를 생략하고 `img_path` frontmatter에 정의한 경로 내에 있는 이미지 이름만 `( )`안에 넣어주면 문제없이 삽입된다. 추가적으로 `{: w="너비 px" h="높이 px"}`를 달아줘서 이미지의 크기도 지정해준다. 추가적인 서식은 [여기](https://chirpy.cotes.page/posts/write-a-new-post/#images){:target="_blank"}를 참고하자. 

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