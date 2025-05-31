# Operation-Code Search-Engine

This project originated in the Bachelorthesis "Decision-Support für Alertmeldungen im SMVS" of Jonathan Schlede and Claudio Comazzi. It provides a pair of embeddable widgets designed to support the **root-cause analysis** for endusers of the SMVS.

The MVP can be testet here https://smvs-opsearch.onrender.com/. The editor can be opened using Ctrl + E. Changes are only stored temporarily!

## What It Does

- **Operation-Code Search Engine:** Helps end-users identify solutions for an occured alert in ones POS, by providing step-by-step instructions after entering the operation code from the alert message.
- **Visual Editor Interface:** Enables administrators to create and manage guides directly through a editor.

Both components are delivered as **self-contained JavaScript widgets** that can be embedded in any website, including platforms like **Squarespace**.

<img width="724" alt="Example alert message (DE)" src="https://github.com/user-attachments/assets/49805fa0-8aca-40a9-86ee-00018d34faeb" />


---

## Configuration Options

The widgets are initialized via JavaScript and accept configuration parameters for API integration and authorization.

### Example integration for the editor

```html
<!-- Widget Container -->
<div id="editor-widget"></div>

<!-- Load Widget Script -->
<script src="editor-widget.js"></script>

<!-- Initialize Widget -->
<script>
  EditorWidget.mountEditorApp('#editor-widget', {
    apiUrl: 'https://your-api.example.com',
    apiKey: 'YOUR_API_KEY' // Optional: for authenticated access
  });
</script>
