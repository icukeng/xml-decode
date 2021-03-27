# Yet another xml parser (transformations included)

Project based on ktemelkov/node-xml2json, but is about only parsing.
The main feature is ability to transform target object to remove xml structures bloating.

Parsing features:

* every complex object in hierarhy has '@tag' field with tag name.
* xml tag value placed in '@value' field
* Single valued tags assigned as fileds to parent object
* attributes axis are merged or placed to '@attrs' field
* two or more sibling tags with same name treats as array of objects(with that tags data) (example in `__tests__/fixtures/simple-list`)

It does not parse the following elements:

* CDATA sections (*)
* Processing instructions
* XML declarations
* Entity declarations
* Comments

## Installation

```
$ npm install xml-decoder
```

## Usage

```javascript
var xmldecoder = require('xml-decoder');

var xml = "<foo attr=\"value\">bar</foo>";
console.log(xml)

var obj = xmldecoder(xml, {mergeAttrs: true});
console.log(JSON.stringify(obj));
```

Example xml:
```xml
<root>
  <items count="2">
    <item>1</item>
    <item>2</item>
  </items>
  <value attr="a"/>
  <value attr="b"/>
  <node_a>x</node_a>
  <node_b>y</node_b>
  <item>3</item>
</root>
```
Configurated options:
```javascript
var options = {
	mergeAttrs: true,
	toArray: ['root/items'],
	asArray: ['root/item'],
	renameTag: {
		'root/value':'values',
		'root/node_a':'nodes',
		'root/node_b':'nodes',
	}
}
```
Result object:
```json
{
  "root": {
    "@tag": "root",
    "items": [
      { "@tag": "item", "@value": 1 },
      { "@tag": "item", "@value": 2 }
    ],
    "values": [
      { "@tag": "value", "attr": "a" },
      { "@tag": "value", "attr": "b" }
    ],
    "nodes": [ "x", "y" ],
    "item": [ 3 ]
  }
}
```

### Options

* **mergeAttrs**, bool (default: felse) - flag to merge attrs with single valued child tags in common structure or not
* **asArray**, array of full paths in xml - force array for tag value
* **toArray**, array of full paths in xml - attributes of target tag ignored, target tag becomes array, child tags become array values
* **renameTag**, key-value of full path to new tag name - rename tag
* **typecast**, key-value of full path to type - override auto type casting
  ```javascript
  typecast: false, // disable auto typecasting
  ```
  ```javascript
  typecast: [
      "path/to/tag": "number",
      'path/to/@attr': "string" // attributes prefixed with @
  ]
  ```
