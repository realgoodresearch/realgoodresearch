document.addEventListener("DOMContentLoaded", () => {
  const slot = document.querySelector("#home-news-slot");
  const listing = document.querySelector(".quarto-listing#listing-home-news");
  if (!slot || !listing) return;

  slot.appendChild(listing);

  const cards = Array.from(listing.querySelectorAll(".g-col-1"));
  if (!cards.length) return;

  let activeIndex = 0;
  const cssDelay = window.getComputedStyle(slot).getPropertyValue("--carousel-delay-ms").trim();
  const parsedDelay = Number.parseInt(cssDelay, 10);
  const intervalMs = Number.isFinite(parsedDelay) && parsedDelay > 0 ? parsedDelay : 8000;
  let timerId = null;

  const setActive = (index) => {
    cards.forEach((card, i) => {
      card.classList.toggle("is-active", i === index);
    });
  };

  const goTo = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    setActive(activeIndex);
  };

  const startAutoPlay = () => {
    if (cards.length < 2) return;
    if (timerId) window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      goTo(activeIndex + 1);
    }, intervalMs);
  };

  const createControlButton = (direction, label) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `home-carousel-control home-carousel-control-${direction}`;
    button.setAttribute("aria-label", label);
    button.innerHTML = direction === "prev" ? "&#10094;" : "&#10095;";
    return button;
  };

  const prevButton = createControlButton("prev", "Previous news post");
  const nextButton = createControlButton("next", "Next news post");
  listing.appendChild(prevButton);
  listing.appendChild(nextButton);

  prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(activeIndex - 1);
    startAutoPlay();
  });

  nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(activeIndex + 1);
    startAutoPlay();
  });

  setActive(activeIndex);
  startAutoPlay();
});
