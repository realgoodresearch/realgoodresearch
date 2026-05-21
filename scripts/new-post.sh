#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: scripts/new-post.sh \"Post Title\""
  exit 1
fi

title="$1"
date_stamp="$(date +%F)"
slug="$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g; s/-\{2,\}/-/g; s/^-//; s/-$//')"
target="news/posts/${slug}.qmd"

if [ -e "$target" ]; then
  echo "File already exists: $target"
  exit 1
fi

cat > "$target" <<EOF
---
title: "$title"
date: $date_stamp
description: ""
image: ""
---

::: {.post-shell}

Write your post here.

:::
EOF

echo "Created $target"
