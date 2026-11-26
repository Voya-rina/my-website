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
  }

  if (typeof PROJECTS !== "undefined" && Array.isArray(PROJECTS)) {
    renderProjects(PROJECTS);
  }

  /* ---------- 技能渲染 ---------- */

  var SKILLS = [
    { group: "前端", items: ["HTML", "CSS", "JavaScript"] },
    { group: "编程语言", items: ["Python", "Kotlin"] },
    { group: "工具", items: ["Git", "GitHub", "VS Code"] },
    { group: "学习中", items: ["嵌入式开发", "电赛", "AI 应用"] }
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
