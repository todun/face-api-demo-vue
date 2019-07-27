<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">On</router-link>
            |
            <router-link to="/face_comparison">Comparing two pictures</router-link>
            |
            <router-link to="/face_comparison_many">Multiple picture comparison</router-link>
            |
            <router-link to="/video_media_stream">WebRTC media video stream</router-link>
            |
            <router-link to="/video_media_canvas_stream">WebRTC media face frame drawing detection</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    a {
        font-weight: bold;
        color: #2c3e50;
    }

    a.router-link-exact-active {
        color: #42b983;
    }
</style>
