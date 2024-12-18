import { validateName } from '../src/js/nameChecker';

describe('Testing the Validate Name function', () => {
    test('Testing the valdiateName() is defined', () => {
        expect(validateName).toBeDefined();
    });

    test('Testing the type of valdiateName()', () => {
        expect(typeof validateName).not.toBe('list');
    });
})