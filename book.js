var id;
var body;
// var isNew = false;

function loadForm(){
    var input = window.document.getElementById("newtitle");
    input.value = body[0].title;
    input = window.document.getElementById("newauthor");
    input.value = body[0].author;
    input = window.document.getElementById("newcover");
    input.src = `files/${id}`;
    var div = window.document.getElementById('book');
    div.hidden = true;
    div = window.document.getElementById('edit');
    div.hidden = false;
}

function cancelForm() {
    let div = window.document.getElementById('edit');
    div.hidden = true;
    div = window.document.getElementById('book');
    div.hidden = false;
}


function loadBook(){
    var params = (new URL(document.location)).searchParams;
    id = params.get("id");
    var form = window.document.getElementById("bookForm");
    form.addEventListener("submit", (ev) =>
    {
        var data = new FormData(form);
        data.append('id', `${id}`);
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/books/book`); //async
        //on async request:
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log("livro adicionado");
                isNew = true;
                //loadBook();
                window.location.href = `book.html?id=${id}`; //redirect
            }
            else if(xhttp.readyState == 4 && xhttp.status == 400) {
                //console.log("Erro");
                let result = window.document.getElementById("errSpan");
                result.innerText = "Erro!";
            }
        };
        xhttp.send(data);
        ev.preventDefault();
    }, false);

    var xhttp = new XMLHttpRequest();
    //on async request:
    xhttp.onreadystatechange = () =>
    {
        if (xhttp.readyState == 4 && xhttp.status == 200){
            body = xhttp.response;
            window.document.title = "Book";
            let p = window.document.getElementById('title');
            p.innerText = `Título: "${body[0].title}"`;
            p = window.document.getElementById('author');
            p.innerText = 'Autor: ' + body[0].author;
            p = window.document.getElementById('genres');
            for (j=0; j<body[0].genres.length; j++){
                let span = window.document.createElement('span');
                span.innerText = body[0].genres[j];
                p.appendChild(span);
            }
            if (body[0].img) {
                let img = window.document.getElementById('cover');
                img.src = `files/${id}`;

            }
            // if (isNew) {
            //     let p = window.document.getElementById('bottom');
            //     let result = window.document.createElement('span');
            //     result.innerText = "Editado!";
            //     p.appendChild(result);
            // }
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