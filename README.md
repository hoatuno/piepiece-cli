# piepiece-cli

---

**Set up**

`yarn && yarn link`

**Create a new folder to start with PiePiece microfrontend**

---

1. Pie

`pie-create`

- Choose 1 in 2 scenario `React` or `Vue` to create host app
- Name for app

---

2. Piece

`piece-create`

- Choose 1 in 2 scenario `React` or `Vue` to create remote app
- Name for app


3. Function declare Piece()

The `declare Piece()` function is designed to accept a Piece object with three properties, including:

- `name`: the name of the web component, data type is a string written in kebab-case format.
- `component`: a React or Vue component passed in, data type is `React.ReactNode` or `Vue.ComponentOptions<Vue>`.
- `framework`: the type of framework of the component passed in, data type is a string and can only be either 'React' or 'Vue'.

The `declare Piece()` function does not return any value (void).

Example:
```
// index.jsx
import Game from "./indexGame";
import { declarePiece } from "piepiece-cli";
declarePiece({
  name: "mario-jump",
  component: Game,
  framework: "react",
});
```
