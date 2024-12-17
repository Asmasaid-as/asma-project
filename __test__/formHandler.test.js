import 'babel-polyfill'
import { handleSubmit } from '../src/js/formHandler';

describe("testing the submit functionality", ()=> {
    test("handleSubmit function is declared", ()=>{
        expect(handleSubmit).toBeDefined()
    })
})