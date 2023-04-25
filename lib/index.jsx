import React from "react";
import ReactDOM from "react-dom/client";
import { defineCustomElement } from "vue";
const declarePiece = ({ name, component, framework }) => {
  switch (framework) {
    case "react": {
      console.log(framework);
      const Component = component;
      class Piece extends HTMLElement {
        constructor() {
          super();
          this.root = document.createElement("div");
          this.dom = ReactDOM.createRoot(this.root);
          this.dom.render(<Component />);
        }

        connectedCallback() {
          this.appendChild(this.root);
        }

        disconnectedCallback() {}
      }
      customElements.define(name, Piece);
      break;
    }
    case "vue": {
      console.log(framework);
      console.log(component);
      const Piece = defineCustomElement(component);
      customElements.define(name, Piece);
      break;
    }
    default: {
      break;
    }
  }
};

export { declarePiece };
