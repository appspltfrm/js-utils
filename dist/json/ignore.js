import { _setupSerialization } from "./_setupSerialization.js";
export function ignore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        const internalType = classPrototype.constructor;
        _setupSerialization(internalType);
        const properties = internalType.__jsonIgnoredProperties = (internalType.hasOwnProperty("__jsonIgnoredProperties") && internalType.__jsonIgnoredProperties) || [];
        properties.push(propertyName);
    };
}
//# sourceMappingURL=ignore.js.map