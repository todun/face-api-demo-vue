<template>
    <div class="media">
        <video
                class="media-video"
                poster="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1558759758&di=ccd0b08f63f2b6ea3ca08b651c4fa5f1&src=http://b-ssl.duitang.com/uploads/item/201610/05/20161005105402_xiLsK.thumb.700_0.jpeg"
                ref="videoDom"
                playsinline
                autoplay
        ></video>
        <canvas class="media-canvas" ref="canvasDOM"></canvas>
    </div>
</template>

<script>
    import * as faceapi from "face-api.js";

    export default {
        name: "VideoMediaCanvasStream",
        data() {
            return {
                videoEl: {},
                canvasEL: {},
                facingMode: false,
                userMediaConstraints: {
                    audio: false,
                    video: {
                        // ideal（Ideal for application）
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
                        // Camera flip
                        facingMode: this.facingMode ? "user" : "environment"
                    }
                },
                timeInterval: 0,
                failCount: 0
            };
        },
        created() {
            this.init();
        },
        methods: {
            // initialization
            async init() {
                // Loading model
                await faceapi.loadTinyFaceDetectorModel("/models");
                // Dom element
                this.videoEl = this.$refs.videoDom;
                this.canvasEL = this.$refs.canvasDOM;
                // Launch WebRTC Drive Camera Video Media
                await navigator.mediaDevices
                    .getUserMedia(this.userMediaConstraints)
                    .then(this.getMediaStreamSuccess)
                    .catch(this.getMediaStreamError);
                // Start detection
                await this.onPlay();
            },
            // Video drawing image frame
            async onPlay() {
                // Time counting
                const ts = Date.now();
                // Determine if the video object is paused or not
                if (this.videoEl.paused || this.videoEl.ended) {
                    this.timeInterval = setInterval(() => this.onPlay());
                    return;
                }
                // Simple face detection scan
                const faceDetectionTask = await faceapi.detectSingleFace(
                    this.videoEl,
                    new faceapi.TinyFaceDetectorOptions({
                        inputSize: 512,
                        scoreThreshold: 0.5
                    })
                );
                // Judging face scan results
                if (faceDetectionTask) {
                    this.failCount = 0;
                    // Canvas drawing face frame
                    this.drawDetections(this.videoEl, this.canvasEL, [faceDetectionTask]);
                } else {
                    this.failCount += 1;
                    if (this.failCount > 20) {
                        this.canvasEL.width = this.videoEl.videoWidth;
                        this.canvasEL.height = this.videoEl.videoHeight;
                        // Canvas drawing
                        const ctx = this.canvasEL.getContext("2d");
                        const linearGradient = ctx.createLinearGradient(0, 0, 300, 0);
                        linearGradient.addColorStop("0", "#40E0D0");
                        linearGradient.addColorStop("0.5", "#FF8C00");
                        linearGradient.addColorStop("1.0", "#FF0080");
                        // Canvas drawing
                        ctx.font = "35px FZShuTi";
                        ctx.fillStyle = linearGradient;
                        ctx.fillText("Please enter the detection area", 20, 50);
                    }
                    console.log(this.failCount, "Detection failure");
                }
                // Draw refresh status
                const runTime = {
                    time: Math.round(Date.now() - ts),
                    fps: faceapi.round(1000 / (Date.now() - ts))
                };
                // Drawing time
                console.log("Drawing time:", runTime);
            },
            // Face frame drawing
            drawDetections(dimensions, canvas, detections) {
                // Initial canvas size
                canvas.width = dimensions.videoWidth;
                canvas.height = dimensions.videoHeight;
                // The video object face frame is drawn in the canvas
                detections.forEach(det => {
                    const {x, y, width, height} = det.box;
                    const ctx = canvas.getContext("2d");
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(x, y, width, height);
                });
            },
            // Video media stream success
            getMediaStreamSuccess(stream) {
                window.stream = stream; // make stream available to browser console
                this.videoEl.srcObject = stream;
            },
            // Video media stream failed
            getMediaStreamError(error) {
                alert("Video media stream gets wrong" + error);
            },
            // End media stream
            stopMediaStreamTrack() {
                clearInterval(this.timeInterval);
                if (typeof window.stream === "object") {
                    this.videoEl.srcObject = null;
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
    .media {
        position: relative;
    }

    .media-video {
        max-height: 860px;
        height: 100%;
        width: 100%;
        display: block;
        background-color: #242424;
    }

    .media-canvas {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
</style>
