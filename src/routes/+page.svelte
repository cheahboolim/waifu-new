<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { PageData } from './$types';

  export let data: PageData;

  let featuredManga = data.featuredManga || [];
  let featuredWaifus = data.featuredWaifus || [];
  let isLoading = true;

  onMount(() => {
    // Simulate loading delay for smooth animations
    setTimeout(() => {
      isLoading = false;
    }, 500);
  });

  // Mock data for demonstration
  if (!featuredManga.length) {
    featuredManga = [
      { id: 1, title: "Attack on Titan", image: "/images/manga/aot.jpg", rating: 9.0, status: "Completed" },
      { id: 2, title: "One Piece", image: "/images/manga/op.jpg", rating: 9.2, status: "Ongoing" },
      { id: 3, title: "Demon Slayer", image: "/images/manga/ds.jpg", rating: 8.8, status: "Completed" },
      { id: 4, title: "Jujutsu Kaisen", image: "/images/manga/jjk.jpg", rating: 8.9, status: "Ongoing" }
    ];
  }

  if (!featuredWaifus.length) {
    featuredWaifus = [
      { id: 1, name: "Mikasa Ackerman", series: "Attack on Titan", image: "/images/waifu/mikasa.jpg", votes: 1250 },
      { id: 2, name: "Nezuko Kamado", series: "Demon Slayer", image: "/images/waifu/nezuko.jpg", votes: 1180 },
      { id: 3, name: "Nobara Kugisaki", series: "Jujutsu Kaisen", image: "/images/waifu/nobara.jpg", votes: 980 },
      { id: 4, name: "Nami", series: "One Piece", image: "/images/waifu/nami.jpg", votes: 1350 }
    ];
  }
</script>

<svelte:head>
  <title>SusManga Waifu - Home</title>
  <meta name="description" content="Discover the best manga and waifus in one place. Read manga online and explore your favorite characters." />
</svelte:head>

{#if isLoading}
  <div class="loading-screen" in:fade={{ duration: 300 }}>
    <div class="loading-spinner"></div>
    <p>Loading...</p>
  </div>
{:else}
  <main class="homepage" in:fade={{ duration: 500 }}>
    <!-- Hero Section -->
    <section class="hero" in:fly={{ y: 50, duration: 600, delay: 100 }}>
      <div class="hero-content">
        <h1 class="hero-title">
          Welcome to <span class="gradient-text">SusManga Waifu</span>
        </h1>
        <p class="hero-subtitle">
          Discover amazing manga and your favorite waifus all in one place
        </p>
        <div class="hero-actions">
          <a href="/manga" class="btn btn-primary">Browse Manga</a>
          <a href="/waifu" class="btn btn-secondary">Explore Waifus</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="/images/hero-waifu.png" alt="Featured Waifu" />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats" in:fly={{ y: 30, duration: 600, delay: 200 }}>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>10,000+</h3>
          <p>Manga Titles</p>
        </div>
        <div class="stat-card">
          <h3>50,000+</h3>
          <p>Waifu Characters</p>
        </div>
        <div class="stat-card">
          <h3>1M+</h3>
          <p>Active Users</p>
        </div>
        <div class="stat-card">
          <h3>24/7</h3>
          <p>Updates</p>
        </div>
      </div>
    </section>

    <!-- Featured Manga Section -->
    <section class="featured-section" in:fly={{ y: 30, duration: 600, delay: 300 }}>
      <div class="section-header">
        <h2>Featured Manga</h2>
        <a href="/manga" class="view-all">View All →</a>
      </div>
      <div class="manga-grid">
        {#each featuredManga as manga, i}
          <div class="manga-card" in:fly={{ y: 20, duration: 400, delay: i * 100 }}>
            <div class="manga-image">
              <img src={manga.image} alt={manga.title} />
              <div class="manga-overlay">
                <button class="read-btn">Read Now</button>
              </div>
            </div>
            <div class="manga-info">
              <h3>{manga.title}</h3>
              <div class="manga-meta">
                <span class="rating">⭐ {manga.rating}</span>
                <span class="status {manga.status.toLowerCase()}">{manga.status}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Featured Waifus Section -->
    <section class="featured-section" in:fly={{ y: 30, duration: 600, delay: 400 }}>
      <div class="section-header">
        <h2>Popular Waifus</h2>
        <a href="/waifu" class="view-all">View All →</a>
      </div>
      <div class="waifu-grid">
        {#each featuredWaifus as waifu, i}
          <div class="waifu-card" in:fly={{ y: 20, duration: 400, delay: i * 100 }}>
            <div class="waifu-image">
              <img src={waifu.image} alt={waifu.name} />
              <div class="waifu-overlay">
                <button class="vote-btn">💖 Vote</button>
              </div>
            </div>
            <div class="waifu-info">
              <h3>{waifu.name}</h3>
              <p class="series">{waifu.series}</p>
              <div class="votes">❤️ {waifu.votes} votes</div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section" in:fly={{ y: 30, duration: 600, delay: 500 }}>
      <div class="cta-content">
        <h2>Join the Community</h2>
        <p>Connect with fellow manga and anime enthusiasts. Share your favorites and discover new ones!</p>
        <div class="cta-actions">
          <a href="/user/register" class="btn btn-primary">Sign Up Free</a>
          <a href="/about" class="btn btn-outline">Learn More</a>
        </div>
      </div>
    </section>
  </main>
{/if}

<style>
  .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .homepage {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    color: white;
  }

  .hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 80vh;
  }

  .hero-content {
    flex: 1;
    max-width: 500px;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .gradient-text {
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-image img {
    max-width: 400px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .btn {
    padding: 0.8rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    display: inline-block;
  }

  .btn-primary {
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
  }

  .btn-secondary {
    background: linear-gradient(45deg, #4ecdc4, #6bcf7f);
    color: white;
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(78, 205, 196, 0.3);
  }

  .btn-outline {
    border: 2px solid #4ecdc4;
    color: #4ecdc4;
    background: transparent;
  }

  .btn-outline:hover {
    background: #4ecdc4;
    color: white;
  }

  .stats {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .stat-card {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-card h3 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #ffd93d;
  }

  .featured-section {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-header h2 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .view-all {
    color: #4ecdc4;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .view-all:hover {
    color: #6bcf7f;
  }

  .manga-grid, .waifu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .manga-card, .waifu-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .manga-card:hover, .waifu-card:hover {
    transform: translateY(-5px);
  }

  .manga-image, .waifu-image {
    position: relative;
    height: 300px;
    overflow: hidden;
  }

  .manga-image img, .waifu-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .manga-card:hover .manga-image img,
  .waifu-card:hover .waifu-image img {
    transform: scale(1.1);
  }

  .manga-overlay, .waifu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .manga-card:hover .manga-overlay,
  .waifu-card:hover .waifu-overlay {
    opacity: 1;
  }

  .read-btn, .vote-btn {
    padding: 0.5rem 1.5rem;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .vote-btn {
    background: #4ecdc4;
  }

  .read-btn:hover {
    background: #ff5252;
  }

  .vote-btn:hover {
    background: #45b7b8;
  }

  .manga-info, .waifu-info {
    padding: 1.5rem;
  }

  .manga-info h3, .waifu-info h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .manga-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rating {
    color: #ffd93d;
  }

  .status {
    padding: 0.2rem 0.8rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .status.ongoing {
    background: #4ecdc4;
    color: white;
  }

  .status.completed {
    background: #ff6b6b;
    color: white;
  }

  .series {
    color: #4ecdc4;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .votes {
    color: #ff6b6b;
    font-weight: 600;
  }

  .cta-section {
    padding: 4rem 2rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    margin: 3rem 0 0 0;
  }

  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .cta-content p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      text-align: center;
      padding: 2rem 1rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .manga-grid, .waifu-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .section-header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
</style>