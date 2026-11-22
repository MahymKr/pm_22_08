//DOM initialization
document.addEventListener("DOMContentLoaded", () => {
    const arrows = document.querySelectorAll(".aside-toggle-arrow, .main-toggle-arrow");
    arrows.forEach(arrow => {arrow.addEventListener("click", arrowOnClick);});

    loadResumeData("data.json");
});

//Arrow`s function
function arrowOnClick() {
    const section = this.closest("section");
    if (!section) return;

    const content = section.querySelector(".collapsible-content");
    if (content) {
        content.classList.toggle("content-hidden");
        this.classList.toggle("arrow-rotated");
    }    
}

//Person Name
function renderPersonName(firstName, lastName) {
    const nameElement = document.getElementById("personName");

    if (nameElement) {
        nameElement.textContent = `${firstName} ${lastName}`.trim(); 
    }
}

//Project
function renderProjects(items, container) {
        container.innerHTML = "";

        items.forEach(item => {
            const projectHTML = `
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold m-0">${item.title}</h6>
                        <span class="small fw-bold">${item.period}</span>
                    </div>
                    <p class="small mb-0 mt-1">${item.description}</p>
                </div>`;
            container.innerHTML += projectHTML;
        });
}

//Resume data
async function loadResumeData(url) {
    const statusEl = document.getElementById("ajax-status");
    const projectsContainer = document.getElementById("dynamic-projects-container");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (statusEl) {
            statusEl.textContent = "";
        }

        if (data.person) {
            renderPersonName(data.person.firstName, data.person.lastName);
        }

        if (Array.isArray(data.projects) && projectsContainer) {
            renderProjects(data.projects, projectsContainer);
        }
    } 
    catch(error) {
        console.error("Error::data.json not downloaded::", error);
        if (statusEl) {
            statusEl.textContent = "Failed to load data.";
        }
    }
}