---
title: "[스택] 동적 크기 스택"
date: 2023-06-26 20:02 +0900
categories:
- Data structure with C
tags:
- c
- data structure
img_path: "/assets/img/posts/data-structure/2023-06-26-dynamic-stack/"
---

## 🔎 동적 크기 스택?
지난 포스트에서는 고정된 크기의 배열을 사용하는 스택 자료구조를 구현했다. 배열의 크기가 고정되어 있는 만큼 불편함도 따른다. 이번 포스트에서는 `<stdlib.h>` 헤더 내의 `malloc()`, `realloc()` 함수를 활용하여 배열의 크기를 조정하면서 사용하는 동적 크기 스택에 대해 알아본다.

### `realloc()` 함수?
```c
void* realloc(
    element_arr,                   // 크기를 조정할 메모리 블럭 (배열)
    new_capacity * sizeof(element) // 새로운 크기
)
```
`realloc()`은 `malloc()` 함수와 마찬가지로 힙 공간에 접근하는 함수이다. 새로운 크기로 만들 배열과 새로운 크기를 매개변수로 받아, 새로운 크기로 할당한 공간을 리턴해준다. 

함수 실행 후 `void*` 포인터를 리턴하므로 배열의 자료형에 맞게 캐스팅해줄 필요가 있다. 매개변수로는 이동할 메모리 블럭 (여기서는 스택의 배열), 그리고 새로운 크기 (바이트 단위) 2가지를 필요로 한다.


```c
// ...push 연산에서 포화상태라면
stack->capactiy *= 2; // 스택 배열의 최대 크기를 2배로 한다.
stack->arr = (element*) realloc(
    stack->arr,                         // 스택의 배열
    stack->capacity * sizeof(element)   // 위에서 변경된 새로운 배열의 최대 크기
);

// 메모리 조작이 성공했는지 반드시 체크한다!
if (stack->arr == NULL)
    exit(1);

// 이후 정상적으로 push 연산 수행...
```

만약 스택이 현재 포화상태인데 새로운 요소를 삽입해야한다면 스택 배열의 최대 크기를 늘려야 할 것이다. 새로운 크기를 `+1` 늘린다던가 현재 크기의 두배로 잡는다던가 그것은 자유이다. 그 뒤 `realloc()` 함수를 통해 스택의 배열을 조정하고, `realloc()` 함수가 성공했는지 체크한다. 실패시에는 `NULL`을 리턴한다.

## 💡 동적 크기 스택 구현
```yaml
변수:
    - ✅ [변경] 동적 할당을 받을 배열의 포인터 변수 
    - ✅ [추가] 배열의 최대 크기 (용량)
    - 현재 top 요소가 들어있는 인덱스

주요 연산:
    - push() # 스택에 데이터를 삽입
    - pop()  # 스택에 데이터를 제거 후 그 데이터를 리턴
    - peek() # 스택에서 데이터를 제거하지 않고 읽어오기

기타 연산:
    - init()     # 스택 초기화
    - is_empty() # 스택이 다 비어있는가?
    - is_full()  # 스택이 다 찼는가? (포화상태가 되기 전까지는 크기가 고정된 배열과 똑같다.)
    - print()    # 스택 전체 모습을 출력
```
{: .nolineno file="ADT Stack"}
동적 크기 스택 ADT에서 연산은 그대로고, 필요한 변수에 배열을 동적 할당을 받을 배열의 포인터로, 그리고 배열의 최대 크기를 관리할 수 있는 `capacity` 변수를 추가한다.

### 스택 구조체와 초기화
동적 크기 스택을 구현하기 위해 우선 구조체를 선언한다. 이 구조체를 `stack_init()` 함수를 통해 초기화 할 것이다.
```c
#include <stdio.h>
#include <stdlib.h> // 메모리 관련 함수 헤더

typedef int element; // 베열의 담을 요소의 자료형

typedef struct _DynStack
{
    int capacity; // 배열의 최대 용량
    int top;      // top 요소의 인덱스
    element* arr; // 배열의 포인터
} DynStack;

// 동적 크기 스택 s를 초기화한다.
void stack_init(DynStack* s)
{
    s->capacity = 4; // 초기화 시 최대 용량은 4개
    s->top = -1;     // 빈 스택의 top 인덱스는 -1

    // 최대 용량 4개 만큼 메모리 동적 할당
    s->arr = (element*) malloc(s->capacity * sizeof(element)); 
    if (s->arr == NULL) // malloc 실패 여부 검사
    {
        fprintf(stderr, "malloc failure! exiting...\n");
        exit(1);
    }
}
```
{: file="main.c"}

우선 `malloc, realloc`의 함수를 사용하기 위해 `<stdlib.h>` 헤더를 포함시켜준다. 스택을 표현할 구조체 `DynStack`은 최대 용량 `capacity`, 최상단 요소의 인덱스 `top`, 그리고 동적 배열을 할당받을 포인터 변수 `arr`로 구성된다.

`realloc()`을 통해 크기를 조정해야하기 때문에, 스택 변수(지역변수)인 일반 배열 `arr[]` 대신에 우선 포인터 변수 `element arr*`로 선언해두고, 이후 초기화 함수 `stack_init()` 에서 `malloc()`을 통해 배열의 크기만큼 힙에서 할당받는다. 그리고 `capacity, top`의 초기값을 설정해준다.

### 스택이 비었나요? 스택이 꽉 찼나요?
```c
// 스택이 포화상태라면 1, 아니면 0 리턴
int stack_isFull(DynStack* s) {
    return (s->top == (s->capacity - 1));
}

// 스택이 비었다면 1, 아니면 0 리턴
int stack_isEmpty(DynStack* s) {
    return (s->top == -1);
}
```
{: file="main.c"}

스택 배열의 최대 용량이 `s->capacity` 이므로 사용가능한 배열의 인덱스는 `0 ~ capacity - 1` 일것이다. 포화상태를 검사하려면 `top == capacity-1`을 체크해주면 된다. 비어있는 상태검사는 `top`이 `-1`인지 체크하면 되는 것은 똑같다.

### 스택에 push
```c
// 스택 s에 요소 e를 삽입한다.
void stack_push(DynStack* s, element e)
{
    // 스택이 다 찼다면 용량을 2배로 늘린다
    if (stack_isFull(s))
    {
        s->capacity *= 2;
        s->arr = (element*) realloc(s->arr, s->capacity * sizeof(element));
        if (s->arr == NULL)
        {
            fprintf(stderr, "realloc failure!\n");
            exit(1);
        }
    }

    s->arr[++s->top] = e; // top 인덱스를 1개 올린 후 그 자리에 새로운 요소를 삽입한다.
}
```
{: file="main.c"}

push 연산에서 일단 스택이 포화상태인지 체크한다. 만약 포화상태라면 용량 `s->capacity`를 두배 늘리고, `realloc()`을 통해 배열을 새로운 크기로 재할당받는다. 이후 `top` 인덱스를 1개 증가한 후 그 자리에 새로운 요소 `e`를 삽입하면 된다.

### 스택으로부터 pop
```c
// 스택 s로부터 요소 한개를 제거한 후 그 요소를 리턴
element stack_pop(DynStack* s)
{
    // 빈 스택이라면 요소를 제거할 수 없음. 오류 처리
    if (stack_isEmpty(s))
    {
        fprintf(stderr, "ERR : Stack is empty!\n");
        exit(1);
    }
    // pop 연산 : top 요소를 리턴하고, top 인덱스를 1 감소 (후위연산)
    else
        return s->arr[s->top--];
}
```
{: file="main.c"}

pop 연산에서는 스택이 비었다면 요소를 제거할 수 없다. 이에 대한 예외처리를 하고, `top` 인덱스에 있는 요소를 리턴하면서 `top` 인덱스를 1 감소시키면 된다.

### 기타 연산
```c
element stack_peek(DynStack* s)
{
    // 빈 스택은 봐도 아무것도 없음. 예외처리
    if (stack_isEmpty(s))
    {
        fprintf(stderr, "ERR : Stack is empty!\n");
        exit(1);
    }
    // top을 감소시키지 않고 그 요소만 리턴
    else
        return s->arr[s->top];
}

// 스택 출력
void stack_print(DynStack* s)
{
  printf("<  Stack  >\n");

  if (stack_isEmpty(s))
    printf("-- Empty stack --\n");
  else
  {
    // top ~ 0 인덱스까지 상단에서 하단 방향으로 배열 출력
    for (int i = s->top; i >= 0; --i)
        printf("   [ %2d ]\n", s->arr[i]);
  }
  printf("\n");
}

// 동적으로 할당한 배열 반환
void stack_free(DynStack* s)
{
    free(s->arr);
}
```
{: file="main.c"}

peek 연산은 pop 연산과 거의 동일하지만 마지막에 `top` 인덱스를 하나 감소시키지 않는다는 차이점이 있다. 스택 출력함수는 이전과 동일하다.

## 💻 코드 전체
![실행결과](ex1.png){: w="450" h="450"}
_실행 결과_

[pastebin 보러가기](https://pastebin.com/uBXus6as){: target="_blank"}
> 마지막에 `stack_free()` 함수를 실행하는 것이 빠져있습니다. 참고하세요
{: .prompt-info}


## ⭐정리
- `<stdlib.h>` 헤더 파일 내의 `malloc(), realloc()` 함수를 이용하여 배열의 크기를 조정하고, 이를 통해 동적 크기의 스택을 만들 수 있다.  



<details>
    <summary>
        이번 예제에서는 배열의 크기를 무조건 늘리기만 했다. 잘 응용해보면 스택 내의 요소 개수가 일정 크기로 줄어들면 배열의 용량을 다시 줄이는 방법이 있지 않을까? 
    </summary>
<i>👉 스택에서 pop 할때 요소들 개수와 배열의 용량을 체크하여 필요시 스택 용량을 줄이고, <code class="language-plaintext highlighter-rouge">realloc()</code> 으로 재할당받으면 될 것이다.</i>
</details>

---
참고서적 : C언어로 쉽게 풀어쓴 자료구조 (개정 3판), 천인국·공용해·하상호, 생능출판 - [Yes24바로가기](https://www.yes24.com/Product/Goods/69750539){:target="_blank"}