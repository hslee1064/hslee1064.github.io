---
layout: post
title: "ArgoCD with Git Crypt"
date: 2025-04-07
description: "ArgoCD에서 Git Crypt 사용하는 방법 정리"
excerpt: ""
tags:
- Git
comments: true
---

### How to make argocd plugin with git-crypt unlock
- gpg 키 생성 (비밀번호가 없어야 ArgoCD 등록에 문제가 없음)
```bash
gpg --batch --generate-key <<EOF                                   
Key-Type: RSA
Key-Length: 4096
Name-Real: name
Name-Email: email
Expire-Date: 0
%no-protection
%commit
EOF
```

- gpg 키 조회
```bash
gpg --list-secret-keys --keyid-format LONG
```

- git-crypt add user
```bash
git-crypt add-gpg-user
# rsa4096/{key_id} -> key_id 확인
```

- gpg fingerprint 확인
```bash
gpg --with-colons --fingerprint ${key_id}
# fpr::::{fingerprint}: -> fingerprint 확인
```

- gpg private 키 생성
```bash
gpg --export-secret-keys --armor {key_id} > gpg-private.key
base64 -w0 gpg-private.key
```

- gpg-secret.yaml 생성
```bash
apiVersion: v1
kind: Secret
metadata:
  name: git-crypt-gpg-key
  namespace: argocd
type: Opaque
data:
  gpg-private.key: {}
  # base64로 인코딩된 gpg private key
```

- gpg-key mount

- ArgoCD plugin 생성
```bash
configManagementPlugins:
  - name: git-crypt-helm
  init:
      command: [sh, -c]
      args:
      -
```