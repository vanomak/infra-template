#!/usr/bin/bash
tag1=$(git tag --sort=-version:refname | head -1)
tag2=$(git tag --sort=-version:refname | head -2 | tail -1)
git log --pretty=format:"Ответственный за релиз: %an%n" | head -1
echo "коммиты, попавшие в релиз: "
git log --pretty=format:"%H %an %s%n" $tag2...$tag1
