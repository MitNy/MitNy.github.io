---
layout: post
title: ! "[Python] 학과 홈페이지 크롤링"
categories: [Python]
excerpt: " "
comments: true
share: true
tags:
  - Python
  - BeautifulSoup
  - crawling
---

학과 홈페이지에 좋은 정보가 게시되는데 항상 학과 홈페이지에 접속하긴 번거로워서 알림 앱을 만들기 위한
데이터 수집 및 저장용 크롤러를 제작하였다.

#### Target
충남대학교 컴퓨터융합학부(前 컴퓨터공학과) 공지사항 > 취업정보

#### Used
- Python 3.5.2
- BeautifulSoup module
- Firebase

취업정보 게시판에 올라오는 글들
![](/assets/posts/python/posting_data.png)

```py
import requests
import re
from bs4 import BeautifulSoup
import datetime
from firebase import firebase
import threading

firebase = firebase.FirebaseApplication('https://***.firebaseio.com/', None)

def get_job_post():
	print("[+] parser is running...\n")
	url = "http://computer.cnu.ac.kr/index.php?mid=job"
	request = requests.get(url)

	html = request.text
	soup = BeautifulSoup(html,"html.parser")

	table = soup.find("tbody")

	#title_data = []
	#time_data = []
	# 타이틀만 가져옴
	#for t in table.find_all("a"):
	#	text_data = t.get_text().replace("\t","")
	#	for i in text_data.split("\n"):
	#		if i is not "":
	#			title_data.append(i)
	
	# 시간만 가져옴
	#for t in table.find_all("td",["time"]):
	#	text_data = t.get_text()
	#	for i in text_data.split("\n"):
	#		if i is not "":
	#			time_data.append(i)

	# time/title 태그 파싱
	parse_data = []
	for t in table.find_all("td",["title","time"]):
		text_data = t.get_text().replace("\t","")
		for i in text_data.split("\n"):
			if i is not "":
				parse_data.append(i)

	# time/title key 딕셔너리 생성 후 리스트에 넣음
	result = []
	dic_data = {}
	for i in range(0,len(parse_data)):
		regex = re.compile(r"([12]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01]))") # YYYY.mm.dd 포맷 정규식
		m = regex.match(parse_data[i])
		if m: # 날짜 포맷과 일치할 경우 time(key)에 value 저장
			dic_data["time"] = m.group()
		else: # 일치하지 않을 경우title(key)에 value 저장
			dic_data["title"] = parse_data[i]

		if len(dic_data) == 2: # time/title 딕셔너리가 완성되면 result에 저장 후 딕셔너리 초기화
			result.append(dic_data)
			dic_data = {}

	for i in range(0,len(result)): # Firebase database에 저장
		try:
			firebase.patch("/"+str(i),result[i]) 
		except:
			print("[-] Update Error\n")
	print("[+] Update completed\n")

	threading.Timer(600,get_job_post).start() # 10분마다 반복

def main():
	get_job_post()

if __name__ == "__main__":
	main()
```


Firebase database에 잘 저장되고 있다 :)
![](/assets/posts/python/parsing_data.png)
