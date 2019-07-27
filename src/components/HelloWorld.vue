<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div>
            This can be done by browsing the author sample source code. The model file is placed in the public
            directory, npm mainly installs the following
            <h5>npm i --save face-api.js</h5>
            <h5>npm i --save webrtc-adapter</h5>
            <h5>If localhost clicks won't open, change to 127.0.0.1</h5>
        </div>
        <h3>The rest of the methods use the review author doc, and the method documentation is also in the author's
            GitHub.</h3>
        <h3>
            <a href="https://github.com/Slimmer/face-api-demo">The code sample I downloaded</a> |
            <a href="https://github.com/justadudewhohacks/face-api.js">Author's latest code example</a>|
            <a href="https://justadudewhohacks.github.io/face-api.js">Online example</a>
        </h3>
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
