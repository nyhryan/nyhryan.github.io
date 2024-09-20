---
layout: post
title: "[리스트] 이중 연결 리스트의 구현"
date: 2023-08-15 23:30 +0900
categories:
- Data structure with C
tags: [c, data-structure]
media_subpath: "/assets/img/posts/data-structure/2023-08-15-doubly-linked-list/"
---

## 🔍 이중 연결리스트(Doubly Linkedlist)란?

![dlist1](dlist1.png){: w="1061}
_이중 연결리스트의 모습_

이중 연결리스트는 말 그대로 노드 간의 연결이 이중으로 되어있는 리스트 자료구조이다. 노드에는 다음 노드의 정보뿐만 아니라 이전 노드를 가르키고 있는 포인터도 가지고있다. 여태까지 연결리스트의 2가지 버젼 ([단순 연결리스트]({% post_url /data-structure/2023-08-01-basic-of-list-and-simply-linked-list %}), [원형 연결리스트]({% post_url /data-structure/2023-08-08-circular-linked-list %}))에 대해 알아보았으니 이번 이중 연결리스트의 구현은 비교적 간단하게 느껴질 것이다. 여기서는 이중 연결리스트와 원형 연결리스트를 합친 버젼에 대해 공부한다.

이중 연결리스트는 양방향으로 탐색할 수 있다는 장점이 있지만, 이전 노드와 다음 노드 두가지 연결을 주의해야하는 단점이 있다.

## 💡 이중 연결리스트의 구현

### 노드 구조체
```c
// 노드에 담을 자료형
typedef int element;

// 이중 연결리스트의 노드 구조체: 좌,우 노드의 정보와 담을 데이터를 가진다.
typedef struct _Node {
    struct _Node* left;
    struct _Node* right;
    element data;
} Node;

// 이중 연결리스트의 헤더 구조체, 이중 연결리스트의 맨 앞 노드를 저장한다.
typedef struct _DList {
    Node* head; // 이 노드에는 데이터는 담지 않지만, 리스트의 맨 앞을 나타낸다.
    // unsigned int size; // 노드의 개수를 저장하는 정보, 안써도 된다.
} DList;
```

`Dlist` 구조체에 담은 `head` 노드 포인터는 리스트의 **헤드 노드**이다. 이 노드에는 아무런 데이터는 담지 않지만, 리스트의 맨 앞, 맨 뒤 노드를 가르키고 있다. 즉, 이 노드의 왼쪽 노드(이전 노드)는 리스트의 맨 끝 노드이다. 또 이 노드의 오른쪽 노드(다음 노드)는 리스트의 맨 앞 노드이다. 

### 삽입과 제거
![insert1](dlist-insert.gif){: h="360"}
_일반적인 삽입 연산_

코드를 보기에 앞서, 이중 연결리스트에서 삽입, 제거하는 과정에 대해 알아보자. 이 연산은 리스트에 노드가 1개 있던,2개 있던 개수와 상관없이 잘 동작한다. 다만 빈 리스트라면 무턱대고 제거해서는 안된다는 것은 잘 알고있을 것이다.


1. 새 노드를 만들고, 삽입하고 싶은 위치의 노드(X 노드라고 하자. 움짤에서 숫자 `10`이 들은 노드)를 알아낸다.
2. 새 노드의 오른쪽 노드(다음 노드) 👉 X 노드의 오른쪽 노드
3. 새 노드의 왼쪽 노드(이전 노드) 👉 X 노드
4. X 노드의 오른쪽 노드의 왼쪽 노드 👉 새 노드
5. X 노드의 오른쪽 노드 👉 새 노드

노드 연결에 주의하며 4번 연결을 변경하면 삽입이 끝난다.

![remove1](dlist-remove.gif){: h="360"}
_일반적인 제거 연산_

반면에 제거 연산은 조금 간단하다.
1. 제거할 노드를 임시 저장한다.
2. 제거할 노드의 왼쪽 노드(이전 노드)의 오른쪽 노드 👉 제거할 노드의 오른쪽 노드
3. 제거할 노드의 오른쪽 노드의 왼쪽 노드 👉 제거할 노드의 왼쪽 노드

움짤을 보면서 생각하면 더 편하다. 노드를 빼내고 그 사이를 다시 올바르게 이어준다고 생각하면 되겠다.

### 맨 앞에 삽입
![insert2](dlist-insert2.gif){: w="750"}
_맨 앞에 삽입하기_

위의 삽입 연산을 바탕으로 맨 앞에 삽입하는 연산을 만들어보자.

```c
// 리스트의 맨 앞에 삽입
void List_InsertFirst(DList* list, element e)
{
    Node* newNode = NULL;               // 삽입할 새 노드
    newNode = CreateNode(newNode, e);

    newNode->right = list->head->right; // 1번
    newNode->left = list->head;         // 1번

    list->head->right->left = newNode;  // 2번
    list->head->right = newNode;        // 3번
}
```
움짤에서의 순서와 비교하며 보면된다. 연결만 하면 되는거라 더 이상의 설명은 필요없다(?)

### 맨 앞을 제거
```c
// 리스트가 비었는지 확인하는 함수, 비었으면 1 리턴
int List_IsEmpty(DList* list)
{
    return (list->head->left == list->head); // 헤드 노드의 다음노드가 헤드면 빈 리스트이다.
}

// 리스트의 맨 앞 요소 제거
element List_RemoveFirst(DList* list)
{
    if (List_IsEmpty(list))
    {
        fprintf(stderr, "Cannot remove from an empty list!\n");
        exit(1);
    }

    Node* head = list->head;     // 리스트의 헤드 노드
    Node* removed = head->right; // 제거할 맨 앞 노드

    head->right = removed->right;
    head->right->left = head;

    // head = ~~처럼 직접 수정한것이 아니라
    // head-> ~~ = ~~의 형태로 필드만 수정했기 때문에
    // list->head = head를 해줄 필요가 없다.

    element e = removed->data;
    free(removed);

    return e;
}
```
위에서 본 일반적인 제거 연산 움짤과 똑같이 하되 노드의 연결에 주의하면 된다. 빈 리스트인지를 파악하는 함수도 같이 포함했다. 빈 리스트에서는 지우기 연산을 할 수 없기 때문이다.

### 리스트를 출력
```c
void List_Print(DList* list)
{
    Node* head = list->head;

    if (List_IsEmpty(list))
    {
        printf("Empty List!\n");
        return;
    }

    // 리스트의 맨 앞 노드(헤드 노드의 다음 노드)부터 다시 헤드 노드를 만날 때까지
    // 선형 탐색하며 출력
    printf("HEAD <-> ");
    for (Node* i = head->right; i != head; i = i->right)
        printf("%2d <-> ", i->data);
    printf("HEAD\n");
}
```
출력하는 함수는 리스트의 맨 앞에서 출발해 다시 헤드 노드로 돌아올때까지 앞으로 선형탐색을 하면서 출력한다.

## 💻 코드 전체

[pastebin 보러가기](https://pastebin.com/fMEm56b6){: target="_blank"}


추가적으로 맨 뒤에 삽입, 제거하는 함수를 구현해놓았다.

![output](output.png){: h="660"}
_출력 결과_

1,2번째에 리스트의 맨 앞에 삽입했고, 3,4번째에는 리스트의 맨 뒤에 삽입한 결과이다.

## ⭐정리
- 이중 연결리스트에 대해 알아보았다.
- 이중 연결리스트에서 맨 앞에 삽입하고 제거하는 연산을 구현하였다.

---
참고서적 : C언어로 쉽게 풀어쓴 자료구조 (개정 3판), 천인국·공용해·하상호, 생능출판 - [Yes24바로가기](https://www.yes24.com/Product/Goods/69750539){:target="_blank"}
