import html from "html-literal";

export default (st) => html`
  <main>
    <section>
      <h2>Your Watchlist</h2>
      <ul>
        <li>
          <a href="#">
            <img src="movie-poster.jpg" alt="Movie Poster" />
            <h3>Movie Title</h3>
            <p>Year of Release</p>
          </a>
          <button class="remove-button">Remove</button>
        </li>
        <!-- Repeat for each movie in watchlist -->
      </ul>
    </section>
  </main>
`;
