document.addEventListener("DOMContentLoaded", () => {
  const announcement = document.querySelector("#home-data-announcements");
  if (!announcement) return;

  const cutoff = Date.now() - 60 * 24 * 60 * 60 * 1000;

  fetch("https://data.realgoodresearch.com/api/v1/collections", {
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Collections request failed: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const collections = (Array.isArray(data.items) ? data.items : [])
        .filter((collection) => {
          const publishedAt = Date.parse(collection.published_at || "");
          return Number.isFinite(publishedAt) && publishedAt >= cutoff;
        })
        .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));

      if (!collections.length) return;

      const track = document.createElement("div");
      track.className = "home-data-announcements-track";
      collections.forEach((collection) => {
        const item = document.createElement("span");
        item.className = "home-data-announcements-item";

        const label = document.createElement("span");
        label.className = "home-data-announcements-label";
        label.textContent = "New data";

        const date = document.createElement("span");
        date.className = "home-data-announcements-date";
        date.textContent = new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(collection.published_at));

        const link = document.createElement("a");
        link.href = `https://data.realgoodresearch.com/collection.html?slug=${encodeURIComponent(collection.slug)}`;
        link.textContent = collection.title || collection.slug;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        item.append(label, " ", date, " · ", link);
        track.appendChild(item);
      });

      announcement.appendChild(track);
      announcement.hidden = false;
    })
    .catch(() => {
      // The announcement is optional; leave it hidden if the API is unavailable.
    });
});
