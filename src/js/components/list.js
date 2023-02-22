Vue.component('hero-node', {
    data: () => {
      return {
          state:0
      }
    },
    props: {
      hero: Object
    },
    template: `
      <section class="hero-section" v-bind:id="hero.key">
        <img v-bind:src="hero.portrait">
        <div class="hero-info">
          <h2>
            {{hero.name}}
          </h2>
          <p>
            <u>Role</u>: {{hero.role}}
          </p>
          <div v-if="this.state == 2">
            <u>Lore</u>: {{hero.message}}
          </div>
          <button class="more-info" v-on:click="loadInfo" v-if="this.state == 0">SHOW MORE</button>
          <button class="more-info" v-if="this.state == 1">LOADING...</button>
          <button class="more-info" v-on:click="closeInfo" v-if="this.state == 2">SHOW LESS</button>
        </div>
      </section>
    `,
    methods: {
      loadInfo() {
          fetch('http://localhost:3000/api/detail', {
            method:'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify(this.hero)})
              .then(response => response.json())
              .then(data => this.state = 1)
              .then(setTimeout(() => {this.state = 2; console.log("HELP ME")}, 3000));
      },
      closeInfo() {
        this.state = 0;
      }
    }
  })