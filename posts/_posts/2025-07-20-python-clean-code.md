---
layout: post
title: "Python Clean Code Review"
date: 2025-07-20
description: "파이썬 클린코드 리뷰가 필요해서 정리, 하지만 내가 알고싶은 내용 위주로..."
excerpt: ""
tags:
- Programming
comments: true
---

![Untitled](../assets/img/post/python_clean_code_0.jpg)

# 0장. 개요
- Abstract
    - 지은이: 마리아노 아니아
    - 2022년 출간

# 1장. 소개 & 코드 포매팅
### 클린코드의 필요성
- 유지보수성 향상
- 기술 부채 감소
- 코드 가독성(협업)

### PEP(Python Enhancement Proposal)이란?
- 파이썬 언어에 새로운 기능을 추가하거나, 기존의 기능을 개선하거나, 또는 파이썬 커뮤니티의 표준(코딩 스타일, 정책 등)을 제안하는 공식 문서입니다.
- 누구나 PEP를 작성하여 제안할 수 있으며, 핵심 개발자(파이썬의 BDFL, Steering Council 등)의 논의 및 리뷰를 거쳐 공식적으로 채택, 보류, 거부 등으로 결정됩니다.
- PEP의 목적은 파이썬 개발의 방향성을 논의하고, 투명성을 확보하며, 커뮤니티와 소통하기 위함입니다.

### 주요 PEP의 예시
- **PEP-8: 파이썬의 공식 코딩 스타일 가이드
→ 파이썬 코드 작성 시 따라야 할 문법, 들여쓰기, 네이밍 규칙 등**
- PEP-20: The Zen of Python
→ 파이썬 철학 19가지 원칙(“Simple is better than complex” 등)
- PEP-257: Docstring Conventions
→ 파이썬 문서 문자열 작성 규칙
- PEP-484: Type Hints(타입 힌트) 도입
→ 함수에 타입 어노테이션을 붙일 수 있도록 표준화

### Linter & Formatter
| 구분 | linter (린터)              | formatter (포매터)      |
| :--- | :------------------------- | :---------------------- |
| 목적 | 오류/버그/비표준 코드 탐지 | 스타일 일관성 자동 수정 |
| 행동 | 경고/에러 메시지로 알림    | 코드를 자동 변경        |
| 예시 | pylint                     | black, ruff             |

- 왜 Fomatter 마다 스타일이 다를까?
  - PEP 8은 파이썬의 "스타일 가이드"이긴 하지만, 모든 포맷팅 세부사항(줄바꿈, 괄호 배치, 긴 식 처리 등)에 대해 엄밀하게 규정하지 않습니다.
  - PEP 8이 “공백 4칸 들여쓰기”나 “한 줄에 79자 이하” 같은 기본 규칙만 정할 뿐, 포맷터마다 해석하거나 구현하는 방식이 다릅니다.

### Comment & Docstring
- comment
```python
# 이것은 한 줄 주석입니다.
x = 10  # 변수 x에 10을 할당
```
- docstring
  - Python에서 공식 문서화 가능
  ```python
  def add(a, b):
      """
      두 수를 더해서 반환하는 함수.
      :param a: 첫 번째 숫자
      :param b: 두 번째 숫자
      :return: 두 수의 합
      """
      return a + b

  print(add.__doc__)
  ```
  - 예시
  ![Untitled](../assets/img/post/python_clean_code_1.png)

# 2장. 파이썬스러운 코드

# 3장. 좋은 코드의 일반적인 특징
# 4장. SOLID 원칙
# 5장. 데코레이터를 사용한 코드 개선
# 6장. 디스크립터로 더 멋진 객체 만드릭
# 7장. 제너레이터, 이터레이터 및 비동기 프로그래밍
# 8장. 단위 테스트와 리팩토링
# 9장. 일반적인 디자인 패턴
# 10장. 클린 아키텍처
