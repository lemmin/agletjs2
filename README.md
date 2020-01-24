# AgletJS


AgletJS aims to fix the disconnect between the DOM and JS. Aglets work similarly to jQuery objects, but with very few extra features. The main purpose of an Aglet is to provide a more concise, hierarchical structure for your application's variable references to DOM objects.


#### For example, with the following code:
```HTML
<form ag-name="search">
	<label>
		Search:
		<input ag-name="terms" type="text"/>
	</label>
	<div ag-name="options">
		<label>
			<input ag-name="exact" type="checkbox"/>
			Match Exact Phrase
		</label>
		<label>
			<input ag-name="regex" type="checkbox"/>
			Use Regular Expression
		</label>
	</div>
</form>
```
#### And this simple JS:

```Javascript
var app = new Aglet(document.body);
```


Your application will then have access to components like `app.search.terms` and `app.search.options.exact` complete with dom references


Aglets can also be defined as components to be added to the DOM at any time.
