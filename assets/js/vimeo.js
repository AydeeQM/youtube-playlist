"use strict";
$(function() {
    $("#root li").on("click", function() {
        $("#videoarea").attr({
            "src": $(this).attr("movieurl"),
            "poster": "",
            "autoplay": "autoplay"
        })
    })
    $("#videoarea").attr({
        "src": $("#playlist li").eq(0).attr("movieurl"),
        "poster": $("#playlist li").eq(0).attr("moviesposter")
    })
})
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

let app = {
    result: {
        videos: [],
        selectedVideo: null,
        searchTerm: "iPhone X",
    },

    init: function () {
        app.youtubeSearch('iPhone X');
        app.setup();
    },

    setup: function () {
        $('#searchbtn').click(app.youtubeSearch);
    },

    getVideoList: function (videos) {
        return videos.map((video, index) => {
            const titleUrl = video.snippet.title;
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<li> 
                     <p class="media-object">${titleUrl}</p>
                     <div"> 
                        <iframe class="embed-responsive-item" src=${url}> </iframe>
                     </div>
                    </li>`;
        });
    },

    getVideo: function (video){
        const url = `http://www.youtube.com/embed/${video.id.videoId}`;
        return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
  },

    youtubeSearch: function (searchTerm) {
        $("#root").empty();
        searchTerm = $('#term-vimeo').val();
        console.log(searchTerm);
        YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            app.result = {
                videos: data,
                selectedVideo: data[0],
                searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            let firstVideo = app.getVideo(app.result.selectedVideo);
            console.log("lis: ", list);
            $("#videoarea").append(firstVideo);
            $("#root").append(list);
        });
    },

    videoSearch: function (searchTerm) {
        jQuery.getJSON("list.json", data => {
            console.log("result", data.items);
            app.result = {
                videos: data.items,
                selectedVideo: data.items[0],
                searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            console.log("lis: ", list);
            $("#root").append(list);
        });
    }
};

$(document).ready(app.init);
