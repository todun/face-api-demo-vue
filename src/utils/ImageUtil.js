/**
 * Media streaming base64 data
 * @param {stream} videoStream Media stream
 */
export const canvasToDataURL = videoStream => {
    if (typeof videoStream !== "object") return "";
    // Create canvas
    let canvas = document.createElement("canvas");
    canvas.width = videoStream.videoWidth;
    canvas.height = videoStream.videoHeight;
    // Canvas drawing
    var ctx = canvas.getContext("2d");
    ctx.drawImage(videoStream, 0, 0, canvas.width, canvas.height);
    var linearGradient = ctx.createLinearGradient(0, 0, 300, 0);
    linearGradient.addColorStop("0", "#40E0D0");
    linearGradient.addColorStop("0.5", "#FF8C00");
    linearGradient.addColorStop("1.0", "#f7797d");
    // Drawing information
    ctx.font = "35px FZShuTi";
    ctx.fillStyle = linearGradient;
    ctx.fillText("Face-Api simple to use", 20, 50);
    return canvas.toDataURL();
};

/**
 * Base64 string to binary file
 * @param {String} base64Date base64 string
 */
export const base64ToBlob = base64Date => {
    let byteString = atob(base64Date.split(",")[1]);
    let mimeString = base64Date
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: mimeString
    });
};

/**
 * Image file to base64
 * @param {Object} Img picture
 * @param {function} callback Callback
 */
export const fileToBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

/**
 * Save base64 string to file download by building a link
 * @param {String} data Base64 string
 * @param {String} fileName Save file name
 */
export const saveBase64ToFileObjectURL = (data, fileName) => {
    // Create hidden downloadable links
    let eleLink = document.createElement("a");
    eleLink.download = fileName;
    eleLink.style.display = "none";
    eleLink.href = URL.createObjectURL(base64ToBlob(data));
    // Trigger click
    document.body.appendChild(eleLink);
    eleLink.click();
    // Then remove
    document.body.removeChild(eleLink);
};
