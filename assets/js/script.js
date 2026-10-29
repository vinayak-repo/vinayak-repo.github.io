'use strict';

// Based on the vCard template script (MIT, codewithsadee), adapted for this portfolio.

const toggle = (el) => el && el.classList.toggle('active');

// Sidebar contacts toggle (mobile)
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebarBtn) sidebarBtn.addEventListener('click', () => toggle(sidebar));

// Project filter
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = (value) => {
  filterItems.forEach((item) => {
    const show = value === 'all' || value === item.dataset.category;
    item.classList.remove('active');
    if (show) { void item.offsetWidth; item.classList.add('active'); }
  });
};

if (select) select.addEventListener('click', function () { toggle(this); });

selectItems.forEach((item) => {
  item.addEventListener('click', function () {
    const v = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    toggle(select);
    filterFunc(v);
  });
});

let lastBtn = filterBtns[0];
filterBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    selectValue.innerText = this.innerText;
    filterFunc(this.innerText.toLowerCase());
    lastBtn.classList.remove('active');
    this.classList.add('active');
    lastBtn = this;
  });
});

// Page navigation
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

const showPage = (name) => {
  pages.forEach((page, i) => {
    const on = page.dataset.page === name;
    page.classList.toggle('active', on);
    if (navLinks[i]) navLinks[i].classList.toggle('active', on);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    const name = this.innerText.trim().toLowerCase();
    showPage(name);
    if (history.replaceState) history.replaceState(null, '', '#' + name);
  });
});

const initial = location.hash.slice(1).toLowerCase();
if ([...pages].some((p) => p.dataset.page === initial)) showPage(initial);

// Project details modal
const modal = document.querySelector('[data-modal-container]');
const overlay = document.querySelector('[data-overlay]');
const closeBtn = document.querySelector('[data-modal-close-btn]');
const mImg = document.querySelector('[data-modal-img]');
const mTitle = document.querySelector('[data-modal-title]');
const mCat = document.querySelector('[data-modal-cat]');
const mText = document.querySelector('[data-modal-text]');
const details = document.getElementById('project-details');

const openModal = () => { modal.classList.add('active'); overlay.classList.add('active'); };
const closeModal = () => { modal.classList.remove('active'); overlay.classList.remove('active'); };

document.querySelectorAll('[data-project-link]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const title = link.querySelector('.project-title').innerText;
    const img = link.querySelector('img');
    mImg.src = img.src;
    mImg.alt = img.alt;
    mTitle.innerText = title;
    mCat.innerText = link.querySelector('.project-category').innerText;
    const d = details && details.content.querySelector(`[data-for="${title}"]`);
    mText.innerText = d ? d.textContent : '';
    openModal();
  });
});

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
