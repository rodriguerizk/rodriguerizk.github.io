const PHOENICIAN_MAP = {
    "b": "𐤁", "g": "𐤂", "d": "𐤃", "h": "𐤄",
    "w": "𐤅", "z": "𐤆", "ḥ": "𐤇", "ḥ": "𐤇", "ch": "𐤇",
    "ṭ": "𐤈", "y": "𐤉", "k": "𐤊", "c": "𐤊", "ck": "𐤊",
    "l": "𐤋", "m": "𐤌", "n": "𐤍", "s": "𐤎",
    "ʿ": "𐤏", "p": "𐤐", "f": "𐤐", "ph": "𐤐",
    "ṣ": "𐤑", "q": "𐤒", "r": "𐤓",
    "š": "𐤔", "sh": "𐤔", "t": "𐤕",
    "ʾ": "𐤀", "'": "𐤀", "’": "𐤀"
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function convertName() {
    let name = document.getElementById("nameInput").value.toLowerCase();
    let result = "";
    let i = 0;

    while (i < name.length) {
        let char = name[i];
        let nextChar = name[i + 1] || "";

        // Skip non-alphabetic characters
        if (!/[a-zʼ'ʾ]/.test(char)) {
            i++;
            continue;
        }

        // Check for digraphs first (two-letter combinations)
        let two = char + nextChar;
        if (PHOENICIAN_MAP[two]) {
            result += PHOENICIAN_MAP[two];
            i += 2;
            continue;
        }

        // Double letters (e.g., "ss") → single consonant
        if (char === nextChar && PHOENICIAN_MAP[char]) {
            result += PHOENICIAN_MAP[char];
            i += 2;
            continue;
        }

        // Aleph rules at start
        if (i === 0) {
            if ((char === "a" || char === "e") || ((char === "i" || char === "y") && VOWELS.has(nextChar))) {
                result += char === "i" || char === "y" ? "𐤉" : "𐤀";
                i++;
                continue;
            }
        }

        // Handle consonantal Aleph indicators ('a, ’a, ʾa)
        if ((char === "'" || char === "’" || char === "ʾ") && nextChar === "a") {
            result += "𐤀";
            i += 2;
            continue;
        }

        // Skip vowels inside the word
        if (VOWELS.has(char)) {
            i++;
            continue;
        }

        // Single consonant mapping
        if (PHOENICIAN_MAP[char]) {
            result += PHOENICIAN_MAP[char];
        }

        i++;
    }

    document.getElementById("phoenicianOutput").textContent = result;
}
