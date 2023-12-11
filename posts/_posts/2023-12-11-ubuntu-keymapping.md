---
layout: post
title: "Ubuntu Keymapping"
date: 2023-12-11
description: "우분투 키매핑 방법(Terminal Interrupt Key to 'alt+c')"
excerpt: ""
tags:
- Ubuntu
comments: true
---
### Abstract
- 회사에서 맥은 안주고 윈도우는 보안도 너무 많아서 우분투 세팅 시작
- stty, keybind 등을 적용하고자 함

### stty
http://coffeenix.net/doc/shell_programming/shell542.html

### Keybind 특수문자 정보
https://github.com/rothgar/mastering-zsh/blob/master/docs/helpers/bindkey.md

### 

### Alt키 문제
- Alt mapping key가 "^[" 인데 이게 위/아래/왼쪽/오른쪽 키랑침겹침
- 안쓰는 Ctrl+J라는 키를 interrupt키로 만들고 alt+c를 Ctrl+J로 매핑시킴
```
stty intr '^J'
bindkey -s '^[c' '^J'
```