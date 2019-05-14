import {expect} from "chai";
import "mocha";
import {Dictionary, IDictionary} from "../wwwroot/scripts/dictionary";

describe("Dictionary.fromArray", () => {
    interface ITestObject {
        name: string;
        number: number;
    }

    const array: ITestObject[] = [
        {name: "first", number: 1},
        {name: "second", number: 2}
    ];

    function keyProvider(o: ITestObject): string {
        return o.name == "first" ? o.name : o.number.toString();
    }

    function containsUnderKey(dictionary: IDictionary<ITestObject>, key: string, object: ITestObject): boolean {
        return dictionary.hasOwnProperty(key) && dictionary[key] === object;
    }

    function count(dictionary: IDictionary<ITestObject>) {
        let result = 0;
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                ++result;
            }
        }
        return result;
    }

    it("should return an empty dictionary for an empty array", () => {
        const dictionary = Dictionary.fromArray([], keyProvider);
        expect(count(dictionary)).to.equal(0);
    });

    it("should return a dictionary with all elements from the array under their keys", () => {
        const dictionary = Dictionary.fromArray(array, keyProvider);
        expect(count(dictionary)).to.equal(array.length);
        expect(containsUnderKey(dictionary, array[0].name, array[0])).to.equal(true);
        expect(containsUnderKey(dictionary, array[1].number.toString(), array[1])).to.equal(true);
    });
});

describe("Dictionary.forEach", () => {
    interface ITestObject {
        marked: boolean
    }

    const dictionary: IDictionary<ITestObject> = {};
    const unmarked = ["first", "third"];
    const marked = ["second"];
    const processed = [];
    unmarked.forEach(n => dictionary[n] = {marked: false});
    marked.forEach(n => dictionary[n] = {marked: true});

    function mark(o: ITestObject): void {
        o.marked = true;
    }

    it("should process each key and mark each element", () => {
        Dictionary.forEach(dictionary,(k, o) => {
            processed.push(k);
            mark(o);
        });
        unmarked.concat(marked).forEach(k => {
            expect(processed.indexOf(k) >= 0).to.equal(true);
            expect(dictionary[k].marked).to.equal(true);
        });

    });
});