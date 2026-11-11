document.addEventListener("DOMContentLoaded", () => {

    //1 task
    const nameElement = document.getElementById("personName");
    if (nameElement) {
        nameElement.textContent = "NOEL TAYLOR"; 
    }

    //2 task
    const arrows = document.querySelectorAll(".aside-toggle-arrow, .main-toggle-arrow");
        arrows.forEach(arrow => {
            arrow.addEventListener("click", function() {
                const section = this.closest("section");
                if (!section) return;
                const content = section.querySelector(".collapsible-content");

                if (content) {
                    content.classList.toggle("content-hidden");
                    if (!section) return;
                    this.classList.toggle("arrow-rotated");
                }
            });
    });

    //3 task
    const projectsData = [
        {
            title: "PORTFOLIO WEBSITE V1",
            period: "2024",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
        },
        {
            title: "TASK MANAGER APP",
            period: "2023",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
        },
        {
            title: "LANDING PAGE REDESIGN",
            period: "2023",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
        }
    ];

const container = document.getElementById("dynamic-projects-container");

    if (container) {
        container.innerHTML = "";

        projectsData.forEach(item => {
            const projectHTML = `
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold m-0">${item.title}</h6>
                        <span class="small fw-bold">${item.period}</span>
                    </div>
                    <p class="small mt-2 mb-0">
                        ${item.description}
                    </p>
                </div>
            `;
            
            container.innerHTML += projectHTML;
        });
    }
});