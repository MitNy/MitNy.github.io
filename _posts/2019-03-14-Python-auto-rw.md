---
layout: post
title: ! "[Python] 엑셀 데이터 파싱 후 MySQL Insert 하기"
categories: [Python]
excerpt: " "
comments: true
share: true
tags:
  - Python
  - Excel
  - MySQL
---

지금까지 동아리 페이지 관리에 필요한 데이터들을 직접 Insert 쿼리를 넘겨 저장해왔는데,
후배들을 위해 자동화 프로그램을 만들게 되었다.

![]({{ site.baseurl }}/assets/posts/python/excel_table.png)

이런 형식을 가진 엑셀 파일이 매 학기마다 만들어진다.
이 데이터 중 테이블에 필요한 학번, 이름 정보만 파싱해 저장할 것이다.
저장된 데이터는 MySQL connector를 통해 특정 테이블에 Insert 한다.

```py
# -*- coding: utf-8 -*-

import openpyxl
import mysql.connector
import os
import sys

result = []

# 엑셀 데이터를 tuple 형식으로 저장 학번이 201600000 일 경우 16만 저장하도록 파싱 
def excel_to_list(filename):
	wb = openpyxl.load_workbook(filename)
	ws = wb.active
	tmp_data = []
	for r in ws.rows:
		name = r[1].value
		stuNum = r[2].value

		if name is not None and str(stuNum).isdigit():
			tmp_data.append(str(stuNum)[2:4])
			tmp_data.append(name)
		if len(tmp_data) == 2:
			result.append(tuple(tmp_data))
			tmp_data = []

# mysql 테이블에 튜플 데이터 삽입
def mysql_insert(db,table,data):
	try:
		cursor = db.cursor()
		sql = "INSERT INTO "+table+" (stuNum,name) VALUES (%s, %s)"
		cursor.executemany(sql,data)
		db.commit()
		print("[+] Insertion success\n")
	except:
		print("[ERROR] Insertion failed\n")

# mysql 테이블의 기존 데이터를 삭제
def table_clear(db,table):
	try:
		cursor = db.cursor()
		cursor.execute("TRUNCATE TABLE "+table)
	except:
		print("[ERROR] Truncate failed\n")

# 파일이 존재하는지 체크
# return : True or False
def fileCheck(filename):
	return os.path.isfile("./"+filename)

def main():
	db = mysql.connector.connect(
		host="localhost",
		user="root",
		passwd="",
		database=""
	)
	print("* * * * * * 세미나 랜덤지목 데이터 삽입 자동화 프로그램* * * * * *")
	print("[*] exit 입력 시 종료됩니다.")
	print("[*] 엑셀 파일은 .py 파일과 같은 디렉토리에 존재해야 합니다.")
	print("[*] 테이블이 존재하지 않을 경우 생성 후 가능합니다.\n")
	while True:
		filename = input("1. 엑셀 파일명 입력 : ")
		if fileCheck(filename) is True:
			table = input("3. 데이터베이스 테이블명 입력 : ")
			excel_to_list(filename)
			answer = input("[*] 테이블 내 기존 데이터가 삭제됩니다. 진행하시겠습니까? (Y,n) : ")
			if answer == "Y":
				table_clear(db,table)
				mysql_insert(db,table,result)
				break
			else:
				continue
		elif filename == "exit":
			db.close()
			sys.exit(1)
		else:
			print("[ERROR] 파일이 존재하지 않습니다.")
			continue
		print("\n")

	sys.exit(1)

if __name__ == "__main__":
    main()
```

1. .py 파일과 엑셀 파일을 같은 경로에 놓는다.
2. 엑셀 파일명을 입력한다.
3. 엑셀 데이터를 넣을 테이블명을 입력한다.
4. Y를 입력하면 MySQL truncate, insert 명령 실행


