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
	test('arrays1', () => {
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
	test('rename1', () => {
		var name = 'rename1'
		var src = fs.readFileSync(__dirname+'/fixtures/'+name+'.xml', 'utf8')
		var dst = xmldecode(src, {
			mergeAttrs: true,
			renameTag: {
				'root/person1': 'person',
				'root/person2': 'person',
				'root/single': 'multi',
			}
		})
		var rez = JSON.parse(fs.readFileSync(__dirname+'/fixtures/'+name+'.json', 'utf8'))
		expect(dst).toEqual(rez)
	});
	test('rename2-struct', () => {
		var name = 'rename2-struct'
		var src = fs.readFileSync(__dirname+'/fixtures/'+name+'.xml', 'utf8')
		var dst = xmldecode(src, {
			mergeAttrs: true,
			asArray: [
				'structure/university/university/faculty',
				'structure/university/filial/faculty',
		
				'structure/university/university/faculty/department',
				'structure/university/filial/faculty/department',
		
				'structure/university/university/faculty/department/group',
				'structure/university/filial/faculty/department/group',
		
			],
			renameTag: {
				'structure/university/university': 'children',
				'structure/university/filial'    : 'children',
				'structure/university/university/faculty': 'children',
				'structure/university/filial/faculty'    : 'children',
				'structure/university/university/faculty/department': 'children',
				'structure/university/filial/faculty/department'    : 'children',
			}
				})
		var rez = JSON.parse(fs.readFileSync(__dirname+'/fixtures/'+name+'.json', 'utf8'))
		expect(dst).toEqual(rez)
	});
	test('typecast1', () => {
		var name = 'typecast1'
		var src = fs.readFileSync(__dirname+'/fixtures/'+name+'.xml', 'utf8')
		var dst = xmldecode(src, {mergeAttrs: true})
		var rez = JSON.parse(fs.readFileSync(__dirname+'/fixtures/'+name+'.json', 'utf8'))
		expect(dst).toEqual(rez)
	});

});