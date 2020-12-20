const EVENTSDATA = `https://www.pgm.gent/data/gentsefeesten/events_500.json`;
const CATEGORIES = `https://www.pgm.gent/data/gentsefeesten/categories.json`;

(() => {
  const app = {
    initialize() {
      console.log('application started');
      this.cacheElements();
      this.onClickBurger();
      this.onClickCloseBurger();
      this.fetchEventsJson();
      this.fetchCategoriesJson();
      this.onClickProgram();
    },

    cacheElements() {
      this.$burger = document.querySelector('.burger-menu');
      this.$mobileMenu = document.querySelector('.mobile-nav');
      this.$cross = document.querySelector('.cross');
      this.$events = document.querySelector('.content--wrapper');
      this.$program = document.querySelector('.program');
      this.$programList = document.querySelector('.program-button');
      this.$arrowTurn = document.querySelector('.svg-right-arrow');
      this.$dayEvents = document.querySelector('.day-events');
      this.$detailContainer = document.querySelector('.detailed-event');
      this.$categoryRight = document.querySelector('.category-article-right');
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
    
    onClickProgram() {
      this.$program.addEventListener('click', () => {
        console.log('Program menu working');
        if (this.$programList.classList.contains("full-program")) {
          this.$programList.classList.remove("full-program");
          this.$arrowTurn.classList.remove('svg-down-arrow');
        } else {
          this.$programList.classList.add("full-program");
          this.$arrowTurn.classList.add('svg-down-arrow');
        }
      });
    },
    
    fetchCategoriesJson() {
      fetch(CATEGORIES, {})
          .then((response) => response.json())
          .then((json) => {
              this.categoryData = json;
              this.fetchEventsJson();
              this.loadCategories();
              })
          .catch((error) => console.error(error));
  },

    fetchEventsJson() {
      fetch(EVENTSDATA, {})
        .then(response => response.json())
        //.then(json => this.desyncEvents(json))
        .then(json => {
          this.eventData = json;
          this.loadEvents();
          this.eventDetails();
          this.urlDayType();
        })
        .catch((error) => console.error(error));
    },
    
    loadEvents() {
      // this.eventsData = eventsJSONData;

      if (this.$events !== null) {

        /* Json has copy's as such this isn't very effective*/
        // make 3 random integers
        let random1, random2, random3;

        random1 = Math.round(Math.random() * this.eventData.length);
        random2 = Math.round(Math.random() * this.eventData.length);
        random3 = Math.round(Math.random() * this.eventData.length);
        // make sure integers are different to prevent showing the same information
        while (random2 === random1 || random2 === random3 || random3 === random1) {
          // change 2 of the 3 random numbers untill none are the same
          random1 = Math.round(Math.random() * this.eventData.length);
          random2 = Math.round(Math.random() * this.eventData.length);
        }

        arr = [
          this.eventData[random1],
          this.eventData[random2],
          this.eventData[random3],
        ];
        data = arr;

        this.$events.innerHTML = data.map(html => {
          return `
          <article class="content">
            <a href="detail.html?day=${html.day}&slug=${html.slug}">
              <figure class="content--figure--top">
                <img src="${html.image !== null ? html.image.thumb : 'https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/2ac3b2408e700fb7a7d175b48060838e/300'}" alt="Test article">
                <figcaption>${html.day} Juli ${html.start} u.</figcaption>
              </figure></a>
              <div class="content--figure--bottom">
                <h3>${html.title}</h3>
                <p>${html.location}</p>
              </div>
          </article>
          
          `;
        }).join('');
        
      }
    },

    loadCategories() {
      if (this.$categoryRight !== null) {
        this.$categoryRight.innerHTML = `<ul class="category-list">`;
        this.categoryData.forEach(element => {
          this.$categoryRight.innerHTML += `<li><a href="${element}">${element}</a></li>`;
        });
        this.$categoryRight = `</ul>`;
      }
    },
    
    urlDayType() {
      // this.dataTest = data;

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const urlType = params.get('day');

      if (this.$dayEvents !== null) {
        if (urlType !== null) {
          console.log("Type loading working");
          console.log(urlType);
          
          
         // Filter items on day using filter function
          filteredEvents = this.eventData.filter((event) => {
            return event.day === urlType;
          })
  
          console.log(filteredEvents);
        }

        this.$dayEvents.innerHTML = `<div class="grid-list--wrapper">
        <button class="grid-list"><?xml version="1.0" encoding="UTF-8"?>
        <svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
            <title>list (1)</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="list-(1)" fill="#000000" fill-rule="nonzero">
                    <path d="M4,20 L0,20 L0,16 L4,16 L4,20 Z M4,8 L0,8 L0,12 L4,12 L4,8 Z M4,0 L0,0 L0,4 L4,4 L4,0 Z M7,0 L7,4 L24,4 L24,0 L7,0 Z M7,12 L24,12 L24,8 L7,8 L7,12 Z M7,20 L24,20 L24,16 L7,16 L7,20 Z" id="Shape"></path>
                </g>
            </g>
        </svg></button>
        <button class="grid-list"><?xml version="1.0" encoding="UTF-8"?>
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
            <title>Shape</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="grid" fill="#000000" fill-rule="nonzero">
                    <path d="M5,5 L0,5 L0,0 L5,0 L5,5 Z M12.5,0 L7.5,0 L7.5,5 L12.5,5 L12.5,0 Z M20,0 L15,0 L15,5 L20,5 L20,0 Z M5,7.5 L0,7.5 L0,12.5 L5,12.5 L5,7.5 Z M12.5,7.5 L7.5,7.5 L7.5,12.5 L12.5,12.5 L12.5,7.5 Z M20,7.5 L15,7.5 L15,12.5 L20,12.5 L20,7.5 Z M5,15 L0,15 L0,20 L5,20 L5,15 Z M12.5,15 L7.5,15 L7.5,20 L12.5,20 L12.5,15 Z M20,15 L15,15 L15,20 L20,20 L20,15 Z" id="Shape"></path>
                </g>
            </g>
        </svg></button>
        </div>`;

        this.$dayEvents.innerHTML += filteredEvents.map((html) => {
          return `
          <article class="content">
          <a href="detail.html?day=${html.day}&slug=${html.slug}">
            <figure class="content--figure--top">
              <img src="${html.image !== null ? html.image.thumb : 'https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/2ac3b2408e700fb7a7d175b48060838e/300'}" alt="Test article">
              <figcaption>${html.day} Juli ${html.start} u.</figcaption>
            </figure></a>
            <div class="content--figure--bottom">
              <h3>${html.title}</h3>
              <p>${html.location}</p>
            </div>
          
        </article>
          
          `;
        }).join('');
      }

    },
    
    eventDetails() {
      if (this.$detailContainer !== null) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const urlType = params.get('day');
        const slug = params.get('slug');

        console.log(urlType);
        console.log(slug);

        const eventDetail = this.eventData.find((event) => {
          return event.day === urlType && event.slug === slug;
        });


        this.$detailContainer.innerHTML = `
          <article class="margin">
           <div class="event--title-date">
            <h2>${eventDetail.title}</h2>
            <h3>${eventDetail.day_of_week} ${eventDetail.day} Juli - ${eventDetail.start} u. - ${eventDetail.end} u.</h3>
           </div>
           <div class="event--text">${eventDetail.description !== null ? eventDetail.description : 'There is no description for this event'}</div>
           <div class="event--image"> <img src="${eventDetail.image !== null ? eventDetail.image.thumb : 'https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/2ac3b2408e700fb7a7d175b48060838e/300'}" alt=""> </div>
           <div class="event--socials">
             <ul>
               <li><span>Website:</span><a class="detailed-hyper" href="${eventDetail.url}">${eventDetail.url !== null ? eventDetail.url : 'There is no website for this event.'}</a></li>
               <li><span>Orginisator:</span><a class="detailed-hyper" href="">${eventDetail.organizer}</a></li>
               <li><span>Categorieën</span><a class="detailed-hyper" href="">${eventDetail.category}</a></li>
             </ul>
             <div>
              <svg width="190" height="20" viewBox="0 0 190 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.9041 4.74768L28.1441 11.8693L30.4416 4.74768H32.739L29.178 15.3115H27.2826L23.6641 4.74768H25.9041Z" fill="#010202"/>
                <path d="M37.1613 15.3708H35.0361V4.74768H37.1038V15.3708H37.1613Z" fill="#010202"/>
                <path d="M46.0645 15.3708L44.2265 11.2165H42.5609V15.3708H40.4932V4.74768H44.1691C46.524 4.74768 48.0173 5.81593 48.0173 8.01178C48.0173 9.43611 47.3855 10.3857 46.2368 10.8604L48.362 15.3708H46.0645ZM43.9394 9.37676C45.1455 9.37676 45.8922 9.08003 45.8922 8.01178C45.8922 6.94353 45.203 6.58744 43.9394 6.58744H42.5609V9.37676H43.9394Z" fill="#010202"/>
                <path d="M57.4943 4.74768V6.58744H54.68V15.3708H52.6122V6.58744H49.7979V4.74768H57.4943Z" fill="#010202"/>
                <path d="M67.6606 4.74768V11.0385C67.6606 14.1839 65.9949 15.4895 63.6975 15.4895C61.4 15.4895 59.7344 14.1839 59.7344 11.0978V4.74768H61.8021V11.0385C61.8021 12.8782 62.3765 13.6498 63.6401 13.6498C64.9037 13.6498 65.478 12.8782 65.478 11.0385V4.74768H67.6606Z" fill="#010202"/>
                <path d="M77.2524 4.74768V6.58744H72.9447V8.96133H76.7929V10.8011H72.9447V13.5904H77.2524V15.4302H70.877V4.74768H77.2524Z" fill="#010202"/>
                <path d="M81.9622 13.5311H86.27V15.3708H79.8945V4.74768H81.9622V13.5311Z" fill="#010202"/>
                <path d="M94.9429 4.74768V6.58744H90.6351V8.96133H94.4834V10.8011H90.6351V13.5904H94.9429V15.4302H88.5674V4.74768H94.9429Z" fill="#010202"/>
                <path d="M101.376 15.3708L104.937 4.74768H106.947L110.508 15.3115H108.268L107.637 13.2937H104.19L103.559 15.3115H101.376V15.3708ZM104.765 11.5133H107.062L105.913 7.77439L104.765 11.5133Z" fill="#010202"/>
                <path d="M117.688 8.01184C117.516 7.00294 116.941 6.40946 115.908 6.40946C114.701 6.40946 114.07 7.24033 114.07 9.25813V10.7418C114.07 12.7003 114.701 13.5905 115.908 13.5905C116.941 13.5905 117.458 13.0563 117.688 11.9881H119.641C119.296 14.362 118.033 15.4302 115.908 15.4302C113.61 15.4302 112.002 14.0059 112.002 10.7418V9.25813C112.002 5.99403 113.61 4.5697 115.908 4.5697C117.918 4.5697 119.296 5.6973 119.641 8.01184H117.688Z" fill="#010202"/>
                <path d="M128.946 4.74768V6.58744H126.131V15.3708H124.063V6.58744H121.249V4.74768H128.946Z" fill="#010202"/>
                <path d="M133.483 15.3708H131.415V4.74768H133.483V15.3708Z" fill="#010202"/>
                <path d="M138.135 4.74768L140.375 11.8693L142.615 4.74768H144.913L141.294 15.3708H139.399L135.838 4.74768H138.135Z" fill="#010202"/>
                <path d="M149.335 15.3708H147.268V4.74768H149.335V15.3708Z" fill="#010202"/>
                <path d="M159.501 4.74768V6.58744H156.687V15.3708H154.619V6.58744H151.805V4.74768H159.501Z" fill="#010202"/>
                <path d="M168.232 4.74768V6.58744H163.924V8.96133H167.772V10.8011H163.924V13.5904H168.232V15.4302H161.856V4.74768H168.232Z" fill="#010202"/>
                <path d="M173.056 15.3708H170.988V4.74768H173.056V15.3708Z" fill="#010202"/>
                <path d="M183.223 4.74768V6.58744H180.408V15.3708H178.341V6.58744H175.526V4.74768H183.223Z" fill="#010202"/>
                <path d="M42.9617 0H19.5851H0.0566406V20H19.5851H42.9617H189.999V0H42.9617ZM12.3481 11.9881C12.3481 12.5223 11.946 12.997 11.3716 12.997H5.62798C5.11105 12.997 4.65156 12.5816 4.65156 11.9881V8.01187C4.65156 7.47775 5.05362 7.00297 5.62798 7.00297H11.3716C11.8886 7.00297 12.3481 7.4184 12.3481 8.01187V11.9881ZM16.1389 12.9377L13.267 10.8605V9.08012L16.1389 7.00297V12.9377ZM188.85 18.8131H20.7338V1.18694H188.85V18.8131Z" fill="#010202"/>
              </svg>

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3804 15.0661L19.9351 16.1873C20.0875 16.4959 19.9625 16.8709 19.6539 17.0233L17.0951 18.3085C16.47 18.621 15.7043 18.3554 15.4074 17.7186L12.958 12.4996H7.50058C6.87944 12.4996 6.35206 12.0425 6.26221 11.4253C4.93788 2.15913 5.01601 2.73339 5.00039 2.499C5.00039 1.07704 6.18407 -0.0636503 7.62169 0.0027598C8.92257 0.0613569 9.96562 1.13173 10.0008 2.43259C10.0359 3.71782 9.09446 4.7921 7.8678 4.97179L8.0475 6.24921H13.126C13.4698 6.24921 13.7511 6.53048 13.7511 6.87425V8.12432C13.7511 8.46809 13.4698 8.74935 13.126 8.74935H8.4069L8.5866 9.99943H13.7511C14.2355 9.99943 14.6769 10.2807 14.884 10.7182L17.1302 15.4997L18.5444 14.7849C18.853 14.6286 19.2281 14.7575 19.3804 15.0661ZM12.165 13.7496H11.2079C10.9032 15.867 9.07883 17.4999 6.87553 17.4999C4.46128 17.4999 2.50019 15.5388 2.50019 13.1246C2.50019 11.5034 3.38698 10.0854 4.69958 9.32751C4.55504 8.31183 4.43394 7.45631 4.32846 6.73752C1.79701 7.7532 0 10.2338 0 13.1246C0 16.9139 3.08618 20 6.87553 20C9.68435 20 12.1025 18.3085 13.169 15.8904L12.165 13.7496Z" fill="black"/>
              </svg>

             </div>
             <ul class="detail--social">
               <li><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M21.37 7.277c.014.21.014.419.014.628 0 6.391-4.864 13.755-13.755 13.755-2.739 0-5.283-.793-7.424-2.17.39.045.764.06 1.168.06 2.26 0 4.34-.763 6.002-2.066a4.843 4.843 0 01-4.52-3.352c.299.045.598.074.913.074.434 0 .868-.06 1.272-.164a4.835 4.835 0 01-3.877-4.745v-.06c.644.36 1.392.584 2.185.614a4.831 4.831 0 01-2.155-4.026c0-.898.24-1.721.659-2.44a13.742 13.742 0 009.968 5.059 5.46 5.46 0 01-.12-1.108 4.832 4.832 0 014.835-4.834c1.392 0 2.649.584 3.532 1.527a9.518 9.518 0 003.068-1.168 4.821 4.821 0 01-2.125 2.664 9.692 9.692 0 002.784-.748 10.391 10.391 0 01-2.425 2.5z" fill="#000" fill-rule="nonzero"/></svg>
               </li>
               <li><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.072 13.474l.655-4.269h-4.096v-2.77c0-1.168.572-2.306 2.407-2.306H17.9V.494S16.21.206 14.594.206c-3.373 0-5.578 2.044-5.578 5.746v3.253h-3.75v4.27h3.75v10.32h4.615v-10.32h3.441z" fill="#000" fill-rule="nonzero"/></svg>
               </li>
               <li><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="evenodd"><rect x="5.7" y="9" width="6" height="6" rx="3"/><rect x="13.3" y="9" width="6" height="6" rx="3"/></g></svg>
               </li>
             </ul>
           </div>
         </article>
        `;
      }
    },
    onClickGrid() {
      

    }
    
  }
  app.initialize();
})();