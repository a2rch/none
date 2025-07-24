function embedMessage() {
  const fileInput = document.getElementById('embed-image');
  const message = document.getElementById('embed-message').value;
  const downloadLink = document.getElementById('download-link');

  if (!fileInput.files[0]) {
    alert('Please select an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const binaryMessage = textToBinary(message + "EOF");
      if (binaryMessage.length > data.length / 4) {
        alert("Message is too long for this image.");
        return;
      }

      // إدخال الرسالة في الصورة باستخدام LSB
      for (let i = 0; i < binaryMessage.length; i++) {
        const pixelIndex = i * 4;
        data[pixelIndex] = (data[pixelIndex] & 0xFE) | parseInt(binaryMessage[i]);
      }

      ctx.putImageData(imageData, 0, 0);
      const stegoImage = canvas.toDataURL("image/png");
      downloadLink.href = stegoImage;
      downloadLink.style.display = "block";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function textToBinary(text) {
  return text.split("").map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join("");
}
