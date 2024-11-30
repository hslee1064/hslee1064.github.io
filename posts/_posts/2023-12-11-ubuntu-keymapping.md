---
layout: post
title: "Ubuntu Keyboard Mapping"
date: 2023-12-11
description: "회사에서 맥은 안주고 윈도우는 보안도 너무 많아서 우분투 세팅"
excerpt: ""
tags:
- Ubuntu
comments: true
---
### Abstract
- 회사에서 맥은 안주고 윈도우는 보안도 너무 많아서 우분투 세팅 시작
- 우분투를 맥과 똑같은 환경으로 만드는 것을 목표로 함

### Capslock to 한영
- 설정 -> 키보드 -> 입력 소스 -> 한국어 -> 언어 전환 변경

### 키크론 VIA
- https://keychron.kr/via/
- Pro 버전 구입하여 VIA 이용하여 키매핑
    - Ctrl -> Alt
    - Win -> Ctrl
    - Alt -> Ctrl
- 이 설정만으로도 웬만한 커맨드는 맥과 유사해짐
- 이제 Alt + C로 Process Interupt를 걸고 싶음

### 키보드 바로가기 설정
- 설정 -> 키보드 -> 바로 가기 보기

### 터미널 바로가기 설정
- 복사: Ctrl + c
- 붙여넣기: Ctrl + v

### 키매핑 - stty, keybind
- stty, keybind 등을 적용하고자 함 
- stty: http://coffeenix.net/doc/shell_programming/shell542.html
- Keybind: https://github.com/rothgar/mastering-zsh/blob/master/docs/helpers/bindkey.md
```bash
# ~/.zshrc
stty intr '^c'
bindkey -s '^[c' '^c'
```
- 결론적으로는 둘 다 잘 안됨

### 키매핑 - keyd
- keyd 설치
- https://github.com/rvaiya/keyd
```bash
# /etc/keyd/default.conf
[ids]
*

[main]
leftalt = oneshot(alt)

[alt:C]
c = C-S-c
```

### 키보드 타이핑 속도 변경
- xset 이용했고 체감상 185 정도가 타이핑 속도 대비 키에러 가장 적은 느낌
```bash
xset r rate 185
```