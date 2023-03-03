import html from "html-literal";

export default (st) => html`
  <main>
    <section>
      <h2>Search for a movie</h2>
      <form>
        <input type="text" name="search" placeholder="Enter a movie title" />
        <button type="submit">Search</button>
      </form>
    </section>
    <section>
      <h2>Popular Genres</h2>
      <ul>
        <li>
          <a href="#">Action</a>
        </li>
        <li>
          <a href="#">Comedy</a>
        </li>
        <li>
          <a href="#">Drama</a>
        </li>
        <li>
          <a href="#">Horror</a>
        </li>
        <li>
          <a href="#">Sci-Fi</a>
        </li>
      </ul>
    </section>
  </main>
`;
