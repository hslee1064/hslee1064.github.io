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
# rsa4096/{key_id} -> key_id 확인
git-crypt add-gpg-user
```

- gpg fingerprint 확인
```bash
# fpr::::{fingerprint}: -> fingerprint 확인
gpg --with-colons --fingerprint ${key_id}
```

- gpg private 키 생성
```bash
gpg --export-secret-keys --armor {key_id} > gpg-private.key
base64 -w0 gpg-private.key
```

- gpg-secret.yaml 생성
  {% raw %}
  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: git-crypt-gpg-key
    namespace: argocd
  type: Opaque
  data:
    gpg-private.key: {} # base64로 인코딩된 gpg private key
  ```
  {% endraw %}

- gpg-key mount
  {% raw %}
  ```yaml
  # argocd-repo-server deployment
  ...
  volumes:
    - name: gpg-key
      secret:
        secretName: git-crypt-gpg-key
  volumeMounts:
      name: plugins
      - name: gpg-key
  ...
  ```
  {% endraw %}

- ArgoCD plugin 생성
  {% raw %}
  ```yaml
  # ${fingerpint} 입력
  configManagementPlugins: |
    - name: git-crypt-helm
    init:
        command: [sh, -c]
        args:
        - |
            git reset --hard HEAD && \
            git clean -fd && \
            export GNUPGHOME=/tmp/.gnupg && \
            mkdir -p GNUPGHOME && chmod 700 GNUPGHOME && \
            export GPG_TTY=/dev/null && export GPG_AGENT_INFO= && \
            gpg --no-tty --batch --yes --import /gpg/gpg-private.key && \
            echo "${fingerpint}:6:" | gpg --import-ownertrust && \
            git-crypt unlock || true && \
            git reset --hard HEAD && \
            git clean -fd
    generate:
        command: [sh, -c]
        args:
        - |
            helm dependency build . && \
            helm template . \
            --values values.yaml \
            --debug
  ```
  {% endraw %}
