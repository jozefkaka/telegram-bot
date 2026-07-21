const textInput = document.getElementById("textInput");
const stylesContainer = document.getElementById("stylesContainer");
const characterCount = document.getElementById("characterCount");
const filters = document.querySelectorAll(".filter");

const styles = [
    {
        name: "✨ فانتزی",
        category: "fancy",
        convert: text => {
            const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const fancy = "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃";

            return [...text].map(char => {
                const index = normal.indexOf(char);
                return index !== -1 ? fancy[index] : char;
            }).join("");
        }
    },

    {
        name: "🖤 Bold Gothic",
        category: "gaming",
        convert: text => {
            const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const gothic = "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟";

            return [...text].map(char => {
                const index = normal.indexOf(char);
                return index !== -1 ? gothic[index] : char;
            }).join("");
        }
    },

    {
        name: "🔠 Full Width",
        category: "simple",
        convert: text => {
            return [...text].map(char => {
                if (char >= "!" && char <= "~") {
                    return String.fromCharCode(char.charCodeAt(0) + 65248);
                }
                return char;
            }).join("");
        }
    },

    {
        name: "ᴄᴀᴘɪᴛᴀʟ ᴍɪɴɪ",
        category: "simple",
        convert: text => {
            const map = {
                A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ",
                E: "ᴇ", F: "ғ", G: "ɢ", H: "ʜ",
                I: "ɪ", J: "ᴊ", K: "ᴋ", L: "ʟ",
                M: "ᴍ", N: "ɴ", O: "ᴏ", P: "ᴘ",
                Q: "ǫ", R: "ʀ", S: "s", T: "ᴛ",
                U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "x",
                Y: "ʏ", Z: "ᴢ"
            };

            return text.toUpperCase().split("").map(char => map[char] || char).join("");
        }
    },

    {
        name: "🎮 Gaming Style",
        category: "gaming",
        convert: text => {
            return "꧁༺ " + text + " ༻꧂";
        }
    },

    {
        name: "💎 Diamond",
        category: "fancy",
        convert: text => {
            return "『 " + text + " 』";
        }
    }
];

function renderStyles(category = "all") {

    stylesContainer.innerHTML = "";

    const filteredStyles = category === "all"
        ? styles
        : styles.filter(style => style.category === category);

    filteredStyles.forEach(style => {

        const card = document.createElement("div");
        card.className = "style-card";

        const name = document.createElement("div");
        name.className = "style-name";
        name.textContent = style.name;

        const preview = document.createElement("div");
        preview.className = "style-preview";
        preview.textContent = style.convert(textInput.value);

        const button = document.createElement("button");
        button.className = "copy-button";
        button.textContent = "📋 کپی کردن";

        button.addEventListener("click", async () => {

            await navigator.clipboard.writeText(style.convert(textInput.value));

            button.textContent = "✅ کپی شد!";

            setTimeout(() => {
                button.textContent = "📋 کپی کردن";
            }, 1500);

        });

        card.appendChild(name);
        card.appendChild(preview);
        card.appendChild(button);

        stylesContainer.appendChild(card);
    });
}

textInput.addEventListener("input", () => {

    characterCount.textContent =
        `${textInput.value.length} کاراکتر`;

    renderStyles();
});

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button =>
            button.classList.remove("active")
        );

        filter.classList.add("active");

        renderStyles(filter.dataset.filter);
    });
});

renderStyles();

characterCount.textContent =
    `${textInput.value.length} کاراکتر`;
