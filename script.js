const CTFTimeTeamID = 266022
const CTFTimeURL = `https://ctftime.org/team/${CTFTimeTeamID}`;

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
            "Website": "https://vulnx.github.io",
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
    if (table === null) {
        console.error("Failed to insert members table. Cannot find <table> tag");
        return;
    }
    const colGroup = document.createElement("colgroup");
    const colLeft = document.createElement("col");
    const colRight = document.createElement("col");
    colLeft.style.width = "25%";
    colRight.style.width = "75%";
    colGroup.appendChild(colLeft);
    colGroup.appendChild(colRight);
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

        img.src = `/assets/profile/${member.name}.webp`;
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
            const spanLine = document.createElement("span");
            spanLine.textContent = line;
            divBio.appendChild(spanLine);
        });
        if (member.socials !== undefined) {
            const ul = document.createElement("ul");
            for (const key in member.socials) {
                if (member.socials.hasOwnProperty(key)) {
                    const what = key;
                    const link = member.socials[what];
                    const li = document.createElement("li");
                    const aLink = document.createElement("a");
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

async function getTeamStats() {
    const res = await fetch(`https://api.cors.lol/?url=${CTFTimeURL}`);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const years = [
        ...doc.querySelectorAll(".container .tab-content .tab-pane")
    ].filter(div => div.id.startsWith("rating_"));

    const stats = years
        .map(year => {
            const yearString = year.id.split("rating_")[1];
            const table = year.querySelector("table tbody");
            const rows = [...table.querySelectorAll("tr")];
            const ctfs = rows
                .filter(row => row.innerText !== "PlaceEventCTF pointsRating points")
                .map(row => {
                    const cols = row.querySelectorAll("td");
                    return {
                        "place": cols[1]?.innerText.trim(),
                        "event": cols[2]?.innerText.trim(),
                    };
                });
            return {
                "year": yearString,
                "ctfs": ctfs,
            };
        });

    return stats;
}

function addTeamStats() {
    // config variables
    const max_ctfs = 5; // Maximum number of CTFs to display from each year

    const statsPromise = getTeamStats();

    const table = document.querySelector(".team-stats");
    if (table === null) {
        console.error("Failed to insert members table. Cannot find <table> tag");
    }

    const colGroup = document.createElement("colgroup");
    const col1 = document.createElement("col");
    const col2 = document.createElement("col");
    const col3 = document.createElement("col");
    col1.style.width = "20%";
    col2.style.width = "20%";
    col3.style.width = "60%";
    colGroup.appendChild(col1);
    colGroup.appendChild(col2);
    colGroup.appendChild(col3);
    table.appendChild(colGroup);

    const trHeading = document.createElement('tr');
    const tdHeadingYear = document.createElement('td');
    const tdHeadingRank = document.createElement('td');
    const tdHeadingCTF = document.createElement('td');
    tdHeadingYear.innerText = 'Year';
    tdHeadingRank.innerText = 'Rank';
    tdHeadingCTF.innerText = 'CTF';
    trHeading.appendChild(tdHeadingYear);
    trHeading.appendChild(tdHeadingRank);
    trHeading.appendChild(tdHeadingCTF);
    table.appendChild(trHeading);

    statsPromise.then(stats => stats.forEach(record => {
        const ctfs = record.ctfs.sort((a, b) => Number(a.place) - Number(b.place)).slice(0, max_ctfs);
        ctfs.forEach((ctf, i) => {
            const tr = document.createElement('tr');
            const tdRank = document.createElement('td');
            const tdCTF = document.createElement('td');
            if (i == 0) {
                const tdYear = document.createElement('td');
                tdYear.innerText = record.year;
                tdYear.rowSpan = max_ctfs;
                tr.appendChild(tdYear);
            }
            tdRank.innerText = ctf.place;
            tdCTF.innerText = ctf.event;
            tr.appendChild(tdRank);
            tr.appendChild(tdCTF);
            table.appendChild(tr);
        });
    }));
}

document.querySelector(".terminal-btn").addEventListener("click", () => {
    window.location.href += "reset-console/";
});

function showSplashAnimation() {
    // config variables
    const repeat = 3;
    const animationSpeed = 30; // (in milliseconds)

    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const title = document.querySelector(".splash-title");
    const titleString = title.textContent;
    let iterations = 0;
    const interval = setInterval(() => {
        title.textContent = title.textContent.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return titleString[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        iterations += 1 / repeat;
        if (titleString.length < iterations) {
            clearInterval(interval);
            hideSplashScreen();
        }
    }, animationSpeed);

    function hideSplashScreen() {
        // config variables (in milliseconds)
        const delay = 750;
        const transitionSpeed = 300;

        setTimeout(() => {
            const splashScreen = document.querySelector(".splash-screen");
            splashScreen.style.transition = `${transitionSpeed / 1000}s`;
            splashScreen.style.opacity = 0;
            setTimeout(() => {
                splashScreen.style.display = "none";
            }, transitionSpeed);
        }, delay);
    }
}

showSplashAnimation();
addMembers(".active-members", teamMembers);
addMembers(".former-members", formerMembers);
addTeamStats();