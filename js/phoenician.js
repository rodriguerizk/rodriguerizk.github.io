const PHOENICIAN_MAP = {
    "b": "𐤁", "g": "𐤂", "d": "𐤃", "h": "𐤄",
    "w": "𐤅", "z": "𐤆", "ḥ": "𐤇", "ḥ": "𐤇",
    "ṭ": "𐤈", "y": "𐤉", "k": "𐤊", "c": "𐤊", "ck": "𐤊",
    "l": "𐤋", "m": "𐤌", "n": "𐤍", "s": "𐤎",
    "ʿ": "𐤏", "p": "𐤐", "f": "𐤐",
    "ṣ": "𐤑", "q": "𐤒", "r": "𐤓",
    "š": "𐤔", "sh": "𐤔", "t": "𐤕",
    // CONSONANTAL ALEPH
    "ʾ": "𐤀", "'": "𐤀", "’": "𐤀"
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function convertName() {
    let name = document.getElementById("nameInput").value.toLowerCase();
    let result = "";

    let i = 0;
    while (i < name.length) {

        // Check for consonantal aleph indicators: 'a, ’a, ʾa
        if ((name[i] === "'" || name[i] === "’" || name[i] === "ʾ") &&
            name[i+1] === "a") {
            result += "𐤀";
            i += 2;
            continue;
        }

        // aleph at start before another vowel (Aaron → 𐤀)
        if (i === 0 && name[i] === "a"  && VOWELS.has(name[i+1])) {
            result += "𐤀";
            i++;
            continue;
        }

        // aleph or e at start (Alex or Elie → 𐤀)
        if (i === 0 && (name[i] === "a"  || name[i] === "e")) {
            result += "𐤀";
            i++;
            continue;
        }

       // i or y before another vowel  (Elias → 𐤀)
        if ((name[i] === "i"  || name[i] === "y")  && VOWELS.has(name[i+1]) ) {
            result += "𐤉";
            i++;
            continue;
        }
        // handle two-letter combos (sh, ḥ, ṣ, etc.)
        const two = name.slice(i, i+2);
        if (PHOENICIAN_MAP[two]) {
            result += PHOENICIAN_MAP[two];
            i += 2;
            continue;
        }

        // handle two-letter combos (ss, etc.)
        if (name[i] === name[i+1]) {
            result += PHOENICIAN_MAP[name[i]];
            i += 2;
            continue;
        }

        // skip vowels
        if (VOWELS.has(name[i])) {
            i++;
            continue;
        }

        // single consonant
        if (PHOENICIAN_MAP[name[i]]) {
            result += PHOENICIAN_MAP[name[i]];
        }

        i++;
    }

    document.getElementById("phoenicianOutput").textContent = result;
}




