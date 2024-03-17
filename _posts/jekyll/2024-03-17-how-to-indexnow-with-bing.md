---
title: IndexNow와 검색엔진 인덱싱 요청 자동화 하기
description: IndexNow API를 사용하여 검색엔진에 제출하는 포스트 인덱싱 요청을 자동화 해봅시다.
categories: [Jekyll]
tags: [jekyll]
date: 2024-03-17 17:02 +0900
img_path: /assets/img/posts/jekyll/2024-03-17-how-to-indexnow-with-bing
---

## 🔎&#xFE0F; IndexNow란?

- [Bing \| IndexNow](https://www.bing.com/indexnow/){: target="_blank"}
- [IndexNow.org \| What is IndexNow?](https://www.indexnow.org/index){: target="_blank"}

IndexNow를 통해 검색엔진에게 웹사이트에 변화가 생겼다고 쉽게 알려줄 수 있다. Bing Webmaster 같은 경우 API를 제공하기 때문에 이를 쉽게 사용해 볼 수 있다.

## ⏰&#xFE0F; GitHub Actions를 통한 IndexNow

> GitHub Actions에 대해서는 [Quickstart for GitHub Actions](https://docs.github.com/en/actions/quickstart){: target="_blank"}를 참고하세요.
{: .prompt-tip}

본 블로그는 GitHub Actions를 통해 자동으로 빌드되고 배포된다.

GitHub Actions 마켓에 보면 [IndexNow Action](https://github.com/marketplace/actions/indexnow-action){: target="_blank"}을 누가 만들어놨다. 직접 API요청을 HTTP로 제출하는 코드를 짤 필요가 없다. 이 액션을 사용하여 IndexNow 요청을 제출하는 워크플로우 파일만 작성하면 된다.

이 글에서는 Bing에서 제공하는 방법을 기준으로 설명한다.

### API 토큰 저장하기

![indexnow](index.png){: w="1000" h=""}

Bing의 방법대로라면 [Get Started](https://www.bing.com/indexnow/getstarted){: target="_blank"}에서 제공하는 API 키를 `<api_key>.txt` 파일 형태에, 내용물은 API키를 가지는 형태로 저장하여 블로그 루트에 놓아야한다.

![secrets](secret.png){: w="1000" h=""}

GitHub Actions를 통해 블로그가 빌드되고 배포되는 액션 사이에 IndexNow API 키 파일을 저장하는 스크립트를 넣을 수 있다. 이때 공개 저장소의 파일에  API 키 파일을 노출시키기보다는 저장소 설정에 Secret 기능을 사용할 수 있다.

Settings 탭 - Security - Secrets and variables - Actions - Repository Secrets에 새 저장소 secrets를 만들어 그곳에 API 키를 넣으면 된다. 

나는 `INDEXNOW_KEY`라는 이름으로 만들었다. 워크플로우 파일에서 `{%raw%}${{ secrets.INDEXNOW_KEY }}{%endraw%}`의 방법으로 변수처럼 읽어올 수 있다.

```yaml
# ...
- name: Test site
  run: |
      bundle exec htmlproofer _site \
      \-\-disable-external=true \
      \-\-ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/"

# API 토큰을 _site 아래에 .txt 파일로 저장!
- name: IndexNow Setup
  run: |{%raw%}
      echo ${{ secrets.INDEXNOW_KEY }} > _site/${{ secrets.INDEXNOW_KEY }}.txt

- name: Upload site artifact
  uses: actions/upload-pages-artifact@v1
  with:
      path: "_site${{ steps.pages.outputs.base_path }}"{%endraw%}
```
{: file=".github/workflow/pages-deploy.yml"}

블로그를 빌드하고 배포하는 액션인 `pages-deploy.yml`에 `IndexNow Setup`이라는 단계를 추가해주었다. 위에서 만든 저장소 secret을 여기서 불러와 Bing에서 정한 `<api_key>.txt`의 형태로 저장한다.

`echo` 명령을 통해 API 키를 읽고 그 출력을 `>` 리디렉팅을 통해 `_site/<api_key>.txt`의 파일에 저장한다.

### 매일 실행되는 IndexNow 워크플로우 만들기

IndexNow 요청 제출 자동화는 [IndexNow Action](https://github.com/marketplace/actions/indexnow-action){: target="_blank"}에서 설명하는 그대로 새 워크플로우를 만들면 끝이다.

나는 `IndexNow.yml`이라는 이름으로 새 워크플로우를 만들었다.

```yaml
name: 'IndexNow'
on:
  schedule:
    # 매일 밤 2시에 워크플로우 실행
    - cron: '0 2 * * *'

  # 저장소의 Actions 탭에서 수동으로 실행가능하게 하는 옵션
  workflow_dispatch:

jobs:
  check-and-submit:
    runs-on: ubuntu-latest
    steps:
      - name: indexnow-action
        uses: bojieyang/indexnow-action@v2
        with:
          sitemap-location: 'https://nyhryan.github.io/sitemap.xml'
          key: {%raw%}${{ secrets.INDEXNOW_KEY }}{%endraw%}
          endpoint: 'api.indexnow.org'
```
{: file=".github/workflows/IndexNow.yml"}

이때 `indexnow-action` 단계에 `with` 속성에 적는 옵션들은 [Inputs](https://github.com/marketplace/actions/indexnow-action#inputs){: target="_blank"}를 참고하자.

![result](result.png){: w="1000" h=""}

Actions 탭에서 직접 워크플로우를 실행한 결과, 조건에 맞는 몇개의 URL이 제출된 것을 볼 수 있다.