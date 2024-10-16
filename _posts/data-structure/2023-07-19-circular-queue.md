---
layout: post
title: "[큐] 원형 큐 구현"
date: 2023-07-19 16:03 +0900
categories:
- Data structure with C
tags: [c, data-structure]
media_subpath: "/assets/img/posts/data-structure/2023-07-19-circular-queue/"
---

> 그림의 글씨가 이쁘지 않은 점 양해 부탁드립니다. 아이패드로 글씨쓰면 뭔가 안 이쁨..
{: .prompt-tip}

## 🔍원형 큐란?

![선형 큐 문제](linear_q.jpg){: w="821", h="441"}
_선형 큐의 문제점_

지난시간에 만든 선형 큐에는 하나의 문제점이 있다. `Enqueue, Dequeue`연산을 반복하다보면 큐의 맨 앞, 뒤 요소를 가르키는 `front, rear` 변수가 큐 배열의 맨 뒤에 쳐박히는다는 사실이다. 이렇게 되면 배열 앞쪽에 공간이 있음에도 불구하고 `front, rear` 변수를 앞으로 땡겨주지 않으면 큐 배열이 꽉 찬것과 다름없기 때문에 더 이상 큐를 사용할 수 없게 된다.

![원형 큐 1](circular_q.jpg){: w="453", h="432"}
_원형 큐로의 변환_
이렇게 배열 앞쪽의 빈 공간을 다시 사용하기 위해 `front, rear` 변수를 앞쪽으로 이동(변환)시켜주어야 한다. 선형 자료구조인 배열을 위 그림처럼 맨 마지막과 맨 앞이 맞닿게 말았다고 생각해보자. 그렇다면 맨 앞 `[0]` 인덱스의 이전 인덱스는 `[4]`가 되고, 반대로 마지막 인덱스인 `[4]` 인덱스의 다음 인덱스는 `[0]`이 된다.

![원형 큐 2](circular_q2.jpg){: w="672", h="331"}
_원형 큐의 또다른 모습_
배열을 둥그렇게 마는 것이 와닿지 않으면 위와 같이 생각해도 된다. 현재 배열이 뒤로 무한히 미러링된다고 생각해보자. 다만 여기서 인덱스가 무한히 증가하는 것이 아니라, `[4]`를 넘어가면 다시 `[0], [1], ...`이 되어야 한다.

그림에서 규칙을 찾아보면, `크기 5`의 배열이 반복되고 있다. 각 묶음의 첫 인덱스는 `5의 배수`이다. 나머지 4개의 인덱스는 `5의 배수+1, +2, +3, +4`이다. 이를 반대로 생각해보면, 각 자리의 인덱스는 `5로 나눈 나머지`라고 할 수 있다.


여기서 원형 큐에 가장 중요한 개념인 `%` 연산 (나머지; 모듈로 연산)이 나온다. `front, rear` 변수를 삽입, 제거 연산으로 인해 변경해야 할 때, 단순히 변수의 값을 증가시키는 것이 아니라, `front, rear` 변수의 값이 배열의 최대 크기가 넘어가도 다시 배열의 맨 앞으로 돌아오게끔 `%` 연산을 통해 조정해주어야 한다. 예를 들어 `(rear + 1) % MAX_QUEUE_SIZE`를 통해 삽입 이후 새로운 `rear` 변수의 값을 저장해준다. 정리하자면 `하나 증가시키고-배열 크기 만큼 나머지 연산`을 기억하자.

## 💡 원형 큐의 구현
> 여기서는 큐의 (맨 앞 요소 - 1)을 `front` 인덱스로 사용합니다. 아래에 설명.
{: .prompt-info}

### 큐 구조체와 초기화

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX_QUEUE_SIZE 10
typedef int element;

typedef struct _CircQueue
{
    int front;
    int rear;
    element arr[MAX_QUEUE_SIZE];
} CircQueue;

void Queue_init(CircQueue* q)
{
    q->front = q->rear = 0;
}
```
원형 큐와 선형 큐의 다른점은 동작 방식밖에 없다. 큐 구조체는 동일하다. `Queue_init()`에서는 원형 큐를 초기화시켜준다. `front, rear`를 `-1`이 아닌 `0`으로 초기화시켜준다.

### 큐가 꽉 찼나요, 비었나요?
![isFull](isFull.jpg){: w="788", h="408"}
_포화상태와 빈 상태_
원형 큐에서 빈 상태는 `front == rear`인 상태이다. 이후 원형 큐에 삽입을 계속하는데 한칸은 남겨두어야한다. 왜냐하면 위 그림의 포화상태에서 한번 더 삽입을 하면 `front`와 `rear`값이 같아진다. 즉 빈 상태와 구분할 수 없게 된다. 이를 해결하기 위해 한칸은 남겨두는 것이다. (아니면 구조체에 큐에 들어있는 요소를 추적하는 변수를 추가해도 된다. 이러면 굳이 한칸을 비우지 않아도 된다.)

```c
int Queue_isFull(CircQueue* q)
{
    return (q->rear + 1) % MAX_QUEUE_SIZE == q->front; // rear의 다음 칸이 front이면 포화상태
}

int Queue_isEmpty(CircQueue* q)
{
    return q->front == q->rear; // front와 rear가 같으면 빈 상태
}
```
포화상태인지는 `(rear + 1) % MAX_QUEUE_SIZE`가 `front`와 같은지 알아보면 된다. 공백 상태는 `front`와 `rear`가 같은지 알아보면 된다.


### 삽입, 제거, 출력 함수
```c
void Queue_enqueue(CircQueue* q, element e)
{
    if (Queue_isFull(q))
    {
        fprintf(stderr, "Queue is full!\n");
        exit(1);
    }
    // 포화상태가 아니라면 rear를 하나 증가시키고, 나머지 연산을 한 다음 그 자리에 새 요소 삽입
    q->arr[ (++q->rear) % MAX_QUEUE_SIZE ] = e;
}

element Queue_dequeue(CircQueue* q)
{
    if (Queue_isEmpty(q))
    {
        fprintf(stderr, "Queue is empty!\n");
        exit(1);
    }
    // 공백상태가 아니라면 front를 하나 증가시키고, 나머지 연산을 한 다음 그 자리에 있는 요소를 리턴
    return q->arr[ (++q->front) % MAX_QUEUE_SIZE ];

}

void Queue_print(CircQueue* q)
{
    if (Queue_isEmpty(q))
    {
        printf("Queue is empty!\n");
        return;
    }
    int i;
    for (i = q->front + 1; i != q->rear; i = (i + 1) % MAX_QUEUE_SIZE)
        printf("%2d ← ", q->arr[i]);
    printf("%2d\n", q->arr[i]);
}
```

`Queue_enqueue(), Queue_dequeue()`는 위에서 알아본 나머지 연산 (`%`)을 통해 구현해주면 된다. 어찌되든간에 삽입이나 제거할 인덱스는 하나 증가시킨 후, 배열의 크기로 나눈 나머지 값이다.

출력함수는 `front + 1` 자리부터 시작해서, `하나 증가시키고-배열 크기 만큼 나머지 연산`을 하며 `i` 값을 변화시켜나가며, `i`가 `rear`가 되면 반복문을 종료한다. 이후 반복문을 빠져나온 상태에서 `i`값은 `rear`이므로 한번더 출력해주면 맨 마지막 요소까지 출력되게 된다.

## 💻 코드 전체

![output](result.png){: w="223", h="176"}
_출력 결과_

[Pastebin 보러가기](https://pastebin.com/UHKBB5mU)

## ⭐정리
- 선형 큐의 문제를 개선한 원형 큐에 대해 알아보았다.

---
참고서적 : C언어로 쉽게 풀어쓴 자료구조 (개정 3판), 천인국·공용해·하상호, 생능출판 - [Yes24바로가기](https://www.yes24.com/Product/Goods/69750539){:target="_blank"}
