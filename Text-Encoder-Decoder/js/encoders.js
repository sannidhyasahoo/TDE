const encoders = {
  hex: {
    encode: (str) =>
      [...str].map((ch) => ch.charCodeAt(0).toString(16)).join(" "),
    decode: (str) =>
      str
        .split(" ")
        .map((hex) => String.fromCharCode(parseInt(hex, 16)))
        .join(""),
  },
  binary: {
    encode: (str) =>
      [...str]
        .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" "),
    decode: (str) =>
      str
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join(""),
  },
  octal: {
    encode: (str) =>
      [...str].map((ch) => ch.charCodeAt(0).toString(8)).join(" "),
    decode: (str) =>
      str
        .split(" ")
        .map((oct) => String.fromCharCode(parseInt(oct, 8)))
        .join(""),
  },
  ascii: {
    encode: (str) => [...str].map((ch) => ch.charCodeAt(0)).join(" "),
    decode: (str) =>
      str
        .split(" ")
        .map((num) => String.fromCharCode(num))
        .join(""),
  },
  base64: {
    encode: (str) => btoa(str),
    decode: (str) => atob(str),
  },
  morse: {
    map: {
      A: ".-",
      B: "-...",
      C: "-.-.",
      D: "-..",
      E: ".",
      F: "..-.",
      G: "--.",
      H: "....",
      I: "..",
      J: ".---",
      K: "-.-",
      L: ".-..",
      M: "--",
      N: "-.",
      O: "---",
      P: ".--.",
      Q: "--.-",
      R: ".-.",
      S: "...",
      T: "-",
      U: "..-",
      V: "...-",
      W: ".--",
      X: "-..-",
      Y: "-.--",
      Z: "--..",
      0: "-----",
      1: ".----",
      2: "..---",
      3: "...--",
      4: "....-",
      5: ".....",
      6: "-....",
      7: "--...",
      8: "---..",
      9: "----.",
      " ": "/",
    },
    encode: (str) =>
      [...str.toUpperCase()]
        .map((ch) => encoders.morse.map[ch] || "")
        .join(" "),
    decode: (str) => {
      const reverse = Object.entries(encoders.morse.map).reduce(
        (acc, [k, v]) => ((acc[v] = k), acc),
        {}
      );
      return str
        .split(" ")
        .map((morse) => reverse[morse] || "")
        .join("");
    },
  },
  nato: {
    map: {
      A: "Alpha",
      B: "Bravo",
      C: "Charlie",
      D: "Delta",
      E: "Echo",
      F: "Foxtrot",
      G: "Golf",
      H: "Hotel",
      I: "India",
      J: "Juliet",
      K: "Kilo",
      L: "Lima",
      M: "Mike",
      N: "November",
      O: "Oscar",
      P: "Papa",
      Q: "Quebec",
      R: "Romeo",
      S: "Sierra",
      T: "Tango",
      U: "Uniform",
      V: "Victor",
      W: "Whiskey",
      X: "X-ray",
      Y: "Yankee",
      Z: "Zulu",
      " ": "/",
    },
    encode: (str) =>
      [...str.toUpperCase()].map((ch) => encoders.nato.map[ch] || ch).join(" "),
    decode: (str) => {
      const reverse = Object.entries(encoders.nato.map).reduce(
        (acc, [k, v]) => ((acc[v] = k), acc),
        {}
      );
      return str
        .split(" ")
        .map((word) => reverse[word] || word)
        .join("");
    },
  },
  leet: {
    map: {
      A: "4",
      B: "8",
      E: "3",
      G: "6",
      I: "1",
      O: "0",
      S: "5",
      T: "7",
      Z: "2",
    },
    encode: (str) =>
      [...str.toUpperCase()].map((ch) => encoders.leet.map[ch] || ch).join(""),
    decode: (str) =>
      [...str]
        .map((ch) => {
          let key = Object.keys(encoders.leet.map).find(
            (k) => encoders.leet.map[k] === ch
          );
          return key || ch;
        })
        .join(""),
  },
  rot13: {
    encode: (str) =>
      str.replace(/[a-zA-Z]/g, (ch) =>
        String.fromCharCode(
          ch.charCodeAt(0) + (ch.toLowerCase() < "n" ? 13 : -13)
        )
      ),
    decode: (str) => encoders.rot13.encode(str),
  },
  url: {
    encode: (str) => encodeURIComponent(str),
    decode: (str) => decodeURIComponent(str),
  },
  html: {
    encode: (str) =>
      str.replace(
        /[\u00A0-\u9999<>\&]/gim,
        (i) => "&#" + i.charCodeAt(0) + ";"
      ),
    decode: (str) => str.replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n)),
  },
  piglatin: {
    encode: (str) =>
      str
        .split(" ")
        .map((word) => word.slice(1) + word[0] + "ay")
        .join(" "),
    decode: (str) =>
      str
        .split(" ")
        .map((word) => word.slice(-3, -2) + word.slice(0, -3))
        .join(" "),
  },
  upside: {
    map: {
      a: "ɐ",
      b: "q",
      c: "ɔ",
      d: "p",
      e: "ǝ",
      f: "ɟ",
      g: "ƃ",
      h: "ɥ",
      i: "ᴉ",
      j: "ɾ",
      k: "ʞ",
      l: "l",
      m: "ɯ",
      n: "u",
      o: "o",
      p: "d",
      q: "b",
      r: "ɹ",
      s: "s",
      t: "ʇ",
      u: "n",
      v: "ʌ",
      w: "ʍ",
      x: "x",
      y: "ʎ",
      z: "z",
      ".": "˙",
      "[": "]",
      "(": ")",
      "{": "}",
      "?": "¿",
      "!": "¡",
      "'": ",",
      ",": "'",
      1: "Ɩ",
      2: "ᄅ",
      3: "Ɛ",
      4: "ㄣ",
      5: "ϛ",
      6: "9",
      7: "ㄥ",
      8: "8",
      9: "6",
      0: "0",
    },
    encode: (str) =>
      [...str.toLowerCase()]
        .map((ch) => encoders.upside.map[ch] || ch)
        .reverse()
        .join(""),
    decode: (str) => {
      const reverse = Object.entries(encoders.upside.map).reduce(
        (acc, [k, v]) => ((acc[v] = k), acc),
        {}
      );
      return [...str]
        .reverse()
        .map((ch) => reverse[ch] || ch)
        .join("");
    },
  },
};
