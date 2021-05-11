function loadBooks(){
    var xhttp = new XMLHttpRequest();
    
    function createEntry(div, body) {
        //console.log(body);
        for (i=0; i<body.length; i++){
            let p = window.document.createElement("p");
            let a = window.document.createElement("a");
            //a.href = `http://localhost:3000/books/book/${body[i]._id}`;
            a.href = `./book.html?id=${body[i]._id}`;
            let button = window.document.createElement("button");
            button.innerText = "✎"
            a.appendChild(button);
            let node = document.createTextNode(`"${body[i].title}" by ${body[i].author}`);
            p.appendChild(node);
            p.appendChild(a);
            div.appendChild(p);
        }
    }

    //on async request:
    xhttp.onreadystatechange = () =>
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) { //recebeu resposta com OK
            const body = xhttp.response;
            if (body) {
                let div =window.document.getElementById('books');
                createEntry(div, body);
            }
        }
    };
    xhttp.open('GET', 'http://localhost:3000/books', true); //async request
    xhttp.responseType = "json"; //default: String
    xhttp.send();

    var form = window.document.querySelector("form");
    //const title = form.formData.title.value;
    //const author = form.formData.author.value;
    form.addEventListener("submit", (ev) =>
    {
        var data = new FormData(form);
        //console.log(data.get("myfile"));
        // for (var p of data.entries())
        //     console.log(p);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/books"); //async
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log("livro adicionado");
                let div = window.document.getElementById('books');
                let body = xhttp.response;
                createEntry(div, [body]);
                let result = window.document.getElementById("resultSpan");
                result.innerText = "Adicionado!";
            }
            else if(xhttp.readyState == 4 && xhttp.status == 400) {
                //console.log("Erro");
                let result = window.document.getElementById("resultSpan");
                result.innerText = "Erro!";
            }
        };
        xhttp.responseType = "json";
        xhttp.send(data);
        ev.preventDefault();
    }, false);
}
window.onload = loadBooks;