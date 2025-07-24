function extractMessage() {
  const fileInput = document.getElementById('extract-image');
  const output = document.getElementById('extract-output');

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

      let binaryMessage = "";
      for (let i = 0; i < data.length; i += 4) {
        binaryMessage += (data[i] & 1).toString();
      }

      const chars = binaryToText(binaryMessage);
      const eofIndex = chars.indexOf("EOF");
      if (eofIndex !== -1) {
        output.value = chars.substring(0, eofIndex);
      } else {
        output.value = "No hidden message found.";
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function binaryToText(binary) {
  let chars = [];
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    chars.push(String.fromCharCode(parseInt(byte, 2)));
  }
  return chars.join("");
}
