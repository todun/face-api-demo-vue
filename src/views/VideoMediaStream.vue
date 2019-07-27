<template>
    <video
            class="videoStyle"
            poster="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1558759758&di=ccd0b08f63f2b6ea3ca08b651c4fa5f1&src=http://b-ssl.duitang.com/uploads/item/201610/05/20161005105402_xiLsK.thumb.700_0.jpeg"
            ref="video"
            playsinline
            autoplay
    ></video>
</template>

<script>
    export default {
        name: "VideoMediaStream",
        data() {
            return {
                videoDom: "",
                facingMode: false,
                userMediaConstraints: {
                    audio: false,
                    video: {
                        // Ideal (optimal application)
                        width: {
                            min: 320,
                            ideal: 1280,
                            max: 1920
                        },
                        height: {
                            min: 240,
                            ideal: 720,
                            max: 1080
                        },
                        // Low frame rate may be more appropriate when frameRate is limited bandwidth transmission
                        frameRate: {
                            min: 15,
                            ideal: 30,
                            max: 60
                        },
                        facingMode: this.facingMode ? "user" : "environment"
                    }
                }
            };
        },
        mounted() {
            this.videoDom = this.$refs.video;
            // Start camera video media
            navigator.mediaDevices
                .getUserMedia(this.userMediaConstraints)
                .then(this.getMediaStreamSuccess)
                .catch(this.getMediaStreamError);
        },
        methods: {
            // Video media stream
            getMediaStreamSuccess(stream) {
                window.stream = stream; // make stream available to browser console
                this.videoDom.srcObject = stream;
            },
            getMediaStreamError(error) {
                alert("Video media stream gets wrong" + error);
            },
            // End media stream
            stopMediaStreamTrack() {
                if (typeof window.stream === "object") {
                    this.videoDom.srcObject = null;
                    window.stream.getTracks().forEach(track => track.stop());
                }
            }
        },
        beforeDestroy() {
            this.stopMediaStreamTrack();
        }
    };
</script>

<style scoped>
    .videoStyle {
        max-height: 860px;
        height: 100%;
        width: 100%;
        display: block;
        background-color: #242424;
    }
</style>
