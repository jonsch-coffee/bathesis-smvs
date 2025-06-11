# Operation-Code Search-Engine

This project originated in the Bachelorthesis "Decision-Support bei Ursachenanalysen der Alertmeldungen des SMVS" of Jonathan Schlede and Claudio Comazzi. It provides a pair of embeddable widgets designed to support the **root-cause analysis** for endusers of the SMVS.

The Prototype can be testet here https://smvs-opsearch.onrender.com/.

## What It Does

- **Operation-Code Search:** Helps end-users identify solutions for an occured alert in ones POS, by providing step-by-step instructions after entering the operation code from the alert message.
- **Editor (Admin-only!):** Enables administrators to create and manage guides directly through a editor. Text can be formatted using Markdown syntax https://github.com/jonsch-coffee/smvs-opsearch/releases/tag/v0.9.0

Both components are delivered as **self-contained JavaScript widgets** that can be embedded in any website, including platforms like **Squarespace**.

<img width="480" alt="image" src="https://github.com/user-attachments/assets/71066a4f-b76a-4ce4-bcb1-ed377a5a4d36" />

---

## Configuration Options

The widgets are initialized via JavaScript and accept configuration parameters for API integration and authorization.

### Example integration for the editor

```html
<!-- Widget Container -->
<div id="editor-widget"></div>

<!-- Load Widget Script -->
<script src="https://your-api.example.com/editor-widget"></script>

<!-- Initialize Widget -->
<script>
  EditorWidget.mountEditorApp('#editor-widget', {
    apiUrl: 'https://your-api.example.com',
    apiKey: 'YOUR_API_KEY' // Optional for Operation-Code Search (search-widget)
  });
</script>
