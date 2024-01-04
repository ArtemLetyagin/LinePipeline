import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import { Inter } from 'next/font/google';
import { Liner } from '../utils/liner.js';

export default function Home() {
  let add_line_active = false;
  let liner = new Liner();

  useEffect(()=>{

  }, [])
  
  function addItem(info){
    if(liner.getMode() === false){
      let block = null;
      if(info.target.tagName === 'BUTTON'){
        block = info.target.parentNode;
      }
      if(info.target.tagName === 'IMG'){
        block = info.target.parentNode.parentNode;
      }
      liner.addItem(block, -1, '', '')
    }
    
  }
  
  function addLine() {
    liner.startNewLine();
  }
  function endLine(){
    liner.endLine();
  }
  function save() {
    let lines = liner.getLines();
    let items = document.getElementsByClassName('item');
    let items_info = [];

    for(let i=0; i<items.length; i++){
      let id = items[i].id;
      let block_num = items[i].parentNode.className.slice(6);
      let title = items[i].getElementsByClassName('item_texts')[0].querySelectorAll('div')[0].querySelectorAll('span')[0].innerHTML;
      let description = items[i].getElementsByClassName('item_texts')[0].querySelectorAll('div')[1].querySelectorAll('span')[0].innerHTML;
      let d = {id: id, level: block_num, title: title, description: description};
      items_info.push(d);
    }
    let user_json = {
      lines: lines,
      info: items_info
    }

    const userJSON = JSON.stringify(user_json);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user_json));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "my_lines.json");
    dlAnchorElem.click();
  }
  function loadJSON() {
    document.getElementById('load_file').click()
  }

  function onFileLoad() {
    var file = document.getElementById("load_file").files[0];
    
    var reader = new FileReader();

    reader.onload = function (e) {
        try{
          var obj = JSON.parse(reader.result);
          liner.loadJSON(obj)
        } catch{
          console.log('error')
        }
    }
    reader.readAsText(file);
    
  }
  return (
    <main className="mainer" id='mainer'>
      <a id="downloadAnchorElem" style={{display: 'none'}}></a>
      <div className='line'></div>
      <div className='task' id='task'>
        <div className='block 1'>
          <button onClick={addItem}><img src='plus.svg'/></button>
        </div>
        <div className='block 2'>
          <button onClick={addItem}><img src='plus.svg'/></button>
        </div>
        <div className='block 3'>
          <button onClick={addItem}><img src='plus.svg'/></button>
        </div>
        <div className='block 4'>
          <button onClick={addItem}><img src='plus.svg'/></button>
        </div>
      </div>
      <div className='connections'>
        <div className = 'connection_buttons'>
          <button onClick={addLine}>Add line</button>
          <button onClick={endLine}>End line</button>
          <button onClick={save}>Save</button>
          <button onClick={loadJSON}><input type="file" id='load_file' onChange={onFileLoad}/>Load</button>
        </div>
        <div className='my_lines' id='my_lines'>
        </div>
        <div className='addLine' id='addLine'>
        </div>
      </div>
    </main>
    
  )
}
