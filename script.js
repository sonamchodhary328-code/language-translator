const translateBtn = document.getElementById("translateBtn");
const clearBtn = document.getElementById("clearBtn");
const listenEnglishBtn = document.getElementById("listenEnglishBtn");
const englishInput = document.getElementById("englishInput");
const gravityToggle = document.getElementById("gravityToggle");
const cardsGrid = document.getElementById("cardsGrid");

let isGravityOff = true;

// Toggle Anti-Gravity Floating Effect
gravityToggle.addEventListener("click", () => {
  isGravityOff = !isGravityOff;
  if (isGravityOff) {
    cardsGrid.classList.remove("no-gravity");
    gravityToggle.innerText = "Anti-Gravity: ON";
  } else {
    cardsGrid.classList.add("no-gravity");
    gravityToggle.innerText = "Anti-Gravity: OFF";
  }
});

// Translate Button Click
translateBtn.addEventListener("click", () => {
  const text = englishInput.value.trim();
  if (!text) {
    alert("Please type an English word or sentence first!");
    return;
  }

  document.getElementById("spanishOutput").innerText = "Translating...";
  document.getElementById("germanOutput").innerText = "Translating...";
  document.getElementById("frenchOutput").innerText = "Translating...";

  fetchTranslation(text, "es", "spanishOutput");
  fetchTranslation(text, "de", "germanOutput");
  fetchTranslation(text, "fr", "frenchOutput");
});

// Live Online Translation for ANY random word or sentence
async function fetchTranslation(text, targetLang, elementId) {
  try {
    const googleUrl = `https://googleapis.com{targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(googleUrl);
    const data = await response.json();
    
    // Combine all translated parts into a full word/sentence
    const translatedText = data[0].map(item => item[0]).join("");
    document.getElementById(elementId).innerText = translatedText;

  } catch (error) {
    document.getElementById(elementId).innerText = "Please check internet connection.";
  }
}

// Pronounce Translated Words
function pronounceWord(elementId, langCode) {
  const text = document.getElementById(elementId).innerText;
  if (!text || text.includes("appears here") || text === "Translating...") {
    alert("Translate a word first before listening!");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

// Pronounce Original English Input
listenEnglishBtn.addEventListener("click", () => {
  const text = englishInput.value.trim();
  if (!text) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
});

// Copy Translated Text
function copyText(elementId) {
  const text = document.getElementById(elementId).innerText;
  if (!text || text.includes("appears here")) return;

  navigator.clipboard.writeText(text);
  alert("Copied to clipboard: " + text);
}

// Clear All Fields
clearBtn.addEventListener("click", () => {
  englishInput.value = "";
  document.getElementById("spanishOutput").innerText = "Translation appears here...";
  document.getElementById("germanOutput").innerText = "Translation appears here...";
  document.getElementById("frenchOutput").innerText = "Translation appears here...";
});
