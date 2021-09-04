import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import App from "../../App";
import { store } from "../../store/store";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders app in document", async () => {
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });

  expect(container).toBeInTheDocument();
});
