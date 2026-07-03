(() => {
    const pages = [
        { id: "home", label: "Home", href: "index.html" },
        { id: "endorsements", label: "Endorsements", href: "endorsements.html" },
        { id: "whats-happening", label: '"What\'s happening?"', href: "What's%20happening.html", emphasize: true },
        { id: "bio", label: "Biography", href: "bio.html" },
        { id: "awards", label: "Awards", href: "awards.html" },
        { id: "home-university-service", label: "Home University Service", href: "home_university_service.html" },
        { id: "ieee-service", label: "IEEE Service", href: "IEEE_service.html" },
        { id: "scholarly-work", label: "Scholarly work", href: "scholarly_work.html" },
        { id: "cv", label: "CV", href: "support_files/resume.pdf" },
        { id: "contact", label: "Contact", href: "contact.html" },
    ];

    const headerHtml = `
        <section class="TitleBanner" id="titleBanner">
            <h1 class="Title" id="title">Jean-Luc Gaudiot for Division V Director</h1>
        </section>`;

    const bannerHtml = `
        <section class="banner" id="banner">
            <a class="bannerLink">"An Experienced Leader with a Global Perspective"</a>
        </section>`;

    const footerHtml = `
        <section class="footer" id="footer">
            <p class="footNote">Disclaimer: The opinions on this page are mine and are not necessarily those of the IEEE
                Computer Society or the
                IEEE.</p>
        </section>`;

    const activePage = document.body.dataset.page || "home";
    const bodySection = document.getElementById("bodySection");
    if (!bodySection) {
        return;
    }

    if (!document.querySelector('meta[name="viewport"]')) {
        const viewportMeta = document.createElement("meta");
        viewportMeta.name = "viewport";
        viewportMeta.content = "width=device-width, initial-scale=1";
        document.head.appendChild(viewportMeta);
    }

    if (!document.getElementById("titleBanner")) {
        bodySection.insertAdjacentHTML("beforebegin", headerHtml + bannerHtml);
    }

    if (!document.getElementById("footer")) {
        bodySection.insertAdjacentHTML("afterend", footerHtml);
    }

    document.querySelectorAll("#buttonIeee").forEach((button) => {
        const originalLabel = button.textContent.trim();
        if (originalLabel && !originalLabel.startsWith("★")) {
            button.textContent = `★ ${originalLabel}`;
        }

        const electionUrl = button.getAttribute("href") || "https://www.ieee.org/election";
        button.dataset.electionUrl = electionUrl;
        button.setAttribute("href", "#");
        button.setAttribute("aria-disabled", "true");
        button.classList.add("is-disabled");
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
        });

        if (!button.nextElementSibling || !button.nextElementSibling.classList.contains("electionNotice")) {
            const notice = document.createElement("p");
            notice.className = "electionNotice";
            notice.textContent = "The 2026 Annual Election will begin on 17 August and end on 1 October 2026 at 12:00 Noon Eastern Time";
            button.insertAdjacentElement("afterend", notice);
        }
    });

    const navHost = document.getElementById("site-nav");
    if (!navHost) {
        return;
    }

    let pageContent = document.getElementById("pageContent");
    if (!pageContent) {
        pageContent = document.createElement("div");
        pageContent.id = "pageContent";
        pageContent.className = "pageContent";
        pageContent.style.flex = "1 1 auto";
        pageContent.style.minHeight = "0";
        pageContent.style.overflowY = "auto";

        const movableChildren = Array.from(bodySection.children).filter((child) => child.id !== "site-nav");
        if (movableChildren.length > 0) {
            bodySection.appendChild(pageContent);
            movableChildren.forEach((child) => pageContent.appendChild(child));
        }
    }

    navHost.innerHTML = `
        <div class="navigationBar" data-scrolled="true" id="navBar">
            <nav>
                <ul>
                    ${pages.map((page) => {
                        const isActive = page.id === activePage;
                        const className = isActive ? ' class="active"' : '';
                        const style = page.emphasize && !isActive ? ' style="color: firebrick"' : '';
                        const label = page.emphasize && !isActive
                            ? `<b><u>${escapeHtml(page.label)}</u></b>`
                            : escapeHtml(page.label);

                        return `<li><a${className}${style} href="${page.href}">${label}</a></li>`;
                    }).join("")}
                </ul>
            </nav>
        </div>`;

    function escapeHtml(value) {
        return value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
    }
})();