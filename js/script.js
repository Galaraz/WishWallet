class TokensController {

  constructor() {
    this.generatorId = 0
    this.tokens = []
    this.editionId = null
    
  }

  fecharMensagem() {
    document.getElementById("mensagens").classList.remove("show");
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
    return token
  }
  validate(token) {
    let mensagem = ""
    if (token.tokenInput == "") {
        mensagem += "Token field is required!!!\n";
    }
    if (token.balanceInput == "") {
        mensagem += "Balance field is required!!!\n";
    }
    if (this.verifyName(token) == true) {
        mensagem += "token name exists!!!\n"; 
    }
    if (mensagem != "") {
        document.getElementById("textoMensagem").innerText = mensagem
        document.getElementById("mensagens").classList.add("show")
        return false
    }

    return true
  }

  successMessage() {
    let mensagem = " Token adicionado com sucesso ";
     
    document.getElementById("textoMensagem").innerText = mensagem
    document.getElementById("mensagens").classList.add("show")
    return true
  }

  cancel() {
    document.getElementById('token-input').value = ""
    document.getElementById('balance-input').value = ""
    
    this.editionId = null
  }

  remove(id) {
    id = this.editionId;
    
    let posicao = null
   
    if (confirm("Tem certeza que deseja deletar esse Token!")) {

      for (let i = 0; i < this.tokens.length; i++) {
          if (this.tokens[i].id == id) {
              posicao = i
          }
      }
       
      if (posicao != null) {
        this.tokens.splice(posicao, 1);
        this.editionId = null;
        this.synchronizeLocalStorage();

        window.location.href="index.html";
  
      }

    }
  }


  createTable() {
    let tabela = document.getElementById('tabela-corpo')
    tabela.innerHTML = "";
    for (let i = 0; i < this.tokens.length; i++) {
        let linha         = tabela.insertRow()
        let columnEdit    = linha.insertCell()
        let columnToken   = linha.insertCell()
        let columnBalance = linha.insertCell()
        
        
        let imgEditar = document.createElement('img')
        imgEditar.src = "assets/editar.svg"
        imgEditar.setAttribute('onclick', `tokensController.pageEdit('${this.tokens[i].id}')`)
        columnEdit.appendChild(imgEditar)

        columnToken.innerText = this.tokens[i].tokenInput
        columnBalance.innerText = this.tokens[i].balanceInput
  
    }
  }

  save() {
    let token = this.readData()
    if (this.validate(token)) {
        if (this.editionId == null) {
            this.add(token)
            this.successMessage()    
        } else {
            this.saveEdit(token)
            this.cancel()
            this.synchronizeLocalStorage()
            window.location.href="index.html";
        }
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
    let achou = false
   
    while (i < this.tokens.length && !achou) {
        if (this.tokens[i].id == id) {
            document.getElementById('token-input').value = this.tokens[i].tokenInput
            document.getElementById('balance-input').value = this.tokens[i].balanceInput
            this.editionId = id
            achou = true
        }
        i++
    }
 
}

verifyName(token) {
     
  let i = 0
  let achou = false
 
  while (i < this.tokens.length && !achou) {
      if (this.tokens[i].tokenInput == token.tokenInput) {
          
        return achou = true
      }
      i++
  }

}

  saveEdit(token) {
    let i = 0
    let achou = false

    while (i < this.tokens.length && !achou) {
        if (this.tokens[i].id == this.editionId) {
            this.tokens[i].tokenInput = token.tokenInput
            this.tokens[i].balanceInput = token.balanceInput
            achou = true
        }
        i++
    }
}

}

let tokensController = new TokensController()