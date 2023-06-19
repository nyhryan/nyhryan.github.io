---
title: Jekyll과 Chirpy 테마를 통한 Github Pages 시작 
date: 2023-06-19 12:30 +0900
categories: [Jekyll]
tags: [jekyll]
img_path: /assets/img/posts/2023-06-19-Jekyll%EA%B3%BC-Chirpy-%ED%85%8C%EB%A7%88%EB%A5%BC-%ED%86%B5%ED%95%9C-Github-Pages-%EC%8B%9C%EC%9E%91/
---

![Chirpy theme](chirpy.png){: w="250" h="250"}
_This is chirpy._

## 📝 수행 사항
1. [Jekyll 설치](https://jekyllrb.com/docs/installation/){:target="_blank"}
2. [Chirpy 테마 설치](https://chirpy.cotes.page/posts/getting-started/){:target="_blank"}
3. [jekyll-compose 추가](https://github.com/jekyll/jekyll-compose){:target="_blank"}
4. [구글 애널리틱스 4 + Chirpy 설정](https://aouledissa.com/posts/Jekyll-Google-Analytics-4-Integration-With-Chirpy-Theme/){:target="_blank"}
5. [Chirpy 테마에서 favicon 설정 방법](https://chirpy.cotes.page/posts/customize-the-favicon/){:target="_blank"}
5. [Chirpy 테마에서 포스트 작성 방법](https://chirpy.cotes.page/posts/write-a-new-post/){:target="_blank"}

## ⚡ 각종 명령
```console
$ bundle exec jekyll compose "My New Post" --post
```
`yyyy-mm-dd-My-New-Post.md`{: .filepath} 포스트를 `_posts/`{: .filepath}에 새로 생성한다. (위에서 추가한 `jekyll-compose`를 사용)

```console
$ bundle exec jekyll s
```
깃허브에 push 하지 않고도 로컬(`http://127.0.0.1:4000/`)에서 바로 확인 가능. 변경사항이 저장될 때마다 바로 반영된다.

## 🎨 포스트에 이미지 넣는 방법
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