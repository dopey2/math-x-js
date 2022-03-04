# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.5](https://github.com/dopey2/math-x-js/compare/v0.0.3...v0.0.5) (2022-03-04)


### ⚠ BREAKING CHANGES

* **rename:** Packages renamed

### Features

* **ci:** add test jobs in github actions ([56a5a38](https://github.com/dopey2/math-x-js/commit/56a5a38481cc3d7f2778485473e604bc58ebddd5))
* **core:** add a new edge case for fraction. First simplify the fraction before operating on it ([05284ea](https://github.com/dopey2/math-x-js/commit/05284eaec3455a8ee240d486f4d7036d17d2ec49))
* **core:** add solveAllToString & solveAllToJson function to MathNode ([340d944](https://github.com/dopey2/math-x-js/commit/340d94479e2c8c2b53165ad940492367b6e9e66b))
* **core:** implement isEqual method in every Math Node classes ([699ebc8](https://github.com/dopey2/math-x-js/commit/699ebc8fdab352f6fc3cd246b5e31c79c77976c8))
* **docs:** live example WIP ([cc1120c](https://github.com/dopey2/math-x-js/commit/cc1120c2e7c23607c55456921d28d54bc2cc79a1))
* **docusaurus:** wIP ([1cb6c73](https://github.com/dopey2/math-x-js/commit/1cb6c73d2f9c3b4a26971ca21ad6e9e107981c20))
* **docusaurus:** writing docs for @math-x-ts/core package ([e17f0a3](https://github.com/dopey2/math-x-js/commit/e17f0a3727c3b30e2d067fe306f8786df52620fb))
* **negative:** fix negatives, all tests passes :) ([66afe8f](https://github.com/dopey2/math-x-js/commit/66afe8f4f39fe667f304d7c0555b95edd21290cf))
* **negative:** handle more cases with negative operator ([e58ef33](https://github.com/dopey2/math-x-js/commit/e58ef334ac0adf6d5b221133c0032c87c63e9ee4))
* **negative:** handle more negative case, normalize negative with parenthesis instead of bracket ([4424e11](https://github.com/dopey2/math-x-js/commit/4424e11e249a300a1cd32b62471782adc5a495d5))
* **negative:** some refactor and use negative Classes to represent negative values ([7700289](https://github.com/dopey2/math-x-js/commit/7700289dc5d79c7b36f73991d0ce06a6b2dc55a1))
* **negative:** wip negative expression ([3205bba](https://github.com/dopey2/math-x-js/commit/3205bbaa1ecd6db47151cf096c5c72c019d42a09))


### Bug Fixes

* **core:** fix toTex() method was not calling toTex() for children nodes ([b0c563f](https://github.com/dopey2/math-x-js/commit/b0c563fe3c184462c6752ca8d9c926bdbf126154))
* **core:** parenthesis had wrong type & add parenthesis type to MathNodeType ([31c2b4c](https://github.com/dopey2/math-x-js/commit/31c2b4c4e8d343afdaf6cccaaf3a5de321d213bb))
* **exponent:** update exponent toString method ([154eb62](https://github.com/dopey2/math-x-js/commit/154eb62ecb9a85f80122481086e8934ba2f6f134))
* **test:** fix bundle test promises never resolved on fail ([a430f1c](https://github.com/dopey2/math-x-js/commit/a430f1cd5e04028ee04c6cd5b8bd84c6b5882fae))


* **rename:** rename @math-x-ts/compiler to @math-x-ts/parser ([8e6515b](https://github.com/dopey2/math-x-js/commit/8e6515bdc5998b2fe0a6f508d7438b9fc2738ee1))
