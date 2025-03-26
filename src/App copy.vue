<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="container">
    <h1>Bitte geben Sie den Code ein</h1>
    <!-- Eingabefeld mit Autofokus (automatischer Cursor beim Laden) und nur Zahlen erlaubt -->
    <input
      v-model="searchQuery" type="text" placeholder="Code eingeben..." @input="filterNumbers" autofocus />
    <ul>
      <!-- Zeigt die gefilterten Ergebnisse an, sobald der Benutzer beginnt zu tippen -->
      <li v-for="item in filteredItems" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchQuery: '', // Enthält die Benutzereingabe (nur Ziffern)
      items: [
        { id: 1, name: '12345' },
        { id: 2, name: '67890' },
        { id: 3, name: '33456' },
        { id: 4, name: '33567' },
        { id: 5, name: '12356' },
      ],
    };
  },
  computed: {
    // Gibt nur die Elemente zurück, deren "name" mit der Eingabe beginnt
    filteredItems() {
      return this.items.filter(item =>
        item.name.startsWith(this.searchQuery)
      );
    },
  },
  methods: {
    // Entfernt alle Nicht-Ziffern-Zeichen aus der Eingabe (nur Zahlen erlaubt)
    filterNumbers(event) {
      this.searchQuery = event.target.value.replace(/\D/g, '');
    }
  },
  mounted() {
    // Setzt den Titel des Browser-Tabs beim Laden der Seite
    document.title = 'Operation Code Suche';
    // Kein manueller Fokus nötig, da das Eingabefeld das Attribut "autofocus" hat
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 300px;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
