import 'babel-polyfill'
import { validateURL } from '../src/client'


describe("URL validation function", ()=> {
    test("URL function testing", ()=>{
        expect(validateURL).toBeDefined()
    })

    test('Validate URL return false when given invalid URL input', ()=> {
        expect(validateURL("xyz.xyz")).toBe(false)
    })
    test("Validate URL return true when given a valid form URL input", ()=>{
        expect(checkURL("http://www.bankmuscat.om")).toBe(true)
    })
})