---
layout: post
title: "[리스트] 연결리스트 응용 - 스택과 큐"
date: 2023-08-22 14:19 +0900
categories:
- C언어로 쉽게 풀어쓴 자료구조
tags:
- c
- data structure
img_path: "/assets/img/posts/data-structure/2023-08-22-stack-and-queue-made-with-linked-list/"
---

## 🎯 연결리스트로 스택과 큐 만들기
이번 시간에는 여태까지 배운 연결리스트를 통해 스택과 큐 자료구조를 만들어 볼 것이다. 기존 스택과 큐는 배열을 사용하여 크기로부터 자유롭지 못했다. 최대 용량을 넘어서면 용량을 늘려 배열을 다시 동적할당 받는 방법을 사용하긴했지만 어찌됐든 크기를 처음에 지정하긴 해야한다.

## 📚 스택의 구현
![stack](stack1.png){: w="1237"}
_스택을 연결리스트로 바꾼 모습_

스택을 연결리스트로 만드는 방법은 아주 간단하다. 위 그림처럼 `push, pop` 연산은 연결리스트의 **맨 앞에 삽입하고 제거**하는 연산과 똑같다. 이게 전부이다.

스택을 구현하는 방법은 너무나도 간단하므로 의사코드로 대체하겠다. 

```c
// 스택에 새 요소 e를 삽입
void push(HeadNode head, element e) {
    // 새 노드 생성
    Node newNode = createNodeFromElement(e)
    // 헤드 노드 이전에 새 노드를 연결
    newNode->next = head
    // 헤드 노드를 새 노드로 변경
    head = newNode
}

// 스택에서 요소를 제거해서 가져오기
element pop(HeadNode head) {
    // 제거할 노드는 맨 앞, 헤드 노드
    Node removed = head
    // 헤드 노드를 현재 2번쨰 노드로 변경
    head = head->next

    // 제거할 노드가 가진 데이터를 임시저장
    element result = removed->data
    // 메모리에 노드 반환
    free(removed)
    // 제거한 데이터 리턴
    return result
}
```

## ⏰ 큐의 구현
![queue](q1.png){: w="1320"}
_큐를 연결리스트로 바꾼 모습_
큐의 구현도 그렇게 어렵지는 않다. 다만 큐의 앞과 뒤를 가르키는 `front, rear` 포인터를 잘 활용해야 한다.

![queue](q2.png){: w="1119"}
_큐에 삽입하는 과정_

위와 같은 큐에 삽입하는 것은 `rear` 노드 이후에 새 노드를 추가하고 `rear` 포인터를 하나 이동하는 것 같다. 마찬가지로 큐에서 제거하는 것은 `front` 노드를 제거하고, `front` 포인터를 한칸 이동시키는 것과 같다.

연결리스트로 만들어진 큐에 삽입할 때, 처음 삽입할 때에는 `front, rear` 모두 첫번째 요소를 가르키게 한다. 두번째 이후 삽입부터는 `rear`만 뒤로 한칸씩 이동하면된다. 여기서 삽입은 연결리스트의 맨 뒤에 삽입하는 과정과 똑같은데, 다만 리스트의 맨 앞부터 맨 끝으로 이동하는 선형탐색 과정은 필요없다. `rear` 포인터가 있기때문에 한번에 리스트의 맨 뒤를 알아낼 수 있다.

큐에서 제거하는 과정도 삽입의 역과정으로 생각하여 `front, rear` 포인터를 잘 조정해주면 된다.

### 큐 구조체
```c
typedef int element;   // 노드에 담을 자료형
typedef struct _MyNode // 노드 구조체
{
    struct _MyNode* next;
    element data;
} MyNode;

typedef struct _Queue // 큐 구조체
{
    MyNode* front;
    MyNode* rear;
} Queue;
```

큐를 만들기위해 큐 구조체를 선언했다. 맨 앞과 뒤 노드를 가르키는 `front, rear` 포인터를 가진다.

### 큐 초기화
```c
// 노드 생성 함수 (새 노드를 동적할당한다.)
MyNode* createNode(MyNode* n, element e)
{
    n = (MyNode*)malloc(sizeof(MyNode));
    if (n == NULL) { /* 예외처리... */}
    n->data = e;
    n->next = NULL;

    return n;
}

// 큐 초기화, front, rear를 NULL로 초기화
void Queue_Init(Queue* q)
{
    q->front = q->rear = NULL;
}

// front나 rear가 NULL 이면 참, 큐가 비었는지 알려주는 함수
int Queue_IsEmpty(Queue* q)
{
    // front, rear 둘다 NULL이 아니면 비어있지 않은 큐이다.
    return q->front == NULL || q->rear == NULL;
}
```

큐를 초기화할 떄에는 `front, rear` 포인터를 `NULL`로 하면 된다.

### 큐에 삽입
```c
void Queue_Enqueue(Queue* q, element e)
{
    MyNode* newNode = NULL;
    newNode = createNode(newNode, e);

    if (Queue_IsEmpty(q))
        q->front = q->rear = newNode;
    else
    {
        // 현재 마지막 노드의 다음 노드를 새 노드로 지정
        q->rear->next = newNode;
        // 마지막 노드는 이제 새 노드
        q->rear = newNode;
    }
}
```
큐에 삽입하는 과정은 큐가 비었을 때와 그렇지 않을 때로 구분해서 구현하면 된다.

### 큐에서 제거
```c
element Queue_Dequeue(Queue* q)
{
    if (Queue_IsEmpty(q)) { /* 예외처리 하고 함수 종료... */ }

    MyNode* removed = q->front;
    element removedElement = removed->data;

    // 큐에 하나만 남았다면
    if (q->front == q->rear)
    {
        // 큐는 이제 빈 상태
        q->front = q->rear = NULL;
        // 원래 첫 노드 제거
        free(removed);
        return removedElement;
    }
    // 두개 이상 있다면 front 노드만 제거하면 됨
    else
    {
        // 큐의 첫 노드를 두번째 노드로 이동
        q->front = removed->next;
        // 원래 첫 노드 제거
        free(removed);
        return removedElement;
    }
}
```
큐에서 제거하는 과정은 노드가 한개 남았을 때와 그렇지 않을 때로 구분하면 된다. 한개 남았다면, 제거한 이후에는 빈 큐가 되므로 `front, rear`를 모두 `NULL`로 한다. 노드가 두개 이상이라면 `front`만 조작하면 된다.


## 💻 코드 전체
[pastebin 보러가기](https://pastebin.com/h2bFSNg3){: target="_blank"}

연결리스트로 스택과 큐 2가지 모두를 구현했다.

![output](output.png){: w="1280"}
_출력 결과_

## ⭐정리
- 연결리스트를 사용하여 스택과 큐 자료구조를 구현하는 방법에 대해 알아보았다.

---
참고서적 : C언어로 쉽게 풀어쓴 자료구조 (개정 3판), 천인국·공용해·하상호, 생능출판 - [Yes24바로가기](https://www.yes24.com/Product/Goods/69750539){:target="_blank"}