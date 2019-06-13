---
layout: post
title: ! "[Swift] Swift 5 NSTableView 셀 추가하기"
categories: [Swift]
excerpt: " "
comments: true
share: true
tags:
  - Swift
  - NSTableView
---

![]({{ site.baseurl }}/assets/posts/swift/table_storyboard.png)

테이블뷰를 하나 만들어준다.


## Settings

1. Class 지정
![]({{ site.baseurl }}/assets/posts/swift/viewController_class.png)
Scene에 Class를 지정해준다.  class를 정해줘야 Outlet connect가 가능하다.

2. TableView <-> ViewController connect
![]({{ site.baseurl }}/assets/posts/swift/table_to_view.png)

TableView를 control을 누른 상태에서 끌어 View 윗 부분 FileExtract에 놓는다.
그럼 여러가지 선택을 할 수 있는데
![]({{ site.baseurl }}/assets/posts/swift/table_to_view_outlets.png)
dataSource와delegate를 선택한다.

![]({{ site.baseurl }}/assets/posts/swift/tableView_outlets.png)
ViewController 코드에도 outlets를 연결해준다.

3. TableColumn identifier 설정
![]({{ site.baseurl }}/assets/posts/swift/set_identifier.png)
테이블의 각 컬럼에 identifier를 설정해준다.


### ViewController.swift

```swift
import CryptoSwift

class ViewController: NSViewController {
    @IBOutlet var fileExtract_table: NSTableView!
    
    var data : [fileExtractData] = []
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let data1 = fileExtractData.init(Filename: "test1", Size: "1234", Hash: "asdadsafad123")
        let data2 = fileExtractData.init(Filename: "test2", Size: "44", Hash: "5123010adasdasd")
        let data3 = fileExtractData.init(Filename: "test3", Size: "111", Hash: "asdqoe1234")
        data.append(data1)
        data.append(data2)
        data.append(data3)
        
        self.fileExtract_table?.reloadData()
    }
}
extension ViewController: NSTableViewDataSource, NSTableViewDelegate {
    func numberOfRows(in tableView: NSTableView) -> Int {
        return (data.count)
    }
    
    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
        let cellView = tableView.makeView(withIdentifier: tableColumn!.identifier, owner: self) as! NSTableCellView
        
        let asset = data[row]
        if (tableColumn?.identifier)!.rawValue == "Filename" {
            cellView.textField!.stringValue = asset.Filename
        }
        else if (tableColumn?.identifier)!.rawValue == "Size" {
            cellView.textField!.stringValue = asset.Size
        }
        else if (tableColumn?.identifier)!.rawValue == "Hash" {
            cellView.textField!.stringValue = asset.Hash
        }
        
        return cellView
    }
}
```


### fileExtractData.swift

```swift
import Cocoa

struct fileExtractData {
    let Filename: String
    let Size: String
    let Hash: String
    
}
```


### Result
![]({{ site.baseurl }}/assets/posts/swift/tableView_result.png)
