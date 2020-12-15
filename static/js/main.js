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
      this.$events = document.querySelector('.content');
    },
    onClickBurger() {
      this.$burger.addEventListener('click', () => {
        console.log('burger click werkt');

        if (this.$mobileMenu.classList.contains("fullList")) {
          this.$mobileMenu.classList.remove("fullList");
        } else {
          this.$mobileMenu.classList.add("fullList");
        }
      })
    },
    onClickCloseBurger() {
      this.$cross.addEventListener('click', () => {
        console.log('Burger menu close working');

        this.$mobileMenu.classList.remove("fullList");
      });
    },
    fetchEventsJson() {
      fetch(EVENTSJSON, {})
        .then(response => response.json())
        .then(json => this.loadEvents(json))
        .catch((error) => console.error(error));
    },
    loadEvents: function (eventsData) {
      this.eventsData = data;

      if (this.$events !== null) {

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
          data[random1],
          data[random2],
          data[random3],
        ];

        data = arr;

        this.$events.innerHTML = data.map(html => {
          console.log(events);

          return `
          
          
          
          
          `;
        }).join('');

      }


    }
  }
  app.initialize();
})();