"use strict";

const API_KEY = "AIzaSyB8pNZqHF8Nnt1_KLH-QhrmoqKe7dzVWE0";

class Playlist {
    constructor(input) {
        this.result = {
            videos: [],
            selectedVideo: null,
            searchTerm: undefined,
        }
        this.inicio();
    }
    inicio(){
        this.youtubeSearch('laboratoria');
        $('#buscar').click(() => this.youtubeSearch($('#nombreVideo').val()));
        $('#nombreVideo').keyup((e) => {
            if(e.which == 13) {
                this.youtubeSearch($('#nombreVideo').val());
            }
      });
    }
    youtubeSearch(searchTerm) {
        console.log(searchTerm);
        YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            this.result = {
                videos: data,
                selectedVideo: data[0],
                searchTerm: searchTerm
            };
             
            this.allVideo(this.result.videos[0]);
            var list = this.getVideoList(this.result.videos);
            console.log("lis: ", list);
            $("#masvideos").html(list);
            $('img').click((e) => this.seleccionarNuevoVideo(e))
        });
    }
    getVideoList (videos) {
        return videos.map((video, index) => {
            const imageUrl = video.snippet.thumbnails.default.url;
            const title = video.snippet.title;
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<div class='col-md-12 lectura'>
                        <div class='col-md-6'><img class="media-object" src=${imageUrl} /></div>
                        <div class='col-md-6'>${title}</div>
                  </div>`;
         });
    }
    allVideo(video) {
        const title = video.snippet.title;
        const description = video.snippet.description;
        const url = `http://www.youtube.com/embed/${video.id.videoId}`;
        let totalDes = `<div class='firsttitle'><p><strong>${title}</strong></p><p>${description}</p></div>`
        let print= `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
        
        $('#video').html(print);
        $('#frame').html(totalDes);
    }
    seleccionarNuevoVideo (evento) {
        let direccionIMG = evento.target.src;
        let indice;
        this.result.videos.filter((video, i) => {
            return (direccionIMG == video.snippet.thumbnails.default.url)? indice = i: '';
        })
        console.log(evento.target.src)
        this.allVideo(this.result.videos[indice]);
    }

    // videoSearch(searchTerm) {
    //     jQuery.getJSON("list.json", data => {
    //         console.log("result", data.items);
    //         this.result = {
    //             videos: data.items,
    //             selectedVideo: data.items[0],
    //             searchTerm: searchTerm
    //         };
    //         var list = this.getVideoList(this.result.videos);
    //         console.log("lis: ", list);
    //         $("#root").append(list);
    //     });
    // }

}

let play = new Playlist();

