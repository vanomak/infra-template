#!/usr/bin/env bash
tag1=$(git for-each-ref refs/tags/ --count=2 --sort=-refname | tail -1 | grep -oP -m 1 'rc-[0-9]+.[0-9]+.[0-9]+')
tag2=$(git for-each-ref refs/tags/ --count=2 --sort=-refname | head -1 | grep -oP -m 1 'rc-[0-9]+.[0-9]+.[0-9]+')
#git log $tag2...$tag1
git log --pretty=format:"Ответственный за релиз: %an%n" rc-0.0.5...rc-0.0.4 | head -1 > content.txt
git log --pretty=format:"%H %an %s%n" $tag2...$tag1 >> content.txt
