<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="container">
    <h1>Bitte geben Sie den Code ein</h1>
     <!-- Eingabefeld mit Autofokus (automatischer Cursor beim Laden) und nur Zahlen erlaubt -->
    <input v-model="searchQuery" type="text" placeholder="Code eingeben..." @input="filterNumbers" autofocus/> <!-- Dank dem Zusatz autofocus wird das Eingabefeld direkt fokussiert. Ee gäbe noch eine robustere lösung mit $refs und mounted() -->
    <!-- Liste der gefilterten Artikel -->
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
      searchQuery: '', // Suchbegriff des Benutzers
      items: [
        { id: 1, name: 'Artikel 1' },
        { id: 2, name: 'Artikel 2' },
        { id: 3, name: 'Beispiel 3' },
        // Weitere Artikel hier hinzufügen
      ],
    };
  },
 computed: {
    // Berechnete Eigenschaft, die die Artikel basierend auf dem Suchbegriff filtert
    filteredItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    document.title = 'Operation Code Suche'; // Setzt den Seitentitel
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
