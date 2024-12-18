import 'babel-polyfill'
import { validateURL } from '../src/client'


describe("URL validation function", ()=> {
    test("URL function testing", ()=>{
        expect(validateURL).toBeDefined()
    })

    test('Validate URL return false when given invalid URL input', ()=> {
        expect(validateURL("xyz")).toBe(0)
    })
    test("Validate URL return true when given a valid form URL input", ()=>{
        expect(validateURL("http://www.bankmuscat.om")).toBe(1)
    })
})