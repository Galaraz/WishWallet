class TokensController {

  constructor() {
    this.generatorId = 0
    this.tokens = []
    this.editionId = null
    
  }

  closeMessage() {
    document.getElementById("message").classList.remove("show");
  }
  updateStatus() {
    if (localStorage.getItem('tokens') != null) {
        this.tokens = JSON.parse(localStorage.getItem('tokens'))
    }
    if (localStorage.getItem('generatorIdToken') != null) {
        this.generatorId = JSON.parse(localStorage.getItem('generatorIdToken'))
    }
    if (localStorage.getItem('getIdToken') != null) {
      this.editionId = JSON.parse(localStorage.getItem('getIdToken'))
    }
  
  }

  indexStatus() {
    this.editionId = null;
    this.updateStatus();
    this.createTable();
  }
  editStatus() {
   this.updateStatus();
   let id = this.editionId;
   this.edit(id); 
  }


  readData() {
    let token = {}
    token.tokenInput = document.getElementById('token-input').value
    token.balanceInput = document.getElementById('balance-input').value
    token.new = 0;
    return token
  }
  validate(token) {
    let message = ""
    if (token.tokenInput == "") {
        message += "Token field is required!!!\n";
    }
    if (token.balanceInput == "") {
        message += "Balance field is required!!!\n";
    }
    if (token.new == 0) {
      if (this.verifyName(token) == true) {
        message += "token name exists!!!\n"; 
      }
    }
    if (message != "") {
        document.getElementById("textmessage").innerText = message
        document.getElementById("message").classList.add("show")
        return false
    }
    
    return true
  }

  successmessage() {
    let message = " Token added successfully!!! ";
    document.getElementById("textmessage").innerText = message
    document.getElementById("message").classList.add("show")
    return true
  }

  cancel() {
    document.getElementById('token-input').value = ""
    document.getElementById('balance-input').value = ""
    this.editionId = null
  }

  remove(id) {
    id = this.editionId;
    let position = null
   
    if (confirm("Are you sure you want to delete this Token!")) {

      for (let i = 0; i < this.tokens.length; i++) {
          if (this.tokens[i].id == id) {
              position = i
          }
      }
       
      if (position != null) {
        this.tokens.splice(position, 1);
        this.editionId = null;
        this.synchronizeLocalStorage();

        window.location.href="index.html";
  
      }

    }
  }


  createTable() {
    let table = document.getElementById('table-body')
    table.innerHTML = "";
    for (let i = 0; i < this.tokens.length; i++) {
        let line         = table.insertRow()
        let columnEdit    = line.insertCell()
        let columnToken   = line.insertCell()
        let columnBalance = line.insertCell()
        let imgEditar = document.createElement('img')
        imgEditar.src = "assets/edit.svg"
        imgEditar.setAttribute('onclick', `tokensController.pageEdit('${this.tokens[i].id}')`)
        columnEdit.appendChild(imgEditar)
        columnToken.innerText = this.tokens[i].tokenInput
        columnBalance.innerText = this.tokens[i].balanceInput
    }
  }

  save() {
    let token = this.readData()
    if (this.editionId != null) {
    token.new = 1;
    }  
    if (this.validate(token)) {
        if (this.editionId == null) {
            this.add(token)
            this.successmessage()    
        } else {
            
            this.saveEdit(token)
            this.cancel()
            this.synchronizeLocalStorage()
            window.location.href="index.html";
        }
        token.new = 0;
        this.cancel()
        this.synchronizeLocalStorage()
        this.createTable()
    }
  }
  add(token) {
    token.id = this.generatorId
    this.tokens.push(token)
    this.generatorId++
  }
  synchronizeLocalStorage () {
      localStorage.setItem('tokens', JSON.stringify(this.tokens))
      localStorage.setItem('generatorIdToken', this.generatorId)
      localStorage.setItem('getIdToken', this.editionId)
  }


  pageEdit(id){
    this.editionId = id
    this.synchronizeLocalStorage()
    window.location.href="editToken.html";
  }

  edit(id) {
     
    let i = 0
    let find = false
   
    while (i < this.tokens.length && !find) {
        if (this.tokens[i].id == id) {
            document.getElementById('token-input').value = this.tokens[i].tokenInput
            document.getElementById('balance-input').value = this.tokens[i].balanceInput
            this.editionId = id
            find = true
        }
        i++
    }
 
}

verifyName(token) {
     
  let i = 0
  let find = false
 
  while (i < this.tokens.length && !find) {
      if (this.tokens[i].tokenInput == token.tokenInput) {
          
        return find = true
      }
      i++
  }

}

  saveEdit(token) {
    let i = 0
    let find = false

    while (i < this.tokens.length && !find) {
        if (this.tokens[i].id == this.editionId) {
            this.tokens[i].tokenInput = token.tokenInput
            this.tokens[i].balanceInput = token.balanceInput
            find = true
        }
        i++
    }
}


  formatCurrency() {
    var element = document.getElementById('balance-input');
    var value = element.value;

    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    element.value = value;
    if(value == 'NaN') element.value = '';
  }



}

let tokensController = new TokensController()