<template>
    <div class="FaceComparisonMany">
        <p>Sorry, please open the browser to see the console to view the output log.</p>
        <br>
        <img id="face1" src="../assets/images/one_1.jpg" width="300">
        <img id="face2" src="../assets/images/two_2.jpg" width="300">
        <img id="face3" src="../assets/images/three_3.jpg" width="300">
        <img id="face4" src="../assets/images/four_4.jpg" width="300">
        <br>
        <img id="face5" src="../assets/images/five_5.jpg" width="300">
        <img id="face6" src="../assets/images/six_6.jpg" width="300">
    </div>
</template>

<script>
    import * as faceapi from "face-api.js";
    // Local picture
    import One1 from "../assets/images/one_1.jpg";
    import Two2 from "../assets/images/two_2.jpg";
    import Three3 from "../assets/images/three_3.jpg";
    import Four4 from "../assets/images/four_4.jpg";
    import Five5 from "../assets/images/five_5.jpg";
    import Six6 from "../assets/images/six_6.jpg";

    export default {
        name: "FaceComparisonMany",
        props: {
            msg: String
        },
        data() {
            return {
                // Face contrast model array object
                faceMatcher: null
            };
        },
        mounted() {
            // Synchronous execution to avoid error reporting
            this.init();
        },
        methods: {
            // Synchronous execution to avoid error reporting
            async init() {
                await faceapi.loadFaceRecognitionModel("/models");
                this.faceMatcher = await this.createFaceMatcher();
                await this.runArray();
            },
            // Face contrast model array object
            async createFaceMatcher() {
                // Pictures in the model, multiple pictures for one person
                // const picArray = [
                //   {
                //     name: "Person A",
                //     img: ["https://dwz.cn/Fi5mUbYK", "https://dwz.cn/kXUrwcGG"]
                //   },
                //   {
                //     name: "Person B",
                //     img: ["https://dwz.cn/PVtFiWoI"]
                //   }
                // ];
                const picArray = [
                    {
                        name: "Person A",
                        img: [One1, Two2]
                    },
                    {
                        name: "Person B",
                        img: [Three3, Four4]
                    }
                ];

                // Pre-stored image transcode array
                const labeledFaceDescriptors = await Promise.all(
                    picArray.map(async (pic, index) => {
                        console.log(pic.name, pic.img);
                        // Array image resampling data
                        const descriptors = [];
                        for (const imgage of pic.img) {
                            const img = await faceapi.fetchImage(imgage);
                            descriptors.push(await faceapi.computeFaceDescriptor(img));
                        }
                        // Return image user and image transcode array
                        return new faceapi.LabeledFaceDescriptors(pic.name, descriptors);
                    })
                );
                console.log("Image transcode array object", labeledFaceDescriptors);
                return new faceapi.FaceMatcher(labeledFaceDescriptors);
            },
            // Compare Photos
            async runArray() {
                // Use the images in the comparison model to compare the images with the model group
                // const picArrays = ["https://dwz.cn/ZggSBEtL", "https://dwz.cn/U7nR0no0"];
                const picArrays = [Five5, Six6, Three3];
                // Traverse the picture in contrast
                for (const key in picArrays) {
                    if (picArrays.hasOwnProperty(key)) {
                        const element = picArrays[key];
                        // Array traversal begins
                        console.log("Start comparison：", element);
                        const ts = Date.now();
                        // Get the image base64
                        const input = await faceapi.fetchImage(element);
                        // Image transcoding
                        const descriptor = await faceapi.computeFaceDescriptor(input);
                        // Picture identification
                        const bestMatch = await this.faceMatcher.findBestMatch(descriptor);
                        // Identification effect
                        console.log(
                            "Identification result：" + bestMatch.toString(),
                            "Identification time：" + `${Date.now() - ts} ms`,
                            "FPS：" + faceapi.round(1000 / (Date.now() - ts))
                        );
                        // End of array traversal
                    }
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
