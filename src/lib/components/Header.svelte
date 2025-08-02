<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // Language store - you can move this to a separate store file later
  let currentLanguage = 'EN';
  let isLanguageDropdownOpen = false;
  let isMobileMenuOpen = false;

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'JP', name: '日本語', flag: '🇯🇵' },
    { code: 'KR', name: '한국어', flag: '🇰🇷' },
    { code: 'CN', name: '中文', flag: '🇨🇳' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' }
  ];

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/manga', label: 'Manga', icon: '📚' },
    { href: '/waifu', label: 'Waifus', icon: '💖' },
    { href: '/random', label: 'Random', icon: '🎲' },
    { href: '/favorites', label: 'Favorites', icon: '⭐' }
  ];

  let scrollY = 0;
  let isScrolled = false;

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      isScrolled = scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function selectLanguage(langCode: string) {
    currentLanguage = langCode;
    isLanguageDropdownOpen = false;
    // Here you would typically update your i18n store
    console.log(`Language changed to: ${langCode}`);
  }

  function toggleLanguageDropdown() {
    isLanguageDropdownOpen = !isLanguageDropdownOpen;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  // Close dropdowns when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      isLanguageDropdownOpen = false;
    }
    if (!target.closest('.mobile-menu-container')) {
      isMobileMenuOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  $: currentPath = $page.url.pathname;
</script>

<svelte:window bind:scrollY />

<header class="header" class:scrolled={isScrolled}>
  <nav class="nav-container">
    <!-- Mobile Menu Button -->
    <button 
      class="mobile-menu-btn"
      class:active={isMobileMenuOpen}
      on:click={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Navigation Links (Desktop) -->
    <div class="nav-links desktop-nav">
      {#each navItems.slice(0, 2) as item}
        <a 
          href={item.href} 
          class="nav-link"
          class:active={currentPath === item.href}
          aria-label={item.label}
        >
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-text">{item.label}</span>
        </a>
      {/each}
    </div>

    <!-- Centered Logo -->
    <div class="logo-container">
      <a href="/" class="logo" aria-label="SUSMANGA.COM Home">
        <span class="logo-text">SUSMANGA.COM</span>
        <div class="logo-underline"></div>
      </a>
    </div>

    <!-- Right Navigation Links (Desktop) -->
    <div class="nav-links desktop-nav">
      {#each navItems.slice(2) as item}
        <a 
          href={item.href} 
          class="nav-link"
          class:active={currentPath === item.href}
          aria-label={item.label}
        >
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-text">{item.label}</span>
        </a>
      {/each}
    </div>

    <!-- Language Switcher -->
    <div class="language-selector">
      <button 
        class="language-btn"
        on:click={toggleLanguageDropdown}
        aria-label="Select language"
        aria-expanded={isLanguageDropdownOpen}
      >
        <span class="current-lang">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
          {currentLanguage}
        </span>
        <span class="dropdown-arrow" class:rotated={isLanguageDropdownOpen}>▼</span>
      </button>

      {#if isLanguageDropdownOpen}
        <div class="language-dropdown">
          {#each languages as lang}
            <button
              class="language-option"
              class:selected={lang.code === currentLanguage}
              on:click={() => selectLanguage(lang.code)}
            >
              <span class="lang-flag">{lang.flag}</span>
              <span class="lang-name">{lang.name}</span>
              <span class="lang-code">({lang.code})</span>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </nav>

  <!-- Mobile Navigation Menu -->
  {#if isMobileMenuOpen}
    <div class="mobile-menu" class:open={isMobileMenuOpen}>
      <div class="mobile-nav-links">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="mobile-nav-link"
            class:active={currentPath === item.href}
            on:click={closeMobileMenu}
          >
            <span class="mobile-nav-icon">{item.icon}</span>
            <span class="mobile-nav-text">{item.label}</span>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .header.scrolled {
    background: rgba(26, 26, 46, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
  }

  .mobile-menu-btn span {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .mobile-menu-btn.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .mobile-menu-btn.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2));
    transition: left 0.3s ease;
    z-index: -1;
  }

  .nav-link:hover::before,
  .nav-link.active::before {
    left: 0;
  }

  .nav-link:hover,
  .nav-link.active {
    color: white;
    transform: translateY(-2px);
  }

  .nav-icon {
    font-size: 1.1rem;
  }

  .logo-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .logo {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
  }

  .logo:hover {
    transform: translateY(-2px);
  }

  .logo-text {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
    text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
  }

  .logo-underline {
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    transition: width 0.3s ease;
    margin-top: 2px;
  }

  .logo:hover .logo-underline {
    width: 100%;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .language-selector {
    position: relative;
  }

  .language-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .language-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  .dropdown-arrow {
    transition: transform 0.3s ease;
    font-size: 0.7rem;
  }

  .dropdown-arrow.rotated {
    transform: rotate(180deg);
  }

  .language-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    min-width: 180px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: fadeInUp 0.3s ease;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .language-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .language-option:first-child {
    border-radius: 15px 15px 0 0;
  }

  .language-option:last-child {
    border-radius: 0 0 15px 15px;
  }

  .language-option:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .language-option.selected {
    background: rgba(78, 205, 196, 0.2);
    color: #4ecdc4;
  }

  .lang-code {
    margin-left: auto;
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 46, 0.98);
    backdrop-filter: blur(20px);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
    padding-top: 5rem;
  }

  .mobile-menu.open {
    transform: translateY(0);
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem;
    border-radius: 15px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .mobile-nav-icon {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: flex;
    }

    .desktop-nav {
      display: none;
    }

    .nav-container {
      padding: 1rem;
    }

    .logo-text {
      font-size: 1.4rem;
      letter-spacing: 1px;
    }

    .language-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }

    .current-lang {
      gap: 0.25rem;
    }
  }

  @media (max-width: 480px) {
    .logo-text {
      font-size: 1.2rem;
    }

    .language-dropdown {
      right: -1rem;
      left: -1rem;
      width: auto;
    }
  }

  /* Add padding to body to account for fixed header */
  :global(body) {
    padding-top: 80px;
  }

  @media (max-width: 768px) {
    :global(body) {
      padding-top: 70px;
    }
  }
</style>