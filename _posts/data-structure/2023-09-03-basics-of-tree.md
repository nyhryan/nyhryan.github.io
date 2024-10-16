---
layout: post
title: "[트리] 트리의 기초"
date: 2023-09-03 15:47 +0900
math: true
categories:
- Data structure with C
tags: [c, data-structure]
media_subpath: "/assets/img/posts/data-structure/2023-09-03-basics-of-tree/"
---

## 🔍 트리(Tree) 자료구조란?
![트리](tree.png){: h="1000"}
_뒤집은 나무와 닮은 트리 자료구조_

트리 자료구조는 이름에서도 알 수 있듯이 나무와 모습이 비슷하다. 뿌리에서 시작하여, 나뭇가지는 또 다른 나뭇가지로 갈라지고, 나뭇가지의 끝에는 열매나 잎파리가 달려있다.

트리 자료구조는 **비선형 자료구조**로 스택, 큐와 같은 *선형 자료구조*와는 다르다. 선형 자료구조가 1차원적이었다면, 트리나 그래프 같은 비선형 자료구조는 2차원적이라고 볼 수 있다.

## 📚 트리 용어

![tree-terms](tree-terms.png){: h="1000"}
_그림으로 보는 트리 용어_
- 트리는 *노드*들로 이루어진다.
- 가장 위에, 기본이 되는 노드를 *루트(Root)* 노드라고 한다.
- 루트 노드 아래로는 *서브트리*로 구성된다. 서브트리는 또다시 루트 노드와 서브트리로 이루어진다.
- 루트와 서브트리를 잇는 선을 *Edge(간선)* 이라고 한다.
- 자식 노드를 가지지 않는 노드를 *단말(Terminal) 혹은 리프(Leaf) 노드*라고 한다.
- 트리의 각 층을 *레벨* 이라고 한다.
- 트리의 레벨에서 최대 레벨이 트리의 *높이(Height)*가 된다.
- 어떤 노드가 가지는 자식 노드의 개수를 *차수(Degree)* 라고 한다.
    - 이때, 차수 값들 중에서 최댓값이 *트리의 차수*가 된다.

## 🌳 이진 트리(Binary tree, B-tree)
트리의 차수가 2인 트리를 이진 트리라고 한다. 즉 모든 노드는 자식노드를 0개, 1개 혹은 2개를 가진다.

> 📖 이진 트리의 정의  
> 자식노드가 없거나, 서브트리를 하나 혹은 둘 가지는 노드들의 유한집합. 여기서 자식인 서브트리는 다시 이 정의를 만족시켜야 비로소 이진 트리이다.
{: .prompt-info}

### 이진 트리의 특징

![node count](node-count.png){: h="1000"}

- 높이 $h$의 이진트리의 노드 개수 $n$은, $h \leq n \leq 2^{h}-1$이다.

![height](height.png){: h="1000"}

- $n$개의 노드를 가지는 이진트리의 높이 $h$는, $\left\lceil \, \log_{2}{(n+1)} \, \right\rceil \leq h \leq n$이다.

![full tree](full-b-tree.png){: h="1000"}

- 모든 레벨이 꽉 차있는 트리를 *포화 이진 트리(Full B-tree)*라고 한다.
- (마지막 - 1) 레벨까지는 포화 이진 트리이고, 마지막 레벨이 왼쪽부터 차례로 채워진 형태의 트리를 *완전 이진 트리(Complete B-tree)*라고 한다.
    - 위 두 조건에 만족하지 않으면 기타 이진 트리로 분류한다.

### 이진 트리의 표현


![how to tree](tree-how.png){: h="1000"}
_배열 표현법 vs 포인터 표현법_

1. 배열을 사용하기
    - 다만 이 벙밥의 경우에는 배열의 빈공간이 생겨 낭비되는 경우가 있다.
    - 히프(Heap) 자료구조를 만들 때 이 방법을 쓰기도 한다.
    - 부모 노드에 있을 때, 왼쪽-오른쪽 자식의 인덱스를 바로 알 수 있다. 💥 루트 노드가 `0`이나 `1` 인덱스부터 시작하냐에 따라 공식이 조금 다르므로 주의!
        - 부모 `i` : 왼쪽 자식 `2i + 1` - 오른쪽 자식 `2i + 2`
    - 반대로, 자식 노드의 인덱스를 통해 부모의 인덱스도 알아내어 바로 배열에 접근할 수 있다.
        - 왼쪽 자식 `i` : 부모 `i / 2`
        - 오른쪽 자식 `i` : 부모 `i / 2 - 1`
    - 내가 왼쪽 자식 `i` 일 때, 내 형제인 오른쪽 노드는 `i + 1`
        - 반대로 내가 오른쪽 자식 `i`이면 내 형제인 왼쪽 노드는 `i - 1`
2. 포인터를 사용하기
    - 노드 구조체를 만들 때, 자식 노드를 가르킬 수 있는 포인터 `*left, *right` 필드를 추가한다.


## ⭐정리
- 트리 자료구조에 대해 알아보았다.
- 트리와 관련된 용어에 대해 알아보았다.
- 이진 트리에 대해 알아보았다.

---
참고서적 : C언어로 쉽게 풀어쓴 자료구조 (개정 3판), 천인국·공용해·하상호, 생능출판 - [Yes24바로가기](https://www.yes24.com/Product/Goods/69750539){:target="_blank"}
