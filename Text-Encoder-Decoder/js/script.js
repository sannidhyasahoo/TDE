function handleEncode() {
  const input = document.getElementById("inputText").value;
  const type = document.getElementById("encodingType").value;
  document.getElementById("outputText").value = encoders[type].encode(input);
}

function handleDecode() {
  const input = document.getElementById("inputText").value;
  const type = document.getElementById("encodingType").value;
  document.getElementById("outputText").value = encoders[type].decode(input);
}

function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
}

function copyOutput() {
  const output = document.getElementById("outputText");
  output.select();
  document.execCommand("copy");
}

function downloadOutput() {
  const blob = new Blob([document.getElementById("outputText").value], {
    type: "text/plain",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "encoded.txt";
  link.click();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function shareLink() {
  const inputText = encodeURIComponent(
    document.getElementById("inputText").value
  );
  const encodingType = document.getElementById("encodingType").value;
  const encodedLink = `${window.location.origin}${window.location.pathname}?text=${inputText}&type=${encodingType}`;
  navigator.clipboard.writeText(encodedLink);
  alert("Encoded link copied to clipboard!");
}

function autoDetectEncoding() {
  const input = document.getElementById("inputText").value;
  const detectedType = detectEncoding(input);
  if (detectedType) {
    document.getElementById("encodingType").value = detectedType;
  }
}

function detectEncoding(text) {
  if (/^[01\s]+$/.test(text)) return "binary";
  if (/^[.-\/\s]+$/.test(text)) return "morse";
  if (/^[0-9a-f\s]+$/i.test(text)) return "hex";
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(text)) return "nato";
  if (/^[A-Za-z0-9+\/=]+$/.test(text)) return "base64";
  return null;
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const text = params.get("text");
  const type = params.get("type");
  if (text && type && encoders[type]) {
    document.getElementById("inputText").value = decodeURIComponent(text);
    document.getElementById("encodingType").value = type;
    handleEncode();
  }
};
