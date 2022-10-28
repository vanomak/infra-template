#!/usr/bin/bash
tag1=$(git for-each-ref refs/tags/ --count=2 --sort=-refname | head -1 | grep -oP -m 1 'rc-[0-9]+.[0-9]+.[0-9]+')
tag2=$(git for-each-ref refs/tags/ --count=2 --sort=-refname | tail -1 | grep -oP -m 1 'rc-[0-9]+.[0-9]+.[0-9]+')
git log --pretty=format:"Ответственный за релиз: %an%n" $tag1...$tag2 | head -1
git log --pretty=format:"%H %an %s%n" $tag2...$tag1
ls -al
