/* 页面逻辑：主题切换、移动端菜单、项目渲染 */

(function () {
  "use strict";

  var THEME_KEY = "voyarina-theme";

  /* ---------- 主题切换（localStorage 不可用时仍可切换，只是不记忆） ---------- */

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* 存储不可用：忽略，功能不受影响 */
    }
  }

  var themeToggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  themeToggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    saveTheme(next);
  });

  /* ---------- 移动端菜单 ---------- */

  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 项目渲染（数据来自 data/projects.js） ---------- */

  var grid = document.getElementById("project-grid");

  function renderProjects(list) {
    grid.innerHTML = "";
    list.forEach(function (p) {
      var card = document.createElement("article");
      card.className = "project-card";

      var head = document.createElement("div");
      head.className = "project-head";

      var title = document.createElement("h3");
      title.textContent = p.name;

      var tag = document.createElement("span");
      tag.className = "project-tag";
      tag.textContent = p.category;

      head.appendChild(title);
      head.appendChild(tag);

      var desc = document.createElement("p");
      desc.textContent = p.description;

      var link = document.createElement("a");
      link.className = "project-link";
      link.href = p.link;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "查看仓库 →";

      card.appendChild(head);
      card.appendChild(desc);
      card.appendChild(link);
      grid.appendChild(card);
    });

    document.getElementById("project-count").textContent = "共 " + list.length + " 个项目";
  }

  /* ---------- 项目筛选（分类来自数据文件，自动生成） ---------- */

  var filterBar = document.getElementById("filter-bar");
  var activeFilter = "all";

  function renderFilterBar() {
    var categories = [];
    PROJECTS.forEach(function (p) {
      if (categories.indexOf(p.category) === -1) categories.push(p.category);
    });

    var options = ["all"].concat(categories);
    filterBar.innerHTML = "";
    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (opt === activeFilter ? " is-active" : "");
      btn.dataset.filter = opt;
      btn.textContent = opt === "all" ? "全部" : opt;
      btn.setAttribute("aria-pressed", opt === activeFilter ? "true" : "false");
      filterBar.appendChild(btn);
    });
  }

  /* 事件委托：按钮被重建后监听依然有效 */
  filterBar.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    var opt = btn.getAttribute("data-filter");
    if (!opt || opt === activeFilter) return;
    activeFilter = opt;
    renderFilterBar();
    renderProjects(filterProjects());
    syncShowcase();
  });

  function filterProjects() {
    if (activeFilter === "all") return PROJECTS;
    return PROJECTS.filter(function (p) { return p.category === activeFilter; });
  }

  if (typeof PROJECTS !== "undefined" && Array.isArray(PROJECTS)) {
    renderFilterBar();
    renderProjects(filterProjects());
  }

  /* ---------- 展示区：滚动联动卡片 + 与筛选同步 ---------- */

  var figures = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  var showInner = document.getElementById("show-card-inner");
  var showName = document.getElementById("show-name");
  var showTag = document.getElementById("show-tag");
  var showDesc = document.getElementById("show-desc");
  var showLink = document.getElementById("show-link");
  var currentShow = null;

  function findProject(name) {
    var p = null;
    PROJECTS.forEach(function (x) {
      if (x.name === name) p = x;
    });
    return p;
  }

  function setActiveFigure(name) {
    figures.forEach(function (f) {
      f.classList.toggle("active", f.getAttribute("data-project") === name);
    });
  }

  function setShowCard(name) {
    setActiveFigure(name);
    var p = findProject(name);
    if (!p) return;
    var first = currentShow === null;
    if (name === currentShow) return;
    currentShow = name;

    if (first) {
      /* 首次同步填充，保证卡片在量高前已是完整尺寸 */
      showName.textContent = p.name;
      showTag.textContent = p.category;
      showDesc.textContent = p.description;
      showLink.href = p.link;
      return;
    }

    showInner.classList.add("fading");
    setTimeout(function () {
      showName.textContent = p.name;
      showTag.textContent = p.category;
      showDesc.textContent = p.description;
      showLink.href = p.link;
      showInner.classList.remove("fading");
    }, 160);
  }

  function syncShowcase() {
    var firstVisible = null;
    figures.forEach(function (f) {
      var show = activeFilter === "all" || f.getAttribute("data-category") === activeFilter;
      f.classList.toggle("hidden", !show);
      if (show && !firstVisible) firstVisible = f.getAttribute("data-project");
    });
    if (firstVisible) setShowCard(firstVisible);
  }

  syncShowcase();

  /* 卡片高度写入 CSS 变量，使其初始叠加在第一张截图左上角 */
  var showCardEl = document.querySelector(".show-card");
  function sizeCard() {
    document.documentElement.style.setProperty("--card-h", showCardEl.offsetHeight + "px");
  }
  if ("ResizeObserver" in window) {
    new ResizeObserver(sizeCard).observe(showCardEl);
  }
  window.addEventListener("resize", sizeCard);
  window.addEventListener("load", sizeCard);
  sizeCard();

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          setShowCard(en.target.getAttribute("data-project"));
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });
    figures.forEach(function (f) { io.observe(f); });
  }

  /* ---------- 技能渲染 ---------- */

  var SKILLS = [
    { group: "前端", items: ["HTML", "CSS", "JavaScript"] },
    { group: "编程语言", items: ["Python", "Kotlin", "C 语言"] },
    { group: "工具", items: ["Git", "GitHub", "VS Code"] },
    { group: "学习中", items: ["嵌入式开发", "电赛", "LLM 应用"] }
  ];

  var skillGroups = document.getElementById("skill-groups");

  SKILLS.forEach(function (s) {
    var card = document.createElement("div");
    card.className = "skill-card";

    var h = document.createElement("h3");
    h.textContent = s.group;

    var tags = document.createElement("div");
    tags.className = "skill-tags";
    s.items.forEach(function (item) {
      var span = document.createElement("span");
      span.textContent = item;
      tags.appendChild(span);
    });

    card.appendChild(h);
    card.appendChild(tags);
    skillGroups.appendChild(card);
  });

  /* ---------- 页脚年份 ---------- */

  document.getElementById("year").textContent = new Date().getFullYear();
})();
