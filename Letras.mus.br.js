// ==UserScript==
// @name         Letras.mus.br
// @description  Display lyrics such as slideshow
// @author       HVP
// @include      *://www.letras.mus.br/*/*
// @namespace    http://tampermonkey.net/
// ==/UserScript==

loadPage(window.location.href);
function loadPage(urlCurrent) {
    var http = new XMLHttpRequest();
    http.open('GET', urlCurrent, true);
    http.onloadend = function () {
        // Variables to get page elements
        var html = new DOMParser().parseFromString(this.responseText, "text/html")
        html = html.documentElement;
        let el = html.getElementsByTagName("H1");
        var nameSong = el[el.length-1].outerHTML + "\n";
        el = html.getElementsByTagName("H2")[0];
        el.innerHTML = el.innerText;
        var musicArtist = el.outerHTML + "\n";
        var amountParagraphs = html.getElementsByTagName("P")[0].parentElement.childElementCount;

        // Writing HTML
        document.write("<!DOCTYPE html>\n");
        document.write("<html>\n");
            document.write("<head>\n");
                document.write("<meta charset='utf-8'>\n"+
                "<meta name='viewport' content='width=device-width, initial-scale=1'>\n"+
                "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>\n"+
                "<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>\n"+
                "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script>\n" +
                "<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script>\n" +
                "<style>\n" +
                    "body{background-color:rgb(35,31,32);font-family:Cambria,Georgia,serif;word-wrap:break-word;text-align:center;margin:0;overflow-x:hidden;overflow-y:hidden}\n" +
                    "h1{color:rgb(255,102,0);font-size:75px;font-weight:700;padding-top:40px}\n" +
                    "h2,a{color:rgb(183,183,0);font-size:30px;font-weight:700;line-height:10%}\n" +
                    ".container{width:100vw;height:75vh;display:flex;flex-direction:row;justify-content:center;align-items:center}" +
                    "#carousel{width:100vw;height:80vh;position:absolute;display:flex;flex-direction:row;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center}\n " +
                    "#carousel p{color:white;font-size:45px;line-height:normal}\n" +
                "</style>\n"
                );
            document.write("</head>\n");
            document.write("<body>\n");
                document.write(`<h1>${nameSong}</h1>`);
                document.write(`<h2>${musicArtist}</h2>`);
                // Creating carousel
                document.write("<div class='container'>\n");
                    document.write("<div id='carousel' class='carousel slide carousel-fade' data-ride='carousel'>\n");
                        // To create the amount of slides
                        document.write("<ol class='carousel-indicators'>\n");
                            for(let i=0; i<amountParagraphs; i++){
                                if(i==0){
                                    document.write("<li data-target='#carousel' data-slide-to=`${i}` class='active'></li>");
                                } else{
                                    document.write("<li data-target='#carousel' data-slide-to=`${i}`></li>");
                                }
                            }
                        document.write("</ol>");
                        // To insert paragraphs
                        document.write("<div class='carousel-inner'>\n");
                            for(let i=0; i<amountParagraphs; i++){
                                if(i==0){
                                    document.write("<div class='carousel-item active'>");
                                        document.write(`<p>${html.getElementsByTagName("P")[i].innerHTML}</p>`);
                                    document.write("</div>");
                                } else{
                                    document.write("<div class='carousel-item'>");
                                        document.write(`<p>${html.getElementsByTagName("P")[i].innerHTML}</p>`);
                                    document.write("</div>");
                                }
                            }
                        document.write("</div>\n");
                        // To left and right controls
                        document.write("<a class='carousel-control-prev' href='#carousel' role='button' data-slide='prev'>\n"+
                            "<span class='carousel-control-prev-icon' aria-hidden='true'></span>\n"+
                            "<span class='sr-only'>Previous</span>\n"+
                        "</a>\n");
                        document.write("<a class='carousel-control-next' href='#carousel' role='button' data-slide='next'>\n"+
                            "<span class='carousel-control-next-icon' aria-hidden='true'></span>\n"+
                            "<span class='sr-only'>Next</span>\n"+
                        "</a>\n");
                    document.write("</div>\n");
                document.write("</div>\n");
                document.write("<script>\n" +
                    "$('#carousel').carousel ({ interval: false });" + // To remove the carousel auto slider
                "</script>\n");
            document.write("</body>\n");
        document.write("</html>\n");

        document.close();
    }

    http.send();
}