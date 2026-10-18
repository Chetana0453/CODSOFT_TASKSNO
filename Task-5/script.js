const posts = [
  {
    id: 1,
    title: "Starting Your Web Development Journey",
    category: "Technology",
    tags: ["HTML", "CSS", "Beginners"],
    date: "2026-10-15",
    image: "images/technology.jpg",
    imageAlt: "Laptop on a desk",
    excerpt:
      "Discover how HTML, CSS, and JavaScript work together to bring your ideas to life."
  },
  {
    id: 2,
    title: "Finding Peace in the Mountains",
    category: "Travel",
    tags: ["Nature", "Mountains"],
    date: "2026-10-14",
    image: "images/travel.jpg",
    imageAlt: "A scenic mountain landscape",
    excerpt:
      "Step away from your daily routine and discover the joy of exploring mountain trails."
  },
  {
    id: 3,
    title: "Small Habits for a Better Day",
    category: "Lifestyle",
    tags: ["Habits", "Wellbeing"],
    date: "2026-10-13",
    image: "images/lifestyle.jpg",
    imageAlt: "Notebook and a cup on a table",
    excerpt:
      "Simple daily habits can help you feel more organised, focused, and relaxed."
  },
  {
    id: 4,
    title: "Why Responsive Design Matters",
    category: "Technology",
    tags: ["CSS", "Web Design"],
    date: "2026-10-12",
    image: "images/technology2.jpg",
    imageAlt: "Laptop on a desk",
    excerpt:
      "Learn why websites should adapt to phones, tablets, and larger screens."
  },
  {
    id: 5,
    title: "Making the Most of a Weekend Trip",
    category: "Travel",
    tags: ["Planning", "Weekends"],
    date: "2026-10-11",
    image: "images/travel2.jpg",
    imageAlt: "A scenic mountain landscape",
    excerpt:
      "A little preparation can turn a short weekend break into a memorable adventure."
  },
  {
    id: 6,
    title: "Creating a Comfortable Study Space",
    category: "Lifestyle",
    tags: ["Study", "Productivity"],
    date: "2026-10-10",
    image: "images/lifestyle2.jpg",
    imageAlt: "Notebook and a cup on a table",
    excerpt:
      "Make your study space more comfortable with a few practical changes."
  }
];

const blogGrid = document.querySelector("#blog-grid");

function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "blog-card";

  const image = document.createElement("img");
  image.src = post.image;
  image.alt = post.imageAlt;
  image.loading = "lazy";

  const content = document.createElement("div");
  content.className = "card-content";

  const category = document.createElement("span");
  category.className = "category";
  category.textContent = post.category;

  const heading = document.createElement("h3");
  heading.textContent = post.title;

  const date = document.createElement("time");
  date.dateTime = post.date;
  date.textContent = new Date(
    post.date + "T00:00:00"
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const excerpt = document.createElement("p");
  excerpt.textContent = post.excerpt;

  const tags = document.createElement("div");
  tags.className = "tags";

  post.tags.forEach(function (tagName) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "#" + tagName;
    tags.appendChild(tag);
  });

  const link = document.createElement("a");
  link.href = `post.html?id=${post.id}`;
  link.textContent = "Read article →";
  link.setAttribute("aria-label", `Read ${post.title}`);

  content.append(category, heading, date, excerpt, tags, link);
  card.append(image, content);

  return card;
}

if (blogGrid) {
  const searchInput = document.querySelector("#search-input");
  const categoryFilter = document.querySelector("#category-filter");
  const loadMoreButton = document.querySelector("#load-more");
  const resultsMessage = document.querySelector("#results-message");

  let visibleCount = 3;

  function showPosts() {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredPosts = posts.filter(function (post) {
      const searchableText =
        `${post.title} ${post.excerpt} ${post.tags.join(" ")}`;

      const matchesSearch = searchableText
        .toLowerCase()
        .includes(searchText);

      const matchesCategory =
        categoryFilter.value === "all" ||
        post.category === categoryFilter.value;

      return matchesSearch && matchesCategory;
    });

    blogGrid.innerHTML = "";

    const visiblePosts = filteredPosts.slice(0, visibleCount);

    visiblePosts.forEach(function (post) {
      blogGrid.appendChild(createPostCard(post));
    });

    resultsMessage.textContent =
      filteredPosts.length === 0
        ? "No articles found. Try another search or category."
        : `Showing ${visiblePosts.length} of ${filteredPosts.length} articles.`;

    loadMoreButton.hidden = visibleCount >= filteredPosts.length;
  }

  function resetAndShowPosts() {
    visibleCount = 3;
    showPosts();
  }

  searchInput.addEventListener("input", resetAndShowPosts);
  categoryFilter.addEventListener("change", resetAndShowPosts);

  loadMoreButton.addEventListener("click", function () {
    visibleCount += 3;
    showPosts();
  });

  showPosts();
}
const articleContent = {
  1: [
    "Web development begins with understanding how a browser displays a page. HTML gives the page its structure through headings, paragraphs, links, and images.",
    "CSS controls the appearance. You can use it to adjust colours, spacing, fonts, and layouts. Start with a simple page and practise making it fit both a phone and a desktop screen.",
    "JavaScript adds interaction, such as searching articles or opening a navigation menu. Build small projects, test each feature, and improve your code as you learn."
  ],
  2: [
    "A mountain trip offers a chance to slow down and enjoy a different environment. Walking through a quiet trail can make even a short break feel refreshing.",
    "Choose a route that matches your experience. Check the weather, carry drinking water, and let someone know your plans before leaving.",
    "Respect the landscape by keeping to marked trails and taking your rubbish home. Enjoy the views without disturbing wildlife or other visitors."
  ],
  3: [
    "A better day often starts with small, realistic habits. Choose one action that you can repeat consistently rather than trying to change your entire routine at once.",
    "Prepare a short list of priorities each morning. Include breaks and leave space for unexpected tasks so that your schedule remains manageable.",
    "At the end of the day, notice what worked and what needs adjusting. Progress comes from a routine that fits your life and can improve over time."
  ],
  4: [
    "People visit websites on screens of many different sizes. Responsive design helps the same content remain readable and usable across those devices.",
    "Flexible layouts, appropriately sized images, and CSS media queries allow a page to adapt. A three-column article grid might become a single column on a phone.",
    "Test more than the page width. Check that text is readable, buttons are easy to tap, and navigation works with both a keyboard and a touch screen."
  ],
  5: [
    "A weekend trip does not need a crowded itinerary. Pick a destination with a manageable journey so that you have enough time to enjoy being there.",
    "Plan the essentials first: transport, accommodation, and a rough budget. Choose a few activities and leave room for rest or an unexpected discovery.",
    "Pack for the weather and keep important information accessible. A simple plan can reduce last-minute stress while leaving the trip flexible."
  ],
  6: [
    "A comfortable study space should support the work you need to do. Start with a clear surface, useful lighting, and a chair that allows a comfortable sitting position.",
    "Keep frequently used materials within reach and put distracting items away. A small organised space can be more useful than a large cluttered desk.",
    "Adjust your setup as you use it. Take regular breaks, change position, and choose a study routine that helps you maintain attention."
  ]
};

const postDetail = document.querySelector("#post-detail");

if (postDetail) {
  const parameters = new URLSearchParams(window.location.search);
  const postId = Number(parameters.get("id"));

  const post = posts.find(function (item) {
    return item.id === postId;
  });

  if (!post) {
    const message = document.createElement("h1");
    message.textContent = "Article not found";
    postDetail.appendChild(message);
  } else {
    document.title = `${post.title} | The Curious Corner`;

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = post.category;

    const heading = document.createElement("h1");
    heading.textContent = post.title;

    const date = document.createElement("time");
    date.dateTime = post.date;
    date.textContent = new Date(
      post.date + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const image = document.createElement("img");
    image.src = post.image;
    image.alt = post.imageAlt;
    image.className = "post-image";

    const tags = document.createElement("div");
    tags.className = "tags";

    post.tags.forEach(function (tagName) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = "#" + tagName;
      tags.appendChild(tag);
    });

    postDetail.append(category, heading, date, image, tags);

    articleContent[post.id].forEach(function (paragraphText) {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      postDetail.appendChild(paragraph);
    });
  }
}