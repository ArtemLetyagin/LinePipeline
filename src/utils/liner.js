class Liner{
    constructor(){
        console.log('liner')
        this.ids = [];
        this.line_creating = false;
        this.new_line = [];

        this.LINES = [];
    }

    startNewLine(){
        if(this.line_creating === false){
            // open
            this.line_creating = true;
            this.new_line = [];
            document.getElementById('addLine').style.transform = 'translateX(0%)';

            // highlight buttons
            let items = document.getElementsByClassName('item');
            for(let i=0; i<items.length; i++){
                items[i].getElementsByClassName('item_editor')[0].querySelectorAll('div')[0].style.visibility = 'visible';
            }
        }
    }

    endLine(){
        if(this.line_creating){
            // close
            this.line_creating = false;
            document.getElementById('addLine').style.transform = 'translateX(95%)';

            if(this.new_line.length > 0){
                // save line
                let items_in_line = document.getElementById('addLine').children;
                let new_line = [];
                
                for(let i=0; i<items_in_line.length; i++){
                    new_line.push(items_in_line[i].id.slice(1))
                }
                this.LINES.push(new_line);

                // add line icon
                document.getElementById('my_lines').appendChild(this.addLineIcon())
            }

            // unhighlight buttons
            let items = document.getElementsByClassName('item');
            for(let i=0; i<items.length; i++){
                items[i].getElementsByClassName('item_editor')[0].querySelectorAll('div')[0].style.visibility = 'hidden';
            }
            
            // clear addLine
            const addLine = document.getElementById("addLine");
            while (addLine.firstChild) {
                addLine.removeChild(addLine.lastChild);
            }
        }
        
    }

    endLineJSON(new_line){
        this.line_creating = false;
        this.LINES.push(new_line);
        document.getElementById('my_lines').appendChild(this.addLineIcon())
    }

    addLineIcon(){
        let div = document.createElement('div');
        div.className = 'my_line';
        
        let left_div = document.createElement('div');
        left_div.className = 'left';
        let right_div = document.createElement('div');
        right_div.className = 'right';

        let p = document.createElement('p');
        p.contentEditable = true;
        let div_sign = document.createElement('div');
        div_sign.className = 'my_line_sign';
        for(let i=0; i<5; i++){
            div_sign.appendChild(document.createElement('div'))
        }
        left_div.appendChild(p);
        left_div.appendChild(div_sign);

        div.appendChild(left_div);

        let img = document.createElement('img');
        img.src = 'delete.svg';
        right_div.appendChild(img);
        right_div.addEventListener('click', (e)=>{
            var index = Array.prototype.indexOf.call(div.parentNode.children, div);
            if (index > -1) {
                this.LINES.splice(index, 1);
            }
            div.remove()
            let items = document.getElementsByClassName('item');
            for(let i=0; i<items.length; i++){
                items[i].classList.remove('check_line');
            }
        })
        
        div.appendChild(right_div);

        div.addEventListener('mouseenter', (e)=>{
            let child = e.target;
            let parent = e.target.parentNode;
            var index = Array.prototype.indexOf.call(parent.children, child);
            
            let line_ids = this.LINES[index];
            let items = document.getElementsByClassName('item');
            for(let i=0; i<items.length; i++){
                for(let j=0; j<line_ids.length; j++){
                    if(items[i].id === line_ids[j]){
                        items[i].classList.add('check_line');
                    }
                }
            }
        })

        div.addEventListener('mouseleave', (e)=>{
            let items = document.getElementsByClassName('item');
            for(let i=0; i<items.length; i++){
                items[i].classList.remove('check_line');
            } 
        })
        return div;
    }
    addItem(block, id, title, description){
        let div = document.createElement('div');
        
        if(id === -1){
            let id = this.addItemId();
            div.id = id;
        }
        else{
            div.id = id;
        }
        
        div.className = 'item ';
        
        
        let div_text = document.createElement('div');
        div_text.className = 'item_texts';
        let p1 = document.createElement('span');
        p1.innerHTML = title;
        p1.className = 'item_head';
        p1.contentEditable = 'true';
        let d1 = document.createElement('div');
        d1.appendChild(p1);
        div_text.appendChild(d1);
        let p2 = document.createElement('span');
        p2.contentEditable = 'true';
        p2.innerHTML = description;
        let d2 = document.createElement('div');
        d2.appendChild(p2);
        div_text.appendChild(d2);
    
        let div_editor = document.createElement('div');
        div_editor.className = 'item_editor';
        
        let img = document.createElement('img');
        img.addEventListener('click', (e)=>{
            this.removeId(e.target.parentNode.parentNode.id);

        })
        img.src = 'delete.svg';
        div_editor.appendChild(img);
    
        let add_to_line = document.createElement('div');
        add_to_line.addEventListener('click', (e)=>{
            this.addToLine(div.id);
        })
        div_editor.appendChild(add_to_line);
        div.append(div_text)
        div.appendChild(div_editor);
        block.appendChild(div);
    }
    addItemId(){
        let id = Math.floor(Math.random() * 100000);
        while(this.ids.includes(id)){
            id = Math.floor(Math.random() * 100000)
        }
        this.ids.push(id)
        return id
    }
    removeId(id){
        if(this.line_creating === false){
            var index = this.ids.indexOf(id);
            if (index > -1) {
                this.ids.splice(index, 1);
            }
            document.getElementById(id).remove();
        }
    }
    addToLine(id){
        if(this.line_creating){
            if(this.new_line.includes(id)){
                let item = document.getElementById(id);
                let item_line = document.getElementById('#' + id);
                item_line.querySelectorAll('div')[1].innerHTML = item.getElementsByClassName('item_head')[0].innerHTML
            }
            else{
                this.new_line.push(id);
                let add_line = document.getElementById('addLine');
                
                // random color
                var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                document.getElementById(id).getElementsByClassName('item_editor')[0].children[1].style.backgroundColor = randomColor;
                // Element creating
                let div = document.createElement('div');
                div.id = '#' + id;
                let d1 = document.createElement('div');
                d1.style.backgroundColor = randomColor;
                let p = document.createElement('div');
                let img = document.createElement('img');
                img.src = 'delete.svg';
                
                // add text
                p.innerHTML = document.getElementById(id).getElementsByClassName('item_head')[0].innerHTML;

                // Listeners
                div.addEventListener('mouseenter', (e)=>{
                    document.getElementById(id).classList.add('check_line');
                })
                div.addEventListener('mouseleave', (e)=>{
                    document.getElementById(id).classList.remove('check_line');
                })
                img.addEventListener('click', (e)=>{
                    const index = this.new_line.indexOf(id);
                    if (index > -1) {
                        this.new_line.splice(index, 1);
                        document.getElementById(id).classList.remove('check_line');
                        document.getElementById(id).getElementsByClassName('item_editor')[0].children[1].style.backgroundColor = '#bbbbbb';
                        div.remove();
                    }
                
                })

                div.appendChild(d1);
                div.appendChild(p);
                div.appendChild(img);
                add_line.appendChild(div);
            }
        }
    }

    getMode(){
        return this.line_creating
    }

    getLines(){
        return this.LINES
    }

    loadJSON(json){
        let lines = json['lines'];
        let info = json['info'];
        console.log(lines, info)

        // clear all
        this.clearAll();
        
        // add items
        for(let i=0; i<info.length; i++){
            let num_block = parseInt(info[i].level) - 1;
            console.log(num_block);
            let block = document.getElementsByClassName('block')[num_block];
            this.addItem(block, info[i].id, info[i].title, info[i].description);
        }

        // add lines
        for(let i=0; i<lines.length; i++){
            this.line_creating = true;
            let new_line = []
            for(let j=0; j<lines[i].length; j++){
                new_line.push(lines[i][j])
            }
            console.log(new_line)
            this.endLineJSON(new_line)
        }

        console.log(this.LINES)
    }

    clearAll(){
        // remove items
        let blocks = document.getElementsByClassName('block');
        for(let i=0; i<blocks.length; i++){
            let nc = blocks[i].children.length - 1;
            for(let j=0; j<nc; j++){
                blocks[i].lastChild.remove();
            }
        }

        // remove lines
        let my_lines = document.getElementById('my_lines');
        while(my_lines.lastChild){
            my_lines.removeChild(my_lines.lastChild)
        }

        // redefine vars
        this.ids = [];
        this.line_creating = false;
        this.new_line = [];

        this.LINES = [];
    }
}

export {Liner}