import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainSezione from "../components/MainSection/MainSezione";
import { SearchContext } from "../components/SearchContext/SearchContext";
import { DarkContext } from "../contexts/DarkContext";

test("testing cards in MainSezione", () => {
  const mockSearchContextData = {
    searchTerm: "",
  };

  const mockDarkContextData = {
    darkMode: false,
  };

  const { container } = render(
    //MemoryRouter necessario quando il componente che ti testa utilizza react-router-dom al suo interno
    //DarkContext e SearchContext necessari quando il componente che ti testa utilizza il context
    //per avviare tests utilizzare npm run test (si puo' cambiare nel file package.json, sotto la chiave scripts)
    <DarkContext.Provider value={mockDarkContextData}>
      <SearchContext.Provider value={mockSearchContextData}>
        <MemoryRouter>
          <MainSezione />
        </MemoryRouter>
      </SearchContext.Provider>
    </DarkContext.Provider>
  );

  const cards = container.querySelectorAll(".bookCard");

  expect(cards).toHaveLength(10);
});
