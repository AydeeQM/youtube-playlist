"use strict";

const API_KEY = "AIzaSyB8pNZqHF8Nnt1_KLH-QhrmoqKe7dzVWE0";

class Playlist {
    constructor(input) {
        this.result = {
            videos: [],
            selectedVideo: null,
            searchTerm: "iPhone X",
        }

        $('#searchbtn').click(()=>{
            let searchTerm = $('#term-vimeo').val();
            console.log(searchTerm);
            this.youtubeSearch(searchTerm);
         });

    }

    getVideoList (videos) {
        return videos.map((video, index) => {
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<div class='item'> 
                        <iframe class="embed-responsive-item" src=${url}> </iframe>
                     </div>`;
        });
    }

    allVideo(video) {
        const url = `http://www.youtube.com/embed/${video.id.videoId}`;
        return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
    }

    getDetails(video) {
        const titleUrl = video.snippet.title;
        const description = video.snippet.description;
        return ` <p class="media-object"><strong>${titleUrl}</strong></p>
                    <p>${description}</p>`;

    }

    youtubeSearch(searchTerm) {
        $("#root").empty();
        $('#details').empty();
        console.log(searchTerm);
        YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            this.result = {
                videos: data,
                selectedVideo: data[0],
                searchTerm: searchTerm
            };
            let list = this.getVideoList(this.result.videos);
            let firstVideo = this.allVideo(this.result.selectedVideo);
            let firstDetail = this.getDetails(this.result.selectedVideo);
            console.log("lis: ", list);
            $("#videoarea").append(firstVideo);
            $('#details').append(firstDetail);
            $("#root").append(list);
        });
    }

    videoSearch(searchTerm) {
        jQuery.getJSON("list.json", data => {
            console.log("result", data.items);
            this.result = {
                videos: data.items,
                selectedVideo: data.items[0],
                searchTerm: searchTerm
            };
            var list = this.getVideoList(this.result.videos);
            console.log("lis: ", list);
            $("#root").append(list);
        });
    }

}

let play = new Playlist();

