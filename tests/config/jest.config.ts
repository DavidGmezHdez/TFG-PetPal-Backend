import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "../../tsconfig.json";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: "../../",
    verbose: true,
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(
            {
                ...compilerOptions.paths,
                "src/*": ["./src/*"],
                "tests/*": ["./tests/*"]
            },
            {
                prefix: "<rootDir>/tests/../"
            }
        )
    }
};
export default config;
