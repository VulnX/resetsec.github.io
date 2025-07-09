const teamMembers = [
    {
        name: "makid3r",
        leader: true,
        tags: ["web", "forensics", "pwn", "mobile"],
        bio: "i like cyberpunk (and CS) (and also pizza, [and C.C])",
        socials: {
            "Blog": "https://makider.me",
            "GitHub": "https://github.com/N1kkogg",
        }
    },
    {
        name: "0x42",
        tags: ["osint", "forensics", "hardware"],
        bio: "The web whispers. I listen, uncovering patterns where others see noise.",
        socials: {
            "GitHub": "https://github.com/TimelessFez",
        }
    },
    {
        name: "Kibov",
        tags: ["web", "reverse engineering"],
        bio: "TBD",
    },
    {
        name: "m3m0rydmp",
        tags: ["web", "osint"],
        bio: "TBD",
    },
    {
        name: "Madrat_0",
        tags: ["crypto", "web"],
        bio: "TBD",
    },
    {
        name: "ol3livi0n",
        tags: ["web", "pwn", "reverse engineering", "crypto"],
        bio: "TBD",
    },
    {
        name: "VulnX",
        tags: ["pwn", "reverse engineering", "mobile", "forensics"],
        bio: "pwning stuff...\nPresident of Crypto club @ResetSec",
        socials: {
            "Blog": "https://vulnx.github.io/blog",
            "GitHub": "https://github.com/VulnX",
            "YouTube": "https://youtube.com/@thevulnx",
        }
    }
];


const formerMembers = [
    {
        name: "AntennaeVY",
        tags: [],
        bio: "TBD",
    },
    {
        name: "Brine",
        tags: [],
        bio: "TBD",
    },
    {
        name: "calx",
        tags: [],
        bio: "TBD",
    },
    {
        name: "daVinci",
        tags: [],
        bio: "TBD",
    },
    {
        name: "FIN",
        tags: [],
        bio: "TBD",
    },
    {
        name: "gexxr",
        tags: [],
        bio: "TBD",
    },
    {
        name: "greysneakthief",
        tags: [],
        bio: "TBD",
    },
    {
        name: "Ivan Nikolskiy",
        tags: [],
        bio: "TBD",
    },
    {
        name: "lh0ax",
        tags: [],
        bio: "TBD",
    },
    {
        name: "Kiarc",
        tags: [],
        bio: "TBD",
    },
    {
        name: "Spaced out Rexy",
        tags: [],
        bio: "TBD",
    },
    {
        name: "Tr1dent",
        tags: [],
        bio: "TBD",
    },
    {
        name: "xxaxaaa",
        tags: [],
        bio: "TBD",
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
        const divBio = document.createElement("div");

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
        divBio.className = "bio";
        member.bio.split("\n").forEach(line => {
            const spanLine = document.createElement('span');
            spanLine.textContent = line;
            divBio.appendChild(spanLine);
        });
        if (member.socials !== undefined) {
            const ul = document.createElement('ul');
            for (const key in member.socials) {
                if (member.socials.hasOwnProperty(key)) {
                    const what = key;
                    const link = member.socials[what];
                    const li = document.createElement('li');
                    const aLink = document.createElement('a');
                    aLink.href = link;
                    aLink.target = "_blank";
                    aLink.textContent = what;
                    li.appendChild(aLink);
                    ul.appendChild(li);
                }
            }
            divBio.appendChild(ul);
        }
        divMemberDescription.appendChild(divTags);
        divMemberDescription.appendChild(pName);
        divMemberDescription.appendChild(divBio);
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