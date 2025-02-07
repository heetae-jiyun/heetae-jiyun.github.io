let originalData = [];
let jsonData = [];
let currentPage = 1;
const itemsPerPage = 15;

async function fetchData() {
    try {
        const response = await fetch('resource/json/cook.json'); // JSON 파일 경로
        originalData = await response.json();
        jsonData = [...originalData];
        displayCards();
    } catch (error) {
        console.error("데이터 로드 오류:", error);
    }
}

function displayCards() {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const filteredData = jsonData.slice(start, end);
    
    filteredData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                <a href="${item.link}" target="_blank" style="text-decoration: none; color: inherit; display: block; height: 100%;">
                    <img src="${item.thumbnail || `https://www.google.com/s2/favicons?domain=${new URL(item.link).hostname}`}" alt="${item.title}">
                    <h3>${item.title}</h3>
                </a>
            `;
                // <p style="text-align: center; color: blue;">자세히 보기</p>
        container.appendChild(card);
    });
    setupPagination();
}

function setupPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(jsonData.length / itemsPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.onclick = () => {
            currentPage = i;
            displayCards();
        };
        if (i === currentPage) {
            button.style.backgroundColor = "#0056b3";
        }
        pagination.appendChild(button);
    }
}

function resetSearch() {
    jsonData = [...originalData];
    document.getElementById("searchInput").value = "";
    currentPage = 1;
    displayCards();
}

function searchCards() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    jsonData = jsonData.filter(item => item.title.toLowerCase().includes(searchInput));
    currentPage = 1;
    displayCards();
}

fetchData();