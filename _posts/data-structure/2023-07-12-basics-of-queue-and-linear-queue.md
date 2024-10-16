---
layout: post
title: "[큐] 큐의 기초와 선형 큐 구현"
date: 2023-07-12 17:31 +0900
categories:
- Data structure with C
tags: [c, data-structure]
media_subpath: "/assets/img/posts/data-structure/2023-07-12-basics-of-queue-and-linear-queue/"
---

![Queue image](queue1.jpeg){: w="500" h=700"}
_사람들이 줄을 서있는 사진_

## 🏪🚶‍♀️🚶‍♂️🚶‍♂️🚶‍♀️ 큐(Queue)란?
큐는 우리 일상생활에서 많이 찾아볼 수 있다. 어떤 가게에 가서 줄을 서서 물건을 사는 경우, 사람들이 줄지어 서있는 대기열을 큐라고 한다. 먼저 온 사람이 먼저 서비스를 제공받는 시스템이다. 이를 FIFO (First in, First out; 선입선출) 방식이라고 한다. 코딩에서 사용하는 예시에는 여러가지가 있다. 한가지로 예를 들면 그래프(노드와 엣지로 이루어지는 자료구조, 지하철 노선도를 생각하면 편하다)에서 어느 두 지점사이의 최단거리를 찾는데 큐를 사용한다.

## 📖 큐 용어
우리가 줄을 서기위해 사람들 뒤에 서는 것, 즉 큐에 삽입하는 것을 `Enqueue`라고 한다. 우리의 차례가 되어 맨 앞까지 왔다면, 즉 큐로부터 제거하는 것을 `Dequeue` 라고한다. 우리가 필요한 데이터는 큐의 맨 앞에서 제거하여 사용한다. 이외에는 전에 구현한 스택과 똑같다. 큐가 비었는지 포화상태인지 체크하는 함수, 출력하는 함수 등이 있다.

### 스택 vs 큐

| 비교 | 스택 | 큐 | 
|:-----:|:------:|:---:|
| 넣는 방식| 뒤에 넣고, 뒤에서 빼고 (구멍이 하나) | 뒤에 넣고, 앞에서 빼고 (구멍이 2개) |
|용어|삽입(Push), 제거(Pop) | 삽입(Enqueue), 제거(Dequeue)|
|방식|LIFO(후입선출)|FIFO(선입선출)|
|관련분야|후위연산자|줄을 서있는 사람들, 프린터와 컴퓨터 사이의 버퍼|

### 큐 추상자료형
```yaml
# 선형 큐에 필요한 재료들
변수:
    - 크기가 고정된 배열
    - 큐의 맨 뒤를 가르키는 변수
    - 큐의 맨 앞을 가르키는 변수

주요 연산:
    - enqueue() # 배열이 꽉 차지 않았다면 삽입 ok
    - dequeue() # 배열이 비어있지 않다면 제거 ok

기타 연산:
    - is_full()  # 배열이 꽉 찻으면 true
    - is_empty() # 배열이 비었으면 true
    - print()    # 큐의 모습을 출력
```
{: file="Queue ADT"}

위에 작성된 큐의 추상자료형을 기반으로 이번 글에서는 배열을 통한 간단한 선형큐를 만들어본다.

## 💡 선형 큐의 구현
### 큐 구조체와 기본 연산 함수
```c
#define MAX_QUEUE_SIZE 10 // 큐의 최대 크기
typedef int element;      // 큐에 담을 요소의 자료형

// 큐 구조체
typedef struct _Queue
{
    int front;
    int rear;
    element arr[MAX_QUEUE_SIZE];
} Queue;

// 큐를 초기화하는 함수
void Queue_init(Queue* q)
{
    q->front = q->rear = -1;
}

// 큐가 꽉 찼다면 1, 아니면 0
int Queue_isFull(Queue* q)
{
    return q->rear == MAX_QUEUE_SIZE - 1;
}

// 큐가 비었다면 1, 아니면 0
int Queue_isEmpty(Queue* q)
{
    return q->front == q->rear;
}
```
선형큐에는 배열을 사용하기 때문에 그 크기를 `MAX_QUEUE_SIZE 10`으로 지정해줬다. 큐에 담을 요소의 자료형인 `element`도 우선은 정수를 담기 위해 `typedef int element`로 선언해주었다.

큐 자료구조를 나타내는 구조체는 큐의 전단, 후단을 가르키는 변수와 배열이 필요하다. 배열의 어떤 요소를 가르키려면 그 요소의 인덱스만 알면 되므로 큐의 전단, 후단은 배열의 인덱스로 저장한다. 다만 맨 처음 큐를 초기화할 때에는 `-1`로 초기화한다. 

큐가 포화상태가 되었는지는 `rear`가 배열의 마지막 인덱스인 `MAX_QUEUE_SIZE - 1` 값인지 체크하면 된다. 비어있는 상태는 큐의 앞에서부터 요소를 제거해나가면 결국에는 `front`는 점점 늘어나 뒤로 이동하여 `rear`의 값이 같아지게 될 것이고 이를 체크하면 된다.

### 큐에 삽입과 제거
```c
// 큐에 삽입
void Queue_enqueue(Queue* q, element e)
{
    // 꽉 찼다면 삽입할 수 없다.
    if (Queue_isFull(q))
    {
        fprintf(stderr, "Queue is full!\n");
        exit(1);
    }
    q->arr[++q->rear] = e; // rear 하나 증가시키고, 그 자리에 새 요소 삽입
}

// 큐에서 제거
element Queue_dequeue(Queue* q)
{
    if (Queue_isEmpty(q))
    {
        fprintf(stderr, "Queue is empty!\n")
        exit(1);
    }
    // front를 하나 증가시키고, 그 자리의 요소를 리턴
    return q->arr[++q->front]; 
}
```

![Queue animation](anim_queue.gif){: w="960" h="382"}
_큐의 동작 모습_

![Queue animation 2](anim_queue2.gif){: w="960" h="376"}
_큐의 동작 모습 버젼 2_


큐에 삽입하는 동작은
1. `rear`를 하나 증가시키고,
2. 그 자리에 새 요소를 삽입하면 된다. 

큐로부터 제거하는 동작은 (첫번째 움짤의 경우; `front`는 큐의 맨 앞 요소의 하나 이전 인덱스)
1. `front`를 하나 올리고,
2. 그 자리에 있는 요소를 제거하여 리턴해준다.

두번째 움짤의 경우; `front`는 큐의 맨 앞 요소의 인덱스
1. 현재 `front`자리의 요소를 제거하여 임시 저장해두고
2. `front`를 하나 증가시키고
3. 임시저장한 값을 리턴한다.

여기서 `front`를 현재 맨 앞에 있는 요소의 이전 인덱스로 할 것이냐 아니면 맨 앞의 요소로 할 것이냐는 자유이다. 교재에서는 전자의 경우를 사용했다. 후자의 경우라면 Deqeue연산은 `front`가 가르키는 요소를 리턴하면서 `front`를 하나 올리면 될 것이다. (필자는 이 방법이 좀 더 당연한 것 같은데 왜 책에서는 첫번째 방법을 썼는지 모르겠다.)

### 출력함수
```c
void Queue_print(Queue* q)
{
    if (Queue_isEmpty(q))
    {
        printf("Empty Queue!\n");
        return;
    }

    // 베열 전체의 모습을 출력
    for (int i = 0; i < MAX_QUEUE_SIZE; ++i)
    {
        // front + 1 ~ rear 인덱스를 출력
        if (i > q->front && i <= q->rear)
            printf("| %2d ", q->arr[i]);
        else
            printf("|    ");
    }

    printf("\n\n");
}
```
출력함수의 경우, `front`가 큐의 맨 앞 요소의 이전 인덱스를 가르키고 있는 버젼으로 만들었다.

## 💻 코드 전체
![output](output.png){: w="490", h="254"}
_실행결과_
[Pastebin 보러가기](https://pastebin.com/JEMVPjWu){:target="_blank"}

## ⭐정리
- 큐 자료구조에 대해 알아보았다.
- 큐에 삽입은 Enqueue, 제거는 Dequeue이다.
- 배열을 사용한 간단한 선형 큐를 구현해보았다. 다만 이 버젼에서는 `dequeue`연산 이후 생긴 앞쪽의 빈 공간을 사용할 수 없다. 이를 해결하기 위해 다음 포스트에서 원형 큐를 배워본다.

---
참고서적 : C언어로 쉽게 풀어쓴 자료구조 (개정 3판), 천인국·공용해·하상호, 생능출판 - [Yes24바로가기](https://www.yes24.com/Product/Goods/69750539){:target="_blank"}
