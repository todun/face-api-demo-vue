<template>
    <div class="FaceComparison">
        <p>Sorry, please open the browser to see the console to view the output log.</p>
        <br>
        <!-- <img id="face1" src="https://dwz.cn/kXUrwcGG">
        <img id="face2" src="https://dwz.cn/Fi5mUbYK">-->
        <img id="face1" src="../assets/images/one_1.jpg">
        <img id="face1" src="../assets/images/two_2.jpg">
    </div>
</template>

<script>
    import * as faceapi from "face-api.js";
    import One1 from "../assets/images/one_1.jpg";
    import Two2 from "../assets/images/two_2.jpg";

    export default {
        name: "FaceComparison",
        data() {
            return {
                // Difference
                threshold: 0.6,
                descriptors: {
                    desc1: null,
                    desc2: null
                }
            };
        },
        mounted() {
            // Synchronous execution to avoid error reporting
            this.init();
        },
        methods: {
            // Initial load data model
            async init() {
                await faceapi.loadFaceRecognitionModel("/models");
                await this.run();
            },
            // 运行对比
            async run() {
                console.log("Contrast recognition");
                // Picture one
                const input1 = await faceapi.fetchImage(One1);
                this.descriptors[`desc1`] = await faceapi.computeFaceDescriptor(input1);
                // Picture two
                const input2 = await faceapi.fetchImage(Two2);
                this.descriptors[`desc2`] = await faceapi.computeFaceDescriptor(input2);
                // Picture recognition
                const distance = faceapi.round(
                    faceapi.euclideanDistance(
                        this.descriptors.desc1,
                        this.descriptors.desc2
                    )
                );
                // Judge
                console.log("The smaller the value, the more similar:", distance);
                if (distance > this.threshold) {
                    console.log(distance, "Similarity<0.6 No match");
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
