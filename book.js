var id;
var body;
var isNew = false;
function loadForm(){
    var input = window.document.getElementById("title");
    input.value = body[0].title;
    input = window.document.getElementById("author");
    input.value = body[0].author;
    input = window.document.getElementById("cover");
    input.src = `files/${id}`;
    input = window.document.getElementById("myfile");
    var div = window.document.getElementById('book');
    div.hidden = true;
    div = window.document.getElementById('edit');
    div.hidden = false;
    var form = window.document.getElementById("bookForm");
    form.addEventListener("submit", (ev) =>
    {
        var data = new FormData(form);
        data.append('id', `${id}`);
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/books/book`); //async
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log("livro adicionado");
                let div = window.document.getElementById('edit');
                div.hidden = true;
                div = window.document.getElementById('book');
                div.innerHTML = "";
                div.hidden = false;
                isNew = true;
                loadBook();
            }
            else if(xhttp.readyState == 4 && xhttp.status == 400) {
                //console.log("Erro");
                let result = window.document.getElementById("errSpan");
                result.innerText = "Erro!";
            }
            //window.location.href = `book.html?id=${id}`; //redirect
        };
        xhttp.send(data);
        ev.preventDefault();
    }, false);
}
function loadBook(){
    var params = (new URL(document.location)).searchParams;
    id = params.get("id");
    var xhttp = new XMLHttpRequest();
    //on async request:
    xhttp.onreadystatechange = () =>
    {
        if (xhttp.readyState == 4 && xhttp.status == 200){
            body = xhttp.response;
            window.document.title = "Book";
            let div = window.document.getElementById('book');
            let p1 = window.document.createElement('p');
            p1.innerText = `Título: "${body[0].title}"`;
            let p2 = window.document.createElement('p');
            p2.innerText = 'Autor: ' + body[0].author;
            div.appendChild(p1);
            div.appendChild(p2);
            var p3 = window.document.createElement('p');
            for (j=0; j<body[0].genres.length; j++){
                let span = window.document.createElement('span');
                span.innerText = body[0].genres[j];
                p3.appendChild(span);
            }
            if (body[0].img) {
                let img = window.document.createElement("img");
                img.src = `files/${id}`;
                div.appendChild(img);
            }
            let p4 = window.document.createElement('p');
            let button = window.document.createElement('button');
            button.innerText = "edit...";
            button.onclick= loadForm;
            p4.appendChild(button);
            div.appendChild(p4);
            if (isNew) {
                let result = window.document.createElement('span');
                result.innerText = "Editado!";
                p4.appendChild(result);
            }
            
        }
        else if (xhttp.readyState == 4 && xhttp.status == 404) {
            window.document.title = xhttp.statusText;
            let div = window.document.getElementById('book');
            var h2 = window.document.createElement('h2');
            h2.innerText = xhttp.statusText;
            div.appendChild(h2);
        }
    }
    xhttp.open('GET', `http://localhost:3000/books/book?id=${id}`, true); //async
    xhttp.responseType = "json";
    xhttp.send();
}
window.onload = loadBook;