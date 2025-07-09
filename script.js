const teamMembers = [
    {
        name: "makid3r",
        leader: true,
        tags: ["web", "forensics", "pwn", "mobile"],
        quote: "i like cyberpunk (and CS) (and also pizza, [and C.C])\n- Blog: https://makider.me\n- GitHub: makider",
    },
    {
        name: "0x42",
        tags: ["osint", "forensics", "hardware"],
        quote: "The web whispers. I listen, uncovering patterns where others see noise.\n- GitHub: TimelessFez",
    },
    {
        name: "Kibov",
        tags: ["web", "reverse engineering"],
        quote: "TBD",
    },
    {
        name: "m3m0rydmp",
        tags: ["web", "osint"],
        quote: "TBD",
    },
    {
        name: "Madrat_0",
        tags: ["crypto", "web"],
        quote: "TBD",
    },
    {
        name: "ol3livi0n",
        tags: ["web", "pwn", "reverse engineering", "crypto"],
        quote: "TBD",
    },
    {
        name: "VulnX",
        tags: ["pwn", "reverse engineering", "mobile", "forensics"],
        quote: "pwning stuff...\nPresident of Crypto club @ResetSec\n- Blog: https://vulnx.github.io/blog\n- GitHub: VulnX",
    }
];


const formerMembers = [
    {
        name: "AntennaeVY",
        tags: [],
        quote: "TBD",
    },
    {
        name: "Brine",
        tags: [],
        quote: "TBD",
    },
    {
        name: "calx",
        tags: [],
        quote: "TBD",
    },
    {
        name: "daVinci",
        tags: [],
        quote: "TBD",
    },
    {
        name: "FIN",
        tags: [],
        quote: "TBD",
    },
    {
        name: "gexxr",
        tags: [],
        quote: "TBD",
    },
    {
        name: "greysneakthief",
        tags: [],
        quote: "TBD",
    },
    {
        name: "Ivan Nikolskiy",
        tags: [],
        quote: "TBD",
    },
    {
        name: "lh0ax",
        tags: [],
        quote: "TBD",
    },
    {
        name: "Kiarc",
        tags: [],
        quote: "TBD",
    },
    {
        name: "Spaced out Rexy",
        tags: [],
        quote: "TBD",
    },
    {
        name: "Tr1dent",
        tags: [],
        quote: "TBD",
    },
    {
        name: "xxaxaaa",
        tags: [],
        quote: "TBD",
    }
];


function addMembers(where, members) {
    const table = document.querySelector(where);
    if (table == null) {
        console.error("Failed to insert members table. Cannot find <tbody> tag");
        return;
    }
    const colGroup = document.createElement('colgroup');
    const col_left = document.createElement('col');
    const col_right = document.createElement('col');
    col_left.style.width = "25%";
    col_right.style.width = "75%";
    colGroup.appendChild(col_left);
    colGroup.appendChild(col_right);
    table.appendChild(colGroup);
    members.forEach(member => {
        const tr = document.createElement("tr");
        const tdImage = document.createElement("td");
        const img = document.createElement("img");
        const tdMemberDescription = document.createElement("td");
        const divMemberDescription = document.createElement("div");
        const divTags = document.createElement("div");
        const pName = document.createElement("p");
        const divQuote = document.createElement("div");

        img.src = `/assets/profile/${member.name}.png`;
        img.alt = member.name;
        img.className = "member-pfp";
        tdImage.appendChild(img);
        divMemberDescription.className = "member-description";
        divTags.className = "tags";
        member.tags.forEach(tag => {
            const spanTag = document.createElement("span");
            spanTag.className = "tag";
            spanTag.setAttribute("data-tag", tag);
            divTags.appendChild(spanTag);
        });
        pName.className = "name";
        pName.textContent = member.name;
        if (member.leader === true) {
            pName.setAttribute("data-leader", "true");
        }
        divQuote.className = "quote";
        member.quote.split("\n").forEach(line => {
            const spanLine = document.createElement('span');
            spanLine.textContent = line;
            divQuote.appendChild(spanLine);
        });
        divMemberDescription.appendChild(divTags);
        divMemberDescription.appendChild(pName);
        divMemberDescription.appendChild(divQuote);
        tdMemberDescription.appendChild(divMemberDescription);
        tr.appendChild(tdImage);
        tr.appendChild(tdMemberDescription);
        table.appendChild(tr);
    });
}

document.querySelector(".terminal-btn").addEventListener("click", () => {
    window.location.href += "reset-console/";
});

addMembers(".active-members", teamMembers);
addMembers(".former-members", formerMembers);