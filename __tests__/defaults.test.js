var fs = require('fs')
var xmldecode = require('../index.js')

describe("simple", () => {

	[
	"simple-struct",
	"simple-lists",
	].forEach(name => {
		test(name, () => {
			var src = fs.readFileSync(__dirname+'/fixtures/'+name+'.xml', 'utf8')
			var dst = xmldecode(src, {mergeAttrs: true})
			var rez = JSON.parse(fs.readFileSync(__dirname+'/fixtures/'+name+'.json', 'utf8'))
			expect(dst).toEqual(rez)
		});
	})
	test('array1', () => {
		var name = 'arrays1'
		var src = fs.readFileSync(__dirname+'/fixtures/'+name+'.xml', 'utf8')
		var dst = xmldecode(src, {
			mergeAttrs: true,
			toArray: [
				'root/persons',
				'root/persons/person1/stages',
				'root/persons/person2/stages',
			]
		})
		var rez = JSON.parse(fs.readFileSync(__dirname+'/fixtures/'+name+'.json', 'utf8'))
		expect(dst).toEqual(rez)
	});
});