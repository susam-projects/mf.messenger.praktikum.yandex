import Handlebars from "handlebars";

Handlebars.registerHelper("equals", (value1: unknown, value2: unknown) => value1 === value2);
Handlebars.registerHelper("isNull", (value: unknown) => value === null);
