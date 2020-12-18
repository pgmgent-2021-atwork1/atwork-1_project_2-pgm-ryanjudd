const EVENTSDATA = `https://www.pgm.gent/data/gentsefeesten/events_500.json`;

(() => {
  const app = {
    initialize() {
      console.log('application started');
      this.cacheElements();
      this.onClickBurger();
      this.onClickCloseBurger();
      this.fetchEventsJson();
    },
    cacheElements() {
      this.$burger = document.querySelector('.burger-menu');
      this.$mobileMenu = document.querySelector('.mobile-nav');
      this.$cross = document.querySelector('.cross');
      this.$events = document.querySelector('.content--wrapper');
    },
    onClickBurger() {
      this.$burger.addEventListener('click', () => {
        console.log('burger click werkt');
        this.$mobileMenu.classList.add("fullList");
      });
    },
    onClickCloseBurger() {
      this.$cross.addEventListener('click', () => {
        console.log('Burger menu close working');

        this.$mobileMenu.classList.remove("fullList");
      });
    },
    fetchEventsJson() {
      fetch(EVENTSDATA, {})
        .then(response => response.json())
        .then(json => this.loadEvents(json))
        .catch((error) => console.error(error));
    },
    loadEvents: function (eventsJSONData) {
      this.eventsData = eventsJSONData;

      if (this.$events !== null) {

        /* Json has copy's as such this isn't very effective*/
        // make 3 random integers
        let random1, random2, random3;

        random1 = Math.round(Math.random() * this.eventsData.length);
        random2 = Math.round(Math.random() * this.eventsData.length);
        random3 = Math.round(Math.random() * this.eventsData.length);
        // make sure integers are different to prevent showing the same information
        while (random2 === random1 || random2 === random3 || random3 === random1) {
          // change 2 of the 3 random numbers untill none are the same
          random1 = Math.round(Math.random() * this.eventsData.length);
          random2 = Math.round(Math.random() * this.eventsData.length);
        }

        arr = [
          this.eventsData[random1],
          this.eventsData[random2],
          this.eventsData[random3],
        ];
        data = arr;

        this.$events.innerHTML = data.map(html => {
          console.log(html);

          return `
          <article class="content">
              <figure class="content--figure--top">
                <img src="${html.image !== null ? html.image.thumb : 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'}" alt="Test article">
                <figcaption>Ma 20 Jul 10.00 u.</figcaption>
              </figure>
              <div class="content--figure--bottom">
                <h3>${html.title}</h3>
                <p>STAM Stadsmuseum Gent</p>
              </div>
          </article>
          
          `;
        }).join('');
      }
    },
  }
  app.initialize();
})();