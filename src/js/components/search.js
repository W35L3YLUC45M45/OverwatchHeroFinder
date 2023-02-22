Vue.component('hero-search', {
    data: () => {
        return {
            searchInput: ""
        }
    },
    template: `
      <form v-on:submit.prevent="search">
      <input type="text" class="searchTerm" placeholder="Search for a hero..." v-model="searchInput">
      <button type="submit" class="searchButton" value="search">SEARCH</button>
      </form>`,
    methods: {
        search(event) {
            this.$root.searchInput = this.searchInput

            fetch('http://localhost:3000/api/list?search=' + this.$root.searchInput)
                .then(response => response.json())
                .then(data => this.$root.overwatch = data);
        }
    }
  })