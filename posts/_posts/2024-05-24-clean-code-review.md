---
layout: post
title: "클린코드 리뷰"
date: 2024-05-24
description: "회사에서 클린코드 리뷰가 필요해서 정리"
excerpt: ""
tags:
- Programming
comments: true
---

![Untitled](../assets/img/post/clean_code_0.png)

# 0장. 개요
- Abstract
    - 로버트 C. 마틴 지음
    - 2013년 12월 24일 출간
    - Java 기반 책
- Reference
    - 슬기로운 개발생활:티스토리, https://dev-coco.tistory.com/182
    - lotd.log, [https://velog.io/@think2wice/Spring-의존성-주입DI에-대하여](https://velog.io/@think2wice/Spring-%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%A3%BC%EC%9E%85DI%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)
    - kai6666.log, [https://velog.io/@kai6666/Spring-Spring-AOP-개념](https://velog.io/@kai6666/Spring-Spring-AOP-%EA%B0%9C%EB%85%90)
    - …
- tl;dr
    - 중복을 피하라
    - 한 기능만 수행하라
    - 제대로 표현해라
    - 작게 추상화 해라

# 1장. 깨끗한 코드

### **나쁜 코드**

- 나쁜 코드가 쌓일수록 생산성은 떨어진다.

![Untitled](../assets/img/post/clean_code_1.png)

### **비야네 스트롭스트룹(c++ 창시자)**

- 나는 우아하고 효율적인 코드를 좋아한다.
- 논리가 간단해야 버그가 숨어들지 못한다.
- 깨끗한 코드는 한 가지를 제대로 한다.

### 보이스카우트 교훈

- 보이 스카웃에는 "언제나 처음 왔을 때보다 깨끗하게 해놓고 캠프장을 떠날 것"이라는 규칙이 있습니다.
- 처음 왔을 때보다 더 나은 세상을 만들고 떠나려 노력하라
- 처음 왔을때 보다 더 깨끗한 코드를 놓고 가자

### **네이밍 규칙**

- **카멜(camelCase)**
- **케밥(kebab-case)**
- **파스칼(PascalCase)**
- **스네이크(snake_case)**

## 2장. 의미 있는 이름

### 변수명

```java
// Too Much 축약어 금지
int t; et;

// 해석하기 힘든 형태 금지
int O = 0

// 발음하기 어려운 단어 금지
int genymdhms = "generate date, year, month, day, ..."

// 검색하기 쉬운 이름 사용
int MAX_CLASSES_PER_STUDENT = 1

// 멤버 변수(m_)라는 것을 굳이 표시 안해도 됨
class Person(){
	int m_dsc = ""
}

// 자신의 기억력을 자랑하지 마라
int a
int b
int c
```

### 변수명에 대한 개인 의견

```java
// 한글 발음 금지
int saranghe = 1

// 자주 사용하는 형태의 축약어는 적절히 사용
int doc_id
String doc_dsc
```

### 함수명

- 명사나 명사구가 적합
- Customer, WikiPage

### 메서드 이름

- 동사나 동사구가 적합
- postPayment, deletePage

### 클래스 및 인스턴스 이름

```
// 두 번째 인자가 무엇을 의미하는지 파악 불가
product = new Product("사과", 10000);

// 두 번째 인자가 무엇을 의미하는지 파악 가능
product = Product.withPrice("사과", 10000)
product = Product(name="사과", price=10000)
```

## 3장. 함수

### 작게 만들어라! 한 가지만 해라!

- 함수는 하나의 역할만 해야한다.
- 함수 크기는 한 화면을 절대 넘기지 마라.
- 함수 크기 베스트는 함수 하나당 3~4줄이다.
- if, for의 들여쓰기(중첩)는 2단을 넘어가면 안된다.
- 서술적인 이름을 써라. (e.g. getSomething, setSomething, …)


- 함수 인수는 3~4개 이상은 오바이다.
    
    ```python
    runMultiprocess(dataset, rag, prompt, something, blahblah, …)
    ```
    
    - **Python은 keyword args가 가능하여 어느정도는 괜찮다고 본다.**
- 입력과 출력에 대한 명확한 명시가 좋다.
    
    ```python
    def isVaildDataset(dataset: Dataset, size: int) -> bool:
    	...
    ```
    
- 명령과 조회를 분리해라 **- Command Query Seperation(CQS) 원칙**
    
    ```python
    def setDataset(dataset) -> None:
    	...
    ```
    
    ```python
    def getDataset(dataset) -> Dataset:
    	...
    ```
    

- 오류 코드보다 예외를 사용하자
    
    ```python
    def getDataset(dataset) -> Dataset:
    	if error:
    		return ERROR_CODE
    	
    def getDataset(dataset) -> Dataset:
    	if error:
    		raise Exception("Some kind of error occured!")
    ```
    

- Try/Catch는 코드가 추하다. 함수로 뽑아내자

### 함수에 대한 개인 의견

- **함수가 작아지고 명칭이 명확해지면 가독성이 높아진다.**
- **하지만 함수의 호출 깊이가 깊어져 전체 구조를 파악하기 어려워지기도 한다.**
- **상황에 맞게 함수의 크기를 줄여가는게 좋다고 생각합니다.**

## 4. 주석

나쁜 코드에 주석을 달지 마라. 새로짜라.

- 브라이언 커니핸, 프린스턴 대학 컴퓨터과학과 교수

```python
# 직원에게 복지 혜택을 받을 자격이 있는지 검사
if ((employee.flags and HOURLY_FLAG) and employee.age > 65)):
	...
	
if employee.isEligibleForFullBenefits:
	...
```

### 좋은 주석

- 법적인 주석
    
    ```python
    # Copyright (C) 2003, 2004, ... by Object Mentor, Inc, All rights reserved.
    # GNU General Public
    # Apache Licence
    # ...
    ```
    
- 정보를 제공하는 주석
    
    ```python
    # kk:mm:ss EEE, dd, yyyy 형식
    Pattern timeMatcher = Pattern.compile("\\d*:\\d*\\d* \\w*, \\w* \\d*, \\d*)
    ```
    
- 의도를 설명하는 주석
    ```python
    # 각 프로세스들이 모두 완료되어 파일들로 저장되기까지 대기, 디폴트 3시간 타임 아웃
    time_count = 0
    while not all(os.path.isfile(filename) for filename in result):
        if time_count < args.timeout:
            time.sleep(1)
            time_count += 1
            if time_count % 60 == 0:
                print(time_count // 60, "mins waiting for results...")
        else:
            raise Exception("Timeout error")
    ```
    
- 의미를 명확하게 밝히는 주석
    
    ```java
    assertTrue(a.compareTo(a) == 0) // a == a
    assertTrue(a.compareTo(b) != 0) // a != b
    ...
    ```
    
- 결과를 경고하는 주석
    
    ```python
    # 로컬에서 멀티프로세싱을 실행할 경우 CPU 부족으로 다른 애플리케이션에 영향을 줄 수 있음
    processes = os.cpu_count()
    with mp.Pool(processes) as pool:
      for i in range(processes):
          r = pool.apply_async(start_worker, args=(i, _input_list[i]))
    ```
    
    ```java
    public static SampleDateFormat makeStandardHttpDateFormat(){
    	// SimpleDateFormat은 스레드에 안전하지 않다
    	// 따라서 각 인스턴스를 독립적으로 생성해야한다.
    	SimpleDateFormat df = new SimpleDateFormat("...")
    	...
    }
    ```
    
- TODO 주석
    
    ```python
    #TODO: Langchain Hang 문제 해결 필요
    answer = agent_executor.invoke({"input": question})["output"]
    ```
    
    - **개인적으로 TODO 주석도 좋지만 Jira 이슈로 관리하면 좋다고 생각한다.**

### 나쁜 주석

- 주절거리는 주석
    
    ```python
    try:
    	answer = agent_executor.invoke({"input": question})["output"]
    except:
    	# agent가 실행 도중 문제가 생겼다는 의미이다.
    ```
    
- 같은 이야기 중복하는 주석
    
    ```python
    # 중복 에러 처리
    def duplicatedException():
    	...
    	
    # 존재 하지 않는 에러 처리
    def notFoundException():
    	...
    	
    # 내 에러 처리
    def myException():
     ...
    ```
    
- 오해할 여지가 있는 주석
- 의무적으로 다는 주석
    
    ```python
    # Parameter prompt: 프롬프트 내용
    # Parameter rag_result: RAG 결과
    # ...
    def Langchain(prompt str, rag_result str, ...):
    	...
    ```
    
- 이력을 기록하는 주석
    
    ```python
    # 11-Oct-2024: 클래스 생성
    # 14-Oct-2024: 클래스 ~~ 수정
    # 17-Oct-2024: 클래스 ~~ 수정
    def Langchain(prompt str, rag_result str, ...):
    	...
    ```
    
- 있으나 마나 한 주석
    
    ```python
    class Langchain(prompt str, rag_result str, ...):
    	def __init__():
    		# 생성자
    		...
    ```
    
    - 함수나 변수로 표현할 수 있다면 주석을 달지 마라
- 위치를 표시하는 주석
    
    ```python
    ################## Langchain ##############
    ```
    
- 닫는 괄호에 다는 주석
    
    ```python
    for ... in range():
    	...
    	...
    	# 탐색 종료
    ```
    
- 공로 표시 / 저자 표시
    
    ```python
    # 클래스 만든 사람: 이현식
    class Evaluation(Result):
    	def __init__():
    		# 생성자
    		...
    ```
    
- 주석으로 처리한 코드
    - 나중에 쓸 코드일 수 있어서 남겨놓는 경우가 있지만 실제로 사용되는 경우는 적음
    - 쓸데없는 코드가 계속 쌓이게 되어 좋지 않음
- HTML 주석
    
    ```python
    # <br>
    # <b> blahblah </b>
    # ...
    ```
    
- 전역 정보
    - 하나의 함수에 대한 정보만 입력하자
- 너무 많은 정보
- 모호한 관계

### 주석에 대한 개인 의견

- **결국 모든 문서는 길든 짧든 상대가 잘 이해할 수 있게 쓰자**
- **PR 리뷰때 주석에 대한 부분들도 Comment 해주면 좋겠다**

## 5. 형식 맞추기

### 가로

- 밀집도
    - 기존: 80~120자
    - **~~4K 모니터도 나오는 세상에 몇 글자가 적당할지는…~~**
- 정렬

```java
// 적절
Private   Socket       socket;
Private   InputStream  istream;
Private   OutputStream ostream;

// 부적절
socket   =  this.socket;
istream  =  this.output_stream;
```

- 한 줄 코딩은 “지양” 하자

### 세로

- 밀접한 개념들은 근처에 배치하자

### 팀규칙

- 팀내 코드 읽기 편한 구조에 대해 논의하고 합의해라

## 6. 객체와 자료 구조

- 자료 추상화 - 구현을 숨겨라

![Untitled](../assets/img/post/clean_code_2.png)

- **디미터 법칙**
    - 모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다.
    - 객체는 자신의 내부 구조를 숨기고 함수를 통하여 기능을 공개해야 한다.
    - 다음 코드는 메소드 체이닝을 통해 메소드가 반환하는 객체의 내부 구조에 접근하므로 디미터 법칙을 위반한다.
        
        ```java
        String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
        ```
        
    - 위 코드는 다음과 같이 변환하는 것이 바람직하다.
        
        ```java
        Options opts = ctxt.getOptions();
        File scratchDir = opts.getScratchDir();
        String outputDir = scratchDir.getAbsolutePath();
        ```
        

## 7. 오류 처리

오류 코드를 반환하면 그에 따른 분기가 생기고, 또 분기가 필요한 경우엔 중첩되기 마련이다.

```java
public Status deletePage(Page page) {
	if(deletePage(page) == E_OK) { // (1)
		if(registry.deleteReference(page.name) == E_OK) { // (2)
			if(configKeys.deleteKey(page.name.makeKey()) == E_OK) { // (3)
				log.info("page deleted");
				return E_OK;
			} else { // (3)
				log.error("config key not deleted");
			}
		} else { // (2)
			log.error("reference not deleted");
		}
	} else { // (1)
		log.error("page not deleted");
	}
	return E_ERROR;
}
```

여기서 오류 코드 대신 각 함수에서 예외를 사용하면 코드를 더욱 간결하게 작성할 수 있다.

```java
public void deletePage(Page page) {
	try {
		deletePage(page);
		registry.deleteReference(page.name);
		configKeys.deleteKey(page.name.makeKey());
	} catch (Exception e) {
		log.error(e.getMessage());
	}
}
```

여기서 deletePage 함수에 try-catch 블록이 생기게 되는데 아래와 같이 분리하여 deletePage 함수는 오류 처리 역할만 맡기고, deletePageAndAllReferences 함수는 페이지 제거하는 역할만 맡길 수 있다.

```java
public void deletePage(Page page) {
	try {
		deletePageAndAllReferences(page);
	} catch (Exception e) {
		log.error(e.getMessage());
	}
}

public void deletePageAndAllReferences(Page page) throws Exception {
	deletePage(page);
	registry.deleteReference(page.name);
	configKeys.deleteKey(page.name.makeKey());
}
```

- parameter 값으로 null 전달하지 마라

## 8. 경계

- 외부 라이브러리와 내 코드의 경계를 잘 나누자
- 외부 라이브러리의 작동을 테스트 하는 코드를 짜자

## 9. 단위테스트

- TDD(Test-Driven Development)는 실제 코드를 짜기 전에 단위 테스트를 먼저 작성하는 기법으로,이를 통해 유연성, 유지보수성, 재사용성을 제공받는다.
- TDD의 핵심 규칙 3가지는 다음과 같다.
    - 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다.
    - 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성한다.
    - 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다.
- 테스트 코드가 없다면 실제 코드를 변경할 때 잠정적인 버그가 발생할 수 있음을 내포하지만,테스트 코드가 있다면 변경된 코드를 검증함으로써 이를 해결할 수 있다.
- 그리고 실제 코드가 변경되면 테스트 코드 역시 변경 해주어야 하는데, 이러한 이유로 테스트 코드 역시 가독성 있게 작성하는 것이 중요하며, 테스트 코드를 작성할 때에는 다음 내용을 준수하는 것이 좋다.
    - 테스트 함수 하나당 한 개념만을 테스트하라.
    - 한 개념 당 assert문의 수를 최소화하라.
    - 깨끗한 테스트 코드는 F.I.R.S.T라는 5가지 규칙을 따른다.
        - Fast : 테스트는 빠르게 동작해야 한다.
        - Independent : 각 테스트는 서로 의존해선 안되며, 독립적으로 그리고 아무 순서로 실행해도 괜찮아야 한다.
        - Repeatable : 테스트는 어떤 환경에서도 반복 가능해야 한다.
        - Self-Validating : 테스트는 성공 또는 실패로 bool 값으로 결과를 내어 검증해야 한다.
        - Timely : 테스트는 적시에 즉, 테스트하려는 실제 코드를 구현하기 직전에 구현해야 한다.

## 10. 클래스

- 공개와 비공개
- 캡슐화
- 클래스는 작아야한다!
- 추상클래스를 잘 활용하자
- 요구사항은 수시로 변할 수 있다. 그렇기 때문에 변경하기 쉬운 클래스를 만드는 것은 중요하다.변경하기 쉬운 클래스는 기본적으로 단일 책임 원칙을 지키며, 구현체보다는 추상체에 의존한다.

```java
public class Sql {
	public Sql(String table, Column [] columns)
	public String create()
	public String insert(Object [] fields)
	public String select(Column column, String pattern)
	public String select(Criteria criteria)
	private String valuesList(Object[] fields, final Column[] columns)
}
```

- 위 예시 코드는 새로운 SQL문을 생성하거나 select 문에 내장된 select 문을 지원할 때, 기존 SQL문을 수정할 때 등Sql 클래스를 고쳐야 하므로 단일 책임 원칙을 위반한다.

```java
abstract public class Sql {
	public Sql(String table, Column[] columns)
	abstract public String generate();
}

public class CreateSql extends Sql {
	public CreateSql(String table, Column[] columns)
	@Override public String generate()
}

public class SelectSql extends Sql {
	public SelectSql(String table, Column[] columns)
	@Override public String generate()
}

public class InsertSql extends Sql {
	public InsertSql(String table, Column[] columns, Object[] fields)
	@Override public String generate()
	private String valuesList(Object[] fields, final Column[] columns)
}
	
public class SelectWithCriteriaSql extends Sql {
	public SelectWithCriteriaSql(String table, Column[] columns, Criteria criteria)
	@Override public String generate()
}

public class SelectWithMatchSql extends Sql {
	public SelectWithMatchSql(String table, Column[] columns, String pattern)
	@Override public String generate()
}
```

- 변경하기 쉬운 클래스를 만들기 위해 단일 책임 원칙을 지키며 추상 클래스와 상속을 활용한 예시이다.
- 클래스의 역할을 더 명확하게 분리하여 유연성과 확장성이 높아진다.
- 그리고 새로운 요구사항이나 변경이 발생했을 때 특정 부분만 수정하거나 확장하는 작업이 더 효율적이게 된다.

## 11. 시스템

- 시스템 제작과 시스템 사용을 분리하라
    
    ![Untitled](../assets/img/post/clean_code_3.png)
    
    ![Untitled](../assets/img/post/clean_code_4.png)
    
    ![Untitled](../assets/img/post/clean_code_5.png)
    

- Spring 의존성 주입
    - 생성자 주입
        - 생성자 주입은 클래스의 생성자를 통해서 의존성을 주입해주는 방식
        
        ```java
        @Controller
        public class PetController{
        
            private final PetService petService;
        
        	@Autowired
            public PetController(PetService petService){
            	this.etService = petService;
            }
        }
        ```
        
    - 필드주입
        - 필드 주입은 클래스에 선언된 필드에 생성된 객체를 주입해주는 방식
            
            ```java
            @Controller
            public class PetController{
            	@Autowired
                private PetService petService;
            }
            ```
            
    - 수정자 주입
        
        
- Spring AOP(관점 지향 프로그래밍)
    - AOP는 **관점(Aspect)지향 프로그래밍**으로, 관점을 기준으로 다양한 기능을 분리하여 보는 프로그래밍이다. 관점(Aspect)이란, **부가 기능과 그 적용처를 정의하고 합쳐서 모듈로 만든 것**이다.
    - OOP와 이름이 비슷하여 상반된 개념 같지만, 관점지향 프로그래밍은 객체지향 프로그래밍을 **보완**하기 위해 쓰인다. 기존 객체(Object) 지향은 목적에 따라 클래스를 만들고 객체를 만들었다. 따라서 핵심 비즈니스 로직이든, 부가 기능의 로직이든 하나의 객체로 분리하는데 그치고, 그래서 이 기능들을 어떻게 바라보고 나눠쓸지에 대한 정의가 부족하다는 단점이 있다.
        
        ![Untitled](../assets/img/post/clean_code_6.png)
        

- POJO
    - POJO란 Plain Old Java Object의 약자로, 이를 직역하면 순수한 오래된 자바 객체이다.
    - IoC, AOP, PSA가 핵심
        - IoC: Inversion of Control
        - AOP: Aspect-oriented Programming
        - PSA: Portable Service Abstraction
        
        ![Untitled](../assets/img/post/clean_code_7.png)
        
    
- TDD
    
    ![Untitled](../assets/img/post/clean_code_8.png)
    
    - TDD는 Test Driven Development의 약자로 켄트백이 1999년 익스트림 프로그래밍의 일부로 제안
    - TDD는 세 가지 단계가 한 사이클
        - 테스트를 작성한다(빨간 막대)
        - 실행 가능하게 만든다(초록 막대)
        - 올바르게 만든다(파란 막대)
    

## 12. 창발성

- **창발성이란?**
    - **emergent property: 불시에 솟아나는 특성**
    - **하위 계층에는 없는 특성이나 행동이 상위 계층(전체 구조)에서 자발적으로 돌연히 출연하는 현상**
    - **작은 요소들의 상호작용의 반복이 전체구조에 영향을 미친다**
- 창발성 4대원칙
    - 모든 테스트를 실행한다
    - 중복을 없앤다
    - 프로그래머 의도를 표현한다.
    - 클래스와 메서드 수를 최소로 줄인다.
- 이전 내용과 중복되는 부분이 많아 생략

## 13. 동시성

- 동시성과 깔끔한 코드는 양립하기 어려움
- 동시성의 장단점
    - Pros: 빨라짐
    - Cons: 복잡해짐, 일부 쓰레드에서 문제가 생기면 디버깅이 어려움
- 동시성 방어원칙
    - 단일책임: 동시성 코드는 무조건 다른 코드와 분리해라
    - 임계영역을 Synchromnized로 관리
    - Deep Copy하여 임계영역을 최소화
    - 그 외 OS 수업시간에 배웠던 그 내용들 조심하기…
        - Deadlock, 밥 먹는 철학자들 등등
- 메서드 사이에 의존성을 이해하라
- 동기화 부분을 작게 만들어라
- 올바른 종료코드를 넣자 (데드락 걸린 쓰레드만큼 골치 아픈게 없다)
- 쓰레드 코드 테스트를 자주하자
- 싱글 쓰레드부터 제대로 돌게하자
- OS 디펜던시가 있을 수도 있다
- 강제로 실패를 일으켜서 디버깅해라
- 결론: 동시성 이슈는 매우 어려운 문제이니 조심히 짜자
- **VSCode를 이용하면 멀티프로세싱 상황에서도 디버깅할 수 있다**
- **FastAPI Async**
    ![Untitled](../assets/img/post/clean_code_9.png)
        

## 14. 점진적인 개선

- 관심사를 분리하면 코드를 이해하고 보수하기 쉬워진다
- SRP(Single Responsibility Principal) 잘 지키자

## 15. JUnit

- Java unit test 프레임워크
- **TDD와 Pytest 도입을 고려해보자**
- 파이썬과 관련이 없어 생략
    
    

## 16. SerialDate 리팩터링

- Java JCommon 라이브러리의 date 패키지에 대한 이야기
- 파이썬과 관련이 없어 생략
    
    

## 17. 냄새와 휴리스틱

- 앞서 이야기한 내용들 + [Refactoring](마틴 파울러) 정리
- **아래 내용들은 하지 말자**
- 주석
    - 부적절한 정보
    - 쓸모 없는 주석
    - 중복된 주석
    - 성의 없는 주석
    - 주석 처리된 코드
- 환경
    - 여러 단계로 빌드
    - 여러 단계로 테스트
- 함수
    - 너무 많은 인수
    - 출력 인수 - **함수 호출시 입력 형태로만 넣고 출력 형태는 지양**
    - 플래그 인수 - **함수가 여러 일을 한다는 증거**
    - 죽은 함수 - **사용 안되는 함수**
- 일반
    - 한 소스 파일에 여러 언어를 사용한다 - **~~(Azure APIM Policy Expression(XML + C#)도 문제라는 건가…)~~**
    - 당연한 동작을 구현하지 않는다 - **함수 이름을 명확히 지어라**
    - 경계를 올바로 처리하지 않는다 - **모든 케이스를 테스트할 수 있게 테스트 코드를 짜라**
    - 안전 절차 무시 - **테스트 무시하지 마라**
    - 중복 - **중복 코드는 항상 지양해라**
    - 추상화 수준이 올바르지 못하다 - **고차원과 저차원의 명확한 분리**
    - 기초 클래스가 파생 클래스에 의존한다
    - 과도한 정보 - **작게 만들기**
    - 죽은 코드 - **실행되지 않는 코드 제거**
    - 수직 분리 - **함수에서 사용되는 변수는 위치를 가깝게**
    - 일관성 부족 - **네이밍은 일관성 있게**
    - 잡동사니 - **비어있는 생성자**
    - 기능 욕심 - **하나의 여러 기능 넣지 말자**
    - 선택자 인수 - **3항 연산자 쓰지말자**
    - 모호한 의도 - **한 줄 코딩 하지말자**
    - 잘못 지운 책임 - **함수를 아무데나 놓지말고 적절한 클래스 아래 배치하자**
    - 부적절한 static 함수 - **전역 선언 지양하자**
    - 서술적 변수 - **알고있는 개념들을 순서대로 정의 key, value, …**
    - 이름과 기능이 일치하는 함수 - **함수 이름 제발 잘 짓자**
    - 알고리즘을 이해하라 - **알고리즘 고민하고 코드 짜기**
    - if/Else 보다 다형성을 사용하라 - **자식클래스 많이 만들어서 쓰자**
    - 표준 표기법을 따르라
    - 매직 숫자를 명명된 상수로 교체해라 - **~~PI=3.14~~ 말고 math.pi 쓰자**
    - 정확하라 - **함수 실행 결과 예정된 List가 아닌 None 반환될 수도 있다**
    - 관례보다 구조를 사용하라 - **하던대로 하지말고 책에서 말하는대로 해라**
    - 조건을 캡슐화하라 - **Boolean 리턴 함수는 is/has로 시작하기 isHandsome(hyunsik)**
    - 부정 조건은 피하라 - **isNotHandsome(hyunsik) 쓰지 말기**
    - 함수는 한가지만 해야 한다 - ~~(**이제 그만 말하셔도…)**~~
    - 숨겨진 시간적인 결합 - **인수 위치를 적절히 배치해 함수가 호출되는 순서를 명확히 하자**
    - 일관성을 유지하라 - **클래스간 호출 구조를 명확히 하자**
    - 경계 조건을 캡슐화하라 - **같은 if 조건 여러번 나오게 하지 말자**
    - 함수는 추상화 수준을 한 단계만 내려가야 함 - **함수 내 모든 문장은 추상화 수준이 동일하게 유지하자**
    - 설정 정보는 최상위 단계에 둬라
    - 추이적 탐색을 피하라 - **A가 B참조, B가 C참조하고 있지만 A는 C를 몰라도 되도록 하기**
- 이름
    - 서술적인 이름 사용
    - 적절한 추상화 수준에서 이름을 선택
    - 표준 명명법 사용
    - 명확한 이름
    - 긴 번위는 긴 이름을 사용하라
    - m_ 접두어 사용 금지
- 테스트
    - 불충분한 테스트
    - 커버리지 도구를 사용하라
    - 사소한 테스트를 건너뛰지 마라
    - 무시한 테스트는 모호함을 뜻한다
    - 경계 조건을 테스트하라
    - 버그 주변을 철저히 테스트하라
    - 실패 패턴을 살펴라
    - 테스트 커버리지 패턴을 살펴라
    - 테스트는 빨라야 한다